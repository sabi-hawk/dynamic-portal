"use client";
import React from "react";
import { Modal, Form, Select, Input, Row, Col, Button } from "antd";
import type { FormProps } from "antd";

interface GradeModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function GradeModal({ open, setOpen }: GradeModalProps) {
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
      title={<span className="text-lg font-semibold">Grade Assignment</span>}
      open={open}
      footer={null}
      onCancel={handleCancel}
      width={600}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Student Name*"
              name="studentName"
              rules={[{ required: true, message: "Please enter student name" }]}
            >
              <Input
                placeholder="Enter Student Name"
                style={{ height: "45px" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Assignment Title*"
              name="assignmentTitle"
              rules={[
                { required: true, message: "Please enter assignment title" },
              ]}
            >
              <Input
                placeholder="Enter Assignment Title"
                style={{ height: "45px" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Grade*"
              name="grade"
              rules={[{ required: true, message: "Please select grade" }]}
            >
              <Select placeholder="Select Grade" style={{ height: "45px" }}>
                <Select.Option value="A+">A+</Select.Option>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B+">B+</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C+">C+</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D+">D+</Select.Option>
                <Select.Option value="D">D</Select.Option>
                <Select.Option value="F">F</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Submission Status*"
              name="submissionStatus"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select Status" style={{ height: "45px" }}>
                <Select.Option value="On time Sub">On time Sub</Select.Option>
                <Select.Option value="Late Sub">Late Sub</Select.Option>
                <Select.Option value="Not Sub">Not Sub</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Feedback*"
              name="feedback"
              rules={[{ required: true, message: "Please enter feedback" }]}
            >
              <Input.TextArea
                placeholder="Enter Feedback"
                style={{ minHeight: "100px" }}
              />
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

export default GradeModal;
