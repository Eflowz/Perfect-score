import { useState } from "react";
import { createCourse } from "../../api/admin.courses.api";
//import { useAuth } from "../../context/auth/useAuth";
import { getAccessToken } from "../../utlis/storage";
import { MdAdd, MdKeyboardArrowDown, MdRemove } from "react-icons/md";

export default function CreateCourseForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("BEGINNER");
  const [order, setOrder] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // console.log(getAccessToken());
      await createCourse(
        {
          title,
          description,
          level: level as any,
          order,
        },
        getAccessToken() as string,
      );
      alert("Course created successfully!");

      setTitle("");
      setDescription("");
      setOrder(1);
      setLevel("BEGINNER");

      onSuccess?.();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-2xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Course
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Build a structured learning path for your students
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur border border-gray-200/60 dark:border-white/10 rounded-3xl p-6 shadow-xl">
          {error && (
            <div className="mb-4 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* TITLE */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Course Title
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
                placeholder="e.g. Introduction to Python"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Description
              </label>

              <textarea
                rows={4}
                className="
 mt-2 w-full px-4 py-3 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 text-gray-900 dark:text-white
 focus:outline-none focus:ring-2 focus:ring-[#16423C]
 transition resize-none
 "
                placeholder="Describe what students will learn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* LEVEL + ORDER */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Level
                </label>

                <div className="relative w-full">
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
                    <span className="text-sm font-medium">{level}</span>

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
 rounded-xl overflow-hidden
 shadow-lg
 animate-fade-in
 "
                    >
                      {levels.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setLevel(item);
                            setOpen(false);
                          }}
                          className={`
 w-full text-left px-4 py-3 text-sm
 hover:bg-gray-100 dark:hover:bg-white/5
 transition
 ${level === item ? "bg-gray-100 dark:bg-white/10 font-semibold" : ""}
 `}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Order
                </label>

                <div
                  className="
 mt-2 flex items-center justify-between
 w-full px-3 py-2 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 transition
 "
                >
                  {/* minus button */}
                  <button
                    type="button"
                    onClick={() =>
                      setOrder((prev: number) => Math.max(1, prev - 1))
                    }
                    className="
 p-2 rounded-lg
 hover:bg-gray-200 dark:hover:bg-white/10
 text-gray-600 dark:text-gray-300
 transition
 "
                  >
                    <MdRemove size={18} />
                  </button>

                  {/* value */}
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {order}
                  </span>

                  {/* plus button */}
                  <button
                    type="button"
                    onClick={() => setOrder((prev: number) => prev + 1)}
                    className="
 p-2 rounded-lg
 hover:bg-gray-200 dark:hover:bg-white/10
 text-gray-600 dark:text-gray-300
 transition
 "
                  >
                    <MdAdd size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="
 w-full py-3 rounded-xl
 bg-[#16423C] hover:bg-[#1d6158]
 text-white font-semibold
 transition
 disabled:opacity-50 disabled:cursor-not-allowed
 "
            >
              {loading ? "Creating Course..." : "Create Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
