import { site } from '../config.js'
import { navLinks } from '../data.js'
import Brand from './Brand.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer section-wrap">
      <Brand />
      <p>MADE FOR THE MOMENT.</p>
      <nav aria-label="Footer navigation">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`}>
            {link.label}
          </a>
        ))}
        <a href={site.repoUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
      <span className="copyright">
        © {year} {site.studio}
      </span>
    </footer>
  )
}
