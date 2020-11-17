import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Divider, Table, Button, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import UploadModal from "./subcomponents/UploadModal";
import { homePageTableColumns, mockData } from "./constants";
import "./homePageStyles.css";
import "antd/dist/antd.css";

function HomePage() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  // check if upload modal is enabled
  const [visible, setVisible] = useState(false);
  const { Title } = Typography;

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };


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
              <Title level={5}> Active Projects: {mockData.length}</Title>
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
              size={"large"}
              style={{ marginLeft: 25, marginTop: 15 }}
              onClick={showModal}
            >
              {" "}
              Start New Project{" "}
            </Button>
            <UploadModal
              visible={visible}
              handleCancel={handleCancel}
            ></UploadModal>
          </Row>
          <Table
            columns={homePageTableColumns}
            dataSource={mockData}
            style={{ padding: 25 }}
          />
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(HomePage);
