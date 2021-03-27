import React from 'react';
import { shallow, mount } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';

import { Skeleton, Table } from 'antd';

import '../../setupTests';

import { loadBets } from '../../ducks/bets/bets';
import BetsPage from './BetsPage';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('../../ducks/bets/bets', () => ({
  loadBets: jest.fn()
}));

describe('BetsPage component', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    loadBets.mockReturnValue(Symbol.for('bets'));

    useSelector.mockReturnValue({
      isLoading: true,
      betsData: []
    });
  });

  it('should dispatch action on mount', () => {
    expect(dispatch).not.toHaveBeenCalled();
    expect(loadBets).not.toHaveBeenCalled();

    mount(<BetsPage />);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(Symbol.for('bets'));
    expect(loadBets).toHaveBeenCalledTimes(1);
  });

  it('should render skeleton if loading in progress', () => {
    const result = shallow(<BetsPage />);
    const skeleton = result.find(Skeleton);

    expect(skeleton.length).toEqual(1);
    expect(skeleton.prop('active')).toEqual(true);

    expect(result).toMatchSnapshot();
  });

  describe('should render results with data', () => {
    useSelector.mockReturnValue({
      isLoading: false,
      betsData: [
        {
          eventTitle: 'Conor McGregor - France',
          betChoice: 'X',
          betTime: '12:21 27.03.2021',
          eventTime: '21:10 03.04.2021',
          betStatus: 'Active',
          userId: '3efa62a5-dfb4-4c87-bb0b-d76ef04d6026',
          key: 'ff8c2f0e-12e5-4f82-9e22-0f0362aa16ae',
          betMoney: 450
        },
        {
          eventTitle: 'Conor McGregor - France',
          betChoice: 'W1',
          betTime: '12:21 27.03.2021',
          eventTime: '21:10 03.04.2021',
          betStatus: 'Active',
          userId: '3efa62a5-dfb4-4c87-bb0b-d76ef04d6026',
          key: 'e67bc945-c328-463b-a5d5-9128c85c186d',
          betMoney: 450
        }
      ]
    });

    const result = shallow(<BetsPage />);

    it('should render table of events', () => {
      const table = result.find(Table);
      expect(table.length).toEqual(1);
    });

    expect(result).toMatchSnapshot();
  });
});
