import { LogoutButton } from "../../auth/Logout";
import {
  MdSearch,
  MdOutlineKeyboardCommandKey,
  MdDarkMode,
  MdLightMode,
  MdKeyboardArrowDown,
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import CreateCourseModal from "../../admin/Adminsection/CreateCourseModal";
import { getCurrentUser } from "../../../api/user.api";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { useUser } from "../../../context/user/useUser";
import NotificationDropdown from "../../../components/common/NotificationDropdown";

interface HeaderProps {
  showSidebarToggle?: boolean;
  isSidebarExpanded?: boolean;
  onSidebarToggle?: () => void;
}

const Header = ({
  showSidebarToggle = false,
  isSidebarExpanded = true,
  onSidebarToggle,
}: HeaderProps) => {
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
const location = useLocation();

const showSearch =
 location.pathname.includes("/courses") ||
 location.pathname.includes("/modules");
  // Theme state setup
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [setUser]);

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalLessonsCompleted = user?.completedLessons ?? 0;

  const xpMetrics = useMemo(() => {
    const totalXp = user?.xp ?? totalLessonsCompleted * 10;
    const currentLevel = user?.level ?? Math.floor(totalXp / 500) + 1;
    return {
      xpDisplay: totalXp.toLocaleString(),
      level: currentLevel,
    };
  }, [user?.xp, user?.level, totalLessonsCompleted]);

  // Get user initials safely
  const getUserInitials = () => {
    if (!user?.name) return "G";
    return user.name.substring(0, 2).toUpperCase();
  };

  const isAdmin = user?.role === "SUPER_ADMIN";
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <>
      <header className="w-full h-16 border-b border-gray-200/80 dark:border-white/5 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8 transition-colors duration-200">
        
        {/* Left Column: Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-wide">
          {showSidebarToggle && (
            <button
              type="button"
              onClick={onSidebarToggle}
              className="mr-2 p-2 rounded-xl border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-gray-950/70 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors"
              aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarExpanded ? <MdChevronLeft size={18} /> : <MdChevronRight size={18} />}
            </button>
          )}
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            let name = value;
            if (value.match(/^[0-9a-fA-F]{24}$/) || value.startsWith("cm") || value.length > 20) {
              name = "details";
            } else {
              name = value.replace(/-/g, " ");
            }

            return (
              <span key={to} className="flex items-center space-x-2">
                {index > 0 && <span className="text-gray-300 dark:text-white/20">/</span>}
                {isLast ? (
                  <span className="text-[#16423C] dark:text-[#E2FB6C] font-semibold capitalize">
                    {name}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="text-gray-400 dark:text-[#6B8A85] hover:text-[#16423C] dark:hover:text-white transition-colors capitalize"
                  >
                    {name}
                  </Link>
                )}
              </span>
            );
          })}
        </div>

        {/* Right Column: Global Actions Stack */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          
          {/* Dynamic Search */}
          {showSearch && <div className="relative hidden lg:block group">
            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#16423C] dark:group-focus-within:text-[#E2FB6C] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search topics, keywords..."
              className="w-64 bg-gray-100 dark:bg-[#16423C]/40 border border-gray-200 dark:border-white/5 focus:border-[#16423C]/30 dark:focus:border-[#E2FB6C]/30 rounded-xl pl-10 pr-12 py-1.5 text-xs text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-[#16423C]/70 transition-all duration-200"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-0.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-white/10 px-1.5 py-0.5 rounded-md text-[10px] font-mono text-gray-400 pointer-events-none select-none shadow-sm">
              <MdOutlineKeyboardCommandKey size={10} />
              <span>K</span>
            </div>
          </div>}

          {/* Alerts Notification Anchor */}
          <NotificationDropdown />

          {/* Theme Selector */}
          <button
            onClick={toggleTheme}
            className="text-gray-400 dark:text-gray-400 hover:text-[#16423C] dark:hover:text-white p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Toggle Theme Layout"
          >
            {darkMode ? <MdDarkMode className="text-[#E2FB6C]" size={20} /> : <MdLightMode className="text-[#16423C]" size={20} />}
          </button>

          <div className="h-5 w-px bg-gray-200 dark:bg-white/10"></div>

          {/* Stateful Profile Cluster slot */}
          <div className="relative" ref={dropdownRef}>
            {loading ? (
              /* Loading Skeleton Shell */
              <div className="flex items-center space-x-2.5 animate-pulse p-1">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10" />
                <div className="hidden sm:flex flex-col space-y-1.5">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-white/10 rounded" />
                  <div className="h-2 w-14 bg-gray-200 dark:bg-white/5 rounded" />
                </div>
              </div>
            ) : !user ? (
              /* No User Found / Logged Out View */
              <Link
                to="/login"
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
              >
                Sign In
              </Link>
            ) : (
              /* Standard User Dashboard View */
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2.5 pl-1 text-left focus:outline-none group cursor-pointer p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 text-[#16423C] dark:text-[#E2FB6C] border border-gray-200 dark:border-white/10 flex items-center justify-center font-mono text-xs font-bold shadow-sm select-none shrink-0">
                    {getUserInitials()}
                  </div>

                  <div className="flex-col space-y-0.5 hidden sm:block">
                    <span className="text-xs font-bold text-gray-900 dark:text-white leading-none tracking-tight flex items-center gap-1">
                      {user.name || "Guest"}
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

                {/* Dropdown Overlay Menu Card */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#16423C] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
                    <div className="px-2.5 py-2 border-b border-gray-100 dark:border-white/5 sm:hidden">
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{user.name || "Guest"}</p>
                      <p className="text-[9px] font-mono text-gray-400 dark:text-[#6B8A85] mt-0.5">
                        Level {xpMetrics.level} • {xpMetrics.xpDisplay} XP
                      </p>
                    </div>
                    <div className="w-full">
                      <LogoutButton />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Admin Context Menu Integration */}
          {isAdmin && (
            <button
              onClick={() => setOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 bg-[#16423C] text-white hover:bg-[#0f2f2a] hover:shadow-md dark:bg-[#16423C] dark:hover:bg-[#1b4a42]"
            >
              <MdAdd size={16} />
              Create Course
            </button>
          )}
        </div>
      </header>
      <CreateCourseModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;