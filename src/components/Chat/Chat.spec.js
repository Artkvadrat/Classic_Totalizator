import React from 'react';
import { shallow, mount } from 'enzyme';
import { Skeleton, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, deleteMessage } from '../../ducks/chat/chat';

import '../../setupTests';

import Chat from './Chat';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('../../ducks/chat/chat', () => ({
  deleteMessage: jest.fn(),
  getMessages: jest.fn()
}));

describe('CreatorMessages component', () => {
  const dispatch = jest.fn(() => Promise.resolve());
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
    useSelector.mockReturnValue({
      isLoading: false,
      messages: [
        {
          key: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          message: 'string',
          userName: 'Vova',
          avatarImg: 'https://avatars.dicebear.com/api/bottts/.png',
          date: '18:20 05.04.2021'
        }
      ]
    });
    deleteMessage.mockReturnValue(Symbol.for('delete'));
    getMessages.mockReturnValue(Symbol.for('get'));
    jest.clearAllMocks();
  });
  it('should dispatch getMessages on mount', () => {
    expect(dispatch).not.toHaveBeenCalled();
    expect(getMessages).not.toHaveBeenCalled();
    mount(<Chat />);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(Symbol.for('get'));
    expect(getMessages).toHaveBeenCalledTimes(1);
  });
  it('should render creator messages and Skeleton', () => {
    useSelector.mockReturnValue({
      isLoading: true,
      messages: [
        {
          key: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          message: 'string',
          userName: 'Vova',
          avatarImg: 'https://avatars.dicebear.com/api/bottts/.png',
          date: '18:20 05.04.2021'
        }
      ]
    });
    const result = shallow(<Chat />);
    const creator = result.find(`CreatorMessages`);
    const skeleton = result.find(Skeleton);

    expect(creator.exists()).toEqual(true);
    expect(skeleton.length).toEqual(1);
    expect(skeleton.prop('active')).toEqual(true);

    expect(result).toMatchSnapshot();
  });
  it('should render creator messages and messages', () => {
    const result = shallow(<Chat />);
    const creator = result.find(`CreatorMessages`);
    const table = result.find(Table);

    expect(table.exists()).toEqual(true);
    expect(creator.exists()).toEqual(true);

    expect(result).toMatchSnapshot();
  });
  it('should delete message on click', () => {
    const result = mount(<Chat />);
    const fakeEvent = {
      target: {
        value: 'dsasdascads'
      }
    };

    const buttonDelete = result.find('.button-delete');
    buttonDelete.simulate('click', fakeEvent);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(deleteMessage).toHaveBeenCalledTimes(1);
    expect(deleteMessage).toHaveBeenCalledWith(fakeEvent.target.value);
    expect(getMessages).toHaveBeenCalledTimes(1);
  });
});
