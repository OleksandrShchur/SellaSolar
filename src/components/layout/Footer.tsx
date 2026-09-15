import { Instagram, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { brand, footer, navLinks } from '../../content/site'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-ink text-stone-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <Container className="relative grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <p className="font-heading text-xl font-bold text-cream">{brand.name}</p>
          <p className="mt-4 text-sm leading-relaxed text-stone-400">{footer.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SocialLink href={footer.socials.instagram} label={footer.aria.instagram}>
              <Instagram className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-cream">
            {footer.columns.links}
          </p>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <Link
                  to={{ pathname: '/', hash: link.hash }}
                  className="inline-flex min-h-11 items-center text-sm transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-cream">
            {footer.columns.services}
          </p>
          <ul className="mt-4 space-y-3">
            {footer.services.map((service) => (
              <li key={service}>
                <span className="text-sm">{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-cream">
            {footer.columns.contact}
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a
                href={`tel:${footer.contact.phone.replace(/[\s()]/g, '')}`}
                className="inline-flex min-h-11 items-center gap-2 hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {footer.contact.phone}
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{footer.contact.address}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-stone-500 sm:flex-row">
          <p>{footer.copyright}</p>
          <div className="flex gap-4">
            {footer.legal.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="inline-flex min-h-11 items-center hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-stone-300 transition-colors hover:border-primary hover:text-primary hover:shadow-glow"
    >
      {children}
    </a>
  )
}
