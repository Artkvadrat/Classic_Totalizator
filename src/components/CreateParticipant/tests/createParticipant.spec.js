import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { resetError } from '../../../ducks/createParticipant/createParticipant';

import '../../../setupTests';

import CreateParticipant from '../CreateParticipant';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

jest.mock('../../../ducks/createParticipant/createParticipant', () => ({
  resetError: jest.fn()
}));

describe('CreateParticipant component', () => {
  const dispatch = jest.fn();
  const history = {
    push: jest.fn()
  };

  let wrapper;

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
    useHistory.mockReturnValue(history);
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper = '';
  });

  it('should render AddPlayerForm without errors', () => {
    useSelector.mockReturnValue({ isSent: false, error: false });

    wrapper = shallow(<CreateParticipant />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AddTeamForm without errors', () => {
    useSelector.mockReturnValue({ isSent: false, error: false });

    wrapper = shallow(<CreateParticipant />);
    const button = wrapper.find(Button).at(1);
    button.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Result that new participant added', () => {
    useSelector.mockReturnValue({ isSent: true, error: false });

    wrapper = shallow(<CreateParticipant />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger goToMain function in Result', () => {
    useSelector.mockReturnValue({ isSent: true, error: false });

    wrapper = shallow(<CreateParticipant />);

    wrapper.find(Button).at(0).simulate('click');

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(resetError());
    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('should trigger reloadPage function in Result', () => {
    useSelector.mockReturnValue({ isSent: true, error: false });
    delete window.location;
    window.location = { reload: jest.fn() };

    wrapper = shallow(<CreateParticipant />);

    wrapper.find(Button).at(1).simulate('click');

    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith('/create-participant');
  });

  it('should render Result with error', () => {
    useSelector.mockReturnValue({ isSent: false, error: true });

    wrapper = shallow(<CreateParticipant />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger goToMain function in Error', () => {
    useSelector.mockReturnValue({ isSent: false, error: true });

    wrapper = shallow(<CreateParticipant />);

    wrapper.find(Button).at(0).simulate('click');

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(resetError());
    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('should trigger clearError function in Error', () => {
    useSelector.mockReturnValue({ isSent: false, error: true });
    delete window.location;
    window.location = { reload: jest.fn() };

    wrapper = shallow(<CreateParticipant />);

    wrapper.find(Button).at(1).simulate('click');

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(resetError());
  });
});
