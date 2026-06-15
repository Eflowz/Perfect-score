import {
 createContext
} from "react";

import type { Course } from "../../types/courses.types";

type CourseContextType = {

 courses: Course[];

 selectedCourse: Course | null;

 loading:boolean;
removeCourse: (id:string) => void;



 fetchCourses:()=>Promise<void>;

 fetchCourseById:
 (id:string)=>Promise<void>;

};


export const CourseContext =
createContext<CourseContextType | undefined>(
 undefined
);