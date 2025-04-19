"use client";
import React, { useState } from "react";
import { Table, Button, Input, Tooltip, Row, Col } from "antd";
import type { TableProps } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import LectureModal from "components/Teacher/LectureModal";

interface LectureType {
  key: string;
  class: string;
  subjectName: string;
  date: string;
  time: string;
  status: string;
  courseMaterial: string;
}

const data: LectureType[] = [
  {
    key: "1",
    class: "123-A",
    subjectName: "Mathematics",
    date: "02-02-2024",
    time: "09:00 am",
    status: "Confirm",
    courseMaterial: "Attachments",
  },
  {
    key: "2",
    class: "124-B",
    subjectName: "Physics",
    date: "02-02-2024",
    time: "10:30 am",
    status: "Cancelled",
    courseMaterial: "Attachments",
  },
  {
    key: "3",
    class: "125-C",
    subjectName: "Chemistry",
    date: "02-02-2024",
    time: "11:45 am",
    status: "Confirm",
    courseMaterial: "Attachments",
  },
  {
    key: "4",
    class: "126-A",
    subjectName: "Biology",
    date: "02-02-2024",
    time: "01:15 pm",
    status: "Confirm",
    courseMaterial: "Attachments",
  },
  {
    key: "5",
    class: "127-B",
    subjectName: "English",
    date: "02-02-2024",
    time: "02:30 pm",
    status: "Cancelled",
    courseMaterial: "Attachments",
  },
  {
    key: "6",
    class: "128-C",
    subjectName: "History",
    date: "02-02-2024",
    time: "03:45 pm",
    status: "Confirm",
    courseMaterial: "Attachments",
  },
  {
    key: "7",
    class: "129-A",
    subjectName: "Geography",
    date: "02-02-2024",
    time: "09:00 am",
    status: "Cancelled",
    courseMaterial: "Attachments",
  },
  {
    key: "8",
    class: "130-B",
    subjectName: "Computer Science",
    date: "02-02-2024",
    time: "10:30 am",
    status: "Confirm",
    courseMaterial: "Attachments",
  },
  {
    key: "9",
    class: "131-C",
    subjectName: "Art",
    date: "02-02-2024",
    time: "11:45 am",
    status: "Cancelled",
    courseMaterial: "Attachments",
  },
  {
    key: "10",
    class: "132-A",
    subjectName: "Music",
    date: "02-02-2024",
    time: "01:15 pm",
    status: "Confirm",
    courseMaterial: "Attachments",
  },
];

function Lectures() {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };
  const columns: TableProps<LectureType>["columns"] = [
    {
      title: <span className="text-[#666666] font-normal text-sm">Class</span>,
      dataIndex: "class",
      key: "class",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">Subject Name</span>
      ),
      dataIndex: "subjectName",
      key: "subjectName",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: <span className="text-[#666666] font-normal text-sm">Date</span>,
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: <span className="text-[#666666] font-normal text-sm">Time</span>,
      dataIndex: "time",
      key: "time",
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
            status === "Confirm"
              ? "bg-[rgba(25,135,84,0.15)] text-[#198754] border border-[#27d081]"
              : "bg-[rgba(220,53,69,0.15)] text-[#DC3545] border border-[#e35d6a]"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">
          Course Material
        </span>
      ),
      dataIndex: "courseMaterial",
      key: "courseMaterial",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">Attachments</span>
      ),
    },
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">Actions</span>
      ),
      key: "actions",
      render: () => (
        <div className="flex gap-2">
          <Button className="w-auto h-auto p-0 border-0" onClick={handleEdit}>
            <img src="/assets/icons/edit.png" alt="Edit" className="w-5 h-5" />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <img
              src="/assets/icons/delete.png"
              alt="Delete"
              className="w-5 h-5"
            />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
            Lectures
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
              <FilterOutlined style={{ fontSize: "18px", color: "#001B3F" }} />
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" title="Add">
            <Button>
              <PlusOutlined style={{ fontSize: "18px", color: "#001B3F" }} />
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" title="Refresh">
            <Button>
              <ReloadOutlined style={{ fontSize: "18px", color: "#001B3F" }} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <Table<LectureType>
        rowSelection={{ type: "checkbox" }}
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomLeft"],
          className: "table-pagination",
          // total: smsData && smsData.pagination.total,
          total: 100,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: true,
          showQuickJumper: true,
          // pageSize: pagination.pageSize,
          pageSize: 10,
          // onChange: (page, pageSize) => {
          //   setPagination({ page, pageSize });
          // },
        }}
      />
      <LectureModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default Lectures;
