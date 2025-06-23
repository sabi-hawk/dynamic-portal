import React, { useMemo } from "react";
import { Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTeacherCoursesAndSchedules, getTeacherByUserId } from "api/teacher";
// @ts-ignore
import CourseCard from "components/Teacher/CourseCard";

interface CourseSchedule {
  _id: string;
  section: string;
  course: {
    courseCode: string;
    courseName: string;
  };
  schedule: {
    startTime: string;
    endTime: string;
    daysOfWeek: string[];
  };
}

function Lectures() {
  // Extract teacherId from localStorage user object (placeholder logic)
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
  const userId = user?._id;

  // First fetch teacher profile using userId
  const { data: teacherData, isLoading: loadingTeacher } = useQuery({
    queryKey: ["teacher-profile", userId],
    queryFn: () => getTeacherByUserId(userId).then((res) => res.data),
    enabled: !!userId,
  });

  const teacherId = teacherData?._id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["teacher-courses", teacherId],
    queryFn: () =>
      getTeacherCoursesAndSchedules().then((res) => res.data),
    enabled: !!teacherId,
  });

  const schedules: CourseSchedule[] = data || [];

  /*
   * Memo-compute next occurrence & upcoming flag whenever schedule data changes.
   * This avoids recalculating on each render and keeps the logic isolated/readable.
   */
  const { processedSchedules, upcomingId } = useMemo(() => {
    const now = new Date();
    const dayMap: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const getNextOccurrence = (sched: CourseSchedule): Date | null => {
      if (!sched.schedule?.daysOfWeek?.length) return null;
      let best: Date | null = null;
      sched.schedule.daysOfWeek.forEach((day) => {
        const dayIdx = dayMap[day];
        if (dayIdx === undefined) return;
        const target = new Date(now);
        const diff = (dayIdx + 7 - now.getDay()) % 7;
        target.setDate(now.getDate() + diff);
        const [h, m] = sched.schedule.startTime.split(":");
        target.setHours(Number(h), Number(m), 0, 0);
        if (target < now) target.setDate(target.getDate() + 7); // next cycle
        if (!best || target < best) best = target;
      });
      return best;
    };

    const withNext = schedules.map((s) => ({
      ...s,
      nextDate: getNextOccurrence(s) as Date,
    }));

    const upcoming = withNext
      .filter((s) => s.nextDate)
      .sort(
        (a, b) =>
          (a.nextDate as Date).getTime() - (b.nextDate as Date).getTime()
      )[0]?._id;

    return { processedSchedules: withNext, upcomingId: upcoming };
  }, [schedules]);

  if (loadingTeacher || isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-10">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load courses.</div>;
  }

  return (
    <div className="p-6 bg-white min-h-full">
      <Row gutter={[16, 16]}>
        {processedSchedules.map((sched) => {
          const indicator = sched._id === upcomingId ? "upcoming" : null;
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={sched._id}>
              <Link to={`/teacher/course/${sched._id}`}>
                <CourseCard data={{ ...sched, indicator, status: "active" }} />
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Lectures;
