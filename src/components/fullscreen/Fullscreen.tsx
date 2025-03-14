import { useState, useEffect } from 'react';
import { postEvent } from '@telegram-apps/sdk';
import styles from './fullscreen.module.scss';

function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const Fullscreen = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        setIsMobileDevice(isMobile());
    }, []);

    const toggleFullScreen = () => {
        if (!fullscreen) {
            postEvent('web_app_request_fullscreen');
            setFullscreen(true);
        } else {
            postEvent('web_app_exit_fullscreen');
            setFullscreen(false);
        }
    };

    return (
        isMobileDevice && (
            <button
             className={styles.fullscreenButton}
             style={{ top: fullscreen ? '90px' : '10px' }}
             onClick={toggleFullScreen}>
                ⛶
            </button>
        )
    );
};

export default Fullscreen;