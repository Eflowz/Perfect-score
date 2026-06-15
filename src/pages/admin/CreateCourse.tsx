import { useState } from "react";
import { createCourse } from "../../api/admin.courses.api";
//import { useAuth } from "../../context/auth/useAuth";
import { getAccessToken } from "../../utlis/storage";

export default function CreateCourse() {


 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [level, setLevel] = useState("BEGINNER");
 const [order, setOrder] = useState(1);

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 try {
 setLoading(true);
 setError("");

// console.log(getAccessToken());
 await createCourse(
 {
 title,
 description,
 level: level as any,
 order,
 },
 getAccessToken() as string
 
 );
 alert("Course created successfully!");

 setTitle("");
 setDescription("");
 setOrder(1);
 setLevel("BEGINNER");

 } catch (err: any) {
 setError(
 err?.response?.data?.message ||
 "Failed to create course"
 );
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="max-w-xl mx-auto p-6">

 <h1 className="text-2xl font-bold mb-4">
 Create Course
 </h1>

 {error && (
 <p className="text-red-500 mb-3">{error}</p>
 )}

 <form onSubmit={handleSubmit} className="space-y-4">

 <input
 className="border p-2 w-full"
 placeholder="Title"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 />

 <textarea
 className="border p-2 w-full"
 placeholder="Description"
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 />

 <select
 className="border p-2 w-full"
 value={level}
 onChange={(e) => setLevel(e.target.value)}
 >
 <option value="BEGINNER">Beginner</option>
 <option value="INTERMEDIATE">Intermediate</option>
 <option value="ADVANCED">Advanced</option>
 </select>

 <input
 type="number"
 className="border p-2 w-full"
 value={order}
 onChange={(e) =>
 setOrder(Number(e.target.value))
 }
 />

 <button
 disabled={loading}
 className="bg-purple-600 text-white px-4 py-2 w-full"
 >
 {loading ? "Creating..." : "Create Course"}
 </button>

 </form>
 </div>
 );
}