import { getTest } from '@apis/test';
import { H2 } from '@blueprintjs/core';
import utilsStyles from '@sharedStyling/utils.module.scss';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import styles from './index.module.scss';

const Home = () => {
  useEffect(() => {
    getTest();
  }, []);
  return (
    <div className={styles.container}>
      <Helmet>
        <title>MindX Teaching Manager</title>
      </Helmet>
      <H2 className={styles.title}>Welcome to MindX Teaching Manager</H2>
      <p className={styles.description}>
        Use <code className={utilsStyles.code}>Cmd + p</code> to show command pallete
      </p>
    </div>
  );
};

export default Home;
