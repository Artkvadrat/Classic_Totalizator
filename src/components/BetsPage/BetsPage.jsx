import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Skeleton, Table } from 'antd';

import parseDate from '../../services/dateParse/dateParse';
import useInterval from '../../services/useInterval/useInterval';
import { loadBets, loadOneMoreBet } from '../../ducks/bets/bets';

const BetsPage = () => {
  const dispatch = useDispatch();

  const { isLoading, betsData } = useSelector((state) => state.bets);
  let structuredData;
  if (betsData.length > 0) {
    structuredData = betsData
      .sort((a, b) => Date.parse(b.betTime) - Date.parse(a.betTime))
      .map(
        ({ eventTitle, betChoice, betTime, eventTime, betStatus, userId }) => ({
          eventTitle,
          betChoice,
          betTime: parseDate(betTime),
          eventTime: parseDate(eventTime),
          betStatus,
          userId,
          key: userId
        })
      );
  }

  useEffect(() => {
    dispatch(loadBets());
  }, [dispatch]);

  useInterval(() => {
    dispatch(loadOneMoreBet());
  }, 2000);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <>
      <Row justify="start" style={{ margin: 16 }}>
        <Col span={20}>
          <h1>Bets</h1>
        </Col>
      </Row>

      <Table dataSource={structuredData} bordered>
        <Table.ColumnGroup title="Bet">
          <Table.Column title="Time" dataIndex="betTime" key="betTime" />
          <Table.Column title="Stake" dataIndex="betChoice" key="betChoice" />
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

const Memo = React.memo(BetsPage);
export default Memo;
