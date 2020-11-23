import React, { useState } from "react";
import { Tag, Space } from "antd";

export const uploadPageTableColumns = [
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Extension",
      dataIndex: "extension",
      key: "extension",
    },
    {
        title: "Size",
        dataIndex: "size",
        key: "size",
    },
      {
        title: "Created On",
        dataIndex: "createdOn",
        key: "createdOn",
      },
      {
        title: "Modified On",
        dataIndex: "modifiedOn",
        key: "modifiedOn",
      },
  ];
