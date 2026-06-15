import {
 useState
} from "react";

import {
 CourseContext
} from "./CourseContext";


import {
 getCourses,
 getCourseById
} from "../../api/courses.api";


import type { Course } from "../../types/courses.types";

export function CourseProvider({
 children
}:{
 children:React.ReactNode
}){


const [courses,setCourses] =
useState<Course[]>([]);


const [selectedCourse,setSelectedCourse] =
useState<Course | null>(null);


const [loading,setLoading] =
useState(false);



const fetchCourses = async()=>{

 try{

 setLoading(true);

 const data =
 await getCourses();

 setCourses(data);

 }
 finally{

 setLoading(false);

 }

};



const fetchCourseById =
async(id:string)=>{

 const data =
 await getCourseById(id);

 setSelectedCourse(data);

};

const removeCourse = (id:string) => {

 setCourses((prev) =>
 prev.filter(
 (course) => course.id !== id
 )
 );

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
}}
>

{children}

</CourseContext.Provider>

);

}

