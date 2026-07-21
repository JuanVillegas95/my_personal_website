import { useEffect, useMemo, useState } from 'react'
import type { BackgroundOption } from './components/BackgroundDrawer'
import { AppLayout } from './components/AppLayout'
import { GridContainer } from './components/GridContainer'
import { GALLERY_PAGE_COUNT, GALLERY_SECTIONS, MEDIA_TYPES } from './components/galleryData'

function getBackgroundOptions() {
  const seenSources = new Set<string>()
  const options: BackgroundOption[] = []

  GALLERY_SECTIONS.forEach(section => {
    section.items.forEach(item => {
      if (item.mediaType === MEDIA_TYPES.SLIDESHOW) {
        item.source.forEach((source, index) => {
          if (seenSources.has(source)) {
            return
          }

          seenSources.add(source)
          options.push({
            id: `${section.id}-${item.id}-${index}`,
            source,
            title: `${item.title} ${index + 1}`,
          })
        })
        return
      }

      if (!item.source || item.mediaType === MEDIA_TYPES.PLACEHOLDER || item.mediaType === MEDIA_TYPES.VIDEO) {
        return
      }

      if (seenSources.has(item.source)) {
        return
      }

      seenSources.add(item.source)
      options.push({
        id: `${section.id}-${item.id}`,
        source: item.source,
        title: item.title,
      })
    })
  })

  return options
}

function App() {
  const [now, setNow] = useState(() => new Date())
  const [currentPage, setCurrentPage] = useState(() => Math.min(1, GALLERY_PAGE_COUNT - 1))
  const [selectedBackground, setSelectedBackground] = useState('')
  const [selectedGridBackgrounds, setSelectedGridBackgrounds] = useState<Record<number, string>>({})
  const [isBackgroundPickerOpen, setIsBackgroundPickerOpen] = useState(false)
  const [isGridBackgroundPickerOpen, setIsGridBackgroundPickerOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const backgroundOptions = useMemo(() => getBackgroundOptions(), [])
  const selectedGridBackground = selectedGridBackgrounds[currentPage] ?? ''

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (selectedBackground) {
      root.style.setProperty('--portfolio-background-image', `url("${selectedBackground}")`)
      body.dataset.hasCustomBackground = 'true'
    } else {
      root.style.removeProperty('--portfolio-background-image')
      delete body.dataset.hasCustomBackground
    }

    return () => {
      root.style.removeProperty('--portfolio-background-image')
      delete body.dataset.hasCustomBackground
    }
  }, [selectedBackground])

  return (
    <AppLayout
      backgroundOptions={backgroundOptions}
      currentPage={currentPage}
      isBackgroundPickerOpen={isBackgroundPickerOpen}
      isChatOpen={isChatOpen}
      isGridBackgroundPickerOpen={isGridBackgroundPickerOpen}
      now={now}
      pageCount={GALLERY_PAGE_COUNT}
      selectedBackground={selectedBackground}
      selectedGridBackground={selectedGridBackground}
      onBackgroundPickerClose={() => setIsBackgroundPickerOpen(false)}
      onBackgroundPickerOpen={() => {
        setIsChatOpen(false)
        setIsGridBackgroundPickerOpen(false)
        setIsBackgroundPickerOpen(true)
      }}
      onBackgroundSelect={source => {
        setSelectedBackground(source)
        setIsBackgroundPickerOpen(false)
      }}
      onChatClose={() => setIsChatOpen(false)}
      onChatOpen={() => {
        setIsBackgroundPickerOpen(false)
        setIsGridBackgroundPickerOpen(false)
        setIsChatOpen(true)
      }}
      onGridBackgroundPickerClose={() => setIsGridBackgroundPickerOpen(false)}
      onGridBackgroundPickerOpen={() => {
        setIsChatOpen(false)
        setIsBackgroundPickerOpen(false)
        setIsGridBackgroundPickerOpen(true)
      }}
      onGridBackgroundSelect={source => {
        setSelectedGridBackgrounds(currentBackgrounds => ({
          ...currentBackgrounds,
          [currentPage]: source,
        }))
        setIsGridBackgroundPickerOpen(false)
      }}
      onPageChange={setCurrentPage}
    >
      <GridContainer
        currentPage={currentPage}
        gridBackground={selectedGridBackground}
        onPageChange={setCurrentPage}
      />
    </AppLayout>
  )
}

export default App
