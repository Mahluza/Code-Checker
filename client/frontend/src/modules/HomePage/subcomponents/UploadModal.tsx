import { Modal, Button, Form, Input } from "antd";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { RootState } from "../../../redux/stateTypes";
import { useSelector } from "react-redux";

interface IUploadModalProps {
  visible: boolean;
  handleCancel: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

axios.defaults.headers.common["Authorization"] = "blurp";
const instance = axios.create({ baseURL: "http://localhost:4000" });

function UploadModal(props: IUploadModalProps) {
  const accessToken = useSelector(
    (state: RootState) => state.currentUser.userToken
  );
  const onFinish = (values: any) => {
    console.log("Success:", values);
    instance
      .post(
        "/project",
        { projectName: values.projectName },
        {
          headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': 'application/json'
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Create Project"
      visible={props.visible}
      onCancel={props.handleCancel}
      footer={null}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Project Name" name="projectName">
          <Input />
        </Form.Item>

        <Form.Item label="Instructors" name="instructors">
          <Input />
        </Form.Item>

        <Form.Item
          label="Extensions"
          name="extensions"
          initialValue="Typescript (.ts)"
          tooltip={"Only Typescript files are currently supported."}
        >
          <Input disabled={true} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Create Project
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UploadModal;
