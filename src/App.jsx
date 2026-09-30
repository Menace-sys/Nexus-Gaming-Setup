import { useEffect, useState } from 'react'

const photos = {
  hero: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=2200&q=90',
  pc: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1100&q=85',
  monitor: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1100&q=85',
  keyboard: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1100&q=85',
  mouse: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=85',
  headset: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1100&q=85',
  gallery1: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1500&q=85',
  gallery2: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1100&q=85',
  gallery3: 'https://images.unsplash.com/photo-1616588589676-62b3c7ea4d00?auto=format&fit=crop&w=1100&q=85',
  gallery4: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=85',
}

const features = [
  { icon: '◈', title: 'RTX GRAPHICS', detail: 'Next-gen ray tracing' },
  { icon: '▣', title: '4K · 144HZ', detail: 'Every frame in focus' },
  { icon: '⌨', title: 'MECHANICAL', detail: 'Precision in every press' },
  { icon: '↗', title: 'PRO PERFORMANCE', detail: 'Built to stay ahead' },
]

const components = [
  { name: 'The Core', type: '01 / SYSTEM', desc: 'A powerhouse built for uncompromising play and creative flow.', image: photos.pc, className: 'component-tall' },
  { name: 'The View', type: '02 / DISPLAY', desc: 'Fluid motion. Pin-sharp detail. A world without blur.', image: photos.monitor },
  { name: 'The Input', type: '03 / KEYBOARD', desc: 'Tactile, deliberate, and ready for every command.', image: photos.keyboard },
  { name: 'The Aim', type: '04 / MOUSE', desc: 'Weightless precision, tuned to your instincts.', image: photos.mouse },
  { name: 'The Sound', type: '05 / AUDIO', desc: 'Hear every detail. Feel every moment.', image: photos.headset },
]

const specs = [
  ['PROCESSOR', 'Intel® Core™ i9-14900K', '24 cores · up to 6.0 GHz'],
  ['GRAPHICS', 'NVIDIA® GeForce RTX™ 4080 SUPER', '16 GB GDDR6X · DLSS 3'],
  ['MEMORY', '32 GB DDR5 · 6,000 MHz', 'Low-latency dual channel'],
  ['STORAGE', '2 TB Gen 4 NVMe SSD', 'Blazing-fast load times'],
  ['DISPLAY', '32” 4K UHD · 144 Hz', 'IPS · 1 ms · Adaptive Sync'],
]

function Arrow({ diagonal = false }) { return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span> }

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 16)
  const links = [['Setup', '#setup'], ['Specs', '#specs'], ['Gallery', '#gallery'], ['Contact', '#contact']]
  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
    <a className="brand" href="#top" aria-label="NEXUS home"><span className="brand-mark">N</span><span>NEXUS<span className="brand-dot">.</span></span></a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    <nav className={open ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Discover NEXUS <Arrow /></a>
    </nav>
  </header>
}

function Reveal({ children, className = '', delay = 0 }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = document.querySelector(`[data-reveal="${id}"]`)
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  const id = useState(() => Math.random().toString(36).slice(2))[0]
  return <div data-reveal={id} style={{ '--delay': `${delay}ms` }} className={`reveal ${visible ? 'revealed' : ''} ${className}`}>{children}</div>
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-atmosphere" aria-hidden="true" />
    <div className="hero-content">
      <Reveal><p className="eyebrow"><span className="eyebrow-status" /> BUILT FOR VICTORY</p></Reveal>
      <Reveal delay={70}><h1>NEXUS<br /><span>GAMING SETUP</span></h1></Reveal>
      <Reveal delay={140}><p className="hero-copy">A considered space for extraordinary play. Engineered to perform. Designed to belong.</p></Reveal>
      <Reveal delay={210}><div className="hero-actions"><a className="button button-primary" href="#setup">Explore Setup <Arrow /></a><a className="button button-quiet" href="#specs">View Specs <Arrow diagonal /></a></div></Reveal>
    </div>
    <Reveal className="hero-art-reveal" delay={110}>
      <div className="hero-art">
        <div className="hero-art-halo" aria-hidden="true" />
        <img src={photos.hero} alt="A premium gaming setup with a high-performance PC and immersive display" fetchPriority="high" />
        <div className="hero-art-shade" aria-hidden="true" />
        <div className="hero-float-label"><span className="float-dot" /><span><strong>BUILT TO PERFORM</strong><small>PRECISION IN EVERY DETAIL</small></span><span className="float-mark">N</span></div>
        <span className="hero-art-index">N° 01 <i /> THE NEXUS SYSTEM</span>
      </div>
    </Reveal>
    <div className="hero-index"><span>01</span><i /> THE ART OF PLAY</div>
    <a className="scroll-cue" href="#features" aria-label="Scroll to features"><span>SCROLL TO EXPLORE</span><i /></a>
  </section>
}

