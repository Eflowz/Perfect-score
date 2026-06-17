import { Link, useLocation } from "react-router-dom";
import { 
  MdDashboard, MdMap, MdBook, MdAssignment, MdWorkspacePremium, MdChevronLeft, MdChevronRight,MdFiberManualRecord,MdSettings,MdTerminal
} from "react-icons/md";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { name: "My Roadmap", href: "/dashboard/roadmap", icon: MdMap },
    { name: "Courses", href: "/courses", icon: MdBook, badge: 3 },
    { name: "Projects", href: "/dashboard/projects", icon: MdAssignment },
    { name: "IDE Sandbox", href: "/dashboard/ide", icon: MdTerminal },
    { name: "Certificates", href: "/dashboard/certificates", icon: MdWorkspacePremium },
    ];

  const recentItems = [
    { name: "BST Implementation", href: "/lessons/bst" },
    { name: "Sorting Algorithms", href: "/lessons/sorting" },
    { name: "Django REST API", href: "/lessons/django" },
  ];

  const isSettingsActive = location.pathname === "/dashboard/settings";

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-40 flex flex-col justify-between p-4 border-r border-gray-200/80 dark:border-white/5 ${
        isExpanded ? "w-64" : "w-20"
      } bg-white dark:bg-[#0F2C28] text-gray-800 dark:text-gray-200`}
    >
      <div>
        {/* Workspace Brand Header */}
        <div className="flex items-center justify-between h-12 px-2 mb-6 relative">
          <div className="overflow-hidden flex flex-col whitespace-nowrap">
            <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              PerfectScore
            </span>
            <span className={`text-[10px] font-mono tracking-wider text-gray-400 dark:text-[#6B8A85] uppercase transition-opacity ${isExpanded ? "opacity-100" : "opacity-0"}`}>
              Pro Workspace
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

        {/* --- MENU SECTION --- */}
        <div className="space-y-4">
          <div>
            <p className={`text-[10px] font-bold tracking-widest text-gray-400 dark:text-[#6B8A85] uppercase px-3 mb-2 transition-opacity ${isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
              Menu
            </p>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

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
                      <Icon size={18} className={isActive ? "text-white dark:text-[#E2FB6C]" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"} />
                      <span className={`transition-opacity duration-200 whitespace-nowrap ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none absolute left-16"}`}>
                        {item.name}
                      </span>
                    </div>

                    {item.badge && isExpanded && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-400"}`}>
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
          <div className={`transition-all duration-200 ${isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden pointer-events-none"}`}>
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
        </div>
      </div>

      {/* Footer Settings Block matching layout position of image_44ebca.jpg */}
      <div className="border-t border-gray-100 dark:border-white/5 pt-4">
        <Link
          to="/dashboard/settings"
          className={`flex items-center px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
            isSettingsActive
              ? "bg-[#16423C] text-white dark:text-[#E2FB6C] shadow-sm font-bold"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <MdSettings size={18} className={isSettingsActive ? "text-white dark:text-[#E2FB6C]" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"} />
            <span className={`transition-opacity duration-200 whitespace-nowrap ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none absolute left-16"}`}>
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