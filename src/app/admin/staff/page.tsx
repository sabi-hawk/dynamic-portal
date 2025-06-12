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
import { getTeachers, deleteTeacher } from "api/teacher";
import { useMessageApi } from "utils";
import axios from "axios";

interface DataType {
  _id: React.Key;
  image: string;
  name: string;
  department: string;
  section: string;
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
  const [editMode, setEditMode] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
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
        _id: teacher.id || teacher._id,
        image: teacher.image || "/assets/images/user.png",
        name: teacher.name
          ? { first: teacher.name.first || '', last: teacher.name.last || '' }
          : { first: '', last: '' },
        department: teacher.department,
        role: teacher.role || "Teacher",
        section: teacher.section || "N/A",
        mobile: teacher.mobile,
        email: teacher.email,
        address: teacher.address || "N/A",
        status: teacher.status || "Active",
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
    setEditMode(false);
    setSelectedTeacher(null);
    setOpen(true);
  };

  const handleReload = () => {
    fetchTeachers();
  };

  const handleEdit = (_id: React.Key) => {
    const teacher = teachers.find((t) => t._id === _id);
    if (teacher) {
      setSelectedTeacher(teacher);
      setEditMode(true);
      setOpen(true);
    }
  };

  const handleDelete = async (key: React.Key) => {
    try {
      await deleteTeacher(key.toString());
      messageApi.success("Teacher deleted successfully");
      fetchTeachers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting teacher:", error);
      messageApi.error("Failed to delete teacher");
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name: { first: string; last: string }, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image}
            alt="Profile"
            width={40}
            height={40}
            style={{ borderRadius: "50%", marginRight: "8px" }}
          />
          <span>{`${name.first} ${name.last}`.trim()}</span>
        </div>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Section",
      dataIndex: "section",
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
            onClick={() => handleEdit(record._id)}
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
            onClick={() => handleDelete(record._id)}
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
      <TeacherModal 
        open={open} 
        setOpen={setOpen} 
        onSuccess={fetchTeachers}
        editMode={editMode}
        teacherData={selectedTeacher}
      />
    </div>
  );
};

export default Staff;
