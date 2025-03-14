import { useState } from 'react';
import cx from 'classnames';
import styles from './garage.module.scss';
import ipoon_logo from '@/assets/ipoon_logo.png'
import { Cosmetic } from './components/Cosmetic/Cosmetic';
import { Upgrade } from './components/Upgrage/Upgrade';


const TABS = {
    Upgrade: 'upgrade',
    Cosmetic: 'cosmetic',
};

  export function Garage() {
    const [activeTab, setActiveTab] = useState(TABS.Upgrade);

    return (
        <main className={styles.garage}>
            <div className={styles.content}>
                <img className={styles.centeredImage} src={ipoon_logo} alt="logo" />
                
                <div className={styles.tabsContainer}>
                    <div className={styles.tabs}>
                        <button
                            type='button'
                            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Upgrade })}
                            onClick={() => setActiveTab(TABS.Upgrade)}
                        >
                            Upgrade
                        </button>
                        <button
                            type='button'
                            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Cosmetic })}
                            onClick={() => setActiveTab(TABS.Cosmetic)}
                        >
                            Cosmetic
                        </button>
                    </div>
                </div>

                <div className={styles.main}>
                    {activeTab === TABS.Upgrade && <Upgrade />}
                    {activeTab === TABS.Cosmetic && <Cosmetic />}
                </div>
            </div>
        </main>
    );
}