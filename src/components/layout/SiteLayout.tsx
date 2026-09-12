import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { HeroThemeProvider } from '../../context/HeroThemeContext'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export function SiteLayout() {
  return (
    <HeroThemeProvider>
      <ScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
    </HeroThemeProvider>
  )
}
