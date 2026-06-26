import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import './BackgroundDrawer.css'
import './ChatDrawer.css'

interface ChatMessage {
  id: number
  author: 'assistant' | 'user'
  text: string
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    author: 'assistant',
    text: "Hi, I'm Juan's portfolio chat.",
  },
]

export function ChatDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState(initialMessages)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    window.requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }, [isOpen])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const messageText = draft.trim()
    if (!messageText) {
      return
    }

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: Date.now(),
        author: 'user',
        text: messageText,
      },
    ])
    setDraft('')
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="background-drawer chat-drawer" aria-label="Portfolio chat">
      <button type="button" className="background-drawer__scrim" aria-label="Close chat" onClick={onClose} />
      <aside
        className="background-drawer__panel chat-drawer__panel glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-drawer-title"
      >
        <div className="background-drawer__header">
          <div>
            <p className="background-drawer__eyebrow">Portfolio</p>
            <h2 id="chat-drawer-title" className="background-drawer__title">
              Chat
            </h2>
          </div>
          <button type="button" className="background-drawer__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="chat-drawer__messages" aria-live="polite">
          {messages.map(message => (
            <p key={message.id} className="chat-drawer__message" data-author={message.author}>
              {message.text}
            </p>
          ))}
        </div>

        <form className="chat-drawer__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="chat-drawer__input"
            type="text"
            value={draft}
            placeholder="Write a message..."
            onChange={event => setDraft(event.target.value)}
          />
          <button type="submit" className="chat-drawer__send" aria-label="Send message">
            Send
          </button>
        </form>
      </aside>
    </div>
  )
}
