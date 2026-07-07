import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdMoreVert, MdEdit, MdDelete, MdQuiz } from "react-icons/md";
import type { Module } from "../../types/courses.types";

type ModuleCardProps = {
  module: Module;
  index: number;
  courseId: string;
  quizAvailable: boolean;
  isAdmin?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onManageQuiz?: () => void;
  onDeleteQuiz?: () => void;
};

export default function ModuleCard({
  module,
  index,
  courseId,
  quizAvailable,
  isAdmin = false,
  isActive = false,
  isCompleted = false,
  onSelect,
  onEdit,
  onDelete,
  onManageQuiz,
  onDeleteQuiz,
}: ModuleCardProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article
      className={`relative rounded-2xl border p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5 ${
        isActive
          ? "border-[#16423C] bg-[#f4f8f7] shadow-md dark:border-[#C5E89D] dark:bg-[#0e1a17]"
          : isCompleted
            ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-800/40 dark:bg-emerald-900/10"
            : "border-gray-200/70 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <Link
          to={isAdmin ? `/admin/courses/${courseId}` : `/dashboard/courses/${courseId}/modules/${module.id}`}
          onClick={() => onSelect?.()}
          className="flex-1 block group/link"
        >
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="rounded-full bg-[#16423C]/10 px-2.5 py-1 text-xs font-semibold text-[#16423C] dark:bg-[#dcf36c]/10 dark:text-[#dcf36c]">
              Module {index + 1}
            </span>
            <span className="text-xs">ID: {module.id}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 group-hover/link:text-[#16423C] dark:text-white dark:group-hover/link:text-[#dcf36c] transition-colors">
            {module.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {isActive && (
              <span className="rounded-full bg-[#16423C] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white dark:bg-[#C5E89D] dark:text-[#0a1a16]">
                Active
              </span>
            )}
            {isCompleted && (
              <span className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                Completed
              </span>
            )}
            {quizAvailable && (
              <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                Quiz available
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
            {module.content || "No content added yet for this module."}
          </p>
        </Link>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold ${
            quizAvailable
              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-transparent"
              : "bg-gray-50 text-gray-500 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-transparent"
          }`}>
            {quizAvailable ? "Quiz ready" : "No quiz"}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            Order {module.order}
          </span>

          {/* Admin dropdown menu */}
          {isAdmin && (
            <div className="relative mt-2" ref={menuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(!openMenu);
                }}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition text-gray-500 dark:text-gray-400"
              >
                <MdMoreVert size={20} />
              </button>

              {openMenu && (
                <div className="absolute right-0 top-8 w-44 bg-white dark:bg-[#0f2c28] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(false);
                      onEdit?.();
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                  >
                    <MdEdit size={14} className="text-gray-400" /> Edit Module
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(false);
                      onDelete?.();
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <MdDelete size={14} /> Delete Module
                  </button>

                  <div className="border-t border-gray-100 dark:border-white/5 my-1" />

                  {quizAvailable ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(false);
                        onDeleteQuiz?.();
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <MdDelete size={14} /> Delete Quiz
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(false);
                        onManageQuiz?.();
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                    >
                      <MdQuiz size={14} className="text-gray-400" /> Add Quiz
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}


