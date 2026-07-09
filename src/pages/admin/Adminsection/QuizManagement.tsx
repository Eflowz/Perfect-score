import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdQuiz, MdAdd } from "react-icons/md";
import { getCourses } from "../../../api/courses.api";
import { getCourseQuizzes } from "../../../api/quiz.api";
import { useAuth } from "../../../context/auth/useAuth";

interface Quiz {
  id: string;
  title: string;
  passingScore: number;
  timeLimit: number;
  moduleId: string;
}

interface Course {
  id: string;
  title: string;
  quizzes?: Quiz[];
}

const QuizManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getCourses();

        // Get quizzes for every course concurrently
        const coursesWithQuizzes = await Promise.all(
          coursesData.map(async (course: Course) => {
            const quizzes = await getCourseQuizzes(course.id);
            return { ...course, quizzes };
          })
        );

        console.log("Courses with quizzes:", coursesWithQuizzes);
        setCourses(coursesWithQuizzes);
      } catch (err) {
        console.error("Failed to load quizzes:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) return <QuizSkeleton />;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16423C] to-[#1d6158] p-6 md:p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur">
              <MdQuiz className="text-2xl" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Quiz Management</h1>
          </div>
          <p className="text-white/70 text-sm md:text-base">
            Create, manage and monitor course assessments
          </p>
        </div>
      </div>

      {/* COURSES */}
      <div className="grid gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#102f2b] p-5 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* COURSE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#16423C]/10 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition">
                  <MdQuiz className="text-xl text-[#16423C] dark:text-[#dcf36c]" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">
                    {course.title}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {course.quizzes?.length || 0} quizzes available
                  </p>
                </div>
              </div>

              {/* CREATE BUTTON */}
              <button
                onClick={() => navigate(`/admin/courses/${course.id}/create-quiz`)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#16423C] hover:bg-[#1d6158] text-white text-sm font-medium shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <MdAdd />
                Create Quiz
              </button>
            </div>

            {/* QUIZZES LIST */}
            <div className="mt-6 space-y-3">
              {course.quizzes && course.quizzes.length > 0 ? (
                course.quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-4 md:p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {quiz.title}
                        </h3>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-medium">
                          ACTIVE
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Passing score: {quiz.passingScore}% • {quiz.timeLimit} minutes
                      </p>
                    </div>

                    {/* ACTION BUTTON */}
                    <button
                      onClick={() =>
                        role === "SUPER_ADMIN"
                          ? navigate(`/admin/courses/${course.id}/create-quiz?quizId=${quiz.id}&moduleId=${quiz.moduleId}`)
                          : navigate(`/dashboard/quiz/${quiz.id}`)
                      }
                      className="px-5 py-2.5 rounded-xl bg-[#16423C] dark:bg-[#dcf36c] text-white dark:text-[#16423C] text-sm font-medium hover:scale-105 transition active:scale-95"
                    >
                      {role === "SUPER_ADMIN" ? "Manage Quiz" : "Start Quiz"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center rounded-2xl border border-dashed border-gray-300 dark:border-white/20">
                  <MdQuiz className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">No quizzes created yet</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* SUB-COMPONENT: LOADING SKELETON */
const QuizSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {/* Header Skeleton */}
    <div className="rounded-3xl bg-white dark:bg-[#102f2b] border border-gray-200 dark:border-white/10 p-6 md:p-8">
      <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-white/10 mb-3" />
      <div className="h-4 w-96 max-w-full rounded-lg bg-gray-200 dark:bg-white/10" />
    </div>

    {/* Course Card Skeletons */}
    {[1, 2, 3].map((item) => (
      <div key={item} className="rounded-3xl bg-white dark:bg-[#102f2b] border border-gray-200 dark:border-white/10 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-200 dark:bg-white/10" />
            <div>
              <div className="h-5 w-40 rounded bg-gray-200 dark:bg-white/10 mb-2" />
              <div className="h-3 w-24 rounded bg-gray-200 dark:bg-white/10" />
            </div>
          </div>
          <div className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-white/10" />
        </div>
        {/* Quiz skeleton */}
        <div className="mt-6 h-20 rounded-2xl bg-gray-100 dark:bg-white/5" />
      </div>
    ))}
  </div>
);

export default QuizManagement;