import CanvasComponent from './components/CanvasComponent'
import './App.css'
import TestLayout from './components/TestLayout'
import TestButtonGroup from './components/TestButtonGroup'

import { CameraProvider } from './context/CameraContext'
import { WatchConfigProvider } from './context/WatchConfigContext'
import { Header } from './components/header/header'
import type { ViewId } from './components/CameraController'
import { useState } from 'react'
import BandStep from './components/Configurator/BandStep'

function App() {
  const [currentView, setCurrentView] = useState<ViewId>('top')

  return (
    <WatchConfigProvider>
      <CameraProvider>
        <TestLayout>
          <Header />
          <CanvasComponent view={currentView} />

          {/* Connect the function of these buttons to each step in the configuraton */}
          <TestButtonGroup>
            <button onClick={() => setCurrentView('top')}>Top View</button>
            <button onClick={() => setCurrentView('face')}>Face View</button>
            <button onClick={() => setCurrentView('band')}>Band View</button>
          </TestButtonGroup>
          <BandStep />
        </TestLayout>
      </CameraProvider>
    </WatchConfigProvider>
  )
}

export default App
