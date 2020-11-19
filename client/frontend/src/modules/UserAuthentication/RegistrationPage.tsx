import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import { Radio, Select, Col, Row, Form, Input, Button, Typography } from "antd";
//import Login from 'antd'; //'ant-design-pro/lib/Login';
import { LockOutlined } from "@ant-design/icons";
// import 'antd/dist/antd.css';
import "./loginAndRegistration.css";
import "./RoleRadio";
import RoleRadio from "./RoleRadio";
import allActions from "../../redux/allActions";
import { useDispatch } from "react-redux";

const { Title } = Typography;
const { Option } = Select;
const instance = axios.create({ baseURL: "http://localhost:4000" });

/*
How make when doing function and not class

onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  */

function RegistrationPage() {
  // what's the difference between
  let state = {
    value: null,
  };

  let institution: string;

  let history = useHistory();
  let dispatch = useDispatch();

  const onRoleChange = (values: any) => {
    console.log("chosen value is,", values);
    state.value = values;
  };

  const onInstitutionChange = (ins: any) => {
    console.log("selected institution is: ", ins);
    institution = ins;
  };

  const onFinish = (values: any) => {
    instance
      .post("/users", values)
      .then((result) => {
        const user = {token : result.data.accessToken}
        dispatch(allActions.userActions.setUser(user));
        localStorage.setItem('userToken', result.data.accessToken);
        history.push("/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    // canyou think of name... as an argument into the Form element?
    // and Form.Item as a class or method within Form

    <div className="center-div">
      <Row align="bottom" justify="center" style={{ minHeight: "30vh" }}>
        <Title>Registration</Title>
      </Row>

      <Row>
        <div className="register-form-container">
          <Row align="bottom" justify="center">
            <h6>Register for a CodeChecker Account</h6>
          </Row>
          <Row style={{ minHeight: "30vh" }}>
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
                        message: "Please enter your first name!",
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
                        message: "Please enter your last name!",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[0, 24]}>
                {/*
                <Form.Item>
                  <Input
                    placeholder="Institution"
                    className="full-length"
                  ></Input>
                </Form.Item>
                */}
                <Select
                  placeholder="Institution"
                  style={{ width: "170%" }}
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
                  <Radio.Group name="role" onChange={onRoleChange}>
                    <Radio value={1}>Instructor</Radio>
                    <Radio value={2}>Student</Radio>
                  </Radio.Group>
                </Col>
              </Row>
              <Row gutter={[0, 0]}>
                <Form.Item name="email">
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
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
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
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="start" gutter={[0, 40]}>
                <text> - 8 or more chatacters</text>
              </Row>
              <Row justify="start" gutter={[0, 40]}>
                <text> - mix of letters, numbers, & symbols</text>
              </Row>
              <Row>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                  >
                    Register
                  </Button>
                  <a href="/login" className="alt-action">
                    Log in instead
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

export default RegistrationPage;
