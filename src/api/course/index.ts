import API from "../index";

export interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  description: string;
  status: string;
  schedules?: CourseSchedule[];
}

export interface CourseSchedule {
  _id: string;
  instructor: string;
  section: string;
  schedule: {
    startTime: string;
    endTime: string;
    duration?: number;
    daysOfWeek: string[];
  };
  status?: string;
}

interface CoursePayload {
  courseCode: string;
  courseName: string;
  description: string;
  status: string;
  schedules: {
    instructor: string;
    section: string;
    schedule: {
      startTime: string;
      endTime: string;
      daysOfWeek: string[];
    };
  }[];
}

export const getCourses = () => API.get("/course/");

export const getCourseById = (id: string) => API.get(`/course/${id}`);

export const addCourse = (payload: CoursePayload) =>
  API.post("/course/add", payload);

export const updateCourse = (id: string, payload: Partial<CoursePayload>) =>
  API.put(`/course/${id}`, payload);

export const deleteCourse = (id: string) => API.delete(`/course/${id}`);

export const getCoursesByInstructor = (instructorId: string) =>
  API.get(`/course/instructor/${instructorId}`);

export const getCourseSchedules = (courseId: string) =>
  API.get(`/course/${courseId}/schedules`);

export const addCourseSchedule = (
  courseId: string,
  schedule: Omit<CourseSchedule, "_id">
) => API.post(`/course/${courseId}/schedules`, schedule);

export const updateCourseSchedule = (
  courseId: string,
  scheduleId: string,
  schedule: Partial<CourseSchedule>
) => API.put(`/course/${courseId}/schedules/${scheduleId}`, schedule);

export const deleteCourseSchedule = (courseId: string, scheduleId: string) =>
  API.delete(`/course/${courseId}/schedules/${scheduleId}`);
