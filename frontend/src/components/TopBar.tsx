import './TopBar.css'

export function TopBar({ now, title }: { now: Date; title: string }) {
  return (
    <header className="top-bar">
      <div className="top-bar__left glass">
        <span className="top-bar__title">{title}</span>
      </div>

      <div className="top-bar__right">
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
    </header>
  )
}
