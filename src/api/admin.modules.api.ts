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

export const updateModule = async (
  courseId: string,
  moduleId: string,
  data: Partial<CreateModuleRequest>,
  token: string,
) => {
  const res = await api.put(`/courses/${courseId}/modules/${moduleId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteModule = async (
  courseId: string,
  moduleId: string,
  token: string,
) => {
  const res = await api.delete(`/courses/${courseId}/modules/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

