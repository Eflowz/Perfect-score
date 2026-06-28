import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useCourse } from "../../../context/course/useCourse"; // Adjust path if needed
import { getCourseQuizzes } from "../../../api/quiz.api"; // Adjust path if needed
import {
  MdDashboard,
  MdMap,
  MdBook,
  MdAssignment,
  MdWorkspacePremium,
  MdBookmark,
  MdForum,
  MdLeaderboard,
  MdEmojiEvents,
  MdChevronLeft,
  MdChevronRight,
  MdExpandMore,
  MdFiberManualRecord,
  MdSettings,
  MdTerminal,
  MdArrowBack,
  MdPlayCircleFilled,
  MdCheckCircle,
  MdLock,
} from "react-icons/md";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isAdmin?: boolean;
}

const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  const { selectedCourse, fetchCourseById } = useCourse();
  const [courseQuizzes, setCourseQuizzes] = useState<any[]>([]);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Determine if we are deep inside a course view context
  const isInsideCourse = Boolean(courseId);

  // Fetch course details if courseId updates in the route context
  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
      getCourseQuizzes(courseId)
        .then((data) => setCourseQuizzes(data || []))
        .catch((err) => console.error("Error loading course quizzes:", err));
    }
  }, [courseId]);

  // --- CONFIG: VIEW A (GLOBAL MENU ITEMS) ---
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { name: "My Roadmap", href: "/dashboard/roadmap", icon: MdMap },
    { name: "Courses", href: "/dashboard/courses", icon: MdBook, badge: 3 },
    { name: "Projects", href: "/dashboard/projects", icon: MdAssignment },
    { name: "IDE Sandbox", href: "/dashboard/ide", icon: MdTerminal },
    {
      name: "Certifications",
      href: "/dashboard/certificates",
      icon: MdWorkspacePremium,
      subItems: [
        { name: "Certificates", href: "/dashboard/certificates" },
        { name: "Verify Certificate", href: "/dashboard/verify-certificate" },
      ],
    },
    { name: "Discussions", href: "/dashboard/discussions", icon: MdForum },
    { name: "Leaderboard", href: "/dashboard/leaderboard", icon: MdLeaderboard },
    { name: "Bookmarks", href: "/dashboard/bookmarks", icon: MdBookmark },
    { name: "Achievements", href: "/dashboard/achievements", icon: MdEmojiEvents },
    { name: "Submissions", href: "/dashboard/submissions", icon: MdAssignment },
  ];

  const recentItems = [
    { name: "BST Implementation", href: "/lessons/bst" },
    { name: "Sorting Algorithms", href: "/lessons/sorting" },
    { name: "Django REST API", href: "/lessons/django" },
  ];

  // --- CONFIG: VIEW B (COURSE OUTLINE WORKSPACE DATA) ---
  const modules = selectedCourse?.modules || [];
  const currentIdx = modules.findIndex((m) => m.id === moduleId);
  const isSettingsActive = location.pathname === "/dashboard/settings";

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-40 flex flex-col justify-between p-4 border-r border-gray-200/80 dark:border-white/5 ${
        isExpanded ? "w-64" : "w-20"
      } bg-white dark:bg-[#0F2C28] text-gray-800 dark:text-gray-200`}
    >
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Workspace Brand Header */}
        <div className="flex items-center justify-between h-12 px-2 mb-6 shrink-0 relative">
          <div className="overflow-hidden flex flex-col whitespace-nowrap">
            <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              PerfectScore
            </span>
            <span
              className={`text-[10px] font-mono tracking-wider text-gray-400 dark:text-[#6B8A85] uppercase transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              {isInsideCourse ? "Course View" : "Pro Workspace"}
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -right-7 top-3 bg-white dark:bg-[#16423C] border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-1 rounded-full cursor-pointer transition-colors shadow-sm flex items-center justify-center"
            aria-label="Toggle Sidebar"
          >
            {isExpanded ? <MdChevronLeft size={16} /> : <MdChevronRight size={16} />}
          </button>
        </div>

        {/* Scrollable Nav Content Panel */}
        <div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-4">
          
          {/* =========================================
              VIEW A: STANDARD GLOBAL INTERACTIVE DASHBOARD 
              ========================================= */}
          {!isInsideCourse && (
            <>
              <div>
                <p
                  className={`text-[10px] font-bold tracking-widest text-gray-400 dark:text-[#6B8A85] uppercase px-3 mb-2 transition-all duration-200 ${
                    isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                  }`}
                >
                  Menu
                </p>
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/dashboard"
                        ? location.pathname === "/dashboard"
                        : location.pathname.startsWith(item.href);

                    if (item.subItems) {
                      const isSectionActive =
                        location.pathname.startsWith(item.href) ||
                        item.subItems.some((sub) => location.pathname.startsWith(sub.href));
                      const shouldShowSubItems = (isCertificateOpen || isSectionActive) && isExpanded;

                      return (
                        <div key={item.name} className="space-y-1">
                          <button
                            type="button"
                            onClick={() => setIsCertificateOpen((prev) => !prev)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                              isActive || isSectionActive
                                ? "bg-[#16423C] text-white dark:text-[#E2FB6C] shadow-sm font-bold"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon
                                size={18}
                                className={
                                  isActive || isSectionActive
                                    ? "text-white dark:text-[#E2FB6C]"
                                    : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                                }
                              />
                              <span
                                className={`transition-opacity duration-200 whitespace-nowrap ${
                                  isExpanded ? "opacity-100" : "opacity-0 pointer-events-none absolute left-16"
                                }`}
                              >
                                {item.name}
                              </span>
                            </div>
                            {isExpanded && (
                              <MdExpandMore
                                className={`${shouldShowSubItems ? "rotate-180" : "rotate-0"} transition-transform duration-200`}
                              />
                            )}
                          </button>

                          {shouldShowSubItems && (
                            <div className="space-y-1 pl-10">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  className={`block px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                                    location.pathname === sub.href
                                      ? "bg-[#16423C]/20 text-[#16423C] dark:text-[#E2FB6C]"
                                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                          isActive
                            ? "bg-[#16423C] text-white dark:text-[#E2FB6C] shadow-sm font-bold"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            size={18}
                            className={
                              isActive
                                ? "text-white dark:text-[#E2FB6C]"
                                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                            }
                          />
                          <span
                            className={`transition-opacity duration-200 whitespace-nowrap ${
                              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none absolute left-16"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>

                        {item.badge && isExpanded && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                              isActive ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-400"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {!isExpanded && (
                          <div className="absolute left-16 bg-[#16423C] border border-white/10 text-xs text-white px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-50 whitespace-nowrap">
                            {item.name} {item.badge ? `(${item.badge})` : ""}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* --- RECENT SECTION --- */}
              <div
                className={`transition-all duration-200 ${
                  isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden pointer-events-none"
                }`}
              >
                <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-[#6B8A85] uppercase px-3 mb-2">
                  Recent
                </p>
                <div className="space-y-0.5">
                  {recentItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-[#16423C] dark:hover:text-[#E2FB6C] hover:bg-gray-50 dark:hover:bg-white/5 transition-all truncate"
                    >
                      <MdFiberManualRecord size={6} className="text-gray-300 dark:text-gray-600 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* =========================================
              VIEW B: DYNAMIC LIVE SYLLABUS COURSE WORKSPACE 
              ========================================= */}
          {isInsideCourse && (
            <div className="space-y-3 animation-fade-in">
              <div className="px-1 border-b border-gray-100 dark:border-white/5 pb-3">
                <button
                  onClick={() => navigate("/dashboard/courses")}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 dark:text-[#C2FFC1] hover:underline cursor-pointer mb-2"
                >
                  <MdArrowBack size={12} />
                  {isExpanded && <span>Exit Learning space</span>}
                </button>
                {isExpanded && (
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-tight line-clamp-2 leading-tight">
                    {selectedCourse?.title || "Loading Outline..."}
                  </h3>
                )}
              </div>

              <nav className="space-y-1">
                {modules.map((m, idx) => {
                  const isActive = m.id === moduleId;
                  const isPast = idx < currentIdx;
                  const hasQuiz = courseQuizzes.some((quiz) => quiz.moduleId === m.id);

                  return (
                    <button
                      key={m.id}
                      onClick={() => navigate(`/dashboard/courses/${courseId}/modules/${m.id}`)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl transition-all duration-150 group relative ${
                        isActive
                          ? "bg-[#16423C] text-white dark:text-[#E2FB6C] font-bold shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="shrink-0">
                          {isPast ? (
                            <MdCheckCircle className="text-[#16423C] dark:text-[#E2FB6C]" size={16} />
                          ) : isActive ? (
                            <MdPlayCircleFilled className="text-[#16423C] dark:text-[#E2FB6C]" size={16} />
                          ) : (
                            <MdLock className="text-gray-400 dark:text-gray-600" size={14} />
                          )}
                        </div>

                        <div className={`flex flex-col min-w-0 transition-opacity duration-200 ${
                          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none absolute left-16"
                        }`}>
                          <span className="text-xs font-semibold truncate leading-tight">{m.title}</span>
                          {/* for just better ui leave commented*/}
                          {/* {hasQuiz && (
                            <span className="text-[9px] w-max font-bold tracking-wide mt-0.5 uppercase px-1 rounded bg-[#E2FB6C]/10 text-[#16423C] dark:text-[#E2FB6C]">
                              Quiz
                            </span>
                          )} */}
                        </div>
                      </div>

                      {!isExpanded && (
                        <div className="absolute left-16 bg-[#16423C] border border-white/10 text-xs text-white px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-50 whitespace-nowrap">
                          {m.title} {hasQuiz ? "[Quiz Available]" : ""}
                        </div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Footer Area */}
      <div className="border-t border-gray-100 dark:border-white/5 pt-4 shrink-0">
        <Link
          to="/dashboard/settings"
          className={`flex items-center px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
            isSettingsActive
              ? "bg-[#16423C] text-white dark:text-[#E2FB6C] shadow-sm font-bold"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <MdSettings
              size={18}
              className={
                isSettingsActive
                  ? "text-white dark:text-[#E2FB6C]"
                  : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
              }
            />
            <span
              className={`transition-opacity duration-200 whitespace-nowrap ${
                isExpanded ? "opacity-100" : "opacity-0 pointer-events-none absolute left-16"
              }`}
            >
              settings
            </span>
          </div>

          {!isExpanded && (
            <div className="absolute left-16 bg-[#16423C] border border-white/10 text-xs text-white px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-50 whitespace-nowrap">
              settings
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;