"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Table, Tag, Space, Button, Input, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import ClassModal from "components/Admin/ClassModal";
import {
  getClasses,
  deleteClass,
  getClassById,
  getClassSections,
} from "api/class";
import { useMessageApi } from "utils";
import { IClass } from "types/school";

interface ClassType extends IClass {
  sections?: any[];
}

function Classes() {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const messageApi = useMessageApi();
  const [search, setSearch] = useState("");

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getClasses();
      setClasses(response);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      messageApi.error("Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const showModal = () => {
    setEditMode(false);
    setSelectedClass(null);
    setOpen(true);
  };

  const handleReload = () => {
    fetchClasses();
  };

  const handleEdit = async (classItem: ClassType) => {
    setEditMode(true);
    setLoading(true);
    try {
      // Fetch the latest class data and its sections
      const [classRes, sectionsRes] = await Promise.all([
        getClassById(classItem._id),
        getClassSections(classItem._id),
      ]);
      setSelectedClass({ ...classRes, sections: sectionsRes });
      setOpen(true);
    } catch (error) {
      messageApi.error("Failed to fetch class details for editing");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (classId: string) => {
    try {
      await deleteClass(classId);
      messageApi.success("Class deleted successfully");
      fetchClasses();
    } catch (error: any) {
      console.error("Failed to delete class:", error);
      messageApi.error(
        error.response?.data?.message ||
          "Failed to delete class. It may have students enrolled."
      );
    }
  };

  const columns: TableColumnsType<ClassType> = [
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
      render: (text) => (
        <span className="font-semibold text-[#2989FF]">{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span className="text-sm">
          {text && text.length > 60
            ? `${text.substring(0, 60)}...`
            : text || "N/A"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="w-auto h-auto p-0 border-0"
            onClick={() => handleEdit(record)}
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

  const filteredClasses = classes.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.className.toLowerCase().includes(term) ||
      (c.description || "").toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[#5B626B] font-roboto text-base font-medium leading-[18.75px] text-center">
            All Classes
          </span>
          <Input
            className="w-[215px] bg-white rounded-[6px]"
            addonBefore={<SearchOutlined style={{ color: "#0000008A" }} />}
            placeholder="Search"
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          <Tooltip placement="bottom" title="Add Class">
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
        </div>
      </div>
      <Table<ClassType>
        rowSelection={{ type: "checkbox", columnWidth: "50px" }}
        columns={columns}
        dataSource={filteredClasses}
        loading={loading}
        rowKey="_id"
        pagination={{
          position: ["bottomLeft"],
          className: "table-pagination",
          total: classes.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: 10,
        }}
      />
      <ClassModal
        open={open}
        setOpen={setOpen}
        onSuccess={fetchClasses}
        editMode={editMode}
        classData={selectedClass as any}
      />
    </div>
  );
}

export default Classes;
