import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import styles from './App.module.css';
import Navigation from './components/Navigation/Navigation';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import UsersPage from './components/UsersPage/UsersPage';
import EventPool from './components/EventPool/EventPool';
import LoginPage from './components/LoginPage/LoginPage';

const App = () => (
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
          Component for create event
          {/* <EventCreate /> */}
        </Route>

        <Route path="/edit/:id">
          Component for edit event
          {/* <EventEdit /> */}
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

export default App;
