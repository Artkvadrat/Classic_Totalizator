import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <ul className={styles.menu}>
      <li>
        <Link to="/">All Events</Link>
      </li>

      <li>
        <Link to="/create">Create Event</Link>
      </li>

      <li>
        <Link to="/user">User</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
