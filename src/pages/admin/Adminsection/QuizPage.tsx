/*

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
;
import { getQuizById, submitQuiz } from "../../../api/quiz.api";

const QuizPage = () => {


const { id } = useParams();


const [quiz,setQuiz] = useState<any>(null);

const [answers,setAnswers] = useState<string[]>([]);

const [result,setResult] = useState<any>(null);





useEffect(()=>{


const loadQuiz = async()=>{

if(!id) return;


try{

const data = await getQuizById(id);

setQuiz(data);


// prepare empty answers

setAnswers(
new Array(data.questions.length).fill("")
);


}catch(err){

console.log(err);

}


};


loadQuiz();


},[id]);








const selectAnswer = (
questionIndex:number,
answer:string
)=>{


const updated = [...answers];


updated[questionIndex] = answer;


setAnswers(updated);


};








const handleSubmit = async()=>{


if(!id) return;


try{


const data = await submitQuiz(
id,
answers
);


console.log(
"Quiz Result:",
data
);


setResult(data);



}catch(err){

console.log(
"Submit error:",
err
);

}


};







if(!quiz){

return <p>Loading quiz...</p>;

}





return (

<div className="max-w-3xl mx-auto space-y-6">


<h1 className="text-2xl font-bold">

{quiz.title}

</h1>





{
quiz.questions.map(
(q:any,index:number)=>(


<div
key={index}
className="
bg-white
rounded-2xl
p-6
border
space-y-3
"
>


<h2 className="font-semibold">

{index+1}. {q.question}

</h2>



{
q.options.map(
(option:string)=>(


<label
key={option}
className="
flex
gap-3
cursor-pointer
"
>


<input

type="radio"

name={`question-${index}`}

checked={
answers[index] === option
}

onChange={()=>
selectAnswer(
index,
option
)
}

/>


{option}


</label>


)

)

}



</div>


)

)

}







<button

onClick={handleSubmit}

className="
px-6
py-3
rounded-xl
bg-[#16423C]
text-white
"

>

Submit Quiz

</button>






{
result && (

<div
className="
bg-green-50
p-5
rounded-xl
"
>

<h2 className="font-bold">

Quiz Completed 🎉

</h2>


<p>

Score: {result.score}%

</p>


<p>

{
result.passed
?
"Passed ✅"
:
"Failed ❌"
}

</p>


<p>

XP Earned: {result.xpAwarded}

</p>


</div>

)

}



</div>


);


};


export default QuizPage;
*/


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById, submitQuiz } from "../../../api/quiz.api";
import { FiCheckCircle, FiClock, FiAward } from "react-icons/fi";


const letters = ["A", "B", "C", "D", "E"];


const QuizPage = () => {


const { id } = useParams();


const [quiz,setQuiz] = useState<any>(null);
const [answers,setAnswers] = useState<string[]>([]);
const [result,setResult] = useState<any>(null);
const [loading,setLoading] = useState(true);





useEffect(()=>{


const loadQuiz = async()=>{


if(!id) return;


try{


const data = await getQuizById(id);


setQuiz(data);


setAnswers(
new Array(data.questions.length).fill("")
);



}catch(error){

console.log(error);


}finally{

setLoading(false);

}


};


loadQuiz();


},[id]);







const selectAnswer = (
questionIndex:number,
answer:string
)=>{


const updated = [...answers];


updated[questionIndex] = answer;


setAnswers(updated);


};








const handleSubmit = async()=>{


if(!id) return;


try{


const data = await submitQuiz(
id,
answers
);


setResult(data);


}catch(error){

console.log(
"Submit error",
error
);


}


};







if(loading){


return (

<div className="
min-h-[400px]
flex
items-center
justify-center
">

<div className="
text-center
space-y-3
">

<div className="
w-12
h-12
rounded-full
border-4
border-[#16423C]
border-t-transparent
animate-spin
mx-auto
"/>


<p className="
text-gray-500
dark:text-gray-400
">

Loading quiz...

</p>


</div>

</div>

)


}







if(!quiz){

return (

<p>
Quiz not found
</p>

)

}







return (


<div
className="
max-w-4xl
mx-auto
space-y-8
pb-10
"
>





{/* HEADER */}

<div
className="
rounded-3xl

bg-white
p-6
text-black
shadow-sm
"
>


<h1 className="
text-3xl
font-bold
"
>

{quiz.title}

</h1>



<div className="
flex
flex-wrap
gap-5
mt-4
text-sm
opacity-90
"
>


<div className="
flex
items-center
gap-2
">

<FiClock/>

{quiz.timeLimit} minutes

</div>




<div className="
flex
items-center
gap-2
">

<FiAward/>

Passing score {quiz.passingScore}%

</div>



</div>



</div>








{/* QUESTIONS */}


{

quiz.questions.map(
(q:any,index:number)=>(


<div

key={index}

className="
bg-white
dark:bg-[#16423C]
rounded-3xl
p-6
shadow-sm
border
border-gray-100
dark:border-white/10
space-y-5
transition
hover:shadow-lg
"


>



<div
className="
flex
items-center
gap-3
"
>

<span
className="
w-10
h-10
rounded-full
bg-[#16423C]/10
dark:bg-white/10
flex
items-center
justify-center
font-bold
text-[#16423C]
dark:text-white
"
>

{index + 1}

</span>


<p className="
font-semibold
text-lg
text-gray-900
dark:text-white
"
>

{q.question}

</p>


</div>







<div className="
space-y-3
"
>


{

q.options.map(
(option:string,optionIndex:number)=>(


<button

key={option}

type="button"

onClick={()=>selectAnswer(index,option)}

className={`
w-full
flex
items-center
gap-4
p-4
rounded-2xl
border
text-left
transition-all
duration-200

${
answers[index] === option

?

"bg-[#16423C] text-white border-[#16423C] scale-[1.01]"

:

"bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:border-[#16423C]"

}

`}

>


<span
className={`
w-8
h-8
rounded-full
flex
items-center
justify-center
font-bold

${
answers[index] === option
?
"bg-white text-[#16423C]"
:
"bg-[#16423C]/10 text-[#16423C] dark:text-white"
}

`}
>

{letters[optionIndex]}

</span>


<span>

{option}

</span>


</button>


)

)


}


</div>



</div>


)

)

}









<button

onClick={handleSubmit}

className="
w-full
py-4
rounded-2xl
bg-[#16423C]
text-white
font-semibold
text-lg
shadow-lg
hover:-translate-y-1
transition
"

>

Submit Quiz

</button>









{/* RESULT */}


{

result && (

<div

className="
rounded-3xl
bg-green-50
dark:bg-green-900/20
p-6
border
border-green-200
dark:border-green-800
space-y-3
"

>


<div className="
flex
items-center
gap-3
text-green-700
dark:text-green-300
"
>

<FiCheckCircle size={28}/>


<h2 className="
text-xl
font-bold
">

Quiz Completed 🎉

</h2>


</div>



<p>

Score: <b>{result.score}%</b>

</p>


<p>

{
result.passed
?
"Passed ✅"
:
"Failed ❌"
}

</p>


<p>

XP Earned: <b>{result.xpAwarded}</b>

</p>



</div>


)

}



</div>


);


};


export default QuizPage;