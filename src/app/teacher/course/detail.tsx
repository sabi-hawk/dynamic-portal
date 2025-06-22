import { Tabs, Spin, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getScheduleDetail } from "api/schedule";
import { useParams, useNavigate } from "react-router-dom";
import CourseMaterialsTab from "components/Teacher/CourseMaterialsTab";

function CourseDetail() {
  const navigate = useNavigate();
  const { scheduleId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["schedule-detail", scheduleId],
    queryFn: () =>
      getScheduleDetail(scheduleId as string).then((res) => res.data),
    enabled: !!scheduleId,
  });

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
        defaultActiveKey="materials"
        items={[
          {
            key: "materials",
            label: "Course Material",
            children: <CourseMaterialsTab scheduleId={scheduleId as string} />,
          },
          {
            key: "assignments",
            label: "Assignments",
            children: <div>Coming Soon...</div>,
          },
          {
            key: "grades",
            label: "Grades",
            children: <div>Coming Soon...</div>,
          },
          {
            key: "submissions",
            label: "Submissions",
            children: <div>Coming Soon...</div>,
          },
        ]}
      />
    </div>
  );
}

export default CourseDetail;
