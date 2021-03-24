import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, Button, Space } from 'antd';

import { finishEvent } from '../../ducks/events/events';

const EventFinish = ({ possibleResults, id }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('Not resolved');

  const selectHandler = (value) => {
    setSelectedOption(value);
  };

  const finishEventHandler = () => {
    dispatch(finishEvent({ id, result: selectedOption }));
  };

  return (
    <Space>
      <Select
        style={{ width: 130 }}
        onChange={selectHandler}
        defaultValue={selectedOption}
        value={selectedOption}
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
  id: PropTypes.string,
  possibleResults: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default EventFinish;
