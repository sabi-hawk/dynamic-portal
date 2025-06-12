"use client";
import React, { useState } from "react";
import { Table, Tag, Space, Button, Input, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import CourseModal from "components/Admin/CourseModal";

interface CourseType {
  key: React.Key;
  courseName: string;
  instructorName: string;
  description: string;
  section: string;
  courseCode: string;
}

const mockCourses: CourseType[] = Array.from({ length: 15 }).map((_, i) => ({
  key: i,
  courseName: `${
    i % 3 === 0 ? "Computer Science" : i % 3 === 1 ? "Mathematics" : "Physics"
  } ${101 + i}`,
  instructorName: `Dr. ${i % 2 === 0 ? "John Smith" : "Jane Doe"}`,
  description: `This course covers fundamental concepts and advanced topics in ${
    i % 3 === 0
      ? "programming and algorithms"
      : i % 3 === 1
      ? "calculus and linear algebra"
      : "mechanics and thermodynamics"
  }.`,
  section: ["A", "B", "C", "D"][i % 4],
  courseCode: `CS${101 + i}`,
}));

function Courses() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<CourseType[]>(mockCourses);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleReload = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (key: React.Key) => {
    console.log("Edit course", key);
  };

  const handleDelete = (key: React.Key) => {
    console.log("Delete course", key);
  };

  const columns: TableColumnsType<CourseType> = [
    {
      title: "Course Code",
      dataIndex: "courseCode",
      key: "courseCode",
      render: (text) => (
        <span className="font-semibold text-[#2989FF]">{text}</span>
      ),
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructorName",
      key: "instructorName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span className="text-sm">
          {text.length > 60 ? `${text.substring(0, 60)}...` : text}
        </span>
      ),
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      render: (section: string) => <Tag color="blue">{section}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="w-auto h-auto p-0 border-0"
            onClick={() => handleEdit(record.key)}
          >
            <img
              src="/assets/icons/edit.png"
              alt="Edit Icon"
              width={20}
              height={20}
            />
          </Button>
          <Button
            className="w-auto h-auto p-0 border-0"
            onClick={() => handleDelete(record.key)}
          >
            <img
              src="/assets/icons/delete.png"
              alt="Delete Icon"
              width={20}
              height={20}
            />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
            All Courses
          </span>
          <Input
            className="w-[215px] bg-white rounded-[6px]"
            addonBefore={<SearchOutlined style={{ color: "#0000008A" }} />}
            placeholder="Search"
          />
        </div>
        <div className="flex gap-[10px]">
          <Tooltip placement="bottom" title="Show/Hide Column">
            <Button>
              <FilterOutlined
                style={{
                  fontSize: "18px",
                  width: "18px",
                  height: "18px",
                  color: "#001B3F",
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" title="Add">
            <Button onClick={showModal}>
              <PlusOutlined
                style={{
                  fontSize: "18px",
                  width: "18px",
                  height: "18px",
                  color: "#001B3F",
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" title="Refresh">
            <Button onClick={handleReload}>
              <ReloadOutlined
                style={{
                  fontSize: "18px",
                  width: "18px",
                  height: "18px",
                  color: "#001B3F",
                }}
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Table<CourseType>
        rowSelection={{ type: "checkbox", columnWidth: "50px" }}
        columns={columns}
        dataSource={courses}
        loading={loading}
        pagination={{
          position: ["bottomLeft"],
          className: "table-pagination",
          total: courses.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: 10,
        }}
      />
      <CourseModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default Courses;
