import { Link } from "react-router-dom";
import type { Module } from "../../types/courses.types";
import { FaArrowRight, FaPlay } from "react-icons/fa6";
type Props = {
  module: Module;
  index: number;
  courseId: string;
};

export default function ModuleCard({ module, index}: Props) {
  const preview =
    module.content?.replace("#", "").slice(0, 120) ||
    "Start this lesson and begin learning.";
  return (
    <Link
      to="{`/dashboard/courses/${courseId}/modules/${module.id}`}"
      className="
 group relative block overflow-hidden
 bg-white/50 dark:bg-white/5
 border border-gray-200/70 dark:border-white/10
 rounded-2xl p-5 mb-4

 transition-all duration-300 ease-out

 hover:-translate-y-1
 hover:shadow-lg
 hover:border-[#16423C]/40

 animate-fade-in
 "
    >
      {/* subtle hover background */}
      <div
        className="
 absolute inset-0 
 bg-gradient-to-r 
 from-[#16423C]/5 
 to-transparent
 opacity-0 
 group-hover:opacity-100
 transition-opacity duration-500
 "
      />

      <div className="relative z-10">
        {/* Top section */}
        <div className="flex items-center justify-between">
          {/* Lesson number */}
          <div
            className="
 flex items-center gap-3
 "
          >
            <span
              className="
 w-9 h-9
 flex items-center justify-center
 rounded-xl

 bg-[#16423C]/10
 dark:bg-[#dcf36c]/10

 text-[#16423C]
 dark:text-[#dcf36c]

 font-bold
 text-sm

 group-hover:scale-110
 transition-transform duration-300
 "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <p
                className="
 text-[10px]
 uppercase
 tracking-widest
 text-gray-400
 dark:text-gray-500
 font-semibold
 "
              >
                Lesson {index + 1}
              </p>

              <h3
                className="
 text-sm
 md:text-base
 font-semibold

 text-gray-900
 dark:text-white

 group-hover:text-[#16423C]
 dark:group-hover:text-[#dcf36c]

 transition-colors
 "
              >
                {module.title}
              </h3>
            </div>
          </div>

          {/* play icon */}
          <div
            className="
 w-8 h-8
 rounded-full

 flex items-center justify-center

 bg-gray-100
 dark:bg-white/10

 text-gray-500
 dark:text-gray-300

 group-hover:bg-[#16423C]
 group-hover:text-white

 transition-all duration-300
 "
          >
            <FaPlay size={10} />
          </div>
        </div>

        {/* Description */}
        <p
          className="
 mt-4
 text-sm
 leading-relaxed

 text-gray-500
 dark:text-gray-400

 line-clamp-2
 "
        >
          {preview}...
        </p>

        {/* Bottom action */}
        <div
          className="
 mt-5
 flex items-center justify-between

 border-t
 border-gray-100
 dark:border-white/10

 pt-4
 "
        >
          <span
            className="
            text-xs
            text-gray-400
            dark:text-gray-500
            "
          >
            Start learning
          </span>

          <div
            className="
 flex items-center gap-2

 text-xs
 font-semibold

 text-[#16423C]
 dark:text-[#dcf36c]

 "
          >
            Open Lesson
            <FaArrowRight
              className="
 transition-transform
 duration-300
 group-hover:translate-x-1
 "
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
