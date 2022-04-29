import { H2 } from '@blueprintjs/core';
import utilsStyles from '@sharedStyling/utils.module.scss';

import styles from './index.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <H2 className={styles.title}>Welcome to MindX Teaching Manager</H2>
      <p className={styles.description}>
        Use <code className={utilsStyles.code}>Cmd + p</code> to show command pallete
      </p>
    </div>
  );
};

export default Home;
