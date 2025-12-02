import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import { pipeline } from 'stream/promises'

const repo = 'EV-OD/focosx'
const outDir = path.join(process.cwd(), 'public', 'releases')

async function ensureDir(dir) {
  await fsPromises.mkdir(dir, { recursive: true })
}

async function fetchJson(url, token) {
  const headers = { 'User-Agent': 'mirror-script' }
  if (token) headers['Authorization'] = `token ${token}`
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.json()
}

async function downloadToFile(url, dest, token) {
  const headers = {}
  if (token) headers['Authorization'] = `token ${token}`
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`)
  await ensureDir(path.dirname(dest))
  const fileStream = fs.createWriteStream(dest)
  await pipeline(res.body, fileStream)
}

async function main() {
  const token = process.env.GITHUB_TOKEN
  console.log('Mirroring releases for', repo)
  const releases = await fetchJson(`https://api.github.com/repos/${repo}/releases`, token)

  // Prepare output dir
  await fsPromises.rm(outDir, { recursive: true, force: true })
  await ensureDir(outDir)

  const mapped = []

  for (const r of releases) {
    const tag = r.tag_name || r.name || 'untagged'
    const releaseDir = path.join(outDir, tag)
    await ensureDir(releaseDir)
    const assets = []
    for (const a of r.assets || []) {
      const filename = a.name
      const dest = path.join(releaseDir, filename)
      console.log(`Downloading ${a.browser_download_url} -> ${dest}`)
      try {
        await downloadToFile(a.browser_download_url, dest, token)
        assets.push({ id: a.id, name: filename, url: `/releases/${encodeURIComponent(tag)}/${encodeURIComponent(filename)}`, size: a.size })
      } catch (e) {
        console.warn('Failed to download asset', a.browser_download_url, e.message)
      }
    }
    mapped.push({ id: r.id, tag_name: r.tag_name, name: r.name, body: r.body, published_at: r.published_at, assets })
  }

  // Write mapping JSON
  const mapPath = path.join(outDir, 'releases.json')
  await fsPromises.writeFile(mapPath, JSON.stringify(mapped, null, 2), 'utf-8')
  console.log('Wrote releases map to', mapPath)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
