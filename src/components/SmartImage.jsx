import { useState } from 'react'

// An <img> that shows a quiet branded placeholder if the photo fails to load,
// so a missing remote image never leaves a broken icon on the page.
export default function SmartImage({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`image-fallback ${className}`.trim()} role="img" aria-label={alt}>
        <span aria-hidden="true">N</span>
      </span>
    )
  }

  return <img src={src} alt={alt} className={className || undefined} decoding="async" onError={() => setFailed(true)} {...rest} />
}
