import { useEffect } from "react";

import { useCourse } from "../../context/course/useCourse";
import { MdBook } from "react-icons/md";
import CourseCard from "../../components/common/CourseCard"; 
import CourseCardSkeleton from "../../components/common/Skeleton";
import EmptyState from "../../components/common/EmptyCardState";

export default function Courses() {
  const { courses, loading, fetchCourses, removeCourse } = useCourse();

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="p-6 grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 antialiased transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
      <div className="flex items-center  justify-between bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/8 backdrop-blur-sm py-4 px-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#16423C]/10 dark:bg-[#E2FB6C]/10">
            <MdBook size={22} className="text-[#16423C] dark:text-[#E2FB6C]" />
          </div>
          <h3 className="font-bold dark:text-white text-xl md:text-3xl tracking-tight">
            Course List
          </h3>
        </div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/8 px-3 py-1.5 rounded-full">
          {courses.length} courses
        </span>
      </div>

        <div className="grid gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              removeCourse={removeCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
