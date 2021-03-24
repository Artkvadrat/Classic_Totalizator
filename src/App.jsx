import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import styles from './App.module.css';
import Navigation from './components/Navigation/Navigation';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import UsersPage from './components/UsersPage/UsersPage';
import EventPool from './components/EventPool/EventPool';
import LoginPage from './components/LoginPage/LoginPage';
import CreatorEvent from './components/CreatorEvent/CreatorEvent';
import EditorEvent from './components/EditorEvent/EditorEvent';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.loginPage);

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Navigation />

        <Switch>
          <Route exact path="/">
            <EventPool />
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/create">
            <CreatorEvent />
          </Route>

          <Route path="/edit/:id">
            <EditorEvent />
          </Route>

          <Route path="/users">
            <UsersPage />
          </Route>

          <Route path="/">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
