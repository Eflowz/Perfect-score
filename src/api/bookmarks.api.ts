import api from "./axios";

export const bookmarkCourse = async (courseId: string) => {
  const res = await api.post(`/users/bookmarks/course/${courseId}`);
  return res.data;
};

export const removeBookmark = async (courseId: string) => {
  const res = await api.delete(`/users/bookmarks/course/${courseId}`);
  return res.data;
};
