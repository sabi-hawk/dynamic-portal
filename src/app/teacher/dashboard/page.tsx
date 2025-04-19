"use client";
import { Col, Row, Table } from "antd";
import type { TableProps } from "antd";

interface LectureType {
  key: string;
  subjectName: string;
  class: string;
  time: string;
  duration: string;
  details: string;
}

const columns: TableProps<LectureType>["columns"] = [
  {
    title: <span className="text-[#666666] font-normal text-sm">No.</span>,
    dataIndex: "key",
    key: "key",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: (
      <span className="text-[#666666] font-normal text-sm">Subject Name</span>
    ),
    dataIndex: "subjectName",
    key: "subjectName",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: <span className="text-[#666666] font-normal text-sm">Class</span>,
    dataIndex: "class",
    key: "class",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: <span className="text-[#666666] font-normal text-sm">Time</span>,
    dataIndex: "time",
    key: "time",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: <span className="text-[#666666] font-normal text-sm">Duration</span>,
    dataIndex: "duration",
    key: "duration",
    render: (text) => (
      <span className="text-[#444444] font-normal text-sm">{text}</span>
    ),
  },
  {
    title: <span className="text-[#666666] font-normal text-sm">Details</span>,
    key: "details",
    render: () => (
      <img
        src="/assets/icons/details.png"
        alt="Details"
        className="w-5 h-5 cursor-pointer hover:opacity-80"
      />
    ),
  },
];

function Dashboard() {
  const todaysLectures = [
    {
      subject: "Chemistry",
      time: "M-W-F",
      icon: "/assets/images/Chemistry.svg",
    },
    { subject: "Business", time: "M-W-F", icon: "/assets/images/Buisness.svg" },
    {
      subject: "Mathematics",
      time: "M-W-F",
      icon: "/assets/images/Mathematics.svg",
    },
    { subject: "Painting", time: "M-W-F", icon: "/assets/images/Painting.svg" },
    { subject: "Physics", time: "T-T-S", icon: "/assets/images/Chemistry.svg" },
    {
      subject: "English",
      time: "M-W-F",
      icon: "/assets/images/Mathematics.svg",
    },
    { subject: "History", time: "T-T-S", icon: "/assets/images/Buisness.svg" },
    {
      subject: "Mathematics",
      time: "M-W-F",
      icon: "/assets/images/Mathematics.svg",
    },
    { subject: "Painting", time: "M-W-F", icon: "/assets/images/Painting.svg" },
    { subject: "Physics", time: "T-T-S", icon: "/assets/images/Chemistry.svg" },
  ];

  const weeklyLecturesData: LectureType[] = [
    {
      key: "1",
      subjectName: "Chemistry",
      class: "7A",
      time: "09:30 am",
      duration: "2 hours",
      details: "/assets/icons/details.png",
    },
    {
      key: "2",
      subjectName: "Mathematics",
      class: "7A",
      time: "11:30 am",
      duration: "2 hours",
      details: "/assets/icons/details.png",
    },
    {
      key: "3",
      subjectName: "Physics",
      class: "8B",
      time: "02:00 pm",
      duration: "1.5 hours",
      details: "/assets/icons/details.png",
    },
    {
      key: "4",
      subjectName: "English",
      class: "6C",
      time: "10:00 am",
      duration: "1 hour",
      details: "/assets/icons/details.png",
    },
    {
      key: "5",
      subjectName: "History",
      class: "8A",
      time: "01:00 pm",
      duration: "1.5 hours",
      details: "/assets/icons/details.png",
    },
    {
      key: "6",
      subjectName: "Business",
      class: "9A",
      time: "03:30 pm",
      duration: "2 hours",
      details: "/assets/icons/details.png",
    },
    {
      key: "7",
      subjectName: "Painting",
      class: "7B",
      time: "04:00 pm",
      duration: "1 hour",
      details: "/assets/icons/details.png",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Welcome Section */}
      <Row gutter={0}>
        <Col span={20} offset={2}>
          <div className="bg-white rounded-lg px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Image Block */}
              <div className="w-[35%]">
                <img
                  src="/assets/images/TeachersDashboard1.svg"
                  alt="Courses Image"
                  className="w-full h-auto"
                />
              </div>

              {/* Text Block */}
              <div className="w-[60%]">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                  Welcome Back
                </h2>
                <h1 className="text-4xl font-bold text-[#2989FF] mb-4">
                  Jon Doe!
                </h1>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  Here's the overview of your today's lecture and a glance at
                  the lectures planned for this week. Wishing you a productive
                  week of teaching! Here's the overview of your today's lecture
                  and a glance at the lectures planned for this week. Wishing
                  you a productive week of teaching!
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Today's Lectures and Weekly Lectures */}
      <Row gutter={16}>
        <Col span={6} offset={2}>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4 text-[#5B626B]">
              Today's Lectures
            </h3>
            <div className="flex flex-col gap-4">
              {todaysLectures.map((lecture, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-8 py-1"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={lecture.icon}
                      alt={lecture.subject}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-normal text-[#444444]">
                      {lecture.subject}
                    </span>
                  </div>
                  <span className="text-sm font-normal text-[#444444]">
                    {lecture.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col span={14}>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4 text-[#5B626B] ml-6">
              Weekly Lectures
            </h3>
            <Table<LectureType>
              columns={columns}
              dataSource={weeklyLecturesData}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
