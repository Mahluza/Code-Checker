import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Row, Col, Table, Button, Typography, Upload } from "antd";
import { analysisPageTableColumns } from "./constants";
import "./analysisPageStyles.css";
import "antd/dist/antd.css";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("userToken");
const instance = axios.create({ baseURL: "http://localhost:4000" });

function AnalysisPage() {
  let location = useLocation();
  let history = useHistory();
  let projectId = location.pathname.split("/")[2];
  let similarityId = location.pathname.split("/")[3];
  const [similarities, setSimilarities] = useState([]);
  const [fileDiff, setFileDiff] = useState(["num", "num"]);

  useEffect(() => {
    instance.get(`/similarity/${projectId}/${similarityId}`).then((resp) => {
      console.log(resp);
      setSimilarities(resp.data.similarities);
      instance.get(`/similarity/${projectId}/${similarityId}/${similarityId}`).then(
        (data) => setFileDiff([data.data.file1, data.data.file2]))
    });
  }, []);

  return (
    <Row>
      <Col span={8}>
        <div className="analysis-page-container">
          <Table
            columns={analysisPageTableColumns}
            dataSource={similarities}
            style={{ padding: 25 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  instance
                    .get(
                      `/similarity/${projectId}/${similarityId}/${similarityId}`
                    )
                    .then((resp) => {
                      console.log(resp);
                      let file1: string = resp.data.file1;
                      let file2: string = resp.data.file2;
                      setFileDiff([file1, file2]);
                    });
                },
              };
            }}
          />
        </div>
      </Col>
      <Col span={16}>
        <div className="analysis-page-code-container">
          <CodeBlock
            text={fileDiff[0]}
            language={"typescript"}
            theme={atomOneDark}
            customStyle={{
              overflow: "scroll",
              fontSize: "1rem",
              width: "45%",
              marginTop: "24px",
              marginBottom: "24px"
            }}
            highlight="1-7,13-15"
          />
          <CodeBlock
            text={fileDiff[1]}
            language={"typescript"}
            theme={atomOneDark}
            customStyle={{
              overflow: "scroll",
              fontSize: "1rem",
              width: "45%",
              marginTop: "24px",
              marginBottom: "24px"
            }}
            highlight="1-7,10-12"
          />
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(AnalysisPage);
