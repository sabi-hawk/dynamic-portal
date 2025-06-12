"use client";
import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Select, DatePicker, Row, Col } from "antd";
import type { FormProps } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { addTeacher, updateTeacher } from "api/teacher";
import { register } from "api/auth";
import dayjs from "dayjs";

interface TeacherModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  editMode?: boolean;
  teacherData?: any;
}

function TeacherModal({ open, setOpen, onSuccess, editMode = false, teacherData }: TeacherModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  // Set form values when in edit mode
  useEffect(() => {
    if (editMode && teacherData) {
      form.setFieldsValue({
        ...teacherData,
        joiningDate: teacherData.joiningDate ? dayjs(teacherData.joiningDate) : undefined,
      });
    }
  }, [editMode, teacherData, form]);

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      setConfirmLoading(true);
      const payload = {
        ...values,
        joiningDate: values.joiningDate?.toISOString(),
        role: "teacher",
      };

      if (editMode && teacherData) {
        await updateTeacher(teacherData._id, payload);
        messageApi.success("Teacher Updated Successfully!");
      } else {
        // For new teacher registration
        const { name, ...rest } = payload;
        await register({
          ...rest,
          name: `${name.first} ${name.last}`.trim(), // Combine first and last name for registration
        });
        messageApi.success("Teacher Added Successfully!");
      }

      form.resetFields();
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to save teacher:", error);
      messageApi.error(`Failed to ${editMode ? 'update' : 'add'} teacher. Please try again.`);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  return (
    <Modal
      title={editMode ? "Edit Teacher" : "Add Teacher"}
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={editMode ? "Update" : "Save"}
      width={640}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ borderRadius: "0.35rem" }}
      >
        <Row gutter={16}>
          {/* First Name Field */}
          <Col span={8}>
            <Form.Item
              label="First Name"
              name={["name", "first"]}
              rules={[
                {
                  required: true,
                  message: "Please enter First Name",
                },
              ]}
            >
              <Input
                suffix={<UserOutlined />}
                placeholder="First Name*"
                className="custom-input"
              />
            </Form.Item>
          </Col>

          {/* Last Name Field */}
          <Col span={8}>
            <Form.Item
              label="Last Name"
              name={["name", "last"]}
              rules={[
                {
                  required: true,
                  message: "Please enter Last Name",
                },
              ]}
            >
              <Input
                suffix={<UserOutlined />}
                placeholder="Last Name*"
                className="custom-input"
              />
            </Form.Item>
          </Col>

          {/* Department Dropdown */}
          <Col span={8}>
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
          <Col span={8}>
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
          <Col span={8}>
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
          <Col span={8}>
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
          <Col span={8}>
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
          <Col span={8}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: !editMode,
                  message: "Please enter your password",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                placeholder={editMode ? "Leave blank to keep current password" : "Password*"}
                className="custom-input"
              />
            </Form.Item>
          </Col>
          {/* Joining Date */}
          <Col span={8}>
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
          <Col span={8}>
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
