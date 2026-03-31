import { useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { AppLayout } from './components/AppLayout'
import { EntriesSection } from './components/EntriesSection'
import { HomeSection } from './components/HomeSection'
import { PlaceholderSection } from './components/PlaceholderSection'
import { headerTitles, type SectionId } from './components/sectionConfig'
import { GridContainer } from './components/GridContainer'

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const now = new Date()
  const handleReturnHome = () => setActiveSection('home')

  function renderMain() {
    switch (activeSection) {
      case 'home':
        return <HomeSection onNavigate={setActiveSection} />
      case 'about':
        return <AboutSection onReturn={handleReturnHome} />
      case 'entries':
        return <EntriesSection onReturn={handleReturnHome} />
      default:
        return <PlaceholderSection id={activeSection} onReturn={handleReturnHome} />
    }
  }

  return (
    <AppLayout title={headerTitles[activeSection]} now={now}>
      <GridContainer />
    </AppLayout>
  )
}

export default App
