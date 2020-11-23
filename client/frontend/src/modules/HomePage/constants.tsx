import React, { useState } from "react";
import { Tag, Space } from "antd";

export const homePageTableColumns = [
    {
      title: "Projects",
      dataIndex: "name",
      key: "name",
      render: (key: React.ReactNode) => <a>{key}</a>,
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: { name: React.ReactNode }) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

