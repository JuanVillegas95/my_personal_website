import { useState, useEffect } from 'react'
import './App.css'

const links = [
  'about page',
  'entries',
  'sample packs',
  'video games',
  'blog',
  'contact',
]

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

function EntriesSection({ onBack }: { onBack: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [form, setForm] = useState<EntryForm>({ title: '', link: '', description: '' })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8080/api/entries')
      .then(r => r.json())
      .then(setEntries)
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

  return (
    <div className="entries-section">
      <div className="entries-header">
        <button className="entries-back-btn" onClick={onBack}>← back</button>
        <h2 className="entries-title">entries</h2>
        <button
          className="entries-new-btn"
          onClick={() => setShowForm(v => !v)}
        >
          {showForm ? 'cancel' : '+ new entry'}
        </button>
      </div>

      {showForm && (
        <form className="entry-form" onSubmit={handleSubmit}>
          <input
            className="entry-input"
            type="text"
            placeholder="title *"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            required
          />
          <input
            className="entry-input"
            type="url"
            placeholder="link (https://...)"
            value={form.link}
            onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
          />
          <textarea
            className="entry-input entry-textarea"
            placeholder="description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={3}
          />
          <button className="entries-new-btn" type="submit" disabled={loading}>
            {loading ? 'saving...' : 'save entry'}
          </button>
        </form>
      )}

      <div className="entries-list">
        {entries.length === 0 && (
          <p className="entries-empty">no entries yet.</p>
        )}
        {entries.map(entry => (
          <div key={entry.id} className="entry-card">
            <div className="entry-card__title">
              {entry.link
                ? <a href={entry.link} target="_blank" rel="noopener noreferrer">{entry.title}</a>
                : <span>{entry.title}</span>
              }
            </div>
            {entry.description && (
              <p className="entry-card__desc">{entry.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  function handleLinkClick(e: React.MouseEvent, label: string) {
    e.preventDefault()
    if (label === 'entries') setActiveSection('entries')
  }

  return (
    <div className="page-shell">
      <header className="site-header panel">
        <div className="site-header__inner">
          <h1 className="site-title">Death</h1>
        </div>
      </header>

      <aside className="sidebar panel">
        <div className="avatar-card">
          <div className="avatar-frame">
            <img src="/images/monitor.png" alt="Profile avatar" style={{backgroundColor: "transparent"}}/>
          </div>

          <div className="barcode" aria-hidden="true" />

          <div className="sidebar-fill" />
        </div>
      </aside>

      <main className="main-content panel">
        {activeSection === 'entries' ? (
          <EntriesSection onBack={() => setActiveSection(null)} />
        ) : (
          <nav className="menu" aria-label="Main navigation">
            {links.map((label) => (
              <a
                key={label}
                href="#"
                onClick={(e) => handleLinkClick(e, label)}
                className={`menu-link ${label === 'blog' ? 'menu-link--muted' : ''}`}
              >
                <img src="/images/icon.jpeg" alt="" aria-hidden="true" className="menu-icon" />
                <span>{label}</span>
                <img src="/images/icon.jpeg" alt="" aria-hidden="true" className="menu-icon" />
              </a>
            ))}
          </nav>
        )}
      </main>
    </div>
  )
}

export default App
