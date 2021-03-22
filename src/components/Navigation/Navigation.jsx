import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const Navigation = () => (
  <Menu mode="horizontal">
    <Menu.Item>
      <Link to="/">All Events</Link>
    </Menu.Item>

    <Menu.Item>
      <Link to="/create">Create Event</Link>
    </Menu.Item>

    <Menu.Item>
      <Link to="/users">Users</Link>
    </Menu.Item>
  </Menu>
);

export default Navigation;
