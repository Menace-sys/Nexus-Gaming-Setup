import { useEffect, useRef } from 'react'

// Accessible modal built on the native <dialog> element: it traps focus,
// closes on Escape, returns focus to the opener and locks page scrolling.
export default function Modal({ open, onClose, labelledBy, className = '', onKeyDown, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return undefined
    const root = document.documentElement
    if (open) {
      if (!dialog.open) dialog.showModal()
      root.classList.add('scroll-locked')
    } else if (dialog.open) {
      dialog.close()
    }
    return () => root.classList.remove('scroll-locked')
  }, [open])

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`.trim()}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
    >
      {open && (
        <div className="modal-body">
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          {children}
        </div>
      )}
    </dialog>
  )
}
