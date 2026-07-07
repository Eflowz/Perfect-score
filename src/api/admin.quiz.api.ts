
import api from "./axios";

export const createQuiz = async (
 courseId: string,
 data: any
) => {

 const response = await api.post(
 `/courses/${courseId}/quizzes`,
 data
 );
 return response.data.data ?? response.data;
};

export const updateQuiz = async (
  quizId: string,
  data: any,
  token: string,
) => {
  const response = await api.put(`/quizzes/${quizId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data ?? response.data;
};

export const deleteQuiz = async (
  quizId: string,
  token: string,
) => {
  const response = await api.delete(`/quizzes/${quizId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};