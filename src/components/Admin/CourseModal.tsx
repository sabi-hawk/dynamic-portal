"use client";
import React, { useState } from "react";
import { Input, Modal, Form, Select, Row, Col } from "antd";
import type { FormProps } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";

const { TextArea } = Input;

interface CourseModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}

function CourseModal({ open, setOpen, onSuccess }: CourseModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Submitting Course Data:", values);

    try {
      setConfirmLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      messageApi.success("Course Added Successfully!");
      form.resetFields();
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to add course:", error);
      messageApi.error("Failed to add course. Please try again.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  return (
    <Modal
      title="Add Course"
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Save"
      width={600}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ borderRadius: "0.35rem" }}
      >
        <Row gutter={16}>
          {/* Course Code Field */}
          <Col span={12}>
            <Form.Item
              label="Course Code"
              name="courseCode"
              rules={[
                {
                  required: true,
                  message: "Please enter Course Code",
                },
              ]}
            >
              <Input
                suffix={<BookOutlined />}
                placeholder="Course Code*"
                className="custom-input"
              />
            </Form.Item>
          </Col>

          {/* Course Name Field */}
          <Col span={12}>
            <Form.Item
              label="Course Name"
              name="courseName"
              rules={[
                {
                  required: true,
                  message: "Please enter Course Name",
                },
              ]}
            >
              <Input
                suffix={<BookOutlined />}
                placeholder="Course Name*"
                className="custom-input"
              />
            </Form.Item>
          </Col>

          {/* Instructor Name Field */}
          <Col span={12}>
            <Form.Item
              label="Instructor Name"
              name="instructorName"
              rules={[
                {
                  required: true,
                  message: "Please enter Instructor Name",
                },
              ]}
            >
              <Input
                suffix={<UserOutlined />}
                placeholder="Instructor Name*"
                className="custom-input"
              />
            </Form.Item>
          </Col>

          {/* Section Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Section"
              name="section"
              rules={[
                {
                  required: true,
                  message: "Please select a section",
                },
              ]}
            >
              <Select
                placeholder="Select Section"
                onChange={handleChange}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" },
                  { value: "E", label: "E" },
                  { value: "F", label: "F" },
                ]}
                className="custom-select"
              />
            </Form.Item>
          </Col>

          {/* Department Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Department"
              name="department"
              rules={[
                {
                  required: true,
                  message: "Please select a department",
                },
              ]}
            >
              <Select
                placeholder="Select Department"
                onChange={handleChange}
                options={[
                  { value: "Computer Science", label: "Computer Science" },
                  { value: "Mathematics", label: "Mathematics" },
                  { value: "Physics", label: "Physics" },
                  { value: "Chemistry", label: "Chemistry" },
                  { value: "English", label: "English" },
                  { value: "Electrical", label: "Electrical" },
                ]}
                className="custom-select"
              />
            </Form.Item>
          </Col>

          {/* Credits Field */}
          <Col span={12}>
            <Form.Item
              label="Credits"
              name="credits"
              rules={[
                {
                  required: true,
                  message: "Please enter Credits",
                },
                {
                  pattern: /^[1-9][0-9]*$/,
                  message: "Enter a valid number",
                },
              ]}
            >
              <Input
                placeholder="Credits*"
                className="custom-input"
                type="number"
              />
            </Form.Item>
          </Col>

          {/* Description Field */}
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter Course Description",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Course Description*"
                className="custom-input"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default CourseModal;
