import styles from './TestLayout.module.css'

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.testLayout}>
      {children}
    </div>
  )
}