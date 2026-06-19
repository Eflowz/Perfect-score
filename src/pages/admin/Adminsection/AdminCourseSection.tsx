//import {removeCourse} from "../../../context/course/useCourse";
import { Link } from "react-router-dom";
import { deleteCourse, updateCourse } from "../../../api/courses.api";
import { useCourse } from "../../../context/course/useCourse";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../utlis/storage";
import { formatDateWithOrdinal } from "../../../utlis/formatDate";
import EmptyState from "../../../components/common/EmptyCardState";
import type { Course } from "../../../types/courses.types";
import EditCourseDrawer from "../EditCourseDrawer";
export default function AdminCoursesSection() {
  const { courses, removeCourse } = useCourse();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [open, setOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const toggleMenu = (courseId: string) => {
    setOpenMenuId((prev) => (prev === courseId ? null : courseId));
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setOpen(true); // open drawer
    setOpenMenuId(null);
  };

  const handleDelete = async (course: Course) => {
    const confirm = window.confirm("Delete this course?");
    if (!confirm) return;

    await deleteCourse(course.id, getAccessToken()!);

    removeCourse(course.id); // UI update
    setOpenMenuId(null);
  };

  if (!courses.length) {
    return (
      <EmptyState
        title="No courses available"
        description="You haven't created any courses yet. Start building your learning platform."
        actionText="Create First Course"
        actionLink="/admin/courses/new"
      />
    );
  }

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-5 shadow-sm">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          All Courses
        </h2>
      </div>

      {/* TABLE HEADER */}

      <div className="grid grid-cols-12 text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3 px-3">
        <span className="col-span-4">Title</span>

        <span className="col-span-2">Level</span>

        <span className="col-span-1">Modules</span>

        <span className="col-span-1">Order</span>

        <span className="col-span-2">Created</span>

        <span className="col-span-2 text-right">Actions</span>
      </div>

      {/* LIST */}

      <div className="space-y-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="grid grid-cols-12 items-center px-3 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition group relative"
          >
            {/* TITLE */}

            <div className="col-span-4 font-semibold text-sm text-gray-900 dark:text-white truncate">
              {course.title}
            </div>

            {/* LEVEL */}

            <div className="col-span-2 text-xs">
              <span
                className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                  course.level === "BEGINNER"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
                    : course.level === "INTERMEDIATE"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                }`}
              >
                {course.level}
              </span>
            </div>

            {/* MODULES */}

            <div className="col-span-1 text-xs text-gray-600 dark:text-gray-300">
              {course.modules?.length || 0}
            </div>

            {/* ORDER */}

            <div className="col-span-1 text-xs text-gray-600 dark:text-gray-300">
              #{course.order}
            </div>

            {/* CREATED */}

            <div className="col-span-2 text-xs text-gray-500 dark:text-gray-400">
              {formatDateWithOrdinal(course.createdAt)}
            </div>

            {/* ACTIONS */}

            <div className="col-span-2 flex justify-end items-center relative">
              {/* VIEW */}

              <Link
                to={`/admin/courses/${course.id}`}
                className="text-xs font-semibold text-[#16423C] dark:text-[#E2FB6C] hover:opacity-80 mr-3"
              >
                View
              </Link>

              {/* 3 DOT BUTTON */}

              <div className="col-span-2 flex justify-end relative">
                {/* 3 DOT BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // IMPORTANT
                    toggleMenu(course.id);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
                >
                  <MdMoreVert />
                </button>

                {/* DROPDOWN */}
                {openMenuId === course.id && (
                  <div
                    onClick={(e) => e.stopPropagation()} // IMPORTANT
                    className="absolute right-0 top-10 w-36 bg-white dark:bg-[hashtag#0F2C28] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(course)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5"
                    >
                      <MdEdit size={16} />
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(course)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <MdDelete size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

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
      </div>
    </div>
  );
}
