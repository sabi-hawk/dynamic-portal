"use client";
import React, { useState } from "react";
import { Input, Modal, Form, Select, DatePicker, Row, Col } from "antd";
import type { FormProps } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { addTeacher } from "api/teacher";
import { register } from "api/auth";

interface TeacherModalProps {
  open: boolean; // `open` should be of type `boolean`
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; // `setOpen` is a setter function for state
  onSuccess?: () => void; // New prop for callback
}

function TeacherModal({ open, setOpen, onSuccess }: TeacherModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Submitting Teacher Data:", values);

    try {
      setConfirmLoading(true);
      // If using DatePicker, convert date to ISO string
      const payload = {
        ...values,
        joiningDate: values.joiningDate?.toISOString(), // ensures consistent date format
        role: "teacher",
      };

      await register(payload); // Adjust base URL if needed

      messageApi.success("Teacher Added Successfully!");
      form.resetFields(); // clear the form
      setOpen(false);
      if (onSuccess) onSuccess(); // Call the onSuccess callback to refresh the teacher list
    } catch (error: any) {
      console.error("Failed to add teacher:", error);
      messageApi.error("Failed to add teacher. Please try again.");
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
      title="Add Teacher"
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

          {/* Degree Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Degree"
              name="degree"
              rules={[
                {
                  required: true,
                  message: "Please select a degree",
                },
              ]}
            >
              <Select
                placeholder="Select Degree"
                onChange={handleChange}
                options={[
                  { value: "Bachelors", label: "Bachelors" },
                  { value: "Masters", label: "Masters" },
                  { value: "PhD", label: "PhD" },
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

          {/* Role Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Role"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please select a role",
                },
              ]}
            >
              <Select
                placeholder="Select Role"
                onChange={handleChange}
                options={[
                  { value: "teacher", label: "Teacher" },
                  { value: "clerk", label: "Clerk" },
                  { value: "accounts", label: "Accounts" },
                ]}
                className="custom-select"
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
          {/* Joining Date */}
          <Col span={12}>
            <Form.Item
              label="Joining Date"
              name="joiningDate"
              rules={[
                {
                  required: true,
                  message: "Please select a joining date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select Joining Date"
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

export default TeacherModal;
