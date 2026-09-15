import { useMemo } from 'react'
import { buildWebPageJsonLd, SeoHead } from '../components/seo/SeoHead'
import { seo, terms } from '../content/site'
import { LegalDocument } from './LegalDocument'

export function TermsPage() {
  const jsonLd = useMemo(
    () => buildWebPageJsonLd(seo.terms.title, seo.terms.description, '/terms'),
    [],
  )

  return (
    <>
      <SeoHead
        title={seo.terms.title}
        description={seo.terms.description}
        pathname="/terms"
        jsonLd={jsonLd}
      />
      <LegalDocument
        title={terms.title}
        intro={terms.intro}
        updatedLabel={terms.updatedLabel}
        updatedDate={terms.updatedDate}
        sections={terms.sections}
        backLabel={terms.backLabel}
        disclaimer={terms.disclaimer}
      />
    </>
  )
}
