import type { VercelRequest, VercelResponse } from '@vercel/node'

// Simple proxy to stream GitHub release assets server-side and avoid CORS issues.
// Deploy this as a Vercel Serverless Function (place under `/api`), or adapt for Netlify/AWS.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query as { url?: string };
  if (!url) {
    res.status(400).send('Missing url parameter');
    return;
  }

  try {
    const parsed = new URL(url);
    // Basic allowlist: only permit github.com (prevent open proxy abuse)
    if (!/github\.com$/.test(parsed.hostname)) {
      res.status(403).send('Forbidden host');
      return;
    }

    // Use global fetch (Node 18+ / Vercel runtime)
    const upstream = await fetch(url, { redirect: 'follow' });
    if (!upstream.ok) {
      res.status(upstream.status).send(`Upstream error: ${upstream.status}`);
      return;
    }

    const arrayBuffer = await upstream.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Forward some headers
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const disposition = upstream.headers.get('content-disposition') || undefined;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType);
    if (disposition) res.setHeader('Content-Disposition', disposition);
    res.setHeader('Content-Length', String(buffer.length));

    res.status(200).send(buffer);
  } catch (err: any) {
    res.status(500).send('Proxy error')
  }
}
