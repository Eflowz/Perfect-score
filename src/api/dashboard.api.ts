import api from "./axios";

export const getTodayChallenge = async () => {
 const res = await api.get("/dashboard/challenge");

 return res.data;
};

export const getLeaderboard = async () => {
 const res = await api.get("/dashboard/leaderboard");

 return res.data;
};

export const getDashboardMetrics = async () => {
 const res = await api.get("/dashboard/metrics");

 return res.data;
};

export const getRoadmapTrack = async () => {
 const res = await api.get("/dashboard/track");

 return res.data;
};