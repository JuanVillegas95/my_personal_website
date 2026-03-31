import { useEffect, useState } from 'react'
import { categories, type SectionId } from './sectionConfig'
import './HomeSection.css'

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
  }
}

const guestComments: GuestComment[] = [
  { id: 1, theme: 'sonic', title: 'Sonic Bundle', avatar: '🐤', text: 'got that sonic mega collection iykyk u ki', preview: 'S', accent: '💨', stats: { likes: 38 } },
  { id: 2, theme: 'ananta', title: 'Ananta Set', avatar: '🦔', text: "Here's all the media I made for ANANTA <3", preview: 'A', accent: '✨', stats: { likes: 38 } },
  { id: 3, theme: 'shopii', title: 'Shopii BGM', avatar: '🐢', text: 'new iisu BGM for the Shopii menu', preview: 'S', accent: '🔊', stats: { likes: 223 } },
  { id: 4, theme: 'etland', title: 'ET Land', avatar: '🪐', text: 'OMG OMG official ET Land theme is here!!', preview: 'ET', accent: '🐱', stats: { likes: 49 } },
  { id: 5, theme: 'icons', title: 'Icons Pack', avatar: '🌑', text: "I got icons y'all pls don't sleep on these", preview: '★', accent: '🎮', stats: { likes: 92 } },
  { id: 6, theme: 'sonic', title: 'Blue Rush Icons', avatar: '🐣', text: 'the sonic folder set finally matches the menu now', preview: 'S', accent: '🎵', stats: { likes: 74 } },
  { id: 7, theme: 'shopii', title: 'Arcade Loop', avatar: '🐸', text: 'left this menu loop on for an hour no regrets', preview: 'S', accent: '🎧', stats: { likes: 141 } },
  { id: 8, theme: 'etland', title: 'Pastel Pets', avatar: '🐰', text: 'these little ET critters are way too cute pls', preview: 'ET', accent: '🌸', stats: { likes: 63 } },
  { id: 9, theme: 'ananta', title: 'Ananta Icons', avatar: '🪽', text: 'new badge pack plus splash screens are zipped and ready', preview: 'A', accent: '🗂', stats: { likes: 87 } },
  { id: 10, theme: 'icons', title: 'Pixel Drops', avatar: '🌘', text: 'tiny icon dump for anyone updating their folders tonight', preview: '★', accent: '✨', stats: { likes: 58 } },
  { id: 11, theme: 'sonic', title: 'Chao Mail', avatar: '🐥', text: 'mail bubble remake is up if you want the png set', preview: 'S', accent: '📬', stats: { likes: 69 } },
  { id: 12, theme: 'shopii', title: 'Menu FX', avatar: '🦊', text: 'added a click pack and startup chime for the theme', preview: 'S', accent: '⚡', stats: { likes: 116 } },
]

function GuestCommentCard({
  comment,
  ariaHidden = false,
}: {
  comment: GuestComment
  ariaHidden?: boolean
}) {
  return (
    <article className={`comment-card comment-card--${comment.theme}`} aria-hidden={ariaHidden || undefined}>
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
        aria-label={`${comment.stats.likes} likes`}
      >
        <span className="comment-card__stat">✦ {comment.stats.likes}</span>
      </div>
    </article>
  )
}

function getVisibleCategoryCount(viewportWidth: number) {
  if (viewportWidth <= 700) return 1
  if (viewportWidth <= 1024) return 3
  return 5
}

export function HomeSection({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  const [categoryStartIndex, setCategoryStartIndex] = useState(0)
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(() => {
    if (typeof window === 'undefined') return 5
    return getVisibleCategoryCount(window.innerWidth)
  })

  useEffect(() => {
    const handleResize = () => setVisibleCategoryCount(getVisibleCategoryCount(window.innerWidth))

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const normalizedVisibleCategoryCount = Math.min(visibleCategoryCount, categories.length)
  const canCycleCategories = categories.length > normalizedVisibleCategoryCount
  const visibleCategories = canCycleCategories
    ? Array.from(
        { length: normalizedVisibleCategoryCount },
        (_, offset) => categories[(categoryStartIndex + offset) % categories.length],
      )
    : categories

  function showPreviousCategory() {
    if (!canCycleCategories) return
    setCategoryStartIndex(index => (index - 1 + categories.length) % categories.length)
  }

  function showNextCategory() {
    if (!canCycleCategories) return
    setCategoryStartIndex(index => (index + 1) % categories.length)
  }

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

      <div>
        hi
      </div>

      <div className="home-categories" aria-label="Site sections carousel">
        <button
          type="button"
          className="carousel-btn carousel-btn--prev"
          onClick={showPreviousCategory}
          aria-label="Show previous sections"
          disabled={!canCycleCategories}
        >
          <span className="carousel-btn__icon" aria-hidden="true">&larr;</span>
        </button>

        <div className="home-categories-window" aria-label="Site sections">
          <div
            className="home-categories-track"
            style={{ gridTemplateColumns: `repeat(${visibleCategories.length}, minmax(0, 1fr))` }}
          >
            {visibleCategories.map(category => (
              <button
                key={`${categoryStartIndex}-${category.id}`}
                type="button"
                className={`cat-card cat-card--${category.id}`}
                onClick={() => onNavigate(category.id)}
              >
                <span className="cat-card__label">{category.label}</span>
                <span className="cat-card__art" aria-hidden="true">
                  <span className="cat-card__sticker cat-card__sticker--main">{category.icon}</span>
                  <span className="cat-card__sticker cat-card__sticker--accent">{category.accent}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-btn carousel-btn--next"
          onClick={showNextCategory}
          aria-label="Show next sections"
          disabled={!canCycleCategories}
        >
          <span className="carousel-btn__icon" aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  )
}