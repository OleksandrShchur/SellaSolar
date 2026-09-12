import { privacy } from '../content/site'
import { LegalDocument } from './LegalDocument'

export function PrivacyPage() {
  return (
    <LegalDocument
      title={privacy.title}
      intro={privacy.intro}
      updatedLabel={privacy.updatedLabel}
      updatedDate={privacy.updatedDate}
      sections={privacy.sections}
      backLabel={privacy.backLabel}
      disclaimer={privacy.disclaimer}
    />
  )
}
