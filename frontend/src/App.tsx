import { useState, useEffect, type ReactNode } from 'react'
import './App.css'

const categories = [
  { id: 'about', label: 'About\nMe', icon: '👤', accent: '✨' },
  { id: 'entries', label: 'Entries', icon: '📂', accent: '📝' },
  { id: 'code', label: 'Code', icon: '💻', accent: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🧩', accent: '🚀' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️', accent: '⭐' },
  { id: 'contact', label: 'Contact', icon: '✉️', accent: '☎️' },
] as const

type SectionId = 'home' | 'about' | 'entries' | 'code' | 'projects' | 'gallery' | 'contact'

const headerTitles: Record<SectionId, string> = {
  home: 'Featured Community Submissions',
  about: 'Profile Overview',
  entries: 'Entry Archive',
  code: 'Code Releases',
  projects: 'Project Showcase',
  gallery: 'Gallery Collection',
  contact: 'Contact Details',
}

// ── Entries types & section ───────────────────────────────

interface Entry {
  id: number
  title: string
  link: string
  description: string
  createdAt: string
}

interface EntryForm {
  title: string
  link: string
  description: string
}

function SectionHeader({
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

function EntriesSection({ onReturn }: { onReturn: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [form, setForm] = useState<EntryForm>({ title: '', link: '', description: '' })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<EntryForm>({ title: '', link: '', description: '' })

  useEffect(() => {
    fetch('http://localhost:8080/api/entries')
      .then(r => r.json())
      .then(data => setEntries(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    setLoading(true)
    fetch('http://localhost:8080/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(r => r.json())
      .then((created: Entry) => {
        setEntries(prev => [...prev, created])
        setForm({ title: '', link: '', description: '' })
        setShowForm(false)
      })
      .finally(() => setLoading(false))
  }

  function handleDelete(id: number) {
    fetch(`http://localhost:8080/api/entries/${id}`, { method: 'DELETE' })
      .then(() => setEntries(prev => prev.filter(e => e.id !== id)))
      .catch(() => {})
  }

  function startEdit(entry: Entry) {
    setEditingId(entry.id)
    setEditForm({ title: entry.title, link: entry.link ?? '', description: entry.description ?? '' })
  }

  function handleEditSubmit(e: React.FormEvent, id: number) {
    e.preventDefault()
    fetch(`http://localhost:8080/api/entries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(r => r.json())
      .then((updated: Entry) => {
        setEntries(prev => prev.map(e => e.id === id ? updated : e))
        setEditingId(null)
      })
      .catch(() => {})
  }

  return (
    <div className="section-panel glass">
      <SectionHeader
        title="entries"
        onReturn={onReturn}
        action={(
          <button type="button" className="btn btn--primary" onClick={() => setShowForm(v => !v)}>
            {showForm ? 'cancel' : '+ new'}
          </button>
        )}
      />

      {showForm && (
        <form className="entry-form" onSubmit={handleSubmit}>
          <input className="entry-input" type="text" placeholder="title *" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          <input className="entry-input" type="url" placeholder="link (https://...)" value={form.link}
            onChange={e => setForm(f => ({ ...f, link: e.target.value }))} />
          <textarea className="entry-input entry-textarea" placeholder="description" value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'saving...' : 'save entry'}
          </button>
        </form>
      )}

      <div className="entries-list">
        {entries.length === 0 && <p className="entries-empty">no entries yet.</p>}
        {entries.map(entry => (
          <div key={entry.id} className="entry-card">
            {editingId === entry.id ? (
              <form className="entry-form entry-form--inline" onSubmit={e => handleEditSubmit(e, entry.id)}>
                <input className="entry-input" type="text" placeholder="title *" value={editForm.title}
                  onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} required />
                <input className="entry-input" type="url" placeholder="link (https://...)" value={editForm.link}
                  onChange={e => setEditForm(f => ({ ...f, link: e.target.value }))} />
                <textarea className="entry-input entry-textarea" placeholder="description" value={editForm.description}
                  onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} rows={2} />
                <div className="entry-card__actions">
                  <button className="btn btn--primary" type="submit">save</button>
                  <button className="btn btn--ghost" type="button" onClick={() => setEditingId(null)}>cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="entry-card__title">
                  {entry.link
                    ? <a href={entry.link} target="_blank" rel="noopener noreferrer">{entry.title}</a>
                    : <span>{entry.title}</span>}
                </div>
                {entry.description && <p className="entry-card__desc">{entry.description}</p>}
                <div className="entry-card__actions">
                  <button className="btn btn--ghost" onClick={() => startEdit(entry)}>edit</button>
                  <button className="btn btn--danger" onClick={() => handleDelete(entry.id)}>delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── About Section ─────────────────────────────────────────

function AboutSection({ onReturn }: { onReturn: () => void }) {
  return (
    <div className="section-panel glass">
      <SectionHeader title="about me" onReturn={onReturn} />
      <div className="about-content">
        <div className="about-card">
          <h3>hey there</h3>
          <p>welcome to my personal space on the internet. this is where i keep track of things i care about — music, code, games, and everything in between.</p>
        </div>
        <div className="about-card">
          <h3>what is this?</h3>
          <p>a personal website built from scratch. no templates, no frameworks (well, just react). a place to organize my thoughts, projects, and creative output.</p>
        </div>
      </div>
    </div>
  )
}

// ── Placeholder Sections ──────────────────────────────────

function PlaceholderSection({ id, onReturn }: { id: string, onReturn: () => void }) {
  const icons: Record<string, string> = {
    code: '💻', projects: '🧩', gallery: '🖼', contact: '✉️',
  }
  return (
    <div className="section-panel glass">
      <SectionHeader title={id} onReturn={onReturn} />
      <div className="placeholder-content">
        <div className="placeholder-icon">{icons[id] ?? '📁'}</div>
        <p className="placeholder-text">coming soon</p>
      </div>
    </div>
  )
}

// ── Home Section ──────────────────────────────────────────

interface GuestComment {
  id: number
  theme: 'sonic' | 'ananta' | 'shopii' | 'etland' | 'icons'
  title: string
  avatar: string
  text: string
  preview: string
  accent: string
  stats: {
    likes: number
    replies: number
    favorites: number
  }
}

const guestComments: GuestComment[] = [
  {
    id: 1,
    theme: 'sonic',
    title: 'Sonic Bundle',
    avatar: '🐤',
    text: 'got that sonic mega collection iykyk u ki',
    preview: 'S',
    accent: '💨',
    stats: { likes: 38, replies: 9, favorites: 42 },
  },
  {
    id: 2,
    theme: 'ananta',
    title: 'Ananta Set',
    avatar: '🦔',
    text: "Here's all the media I made for ANANTA <3",
    preview: 'A',
    accent: '✨',
    stats: { likes: 38, replies: 7, favorites: 42 },
  },
  {
    id: 3,
    theme: 'shopii',
    title: 'Shopii BGM',
    avatar: '🐢',
    text: 'new iisu BGM for the Shopii menu',
    preview: 'S',
    accent: '🔊',
    stats: { likes: 223, replies: 80, favorites: 114 },
  },
  {
    id: 4,
    theme: 'etland',
    title: 'ET Land',
    avatar: '🪐',
    text: 'OMG OMG official ET Land theme is here!!',
    preview: 'ET',
    accent: '🐱',
    stats: { likes: 49, replies: 5, favorites: 13 },
  },
  {
    id: 5,
    theme: 'icons',
    title: 'Icons Pack',
    avatar: '🌑',
    text: "I got icons y'all pls don't sleep on these",
    preview: '★',
    accent: '🎮',
    stats: { likes: 92, replies: 17, favorites: 33 },
  },
  {
    id: 6,
    theme: 'sonic',
    title: 'Blue Rush Icons',
    avatar: '🐣',
    text: 'the sonic folder set finally matches the menu now',
    preview: 'S',
    accent: '🎵',
    stats: { likes: 74, replies: 18, favorites: 55 },
  },
  {
    id: 7,
    theme: 'shopii',
    title: 'Arcade Loop',
    avatar: '🐸',
    text: 'left this menu loop on for an hour no regrets',
    preview: 'S',
    accent: '🎧',
    stats: { likes: 141, replies: 29, favorites: 88 },
  },
  {
    id: 8,
    theme: 'etland',
    title: 'Pastel Pets',
    avatar: '🐰',
    text: 'these little ET critters are way too cute pls',
    preview: 'ET',
    accent: '🌸',
    stats: { likes: 63, replies: 12, favorites: 24 },
  },
  {
    id: 9,
    theme: 'ananta',
    title: 'Ananta Icons',
    avatar: '🪽',
    text: 'new badge pack plus splash screens are zipped and ready',
    preview: 'A',
    accent: '🗂',
    stats: { likes: 87, replies: 21, favorites: 40 },
  },
  {
    id: 10,
    theme: 'icons',
    title: 'Pixel Drops',
    avatar: '🌘',
    text: 'tiny icon dump for anyone updating their folders tonight',
    preview: '★',
    accent: '✨',
    stats: { likes: 58, replies: 14, favorites: 36 },
  },
  {
    id: 11,
    theme: 'sonic',
    title: 'Chao Mail',
    avatar: '🐥',
    text: 'mail bubble remake is up if you want the png set',
    preview: 'S',
    accent: '📬',
    stats: { likes: 69, replies: 16, favorites: 31 },
  },
  {
    id: 12,
    theme: 'shopii',
    title: 'Menu FX',
    avatar: '🦊',
    text: 'added a click pack and startup chime for the theme',
    preview: 'S',
    accent: '⚡',
    stats: { likes: 116, replies: 26, favorites: 70 },
  },
]

function GuestCommentCard({
  comment,
  ariaHidden = false,
}: {
  comment: GuestComment
  ariaHidden?: boolean
}) {
  return (
    <article
      className={`comment-card comment-card--${comment.theme}`}
      aria-hidden={ariaHidden || undefined}
    >
      <div className="comment-card__tab">
        <div className="comment-card__title">{comment.title}</div>
      </div>

      <div className="comment-card__avatar" aria-hidden="true">{comment.avatar}</div>

      <div className="comment-card__body">
        <p className="comment-card__text">{comment.text}</p>
        <div className="comment-card__preview" aria-hidden="true">
          <span className="comment-card__preview-icon">{comment.preview}</span>
          <span className="comment-card__preview-accent">{comment.accent}</span>
        </div>
      </div>

      <div
        className="comment-card__stats"
        aria-label={`${comment.stats.likes} likes, ${comment.stats.replies} replies, ${comment.stats.favorites} favorites`}
      >
        <span className="comment-card__stat">✦ {comment.stats.likes}</span>
        <span className="comment-card__stat">♡ {comment.stats.replies}</span>
        <span className="comment-card__stat">♦ {comment.stats.favorites}</span>
      </div>
    </article>
  )
}

function HomeSection({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="home">
      <div className="home-comments-row">
        <div className="home-comments-track">
          <div className="home-comments-group">
            {guestComments.map(comment => (
              <GuestCommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          <div className="home-comments-group" aria-hidden="true">
            {guestComments.map(comment => (
              <GuestCommentCard key={`loop-${comment.id}`} comment={comment} ariaHidden />
            ))}
          </div>
        </div>
      </div>

      <div className="home-categories" aria-label="Site sections">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            className={`cat-card cat-card--${cat.id}`}
            onClick={() => onNavigate(cat.id)}
          >
            <span className="cat-card__label">{cat.label}</span>
            <span className="cat-card__art" aria-hidden="true">
              <span className="cat-card__sticker cat-card__sticker--main">{cat.icon}</span>
              <span className="cat-card__sticker cat-card__sticker--accent">{cat.accent}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const now = new Date()
  const handleReturnHome = () => setActiveSection('home')

  function renderMain() {
    switch (activeSection) {
      case 'home': return <HomeSection onNavigate={setActiveSection} />
      case 'about': return <AboutSection onReturn={handleReturnHome} />
      case 'entries': return <EntriesSection onReturn={handleReturnHome} />
      default: return <PlaceholderSection id={activeSection} onReturn={handleReturnHome} />
    }
  }

  return (
    <div className="shell">
      <div className="top-bar">
        <div className="top-bar__left">
          <span className="top-bar__title">{headerTitles[activeSection]}</span>
        </div>

        <div className="top-bar__right">
          <div className="top-bar__status" aria-hidden="true">
            <span className="top-bar__badge">RT</span>
            <span className="top-bar__badge top-bar__badge--bell">
              <span className="top-bar__bell" />
            </span>
          </div>

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
      </div>

      <div className="main-area">
        {renderMain()}
      </div>
    </div>
  )
}

export default App
