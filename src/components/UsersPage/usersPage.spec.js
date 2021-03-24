import React from 'react';
import { shallow, mount } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../ducks/usersPage/usersPage';
import parseDate from '../../services/dateParse/dateParse';

import '../../setupTests';

import UsersPage from './UsersPage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../../ducks/usersPage/usersPage', () => ({
  loadUsers: jest.fn()
}));

jest.mock('../../services/dateParse/dateParse', () => jest.fn());

describe('UsersPage component', () => {
  const dispatch = jest.fn();
  const mockedLoadUsers = jest.fn();

  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {}
        };
      };
  });

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    loadUsers.mockReturnValue(mockedLoadUsers);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render list without errors', () => {
    useSelector.mockReturnValueOnce({ isLoading: false, userList: [] });
    const wrapper = shallow(<UsersPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Skeleton without errors', () => {
    useSelector.mockReturnValueOnce({ isLoading: true, userList: [] });
    const wrapper = shallow(<UsersPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch event loadUsers on mount', () => {
    useSelector.mockReturnValueOnce({ isLoading: false, userList: [] });
    mount(<UsersPage />);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(loadUsers());
    expect(loadUsers).toHaveBeenCalled();
  });

  it('should call parseDate function', () => {
    useSelector.mockReturnValueOnce({
      isLoading: false,
      userList: [{ email: 'test', dob: 'test', walletAmount: 0 }]
    });
    shallow(<UsersPage />);
    expect(parseDate).toHaveBeenCalled();
  });
});
