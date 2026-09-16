import styles from './Layout.module.css'
import { Header } from '../header/header'
import { StepBar } from '../Configurator/StepNavigation/StepBar'
import { useWatchConfig } from '../../context/WatchConfigContext'

export function Layout({ children }: { children: React.ReactNode }) {
  const { currentStep } = useWatchConfig()

  return (
    <main>
      {/* Skip links for keyboard navigation */}
      <a href="#configuration-panel" className="sr-only" tabIndex={0}>
        Skip to configuration panel
      </a>
      <a href="#main-content" className="sr-only" tabIndex={0}>
        Skip to main content
      </a>

      <Header />
      <section className={styles.content} id="main-content">
        {children}
      </section>
      <StepBar currentStep={currentStep} />
    </main>
  )
}