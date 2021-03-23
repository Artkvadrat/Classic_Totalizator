import HTTPService from '../services/HTTPService';

const REQUESTED = 'events/requested';
const RECEIVED = 'events/received';
const FINISH = 'event/finish';

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

export const finishEvent = (data) => (dispatch) => {
  HTTPService.request({
    method: 'PATCH',
    path: '/api/Events/finishEvent',
    body: data
  });

  dispatch(finish(data));
};

export const getEvents = () => (dispatch) => {
  dispatch(requested());

  HTTPService.request({ path: '/api/Events/feed' }).then((data) => {
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
