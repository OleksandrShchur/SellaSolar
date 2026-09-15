import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { faq, footer, seo } from '../../content/site'
import { absoluteAssetUrl, absoluteUrl } from '../../lib/siteUrl'

type JsonLd = Record<string, unknown> | Record<string, unknown>[]

type SeoHeadProps = {
  title: string
  description: string
  pathname: string
  robots?: string
  jsonLd?: JsonLd
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function upsertJsonLd(id: string, data: JsonLd | undefined) {
  const existing = document.getElementById(id)
  if (!data) {
    existing?.remove()
    return
  }
  let script = existing as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export function buildHomeJsonLd(): JsonLd {
  const pageUrl = absoluteUrl('/')
  const phone = footer.contact.phone.replace(/[\s()]/g, '')
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: seo.siteName,
      description: seo.home.description,
      url: pageUrl,
      telephone: phone,
      areaServed: {
        '@type': 'AdministrativeArea',
        name: footer.contact.address,
      },
      image: absoluteAssetUrl(seo.ogImage),
      sameAs: [footer.socials.instagram],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]
}

export function buildWebPageJsonLd(title: string, description: string, pathname: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(pathname),
    isPartOf: {
      '@type': 'WebSite',
      name: seo.siteName,
      url: absoluteUrl('/'),
    },
  }
}

export function SeoHead({
  title,
  description,
  pathname,
  robots = 'index,follow',
  jsonLd,
}: SeoHeadProps) {
  const location = useLocation()

  useEffect(() => {
    const canonicalPath = pathname || location.pathname
    const canonical = absoluteUrl(canonicalPath === '/' ? '/' : canonicalPath)
    const ogImage = absoluteAssetUrl(seo.ogImage)

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertLink('canonical', canonical)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', seo.siteName)
    upsertMeta('property', 'og:locale', seo.locale)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    upsertJsonLd('seo-json-ld', jsonLd)
  }, [title, description, pathname, robots, jsonLd, location.pathname])

  return null
}
