import type { ReactNode } from 'react'
import './BottomBar.css'

interface ToolbarItem {
  id: string
  label: string
  active?: boolean
  href?: string
  icon: ReactNode
}

const toolbarItems: ToolbarItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 11.3L12 4l8 7.3V20a1 1 0 0 1-1 1h-5.5v-6H10.5v6H5a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="5.2" width="6.2" height="5.8" rx="1.3" />
        <rect x="13.3" y="5.2" width="6.2" height="5.8" rx="1.3" />
        <rect x="4.5" y="13" width="6.2" height="5.8" rx="1.3" />
        <path d="M13.3 15.9h6.2" />
        <path d="M13.3 19h6.2" />
      </svg>
    ),
  },
  {
    id: 'entries',
    label: 'Entries',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.2 4.7h6.8L19 8.6v10.7a1 1 0 0 1-1 1H8.2a1 1 0 0 1-1-1V5.7a1 1 0 0 1 1-1Z" />
        <path d="M14.9 4.9v3.2h3.2" />
        <path d="M10 11h5.8" />
        <path d="M10 14h5.8" />
        <path d="M10 17h4.1" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About Me',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8.6" r="3" />
        <path d="M6.5 19c0-3 2.5-5.4 5.5-5.4s5.5 2.4 5.5 5.4" />
        <path d="M4.5 20h15" />
      </svg>
    ),
  },
  {
    id: 'library',
    label: 'Library',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="2.1" />
        <circle cx="12" cy="6.5" r="2.1" />
        <circle cx="17.5" cy="6.5" r="2.1" />
        <circle cx="6.5" cy="12" r="2.1" />
        <circle cx="12" cy="12" r="2.1" />
        <circle cx="17.5" cy="12" r="2.1" />
        <circle cx="6.5" cy="17.5" r="2.1" />
        <circle cx="12" cy="17.5" r="2.1" />
        <circle cx="17.5" cy="17.5" r="2.1" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/juan-villegas97/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.4" y="4.6" width="15.2" height="14.8" rx="2.2" />
        <path d="M8 10.4v5.7" />
        <path d="M8 7.9v.1" />
        <path d="M11.4 16.1v-5.7" />
        <path d="M11.4 12.9c.5-1 1.3-1.6 2.5-1.6 1.6 0 2.7 1.1 2.7 3.1v1.7" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/JuanVillegas95',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 19.1c-4 1.2-4-2-5.6-2.4" />
        <path d="M15 21v-3.4c0-1 .1-1.4-.5-2 2.6-.3 5.4-1.3 5.4-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.3 1.2a11.2 11.2 0 0 0-6 0C7 3.3 6 3.6 6 3.6a4.2 4.2 0 0 0-.1 3.1 4.5 4.5 0 0 0-1.2 3.1c0 4.5 2.8 5.5 5.4 5.8-.4.4-.6 1-.6 1.8V21" />
      </svg>
    ),
  },
  {
    id: 'certification',
    label: 'Generative AI at Work Certification',
    href: 'https://www.credly.com/badges/3a82184f-987e-4230-9f88-ed3d75869f1a/public_url',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.8 4.8h10.4v5.6a6.2 6.2 0 1 1-10.4 0V4.8Z" />
        <path d="M9.2 8.1h5.6" />
        <path d="M9.8 11.2h4.4" />
        <path d="M10 19.1 8.8 22l3.2-1.5 3.2 1.5-1.2-2.9" />
        <path d="M12 14.4v.1" />
      </svg>
    ),
  },
]

function ControlHint({ control, label }: { control: string; label: string }) {
  return (
    <span className="control-hint">
      <span className="control-hint__key">{control}</span>
      <span className="control-hint__label">{label}</span>
    </span>
  )
}

export function BottomBar() {
  return (
    <footer className="bottom-bar">
      <div className="control-hints control-hints--left glass" aria-label="Secondary controls">
        <ControlHint control="B" label="Back" />
        <ControlHint control="-" label="Details" />
      </div>

      <nav className="app-toolbar glass" aria-label="Quick actions">
        {toolbarItems.map(item => {
          const className = `app-toolbar__item ${item.active ? 'app-toolbar__item--active' : ''}`

          if (item.href) {
            return (
              <a
                key={item.id}
                className={className}
                href={item.href}
                aria-label={item.label}
                title={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="app-toolbar__icon">{item.icon}</span>
              </a>
            )
          }

          return (
            <button
              key={item.id}
              type="button"
              className={className}
              aria-label={item.label}
              aria-pressed={item.active ? 'true' : 'false'}
              title={item.label}
            >
              <span className="app-toolbar__icon">{item.icon}</span>
            </button>
          )
        })}
      </nav>

      <div className="control-hints control-hints--right glass" aria-label="Primary controls">
        <ControlHint control="A" label="Select" />
        <ControlHint control="+" label="Menu" />
      </div>
    </footer>
  )
}
