"use client";
import React from "react";
import { Row, Col, Form, Input, InputNumber, Select, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

interface SectionFieldProps {
  name: number;
  onRemove: () => void;
}

function SectionField({ name, onRemove }: SectionFieldProps) {
  return (
    <Row
      gutter={16}
      className="mb-4 p-4 border border-gray-200 rounded-lg relative"
    >
      <Button
        type="text"
        danger
        icon={<MinusCircleOutlined />}
        onClick={onRemove}
        className="absolute top-2 right-2"
      >
        Remove
      </Button>

      <Col span={8}>
        <Form.Item
          name={[name, "sectionName"]}
          label="Section Name"
          rules={[{ required: true, message: "Please enter section name" }]}
        >
          <Input placeholder="e.g., A, B, Morning, Red" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[name, "capacity"]}
          label="Capacity"
          rules={[{ required: true, message: "Please enter capacity" }]}
          initialValue={30}
        >
          <InputNumber
            min={0}
            placeholder="Maximum students"
            className="w-full"
          />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name={[name, "status"]}
          label="Status"
          initialValue="active"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select
            placeholder="Select Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name={[name, "description"]} label="Description">
          <Input.TextArea
            rows={2}
            placeholder="Section description (optional)"
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default SectionField;
