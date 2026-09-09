import CanvasComponent from './components/CanvasComponent'
import './App.css'
import TestLayout from './components/TestLayout'
import TestButtonGroup from './components/TestButtonGroup'
import { ZoomButton } from './molecules/ZoomButton'
import { CameraProvider } from './context/CameraContext'
import type { ViewId } from './components/CameraController'
import { useState } from 'react'

function App() {
  const [currentView, setCurrentView] = useState<ViewId>('top')

  return (
    <CameraProvider>
      <TestLayout>
        <CanvasComponent view={currentView} />
        <TestButtonGroup>
          <button onClick={() => setCurrentView('top')}>Top View</button>
          <button onClick={() => setCurrentView('face')}>Face View</button>
          <button onClick={() => setCurrentView('band')}>Band View</button>
        </TestButtonGroup>
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
