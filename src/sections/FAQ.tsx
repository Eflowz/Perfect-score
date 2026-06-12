import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const FAQ = () => {
const faqs = [
 {
 question: "How do I enroll in a course?",
 answer:
 "Simply create an account, choose your preferred course, and click the enroll button to get started."
 },
 {
 question: "Can I access courses on my phone?",
 answer:
 "Yes, all courses are accessible on mobile phones, tablets, and desktop devices."
 },
 {
 question: "Do I receive a certificate after completion?",
 answer:
 "Eligible courses provide certificates upon successful completion of all required lessons and assessments."
 },
 {
 question: "Can I learn at my own pace?",
 answer:
 "Yes, courses are self-paced, allowing you to learn whenever it is convenient for you."
 },
 {
 question: "Can I take exams at any time?",
 answer:
 "Exams can only be taken within the period specified by your instructor or course administrator. Be sure to check the exam schedule and deadlines."
 }
];
const [openIndex, setOpenIndex] = useState<number | null>(null);

 const handleToggle = (index: number) => {
 setOpenIndex(openIndex === index ? null : index);
 };
    return ( <div id="FAQ" className="bg-[#f9f1ff] dark:bg-[#060e20] p-10 md:p-15">
    <div>
       <div className="flex flex-col gap-2 mb-10 justify-center items-center">
        <h2 className="text-black text-2xl md:text-3xl tracking-wide head font-semibold dark:text-white">Common Questions
</h2>
    
        <p className="dark:text-[#cac4cf] text-gray-700">Everything you need to know about the EduCert experience.</p>
        </div> 

    <div className="space-y-3">
 {faqs.map((faq, index) => (
 <div
 key={index}
 className="bg-white dark:bg-[#1b2337]  text-gray-800 rounded-2xl p-5 md:p-8 shadow-sm"
 >
 <button
 onClick={() => handleToggle(index)}
 className="w-full flex justify-between items-center text-left"
 >
 <h3 className="font-semibold text-xl text-gray-900 md:text-2xl dark:text-white">{faq.question}</h3>
 <span className="cursor-pointer text-xl dark:text-[#cac4cf]">{openIndex === index ? <MdExpandLess /> : <MdExpandMore />}</span>
 </button>

 {openIndex === index && (
 <p className="mt-3 text-gray-600 text-lg dark:text-[#cac4cf] ">{faq.answer}</p>
 )}
 </div>
 ))}
 </div>
    </div>
    </div> );
}
 
export default FAQ;