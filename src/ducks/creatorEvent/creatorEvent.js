import HTTPService from '../../services/HTTPService/HTTPService';

export const LOADED_DATA = 'admin_panel/creator_event/loaded_data';
export const CHANGED_FIELD = 'admin_panel/creator_event/changed_field';
export const CLEAR_DATA = 'admin_panel/creator_event/clear_data';

export const loaded = (values) => ({
  type: LOADED_DATA,
  payload: {
    participants: values[0].participants,
    sports: values[1].sports
  }
});

export const changed = (name, value) => ({
  type: CHANGED_FIELD,
  payload: {
    fieldName: name,
    fieldValue: value
  }
});

export const clear = () => ({
  type: CLEAR_DATA
});

export const loadData = () => (dispatch) => {
  const loadSport = () => HTTPService.request({ path: '/api/Sports' });

  const loadParticipants = () =>
    HTTPService.request({
      path: '/api/Participants'
    });

  return Promise.all([loadParticipants(), loadSport()]).then((data) => {
    dispatch(loaded(data));
  });
};

export const clearData = () => (dispatch) => {
  dispatch(clear());
};

export const changeFieldEvent = (fieldName, fieldValue) => (dispatch) => {
  dispatch(changed(fieldName, fieldValue));
};

export const createEvent = (data) => {
  HTTPService.request({
    method: 'POST',
    path: '/api/Events',
    body: { ...data }
  });
};

const initialState = {
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED_DATA:
      return {
        ...state,
        participants: action.payload.participants,
        sports: action.payload.sports
      };
    case CHANGED_FIELD:
      return {
        ...state,
        addEvent: {
          ...state.addEvent,
          [action.payload.fieldName]: action.payload.fieldValue
        }
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
