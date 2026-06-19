import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-transparent border-t border-gray-100 dark:border-slate-800/60 p-6 pt-16 md:p-16">
      <div className="max-w-7xl mx-auto">
        {/* --- Main Info Grid Columns --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Identity / Bio */}
          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Perfect Score
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              Learn in-demand skills, validate your engineering proficiency with
              rigorous assessments, and achieve your global career milestones.
            </p>

            {/* Social Media Links Layer */}
            <div className="flex gap-4 mt-2 text-gray-400 dark:text-slate-500">
              <a
                href="#"
                className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors duration-200"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors duration-200"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="#"
                className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors duration-200"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="#"
                className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors duration-200"
              >
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>

          {/* Navigation Tracks */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase text-gray-900 dark:text-slate-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <li>
                <a
                  href="#features"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  Features Overview
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  Certification Tracks
                </a>
              </li>
              <li>
                <a
                  href="#HowItWork"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#FAQ"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  General FAQ
                </a>
              </li>
              <li>
                <a
                  href="#Testimonial"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Courses Column */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase text-gray-900 dark:text-slate-300 mb-4">
              Popular Tracks
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <li>
                <a
                  href="#courses"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  Python Mastery
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  DevOps Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  Data Analytics
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  Cloud Systems
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="hover:text-[#16423C] dark:hover:text-[#a9f5a8] transition-colors"
                >
                  Software Architecture
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Utility Metabar Row --- */}
        <div className="border-t border-gray-100 dark:border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} Perfect Score. Engineered to build
            future-proof careers.
          </div>
          <div className="flex gap-6 font-medium">
            <a
              href="#"
              className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </a>
            {/* <a href="#" className="hover:text-gray-800 dark:hover:text-slate-300 transition-colors">Cookie Dashboard</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
