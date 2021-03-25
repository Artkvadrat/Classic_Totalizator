import React from 'react';
import { Button, Form, Input, Row } from 'antd';
import PropTypes from 'prop-types';

import AddingParameters from './AddingParameters';
import AddingPlayersInTeam from './AddingPlayersInTeam';

const AddTeamForm = ({
  changeShowingForm,
  newTeam,
  addNewParameters,
  addData,
  submitHandler
}) => {
  const canAddNewParameter = !newTeam.parameters[newTeam.parameters.length - 1]
    .type;
  const canAddNewPlayer = !newTeam.players[newTeam.players.length - 1].name;

  const changeNameHandler = (e) => {
    addData(e.target.value, 'changeTeamName');
  };

  const changePhotoLinkHandler = (e) => {
    addData(e.target.value, 'changeTeamPhotoLink');
  };

  const addParameter = () => addNewParameters('parameterForTeam');

  const addPlayer = () => addNewParameters('playerInTeam');

  const submitForm = () => {
    submitHandler('teamSubmit');
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        textAlign: 'center',
        paddingTop: '200px',
        flexDirection: 'column'
      }}
    >
      <h2>Adding team</h2>
      <div>
        <Button
          type="primary"
          style={{ margin: '15px' }}
          onClick={changeShowingForm}
        >
          Add player
        </Button>
        <Button disabled style={{ margin: '15px' }}>
          Add team
        </Button>
      </div>
      <Form layout="vertical" onFinish={submitForm}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter name'
            }
          ]}
        >
          <Input onChange={changeNameHandler} />
        </Form.Item>

        <Form.Item
          label="Link to photo"
          name="photoLink"
          rules={[
            {
              required: true,
              message: 'Please enter link to photo'
            },
            {
              pattern: /.png$/,
              message: 'Enter .png photo please'
            }
          ]}
        >
          <Input onChange={changePhotoLinkHandler} />
        </Form.Item>

        <div style={{ textAlign: 'left' }}>
          <p>Players</p>
          {newTeam.players.map((item, id) => (
            <AddingPlayersInTeam
              key={id}
              initialData={item}
              id={id}
              addData={addData}
              type="teamPlayers"
            />
          ))}
        </div>

        <Form.Item>
          <Button onClick={addPlayer} disabled={canAddNewPlayer}>
            Add new player
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'left' }}>
          <p>Parameters</p>
          {newTeam.parameters.map((item, id) => (
            <AddingParameters
              key={id}
              initialData={item}
              id={id}
              addData={addData}
              type="teamParameters"
            />
          ))}
        </div>

        <Form.Item>
          <Button onClick={addParameter} disabled={canAddNewParameter}>
            Add new parameter
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

AddTeamForm.propTypes = {
  changeShowingForm: PropTypes.func,
  newTeam: PropTypes.object,
  addNewParameters: PropTypes.func,
  addData: PropTypes.func,
  submitHandler: PropTypes.func
};

export default AddTeamForm;
