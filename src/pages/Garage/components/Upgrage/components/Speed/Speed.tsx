import styles from './speed.module.scss'

export function Speed() {

    return (
        <>
            <div className={styles.engineUpgradeContainer}>
                <div className={styles.label}>ENGINE</div>
                <div className={styles.progressBar}>
                    <div className={styles.progress} style={{ width: '20%' }}></div>
                    <div className={styles.value}>300</div>
                </div>
                <button className={styles.upgradeButton}>UPGRADE</button>
            </div>
            <div className={styles.gearBoxUpgradeContainer}>
                <div className={styles.label}>GEARBOX</div>
                <div className={styles.progressBar}>
                    <div className={styles.progress} style={{ width: '60%' }}></div>
                    <div className={styles.value}>700</div>
                </div>
                <button className={styles.upgradeButton}>UPGRADE</button>
            </div>
        </>
      );
}