import { features } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Features() {
  return (
    <section className="features section-wrap" id="features" aria-label="Setup highlights">
      {features.map((item, i) => (
        <Reveal key={item.title} delay={i * 70}>
          <article className="feature">
            <span className="feature-icon" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </section>
  )
}
