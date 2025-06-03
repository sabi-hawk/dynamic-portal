"use client";
import React, { useState } from "react";
import { Row, Col } from "antd";
import CourseCard from "./components/CourseCard";
import CourseTabs from "./components/CourseTabs";

// Placeholder data for courses
const courses = [
  {
    id: "1",
    code: "CS101",
    name: "Computer Science 101",
    description: "Intro to Computer Science",
    image: "/assets/images/course1.png",
  },
  {
    id: "2",
    code: "MATH201",
    name: "Mathematics 201",
    description: "Advanced Mathematics",
    image: "/assets/images/course2.png",
  },
  {
    id: "3",
    code: "ENG301",
    name: "English 301",
    description: "English Literature",
    image: "/assets/images/course3.png",
  },
];

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  return (
    <div className="p-6 min-h-screen bg-[#f5f8fe]">
      {!selectedCourse ? (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#2989FF]">My Courses</h2>
          <Row gutter={[24, 24]}>
            {courses.map((course) => (
              <Col xs={24} sm={12} md={8} key={course.id}>
                <CourseCard
                  course={course}
                  onClick={() => setSelectedCourse(course)}
                />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="mb-4">
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow text-[#2989FF] font-semibold hover:bg-[#eaf6ff] border border-[#e3eefe] transition-all duration-200"
              onClick={() => setSelectedCourse(null)}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="#2989FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Courses
            </button>
          </div>
          <div className="w-full">
            <CourseTabs course={selectedCourse} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
