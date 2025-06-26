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
import StudentModal from "components/Admin/StudentModal";
import { deleteStudent, getStudents } from "api/student";
import { useMessageApi } from "utils";

interface DataType {
  key: React.Key;
  image: string;
  rollNo: number;
  name: { first: string; last: string };
  department: string;
  gender: string;
  mobile: string;
  email: string;
  admissionDate: string;
  section: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Roll No.",
    dataIndex: "rollNo",
  },
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
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Admission Date",
    dataIndex: "admissionDate",
  },
];

const Students = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const messageApi = useMessageApi();

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStudents();

      const formattedData = response.data.map((student: any) => ({
        key: student.id || student._id,
        image: student.image || "/assets/images/user.png",
        rollNo: student.rollNo,
        name: student.name
          ? { first: student.name.first || '', last: student.name.last || '' }
          : { first: '', last: '' },
        department: student.department,
        gender: student.gender,
        mobile: student.mobile,
        email: student.email,
        admissionDate: student.admissionDate,
        section: student.section,
      }));
      setStudents(formattedData);
      setTotal(response.data.total || formattedData.length);
    } catch (error) {
      console.error("Error fetching students:", error);
      messageApi.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const showModal = () => {
    setEditMode(false);
    setSelectedStudent(null);
    setOpen(true);
  };

  const handleReload = () => {
    fetchStudents();
  };

  const handleEdit = (key: React.Key) => {
    const student = students.find((s) => s.key === key);
    if (student) {
      setSelectedStudent(student);
      setEditMode(true);
      setOpen(true);
    }
  };

  const handleDelete = async (key: React.Key) => {
    try {
      await deleteStudent(key.toString());
      messageApi.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      messageApi.error("Failed to delete student");
    }
  };

  const actionColumns: TableColumnsType<DataType> = [
    ...columns.filter((col) => col.title !== "Actions"),
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
              All Students
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
          columns={actionColumns}
          dataSource={students}
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
      <StudentModal open={open} setOpen={setOpen} onSuccess={fetchStudents} editMode={editMode} studentData={selectedStudent} />
    </div>
  );
};

export default Students;
