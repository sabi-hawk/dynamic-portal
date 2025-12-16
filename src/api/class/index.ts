import { axiosInstance } from "..";
import {
  IClass,
  IClassStatistics,
  AddClassRequest,
  UpdateClassRequest,
} from "../../types/school";

/**
 * Class API Service - For School Management
 */

const BASE_URL = "/class";

// Add a new class
export const addClass = async (
  data: AddClassRequest
): Promise<{ message: string; class: IClass }> => {
  const response = await axiosInstance.post(`${BASE_URL}/add`, data);
  return response.data;
};

// Get all classes
export const getClasses = async (): Promise<IClass[]> => {
  const response = await axiosInstance.get(BASE_URL);
  return response.data;
};

// Get class by ID
export const getClassById = async (id: string): Promise<IClass> => {
  const response = await axiosInstance.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Update class
export const updateClass = async (
  id: string,
  data: UpdateClassRequest
): Promise<{ message: string; class: IClass }> => {
  const response = await axiosInstance.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

// Delete class
export const deleteClass = async (id: string): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
  return response.data;
};

// Get all sections for a class
export const getClassSections = async (classId: string) => {
  const response = await axiosInstance.get(`${BASE_URL}/${classId}/sections`);
  return response.data;
};

// Get class statistics
export const getClassStatistics = async (
  id: string
): Promise<IClassStatistics> => {
  const response = await axiosInstance.get(`${BASE_URL}/${id}/statistics`);
  return response.data;
};

const classAPI = {
  addClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassSections,
  getClassStatistics,
};

export default classAPI;
