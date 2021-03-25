import HTTPService from '../../services/HTTPService/HTTPService';

export const REQUESTED = 'events/requested';
export const RECEIVED = 'events/received';
export const FINISH = 'event/finish';

const requested = () => ({
  type: REQUESTED
});

const received = (data) => ({
  type: RECEIVED,
  payload: data
});

const finish = (data) => ({
  type: FINISH,
  payload: data
});

export const finishEvent = (data) => (dispatch) =>
  HTTPService.request({
    method: 'POST',
    path: '/api/Events/finish',
    body: data
  }).then(dispatch(finish(data)));

export const getEvents = () => (dispatch) => {
  dispatch(requested());

  return HTTPService.request({ path: '/api/Events' }).then((data) => {
    dispatch(received(data));
  });
};

const initialState = {
  isLoading: false,
  eventsData: []
};

const eventsReducer = (state = initialState, action) => {
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
        eventsData: [...action.payload.events]
      };

    case FINISH:
      return {
        ...state,
        eventsData: state.eventsData.map((event) => {
          if (event.id === action.payload.id) {
            return { ...event, isEnded: true };
          }

          return event;
        })
      };

    default:
      return state;
  }
};

export default eventsReducer;
