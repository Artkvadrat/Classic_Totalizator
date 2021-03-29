import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { loadBets, REQUESTED_BETS, RECEIVED_BETS } from './bets';

jest.mock('../../services/HTTPService/HTTPService', () => ({
  request: () =>
    new Promise((resolve) => {
      resolve({
        betsPreviewForAdmins: [
          {
            bet_Id: 'ff8c2f0e-12e5-4f82-9e22-0f0362aa16ae',
            account_Id: '3efa62a5-dfb4-4c87-bb0b-d76ef04d6026',
            teamConfrontation: 'Conor McGregor - France',
            choice: 'X',
            eventStartime: '',
            betTime: '',
            amount: 450.0,
            status: 'Active'
          },
          {
            bet_Id: '4010a7f8-80d6-4eac-b0ee-fc4937c3b30e',
            account_Id: '3cb46bd3-aed7-42b5-b56d-afb9de071921',
            teamConfrontation: 'Konor - Konor2',
            choice: 'W1',
            eventStartime: '',
            betTime: '',
            amount: 1300,
            status: null
          }
        ]
      });
    })
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('bets reducer', () => {
  describe('test reducer', () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        isLoading: false,
        betsData: []
      });
    });

    it('should handle REQUESTED_BETS action', () => {
      expect(
        reducer({ isLoading: false, betsData: [] }, { type: REQUESTED_BETS })
      ).toEqual({ isLoading: true, betsData: [] });
    });

    it('should handle RECEIVED_USERS action', () => {
      expect(
        reducer(
          { isLoading: true, betsData: [] },
          { type: RECEIVED_BETS, payload: [{ data: 'someData' }] }
        )
      ).toEqual({ isLoading: false, betsData: [{ data: 'someData' }] });
    });
  });

  it('should receive userList by HTTPService.request', () => {
    const expectedActions = [
      { type: REQUESTED_BETS },
      {
        type: RECEIVED_BETS,
        payload: [
          {
            eventTitle: 'Conor McGregor - France',
            betChoice: 'X',
            betTime: '',
            eventTime: '',
            betStatus: 'Active',
            userId: '3efa62a5-dfb4-4c87-bb0b-d76ef04d6026',
            key: 'ff8c2f0e-12e5-4f82-9e22-0f0362aa16ae',
            betMoney: 450
          },
          {
            eventTitle: 'Konor - Konor2',
            betChoice: 'W1',
            betTime: '',
            eventTime: '',
            betStatus: 'Not resolved',
            userId: '3cb46bd3-aed7-42b5-b56d-afb9de071921',
            key: '4010a7f8-80d6-4eac-b0ee-fc4937c3b30e',
            betMoney: 1300
          }
        ]
      }
    ];

    const store = mockStore({ isLoading: false, betsData: [] });

    store.dispatch(loadBets()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
