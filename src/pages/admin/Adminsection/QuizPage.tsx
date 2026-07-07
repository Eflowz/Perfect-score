import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById, submitQuiz } from "../../../api/quiz.api";
import { 
  MdCheckCircle, 
  MdAccessTime, 
  MdWorkspacePremium, 
  MdChevronLeft, 
  MdErrorOutline, 
  MdFlashOn 
} from "react-icons/md";

const letters = ["A", "B", "C", "D", "E"];

interface Question {
  question: string;
  options: string[];
}

interface Quiz {
  title: string;
  timeLimit: number;
  passingScore: number;
  questions: Question[];
}

interface QuizResult {
  score: number;
  passed: boolean;
  xpAwarded: number;
}

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getQuizById(id);
        const quizData = data?.data || data; // Handle raw or wrapped response envelopes
        setQuiz(quizData);
        setAnswers(new Array(quizData.questions?.length || 0).fill(""));
      } catch (error) {
        console.error("Failed loading quiz metadata:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [id]);

  const selectAnswer = (questionIndex: number, answer: string) => {
    if (result) return; // Prevent selection changes post-submission
    const updated = [...answers];
    updated[questionIndex] = answer;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!id || isSubmitting) return;
    try {
      setIsSubmitting(true);
      const data = await submitQuiz(id, answers);
      const submissionResult = data?.data || data;
      setResult(submissionResult);
    } catch (error) {
      console.error("Error submitting quiz results:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-4 border-[#16423C] dark:border-[#E2FB6C] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-mono tracking-wider text-gray-500 dark:text-[#6B8A85]">
            GETTING ASSESSMENT READY...
          </p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
        <MdErrorOutline className="text-rose-500 mb-3" size={32} />
        <p className="text-sm font-bold text-gray-800 dark:text-white">Quiz not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-xs font-bold text-[#16423C] dark:text-[#E2FB6C] hover:underline cursor-pointer"
        >
          Return to Lesson Outlines
        </button>
      </div>
    );
  }

  const allAnswered = answers.every((ans) => ans !== "");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 antialiased transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 text-left">
        
        {/* TOP COMPONENT HEADER BLOCK */}
        <div className="p-6 bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-3xl shadow-sm dark:shadow-xl space-y-4 relative overflow-hidden transition-all duration-200">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#E2FB6C]/5 rounded-full blur-2xl pointer-events-none" />
          
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-900 dark:hover:text-[#E2FB6C] transition-colors cursor-pointer"
          >
            <MdChevronLeft /> Back to Workspace
          </button>

          <div>
            <span className="text-[10px] font-bold font-mono tracking-widest text-[#16423C] dark:text-[#E2FB6C] uppercase bg-[#16423C]/10 dark:bg-[#E2FB6C]/10 px-2.5 py-1 rounded-md">
              Knowledge Validation
            </span>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-950 dark:text-white mt-3 tracking-tight leading-tight">
              {quiz.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-mono font-bold text-gray-500 dark:text-gray-300 pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5">
              <MdAccessTime className="text-blue-500" />
              <span>{quiz.timeLimit} Minutes Allocation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5">
              <MdWorkspacePremium className="text-amber-500" />
              <span>Passing Threshold: {quiz.passingScore}%</span>
            </div>
          </div>
        </div>

        {/* QUESTIONS STACK */}
        <div className="space-y-4">
          {quiz.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-3xl p-6 shadow-sm dark:shadow-xl space-y-4 transition-all duration-150"
            >
              {/* Question Headline */}
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-150 dark:border-white/10 text-xs font-bold text-[#16423C] dark:text-[#E2FB6C] font-mono flex items-center justify-center shrink-0 shadow-sm">
                  {String(qIndex + 1).padStart(2, "0")}
                </span>
                <p className="font-bold text-sm lg:text-base text-gray-900 dark:text-white leading-relaxed pt-0.5">
                  {q.question}
                </p>
              </div>

              {/* Dynamic Answer Selector Trays */}
              <div className="space-y-2">
                {q.options.map((option, optIndex) => {
                  const isSelected = answers[qIndex] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={Boolean(result)}
                      onClick={() => selectAnswer(qIndex, option)}
                      className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 select-none ${
                        result ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50/50 dark:hover:bg-white/2"
                      } ${
                        isSelected
                          ? "bg-[#16423C] border-[#16423C] text-white dark:bg-[#E2FB6C] dark:border-[#E2FB6C] dark:text-[#16423C] font-bold shadow-md scale-[1.005]"
                          : "bg-white dark:bg-black/10 border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center border transition-all ${
                          isSelected
                            ? "bg-white text-[#16423C] border-transparent dark:bg-[#16423C] dark:text-[#E2FB6C]"
                            : "bg-gray-50 dark:bg-black/30 text-gray-400 border-gray-200 dark:border-white/10"
                        }`}>
                          {letters[optIndex]}
                        </span>
                        <span className="text-xs font-medium leading-relaxed">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION TRIGGERS */}
        {!result && (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || isSubmitting}
            className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
              allAnswered && !isSubmitting
                ? "bg-[#16423C] hover:bg-[#102e2b] text-white dark:bg-[#E2FB6C] dark:text-[#16423C] dark:hover:bg-[#d4f358] cursor-pointer"
                : "bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Locking Answers..." : "Submit Completed Evaluation"}
          </button>
        )}

        {/* HIGH-DENSITY RESULT SCORECARD VIEW */}
        {result && (
          <div className="rounded-3xl bg-white dark:bg-[#16423C] border border-gray-200/80 dark:border-white/5 p-6 shadow-xl space-y-6 text-left relative overflow-hidden animate-fade-in">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-[#E2FB6C]">
              <MdCheckCircle size={24} />
              <h2 className="text-base font-bold font-mono uppercase tracking-wider">
                Evaluation Metrics Finalized
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 font-mono">
              <div className="bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Accuracy</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white mt-1 block">
                  {result.score}%
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Status</span>
                <span className={`text-xs font-bold uppercase tracking-wider mt-2.5 inline-block px-3 py-0.5 rounded-md ${
                  result.passed
                    ? "bg-emerald-500/10 text-emerald-600 dark:bg-[#E2FB6C]/10 dark:text-[#E2FB6C]"
                    : "bg-rose-500/10 text-rose-500"
                }`}>
                  {result.passed ? "Passed" : "Failed"}
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">XP Awarded</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white mt-1 flex items-center justify-center gap-1">
                  <MdFlashOn className="text-amber-500" size={16} />
                  {result.xpAwarded}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-gray-400 dark:text-[#6B8A85] leading-relaxed font-medium">
                {result.passed
                  ? "Syllabus checkpoints cleared. You may return to the course workspace to unlock future modules."
                  : "Review the instructional materials again to shore up your scores and pass evaluation check paths."}
              </p>
              
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 bg-gray-900 text-white dark:bg-white dark:text-[#16423C] text-xs font-bold rounded-xl transition duration-150 whitespace-nowrap hover:opacity-90 cursor-pointer text-center"
              >
                Return to Modules
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuizPage;