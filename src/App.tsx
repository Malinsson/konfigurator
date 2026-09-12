import './App.css'
import { useState } from 'react'
import { WatchConfigProvider } from './context/WatchConfigContext'
import { Layout } from './components/layout/Layout'
import { CameraProvider } from './context/CameraContext'
import ConfigurationPanel from './components/Configurator/ConfigurationPanel/ConfigurationPanel'
import CanvasComponent from './components/CanvasComponent'
import type { ViewId } from './components/CameraController'

function App() {
  const [currentView, /*setCurrentView*/] = useState<ViewId>('top');

  return (
    <CameraProvider>
      <WatchConfigProvider>

        <Layout>
          <ConfigurationPanel />
          <CanvasComponent view={currentView} />
        </Layout>
        
      </WatchConfigProvider>
    </CameraProvider>
  )
}

export default App
