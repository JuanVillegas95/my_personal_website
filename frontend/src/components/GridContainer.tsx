import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/image-gallery.css'
import { GALLERY_PAGE_COUNT, GALLERY_SECTIONS, MEDIA_TYPES, SLIDESHOW_EFFECTS, type GalleryItem } from './galleryData'
import './GridContainer.css'

const isExternalLink = (link: string) => /^https?:\/\//.test(link)
const isPlaceholderLink = (link: string) => link === '#'
const DEFAULT_SLIDESHOW_INTERVAL_SECONDS = 3
const MIN_SLIDESHOW_INTERVAL_SECONDS = 0.5

function getBoundedPage(page: number) {
  return Math.min(Math.max(page, 0), GALLERY_PAGE_COUNT - 1)
}

function getSlideshowStartIndex(item: GalleryItem) {
  if (item.mediaType !== MEDIA_TYPES.SLIDESHOW || item.source.length === 0) {
    return 0
  }

  return Math.floor(Math.random() * item.source.length)
}

function getSlideshowIntervalMs(intervalSeconds?: number) {
  const safeIntervalSeconds =
    typeof intervalSeconds === 'number' && Number.isFinite(intervalSeconds)
      ? Math.max(intervalSeconds, MIN_SLIDESHOW_INTERVAL_SECONDS)
      : DEFAULT_SLIDESHOW_INTERVAL_SECONDS

  return safeIntervalSeconds * 1000
}

function MediaSurface({ item }: { item: GalleryItem }) {
  const [hasMediaError, setHasMediaError] = useState(false)
  const [slideshowStartIndex] = useState(() => getSlideshowStartIndex(item))
  const slideshowImages = useMemo(() => {
    if (item.mediaType !== MEDIA_TYPES.SLIDESHOW) {
      return []
    }

    return item.source.map(source => ({
      original: source,
      thumbnail: source,
    }))
  }, [item])

  if (item.mediaType === MEDIA_TYPES.SLIDESHOW) {
    const hasSlides = slideshowImages.length > 0 && !hasMediaError
    const slideshowEffect = item.slideshowEffect ?? SLIDESHOW_EFFECTS.SLIDE
    const usesFadeEffect = slideshowEffect === SLIDESHOW_EFFECTS.FADE
    const slideshowIntervalMs = getSlideshowIntervalMs(item.slideshowIntervalSeconds)

    if (hasSlides) {
      return (
        <div
          className={`gallery-tile__media gallery-tile__slideshow gallery-tile__slideshow--${slideshowEffect}`}
          aria-hidden="true"
        >
          <ImageGallery
            items={slideshowImages}
            autoPlay
            startIndex={slideshowStartIndex}
            slideInterval={slideshowIntervalMs}
            slideDuration={usesFadeEffect ? 700 : 550}
            slideVertically={slideshowEffect === SLIDESHOW_EFFECTS.VERTICAL}
            disableSwipe={usesFadeEffect}
            disableKeyDown
            lazyLoad
            showBullets={false}
            showFullscreenButton={false}
            showNav={false}
            showPlayButton={false}
            showThumbnails={false}
            onImageError={() => setHasMediaError(true)}
          />
        </div>
      )
    }

    return (
      <div
        className={`gallery-tile__placeholder gallery-tile__placeholder--${item.tone}`}
        data-motion="false"
        aria-hidden="true"
      >
        <span className="gallery-tile__glyph">{item.glyph}</span>
      </div>
    )
  }

  const hasMedia = Boolean(item.source && !hasMediaError)

  if (hasMedia && item.mediaType === MEDIA_TYPES.VIDEO) {
    return (
      <video
        className="gallery-tile__media"
        src={item.source}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setHasMediaError(true)}
      />
    )
  }

  if (hasMedia) {
    return (
      <img
        className="gallery-tile__media"
        src={item.source}
        alt=""
        loading="lazy"
        onError={() => setHasMediaError(true)}
      />
    )
  }

  return (
    <div
      className={`gallery-tile__placeholder gallery-tile__placeholder--${item.tone}`}
      data-motion={item.mediaType === MEDIA_TYPES.GIF || item.mediaType === MEDIA_TYPES.VIDEO ? 'true' : 'false'}
      aria-hidden="true"
    >
      <span className="gallery-tile__glyph">{item.glyph}</span>
    </div>
  )
}

