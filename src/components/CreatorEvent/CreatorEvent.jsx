/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import {
  loadData,
  createEvent,
  changeFieldEvent
} from '../../ducks/creatorEvent/creatorEvent';
import selector from './selector/CreatorEvent.selector';
import styles from './CreatorEvent.module.css';

const CreatorEvent = () => {
  const { participants, sports, addEvent, isLoading } = useSelector(selector);
  const { participant_Id1, participant_Id2, startTime, margin } = addEvent;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue =
      event.target.name === 'margin' ? +event.target.value : event.target.value;

    dispatch(changeFieldEvent(fieldName, fieldValue));
  };

  const submit = (e) => {
    e.preventDefault();
    let isFullForm = false;
    let event = {
      ...addEvent
    };
    if (participant_Id1 === '' && participants.length > 0) {
      event = {
        ...event,
        participant_Id1: participants[0].id
      };
    }
    if (participant_Id2 === '' && participants.length > 0) {
      event = {
        ...event,
        participant_Id2: participants[0].id
      };
    }
    if (
      +margin > 0 &&
      participant_Id1 !== participant_Id2 &&
      new Date(startTime) > Date.now()
    ) {
      isFullForm = true;
    }
    if (isFullForm) {
      dispatch(
        createEvent({ ...event, startTime: moment(startTime).format() })
      );
      history.push('/');
    }
  };

  return isLoading ? (
    <Skeleton active />
  ) : (
    <form className={styles['form-creator']} onSubmit={submit}>
      <span className={styles['sport-name']}>{sports[0].name}</span>

      <span>Select the first participant of event </span>
      <select
        className={styles['player-selector']}
        name="participant_Id1"
        onChange={handleChange}
        value={participant_Id1}
        onBlur={undefined}
      >
        {participants.map(({ id, name }) => (
          <option className={styles['player1-option']} key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <span>Select the second participant of event </span>
      <select
        className={styles['player-selector']}
        name="participant_Id2"
        value={participant_Id2}
        onChange={handleChange}
        onBlur={undefined}
      >
        {participants.map(({ id, name }) => (
          <option className={styles['player2-option']} key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <span>Enter the margin, %</span>
      <input
        className={styles['margin-value']}
        type="number"
        name="margin"
        value={margin}
        onChange={handleChange}
      />

      <span>Enter the date of event</span>
      <input
        className={styles['start-data']}
        type="datetime-local"
        name="startTime"
        value={startTime}
        required
        onChange={handleChange}
      />

      <input
        className={styles['create-action']}
        type="submit"
        value="Create new event"
      />
    </form>
  );
};
export default CreatorEvent;
