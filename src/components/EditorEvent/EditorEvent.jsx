import React, { useEffect } from 'react';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import {
  loadData,
  saveEvent,
  changeFieldEvent
} from '../../ducks/editorEvent/editorEvent';
import styles from './EditorEvent.module.css';

const EditorEvent = () => {
  const { event, isLoading } = useSelector((state) => state.editorEvent);
  const { startTime, margin } = event;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadData(id));
  }, [dispatch, id]);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue =
      fieldName === 'margin' ? +event.target.value : event.target.value;

    dispatch(changeFieldEvent(fieldName, fieldValue));
  };

  const submit = (e) => {
    e.preventDefault();

    if (+margin > 0 && moment(startTime) > Date.now()) {
      dispatch(
        saveEvent({ ...event, startTime: moment(startTime).format() }, id)
      ).then(history.push('/'));
    }
  };

  return isLoading ? (
    <Skeleton active />
  ) : (
    <form className={styles['form-editor']} onSubmit={submit}>
      <span className={styles['title-value']}>Change event</span>

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
        value="Save event"
      />
    </form>
  );
};
export default EditorEvent;
