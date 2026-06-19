export default function HeroSection() {
  return (
    <section
      id="hero"
      className="bg-transparent min-h-screen text-[#112211] dark:text-[#E8ECD7] font-sans antialiased overflow-hidden relative px-6 py-12 md:py-20"
    >
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <svg
          className="absolute inset-0 w-full h-full opacity-60 dark:opacity-[0.15]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-gray-200 dark:text-slate-700"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* ================== CONTENT LAYER================== */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mt-28 md:mt-36">
        <div className="max-w-7xl mx-auto text-center mt-36 md:mt-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Experience the future of Tech education with{" "}
            <span className="text-[#16423C] dark:text-[#C2FFC1]">
              Perfect Score
            </span>
            .
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-6xl dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Lightning-fast performance, seamless offline access, and instant app
            installation. Your learning never stops.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/login">
              <button className="bg-[#16423C] dark:bg-[#C2FFC1] text-white dark:text-[#060e20] font-semibold px-8 py-3.5 rounded-full hover:bg-[#0d2a26] dark:hover:bg-[#aefcae] transition-colors shadow-sm">
                Get Started
              </button>
            </a>
            <button className="bg-white dark:bg-transparent text-[#16423C] dark:text-white border border-gray-200 dark:border-gray-700 font-semibold px-8 py-3.5 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm">
              Try Demo
            </button>
          </div>
        </div>

        {/* --- Product/Image Showcase Frame --- */}
        <div className="mt-14 md:mt-20 max-w-5xl mx-auto">
          <div className="container mx-auto px-2 md:px-4">
            {/* Mockup Frame with modern translucent borders */}
            <div className="relative rounded-2xl md:rounded-4xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-2">
              <div className="overflow-hidden rounded-xl md:rounded-[1.7rem] relative">
                <img
                  src="/images/group-1.avif"
                  alt="Perfect Score Dashboard Interface"
                  className="w-full h-auto max-h-137.5 object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
                {/* Soft Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent dark:from-black/60 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
