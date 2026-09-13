import './App.css'
import { WatchConfigProvider } from './context/WatchConfigContext'
import { Layout } from './components/layout/Layout'
import { CameraProvider } from './context/CameraContext'
import ConfigurationPanel from './components/Configurator/ConfigurationPanel/ConfigurationPanel'
import CanvasComponent from './components/CanvasComponent'

function App() {
  return (
    <CameraProvider>
      <WatchConfigProvider>

        <Layout>
          <ConfigurationPanel />
          <CanvasComponent />
        </Layout>

      </WatchConfigProvider>
    </CameraProvider>
  )
}

export default App
