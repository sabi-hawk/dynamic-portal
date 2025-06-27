import React, { useState } from "react";
import { Form, Select, TimePicker, Button, Space, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface CourseScheduleFieldProps {
  name: number;
  onRemove: () => void;
  instructors: Array<{ _id: string; name: { first: string; last: string } }>;
  sections: string[];
}

const CourseScheduleField: React.FC<CourseScheduleFieldProps> = ({
  name,
  onRemove,
  instructors,
  sections,
}) => {
  const form = Form.useFormInstance();
  const [start, setStart] = useState<Dayjs | null>(null);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name={[name, "instructor"]}
            label="Instructor"
            rules={[{ required: true, message: "Please select an instructor" }]}
          >
            <Select placeholder="Select Instructor">
              {instructors.map((instructor) => (
                <Select.Option key={instructor._id} value={instructor._id}>
                  {`${instructor.name.first} ${instructor.name.last}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={[name, "section"]}
            label="Section"
            rules={[{ required: true, message: "Please select a section" }]}
          >
            <Select placeholder="Select Section">
              {sections.map((section) => (
                <Select.Option key={section} value={section}>
                  {section}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={[name, "startTime"]}
            label="Start Time"
            rules={[{ required: true, message: "Please select start time" }]}
          >
            <TimePicker
              format="HH:mm"
              onChange={(value) => {
                setStart(value);
                if (value) {
                  const proposedEnd = value.add(1, "hour");
                  form.setFieldValue([name, "endTime"], proposedEnd);
                } else {
                  form.setFieldValue([name, "endTime"], null);
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={[name, "endTime"]}
            label="End Time"
            rules={[{ required: true, message: "Please select end time" }]}
          >
            <TimePicker
              format="HH:mm"
              disabledTime={() => {
                if (!start) return {};
                const startHour = start.hour();
                const startMinute = start.minute();
                return {
                  disabledHours: () =>
                    Array.from({ length: 24 }, (_, i) => i).filter(
                      (h) => h < startHour
                    ),
                  disabledMinutes: (selectedHour: number) => {
                    if (selectedHour === startHour) {
                      return Array.from({ length: 60 }, (_, i) => i).filter(
                        (m) => m < startMinute
                      );
                    }
                    return [];
                  },
                };
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name={[name, "daysOfWeek"]}
            label="Days of Week"
            rules={[{ required: true, message: "Please select days" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select days"
              style={{ width: "100%" }}
            >
              {daysOfWeek.map((day) => (
                <Select.Option key={day} value={day}>
                  {day}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <div className="flex justify-end">
        <Button type="text" danger icon={<DeleteOutlined />} onClick={onRemove}>
          Remove Schedule
        </Button>
      </div>
    </div>
  );
};

export default CourseScheduleField;
