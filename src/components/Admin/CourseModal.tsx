"use client";
import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Select, Row, Col, Button, Space } from "antd";
import type { FormProps } from "antd";
import { BookOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { getTeachers } from "api/teacher";
import { addCourse, updateCourse } from "api/course";
import CourseScheduleField from "./CourseScheduleField";
import dayjs from "dayjs";

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
    description: string;
    status: string;
    schedules: any[];
  } | null;
}

function CourseModal({
  open,
  setOpen,
  onSuccess,
  editMode = false,
  courseData,
}: CourseModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState<any[]>([]);
  const sections = ["A", "B", "C", "D", "E", "F"];

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
        description: courseData.description,
        status: courseData.status,
        schedules: (courseData.schedules || []).map((s: any) => ({
          instructor: s.instructor,
          section: s.section,
          startTime: s.schedule?.startTime
            ? dayjs(s.schedule.startTime, "HH:mm")
            : null,
          endTime: s.schedule?.endTime
            ? dayjs(s.schedule.endTime, "HH:mm")
            : null,
          daysOfWeek: s.schedule?.daysOfWeek,
        })),
      });
    } else {
      form.resetFields();
    }
  }, [editMode, courseData, form]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await getTeachers();
      setTeachers(response.data);
      setInstructors(response.data);
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
        description: values.description,
        status: values.status || "active",
        schedules: (values.schedules || []).map((schedule: any) => ({
          instructor: schedule.instructor,
          section: schedule.section,
          schedule: {
            startTime: schedule.startTime.format("HH:mm"),
            endTime: schedule.endTime.format("HH:mm"),
            daysOfWeek: schedule.daysOfWeek,
          },
        })),
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
      messageApi.error(
        error.response?.data?.message ||
          `Failed to ${editMode ? "update" : "add"} course. Please try again.`
      );
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
      width={800}
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

        <Form.List name="schedules">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <CourseScheduleField
                  key={field.key}
                  name={field.name}
                  onRemove={() => remove(field.name)}
                  instructors={instructors}
                  sections={sections}
                />
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Schedule
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}

export default CourseModal;
