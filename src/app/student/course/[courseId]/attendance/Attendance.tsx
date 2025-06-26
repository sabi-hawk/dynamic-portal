import React, { useEffect, useState } from "react";
import { Table, Spin, message, Tag } from "antd";
import { getStudentAttendance } from "api/attendance";
import { useParams } from "react-router-dom";

function Attendance() {
  const { courseId } = useParams();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
  });

  useEffect(() => {
    const fetchAtt = async () => {
      try {
        setLoading(true);
        const res = await getStudentAttendance(courseId as string);
        setData(res.data);
        const total = res.data.length;
        let present = 0,
          absent = 0,
          late = 0;
        res.data.forEach((r: any) => {
          if (r.status === "present") present += 1;
          else if (r.status === "absent") absent += 1;
          else if (r.status === "late") late += 1;
        });
        setSummary({ total, present, absent, late });
      } catch (e) {
        console.error(e);
        message.error("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };
    if (courseId) fetchAtt();
  }, [courseId]);

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Slot", dataIndex: "slot", key: "slot" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: string) => {
        const color =
          s === "present" ? "green" : s === "late" ? "orange" : "red";
        return <Tag color={color}>{s?.toUpperCase()}</Tag>;
      },
    },
  ];

  return loading ? (
    <Spin className="p-6" />
  ) : (
    <div className="p-6">
      <div className="mb-4 space-x-4">
        <Tag>Total: {summary.total}</Tag>
        <Tag color="green">Present: {summary.present}</Tag>
        <Tag color="red">Absent: {summary.absent}</Tag>
        <Tag color="orange">Late: {summary.late}</Tag>
      </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
}

export default Attendance;
