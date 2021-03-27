/* eslint-disable camelcase */
import HTTPService from '../../services/HTTPService/HTTPService';
import parseDate from '../../services/dateParse/dateParse';

export const REQUESTED_BETS = 'bets/requested';
export const RECEIVED_BETS = 'bets/received';

const requestedBets = () => ({
  type: REQUESTED_BETS
});

const receivedBets = (data) => ({
  type: RECEIVED_BETS,
  payload: data
});

export const loadBets = () => (dispatch) => {
  dispatch(requestedBets());

  return HTTPService.request({
    path: '/api/Bet/history/admin'
  }).then((data) => {
    const structured = data.betsPreviewForAdmins
      .sort((a, b) => Date.parse(b.betTime) - Date.parse(a.betTime))
      .map(
        ({
          bet_Id,
          account_Id,
          teamConfrontation,
          choice,
          eventStartime,
          betTime,
          amount,
          status
        }) => ({
          eventTitle: teamConfrontation,
          betChoice: choice,
          betTime: parseDate(betTime),
          eventTime: parseDate(eventStartime),
          betStatus: status || 'Not resolved',
          userId: account_Id,
          key: bet_Id,
          betMoney: amount
        })
      );

    dispatch(receivedBets(structured));
  });
};

const initialState = {
  isLoading: false,
  betsData: []
};

const betsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED_BETS:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVED_BETS:
      return {
        ...state,
        isLoading: false,
        betsData: action.payload
      };

    default:
      return state;
  }
};

export default betsReducer;
