import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';
import { Row, Col, Divider, Table, Button, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import UploadModal from './subcomponents/UploadModal';
import { homePageTableColumns } from './constants';
import './homePageStyles.css';
import 'antd/dist/antd.css';
import { RootState } from '../../redux/stateTypes';

const instance = axios.create({ baseURL: 'http://localhost:4000' });

function HomePage() {
  // check if upload modal is enabled
  const [visible, setVisible] = useState(false);

  const [projectsList, setProjectsList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = localStorage.getItem('userToken');
  const lastName = useSelector((root: RootState) => root.currentUser.lastName);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    instance
      .get('/project', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        const projects = result.data.projects;
        setProjectsList(projects);
        dispatch(allActions.projectActions.setProjects(projects));
      })
      .catch(function (error) {

      });
  }, []);

  return (
    <div className="home-page-container">
      <Row style={{ height: 30 }}>
        <text className="welcome-text" style={{ marginLeft: 15, marginTop: 5 }}>
          Welcome Professor {lastName}
        </text>
      </Row>
      <Row>
        <Divider orientation="left">Plagiarism Detection Projects</Divider>
      </Row>
      <Row>
        <text className="project-stats-text" style={{ marginLeft: 30 }}>
          {' '}
          Active: {projectsList.length}
        </text>
      </Row>
      <Row>
        <Button
          type="primary"
          shape="round"
          icon={<PlusCircleOutlined />}
          size={'large'}
          style={{ marginLeft: 25, marginTop: 15 }}
          onClick={showModal}
        >
          {' '}
          Start New Project{' '}
        </Button>

        <UploadModal
          visible={visible}
          handleCancel={handleCancel}
        ></UploadModal>
      </Row>
      <Table
        columns={homePageTableColumns}
        dataSource={projectsList}
        style={{ padding: 25 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              history.push(`/upload/${rowIndex}`);
            },
          };
        }}
      />
    </div>
  );
}

export default withRouter(HomePage);
