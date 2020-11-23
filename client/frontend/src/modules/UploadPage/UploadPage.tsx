import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Divider,
  Table,
  Button,
  Typography,
  Upload,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadPageTableColumns } from "./constants";
import "./uploadPageStyles.css";
import "antd/dist/antd.css";

function UploadPage() {
  const { Title } = Typography;
  const { Dragger } = Upload;
  const accessToken = localStorage.getItem('userToken')

  const onChange = (e: any) => {
    console.log(e);
  };

  const customRequest = (options: any) => {
    console.log("beep", options)
    axios.post(options.action, {}, {headers:{Authorization: ""}}).then((res: any) => {
      options.onSuccess(res.data, options.file)
    }).catch((err: Error) => {
      console.log(err)
    })
  }

  return (
    <Row>
      <Col span={8}>
        <div className="upload-page-container">
          <Row>
            <Dragger
              multiple={true}
              directory={true}
              showUploadList={false}
              accept=".ts"
              onChange={onChange}
              action={"http://localhost:4000/submission"}
              customRequest={customRequest}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag directory of files to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for directories containing one or more student
                submissions.
              </p>
            </Dragger>
          </Row>
        </div>
      </Col>
      <Col span={16}>
        <div className="upload-page-container">
          <Table
            columns={uploadPageTableColumns}
            dataSource={[]}
            style={{ padding: 25 }}
          />
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(UploadPage);
