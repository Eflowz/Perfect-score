import { useEffect, useState } from "react";

import { createModule } from "../../api/admin.modules.api";
//import { useAuth } from "../../context/auth/useAuth";
import { useCourse } from "../../context/course/useCourse";
import { getAccessToken } from "../../utlis/storage";
export default function CreateModule() {

 const { courses, fetchCourses } = useCourse();

 const [courseId, setCourseId] = useState("");
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [order, setOrder] = useState(1);

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

 // Load courses for dropdown
 useEffect(() => {
 fetchCourses();
 }, []);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 if (!courseId) {
 setError("Please select a course");
 return;
 }

 try {
 setLoading(true);
 setError("");
 setSuccess("");

 await createModule(
 courseId,
 {
 title,
 content,
 order,
 },
getAccessToken() as string
 );

 setSuccess("Module created successfully 🎉");

 // reset form
 setTitle("");
 setContent("");
 setOrder(1);
 } catch (err: any) {
 setError(
 err?.response?.data?.message ||
 "Failed to create module"
 );
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="max-w-2xl mx-auto p-6">

 <h1 className="text-2xl font-bold mb-4">
 Create Module
 </h1>

 {/* ERROR */}
 {error && (
 <p className="text-red-500 mb-3">{error}</p>
 )}

 {/* SUCCESS */}
 {success && (
 <p className="text-green-600 mb-3">
 {success}
 </p>
 )}

 <form
 onSubmit={handleSubmit}
 className="space-y-4"
 >

 {/* COURSE SELECT */}
 <select
 className="border p-2 w-full"
 value={courseId}
 onChange={(e) =>
 setCourseId(e.target.value)
 }
 >
 <option value="">
 Select Course
 </option>

 {courses?.map((course) => (
 <option
 key={course.id}
 value={course.id}
 >
 {course.title}
 </option>
 ))}
 </select>

 {/* TITLE */}
 <input
 className="border p-2 w-full"
 placeholder="Module Title"
 value={title}
 onChange={(e) =>
 setTitle(e.target.value)
 }
 />

 {/* CONTENT */}
 <textarea
 className="border p-2 w-full h-40"
 placeholder="Module Content (Markdown supported)"
 value={content}
 onChange={(e) =>
 setContent(e.target.value)
 }
 />

 {/* ORDER */}
 <input
 type="number"
 className="border p-2 w-full"
 value={order}
 onChange={(e) =>
 setOrder(Number(e.target.value))
 }
 />

 {/* BUTTON */}
 <button
 type="submit"
 disabled={loading}
 className={`w-full py-2 text-white rounded ${
 loading
 ? "bg-gray-400"
 : "bg-purple-600"
 }`}
 >
 {loading
 ? "Creating Module..."
 : "Create Module"}
 </button>
 </form>
 </div>
 );
}