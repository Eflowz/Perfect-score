import api from "./axios";
import type { Course } from "../types/courses.types";

type CoursesResponse = {
 data: Course[];
};

export const getCourses = async (): Promise<Course[]> => {

 const response =
 await api.get<CoursesResponse>("/courses");
console.log(response.data.data);
 console.log("response", response)
 return response.data.data;

};

// GET COURSE DETAILS

export const getCourseById = async(
 id:string
):
Promise<Course> => {


 const response =
 await api.get<Course>(
 `/courses/${id}`
 );


 return response.data;

};
type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type UpdateCourseRequest = {
 title?: string;
 description?: string;
 level?: CourseLevel;
 order?: number;
};

export const updateCourse = async (
 courseId: string,
 data: UpdateCourseRequest,
 token: string
) => {
 const res = await api.put(
 `/courses/${courseId}`,
 data,
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );

 return res.data;
};

export const deleteCourse = async (
 courseId: string,
 token: string
) => {
 const res = await api.delete(
 `/courses/${courseId}`,
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );
console.log(res)
 return res.data;
};