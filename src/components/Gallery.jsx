import { useState } from 'react'
import { gallery } from '../data.js'
import Arrow from './Arrow.jsx'
import Modal from './Modal.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import SmartImage from './SmartImage.jsx'

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const isOpen = index !== null
  const current = isOpen ? gallery[index] : null
  const step = (delta) => setIndex((value) => (value + delta + gallery.length) % gallery.length)

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') step(1)
    if (event.key === 'ArrowLeft') step(-1)
  }

  return (
    <section className="section section-wrap gallery-section" id="gallery" aria-labelledby="gallery-title">
      <Reveal>
        <SectionHeading
          id="gallery-title"
          kicker="A CLOSER LOOK"
          title={
            <>
              In the zone<span className="accent">.</span>
            </>
          }
          note="A little more than a place to play. A space that feels like yours."
        />
      </Reveal>
      <div className="gallery-grid">
        {gallery.map((image, i) => (
          <Reveal key={image.label} className={`gallery-slot gallery-${image.layout}`} delay={i * 70}>
            <figure className="gallery-card">
              <button
                type="button"
                className="gallery-open"
                onClick={() => setIndex(i)}
                aria-haspopup="dialog"
                aria-label={`View larger: ${image.label.toLowerCase()}`}
              >
                <SmartImage src={image.src} alt={image.alt} loading="lazy" />
              </button>
              <figcaption>
                <span>{image.label}</span>
                <Arrow diagonal />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIndex(null)}
        labelledBy="lightbox-caption"
        className="modal-lightbox"
        onKeyDown={onKeyDown}
      >
        {current && (
          <figure className="lightbox">
            <div className="lightbox-frame">
              <SmartImage key={current.full} src={current.full} alt={current.alt} />
            </div>
            <figcaption>
              <span id="lightbox-caption">{current.label}</span>
              <span className="lightbox-count">
                {index + 1} / {gallery.length}
              </span>
              <span className="lightbox-nav">
                <button type="button" onClick={() => step(-1)} aria-label="Previous image">
                  <span aria-hidden="true">←</span>
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next image">
                  <span aria-hidden="true">→</span>
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  )
}
