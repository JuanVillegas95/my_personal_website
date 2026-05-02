import { useEffect, useState } from 'react'
import { AppLayout } from './components/AppLayout'
import { GridContainer } from './components/GridContainer'
import { GALLERY_PAGE_COUNT } from './components/galleryData'

function App() {
  const [now, setNow] = useState(() => new Date())
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <AppLayout currentPage={currentPage} now={now} pageCount={GALLERY_PAGE_COUNT}>
      <GridContainer currentPage={currentPage} onPageChange={setCurrentPage} />
    </AppLayout>
  )
}

export default App
