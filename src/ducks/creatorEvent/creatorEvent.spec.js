import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  changeFieldEvent,
  loadData,
  clearData,
  createEvent,
  CHANGED_FIELD,
  CLEAR_DATA,
  LOADED_DATA
} from './creatorEvent';

const HTTPService = require('../../services/HTTPService/HTTPService');

const mockedData = [{}, {}];
jest.mock('../../services/HTTPService/HTTPService', () => ({
  request: () =>
    new Promise((resolve) => {
      resolve(mockedData);
    })
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      participants: [],
      sports: [{}],
      addEvent: {
        participant_Id1: '',
        participant_Id2: '',
        startTime: '',
        possibleResults: ['W1', 'X', 'W2'],
        sportId: 1,
        margin: 0
      }
    });
  });

  it('should get partisipats and sports', () => {
    const expectedActions = [{ type: LOADED_DATA, payload: mockedData }];

    store.dispatch(loadData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should change event', () => {
    const fieldName = 'margin';
    const fieldValue = 10;
    const expectedActions = [
      {
        type: CHANGED_FIELD,
        payload: {
          fieldName,
          fieldValue
        }
      }
    ];
    store.dispatch(changeFieldEvent(fieldName, fieldValue));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should clear event data', () => {
    const expectedActions = [{ type: CLEAR_DATA }];
    store.dispatch(clearData());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Testing creating event', () => {
  it('should make request', () => {
    const event = {
      participant_Id1: 'dwadewdewxd',
      participant_Id2: 'ewdwdewd',
      startTime: '',
      possibleResults: ['W1', 'X', 'W2'],
      sportId: 1,
      margin: 10
    };
    HTTPService.request = jest.fn();

    createEvent(event);

    expect(HTTPService.request).toHaveBeenCalled();
  });
});

describe(' reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      participants: [],
      sports: [{}],
      addEvent: {
        participant_Id1: '',
        participant_Id2: '',
        startTime: '',
        possibleResults: ['W1', 'X', 'W2'],
        sportId: 1,
        margin: 0
      }
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADED_DATA', () => {
    expect(
      reducer(initialState, {
        type: LOADED_DATA,
        payload: {
          participants: [{}, {}],
          sports: [{}]
        }
      })
    ).toEqual({
      participants: [{}, {}],
      sports: [{}],
      addEvent: {
        participant_Id1: '',
        participant_Id2: '',
        startTime: '',
        possibleResults: ['W1', 'X', 'W2'],
        sportId: 1,
        margin: 0
      }
    });
  });
  it('should handle CHANGED_FIELD', () => {
    expect(
      reducer(initialState, {
        type: CHANGED_FIELD,
        payload: {
          fieldName: 'margin',
          fieldValue: 10
        }
      })
    ).toEqual({
      participants: [],
      sports: [{}],
      addEvent: {
        participant_Id1: '',
        participant_Id2: '',
        startTime: '',
        possibleResults: ['W1', 'X', 'W2'],
        sportId: 1,
        margin: 10
      }
    });
  });
  it('should handle CLEAR_DATA', () => {
    expect(
      reducer(
        {
          participants: [{}, {}],
          sports: [{}],
          addEvent: {
            participant_Id1: 'dwadewdewxd',
            participant_Id2: 'ewdwdewd',
            startTime: '',
            possibleResults: ['W1', 'X', 'W2'],
            sportId: 1,
            margin: 10
          }
        },
        { type: CLEAR_DATA }
      )
    ).toEqual(initialState);
  });
  it('should handle default case', () => {
    expect(reducer(initialState, { type: 'default_case' })).toEqual(
      initialState
    );
  });
});
