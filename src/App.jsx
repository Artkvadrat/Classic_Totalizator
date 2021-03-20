import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';

import styles from './App.module.css';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
