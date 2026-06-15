import { useEffect } from "react";

import { useCourse } from "../../context/course/useCourse";

import CourseCard from "../../components/courses/CourseCard";
import CourseCardSkeleton from "../../components/courses/CourseCardSkeleton";

export default function Courses() {


const {
 courses,
 loading,
 fetchCourses
} = useCourse();



useEffect(()=>{

 fetchCourses();

},[]);



if (loading) {
 return (
 <div className="p-6 grid md:grid-cols-3 gap-6">

 {Array.from({ length: 6 }).map((_, i) => (
 <CourseCardSkeleton key={i} />
 ))}

 </div>
 );
}



return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
 Courses
</h1>



<div className="grid md:grid-cols-3 gap-6">


{
 courses.map((course)=>(

 <CourseCard
 key={course.id}
 course={course}
 />

 ))
}


</div>


</div>

);

}