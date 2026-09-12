import styles from './ConfigurationHeader.module.css';

export function ConfigurationHeader() {
    return (
        <div className={styles.sectionHeader}>
            <div className={styles.header}>
                <h1>Nord</h1>
                <span>Defined by you</span>
            </div>
        <p>Refined proportions and considered details give Unica its timeless character. Designed to adapt effortlessly to your style.</p>
      </div>
    )
}