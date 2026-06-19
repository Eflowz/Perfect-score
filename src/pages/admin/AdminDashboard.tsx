import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Header from "../dashboard/components/Header";
import { useAuth } from "../../context/auth/useAuth";
const AdminDashBoard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { user } = useAuth();

  if (user?.role !== "SUPER_ADMIN") {
    return <Navigate to="/admindashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 antialiased flex transition-colors duration-200">
      <AdminSidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      <div
        className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "pl-64" : "pl-20"
        }`}
      >
        <Header />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashBoard;
