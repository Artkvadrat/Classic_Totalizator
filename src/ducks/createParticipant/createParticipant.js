import HTTPService from '../../services/HTTPService/HTTPService';

export const SENT_PARTICIPANT = 'create_participant/sent';
export const UNSENT_PARTICIPANT = 'create_participant/unsent';

const sentParticipant = () => ({
  type: SENT_PARTICIPANT
});

const unsentParticipant = () => ({
  type: UNSENT_PARTICIPANT
});

export const sendParticipant = (participant) => (dispatch) =>
  HTTPService.request({
    method: 'POST',
    path: '/api/Participants',
    body: participant
  })
    .then(() => dispatch(sentParticipant()))
    .catch(() => dispatch(unsentParticipant()));

const initialState = {
  isSent: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SENT_PARTICIPANT:
      return {
        ...state,
        isSent: true
      };
    case UNSENT_PARTICIPANT:
      return {
        ...state,
        isSent: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
