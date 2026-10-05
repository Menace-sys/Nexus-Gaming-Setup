import { useEffect, useState } from 'react'
import { navLinks } from '../data.js'
import Arrow from './Arrow.jsx'
import Brand from './Brand.jsx'

// Highlights the nav link for whichever section is in the middle of the screen.
function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

const sectionIds = navLinks.map((link) => link.id)

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 16)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with Escape or when the layout grows past mobile.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    const desktop = window.matchMedia('(min-width: 641px)')
    const onChange = (event) => event.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onChange)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <Brand />
      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav id="main-nav" className={open ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? 'is-active' : undefined}
            aria-current={active === link.id ? 'true' : undefined}
            onClick={close}
          >
            {link.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={close}>
          Discover NEXUS <Arrow />
        </a>
      </nav>
    </header>
  )
}
