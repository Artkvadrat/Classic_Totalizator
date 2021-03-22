import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import reducer, {
  loginUser,
  setTokenForAuthorisedUser,
  REQUESTED_JWT_TOKEN,
  RECEIVED_JWT_TOKEN,
  TESTED_JWT_TOKEN,
  DENIED_JWT_TOKEN
} from './loginPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginPage reducer', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        isLoading: false,
        jwtToken: '',
        isLoggedIn: false
      });
    });

    it('should handle REQUESTED_JWT_TOKEN', () => {
      expect(
        reducer(
          { isLoading: false, jwtToken: '', isLoggedIn: false },
          {
            type: REQUESTED_JWT_TOKEN
          }
        )
      ).toEqual({ isLoading: true, jwtToken: '', isLoggedIn: false });
    });

    it('should handle RECEIVED_JWT_TOKEN', () => {
      expect(
        reducer(
          { isLoading: true, jwtToken: '', isLoggedIn: false },
          {
            type: RECEIVED_JWT_TOKEN,
            payload: 'testJwtToken'
          }
        )
      ).toEqual({
        isLoading: false,
        jwtToken: 'testJwtToken',
        isLoggedIn: true
      });
    });

    it('should handle TESTED_JWT_TOKEN', () => {
      expect(
        reducer(
          { isLoading: true, jwtToken: '', isLoggedIn: false },
          {
            type: TESTED_JWT_TOKEN,
            payload: 'testJwtToken'
          }
        )
      ).toEqual({
        isLoading: false,
        jwtToken: 'testJwtToken',
        isLoggedIn: true
      });
    });

    it('should handle DENIED_JWT_TOKEN', () => {
      expect(
        reducer(
          { isLoading: true, jwtToken: '', isLoggedIn: false },
          {
            type: DENIED_JWT_TOKEN
          }
        )
      ).toEqual({
        isLoading: false,
        jwtToken: '',
        isLoggedIn: false
      });
    });
  });

  describe('Login with email and password', () => {
    it('should get jwtToken and dispatch RECEIVED_JWT_TOKEN', () => {
      fetchMock.post(
        'path:/api/Auth/login',
        {
          status: 200,
          body: {
            jwtString: 'testJwtToken'
          }
        },
        {
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
          },
          body: {
            login: 'Daniel@test.com',
            password: 'admin2'
          }
        }
      );

      const expectedActions = [
        { type: REQUESTED_JWT_TOKEN },
        { type: RECEIVED_JWT_TOKEN, payload: 'testJwtToken' }
      ];

      const store = mockStore({ jwtToken: '' });

      return store.dispatch(loginUser({})).then(() => {
        expect(fetchMock.called()).toEqual(true);
        expect(fetchMock.calls().length).toEqual(1);
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("shouldn't get jwtToken and dispatch DENIED_JWT_TOKEN because of incorrect data", () => {
      fetchMock.post('path:/api/Auth/login', 403, {
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json'
        },
        body: {
          login: 'Daniel@test.com',
          password: 'admin123'
        }
      });

      const expectedActions = [
        { type: REQUESTED_JWT_TOKEN },
        { type: DENIED_JWT_TOKEN }
      ];

      const store = mockStore({ jwtToken: '' });

      return store.dispatch(loginUser({})).then(() => {
        expect(fetchMock.called()).toBe(false);
        expect(fetchMock.calls().length).toBe(0);
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Testing jwtToken from localStorage', () => {
    it('should test jwtToken by sending request on sports outcomes api', () => {
      fetchMock.get(
        'path:/api/Events/outcomes',
        {
          status: 200,
          body: ['W1']
        },
        {
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
          }
        }
      );

      const expectedActions = [
        { type: REQUESTED_JWT_TOKEN },
        {
          type: TESTED_JWT_TOKEN,
          payload: 'testJwtToken'
        }
      ];

      const store = mockStore({ jwtToken: '' });

      return store
        .dispatch(setTokenForAuthorisedUser('testJwtToken'))
        .then(() => {
          expect(fetchMock.called()).toEqual(true);
          expect(fetchMock.calls().length).toEqual(1);
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  it("shouldn't set jwtToken and dispatch DENIED_JWT_TOKEN because of incorrect jwtToken", () => {
    fetchMock.get('path:/api/Events/outcomes', 403, {
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      }
    });

    const expectedActions = [
      { type: REQUESTED_JWT_TOKEN },
      { type: DENIED_JWT_TOKEN }
    ];

    const store = mockStore({ jwtToken: '' });

    return store.dispatch(loginUser({})).then(() => {
      expect(fetchMock.called()).toBe(false);
      expect(fetchMock.calls().length).toBe(0);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
