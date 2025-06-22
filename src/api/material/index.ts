import API from "../index";

export const uploadMaterial = (scheduleId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("scheduleId", scheduleId);
  return API.post("/course-material/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getMaterials = (scheduleId: string) =>
  API.get(`/course-material/?scheduleId=${scheduleId}`);

export const deleteMaterial = (id: string) =>
  API.delete(`/course-material/${id}`);
