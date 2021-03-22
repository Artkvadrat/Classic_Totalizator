import HTTPService from '../services/HTTPService';

const REQUESTED = 'classic_totalizator/events/requested';
const RECEIVED = 'classic_totalizator/events/received';
const EDIT = 'classic_totalizator/events/edit';

const requested = () => ({
  type: REQUESTED
});

const received = (data) => ({
  type: RECEIVED,
  payload: { data }
});

const edit = (data) => ({
  type: EDIT,
  payload: data
});

export const changeEvent = (data) => (dispatch) => {
  dispatch(edit(data));
};

export const getEvents = () => (dispatch) => {
  dispatch(requested());

  HTTPService.request({ path: '/api/Events/feed' }).then((data) => {
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
        eventsData: [...action.payload.data]
      };
    case EDIT:
      return {
        ...state,
        eventsData: state.eventsData.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }

          return el;
        })
      };
    default:
      return state;
  }
};

export default eventsReducer;
