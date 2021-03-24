import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row } from 'antd';

import {
  loginUser,
  testJwtTokenFromLocalStorage
} from '../../ducks/loginPage/loginPage';

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    if (token) {
      dispatch(testJwtTokenFromLocalStorage(token));
    }
  }, [dispatch]);

  const submitLoginForm = useMemo(
    () => (values) => {
      const data = {
        email: values.email,
        password: values.password
      };

      dispatch(loginUser(data));
    },
    [dispatch]
  );

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ textAlign: 'center', paddingTop: '200px' }}
    >
      <Form layout="vertical" onFinish={submitLoginForm}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter email'
            }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter password'
            }
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default LoginPage;
