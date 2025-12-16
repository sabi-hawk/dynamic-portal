"use client";
import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Select, Row, Col, Button } from "antd";
import type { FormProps } from "antd";
import { BookOutlined, PlusOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { addClass, updateClass } from "api/class";
import { addSection, updateSection, deleteSection } from "api/section";
import SectionField from "./SectionField";
import { IClass } from "types/school";

const { TextArea } = Input;

interface ClassWithSections extends IClass {
  sections?: any[];
}

interface ClassModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  editMode?: boolean;
  classData?: ClassWithSections | null;
}

function ClassModal({
  open,
  setOpen,
  onSuccess,
  editMode = false,
  classData,
}: ClassModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  useEffect(() => {
    if (editMode && classData) {
      form.setFieldsValue({
        className: classData.className,
        description: classData.description || "",
        status: classData.status,
        sections: (classData.sections || []).map((s: any) => ({
          _id: s._id,
          sectionName: s.sectionName,
          capacity: s.capacity || 0,
          description: s.description || "",
          status: s.status || "active",
        })),
      });
    } else {
      form.resetFields();
    }
  }, [editMode, classData, form, open]);

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      setConfirmLoading(true);
      const classPayload = {
        className: values.className,
        description: values.description || "",
        status: values.status || "active",
      };

      let classId = classData?._id;

      // Create or update the class
      if (editMode && classData) {
        await updateClass(classData._id, classPayload);
        messageApi.success("Class Updated Successfully!");
      } else {
        const result = await addClass(classPayload);
        classId = result.class._id;
        messageApi.success("Class Added Successfully!");
      }

      // Handle sections if classId exists
      if (classId && values.sections) {
        const existingSectionIds = (classData?.sections || []).map(
          (s: any) => s._id
        );
        const newSectionIds = values.sections
          .filter((s: any) => s._id)
          .map((s: any) => s._id);

        // Delete removed sections
        const sectionsToDelete = existingSectionIds.filter(
          (id: string) => !newSectionIds.includes(id)
        );
        for (const sectionId of sectionsToDelete) {
          try {
            await deleteSection(sectionId);
          } catch (error) {
            console.error("Error deleting section:", error);
          }
        }

        // Create or update sections
        for (const section of values.sections) {
          const sectionPayload = {
            classId: classId,
            sectionName: section.sectionName,
            description: section.description || "",
            capacity: section.capacity || 0,
            status: section.status || "active",
          };

          if (section._id) {
            // Update existing section
            await updateSection(section._id, sectionPayload);
          } else {
            // Create new section
            await addSection(sectionPayload);
          }
        }
      }

      form.resetFields();
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to save class:", error);
      messageApi.error(
        error.response?.data?.message ||
          `Failed to ${editMode ? "update" : "add"} class. Please try again.`
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
      title={editMode ? "Edit Class" : "Add Class"}
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={editMode ? "Update" : "Save"}
      width={900}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ borderRadius: "0.35rem" }}
      >
        <Row gutter={16}>
          {/* Class Name Field */}
          <Col span={12}>
            <Form.Item
              label="Class Name"
              name="className"
              rules={[
                {
                  required: true,
                  message: "Please enter Class Name",
                },
              ]}
            >
              <Input
                suffix={<BookOutlined />}
                placeholder="e.g., Playgroup, Nursery, 1, 2, 3..."
                className="custom-input"
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
                placeholder="Class Description (optional)"
                className="custom-input"
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">Sections</h3>
          <Form.List name="sections">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <SectionField
                    key={field.key}
                    name={field.name}
                    onRemove={() => remove(field.name)}
                  />
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Section
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      </Form>
    </Modal>
  );
}

export default ClassModal;
