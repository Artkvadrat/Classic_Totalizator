import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './EventSingle.module.css';
import EventFinish from '../EventFinish/EventFinish';
import { changeEvent } from '../../ducks/eventsList';

const EventSingle = ({ eventData }) => {
  const {
    id,
    participant1,
    participant2,
    startTime,
    sport,
    margin,
    possibleResults,
    isEnded,
    eventResult
  } = eventData;

  const dispatch = useDispatch();

  const getHumanDateFormat = (dateString) => {
    const dateObj = new Date(dateString);
    const addLeadingZeros = (number) => number.toString().padStart(2, '0');

    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();
    let hh = dateObj.getHours();
    let mm = dateObj.getMinutes();

    [month, date, hh, mm] = [month, date, hh, mm].map((el) =>
      addLeadingZeros(el)
    );

    return `${hh}:${mm} ${date}.${month}`;
  };

  const finishEventHandler = (selected) => {
    // dispatch(
    //   dispatcherForChangeEventByVova({ ...eventData, isEnded: true, eventResult: selected })
    // );
    dispatch(
      changeEvent({ ...eventData, isEnded: true, eventResult: selected })
    );
  };

  return (
    <li className={styles.wrapper}>
      <div className={styles.time}>{getHumanDateFormat(startTime)}</div>

      <div className={styles.sport}>{sport.name}</div>

      <div className={styles.participants}>
        <div>{participant1.name}</div>
        <div>{participant2.name}</div>
      </div>

      <div className={styles.margin}>{margin}%</div>

      <div className={styles.edit}>
        <Link to={`/edit/${id}`}>Edit</Link>{' '}
      </div>

      {isEnded ? (
        <div>{eventResult}</div>
      ) : (
        <EventFinish
          finishEventHandler={finishEventHandler}
          possibleResults={possibleResults}
        />
      )}
    </li>
  );
};

EventSingle.propTypes = {
  eventData: PropTypes.shape({
    id: PropTypes.string,
    participant1: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      players: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      photoLink: PropTypes.string,
      parameters: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    }),
    participant2: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      players: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      photoLink: PropTypes.string,
      parameters: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    }),
    startTime: PropTypes.string,
    sport: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    margin: PropTypes.number,
    possibleResults: PropTypes.arrayOf(PropTypes.string),
    isEnded: PropTypes.bool,
    eventResult: PropTypes.string
  }).isRequired
};

export default EventSingle;
