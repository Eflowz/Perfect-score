import { Link, useNavigate } from "react-router-dom";
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
const navigate=useNavigate()
  const preview =
    module.content?.replace("#", "").slice(0, 120) ||
    "Start this lesson and begin learning.";
  /*
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
        <div className="flex items-center justify-between">
  
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
  */


  



return (
<div
className="
group relative overflow-hidden

bg-white/70
dark:bg-white/[0.04]

border
border-gray-200/70
dark:border-white/10

rounded-3xl

p-6

transition-all
duration-300

hover:-translate-y-1
hover:shadow-lg
hover:border-[#16423C]/30

animate-fade-in
"
>


{/* Hover glow */}

<div
className="
absolute inset-0

bg-gradient-to-br
from-[#16423C]/5
via-transparent
to-transparent

opacity-0
group-hover:opacity-100

transition-opacity
duration-500
"
/>



<div className="relative z-10">


{/* Lesson Header */}

<div
className="
flex
items-start
justify-between
gap-4
"
>


<div className="flex gap-4">


<div
className="
w-12
h-12

rounded-2xl

flex
items-center
justify-center

bg-[#16423C]/10
dark:bg-[#dcf36c]/10

text-[#16423C]
dark:text-[#dcf36c]

font-bold

group-hover:scale-110

transition
"
>

{String(index+1).padStart(2,"0")}


</div>



<div>


<p
className="
text-[11px]
uppercase
tracking-[0.2em]

text-gray-400
dark:text-gray-500

font-semibold
"
>
Lesson {index+1}
</p>



<h3
className="
mt-1

text-base
font-bold

text-gray-900
dark:text-white

group-hover:text-[#16423C]
dark:group-hover:text-[#dcf36c]

transition
"
>

{module.title}

</h3>


</div>


</div>





<Link

to={`/dashboard/courses/${courseId}/modules/${module.id}`}

className="
w-10
h-10

rounded-full

flex
items-center
justify-center

bg-gray-100
dark:bg-white/10

text-gray-500
dark:text-gray-300

hover:bg-[#16423C]
hover:text-white

transition
"

>

<FaPlay size={12}/>

</Link>



</div>






{/* Description */}

<p
className="
mt-5

text-sm
leading-relaxed

text-gray-500
dark:text-gray-400

line-clamp-2
"
>

{preview}...

</p>








{/* Progress */}


<div
className="
mt-5

rounded-2xl

bg-gray-50
dark:bg-white/5

p-4

space-y-3
"
>


<h4
className="
text-sm
font-semibold

text-gray-700
dark:text-gray-200
"
>

Progress

</h4>


{
progress.map((item:any)=>(


<div
key={item.id}

className="
flex
items-center
justify-between
"
>


<span
className="
text-xs
text-gray-400
"
>

{item.timeSpent} spent

</span>



<span
className={`

px-3
py-1

rounded-full

text-xs
font-semibold


${
item.completed

?

"bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"

:

"bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-300"

}

`}
>

{
item.completed
?
"Completed"

:
"In progress"
}


</span>



</div>


))

}


</div>







{/* Quiz Section */}

<div
className="
mt-8
border-t
border-gray-200

"
>


<div className="flex mt-4 items-center mb-4">


<h2
className="
text-lg
font-bold

text-gray-900
dark:text-white
"
>

Quizzes & Assessments

</h2>


</div>



<div
className="
grid

gap-4
w-full
"
>


{
quizzes.map((quiz)=>(


<div
key={quiz.id}

className="
rounded-2xl


dark:bg-white/5

p-5

hover:shadow-lg

transition
"
>


<h3
className="
text-xl
font-bold
text-gray-900
dark:text-white
"
>

{quiz.title}

</h3>



<div
className="
mt-3
space-y-1
text-sm
text-gray-500
dark:text-gray-400
"
>

<p className="text-sm">
 Passing score: {quiz.passingScore}%
</p>


<p className="text-sm">
⏱ Time: {quiz.timeLimit} minutes
</p>


</div>



<div className="flex justify-end items-end">
<button
onClick={() =>
 navigate(`/dashboard/quiz/${quiz.id}`)
 }
className="
mt-5


py-3
px-6
rounded-xl

bg-[#16423C]

text-white

font-semibold

text-sm

hover:-translate-y-0.5

transition

shadow-md

"

>

Start Quiz

</button>

</div>



</div>


))

}


</div>


</div>







{/* Footer */}


<div
className="
mt-6

pt-5

border-t

border-gray-100

dark:border-white/10

flex

items-center

justify-between
"
>


<span
className="
text-xs
text-gray-400
"
>

Continue learning

</span>



<Link

to={`/dashboard/courses/${courseId}/modules/${module.id}`}

className="
flex
items-center
gap-2

text-sm

font-semibold

text-[#16423C]

dark:text-[#dcf36c]

hover:gap-3

transition-all
"
>

Open Lesson

<FaArrowRight/>

</Link>


</div>



</div>

</div>
);
}
