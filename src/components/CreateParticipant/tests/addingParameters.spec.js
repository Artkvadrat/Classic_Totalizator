import React from 'react';
import { shallow } from 'enzyme';
import { Input, Button } from 'antd';

import '../../../setupTests';

import AddingParameters from '../AddingParameters';

describe('AddingParameters component', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without error', () => {
    const props = {
      initialData: { type: 'type', value: 'value' },
      id: 0,
      addData: jest.fn(),
      type: 'player'
    };

    wrapper = shallow(<AddingParameters {...props} />);
    expect(wrapper).toMatchSnapshot();

    const firstInput = wrapper.find(Input).at(0);
    expect(firstInput.prop('defaultValue')).toEqual('type');

    const secondInput = wrapper.find(Input).at(1);
    expect(secondInput.prop('defaultValue')).toEqual('value');
  });

  it('should handle submit Form.Item', () => {
    const props = {
      initialData: { type: 'type', value: 'value' },
      id: 0,
      addData: jest.fn(),
      type: 'player'
    };

    wrapper = shallow(<AddingParameters {...props} />);

    const button = wrapper.find(Button);
    button.simulate('click');
    expect(props.addData).toHaveBeenCalled();
    expect(props.addData).toHaveBeenCalledTimes(1);
  });
});
