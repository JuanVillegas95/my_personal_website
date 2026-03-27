import { useState, useEffect } from 'react'
import './App.css'

const navItems = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'about', icon: '👤', label: 'About' },
  { id: 'entries', icon: '📝', label: 'Entries' },
  { id: 'code', icon: '💻', label: 'Code' },
  { id: 'projects', icon: '🧩', label: 'Projects' },
  { id: 'gallery', icon: '🖼', label: 'Gallery' },
  { id: 'contact', icon: '✉️', label: 'Contact' },
] as const

const categories = [
  { id: 'about', label: 'About\nMe', icon: '👤' },
  { id: 'entries', label: 'Entries', icon: '📝' },
  { id: 'code', label: 'Code', icon: '💻' },
  { id: 'projects', label: 'Projects', icon: '🧩' },
  { id: 'gallery', label: 'Gallery', icon: '🖼' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
] as const

type SectionId = 'home' | 'about' | 'entries' | 'code' | 'projects' | 'gallery' | 'contact'

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

function EntriesSection() {
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
      <div className="section-header">
        <h2 className="section-title">entries</h2>
        <button className="btn btn--primary" onClick={() => setShowForm(v => !v)}>
          {showForm ? 'cancel' : '+ new'}
        </button>
      </div>

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

function AboutSection() {
  return (
    <div className="section-panel glass">
      <div className="section-header">
        <h2 className="section-title">about me</h2>
      </div>
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

function PlaceholderSection({ id }: { id: string }) {
  const icons: Record<string, string> = {
    code: '💻', projects: '🧩', gallery: '🖼', contact: '✉️',
  }
  return (
    <div className="section-panel glass">
      <div className="section-header">
        <h2 className="section-title">{id}</h2>
      </div>
      <div className="placeholder-content">
        <div className="placeholder-icon">{icons[id] ?? '📁'}</div>
        <p className="placeholder-text">coming soon</p>
      </div>
    </div>
  )
}

// ── Home Section ──────────────────────────────────────────

const guestComments = [
  { id: 1, name: 'visitor', avatar: '🐱', text: 'cool website! love the vibe', time: '2h ago' },
  { id: 2, name: 'anon', avatar: '🎮', text: 'the entries section is really neat', time: '5h ago' },
  { id: 3, name: 'friend', avatar: '🌸', text: 'nice taste in games!!', time: '1d ago' },
  { id: 4, name: 'lurker', avatar: '👾', text: 'been a while... glad to see updates', time: '2d ago' },
]

function HomeSection({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="home">
      <div className="home-comments-row">
        {guestComments.map(c => (
          <div key={c.id} className="comment-card">
            <div className="comment-card__avatar">{c.avatar}</div>
            <div className="comment-card__name">{c.name}</div>
            <p className="comment-card__text">{c.text}</p>
            <span className="comment-card__time">{c.time}</span>
          </div>
        ))}
      </div>

      <div className="home-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`cat-card cat-card--${cat.id}`}
            onClick={() => onNavigate(cat.id)}
          >
            <span className="cat-card__label">{cat.label}</span>
            <span className="cat-card__icon">{cat.icon}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  function renderMain() {
    switch (activeSection) {
      case 'home': return <HomeSection onNavigate={setActiveSection} />
      case 'about': return <AboutSection />
      case 'entries': return <EntriesSection />
      default: return <PlaceholderSection id={activeSection} />
    }
  }

  return (
    <div className="shell">
      <div className="top-bar">
        <div className="top-bar__left">
          <span className="top-bar__title">
            {activeSection === 'home' ? 'Death' : navItems.find(n => n.id === activeSection)?.label ?? 'Death'}
          </span>
        </div>
        <div className="top-bar__right glass">
          <span className="top-bar__time">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
          <span className="top-bar__sep">|</span>
          <span className="top-bar__date">
            {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
          </span>
        </div>
      </div>

      <nav className="sidebar">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-btn ${activeSection === item.id ? 'sidebar-btn--active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="sidebar-btn__icon">{item.icon}</span>
          </button>
        ))}
      </nav>

      <div className="main-area">
        {renderMain()}
      </div>
    </div>
  )
}

export default App
