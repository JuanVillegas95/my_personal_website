import { AppLayout } from './components/AppLayout'
import { GridContainer } from './components/GridContainer'

function App() {
  const now = new Date()

  return (
    <AppLayout title="Welcome!" now={now}>
      <GridContainer />
    </AppLayout>
  )
}

export default App
