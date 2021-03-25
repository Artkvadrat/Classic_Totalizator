import HTTPService from '../../services/HTTPService/HTTPService';

export const SENT_PARTICIPANT = 'create_participant/sent';
export const UNSENT_PARTICIPANT = 'create_participant/unsent';
export const CLEAN_ERROR = 'create_participant/clean_error';

const sentParticipant = () => ({
  type: SENT_PARTICIPANT
});

const unsentParticipant = () => ({
  type: UNSENT_PARTICIPANT
});

const cleanError = () => ({
  type: CLEAN_ERROR
});

export const sendParticipant = (participant) => (dispatch) =>
  HTTPService.request({
    method: 'POST',
    path: '/api/Participants',
    body: participant
  })
    .then(() => dispatch(sentParticipant()))
    .catch(() => dispatch(unsentParticipant()));

export const resetError = () => (dispatch) => dispatch(cleanError());

const initialState = {
  isSent: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SENT_PARTICIPANT:
      return {
        ...state,
        isSent: true,
        error: false
      };
    case UNSENT_PARTICIPANT:
      return {
        ...state,
        isSent: false,
        error: true
      };
    case CLEAN_ERROR:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
