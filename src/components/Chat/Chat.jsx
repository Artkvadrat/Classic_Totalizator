import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Table, Row, Col, Space } from 'antd';

import { getMessages } from '../../ducks/chat/chat';
import selector from './Chat.selector';
import CreatorMessages from '../CreatorMessages/CreatorMessages';
import styles from './Chat.module.css';

const Chat = () => {
  const dispatch = useDispatch();
  const { isLoading, messages } = useSelector(selector);

  // useEffect(() => {
  //   dispatch(getMessages());
  // }, [dispatch]);
  const handleClick = (event) => {
    console.log(event.target.value);
  };

  return isLoading ? (
    <Skeleton active />
  ) : (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <h1>All messages</h1>
        </Col>
        <Col style={{ margin: 16 }}>
          <CreatorMessages />
        </Col>
      </Row>

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
    </>
  );
};

export default Chat;
