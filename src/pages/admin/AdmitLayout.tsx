import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white">
      {/* Sidebar later */}
      <aside className="w-64 border-r border-gray-200 dark:border-white/10 p-4">
        <h1 className="font-bold">Admin Panel</h1>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
