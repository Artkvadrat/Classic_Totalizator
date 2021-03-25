import HTTPService from '../../services/HTTPService/HTTPService';

export const REQUESTED_BETS = 'bets/requested';
export const RECEIVED_BETS = 'bets/received';
export const RECEIVED_BET = 'bet/received';

const requestedBets = () => ({
  type: REQUESTED_BETS
});

const receivedBets = (data) => ({
  type: RECEIVED_BETS,
  payload: data
});

const receivedBet = (data) => ({
  type: RECEIVED_BET,
  payload: data
});

export const loadBets = () => (dispatch) => {
  dispatch(requestedBets());

  //   return HTTPService.request({
  //     path: '/' // PATH????
  //   }).then((data) => dispatch(receivedBets(data)));
  const data = [
    {
      eventTitle: 'Fighter1 - Fighter2',
      betChoice: 'W1',
      betTime: '1983-07-16T01:55:02.902+00:00',
      eventTime: '2021-03-21T21:52:06.974+00:00',
      betStatus: 'Bet Lost',
      userId: '996',
      key: '996'
    },
    {
      eventTitle: 'Fighter3 - Fighter4',
      betChoice: 'X',
      betTime: '2002-02-24T00:00:00+00:00',
      eventTime: '2001-03-19T18:52:28.93+00:00',
      betStatus: '',
      userId: '997',
      key: '997'
    },
    {
      eventTitle: 'Lorem - Ipsum',
      betChoice: 'W2',
      betTime: '2002-10-14T09:52:32.124+00:00',
      eventTime: '2001-03-24T20:59:40.113+00:00',
      betStatus: 'Win! 12UAH',
      userId: '998',
      key: '998'
    },
    {
      eventTitle: 'Ipsum - Lorem',
      betChoice: 'W1',
      betTime: '2002-03-24T20:59:51.916+00:00',
      eventTime: '2003-03-21T11:08:19.309+00:00',
      betStatus: '',
      userId: '999'
    },
    {
      eventTitle: 'Arsenal - Liverpool',
      betChoice: 'W2',
      betTime: '1995-02-25T00:00:00+00:00',
      eventTime: '2002-03-21T11:08:00+00:00',
      betStatus: 'Bet lost',
      userId: '1000'
    }
  ];

  dispatch(receivedBets(data));
};

let id = 1;
export const loadOneMoreBet = () => (dispatch) => {
  id += 1;
  const data = {
    eventTitle: `${
      [
        'Player1',
        'Player2',
        'Player3',
        'Player4',
        'Player5',
        'Player6',
        'Player7'
      ][Math.floor(Math.random() * 7)]
    } - ${
      [
        'Player1',
        'Player2',
        'Player3',
        'Player4',
        'Player5',
        'Player6',
        'Player7'
      ][Math.floor(Math.random() * 7)]
    }`,
    betChoice: ['W1', 'X', 'W2'][Math.floor(Math.random() * 3)],
    betTime: new Date().toISOString(),
    eventTime: '2021-03-27T21:52:06.974+00:00',
    betStatus: '',
    userId: id
  };

  dispatch(receivedBet(data));
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
    case RECEIVED_BET:
      return {
        ...state,
        betsData: [...state.betsData, action.payload]
      };
    default:
      return state;
  }
};

export default betsReducer;
