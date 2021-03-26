import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMessage } from '../../ducks/chat/chat';
import styles from './CreatorMessages.module.css';

const CreatorMessages = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(() => event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    if (message !== '') {
      // dispatch(createMessage(message));
      setMessage(() => '');
    }
  };

  return (
    <form className={styles['form-message']} onSubmit={submit}>
      <textarea
        className={styles['textarea-message']}
        value={message}
        onChange={handleChange}
      />
      <input
        className={styles['create-message']}
        type="submit"
        value="Add message"
      />
    </form>
  );
};
export default CreatorMessages;
