import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './EventSingle.module.css';

const EventSingle = ({
  eventData: {
    id,
    sport,
    margin,
    possibleResults,
    startTime,
    participant1,
    participant2
  }
}) => (
  <li className={styles.wrapper}>
    <div className={styles.sport}>Sport: {sport}</div>

    <div className={styles.margin}>
      Time: {new Date(startTime).toLocaleString()}
    </div>

    <div className={styles.outcomes}>
      Outcomes: {possibleResults.join(', ')}
    </div>

    <div className={styles.margin}>Margin: {margin}%</div>

    <ul className={styles.participants}>
      Participants
      {[participant1, participant2].map(({ id, name, photo }) => (
        <li key={id} className={styles.participant}>
          <div>{name}</div>

          <div className={styles.photo}>
            <img src={photo} alt={name} />
          </div>

          {/* Should we add players of participant here?  */}
        </li>
      ))}
    </ul>

    <div className={styles.links}>
      <BrowserRouter>
        <Link to={`/edit/${id}`}>Edit</Link>{' '}
        <Link to={`/finish/${id}`}>Finish</Link>
      </BrowserRouter>
    </div>
  </li>
);

EventSingle.propTypes = {
  eventData: PropTypes.shape({
    id: PropTypes.number,
    participant1: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      players: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      photo: PropTypes.string
    }),
    participant2: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      players: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      photo: PropTypes.string
    }),
    startTime: PropTypes.string,
    sport: PropTypes.string,
    margin: PropTypes.number,
    possibleResults: PropTypes.arrayOf(PropTypes.number)
  }).isRequired
};

export default EventSingle;
