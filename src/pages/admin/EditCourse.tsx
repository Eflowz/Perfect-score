import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateCourse } from "../../api/courses.api";
import { getAccessToken } from "../../utlis/storage";
import { useCourse } from "../../context/course/useCourse";
import type { CourseLevel } from "../../types/courses.types";
export default function EditCourse() {
 const { id } = useParams();
 const navigate = useNavigate();

 const { selectedCourse, fetchCourseById, loading } = useCourse();

 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [level, setLevel] = useState<CourseLevel>("BEGINNER");
 const [order, setOrder] = useState(1);

 const [saving, setSaving] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

 // Fetch course when page loads
 useEffect(() => {
 if (id) {
 fetchCourseById(id);
 }
 }, [id]);

 // Fill form when course loads
 useEffect(() => {
 if (selectedCourse) {
 setTitle(selectedCourse.title || "");
 setDescription(selectedCourse.description || "");
 setLevel(selectedCourse.level as CourseLevel || "BEGINNER");
 setOrder(selectedCourse.order || 1);
 }
 }, [selectedCourse]);

 const handleUpdate = async (e: React.FormEvent) => {
 e.preventDefault();

 try {
 setSaving(true);
 setError("");
 setSuccess("");

 await updateCourse(
 id as string,
 {
 title,
 description,
 level,
 order,
 },
 getAccessToken() as string
 );

 setSuccess("Course updated successfully 🎉");

 setTimeout(() => {
 navigate("/courses");
 }, 1000);

 } catch (err: any) {
 setError(
 err?.response?.data?.message ||
 "Failed to update course"
 );
 } finally {
 setSaving(false);
 }
 };

 if (loading) {
 return (
 <p className="p-6">Loading course...</p>
 );
 }

 return (
 <div className="max-w-2xl mx-auto p-6">

 <h1 className="text-2xl font-bold mb-4">
 Edit Course
 </h1>

 {error && (
 <p className="text-red-500 mb-3">
 {error}
 </p>
 )}

 {success && (
 <p className="text-green-600 mb-3">
 {success}
 </p>
 )}

 <form
 onSubmit={handleUpdate}
 className="space-y-4"
 >

 {/* TITLE */}
 <input
 className="border p-2 w-full"
 value={title}
 onChange={(e) =>
 setTitle(e.target.value)
 }
 placeholder="Course title"
 />

 {/* DESCRIPTION */}
 <textarea
 className="border p-2 w-full h-32"
 value={description}
 onChange={(e) =>
 setDescription(e.target.value)
 }
 placeholder="Course description"
 />

 {/* LEVEL */}
 <select
 className="border p-2 w-full"
 value={level}
onChange={(e) =>
 setLevel(e.target.value as CourseLevel)
}
 >
 <option value="BEGINNER">
 Beginner
 </option>
 <option value="INTERMEDIATE">
 Intermediate
 </option>
 <option value="ADVANCED">
 Advanced
 </option>
 </select>

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
 disabled={saving}
 className={`w-full py-2 text-white rounded ${
 saving
 ? "bg-gray-400"
 : "bg-purple-600"
 }`}
 >
 {saving
 ? "Updating..."
 : "Update Course"}
 </button>

 </form>
 </div>
 );
}