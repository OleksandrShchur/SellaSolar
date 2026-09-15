import { useMemo } from 'react'
import { buildWebPageJsonLd, SeoHead } from '../components/seo/SeoHead'
import { privacy, seo } from '../content/site'
import { LegalDocument } from './LegalDocument'

export function PrivacyPage() {
  const jsonLd = useMemo(
    () => buildWebPageJsonLd(seo.privacy.title, seo.privacy.description, '/privacy'),
    [],
  )

  return (
    <>
      <SeoHead
        title={seo.privacy.title}
        description={seo.privacy.description}
        pathname="/privacy"
        jsonLd={jsonLd}
      />
      <LegalDocument
        title={privacy.title}
        intro={privacy.intro}
        updatedLabel={privacy.updatedLabel}
        updatedDate={privacy.updatedDate}
        sections={privacy.sections}
        backLabel={privacy.backLabel}
        disclaimer={privacy.disclaimer}
      />
    </>
  )
}
