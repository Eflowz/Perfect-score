import { useState } from "react";
import type { VerifiedCertificate } from "../../types/certificates.types";
import { verifyCertificate } from "../../api/certificate.api";
//import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
export default function VerifyCertificate(){

const [credentialId,setCredentialId] = useState("");

const [result,setResult] =
useState<VerifiedCertificate | null>(null);

const [loading,setLoading] =
useState(false);

useEffect(() => {
 const runVerification = async () => {
 if (!credentialId) {
 console.log("❌ No credentialId in URL");
 return;
 }

 try {
 setLoading(true);

 console.log("🔍 Auto verifying:", credentialId);

 const data = await verifyCertificate(credentialId);

 console.log("✅ RESULT:", data);

 setResult(data);

 } catch (err) {
 console.log("❌ Verification error", err);
 } finally {
 setLoading(false);
 }
 };

 runVerification();
}, [credentialId]);


const handleVerify = async () => {

 try {

 if (!credentialId.trim()) {
 console.log("❌ Please enter credential ID");
 return;
 }

 setLoading(true);

 console.log("🔍 Verifying:", credentialId);

 const data = await verifyCertificate(credentialId);

 console.log("✅ RESULT:", data);

 setResult(data);

 } catch (err) {

 console.log("Verification error", err);

 } finally {

 setLoading(false);

 }

};



return (

<div className="p-6">

<h1 className="text-2xl font-bold">
Verify Certificate
</h1>


<input

className="border p-3 rounded mt-5 w-full"

placeholder="Enter credential ID"

value={credentialId}

onChange={(e)=>
setCredentialId(e.target.value)
}

/>


<button
 onClick={handleVerify}
 disabled={!credentialId.trim() || loading}
 className="mt-4 px-5 py-2 bg-black text-white rounded disabled:opacity-50"
>
 {loading ? "Checking..." : "Verify"}
</button>



{
result && (

<div className="mt-6 border rounded p-5">


{
result.valid ?

<>

<h2 className="text-green-900 font-bold">
Certificate Valid ✅
</h2>


<p>
Title: {result.certificate.title}
</p>


<p>
Name: {result.certificate.userName}
</p>


<p>
Credential:
{result.certificate.credentialId}
</p>


<p>
Issued:
{
new Date(
result.certificate.issuedAt
).toLocaleDateString()
}
</p>


</>

:

<h2 className="text-red-600">
Invalid Certificate ❌
</h2>

}


</div>

)

}


</div>

)

}