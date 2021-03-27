import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Skeleton, Table } from 'antd';

import useInterval from '../../services/useInterval/useInterval';
import { loadBets } from '../../ducks/bets/bets';

const BetsPage = () => {
  const dispatch = useDispatch();
  const { isLoading, betsData } = useSelector((state) => state.bets);

  useEffect(() => {
    dispatch(loadBets());
  }, [dispatch]);

  useInterval(() => {
    dispatch(loadBets());
  }, 5000);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <>
      <Row justify="start" style={{ margin: 16 }}>
        <Col span={20}>
          <h1>Bets (live)</h1>
        </Col>
      </Row>

      <Table dataSource={betsData} bordered>
        <Table.ColumnGroup title="Bets">
          <Table.Column title="Time" dataIndex="betTime" key="betTime" />
          <Table.Column title="Stake" dataIndex="betChoice" key="betChoice" />
          <Table.Column title="Amount" dataIndex="betMoney" key="betMoney" />
          <Table.Column title="Status" dataIndex="betStatus" key="betStatus" />
        </Table.ColumnGroup>
        <Table.ColumnGroup title="Event">
          <Table.Column title="Match" dataIndex="eventTitle" key="eventTitle" />
          <Table.Column title="Time" dataIndex="eventTime" key="eventTime" />
        </Table.ColumnGroup>
        <Table.Column title="User" dataIndex="userId" key="userId" />
      </Table>
    </>
  );
};

export default BetsPage;
