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
  rollNumber: number;
  name: string;
  class: string;
  feeType: string;
  invoiceNum: string;
  dueDate: string;
  date: string;
  paymentType: string;
  status: string;
  amount: string;
  notes: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Roll No.",
    dataIndex: "rollNumber",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Class",
    dataIndex: "class",
  },
  {
    title: "Fee Type",
    dataIndex: "feeType",
  },
  {
    title: "Invoice Number",
    dataIndex: "invoiceNum",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
  },
  {
    title: "Payment Date",
    dataIndex: "date",
  },
  {
    title: "Payment Type",
    dataIndex: "paymentType",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <Tag
        color={status === "paid" ? "green" : "volcano"}
        className={status === "paid" ? "text-green-700" : "text-red-600"}
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Notes",
    dataIndex: "notes",
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
  rollNumber: i+10,
  name: `John ${i % 2 === 0 ? "Brown" : "Smith"}`, // Optional: alternate names
  class: "10th Grade",
  feeType: i % 2 === 0 ? "Monthly" : "Annual", // Alternate genders
  invoiceNum: "IN-5645644",
  dueDate: "03/01/2024",
  date: i % 2 === 0 ? "" : "02/01/2024",
  paymentType: i % 2 === 0 ? "" : "Cash",
  status: i % 2 === 0 ? "pending" : "paid",
  amount: "170 $",
  notes: "N/A",
}));

const handleEdit = (key: React.Key) => {
  console.log("Edit record", key);
};

const handleDelete = (key: React.Key) => {
  console.log("Delete record", key);
};

function FeeGrid() {
  return (
      <div>
        <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
          <div className="flex items-center gap-[10px]">
            <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
              All Fees
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

export default FeeGrid;
