import HTTPService from '../services/HTTPService';

const REQUESTED = 'classic_totalizator/events/requested';
const RECEIVED = 'classic_totalizator/events/received';

const requested = () => ({
  type: REQUESTED
});

const received = (data) => ({
  type: RECEIVED,
  payload: { data }
});

export const getEvents = () => (dispatch) => {
  dispatch(requested());

  /**
   * Shall we use pagination in all events request?
   * If so, add pagination skip limit to path and to getEvents(skip, limit)
   */
  HTTPService.request({ path: '/api/Events' }).then((data) => {
    dispatch(received(data));
  }, []);
};

const initialState = {
  isLoading: false,
  eventsData: []
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED:
      return { ...state, isLoading: true };
    case RECEIVED:
      return {
        isLoading: false,
        eventsData: [...state.eventsData, ...action.payload.data]
      };
    default:
      return state;
  }
};

export default eventsReducer;
