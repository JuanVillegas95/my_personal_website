import { useEffect, useState, type FormEvent } from 'react'
import { SectionHeader } from './SectionHeader'
import { SectionPanel } from './SectionPanel'
import './EntriesSection.css'

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

export function EntriesSection({ onReturn }: { onReturn: () => void }) {
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
      .then(() => setEntries(prev => prev.filter(entry => entry.id !== id)))
      .catch(() => {})
  }

  function startEdit(entry: Entry) {
    setEditingId(entry.id)
    setEditForm({
      title: entry.title,
      link: entry.link ?? '',
      description: entry.description ?? '',
    })
  }

  function handleEditSubmit(e: FormEvent<HTMLFormElement>, id: number) {
    e.preventDefault()

    fetch(`http://localhost:8080/api/entries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(r => r.json())
      .then((updated: Entry) => {
        setEntries(prev => prev.map(entry => (entry.id === id ? updated : entry)))
        setEditingId(null)
      })
      .catch(() => {})
  }

  return (
    <SectionPanel>
      <SectionHeader
        title="entries"
        onReturn={onReturn}
        action={(
          <button type="button" className="btn btn--primary" onClick={() => setShowForm(value => !value)}>
            {showForm ? 'cancel' : '+ new'}
          </button>
        )}
      />

      {showForm && (
        <form className="entry-form" onSubmit={handleSubmit}>
          <input
            className="entry-input"
            type="text"
            placeholder="title *"
            value={form.title}
            onChange={e => setForm(current => ({ ...current, title: e.target.value }))}
            required
          />
          <input
            className="entry-input"
            type="url"
            placeholder="link (https://...)"
            value={form.link}
            onChange={e => setForm(current => ({ ...current, link: e.target.value }))}
          />
          <textarea
            className="entry-input entry-textarea"
            placeholder="description"
            value={form.description}
            onChange={e => setForm(current => ({ ...current, description: e.target.value }))}
            rows={3}
          />
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
                <input
                  className="entry-input"
                  type="text"
                  placeholder="title *"
                  value={editForm.title}
                  onChange={e => setEditForm(current => ({ ...current, title: e.target.value }))}
                  required
                />
                <input
                  className="entry-input"
                  type="url"
                  placeholder="link (https://...)"
                  value={editForm.link}
                  onChange={e => setEditForm(current => ({ ...current, link: e.target.value }))}
                />
                <textarea
                  className="entry-input entry-textarea"
                  placeholder="description"
                  value={editForm.description}
                  onChange={e => setEditForm(current => ({ ...current, description: e.target.value }))}
                  rows={2}
                />
                <div className="entry-card__actions">
                  <button className="btn btn--primary" type="submit">save</button>
                  <button className="btn btn--ghost" type="button" onClick={() => setEditingId(null)}>
                    cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="entry-card__title">
                  {entry.link
                    ? (
                        <a href={entry.link} target="_blank" rel="noopener noreferrer">
                          {entry.title}
                        </a>
                      )
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
    </SectionPanel>
  )
}
