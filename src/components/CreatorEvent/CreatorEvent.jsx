/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  loadData,
  createEvent,
  changeFieldEvent,
  clearData
} from '../../ducks/creatorEvent/creatorEvent';
import selector from './selector/CreatorEvent.selector';

import styles from './CreatorEvent.module.css';

const CreatorEvent = () => {
  const { participants, sports, addEvent } = useSelector(selector);
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
  const submit = (event) => {
    event.preventDefault();
    let isFullForm = true;
    if (participant_Id1 === '' && participants.length > 0) {
      dispatch(changeFieldEvent('participant_Id1', participants[0].id));
    }
    if (participant_Id2 === '' && participants.length > 0) {
      dispatch(changeFieldEvent('participant_Id2', participants[0].id));
    }
    if (+margin <= 0 || participant_Id1 === participant_Id2) {
      isFullForm = false;
    }
    if (isFullForm) {
      createEvent(addEvent);
      dispatch(clearData());
      history.push('/');
    }
  };
  return (
    <form className={styles['form-creator']} onSubmit={submit}>
      <span className={styles['sport-name']}>{sports[0].name}</span>
      <span>Виберіть першу команду/учасника події</span>
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
      <span>Виберіть другу команду/учасника події</span>
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
      <span>Вкажіть маржу, %</span>
      <input
        className={styles['margin-value']}
        type="number"
        name="margin"
        value={margin}
        onChange={handleChange}
      />
      <span>Вкажіть дату та час початку події</span>
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
        value="Створити нову подію"
      />
    </form>
  );
};
export default CreatorEvent;
