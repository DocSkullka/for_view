import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';
import { navigation_routes } from '@/navigation/navigation_routes.ts';
import { NavbarMask } from './components/NavbarMask/NavbarMask.tsx';
import styles from './navbar.module.scss';

export function Navbar() {
  const { pathname } = useLocation();

  const isGamePage = pathname === '/game';

  if (isGamePage) {
    return null;
  }

  return (
    <NavbarMask className={styles.navbar}>
      {navigation_routes.map(({ Icon, path }) => {
        const currentPath = `/${path}`;

        const moduleName = pathname?.split('/').filter((el) => el)?.[0];

        return (
          <Link
            to={currentPath}
            key={path}
            className={cx(styles.item, {
              [styles.itemActive]: moduleName === path,
            })}
          >
            <Icon />
            <p>{path}</p>
          </Link>
        );
      })}
    </NavbarMask>
  );
}
