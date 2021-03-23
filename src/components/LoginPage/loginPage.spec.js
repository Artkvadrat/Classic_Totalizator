import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../ducks/loginPage/loginPage';

import '../../setupTests';

import LoginPage from './LoginPage';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: () => ({
    isLoggedIn: false
  })
}));

jest.mock('../../ducks/loginPage/loginPage', () => ({
  loginUser: jest.fn()
}));

describe('LoginPage component', () => {
  let wrapper;
  const history = {
    push: jest.fn()
  };

  const dispatch = jest.fn();

  const mockedLoginUser = jest.fn();

  beforeEach(() => {
    useHistory.mockReturnValue(history);
    useDispatch.mockReturnValue(dispatch);
    loginUser.mockReturnValue(mockedLoginUser);

    wrapper = shallow(<LoginPage />);
  });

  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render button without error', () => {
    expect(wrapper.find('button.backButton')).toBeDefined();
    expect(wrapper.find('button.backButton')).toMatchSnapshot();
  });

  it('should render form without error', () => {
    expect(wrapper.find('form.loginForm')).toBeDefined();
    expect(wrapper.find('form.loginForm')).toMatchSnapshot();
  });

  it('should trigger history.push on click button', () => {
    const button = wrapper.find('button.backButton');
    button.simulate('click');

    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('should trigger dispatch on submit form', () => {
    const fakeEvent = {
      preventDefault: jest.fn(),
      target: [{ value: 'email' }, { value: 'password' }]
    };

    const form = wrapper.find('form.loginForm');
    form.simulate('submit', fakeEvent);

    const expectedData = {
      email: 'email',
      password: 'password'
    };

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(fakeEvent.target[0]).toEqual({ value: 'email' });
    expect(fakeEvent.target[1]).toEqual({ value: 'password' });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(loginUser());
    expect(loginUser).toHaveBeenCalled();
    expect(loginUser).toHaveBeenCalledWith(expectedData);
  });
});
