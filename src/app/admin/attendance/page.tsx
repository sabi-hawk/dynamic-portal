"use client";
import React from "react";
import { Table, Tag, Space, Button, Input, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import {
  DownloadOutlined,
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";

interface DataType {
  key: React.Key;
  employeeId: string;
  image: string;
  name: string;
  designation: string;
  joiningDate: string;
  checkIn: string;
  break: string;
  checkOut: string;
  totalHours: string;
  department: string;
  shift: string;
  attendanceStatus: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Employee ID",
    dataIndex: "employeeId",
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={record.image}
          alt="Profile"
          width={40}
          height={40}
          style={{ borderRadius: "50%", marginRight: "8px" }}
        />
        <span>{record.name}</span>
      </div>
    ),
  },
  {
    title: "Designation",
    dataIndex: "designation",
  },
  {
    title: "Joining Date",
    dataIndex: "joiningDate",
  },
  {
    title: "Check-In",
    dataIndex: "checkIn",
  },
  {
    title: "Break",
    dataIndex: "break",
  },
  {
    title: "Check-Out",
    dataIndex: "checkOut",
  },
  {
    title: "Total Hours",
    dataIndex: "totalHours",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Shift",
    dataIndex: "shift",
  },
  {
    title: "Attendance Status",
    dataIndex: "attendanceStatus",
    render: (status: string) => (
      <Tag
        color={status === "Present" ? "green" : "volcano"}
        className={status === "Present" ? "text-green-700" : "text-red-600"}
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
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

const data = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i,
  employeeId: `E12345${i}`,
  image: "/assets/images/user.png",
  name: `John ${i % 2 === 0 ? "Brown" : "Smith"}`,
  designation: i % 2 === 0 ? "Admin Officer" : "Math Teacher",
  joiningDate: "2024-10-08",
  checkIn: "10:30",
  break: "01:15",
  checkOut: "19:37",
  totalHours: "08:02",
  department: i % 2 === 0 ? "Admin" : "Teacher",
  shift: "Day",
  attendanceStatus: i % 2 === 0 ? "Present" : "Absent",
}));

const handleEdit = (key: React.Key) => {
  console.log("Edit record", key);
};

const handleDelete = (key: React.Key) => {
  console.log("Delete record", key);
};

function Attendance() {
  return (
    <div>
      <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
            Staff Attendance
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
            <Button>
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
            <Button>
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
          <Tooltip placement="bottom" title="Xlsx Download">
            <Button>
              <DownloadOutlined
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
      <Table<DataType>
        rowSelection={{ type: "checkbox", columnWidth: "50px" }}
        columns={columns}
        dataSource={data}
        // scroll={{ y: "100%" }}
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
    </div>
  );
}

export default Attendance;
