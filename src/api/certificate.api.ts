import api from "./axios";


export const getMyCertificates = async () => {
 try {
 //console.log("🎓 Fetching certificates...");


 const res = await api.get(
 "/certifications/my"
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