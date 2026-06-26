import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/image-gallery.css'
import ReactFlipCard from 'reactjs-flip-card'
import { GALLERY_PAGE_COUNT, GALLERY_SECTIONS, MEDIA_TYPES, SLIDESHOW_EFFECTS, type GalleryItem } from './galleryData'
import './GridContainer.css'

const isPlaceholderLink = (link: string) => link === '#'
const DEFAULT_SLIDESHOW_INTERVAL_SECONDS = 3
const MIN_SLIDESHOW_INTERVAL_SECONDS = 0.5
const GALLERY_STAGE_WIDTH = 1120
const GALLERY_STAGE_HEIGHT = 400
const MAX_GALLERY_SCALE = 3.08

function getUsableLink(link?: string) {
  return link && !isPlaceholderLink(link) ? link : ''
}

function isMailLink(link?: string) {
  return Boolean(link && link.startsWith('mailto:'))
}

function openTileLink(link: string) {
  if (isMailLink(link)) {
    window.location.href = link
    return
  }

  window.open(link, '_blank', 'noopener')
}

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

function getGalleryScale(width: number, height: number) {
  if (width <= 0 || height <= 0) {
    return 1
  }

  return Math.min(MAX_GALLERY_SCALE, width / GALLERY_STAGE_WIDTH, height / GALLERY_STAGE_HEIGHT)
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

function TileFront({ item }: { item: GalleryItem }) {
  return (
    <span className="gallery-tile__chrome">
      <MediaSurface item={item} />
      <span className="gallery-tile__shine" aria-hidden="true" />
    </span>
  )
}

function TileActions({
  githubLink,
  label,
  onClose,
  websiteLink,
}: {
  githubLink: string
  label: string
  onClose: () => void
  websiteLink: string
}) {
  return (
    <div
      className="tile-actions"
      role="group"
      aria-label={`${label} actions`}
      onClick={event => {
        event.stopPropagation()
        onClose()
      }}
    >
      <span className="tile-actions__title">{label}</span>
      <span className="tile-actions__buttons">
        <a
          className="tile-actions__button glass"
          href={githubLink || undefined}
          target="_blank"
          rel="noopener"
          hidden={!githubLink}
          onClick={event => {
            event.stopPropagation()
            onClose()
          }}
        >
          <svg className="tile-actions__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.86 8.35 6.84 9.7.5.1.68-.22.68-.5 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .28.18.6.69.5A10.18 10.18 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
          </svg>
        </a>
        <a
          className="tile-actions__button glass"
          href={websiteLink || undefined}
          target="_blank"
          rel="noopener"
          hidden={!websiteLink}
          onClick={event => {
            event.stopPropagation()
            onClose()
          }}
        >
          <svg className="tile-actions__icon tile-actions__icon--stroke" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 5h5v5" />
            <path d="M10 14 19 5" />
            <path d="M19 14v4.5A1.5 1.5 0 0 1 17.5 20h-12A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5H10" />
          </svg>
        </a>
      </span>
    </div>
  )
}

function TileBack({
  githubLink,
  item,
  onClose,
  websiteLink,
}: {
  githubLink: string
  item: GalleryItem
  onClose: () => void
  websiteLink: string
}) {
  return (
    <span className="gallery-tile__chrome gallery-tile__chrome--back">
      <TileActions githubLink={githubLink} label={item.title} websiteLink={websiteLink} onClose={onClose} />
    </span>
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
  const [activeTileId, setActiveTileId] = useState<string | null>(null)
  const [galleryScale, setGalleryScale] = useState(1)
  const shellRef = useRef<HTMLElement | null>(null)
  const activeTileRef = useRef<HTMLDivElement | null>(null)
  const activePage = getBoundedPage(currentPage)
  const activeItems = GALLERY_SECTIONS[activePage].items
  const selectedItemIndex = Math.min(selectedIndex, activeItems.length - 1)

  const getActiveTileFocusableElements = useCallback(() => {
    if (!activeTileRef.current) {
      return []
    }

    return Array.from(
      activeTileRef.current.querySelectorAll<HTMLAnchorElement>('a[href]:not([hidden])'),
    ).filter(element => !element.hasAttribute('disabled'))
  }, [])

  const closeTileActions = useCallback((restoreFocus = true) => {
    setActiveTileId(null)

    if (restoreFocus) {
      activeTileRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    if (!activeTileId) {
      return
    }

    const focusableElements = getActiveTileFocusableElements()
    focusableElements[0]?.focus()
  }, [activeTileId, getActiveTileFocusableElements])

  useEffect(() => {
    if (!activeTileId) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTileActions()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeTileId, closeTileActions])

  useEffect(() => {
    const shellElement = shellRef.current
    const measuringElement = shellElement?.parentElement

    if (!measuringElement) {
      return
    }

    const updateGalleryScale = () => {
      const { height, width } = measuringElement.getBoundingClientRect()
      const nextScale = getGalleryScale(width, height)
      setGalleryScale(currentScale => (Math.abs(currentScale - nextScale) < 0.005 ? currentScale : nextScale))
    }

    updateGalleryScale()

    const resizeObserver = new ResizeObserver(updateGalleryScale)
    resizeObserver.observe(measuringElement)
    window.addEventListener('resize', updateGalleryScale)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateGalleryScale)
    }
  }, [])

  const handleTileKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
    itemId: string,
    directLink: string,
    isFlippable: boolean,
  ) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      closeTileActions()
      return
    }

    const target = event.target
    const isInsideActions = target instanceof Element && Boolean(target.closest('.tile-actions'))

    if (isInsideActions && event.key !== 'Tab') {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      activeTileRef.current = event.currentTarget

      if (isFlippable) {
        setActiveTileId(currentId => (currentId === itemId ? null : itemId))
        return
      }

      setActiveTileId(null)

      if (directLink) {
        openTileLink(directLink)
      }
    }
  }

  const selectPage = (page: number, index = 0) => {
    const nextPage = getBoundedPage(page)
    setActiveTileId(null)
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
    setActiveTileId(null)
  }

  const galleryWidth = Math.round(GALLERY_STAGE_WIDTH * galleryScale)
  const galleryHeight = Math.round(GALLERY_STAGE_HEIGHT * galleryScale)

  return (
    <section
      ref={shellRef}
      className="gallery-shell"
      aria-label="Interactive portfolio gallery"
      tabIndex={0}
      style={
        {
          '--gallery-scaled-width': `${galleryWidth}px`,
          '--gallery-scaled-height': `${galleryHeight}px`,
        } as CSSProperties
      }
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
      <div className="gallery-stage-frame">
        <div className="gallery-stage">
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
                const isSelected = selectedItemIndex === itemIndex
                const isFlipped = activeTileId === item.id
                const githubLink = getUsableLink(item.githubLink)
                const websiteLink = getUsableLink(item.websiteLink)
                const isFlippable = Boolean(githubLink && websiteLink)
                const directLink = !isFlippable ? websiteLink || githubLink : ''
                const hasTileAction = isFlippable || Boolean(directLink)

                return (
                  <div
                    key={item.id}
                    ref={element => {
                      if (isFlipped) {
                        activeTileRef.current = element
                      }
                    }}
                    className={`gallery-tile gallery-tile--${item.tileSize}`}
                    role={hasTileAction ? 'button' : undefined}
                    tabIndex={hasTileAction ? 0 : undefined}
                    aria-label={item.title}
                    aria-expanded={isFlippable ? isFlipped : undefined}
                    data-flipped={isFlipped ? 'true' : 'false'}
                    data-has-link={hasTileAction ? 'true' : 'false'}
                    data-selected={isSelected ? 'true' : 'false'}
                    data-tone={item.tone}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                    onFocus={() => setSelectedIndex(itemIndex)}
                    onKeyDown={event => handleTileKeyDown(event, item.id, directLink, isFlippable)}
                    onClick={(event: ReactMouseEvent<HTMLDivElement>) => {
                      setSelectedIndex(itemIndex)
                      activeTileRef.current = event.currentTarget

                      if (isFlippable) {
                        setActiveTileId(currentId => (currentId === item.id ? null : item.id))
                        return
                      }

                      setActiveTileId(null)

                      if (directLink) {
                        openTileLink(directLink)
                      }
                    }}
                  >
                    {isFlippable ? (
                      <ReactFlipCard
                        containerCss="gallery-tile__flip-container"
                        flipCardCss="gallery-tile__flip-card"
                        frontCss="gallery-tile__flip-face gallery-tile__flip-face--front"
                        backCss="gallery-tile__flip-face gallery-tile__flip-face--back"
                        direction="horizontal"
                        flipTrigger="disabled"
                        flipByProp={isFlipped}
                        flipCardStyle={{
                          transformStyle: 'preserve-3d',
                          transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        frontComponent={<TileFront item={item} />}
                        backComponent={
                          <TileBack
                            githubLink={githubLink}
                            item={item}
                            websiteLink={websiteLink}
                            onClose={() => closeTileActions()}
                          />
                        }
                      />
                    ) : (
                      <TileFront item={item} />
                    )}
                  </div>
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
        </div>
      </div>
    </section>
  )
}
