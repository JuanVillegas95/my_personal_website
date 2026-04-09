import { useState, type ReactNode } from 'react'

interface ToolbarItem {
  id: string
  label: string
  active?: boolean
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
]

export function BottomBar() {
  const [label, setLabel] = useState('')

  return (
    <div className="app-toolbar-shell">
      <div className="app-toolbar__label" data-visible={label ? 'true' : 'false'}>{label}</div>
      <nav className="app-toolbar glass" aria-label="Quick actions">
        {toolbarItems.map(item => (
          <button
            key={item.id}
            type="button"
            className={`app-toolbar__item ${item.active ? 'app-toolbar__item--active' : ''}`}
            aria-label={item.label}
            aria-pressed={item.active ? 'true' : 'false'}
            onMouseEnter={() => setLabel(item.label)}
            onFocus={() => setLabel(item.label)}
            onMouseLeave={() => setLabel('')}
            onBlur={() => setLabel('')}
          >
            <span className="app-toolbar__icon">{item.icon}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
