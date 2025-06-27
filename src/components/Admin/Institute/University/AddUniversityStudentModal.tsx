import React, { useEffect, useState } from "react";
import { Input, Modal, Form, Select, DatePicker, Row, Col } from "antd";
import type { FormProps } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { updateStudent } from "api/student";
import { register } from "api/auth";
import dayjs from "dayjs";

interface StudentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  editMode?: boolean;
  studentData?: any;
}

function AddUniversityStudentModal({
  open,
  setOpen,
  onSuccess,
  editMode = false,
  studentData,
}: StudentModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  const [program, setProgram] = useState<string | undefined>(undefined);

  // Initialize form values when in edit mode
  useEffect(() => {
    if (editMode && studentData) {
      setProgram(studentData.program);
      form.setFieldsValue({
        ...studentData,
        admissionDate: studentData.admissionDate
          ? dayjs(studentData.admissionDate)
          : undefined,
      });
    }
  }, [editMode, studentData, form]);

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      setConfirmLoading(true);
      const payload = {
        ...values,
        admissionDate: values.admissionDate?.toISOString(),
        role: "student",
      } as any;

      if (editMode && studentData) {
        await updateStudent(studentData.key, payload);
        messageApi.success("Student Updated Successfully!");
      } else {
        // For new student registration
        const { name, ...rest } = payload;
        await register({
          ...rest,
          name: `${name.first} ${name.last}`.trim(),
        });
        messageApi.success("Student Added Successfully!");
      }
      form.resetFields();
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to save student:", error);
      messageApi.error(
        `Failed to ${editMode ? "update" : "add"} student. Please try again.`
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSelectChange = (value: string, option: any) => {
    // setProgram maybe used for program select
  };

  // Generate semester options based on selected program
  const getSemesterOptions = () => {
    if (program === "Masters") {
      return Array.from({ length: 4 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}`,
      }));
    }
    // Default to Bachelors (8 semesters)
    return Array.from({ length: 8 }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}`,
    }));
  };

  return (
    <Modal
      title={editMode ? "Edit University Student" : "Add University Student"}
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
              rules={[{ required: true, message: "Please enter First Name" }]}
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
              rules={[{ required: true, message: "Please enter Last Name" }]}
            >
              <Input
                suffix={<UserOutlined />}
                placeholder="Last Name*"
                className="custom-input"
              />
            </Form.Item>
          </Col>
          {/* Department */}
          <Col span={8}>
            <Form.Item
              label="Department"
              name="department"
              rules={[
                { required: true, message: "Please select a department" },
              ]}
            >
              <Select
                placeholder="Select Department"
                options={[
                  { value: "Computer Science", label: "Computer Science" },
                  { value: "Electrical", label: "Electrical" },
                  { value: "English", label: "English" },
                  { value: "Chemical", label: "Chemical" },
                ]}
              />
            </Form.Item>
          </Col>
          {/* Program */}
          <Col span={8}>
            <Form.Item
              label="Program"
              name="program"
              rules={[{ required: true, message: "Please select a program" }]}
            >
              <Select
                placeholder="Select Program"
                onChange={(val) => setProgram(val)}
                options={[{ value: "Bachelors", label: "Bachelors" }]}
              />
            </Form.Item>
          </Col>
          {/* Semester */}
          <Col span={8}>
            <Form.Item
              label="Semester"
              name="semester"
              rules={[{ required: true, message: "Please select a semester" }]}
            >
              <Select
                placeholder="Select Semester"
                options={getSemesterOptions()}
              />
            </Form.Item>
          </Col>
          {/* Gender */}
          <Col span={8}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select a gender" }]}
            >
              <Select
                placeholder="Select Gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </Form.Item>
          </Col>
          {/* Mobile */}
          <Col span={8}>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                { required: true, message: "Please enter Mobile Number" },
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
          {/* Email */}
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
          {/* Password (only for add) */}
          {!editMode && (
            <Col span={8}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  placeholder="Password*"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          )}
          {/* Admission Date */}
          <Col span={8}>
            <Form.Item
              label="Admission Date"
              name="admissionDate"
              rules={[
                { required: true, message: "Please select a admission date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select Admission Date"
                className="custom-date-picker"
              />
            </Form.Item>
          </Col>
          {/* Section */}
          <Col span={8}>
            <Form.Item
              label="Section"
              name="section"
              initialValue="A"
              rules={[{ required: true, message: "Please select a section" }]}
            >
              <Select
                placeholder="Select Section"
                options={["A", "B", "C", "D", "E", "F"].map((sec) => ({
                  value: sec,
                  label: sec,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddUniversityStudentModal;
