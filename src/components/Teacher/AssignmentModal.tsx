"use client";
import React from "react";
import { Modal, Form, Select, DatePicker, Input, Row, Col } from "antd";
import type { FormProps } from "antd";

interface AssignmentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AssignmentModal({ open, setOpen }: AssignmentModalProps) {
  const [form] = Form.useForm();

  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:", values);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const inputStyle = {
    height: "45px",
    width: "50%",
  };

  return (
    <Modal
      title="Assignment"
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      width={900}
      centered
      className="[&_.ant-modal-content]:p-6"
    >
      <Form form={form} onFinish={onFinish} layout="vertical" className="mt-4">
        <Row>
          <Col span={12}>
            <Form.Item
              label="Course Code"
              name="courseCode"
              rules={[{ required: true, message: "Please enter course code" }]}
            >
              <Input placeholder="Enter Course Code" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Class Name"
              name="className"
              rules={[{ required: true, message: "Please enter class name" }]}
            >
              <Input placeholder="Enter Class Name" style={inputStyle} />
            </Form.Item>
          </Col>
          {/* Second Row */}
          <Col span={12}>
            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: "Please select due date" }]}
            >
              <DatePicker className="w-full" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Assigned Date"
              name="assignedDate"
              rules={[
                { required: true, message: "Please select assigned date" },
              ]}
            >
              <DatePicker className="w-full" style={inputStyle} />
            </Form.Item>
          </Col>
          {/* Third Row */}
          <Col span={12}>
            <Form.Item
              label="Assignment Title"
              name="assignmentTitle"
              rules={[
                { required: true, message: "Please enter assignment title" },
              ]}
            >
              <Input placeholder="Enter Assignment Title" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select Status" style={inputStyle}>
                <Select.Option value="Completed">Completed</Select.Option>
                <Select.Option value="In Process">In Process</Select.Option>
                <Select.Option value="To be give">To be give</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AssignmentModal;
