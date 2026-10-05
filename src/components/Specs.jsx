import { specs } from '../data.js'
import Arrow from './Arrow.jsx'
import Reveal from './Reveal.jsx'

export default function Specs() {
  return (
    <section className="specs-section" id="specs" aria-labelledby="specs-title">
      <div className="section-wrap specs-layout">
        <Reveal className="specs-intro">
          <p className="kicker">POWER, WITH PURPOSE</p>
          <h2 id="specs-title">
            Under the
            <br />
            surface<span className="accent">.</span>
          </h2>
          <p>Quietly capable. Relentlessly consistent. Every component chosen for the whole, not just the headline.</p>
          <a className="text-link" href="#gallery">
            See it in its element <Arrow />
          </a>
          <div className="spec-orbit" aria-hidden="true">
            <span>
              N<span>×</span>
            </span>
            <i />
            <i />
            <i />
          </div>
        </Reveal>
        <div className="spec-list">
          {specs.map(([label, name, detail], i) => (
            <Reveal key={label} delay={i * 65}>
              <div className="spec-row">
                <span className="spec-label">{label}</span>
                <div className="spec-value">
                  <strong>{name}</strong>
                  <span>{detail}</span>
                </div>
                <span className="spec-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
