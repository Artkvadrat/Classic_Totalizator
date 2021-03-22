import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './EventPool.module.css';
import { getEvents } from '../../ducks/eventsList';
import EventSingle from '../EventSingle/EventSingle';

const EventPool = () => {
  const dispatch = useDispatch();

  const { isLoading, eventsData } = useSelector((state) => state.eventsList);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <ul className={styles.events}>
          {eventsData.map((event) => (
            <EventSingle key={event.id} eventData={event} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventPool;
