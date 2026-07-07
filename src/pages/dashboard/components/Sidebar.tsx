import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useCourse } from "../../../context/course/useCourse"; 
import { getCourseQuizzes } from "../../../api/quiz.api"; 
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
  isAdmin?: boolean;
}

const Sidebar = ({ isExpanded }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  const { selectedCourse, fetchCourseById } = useCourse();
  const [courseQuizzes, setCourseQuizzes] = useState<any[]>([]);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [_hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isInsideCourse = Boolean(courseId);

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
      getCourseQuizzes(courseId)
        .then((data) => setCourseQuizzes(data || []))
        .catch((err) => console.error("Error loading course quizzes:", err));
    }
  }, [courseId]);

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

  const modules = selectedCourse?.modules || [];
  const currentIdx = modules.findIndex((m) => m.id === moduleId);
  const isSettingsActive = location.pathname === "/dashboard/settings";

  // Calculate progress for modules
  const completedModules = modules.filter((_, idx) => idx < currentIdx).length;
  const progressPercentage = modules.length > 0 ? (completedModules / modules.length) * 100 : 0;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-40
        flex flex-col justify-between p-4 border-r border-gray-200/50 dark:border-white/5
        ${isExpanded ? "w-64" : "w-20"}
        bg-white/80 dark:bg-[#0A1F1C]/95
        backdrop-blur-xl
        text-gray-800 dark:text-gray-200
        shadow-2xl shadow-gray-200/50 dark:shadow-black/50
        overflow-hidden
      `}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-transparent dark:from-emerald-400/10 pointer-events-none" />
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden relative z-10">
        {/* Workspace Brand Header with Gradient */}
        <div className="relative overflow-hidden px-3 py-2.5 mb-4 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 dark:from-[#E2FB6C] dark:to-[#8BC34A] shadow-lg shadow-emerald-500/20 group">
          <div className="absolute inset-0 bg-size-200%_200% animate-gradient-shift bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-center justify-between relative">
            <div className="overflow-hidden flex flex-col whitespace-nowrap">
              <span className="text-sm font-bold tracking-tight text-white dark:text-[#0A1F1C]">
                PerfectScore
              </span>
              <span
                className={`text-[9px] font-mono tracking-wider text-white/80 dark:text-[#0A1F1C]/80 uppercase transition-all duration-200 ${
                  isExpanded ? "opacity-100" : "opacity-0 h-0"
                }`}
              >
                {isInsideCourse ? "Course View" : "Dashboard"}
              </span>
            </div>
           
          </div>
        </div>

        {/* Scrollable Nav Content Panel */}
        <div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
          
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
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`relative flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 group ${
                              isActive || isSectionActive
                                ? "bg-[#16423C] text-white dark:text-[#E2FB6C] shadow-lg shadow-emerald-500/20 scale-[1.02]"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 hover:scale-105"
                            }`}
                          >
                            {/* Glow effect on hover */}
                            {!isActive && !isSectionActive && (
                              <div className="absolute inset-0 rounded-xl bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}
                            <div className="flex items-center gap-3 relative">
                              <Icon
                                size={18}
                                className={`transition-all duration-500 ${
                                  isActive || isSectionActive
                                    ? "text-white dark:text-[#E2FB6C] rotate-0 scale-110"
                                    : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:rotate-12"
                                }`}
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
                            <div className="space-y-1 pl-10 animate-fade-in">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  className={`block px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:scale-105 ${
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
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 group ${
                          isActive
                            ? "bg-[#16423C] text-white dark:text-[#E2FB6C] shadow-lg shadow-emerald-500/20 scale-[1.02]"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 hover:scale-105"
                        }`}
                      >
                        {/* Glow effect on hover */}
                        {!isActive && (
                          <div className="absolute inset-0 rounded-xl bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}

                        <div className="flex items-center gap-3 relative">
                          <Icon
                            size={18}
                            className={`transition-all duration-500 ${
                              isActive
                                ? "text-white dark:text-[#E2FB6C] rotate-0 scale-110"
                                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:rotate-12"
                            }`}
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
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-all duration-300 ${
                              isActive 
                                ? "bg-white/20 text-white animate-pulse" 
                                : "bg-gray-100 dark:bg-white/5 text-gray-400"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Tooltip for collapsed mode */}
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
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-[#16423C] dark:hover:text-[#E2FB6C] hover:bg-gray-50 dark:hover:bg-white/5 transition-all truncate group"
                    >
                      <MdFiberManualRecord size={6} className="text-gray-300 dark:text-gray-600 shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="truncate group-hover:translate-x-0.5 transition-transform">{item.name}</span>
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
            <div className="space-y-3 animate-fade-in">
              <div className="px-1 border-b border-gray-100 dark:border-white/5 pb-3">
                <button
                  onClick={() => navigate("/dashboard/courses")}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 dark:text-[#C2FFC1] hover:underline cursor-pointer mb-2 group transition-all hover:translate-x-0.5"
                >
                  <MdArrowBack size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                  {isExpanded && <span>Exit Learning space</span>}
                </button>
                {isExpanded && (
                  <>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-tight line-clamp-2 leading-tight">
                      {selectedCourse?.title || "Loading Outline..."}
                    </h3>
                    {/* Mini stats */}
                    <div className="grid grid-cols-2 gap-1.5 mt-2 p-2 bg-gray-50 dark:bg-white/5 rounded-xl">
                      <div className="text-center">
                        <div className="text-[9px] font-mono text-gray-400 dark:text-gray-500">Modules</div>
                        <div className="text-xs font-bold">{modules.length}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] font-mono text-gray-400 dark:text-gray-500">Quizzes</div>
                        <div className="text-xs font-bold">{courseQuizzes.length}</div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-[9px] text-gray-400 dark:text-gray-500 mb-0.5">
                        <span>Progress</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-linear-to-r from-emerald-500 to-teal-500 dark:from-[#E2FB6C] dark:to-[#8BC34A] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <nav className="space-y-1">
                {modules.map((m, idx) => {
                  const isActive = m.id === moduleId;
                  const isPast = idx < currentIdx;
                  const hasQuiz = courseQuizzes.some((quiz) => quiz.moduleId === m.id);
                  const isCompleted = isPast;

                  return (
                    <button
                      key={m.id}
                      onClick={() => navigate(`/dashboard/courses/${courseId}/modules/${m.id}`)}
                      onMouseEnter={() => setHoveredItem(m.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "bg-[#16423C] text-white dark:text-[#E2FB6C] shadow-lg shadow-emerald-500/20 scale-[1.02]"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white hover:scale-105"
                      }`}
                    >
                      {/* Glow effect */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}

                      <div className="flex items-center gap-3 min-w-0 flex-1 relative">
                        <div className="shrink-0 transition-all duration-300">
                          {isCompleted ? (
                            <MdCheckCircle className="text-[#16423C] dark:text-[#E2FB6C] animate-bounce-once" size={16} />
                          ) : isActive ? (
                            <MdPlayCircleFilled className="text-[#16423C] dark:text-[#E2FB6C] animate-pulse" size={16} />
                          ) : (
                            <MdLock className="text-gray-400 dark:text-gray-600" size={14} />
                          )}
                        </div>

                        <div className={`flex flex-col min-w-0 transition-opacity duration-200 ${
                          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none absolute left-16"
                        }`}>
                          <span className="text-xs font-semibold truncate leading-tight">{m.title}</span>
                          {hasQuiz && isExpanded && (
                            <span className="text-[8px] w-max font-bold tracking-wide mt-0.5 uppercase px-1.5 py-0.5 rounded bg-[#E2FB6C]/20 text-[#16423C] dark:text-[#E2FB6C]">
                              Quiz
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress dot for expanded view */}
                      {isExpanded && isCompleted && (
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#E2FB6C] animate-pulse" />
                      )}

                      {/* Tooltip for collapsed mode */}
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
      <div className="border-t border-gray-100 dark:border-white/5 pt-4 shrink-0 relative z-10">
        <Link
          to="/dashboard/settings"
          onMouseEnter={() => setHoveredItem("settings")}
          onMouseLeave={() => setHoveredItem(null)}
          className={`relative flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 group ${
            isSettingsActive
              ? "bg-[#16423C] text-white dark:text-[#E2FB6C] shadow-lg shadow-emerald-500/20 scale-[1.02]"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 hover:scale-105"
          }`}
        >
          {/* Glow effect */}
          {!isSettingsActive && (
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          <div className="flex items-center gap-3 relative">
            <MdSettings
              size={18}
              className={`transition-all duration-500 ${
                isSettingsActive
                  ? "text-white dark:text-[#E2FB6C] rotate-0 scale-110"
                  : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:rotate-90"
              }`}
            />
            <span
              className={`transition-opacity duration-200 whitespace-nowrap ${
                isExpanded ? "opacity-100" : "opacity-0 pointer-events-none absolute left-16"
              }`}
            >
              Settings
            </span>
          </div>

          {/* Keyboard shortcut hint */}
          {!isExpanded && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <kbd className="px-1.5 py-0.5 text-[8px] font-mono bg-gray-200 dark:bg-white/10 rounded text-gray-500 dark:text-gray-400">
                ⌘+S
              </kbd>
            </div>
          )}

          {/* Tooltip for collapsed mode */}
          {!isExpanded && (
            <div className="absolute left-16 bg-[#16423C] border border-white/10 text-xs text-white px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-50 whitespace-nowrap">
              Settings
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;