import api from "./axios";
import { getAccessToken } from "../utlis/storage";


export const getMyCertificates = async () => {
 const token = getAccessToken();

 try {
 //console.log("🎓 Fetching certificates...");
 //console.log("🔑 Token exists:", !!token);


 const res = await api.get(
 "/certifications/my",
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );


 //console.log("✅ Certificates response:", res.data.data);

 return res.data.data;


 } catch (err: any) {

 //console.log("❌ Certificate fetch failed");
{/*
 console.log(
 "📛 STATUS:",
 err?.response?.status
 );

 console.log(
 "📛 DATA:",
 err?.response?.data.data
 );
*/}
 throw err;
 }
};


export const verifyCertificate = async (
 credentialId: string
) => {

 try {

 //console.log("🔍 Verifying certificate...");
 //console.log("Credential ID:", credentialId);


 const res = await api.post(
 "/certifications/verify",
 {
 credentialId,
 }
 );

{/* 
 console.log(
 "✅ Verification response:",
 res.data
 );
*/}

 return res.data;


 } catch(err:any){
{/*
 console.log("❌ Verification failed");

 console.log(
 "STATUS:",
 err?.response?.status
 );

 console.log(
 "DATA:",
 err?.response?.data
 );
*/}

 throw err;
 }

};