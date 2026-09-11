import styles from './StepBar.module.css';

export default function StepBar() {
  return (
    <div className={styles.stepBar}>
      <div className={styles.step}></div>
      <div className={styles.step}></div>
      <div className={styles.step}></div>
      <div className={styles.step}></div>
    </div>
  );
}