import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  loadUsers,
  REQUESTED_USERS,
  RECEIVED_USERS
} from './usersPage';

jest.mock('../../services/HTTPService/HTTPService', () => ({
  request: () =>
    new Promise((resolve) => {
      resolve([
        {
          email: '1616362331@postman.test',
          dob: '1983-07-16T01:55:02.902+00:00',
          walletAmount: 0
        }
      ]);
    })
}));

const HTTPService = require('../../services/HTTPService/HTTPService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('userPage reducer', () => {
  describe('test reducer', () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        isLoading: false,
        userList: []
      });
    });

    it('should handle REQUESTED_USERS action', () => {
      expect(
        reducer({ isLoading: false, userList: [] }, { type: REQUESTED_USERS })
      ).toEqual({ isLoading: true, userList: [] });
    });

    it('should handle RECEIVED_USERS action', () => {
      expect(
        reducer(
          { isLoading: true, userList: [] },
          { type: RECEIVED_USERS, payload: [{ data: 'someData' }] }
        )
      ).toEqual({ isLoading: false, userList: [{ data: 'someData' }] });
    });
  });

  it('should receive userList by HTTPService.request', () => {
    const expectedActions = [
      { type: REQUESTED_USERS },
      {
        type: RECEIVED_USERS,
        payload: [
          {
            email: '1616362331@postman.test',
            dob: '1983-07-16T01:55:02.902+00:00',
            walletAmount: 0
          }
        ]
      }
    ];

    const store = mockStore({ isLoading: false, userList: [] });

    return store.dispatch(loadUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
