"use client";
import { Col, Row, Table, Tag } from "antd";
import type { TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { getStudents } from "../../../api/student";
import { getCourses } from "../../../api/course";
import { getTeachers } from "api/teacher";

interface DataType {
  key: string;
  name: string;
  id: number;
  status: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <Tag color="volcano">{status.toUpperCase()}</Tag>
    ),
  },
];

function Dashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [performanceStats, setPerformanceStats] = useState({
    students: { count: 0, percentage: 0 },
    teachers: { count: 0, percentage: 0 },
    courses: { count: 0, percentage: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, coursesRes] = await Promise.all([
          getStudents(),
          getTeachers(),
          getCourses(),
        ]);

        // Get top 5 newest students
        const newestStudents = studentsRes.data
          .slice(0, 5)
          .map((student: any) => ({
            key: student._id,
            name: `${student.name?.first || ""} ${student.name?.last || ""}`,
            id: student.rollNo,
            status: student.status || "Active",
          }));

        // Get top 5 newest teachers
        const newestTeachers = teachersRes.data
          .slice(0, 5)
          .map((teacher: any) => ({
            key: teacher._id,
            name: `${teacher.name?.first || ""} ${teacher.name?.last || ""}`,
            id: teacher._id,
            status: teacher.status || "Active",
          }));

        setStudents(newestStudents);
        setTeachers(newestTeachers);
        setCourses(coursesRes.data);

        // Calculate performance statistics
        const calculatePerformance = (
          currentData: any[],
          previousData: any[]
        ) => {
          const currentCount = currentData.length;
          const previousCount = previousData.length;
          const percentage =
            previousCount === 0
              ? 100
              : ((currentCount - previousCount) / previousCount) * 100;
          return {
            count: currentCount,
            percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal place
          };
        };

        // For demo purposes, we'll use the last month's data as previous data
        // In a real application, you would fetch historical data from the backend
        const lastMonthStudents = studentsRes.data.slice(
          0,
          Math.floor(studentsRes.data.length * 0.9)
        );
        const lastMonthTeachers = teachersRes.data.slice(
          0,
          Math.floor(teachersRes.data.length * 0.9)
        );
        const lastMonthCourses = coursesRes.data.slice(
          0,
          Math.floor(coursesRes.data.length * 0.9)
        );

        setPerformanceStats({
          students: calculatePerformance(studentsRes.data, lastMonthStudents),
          teachers: calculatePerformance(teachersRes.data, lastMonthTeachers),
          courses: calculatePerformance(coursesRes.data, lastMonthCourses),
        });

        // Process student survey data + breakdown
        const { chartData, breakdown } = processStudentSurveyData(
          studentsRes.data
        );
        setStudentSurveyData(chartData);
        setStudentBreakdown(breakdown);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [studentSurveyData, setStudentSurveyData] = useState<any[]>([]);
  const [studentBreakdown, setStudentBreakdown] = useState({
    newCount: 0,
    oldCount: 0,
  });

  const processStudentSurveyData = (students: any[]) => {
    // Group students by admission month
    const monthlyData = students.reduce((acc: any, student: any) => {
      const date = new Date(student.admissionDate);
      const month = date.toLocaleString("default", { month: "short" });

      if (!acc[month]) {
        acc[month] = { new: 0, old: 0 };
      }

      // Consider students admitted in last 6 months as new
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      if (date >= sixMonthsAgo) {
        acc[month].new++;
      } else {
        acc[month].old++;
      }

      return acc;
    }, {});

    const chartData = Object.entries(monthlyData).flatMap(
      ([month, data]: [string, any]) => [
        { name: "New Student", month, value: data.new },
        { name: "Old Student", month, value: data.old },
      ]
    );

    const totals = (Object.values(monthlyData) as any).reduce(
      (acc: any, curr: any) => {
        acc.new += curr.new;
        acc.old += curr.old;
        return acc;
      },
      { new: 0, old: 0 }
    );

    return {
      chartData,
      breakdown: { newCount: totals.new, oldCount: totals.old },
    };
  };

  const students_performance_config = {
    data: [
      { type: "1-3 seconds", value: 0.16 },
      { type: "4-10 seconds", value: 0.125 },
      { type: "11-30 seconds", value: 0.24 },
      { type: "31-60 seconds", value: 0.19 },
      { type: "1-3 points", value: 0.22 },
      { type: "3-10 points", value: 0.05 },
      { type: "10-30 points", value: 0.01 },
      { type: "30+ points", value: 0.015 },
    ],
    xField: "type",
    yField: "value",
    height: 350,
    style: {
      fill: ({ type }: { type: string }) => {
        if (type === "10-30 points" || type === "30+ points") {
          return "#22CBCC";
        }
        return "#2989FF";
      },
    },
    label: {
      text: (originData: { value: string }) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
        return "";
      },
      offset: 10,
    },
    legend: false,
  };

  const students_survey_config = {
    data: studentSurveyData,
    xField: "month",
    yField: "value",
    colorField: "name",
    color: ["#2989FF", "#22CBCC"],
    group: true,
    height: 350,
    style: {
      inset: 5,
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <Row gutter={16}>
        <Col className="h-fit" span={6}>
          <div className="bg-white rounded-[10px] p-[10px_15px] flex flex-col gap-2.5 shadow-[0px_0px_10px_0px_#B7C0CE33]">
            <div className="flex justify-between">
              <img
                src="/assets/images/students.png"
                height={64}
                width={64}
                alt="Student Image"
              />
              <div className="flex flex-col items-end">
                <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                  Total Students
                </h3>
                <h2 className="font-roboto text-xl font-medium leading-[28.13px] text-right text-[#4CAF50]">
                  {performanceStats.students.count}
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <img
                className="w-[18.57px] h-[10px]"
                src={
                  performanceStats.students.percentage >= 0
                    ? "/assets/icons/arrow-up.png"
                    : "/assets/icons/arrow-down.png"
                }
                height={21}
                width={12}
                alt="Arrow Icon"
              />
              <p>
                {Math.abs(performanceStats.students.percentage)}%{" "}
                {performanceStats.students.percentage >= 0 ? "Higher" : "Lower"}{" "}
                Than Last Month
              </p>
            </div>
          </div>
        </Col>
        <Col className="h-fit" span={6}>
          <div className="bg-white rounded-[10px] p-[10px_15px] flex flex-col gap-2.5 shadow-[0px_0px_10px_0px_#B7C0CE33]">
            <div className="flex justify-between">
              <img
                src="/assets/images/courses.png"
                height={64}
                width={64}
                alt="Courses Image"
              />
              <div className="flex flex-col items-end">
                <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                  Total Courses
                </h3>
                <h2 className="font-roboto text-xl font-medium leading-[28.13px] text-right text-[#4CAF50]">
                  {performanceStats.courses.count}
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <img
                className="w-[18.57px] h-[10px]"
                src={
                  performanceStats.courses.percentage >= 0
                    ? "/assets/icons/arrow-up.png"
                    : "/assets/icons/arrow-down.png"
                }
                height={21}
                width={12}
                alt="Arrow Icon"
              />
              <p>
                {Math.abs(performanceStats.courses.percentage)}%{" "}
                {performanceStats.courses.percentage >= 0 ? "Higher" : "Lower"}{" "}
                Than Last Month
              </p>
            </div>
          </div>
        </Col>
        <Col className="h-fit" span={6}>
          <div className="bg-white rounded-[10px] p-[10px_15px] flex flex-col gap-2.5 shadow-[0px_0px_10px_0px_#B7C0CE33]">
            <div className="flex justify-between">
              <img
                src="/assets/images/teachers.png"
                height={64}
                width={64}
                alt="Teachers Image"
              />
              <div className="flex flex-col items-end">
                <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                  Total Teachers
                </h3>
                <h2 className="font-roboto text-xl font-medium leading-[28.13px] text-right text-[#4CAF50]">
                  {performanceStats.teachers.count}
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <img
                className="w-[18.57px] h-[10px]"
                src={
                  performanceStats.teachers.percentage >= 0
                    ? "/assets/icons/arrow-up.png"
                    : "/assets/icons/arrow-down.png"
                }
                height={21}
                width={12}
                alt="Arrow Icon"
              />
              <p>
                {Math.abs(performanceStats.teachers.percentage)}%{" "}
                {performanceStats.teachers.percentage >= 0 ? "Higher" : "Lower"}{" "}
                Than Last Month
              </p>
            </div>
          </div>
        </Col>
        <Col className="h-fit" span={6}>
          <div className="bg-white rounded-[10px] p-[10px_15px] flex flex-col gap-2.5 shadow-[0px_0px_10px_0px_#B7C0CE33]">
            <div className="flex justify-between">
              <img
                src="/assets/images/fee.png"
                height={64}
                width={64}
                alt="Fee Image"
              />
              <div className="flex flex-col items-end">
                <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                  Fee Collected
                </h3>
                <h2 className="font-roboto text-xl font-medium leading-[28.13px] text-right text-[#4CAF50]">
                  $
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <img
                className="w-[18.57px] h-[10px]"
                src="/assets/icons/arrow-up.png"
                height={21}
                width={12}
                alt="Arrow Up Icon"
              />
              <p>Future Enhancement Coming Soon</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              Students Survey
            </h3>
            <Column {...students_survey_config} />
          </Row>
        </Col>
        <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg gap-4 min-h-[410px]">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              Student Overview (Last 6 Months)
            </h3>
            <div className="flex justify-around items-center w-full mt-32">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#2989FF]">
                  {studentBreakdown.newCount}
                </h2>
                <p className="text-sm">New Students</p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#22CBCC]">
                  {studentBreakdown.oldCount}
                </h2>
                <p className="text-sm">Existing Students</p>
              </div>
            </div>
          </Row>
        </Col>
        {/* <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              Students Performance Survey
            </h3>
            <Column {...students_performance_config} />
          </Row>
        </Col> */}
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              Teachers List
            </h3>
            <Table<DataType>
              columns={columns}
              dataSource={teachers}
              loading={loading}
              pagination={false}
            />
          </Row>
        </Col>
        <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              New Students List
            </h3>
            <Table<DataType>
              columns={columns}
              dataSource={students}
              loading={loading}
              pagination={false}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
