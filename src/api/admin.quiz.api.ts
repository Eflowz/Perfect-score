

import api from "./axios";

import { getAccessToken } from "../utlis/storage";

export const createQuiz = async (
 courseId: string,
 data: any
) => {

 const response = await api.post(
 `/courses/${courseId}/quizzes`,
 data,
 {
 headers: {
 Authorization: `Bearer ${getAccessToken()}`,
 "Content-Type": "application/json",
 },
 }
 );
console.log("TOKEN:", getAccessToken());
 return response.data.data ?? response.data;
};