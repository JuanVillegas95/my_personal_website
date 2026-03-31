import { SectionHeader } from './SectionHeader'
import { SectionPanel } from './SectionPanel'
import './AboutSection.css'

export function AboutSection({ onReturn }: { onReturn: () => void }) {
  return (
    <SectionPanel>
      <SectionHeader title="about me" onReturn={onReturn} />
      <div className="about-content">
        <div className="about-card">
          <h3>hey there</h3>
          <p>
            welcome to my personal space on the internet. this is where i keep
            track of things i care about - music, code, games, and everything in
            between.
          </p>
        </div>
        <div className="about-card">
          <h3>what is this?</h3>
          <p>
            a personal website built from scratch. no templates, no frameworks
            (well, just react). a place to organize my thoughts, projects, and
            creative output.
          </p>
        </div>
      </div>
    </SectionPanel>
  )
}
