import React, { useState } from "react";
import { Tag, Space } from "antd";

export const analysisPageTableColumns = [
    {
      title: "File One",
      dataIndex: "file1",
      key: "user1",
    },
    {
      title: "File Two",
      dataIndex: "file2",
      key: "user2",
    },
    {
      title: "Similarity Rating",
      dataIndex: "similarity",
      key: "similarity",
    }
  ];
export const codeBlockStyle = {
  overflow: "scroll",
  fontSize: "1rem",
  width: "45%",
  marginTop: "24px",
  marginBottom: "24px"
}