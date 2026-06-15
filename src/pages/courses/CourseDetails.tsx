import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCourse } from "../../context/course/useCourse";
import ModuleCard from "../../components/courses/ModuleCard";
import ModuleCardSkeleton from "../../components/courses/ModuleCardSkeleton";
import Skeleton from "../../components/common/Skeleton";

export default function CourseDetails() {

 const { id } = useParams();

 const {
 selectedCourse,
 fetchCourseById,
 loading
 } = useCourse();


 useEffect(() => {

 if (id) {
 fetchCourseById(id);
 }

 }, [id]);

if (loading) {
 return (
 <div className="p-6 space-y-6">

 <Skeleton className="h-8 w-1/3" />
 <Skeleton className="h-4 w-2/3" />

 <div className="mt-8 space-y-4">
 {Array.from({ length: 4 }).map((_, i) => (
 <ModuleCardSkeleton key={i} />
 ))}
 </div>

 </div>
 );
}


 if (!selectedCourse) {
 return <p>No course found</p>;
 }


 return (
 <div className="mt-8">

 <h2 className="text-2xl font-semibold mb-4">
 Modules
 </h2>


 {selectedCourse.modules?.length ? (
 selectedCourse.modules.map((module, index) => (
 <ModuleCard
 key={module.id}
 module={module}
 index={index}
 courseId={selectedCourse.id}
/>


 ))
 ) : (
 <p>No modules available</p>
 )}

</div>
 );
}