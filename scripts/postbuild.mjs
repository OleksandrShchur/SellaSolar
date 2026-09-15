import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))

const siteUrl = (process.env.VITE_SITE_URL || '').trim().replace(/\/$/, '')
// Match vite.config.ts base (no trailing slash for URL join)
const base = '/SellaSolar'
const originWithBase = siteUrl ? `${siteUrl}${base}` : ''

if (!originWithBase) {
  console.log('[postbuild] VITE_SITE_URL unset — leaving REPLACE_WITH_SITE_URL placeholders')
  process.exit(0)
}

for (const file of ['robots.txt', 'sitemap.xml']) {
  const path = resolve(dist, file)
  const next = readFileSync(path, 'utf8').replaceAll('REPLACE_WITH_SITE_URL', originWithBase)
  writeFileSync(path, next)
  console.log(`[postbuild] wrote ${file} with ${originWithBase}`)
}
