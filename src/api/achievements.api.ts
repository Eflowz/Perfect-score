import api from "./axios";

export const getMyBadges = async () => {
  const res = await api.get("/users/badges");
  return res.data;
};

export const getAllAchievements = async () => {
  const res = await api.get("/achievements");
  return res.data;
};
