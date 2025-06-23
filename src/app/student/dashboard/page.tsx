"use client";
import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { useAppState } from "hooks";
import { getStudentSchedule, getStudentTodaySchedules } from "api/student";

interface ScheduleData {
  _id: string;
  course: {
    courseCode: string;
    courseName: string;
    description: string;
  };
  instructor: {
    name: {
      first: string;
      last: string;
    };
    department: string;
  };
  section: string;
  schedule: {
    startTime: string;
    endTime: string;
    duration: number;
    daysOfWeek: string[];
  };
}

function Dashboard() {
  const {
    auth: { user },
  } = useAppState();
  const [todaysClasses, setTodaysClasses] = useState<ScheduleData[]>([]);
  const [weeklySchedule, setWeeklySchedule] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);

      // Get student's schedule and today's classes
      const scheduleRes = await getStudentSchedule();
      const todayRes = await getStudentTodaySchedules();

      setTodaysClasses(todayRes.data);
      setWeeklySchedule(scheduleRes.data);
    } catch (error) {
      console.error("Failed to fetch student data:", error);
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
      "Java Programming": "/assets/icons/java.svg",
      "Angular Theory": "/assets/icons/angular.svg",
    };
    return iconMap[subjectName] || "/assets/images/Chemistry.svg";
  };

  const formatTime = (time: string) => {
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "pm" : "am";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
        <Col span={24}>
          <div className="bg-white rounded-lg px-8 py-6 flex items-center justify-between">
            {/* Image Block */}
            <div className="w-[35%]">
              <img
                src="/assets/images/TeachersDashboard1.svg"
                alt="Student Illustration"
                className="w-full h-auto"
              />
            </div>
            {/* Text Block */}
            <div className="w-[60%]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Good Job!
              </h2>
              <h1 className="text-3xl font-bold text-[#2989FF] mb-2">
                {user && user.name
                  ? `${user.name?.first || ""} ${user.name?.last || ""}`
                  : "Student"}
              </h1>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Here's your schedule for today and upcoming classes. Keep up the
                great work and stay focused on your studies! You have{" "}
                {todaysClasses.length} classes scheduled for today. Make sure to
                attend all your lectures and complete your assignments on time.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Today's Classes & Weekly Schedule */}
      <Row gutter={16}>
        <Col span={10}>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-[#5B626B]">
              Today's Classes
            </h3>
            <div className="flex flex-col gap-3">
              {todaysClasses.length > 0 ? (
                todaysClasses.map((cls, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#F6F7FB] rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getSubjectIcon(cls.course.courseName)}
                        alt={cls.course.courseName}
                        className="w-8 h-8"
                      />
                      <div>
                        <div className="font-medium text-[#444] text-sm">
                          {cls.course.courseName}
                        </div>
                        <div className="text-xs text-[#888]">
                          {cls.instructor.name?.first}{" "}
                          {cls.instructor.name?.last}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#444] text-sm font-medium">
                        {formatTime(cls.schedule.startTime)}
                      </div>
                      <div className="text-xs text-[#888]">
                        {cls.schedule.duration} mins
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No classes scheduled for today
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col span={14}>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-[#5B626B]">
              Weekly Schedule
            </h3>
            <div className="flex flex-col gap-3">
              {weeklySchedule.length > 0 ? (
                weeklySchedule.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#F6F7FB] rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getSubjectIcon(schedule.course.courseName)}
                        alt={schedule.course.courseName}
                        className="w-8 h-8"
                      />
                      <div>
                        <div className="font-medium text-[#444] text-sm">
                          {schedule.course.courseName}
                        </div>
                        <div className="text-xs text-[#888]">
                          {schedule.instructor.name?.first}{" "}
                          {schedule.instructor.name?.last}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-xs text-[#888]">Schedule</div>
                      <div className="text-[#444] text-sm font-medium">
                        {schedule.schedule.daysOfWeek.join(", ")}
                      </div>
                      <div className="text-xs text-[#888]">
                        {formatTime(schedule.schedule.startTime)} -{" "}
                        {formatTime(schedule.schedule.endTime)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No schedule available
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
