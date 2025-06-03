"use client";
import React from "react";
import { Col, Row } from "antd";

const upcomingClasses = [
  {
    name: "John Doe",
    degree: "B.com",
    date: "12 June 2020",
    time: "09:00 am to 10:00 am",
    avatar: "/assets/images/student-avatar.png",
  },
  {
    name: "John Doe",
    degree: "B.com",
    date: "12 June 2020",
    time: "09:00 am to 10:00 am",
    avatar: "/assets/images/student-avatar.png",
  },
  {
    name: "John Doe",
    degree: "B.com",
    date: "12 June 2020",
    time: "09:00 am to 10:00 am",
    avatar: "/assets/images/student-avatar.png",
  },
  {
    name: "John Doe",
    degree: "B.com",
    date: "12 June 2020",
    time: "09:00 am to 10:00 am",
    avatar: "/assets/images/student-avatar.png",
  },
  {
    name: "John Doe",
    degree: "B.com",
    date: "12 June 2020",
    time: "09:00 am to 10:00 am",
    avatar: "/assets/images/student-avatar.png",
  },
  {
    name: "John Doe",
    degree: "B.com",
    date: "12 June 2020",
    time: "09:00 am to 10:00 am",
    avatar: "/assets/images/student-avatar.png",
  },
];

const assignments = [
  {
    icon: "/assets/icons/java.svg",
    subject: "Java Programming",
    file: ".doc, 4.3mb",
    due: "13 May, 2024 (12:30 am)",
    status: "To be Done",
  },
  {
    icon: "/assets/icons/angular.svg",
    subject: "Angular Theory",
    file: ".doc, 4.3mb",
    due: "13 May, 2024 (12:30 am)",
    status: "To be Done",
  },
  {
    icon: "/assets/icons/java.svg",
    subject: "Java Programming",
    file: ".doc, 4.3mb",
    due: "13 May, 2024 (12:30 am)",
    status: "Done",
  },
  {
    icon: "/assets/icons/angular.svg",
    subject: "Angular Theory",
    file: ".doc, 4.3mb",
    due: "13 May, 2024 (12:30 am)",
    status: "Done",
  },
  {
    icon: "/assets/icons/java.svg",
    subject: "Java Programming",
    file: ".doc, 4.3mb",
    due: "13 May, 2024 (12:30 am)",
    status: "To be Done",
  },
  {
    icon: "/assets/icons/angular.svg",
    subject: "Angular Theory",
    file: ".doc, 4.3mb",
    due: "13 May, 2024 (12:30 am)",
    status: "Done",
  },
];

function Dashboard() {
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
              <h1 className="text-3xl font-bold text-[#2989FF] mb-2">Sarah</h1>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                You task are 80% completed this week. Keep it up and improve
                your result. Progress is very good!!You task are 80% completed
                this week. Keep it up and improve your result. Progress is very
                good!!You task are 80% completed this week. Keep it up and
                improve your result. Progress is very good!!You task are 80%
                completed this week. Keep it up and improve your result.
                Progress is very good!!
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Upcoming Classes & Assignments */}
      <Row gutter={16}>
        <Col span={10}>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-[#5B626B]">
              Upcoming Classes
            </h3>
            <div className="flex flex-col gap-3">
              {upcomingClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[#F6F7FB] rounded-lg px-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-[#444] text-sm">
                        {cls.name}
                      </div>
                      <div className="text-xs text-[#888]">({cls.degree})</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#444] text-sm font-medium">
                      {cls.date}
                    </div>
                    <div className="text-xs text-[#888]">{cls.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={14}>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-[#5B626B]">
              Assignments
            </h3>
            <div className="flex flex-col gap-3">
              {assignments.map((ass, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[#F6F7FB] rounded-lg px-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-[#444] text-sm">
                        {ass.subject}
                      </div>
                      <div className="text-xs text-[#888]">{ass.file}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xs text-[#888]">Due Date</div>
                    <div className="text-[#444] text-sm font-medium">
                      {ass.due}
                    </div>
                  </div>
                  <div>
                    {ass.status === "Done" ? (
                      <span className="bg-[#E6FAEA] text-[#34C759] px-4 py-1 rounded-full text-xs font-semibold">
                        Done
                      </span>
                    ) : (
                      <span className="bg-[#FFE9EC] text-[#FF5B5B] px-4 py-1 rounded-full text-xs font-semibold">
                        To be Done
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
