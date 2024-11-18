"use client";
import React from "react";
import { Table, Tag, Space, Button, Input, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import Image from "next/image";
import {
  DownloadOutlined,
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
interface DataType {
  key: React.Key;
  image: string;
  name: string;
  department: string;
  gender: string;
  role: string;
  degree: string;
  mobile: string;
  email: string;
  joiningDate: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
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
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    render: (gender: string) => (
      <Tag
        className={`${
          gender === "Male"
            ? "bg-[rgba(25,135,84,0.15)] text-[#198754] border border-[#27d081]"
            : "bg-[rgba(111,66,193,0.15)] text-[#6F42C1] border border-[#9067dc]"
        }`}
      >
        {gender}
      </Tag>
    ),
  },
  {
    title: "Degree",
    dataIndex: "degree",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (role: string) => (
      <Tag color={role === "Admin" ? "red" : "cyan"}>{role}</Tag>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Joining Date",
    dataIndex: "joiningDate",
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
          <Image
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
          <Image
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
  image: "/assets/images/user.png",
  name: `John ${i % 2 === 0 ? "Brown" : "Smith"}`, // Optional: alternate names
  department: "Science",
  gender: i % 2 === 0 ? "Male" : "Female", // Alternate genders
  degree: "PhD",
  mobile: "123-456-7890",
  role: i % 2 === 0 ? "Teacher" : "Admin", // Alternate roles
  email: `john${i}@example.com`,
  joiningDate: "2022-01-10",
}));

const handleEdit = (key: React.Key) => {
  console.log("Edit record", key);
};

const handleDelete = (key: React.Key) => {
  console.log("Delete record", key);
};

function Teachers() {
  return (
    <div>
      <div>
        <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
          <div className="flex items-center gap-[10px]">
            <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
              All Teachers
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
    </div>
  );
}

export default Teachers;
