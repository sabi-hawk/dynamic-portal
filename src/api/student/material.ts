import API from "../index";

export const getStudentMaterials = (courseId: string) =>
  API.get(`/student/materials?courseId=${courseId}`);
