import { useEffect, useState } from "react";

import { getAllUserProgress } from "../../../api/progress.api";
import {
 MdCheckCircle,
 MdAccessTime,
 MdSchool,
 MdTrendingUp,
} from "react-icons/md";

const ProgressOverview = () => {
 const [progress, setProgress] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const loadProgress = async () => {
 try {
 const data = await getAllUserProgress();

 console.log("All progress:", data);

 setProgress(data);
 } catch (err) {
 console.log("Progress error:", err);
 } finally {
 setLoading(false);
 }
 };

 loadProgress();
 }, []);


 const completedCount = progress.filter(
 (item) => item.completed
 ).length;


 const totalTime = progress.reduce(
 (acc, item) => acc + item.timeSpent,
 0
 );


 if (loading) {
 return (
 <div className="bg-white dark:bg-[hashtag#16423C] rounded-2xl p-6 animate-pulse">
 Loading progress...
 </div>
 );
 }


 return (
 <section
 className="
 bg-white dark:bg-[hashtag#16423C]
 border border-gray-200/60 dark:border-white/5
 rounded-2xl
 shadow-sm dark:shadow-xl
 p-6
 space-y-6
 "
 >

 {/* Header */}
 <div className="flex items-center justify-between">

 <div>
 <h2 className="
 text-lg font-bold
 text-gray-900 dark:text-white
 ">
 Learning Progress
 </h2>

 <p className="
 text-xs text-gray-500 dark:text-[hashtag#6B8A85]
 mt-1
 ">
 Track your learning journey
 </p>
 </div>


 <MdTrendingUp
 size={28}
 className="
 text-[hashtag#16423C]
 dark:text-[hashtag#E2FB6C]
 "
 />

 </div>



 {/* Stats */}
 <div className="
 grid grid-cols-1 sm:grid-cols-3 gap-4
 ">

 <div className="
 rounded-xl
 bg-gray-50 dark:bg-black/20
 p-4
 border border-gray-100 dark:border-white/5
 ">
 <MdCheckCircle
 className="text-emerald-500 mb-2"
 size={22}
 />

 <p className="text-xs text-gray-400">
 Completed Modules
 </p>

 <h3 className="
 text-xl font-bold
 text-gray-900 dark:text-white
 ">
 {completedCount}
 </h3>
 </div>



 <div className="
 rounded-xl
 bg-gray-50 dark:bg-black/20
 p-4
 border border-gray-100 dark:border-white/5
 ">

 <MdAccessTime
 className="text-[hashtag#16423C] dark:text-[hashtag#E2FB6C] mb-2"
 size={22}
 />

 <p className="text-xs text-gray-400">
 Time Spent
 </p>

 <h3 className="
 text-xl font-bold
 text-gray-900 dark:text-white
 ">
 {totalTime} mins
 </h3>

 </div>



 <div className="
 rounded-xl
 bg-gray-50 dark:bg-black/20
 p-4
 border border-gray-100 dark:border-white/5
 ">

 <MdSchool
 className="text-purple-500 mb-2"
 size={22}
 />

 <p className="text-xs text-gray-400">
 Courses Active
 </p>

 <h3 className="
 text-xl font-bold
 text-gray-900 dark:text-white
 ">
 {
 new Set(
 progress.map(
 item => item.courseId
 )
 ).size
 }
 </h3>

 </div>

 </div>




 {/* Activity list */}
 <div className="space-y-3">

 <h3 className="
 text-sm font-bold
 text-gray-900 dark:text-white
 ">
 Recent Learning Activity
 </h3>


 {
 progress.length === 0 ? (

 <div className="
 text-center
 py-8
 text-sm
 text-gray-400
 ">
 No learning activity yet
 </div>

 ) : (

 progress.map((item)=>(
 
 <div
 key={item.id}
 className="
 flex items-center justify-between
 p-4
 rounded-xl
 bg-gray-50 dark:bg-black/20
 border border-gray-100 dark:border-white/5
 hover:scale-[1.01]
 transition
 "
 >

 <div>

 <p className="
 text-sm font-semibold
 text-gray-900 dark:text-white
 ">
 {item.course.title}
 </p>


 <p className="
 text-xs
 text-gray-500 dark:text-gray-400
 mt-1
 ">
 {item.module.title}
 </p>

 </div>


 <span
 className="
 text-[10px]
 px-3 py-1
 rounded-full
 bg-[hashtag#16423C]/10
 dark:bg-[hashtag#E2FB6C]/10
 text-[hashtag#16423C]
 dark:text-[hashtag#E2FB6C]
 font-semibold
 "
 >

 {
 item.completed
 ? "Completed"
 : "In Progress"
 }

 </span>


 </div>

 ))

 )
 }

 </div>

 </section>
 );
};

export default ProgressOverview;