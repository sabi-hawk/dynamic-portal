"use client";
import React from "react";
import { Table, Input, Button, Tooltip } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

interface LeaveType {
  key: string;
  image: string;
  rollNo: string;
  studentName: string;
  fromDate: string;
  toDate: string;
  status: string;
  reason: string;
}

const data: LeaveType[] = [
  {
    key: "1",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Approve",
    reason: "this is reason.",
  },
  {
    key: "2",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Reject",
    reason: "this is reason.",
  },
  {
    key: "3",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Pending",
    reason: "this is reason.",
  },
  {
    key: "4",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Pending",
    reason: "this is reason.",
  },
  {
    key: "5",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Approve",
    reason: "this is reason.",
  },
  {
    key: "6",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Reject",
    reason: "this is reason.",
  },
  {
    key: "7",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Pending",
    reason: "this is reason.",
  },
  {
    key: "8",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Approve",
    reason: "this is reason.",
  },
  {
    key: "9",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Pending",
    reason: "this is reason.",
  },
  {
    key: "10",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    fromDate: "02/05/2023",
    toDate: "02/05/2023",
    status: "Approve",
    reason: "this is reason.",
  },
];

const columns: TableProps<LeaveType>["columns"] = [
  {
    title: <span className="text-[#666666] font-normal text-sm">Image</span>,
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img
        src={image}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    ),
  },
  {
    title: <span className="text-[#666666] font-normal text-sm">Roll No.</span>,
    dataIndex: "rollNo",
    key: "rollNo",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: (
      <span className="text-[#666666] font-normal text-sm">Student Name</span>
    ),
    dataIndex: "studentName",
    key: "studentName",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: (
      <span className="text-[#666666] font-normal text-sm">From Date</span>
    ),
    dataIndex: "fromDate",
    key: "fromDate",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: <span className="text-[#666666] font-normal text-sm">To Date</span>,
    dataIndex: "toDate",
    key: "toDate",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: <span className="text-[#666666] font-normal text-sm">Status</span>,
    key: "status",
    dataIndex: "status",
    render: (status: string) => (
      <span
        className={`px-3 py-1 rounded-full text-sm ${
          status === "Approve"
            ? "bg-[rgba(25,135,84,0.15)] text-[#198754] border border-[#27d081]"
            : status === "Reject"
            ? "bg-[rgba(220,53,69,0.15)] text-[#DC3545] border border-[#e35d6a]"
            : "bg-[rgba(255,193,7,0.15)] text-[#FFC107] border border-[#ffd24d]"
        }`}
      >
        {status}
      </span>
    ),
  },
  {
    title: <span className="text-[#666666] font-normal text-sm">Reason</span>,
    dataIndex: "reason",
    key: "reason",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
];

function Leaves() {
  return (
    <div>
      <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
            Leaves Request
          </span>
          <Input
            className="w-[215px] bg-white rounded-[6px]"
            addonBefore={<SearchOutlined style={{ color: "#0000008A" }} />}
            placeholder="Search"
          />
        </div>
        <div className="flex gap-[10px]">
          <Tooltip placement="bottom" title="Refresh">
            <Button>
              <ReloadOutlined style={{ fontSize: "18px", color: "#001B3F" }} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <Table<LeaveType>
        rowSelection={{ type: "checkbox" }}
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomLeft"],
          className: "table-pagination",
          total: data.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: 10,
        }}
      />
    </div>
  );
}

export default Leaves;
