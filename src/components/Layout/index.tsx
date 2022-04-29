import { Breadcrumb, Breadcrumbs, Card } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Outlet } from 'react-router-dom';

import styles from './index.module.scss';
import NavBar from './NavBar';

const BREADCRUMBS = [{ href: '/', icon: IconNames.HOME, text: 'Home' }];

const Layout = () => {
  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <div className={styles.bodyContainer}>
        <div className={styles.breadcrumbsContainer}>
          <Breadcrumbs
            items={BREADCRUMBS}
            currentBreadcrumbRenderer={(props) => <Breadcrumb {...props} />}
          />
        </div>
        <Card className={styles.body}>
          <Outlet />
        </Card>
      </div>
    </div>
  );
};
export default Layout;
