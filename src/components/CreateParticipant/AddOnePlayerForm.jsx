import React from 'react';
import { Button, Form, Input, Row } from 'antd';
import PropTypes from 'prop-types';

import AddingParameters from './AddingParameters';

const AddOnePlayerForm = ({
  changeShowingForm,
  newParticipant,
  addNewParameterForPlayer,
  addData
}) => {
  const canAddNewParameter = !newParticipant.parameters[
    newParticipant.parameters.length - 1
  ].type;

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        textAlign: 'center',
        paddingTop: '200px',
        flexDirection: 'column'
      }}
    >
      <h2>Adding player</h2>
      <div>
        <Button disabled style={{ margin: '15px' }}>
          Add player
        </Button>
        <Button
          type="primary"
          style={{ margin: '15px' }}
          onClick={changeShowingForm}
        >
          Add team
        </Button>
      </div>
      <Form layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter name'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Link to photo"
          name="photoLink"
          rules={[
            {
              required: true,
              message: 'Please enter link to photo'
            }
          ]}
        >
          <Input />
        </Form.Item>
        {newParticipant.parameters.map((item, id) => (
          <AddingParameters
            key={id}
            initialData={item}
            id={id}
            addData={addData}
          />
        ))}
        <Form.Item>
          <Button
            onClick={addNewParameterForPlayer}
            disabled={canAddNewParameter}
          >
            Add new parameter
          </Button>
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

AddOnePlayerForm.propTypes = {
  changeShowingForm: PropTypes.func,
  newParticipant: PropTypes.object,
  addNewParameterForPlayer: PropTypes.func,
  addData: PropTypes.func
};

export default AddOnePlayerForm;
