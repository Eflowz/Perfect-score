import api from "./axios";
import { getAccessToken } from "../utlis/storage";
export const getUserRoadmap = async () => {
 const res = await api.get("/roadmap", {
 headers: {
 Authorization: `Bearer 
 ${getAccessToken()}`,
 },
 });
console.log("road map:", res)
 return res.data;
};

export const generateRoadmap = async () => {
 try {
 console.log("🚀 Generating roadmap...");

 const token = getAccessToken();
 console.log("🔑 Token exists:", !!token);

 const res = await api.post(
 "/roadmap/generate",
{
goals: ["frontend developer"],

},
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );

 console.log("✅ Roadmap generated successfully:");
 console.log("📦 Full response:", res);
 console.log("📦 Response data:", res.data);

 return res.data;
 } catch (err: any) {
 console.log("❌ ERROR generating roadmap");
 console.log("📛 Status:", err?.response?.status);
 console.log("📛 Data:", err?.response?.data);
 console.log("📛 Message:", err?.message);

 throw err;
 }
};