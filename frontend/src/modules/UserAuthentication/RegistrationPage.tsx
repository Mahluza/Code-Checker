import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Radio,
  Select,
  Col,
  Row,
  Form,
  Input,
  Button,
  Typography,
  Divider,
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './loginAndRegistration.css';
import allActions from '../../redux/actions/allActions';
import { useDispatch } from 'react-redux';

const { Title } = Typography;
const { Option } = Select;
const instance = axios.create({ baseURL: 'http://localhost:4000' });

function RegistrationPage() {
  const [roleVal, setRole] = useState(1);
  const [insVal, setInstitution] = useState(null);
  const [errMessage, setErr] = useState('');

  let history = useHistory();
  let dispatch = useDispatch();

  /**
   * Changes state of role radio button
   */
  const onRoleChange = (values: any) => {
    setRole(values.target.value);
  };

  /**
   * Changes state of institution select tag
   */
  const onInstitutionChange = (ins: any) => {
    setInstitution(ins);
  };

  /**
   * route user to login page
   */
  const loginClick = () => {
    history.push('/login');
  };

  /**
   * function activated when registration button is pressed
   *
   * @param values contains all form values
   */
  const onFinish = (values: any) => {
    // verify that password and confirm password are the same
    if (values.password === values.confirmPassword) {
      // add some state values to values parameter
      values.role = roleVal;
      values.institution = insVal;
      instance
        .post('/users', values) // post to user registration method in backend
        .then((result) => {
          // if access token was returned then user registration was succesful
          if (result.data.accessToken) {
            const user = { token: result.data.accessToken };
            dispatch(allActions.userActions.setUser(user)); // use redux to make user information persists from this point
            // store user token in redux store
            localStorage.setItem('userToken', result.data.accessToken);
            // route user to login page after registration
            history.push('/login');
          } else {
            // if user was not registered
            // set errMessage state to response from backend
            setErr(result.data.errMessage);
          }
        })
        .catch(function (error) {
          // catch and log any network status errors
        });
    } else setErr("Passwords don't match"); // if passwords don't match
  };

  return (
    <div className="center-div">
      <Row align="bottom" justify="center" style={{ minHeight: '20vh' }}>
        <Title>Registration</Title>
      </Row>
      <Row>
        <div className="register-form-container">
          <Row align="bottom" justify="center">
            <h6>Register for a CodeChecker Account</h6>
          </Row>
          <Row style={{ minHeight: '30vh' }}>
            <Form
              name="registration"
              className="login-form"
              onFinish={onFinish}
            >
              <Row gutter={[24, 8]}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: 'Required',
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: 'Required',
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[0, 24]} style={{ paddingTop: 3 }}>
                <Select
                  placeholder="Institution"
                  style={{ width: '170%' }}
                  onChange={onInstitutionChange}
                >
                  <Option value="other">Other</Option>
                  <Option value="northeastern university">
                    Northeastern University
                  </Option>
                </Select>
              </Row>
              <Row gutter={[0, 18]}>
                <Col span={4}>
                  <text>Role:</text>
                </Col>
                <Col>
                  <Radio.Group
                    name="role"
                    onChange={onRoleChange}
                    defaultValue={1}
                  >
                    <Radio value={1}>Instructor</Radio>
                    <Radio value={2}>Student</Radio>
                  </Radio.Group>
                </Col>
              </Row>
              <Row>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Input placeholder="Email" className="full-length"></Input>
                </Form.Item>
              </Row>
              <Row gutter={[24, 0]}>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Required',
                        // min: 8,
                        pattern: new RegExp(
                          '^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                        ),
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Required',
                        pattern: new RegExp(
                          '^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                        ),
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[0, 18]}>
                <text> - 8 or more chatacters</text>
              </Row>
              <Row gutter={[0, 18]}>
                <text> - mix of at least one letter, number, & symbol</text>
              </Row>
              <Row style={{ paddingTop: 10, height: 40 }}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                  >
                    Register
                  </Button>
                </Form.Item>
              </Row>
              <Row style={{ height: 45 }}>
                <Divider className="divider" />
              </Row>
              <Row justify="center">
                <Button
                  type="primary"
                  className="register-form-button-login alt-button"
                  onClick={loginClick}
                >
                  Log in instead
                </Button>
              </Row>
              <Row className="err-message-row-registration">
                <div className="alertDiv">{errMessage}</div>
              </Row>
            </Form>
          </Row>
        </div>
      </Row>
    </div>
  );
}

export default RegistrationPage;
