export type SectionId = 'home' | 'about' | 'entries' | 'code' | 'projects' | 'gallery' | 'contact'
export type NavigableSectionId = Exclude<SectionId, 'home'>

export interface Category {
  id: NavigableSectionId
  label: string
  icon: string
  accent: string
}

export const categories: readonly Category[] = [
  { id: 'about', label: 'About\nMe', icon: '👤', accent: '✨' },
  { id: 'entries', label: 'Entries', icon: '📂', accent: '📝' },
  { id: 'code', label: 'Code', icon: '💻', accent: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🧩', accent: '🚀' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️', accent: '⭐' },
  { id: 'contact', label: 'Contact', icon: '✉️', accent: '☎️' },
]

export const headerTitles: Record<SectionId, string> = {
  home: 'Welcome!',
  about: 'Profile Overview',
  entries: 'Entry Archive',
  code: 'Code Releases',
  projects: 'Project Showcase',
  gallery: 'Gallery Collection',
  contact: 'Contact Details',
}
