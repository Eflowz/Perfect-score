import { Link } from "react-router-dom";
import { MdPlayArrow, MdMenuBook, MdDeleteOutline } from "react-icons/md"; 

interface ModuleItem {
  id: string;
  title: string;
}

interface CourseData {
  id: string;
  title: string;
  description?: string;
  category?: string;
  modules?: ModuleItem[];
}

interface CourseCardProps {
  course: CourseData;
  removeCourse?: (id: string) => void;
  isAdmin?: boolean; // Toggle true if you want to show administrative actions like delete
}

export default function CourseCard({ course, removeCourse, isAdmin = false }: CourseCardProps) {
  const totalModules = course.modules?.length || 0;
  
  // Safe default module link generation
  const firstModuleId = course.modules && course.modules.length > 0 ? course.modules[0].id : null;
  const targetLink = firstModuleId 
    ? `/dashboard/courses/${course.id}/modules/${firstModuleId}`
    : `/dashboard/courses/${course.id}`;

  return (
    <div className="group flex flex-col justify-between bg-white dark:bg-[#0F2C28] border border-gray-200/80 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-emerald-800/40 transition-all duration-300 h-64 relative overflow-hidden">
      
      {/* Decorative Subtle Background Glow Effect on Hover */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#E2FB6C]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top Header Card Metadata */}
        <div className="flex items-start justify-between gap-4">
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#16423C]/50 border border-gray-100 dark:border-white/5 text-[#16423C] dark:text-[#E2FB6C] shrink-0 group-hover:scale-105 transition-transform duration-300">
            <MdMenuBook size={20} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
              {course.category || "Get started"}
            </span>
            
            {/* Admin Controls Block */}
            {isAdmin && removeCourse && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (confirm("Are you sure you want to delete this course?")) {
                    removeCourse(course.id);
                  }
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Delete Course"
              >
                <MdDeleteOutline size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Content Title Segment */}
        <div className="mt-4 space-y-1.5">
          <h4 className="font-bold text-gray-900 dark:text-white text-base tracking-tight capitalize line-clamp-1 group-hover:text-[#16423C] dark:group-hover:text-[#E2FB6C] transition-colors duration-200">
            {course.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-2 leading-relaxed">
            {course.description || "Master the concepts step-by-step with specialized computer-based workspace lessons."}
          </p>
        </div>
      </div>

      {/* Footer Metrics Action Layer */}
      <div className="border-t border-gray-100 dark:border-white/5 pt-4 mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-[#6B8A85]">
            Syllabus Size
          </span>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
            {totalModules} {totalModules === 1 ? "Module" : "Modules"}
          </span>
        </div>

        <Link
          to={targetLink}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#0F2C28] text-xs font-bold hover:bg-[#0F2C28] dark:hover:bg-[#d0f04c] transition-colors shadow-sm select-none"
        >
          <span>Start Learning</span>
          <MdPlayArrow size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}