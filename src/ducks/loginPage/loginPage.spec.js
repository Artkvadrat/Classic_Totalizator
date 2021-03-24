import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  loginUser,
  setTokenForAuthorisedUser,
  REQUESTED_JWT_TOKEN,
  RECEIVED_JWT_TOKEN,
  TESTED_JWT_TOKEN,
  DENIED_JWT_TOKEN
} from './loginPage';

jest.mock('../../services/HTTPService', () => ({
  request: () =>
    new Promise((resolve) => {
      resolve({ jwtString: 'testJwtString' });
    })
}));

const HTTPService = require('../../services/HTTPService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginPage reducer', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        isLoading: false,
        isLoggedIn: false
      });
    });

    it('should handle REQUESTED_JWT_TOKEN', () => {
      expect(
        reducer(
          { isLoading: false, isLoggedIn: false },
          {
            type: REQUESTED_JWT_TOKEN
          }
        )
      ).toEqual({ isLoading: true, isLoggedIn: false });
    });

    it('should handle RECEIVED_JWT_TOKEN', () => {
      expect(
        reducer(
          { isLoading: true, isLoggedIn: false },
          {
            type: RECEIVED_JWT_TOKEN,
            payload: 'testJwtToken'
          }
        )
      ).toEqual({
        isLoading: false,
        isLoggedIn: true
      });
    });

    it('should handle TESTED_JWT_TOKEN', () => {
      expect(
        reducer(
          { isLoading: true, isLoggedIn: false },
          {
            type: TESTED_JWT_TOKEN,
            payload: 'testJwtToken'
          }
        )
      ).toEqual({
        isLoading: false,
        isLoggedIn: true
      });
    });

    it('should handle DENIED_JWT_TOKEN', () => {
      expect(
        reducer(
          { isLoading: true, isLoggedIn: false },
          {
            type: DENIED_JWT_TOKEN
          }
        )
      ).toEqual({
        isLoading: false,
        isLoggedIn: false
      });
    });
  });

  describe('Login with email and password', () => {
    it('should get jwtToken and dispatch RECEIVED_JWT_TOKEN', () => {
      const expectedActions = [
        { type: REQUESTED_JWT_TOKEN },
        { type: RECEIVED_JWT_TOKEN, payload: 'testJwtString' }
      ];

      const store = mockStore({ jwtToken: '' });

      return store
        .dispatch(loginUser({ email: 'email', password: 'password' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("shouldn't get jwtToken and dispatch DENIED_JWT_TOKEN because of incorrect data", () => {
      HTTPService.request = jest.fn().mockImplementationOnce(() =>
        Promise.reject(new Error('Bad jwt token')).then(() => ({
          status: 403
        }))
      );

      const store = mockStore({ jwtToken: '' });

      const expectedActions = [
        { type: REQUESTED_JWT_TOKEN },
        { type: DENIED_JWT_TOKEN }
      ];

      return store.dispatch(loginUser({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Testing jwtToken from localStorage', () => {
    it('should test jwtToken by sending request on sports outcomes api', () => {
      HTTPService.request = jest.fn().mockImplementationOnce(() =>
        Promise.resolve(() => ({
          sports: ['W1', 'X', 'W2']
        }))
      );

      const expectedActions = [
        { type: REQUESTED_JWT_TOKEN },
        {
          type: TESTED_JWT_TOKEN,
          payload: 'testJwtString'
        }
      ];

      const store = mockStore({ jwtToken: '' });

      return store
        .dispatch(setTokenForAuthorisedUser('testJwtString'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  it("shouldn't set jwtToken and dispatch DENIED_JWT_TOKEN because of incorrect jwtToken", () => {
    HTTPService.request = jest.fn().mockImplementationOnce(() =>
      Promise.reject(new Error('Bad jwt token')).then(() => ({
        status: 403
      }))
    );

    const expectedActions = [
      { type: REQUESTED_JWT_TOKEN },
      { type: DENIED_JWT_TOKEN }
    ];

    const store = mockStore({ jwtToken: '' });

    return store.dispatch(setTokenForAuthorisedUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
