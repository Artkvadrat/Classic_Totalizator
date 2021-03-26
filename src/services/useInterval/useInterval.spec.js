import React from 'react';
import { mount } from 'enzyme';

import '../../setupTests';
import useInterval from './useInterval';

describe('useTimeout hook', () => {
  it('should set an interval', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    const Wrapper = () => {
      useInterval(spy, 100);

      return <div />;
    };

    mount(<Wrapper />);

    expect(spy).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should stop running on unmount', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    const Wrapper = () => {
      useInterval(spy, 100);

      return <div />;
    };

    const wrapper = mount(<Wrapper />);
    wrapper.unmount();

    jest.runOnlyPendingTimers();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should stop running received null param', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    const Wrapper = () => {
      useInterval(spy, null);

      return <div />;
    };

    mount(<Wrapper />);

    expect(spy).not.toHaveBeenCalled();
  });
});
