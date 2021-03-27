import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getMessages } from '../../ducks/chat/chat';

import '../../setupTests';
import CreatorMessages from './CreatorMessages';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('../../ducks/chat/chat', () => ({
  createMessage: jest.fn(),
  getMessages: jest.fn()
}));

describe('CreatorMessages component', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue({ isLoading: false });
    createMessage.mockReturnValue(Symbol.for('create'));
    getMessages.mockReturnValue(Symbol.for('get'));
    jest.clearAllMocks();
  });

  it('should render form', () => {
    const result = shallow(<CreatorMessages />);
    const form = result.find('.form-message');
    expect(form.exists()).toEqual(true);
    expect(result).toMatchSnapshot();
  });

  it('should create message on submit form', () => {
    const result = shallow(<CreatorMessages />);
    const fakeEvent = {
      preventDefault: jest.fn()
    };

    const form = result.find('.form-message');
    form.simulate('submit', fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
  });
  it('should change state on onChange textarea', () => {
    const result = shallow(<CreatorMessages />);
    const fakeEvent = {
      target: {
        value: 'hello'
      }
    };
    const textarea = result.find('.textarea-message');
    textarea.simulate('change', fakeEvent);
  });
});
