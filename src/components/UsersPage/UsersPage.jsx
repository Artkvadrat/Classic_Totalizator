import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Skeleton, Table } from 'antd';
import parseDate from '../../services/dateParse/dateParse';

import { loadUsers } from '../../ducks/usersPage/usersPage';

const UsersPage = () => {
  const dispatch = useDispatch();

  const { isLoading, userList } = useSelector((state) => state.usersPage);

  let parsedUserList;

  if (userList.length) {
    parsedUserList = userList.map(({ email, username, dob, walletAmount }) => ({
      email,
      username,
      dob: parseDate(dob),
      walletAmount,
      key: email
    }));
  }

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <>
      <Row justify="start" style={{ margin: 16 }}>
        <Col span={20}>
          <h1>Users</h1>
        </Col>
      </Row>
      <Table dataSource={parsedUserList}>
        <Table.Column title="Creation time" dataIndex="dob" key="dob" />
        <Table.Column title="User Email" dataIndex="email" key="email" />
        <Table.Column title="Username" dataIndex="username" key="username" />
        <Table.Column
          title="Wallet"
          dataIndex="walletAmount"
          key="walletAmount"
        />
      </Table>
    </>
  );
};

export default UsersPage;
