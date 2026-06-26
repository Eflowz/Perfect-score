import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCourseProgress } from "../../api/progress.api";
import type { Module } from "../../types/courses.types";
import { FaArrowRight, FaPlay } from "react-icons/fa6";
import { getCourseQuizzes } from "../../api/quiz.api";
//import CompleteButton from "../../pages/progress/progress";
type Props = {
  module: Module;
  index: number;
  courseId: string;
};

export default function ModuleCard({ module, index, courseId}: Props) {
  const [progress, setProgress] = useState<any[]>([]);

const [quizzes, setQuizzes] = useState<any[]>([]);
// handle start quiz
useEffect(() => {

const loadQuizzes = async () => {

try {

if (!courseId) return;

const data = await getCourseQuizzes(courseId);

console.log("Course quizzes:", data);

setQuizzes(data);

} catch (error) {

console.log("Failed to load quizzes:", error);

}

};


loadQuizzes();

}, [courseId]);
useEffect(() => {

const loadProgress = async () => {
 try {

 const data = await getCourseProgress(courseId);

 console.log("Course progress:", data);

 setProgress(data);

 } catch(err){
 console.log("Progress error:", err);
 }
};

loadProgress();

}, [courseId]);
  const preview =
    module.content?.replace("#", "").slice(0, 120) ||
    "Start this lesson and begin learning.";
  return (
    <div

      className="
 group relative block overflow-hidden
 bg-white/50 dark:bg-white/5
 border border-gray-200/70 dark:border-white/10
 rounded-2xl p-5 mb-4

 transition-all duration-300 ease-out

 hover:-translate-y-1
 hover:shadow-lg
 hover:border-[#16423C]/40

 animate-fade-in
 "
    >
      {/* subtle hover background */}
      <div
        className="
 absolute inset-0 
 bg-gradient-to-r 
 from-[#16423C]/5 
 to-transparent
 opacity-0 
 group-hover:opacity-100
 transition-opacity duration-500
 "
      />

      <div className="relative z-10">
        {/* Top section */}
        <div className="flex items-center justify-between">
          {/* Lesson number */}
          <div
            className="
 flex items-center gap-3
 "
          >
            <span
              className="
 w-9 h-9
 flex items-center justify-center
 rounded-xl

 bg-[#16423C]/10
 dark:bg-[#dcf36c]/10

 text-[#16423C]
 dark:text-[#dcf36c]

 font-bold
 text-sm

 group-hover:scale-110
 transition-transform duration-300
 "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <p
                className="
 text-[10px]
 uppercase
 tracking-widest
 text-gray-400
 dark:text-gray-500
 font-semibold
 "
              >
                Lesson {index + 1}
              </p>

              <h3
                className="
 text-sm
 md:text-base
 font-semibold

 text-gray-900
 dark:text-white

 group-hover:text-[#16423C]
 dark:group-hover:text-[#dcf36c]

 transition-colors
 "
              >
                {module.title}
              </h3>
{/*progress for a course */}
              <div>

{progress.map((item:any)=>(
<div key={item.id}>


<p>{item.timeSpent} time spent</p>

<p className="text-sm bg-green-900 p-4 rounded text-white">
{
 item.completed 
 ? "Completed "
 : "Not completed"
}
</p>

</div>
))}


</div>
            </div>
          </div>

          {/* play icon */}
          <Link
      to={`/dashboard/courses/${courseId}/modules/${module.id}`}
            className="
 w-8 h-8
 rounded-full

 flex items-center justify-center

 bg-gray-100
 dark:bg-white/10

 text-gray-500
 dark:text-gray-300

 group-hover:bg-[#16423C]
 group-hover:text-white

 transition-all duration-300
 "
          >
            <FaPlay size={10} />
          </Link>
        </div>

        {/* Description */}
        <p
          className="
 mt-4
 text-sm
 leading-relaxed

 text-gray-500
 dark:text-gray-400

 line-clamp-2
 "
        >
          {preview}...
        </p>

        {/* Bottom action */}
        <div
          className="
 mt-5
 flex items-center justify-between

 border-t
 border-gray-100
 dark:border-white/10

 pt-4
 "
        >
          <span
            className="
            text-xs
            text-gray-400
            dark:text-gray-500
            "
          >
            Start learning
          </span>
          <div className="mt-8">

<h2 className="
text-xl font-bold
text-gray-900 dark:text-white
">
Quizzes & Assessments
</h2>


<div className="grid md:grid-cols-2 gap-4 mt-4">

{quizzes.map((quiz)=>(

<div
key={quiz.id}
className="
bg-white dark:bg-[#16423C]
rounded-2xl
border border-gray-200 dark:border-white/10
p-5
"
>

<h3 className="
font-bold
text-gray-900 dark:text-white
">
{quiz.title}
</h3>


<p className="text-sm text-gray-500 mt-2">
Passing Score: {quiz.passingScore}%
</p>


<p className="text-sm text-gray-500">
Time Limit: {quiz.timeLimit} minutes
</p>


<button
className="
mt-4
px-4 py-2
rounded-xl
bg-[#16423C]
dark:bg-[#E2FB6C]
text-white
dark:text-[#16423C]
text-sm font-semibold
"
>
Start Quiz
</button>


</div>

))}

</div>

</div>

          <Link
      to={`/dashboard/courses/${courseId}/modules/${module.id}`}
            className="
 flex items-center gap-2

 text-xs
 font-semibold

 text-[#16423C]
 dark:text-[#dcf36c]

 "
          >
            Open Lesson
            <FaArrowRight
              className="
 transition-transform
 duration-300
 group-hover:translate-x-1
 "
            />
          </Link>
  
        </div>
      </div>
    </div>
  );
}
