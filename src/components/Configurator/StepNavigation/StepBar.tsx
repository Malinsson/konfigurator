import styles from './StepBar.module.css';

export function StepBar() {
  return (
    <div className={styles.stepBar}>
      <div className={styles.step}>1. Strap</div>
      <div className={styles.step}>2. Dial Color</div>
      <div className={styles.step}>3. Dial Style & Detail</div>
      <div className={`${styles.step} ${styles.stepInactive}`}>4. Overview</div>
    </div>
  );
}