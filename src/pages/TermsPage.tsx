import { terms } from '../content/site'
import { LegalDocument } from './LegalDocument'

export function TermsPage() {
  return (
    <LegalDocument
      title={terms.title}
      intro={terms.intro}
      updatedLabel={terms.updatedLabel}
      updatedDate={terms.updatedDate}
      sections={terms.sections}
      backLabel={terms.backLabel}
      disclaimer={terms.disclaimer}
    />
  )
}
