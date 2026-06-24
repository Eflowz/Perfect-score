import api from "./axios";
import { getAccessToken } from "../utlis/storage";

type SubmitPayload = {
 courseId: string;
 code: string;
 language: string;
};

export const submitSolution = async (payload: SubmitPayload) => {
 const token = getAccessToken();

 try {
 console.log("🚀 Submitting solution...", payload);

 const res = await api.post("/submissions", payload, {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 });

 console.log("✅ Submission success:", res.data);

 return res.data;
 } catch (err: any) {
 console.log("❌ Submission failed");
 console.log("📛 STATUS:", err?.response?.status);
 console.log("📛 DATA:", err?.response?.data);

 throw err;
 }
};


export const getSubmissionReview = async (submissionId: string) => {
 const token = getAccessToken();

 try {
 console.log("🤖 Getting AI review...");
 console.log("📌 Submission ID:", submissionId);

 const res = await api.get(
 `/submissions/${submissionId}/review`,
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );

 console.log("✅ AI Review Response:", res.data);

 return res.data;

 } catch (err: any) {
 console.log("❌ Review failed");
 console.log("📛 STATUS:", err?.response?.status);
 console.log("📛 DATA:", err?.response?.data);

 throw err;
 }
};

