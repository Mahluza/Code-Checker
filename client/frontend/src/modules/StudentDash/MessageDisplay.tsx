import React from 'react';
import axios from 'axios';
import { Row, Col, Divider, Table, Button, Typography } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { studentDashColumns, mockData } from './StuDashConstants';
import './stuDash.css';

const { Title } = Typography;

class MessageDisplay extends React.Component {
  render() {
    return (
      <div className="stu-dash-display-container">
        {/*Info passed from clicked message will populate these columns*/}
        {/*gutter={[18, 0]}*/}
        <Row style={{ paddingTop: 15 }}>
          <Col offset={1} span={6}>
            <Title level={5}>Sender:</Title>
          </Col>
          <Col>
            <Title level={5}>Instructor 1</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={6}>
            <Title level={5}>Subject:</Title>
          </Col>
          <Col>
            <Title level={5}>Plagiarised code found in Project1</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={6}>
            <Title level={5}>Sent on:</Title>
          </Col>
          <Col>
            <Title level={5}>26th Sept 2020, 11:30am</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={6}>
            <Title level={5}>Attachments:</Title>
          </Col>
          <Col>
            <Title level={5}>Report-Project1-Student1</Title>
          </Col>
        </Row>
        <Row>
          <div className="stu-dash-display-messContainer">
            <Col style={{ margin: 15 }}>
              <p className="message">
                Some suspicious code has been detected in your project.
              </p>
            </Col>
          </div>
        </Row>
        <Row className="follow-up-buttons">
          <Button type="primary">Message Instructor</Button>
        </Row>
        <Row
          className="follow-up-buttons"
          gutter={[6, 0]}
          style={{ paddingTop: 30 }}
        >
          <Col>
            <PaperClipOutlined className="bold-icon" />
          </Col>
          <Col style={{ paddingTop: 8 }}>
            <Title level={4}>Report-Project1-Student1</Title>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 24, paddingTop: 4 }} gutter={[20, 0]}>
          <Col>
            <a>
              <Title level={5}> Download</Title>
            </a>
          </Col>
          <Col>
            <a>
              <Title level={5}> View Report</Title>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MessageDisplay;
