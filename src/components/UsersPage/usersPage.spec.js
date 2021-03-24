import React from 'react';
import { shallow, mount } from 'enzyme';
import { Col, Row, Skeleton, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../ducks/usersPage/usersPage';

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

describe('UsersPage component', () => {
  const dispatch = jest.fn();
  const mockedLoadUsers = jest.fn();

  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {}
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
    const wrapper = mount(<UsersPage />);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(loadUsers());
    expect(loadUsers).toHaveBeenCalled();
  });
});
