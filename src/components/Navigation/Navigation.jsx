import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu } from 'antd';

import { logout } from '../../ducks/loginPage/loginPage';

const Navigation = () => {
  const dispatch = useDispatch();

  const logoutHandler = useMemo(
    () => () => {
      dispatch(logout());
    },
    [dispatch]
  );

  return (
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

      <Menu.Item style={{ float: 'right' }}>
        <button
          type="button"
          onClick={logoutHandler}
          style={{ backgroundColor: 'inherit', border: 0, cursor: 'pointer' }}
        >
          Logout
        </button>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
