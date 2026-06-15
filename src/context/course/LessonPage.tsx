import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useCourse } from "../../context/course/useCourse";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function LessonPage() {

 const { courseId, moduleId } = useParams();
 
 const {
 selectedCourse,
 fetchCourseById,
 loading
 } = useCourse();


 useEffect(() => {
 if (courseId) {
 fetchCourseById(courseId);
 }
 }, [courseId]);



 if (loading) {
 return <p>Loading lesson...</p>;
 }


 if (!selectedCourse) {
 return <p>Course not found</p>;
 }
const modules = selectedCourse.modules || [];
const currentIndex = modules.findIndex(
 (m) => m.id === moduleId
);
const prevModule =
 modules[currentIndex - 1];

const nextModule =
 modules[currentIndex + 1];

const totalModules = modules.length;
const currentNumber = currentIndex + 1;

 const module =
 selectedCourse.modules?.find(
 (m) => m.id === moduleId
 );

if (currentIndex === -1) {
 return <p>Module not found</p>;
}
 if (!module) {
 return <p>Module not found</p>;
 }


 return (
 <div className="max-w-3xl mx-auto p-6">
<p className="text-sm text-gray-500 mb-4">
 Module {currentNumber} of {totalModules}
</p>
 {/* Back */}
 <Link
 to={`/courses/${courseId}`}
 className="text-purple-600 text-sm"
 >
 ← Back to Course
 </Link>


 {/* Title */}
 <h1 className="text-3xl font-bold mt-4">
 {module.title}
 </h1>


<div className="mt-8 prose prose-purple max-w-none">
 <ReactMarkdown remarkPlugins={[remarkGfm]}>
 {module.content}
 </ReactMarkdown>
</div>


<div className="flex justify-between mt-10 border-t pt-6">

 {/* Previous */}
 <Link
 to={
 prevModule
 ? `/courses/${courseId}/modules/${prevModule.id}`
 : "#"
 }
 className={`px-4 py-2 rounded border transition
 ${
 prevModule
 ? "text-purple-600 hover:bg-gray-50"
 : "text-gray-400 pointer-events-none cursor-not-allowed"
 }
 `}
 >
 ← {prevModule?.title || "No Previous"}
 </Link>


 {/* Next */}
 <Link
 to={
 nextModule
 ? `/courses/${courseId}/modules/${nextModule.id}`
 : "#"
 }
 className={`px-4 py-2 rounded border transition
 ${
 nextModule
 ? "text-purple-600 hover:bg-gray-50"
 : "text-gray-400 pointer-events-none cursor-not-allowed"
 }
 `}
 >
 {nextModule?.title || "No Next"} →
 </Link>

</div>
 </div>
 );
}