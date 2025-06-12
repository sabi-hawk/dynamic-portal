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

export const deleteTeacher = (id: string) => API.delete(`/teacher/${id}`);

export const updateTeacher = (id: string, payload: Partial<TeacherPayload>) =>
  API.put(`/teacher/${id}`, payload);
