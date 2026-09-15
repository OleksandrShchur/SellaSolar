import { useMemo } from 'react'
import { SeoHead, buildHomeJsonLd } from '../components/seo/SeoHead'
import { seo } from '../content/site'
import { FAQ } from '../sections/FAQ'
import { Hero } from '../sections/Hero'
import { HowItWorks } from '../sections/HowItWorks'
import { SavingsCalculator } from '../sections/SavingsCalculator'
import { Technology } from '../sections/Technology'
import { Testimonials } from '../sections/Testimonials'
import { WhySolar } from '../sections/WhySolar'

export function HomePage() {
  const jsonLd = useMemo(() => buildHomeJsonLd(), [])

  return (
    <main>
      <SeoHead
        title={seo.home.title}
        description={seo.home.description}
        pathname="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <HowItWorks />
      <WhySolar />
      <SavingsCalculator />
      <Technology />
      <Testimonials />
      <FAQ />
    </main>
  )
}
