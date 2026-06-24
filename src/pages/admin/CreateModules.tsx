import { useState } from "react";

import { createModule } from "../../api/admin.modules.api";
//import { useAuth } from "../../context/auth/useAuth";

import { getAccessToken } from "../../utlis/storage";

import { MdAdd, MdRemove } from "react-icons/md";
import { useCourse } from "../../context/course/useCourse";
type Props = {
 courseId: string;
 onSuccess: () => void;
};
export default function CreateModule({ courseId, onSuccess }: Props) {
  
 const {fetchCourseById}=useCourse()

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



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
      await fetchCourseById(courseId)
onSuccess();
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
    <div>
      {/* HEADER */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create New Module
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Add structured learning content to a course
        </p>
      </div>

      {/* FORM */}
      <div>
          <form onSubmit={handleSubmit} className="space-y-5">
           

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

  );
}
