import { useAuth } from "../../../context/auth/useAuth";
import { LogoutButton } from "../../auth/Logout";
import {
  MdSearch,
  MdNotificationsNone,
  MdOutlineKeyboardCommandKey,
  MdDarkMode,
  MdLightMode,
  MdKeyboardArrowDown,
  MdAdd,
} from "react-icons/md";
import CreateCourseModal from "../../admin/Adminsection/CreateCourseModal";
// import { FiLogOut } from "react-icons/fi";
import { useState, useEffect, useMemo, useRef } from "react";
//import { useCourse } from "../../../context/course/useCourse";
const Header = () => {
  const { user } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  // Theme state setup
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalLessonsCompleted = user?.completedLessons ?? 245;

  const xpMetrics = useMemo(() => {
    const totalXp = totalLessonsCompleted * 10;
    const currentLevel = Math.floor(totalXp / 500) + 1;
    return {
      xpDisplay: totalXp.toLocaleString(),
      level: currentLevel,
    };
  }, [totalLessonsCompleted]);

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return "AL";
    return user.name.substring(0, 2).toUpperCase();
  };

  // Get user display name
  const getUserDisplayName = () => {
    return user?.name || "Alex";
  };

  const isAdmin = user?.role === "SUPER_ADMIN";
  return (
    <>
      <header className="w-full h-16 border-b border-gray-200/80 dark:border-white/5 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8 transition-colors duration-200">
        {/* Left Column: Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-mono tracking-wide">
          <span className="text-gray-400 dark:text-[#6B8A85] hover:text-[#16423C] dark:hover:text-white cursor-pointer transition-colors">
            Dashboard
          </span>
          <span className="text-gray-300 dark:text-white/20">/</span>
          <span className="text-gray-400 dark:text-[#6B8A85] hover:text-[#16423C] dark:hover:text-white cursor-pointer transition-colors">
            Python Pro
          </span>
          <span className="text-gray-300 dark:text-white/20">/</span>
          <span className="text-[#16423C] dark:text-[#E2FB6C] font-semibold">
            Lesson_12
          </span>
        </div>

        {/* Right Column: Global Actions Stack */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          {/* Dynamic Search */}
          <div className="relative hidden lg:block group">
            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#16423C] dark:group-focus-within:text-[#E2FB6C] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search courses, topics..."
              className="w-64 bg-gray-100 dark:bg-[#16423C]/40 border border-gray-200 dark:border-white/5 focus:border-[#16423C]/30 dark:focus:border-[#E2FB6C]/30 rounded-xl pl-10 pr-12 py-1.5 text-xs text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-[#16423C]/70 transition-all duration-200"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-0.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-white/10 px-1.5 py-0.5 rounded-md text-[10px] font-mono text-gray-400 pointer-events-none select-none shadow-sm">
              <MdOutlineKeyboardCommandKey size={10} />
              <span>K</span>
            </div>
          </div>

          {/* Alerts Notification Anchor */}
          <button className="relative text-gray-400 dark:text-gray-400 hover:text-[#16423C] dark:hover:text-white p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer">
            <MdNotificationsNone size={20} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#16423C] dark:bg-[#E2FB6C] rounded-full ring-2 ring-white dark:ring-gray-950"></span>
          </button>

          {/* Theme Selector */}
          <button
            onClick={toggleTheme}
            className="text-gray-400 dark:text-gray-400 hover:text-[#16423C] dark:hover:text-white p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Toggle Theme Layout"
          >
            {darkMode ? (
              <MdDarkMode className="text-[#E2FB6C]" size={20} />
            ) : (
              <MdLightMode className="text-[#16423C]" size={20} />
            )}
          </button>

          <div className="h-5 w-px bg-gray-200 dark:bg-white/10"></div>

          {/* Stateful Clickable Profile Cluster */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2.5 pl-1 text-left focus:outline-none group cursor-pointer p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              {/* Identity Badge */}
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 text-[#16423C] dark:text-[#E2FB6C] border border-gray-200 dark:border-white/10 flex items-center justify-center font-mono text-xs font-bold shadow-sm select-none shrink-0">
                {getUserInitials()}
              </div>

              {/* Account Details Block */}
              <div className="flex-col space-y-0.5 hidden sm:block">
                <span className="text-xs font-bold text-gray-900 dark:text-white leading-none tracking-tight flex items-center gap-1">
                  {getUserDisplayName()}
                  <MdKeyboardArrowDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </span>
                <div className="flex items-center space-x-1.5 font-mono text-[9px] font-bold">
                  <span className="px-1 py-0.5 rounded bg-blue-500/10 dark:bg-[#E2FB6C]/10 text-blue-600 dark:text-[#E2FB6C] uppercase scale-95 origin-left">
                    LV {xpMetrics.level}
                  </span>
                  <span className="text-gray-400 dark:text-[#6B8A85]">
                    {xpMetrics.xpDisplay} XP
                  </span>
                </div>
              </div>
            </button>

            {/* Toggleable Action Dropdown Overlay Card */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#16423C] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
                <div className="px-2.5 py-2 border-b border-gray-100 dark:border-white/5 sm:hidden">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-[9px] font-mono text-gray-400 dark:text-[#6B8A85] mt-0.5">
                    Level {xpMetrics.level} • {xpMetrics.xpDisplay} XP
                  </p>
                </div>
                {/* Use LogoutButton as a child or wrapper */}
                <div className="w-full">
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
        </div>

        {/*create button for admin dashboard*/}
        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="
 hidden sm:flex items-center gap-2
 px-3 py-2 rounded-xl
 text-xs font-semibold
 transition-all duration-200

 bg-[#16423C] text-white
 hover:bg-[#0f2f2a] hover:shadow-md

 dark:bg-[#16423C]
 dark:hover:bg-[#1b4a42]
 "
          >
            <MdAdd size={16} />
            Create Course
          </button>
        )}
      </header>
      <CreateCourseModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
