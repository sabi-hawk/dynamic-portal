import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { getTeacherCoursesAndSchedules } from "api/teacher";
import CourseCard from "components/Teacher/CourseCard";
import { useAppState } from "hooks";

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
  const {
    auth: { user },
  } = useAppState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<CourseSchedule[]>([]);

  useEffect(() => {
    if (user) {
      fetchTeacherData();
    }
  }, [user]);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      const data = await getTeacherCoursesAndSchedules();
      setSchedules(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load courses.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
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
        if (target < now) target.setDate(target.getDate() + 7);
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
