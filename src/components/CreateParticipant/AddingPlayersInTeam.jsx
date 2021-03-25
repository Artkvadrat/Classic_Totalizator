import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const AddingPlayersInTeam = ({ initialData, id, addData, type }) => {
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

  const isDataChanged = initialData.name === data.name;

  return (
    <Form.Item layout="horizontal">
      <div style={{ display: 'flex' }}>
        <Input
          placeholder="Name"
          name="name"
          defaultValue={data.value}
          onChange={changeHandler}
          required
          style={{ marginRight: '8px' }}
        />
        <Button
          type="primary"
          htmlType="button"
          disabled={!data.name || isDataChanged}
          onClick={submitParameter}
        >
          {initialData.type && initialData.value ? 'Save' : 'Add'}
        </Button>
      </div>
    </Form.Item>
  );
};

AddingPlayersInTeam.propTypes = {
  initialData: PropTypes.object,
  id: PropTypes.number,
  addData: PropTypes.func,
  type: PropTypes.string
};

export default AddingPlayersInTeam;
