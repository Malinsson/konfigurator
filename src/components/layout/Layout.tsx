import styles from './Layout.module.css'
import { Header } from '../header/header'
import { StepBar } from '../Configurator/StepNavigation/StepBar'
import { useWatchConfig } from '../../context/WatchConfigContext'

export function Layout({ children }: { children: React.ReactNode }) {
  const { currentStep } = useWatchConfig()

  return (
    <main>
      <Header />
      <section className={styles.content}>
        {children}
      </section>
      <StepBar currentStep={currentStep} />
    </main>
  )
}