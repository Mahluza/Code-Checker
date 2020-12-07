import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { CodeBlock, paraisoLight } from 'react-code-blocks';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Row, Col, Table, Button, Typography, Upload } from 'antd';
import { analysisPageTableColumns, codeBlockStyle } from './constants';
import './analysisPageStyles.css';
import 'antd/dist/antd.css';
import MessageModal from './subcomponents/MessageModal';

axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('userToken');
const instance = axios.create({ baseURL: 'http://localhost:4000' });

function AnalysisPage() {
  const [visible, setVisible] = useState(false);
  let location = useLocation();
  let history = useHistory();
  let projectId = location.pathname.split('/')[2];
  let similarityId = location.pathname.split('/')[3];
  const [similarities, setSimilarities] = useState([]);
  const [fileDiff, setFileDiff] = useState(['Loading...', 'Loading...']);
  const [file1Highlight, setFile1HightLight] = useState<Record<string, string>>(
    {}
  );
  const [file2Highlight, setFile2HightLight] = useState<Record<string, string>>(
    {}
  );

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const highlightProcess = (similarities: any[]) => {
    setFile1HightLight({});
    setFile2HightLight({});
    for (var i = 0; i < similarities.length; i++) {
      let match: any = similarities[i].codeMatch;
      let matchType: string = match.type;
      var o = Math.round,
        r = Math.random,
        s = 255;
      var randColor =
        'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',0.4)';

      if (matchType === 'COMPLETE_MATCH') {
        let range1 = match.rangeOfNode1;
        let range2 = match.rangeOfNode2;

        setFile1HightLight((file1H) => {
          let newMapping: Record<string, string> = Object.assign({}, file1H);
          for (var i = range1[0]; i <= range1[1]; i++) {
            newMapping[i] = randColor;
          }
          return newMapping;
        });

        setFile2HightLight((file2H) => {
          let newMapping: Record<string, string> = Object.assign({}, file2H);
          for (var i = range2[0]; i <= range2[1]; i++) {
            newMapping[i] = randColor;
          }
          return newMapping;
        });
      }

      if (matchType === 'COMMON_LINES') {
        let lines = match.lines;
        for (var j = 0; j < lines.length; j++) {
          let line = lines[j];
          setFile1HightLight((file1H) => {
            let newMapping = Object.assign({}, file1H);
            newMapping[line[0]] = randColor;
            return newMapping;
          });
          setFile2HightLight((file2H) => {
            let newMapping: Record<string, string> = Object.assign({}, file2H);
            newMapping[line[1]] = randColor;
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
      <Col span={10}>
        <div className="analysis-page-container">
          <Table
            size="small"
            columns={analysisPageTableColumns}
            dataSource={similarities}
            style={{ padding: 25 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  instance
                    .get(`/similarity/${projectId}/${similarityId}/${rowIndex}`)
                    .then((resp) => {
                      let file1: string = resp.data.file1;
                      let file2: string = resp.data.file2;
                      highlightProcess(resp.data.similarities);
                      setFileDiff([file1, file2]);
                    });
                },
              };
            }}
          />
          <Button
            className="message-button message-button-highlight"
            onClick={showModal}
          >
            Message Student
          </Button>
          <MessageModal
            visible={visible}
            handleCancel={handleCancel}
          ></MessageModal>
        </div>
      </Col>
      <Col span={14}>
        <div className="analysis-page-code-container">
          <div className="code-block">
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
          <div className="code-block">
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
