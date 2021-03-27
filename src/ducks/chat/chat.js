/* eslint no-unneeded-ternary: ["error", { "defaultAssignment": true }] */
import HTTPService from '../../services/HTTPService/HTTPService';
import parseDate from '../../services/dateParse/dateParse';

export const REQUESTED = 'chat/requested';
export const RECEIVED = 'chat/received';
export const CREATED = 'event/create';
export const DELETED = 'event/delete';

const requested = () => ({
  type: REQUESTED
});

const received = (data) => ({
  type: RECEIVED,
  payload: data
});

const created = () => ({
  type: CREATED
});

const deleted = () => ({
  type: DELETED
});

export const deleteMessage = (id) => (dispatch) =>
  HTTPService.request({
    method: 'DELETE',
    path: `/api/Chat/${id}`
  }).then(dispatch(deleted()));

export const getMessages = () => (dispatch) => {
  dispatch(requested());

  return HTTPService.request({ path: '/api/Chat' }).then((data) => {
    const array = data.messages
      .sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
      .map(({ id, time, text, username, avatarLink }) => ({
        key: id,
        date: parseDate(time),
        message: text,
        userName: username,
        avatarImg: avatarLink
          ? avatarLink
          : 'https://avatars.dicebear.com/api/bottts/.png'
      }));
    dispatch(received(array));
  });
};

export const createMessage = (data) => (dispatch) =>
  HTTPService.request({
    method: 'POST',
    path: '/api/Chat',
    body: { text: data }
  }).then(dispatch(created()));

const initialState = {
  isLoading: false,
  messages: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVED:
      return {
        ...state,
        isLoading: false,
        messages: [...action.payload]
      };

    case CREATED:
      return {
        ...initialState
      };
    case DELETED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
