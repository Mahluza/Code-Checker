import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import { Row, Form, Input, Button, Typography, Divider } from 'antd';
//import Login from 'antd'; //'ant-design-pro/lib/Login';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import './loginAndRegistration.css';
import { useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

// difference between doing a class and a function?

// from typography module import Title class. And assign it to a variable Title?
const { Title } = Typography;
const instance = axios.create({ baseURL: 'http://localhost:4000' });

function LogInPage() {
  let history = useHistory();
  let dispatch = useDispatch();

  const registerClick = () => {
    history.push('/register');
  };
  // set state of empty errMessage
  // if err message has something in it render it
  const [errMessage, setErr] = useState('');

  const onFinish = (values: any) => {
    instance
      .post('/users/validate', values)
      .then((result) => {
        console.log(result, values);

        if (result.data.accessToken) {
          const user = { userToken: result.data.accessToken };
          dispatch(allActions.userActions.setUser(user));
          localStorage.setItem('userToken', result.data.accessToken);
          localStorage.setItem('userRole', result.data.userDetails.role);
          if (result.data.userDetails.role === 1) history.push('/home');
          else history.push('/student');
        } else {
          setErr(result.data.errMessage);
          console.log('errMessage', errMessage);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    // canyou think of name... as an argument into the Form element?
    // and Form.Item as a class or method within Form

    <div className="center-div">
      <Row align="bottom" justify="center" style={{ minHeight: '35vh' }}>
        <Title>CodeChecker</Title>
      </Row>

      <Row>
        <div className="login-form-container">
          <Row align="bottom" justify="center">
            <h6>Log in to CodeChecker</h6>
          </Row>
          <Row>
            <Form name="login" className="login-form" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Row style={{ height: 35 }}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Row>
              <Row style={{ height: 45 }}>
                <Divider className="divider" />
              </Row>
              <Row justify="center">
                {/* <a href="/register" className="alt-action">
                  Register
                </a> */}
                <Button
                  type="primary"
                  className="login-form-button-register alt-button"
                  onClick={registerClick}
                >
                  Register
                </Button>
              </Row>
              <Row className="err-message-row-login">
                <div className="alertDiv">{errMessage}</div>
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
