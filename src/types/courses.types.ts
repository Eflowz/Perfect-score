export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type Module = {
  id: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
  createdAt: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  order: number;
  createdAt: string;
  updatedAt: string;
  modules: Module[];
};
