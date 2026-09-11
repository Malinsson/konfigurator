import styles from './Layout.module.css'
import { Header } from '../header/header'
import { StepBar } from '../Configurator/StepNavigation/StepBar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      <section className={styles.content}>
        {children}
      </section>
      <StepBar currentStep={'band'} />
    </main>
  )
}