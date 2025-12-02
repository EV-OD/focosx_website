import fs from 'fs'
import path from 'path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const metaPath = path.join(root, 'metadata.json')

let metadata = {}
try {
  const raw = fs.readFileSync(metaPath, 'utf-8')
  metadata = JSON.parse(raw)
} catch (e) {
  // ignore
}

const siteUrl = (process.env.SITE_URL || metadata.siteUrl || metadata.url || '').replace(/\/$/, '')
const pages = ['/']

const urls = pages.map(p => siteUrl ? `${siteUrl}${p}` : p)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(u => `  <url>\n    <loc>${u}</loc>\n  </url>`)
  .join('\n')}\n</urlset>`

fs.mkdirSync(distDir, { recursive: true })
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8')

const robots = `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf-8')

console.log('Wrote sitemap.xml and robots.txt to', distDir)
