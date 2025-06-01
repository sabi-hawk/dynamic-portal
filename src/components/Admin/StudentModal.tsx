"use client";
import React, { useState } from "react";
import { Input, Modal, Form, Select, DatePicker, Row, Col } from "antd";
import type { FormProps } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { addStudent } from "api/student";
import { register } from "api/auth";

interface StudentModalProps {
  open: boolean; // `open` should be of type `boolean`
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; // `setOpen` is a setter function for state
  onSuccess?: () => void; // New prop for callback
}

function StudentModal({ open, setOpen, onSuccess }: StudentModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  const onFinish: FormProps["onFinish"] = async (values) => {
    const payload = {
      ...values,
      admissionDate: values.admissionDate?.toISOString(), // convert date to ISO string
      role: "student",
    };

    try {
      setConfirmLoading(true);
      await register(payload);
      // await axios.post("/students/add", payload);
      messageApi.success("Student Added Successfully!");
      form.resetFields(); // Clear the form
      setOpen(false);
      if (onSuccess) onSuccess(); // Call the onSuccess callback to refresh the student list
    } catch (error) {
      messageApi.error("Failed to add student!");
      console.error("Add Student Error:", error);
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
      title="Add Student"
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Save"
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ borderRadius: "0.35rem" }}
      >
        <Row gutter={16}>
          {/* Name Field */}
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter Name",
                },
              ]}
            >
              <Input
                suffix={<UserOutlined />}
                placeholder="Name*"
                className="custom-input"
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
                  { value: "Electrical", label: "Electrical" },
                  { value: "English", label: "English" },
                  { value: "Chemical", label: "Chemical" },
                ]}
                className="custom-select"
              />
            </Form.Item>
          </Col>

          {/* Gender Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select a gender",
                },
              ]}
            >
              <Select
                placeholder="Select Gender"
                onChange={handleChange}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
                className="custom-select"
              />
            </Form.Item>
          </Col>

          {/* Mobile Field */}
          <Col span={12}>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please enter Mobile Number",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              ]}
            >
              <Input
                suffix={<PhoneOutlined />}
                placeholder="Mobile Number*"
                className="custom-input"
              />
            </Form.Item>
          </Col>

          {/* Email Field */}
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                suffix={<MailOutlined />}
                placeholder="Email*"
                className="custom-input"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                placeholder="Password*"
                className="custom-input"
              />
            </Form.Item>
          </Col>
          {/* Admission Date */}
          <Col span={12}>
            <Form.Item
              label="Admission Date"
              name="admissionDate"
              rules={[
                {
                  required: true,
                  message: "Please select a admission date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select Admission Date"
                className="custom-date-picker"
              />
            </Form.Item>
          </Col>

          {/* Section Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Section"
              name="section"
              initialValue="A"
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
        </Row>
      </Form>
    </Modal>
  );
}

export default StudentModal;
