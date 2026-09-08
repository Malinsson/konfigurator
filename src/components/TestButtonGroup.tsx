import styles from './TestButtonGroup.module.css'

export default function TestButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.testButtonGroup}>
      {children}
    </div>
  )
}