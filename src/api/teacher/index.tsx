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
}
export const addTeacher = (payload: TeacherPayload) =>
  API.post("/teacher/add", payload);

