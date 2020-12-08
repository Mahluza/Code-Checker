import { Modal, Button, Form, Input } from 'antd';
import React from 'react';
import axios from 'axios';

interface IMessageModalProps {
  visible: boolean;
  handleCancel: () => void;
}

const instance = axios.create({ baseURL: 'http://localhost:4000' });

function MessageModal(props: IMessageModalProps) {
  const accessToken = localStorage.getItem('userToken');

  const onFinish = (values: any) => {
    console.log('values:', values);
    instance
      .post(
        '/users/notification',
        {
          studentEmail: values.studentEmail,
          messageBody: values.messageBody,
          messageTitle: values.messageTitle,
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        props.handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal visible={props.visible} onCancel={props.handleCancel} footer={null}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ paddingTop: 25, paddingRight: 20 }}
      >
        <Form.Item name="studentEmail">
          <Input placeholder="Student Email" />
        </Form.Item>

        <Form.Item name="messageTitle">
          <Input placeholder="Subject" />
        </Form.Item>

        <Form.Item name="messageBody">
          <Input.TextArea style={{ height: 200 }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="send-button">
            Send
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MessageModal;
