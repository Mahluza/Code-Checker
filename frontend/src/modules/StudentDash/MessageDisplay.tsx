import React from 'react';
import { Row, Col, Typography } from 'antd';
import './stuDash.css';

const { Title } = Typography;

// defining attributes of an email/note object
interface Iemail {
  name: string;
  sub: string;
  date: string;
  body: string;
}

// adding an Iemail object to MessageDisplay properties parameter
interface IDisplayProps {
  email: Iemail;
}

export default function MessageDisplay(props: IDisplayProps) {
  return (
    <div className="stu-dash-display-container">
      <Row style={{ paddingTop: 15 }}>
        <Col offset={1} span={6}>
          <Title level={5}>Sender:</Title>
        </Col>
        <Col>
          <Title level={5}>{props.email.name}</Title>
        </Col>
      </Row>
      <Row>
        <Col offset={1} span={6}>
          <Title level={5}>Subject:</Title>
        </Col>
        <Col>
          <Title level={5}>{props.email.sub}</Title>
        </Col>
      </Row>
      <Row>
        <Col offset={1} span={6}>
          <Title level={5}>Sent on:</Title>
        </Col>
        <Col>
          <Title level={5}>{props.email.date}</Title>
        </Col>
      </Row>

      <Row>
        <div className="stu-dash-display-messContainer">
          <Col style={{ margin: 15 }}>
            <p className="message">{props.email.body}</p>
          </Col>
        </div>
      </Row>
    </div>
  );
}
