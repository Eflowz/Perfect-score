import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Simply create an account, choose your preferred course, and click the enroll button to get started instantly.",
    },
    {
      question: "Can I access courses on my phone?",
      answer:
        "Yes, all courses are fully responsive and accessible across mobile phones, tablets, and desktop devices.",
    },
    {
      question: "Do I receive a certificate after completion?",
      answer:
        "Eligible courses provide verified digital certificates upon successful completion of all required lessons and assessments.",
    },
    {
      question: "Can I learn at my own pace?",
      answer:
        "Yes, our tracks are entirely self-paced, allowing you to learn whenever and wherever it is convenient for you.",
    },
    {
      question: "Can I take exams at any time?",
      answer:
        "Exams can be taken within the window specified by your course administrator. Be sure to check your specific dashboard track schedule for deadlines.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="FAQ"
      className="bg-gray-100dark:bg-gray-900 p-6 py-12 md:p-16 max-w-4xl mx-auto"
    >
      <div>
        <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Everything you need to know about our certification tracks and
            learning process.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white dark:bg-slate-800/50 border-[#16423C] dark:border-[#a9f5a8] shadow-md"
                    : "bg-white dark:bg-slate-800/20 border-gray-100 dark:border-slate-700/30 hover:border-gray-200 dark:hover:border-slate-700/60"
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left p-5 md:p-6 cursor-pointer focus:outline-none"
                >
                  <h3
                    className={`font-semibold text-base md:text-lg transition-colors duration-200 ${
                      isOpen
                        ? "text-[#16423C] dark:text-[#a9f5a8]"
                        : "text-gray-900 dark:text-white group-hover:text-[#16423C] dark:group-hover:text-[#a9f5a8]"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      isOpen
                        ? "text-[#16423C] dark:text-[#a9f5a8] rotate-180"
                        : "text-gray-400 dark:text-slate-500"
                    }`}
                  >
                    {isOpen ? <MdExpandLess /> : <MdExpandMore />}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
