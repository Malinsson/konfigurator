import CanvasComponent from './components/CanvasComponent'
import './App.css'
import TestLayout from './components/TestLayout'
import TestButtonGroup from './components/TestButtonGroup'
import { ZoomButton } from './molecules/ZoomButton'
import { CameraProvider } from './context/CameraContext'
import { Header } from './components/header/header'

function App() {
  return (
      <CameraProvider>
        <TestLayout>
          <Header />
          <CanvasComponent />
          <TestButtonGroup>
            <ZoomButton hotspotName="front" />
            <ZoomButton hotspotName="top" />
            <ZoomButton hotspotName="side" />
          </TestButtonGroup>
        </TestLayout>
      </CameraProvider>
  )
}

export default App
