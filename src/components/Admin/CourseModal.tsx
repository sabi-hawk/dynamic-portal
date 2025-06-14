"use client";
import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Select, Row, Col } from "antd";
import type { FormProps } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { getTeachers } from "api/teacher";
import { addCourse, updateCourse } from "api/course";

const { TextArea } = Input;

interface Teacher {
  _id: string;
  userId: {
    name: {
      first: string;
      last: string;
    };
    email: string;
  };
  department: string;
  status: string;
}

interface CourseModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  editMode?: boolean;
  courseData?: {
    _id: string;
    courseCode: string;
    courseName: string;
    instructor: {
      _id: string;
      userId: {
        name: {
          first: string;
          last: string;
        };
      };
      department: string;
    };
    description: string;
    section: string;
    status: string;
  } | null;
}

function CourseModal({ open, setOpen, onSuccess, editMode = false, courseData }: CourseModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchTeachers();
    }
  }, [open]);

  useEffect(() => {
    if (editMode && courseData) {
      form.setFieldsValue({
        courseCode: courseData.courseCode,
        courseName: courseData.courseName,
        instructor: courseData.instructor._id,
        description: courseData.description,
        section: courseData.section,
        status: courseData.status
      });
    }
  }, [editMode, courseData, form]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
      messageApi.error("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      setConfirmLoading(true);

      const coursePayload = {
        courseCode: values.courseCode,
        courseName: values.courseName,
        instructor: values.instructor,
        description: values.description,
        section: values.section,
        status: values.status || "active"
      };

      if (editMode && courseData) {
        await updateCourse(courseData._id, coursePayload);
        messageApi.success("Course Updated Successfully!");
      } else {
        await addCourse(coursePayload);
        messageApi.success("Course Added Successfully!");
      }
      
      form.resetFields();
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to save course:", error);
      messageApi.error(error.response?.data?.message || `Failed to ${editMode ? 'update' : 'add'} course. Please try again.`);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title={editMode ? "Edit Course" : "Add Course"}
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={editMode ? "Update" : "Save"}
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

          {/* Instructor Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Instructor"
              name="instructor"
              rules={[
                {
                  required: true,
                  message: "Please select an instructor",
                },
              ]}
            >
              <Select
                placeholder="Select Instructor"
                loading={loading}
                className="custom-select"
                options={teachers.map((teacher) => ({
                  value: teacher._id,
                  label: `${teacher.userId.name.first} ${teacher.userId.name.last} (${teacher.department})`,
                }))}
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

          {/* Status Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              initialValue="active"
              rules={[
                {
                  required: true,
                  message: "Please select a status",
                },
              ]}
            >
              <Select
                placeholder="Select Status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                className="custom-select"
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
