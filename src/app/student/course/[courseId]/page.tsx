import { Tabs, Spin, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStudentCourses } from "api/student";
import Submission from "./submission/Submissions";
import Graded from "./graded/Graded";
import Attendance from "./attendance/Attendance";
import Materials from "./materials/Materials";
import { useHasFeature } from "utils/config";

interface CourseData {
  _id: string;
  courseCode: string;
  courseName: string;
  description: string;
  status: string;
  section: string;
}

function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  // feature toggles
  const showSubmission = useHasFeature("studentPortal", "submission");
  const showGrade = useHasFeature("studentPortal", "grade");
  const showAttendance = useHasFeature("studentPortal", "attendance");
  const showMaterials = useHasFeature("studentPortal", "course-material");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await getStudentCourses();
        const courseData = response.data.find(
          (c: CourseData) => c._id === courseId
        );
        setCourse(courseData || null);
      } catch (error) {
        console.error("Failed to fetch course data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-10">
        <Spin size="large" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">Course not found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Back to Courses
      </Button>
      <h2 className="text-xl font-semibold mb-4">
        {course.courseName} ({course.courseCode}) – Section {course.section}
      </h2>
      <Tabs
        defaultActiveKey={
          showSubmission
            ? "submission"
            : showGrade
            ? "grade"
            : showAttendance
            ? "attendance"
            : showMaterials
            ? "course-material"
            : undefined
        }
        items={[
          ...(showSubmission
            ? [
                {
                  key: "submission",
                  label: "Submission",
                  children: <Submission />,
                },
              ]
            : []),
          ...(showGrade
            ? [
                {
                  key: "grade",
                  label: "Graded",
                  children: <Graded />,
                },
              ]
            : []),
          ...(showAttendance
            ? [
                {
                  key: "attendance",
                  label: "Attendance",
                  children: <Attendance />,
                },
              ]
            : []),
          ...(showMaterials
            ? [
                {
                  key: "course-material",
                  label: "Course Materials",
                  children: <Materials />,
                },
              ]
            : []),
        ]}
      />
    </div>
  );
}

export default CourseDetail;
