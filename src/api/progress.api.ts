import api from "./axios";
import { getAccessToken } from "../utlis/storage";
 const token = getAccessToken();
export const completeModule = async (
 moduleId: string,
 timeSpent: number
) => {
 const response = await api.post(
 `/progress/module/${moduleId}/complete`,
 {
 timeSpent,
 }
 );
 return response.data.data;
};

export const getCourseProgress = async (courseId: string) => {
const res = await api.get(
 `/progress/course/${courseId}`,
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );

   

 return res.data.data;
};

export const getAllUserProgress = async () => {
 const response = await api.get("/progress/user");

 return response.data.data;
};