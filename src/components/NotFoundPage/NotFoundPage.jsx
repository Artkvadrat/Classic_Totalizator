import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.css';
import NotFoundPageImage from './NotFoundPage.png';

const NotFoundPage = () => (
  <div>
    <h1 className={styles.text}>Page Not Found</h1>
    <div className={styles.image}>
      <img src={NotFoundPageImage} alt="Jean Claude Van Damme" />
    </div>
    <p className={styles.text}>
      Wrong Bet. <Link to="/">Go Home</Link>
    </p>
  </div>
);

export default NotFoundPage;
