import { useEffect, useRef } from 'react'
import './BackgroundDrawer.css'

export interface BackgroundOption {
  id: string
  source: string
  title: string
}

export function BackgroundDrawer({
  ariaLabel = 'Background picker',
  eyebrow = 'Gallery',
  isOpen,
  onClose,
  onSelect,
  options,
  selectedSource,
  title = 'Background',
}: {
  ariaLabel?: string
  eyebrow?: string
  isOpen: boolean
  onClose: () => void
  onSelect: (source: string) => void
  options: BackgroundOption[]
  selectedSource: string
  title?: string
}) {
  const panelRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    window.requestAnimationFrame(() => {
      const selectedButton = panelRef.current?.querySelector<HTMLButtonElement>(
        '.background-drawer__option[data-selected="true"]',
      )
      const firstButton = panelRef.current?.querySelector<HTMLButtonElement>('.background-drawer__option')
      const buttonToFocus = selectedButton ?? firstButton
      buttonToFocus?.focus()
    })
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="background-drawer" aria-label={ariaLabel}>
      <button
        type="button"
        className="background-drawer__scrim"
        aria-label="Close background picker"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className="background-drawer__panel glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="background-drawer-title"
      >
        <div className="background-drawer__header">
          <div>
            <p className="background-drawer__eyebrow">{eyebrow}</p>
            <h2 id="background-drawer-title" className="background-drawer__title">
              {title}
            </h2>
          </div>
          <button type="button" className="background-drawer__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="background-drawer__grid">
          {options.map(option => (
            <button
              key={option.id}
              type="button"
              className="background-drawer__option"
              data-selected={option.source === selectedSource ? 'true' : 'false'}
              onClick={() => onSelect(option.source)}
            >
              <img className="background-drawer__image" src={option.source} alt="" loading="lazy" />
              <span className="background-drawer__name">{option.title}</span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  )
}
