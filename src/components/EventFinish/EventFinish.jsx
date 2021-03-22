/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EventFinish = ({ finishEventHandler, possibleResults }) => {
  const [selectedOption, setSelectedOption] = useState('Not resolved');

  const selectHandler = (e) => {
    setSelectedOption(e.target.value);
  };

  const buttonHandler = () => {
    finishEventHandler(selectedOption);
  };

  return (
    <div>
      <select onChange={selectHandler} selected={selectedOption}>
        <option value="Not resolved">Not resolved</option>
        {possibleResults.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      {selectedOption !== 'Not resolved' && (
        <button type="button" onClick={buttonHandler}>
          Finish
        </button>
      )}
    </div>
  );
};

EventFinish.propTypes = {
  finishEventHandler: PropTypes.func.isRequired,
  possibleResults: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default EventFinish;
