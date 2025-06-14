import API from "../index";

export interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  instructor: {
    _id: string;
    userId: {
      name: {
        first: string;
        last: string;
      };
      email: string;
    };
    department: string;
  };
  description: string;
  section: string;
  status: string;
}

interface CoursePayload {
  courseCode: string;
  courseName: string;
  instructor: string;
  description: string;
  section: string;
}

export const getCourses = () => API.get("/course/");

export const getCourseById = (id: string) => API.get(`/course/${id}`);

export const addCourse = (payload: CoursePayload) => API.post("/course/add", payload);

export const updateCourse = (id: string, payload: Partial<CoursePayload>) =>
  API.put(`/course/${id}`, payload);

export const deleteCourse = (id: string) => API.delete(`/course/${id}`);

export const getCoursesByInstructor = (instructorId: string) =>
  API.get(`/course/instructor/${instructorId}`); 