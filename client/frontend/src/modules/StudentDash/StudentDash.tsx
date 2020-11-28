import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Divider, Table, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { studentDashColumns, mockData } from './StuDashConstants';
import './stuDash.css';
import MessageDisplay from './MessageDisplay';

const { Title } = Typography;
const instance = axios.create({ baseURL: 'http://localhost:4000' });

export default function StudentDash() {
  const [emailList, setEmails] = useState([]);
  const accessToken = localStorage.getItem('userToken');
  // second arg doesn't appear to be necessary
  // what exactly does this header do?
  // what is localStorage
  useEffect(() => {
    instance
      .get('/emails', {
        headers: {
          Authorization: 'Bearer' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {});
  });
  return (
    //<div></div>
    <Row>
      <Col span={10}>
        <div className="stu-dash-message-container">
          <Row>
            <Divider orientation="left">Messages</Divider>
          </Row>
          <Table
            columns={studentDashColumns}
            dataSource={mockData}
            style={{ padding: 25 }}
            pagination={false}
          />
        </div>
      </Col>
      <Col span={14}>
        <MessageDisplay />
        {/* <Row align="bottom" justify="center" style={{ height: '50%' }}>
          <MailOutlined className="faint-icon" />
        </Row>
        <Row justify="center" style={{ paddingTop: 5 }}>
          <text className="faint-icon-text">Select an item to read </text>
        </Row> */}
      </Col>
    </Row>
  );
}
