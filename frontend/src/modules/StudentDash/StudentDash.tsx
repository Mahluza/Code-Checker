import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Divider, Table } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { studentDashColumns } from './StuDashConstants';
import './stuDash.css';
import MessageDisplay from './MessageDisplay';

const instance = axios.create({ baseURL: 'http://localhost:4000' });
let note = { name: '', sub: '', date: '', body: '' };
let allNotes: any[];
allNotes = [];

export default function StudentDash() {
  const [emailList, setEmails] = useState<any>([]);
  const [emailOpen, setEmailOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<number>(-1);
  const accessToken = localStorage.getItem('userToken');

  /**
   * Get student messages from the backend
   * called when StudentDash renders/mounts for the first time
   */
  useEffect(() => {
    instance
      // call get method in the backend
      .get('/users/notification', {
        headers: {
          // send token to authorize and get user information
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        // result = response from get method
        const emails = result.data.notifications;
        for (let email of emails) {
          // reset note variable
          note = { name: '', sub: '', date: '', body: '' };
          // fill note variable objects with email information
          note.name = email.sender.firstName + ' ' + email.sender.lastName;
          note.sub = email.title;
          note.date = email.timestamp.slice(0, 10);
          note.body = email.body;
          // append note to allNotes object
          allNotes.push(note);
        }
        // change state of emailList state variable
        setEmails(allNotes);
      })
      .catch(function (error) {
        // catch and log any errors sent from backend
      });
  }, []);

  return (
    <Row>
      <Col span={10}>
        <div className="stu-dash-message-container">
          <Row>
            <Divider orientation="left">Messages</Divider>
          </Row>
          <Table
            columns={studentDashColumns}
            dataSource={emailList}
            style={{ padding: 25 }}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                // change email by changing currentEmail state to corresponding row index
                onClick: (event) => {
                  setEmailOpen(true);
                  setCurrentEmail(Number(rowIndex));
                },
              };
            }}
          />
        </div>
      </Col>
      <Col span={14}>
        {/*conditionally render MessageDisplay component depending on emailOpen 
        state and pass emailList object into it*/}
        {emailOpen ? (
          <MessageDisplay email={emailList[currentEmail]}></MessageDisplay>
        ) : (
          <div style={{ height: '100%' }}>
            <Row align="bottom" justify="center" style={{ height: '50%' }}>
              <MailOutlined className="faint-icon" />
            </Row>
            <Row justify="center" style={{ paddingTop: 5 }}>
              <text className="faint-icon-text">Select an item to read </text>
            </Row>
          </div>
        )}
      </Col>
    </Row>
  );
}
