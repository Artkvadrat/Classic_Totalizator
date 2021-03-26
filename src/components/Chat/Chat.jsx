import React from 'react';
import { useSelector } from 'react-redux';
import { Skeleton, Table, Row, Col, Space } from 'antd';

import selector from './Chat.selector';
import CreatorMessages from '../CreatorMessages/CreatorMessages';
import styles from './Chat.module.css';

const Chat = () => {
  const { isLoading, messages } = useSelector(selector);

  // const handleClick = (event) => {
  //   console.log(event.target.value);
  // };

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
