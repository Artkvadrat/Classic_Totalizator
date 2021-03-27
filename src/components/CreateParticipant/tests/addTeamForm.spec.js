import React from 'react';
import { shallow } from 'enzyme';
import { Form, Input, Button } from 'antd';

import '../../../setupTests';

import AddTeamForm from '../AddTeamForm';

describe('AddTeamForm component', () => {
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
      newTeam: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [{ type: '', value: '' }]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddTeamForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render 2 parameters and players forms without error', () => {
    const props = {
      newTeam: {
        name: '',
        players: [{ name: '' }, { name: '' }],
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
    wrapper = shallow(<AddTeamForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle changes in inputs', () => {
    const props = {
      newTeam: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [{ type: '', value: '' }]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddTeamForm {...props} />);

    const fakeEvent = {
      target: { value: 'test' }
    };

    const nameInput = wrapper.find(Input).at(0);
    nameInput.simulate('change', fakeEvent);
    expect(props.addData).toHaveBeenCalled();
    expect(props.addData).toHaveBeenCalledTimes(1);
    expect(props.addData).toHaveBeenCalledWith('test', 'changeTeamName');

    const photoLinkInput = wrapper.find(Input).at(1);
    photoLinkInput.simulate('change', fakeEvent);
    expect(props.addData).toHaveBeenCalled();
    expect(props.addData).toHaveBeenCalledTimes(2);
    expect(props.addData).toHaveBeenCalledWith('test', 'changeTeamPhotoLink');
  });

  it('should handle adding new player and parameter', () => {
    const props = {
      newTeam: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [{ type: '', value: '' }]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddTeamForm {...props} />);

    const firstButton = wrapper.find(Button).at(0);
    firstButton.simulate('click');
    expect(props.addNewParameters).toHaveBeenCalled();
    expect(props.addNewParameters).toHaveBeenCalledTimes(1);
    expect(props.addNewParameters).toHaveBeenCalledWith('playerInTeam');

    const secondButton = wrapper.find(Button).at(1);
    secondButton.simulate('click');
    expect(props.addNewParameters).toHaveBeenCalled();
    expect(props.addNewParameters).toHaveBeenCalledTimes(2);
    expect(props.addNewParameters).toHaveBeenCalledWith('parameterForTeam');
  });

  it('should handle submit form', () => {
    const props = {
      newTeam: {
        name: '',
        players: [{ name: '' }],
        photoLink: '',
        parameters: [{ type: '', value: '' }]
      },
      addNewParameters: jest.fn(),
      addData: jest.fn(),
      submitHandler: jest.fn()
    };
    wrapper = shallow(<AddTeamForm {...props} />);

    const form = wrapper.find(Form);
    form.simulate('finish');
    expect(props.submitHandler).toHaveBeenCalled();
    expect(props.submitHandler).toHaveBeenCalledTimes(1);
    expect(props.submitHandler).toHaveBeenCalledWith('teamSubmit');
  });
});
