import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { Row, Col, Table, Button, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadPageTableColumns } from "./constants";
import "./uploadPageStyles.css";
import "antd/dist/antd.css";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("userToken");
const instance = axios.create({ baseURL: "http://localhost:4000" });

export interface ISimilarityResult {
  id: number;
  similarity: number;
  user1: string;
  user2: string;
}

function UploadPage() {
  const { Dragger } = Upload;
  let location = useLocation();
  let history = useHistory();
  let projectId = location.pathname.split("/")[2];
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [submissionList, setSubmissionList] = useState<
    [string, string, string][]
  >([]);
  const [similarityPairs, setSimilarityPairs] = useState<ISimilarityResult[]>(
    []
  );
  const [readyToUpload, setReadyToUpload] = useState<boolean>(false);

  // Fetch any pre-existing similarity pairs that exist for the current upload.
  useEffect(() => {
    instance.get(`project/${projectId}`).then((resp: any) => {
      console.log(resp);
      setSimilarityPairs(resp.data.similarityResults);
      setReadyToUpload(false);
    });
  }, []);

  useEffect(() => {
    // Once all files are loaded in, upload them to the server.
    if (readyToUpload) {
      let submissionData = [];
      for (var i = 0; i < submissionList.length; i++) {
        var fileData = submissionList[i];
        var key = "";
        var splitKey = fileData[2].split("/");
        for (var k = 0; k < splitKey.length; k++) {
          if (k > 0) {
            key += splitKey[k];
            if (k !== splitKey.length - 1) {
              key += "/";
            }
          }
        }
        var submission = {
          email: mapping[key],
          file: { name: fileData[1], content: fileData[0] },
        };
        submissionData.push(submission);
      }
      console.log(submissionData);
      let body = { projectId: projectId, submissions: submissionData };
      instance
        .post("/submission", body)
        .then((result) => {})
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [readyToUpload]);

  const runDetection = () => {
    instance
      .post(`project/${projectId}/runDetection`, { projectId })
      .then((resp) => {
        instance.get(`project/${projectId}`).then((resp: any) => {
          console.log(resp);
          setSimilarityPairs(resp.data.similarityResults);
          setReadyToUpload(false);
        });
      });
  };

  const dummyRequest = (option: any) => {
    const { onSuccess, file } = option;

    let read = new FileReader();

    read.onload = function () {
      // load in the student-to-submission mappings from the csv file
      if (file.name === "mapping.csv") {
        let res: string = read.result as string;
        let lines: string[] = res.split("\n");
        while (typeof lines[0] !== "undefined") {
          let line = lines.shift();
          if (line) {
            line = line.trim();
            let split = line.split(",");
            setMapping((mapping) => {
              let newMapping = Object.assign({}, mapping);
              newMapping[split[1]] = split[0];
              return newMapping;
            });
          }
        }
      } else {
        // update the current list of submissions and set files to be uploaded
        let res: string = read.result as string;
        setSubmissionList((submissionList) => [
          ...submissionList,
          [res, file.name, file.webkitRelativePath],
        ]);
      }
    };
    read.readAsText(file);

    setTimeout(() => {
      onSuccess("ok");
    }, 0);

    setTimeout(() => {
      setReadyToUpload(true);
    }, 700);
  };
  return (
    <Row>
      <Col span={8}>
        <div className="upload-page-left-container">
          <Dragger
            multiple={true}
            directory={true}
            accept=".ts"
            customRequest={dummyRequest}
            style={{ height: "200px" }}
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
        </div>
      </Col>
      <Col span={16}>
        <div className="upload-page-right-container">
          <Table
            columns={uploadPageTableColumns}
            dataSource={similarityPairs}
            style={{ padding: 25 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  history.push(
                    `/similarity/${projectId}/${
                      similarityPairs[rowIndex as number].id
                    }`
                  );
                },
              };
            }}
          />
          <Button
            type="primary"
            onClick={runDetection}
            disabled={!readyToUpload}
          >
            {" "}
            Run Detection{" "}
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(UploadPage);
