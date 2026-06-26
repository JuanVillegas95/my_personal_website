import './TopBar.css'

const partyAvatars = ['ruby', 'mint', 'sky', 'violet', 'gold']

export function TopBar({
  currentPage,
  now,
  onOpenChat,
  pageCount,
}: {
  currentPage: number
  now: Date
  onOpenChat: () => void
  pageCount: number
}) {
  const pageLabel = `Gallery page ${currentPage + 1} of ${pageCount}`

  return (
    <header className="top-bar">
      <div className="top-bar__cluster top-bar__cluster--left glass">
        <button
          type="button"
          className="top-bar__shoulder top-bar__shoulder--left top-bar__shoulder--button"
          aria-label="Open chat"
          onClick={onOpenChat}
        >
          Chat
        </button>

        <div className="top-bar__party" aria-label="Recent media">
          {partyAvatars.map(avatar => (
            <span
              key={avatar}
              className={`top-bar__party-avatar top-bar__party-avatar--${avatar}`}
            />
          ))}
        </div>
      </div>

      <div className="top-bar__pager glass" aria-label={pageLabel}>
        {Array.from({ length: pageCount }, (_, index) => (
          <span
            key={index}
            className="top-bar__dot"
            data-active={index === currentPage ? 'true' : 'false'}
          />
        ))}
      </div>

      <div className="top-bar__cluster top-bar__cluster--right">
        <span className="top-bar__shoulder top-bar__shoulder--right">RT</span>

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
          <span className="top-bar__battery-text">100%</span>
          <span className="top-bar__battery" aria-hidden="true">
            <span className="top-bar__battery-level" />
          </span>
        </div>

        <div className="top-bar__profile" aria-hidden="true">
          <img className="top-bar__profile-icon" src="/images/monke.png" alt="" />
        </div>
      </div>
    </header>
  )
}
