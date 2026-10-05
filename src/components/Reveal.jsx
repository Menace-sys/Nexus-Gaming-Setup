import { useEffect, useRef, useState } from 'react'

const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window

// Fades content in the first time it scrolls into view.
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(!canObserve)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag ref={ref} style={{ '--delay': `${delay}ms` }} className={`reveal ${visible ? 'revealed' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
