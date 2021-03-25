import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const AddingParameters = ({ initialData, id, addData }) => {
  const [data, setData] = useState(initialData);

  const changeHandler = (e) => {
    setData(() => ({
      ...data,
      [e.target.name]: e.target.value
    }));
  };

  const submitParameter = () => {
    addData(data, id, 'playerParameters');
  };

  const isDataChanged =
    initialData.type === data.type && initialData.value === data.value;

  return (
    <Form.Item layout="horizontal">
      <div style={{ display: 'flex' }}>
        <Input name="type" defaultValue={data.type} onChange={changeHandler} />
        <Input
          name="value"
          defaultValue={data.value}
          onChange={changeHandler}
        />
        <Button
          type="primary"
          htmlType="button"
          disabled={!(!!data.type && !!data.value) || isDataChanged}
          onClick={submitParameter}
        >
          Add
        </Button>
      </div>
    </Form.Item>
  );
};

AddingParameters.propTypes = {
  initialData: PropTypes.object,
  id: PropTypes.number,
  addData: PropTypes.func
};

export default AddingParameters;
