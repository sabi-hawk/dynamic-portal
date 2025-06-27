"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Table, Tag, Space, Button, Input, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import CourseModal from "components/Admin/CourseModal";
import {
  getCourses,
  deleteCourse,
  getCourseById,
  getCourseSchedules,
} from "api/course";
import { useMessageApi } from "utils";

interface CourseType {
  _id: string;
  courseCode: string;
  courseName: string;
  description: string;
  status: string;
  schedules: any[];
}

function Courses() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const messageApi = useMessageApi();
  const [search, setSearch] = useState("");

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      messageApi.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const showModal = () => {
    setEditMode(false);
    setSelectedCourse(null);
    setOpen(true);
  };

  const handleReload = () => {
    fetchCourses();
  };

  const handleEdit = async (course: CourseType) => {
    setEditMode(true);
    setLoading(true);
    try {
      // Fetch the latest course data and its schedules
      const [courseRes, schedulesRes] = await Promise.all([
        getCourseById(course._id),
        getCourseSchedules(course._id),
      ]);
      setSelectedCourse({ ...courseRes.data, schedules: schedulesRes.data });
      setOpen(true);
    } catch (error) {
      messageApi.error("Failed to fetch course details for editing");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      messageApi.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
      messageApi.error("Failed to delete course");
    }
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="w-auto h-auto p-0 border-0"
            onClick={() => handleEdit(record)}
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
            onClick={() => handleDelete(record._id)}
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

  const filteredCourses = courses.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.courseCode.toLowerCase().includes(term) ||
      c.courseName.toLowerCase().includes(term) ||
      (c.description || "").toLowerCase().includes(term)
    );
  });

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
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        dataSource={filteredCourses}
        loading={loading}
        rowKey="_id"
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
      <CourseModal
        open={open}
        setOpen={setOpen}
        onSuccess={fetchCourses}
        editMode={editMode}
        courseData={selectedCourse}
      />
    </div>
  );
}

export default Courses;
