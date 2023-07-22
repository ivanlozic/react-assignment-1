import React from 'react';
import { CustomRedirect } from '../../components/custom-redirect';
import styles from './PageNotFound.module.scss';

const PageNotFound = (): JSX.Element => {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <CustomRedirect to="/">
        <p>Back</p>
      </CustomRedirect>
    </div>
  );
};

export default PageNotFound;
