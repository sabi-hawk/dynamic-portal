"use client";
import { Col, Row, Table } from "antd";
import type { TableProps } from "antd";
import { useState, useEffect } from "react";
import { useAppState } from "hooks";
import {
  getTeacherByUserId,
  getTeacherCoursesAndSchedules,
  getTeacherTodaySchedules,
} from "api/teacher";

interface LectureType {
  key: string;
  subjectName: string;
  section: string;
  time: string;
  duration: string;
  details: string;
}

interface TeacherData {
  _id: string;
  userId: {
    name: {
      first: string;
      last: string;
    };
    email: string;
  };
  department: string;
}

interface ScheduleData {
  _id: string;
  course: {
    courseCode: string;
    courseName: string;
    description: string;
  };
  section: string;
  schedule: {
    startTime: string;
    endTime: string;
    duration: number;
    daysOfWeek: string[];
  };
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
    title: <span className="text-[#666666] font-normal text-sm">Section</span>,
    dataIndex: "section",
    key: "section",
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
  const {
    auth: { user },
  } = useAppState();
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [todaysLectures, setTodaysLectures] = useState<ScheduleData[]>([]);
  const [weeklyLectures, setWeeklyLectures] = useState<LectureType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchTeacherData();
    }
  }, [user]);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      // Get teacher profile
      const teacherRes = await getTeacherByUserId(user!._id);
      setTeacherData(teacherRes.data);

      // Get teacher's courses and schedules
      const coursesRes = await getTeacherCoursesAndSchedules(
        teacherRes.data._id
      );
      const todayRes = await getTeacherTodaySchedules(teacherRes.data._id);

      setTodaysLectures(todayRes.data);

      // Format weekly lectures data
      const weeklyData = coursesRes.data.map(
        (schedule: ScheduleData, index: number) => ({
          key: (index + 1).toString(),
          subjectName: schedule.course.courseName,
          section: schedule.section,
          time: `${schedule.schedule.startTime} - ${schedule.schedule.endTime}`,
          duration: `${schedule.schedule.duration} mins`,
          details: "/assets/icons/details.png",
        })
      );

      setWeeklyLectures(weeklyData);
    } catch (error) {
      console.error("Failed to fetch teacher data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSubjectIcon = (subjectName: string) => {
    // Map subject names to icons (you can expand this)
    const iconMap: { [key: string]: string } = {
      Chemistry: "/assets/images/Chemistry.svg",
      Business: "/assets/images/Buisness.svg",
      Mathematics: "/assets/images/Mathematics.svg",
      Painting: "/assets/images/Painting.svg",
      Physics: "/assets/images/Chemistry.svg",
      English: "/assets/images/Mathematics.svg",
      History: "/assets/images/Buisness.svg",
    };
    return iconMap[subjectName] || "/assets/images/Chemistry.svg";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

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
                  {teacherData
                    ? `${teacherData.userId.name.first} ${teacherData.userId.name.last}!`
                    : "Teacher!"}
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
              {todaysLectures.length > 0 ? (
                todaysLectures.map((lecture, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-8 py-1"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getSubjectIcon(lecture.course.courseName)}
                        alt={lecture.course.courseName}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-normal text-[#444444]">
                        {lecture.course.courseName}
                      </span>
                    </div>
                    <span className="text-sm font-normal text-[#444444]">
                      {lecture.schedule.startTime}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No lectures scheduled for today
                </div>
              )}
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
              dataSource={weeklyLectures}
              pagination={false}
              loading={loading}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
