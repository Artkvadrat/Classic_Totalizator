import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const AddingParameters = ({ initialData, id, addData, type }) => {
  const [data, setData] = useState(initialData);

  const changeHandler = (e) => {
    setData(() => ({
      ...data,
      [e.target.name]: e.target.value
    }));
  };

  const submitParameter = () => {
    addData(data, type, id);
  };

  const isDataChanged =
    initialData.type === data.type && initialData.value === data.value;

  return (
    <Form.Item layout="horizontal">
      <div style={{ display: 'flex' }}>
        <Input
          name="type"
          placeholder="Type"
          defaultValue={data.type}
          onChange={changeHandler}
          required
        />
        <Input
          name="value"
          placeholder="Value"
          defaultValue={data.value}
          onChange={changeHandler}
          required
          style={{ margin: '0 8px' }}
        />
        <Button
          type="primary"
          htmlType="button"
          disabled={!(!!data.type && !!data.value) || isDataChanged}
          onClick={submitParameter}
        >
          {initialData.type && initialData.value ? 'Save' : 'Add'}
        </Button>
      </div>
    </Form.Item>
  );
};

AddingParameters.propTypes = {
  initialData: PropTypes.object,
  id: PropTypes.number,
  addData: PropTypes.func,
  type: PropTypes.string
};

export default AddingParameters;
