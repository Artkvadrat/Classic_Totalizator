import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../ducks/loginPage/loginPage';

import '../../setupTests';

import LoginPage from './LoginPage';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

jest.mock('../../ducks/loginPage/loginPage', () => ({
  loginUser: jest.fn()
}));

describe('LoginPage component', () => {
  let wrapper;

  const dispatch = jest.fn();
  const mockedLoginUser = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    loginUser.mockReturnValue(mockedLoginUser);

    wrapper = shallow(<LoginPage />);
  });

  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render form without error', () => {
    expect(wrapper.find(Form)).toBeDefined();
    expect(wrapper.find(Form)).toMatchSnapshot();
  });

  it('should trigger dispatch on submit form', () => {
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
