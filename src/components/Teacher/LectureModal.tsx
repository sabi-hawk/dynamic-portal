"use client";
import React from "react";
import {
  Modal,
  Form,
  Select,
  DatePicker,
  Input,
  Upload,
  Button,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";

interface LectureModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function LectureModal({ open, setOpen }: LectureModalProps) {
  const [form] = Form.useForm();

  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:", values);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={<span className="text-lg font-semibold">Mathematics</span>}
      open={open}
      footer={null}
      onCancel={handleCancel}
      width={600}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Subject Name*"
              name="subjectName"
              rules={[
                { required: true, message: "Please select subject name" },
              ]}
            >
              <Select placeholder="Select Subject" style={{ height: "45px" }}>
                <Select.Option value="mathematics">Mathematics</Select.Option>
                <Select.Option value="physics">Physics</Select.Option>
                <Select.Option value="chemistry">Chemistry</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Class Name*"
              name="className"
              rules={[{ required: true, message: "Please enter class name" }]}
            >
              <Input
                placeholder="Enter Class Name"
                style={{ height: "45px" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Choose a Date*"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker
                className="w-full"
                style={{ height: "45px" }}
                placeholder="BS"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Time*"
              name="time"
              rules={[{ required: true, message: "Please enter time" }]}
            >
              <Input placeholder="Enter Time" style={{ height: "45px" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Status*"
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select Status" style={{ height: "45px" }}>
                <Select.Option value="Confirm">Confirm</Select.Option>
                <Select.Option value="Cancelled">Cancelled</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Course Material*" name="courseMaterial">
              <Upload style={{ width: "100%" }}>
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    height: "45px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default LectureModal;
