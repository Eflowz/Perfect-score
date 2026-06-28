import api from "./axios";

export const searchCoursesAndModules = async (query: string, type: string = "courses") => {
  const res = await api.get(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  return res.data;
};
