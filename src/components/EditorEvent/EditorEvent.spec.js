import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { useHistory, useParams } from 'react-router-dom';
import {
  loadData,
  saveEvent,
  changeFieldEvent,
  clearEvent
} from '../../ducks/editorEvent/editorEvent';

import '../../setupTests';

import EditorEvent from './EditorEvent';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  useParams: jest.fn()
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('../../ducks/editorEvent/editorEvent', () => ({
  loadData: jest.fn(),
  saveEvent: jest.fn(),
  changeFieldEvent: jest.fn(),
  clearEvent: jest.fn()
}));

describe('EditorEvent component', () => {
  const history = {
    push: jest.fn()
  };
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    useHistory.mockReturnValue(history);
    loadData.mockReturnValue(Symbol.for('load'));
    changeFieldEvent.mockReturnValue(Symbol.for('change'));
    clearEvent.mockReturnValue(Symbol.for('clear'));
    
    useSelector.mockReturnValue({
      event: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        margin: 5,
        startTime: '2021-05-24T04:55:03'
      }
    });
    jest.clearAllMocks();
  });

  it('should dispatch loadData action on mount', () => {
    const params = { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6' };
    useParams.mockReturnValue(params);
    expect(dispatch).not.toHaveBeenCalled();
    expect(loadData).not.toHaveBeenCalled();

    const result = mount(<EditorEvent />);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(Symbol.for('load'));
    expect(loadData).toHaveBeenCalledTimes(1);
    expect(loadData).toHaveBeenCalledWith(params.id);
  });
  it('should render form', () => {
    const result = shallow(<EditorEvent />);
    const form = result.find('.form-editor');
    expect(form.exists()).toEqual(true);
    expect(result).toMatchSnapshot();
  });
  it('should save event on submit form', () => {
    const result = shallow(<EditorEvent />);
    const fakeEvent = {
      preventDefault: jest.fn()
    };

    const form = result.find('.form-editor');
    form.simulate('submit', fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(saveEvent).toHaveBeenCalledTimes(1);
    expect(saveEvent).toHaveBeenCalledWith({
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      margin: 5,
      startTime: '2021-05-24T04:55:03'
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(Symbol.for('clear'));
    expect(clearEvent).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledTimes(1);
  });
  it("shouldn't save event on submit form", () => {
    useSelector.mockReturnValue({
      event: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        margin: 0,
        startTime: '2021-05-24T04:55:03'
      }
    });

    const result = shallow(<EditorEvent />);
    const fakeEvent = {
      preventDefault: jest.fn()
    };
    const form = result.find('.form-editor');
    form.simulate('submit', fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(saveEvent).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(clearEvent).not.toHaveBeenCalled();
    expect(history.push).not.toHaveBeenCalled();
  });
  it('should dispatch changeFieldEvent action on change field form', () => {
    const result = shallow(<EditorEvent />);
    const fakeEventMargin = {
      target: {
        name: 'margin',
        value: '4'
      }
    };
    const fakeEventDate = {
      target: {
        name: 'startTime',
        value: '2021-05-23T11:18:21'
      }
    };

    const margin = result.find('.margin-value');
    margin.simulate('change', fakeEventMargin);
    const date = result.find('.start-data');
    date.simulate('change', fakeEventDate);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(Symbol.for('change'));
    expect(changeFieldEvent).toHaveBeenCalledTimes(2);
    expect(changeFieldEvent).toHaveBeenNthCalledWith(1, 'margin', 4);
    expect(changeFieldEvent).toHaveBeenNthCalledWith(
      2,
      'startTime',
      '2021-05-23T11:18:21'
    );
  });
});
