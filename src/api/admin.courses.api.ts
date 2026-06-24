import api from "./axios";

export type CreateCourseRequest = {
  title: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  order: number;
};

export const createCourse = async (
  data: CreateCourseRequest,
  token: string,
) => {
  const res = await api.post("/courses", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
