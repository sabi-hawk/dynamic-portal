import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Radio, message, Spin } from "antd";
import dayjs from "dayjs";
import {
  getScheduleStudents,
  markAttendance,
  getScheduleAttendance,
} from "api/attendance";

interface Props {
  scheduleId: string;
  schedule: {
    schedule: { startTime: string; endTime: string; daysOfWeek: string[] };
  };
}

const statusOptions = [
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
  { label: "Late", value: "late" },
];

function AttendanceTab({ scheduleId, schedule }: Props) {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [slotStatus, setSlotStatus] = useState<Record<string, string>>({});
  const [alreadyMarked, setAlreadyMarked] = useState(false);
  const [absentCounts, setAbsentCounts] = useState<Record<string, number>>({});

  const current = dayjs();
  const today = current.format("YYYY-MM-DD");

  const slotLabel = () => {
    // assume hourly slots
    const start = dayjs(today + " " + schedule.schedule.startTime);
    const diff = current.diff(start, "hour");
    if (diff < 0) return null;
    const slotStart = start.add(diff, "hour");
    const slotEnd = slotStart.add(1, "hour");
    if (current.isAfter(slotEnd)) return null;
    return `${slotStart.format("HH:mm")}-${slotEnd.format("HH:mm")}`;
  };
  const activeSlot = slotLabel();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studRes, attRes] = await Promise.all([
        getScheduleStudents(scheduleId),
        getScheduleAttendance(scheduleId),
      ]);
      setStudents(studRes.data);
      // calculate absent counts from all records
      const counts: Record<string, number> = {};
      attRes.data.forEach((rec: any) => {
        rec.statuses.forEach((st: any) => {
          if (st.status === "absent") {
            counts[st.student._id] = (counts[st.student._id] || 0) + 1;
          }
        });
      });
      setAbsentCounts(counts);

      if (activeSlot) {
        const slotRec = attRes.data.find(
          (r: any) => r.date === today && r.slot === activeSlot
        );
        if (slotRec) {
          const map: Record<string, string> = {};
          slotRec.statuses.forEach((s: any) => (map[s.student._id] = s.status));
          setSlotStatus(map);
          setAlreadyMarked(true);
        }
      }
    } catch (e) {
      console.error(e);
      message.error("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const payload = {
        courseScheduleId: scheduleId,
        date: today,
        slot: activeSlot,
        statuses: students.map((st) => ({
          student: st._id,
          status: slotStatus[st._id] || "present",
        })),
      };
      await markAttendance(payload);
      message.success("Attendance marked");
      setAlreadyMarked(true);
      fetchData();
    } catch (e) {
      console.error(e);
      message.error("Failed to mark attendance");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Name",
      key: "name",
      render: (_: any, rec: any) =>
        `${rec.userId?.name?.first || ""} ${rec.userId?.name?.last || ""}`,
    },
    {
      title: "Absents",
      key: "abs",
      render: (_: any, rec: any) => absentCounts[rec._id] || 0,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, rec: any) => {
        const value = slotStatus[rec._id] || "present";
        return alreadyMarked ? (
          <Tag
            color={
              value === "present"
                ? "green"
                : value === "late"
                ? "orange"
                : "red"
            }
          >
            {value}
          </Tag>
        ) : (
          <Radio.Group
            options={statusOptions}
            value={value}
            onChange={(e) =>
              setSlotStatus((prev) => ({ ...prev, [rec._id]: e.target.value }))
            }
          />
        );
      },
    },
  ];

  if (!activeSlot) {
    return (
      <div className="p-6">
        Attendance can be marked only during the lecture time.
      </div>
    );
  }

  return loading ? (
    <Spin className="p-6" />
  ) : (
    <div className="p-6">
      <h3 className="font-semibold mb-2">
        Attendance for {today} – {activeSlot}
      </h3>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={students}
        pagination={false}
      />
      {!alreadyMarked && (
        <Button
          type="primary"
          className="mt-4"
          loading={submitting}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
    </div>
  );
}

export default AttendanceTab;
