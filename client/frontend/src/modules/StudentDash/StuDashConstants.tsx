import React, { useState } from 'react';
import { Tag, Space } from 'antd';

export const studentDashColumns = [
  // check to make sure data indices and keys are correct
  {
    title: 'Sender',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Subject',
    dataIndex: 'sub',
    key: 'sub',
    render: (text: React.ReactNode) => <a>{text}</a>,
  },
  {
    title: 'Sent On',
    dataIndex: 'date',
    key: 'date',
  },

  /*
    // insert bin delete icon for action
    {
      title: "Action",
      key: "action",
      render: (text: any, record: { name: React.ReactNode }) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
    */
];

export const mockData = [
  {
    key: '1',
    name: 'Instructor1',
    sub: 'Plagiarised code found in Project 1',
    date: '10/21/2020',
  },

  {
    key: '2',
    name: 'Instructor2',
    sub: 'Plagiarised code found in Project 2',
    date: '2/14/2018',
  },
];
