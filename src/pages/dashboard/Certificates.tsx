//import { MdWorkspacePremium, MdDownload, MdShare } from "react-icons/md";
import { useState, useEffect } from "react";
import { getMyCertificates } from "../../api/certificate.api";
import type { Certificate } from "../../types/certificates.types";
import { Link } from "react-router-dom";
import VerifyCertificate from "./verifyCertificate";
const Certificates = () => {
// dummy text 
  {/*
  const certificates = [
    {
      id: "C1",
      title: "Python Basics Certification",
      date: "June 2026",
      grade: "98%",
      hash: "PS-PY-883A9",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MdWorkspacePremium className="text-[#16423C] dark:text-[#E2FB6C]" />{" "}
          Certificates
        </h1>
        <p className="text-sm text-gray-500 dark:text-[#6B8A85] mt-1">
          View, download, and share your earned course certificates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-xl overflow-hidden flex flex-col justify-between h-72"
          >
        
            <div className="p-6 bg-gradient-to-br from-[#16423C] to-[#0A201C] text-white dark:from-[#11322D] dark:to-[#091D1A] flex flex-col justify-between flex-1">
              <div>
                <MdWorkspacePremium size={32} className="text-[#E2FB6C]" />
                <h3 className="text-sm font-bold mt-4 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-[10px] font-mono text-gray-300/80 mt-1">
                  Issued: {cert.date}
                </p>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-mono text-gray-300/60">
                  ID: {cert.hash}
                </span>
                <span className="text-xs font-bold font-mono bg-[#E2FB6C]/20 text-[#E2FB6C] px-2 py-0.5 rounded">
                  Grade: {cert.grade}
                </span>
              </div>
            </div>

            
            <div className="p-4 bg-gray-50 dark:bg-black/10 border-t border-gray-100 dark:border-white/5 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors">
                <MdDownload size={14} /> Download PDF
              </button>
              <button className="flex items-center justify-center p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors">
                <MdShare size={14} />
              </button>
            </div>
          </div>
        ))}

       
        <div className="border border-dashed border-gray-200 dark:border-white/10 rounded-2xl h-72 flex flex-col items-center justify-center p-6 text-center">
          <MdWorkspacePremium
            className="text-gray-300 dark:text-gray-700"
            size={40}
          />
          <h3 className="text-xs font-bold text-gray-400 dark:text-[#6B8A85] mt-3">
            More to Come!
          </h3>
          <p className="text-[10px] text-gray-400/80 max-w-xs mt-1">
            Complete the next module on Data Structures to unlock your
            Algorithms Certificate.
          </p>
        </div>
      </div>
    </div>
  );
*/ }

// api calls
const [certificates, setCertificates] = useState<Certificate[]>([]);
 const [loading, setLoading] = useState(true);


 useEffect(() => {

 const loadCertificates = async () => {

 try {

 setLoading(true);

 const data = await getMyCertificates();

 console.log(
 "🎓 My certificates:",
 data
 );


 setCertificates(data || []);


 } catch(err){

 console.log(
 "Failed loading certificates",
 err
 );

 } finally {

 setLoading(false);

 }

 };


 loadCertificates();

 }, []);


certificates.forEach(c => {
 console.log("CERT:", c);
});


 if(loading){
 return <p>Loading certificates...</p>
 }



 if(certificates.length === 0){

 return (
 <div>
 <h1 className="text-xl font-bold">
 Certificates
 </h1>

 <p className="mt-4 text-gray-500">
 No certificates available yet.
 </p>
 <VerifyCertificate />
 </div>
 )

 }

 

 return (

 <div>

 <h1 className="text-xl font-bold">
 My Certificates
 </h1>


 <div className="mt-5 space-y-4">

 {
 certificates.map((cert)=>(
 
 <div
 key={cert.id}
 className="border rounded-xl p-5"
 >

 <h2 className="font-semibold">
 {cert.title}
 </h2>
<Link
 to={`/verify-certificate?credentialId=${cert.credentialId}`}
 className="text-green-600 underline"
>
 Verify Certificate
</Link>

 <p>
 Credential ID:
 {cert.credentialId}
 </p>


 <p>
 Issued:
 {new Date(cert.issuedAt)
 .toLocaleDateString()}
 </p>


 <a
 href={cert.pdfUrl}
 target="_blank"
 className="text-green-900 underline"
 >
 View Certificate PDF
 </a>


 </div>

 ))
 }

 </div>

 </div>

 )
};

export default Certificates;
