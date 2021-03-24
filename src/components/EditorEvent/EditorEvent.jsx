import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  loadData,
  saveEvent,
  changeFieldEvent,
  clearEvent
} from '../../ducks/editorEvent/editorEvent';
import styles from './EditorEvent.module.css';

const CreatorEvent = () => {
  const selector = (state) => state.editorEvent;
  const { event } = useSelector(selector);
  const { startTime, margin } = event;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    dispatch(loadData(id));
  }, [dispatch]);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue =
      fieldName === 'margin' ? +event.target.value : event.target.value;

    dispatch(changeFieldEvent(fieldName, fieldValue));
  };
  const submit = (e) => {
    e.preventDefault();
    if (+margin > 0) {
      saveEvent(event);
      dispatch(clearEvent());
      history.push('/');
    }
  };
  return (
    <form className={styles['form-editor']} onSubmit={submit}>
      <span className={styles['title-value']}>Edit event</span>
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
        value="Зберегти зміни"
      />
    </form>
  );
};
export default CreatorEvent;
