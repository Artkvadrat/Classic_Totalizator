import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../../ducks/loginPage/loginPage';

import '../../setupTests';

import Navigation from './Navigation';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

jest.mock('../../ducks/loginPage/loginPage', () => ({
  logout: jest.fn()
}));

describe('Navigation component', () => {
  let wrapper;

  const dispatch = jest.fn();
  const mockedLogout = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    logout.mockReturnValue(mockedLogout);

    wrapper = shallow(<Navigation />);
  });

  it('should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render 4 menu elements', () => {
    const items = wrapper.find(Menu.Item);

    expect(items.length).toBe(5);
  });

  it('should handle click on button and dispatch logout action', () => {
    const buttonItem = wrapper.find('button');
    buttonItem.simulate('click');

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(logout());
    expect(logout).toHaveBeenCalled();
  });
});
