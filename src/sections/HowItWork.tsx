const HowItWork = () => {
  const steps = [
    { id: "01", title: "Choose a course", desc: "Browse our catalog of 500+ specialized tracks curated for modern industries." },
    { id: "02", title: "Learn and complete", desc: "Dive into high-quality video lessons, dynamic interactive labs, and assignments." },
    { id: "03", title: "Take the exam", desc: "Schedule your secure validation assessment whenever you feel confident and ready." },
    { id: "04", title: "Get certified", desc: "Download your verified digital credentials and showcase them with your network." },
  ];

  return (
    <div id="HowItWork" className="bg-transparent p-6 py-12 md:p-16 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row mb-12 gap-5 items-start justify-between">
        <div className="flex gap-2 flex-col max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Your Path to <span className="text-[#16423C] dark:text-[#a9f5a8]">Success</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg dark:text-gray-400">
            A streamlined journey designed for maximum career impact.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.id} className="group relative p-8 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-[#16423C] dark:hover:border-[#a9f5a8] transition-all duration-300 shadow-xs hover:shadow-xl">
            
            {/* Top Row: Number & Small indicator */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex justify-center items-center bg-[#16423C]/5 dark:bg-[#a9f5a8]/10 w-12 h-12 rounded-2xl text-[#16423C] dark:text-[#a9f5a8] font-bold text-xl transition-colors group-hover:bg-[#16423C] group-hover:text-white dark:group-hover:bg-[#a9f5a8] dark:group-hover:text-[#060e20]">
                {step.id}
              </div>
              <div className="h-1 w-8 rounded-full bg-gray-100 dark:bg-slate-800 group-hover:bg-[#16423C] dark:group-hover:bg-[#a9f5a8] transition-all" />
           
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:translate-x-1 transition-transform">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
                {step.desc}
              </p>
            </div>

            {/* Subtle "Ghost Number" in bottom corner */}
            <span className="absolute bottom-4 right-6 text-6xl font-black opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
              {step.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;