import './App.css'
import { useState } from 'react'
import { WatchConfigProvider } from './context/WatchConfigContext'
import { Layout } from './components/layout/Layout'
import { CameraProvider } from './context/CameraContext'
import ConfigurationPanel from './components/Configurator/ConfigurationPanel/ConfigurationPanel'
import CanvasComponent from './components/CanvasComponent'
import type { ViewId } from './components/CameraController'
//import TestButtonGroup from './components/TestButtonGroup'

function App() {
  const [currentView, /*setCurrentView*/] = useState<ViewId>('top');

  return (
    <CameraProvider>
      <WatchConfigProvider>
        <Layout>
          <ConfigurationPanel />
          <CanvasComponent view={currentView} />

        {/* Connect the function of these buttons to each step in the configuraton 
        <TestButtonGroup>
          <button onClick={() => setCurrentView('top')}>Top View</button>
          <button onClick={() => setCurrentView('face')}>Face View</button>
          <button onClick={() => setCurrentView('band')}>Band View</button>
        </TestButtonGroup>
      */}

        </Layout>
      </WatchConfigProvider>
    </CameraProvider>
  )
}

export default App
