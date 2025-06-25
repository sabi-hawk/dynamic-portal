"use client";
import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { useAppState } from "hooks";
import { getStudentCourses } from "api/student";
import CourseCard from "components/Student/CourseCard";

interface CourseData {
  _id: string;
  courseCode: string;
  courseName: string;
  description: string;
  status: string;
  section: string;
}

function Courses() {
  const {
    auth: { user },
  } = useAppState();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?._id) {
      fetchStudentCourses();
    }
  }, [user]);

  const fetchStudentCourses = async () => {
    try {
      setLoading(true);
      const response = await getStudentCourses();
      console.log("Student courses response:", response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch student courses:", error);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-10">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-white min-h-full">
      <h2 className="text-2xl font-bold mb-6 text-[#2989FF]">My Courses</h2>
      {courses.length > 0 ? (
        <Row gutter={[16, 16]}>
          {courses.map((course) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course._id}>
              <Link to={`/student/course/${course._id}`}>
                <CourseCard data={course} />
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-12">
          <div className="text-lg text-gray-500 mb-4">No courses found</div>
          <div className="text-sm text-gray-400">
            You don't have any courses assigned to your section yet.
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
