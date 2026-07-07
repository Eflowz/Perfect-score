import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCourse } from "../../context/course/useCourse";
import { getCourseQuizzes } from "../../api/quiz.api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  MdChevronLeft,
  MdChevronRight,
  MdQuiz,
} from "react-icons/md";
import CompleteButton from "../progress/progress";
import LessonSkeleton from "./LessonSkeleton";

const isVideoUrl = (str: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  if (trimmed.includes("\n")) return false;
  const isYoutube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(trimmed);
  const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed);
  return isYoutube || isDirectVideo;
};

const isYoutubeUrl = (url: string): boolean => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url.trim());
};

const getYoutubeEmbedUrl = (url: string): string => {
  const trimmed = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : trimmed;
};

export default function LessonPage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { selectedCourse, fetchCourseById, loading } = useCourse();
  const [courseQuizzes, setCourseQuizzes] = useState<any[]>([]);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [activeQuizLoading, setActiveQuizLoading] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    const loadQuizzes = async () => {
      if (!courseId) return;
      try {
        const data = await getCourseQuizzes(courseId);
        setCourseQuizzes(data || []);
      } catch (error) {
        console.error("Failed to load module quizzes:", error);
      }
    };
    loadQuizzes();
  }, [courseId]);

  useEffect(() => {
    if (selectedCourse && moduleId) {
      setLessonCompleted(false);
      setActiveQuiz(null);
      setActiveQuizLoading(false);
      setQuizAnswers([]);
      setQuizSubmitted(false);
      setQuizScore(null);
    }
  }, [selectedCourse, moduleId]);

  const modules = selectedCourse?.modules || [];
  const currentIndex = modules.findIndex((m) => m.id === moduleId);
  const currentNumber = currentIndex + 1;
  const totalModules = modules.length;
  const prevModule = modules[currentIndex - 1];
  const nextModule = modules[currentIndex + 1];
  const currentModule = modules[currentIndex];
  const currentModuleQuizzes = currentModule
    ? courseQuizzes.filter((quiz) => quiz.moduleId === currentModule.id)
    : [];

  useEffect(() => {
    const currentQuizId = currentModuleQuizzes[0]?.id;

    if (!currentQuizId) {
      setActiveQuiz(null);
      setQuizAnswers([]);
      setQuizSubmitted(false);
      setQuizScore(null);
      return;
    }

    const loadQuizDetails = async () => {
      setActiveQuizLoading(true);
      try {
        const data = await getCourseQuizzes(courseId!);
        const matchingQuiz = data?.find((quiz: any) => quiz.id === currentQuizId);
        if (matchingQuiz) {
          setActiveQuiz(matchingQuiz);
          setQuizAnswers(new Array(matchingQuiz.questions?.length || 0).fill(""));
        } else {
          setActiveQuiz(null);
        }
      } catch (error) {
        console.error("Failed to load quiz details:", error);
      } finally {
        setActiveQuizLoading(false);
      }
    };

    loadQuizDetails();
  }, [courseId, currentModuleQuizzes]);

  if (loading || !selectedCourse) {
    return <LessonSkeleton />;
  }

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setQuizAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz?.questions?.length) {
      setQuizSubmitted(true);
      setQuizScore(0);
      setLessonCompleted(true);
      return;
    }

    const totalQuestions = activeQuiz.questions.length;
    const correctCount = activeQuiz.questions.reduce((count: number, question: any, index: number) => {
      const selectedAnswer = quizAnswers[index];
      const correctAnswer = question.correctAnswer || question.answer || question.correct;
      return count + (selectedAnswer && selectedAnswer === correctAnswer ? 1 : 0);
    }, 0);

    setQuizSubmitted(true);
    setQuizScore(Math.round((correctCount / totalQuestions) * 100));
    setLessonCompleted(true);
  };

  if (currentIndex === -1 || !currentModule) {
    return (
      <div className="min-h-screen bg-[#faf9f7] dark:bg-[#0a0f0e] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Module not found
        </p>
        <Link
          to={`/dashboard/courses/${courseId}`}
          className="mt-4 text-sm font-medium text-[#16423C] dark:text-[#C5E89D] hover:underline underline-offset-4"
        >
          ← Back to Course
        </Link>
      </div>
    );
  }

  const progressPercent = (currentNumber / totalModules) * 100;

  const markdownRenderers = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <div className="relative group my-6 rounded-lg overflow-hidden border border-gray-200/60 dark:border-white/6 bg-[#f6f5f4] dark:bg-[#111a18]">
          <div className="flex items-center justify-between px-4 py-2 bg-white/50 dark:bg-white/3 border-b border-gray-200/40 dark:border-white/5">
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {match[1]}
            </span>
          </div>
          <pre className="p-5 overflow-auto text-[13px] leading-relaxed font-mono text-gray-700 dark:text-gray-300 bg-transparent">
            <code>{children}</code>
          </pre>
        </div>
      ) : (
        <code
          className={`${className} px-1.5 py-0.5 rounded-md bg-[#f0efed] dark:bg-white/6 text-[#7c3aed] dark:text-[#C5E89D] font-mono text-[13px]`}
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-transparent text-gray-800 dark:text-gray-200 flex flex-col">
      {/* Progress Header */}
      <header className="h-12 border-b border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-white/2 backdrop-blur-sm px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Module {currentNumber} of {totalModules}
          </span>
          <div className="w-24 h-1 bg-gray-200/60 dark:bg-white/6 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-[#16423C] dark:bg-[#C5E89D] rounded-full transition-all duration-500 ease-out"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span>{progressPercent.toFixed(0)}% complete</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 lg:px-10 lg:py-12 space-y-10">
          {/* Module Header */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white leading-snug tracking-tight">
              {currentModule.title}
            </h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Work through the lesson content at your own pace. Mark the module
              complete when you're confident with the material.
            </p>
          </div>

          {/* Lesson Content */}
          <div className="prose prose-sm lg:prose-base dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-[#16423C] dark:prose-a:text-[#C5E89D] prose-strong:text-gray-900 dark:prose-strong:text-white">
            {isVideoUrl(currentModule.content) ? (
              <div className="w-full max-w-4xl mx-auto rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#111a18] shadow-2xl overflow-hidden my-6 animate-fade-in">
                {/* Simulated Casing */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/3 border-b border-gray-200/50 dark:border-white/5">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400 block"></span>
                  </div>
                  <div className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16423C] dark:bg-[#C5E89D] animate-pulse"></span>
                    Interactive Video Lesson
                  </div>
                  <div className="w-12"></div>
                </div>
                <div className="relative aspect-video bg-black">
                  {isYoutubeUrl(currentModule.content) ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={getYoutubeEmbedUrl(currentModule.content)}
                      title={currentModule.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={currentModule.content.trim()}
                      controls
                    />
                  )}
                </div>
              </div>
            ) : /<[a-z][\s\S]*>/i.test(currentModule.content) ? (
              <div 
                className="animate-fade-in"
                dangerouslySetInnerHTML={{ __html: currentModule.content }}
              />
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownRenderers}
              >
                {currentModule.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Actions Section */}
          <div className="space-y-5 pt-4 border-t border-gray-200/60 dark:border-white/6">
            {/* Inline Quiz Card */}
            {currentModuleQuizzes.length > 0 && (
              <div className="rounded-xl border border-[#16423C]/10 bg-[#f0f7f4] p-5 dark:border-[#C5E89D]/10 dark:bg-[#0d1a17]">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-[#16423C]/10 p-2 dark:bg-[#C5E89D]/10">
                    <MdQuiz className="text-[#16423C] dark:text-[#C5E89D]" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Module Quiz
                    </h3>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      Complete this short quiz before moving on to the next lesson.
                    </p>
                  </div>
                </div>

                {activeQuizLoading ? (
                  <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                    Loading quiz…
                  </div>
                ) : activeQuiz ? (
                  <div className="mt-5 space-y-4">
                    {activeQuiz.questions?.map((question: any, index: number) => {
                      const correctAnswer = question.correctAnswer || question.answer || question.correct;

                      return (
                        <div
                          key={question.id || `${question.question}-${index}`}
                          className="rounded-lg border border-gray-200/70 bg-white/70 p-4 dark:border-white/8 dark:bg-white/4"
                        >
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {index + 1}. {question.question}
                          </p>
                          <div className="mt-3 space-y-2">
                            {(question.options || []).map((option: string) => {
                              const selected = quizAnswers[index] === option;
                              const isCorrect = quizSubmitted && option === correctAnswer;

                              return (
                                <label
                                  key={option}
                                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                                    selected
                                      ? "border-[#16423C] bg-[#16423C]/5 text-[#16423C] dark:border-[#C5E89D] dark:bg-[#C5E89D]/10 dark:text-[#C5E89D]"
                                      : "border-gray-200/70 text-gray-600 hover:bg-gray-50 dark:border-white/8 dark:text-gray-300 dark:hover:bg-white/5"
                                  } ${quizSubmitted && isCorrect ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : ""}`}
                                >
                                  <input
                                    type="radio"
                                    name={`quiz-${activeQuiz.id}-${index}`}
                                    checked={selected}
                                    onChange={() => handleAnswerChange(index, option)}
                                    disabled={quizSubmitted}
                                    className="accent-[#16423C]"
                                  />
                                  <span>{option}</span>
                                  {quizSubmitted && isCorrect && <span className="ml-auto text-xs">✓</span>}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {!quizSubmitted ? (
                      <button
                        onClick={handleSubmitQuiz}
                        className="rounded-lg bg-[#16423C] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-[#C5E89D] dark:text-[#0a1a16]"
                      >
                        Submit Quiz
                      </button>
                    ) : (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 text-sm text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-900/20 dark:text-emerald-300">
                        Quiz complete. You scored {quizScore}% and can continue to the next lesson when ready.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                    Quiz details are not available yet.
                  </div>
                )}
              </div>
            )}

            {/* Completion Section */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Complete Module
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Mark as done 
                </p>
              </div>
              <CompleteButton
                moduleId={currentModule.id}
                onComplete={() => setLessonCompleted(true)}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200/60 dark:border-white/6">
            <button
              onClick={() => {
                if (prevModule)
                  navigate(
                    `/dashboard/courses/${courseId}/modules/${prevModule.id}`
                  );
              }}
              disabled={!prevModule}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                prevModule
                  ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/4"
                  : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
              }`}
            >
              <MdChevronLeft size={18} />
              Previous
            </button>

            <button
              onClick={() => {
                if (nextModule)
                  navigate(
                    `/dashboard/courses/${courseId}/modules/${nextModule.id}`
                  );
              }}
              disabled={!nextModule || !lessonCompleted}
              className={`flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
                nextModule && lessonCompleted
                  ? "bg-[#16423C] dark:bg-[#C5E89D] text-white dark:text-[#0a1a16] hover:opacity-90 shadow-sm"
                  : "bg-gray-100 dark:bg-white/3 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              }`}
            >
              Next
              <MdChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}