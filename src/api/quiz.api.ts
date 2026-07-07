import api from "./axios";

export const getCourseQuizzes = async (
 courseId:string
) => {

 
const res = await api.get(
 `/courses/${courseId}/quizzes`
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