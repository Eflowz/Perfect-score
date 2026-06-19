import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { CourseLevel } from "../../types/courses.types";
import type { Course } from "../../types/courses.types";
import { MdKeyboardArrowDown, MdRemove } from "react-icons/md";
import { MdAdd } from "react-icons/md";
type Props = {
  open: boolean;
  onClose: () => void;
  course: Course | null;
  
  onSave: (data: {
    title: string;
    description: string;
    level: CourseLevel;
    order: number;
  }) => void;
  loading?: boolean;
};

export default function EditCourseDrawer({
  open,
  onClose,
  course,
  onSave,
  loading,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<CourseLevel>("BEGINNER");
  const [order, setOrder] = useState(1);
  const levels: CourseLevel[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
  const [opens, setOpens] = useState(false);
  // fill form when course changes
  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setDescription(course.description || "");
      setLevel(course.level as CourseLevel);
      setOrder(course.order);
    }
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      title,
      description,
      level,
      order,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-xl z-50 bg-white dark:bg-[#0f0f0f] border-l border-gray-200 dark:border-white/10 p-6 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Course
              </h2>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course title"
              />

              <textarea
                className="w-full px-4 py-3 rounded-xl h-32 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />

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
                      onClick={() => setOpens(!opens)}
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
                        className={`transition-transform ${opens ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* DROPDOWN */}
                    {opens && (
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
                              setLevel(item as CourseLevel);
                              setOpens(false);
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#16423C] text-white hover:opacity-90 transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
