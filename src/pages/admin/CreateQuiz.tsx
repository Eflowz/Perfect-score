import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";

import { createQuiz, updateQuiz } from "../../api/admin.quiz.api";
import { getQuizById } from "../../api/quiz.api";
import { getCourseById } from "../../api/courses.api";
import { getAccessToken } from "../../utlis/storage";
import type { Course } from "../../types/courses.types";

type Question = {
  type: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
};

const CreateQuiz = () => {
  const { id: courseId } = useParams();
  const [searchParams] = useSearchParams();
  const queryModuleId = searchParams.get("moduleId") || "";
  const quizId = searchParams.get("quizId") || "";

  const [course, setCourse] = useState<Course | null>(null);
  const [moduleId, setModuleId] = useState("");
  const [title, setTitle] = useState("");
  const [passingScore, setPassingScore] = useState(70);
  const [timeLimit, setTimeLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openModuleDropdown, setOpenModuleDropdown] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([
    {
      type: "multiple-choice",
      question: "",
      options: ["", "", ""],
      correctAnswer: "",
      explanation: "",
      points: 10,
    },
  ]);

  useEffect(() => {
    if (queryModuleId) setModuleId(queryModuleId);
  }, [queryModuleId]);

  // Fetch course modules
  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (error) {
        console.error("Failed to load course:", error);
      }
    };
    loadCourse();
  }, [courseId]);

  // Fetch existing quiz if editing
  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) return;
      try {
        setLoading(true);
        const data = await getQuizById(quizId);
        const quizData = data?.data || data;
        if (quizData) {
          setTitle(quizData.title || "");
          setPassingScore(quizData.passingScore ?? 70);
          setTimeLimit(quizData.timeLimit ?? 10);
          if (quizData.questions?.length > 0) {
            setQuestions(quizData.questions);
          }
          if (quizData.moduleId) {
            setModuleId(quizData.moduleId);
          }
        }
      } catch (error) {
        console.error("Failed to load quiz details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [quizId]);

  // Update question text/explanation
  const updateQuestion = <K extends keyof Question>(
    index: number,
    field: K,
    value: Question[K]
  ) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  // Update option text
  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  // Select correct answer
  const selectCorrectAnswer = (questionIndex: number, answer: string) => {
    const updated = [...questions];
    updated[questionIndex].correctAnswer = answer;
    setQuestions(updated);
  };

  // Add new option
  const addOption = (questionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].options.push("");
    setQuestions(updated);
  };

  // Remove option
  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updated);
  };

  // Add question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "multiple-choice",
        question: "",
        options: ["", "", ""],
        correctAnswer: "",
        explanation: "",
        points: 10,
      },
    ]);
  };

  // Remove question
  const removeQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!courseId) return console.log("Course id missing");
    if (!moduleId) return console.log("Select module first");

    try {
      setLoading(true);
      const payload = { moduleId, title, passingScore, timeLimit, questions };

      if (quizId) {
        const response = await updateQuiz(quizId, payload, getAccessToken() as string);
        console.log("Quiz updated:", response);
        alert("Quiz updated successfully");
      } else {
        const response = await createQuiz(courseId, payload);
        console.log("Quiz created:", response);
        alert("Quiz created successfully");
      }
    } catch (error) {
      console.error("Quiz submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {quizId ? "Edit Quiz" : "Create Quiz"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {quizId
            ? "Modify your multiple choice course assessment quiz"
            : "Build a multiple choice quiz for your course"}
        </p>
      </div>

      {/* QUIZ SETTINGS */}
      <div className="bg-white dark:bg-[#16423C] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quiz Information
        </h2>

        <input
          placeholder="Quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent p-3 outline-none focus:ring-2 focus:ring-[#16423C] dark:text-white"
        />

        {/* MODULE SELECT DROPDOWN */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenModuleDropdown(!openModuleDropdown)}
            className="w-full flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#16423C] p-3 text-left text-gray-700 dark:text-white transition"
          >
            <span>
              {moduleId
                ? course?.modules?.find((mod) => mod.id === moduleId)?.title
                : "Select Module"}
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${openModuleDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openModuleDropdown && (
            <div className="absolute z-50 mt-2 w-full py-2 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#16423C] shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
              {course?.modules?.map((module) => (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => {
                    setModuleId(module.id);
                    setOpenModuleDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-white hover:bg-[#16423C]/10 dark:hover:bg-white/10 transition"
                >
                  {module.title}
                </button>
              ))}
              {!course?.modules?.length && (
                <p className="p-4 text-sm text-gray-400">No modules available</p>
              )}
            </div>
          )}
        </div>

        {/* STAT COUNTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Passing Score Counter */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/10 p-3 bg-white dark:bg-transparent w-full">
            <span className="text-sm text-gray-500 dark:text-gray-400">Passing Score</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPassingScore((prev) => Math.max(0, prev - 1))}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition flex items-center justify-center"
              >
                <FaMinus size={12} />
              </button>
              <span className="font-semibold text-gray-900 dark:text-white min-w-8 text-center">
                {passingScore}%
              </span>
              <button
                type="button"
                onClick={() => setPassingScore((prev) => Math.min(100, prev + 1))}
                className="w-8 h-8 rounded-lg bg-[#16423C] text-white hover:opacity-90 transition flex items-center justify-center"
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* Time Limit Counter */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/10 p-3 bg-white dark:bg-transparent w-full">
            <span className="text-sm text-gray-500 dark:text-gray-400">Time Limit</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTimeLimit((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition flex items-center justify-center"
              >
                <FaMinus size={12} />
              </button>
              <span className="font-semibold text-gray-900 dark:text-white min-w-14 text-center">
                {timeLimit} min
              </span>
              <button
                type="button"
                onClick={() => setTimeLimit((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg bg-[#16423C] text-white hover:opacity-90 transition flex items-center justify-center"
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUESTIONS GENERATOR */}
      {questions.map((q, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#16423C] border border-gray-200 dark:border-white/10 rounded-3xl p-6 space-y-5 shadow-sm transition hover:-translate-y-1 duration-300"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg dark:text-white">Question {index + 1}</h2>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(index)}
                className="group w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
              >
                <FiTrash2 className="text-gray-400 group-hover:text-red-500 transition-colors" />
              </button>
            )}
          </div>

          <input
            placeholder="Enter question statement"
            value={q.question}
            onChange={(e) => updateQuestion(index, "question", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16423C] transition"
          />

          {/* OPTIONS MAP */}
          <div className="space-y-3">
            <p className="text-sm font-medium dark:text-white">Select correct answer</p>
            {q.options.map((option, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={q.correctAnswer === option && option !== ""}
                  onChange={() => selectCorrectAnswer(index, option)}
                  className="w-4 h-4 text-[#16423C] focus:ring-[#16423C]"
                />
                <span className="font-semibold text-gray-700 dark:text-white w-6">
                  {String.fromCharCode(65 + i)}.
                </span>
                <input
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  value={option}
                  onChange={(e) => updateOption(index, i, e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 dark:border-white/10 p-3 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-[#16423C]"
                />
                {q.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index, i)}
                    className="group w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm hover:scale-105 transition-all"
                  >
                    <FiTrash2 className="text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() => addOption(index)}
              className="flex items-center gap-2 text-sm text-[#16423C] dark:text-[#dcf36c] font-medium mt-1"
            >
              <FiPlus /> Add Option
            </button>
          </div>

          <textarea
            placeholder="Explanation for correct answer"
            value={q.explanation}
            onChange={(e) => updateQuestion(index, "explanation", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16423C] transition"
            rows={3}
          />

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
            <FiCheckCircle /> Points: {q.points}
          </div>
        </div>
      ))}

      {/* FOOTER ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={addQuestion}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-white/20 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition font-medium"
        >
          <FiPlus /> Add Question
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-[#16423C] text-white font-semibold hover:opacity-90 transition disabled:opacity-50 flex-1 sm:flex-none"
        >
          {loading
            ? quizId ? "Saving Changes..." : "Creating Quiz..."
            : quizId ? "Save Changes" : "Create Quiz"}
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;