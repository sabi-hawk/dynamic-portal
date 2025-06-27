import API from "../index";

interface TeacherPayload {
  name: string;
  department: string;
  degree: string;
  gender: string;
  mobile: string;
  role: string;
  email: string;
  joiningDate: string; // ISO string
  password?: string; // Optional for updates
}

export const addTeacher = (payload: TeacherPayload) =>
  API.post("/teacher/add", payload);

export const getTeachers = () => API.get("/teacher/");

export const getTeacherById = (id: string) => API.get(`/teacher/${id}`);

export const deleteTeacher = (id: string) => API.delete(`/teacher/${id}`);

export const updateTeacher = (id: string, payload: Partial<TeacherPayload>) =>
  API.put(`/teacher/${id}`, payload);

// New functions for teacher dashboard
export const getTeacherByUserId = () => API.get(`/teacher/profile`);

export const getTeacherCoursesAndSchedules = () => API.get(`/teacher/courses`);

export const getTeacherTodaySchedules = () => API.get(`/teacher/today`);

export const getTeacherLeaves = () => API.get(`/teacher/leaves`);
export const updateLeaveStatus = (
  id: string,
  status: "accepted" | "rejected"
) => API.patch(`/teacher/leaves/${id}`, { status });
