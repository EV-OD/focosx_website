import React, { useEffect, useState } from 'react';
import { DownloadCloud, Laptop, Cpu, HardDrive, Globe, ArrowDown } from 'lucide-react';

type Asset = {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
};

type Release = {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: Asset[];
};

const repo = 'EV-OD/focosx';

function detectOS(): 'windows' | 'mac' | 'linux' | 'unknown' {
  const ua = navigator.userAgent || navigator.platform || '';
  if (/Win/i.test(ua)) return 'windows';
  if (/Mac/i.test(ua) || /iPhone|iPad|iPod/i.test(ua)) return 'mac';
  if (/Linux/i.test(ua) || /X11/i.test(ua)) return 'linux';
  return 'unknown';
}

function platformFromFilename(name: string): 'windows' | 'mac' | 'linux' | 'other' {
  const n = name.toLowerCase();
  if (n.endsWith('.exe') || n.endsWith('.msi') || n.includes('win')) return 'windows';
  if (n.endsWith('.dmg') || n.endsWith('.pkg') || n.includes('mac')) return 'mac';
  if (n.endsWith('.AppImage'.toLowerCase()) || n.endsWith('.appimage') || n.endsWith('.deb') || n.endsWith('.rpm') || n.includes('linux')) return 'linux';
  if (n.endsWith('.zip') && n.includes('mac')) return 'mac';
  return 'other';
}

export const Downloads: React.FC = () => {
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const os = typeof navigator !== 'undefined' ? detectOS() : 'unknown';

  useEffect(() => {
    let mounted = true;
    const fetchReleases = async () => {
      setLoading(true);
      setError(null);
      try {
        // Prefer local releases map (generated during CI and published to GitHub Pages)
        const localRes = await fetch('/releases/releases.json');
        if (localRes.ok) {
          const data = await localRes.json();
          if (!mounted) return;
          setReleases(data);
          return;
        }

        // Fallback to GitHub API
        const res = await fetch(`https://api.github.com/repos/${repo}/releases`);
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setReleases(data);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch releases');
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
    return () => { mounted = false };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const downloadAsset = async (assetUrl: string, filename?: string) => {
    try {
      setToast('Starting download...');

      // Prefer to use a server-side proxy to avoid CORS issues. This proxy should be
      // deployed as a serverless function (e.g. Vercel `/api/proxy`). It will fetch
      // the GitHub asset server-side and return it with CORS headers.
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(assetUrl)}`;

      // Try proxy first (same-origin, avoids CORS). If it fails, fallback to direct navigation.
      try {
        const resp = await fetch(proxyUrl);
        if (!resp.ok) throw new Error('Proxy fetch failed');
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || assetUrl.split('/').pop() || 'download';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setToast('Download started');
        return;
      } catch (proxyErr) {
        // Proxy failed (not deployed or error). Fall back to direct link which may redirect
        // the browser to GitHub or S3. This will not work for fetch due to CORS, but
        // opening the URL directly lets the browser handle the redirect.
        console.warn('Proxy download failed, falling back to direct link', proxyErr);
        const a = document.createElement('a');
        a.href = assetUrl;
        // Let the browser decide how to handle content-disposition; open in new tab to avoid navigation
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setToast('Download started (redirecting to host)');
        return;
      }
    } catch (e) {
      setToast('Download failed. Please try again.');
    }
  };

  const chooseBestForOS = (assets: Asset[]) => {
    // Prefer exact matches for OS-specific extensions
    const order = os === 'windows' ? ['windows','other'] : os === 'mac' ? ['mac','other'] : os === 'linux' ? ['linux','other'] : ['other'];
    for (const platform of order) {
      const found = assets.find(a => platformFromFilename(a.name) === platform);
      if (found) return found;
    }
    return assets[0];
  };

  return (
    <section className="container mx-auto px-6 pt-28 pb-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg">
          <DownloadCloud className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Download FocosX</h1>
        <p className="text-slate-400 mb-6">Get the official desktop application for Windows, macOS, and Linux. Releases are fetched from the project's GitHub releases.</p>
        <div className="flex items-center justify-center gap-3">
          {loading ? (
            <div className="px-6 py-3 rounded bg-slate-800 text-slate-400">Detecting best release...</div>
          ) : releases && releases.length > 0 ? (
            (() => {
              const latest = releases[0];
              const best = chooseBestForOS(latest.assets || []);
              return (
                <>
                  {best ? (
                    <button onClick={() => downloadAsset(best.browser_download_url, best.name)} className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold inline-flex items-center gap-2 shadow">
                      <ArrowDown className="w-4 h-4" />
                      {`Download for ${os === 'unknown' ? 'Desktop' : os.charAt(0).toUpperCase() + os.slice(1)}`}
                    </button>
                  ) : (
                    <div className="px-6 py-3 rounded bg-slate-800 text-slate-400">No suitable artifact found</div>
                  )}
                  <a href="#releases" className="px-4 py-3 rounded-lg border border-slate-700 text-sm text-slate-300 hover:bg-slate-800">View other releases</a>
                </>
              );
            })()
          ) : (
            <div className="px-6 py-3 rounded bg-slate-800 text-slate-400">No releases available</div>
          )}
        </div>
      </div>

      <div id="releases" style={{ scrollMarginTop: '112px' }} className="max-w-5xl mx-auto mt-10 grid grid-cols-1 gap-4">
        {loading && (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-6 rounded-xl bg-slate-900/60 animate-pulse" />
          ))
        )}

        {error && <div className="text-center text-red-500">{error}</div>}

        {!loading && releases && releases.map(r => (
          <article key={r.id} className="bg-slate-900/70 rounded-xl p-6 border border-slate-700 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-lg">{r.name || r.tag_name}</h2>
                <div className="text-xs text-slate-400">Published {new Date(r.published_at).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-3">
                <a className="text-xs text-slate-400 hover:text-white" href={`#release-${r.id}`}>Release notes</a>
              </div>
            </div>

            <div id={`release-${r.id}`} className="mt-4 prose prose-invert max-w-none text-slate-300" dangerouslySetInnerHTML={{ __html: r.body || '<i>No release notes</i>' }} />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {r.assets.map(a => {
                const plat = platformFromFilename(a.name);
                return (
                  <div key={a.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded bg-slate-700">
                        {plat === 'windows' ? <Laptop className="w-5 h-5" /> : plat === 'mac' ? <Cpu className="w-5 h-5" /> : plat === 'linux' ? <HardDrive className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-slate-400">{(a.size / 1024 / 1024).toFixed(2)} MB • {plat}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => downloadAsset(a.browser_download_url, a.name)} className="px-3 py-2 bg-sky-500 hover:bg-sky-600 rounded text-white text-sm inline-flex items-center gap-2">
                        <DownloadCloud className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      {toast && (
        <div className="fixed right-6 bottom-6 bg-slate-900/90 border border-slate-700 text-slate-100 px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </section>
  );
};

export default Downloads;
