import styles from './Layout.module.css'
import { Header } from '../header/header'
import { StepBar } from '../Configurator/StepNavigation/StepBar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      <div className={styles.content}>
        {children}
      </div>
      <StepBar />
    </main>
  )
}