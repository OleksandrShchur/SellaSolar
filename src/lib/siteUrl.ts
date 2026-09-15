/** Absolute site origin without trailing slash. Prefer VITE_SITE_URL when set. */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return ''
}

/** Vite base path without trailing slash, e.g. `/SellaSolar` or `` */
export function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '')
}

/** Absolute URL for a site path (`/`, `/privacy`, …) — no hash. */
export function absoluteUrl(pathname: string): string {
  const origin = getSiteOrigin()
  const base = getBasePath()
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  const normalized = path === '/' ? `${base}/` : `${base}${path}`
  if (!origin) return normalized
  return `${origin}${normalized}`
}

/** Absolute URL for a public asset under Vite base. */
export function absoluteAssetUrl(assetPath: string): string {
  const origin = getSiteOrigin()
  const base = import.meta.env.BASE_URL
  const clean = assetPath.replace(/^\//, '')
  const path = `${base}${clean}`
  if (!origin) return path
  return `${origin}${path}`
}
