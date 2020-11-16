import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Space, Tag, Divider, Table, Button, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './homePageStyles.css';
import 'antd/dist/antd.css';

function HomePage() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const { Title } = Typography;

  const columns = [
    {
      title: 'Projects',
      dataIndex: 'name',
      key: 'name',
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: 'Accessed On',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Created On',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any[]) => (
        <>
          {tags.map((tag: string) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: { name: React.ReactNode }) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Homework 4',
      age: '11/9/2020',
      address: '11/8/2020',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Midterm',
      age: '10/21/2020',
      address: '1/3/2020',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Test Assignment',
      age: '3/14/2018',
      address: '2/14/2018',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <Row>
      <Col span={8}>
        <div className="home-page-container">
          <Row justify="center">
            <Divider orientation="center" style={{ marginTop: 15 }}>
              Instructor
            </Divider>
            <Col>
              <Title level={5}>Professor Fauci</Title>
              <Title level={5}> Active Projects: {data.length}</Title>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={16}>
        <div className="home-page-container">
          <Row>
            <Divider orientation="left">Plagiarism Detection Projects</Divider>
            <Button
              type="primary"
              shape="round"
              icon={<PlusCircleOutlined />}
              size={'large'}
              style={{ marginLeft: 25, marginTop: 15 }}
            >
              {' '}
              Start New Project{' '}
            </Button>
          </Row>
          <Table columns={columns} dataSource={data} style={{ padding: 25 }} />
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(HomePage);
