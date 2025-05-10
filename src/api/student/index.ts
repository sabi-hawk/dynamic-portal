import API from "../index";

interface StudentPayload {
  name: string;
  department: string;
  gender: string;
  mobile: string;
  email: string;
  admissionDate: string; // ISO string format
}

export const addStudent = (payload: StudentPayload) =>
  API.post("/student/add", payload);

