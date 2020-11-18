import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Divider, Table, Button, Typography } from "antd";
import { uploadPageTableColumns, mockData } from "./constants";
import "./uploadPageStyles.css";
import "antd/dist/antd.css";

function UploadPage() {

  const { Title } = Typography;


  return (
    <Row>
      <Col span={8}>
        <div className="upload-page-container">
          <Row justify="center">
            <Divider orientation="center" style={{ marginTop: 15 }}>
              Instructor
            </Divider>
            <Col>
              <Title level={5}>Professor Fauci</Title>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={16}>
        <div className="upload-page-container">
          <Table
            columns={uploadPageTableColumns}
            dataSource={mockData}
            style={{ padding: 25 }}
          />
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(UploadPage);
