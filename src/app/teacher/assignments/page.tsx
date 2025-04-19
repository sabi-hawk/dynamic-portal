"use client";
import React, { useState } from "react";
import { Table, Button, Input, Tooltip, Row, Col } from "antd";
import type { TableProps } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import AssignmentModal from "components/Teacher/AssignmentModal";

interface AssignmentType {
  key: string;
  courseCode: string;
  className: string;
  assignmentTitle: string;
  dueDate: string;
  assignedDate: string;
  status: string;
}

const data: AssignmentType[] = [
  {
    key: "1",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "Completed",
  },
  {
    key: "2",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "Completed",
  },
  {
    key: "3",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "In Process",
  },
  {
    key: "4",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "Completed",
  },
  {
    key: "5",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "In Process",
  },
  {
    key: "6",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "In Process",
  },
  {
    key: "7",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "To be give",
  },
  {
    key: "8",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "In Process",
  },
  {
    key: "9",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "To be give",
  },
  {
    key: "10",
    courseCode: "12",
    className: "32 A",
    assignmentTitle: "SDLC Flow Chart",
    dueDate: "02/05/2023",
    assignedDate: "02/05/2023",
    status: "Completed",
  },
];

function Assignments() {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  const columns: TableProps<AssignmentType>["columns"] = [
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">Course Code</span>
      ),
      dataIndex: "courseCode",
      key: "courseCode",
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
        <span className="text-[#666666] font-normal text-sm">
          Assignment Title
        </span>
      ),
      dataIndex: "assignmentTitle",
      key: "assignmentTitle",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">Due Date</span>
      ),
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">
          Assigned Date
        </span>
      ),
      dataIndex: "assignedDate",
      key: "assignedDate",
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
            status === "Completed"
              ? "bg-[rgba(25,135,84,0.15)] text-[#198754] border border-[#27d081]"
              : status === "In Process"
              ? "bg-[rgba(255,193,7,0.15)] text-[#FFC107] border border-[#ffd24d]"
              : "bg-[rgba(111,66,193,0.15)] text-[#6F42C1] border border-[#9067dc]"
          }`}
        >
          {status}
        </span>
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
    <Row gutter={16}>
      <Col span={24}>
        <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
          <div className="flex items-center gap-[10px]">
            <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
              Assignments
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
                <ReloadOutlined
                  style={{ fontSize: "18px", color: "#001B3F" }}
                />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="p-6 bg-white">
          <Table<AssignmentType>
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
          <AssignmentModal open={open} setOpen={setOpen} />
        </div>
      </Col>
    </Row>
  );
}

export default Assignments;
