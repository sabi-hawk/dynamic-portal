import React, { useEffect, useState } from "react";
import { Input, Modal, Form, Select, DatePicker, Row, Col } from "antd";
import type { FormProps } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useMessageApi } from "utils";
import { updateStudent } from "api/student";
import { register } from "api/auth";
import { getClasses, getClassSections } from "api/class";
import dayjs from "dayjs";

interface StudentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  editMode?: boolean;
  studentData?: any;
}

function AddSchoolStudentModal({
  open,
  setOpen,
  onSuccess,
  editMode = false,
  studentData,
}: StudentModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [loadingSections, setLoadingSections] = useState(false);

  // Fetch classes when modal opens
  useEffect(() => {
    if (open) {
      fetchClasses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Load student data when editing
  useEffect(() => {
    if (editMode && studentData) {
      const classId =
        typeof studentData.classId === "string"
          ? studentData.classId
          : studentData.classId?._id;
      const sectionId =
        typeof studentData.sectionId === "string"
          ? studentData.sectionId
          : studentData.sectionId?._id;

      form.setFieldsValue({
        fullName:
          studentData.fullName ||
          `${studentData.name?.first || ""} ${
            studentData.name?.last || ""
          }`.trim(),
        classId: classId,
        sectionId: sectionId,
        gender: studentData.gender,
        mobile: studentData.mobile,
        email: studentData.email,
        guardianName: studentData.guardianName || "",
        guardianContact: studentData.guardianContact || "",
        admissionDate: studentData.admissionDate
          ? dayjs(studentData.admissionDate)
          : undefined,
      });

      if (classId) {
        setSelectedClassId(classId);
        fetchSections(classId);
      }
    } else {
      form.resetFields();
      setSections([]);
      setSelectedClassId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, studentData, form, open]);

  const fetchClasses = async () => {
    try {
      const response = await getClasses();
      setClasses(response || []);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      messageApi.error("Failed to load classes");
    }
  };

  const fetchSections = async (classId: string) => {
    try {
      setLoadingSections(true);
      const response = await getClassSections(classId);
      setSections(response || []);
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      messageApi.error("Failed to load sections");
      setSections([]);
    } finally {
      setLoadingSections(false);
    }
  };

  const handleClassChange = (classId: string) => {
    setSelectedClassId(classId);
    form.setFieldValue("sectionId", undefined); // Reset section when class changes
    setSections([]);
    if (classId) {
      fetchSections(classId);
    }
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      setConfirmLoading(true);
      const payload = {
        ...values,
        admissionDate: values.admissionDate?.toISOString(),
        role: "student",
      } as any;

      if (editMode && studentData) {
        await updateStudent(studentData.key, payload);
        messageApi.success("Student Updated Successfully!");
      } else {
        // For new students, use fullName as the name field
        const { fullName, ...rest } = payload;
        await register({
          ...rest,
          name: fullName,
        });
        messageApi.success("Student Added Successfully!");
      }
      form.resetFields();
      setSections([]);
      setSelectedClassId(null);
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to save student:", error);
      messageApi.error(
        error.response?.data?.message ||
          `Failed to ${editMode ? "update" : "add"} student. Please try again.`
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setSections([]);
    setSelectedClassId(null);
    setOpen(false);
  };

  return (
    <Modal
      title={editMode ? "Edit School Student" : "Add School Student"}
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={editMode ? "Update" : "Save"}
      width={640}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ borderRadius: "0.35rem" }}
      >
        <Row gutter={16}>
          {/* Full Name */}
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter Full Name" }]}
            >
              <Input
                suffix={<UserOutlined />}
                placeholder="Student Full Name*"
                className="custom-input"
              />
            </Form.Item>
          </Col>
          {/* Class */}
          <Col span={6}>
            <Form.Item
              label="Class"
              name="classId"
              rules={[{ required: true, message: "Please select class" }]}
            >
              <Select
                placeholder="Select Class"
                onChange={handleClassChange}
                options={classes.map((cls) => ({
                  value: cls._id,
                  label: cls.className,
                }))}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          {/* Section */}
          <Col span={6}>
            <Form.Item
              label="Section"
              name="sectionId"
              rules={[{ required: true, message: "Please select section" }]}
            >
              <Select
                placeholder="Select Section"
                loading={loadingSections}
                disabled={!selectedClassId || loadingSections}
                options={sections.map((sec) => ({
                  value: sec._id,
                  label: sec.sectionName,
                }))}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          {/* Gender */}
          <Col span={8}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select a gender" }]}
            >
              <Select
                placeholder="Select Gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </Form.Item>
          </Col>
          {/* Guardian Name */}
          <Col span={12}>
            <Form.Item
              label="Guardian Name"
              name="guardianName"
              rules={[
                { required: true, message: "Please enter Guardian Name" },
              ]}
            >
              <Input
                suffix={<UserOutlined />}
                placeholder="Parent/Guardian Name*"
                className="custom-input"
              />
            </Form.Item>
          </Col>
          {/* Guardian Contact */}
          <Col span={12}>
            <Form.Item
              label="Guardian Contact"
              name="guardianContact"
              rules={[
                { required: true, message: "Please enter Guardian Contact" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              ]}
            >
              <Input
                suffix={<PhoneOutlined />}
                placeholder="Guardian Mobile Number*"
                className="custom-input"
              />
            </Form.Item>
          </Col>
          {/* Email (for student login) */}
          <Col span={12}>
            <Form.Item
              label="Email (for login)"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                suffix={<MailOutlined />}
                placeholder="Student Email*"
                className="custom-input"
              />
            </Form.Item>
          </Col>
          {/* Password */}
          {!editMode && (
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  placeholder="Password*"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          )}
          {/* Gender */}
          <Col span={6}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select
                placeholder="Gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
            </Form.Item>
          </Col>
          {/* Admission Date */}
          <Col span={6}>
            <Form.Item
              label="Admission Date"
              name="admissionDate"
              rules={[
                { required: true, message: "Please select admission date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Admission Date"
                className="custom-date-picker"
              />
            </Form.Item>
          </Col>
          {/* Mobile (optional - for student) */}
          <Col span={12}>
            <Form.Item label="Student Mobile (Optional)" name="mobile">
              <Input
                suffix={<PhoneOutlined />}
                placeholder="Student Mobile (optional)"
                className="custom-input"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddSchoolStudentModal;
