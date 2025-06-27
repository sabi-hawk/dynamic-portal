"use client";
import React, { useEffect, useState } from "react";
import { Button, Spin, message, Empty } from "antd";
import { getStudentSchedule, getStudentLeaves } from "api/student";
import LeaveRequestModal from "components/Student/LeaveRequestModal";
import CourseCard from "components/Student/CourseCard";

interface CourseSchedule {
  _id: string;
  courseCode: string;
  courseName: string;
  description: string;
  status: string;
  section: string;
  schedule?: {
    daysOfWeek: string[];
  };
}

interface Leave {
  _id: string;
  requestedDay: string;
  reason: string;
  status: string;
  courseSchedule: {
    _id: string;
    course: {
      courseName: string;
      courseCode: string;
    };
  };
}

export default function StudentLeavesPage() {
  const [courses, setCourses] = useState<CourseSchedule[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseSchedule | null>(
    null
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, lRes] = await Promise.all([
        getStudentSchedule(),
        getStudentLeaves(),
      ]);
      setCourses(cRes.data);
      setLeaves(lRes.data);
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (course: CourseSchedule) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
    fetchData(); // refresh
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold">My Courses – Request Leave</h1>
      {courses.length === 0 ? (
        <Empty description="No courses found" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="relative group">
              <CourseCard data={course as any} hideDetails />
              <Button
                type="primary"
                className="absolute bottom-4 right-4"
                onClick={() => openModal(course)}
              >
                Request Leave
              </Button>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-lg font-semibold mt-10">Leave History</h2>
      {leaves.length === 0 ? (
        <Empty description="No leave requests yet" />
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Course
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Requested Day
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Reason
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaves.map((leave) => (
                <tr key={leave._id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {leave.courseSchedule.course.courseCode} –{" "}
                    {leave.courseSchedule.course.courseName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {leave.requestedDay}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 max-w-xs line-clamp-2">
                    {leave.reason}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium">
                    <span
                      className={
                        leave.status === "accepted"
                          ? "text-green-600"
                          : leave.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCourse && (
        <LeaveRequestModal
          open={modalOpen}
          onClose={closeModal}
          courseScheduleId={selectedCourse._id}
          availableDays={selectedCourse.schedule?.daysOfWeek || []}
        />
      )}
    </div>
  );
}
