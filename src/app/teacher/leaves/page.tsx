"use client";
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Tooltip, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  ReloadOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { getTeacherLeaves, updateLeaveStatus } from "api/teacher";

interface LeaveType {
  _id: string;
  student: {
    rollNo: string;
    userId?: string;
  };
  courseSchedule: {
    course: {
      courseCode: string;
      courseName: string;
    };
  };
  requestedDay: string;
  reason: string;
  status: string;
}

export default function TeacherLeavesPage() {
  const [data, setData] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await getTeacherLeaves();
      setData(res.data);
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleDecision = async (
    leaveId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      await updateLeaveStatus(leaveId, status);
      message.success(`Leave ${status}`);
      fetchLeaves();
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Action failed");
    }
  };

  const columns: ColumnsType<LeaveType> = [
    {
      title: "Course",
      dataIndex: "courseSchedule",
      key: "course",
      render: (cs) => `${cs.course.courseCode} – ${cs.course.courseName}`,
    },
    {
      title: "Student Roll",
      dataIndex: "student",
      key: "roll",
      render: (s) => s.rollNo,
    },
    {
      title: "Requested Day",
      dataIndex: "requestedDay",
      key: "day",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "accepted"
              ? "green"
              : status === "rejected"
              ? "red"
              : "orange"
          }
          className="capitalize"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<CheckOutlined />}
            size="small"
            type="primary"
            onClick={() => handleDecision(record._id, "accepted")}
            disabled={record.status !== "pending"}
          >
            Accept
          </Button>
          <Button
            icon={<CloseOutlined />}
            size="small"
            danger
            onClick={() => handleDecision(record._id, "rejected")}
            disabled={record.status !== "pending"}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Pending Leave Requests</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-64"
          />
          <Tooltip title="Refresh">
            <Button icon={<ReloadOutlined />} onClick={fetchLeaves} />
          </Tooltip>
        </div>
      </div>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
