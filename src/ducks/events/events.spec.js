import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import eventsReducer, {
  REQUESTED,
  RECEIVED,
  FINISH,
  finishEvent,
  getEvents
} from './events';

const mockedData = {
  events: [
    {
      id: '593aa557-5af8-472d-ac3d-fe674ce7da67',
      participant1: {
        id: 'd2428b78-1da6-49bc-aa4d-e559013079a6',
        name: 'Hammes - Bode',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      participant2: {
        id: '838450ed-01aa-46b5-9b95-3f335d6edc9e',
        name: 'Gwen Greenholt',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      startTime: '2021-03-22T18:13:00+00:00',
      sportName: 'Joany_Green',
      margin: 2,
      possibleResults: ['W1', 'X', 'W2'],
      isEnded: false,
      amountW1: 0,
      amountW2: 0,
      amountX: 0
    },
    {
      id: '40dca2cb-af06-4711-b03b-830387a7a6e9',
      participant1: {
        id: '2055a9c9-2860-444f-be65-452fc8f74697',
        name: 'Beier Group',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      participant2: {
        id: 'd0d27025-cbd8-46ac-9aba-737e115364f9',
        name: 'Klocko - Champlin',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      startTime: '2021-03-23T10:36:10.271+00:00',
      sportName: 'UFC',
      margin: 5.1,
      possibleResults: ['W1', 'W2'],
      isEnded: false,
      amountW1: 0,
      amountW2: 0,
      amountX: 0
    }
  ]
};

jest.mock('../../services/HTTPService/HTTPService', () => ({
  request: () =>
    new Promise((resolve) => {
      resolve(mockedData);
    })
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing events duck', () => {
  describe('Testing eventsReducer', () => {
    it('should return the initial state', () => {
      expect(eventsReducer(undefined, {})).toEqual({
        isLoading: false,
        eventsData: []
      });
    });

    it('should handle REQUESTED', () => {
      expect(
        eventsReducer(
          {
            isLoading: false,
            eventsData: []
          },
          {
            type: REQUESTED
          }
        )
      ).toEqual({ isLoading: true, eventsData: [] });
    });

    it('should handle RECEIVED', () => {
      expect(
        eventsReducer(
          { isLoading: true, eventsData: [] },
          {
            type: RECEIVED,
            payload: mockedData
          }
        )
      ).toEqual({
        isLoading: false,
        eventsData: mockedData.events
      });
    });

    it('should handle FINISH', () => {
      const payloadData = { id: mockedData.events[0].id, result: 'W1' };
      expect(
        eventsReducer(
          { isLoading: false, eventsData: mockedData.events },
          {
            type: FINISH,
            payload: payloadData
          }
        ).eventsData.map(({ isEnded }) => isEnded)
      ).toEqual([true, false]);
    });
  });

  describe('Testing actions', () => {
    it('should get events list and dispatch REQUESTED and RECEIVED', () => {
      const expectedActions = [
        { type: REQUESTED },
        { type: RECEIVED, payload: mockedData }
      ];

      const store = mockStore({ isLoading: false, eventsData: [] });

      return store.dispatch(getEvents()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should get information about finished event and submit it to server', () => {
      const data = { id: '12', result: 'W1' };
      const expectedActions = [{ type: FINISH, payload: data }];

      const store = mockStore({ isLoading: false, eventsData: [] });

      return store.dispatch(finishEvent(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
