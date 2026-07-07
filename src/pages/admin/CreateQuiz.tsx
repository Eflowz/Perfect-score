/*
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { createQuiz } from "../../api/admin.quiz.api";
import { getCourseById } from "../../api/courses.api";
import type { Course, Module} from "../../types/courses.types";


type Question = {
 type: string;
 question: string;
 options: string[];
 correctAnswer: string;
 explanation: string;
 points: number;
};


const CreateQuiz = () => {

 const { id: courseId } = useParams();


 const [course, setCourse] = useState<Course | null>(null);

 const [moduleId, setModuleId] = useState("");

 const [title, setTitle] = useState("");
 const [passingScore, setPassingScore] = useState(70);
 const [timeLimit, setTimeLimit] = useState(10);

 const [loading, setLoading] = useState(false);


 const [questions, setQuestions] = useState<Question[]>([
 {
 type: "multiple-choice",
 question: "",
 options: ["", "", ""],
 correctAnswer: "",
 explanation: "",
 points: 10,
 },
 ]);



 // ✅ FETCH COURSE + MODULES
 useEffect(() => {

 const loadCourse = async () => {

 if (!courseId) return;

 try {

 const data = await getCourseById(courseId);

 setCourse(data);

 } catch (err) {

 console.log("Failed to load course:", err);

 }

 };

 loadCourse();

 }, [courseId]);



 // UPDATE QUESTION
 const updateQuestion = (
 index: number,
 field: keyof Question,
 value: any
 ) => {

 const updated = [...questions];

 updated[index] = {
 ...updated[index],
 [field]: value,
 };

 setQuestions(updated);

 };



 // UPDATE OPTION
 const updateOption = (
 questionIndex: number,
 optionIndex: number,
 value: string
 ) => {

 const updated = [...questions];

 updated[questionIndex].options[optionIndex] = value;

 setQuestions(updated);

 };



 const addQuestion = () => {

 setQuestions([
 ...questions,
 {
 type: "multiple-choice",
 question: "",
 options: ["", "", ""],
 correctAnswer: "",
 explanation: "",
 points: 10,
 },
 ]);

 };



 const handleSubmit = async () => {

 if (!courseId) {
 console.log("Course ID missing");
 return;
 }

 if (!moduleId) {
 console.log("Please select a module");
 return;
 }


 try {

 setLoading(true);


 const payload = {
 moduleId,
 title,
 passingScore,
 timeLimit,
 questions,
 };


 const response = await createQuiz(
 courseId,
 payload
 );


 console.log("Quiz created:", response);

 alert("Quiz created successfully");

 } catch (error) {

 console.log("Create quiz error:", error);

 } finally {

 setLoading(false);

 }

 };



 return (

 <div className="max-w-4xl mx-auto space-y-6">


 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
 Create Quiz
 </h1>





 <div className="bg-white dark:bg-[hashtag#16423C] rounded-2xl p-6 space-y-4 border">


 <input
 placeholder="Quiz title"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 className="w-full p-3 rounded-xl border"
 />



 <select
 value={moduleId}
 onChange={(e) => setModuleId(e.target.value)}
 className="w-full p-3 rounded-xl border"
 >

 <option value="">
 Select Module
 </option>

 {course?.modules?.map((m) => (
 <option key={m.id} value={m.id}>
 {m.title}
 </option>
 ))}

 </select>



 <div className="flex gap-4">


 <input
 type="number"
 value={passingScore}
 onChange={(e) => setPassingScore(Number(e.target.value))}
 className="p-3 rounded-xl border"
 placeholder="Passing Score"
 />


 <input
 type="number"
 value={timeLimit}
 onChange={(e) => setTimeLimit(Number(e.target.value))}
 className="p-3 rounded-xl border"
 placeholder="Time Limit"
 />


 </div>


 </div>






 {questions.map((q, index) => (

 <div
 key={index}
 className="bg-white dark:bg-[hashtag#16423C] rounded-2xl p-6 space-y-4 border"
 >


 <h2 className="font-bold">
 Question {index + 1}
 </h2>



 <input
 placeholder="Question"
 value={q.question}
 onChange={(e) =>
 updateQuestion(index, "question", e.target.value)
 }
 className="w-full p-3 border rounded-xl"
 />



 {q.options.map((option, i) => (

 <input
 key={i}
 placeholder={`Option ${i + 1}`}
 value={option}
 onChange={(e) =>
 updateOption(index, i, e.target.value)
 }
 className="w-full p-3 border rounded-xl"
 />

 ))}



 <input
 placeholder="Correct Answer"
 value={q.correctAnswer}
 onChange={(e) =>
 updateQuestion(index, "correctAnswer", e.target.value)
 }
 className="w-full p-3 border rounded-xl"
 />



 <textarea
 placeholder="Explanation"
 value={q.explanation}
 onChange={(e) =>
 updateQuestion(index, "explanation", e.target.value)
 }
 className="w-full p-3 border rounded-xl"
 />


 </div>

 ))}





 <button
 onClick={addQuestion}
 className="px-5 py-3 rounded-xl border"
 >
 + Add Question
 </button>



 <button
 onClick={handleSubmit}
 disabled={loading}
 className="px-6 py-3 rounded-xl bg-[#16423C] text-white"
 >
 {loading ? "Creating..." : "Create Quiz"}
 </button>



 </div>

 );

};

export default CreateQuiz;

*/

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";

