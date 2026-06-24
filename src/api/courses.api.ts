import api from "./axios";
import type { Course } from "../types/courses.types";

type CoursesResponse = {
  data: Course[];
};

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get<CoursesResponse>("/courses");

  return response.data.data;
};

// GET COURSE DETAILS

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await api.get(`/courses/${id}`);

 
  return response.data.data; // ✅ FIX HERE
};
type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type UpdateCourseRequest = {
  title?: string;
  description?: string;
  level?: CourseLevel;
  order?: number;
};

export const updateCourse = async (
  id: string,
  data: UpdateCourseRequest,
  token: string,
) => {
  const res = await api.put(`/courses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteCourse = async (courseId: string, token: string) => {
  const res = await api.delete(`/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
