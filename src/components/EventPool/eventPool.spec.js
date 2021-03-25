import React from 'react';
import { shallow, mount } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Table, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { getEvents } from '../../ducks/events/events';

import '../../setupTests';

import EventPool from './EventPool';

const { Column } = Table;

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('../../ducks/events/events', () => ({
  getEvents: jest.fn()
}));

describe('EventPool component', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    getEvents.mockReturnValue(Symbol.for('events'));

    useSelector.mockReturnValue({
      isLoading: true,
      eventsData: []
    });
  });

  it('should dispatch action on mount', () => {
    expect(dispatch).not.toHaveBeenCalled();
    expect(getEvents).not.toHaveBeenCalled();

    mount(<EventPool />);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(Symbol.for('events'));
    expect(getEvents).toHaveBeenCalledTimes(1);
  });

  it('should render skeleton if loading in progress', () => {
    const result = shallow(<EventPool />);
    const skeleton = result.find(Skeleton);

    expect(skeleton.length).toEqual(1);
    expect(skeleton.prop('active')).toEqual(true);

    expect(result).toMatchSnapshot();
  });

  it('should render results with no data', () => {
    useSelector.mockReturnValue({
      isLoading: false,
      eventsData: []
    });

    const result = shallow(<EventPool />);

    expect(result.find(Statistic).length).toEqual(2);
    result.find(Statistic).forEach((item) => {
      expect(item.prop('value')).toEqual(0);
    });

    expect(result).toMatchSnapshot();
  });

  describe('should render results with data', () => {
    useSelector.mockReturnValue({
      isLoading: false,
      eventsData: [
        {
          key: '593aa557-5af8-472d-ac3d-fe674ce7da67',
          date: '20:13 22.03',
          player1: 'Hammes - Bode',
          player2: 'Gwen Greenholt',
          sport: 'Joany_Green',
          margin: '2%',
          possibleResults: ['W1', 'X', 'W2'],
          isEnded: false
        },
        {
          key: '40dca2cb-af06-4711-b03b-830387a7a6e9',
          date: '12:36 23.03',
          player1: 'Beier Group',
          player2: 'Klocko - Champlin',
          sport: 'UFC',
          margin: '5.1%',
          possibleResults: ['W1', 'W2'],
          isEnded: true
        },
        {
          key: '868495b6-5d41-4209-9087-5720af12e352',
          date: '03:01 25.03',
          player1: 'Herman Barton',
          player2: 'Gwen Greenholt',
          sport: 'UFC',
          margin: '25%',
          possibleResults: ['W1', 'X', 'W2'],
          isEnded: false
        },
        {
          key: 'ce1c4820-f3f5-4332-87e0-58cc6a757972',
          date: '13:21 25.03',
          player1: 'string',
          player2: 'Kulas Inc',
          sport: 'football',
          margin: '1.5%',
          possibleResults: ['W1', 'X', 'W2'],
          isEnded: true
        },
        {
          key: 'e774d7eb-d373-4291-b1c4-813487b25bcf',
          date: '08:29 26.03',
          player1: 'Kathryn Effertz',
          player2: 'Lyle Russel',
          sport: 'UFC',
          margin: '3%',
          possibleResults: ['W1', 'X', 'W2'],
          isEnded: false
        }
      ]
    });

    const result = shallow(<EventPool />);

    it('should render statistics of events', () => {
      expect(result.find(Statistic).length).toEqual(2);
      expect(result.find(Statistic).map((el) => el.prop('value'))).toEqual([
        5,
        3
      ]);
    });

    it('should render table of events', () => {
      const table = result.find(Table);
      expect(table.length).toEqual(1);
    });

    it('table column status should render correct logic', () => {
      const statusColumn = result.find(Column).at(5);
      const renderFunc = statusColumn.prop('render');
      expect(renderFunc({ isEnded: true })).toEqual('Event finished');
      expect(
        renderFunc({ isEnded: false, possibleResults: ['X'], key: 'id' })
      ).toBeDefined();

      const filterFunc = statusColumn.prop('onFilter');
      expect(filterFunc('', { isEnded: false })).toEqual(true);
      expect(filterFunc('', { isEnded: true })).toEqual(false);
    });

    it('table column action should render correct logic', () => {
      const statusColumn = result.find(Column).at(6);

      const renderFunc = statusColumn.prop('render');
      expect(renderFunc({ isEnded: true, key: 'pageID' })).toEqual(false);
      expect(renderFunc({ isEnded: false, key: 'pageID' })).toEqual(
        <Link to="/edit/pageID">Edit</Link>
      );
    });

    expect(result).toMatchSnapshot();
  });
});
