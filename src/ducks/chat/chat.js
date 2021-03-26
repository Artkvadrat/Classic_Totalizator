import HTTPService from '../../services/HTTPService/HTTPService';

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
    dispatch(received(data));
  });
};

export const createMessage = (data) => (dispatch) =>
  HTTPService.request({
    method: 'POST',
    path: '/api/Events',
    body: { text: data }
  });

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
        messages: [...action.payload.messages]
      };

    // case FINISH:
    //   return {
    //     ...state,
    //     eventsData: state.eventsData.map((event) => {
    //       if (event.id === action.payload.id) {
    //         return { ...event, isEnded: true };
    //       }

    //       return event;
    //     })
    //   };

    default:
      return state;
  }
};

export default reducer;
