import React from 'react';
import { shallow } from 'enzyme';

import '../../setupTests';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage component', () => {
  const wrapper = shallow(<NotFoundPage />);

  it('should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correct structure', () => {
    expect(wrapper.find('h1').prop('children')).toEqual('Page Not Found');
    expect(wrapper.find('img').length).toEqual(1);

    expect(wrapper.find('p').prop('children').length).toEqual(2);
  });

  it('should provide link to main page', () => {
    expect(wrapper.find('Link').prop('to')).toEqual('/');
  });
});
