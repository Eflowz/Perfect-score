import { getAccessToken } from "../utlis/storage";
import api from "./axios";
export const getTodayChallenge = async () => {
   
 const res = await api.get("/dashboard/challenge", {
 headers: {
 Authorization: `Bearer ${getAccessToken()}`,
 },
 });

 return res.data;
};

export const getLeaderboard = async () => {
 const res = await api.get("/dashboard/leaderboard", {
 headers: {
 Authorization: `Bearer ${getAccessToken()}`
 }
 });

 return res.data;
};

export const getDashboardMetrics = async () => {
 const res = await api.get("/dashboard/metrics", {
 headers: {
 Authorization: `Bearer ${getAccessToken()}`
 }
 });

 return res.data;
};

export const getRoadmapTrack = async () => {
 const res = await api.get("/dashboard/track", {
 headers: {
 Authorization: `Bearer ${getAccessToken()}`,
 },
 });

 return res.data;
};