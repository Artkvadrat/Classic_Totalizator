import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import eventsReducer from '../ducks/events/events';
import loginPageReducer from '../ducks/loginPage/loginPage';
import usersPageReducer from '../ducks/usersPage/usersPage';
import creatorEventReducer from '../ducks/creatorEvent/creatorEvent';
import editorEventReducer from '../ducks/editorEvent/editorEvent';

const rootReducer = combineReducers({
  events: eventsReducer,
  loginPage: loginPageReducer,
  usersPage: usersPageReducer,
  editorEvent: editorEventReducer,
  creatorEvent: creatorEventReducer
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
