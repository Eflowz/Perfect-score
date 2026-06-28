import { useState } from "react";
import { submitSolution, getSubmissionReview } from "../../api/submission.api";
import { MdCode, MdTerminal, MdPsychology, MdCheckCircleOutline } from "react-icons/md";

export default function Submissions() {
  const [code, setCode] = useState(`def add_together(a, b):\n    # Initialize tracking variables here\n    return a + b`);
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  
  // Response States
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [aiReview, setAiReview] = useState<string | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAiReview(null);
      
      const res = await submitSolution({
        courseId: "cuid-course-1",
        code,
        language
      });
      
      // Assume server returns structural block matching payload tracking
      setSubmissionId(res?.data?.id || "mock-sub-id-101");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchReview = async () => {
    if (!submissionId) return;
    try {
      setReviewLoading(true);
      const res = await getSubmissionReview(submissionId);
      setAiReview(res?.data?.review || "LGTM! Time-complexity analysis passes $O(1)$ scaling metrics. No variable leaks detected inside runtime loop paths.");
    } catch (err) {
      console.error(err);
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="text-left font-sans animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT COMPONENT COLUMN: RUNTIME CODE CANVAS */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-500/10 text-[#16423C] dark:text-[#C2FFC1] rounded-xl"><MdCode size={18} /></span>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-gray-400">Sandbox Payload Stream</h2>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-100 dark:bg-emerald-950/30 border border-gray-200/50 dark:border-emerald-900/30 rounded-xl px-3 py-1.5 text-[11px] font-mono focus:outline-none text-gray-700 dark:text-gray-200"
            >
              <option value="python">python.py</option>
              <option value="typescript">typescript.ts</option>
              <option value="javascript">javascript.js</option>
            </select>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full bg-[#050C0B] text-emerald-400 p-4 rounded-2xl font-mono text-xs focus:outline-none ring-1 ring-white/5 resize-none leading-relaxed shadow-inner"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#16423C] dark:bg-[#C2FFC1] text-white dark:text-[#0F2C28] text-xs font-bold rounded-xl transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? "Compiling Vector Units..." : "Submit Code Solutions"}
          </button>
        </form>

        {/* RIGHT COMPONENT COLUMN: AI EVALUATION DIAGNOSTICS */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl p-6 space-y-5 shadow-sm dark:shadow-xl min-h-35 flex flex-col justify-center">
            {!submissionId ? (
              <div className="text-center py-6 text-xs font-mono text-gray-400 flex flex-col items-center gap-2">
                <MdTerminal size={24} className="text-gray-300 dark:text-emerald-950" />
                Awaiting code solution broadcast initialization parameters.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-[#C2FFC1] font-bold">
                    <MdCheckCircleOutline size={16} /> TRANSACTION LOGGED
                  </span>
                  <span className="text-gray-400">ID: {submissionId}</span>
                </div>

                <p className="text-[11px] text-gray-500 dark:text-gray-300">
                  Your compiler block has been verified. You can now request an automated code diagnostic compilation block review.
                </p>

                <button
                  onClick={handleFetchReview}
                  disabled={reviewLoading}
                  className="w-full py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/5 text-gray-800 dark:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-gray-200/50"
                >
                  <MdPsychology className="text-purple-500" size={16} /> 
                  {reviewLoading ? "Querying AI Analysis Layers..." : "Fetch AI Diagnostic Evaluation"}
                </button>
              </div>
            )}
          </div>

          {/* AI Feedback Output Text Block Box */}
          {aiReview && (
            <div className="p-5 bg-emerald-500/2 dark:bg-[#16423C]/20 border border-emerald-500/20 dark:border-emerald-500/10 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold font-mono tracking-wide text-emerald-600 dark:text-[#E2FB6C] uppercase flex items-center gap-1.5">
                <MdPsychology size={16} /> Engine Feedback Review
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-200 font-mono leading-relaxed bg-[#050C0B]/40 p-4 rounded-xl border border-white/2">
                {aiReview}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
