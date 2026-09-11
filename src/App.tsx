import './App.css'
import { Layout } from './components/layout/Layout'
import CanvasComponent from './components/CanvasComponent'
//import TestButtonGroup from './components/TestButtonGroup'
//import { ZoomButton } from './molecules/ZoomButton'
import { CameraProvider } from './context/CameraContext'
import type { ViewId } from './components/CameraController'
import { useState } from 'react'
import ConfigurationPanel from './components/Configurator/ConfigurationPanel/ConfigurationPanel'

function App() {
  const [currentView, setCurrentView] = useState<ViewId>('top')

  return (
    <CameraProvider>
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
    </CameraProvider>
  )
}

export default App
