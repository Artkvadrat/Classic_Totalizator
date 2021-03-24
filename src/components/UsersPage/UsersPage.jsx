import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadUsers } from '../../ducks/usersPage/usersPage';

const UserPage = () => {
  const dispatch = useDispatch();

  const { isLoading, userList } = useSelector((state) => state.userPage);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  return <h1>Hello World!</h1>;
};

export default UserPage;
