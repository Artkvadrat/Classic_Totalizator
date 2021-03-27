import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  REQUESTED,
  RECEIVED,
  CREATED,
  DELETED,
  getMessages,
  createMessage,
  deleteMessage
} from './chat';

const mockedData = {
  messages: [{}, {}]
};

const structeredData = [{}, {}];
jest.mock('../../services/HTTPService/HTTPService', () => ({
  request: () =>
    new Promise((resolve) => {
      resolve(mockedData);
    })
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reducer of chat', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      isLoading: false,
      messages: []
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REQUESTED', () => {
    expect(reducer(initialState, { type: REQUESTED })).toEqual({
      isLoading: true,
      messages: []
    });
  });
  it('should handle RECEIVED', () => {
    expect(
      reducer(
        {
          isLoading: true,
          messages: []
        },
        {
          type: RECEIVED,
          payload: [{}, {}]
        }
      )
    ).toEqual({
      isLoading: false,
      messages: [{}, {}]
    });
  });
  it('should handle CREATED', () => {
    expect(
      reducer({ isLoading: false, messages: [{}, {}] }, { type: CREATED })
    ).toEqual(initialState);
  });
  it('should handle DELETED', () => {
    expect(
      reducer({ isLoading: false, messages: [{}, {}] }, { type: DELETED })
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
      isLoading: false,
      messages: []
    });
  });
  it('should get all messages', () => {
    const expectedActions = [
      { type: REQUESTED },
      { type: RECEIVED, payload: structeredData }
    ];
    store.dispatch(getMessages()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should create message', () => {
    const expectedActions = [{ type: CREATED }];
    store.dispatch(createMessage());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should delete message', () => {
    const expectedActions = [{ type: DELETED }];
    store.dispatch(deleteMessage()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
