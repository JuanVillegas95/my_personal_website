import type { ReactNode } from 'react'
import './BottomBar.css'

interface ToolbarItem {
  id: string
  label: string
  active?: boolean
  href?: string
  icon: ReactNode
  pageIndex?: number
}

const toolbarItems: ToolbarItem[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: 'https://about-me-azo.pages.dev',
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
    id: 'mail',
    label: 'Mail',
    href: 'mailto:juanemail2001@gmail.com?subject=Contact%20from%20portfolio%20website&body=Hello%20Juan%2C%0A%0AI%27m%20contacting%20you%20from%20your%20personal%20portfolio%20website.%0A%0A',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2.2" />
        <path d="m5.2 7.5 6.8 5.2 6.8-5.2" />
        <path d="m5.5 16.4 4.2-3.3" />
        <path d="m18.5 16.4-4.2-3.3" />
      </svg>
    ),
  },
  {
    id: 'home',
    label: 'Projects',
    pageIndex: 0,
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
    id: 'projects',
    label: 'Home',
    pageIndex: 1,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 11.3L12 4l8 7.3V20a1 1 0 0 1-1 1h-5.5v-6H10.5v6H5a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    id: 'media-grid',
    label: 'Educational Achievements',
    pageIndex: 2,
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
]

function ControlHint({
  ariaLabel,
  control,
  label,
  onClick,
}: {
  ariaLabel?: string
  control: string
  label: string
  onClick?: () => void
}) {
  const content = (
    <>
      <span className="control-hint__key">{control}</span>
      <span className="control-hint__label">{label}</span>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className="control-hint control-hint--button"
        aria-label={ariaLabel ?? label}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  return (
    <span className="control-hint">
      {content}
    </span>
  )
}

export function BottomBar({
  currentPage,
  onOpenBackgroundPicker,
  onOpenGridBackgroundPicker,
  onPageChange,
  pageCount,
}: {
  currentPage: number
  onOpenBackgroundPicker: () => void
  onOpenGridBackgroundPicker: () => void
  onPageChange: (page: number) => void
  pageCount: number
}) {
  return (
    <footer className="bottom-bar">
      <div className="control-hints control-hints--left glass" aria-label="Secondary controls">
        <ControlHint
          ariaLabel="Change background"
          control="B"
          label="Background"
          onClick={onOpenBackgroundPicker}
        />
        <ControlHint
          ariaLabel="Change grid background"
          control="-"
          label="Grid BG"
          onClick={onOpenGridBackgroundPicker}
        />
      </div>

      <nav className="app-toolbar glass" aria-label="Quick actions">
        {toolbarItems.map(item => {
          const itemPageIndex = typeof item.pageIndex === 'number' ? Math.min(item.pageIndex, pageCount - 1) : undefined
          const isActive = item.active || itemPageIndex === currentPage
          const className = `app-toolbar__item ${isActive ? 'app-toolbar__item--active' : ''}`

          if (item.href) {
            const opensNewTab = !item.href.startsWith('mailto:')

            return (
              <a
                key={item.id}
                className={className}
                href={item.href}
                aria-label={item.label}
                title={item.label}
                target={opensNewTab ? '_blank' : undefined}
                rel={opensNewTab ? 'noopener noreferrer' : undefined}
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
              aria-pressed={isActive ? 'true' : 'false'}
              title={item.label}
              onClick={itemPageIndex === undefined ? undefined : () => onPageChange(itemPageIndex)}
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
