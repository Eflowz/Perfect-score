import { useEffect } from "react";
import { useParams, Link, useNavigate, Outlet } from "react-router-dom";
import { useCourse } from "../../context/course/useCourse";
import {  MdCheckCircle, MdPlayCircleFilled, MdLock, MdArrowBack } from "react-icons/md";

export default function CourseLayout() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { selectedCourse, fetchCourseById, loading } = useCourse();

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-t-transparent border-[#16423C] dark:border-[#E2FB6C] rounded-full animate-spin" />
      </div>
    );
  }

  if (!selectedCourse) return <div className="p-6 text-center">Course not found.</div>;

  const modules = selectedCourse.modules || [];
  const currentModuleIndex = modules.findIndex((m) => m.id === moduleId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Workspace Sub Header */}
      <header className="h-14 border-b border-gray-200/80 dark:border-white/5 bg-white dark:bg-[#0F2C28] px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/courses"
            className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors"
          >
            <MdArrowBack size={16} />
          </Link>
          <span className="text-xs font-bold font-mono text-gray-400 dark:text-[#6B8A85] uppercase">
            {selectedCourse.title}
          </span>
        </div>
        <div className="text-xs font-mono text-gray-400">
          {modules.length} Modules Available
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Dynamic Sidebar (Image 3 style) */}
        <aside className="w-64 border-r border-gray-200/80 dark:border-white/5 bg-white dark:bg-[#0F2C28] overflow-y-auto hidden md:block shrink-0">
          <div className="p-4 border-b border-gray-100 dark:border-white/5">
            {/* <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <MdMap className="text-[#16423C] dark:text-[#E2FB6C]" /> Course Outline
            </h3> */}
          </div>
          <nav className="p-2 space-y-1">
            {modules.map((m, idx) => {
              const isActive = m.id === moduleId;
              const isPast = idx < currentModuleIndex;

              return (
                <button
                  key={m.id}
                  onClick={() => navigate(`/courses/${courseId}/modules/${m.id}`)}
                  className={`w-full flex items-center justify-between text-left p-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#16423C] text-white dark:text-[#E2FB6C] font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <span className="text-xs truncate max-w-45">{m.title}</span>
                  {isPast ? (
                    <MdCheckCircle className="text-emerald-600 dark:text-[#E2FB6C]" size={16} />
                  ) : isActive ? (
                    <MdPlayCircleFilled className="text-white dark:text-[#E2FB6C]" size={16} />
                  ) : (
                    <MdLock className="text-gray-300 dark:text-gray-600" size={14} />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Central Layout Outlet for Inner Views */}
        <main className="flex-1 flex overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}