import React from 'react';
import axios from 'axios';
import { Row, Col, Divider, Table, Button, Typography } from 'antd';
import { studentDashColumns, mockData } from './StuDashConstants';
import './stuDash.css';
import MessageDisplay from './MessageDisplay';

export default function StudentDashMessage() {
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
        {/*<div className="stu-dash-display-container"></div>*/}
      </Col>
    </Row>
  );
}
