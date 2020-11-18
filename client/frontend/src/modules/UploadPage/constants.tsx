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
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Extension",
      dataIndex: "address",
      key: "address",
    },
    {
        title: "Size",
        dataIndex: "address",
        key: "address",
    },
      {
        title: "Created On",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Modified On",
        dataIndex: "address",
        key: "address",
      },
  ];


  export const mockData = [
    {
      key: "1",
      name: "Homework 4",
      age: "11/9/2020",
      address: "11/8/2020",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Midterm",
      age: "10/21/2020",
      address: "1/3/2020",
      tags: ["error"],
    },
    {
      key: "3",
      name: "Test Assignment",
      age: "3/14/2018",
      address: "2/14/2018",
      tags: ["cool", "teacher"],
    },
  ];