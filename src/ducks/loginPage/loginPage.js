import HTTPService from '../../services/HTTPService/HTTPService';

export const REQUESTED_JWT_TOKEN = 'login_page/requested';
export const RECEIVED_JWT_TOKEN = 'login_page/received';
export const TESTED_JWT_TOKEN = 'login_page/tested';
export const DENIED_JWT_TOKEN = 'login_page/denied';
export const LOGOUT = 'login_page/logout';

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

const logoutAction = () => ({
  type: LOGOUT
});

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(requestedJwtToken());

  return HTTPService.request({
    method: 'POST',
    path: '/api/Auth/admin/login',
    body: {
      login: email,
      password
    }
  })
    .then(({ jwtString }) => {
      dispatch(receivedJwtToken(jwtString));
    })
    .catch(() => {
      dispatch(deniedJwtToken());
    });
};

export const testJwtTokenFromLocalStorage = (jwtToken) => (dispatch) => {
  dispatch(requestedJwtToken());

  return HTTPService.request({ path: '/api/Events/outcomes' })
    .then(() => {
      dispatch(testedJwtToken(jwtToken));
    })
    .catch(() => {
      dispatch(deniedJwtToken());
    });
};

export const logout = () => (dispatch) => {
  dispatch(logoutAction());
};

const initialState = {
  isLoading: false,
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
        isLoggedIn: true
      };
    case TESTED_JWT_TOKEN:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true
      };
    case DENIED_JWT_TOKEN:
      window.localStorage.clear();
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false
      };
    case LOGOUT:
      window.localStorage.clear();
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default reducer;
