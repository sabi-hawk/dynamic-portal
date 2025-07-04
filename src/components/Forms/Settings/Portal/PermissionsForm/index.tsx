import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Row,
  Checkbox,
  Card,
  Divider,
  Typography,
  Switch,
  message,
  Space,
  Tag,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  TeamOutlined,
  TrophyOutlined,
  MailOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { getPortalSettings, getPortalFeatures } from "api/settings";
import type { FormInstance } from "antd/es/form";

const { Title, Text } = Typography;

interface PermissionsFormProps {
  form: FormInstance;
}

const PermissionsForm: React.FC<PermissionsFormProps> = ({ form }) => {
  const instituteType = Form.useWatch("instituteType", form) || "school";
  const teacherPortalEnabled = Form.useWatch(
    ["portalPermissions", "teacherPortal", "enabled"],
    form
  );
  const studentPortalEnabled = Form.useWatch(
    ["portalPermissions", "studentPortal", "enabled"],
    form
  );

  const [featureOptions, setFeatureOptions] = useState<{
    teacher: string[];
    student: string[];
  }>({ teacher: [], student: [] });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await getPortalFeatures(instituteType);
        setFeatureOptions(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchFeatures();
  }, [instituteType]);

  const featureLabels = {
    dashboard: { label: "Dashboard", icon: <DashboardOutlined /> },
    attendance: { label: "Attendance Management", icon: <CalendarOutlined /> },
    assignments: { label: "Assignments", icon: <FileTextOutlined /> },
    grades: { label: "Grades & Results", icon: <BarChartOutlined /> },
    schedule: { label: "Class Schedule", icon: <CalendarOutlined /> },
    communication: { label: "Communication", icon: <MailOutlined /> },
    reports: { label: "Reports & Analytics", icon: <BarChartOutlined /> },
    profile: { label: "Profile Management", icon: <UserOutlined /> },
    research: { label: "Research Projects", icon: <BookOutlined /> },
    publications: { label: "Publications", icon: <FileTextOutlined /> },
    projects: { label: "Projects", icon: <BookOutlined /> },
    internships: { label: "Internships", icon: <TeamOutlined /> },
    conferences: { label: "Conferences", icon: <TrophyOutlined /> },
    grants: { label: "Grants & Funding", icon: <BarChartOutlined /> },
    thesis: { label: "Thesis Management", icon: <FileTextOutlined /> },
    lectures: { label: "Lectures", icon: <CalendarOutlined /> },
    leaves: { label: "Leave Requests", icon: <TeamOutlined /> },
    "course-material": {
      label: "Course Materials",
      icon: <FileTextOutlined />,
    },
    "time-table": { label: "Time Table", icon: <CalendarOutlined /> },
    settings: { label: "Settings", icon: <SettingOutlined /> },
    courses: { label: "Courses", icon: <BookOutlined /> },
    grade: { label: "Grades", icon: <BarChartOutlined /> },
    announcements: { label: "Announcements", icon: <FileTextOutlined /> },
    submission: { label: "Submission", icon: <FileTextOutlined /> },
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getPortalSettings();
        if (response.data.success) {
          form.setFieldsValue({
            portalPermissions: response.data.data.portalPermissions,
          });
        }
      } catch (error: any) {
        if (error.response?.status !== 404) {
          message.error("Failed to load portal permissions");
        }
      }
    };
    fetchSettings();
  }, [form]);

  const features = featureOptions;

  return (
    <Col span={24} className="px-[30px] py-[10px]">
      <Title level={4}>Portal Access Rights</Title>
      <Text type="secondary">
        Configure which portals are enabled and what features are available for
        each user type.
      </Text>

      <Divider />

      {/* Admin Portal */}
      <Card
        title={
          <Space>
            <SettingOutlined />
            <span>Admin Portal</span>
            <Tag color="green">Current Portal</Tag>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Space>
              <LockOutlined style={{ color: "#52c41a" }} />
              <Text strong>Always Enabled</Text>
            </Space>
          </Col>
          <Col span={18}>
            <Text type="secondary">
              Admin portal is always enabled and has access to all features for
              managing the institute.
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Teacher Portal */}
      <Card
        title={
          <Space>
            <UserOutlined />
            <span>Teacher Portal</span>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Form.Item
              name={["portalPermissions", "teacherPortal", "enabled"]}
              valuePropName="checked"
            >
              <Switch
                onChange={(checked) => {
                  if (checked) {
                    // Set all features when enabling
                    form.setFieldsValue({
                      portalPermissions: {
                        ...form.getFieldValue("portalPermissions"),
                        teacherPortal: {
                          ...form.getFieldValue(["portalPermissions", "teacherPortal"]),
                          enabled: true,
                          features: features.teacher,
                        },
                      },
                    });
                  } else {
                    // Optionally clear features when disabling
                    form.setFieldsValue({
                      portalPermissions: {
                        ...form.getFieldValue("portalPermissions"),
                        teacherPortal: {
                          ...form.getFieldValue(["portalPermissions", "teacherPortal"]),
                          enabled: false,
                          features: [],
                        },
                      },
                    });
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Text strong>Enable Teacher Portal</Text>
            <br />
            <Text type="secondary">
              Allow teachers to access their dedicated portal with selected
              features.
            </Text>
          </Col>
        </Row>

        {teacherPortalEnabled && (
          <div style={{ marginTop: 16 }}>
            <Text strong>
              Available Features for Teachers ({instituteType}):
            </Text>
            <Form.Item
              name={["portalPermissions", "teacherPortal", "features"]}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Row gutter={[16, 8]} style={{ marginTop: 8 }}>
                  {features.teacher.map((feature) => (
                    <Col span={8} key={feature}>
                      <Checkbox value={feature}>
                        <Space>
                          {
                            featureLabels[feature as keyof typeof featureLabels]
                              ?.icon
                          }
                          {
                            featureLabels[feature as keyof typeof featureLabels]
                              ?.label
                          }
                        </Space>
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
        )}
      </Card>

      {/* Student Portal */}
      <Card
        title={
          <Space>
            <TeamOutlined />
            <span>Student Portal</span>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Form.Item
              name={["portalPermissions", "studentPortal", "enabled"]}
              valuePropName="checked"
            >
              <Switch
                onChange={(checked) => {
                  if (checked) {
                    // Set all features when enabling
                    form.setFieldsValue({
                      portalPermissions: {
                        ...form.getFieldValue("portalPermissions"),
                        studentPortal: {
                          ...form.getFieldValue(["portalPermissions", "studentPortal"]),
                          enabled: true,
                          features: features.student,
                        },
                      },
                    });
                  } else {
                    // Optionally clear features when disabling
                    form.setFieldsValue({
                      portalPermissions: {
                        ...form.getFieldValue("portalPermissions"),
                        studentPortal: {
                          ...form.getFieldValue(["portalPermissions", "studentPortal"]),
                          enabled: false,
                          features: [],
                        },
                      },
                    });
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Text strong>Enable Student Portal</Text>
            <br />
            <Text type="secondary">
              Allow students to access their dedicated portal with selected
              features.
            </Text>
          </Col>
        </Row>

        {studentPortalEnabled && (
          <div style={{ marginTop: 16 }}>
            <Text strong>
              Available Features for Students ({instituteType}):
            </Text>
            <Form.Item
              name={["portalPermissions", "studentPortal", "features"]}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Row gutter={[16, 8]} style={{ marginTop: 8 }}>
                  {features.student.map((feature) => (
                    <Col span={8} key={feature}>
                      <Checkbox value={feature}>
                        <Space>
                          {
                            featureLabels[feature as keyof typeof featureLabels]
                              ?.icon
                          }
                          {
                            featureLabels[feature as keyof typeof featureLabels]
                              ?.label
                          }
                        </Space>
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
        )}
      </Card>
    </Col>
  );
};

export default PermissionsForm;
