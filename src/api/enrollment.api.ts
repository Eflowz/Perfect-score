import api from "./axios";

export const enrollInCourse = async (courseId: string) => {
  const res = await api.post(`/courses/${courseId}/enroll`);
  return res.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const res = await api.delete(`/courses/${courseId}/unenroll`);
  return res.data;
};

export const getEnrolledCourses = async () => {
  const res = await api.get("/users/enrolled-courses");
  return res.data;
};
