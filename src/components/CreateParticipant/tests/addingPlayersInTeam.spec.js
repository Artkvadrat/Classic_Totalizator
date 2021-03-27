import React from 'react';
import { shallow } from 'enzyme';
import { Input, Button } from 'antd';

import '../../../setupTests';

import AddingPlayersInTeam from '../AddingPlayersInTeam';

describe('AddingPlayersInTeam component', () => {
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
      initialData: { value: 'name' },
      id: 0,
      addData: jest.fn(),
      type: 'name'
    };

    wrapper = shallow(<AddingPlayersInTeam {...props} />);
    expect(wrapper).toMatchSnapshot();

    const firstInput = wrapper.find(Input).at(0);
    expect(firstInput.prop('defaultValue')).toEqual('name');
  });

  it('should handle submit Form.Item', () => {
    const props = {
      initialData: { value: 'name' },
      id: 0,
      addData: jest.fn(),
      type: 'name'
    };

    wrapper = shallow(<AddingPlayersInTeam {...props} />);

    const button = wrapper.find(Button);
    button.simulate('click');
    expect(props.addData).toHaveBeenCalled();
    expect(props.addData).toHaveBeenCalledTimes(1);
  });
});
