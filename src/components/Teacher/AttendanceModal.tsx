"use client";
import React from "react";
import { Modal, Form, Select, DatePicker, Input, Row, Col, Button } from "antd";
import type { FormProps } from "antd";

interface AttendanceModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AttendanceModal({ open, setOpen }: AttendanceModalProps) {
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
      title={<span className="text-lg font-semibold">Attendance</span>}
      open={open}
      footer={null}
      onCancel={handleCancel}
      width={600}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Roll No.*"
              name="rollNo"
              rules={[{ required: true, message: "Please enter roll number" }]}
            >
              <Input placeholder="Enter Roll No." style={{ height: "45px" }} />
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
              label="Date*"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker
                className="w-full"
                style={{ height: "45px" }}
                placeholder="Select Date"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Attendance*"
              name="attendance"
              rules={[{ required: true, message: "Please select attendance" }]}
            >
              <Select
                placeholder="Select Attendance"
                style={{ height: "45px" }}
              >
                <Select.Option value="Present">Present</Select.Option>
                <Select.Option value="Absent">Absent</Select.Option>
              </Select>
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

export default AttendanceModal;
