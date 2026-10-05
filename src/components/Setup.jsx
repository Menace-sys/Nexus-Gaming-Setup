import { useState } from 'react'
import { components } from '../data.js'
import Arrow from './Arrow.jsx'
import Modal from './Modal.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import SmartImage from './SmartImage.jsx'

function ComponentCard({ item, onOpen }) {
  return (
    <article className="component-card">
      <div className="component-image">
        <SmartImage src={item.image} alt="" loading="lazy" />
        <span className="image-number">{item.type}</span>
      </div>
      <div className="component-info">
        <div>
          <h3>
            <button type="button" className="stretched-button" onClick={onOpen} aria-haspopup="dialog">
              {item.name}
            </button>
          </h3>
          <p>{item.desc}</p>
        </div>
        <span className="card-arrow" aria-hidden="true">
          <Arrow diagonal />
        </span>
      </div>
    </article>
  )
}

function ComponentDetail({ item, onAsk }) {
  return (
    <div className="detail">
      <div className="detail-image">
        <SmartImage src={item.imageLarge} alt={`${item.name} — ${item.desc}`} />
      </div>
      <div className="detail-content">
        <p className="kicker">{item.type}</p>
        <h3 id="component-dialog-title">{item.name}</h3>
        <p className="detail-story">{item.story}</p>
        <ul className="detail-list">
          {item.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <a
          className="button button-primary"
          href="#contact"
          onClick={(event) => {
            event.preventDefault()
            onAsk()
          }}
        >
          Ask about this <Arrow />
        </a>
      </div>
    </div>
  )
}

export default function Setup() {
  const [selected, setSelected] = useState(null)
  const close = () => setSelected(null)

  // Close the dialog first (it locks scrolling), then go to the contact form
  // with this component already mentioned in the message.
  const askAbout = (item) => {
    close()
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('nexus:ask', { detail: item.name }))
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  return (
    <section className="section section-wrap" id="setup" aria-labelledby="setup-title">
      <Reveal>
        <SectionHeading
          id="setup-title"
          kicker="EVERY DETAIL, IN ITS PLACE"
          title={
            <>
              The setup<span className="accent">.</span>
            </>
          }
          note="Five essentials. One seamless experience. Each piece selected to work beautifully on its own—and better together."
        />
      </Reveal>
      <div className="component-grid">
        {components.map((item, i) => (
          <Reveal key={item.name} className={`component-slot ${item.tall ? 'component-tall' : ''}`} delay={i * 55}>
            <ComponentCard item={item} onOpen={() => setSelected(item)} />
          </Reveal>
        ))}
      </div>
      <Modal open={Boolean(selected)} onClose={close} labelledBy="component-dialog-title" className="modal-detail">
        {selected && <ComponentDetail item={selected} onAsk={() => askAbout(selected)} />}
      </Modal>
    </section>
  )
}
