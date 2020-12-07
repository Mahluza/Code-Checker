import React, { useState } from 'react';
import { Tag, Space } from 'antd';

export const analysisPageTableColumns = [
  {
    title: 'File One',
    dataIndex: 'file1',
    key: 'user1',
  },
  {
    title: 'Student',
    dataIndex: 'student1',
    key: 'sudent1Email',
  },
  {
    title: 'File Two',
    dataIndex: 'file2',
    key: 'user2',
  },
  {
    title: 'Student',
    dataIndex: 'student2',
    key: 'sudent2Email',
  },
  {
    title: 'Similarity Rating',
    dataIndex: 'similarity',
    key: 'similarity',
  },
];
export const codeBlockStyle = {
  overflow: 'scroll',
  fontSize: '1rem',
  width: '45%',
  marginTop: '24px',
  marginBottom: '24px',
};
