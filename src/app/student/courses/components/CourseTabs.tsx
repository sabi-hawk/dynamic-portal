import React from "react";
import { Tabs, Table, Tag, Button, Tooltip, Progress } from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
} from "@ant-design/icons";

// --- Assignments Tab ---
const assignmentsData = [
  { key: 1, title: "Assignment 1", due: "2024-06-10", status: "To Do" },
  { key: 2, title: "Assignment 2", due: "2024-06-15", status: "Done" },
  { key: 3, title: "Project Report", due: "2024-06-20", status: "To Do" },
];
const assignmentsColumns = [
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Due Date", dataIndex: "due", key: "due" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "Done" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button icon={<EyeOutlined />} size="small">
        View
      </Button>
    ),
  },
];
const AssignmentTab = () => (
  <Table
    columns={assignmentsColumns}
    dataSource={assignmentsData}
    pagination={false}
    className="bg-white rounded-lg"
  />
);

// --- Grades Tab ---
const gradesData = [
  {
    key: 1,
    type: "Assignment",
    title: "Assignment 1",
    score: 9,
    total: 10,
    date: "2024-06-11",
    feedback: "Great work!",
  },
  {
    key: 2,
    type: "Quiz",
    title: "Quiz 1",
    score: 18,
    total: 20,
    date: "2024-06-13",
    feedback: "Well done.",
  },
  {
    key: 3,
    type: "Assignment",
    title: "Assignment 2",
    score: 15,
    total: 20,
    date: "2024-06-16",
    feedback: "Good effort.",
  },
  {
    key: 4,
    type: "Midterm",
    title: "Midterm Exam",
    score: 40,
    total: 50,
    date: "2024-06-18",
    feedback: "Solid performance.",
  },
  {
    key: 5,
    type: "Quiz",
    title: "Quiz 2",
    score: 7,
    total: 10,
    date: "2024-06-19",
    feedback: "Needs review.",
  },
  {
    key: 6,
    type: "Final",
    title: "Final Exam",
    score: 80,
    total: 100,
    date: "2024-06-25",
    feedback: "Excellent!",
  },
];
const typeColor = (type: string) => {
  if (type === "Assignment") return "blue";
  if (type === "Quiz") return "purple";
  if (type === "Midterm") return "orange";
  if (type === "Final") return "red";
  return "default";
};
const percentColor = (percent: number) => {
  if (percent >= 90) return "green";
  if (percent >= 75) return "blue";
  if (percent >= 60) return "orange";
  return "red";
};
const gradesColumns = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => <Tag color={typeColor(type)}>{type}</Tag>,
  },
  { title: "Title", dataIndex: "title", key: "title" },
  {
    title: "Score",
    key: "score",
    render: (_: any, record: any) => `${record.score} / ${record.total}`,
  },
  {
    title: "%",
    key: "percent",
    render: (_: any, record: any) => {
      const percent = Math.round((record.score / record.total) * 100);
      return <Tag color={percentColor(percent)}>{percent}%</Tag>;
    },
  },
  { title: "Feedback", dataIndex: "feedback", key: "feedback" },
  { title: "Date", dataIndex: "date", key: "date" },
];
const GradeTab = () => (
  <Table
    columns={gradesColumns}
    dataSource={gradesData}
    pagination={false}
    className="bg-white rounded-lg"
  />
);

// --- Attendance Tab ---
const attendanceData = [
  { key: 1, date: "2024-06-01", status: "Present", remarks: "" },
  { key: 2, date: "2024-06-02", status: "Absent", remarks: "Sick" },
  { key: 3, date: "2024-06-03", status: "Late", remarks: "Traffic" },
];
const attendanceColumns = [
  { title: "Date", dataIndex: "date", key: "date" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag
        color={
          status === "Present" ? "green" : status === "Late" ? "orange" : "red"
        }
      >
        {status}
      </Tag>
    ),
  },
  { title: "Remarks", dataIndex: "remarks", key: "remarks" },
];
const attendancePercent = 67; // Example
const AttendanceTab = () => (
  <div>
    <div className="mb-4 flex items-center gap-4">
      <span className="font-semibold text-[#2989FF]">Attendance Rate:</span>
      <Progress
        percent={attendancePercent}
        size="small"
        style={{ width: 120 }}
      />
    </div>
    <Table
      columns={attendanceColumns}
      dataSource={attendanceData}
      pagination={false}
      className="bg-white rounded-lg"
    />
  </div>
);

// --- Course Material Tab ---
const materialData = [
  { key: 1, title: "Lecture 1 Slides", type: "pdf", date: "2024-06-01" },
  { key: 2, title: "Assignment Sheet", type: "doc", date: "2024-06-05" },
  { key: 3, title: "Reference Image", type: "img", date: "2024-06-07" },
];
const typeIcon = (type: string) => {
  if (type === "pdf") return <FilePdfOutlined className="text-red-500" />;
  if (type === "doc") return <FileTextOutlined className="text-blue-500" />;
  if (type === "img") return <FileImageOutlined className="text-green-500" />;
  return <FileUnknownOutlined />;
};
const materialColumns = [
  { title: "Title", dataIndex: "title", key: "title" },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => typeIcon(type),
  },
  { title: "Uploaded", dataIndex: "date", key: "date" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Tooltip title="Download">
        <Button icon={<DownloadOutlined />} size="small" />
      </Tooltip>
    ),
  },
];
const CourseMaterialTab = () => (
  <Table
    columns={materialColumns}
    dataSource={materialData}
    pagination={false}
    className="bg-white rounded-lg"
  />
);

interface CourseTabsProps {
  course: {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const CourseTabs: React.FC<CourseTabsProps> = ({ course }) => {
  return (
    <div className="bg-gradient-to-br from-[#f5faff] to-[#eaf6ff] rounded-xl shadow-lg p-8 border border-[#e3eefe] w-full">
      <div className="flex items-center gap-5 mb-8">
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full text-3xl font-bold text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #2989FF 60%, #22CBCC 100%)",
          }}
        >
          {getInitials(course.name)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2989FF] mb-1">
            {course.name}
          </h2>
          <div className="text-sm text-[#888] font-semibold tracking-wide">
            {course.code}
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey="assignments"
        type="card"
        className="custom-tabs w-full"
        tabBarStyle={{ width: "100%" }}
        items={[
          {
            label: (
              <span className="font-semibold text-[#2989FF]">Assignments</span>
            ),
            key: "assignments",
            children: <AssignmentTab />,
          },
          {
            label: <span className="font-semibold text-[#2989FF]">Grades</span>,
            key: "grades",
            children: <GradeTab />,
          },
          {
            label: (
              <span className="font-semibold text-[#2989FF]">Attendance</span>
            ),
            key: "attendance",
            children: <AttendanceTab />,
          },
          {
            label: (
              <span className="font-semibold text-[#2989FF]">
                Course Material
              </span>
            ),
            key: "coursematerial",
            children: <CourseMaterialTab />,
          },
        ]}
      />
    </div>
  );
};

export default CourseTabs;
