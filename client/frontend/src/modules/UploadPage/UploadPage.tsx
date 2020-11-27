import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, withRouter } from "react-router-dom";
import { Row, Col, Table, Button, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadPageTableColumns } from "./constants";
import "./uploadPageStyles.css";
import "antd/dist/antd.css";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("userToken");
const instance = axios.create({ baseURL: "http://localhost:4000" });

function UploadPage() {
  const { Title } = Typography;
  const { Dragger } = Upload;
  let location = useLocation();
  let projectId = location.pathname.split("/")[2];
  const [submissionList, setSubmissionList] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState(0);
  const [listLength, setListLength] = useState(0);

  const onChange = (e: any) => {
    if (e.event !== undefined) {
      setListLength((listLength) => e.fileList.length);

      e.fileList.forEach(function (file: any) {
        let read = new FileReader();

        read.onload = function () {
          let res: string = read.result as string;
          setSubmissionList((submissionList) => [...submissionList, res]);
          setFileCount((fileCount) => fileCount + 1);
        };
        read.readAsText(file.originFileObj);
      });
    }
  };

  useEffect(() => {
    if (fileCount === listLength) {
      let submissions = [
        {
          email: "abc@neu.com",
          file: { name: "file1.ts", content: "let a = 5; let b = 6;" },
        },

        {
          email: "abc@neu.com",
          file: { name: "file2.ts", content: "let d = 4;" },
        },

        {
          email: "test2@neu.com",
          file: { name: "file1.ts", content: "function test(){return null}" },
        },

        {
          email: "test3",
          file: { name: "fileb.ts", content: "function test(){return 3+2}" },
        },
      ];
      let body = { projectId: projectId, submissions: submissions };
      instance
        .post("/submission", body)
        .then((result) => {})
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [fileCount]);

  const runDetection = () => {
    instance
      .post(`project/${projectId}/runDetection`, { projectId })
      .then((resp) => {
        instance
          .get(`project/${projectId}`)
          .then((resp) => {console.log(resp)});
      });
  };

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
          <Button onClick={runDetection}> Run Detection </Button>
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(UploadPage);
