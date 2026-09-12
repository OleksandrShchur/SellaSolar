import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'

export type LegalSection = {
  title: string
  paragraphs: readonly string[]
}

type LegalDocumentProps = {
  title: string
  intro: string
  updatedLabel: string
  updatedDate: string
  sections: readonly LegalSection[]
  backLabel: string
  disclaimer: string
}

export function LegalDocument({
  title,
  intro,
  updatedLabel,
  updatedDate,
  sections,
  backLabel,
  disclaimer,
}: LegalDocumentProps) {
  return (
    <main className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-cream via-surface to-surface pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

      <Container className="relative max-w-3xl">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-sm font-medium text-stone-600 transition-colors hover:text-primary"
        >
          ← {backLabel}
        </Link>

        <h1 className="mt-6 font-heading text-fluid-section font-bold tracking-tight text-slate-ink">
          {title}
        </h1>
        <p className="mt-3 text-sm text-stone-500">
          {updatedLabel} {updatedDate}
        </p>
        <p className="mt-6 text-base leading-relaxed text-stone-700">{intro}</p>

        <div className="mt-10 space-y-10">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="font-heading text-xl font-semibold text-slate-ink sm:text-2xl">
                {index + 1}. {section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-base leading-relaxed text-stone-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-stone-300/60 pt-6 text-sm leading-relaxed text-stone-500">
          {disclaimer}
        </p>

        <Link
          to="/"
          className="btn-solar mt-8 inline-flex"
        >
          {backLabel}
        </Link>
      </Container>
    </main>
  )
}
