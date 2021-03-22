import HTTPService from '../../services/HTTPService';

export const REQUESTED_JWT_TOKEN = 'login_page/requested';
export const RECEIVED_JWT_TOKEN = 'login_page/received';
export const TESTED_JWT_TOKEN = 'login_page/tested';
export const DENIED_JWT_TOKEN = 'login_page/denied';

const requestedJwtToken = () => ({
  type: REQUESTED_JWT_TOKEN
});

const receivedJwtToken = (data) => ({
  type: RECEIVED_JWT_TOKEN,
  payload: data
});

const testedJwtToken = (data) => ({
  type: TESTED_JWT_TOKEN,
  payload: data
});

const deniedJwtToken = () => ({
  type: DENIED_JWT_TOKEN
});

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(requestedJwtToken());

  return HTTPService.request({
    method: 'POST',
    path: '/api/Auth/login',
    body: {
      login: 'Daniel@test.com',
      password: 'admin2'
    }
  })
    .then(({ jwtString }) => {
      dispatch(receivedJwtToken(jwtString));
    })
    .catch(() => {
      dispatch(deniedJwtToken());
    });
};

export const setTokenForAuthorisedUser = (jwtToken) => (dispatch) => {
  dispatch(requestedJwtToken());

  return HTTPService.request({ path: '/api/Events/outcomes' })
    .then(() => {
      dispatch(testedJwtToken(jwtToken));
    })
    .catch(() => {
      window.localStorage.clear();
      dispatch(deniedJwtToken());
    });
};

const initialState = {
  isLoading: false,
  jwtToken: '',
  isLoggedIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED_JWT_TOKEN:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVED_JWT_TOKEN:
      window.localStorage.setItem('jwtToken', action.payload);
      return {
        ...state,
        isLoading: false,
        jwtToken: action.payload,
        isLoggedIn: true
      };
    case TESTED_JWT_TOKEN:
      return {
        ...state,
        isLoading: false,
        jwtToken: action.payload,
        isLoggedIn: true
      };
    case DENIED_JWT_TOKEN:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
