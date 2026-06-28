import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdArrowForward,
  MdAutoAwesome,
  MdCheckCircle,
  MdLock,
  MdMap,
  MdPlayCircleFilled,
  MdRestartAlt,
  MdSchool,
} from "react-icons/md";
import { getCourseById, getCourses } from "../../api/courses.api";
import { enrollInCourse } from "../../api/enrollment.api";
import { generateRoadmap, getUserRoadmap } from "../../api/roadmap.api";
import type { Course } from "../../types/courses.types";
import type { Roadmap as UserRoadmap, RoadmapCourse } from "../../types/roadmap";

type Question = {
  id: string;
  prompt: string;
  options: {
    label: string;
    value: string;
    signal: string[];
  }[];
};

type Recommendation = {
  course: Course;
  score: number;
  confidence: number;
  reasons: string[];
};

const questions: Question[] = [
  {
    id: "goal",
    prompt: "What kind of tech work sounds most exciting right now?",
    options: [
      {
        label: "Build websites and apps",
        value: "frontend",
        signal: ["frontend", "react", "javascript", "typescript", "web", "html", "css"],
      },
      {
        label: "Build APIs and server logic",
        value: "backend",
        signal: ["backend", "api", "server", "database", "django", "node", "python"],
      },
      {
        label: "Solve logic and data problems",
        value: "algorithms",
        signal: ["algorithm", "data structure", "problem", "python", "complexity"],
      },
    ],
  },
  {
    id: "level",
    prompt: "How comfortable are you with programming?",
    options: [
      {
        label: "I am just starting",
        value: "BEGINNER",
        signal: ["beginner", "introduction", "fundamentals", "basics"],
      },
      {
        label: "I know the basics",
        value: "INTERMEDIATE",
        signal: ["intermediate", "projects", "modules", "api"],
      },
      {
        label: "I want a challenge",
        value: "ADVANCED",
        signal: ["advanced", "system", "architecture", "deployment"],
      },
    ],
  },
  {
    id: "style",
    prompt: "How do you prefer to learn?",
    options: [
      {
        label: "Small guided lessons",
        value: "guided",
        signal: ["introduction", "fundamentals", "lesson", "basics"],
      },
      {
        label: "Hands-on projects",
        value: "project",
        signal: ["project", "build", "app", "portfolio"],
      },
      {
        label: "Practice and assessments",
        value: "practice",
        signal: ["quiz", "assessment", "algorithm", "challenge"],
      },
    ],
  },
  {
    id: "outcome",
    prompt: "What should the roadmap help you do first?",
    options: [
      {
        label: "Get job-ready foundations",
        value: "foundation",
        signal: ["fundamentals", "beginner", "introduction", "python"],
      },
      {
        label: "Create a portfolio project",
        value: "portfolio",
        signal: ["project", "frontend", "react", "fullstack"],
      },
      {
        label: "Understand real backend systems",
        value: "systems",
        signal: ["backend", "database", "api", "deployment"],
      },
    ],
  },
];

const normalize = (value: string) => value.toLowerCase();

const getCourseText = (course: Course) =>
  normalize(`${course.title} ${course.description} ${course.level}`);

const getRoadmapStatus = (roadmapCourse?: RoadmapCourse) => {
  if (!roadmapCourse) return "PENDING";
  return roadmapCourse.status;
};

