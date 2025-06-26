import API from "../index";

// Teacher
export const markAttendance = (data: any) =>
  API.post("/teacher/attendance", data);
export const getScheduleAttendance = (courseScheduleId: string) =>
  API.get(`/teacher/attendance?courseScheduleId=${courseScheduleId}`);
export const getScheduleStudents = (courseScheduleId: string) =>
  API.get(`/teacher/attendance/students?courseScheduleId=${courseScheduleId}`);

// Student
export const getStudentAttendance = (courseId: string) =>
  API.get(`/student/attendance?courseId=${courseId}`);
