import { useState } from "react";

import { CourseContext } from "./CourseContext";

import { getCourses, getCourseById } from "../../api/courses.api";
import { getAccessToken } from "../../utlis/storage";
import { updateCourse as updateCourseApi } from "../../api/courses.api";
import type { Course } from "../../types/courses.types";

export function CourseProvider({ children }: { children: React.ReactNode }) {
  {
    /* dummy context instead of api*/
  }

  const [courses, setCourses] = useState<Course[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);

    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.log("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseById = async (id: string) => {
    const data = await getCourseById(id);

    setSelectedCourse(data);
    console.log("Fetched course by ID:", data);
  };

  const removeCourse = (id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };
  // ✅ THIS is where const is used (inside provider scope)
  const updateCourse = async (id: string, data: Partial<Course>) => {
    try {
      const updated = await updateCourseApi(
        id,
        data,
        getAccessToken() as string,
      );

      setCourses((prev) =>
        prev.map((course) =>
          course.id === id ? { ...course, ...updated } : course,
        ),
      );

      setSelectedCourse((prev) =>
        prev?.id === id ? { ...prev, ...updated } : prev,
      );
      console.log("new data", data);
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  };
  return (
    <CourseContext.Provider
      value={{
        courses,
        selectedCourse,
        loading,
        fetchCourses,
        fetchCourseById,
        removeCourse,
        updateCourse,
        setSelectedCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
