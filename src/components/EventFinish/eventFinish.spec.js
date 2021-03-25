import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';
import { finishEvent } from '../../ducks/events/events';

import '../../setupTests';

import EventFinish from './EventFinish';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

jest.mock('../../ducks/events/events', () => ({
  finishEvent: jest.fn()
}));

describe('EventFinish component', () => {
  let wrapper;

  const dispatch = jest.fn();
  const mockedFinishEvent = jest.fn();

  const possibleResults = ['W1', 'X', 'W2'];
  const id = '1234';

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    finishEvent.mockReturnValue(mockedFinishEvent);

    wrapper = shallow(
      <EventFinish possibleResults={possibleResults} id={id} />
    );
  });

  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correct structure', () => {
    expect(wrapper.find('Space').length).toEqual(1);
    expect(
      wrapper.find('ForwardRef(InternalSelect)').props().defaultValue
    ).toEqual('Not resolved');
    expect(wrapper.find('Option').length).toEqual(possibleResults.length + 1);
    expect(wrapper.find('Button').length).toEqual(1);
  });

  it('should render correct values', () => {
    const optionValues = ['Not resolved', ...possibleResults];
    wrapper.find('Option').forEach((node, idx) => {
      expect(node.prop('value')).toEqual(optionValues[idx]);
    });
    expect(wrapper.find('Button').props().children).toEqual('Finish');
  });

  it('should contain button disabled on start', () => {
    expect(wrapper.find('Button').props().disabled).toEqual(true);
  });

  it('should trigger dispatch action on click button', () => {
    const button = wrapper.find('Button');
    button.simulate('click');

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(mockedFinishEvent);
  });

  it('button should become disables and vice-versa depending of options', () => {
    const select = wrapper.find('ForwardRef(InternalSelect)');

    select.simulate('change', wrapper.find('Option').first().props().value);
    expect(wrapper.find('Button').props().disabled).toEqual(true);

    wrapper
      .find('Option')
      .slice(1)
      .forEach((node) => {
        select.simulate('change', node.prop('value'));
        expect(wrapper.find('Button').props().disabled).toEqual(false);
      });
  });
});
