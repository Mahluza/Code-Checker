import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Row, Col, Table, Button, Typography, Upload } from "antd";
import { analysisPageTableColumns, codeBlockStyle } from "./constants";
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
  const [file1Highlight, setFile1HightLight] = useState("");
  const [file2Highlight, setFile2HightLight] = useState("");

  const highlightProcess = (similarities: any[]) => {
    for (var i = 0; i < similarities.length; i++) {
      let match: any = similarities[i].codeMatch;
      let matchType: string = match.type;

      if (matchType === "COMPLETE_MATCH") {
        let range1 = match.rangeOfNode1;
        let range2 = match.rangeOfNode2;

        let rangeStr1 = range1[0].toString() + "-" + range1[1].toString();
        let rangeStr2 = range2[0].toString() + "-" + range2[1].toString();

        setFile1HightLight((file1H) => file1H + rangeStr1 + ",");
        setFile2HightLight((file2H) => file2H + rangeStr2 + ",");
      }

      if (matchType === "COMMON_LINES") {
        let lines = match.lines;
        for (var j = 0; j < lines.length; j++) {
          let line = lines[j];
          setFile1HightLight((file1H) => file1H + line[0] + ",");
          setFile2HightLight((file2H) => file2H + line[1] + ",");
        }
      }
    }

  }

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
                      highlightProcess(resp.data.similarities)
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
            customStyle={codeBlockStyle}
            highlight={file1Highlight}
          />
          <CodeBlock
            text={fileDiff[1]}
            language={"typescript"}
            theme={atomOneDark}
            customStyle={codeBlockStyle}
            highlight={file2Highlight}
          />
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(AnalysisPage);
