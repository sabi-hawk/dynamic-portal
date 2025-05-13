"use client";
import React, { useState } from "react";
import { Table, Button, Input, Tooltip } from "antd";
import type { TableProps } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import AttendanceModal from "components/Teacher/AttendanceModal";

interface AttendanceType {
  key: string;
  image: string;
  rollNo: string;
  className: string;
  attendance: string;
  date: string;
}

const data: AttendanceType[] = [
  {
    key: "1",
    image: "/assets/images/user.png",
    rollNo: "12",
    className: "John Doe",
    attendance: "Present",
    date: "02/05/2023",
  },
  {
    key: "2",
    image: "/assets/images/user.png",
    rollNo: "13",
    className: "Jane Smith",
    attendance: "Absent",
    date: "02/05/2023",
  },
  {
    key: "3",
    image: "/assets/images/user.png",
    rollNo: "14",
    className: "Mike Johnson",
    attendance: "Present",
    date: "02/05/2023",
  },
  {
    key: "4",
    image: "/assets/images/user.png",
    rollNo: "15",
    className: "Sarah Williams",
    attendance: "Absent",
    date: "02/05/2023",
  },
  {
    key: "5",
    image: "/assets/images/user.png",
    rollNo: "16",
    className: "David Brown",
    attendance: "Present",
    date: "02/05/2023",
  },
  {
    key: "6",
    image: "/assets/images/user.png",
    rollNo: "17",
    className: "Emily Davis",
    attendance: "Present",
    date: "02/05/2023",
  },
  {
    key: "7",
    image: "/assets/images/user.png",
    rollNo: "18",
    className: "Michael Wilson",
    attendance: "Absent",
    date: "02/05/2023",
  },
  {
    key: "8",
    image: "/assets/images/user.png",
    rollNo: "19",
    className: "Emma Taylor",
    attendance: "Present",
    date: "02/05/2023",
  },
  {
    key: "9",
    image: "/assets/images/user.png",
    rollNo: "20",
    className: "Daniel Anderson",
    attendance: "Present",
    date: "02/05/2023",
  },
  {
    key: "10",
    image: "/assets/images/user.png",
    rollNo: "21",
    className: "Olivia Martin",
    attendance: "Absent",
    date: "02/05/2023",
  },
];

function Attendance() {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  const columns: TableProps<AttendanceType>["columns"] = [
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
      title: (
        <span className="text-[#666666] font-normal text-sm">Roll No.</span>
      ),
      dataIndex: "rollNo",
      key: "rollNo",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">Class Name</span>
      ),
      dataIndex: "className",
      key: "className",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">Attendance</span>
      ),
      key: "attendance",
      dataIndex: "attendance",
      render: (status: string) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            status === "Present"
              ? "bg-[rgba(25,135,84,0.15)] text-[#198754] border border-[#27d081]"
              : "bg-[rgba(220,53,69,0.15)] text-[#DC3545] border border-[#e35d6a]"
          }`}
        >
          {status}
        </span>
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
      title: <span className="text-[#666666] font-normal text-sm">Action</span>,
      key: "action",
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
            Attendance
          </span>
          <Input
            className="w-[215px] bg-white rounded-[6px]"
            addonBefore={<SearchOutlined style={{ color: "#0000008A" }} />}
            placeholder="Search"
          />
        </div>
        <div className="flex gap-[10px]">
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

      <div className="p-6 bg-white">
        <Table<AttendanceType>
          rowSelection={{ type: "checkbox" }}
          columns={columns}
          dataSource={data}
          className="[&_.ant-table-content]:bg-[#fdfbff]"
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
      <AttendanceModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default Attendance;
