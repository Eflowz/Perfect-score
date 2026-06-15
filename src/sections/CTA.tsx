import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CTA = () => {
  return (
    <div className="bg-transparent p-6 py-12 md:p-16 max-w-7xl mx-auto">
      {/* Outer Card Container styled with your brand's deep forest green */}
      <div className="relative overflow-hidden bg-[#16423C] rounded-[2.5rem] p-8 py-16 md:p-16 flex flex-col justify-center items-center shadow-xl text-center">
        
        {/* --- Premium Background SVG Lines & Defs --- */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-40">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Linear gradient mapping for the vector line pathing */}
              <linearGradient id="cta-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2FB6C" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#a9f5a8" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#16423C" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Elegant Abstract Accent Flow Lines */}
            <path
              d="M-100,200 C150,50 350,350 600,100 C750,-20 850,150 950,50"
              stroke="url(#cta-line-grad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M-50,260 C200,110 400,410 650,160 C800,40 900,210 1000,110"
              stroke="url(#cta-line-grad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M-150,120 C100,-30 250,270 500,20 C650,-100 750,70 850,-30"
              stroke="url(#cta-line-grad)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* --- Content Layers --- */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Advance Your Career?
          </h2>
          
          <p className="text-base md:text-xl text-emerald-100/80 leading-relaxed max-w-2xl font-medium">
            Join thousands of professionals today and gain unrestricted access to premium learning tools, expert guides, and globally recognized credentials.
          </p>
          
          <div className="mt-4">
            {/* Brand New Lime/Neon Green Accent Button */}
            <Link
              to="/register"
              className="group flex items-center gap-3 bg-[#E2FB6C] hover:bg-[#d0eb59] text-[#16423C] font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 outline-none"
            >
              <span className="text-sm md:text-base tracking-wide">Sign Up Now</span>
              <FiArrowRight className="text-lg transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
        
        {/* Decorative corner glow rings */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#E2FB6C]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#a9f5a8]/10 blur-3xl pointer-events-none" />

      </div>
    </div>
  );
};

export default CTA;