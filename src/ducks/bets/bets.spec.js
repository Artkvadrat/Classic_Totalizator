import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import parseDate from '../../services/dateParse/dateParse';

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
            eventStartime: '2021-04-03T18:10:00+00:00',
            betTime: '2021-03-27T10:21:52.107599+00:00',
            amount: 450.0,
            status: 'Active'
          },
          {
            bet_Id: '4010a7f8-80d6-4eac-b0ee-fc4937c3b30e',
            account_Id: '3cb46bd3-aed7-42b5-b56d-afb9de071921',
            teamConfrontation: 'Konor - Konor2',
            choice: 'W1',
            eventStartime: '2021-03-27T13:34:40.5+00:00',
            betTime: '0001-01-01T00:00:00+00:00',
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
            betTime: '12:21 27.03.2021',
            eventTime: '21:10 03.04.2021',
            betStatus: 'Active',
            userId: '3efa62a5-dfb4-4c87-bb0b-d76ef04d6026',
            key: 'ff8c2f0e-12e5-4f82-9e22-0f0362aa16ae',
            betMoney: 450
          },
          {
            eventTitle: 'Konor - Konor2',
            betChoice: 'W1',
            betTime: '02:02 01.01.1',
            eventTime: '15:34 27.03.2021',
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
