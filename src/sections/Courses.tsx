import { useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"; // Required base styling for positioning

const Courses = () => {
  type Course = {
    id: number;
    img: string;
    name: string;
    desc: string;
    time: string;
  };

  const [courses] = useState<Course[]>([
    {
      id: 1,
      img: "/images/soft-p.webp",
      name: "Python Mastery",
      desc: "Master Variables, Data Types, OOP, File Handling, APIs, Databases, and web building frameworks like Django or Flask.",
      time: "3 Hours daily",
    },
    {
      id: 2,
      img: "/images/soft-d.jpg",
      name: "DevOps Engineering",
      desc: "Learn Linux Networking, Shell scripting, CI/CD pipelines, Docker, Kubernetes, and Infrastructure as Code using Terraform.",
      time: "4 hours daily",
    },
    {
      id: 3,
      img: "/images/score-2.png",
      name: "Data Analysis",
      desc: "Excel, SQL, Python, Statistics, Data cleaning, Data visualization, and building operational dashboards with Power BI & Tableau.",
      time: "4 hours daily",
    },
    {
      id: 4,
      img: "/images/soft-c.jpg",
      name: "Cloud Computing",
      desc: "Learn Virtual machines, Storage systems, Networking, Security, Serverless computing, and Cloud architecture across AWS & Azure.",
      time: "5 hours daily",
    },
    {
      id: 5,
      img: "/images/score-1.png",
      name: "Software Engineering",
      desc: "Deep dive into algorithms, system design, databases, scalable backend systems, APIs, and modern enterprise software architectures.",
      time: "6 hours daily",
    },
  ]);

  // Track the current index position of the slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // Setup the smart slider configuration
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    // Breakpoints define how many cards show dynamically depending on screen real estate
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 32 },
      },
    },
    slides: { perView: 1, spacing: 16 },
  });

  // Action: Trigger slider to swipe dynamically to the hidden elements
  const handleViewAllToggle = () => {
    if (instanceRef.current) {
      if (currentSlide > 0) {
        instanceRef.current.moveToIdx(0); // Swipe back to start
      } else {
        instanceRef.current.moveToIdx(courses.length - 1); // Swipe smoothly to the end
      }
    }
  };

  return (
    <div id="courses" className="bg-transparent p-6 pt-12 md:p-16 md:pt-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl md:text-3xl dark:text-white text-gray-900 font-bold tracking-tight">
            Popular Certification Tracks
          </h3>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Most chosen by professionals for skill elevation this quarter.
          </p>
        </div>
        
        {/* --- Smart UI Control Bar --- */}
        <div className="flex items-center gap-4 self-end sm:self-auto">
          {/* Main Action Link */}
          <button
            onClick={handleViewAllToggle}
            className="group flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none font-semibold text-[#16423C] dark:text-[#a9f5a8] text-sm md:text-base transition-all"
          >
            <span>{currentSlide > 0 ? "Reset View" : "View All Courses"}</span>
            <FaAngleRight className={`transform transition-transform text-xs ${currentSlide > 0 ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
          </button>

          {/* Minimalist Visual Pagination Dots / Navigation Arrows */}
          <div className="flex gap-2 items-center border-l pl-4 border-gray-200 dark:border-slate-700">
            <button
              onClick={() => instanceRef.current?.prev()}
              disabled={currentSlide === 0}
              className="p-2 rounded-xl border border-gray-100 dark:border-slate-800 disabled:opacity-30 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <FaAngleLeft className="text-xs" />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              disabled={instanceRef.current ? currentSlide >= instanceRef.current.track.details.maxIdx : false}
              className="p-2 rounded-xl border border-gray-100 dark:border-slate-800 disabled:opacity-30 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <FaAngleRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Swipeable Slider Wrapper (Keen-slider hook injected here) --- */}
      <div ref={sliderRef} className="keen-slider overflow-visible! sm:overflow-hidden!">
        {courses.map((item) => (
          <div
            key={item.id}
            className="keen-slider__slide group flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/30 shadow-xs duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Image Container with Safe Bounds */}
            <div className="w-full h-48 md:h-52 overflow-hidden bg-gray-100 dark:bg-slate-900">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                draggable="false" // Ensures drag swiping doesn't pull image assets weirdly
              />
            </div>

            {/* Content Details Block */}
            <div className="flex flex-col flex-1 justify-between p-6 md:p-8">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                  {item.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Card Meta Data */}
              <div className="flex gap-2 items-center text-gray-500 dark:text-gray-400 border-t border-gray-50 dark:border-slate-700/40 pt-4 mt-auto">
                <MdOutlineTimer className="text-lg text-[#16423C] dark:text-[#a9f5a8]" />
                <span className="text-xs md:text-sm font-medium tracking-wide">
                  {item.time}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;