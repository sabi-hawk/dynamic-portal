import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Tag,
  Spin,
  Descriptions,
  Typography,
  Button,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  BookOutlined,
  TeamOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useAppState } from "hooks";
import { getStudentByUserId } from "api/student";

const { Title, Text } = Typography;

interface StudentData {
  _id: string;
  userId: string;
  instituteId: string;
  department?: string;
  mobile: string;
  gender: string;
  admissionDate: string;
  section: string;
  // optional fields based on institute type
  program?: string;
  semester?: number;
  collegeYear?: string;
  schoolClass?: string;
}

export default function StudentProfile() {
  const {
    auth: { user },
    settings,
  } = useAppState();

  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const instituteType = settings.portalSettings?.instituteType?.toLowerCase();

  useEffect(() => {
    if (user?._id) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getStudentByUserId();
      setStudentData(response.data);
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Failed to load student profile data");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: { first: string; last: string }) =>
    `${name.first.charAt(0)}${name.last.charAt(0)}`.toUpperCase();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getGenderColor = (gender: string) =>
    gender === "Male" ? "blue" : gender === "Female" ? "pink" : "purple";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-10">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <div className="text-center text-red-500">
            <p>{error}</p>
            <Button type="primary" onClick={fetchStudentData} className="mt-4">
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f5f8fe] min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Title level={2} className="text-[#2989FF] mb-2">
            Student Profile
          </Title>
          <Text type="secondary">Manage and view your profile information</Text>
        </div>

        <Row gutter={[24, 24]}>
          {/* Profile Overview */}
          <Col xs={24} lg={8}>
            <Card className="shadow-md border-0">
              <div className="text-center">
                <Avatar
                  size={120}
                  className="mb-4 bg-gradient-to-br from-[#2989FF] to-[#22CBCC]"
                  icon={<UserOutlined />}
                >
                  {user?.name && getInitials(user.name)}
                </Avatar>
                <Title level={3} className="mb-2">
                  {user?.name ? `${user.name.first} ${user.name.last}` : "N/A"}
                </Title>
                <Text type="secondary" className="block mb-3">
                  {user?.email}
                </Text>
                {studentData?.gender && (
                  <Tag color={getGenderColor(studentData.gender)}>
                    {studentData.gender}
                  </Tag>
                )}
              </div>
            </Card>
          </Col>

          {/* Detailed Info */}
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              {/* Academic Information */}
              <Col xs={24} md={12}>
                <Card
                  title={
                    <div className="flex items-center gap-2">
                      <BookOutlined className="text-[#2989FF]" />
                      <span>Academic Information</span>
                    </div>
                  }
                  className="shadow-md border-0 h-full"
                >
                  <Descriptions column={1} size="small">
                    {instituteType === "university" && (
                      <>
                        <Descriptions.Item label="Program">
                          <Text strong>{studentData?.program || "N/A"}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Semester">
                          <Text>{studentData?.semester || "N/A"}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Department">
                          <Text>{studentData?.department || "N/A"}</Text>
                        </Descriptions.Item>
                      </>
                    )}
                    {instituteType === "college" && (
                      <>
                        <Descriptions.Item label="Program">
                          <Text strong>{studentData?.program || "N/A"}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="College Year">
                          <Text>{studentData?.collegeYear || "N/A"}</Text>
                        </Descriptions.Item>
                      </>
                    )}
                    {instituteType === "school" && (
                      <Descriptions.Item label="Class">
                        <Text>{studentData?.schoolClass || "N/A"}</Text>
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Section">
                      <Text>{studentData?.section || "N/A"}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Admission Date">
                      <Text>
                        {studentData?.admissionDate
                          ? formatDate(studentData.admissionDate)
                          : "N/A"}
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              {/* Contact Information */}
              <Col xs={24} md={12}>
                <Card
                  title={
                    <div className="flex items-center gap-2">
                      <UserOutlined className="text-[#2989FF]" />
                      <span>Contact Information</span>
                    </div>
                  }
                  className="shadow-md border-0 h-full"
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Mobile">
                      <div className="flex items-center gap-2">
                        <PhoneOutlined className="text-[#2989FF]" />
                        <Text>{studentData?.mobile || "N/A"}</Text>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      <div className="flex items-center gap-2">
                        <MailOutlined className="text-[#2989FF]" />
                        <Text>{user?.email || "N/A"}</Text>
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              {/* System Information */}
              <Col xs={24}>
                <Card
                  title={
                    <div className="flex items-center gap-2">
                      <IdcardOutlined className="text-[#2989FF]" />
                      <span>System Information</span>
                    </div>
                  }
                  className="shadow-md border-0"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                      <div className="text-center p-4 bg-[#f8f9fa] rounded-lg">
                        <Title level={4} className="text-[#2989FF] mb-1">
                          STUDENT
                        </Title>
                        <Text type="secondary">Role Type</Text>
                      </div>
                    </Col>
                    <Col xs={24} md={8}>
                      <div className="text-center p-4 bg-[#f8f9fa] rounded-lg">
                        <Title level={4} className="text-[#2989FF] mb-1">
                          {studentData?.instituteId
                            ? studentData.instituteId.slice(-8)
                            : "N/A"}
                        </Title>
                        <Text type="secondary">Institute ID</Text>
                      </div>
                    </Col>
                    <Col xs={24} md={8}>
                      <div className="text-center p-4 bg-[#f8f9fa] rounded-lg">
                        <Title level={4} className="text-[#2989FF] mb-1">
                          {user?._id ? user._id.slice(-8) : "N/A"}
                        </Title>
                        <Text type="secondary">User ID</Text>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
