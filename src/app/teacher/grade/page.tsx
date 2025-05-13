"use client";
import React, { useState } from "react";
import { Table, Button, Input, Tooltip } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import GradeModal from "components/Teacher/GradeModal";

interface GradeType {
  key: string;
  image: string;
  rollNo: string;
  studentName: string;
  assignmentTitle: string;
  submissionStatus: string;
  grade: string;
  feedback: string;
}

const data: GradeType[] = [
  {
    key: "1",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "Late Sub",
    grade: "D+",
    feedback: "this is feedback.",
  },
  {
    key: "2",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "On time Sub",
    grade: "A+",
    feedback: "this is feedback.",
  },
  {
    key: "3",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "On time Sub",
    grade: "A+",
    feedback: "this is feedback.",
  },
  {
    key: "4",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "On time Sub",
    grade: "A+",
    feedback: "this is feedback.",
  },
  {
    key: "5",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "Late Sub",
    grade: "D+",
    feedback: "this is feedback.",
  },
  {
    key: "6",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "Not Sub",
    grade: "F",
    feedback: "this is feedback.",
  },
  {
    key: "7",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "Late Sub",
    grade: "D+",
    feedback: "this is feedback.",
  },
  {
    key: "8",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "Not Sub",
    grade: "D+",
    feedback: "this is feedback.",
  },
  {
    key: "9",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "On time Sub",
    grade: "D+",
    feedback: "this is feedback.",
  },
  {
    key: "10",
    image: "/assets/images/user.png",
    rollNo: "12",
    studentName: "John Doe",
    assignmentTitle: "SDLC Flow Diagram",
    submissionStatus: "On time Sub",
    grade: "D+",
    feedback: "this is feedback.",
  },
];

function Grade() {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  const columns: TableProps<GradeType>["columns"] = [
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
        <span className="text-[#666666] font-normal text-sm">
          Submission Status
        </span>
      ),
      key: "submissionStatus",
      dataIndex: "submissionStatus",
      render: (status: string) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            status === "On time Sub"
              ? "bg-[rgba(25,135,84,0.15)] text-[#198754] border border-[#27d081]"
              : status === "Late Sub"
              ? "bg-[rgba(255,193,7,0.15)] text-[#FFC107] border border-[#ffd24d]"
              : "bg-[rgba(220,53,69,0.15)] text-[#DC3545] border border-[#e35d6a]"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: <span className="text-[#666666] font-normal text-sm">Grade</span>,
      dataIndex: "grade",
      key: "grade",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-[#666666] font-normal text-sm">Feedback</span>
      ),
      dataIndex: "feedback",
      key: "feedback",
      render: (text) => (
        <span className="text-[#444444] font-normal text-sm">{text}</span>
      ),
    },
    {
      title: <span className="text-[#666666] font-normal text-sm">Edit</span>,
      key: "edit",
      render: () => (
        <Button className="w-auto h-auto p-0 border-0" onClick={handleEdit}>
          <img src="/assets/icons/edit.png" alt="Edit" className="w-5 h-5" />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
            Grades
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

      <div className="p-6 bg-white">
        <Table<GradeType>
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
        <GradeModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Grade;
