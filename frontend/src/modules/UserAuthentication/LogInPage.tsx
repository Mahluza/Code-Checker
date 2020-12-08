import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Row, Form, Input, Button, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './loginAndRegistration.css';
import { useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

const { Title } = Typography;
const instance = axios.create({ baseURL: 'http://localhost:4000' });

/**
 * Helper to detect plagiarism across two files or two nodes.
 *
 * @param fileMatch FileMatch to hold all the matches between file1(or node1 of file1) and file2(or node2 of file2)
 * @param node1 node representing file1
 * @param node2 node representing file2
 */

function LogInPage() {
  let history = useHistory();
  let dispatch = useDispatch();

  const registerClick = () => {
    history.push('/register');
  };
  const [errMessage, setErr] = useState('');

  /**
   * function activated when login button is pressed
   *
   * @param values contains all form values
   */
  const onFinish = (values: any) => {
    instance
      .post('/users/validate', values)
      .then((result) => {
        // if access token was returned then user registration was succesful
        if (result.data.accessToken) {
          const user = {
            userToken: result.data.accessToken,
            firstName: result.data.userDetails.firstName,
            lastName: result.data.userDetails.lastName,
          };
          dispatch(allActions.userActions.setUser(user)); // use redux to make user information persists from this point
          // store toke and tole to redux store
          localStorage.setItem('userToken', result.data.accessToken);
          localStorage.setItem('userRole', result.data.userDetails.role);
          // route differently based on user role
          if (result.data.userDetails.role === 1) history.push('/home');
          else history.push('/student');
        } else {
          // if access token was not returned
          // set errMessage state to response from backend
          setErr(result.data.errMessage);
        }
      })
      .catch(function (error) {
        // catch and log any network status errors
        console.log(error);
      });
  };

  return (
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

export default LogInPage;
