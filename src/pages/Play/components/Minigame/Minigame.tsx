import styles from './minigame.module.scss';
import { MinigameMask } from '../MinigameMask/MinigameMask';


export function Minigame() {

  return (
    <MinigameMask>
      <div className={styles.minigame}></div>
    </MinigameMask>
  );
}
