import React from 'react';
// import { withRouter } from "react-router-dom";
import { Row, Form, Input, Button, Typography } from 'antd';
//import Login from 'antd'; //'ant-design-pro/lib/Login';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import './loginAndRegistration.css';

// difference between doing a class and a function?

// from typography module import Title class. And assign it to a variable Title?
const { Title } = Typography;

function LogInPage() {
  // does it matter if onFinish is defined in here?
  const onFinish = (values: any) => {
    // are you telling it to post to this url?
    // what does then do?
    fetch('http://localhost:4000/users/validate', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(values),
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    console.log('Received following values from form: ', values);
  };

  return (
    // canyou think of name... as an argument into the Form element?
    // and Form.Item as a class or method within Form

    <div className="center-div">
      <Row align="bottom" justify="center" style={{ minHeight: '35vh' }}>
        <Title>CodeChecker</Title>
      </Row>

      <Row align="middle" style={{ minHeight: '35vh' }}>
        <div className="login-form-container">
          <Row align="bottom" justify="center" style={{ minHeight: '8vh' }}>
            <h6>Log in to CodeChecker</h6>
          </Row>
          <Row gutter={[0, 50]} align="middle" style={{ minHeight: '30vh' }}>
            <Form name="login" className="login-form" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Row>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button1"
                  >
                    Log in
                  </Button>
                  <a href="/register" className="alt-action">
                    Register
                  </a>
                </Form.Item>
              </Row>
            </Form>
          </Row>
        </div>
      </Row>
    </div>
  );
}

// is withRouter necessary
// allows redirection?
// what is this.props.history
export default LogInPage;
