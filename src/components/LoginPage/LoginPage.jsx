import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './loginPage.module.css';

import {
  loginUser,
  setTokenForAuthorisedUser
} from '../../ducks/loginPage/loginPage';

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoggedIn } = useSelector((state) => state.loginPage);

  if (isLoggedIn) {
    history.push('/');
  }

  useEffect(() => {
    if (window.localStorage.length !== 0) {
      dispatch(
        setTokenForAuthorisedUser(window.localStorage.getItem('jwtToken'))
      );
    }
  }, [dispatch]);

  const submitLoginForm = useMemo(
    () => (e) => {
      e.preventDefault();

      const data = {
        email: e.target[0].value,
        password: e.target[1].value
      };

      dispatch(loginUser(data));
    },
    [dispatch]
  );

  const goBack = useMemo(
    () => () => {
      history.push('/');
    },
    [history]
  );

  return (
    <div>
      <button type="button" className={styles.backButton} onClick={goBack}>
        Назад
      </button>
      <form onSubmit={submitLoginForm} className={styles.loginForm}>
        <p>Email</p>
        <input type="text" />
        <p>Password</p>
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
