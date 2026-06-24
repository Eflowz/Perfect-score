import { Link, useLocation } from "react-router-dom";

import {
  MdDashboard,
  MdMap,
  MdAssignment,
  MdChevronLeft,
  MdChevronRight,
  MdSettings,

} from "react-icons/md";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const AdminSidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: MdDashboard },

    { name: "Courses", href: "courses", icon: MdMap },

    { name: "Users", href: "/admin/users", icon: MdAssignment },

    { name: "Settings", href: "/admin/settings", icon: MdSettings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 flex flex-col justify-between

border-r border-gray-200/70 dark:border-white/5

bg-white dark:bg-[#0F2C28] text-gray-800 dark:text-gray-200

transition-all duration-300 ease-in-out

${isExpanded ? "w-64" : "w-20"}`}
    >
      {/* TOP */}

      <div className="p-4">
        {/* BRAND */}

        <div className="flex items-center justify-between mb-6">
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              PerfectScore
            </h1>

            <p
              className={`text-[10px] uppercase tracking-wider text-gray-400 dark:text-[#6B8A85] transition-all ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Admin Workspace
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
          >
            {isExpanded ? <MdChevronLeft /> : <MdChevronRight />}
          </button>
        </div>

        {/* MENU */}

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = location.pathname.startsWith(item.href);

            return (
                <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition

                    ${
                    isActive
                        ? "bg-[#16423C] text-white"
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                    >
                    <div className="flex items-center gap-3">
                    <Icon size={18} />

                    {isExpanded && <span>{item.name}</span>}
                    </div>

                    
                </Link>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}

      <div className="p-4 border-t border-gray-200/50 dark:border-white/5">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition"
        >
          <MdSettings />

          {isExpanded && <span className="text-xs">Settings</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
