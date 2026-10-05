import { useEffect, useRef, useState } from 'react'
import { site } from '../config.js'
import { contactTopics } from '../data.js'
import Arrow from './Arrow.jsx'
import Reveal from './Reveal.jsx'

const emptyForm = { name: '', email: '', topic: contactTopics[0], message: '', company: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.message.trim().length < 10) errors.message = 'Tell us a little more (at least 10 characters).'
  return errors
}

const channel = site.formEndpoint ? 'endpoint' : site.contactEmail ? 'email' : 'none'

const statusText = {
  sending: 'Sending your message…',
  sent: 'Thank you — your message is on its way. We’ll reply by email.',
  mail: 'Your email app should open with the message ready to send.',
  error: 'Something went wrong while sending. Please try again in a moment.',
  none: 'Online messages aren’t switched on yet. Please check back soon.',
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const messageRef = useRef(null)

  // "Ask about this" in the setup dialog pre-fills the message.
  useEffect(() => {
    const onAsk = (event) => {
      setValues((current) => ({
        ...current,
        topic: contactTopics[1],
        message: current.message || `Hi! I’d like to know more about ${event.detail}.`,
      }))
      window.setTimeout(() => messageRef.current?.focus({ preventScroll: true }), 400)
    }
    window.addEventListener('nexus:ask', onAsk)
    return () => window.removeEventListener('nexus:ask', onAsk)
  }, [])

  const update = (field) => (event) => {
    const value = event.target.value
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (values.company) return // honeypot filled in: almost certainly a bot

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      event.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      topic: values.topic,
      message: values.message.trim(),
    }

    if (channel === 'endpoint') {
      setStatus('sending')
      try {
        const response = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        setStatus('sent')
        setValues(emptyForm)
      } catch {
        setStatus('error')
      }
      return
    }

    if (channel === 'email') {
      const subject = encodeURIComponent(`NEXUS — ${payload.topic}`)
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`)
      window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`
      setStatus('mail')
      return
    }

    setStatus('none')
  }

  const fieldProps = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  })

  const fieldError = (field) =>
    errors[field] && (
      <span className="field-error" id={`contact-${field}-error`}>
        {errors[field]}
      </span>
    )

  return (
    <section className="contact section-wrap" id="contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="contact-orbit orbit-one" aria-hidden="true" />
      <div className="contact-orbit orbit-two" aria-hidden="true" />

      <Reveal className="contact-intro">
        <p className="kicker">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2 id="contact-title">
          READY TO BUILD
          <br />
          YOUR SETUP<span className="accent">?</span>
        </h2>
        <p>Tell us how you play and what you need. We’ll help you plan a setup — or the next upgrade — that fits.</p>
        <ul className="contact-points">
          <li>Full builds, planned around your games</li>
          <li>Honest advice on single components</li>
          <li>Upgrade paths that make the most of what you have</li>
        </ul>
        {site.contactEmail && (
          <a className="text-link" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail} <Arrow />
          </a>
        )}
      </Reveal>

      <Reveal className="contact-card" delay={90}>
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="field-row">
            <label className="field">
              <span>Name</span>
              <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
              {fieldError('name')}
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" {...fieldProps('email')} />
              {fieldError('email')}
            </label>
          </div>
          <label className="field">
            <span>I’m interested in</span>
            <select {...fieldProps('topic')}>
              {contactTopics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Message</span>
            <textarea
              ref={messageRef}
              rows={5}
              placeholder="Games you play, budget, what you already own…"
              {...fieldProps('message')}
            />
            {fieldError('message')}
          </label>
          <label className="field-honeypot" aria-hidden="true">
            Company
            <input type="text" tabIndex={-1} autoComplete="off" {...fieldProps('company')} />
          </label>
          <div className="form-footer">
            <button className="button button-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <Arrow />
            </button>
            <p className={`form-status form-status-${status}`} role="status" aria-live="polite">
              {statusText[status] || ''}
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  )
}
