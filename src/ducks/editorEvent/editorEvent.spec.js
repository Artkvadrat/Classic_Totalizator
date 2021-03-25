import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  loadData,
  saveEvent,
  changeFieldEvent,
  CHANGED_EVENT,
  CLEAR_EVENT,
  LOADED_EVENT
} from './editorEvent';

const mockedData = {
  id: 'cddsacsdcdsad3e2d',
  margin: 14,
  startTime: '2021-03-24T07:44:17'
};
jest.mock('../../services/HTTPService/HTTPService', () => ({
  request: () =>
    new Promise((resolve) => {
      resolve(mockedData);
    })
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reducer of edditor events', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      event: {
        id: '',
        margin: 0,
        startTime: ''
      },
      isLoading: true
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADED_EVENT', () => {
    expect(
      reducer(initialState, {
        type: LOADED_EVENT,
        payload: {
          id: 'ewdwedewdewdwe',
          margin: 9,
          startTime: '2021-03-24T07:44:17'
        }
      })
    ).toEqual({
      event: {
        id: 'ewdwedewdewdwe',
        margin: 9,
        startTime: '2021-03-24T07:44:17'
      },
      isLoading: false
    });
  });
  it('should handle CHANGED_EVENT', () => {
    expect(
      reducer(initialState, {
        type: CHANGED_EVENT,
        payload: {
          fieldName: 'margin',
          fieldValue: 10
        }
      })
    ).toEqual({
      event: {
        id: '',
        margin: 10,
        startTime: ''
      },
      isLoading: true
    });
  });
  it('should handle CLEAR_EVENT', () => {
    expect(
      reducer(
        {
          event: {
            id: 'erferferf',
            margin: 10,
            startTime: '2021-03-24T07:44:17'
          },
          isLoading: false
        },
        { type: CLEAR_EVENT }
      )
    ).toEqual(initialState);
  });
  it('should handle default case', () => {
    expect(reducer(initialState, { type: 'default_case' })).toEqual(
      initialState
    );
  });
});

describe('Testing actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      event: {
        id: '',
        margin: 0,
        startTime: ''
      },
      isLoading: true
    });
  });

  it('should get event by id', () => {
    const expectedActions = [{ type: LOADED_EVENT, payload: mockedData }];
    const id = 'd1cab471-ccf6-4c95-be21-5b8fc4c054b2';
    store.dispatch(loadData(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should change event', () => {
    const fieldName = 'margin';
    const fieldValue = 10;
    const expectedActions = [
      {
        type: CHANGED_EVENT,
        payload: {
          fieldName,
          fieldValue
        }
      }
    ];
    store.dispatch(changeFieldEvent(fieldName, fieldValue));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should save and clear event data', () => {
    const expectedActions = [{ type: CLEAR_EVENT }];

    store.dispatch(saveEvent()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
