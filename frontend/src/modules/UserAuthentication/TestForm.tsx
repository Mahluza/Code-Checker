import React from 'react';
import { Radio } from 'antd';
import './loginAndRegistration.css';

const TestForm = () => {
  const onChange = (values: any) => {
    console.log('chosen value is,', values);
  };

  return (
    <Radio.Group name="role" onChange={onChange} value={null}>
      <Radio value={1}>Instructor</Radio>
      <Radio value={2}>Student</Radio>
    </Radio.Group>
  );
};

export default TestForm;
