import React from "react";
import { Card, Tag, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

interface Schedule {
  _id: string;
  section: string;
  schedule: {
    startTime: string;
    endTime: string;
    daysOfWeek: string[];
  };
  status: string; // active/inactive
  indicator?: "upcoming" | null; // computed for UI
  course: {
    courseCode: string;
    courseName: string;
    description?: string;
  };
}

interface CourseCardProps {
  data: Schedule;
  onClick?: (scheduleId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ data, onClick }) => {
  const {
    _id,
    section,
    schedule: { startTime, endTime, daysOfWeek },
    status,
    indicator,
    course,
  } = data;

  const renderStatusTag = () => {
    if (indicator === "upcoming") {
      return (
        <Tag color="blue" className="uppercase font-medium">
          UPCOMING
        </Tag>
      );
    }
    return (
      <Tag
        color={status === "active" ? "green" : "red"}
        className="uppercase font-medium"
      >
        {status}
      </Tag>
    );
  };

  return (
    <Card
      hoverable
      className="shadow-md w-full"
      onClick={() => onClick && onClick(_id)}
      title={
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#2989FF] font-semibold mr-2">
              {course.courseCode}
            </span>
            <span className="font-medium">{course.courseName}</span>
          </div>
          {renderStatusTag()}
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <ClockCircleOutlined />
          <span>{`${startTime} - ${endTime}`}</span>
        </div>
        <div className="text-sm text-gray-600">
          Section: <span className="font-medium">{section}</span>
        </div>
        <div className="text-sm text-gray-600">
          Days: {daysOfWeek.join(", ")}
        </div>
        <Button type="link" className="p-0 mt-2">
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;
