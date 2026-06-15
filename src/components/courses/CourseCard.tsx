import { Link } from "react-router-dom";
import { deleteCourse } from "../../api/courses.api";
import { getAccessToken } from "../../utlis/storage";
import type { Course } from "../../types/courses.types";

type Props = {
 course: Course;
};

export default function CourseCard({
 course,
}: Props) {


 const handleDelete = async () => {

 const confirmDelete = window.confirm(
 "Are you sure you want to delete this course?"
 );

 if (!confirmDelete) return;


 try {

 await deleteCourse(
 course.id,
 getAccessToken() as string
 );

 alert("Course deleted successfully");

 } catch (error:any) {

 console.log(error);

 }

 };


 return (

 <div className="border rounded-xl p-5 shadow-sm">

 <h2 className="text-xl font-bold">
 {course.title}
 </h2>


 <p className="text-gray-600 mt-2">
 {course.description}
 </p>


 <div className="flex justify-between mt-4">

 <span className="text-sm">
 {course.level}
 </span>


 <button
 onClick={handleDelete}
 className="text-red-500"
 >
 Delete
 </button>


 <Link
 to={`/courses/${course.id}`}
 className="text-purple-600"
 >
 View Course
 </Link>

 </div>

 </div>

 );
}