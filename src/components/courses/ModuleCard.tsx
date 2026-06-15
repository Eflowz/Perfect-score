import { Link } from "react-router-dom";
import type { Module } from "../../types/courses.types";
type Props = {
 module: Module;
 index: number;
 courseId: string;
};

export default function ModuleCard({
 module,
 index,
 courseId,
}: Props) {

 return (
 <Link
 to={`/courses/${courseId}/modules/${module.id}`}
 className="block border rounded-lg p-4 mb-3 hover:shadow transition"
 >

 <div className="flex items-center gap-3">

 <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 text-sm">
 {index + 1}
 </span>

 <h3 className="font-semibold">
 {module.title}
 </h3>

 </div>

 <p className="text-sm text-gray-500 mt-2">
 {module.content.slice(0, 100)}...
 </p>

 </Link>
 );
}