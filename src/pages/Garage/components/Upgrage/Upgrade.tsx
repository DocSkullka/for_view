import garage_image  from '@/assets/garage_image.png'
import garage_car from '@/assets/garage_car.png'
import styles from './upgrade.module.scss'
import { useState } from 'react';
import cx from 'classnames';
import { Speed } from './components/Speed/Speed';
import { Broke } from './components/Broke/Broke';
import { Mobility } from './components/Mobility/Mobility';
import { Turbo } from './components/Turbo/Turbo';

const TABS = {
    Speed: 'speed',
    Broke: 'broke',
    Mobility: 'mobility',
    Turbo: 'turbo',
};

export function Upgrade() {
    const [activeTab, setActiveTab] = useState(TABS.Speed);

    return(
        <main>
            <div className={styles.upgradeGarage}>
                <img className={styles.garageImage} src={garage_image} alt="garage" />
                <img className={styles.garageCar} src={garage_car} alt="car" />
            </div>
            <div className={styles.tabs}>
                        <button
                            type='button'
                            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Speed })}
                            onClick={() => setActiveTab(TABS.Speed)}
                        >
                            Speed
                        </button>
                        <button
                            type='button'
                            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Broke })}
                            onClick={() => setActiveTab(TABS.Broke)}
                        >
                            Broke
                        </button>
                        <button
                            type='button'
                            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Mobility })}
                            onClick={() => setActiveTab(TABS.Mobility)}
                        >
                            Mobility
                        </button>
                        <button
                            type='button'
                            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Turbo })}
                            onClick={() => setActiveTab(TABS.Turbo)}
                        >
                            Turbo
                        </button>
                    </div>
                    <div className={styles.main}>
                    {activeTab === TABS.Speed && <Speed />}
                    {activeTab === TABS.Broke && <Broke />}
                    {activeTab === TABS.Mobility && <Mobility />}
                    {activeTab === TABS.Turbo && <Turbo />}
                </div>
        </main>
    )
}