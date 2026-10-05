import { heroImage } from '../data.js'
import Arrow from './Arrow.jsx'
import Reveal from './Reveal.jsx'
import SmartImage from './SmartImage.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-content">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-status" aria-hidden="true" /> BUILT FOR VICTORY
          </p>
        </Reveal>
        <Reveal delay={70}>
          <h1 id="hero-title">
            NEXUS
            <br />
            <span>GAMING SETUP</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="hero-copy">A considered space for extraordinary play. Engineered to perform. Designed to belong.</p>
        </Reveal>
        <Reveal delay={210}>
          <div className="hero-actions">
            <a className="button button-primary" href="#setup">
              Explore Setup <Arrow />
            </a>
            <a className="button button-quiet" href="#specs">
              View Specs <Arrow diagonal />
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-art-reveal" delay={110}>
        <div className="hero-art">
          <div className="hero-art-halo" aria-hidden="true" />
          <SmartImage
            src={heroImage.src}
            srcSet={heroImage.srcSet}
            sizes="(max-width: 640px) 100vw, 55vw"
            alt={heroImage.alt}
            fetchPriority="high"
          />
          <div className="hero-art-shade" aria-hidden="true" />
          <div className="hero-float-label">
            <span className="float-dot" aria-hidden="true" />
            <span>
              <strong>BUILT TO PERFORM</strong>
              <small>PRECISION IN EVERY DETAIL</small>
            </span>
            <span className="float-mark" aria-hidden="true">
              N
            </span>
          </div>
          <span className="hero-art-index">
            N° 01 <i aria-hidden="true" /> THE NEXUS SYSTEM
          </span>
        </div>
      </Reveal>
      <div className="hero-index" aria-hidden="true">
        <span>01</span>
        <i /> THE ART OF PLAY
      </div>
      <a className="scroll-cue" href="#features" aria-label="Scroll to features">
        <span>SCROLL TO EXPLORE</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}
