import CanvasComponent from './components/CanvasComponent'
import './App.css'
import TestLayout from './components/TestLayout'
import TestButtonGroup from './components/TestButtonGroup'
import { ZoomButton } from './molecules/ZoomButton'
import { CameraProvider } from './context/CameraContext'

function App() {
  return (
    <CameraProvider>
      <TestLayout>
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