export default function Roadmap() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [roadmap, setRoadmap] = useState<UserRoadmap | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoadmapWorkspace = async () => {
      try {
        setLoading(true);
        setError("");

        const coursesData = await getCourses();
        setCourses(coursesData);

        try {
          const roadmapData = await getUserRoadmap();
          setRoadmap(roadmapData);
        } catch (err: any) {
          if (err?.response?.status === 404) {
            const generated = await generateRoadmap();
            setRoadmap(generated);
          } else {
            throw err;
          }
        }
      } catch (err) {
        console.error("Failed to load roadmap workspace", err);
        setError("Could not load your AI roadmap workspace.");
      } finally {
        setLoading(false);
      }
    };

    loadRoadmapWorkspace();
  }, []);

  const selectedSignals = useMemo(
    () =>
      questions.flatMap((question) => {
        const selectedValue = answers[question.id];
        return question.options.find((option) => option.value === selectedValue)?.signal || [];
      }),
    [answers],
  );

  const recommendation = useMemo<Recommendation | null>(() => {
    if (!courses.length || selectedSignals.length < questions.length) return null;

    const scoredCourses = courses.map((course) => {
      const courseText = getCourseText(course);
      const score = selectedSignals.reduce(
        (total, signal) => total + (courseText.includes(signal) ? 1 : 0),
        0,
      );

      const levelAnswer = answers.level;
      const levelBoost = levelAnswer === course.level ? 3 : 0;

      return {
        course,
        score: score + levelBoost,
      };
    });

    const bestMatch = scoredCourses.sort((a, b) => b.score - a.score)[0];
    const maxScore = selectedSignals.length + 3;
    const confidence = Math.max(58, Math.min(96, Math.round((bestMatch.score / maxScore) * 100)));
    const selectedLabels = questions
      .map((question) => question.options.find((option) => option.value === answers[question.id])?.label)
      .filter(Boolean) as string[];

    return {
      course: bestMatch.course,
      score: bestMatch.score,
      confidence,
      reasons: selectedLabels,
    };
  }, [answers, courses, selectedSignals]);

  useEffect(() => {
    const loadRecommendedCourse = async () => {
      if (!recommendation) {
        setActiveCourse(null);
        return;
      }

      try {
        const course = await getCourseById(recommendation.course.id);
        setActiveCourse(course);
      } catch (err) {
        console.error("Failed to load recommended course details", err);
        setActiveCourse(recommendation.course);
      }
    };

    loadRecommendedCourse();
  }, [recommendation]);

  const roadmapCourses = useMemo(() => {
    if (!roadmap?.courses?.length) return [];

    return [...roadmap.courses]
      .sort((a, b) => a.order - b.order)
      .map((roadmapCourse) => {
        const course = courses.find((item) => item.id === roadmapCourse.courseId);
        return { ...roadmapCourse, course };
      });
  }, [courses, roadmap]);

  const answerQuestion = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const resetAdvisor = () => {
    setAnswers({});
    setActiveCourse(null);
  };

  const handleEnroll = async () => {
    const course = activeCourse || recommendation?.course;
    if (!course) return;

    try {
      setEnrolling(true);
      await enrollInCourse(course.id);

      const firstModule = course.modules?.sort((a, b) => a.order - b.order)[0];
      if (firstModule) {
        navigate(`/dashboard/courses/${course.id}/modules/${firstModule.id}`);
      } else {
        navigate(`/dashboard/courses/${course.id}`);
      }
    } catch (err) {
      console.error("Failed to enroll in recommended course", err);
      setError("Enrollment failed. Please try again from the course page.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-white/5 p-6 text-sm text-gray-500 dark:text-gray-400">
        Preparing your AI roadmap workspace...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-white/5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16423C] dark:text-[#E2FB6C]">
              <MdAutoAwesome size={16} />
              AI-centered course advisor
            </div>
            <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <MdMap className="text-[#16423C] dark:text-[#E2FB6C]" />
              My Learning Roadmap
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Answer a few intent questions, get a course-part recommendation, enroll, then jump straight into the first module.
            </p>
          </div>

          <button
            type="button"
            onClick={resetAdvisor}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 px-4 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <MdRestartAlt size={16} />
            Retake advisor
          </button>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-2xl border border-gray-200/70 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                  {index + 1}. {question.prompt}
                </h2>
                {answers[question.id] && (
                  <MdCheckCircle className="shrink-0 text-emerald-600 dark:text-[#E2FB6C]" size={18} />
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => answerQuestion(question.id, option.value)}
                      className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold transition-all ${
                        selected
                          ? "border-[#16423C] bg-[#16423C] text-white dark:border-[#E2FB6C] dark:bg-[#E2FB6C] dark:text-[#16423C]"
                          : "border-gray-200 text-gray-600 hover:border-[#16423C]/40 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:border-[#E2FB6C]/40 dark:hover:bg-white/5"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-200/70 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-[#6B8A85]">
                  Suggested course part
                </p>
                <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                  {recommendation ? recommendation.course.title : "Waiting for your answers"}
                </h2>
              </div>
              <div className="rounded-xl bg-[#16423C]/10 p-3 text-[#16423C] dark:bg-[#E2FB6C]/10 dark:text-[#E2FB6C]">
                <MdSchool size={22} />
              </div>
            </div>

            {recommendation ? (
              <div className="mt-4 space-y-4">
                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {recommendation.course.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 p-3 dark:bg-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">AI confidence</p>
                    <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                      {recommendation.confidence}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3 dark:bg-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Level</p>
                    <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                      {recommendation.course.level}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Why this matched</p>
                  {recommendation.reasons.map((reason) => (
                    <div key={reason} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <MdCheckCircle className="text-emerald-600 dark:text-[#E2FB6C]" size={14} />
                      {reason}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#16423C] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0f2f2a] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#E2FB6C] dark:text-[#16423C]"
                >
                  {enrolling ? "Enrolling..." : "Enroll and start module"}
                  {!enrolling && <MdArrowForward size={18} />}
                </button>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Complete the four prompts and the advisor will compare your intent with the backend course catalog.
              </p>
            )}
          </div>

          {activeCourse?.modules?.length ? (
            <div className="rounded-2xl border border-gray-200/70 bg-white p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-[#6B8A85]">
                First modules after enrollment
              </p>
              <div className="mt-4 space-y-3">
                {[...activeCourse.modules]
                  .sort((a, b) => a.order - b.order)
                  .slice(0, 4)
                  .map((module, index) => (
                    <Link
                      key={module.id}
                      to={`/dashboard/courses/${activeCourse.id}/modules/${module.id}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-3 py-3 text-xs font-semibold text-gray-600 transition-colors hover:border-[#16423C]/30 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:border-[#E2FB6C]/30 dark:hover:bg-white/5"
                    >
                      <span>
                        {index + 1}. {module.title}
                      </span>
                      <MdArrowForward size={15} />
                    </Link>
                  ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="rounded-2xl border border-gray-200/70 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-[#6B8A85]">
              Backend-generated roadmap
            </p>
            <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              Stored course path from `/api/v1/roadmap`
            </h2>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:bg-white/5 dark:text-gray-400">
            {roadmapCourses.length} steps
          </span>
        </div>

        <div className="relative mt-6 ml-4 space-y-5 border-l border-gray-200 pl-6 dark:border-white/10">
          {roadmapCourses.length ? (
            roadmapCourses.map((item, index) => {
              const status = getRoadmapStatus(item);
              const isActive = status === "IN_PROGRESS" || index === 0;

              return (
                <div key={item.id} className="relative">
                  <span className="absolute -left-[35px] top-1 rounded-full border border-gray-200 bg-white p-1 dark:border-white/10 dark:bg-[#0F2C28]">
                    {status === "COMPLETED" ? (
                      <MdCheckCircle className="text-emerald-600 dark:text-[#E2FB6C]" size={18} />
                    ) : isActive ? (
                      <MdPlayCircleFilled className="text-[#16423C] dark:text-[#E2FB6C]" size={18} />
                    ) : (
                      <MdLock className="text-gray-400" size={16} />
                    )}
                  </span>

                  <div
                    className={`rounded-2xl border p-4 ${
                      isActive
                        ? "border-[#16423C]/30 bg-[#16423C]/5 dark:border-[#E2FB6C]/30 dark:bg-[#E2FB6C]/5"
                        : "border-gray-200/70 bg-gray-50/60 dark:border-white/10 dark:bg-white/5"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Step {item.order}
                        </p>
                        <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                          {item.course?.title || `Course ${item.courseId}`}
                        </h3>
                        {item.course?.description && (
                          <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 dark:text-gray-400">
                            {item.course.description}
                          </p>
                        )}
                      </div>

                      {item.course && (
                        <Link
                          to={`/dashboard/courses/${item.course.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                        >
                          View course
                          <MdArrowForward size={15} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No backend roadmap has been returned yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
