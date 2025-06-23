import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Tag,
  Spin,
  Descriptions,
  Divider,
  Typography,
  Button,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  BookOutlined,
  TeamOutlined,
  EditOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useAppState } from "hooks";
import { getTeacherByUserId } from "api/teacher";

const { Title, Text } = Typography;

interface TeacherData {
  _id: string;
  userId: string;
  instituteId: string;
  type: string;
  department: string;
  mobile: string;
  address: string;
  status: string;
  joiningDate: string;
  gender: string;
  degree: string;
  section: string;
  emergencyContact?: string;
}

export default function Profile() {
  const {
    auth: { user },
  } = useAppState();

  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?._id) {
      fetchTeacherData();
    }
  }, [user]);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTeacherByUserId();
      setTeacherData(response.data);
    } catch (err) {
      console.error("Error fetching teacher data:", err);
      setError("Failed to load teacher profile data");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: { first: string; last: string }) => {
    return `${name.first.charAt(0)}${name.last.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "green" : "red";
  };

  const getGenderColor = (gender: string) => {
    return gender === "Male" ? "blue" : gender === "Female" ? "pink" : "purple";
  };

  const getDegreeColor = (degree: string) => {
    const colors: Record<string, string> = {
      Bachelors: "orange",
      Masters: "blue",
      PhD: "purple",
    };
    return colors[degree] || "default";
  };

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
            <Button type="primary" onClick={fetchTeacherData} className="mt-4">
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
        {/* Header Section */}
        <div className="mb-6">
          <Title level={2} className="text-[#2989FF] mb-2">
            Teacher Profile
          </Title>
          <Text type="secondary">Manage and view your profile information</Text>
        </div>

        <Row gutter={[24, 24]}>
          {/* Profile Overview Card */}
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

                <div className="flex justify-center gap-2 mb-4">
                  <Tag
                    color={
                      teacherData?.status
                        ? getStatusColor(teacherData.status)
                        : "default"
                    }
                  >
                    {teacherData?.status?.toUpperCase() || "N/A"}
                  </Tag>
                  <Tag
                    color={
                      teacherData?.gender
                        ? getGenderColor(teacherData.gender)
                        : "default"
                    }
                  >
                    {teacherData?.gender || "N/A"}
                  </Tag>
                </div>
              </div>
            </Card>
          </Col>

          {/* Detailed Information */}
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              {/* Personal Information */}
              <Col xs={24} md={12}>
                <Card
                  title={
                    <div className="flex items-center gap-2">
                      <UserOutlined className="text-[#2989FF]" />
                      <span>Personal Information</span>
                    </div>
                  }
                  className="shadow-md border-0 h-full"
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Full Name">
                      <Text strong>
                        {user?.name
                          ? `${user.name.first} ${user.name.last}`
                          : "N/A"}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      <div className="flex items-center gap-2">
                        <MailOutlined className="text-[#2989FF]" />
                        <Text>{user?.email || "N/A"}</Text>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Mobile">
                      <div className="flex items-center gap-2">
                        <PhoneOutlined className="text-[#2989FF]" />
                        <Text>{teacherData?.mobile || "N/A"}</Text>
                      </div>
                    </Descriptions.Item>
                    {teacherData?.emergencyContact && (
                      <Descriptions.Item label="Emergency Contact">
                        <Text>{teacherData.emergencyContact}</Text>
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Col>

              {/* Professional Information */}
              <Col xs={24} md={12}>
                <Card
                  title={
                    <div className="flex items-center gap-2">
                      <BookOutlined className="text-[#2989FF]" />
                      <span>Professional Information</span>
                    </div>
                  }
                  className="shadow-md border-0 h-full"
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Department">
                      <div className="flex items-center gap-2">
                        <TeamOutlined className="text-[#2989FF]" />
                        <Text strong>{teacherData?.department || "N/A"}</Text>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Degree">
                      <Tag
                        color={
                          teacherData?.degree
                            ? getDegreeColor(teacherData.degree)
                            : "default"
                        }
                      >
                        {teacherData?.degree || "N/A"}
                      </Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label="Joining Date">
                      <div className="flex items-center gap-2">
                        <CalendarOutlined className="text-[#2989FF]" />
                        <Text>
                          {teacherData?.joiningDate
                            ? formatDate(teacherData.joiningDate)
                            : "N/A"}
                        </Text>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Teacher ID">
                      <div className="flex items-center gap-2">
                        <IdcardOutlined className="text-[#2989FF]" />
                        <Text code>{teacherData?._id || "N/A"}</Text>
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              {/* Address Information */}
              <Col xs={24}>
                <Card
                  title={
                    <div className="flex items-center gap-2">
                      <EnvironmentOutlined className="text-[#2989FF]" />
                      <span>Address Information</span>
                    </div>
                  }
                  className="shadow-md border-0"
                >
                  <div className="flex items-start gap-3">
                    <EnvironmentOutlined className="text-[#2989FF] mt-1" />
                    <Text className="text-base">
                      {teacherData?.address || "No address provided"}
                    </Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Additional Information Section */}
        {teacherData && (
          <div className="mt-6">
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
                      {teacherData.type?.toUpperCase() || "TEACHER"}
                    </Title>
                    <Text type="secondary">Role Type</Text>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="text-center p-4 bg-[#f8f9fa] rounded-lg">
                    <Title level={4} className="text-[#2989FF] mb-1">
                      {teacherData.instituteId
                        ? teacherData.instituteId.slice(-8)
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
          </div>
        )}
      </div>
    </div>
  );
}
