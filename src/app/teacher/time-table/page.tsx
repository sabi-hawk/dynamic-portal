import React, { useEffect, useState, useMemo } from "react";
import { Card, Spin, Tooltip, Typography } from "antd";
import { getTeacherCoursesAndSchedules } from "api/teacher";
import { useAppState } from "hooks";
import {
  DAYS,
  TIMES,
  getTimeLabel,
  getTimeRangeLabel,
  getColor,
} from "./helpers";

const { Title } = Typography;

export default function TimeTable() {
  const {
    auth: { user },
  } = useAppState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    fetchSchedules();
    // eslint-disable-next-line
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTeacherCoursesAndSchedules();
      setSchedules(res.data);
    } catch (err) {
      setError("Failed to load timetable");
    } finally {
      setLoading(false);
    }
  };

  // Map: { day: { hour: [schedule, ...] } }
  const gridData = useMemo(() => {
    const map: Record<string, Record<number, any[]>> = {};
    for (const day of DAYS) {
      map[day] = {};
      for (const hour of TIMES) {
        map[day][hour] = [];
      }
    }
    schedules.forEach((sched, idx) => {
      const { schedule, course, section } = sched;
      if (!schedule?.daysOfWeek?.length) return;
      schedule.daysOfWeek.forEach((day: string) => {
        const startHour = parseInt(schedule.startTime.split(":")[0], 10);
        if (DAYS.includes(day) && TIMES.includes(startHour)) {
          map[day][startHour].push({ ...sched, color: getColor(idx) });
        }
      });
    });
    return map;
  }, [schedules]);

  return (
    <div className="p-6 bg-[#f5f8fe] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Title level={3} className="text-center mb-6 text-[#2989FF]">
          <span className="font-semibold">Month :</span>{" "}
          {new Date().toLocaleString("en-US", { month: "long" })}
        </Title>
        <Card className="shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Spin size="large" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="w-20 text-right pr-2 bg-[#f5f8fe]" />
                    {DAYS.map((day) => (
                      <th
                        key={day}
                        className="text-center font-semibold text-[#2989FF] py-2 px-4 border-b border-[#e3eefe] bg-[#f5f8fe]"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIMES.map((hour) => (
                    <tr key={hour}>
                      {/* Time label */}
                      <td className="text-right pr-2 align-top text-sm text-[#888] py-2 border-r border-[#e3eefe] bg-[#f5f8fe] min-w-[60px]">
                        {getTimeLabel(hour)}
                      </td>
                      {DAYS.map((day, dayIdx) => {
                        const slots = gridData[day][hour];
                        return (
                          <td
                            key={day}
                            className="align-top min-w-[160px] h-[60px] relative border-b border-[#e3eefe]"
                          >
                            {slots.length > 0 &&
                              slots.map((sched, i) => (
                                <Tooltip
                                  key={sched._id + i}
                                  title={
                                    <div className="text-xs">
                                      <div>
                                        <b>{sched.course?.courseName}</b>
                                      </div>
                                      <div>Section: {sched.section}</div>
                                      <div>
                                        Room:{" "}
                                        {sched.room || sched.classroom || "-"}
                                      </div>
                                      <div>
                                        Time:{" "}
                                        {getTimeRangeLabel(
                                          sched.schedule.startTime,
                                          sched.schedule.endTime
                                        )}
                                      </div>
                                    </div>
                                  }
                                  color={sched.color}
                                >
                                  <div
                                    className="rounded-lg shadow text-white px-3 py-2 mb-1 cursor-pointer transition-transform duration-200 hover:scale-105"
                                    style={{
                                      background: sched.color,
                                      minHeight: 48,
                                      maxWidth: 220,
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    <div className="font-semibold text-sm truncate">
                                      {sched.course?.courseName}
                                    </div>
                                    <div className="text-xs opacity-90 truncate">
                                      {sched.section} &bull;{" "}
                                      {sched.course?.courseCode}
                                    </div>
                                    <div className="text-xs opacity-80">
                                      {getTimeRangeLabel(
                                        sched.schedule.startTime,
                                        sched.schedule.endTime
                                      )}
                                    </div>
                                    {sched.room || sched.classroom ? (
                                      <div className="text-xs opacity-80">
                                        {sched.room || sched.classroom}
                                      </div>
                                    ) : null}
                                  </div>
                                </Tooltip>
                              ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
