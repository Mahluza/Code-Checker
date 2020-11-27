import React from 'react';
import axios from 'axios';
import { Row, Col, Divider, Table, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { studentDashColumns, mockData } from './StuDashConstants';
import './stuDash.css';
import MessageDisplay from './MessageDisplay';

const { Title } = Typography;

export default function StudentDash() {
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