import { createQuiz } from "../../api/admin.quiz.api";
import { getCourseById } from "../../api/courses.api";
import type { Course } from "../../types/courses.types";
import { FaMinus, FaPlus } from "react-icons/fa";


type Question = {
 type: string;
 question: string;
 options: string[];
 correctAnswer: string;
 explanation: string;
 points: number;
};


const CreateQuiz = () => {

 const { id: courseId } = useParams();
 const [searchParams] = useSearchParams();
 const queryModuleId = searchParams.get("moduleId") || "";


 const [course, setCourse] = useState<Course | null>(null);

 const [moduleId, setModuleId] = useState("");

 useEffect(() => {
   if (queryModuleId) {
     setModuleId(queryModuleId);
   }
 }, [queryModuleId]);

 const [title, setTitle] = useState("");


 const [passingScore, setPassingScore] = useState(70);

 const [timeLimit, setTimeLimit] = useState(10);

 const [loading, setLoading] = useState(false);



 const [questions, setQuestions] = useState<Question[]>([
 {
 type: "multiple-choice",
 question: "",
 options: [
 "",
 "",
 ""
 ],
 correctAnswer: "",
 explanation: "",
 points: 10,
 }
 ]);




 // Fetch course modules

 useEffect(() => {

 const loadCourse = async () => {

 if (!courseId) return;


 try {

 const data = await getCourseById(courseId);

 setCourse(data);


 } catch(error) {

 console.log(
 "Failed to load course:",
 error
 );

 }

 };


 loadCourse();


 }, [courseId]);





 // Update question text/explanation

 const updateQuestion = (
 index:number,
 field:keyof Question,
 value:any
 ) => {

 const updated = [...questions];


 updated[index] = {
 ...updated[index],
 [field]: value
 };


 setQuestions(updated);

 };





 // Update option text

 const updateOption = (
 questionIndex:number,
 optionIndex:number,
 value:string
 ) => {

 const updated = [...questions];


 updated[questionIndex].options[optionIndex] = value;


 setQuestions(updated);

 };





 // Select correct answer

 const selectCorrectAnswer = (
 questionIndex:number,
 answer:string
 ) => {

 const updated = [...questions];


 updated[questionIndex].correctAnswer = answer;


 setQuestions(updated);

 };

const [openModuleDropdown, setOpenModuleDropdown] = useState(false);
const [selectedModule, setSelectedModule] = useState("");



 // Add new option

 const addOption = (
 questionIndex:number
 ) => {

 const updated = [...questions];


 updated[questionIndex].options.push("");


 setQuestions(updated);

 };





 // Remove option

 const removeOption = (
 questionIndex:number,
 optionIndex:number
 ) => {

 const updated = [...questions];


 updated[questionIndex].options.splice(
 optionIndex,
 1
 );


 setQuestions(updated);

 };





 // Add question

 const addQuestion = () => {

 setQuestions([
 ...questions,

 {
 type:"multiple-choice",
 question:"",
 options:[
 "",
 "",
 ""
 ],
 correctAnswer:"",
 explanation:"",
 points:10
 }

 ]);

 };





 // Remove question

 const removeQuestion = (
 index:number
 ) => {

 const updated = [...questions];


 updated.splice(
 index,
 1
 );


 setQuestions(updated);

 };





 const handleSubmit = async () => {


 if(!courseId){

 console.log(
 "Course id missing"
 );

 return;

 }


 if(!moduleId){

 console.log(
 "Select module first"
 );

 return;

 }



 try {


 setLoading(true);



 const payload = {

 moduleId,

 title,

 passingScore,

 timeLimit,

 questions

 };



 const response = await createQuiz(
 courseId,
 payload
 );



 console.log(
 "Quiz created:",
 response
 );


 alert(
 "Quiz created successfully"
 );


 } catch(error){


 console.log(
 "Create quiz error:",
 error
 );


 } finally {

 setLoading(false);

 }


 };

 return (

<div className="
max-w-5xl
mx-auto
space-y-8
pb-10
">


{/* HEADER */}

<div className="
flex
flex-col
gap-2
">

<h1 className="
text-3xl
font-bold
text-gray-900
dark:text-white
">

Create Quiz

</h1>


<p className="
text-gray-500
dark:text-gray-400
">

Build a multiple choice quiz for your course

</p>


</div>





{/* QUIZ SETTINGS */}

<div className="
bg-white
dark:bg-[#16423C]
border
border-gray-200
dark:border-white/10
rounded-3xl
p-6
shadow-sm
animate-fade-in
space-y-5
">


<h2 className="
text-lg
font-semibold
text-gray-900
dark:text-white
">

Quiz Information

</h2>




<input

placeholder="Quiz title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="
w-full
rounded-xl
border
border-gray-200
dark:border-white/10
bg-transparent
p-3
outline-none
focus:ring-2
focus:ring-[#16423C]
dark:text-white
"

/>



<div className="relative">

{/* Trigger */}

<button
type="button"
onClick={() => setOpenModuleDropdown(!openModuleDropdown)}
className="
w-full
flex

items-center
justify-between
rounded-xl
border
border-gray-200
dark:border-white/10
bg-white
dark:bg-[#16423C]
p-3
text-left
text-gray-700
dark:text-white
transition

"
>

<span>
{
selectedModule
?
course?.modules?.find(
(module)=>module.id === selectedModule
)?.title
:
"Select Module"
}
</span>


<svg
className={`
w-5
h-5
transition-transform
${openModuleDropdown ? "rotate-180" : ""}
`}
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>

<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
d="M19 9l-7 7-7-7"
/>

</svg>


</button>




{/* Dropdown */}

{
openModuleDropdown && (

<div
className="
absolute
z-50
mt-2
w-full
py-5
overflow-hidden
rounded-xl
border
border-gray-200
dark:border-white/10
bg-white
dark:bg-[#16423C]
shadow-xl
animate-in
fade-in
slide-in-from-top-2
duration-200
"
>


{
course?.modules?.map((module)=>(

<button

key={module.id}

type="button"

onClick={()=>{
setModuleId(module.id);
setSelectedModule(module.id);
setOpenModuleDropdown(false);
}}

className="
w-full
px-4
py-3
text-left
text-sm
text-gray-700
dark:text-white
hover:bg-[#16423C]/10
dark:hover:bg-white/10
transition
"

>

{module.title}


</button>


))

}



{
!course?.modules?.length && (

<p className="
p-4
text-sm
text-gray-400
">

No modules available

</p>

)

}



</div>

)

}


</div>





<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
">


<div
className="
flex
items-center
justify-between
rounded-xl
border
border-gray-200
dark:border-white/10
p-3
bg-white
dark:bg-transparent
w-full
"
>

<span className="
text-sm
text-gray-500
dark:text-gray-400
">
Passing Score
</span>


<div className="
flex
items-center
gap-3
"
>

<button
type="button"
onClick={() =>
setPassingScore((prev)=> Math.max(0, prev - 1))
}
className="
w-8
h-8
rounded-lg
bg-gray-100
dark:bg-white/10
text-gray-700
dark:text-white
hover:bg-gray-200
dark:hover:bg-white/20
transition
"
>
−
</button>



<span
className="
font-semibold
text-gray-900
dark:text-white
min-w-8
text-center
"
>
{passingScore}
</span>




<FaPlus 
onClick={() =>
setPassingScore((prev)=> Math.min(100, prev + 1))
}
size={26}
className="
p-2
rounded-lg
bg-[#16423C]
text-white
hover:opacity-90
transition
"
/>



</div>


</div>



<div
className="
flex
items-center
justify-between
rounded-xl
border
border-gray-200
dark:border-white/10
p-3
bg-white
dark:bg-transparent
w-full
"
>

<span
className="
text-sm
text-gray-500
dark:text-gray-400
"
>
Time Limit
</span>


<div
className="
flex
items-center
gap-3
"
>


<button
type="button"
onClick={() =>
setTimeLimit((prev) => Math.max(1, prev - 1))
}
className="
w-8
h-8
rounded-lg
bg-gray-100
dark:bg-white/10
text-gray-700
dark:text-white
hover:bg-gray-200
dark:hover:bg-white/20
transition
"
>
    <FaMinus />
</button>



<span
className="
font-semibold
text-gray-900
dark:text-white
min-w-10
text-center
"
>
{timeLimit} min
</span>



  <FaPlus 
onClick={() =>
setTimeLimit((prev) => prev + 1)
}
size={26}
className="
p-2
rounded-lg
bg-[#16423C]
text-white
hover:opacity-90
transition
"
/>



</div>


</div>


</div>


</div>








{/* QUESTIONS */}


{

questions.map((q,index)=>(


<div

key={index}

className="
bg-white
dark:bg-[#16423C]
border
border-gray-200
dark:border-white/10
rounded-3xl
p-6
space-y-5
shadow-sm
transition
hover:-translate-y-1
duration-300
animate-fade-in
"


>



<div className="
flex
justify-between
items-center
">


<h2 className="
font-bold
text-lg
dark:text-white
">

Question {index + 1}

</h2>



{

questions.length > 1 && (

<button

onClick={()=>removeQuestion(index)}
className="
group
w-9
h-9
rounded-full
bg-white
dark:bg-white/10
border
border-gray-200
dark:border-white/10
flex
items-center
justify-center
shadow-sm
hover:shadow-md
hover:scale-105
transition-all
duration-200
"
>

<FiTrash2
className="
text-gray-400
group-hover:text-red-500
transition-colors
duration-200
"
/>

</button>

)

}


</div>





<input

placeholder="Enter question"

value={q.question}

onChange={(e)=>

updateQuestion(
index,
"question",
e.target.value
)

}

 className="
 mt-2 w-full px-4 py-3 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 text-gray-900 dark:text-white
 focus:outline-none focus:ring-2 focus:ring-[#16423C]
 transition
 "

/>







{/* OPTIONS */}


<div className="
space-y-3
">


<p className="
text-sm
font-medium
dark:text-white
">

Select correct answer

</p>



{
q.options.map((option, i) => (

<div
key={i}
className="
flex
items-center
gap-3
"
>

{/* Correct Answer Radio */}

<input

type="radio"

name={`question-${index}`}

checked={
q.correctAnswer === option &&
option !== ""
}

onChange={() =>
selectCorrectAnswer(
index,
option
)
}
 className="
 mt-2 w-4 h-4 px-4 py-3 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 text-gray-900 dark:text-white
 focus:outline-none focus:ring-2 focus:ring-[#16423C]
 transition
 "

/>



{/* Option Label */}

<span
className="
font-semibold
text-gray-700
dark:text-white
w-6
"
>

{String.fromCharCode(65 + i)}.

</span>





{/* Option Input */}

<input

placeholder={`Option ${String.fromCharCode(65 + i)}`}

value={option}

onChange={(e) =>

updateOption(
index,
i,
e.target.value
)

}

className="
flex-1
rounded-xl
border
border-gray-200
dark:border-white/10
p-3
bg-transparent
dark:text-white
outline-none
focus:ring-2
focus:ring-[#16423C]
"

/>





{/* Remove Option */}

{

q.options.length > 2 && (

<button
type="button"
onClick={() => removeOption(index, i)}
className="
group
w-9
h-9
rounded-full
bg-white
dark:bg-white/10
border
border-gray-200
dark:border-white/10
flex
items-center
justify-center
shadow-sm
hover:shadow-md
hover:scale-105
transition-all
duration-200
"
>

<FiTrash2
className="
text-gray-400
group-hover:text-red-500
transition-colors
duration-200
"
/>

</button>

)

}


</div>


))
}



<button

onClick={()=>addOption(index)}

className="
flex
items-center
gap-2
text-sm
text-[#16423C]
dark:text-[#dcf36c]
"

>

<FiPlus/>

Add Option

</button>


</div>








<textarea

placeholder="Explanation"

value={q.explanation}

onChange={(e)=>

updateQuestion(
index,
"explanation",
e.target.value
)

}

 className="
 mt-2 w-full px-4 py-3 rounded-xl
 bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 text-gray-900 dark:text-white
 focus:outline-none focus:ring-2 focus:ring-[#16423C]
 transition
 "

/>





<div className="
flex
items-center
gap-2
text-sm
text-gray-500
dark:text-gray-300
">

<FiCheckCircle/>

Points: {q.points}

</div>




</div>


))


}








{/* ACTION BUTTONS */}


<div className="
flex
flex-col
sm:flex-row
gap-4
">


<button

onClick={addQuestion}

className="
flex
items-center
justify-center
gap-2
px-6
py-3
rounded-xl
border
border-gray-300
dark:border-white/20
dark:text-white
hover:bg-gray-100
dark:hover:bg-white/10
transition
"

>


<FiPlus/>

Add Question

</button>







<button

onClick={handleSubmit}

disabled={loading}

className="
px-8
py-3
rounded-xl
bg-[#16423C]
text-white
font-semibold
hover:opacity-90
transition
disabled:opacity-50
"

>


{

loading

?

"Creating Quiz..."

:

"Create Quiz"

}


</button>



</div>






</div>

);

};


export default CreateQuiz;