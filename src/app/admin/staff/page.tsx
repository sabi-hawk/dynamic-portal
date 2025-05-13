"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Table, Tag, Space, Button, Input, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import {
  DownloadOutlined,
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import TeacherModal from "components/Admin/TeacherModal";
import { getTeachers } from "api/teacher";
import { useMessageApi } from "utils";

interface DataType {
  key: React.Key;
  image: string;
  name: string;
  department: string;
  role: string;
  mobile: string;
  email: string;
  address: string;
  status: string;
  joiningDate: string;
  gender: string;
  degree: string;
}

const Staff = () => {
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const messageApi = useMessageApi();

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTeachers();

      const formattedData = response.data.map((teacher: any) => ({
        key: teacher.id || teacher._id,
        image: teacher.image || "/assets/images/user.png",
        name: teacher.name,
        department: teacher.department,
        role: teacher.role || "Teacher",
        mobile: teacher.mobile,
        email: teacher.email,
        address: teacher.address || "N/A",
        status: "Active", // Default status
        joiningDate: teacher.joiningDate,
        gender: teacher.gender,
        degree: teacher.degree,
      }));
      setTeachers(formattedData);
      setTotal(response.data.total || formattedData.length);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      messageApi.error("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const showModal = () => {
    setOpen(true);
  };

  const handleReload = () => {
    fetchTeachers();
  };

  const handleEdit = (key: React.Key) => {
    console.log("Edit record", key);
  };

  const handleDelete = (key: React.Key) => {
    console.log("Delete record", key);
  };

  const columns: TableColumnsType<DataType> = [
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
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
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

  return (
    <div>
      <div>
        <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
          <div className="flex items-center gap-[10px]">
            <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
              All Staff
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
          dataSource={teachers}
          loading={loading}
          pagination={{
            position: ["bottomLeft"],
            className: "table-pagination",
            total: total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: pagination.pageSize,
            current: pagination.page,
            onChange: (page, pageSize) => {
              setPagination({ page, pageSize });
            },
          }}
        />
      </div>
      <TeacherModal open={open} setOpen={setOpen} onSuccess={fetchTeachers} />
    </div>
  );
};

export default Staff;
