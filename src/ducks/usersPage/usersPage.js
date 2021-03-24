import HTTPService from '../../services/HTTPService';

export const REQUESTED_USERS = 'users_page/requested';
export const RECEIVED_USERS = 'users_page/received';

const requestedUsers = () => ({
  type: REQUESTED_USERS
});

const receivedUsers = (data) => ({
  type: RECEIVED_USERS,
  payload: data
});

export const loadUsers = () => (dispatch) => {
  dispatch(requestedUsers());

  return HTTPService.request({
    path: '/api/v1/account'
  }).then((data) => dispatch(receivedUsers(data)));
};

const initialState = {
  isLoading: false,
  userList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED_USERS:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVED_USERS:
      return {
        ...state,
        isLoading: false,
        userList: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
