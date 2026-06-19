import api from "./axios";

export type CreateModuleRequest = {
  title: string;
  content: string;
  order: number;
};

export const createModule = async (
  courseId: string,
  data: CreateModuleRequest,
  token: string,
) => {
  const res = await api.post(`/courses/${courseId}/modules`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
