import { useEffect } from "react";

import { useCourse } from "../../context/course/useCourse";

import CourseCard from "../../components/courses/CourseCard";
import CourseCardSkeleton from "../../components/courses/CourseCardSkeleton";
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 antialiased  transition-colors duration-200">
      <div className="grid gap-5 p-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            count={courses.length}
            removeCourse={removeCourse}
          />
        ))}
      </div>
      {/*
<CourseCard />
*/}
    </div>
  );
}
