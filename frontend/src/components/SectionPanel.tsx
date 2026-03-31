import type { ReactNode } from 'react'
import './SectionPanel.css'

export function SectionPanel({ children }: { children: ReactNode }) {
  return <div className="section-panel glass">{children}</div>
}
