import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { CodeBlock, paraisoLight } from "react-code-blocks";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
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
  const [file1Highlight, setFile1HightLight] = useState<Record<string, string>>(
    {}
  );
  const [file2Highlight, setFile2HightLight] = useState<Record<string, string>>({});

  const highlightProcess = (similarities: any[]) => {
    for (var i = 0; i < similarities.length; i++) {
      let match: any = similarities[i].codeMatch;
      let matchType: string = match.type;
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);

      if (matchType === "COMPLETE_MATCH") {
        let range1 = match.rangeOfNode1;
        let range2 = match.rangeOfNode2;

        setFile1HightLight((file1H) => {
          let newMapping = Object.assign({}, file1H);
          for (var i = range1[0]; i <= range1[1]; i++) {
            newMapping[i] = "#" + randomColor;
          }
          return newMapping;
        });

        setFile2HightLight((file2H) => {
          let newMapping: Record<string, string> = Object.assign({}, file2H);
          for (var i = range2[0]; i <= range2[1]; i++) {
            
            newMapping[i] = "#" + randomColor;
          }
          return newMapping;
        });
      }

      if (matchType === "COMMON_LINES") {
        let lines = match.lines;
        for (var j = 0; j < lines.length; j++) {
          let line = lines[j];
          setFile1HightLight((file1H) => {
            let newMapping = Object.assign({}, file1H);
            console.log(line)
            newMapping[line[0]] = "#" + randomColor;
            return newMapping;
          });
          setFile2HightLight((file2H) => {
            let newMapping: Record<string, string> = Object.assign({}, file2H);
            newMapping[line[1]] = "#" + randomColor;
            return newMapping;
          });
        }
      }
    }
  };

  useEffect(() => {
    instance.get(`/similarity/${projectId}/${similarityId}`).then((resp) => {
      console.log(resp);
      setSimilarities(resp.data.similarities);
      instance
        .get(`/similarity/${projectId}/${similarityId}/0`)
        .then((data) => {
          setFileDiff([data.data.file1, data.data.file2]);
          highlightProcess(data.data.similarities);
        });
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
                    .get(`/similarity/${projectId}/${similarityId}/${rowIndex}`)
                    .then((resp) => {
                      console.log(resp);
                      let file1: string = resp.data.file1;
                      let file2: string = resp.data.file2;
                      highlightProcess(resp.data.similarities);
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
          <div style={{ width: "45%" }}>
            <SyntaxHighlighter
              language="typescript"
              style={docco}
              wrapLines={true}
              showLineNumbers={true}
              lineProps={(lineNumber) => {
                var color = undefined;
                if (lineNumber in file1Highlight) {
                  color = file1Highlight[lineNumber];
                }
                let style = { backgroundColor: color };

                return { style };
              }}
            >
              {fileDiff[0]}
            </SyntaxHighlighter>
          </div>
          <div style={{ width: "45%" }}>
            <SyntaxHighlighter
              language="typescript"
              style={docco}
              wrapLines={true}
              showLineNumbers={true}
              lineProps={(lineNumber) => {
                var color = undefined;
                if (lineNumber in file2Highlight) {
                  color = file2Highlight[lineNumber];
                }
                let style = { backgroundColor: color };

                return { style };
              }}
            >
              {fileDiff[1]}
            </SyntaxHighlighter>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(AnalysisPage);
