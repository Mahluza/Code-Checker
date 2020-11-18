import React, { useState } from "react";
import { Tag, Space } from "antd";

export const homePageTableColumns = [
    {
      title: "Projects",
      dataIndex: "name",
      key: "name",
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: "Accessed On",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Created On",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: any[]) => (
        <>
          {tags.map((tag: string) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "error") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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