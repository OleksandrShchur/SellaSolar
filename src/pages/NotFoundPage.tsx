import { Link, useLocation } from 'react-router-dom'
import { SeoHead } from '../components/seo/SeoHead'
import { Container } from '../components/layout/Container'
import { notFound, seo } from '../content/site'

export function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <main className="bg-surface py-24 sm:py-28 md:py-32">
      <SeoHead
        title={seo.notFound.title}
        description={seo.notFound.description}
        pathname={pathname}
        robots="noindex,follow"
      />
      <Container className="mx-auto max-w-xl text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">404</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-slate-ink sm:text-4xl">
          {notFound.title}
        </h1>
        <p className="mt-4 text-stone-600">{notFound.body}</p>
        <Link to="/" className="btn-solar mt-8 inline-flex">
          {notFound.cta}
        </Link>
      </Container>
    </main>
  )
}
