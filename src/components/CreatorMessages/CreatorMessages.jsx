import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getMessages } from '../../ducks/chat/chat';
import styles from './CreatorMessages.module.css';

const CreatorMessages = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.chat);

  const handleChange = (event) => {
    setMessage(() => event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    if (message !== '' && !isLoading) {
      dispatch(createMessage(message)).then(() => dispatch(getMessages()));
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
