import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import eventsReducer from '../ducks/events/events';
import loginPageReducer from '../ducks/loginPage/loginPage';
import usersPageReducer from '../ducks/usersPage/usersPage';

const rootReducer = combineReducers({
  events: eventsReducer,
  loginPage: loginPageReducer,
  userPage: usersPageReducer
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
