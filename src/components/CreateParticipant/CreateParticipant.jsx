import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Result, Button, Row } from 'antd';

import {
  sendParticipant,
  resetError
} from '../../ducks/createParticipant/createParticipant';

import AddTeamForm from './AddTeamForm';
import AddPlayerForm from './AddPlayerForm';

const CreateParticipant = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isSent, error } = useSelector((state) => state.createParticipant);

  const [onePlayerForm, setOnePlayerForm] = useState({
    playerForm: true
  });

  const [newParticipant, setNewParticipant] = useState({
    name: '',
    players: [{ name: '' }],
    photoLink: '',
    parameters: [{ type: '', value: '' }]
  });

  const [newTeam, setNewTeam] = useState({
    name: '',
    players: [{ name: '' }],
    photoLink: '',
    parameters: [{ type: '', value: '' }]
  });

  const changeShowingForm = () => {
    setOnePlayerForm((prevState) => {
      const state = { ...prevState };
      state.playerForm = !state.playerForm;
      return state;
    });
  };

  const addData = (newData, type, id) => {
    switch (type) {
      case 'playerParameters': {
        const oldState = { ...newParticipant };
        oldState.parameters[id] = newData;
        return setNewParticipant(oldState);
      }
      case 'changePlayerName': {
        const oldState = { ...newParticipant };
        oldState.name = newData;
        oldState.players[0].name = newData;
        return setNewParticipant(oldState);
      }
      case 'changePlayerPhotoLink': {
        const oldState = { ...newParticipant };
        oldState.photoLink = newData;
        return setNewParticipant(oldState);
      }

      case 'changeTeamName': {
        const oldState = { ...newTeam };
        oldState.name = newData;
        return setNewTeam(oldState);
      }
      case 'changeTeamPhotoLink': {
        const oldState = { ...newTeam };
        oldState.photoLink = newData;
        return setNewTeam(oldState);
      }
      case 'teamParameters': {
        const oldState = { ...newTeam };
        oldState.parameters[id] = newData;
        return setNewTeam(oldState);
      }
      case 'teamPlayers': {
        const oldState = { ...newTeam };
        oldState.players[id] = newData;
        return setNewTeam(oldState);
      }

      default: {
        return false;
      }
    }
  };

  const addNewParameters = (type) => {
    switch (type) {
      case 'parameterForPlayer': {
        const participant = { ...newParticipant };
        participant.parameters.push({ type: '', value: '' });
        return setNewParticipant(participant);
      }
      case 'parameterForTeam': {
        const team = { ...newTeam };
        team.parameters.push({ type: '', value: '' });
        return setNewParticipant(team);
      }
      case 'playerInTeam': {
        const team = { ...newTeam };
        team.players.push({ name: '' });
        return setNewParticipant(team);
      }
      default: {
        return false;
      }
    }
  };

  const submitFormHandler = (type) => {
    switch (type) {
      case 'playerSubmit': {
        return dispatch(sendParticipant(newParticipant));
      }
      case 'teamSubmit': {
        return dispatch(sendParticipant(newTeam));
      }
      default: {
        return false;
      }
    }
  };

  const goToMain = () => {
    dispatch(resetError());
    history.push('/');
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const clearError = () => {
    dispatch(resetError());
  };

  if (isSent) {
    return (
      <Result title="New participant added">
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={goToMain} style={{ margin: '5px' }}>
            Go to main
          </Button>
          <Button type="default" onClick={reloadPage} style={{ margin: '5px' }}>
            Add new participant
          </Button>
        </div>
      </Result>
    );
  }

  if (error) {
    return (
      <Result title="An error occurred" subTitle="Please, try again">
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={goToMain} style={{ margin: '5px' }}>
            Go to main
          </Button>
          <Button type="default" onClick={clearError} style={{ margin: '5px' }}>
            Retry
          </Button>
        </div>
      </Result>
    );
  }

  return onePlayerForm.playerForm ? (
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
      <h2>Adding player</h2>
      <div>
        <Button disabled style={{ margin: '15px' }}>
          Add player
        </Button>
        <Button
          type="primary"
          style={{ margin: '15px' }}
          onClick={changeShowingForm}
        >
          Add team
        </Button>
      </div>
      <AddPlayerForm
        newParticipant={newParticipant}
        addNewParameters={addNewParameters}
        addData={addData}
        submitHandler={submitFormHandler}
      />
    </Row>
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
      <AddTeamForm
        newTeam={newTeam}
        addNewParameters={addNewParameters}
        addData={addData}
        submitHandler={submitFormHandler}
      />
    </Row>
  );
};

export default CreateParticipant;
