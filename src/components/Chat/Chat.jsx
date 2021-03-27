import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Table, Row, Col, Space } from 'antd';
import CreatorMessages from '../CreatorMessages/CreatorMessages';
import { getMessages, deleteMessage } from '../../ducks/chat/chat';
import useInterval from '../../services/useInterval/useInterval';
import styles from './Chat.module.css';

const Chat = () => {
  const { isLoading, messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  useInterval(() => {
    dispatch(getMessages());
  }, 5000);

  const handleClick = (event) => {
    dispatch(deleteMessage(event.target.value)).then(() =>
      dispatch(getMessages())
    );
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <h1>All messages</h1>
        </Col>
        <Col style={{ margin: 16 }}>
          <CreatorMessages />
        </Col>
      </Row>

      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table dataSource={messages}>
          <Table.Column
            title="User"
            key="user"
            render={({ userName, avatarImg }) => (
              <Space size="small">
                <img height="30px" src={avatarImg} alt="avatar" />
                <span>{userName}</span>
              </Space>
            )}
          />
          <Table.Column title="Message" dataIndex="message" key="message" />
          <Table.Column title="Time" dataIndex="date" key="date" />
          <Table.Column
            title="Action"
            key="action"
            render={({ key }) => (
              <button
                className={styles['button-delete']}
                value={key}
                onClick={handleClick}
                type="button"
              >
                Delete
              </button>
            )}
          />
        </Table>
      )}
    </>
  );
};

export default Chat;
