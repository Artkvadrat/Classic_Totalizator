import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, Button, Space } from 'antd';
import { changeEvent } from '../../ducks/events';

const EventFinish = ({ possibleResults, eventId }) => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState('Not resolved');

  const event = useSelector((state) =>
    state.events.eventsData.find((el) => el.id === eventId)
  );

  const selectHandler = (value) => {
    setSelectedOption(value);
  };

  const finishEventHandler = () => {
    dispatch(
      changeEvent({ ...event, isEnded: true, eventResult: selectedOption })
    );
  };

  return (
    <Space>
      <Select
        style={{ width: 130 }}
        onChange={selectHandler}
        defaultValue={selectedOption}
      >
        <Select.Option value="Not resolved">Not resolved</Select.Option>
        {possibleResults.map((el) => (
          <Select.Option key={el} value={el}>
            {el}
          </Select.Option>
        ))}
      </Select>

      <Button
        disabled={selectedOption === 'Not resolved'}
        type="primary"
        onClick={finishEventHandler}
      >
        Finish
      </Button>
    </Space>
  );
};

EventFinish.propTypes = {
  eventId: PropTypes.string,
  possibleResults: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default EventFinish;
