import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { CodeBlock, dracula } from "react-code-blocks";
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

  useEffect(() => {
    instance.get(`/similarity/${projectId}/${similarityId}`).then((resp) => {
      console.log(resp);
      setSimilarities(resp.data.similarities);
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
                  onClick: event => {instance.get(`/similarity/${projectId}/${similarityId}/${similarityId}`).then((resp) => {
                    console.log(resp);
                  });}
                };
              }}
          />
        </div>
      </Col>
      <Col span={16}>
        <div className="analysis-page-container">
          <CodeBlock
            text={"let x = 5;"}
            language={"typescript"}
            theme={dracula}
            highlight="1"
          />
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(AnalysisPage);
