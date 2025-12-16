import { axiosInstance } from "..";
import {
  ISection,
  ISectionStatistics,
  IStudent,
  AddSectionRequest,
  UpdateSectionRequest,
  GetSectionsQuery,
} from "../../types/school";

/**
 * Section API Service - For School Management
 */

const BASE_URL = "/section";

// Add a new section
export const addSection = async (
  data: AddSectionRequest
): Promise<{ message: string; section: ISection }> => {
  const response = await axiosInstance.post(`${BASE_URL}/add`, data);
  return response.data;
};

// Get all sections (optionally filter by classId)
export const getSections = async (
  query?: GetSectionsQuery
): Promise<ISection[]> => {
  const response = await axiosInstance.get(BASE_URL, { params: query });
  return response.data;
};

// Get section by ID
export const getSectionById = async (id: string): Promise<ISection> => {
  const response = await axiosInstance.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Update section
export const updateSection = async (
  id: string,
  data: UpdateSectionRequest
): Promise<{ message: string; section: ISection }> => {
  const response = await axiosInstance.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

// Delete section
export const deleteSection = async (
  id: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
  return response.data;
};

// Get section statistics
export const getSectionStatistics = async (
  id: string
): Promise<ISectionStatistics> => {
  const response = await axiosInstance.get(`${BASE_URL}/${id}/statistics`);
  return response.data;
};

// Get all students in a section
export const getSectionStudents = async (id: string): Promise<IStudent[]> => {
  const response = await axiosInstance.get(`${BASE_URL}/${id}/students`);
  return response.data;
};

const sectionAPI = {
  addSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
  getSectionStatistics,
  getSectionStudents,
};

export default sectionAPI;
