import API from "../index";

export const getScheduleDetail = (id: string) => API.get(`/schedule/${id}`);
