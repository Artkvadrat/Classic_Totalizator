import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row } from 'antd';
import AddOnePlayerForm from './AddOnePlayerForm';

const CreateParticipant = () => {
  const [formsValidity, setAddingOnePlayer] = useState({
    playerForm: true,
    playerFormValidity: false,
    teamFormValidity: false
  });

  const [newParticipant, setNewParticipant] = useState({
    name: '',
    players: [{ name: '' }],
    photoLink: '',
    parameters: [{ type: '', value: '' }]
  });

  // const [newTeam, setNewTeam] = useState({
  //   name: '',
  //   players: [{ name: '' }],
  //   photoLink: '',
  //   parameters: [{ type: '', value: '' }]
  // });

  const changeShowingForm = () => {
    setAddingOnePlayer((prevState) => {
      const state = { ...prevState };
      state.playerForm = !state.playerForm;
      return state;
    });
  };

  const addData = (newData, id, type) => {
    switch (type) {
      case 'playerParameters': {
        const oldState = { ...newParticipant };
        oldState.parameters[id] = newData;
        return setNewParticipant(oldState);
      }
      default: {
        return false;
      }
    }
  };

  // const submitForm = (type) => {};

  const addNewParameterForPlayer = () => {
    const participant = { ...newParticipant };
    participant.parameters.push({ type: '', value: '' });
    setNewParticipant(participant);
  };

  return formsValidity.playerForm ? (
    <AddOnePlayerForm
      changeShowingForm={changeShowingForm}
      newParticipant={newParticipant}
      addNewParameterForPlayer={addNewParameterForPlayer}
      addData={addData}
    />
  ) : (
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
      <Form layout="vertical">
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>
    </Row>
  );
};

export default CreateParticipant;
