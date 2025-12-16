/**
 * TypeScript Type Definitions for School Management
 * These types correspond to the backend models for Class, Section, and updated Student
 */

export interface IClass {
  _id: string;
  instituteId: string;
  className: string;
  description?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface ISection {
  _id: string;
  instituteId: string;
  classId: string | IClass;
  sectionName: string;
  description?: string;
  capacity?: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudent {
  _id: string;
  userId: string;
  instituteId: string;
  rollNo: string;

  // School-specific fields (new)
  classId?: string | IClass;
  sectionId?: string | ISection;
  fullName?: string;
  dateOfBirth?: Date;
  address?: string;
  guardianName?: string;
  guardianContact?: string;
  bloodGroup?: string;

  // University/College fields (preserved)
  department?: string;
  program?: string;
  semester?: number;
  collegeYear?: string;

  // Legacy fields (deprecated for schools)
  schoolClass?: string;
  section?: string;

  // Common fields
  gender: string;
  mobile: string;
  admissionDate: Date;
  status?: "active" | "inactive" | "graduated";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClassStatistics {
  class: IClass;
  sectionsCount: number;
  studentsCount: number;
  sectionStats: {
    sectionId: string;
    sectionName: string;
    studentsCount: number;
    capacity: number;
  }[];
}

export interface ISectionStatistics {
  section: ISection;
  studentsCount: number;
  genderDistribution: {
    male: number;
    female: number;
  };
  capacity: number;
  capacityUtilization: string | number;
  availableSeats: string | number;
}

// API Request/Response Types

export interface AddClassRequest {
  className: string;
  description?: string;
  status?: "active" | "inactive";
}

export interface UpdateClassRequest extends Partial<AddClassRequest> {}

export interface AddSectionRequest {
  classId: string;
  sectionName: string;
  description?: string;
  capacity?: number;
  status?: "active" | "inactive";
}

export interface UpdateSectionRequest extends Partial<AddSectionRequest> {}

export interface AddStudentRequest {
  userId: string;
  rollNo?: string; // Optional, will be auto-generated if not provided

  // For schools
  classId?: string;
  sectionId?: string;
  fullName?: string;
  dateOfBirth?: string | Date;
  address?: string;
  guardianName?: string;
  guardianContact?: string;
  bloodGroup?: string;

  // For university/college
  department?: string;
  program?: string;
  semester?: number;
  collegeYear?: string;

  // Common fields
  gender: string;
  mobile: string;
  admissionDate: string | Date;
  status?: "active" | "inactive" | "graduated";
}

export interface UpdateStudentRequest extends Partial<AddStudentRequest> {
  email?: string;
  password?: string;
  name?: {
    first: string;
    last: string;
  };
}

// Query Parameters
export interface GetStudentsQuery {
  classId?: string;
  sectionId?: string;
}

export interface GetSectionsQuery {
  classId?: string;
}

// Common Grade/Class Names for Schools
export const SCHOOL_CLASSES = [
  "Playgroup",
  "Nursery",
  "Prep",
  "KG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
] as const;

export type SchoolClassName = (typeof SCHOOL_CLASSES)[number];

// Common Section Names
export const COMMON_SECTION_NAMES = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Morning",
  "Afternoon",
] as const;

export type CommonSectionName = (typeof COMMON_SECTION_NAMES)[number];
