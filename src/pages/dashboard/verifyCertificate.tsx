import { useState, useEffect } from "react";
import type { VerifiedCertificate } from "../../types/certificates.types";
import { verifyCertificate } from "../../api/certificate.api";
import { 
  MdVerified, MdError, MdSearch, MdCheckCircle, MdCancel,MdPerson,MdSchool,MdDateRange,MdBadge,MdContentCopy,
  MdLocalPrintshop,MdArrowForward
} from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

export default function VerifyCertificate() {
  const [credentialId, setCredentialId] = useState("");
  const [result, setResult] = useState<VerifiedCertificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setCredentialId(id);
      handleVerify(id);
    }
  }, []);

  const handleVerify = async (id?: string) => {
    const credentialToVerify = id || credentialId;
    
    if (!credentialToVerify?.trim()) {
      setError("Please enter a credential ID");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const data = await verifyCertificate(credentialToVerify.trim());
      setResult(data);
      
      if (!id) {
        const url = new URL(window.location.href);
        url.searchParams.set("id", credentialToVerify.trim());
        window.history.pushState({}, "", url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify certificate.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* SaaS Layout Input Controller Header Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-white/2 border border-gray-200/80 dark:border-white/5 shadow-xs">
        <div className="max-w-md">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MdVerified className="text-[#16423C] dark:text-[#E2FB6C]" size={16} /> Secure Verification Node
          </h2>
          <p className="text-xs text-gray-400 dark:text-[#6B8A85] mt-1">
            Validate the cryptographic authenticity of a secure credential via key ledger parameters.
          </p>
        </div>

        {/* Dynamic Compact Search Input */}
        <div className="flex-1 max-w-md flex items-center gap-2 relative">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Enter credential ID (e.g., CERT-ABC-123)"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#16423C]/40 dark:focus:border-[#E2FB6C]/30 transition-colors"
              disabled={loading}
            />
          </div>
          <button
            onClick={() => handleVerify()}
            disabled={!credentialId.trim() || loading}
            className="px-4 py-2 text-xs font-semibold bg-[#16423C] dark:bg-[#16423C] hover:bg-[#0f2f2a] dark:hover:bg-[#1d4f48] text-white rounded-xl transition-all disabled:opacity-40 flex items-center gap-1.5 shrink-0"
          >
            {loading ? <FaSpinner className="animate-spin" size={12} /> : <MdArrowForward size={14} />}
            Verify
          </button>
        </div>
      </div>

      {/* Dynamic Errors Container Layout */}
      {error && (
        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center justify-between gap-3 text-xs text-red-600 dark:text-red-400">
          <div className="flex items-center gap-2">
            <MdError size={16} />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="font-semibold underline hover:opacity-80">Dismiss</button>
        </div>
      )}

      {/* Verification Profile Meta Block Sheet */}
      {result && (
        <div className="border border-gray-200/80 dark:border-white/5 bg-white dark:bg-white/1 rounded-2xl overflow-hidden shadow-xs animate-in slide-in-from-top-2 duration-300">
          
          {/* Header Banner Verification Status Indicator */}
          <div className={`px-6 py-4 border-b flex items-center justify-between gap-4 ${
            result.valid 
              ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-700 dark:text-emerald-400" 
              : "bg-red-500/5 border-red-500/10 text-red-600 dark:text-red-400"
          }`}>
            <div className="flex items-center gap-2.5">
              {result.valid ? <MdCheckCircle size={20} /> : <MdCancel size={20} />}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  {result.valid ? "Credential Record Authentic" : "Cryptographic Record Rejection"}
                </h3>
                <p className="text-[11px] opacity-80 mt-0.5">
                  {result.valid ? "Verified ledger integrity trace matches standard certification bounds." : "No cryptographic validation matching this identifier exists."}
                </p>
              </div>
            </div>

            {result.valid && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
                  title="Print Record"
                >
                  <MdLocalPrintshop size={14} />
                </button>
                <button
                  onClick={copyLink}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-1 text-[10px] font-mono"
                  title="Copy Direct URL Link"
                >
                  <MdContentCopy size={14} />
                  {copied && "Copied"}
                </button>
              </div>
            )}
          </div>

          {/* Secure Property Rows Ledger Details Meta Grid */}
          {result.valid && result.certificate && (
            <div className="p-2 divide-y divide-gray-100 dark:divide-white/5 text-xs">
              
              <div className="grid grid-cols-3 p-3 items-center">
                <div className="text-gray-400 dark:text-[#6B8A85] flex items-center gap-2 font-medium">
                  <MdSchool size={14} /> Course Title
                </div>
                <div className="col-span-2 text-gray-900 dark:text-white font-semibold">
                  {result.certificate.title}
                </div>
              </div>

              <div className="grid grid-cols-3 p-3 items-center">
                <div className="text-gray-400 dark:text-[#6B8A85] flex items-center gap-2 font-medium">
                  <MdPerson size={14} /> Authorized Recipient
                </div>
                <div className="col-span-2 text-gray-900 dark:text-white font-medium">
                  {result.certificate.userName}
                </div>
              </div>

              <div className="grid grid-cols-3 p-3 items-center">
                <div className="text-gray-400 dark:text-[#6B8A85] flex items-center gap-2 font-medium">
                  <MdBadge size={14} /> Cryptographic Hash
                </div>
                <div className="col-span-2 text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md w-fit text-[11px]">
                  {result.certificate.credentialId}
                </div>
              </div>

              <div className="grid grid-cols-3 p-3 items-center">
                <div className="text-gray-400 dark:text-[#6B8A85] flex items-center gap-2 font-medium">
                  <MdDateRange size={14} /> Signature Genesis
                </div>
                <div className="col-span-2 text-gray-900 dark:text-white font-medium">
                  {new Date(result.certificate.issuedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}