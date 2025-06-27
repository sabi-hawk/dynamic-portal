import API from "../index";

export const getAnnouncements = () => API.get("/announcements");

export const createAnnouncement = (data: FormData) =>
  API.post("/announcements", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateAnnouncement = (id: string, data: FormData) =>
  API.put(`/announcements/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteAnnouncement = (id: string) =>
  API.delete(`/announcements/${id}`); 