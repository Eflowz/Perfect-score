import { FaLongArrowAltRight } from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import { deleteCourse, updateCourse } from "../../api/courses.api";
//import { getAccessToken } from "../../utlis/storage";
import type { Course } from "../../types/courses.types";
import { getAccessToken } from "../../utlis/storage";
import { useAuth } from "../../context/auth/useAuth";
//import EditCourse from "../../pages/admin/EditCourse";
import { useState } from "react";
import EditCourseDrawer from "../../pages/admin/EditCourseDrawer";

type Props = {
  course: Course;
  removeCourse: (id: string) => void;
 
};

export default function CourseCard({ course, removeCourse}: Props) {
  const { user } = useAuth();
  const params =useParams
  console.log("aram:", params)
  const role = user?.role;
  const handleDelete = async (course: Course) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCourse(course.id, getAccessToken() as string);

      // update UI immediately
      removeCourse(course.id);

      alert("Course deleted successfully");
    } catch (error: any) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <>
      
      {/* Grid */}
      <div>
        <div className="group relative flex flex-col animate-fade-in bg-white dark:bg-white/5 border border-gray-100 dark:border-white/8 rounded-2xl px-5 pt-4 pb-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* TOP ROW: Badge + Order + Admin actions */}
          <div className="flex items-center justify-between gap-2">
            {/* Level badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase
 ${
   course.level === "BEGINNER"
     ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
     : course.level === "INTERMEDIATE"
       ? "bg-amber-50 text-amber-700 dark:bg-yellow-500/10 dark:text-[#dcf36c]"
       : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300"
 }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {course.level}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {/* Step label */}
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                Step {course.order}/5
              </span>

              {/* Admin actions — always visible */}
              {role === "SUPER_ADMIN" && (
                <div className="flex items-center gap-1">
                  <button
                    title="Edit course"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/10 transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      setSelectedCourse(course);
                      setOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    title="Delete course"
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/15 transition-all duration-200 hover:scale-105"
                    onClick={() => handleDelete(course)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mt-4 leading-snug group-hover:text-[#1d6158] dark:group-hover:text-[#6fcec1] transition-colors duration-200">
            {course.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed flex-1">
            {course.description}
          </p>
          
          {/* DIVIDER */}
          <div className="h-px bg-gray-100 dark:bg-white/8 mt-4 mb-3" />

          {/* CTA */}
          <Link
            to={
              role === "SUPER_ADMIN"
                ? `/admin/courses/${course.id}`
                : `/dashboard/courses/${course.id}`
            }
            className="flex items-center gap-1.5 self-end text-xs font-semibold text-[#1d6158] dark:text-[#dcf36c] hover:gap-2.5 transition-all duration-200 group/link"
          >
            View Course
            <FaLongArrowAltRight className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>


        </div>
      </div>
      {role === "SUPER_ADMIN" && (
        <EditCourseDrawer
          open={open}
          onClose={() => setOpen(false)}
          course={selectedCourse}
          loading={false}
          onSave={async (data) => {
            console.log("Selected course:", selectedCourse);
            console.log("Update data:", data);

            await updateCourse(
              selectedCourse!.id,
              data,
              getAccessToken() as string,
            );

            setOpen(false);
          }}
        />
      )}
    </>
  );
}
