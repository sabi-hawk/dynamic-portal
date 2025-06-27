import React from "react";
import { Card, Tag, Button } from "antd";
import { BookOutlined } from "@ant-design/icons";

interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  description: string;
  status: string;
  section: string;
}

interface CourseCardProps {
  data: any; // allow schedule object or course
  hideDetails?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ data, hideDetails }) => {
  const courseMeta = data.course ? data.course : data;
  const { courseCode, courseName, description, status, section } = courseMeta;

  const renderStatusTag = () => {
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
      title={
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#2989FF] font-semibold mr-2">
              {courseMeta.courseCode || ""}
            </span>
            <span className="font-medium">{courseMeta.courseName || ""}</span>
          </div>
          {renderStatusTag()}
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <BookOutlined />
          <span>Course</span>
        </div>
        <div className="text-sm text-gray-600">
          Section: <span className="font-medium">{section}</span>
        </div>
        <div className="text-sm text-gray-600 line-clamp-2">{description}</div>
        {!hideDetails && (
          <Button type="link" className="p-0 mt-2">
            View Details
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CourseCard;
