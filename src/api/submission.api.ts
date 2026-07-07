import api from "./axios";

type SubmitPayload = {
 courseId: string;
 code: string;
 language: string;
};

export const submitSolution = async (payload: SubmitPayload) => {
 try {
 console.log("🚀 Submitting solution...", payload);

 const res = await api.post("/submissions", payload);

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
 try {
 console.log("🤖 Getting AI review...");
 console.log("📌 Submission ID:", submissionId);

 const res = await api.get(
 `/submissions/${submissionId}/review`
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

