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
  messages: [
    {
      id: '7de6a910-8233-4136-b810-9fb4a6179504',
      text: 'Some',
      username: 'someemail',
      account_Id: '993482b7-c693-4111-9fd3-ecd20dc7a22c',
      avatarLink:
        'https://avatars.dicebear.com/api/human/993482b7-c693-4111-9fd3-ecd20dc7a22c.png',
      time: ''
    },
    {
      id: 'd0c1c7ba-b7f8-4f12-9ac5-7397868ebc5a',
      text: 'Test',
      username: 'sasha',
      account_Id: 'c3ef8b67-56bc-4e0e-a7ec-d54c82dfb3cc',
      avatarLink:
        'https://avatars.dicebear.com/api/human/c3ef8b67-56bc-4e0e-a7ec-d54c82dfb3cc.png',
      time: ''
    }
  ]
};
const structuredData = [
  {
    key: '7de6a910-8233-4136-b810-9fb4a6179504',
    date: '',
    message: 'Some',
    userName: 'someemail',
    avatarImg:
      'https://avatars.dicebear.com/api/human/993482b7-c693-4111-9fd3-ecd20dc7a22c.png'
  },
  {
    key: 'd0c1c7ba-b7f8-4f12-9ac5-7397868ebc5a',
    date: '',
    message: 'Test',
    userName: 'sasha',
    avatarImg:
      'https://avatars.dicebear.com/api/human/c3ef8b67-56bc-4e0e-a7ec-d54c82dfb3cc.png'
  }
];

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
      { type: RECEIVED, payload: structuredData }
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
