import { FAQ } from '../sections/FAQ'
import { Hero } from '../sections/Hero'
import { HowItWorks } from '../sections/HowItWorks'
import { SavingsCalculator } from '../sections/SavingsCalculator'
import { Technology } from '../sections/Technology'
import { Testimonials } from '../sections/Testimonials'
import { WhySolar } from '../sections/WhySolar'

export function HomePage() {
  return (
    <main>
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
