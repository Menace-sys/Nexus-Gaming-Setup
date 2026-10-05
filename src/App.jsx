import { useEffect } from 'react'
import Contact from './components/Contact.jsx'
import Features from './components/Features.jsx'
import Footer from './components/Footer.jsx'
import Gallery from './components/Gallery.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Setup from './components/Setup.jsx'
import Specs from './components/Specs.jsx'

export default function App() {
  // The page is rendered by JavaScript, so a shared link such as /#specs
  // needs a nudge to land on its section once everything is on the page.
  useEffect(() => {
    const { hash } = window.location
    if (hash.length > 1) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Features />
        <Setup />
        <Specs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
