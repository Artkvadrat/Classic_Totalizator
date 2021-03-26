import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';
import { createMessage } from '../../ducks/chat/chat';
import '../../setupTests';
import CreatorMessages from './CreatorMessages';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

jest.mock('../../ducks/chat/chat', () => ({
  createMessage: jest.fn()
}));

describe('CreatorMessages component', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    createMessage.mockReturnValue(Symbol.for('create'));
    jest.clearAllMocks();
  });

  it('should render form', () => {
    const result = shallow(<CreatorMessages />);
    const form = result.find('.form-message');
    expect(form.exists()).toEqual(true);
    expect(result).toMatchSnapshot();
  });

  xit('should create message on submit form', () => {
    const result = shallow(<CreatorMessages />);
    const fakeEvent = {
      preventDefault: jest.fn()
    };

    const form = result.find('.form-message');
    form.simulate('submit', fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(dispatch).toHaveBeenCalledWith(Symbol.for('create'));
    expect(createMessage).toHaveBeenCalledTimes(0);
  });

  xit("shouldn't create event on submit form", () => {
    const result = shallow(<CreatorMessages />);
    const fakeEvent = {
      preventDefault: jest.fn()
    };
    const form = result.find('.form-message');
    form.simulate('submit', fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(createMessage).not.toHaveBeenCalled();
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