function Features() {
  return <section className="features section-wrap" id="features" aria-label="Setup highlights">
    {features.map((item, i) => <Reveal key={item.title} delay={i * 70}><article className="feature"><span className="feature-icon">{item.icon}</span><div><h2>{item.title}</h2><p>{item.detail}</p></div></article></Reveal>)}
  </section>
}

function SectionHeading({ kicker, title, note }) {
  return <div className="section-heading"><div><p className="kicker">{kicker}</p><h2>{title}</h2></div>{note && <p className="section-note">{note}</p>}</div>
}

function Setup() {
  return <section className="section section-wrap" id="setup">
    <Reveal><SectionHeading kicker="EVERY DETAIL, IN ITS PLACE" title={<>The setup<span className="accent">.</span></>} note="Five essentials. One seamless experience. Each piece selected to work beautifully on its own—and better together." /></Reveal>
    <div className="component-grid">{components.map((item, i) => <Reveal key={item.name} className={`component-slot ${item.className || ''}`} delay={i * 55}><article className="component-card"><div className="component-image"><img src={item.image} alt={item.name} loading="lazy" /><span className="image-number">{item.type}</span></div><div className="component-info"><div><h3>{item.name}</h3><p>{item.desc}</p></div><span className="card-arrow"><Arrow diagonal /></span></div></article></Reveal>)}</div>
  </section>
}

function Specs() {
  return <section className="specs-section" id="specs"><div className="section-wrap specs-layout">
    <Reveal className="specs-intro"><p className="kicker">POWER, WITH PURPOSE</p><h2>Under the<br />surface<span className="accent">.</span></h2><p>Quietly capable. Relentlessly consistent. Every component chosen for the whole, not just the headline.</p><a className="text-link" href="#gallery">See it in its element <Arrow /></a><div className="spec-orbit"><span>N<span>×</span></span><i /><i /><i /></div></Reveal>
    <div className="spec-list">{specs.map(([label, name, detail], i) => <Reveal key={label} delay={i * 65}><div className="spec-row"><span className="spec-label">{label}</span><div className="spec-value"><strong>{name}</strong><span>{detail}</span></div><span className="spec-index">0{i + 1}</span></div></Reveal>)}</div>
  </div></section>
}

function Gallery() {
  const images = [
    { src: photos.gallery1, alt: 'A carefully arranged high-performance gaming desk', label: 'THE COMMAND CENTER', cls: 'gallery-large' },
    { src: photos.gallery2, alt: 'A vivid game world on a high-resolution display', label: 'WORLDS, UNBOUND', cls: '' },
    { src: photos.headset, alt: 'A premium gaming headset built for immersive audio', label: 'BUILT FOR IMMERSION', cls: '' },
    { src: photos.gallery4, alt: 'Close-up detail of a custom-built gaming PC', label: 'MADE TO PERFORM', cls: 'gallery-wide' },
  ]
  return <section className="section section-wrap gallery-section" id="gallery"><Reveal><SectionHeading kicker="A CLOSER LOOK" title={<>In the zone<span className="accent">.</span></>} note="A little more than a place to play. A space that feels like yours." /></Reveal><div className="gallery-grid">{images.map((image, i) => <Reveal key={image.label} className={`gallery-slot ${image.cls}`} delay={i * 70}><figure className="gallery-card"><img src={image.src} alt={image.alt} loading="lazy" /><figcaption><span>{image.label}</span><Arrow diagonal /></figcaption></figure></Reveal>)}</div></section>
}

function Contact() {
  return <section className="contact section-wrap" id="contact"><div className="contact-glow" /><Reveal className="contact-inner"><p className="kicker">YOUR NEXT CHAPTER STARTS HERE</p><h2>READY TO BUILD<br />YOUR SETUP<span className="accent">?</span></h2><p>Explore the details. Find your flow. Make it yours.</p><a className="button button-primary" href="#setup">Explore the setup <Arrow /></a></Reveal><div className="contact-orbit orbit-one" /><div className="contact-orbit orbit-two" /></section>
}

function Footer() {
  return <footer className="footer section-wrap"><a className="brand" href="#top" aria-label="NEXUS home"><span className="brand-mark">N</span><span>NEXUS<span className="brand-dot">.</span></span></a><p>MADE FOR THE MOMENT.</p><nav aria-label="Footer navigation"><a href="#setup">Setup</a><a href="#specs">Specs</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></nav><span className="copyright">© 2025 NEXUS STUDIO</span></footer>
}

export default function App() {
  return <><Header /><main><Hero /><Features /><Setup /><Specs /><Gallery /><Contact /></main><Footer /></>
}
