import React from "react";
import { Button, Col, ColorPicker, Form, Input, Row, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

interface DetailsType {
  username: string;
  currentPassword: string;
  newPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  address: string;
}

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

function DetailsForm() {
  const [form] = Form.useForm();

  const handleLogin = async (values: DetailsType) => {
    console.log(values);
  };

  const onFinish = (values: DetailsType) => {
    handleLogin(values);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Col span={24} className="px-[30px] py-[10px]">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          borderRadius: "0.35rem",
        }}
      >
        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Institute Name"
              layout="vertical"
              name="instituteName"
              rules={[
                {
                  message: "Please enter your institute name",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Institute Name"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Institute Type"
              layout="vertical"
              name="instituteType"
              rules={[
                {
                  message: "Please enter your institute type",
                },
              ]}
            >
              <Select
                defaultValue="lucy"
                onChange={handleChange}
                size="large"
                options={[
                  { value: "school", label: "School" },
                  { value: "college", label: "College" },
                  { value: "university", label: "University" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Primary Color"
              layout="vertical"
              name="primaryColor"
              rules={[
                {
                  message: "Please enter your institute name",
                },
              ]}
            >
              <ColorPicker
                className="w-full h-[40px] flex items-center justify-between flex-row-reverse px-[24px]"
                defaultValue="#5dbc86"
                showText={(color) => (
                  <span>Primary Color Code ({color.toHexString()})</span>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Secondary Color"
              layout="vertical"
              name="secondaryColor"
              rules={[
                {
                  message: "Please enter your institute type",
                },
              ]}
            >
              <ColorPicker
                className="w-full h-[40px] flex items-center justify-between flex-row-reverse px-[24px]"
                defaultValue="#1677ff"
                showText={(color) => (
                  <span>Secondary Color Code ({color.toHexString()})</span>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full mb-[24px]" gutter={16}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag institute logo file to this area to upload
            </p>
          </Dragger>
        </Row>

        <Row className="w-full" gutter={16}>
          <Button
            className="w-[71px] h-[36px] px-[20px] py-[10px] gap-[10px] rounded-[30px] bg-white text-[#005CBB] shadow-[0px_4px_9px_1px_#00000040] font-roboto text-sm font-semibold leading-[16.41px] text-center"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Row>
      </Form>
    </Col>
  );
}

export default DetailsForm;
