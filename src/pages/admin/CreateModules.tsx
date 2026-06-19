import { useEffect, useState } from "react";

import { createModule } from "../../api/admin.modules.api";
//import { useAuth } from "../../context/auth/useAuth";
import { useCourse } from "../../context/course/useCourse";
import { getAccessToken } from "../../utlis/storage";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";
import { MdAdd, MdRemove } from "react-icons/md";
export default function CreateModule() {
  const { courses, fetchCourses } = useCourse();

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);

  const selectedCourse = courses?.find((c: any) => c.id === courseId);
  // Load courses for dropdown
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseId) {
      setError("Please select a course");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createModule(
        courseId,
        {
          title,
          content,
          order,
        },
        getAccessToken() as string,
      );

      setSuccess("Module created successfully 🎉");

      // reset form
      setTitle("");
      setContent("");
      setOrder(1);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-2xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Module
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Add structured learning content to a course
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur border border-gray-200/60 dark:border-white/10 rounded-3xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* COURSE SELECT */}
            <div className="relative w-full">
              {/* LABEL */}
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Select Course
              </label>

              {/* TRIGGER */}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
 mt-2 w-full px-4 py-3 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 text-left flex items-center justify-between
 text-gray-900 dark:text-white
 focus:outline-none focus:ring-2 focus:ring-[#16423C]
 transition
 "
              >
                <span className="text-sm">
                  {selectedCourse ? selectedCourse.title : "Choose a course"}
                </span>

                <MdKeyboardArrowDown
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {/* DROPDOWN */}
              {open && (
                <div
                  className="
 absolute z-50 mt-2 w-full
 bg-white dark:bg-[#0F2C28]
 border border-gray-200 dark:border-white/10
 rounded-xl shadow-lg
 overflow-hidden
 animate-fade-in
 "
                >
                  {courses?.map((course: any) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => {
                        setCourseId(course.id);
                        setOpen(false);
                      }}
                      className="
 w-full flex items-center justify-between
 px-4 py-3 text-sm
 hover:bg-gray-100 dark:hover:bg-white/5
 transition
 "
                    >
                      <span>{course.title}</span>

                      {courseId === course.id && (
                        <MdCheck className="text-[#16423C] dark:text-[#dcf36c]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* TITLE */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Module Title
              </label>

              <input
                className="
 mt-2 w-full px-4 py-3 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 text-gray-900 dark:text-white
 focus:outline-none focus:ring-2 focus:ring-[#16423C]
 transition
 "
                placeholder="e.g. Variables and Data Types"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* CONTENT */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Module Content
              </label>

              <textarea
                rows={6}
                className="
 mt-2 w-full px-4 py-3 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 text-gray-900 dark:text-white
 focus:outline-none focus:ring-2 focus:ring-[#16423C]
 transition resize-none
 "
                placeholder="Write module content (Markdown supported)..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* ORDER */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Order
              </label>

              <div
                className="
 mt-2 flex items-center justify-between
 w-full px-4 py-3 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 "
              >
                {/* VALUE (LEFT SIDE) */}
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {order}
                </span>

                {/* CONTROLS (RIGHT SIDE) */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOrder((prev: number) => Math.max(1, prev - 1))
                    }
                    className="
 p-2 rounded-lg
 hover:bg-gray-200 dark:hover:bg-white/10
 transition
 text-gray-600 dark:text-gray-300
 "
                  >
                    <MdRemove size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrder((prev: number) => prev + 1)}
                    className="
 p-2 rounded-lg
 hover:bg-gray-200 dark:hover:bg-white/10
 transition
 text-gray-600 dark:text-gray-300
 "
                  >
                    <MdAdd size={18} />
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-600 dark:text-green-400">
                {success}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
 w-full py-3 rounded-xl
 bg-[#16423C] hover:bg-[#1d6158]
 text-white font-semibold
 transition
 disabled:opacity-50 disabled:cursor-not-allowed
 "
            >
              {loading ? "Creating Module..." : "Create Module"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
