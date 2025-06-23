import API from "../index";

interface StudentPayload {
  name: { first: string; last: string };
  department: string;
  gender: string;
  mobile: string;
  email: string;
  admissionDate: string; // ISO string format
  section: string;
  password?: string;
}

export const addStudent = (payload: StudentPayload) =>
  API.post("/student/add", payload);

export const getStudents = () => API.get("/student/");

export const updateStudent = (id: string, payload: Partial<StudentPayload>) =>
  API.put(`/student/${id}`, payload);

export const deleteStudent = (id: string) => API.delete(`/student/${id}`);

// New functions for student dashboard
export const getStudentByUserId = () => API.get(`/student/profile`);

export const getStudentSchedule = () => API.get(`/student/schedule`);

export const getStudentTodaySchedules = () => API.get(`/student/today`);
