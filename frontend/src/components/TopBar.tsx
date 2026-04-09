import './TopBar.css'

export function TopBar({ now, title }: { now: Date; title: string }) {
  return (
    <header className="top-bar">
      <div className="top-bar__cluster top-bar__cluster--left glass">
        <span className="top-bar__party-count">+4</span>

        <div className="top-bar__party" aria-hidden="true">
          <span className="top-bar__party-avatar top-bar__party-avatar--gold" />
          <span className="top-bar__party-avatar top-bar__party-avatar--coral" />
          <span className="top-bar__party-avatar top-bar__party-avatar--sky" />
          <span className="top-bar__party-avatar top-bar__party-avatar--sand" />
        </div>
      </div>

      <div className="top-bar__title-shell glass">
        <span className="top-bar__title">{title}</span>
      </div>

      <div className="top-bar__cluster top-bar__cluster--right">
        <div className="top-bar__status glass">
          <span className="top-bar__status-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 4.8a5.1 5.1 0 0 0-5.1 5.1v3.1c0 .8-.3 1.5-.9 2.1l-.8.8h13.6l-.8-.8a3 3 0 0 1-.9-2.1V9.9A5.1 5.1 0 0 0 12 4.8Z" />
              <path d="M10 18.1a2.2 2.2 0 0 0 4 0" />
            </svg>
          </span>

          <span className="top-bar__time">
            {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
          <span className="top-bar__sep">|</span>
          <span className="top-bar__date">
            {now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
          </span>
          <span className="top-bar__battery" aria-hidden="true">
            <span className="top-bar__battery-level" />
          </span>
        </div>

        <div className="top-bar__profile" aria-hidden="true">
          <span className="top-bar__profile-mark">JV</span>
        </div>
      </div>
    </header>
  )
}
