import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Divider, Table, Button, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { studentDashColumns, mockData } from './StuDashConstants';
import './stuDash.css';
import MessageDisplay from './MessageDisplay';

// interface Iemail {
//   name: string;
//   sub: string
//   date: string
//   body: string
// }

const { Title } = Typography;
const instance = axios.create({ baseURL: 'http://localhost:4000' });
let note = { name: '', sub: '', date: '', body: '' };
let allNotes: any[];
allNotes = [];

export default function StudentDash() {
  const [emailList, setEmails] = useState<any>([]);
  const [emailOpen, setEmailOpen] = useState(false);

  // const [subject, setSubject] = useState('');
  // const [dateSent, setDateSent] = useState('');
  // const [body, setBody] = useState('');
  const [currentEmail, setCurrentEmail] = useState<number>(-1);

  let emailIndex = 0;

  const accessToken = localStorage.getItem('userToken');
  const testToken =
    ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnQxQGdtYWlsLmNvbSIsInJvbGUiOjEsImlhdCI6MTYwNjYwMDQ3MCwiZXhwIjoxNjA3MjA1MjcwfQ.gIvbtaEwm4subBYLOsEWtgJ-1neLxyy668u5exllsH0';
  // second arg doesn't appear to be necessary
  // what exactly does this header do?
  // what is localStorage

  // create two users
  // student and instructor
  // instructor will send email to student
  // get email while logged in as student
  useEffect(() => {
    instance
      .get('/users/notification', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        console.log('data:', result.data.notifications);
        const emails = result.data.notifications;
        //console.log('emails:', emails);
        for (let email of emails) {
          note = { name: '', sub: '', date: '', body: '' };

          note.name = email.sender.firstName + ' ' + email.sender.lastName;
          note.sub = email.title;
          note.date = email.timestamp.slice(0, 10);
          note.body = email.body;

          allNotes.push(note);
        }
        console.log('allNotes', allNotes);
        setEmails(allNotes);
        console.log('emails', emailList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // conditionally render message display or select an item based on whether or not an email is selected
  // have email selected state
  // that changes when a row is clicked
  // first test conditional render with another aspect of the page
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
            dataSource={emailList}
            style={{ padding: 25 }}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log(`record = ${record}, rowIndex = ${rowIndex}`);
                  setEmailOpen(true);
                  // setSender('me');
                  // setSubject('nothing');
                  // setDateSent('22/11/2019');
                  // setBody('Very suspicious');

                  setCurrentEmail(Number(rowIndex));
                  console.log('current email:', currentEmail);
                },
              };
            }}
          />
        </div>
      </Col>
      <Col span={14}>
        {/* <MessageDisplay email={emailList[currentEmail]}></MessageDisplay> */}
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
