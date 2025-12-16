"use client";
import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Select, Row, Col, InputNumber } from "antd";
import type { FormProps } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { addSection, updateSection } from "api/section";
import { COMMON_SECTION_NAMES, ISection } from "types/school";

const { TextArea } = Input;

interface SectionModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  editMode?: boolean;
  classId?: string;
  sectionData?: ISection | null;
}

function SectionModal({
  open,
  setOpen,
  onSuccess,
  editMode = false,
  classId,
  sectionData,
}: SectionModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  useEffect(() => {
    if (editMode && sectionData) {
      form.setFieldsValue({
        sectionName: sectionData.sectionName,
        description: sectionData.description || "",
        capacity: sectionData.capacity || 0,
        status: sectionData.status,
      });
    } else {
      form.resetFields();
    }
  }, [editMode, sectionData, form, open]);

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      setConfirmLoading(true);
      // Extract classId as string (handle both string and IClass object)
      const currentClassId =
        classId ||
        (typeof sectionData?.classId === "string"
          ? sectionData.classId
          : sectionData?.classId?._id) ||
        "";

      const sectionPayload = {
        classId: currentClassId,
        sectionName: values.sectionName,
        description: values.description || "",
        capacity: values.capacity || 0,
        status: values.status || "active",
      };

      if (editMode && sectionData) {
        await updateSection(sectionData._id, sectionPayload);
        messageApi.success("Section Updated Successfully!");
      } else {
        await addSection(sectionPayload);
        messageApi.success("Section Added Successfully!");
      }

      form.resetFields();
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to save section:", error);
      messageApi.error(
        error.response?.data?.message ||
          `Failed to ${editMode ? "update" : "add"} section. Please try again.`
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title={editMode ? "Edit Section" : "Add Section"}
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={editMode ? "Update" : "Save"}
      width={600}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ borderRadius: "0.35rem" }}
      >
        <Row gutter={16}>
          {/* Section Name Field */}
          <Col span={12}>
            <Form.Item
              label="Section Name"
              name="sectionName"
              rules={[
                {
                  required: true,
                  message: "Please enter Section Name",
                },
              ]}
            >
              <Select
                showSearch
                mode="tags"
                maxCount={1}
                placeholder="Enter or Select Section Name"
                className="custom-select"
                suffixIcon={<BookOutlined />}
                options={COMMON_SECTION_NAMES.map((name) => ({
                  value: name,
                  label: name,
                }))}
              />
            </Form.Item>
          </Col>

          {/* Capacity Field */}
          <Col span={12}>
            <Form.Item
              label="Capacity"
              name="capacity"
              initialValue={30}
              rules={[
                {
                  required: true,
                  message: "Please enter capacity",
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Maximum Students"
                className="custom-input w-full"
              />
            </Form.Item>
          </Col>

          {/* Status Dropdown */}
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              initialValue="active"
              rules={[
                {
                  required: true,
                  message: "Please select a status",
                },
              ]}
            >
              <Select
                placeholder="Select Status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                className="custom-select"
              />
            </Form.Item>
          </Col>

          {/* Description Field */}
          <Col span={24}>
            <Form.Item label="Description" name="description">
              <TextArea
                rows={4}
                placeholder="Section Description (optional)"
                className="custom-input"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default SectionModal;
