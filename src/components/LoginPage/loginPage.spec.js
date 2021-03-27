import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../ducks/loginPage/loginPage';

import '../../setupTests';

import LoginPage from './LoginPage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('../../ducks/loginPage/loginPage', () => ({
  loginUser: jest.fn()
}));

describe('LoginPage component', () => {
  const dispatch = jest.fn();
  const mockedLoginUser = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    loginUser.mockReturnValue(mockedLoginUser);
  });

  it('should render without error', () => {
    useSelector.mockReturnValueOnce({ isLoading: false, isError: false });
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render spinner without error', () => {
    useSelector.mockReturnValueOnce({ isLoading: true, isError: false });
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render form with error message without error', () => {
    useSelector.mockReturnValueOnce({ isLoading: false, isError: true });
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render form without error', () => {
    useSelector.mockReturnValueOnce({ isLoading: false, isError: false });
    const wrapper = shallow(<LoginPage />);

    expect(wrapper.find(Form)).toBeDefined();
    expect(wrapper.find(Form)).toMatchSnapshot();
  });

  it('should trigger dispatch on submit form', () => {
    useSelector.mockReturnValueOnce({ isLoading: false, isError: false });
    const wrapper = shallow(<LoginPage />);

    const fakeData = {
      email: 'email',
      password: 'password'
    };

    const form = wrapper.find(Form);
    form.simulate('finish', fakeData);

    const expectedData = {
      email: 'email',
      password: 'password'
    };

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(loginUser());
    expect(loginUser).toHaveBeenCalled();
    expect(loginUser).toHaveBeenCalledWith(expectedData);
  });
});
