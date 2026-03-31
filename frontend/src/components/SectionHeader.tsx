import type { ReactNode } from 'react'
import './SectionHeader.css'

export function SectionHeader({
  title,
  onReturn,
  action,
}: {
  title: string
  onReturn?: () => void
  action?: ReactNode
}) {
  return (
    <div className="section-header">
      {onReturn && (
        <button type="button" className="back-btn" onClick={onReturn}>
          <span className="back-btn__icon" aria-hidden="true">&larr;</span>
          <span className="back-btn__label">return</span>
        </button>
      )}
      <h2 className="section-title">{title}</h2>
      {action}
    </div>
  )
}
