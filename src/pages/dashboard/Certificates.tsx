import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdWorkspacePremium, MdDownload, MdShare, MdVerifiedUser } from "react-icons/md";
import { getMyCertificates } from "../../api/certificate.api";
import type { Certificate } from "../../types/certificates.types";

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setLoading(true);
        const data = await getMyCertificates();
        setCertificates(data || []);
      } catch (err) {
        console.error("Failed loading certificates", err);
      } finally {
        setLoading(false);
      }
    };
    loadCertificates();
  }, []);

  const handleShare = (credentialId: string) => {
    const url = `${window.location.origin}/dashboard/verify-certificate?id=${credentialId}`;
    if (navigator.share) {
      navigator.share({ title: "My Certificate", url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert("Verification link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MdWorkspacePremium className="text-[#16423C] dark:text-[#E2FB6C]" />
            Certificates
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#6B8A85] mt-1">
            View, download, and share your earned course certificates.
          </p>
        </div>
      </div>

      {loading ? (
        /* Loading Grid Placeholder Shell */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="h-72 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        /* Active View Core Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => {
            const dateDisplay = cert.issuedAt 
              ? new Date(cert.issuedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
              : "Recent";

            return (
              <div
                key={cert.id}
                className="bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-xl overflow-hidden flex flex-col justify-between h-72 group transition-all duration-300 hover:-translate-y-1"
              >
                {/* Certificate Core Banner Badge */}
                <div className="p-6 bg-linear-to-br from-[#16423C] to-[#0A201C] text-white dark:from-[#11322D] dark:to-[#091D1A] flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <MdWorkspacePremium size={32} className="text-[#E2FB6C]" />
                      <Link 
                        to={`/dashboard/verify-certificate?id=${cert.credentialId}`}
                        className="text-[10px] flex items-center gap-1 bg-white/10 dark:bg-white/5 px-2 py-1 rounded-lg hover:bg-white/20 text-[#E2FB6C] transition-all"
                      >
                        <MdVerifiedUser size={12} /> Verify Securely
                      </Link>
                    </div>
                    <h3 className="text-base font-bold mt-4 leading-snug tracking-tight line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-300/80 mt-1">
                      Issued: {dateDisplay}
                    </p>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/10 pt-3">
                    <span className="text-[9px] font-mono text-gray-400/80 truncate max-w-37.5">
                      ID: {cert.credentialId}
                    </span>
                  
                  </div>
                </div>

                {/* Footer Dynamic Action Links */}
                <div className="p-4 bg-gray-50 dark:bg-black/10 border-t border-gray-100 dark:border-white/5 flex gap-2">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors shadow-sm"
                  >
                    <MdDownload size={14} /> View PDF
                  </a>
                  <button
                    onClick={() => handleShare(cert.credentialId)}
                    className="flex items-center justify-center p-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors shadow-sm"
                    title="Share Verification Link"
                  >
                    <MdShare size={14} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Interactive Gamification Locked Card Overlay */}
          <div className="border border-dashed border-gray-300 dark:border-white/10 bg-gray-50/30 dark:bg-transparent rounded-2xl h-72 flex flex-col items-center justify-center p-6 text-center">
            <div className="p-3 rounded-full bg-gray-100 dark:bg-white/5">
              <MdWorkspacePremium className="text-gray-400 dark:text-gray-600" size={32} />
            </div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-4">
              {certificates.length === 0 ? "Unlock Your First Honor!" : "Next Achievement Awaits!"}
            </h3>
            <p className="text-xs text-gray-400 dark:text-[#6B8A85] max-w-xs mt-1.5 leading-relaxed">
              Complete your next core data course tracks and score above 90% to generate a dynamic certification record here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