export function GridContainer({
  currentPage,
  onPageChange,
}: {
  currentPage: number
  onPageChange: (page: number) => void
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activePage = getBoundedPage(currentPage)
  const activeItems = GALLERY_SECTIONS[activePage].items
  const selectedItemIndex = Math.min(selectedIndex, activeItems.length - 1)

  const selectPage = (page: number, index = 0) => {
    const nextPage = getBoundedPage(page)
    onPageChange(nextPage)
    setSelectedIndex(Math.min(index, GALLERY_SECTIONS[nextPage].items.length - 1))
  }

  const moveSelection = (delta: number) => {
    const nextIndex = selectedItemIndex + delta

    if (nextIndex < 0) {
      const previousPage = getBoundedPage(activePage - 1)
      selectPage(previousPage, GALLERY_SECTIONS[previousPage].items.length - 1)
      return
    }

    if (nextIndex >= activeItems.length) {
      selectPage(activePage + 1, 0)
      return
    }

    setSelectedIndex(nextIndex)
  }

  return (
    <section
      className="gallery-shell"
      aria-label="Interactive portfolio gallery"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          moveSelection(-1)
        }

        if (event.key === 'ArrowRight') {
          event.preventDefault()
          moveSelection(1)
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault()
          moveSelection(-4)
        }

        if (event.key === 'ArrowDown') {
          event.preventDefault()
          moveSelection(4)
        }

        if (event.key === 'Home') {
          event.preventDefault()
          selectPage(0, 0)
        }

        if (event.key === 'End') {
          event.preventDefault()
          selectPage(GALLERY_PAGE_COUNT - 1, GALLERY_SECTIONS[GALLERY_PAGE_COUNT - 1].items.length - 1)
        }
      }}
    >
      <button
        type="button"
        className="gallery-arrow gallery-arrow--previous glass"
        aria-label="Previous gallery page"
        title="Previous"
        onClick={() => selectPage(activePage - 1, 0)}
        disabled={activePage === 0}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.8 5.5 8.3 12l6.5 6.5" />
        </svg>
      </button>

      <div className="gallery-viewport">
        <div
          key={GALLERY_SECTIONS[activePage].id}
          className="gallery-page glass"
          aria-label={GALLERY_SECTIONS[activePage].label}
          style={{ '--page': activePage } as CSSProperties}
        >
          {activeItems.map((item, itemIndex) => {
            const link = item.link
            const hasLink = Boolean(link)
            const isExternal = link ? isExternalLink(link) : false
            const isSelected = selectedItemIndex === itemIndex

            return (
              <a
                key={item.id}
                className={`gallery-tile gallery-tile--${item.tileSize}`}
                href={link}
                aria-label={item.title}
                data-has-link={hasLink ? 'true' : 'false'}
                data-selected={isSelected ? 'true' : 'false'}
                data-tone={item.tone}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setSelectedIndex(itemIndex)}
                onFocus={() => setSelectedIndex(itemIndex)}
                onClick={event => {
                  setSelectedIndex(itemIndex)

                  if (!link || isPlaceholderLink(link)) {
                    event.preventDefault()
                  }
                }}
              >
                <span className="gallery-tile__chrome">
                  <MediaSurface item={item} />
                  <span className="gallery-tile__shine" aria-hidden="true" />
                </span>
                <span className="gallery-tile__label">
                  <span className="gallery-tile__label-text">{item.title}</span>
                </span>
              </a>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        className="gallery-arrow gallery-arrow--next glass"
        aria-label="Next gallery page"
        title="Next"
        onClick={() => selectPage(activePage + 1, 0)}
        disabled={activePage === GALLERY_PAGE_COUNT - 1}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9.2 5.5 6.5 6.5-6.5 6.5" />
        </svg>
      </button>
    </section>
  )
}
