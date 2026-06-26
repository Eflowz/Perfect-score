import api from "./axios";
import { getAccessToken } from "../utlis/storage";
 const token = getAccessToken();

export const getCourseQuizzes = async (
 courseId:string
) => {

 
const res = await api.get(
 `/courses/${courseId}/quizzes`,
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );
 
 return res.data.data;

};

export const getQuizById = async (
 quizId:string
) => {

 const response = await api.get(
 `/quizzes/${quizId}`
 );


 return response.data.data;

};

// Submit quiz answers

export const submitQuiz = async (
 quizId: string,
 answers: string[]
) => {

 const response = await api.post(
 `/quizzes/${quizId}/submit`,
 {
 answers
 }
 );


 return response.data.data;

};