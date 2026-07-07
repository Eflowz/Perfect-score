import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useAuth } from "../../context/auth/useAuth";
const DashBoard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { user } = useAuth();

  const isAdmin = user?.role === "SUPER_ADMIN";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar
        isExpanded={isSidebarExpanded}
        isAdmin={isAdmin}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarExpanded ? "pl-64" : "pl-20"
        }`}
      >
        <Header
          showSidebarToggle
          isSidebarExpanded={isSidebarExpanded}
          onSidebarToggle={() => setIsSidebarExpanded((prev) => !prev)}
        />

        <main className="p-8 max-w-7xl w-full mx-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
