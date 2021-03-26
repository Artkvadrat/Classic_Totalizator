import React from 'react';
import { shallow } from 'enzyme';
import { Form, Input, Button } from 'antd';

import '../../../setupTests';

import AddPlayerForm from '../AddPlayerForm';

describe('AddPlayerForm component', () => {
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
      newParticipant: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [{ type: '', value: '' }]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddPlayerForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render 2 parameters forms without error', () => {
    const props = {
      newParticipant: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [
          { type: '', value: '' },
          { type: '', value: '' }
        ]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddPlayerForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle changes on inputs', () => {
    const props = {
      newParticipant: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [{ type: '', value: '' }]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddPlayerForm {...props} />);

    const fakeEvent = {
      target: { value: 'test' }
    };

    const nameInput = wrapper.find(Input).at(0);
    nameInput.simulate('change', fakeEvent);
    expect(props.addData).toHaveBeenCalled();
    expect(props.addData).toHaveBeenCalledTimes(1);
    expect(props.addData).toHaveBeenCalledWith('test', 'changePlayerName');

    const photoLinkInput = wrapper.find(Input).at(1);
    photoLinkInput.simulate('change', fakeEvent);
    expect(props.addData).toHaveBeenCalled();
    expect(props.addData).toHaveBeenCalledTimes(2);
    expect(props.addData).toHaveBeenCalledWith('test', 'changePlayerPhotoLink');
  });

  it('should handle submit form', () => {
    const props = {
      newParticipant: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [{ type: '', value: '' }]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddPlayerForm {...props} />);

    const form = wrapper.find(Form);
    form.simulate('finish');
    expect(props.submitHandler).toHaveBeenCalled();
    expect(props.submitHandler).toHaveBeenCalledTimes(1);
    expect(props.submitHandler).toHaveBeenCalledWith('playerSubmit');
  });

  it('should handle adding new parameter', () => {
    const props = {
      newParticipant: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [{ type: '', value: '' }]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddPlayerForm {...props} />);

    const button = wrapper.find(Button).at(0);
    button.simulate('click');
    expect(props.addNewParameters).toHaveBeenCalled();
    expect(props.addNewParameters).toHaveBeenCalledTimes(1);
    expect(props.addNewParameters).toHaveBeenCalledWith('parameterForPlayer');
  });
});
