import API from "../index";

// Teacher
export const createSubmission = (data: any) =>
  API.post("/teacher/submission", data);
export const getTeacherSubmissions = () => API.get("/teacher/submissions");
export const getSubmissionUploads = (id: string) =>
  API.get(`/teacher/submission/${id}/uploads`);

// Student
export const getStudentSubmissions = () => API.get("/student/submissions");
export const uploadStudentSubmission = (id: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post(`/student/submission/${id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getOwnSubmissionUpload = (id: string) =>
  API.get(`/student/submission/${id}/upload`);
