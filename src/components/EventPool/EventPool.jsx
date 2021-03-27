import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Table, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { getEvents } from '../../ducks/events/events';
import EventFinish from '../EventFinish/EventFinish';

const EventPool = () => {
  const dispatch = useDispatch();
  const { isLoading, eventsData } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <>
      <Row justify="end" style={{ margin: 16 }}>
        <Col span={20}>
          <h1>All events</h1>
        </Col>
        <Col span={2}>
          <Statistic title="Total" value={eventsData.length} />
        </Col>
        <Col span={2}>
          <Statistic
            title="Unfinished"
            value={eventsData.filter((el) => !el.isEnded).length}
          />
        </Col>
      </Row>

      <Table dataSource={eventsData}>
        <Table.Column title="Time" dataIndex="date" key="date" />
        <Table.Column title="Sport" dataIndex="sport" key="sport" />
        <Table.Column title="Player 1" dataIndex="player1" key="player1" />
        <Table.Column title="Player 2" dataIndex="player2" key="player2" />
        <Table.Column title="Margin" dataIndex="margin" key="margin" />
        <Table.Column
          title="Event Status"
          key="status"
          defaultFilteredValue={['Not Resolved']}
          filters={[{ text: 'Not Resolved', value: 'Not Resolved' }]}
          onFilter={(_, record) => !record.isEnded}
          render={({ isEnded, possibleResults, key }) =>
            isEnded ? (
              'Event finished'
            ) : (
              <EventFinish id={key} possibleResults={possibleResults} />
            )
          }
        />
        <Table.Column
          title="Action"
          key="action"
          render={({ isEnded, key }) =>
            !isEnded && <Link to={`/edit/${key}`}>Edit</Link>
          }
        />
      </Table>
    </>
  );
};

export default EventPool;
