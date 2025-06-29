import { Tabs, Spin, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getScheduleDetail } from "api/schedule";
import { useParams, useNavigate } from "react-router-dom";
import CourseMaterialsTab from "components/Teacher/CourseMaterialsTab";
import SubmissionsTab from "components/Teacher/SubmissionsTab";
import AttendanceTab from "components/Teacher/AttendanceTab";
import { useAppState } from "hooks";
import { useHasFeature } from "utils/config";

function CourseDetail() {
  const navigate = useNavigate();
  const { scheduleId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["schedule-detail", scheduleId],
    queryFn: () =>
      getScheduleDetail(scheduleId as string).then((res) => res.data),
    enabled: !!scheduleId,
  });

  const showMaterials = useHasFeature("teacherPortal", "course-material");
  const showSubmissions = useHasFeature("teacherPortal", "submission");
  const showAttendance = useHasFeature("teacherPortal", "attendance");
  const showGrades = useHasFeature("teacherPortal", "grade");

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-full p-10">
        <Spin size="large" />
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
        {data.course.courseName} ({data.course.courseCode}) – Section{" "}
        {data.section}
      </h2>
      <Tabs
        defaultActiveKey={
          showMaterials
            ? "course-material"
            : showSubmissions
            ? "submission"
            : showAttendance
            ? "attendance"
            : showGrades
            ? "grade"
            : undefined
        }
        items={[
          ...(showMaterials
            ? [
                {
                  key: "course-material",
                  label: "Course Material",
                  children: (
                    <CourseMaterialsTab scheduleId={scheduleId as string} />
                  ),
                },
              ]
            : []),
          ...(showSubmissions
            ? [
                {
                  key: "submission",
                  label: "Submissions",
                  children: (
                    <SubmissionsTab scheduleId={scheduleId as string} />
                  ),
                },
              ]
            : []),
          ...(showAttendance
            ? [
                {
                  key: "attendance",
                  label: "Attendance",
                  children: (
                    <AttendanceTab
                      scheduleId={scheduleId as string}
                      schedule={data}
                    />
                  ),
                },
              ]
            : []),
          ...(showGrades
            ? [
                {
                  key: "grade",
                  label: "Grades",
                  children: <div>Coming Soon...</div>,
                },
              ]
            : []),
        ]}
      />
    </div>
  );
}

export default CourseDetail;
