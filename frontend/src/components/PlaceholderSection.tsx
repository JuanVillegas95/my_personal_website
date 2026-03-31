import { SectionHeader } from './SectionHeader'
import { SectionPanel } from './SectionPanel'
import './PlaceholderSection.css'

const icons: Record<string, string> = {
  code: '💻',
  projects: '🧩',
  gallery: '🖼',
  contact: '✉️',
}

export function PlaceholderSection({
  id,
  onReturn,
}: {
  id: string
  onReturn: () => void
}) {
  return (
    <SectionPanel>
      <SectionHeader title={id} onReturn={onReturn} />
      <div className="placeholder-content">
        <div className="placeholder-icon">{icons[id] ?? '📁'}</div>
        <p className="placeholder-text">coming soon</p>
      </div>
    </SectionPanel>
  )
}
