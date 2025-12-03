import React, { useEffect, useState } from 'react';
import { FadeIn } from './FadeIn';
import { Zap } from 'lucide-react';

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

export const Changelog: React.FC = () => {
   const [releases, setReleases] = useState<Release[] | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      let mounted = true;
      const fetchReleases = async () => {
         setLoading(true);
         setError(null);
         try {
            const localRes = await fetch('/releases/releases.json');
            if (localRes.ok) {
               try {
                  const text = await localRes.text();
                  const data = JSON.parse(text);
                  if (!mounted) return;
                  setReleases(data);
                  return;
               } catch (e) {
                  // local file is not valid JSON (maybe HTML error page). Fallthrough to GitHub API.
               }
            }

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

   const colorForTag = (tag: string) => {
      if (!tag) return 'bg-slate-700';
      if (tag.startsWith('v2') || tag.startsWith('2')) return 'bg-sky-500';
      if (tag.startsWith('v1') || tag.startsWith('1')) return 'bg-teal-500';
      return 'bg-slate-600';
   };

   return (
      <div className="pt-24 pb-20 container mx-auto px-6">
         <FadeIn>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-16">
                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg shadow-sky-500/20 mb-6">
                        <Zap className="w-6 h-6 text-white" />
                   </div>
                   <h1 className="text-4xl font-bold text-white mb-4">What's New</h1>
                   <p className="text-slate-400">Track the evolution of FocosX.</p>
               </div>

               <div className="space-y-12 relative">
                   <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-800" />

                   {loading && (
                      Array.from({ length: 3 }).map((_, i) => (
                         <FadeIn key={i} delay={i * 100} className="relative pl-20">
                            <div className="absolute left-0 top-1.5 w-14 h-14 rounded-full border-4 border-[#0f172a] bg-slate-700 flex items-center justify-center shadow-lg z-10 text-white font-bold text-xs">v</div>
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative hover:border-slate-700 transition-colors animate-pulse" />
                         </FadeIn>
                      ))
                   )}

                   {!loading && error && (
                      <div className="text-center text-red-500">{error}</div>
                   )}

                   {!loading && releases && releases.length > 0 && releases.map((release, i) => (
                      <FadeIn key={release.id} delay={i * 100} className="relative pl-20">
                           <div className={`absolute left-0 top-1.5 w-14 h-14 rounded-full border-4 border-[#0f172a] ${colorForTag(release.tag_name)} flex items-center justify-center shadow-lg z-10 text-white font-bold text-xs`}>
                               {String(release.tag_name).split('.')[0]}
                           </div>

                           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative hover:border-slate-700 transition-colors">
                               <div className="absolute top-5 -left-2 w-4 h-4 bg-slate-900 border-l border-b border-slate-800 transform rotate-45" />
                     
                               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                             {release.name || release.tag_name}
                                             <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${colorForTag(release.tag_name) === 'bg-sky-500' ? 'bg-sky-500/20 text-sky-400' : colorForTag(release.tag_name) === 'bg-teal-500' ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                                                 {release.tag_name}
                                             </span>
                                        </h2>
                                    </div>
                                    <div className="text-sm text-slate-500 font-mono">{new Date(release.published_at).toLocaleString()}</div>
                               </div>

                               {release.body ? (
                                  <div className="prose prose-invert text-slate-300 max-w-none" dangerouslySetInnerHTML={{ __html: release.body }} />
                               ) : (
                                  <div className="text-slate-300">No release notes for this version.</div>
                               )}
                           </div>
                      </FadeIn>
                   ))}
               </div>
            </div>
         </FadeIn>
      </div>
   );
};