import { useState } from "react";
import { MdPeople, MdShield, MdPerson, MdSearch, MdFilterList } from "react-icons/md";
import { useToast } from "../../context/toast/useToast";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "SUPER_ADMIN";
  xp: number;
  level: number;
  streakDays: number;
  createdAt: string;
}

const INITIAL_MOCK_USERS: MockUser[] = [
  {
    id: "cmqcokd8h0000yltl006jim88",
    name: "benny",
    email: "anny4@gmail.com",
    role: "SUPER_ADMIN",
    xp: 20,
    level: 1,
    streakDays: 0,
    createdAt: "2026-06-13",
  },
  {
    id: "user_2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "USER",
    xp: 450,
    level: 5,
    streakDays: 12,
    createdAt: "2026-05-20",
  },
  {
    id: "user_3",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "USER",
    xp: 120,
    level: 2,
    streakDays: 3,
    createdAt: "2026-06-01",
  },
  {
    id: "user_4",
    name: "Sarah Connor",
    email: "sarah.c@example.com",
    role: "USER",
    xp: 1250,
    level: 12,
    streakDays: 45,
    createdAt: "2026-04-10",
  },
];

export default function AdminUsers() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<MockUser[]>(INITIAL_MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "USER" | "SUPER_ADMIN">("ALL");

  const handleRoleToggle = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === userId) {
          const newRole = u.role === "SUPER_ADMIN" ? "USER" : "SUPER_ADMIN";
          showToast(`Role updated for ${u.name} to ${newRole}`, "success");
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MdPeople className="text-[#16423C] dark:text-[#E2FB6C]" /> User Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View, search, and manage system users and roles.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 p-4 rounded-2xl">
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 dark:bg-black/10 border border-gray-200 dark:border-white/5 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16423C] dark:focus:ring-[#E2FB6C]/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <MdFilterList className="text-gray-400" size={18} />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-3 py-2 text-xs bg-gray-50 dark:bg-black/10 border border-gray-200 dark:border-white/5 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16423C] dark:focus:ring-[#E2FB6C]/30 transition-all"
          >
            <option value="ALL">All Roles</option>
            <option value="USER">User</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold text-center">Level / XP</th>
                <th className="px-6 py-4 font-semibold text-center">Streak</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors"
                >
                  {/* USER INFO */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300">
                        {user.role === "SUPER_ADMIN" ? <MdShield size={16} /> : <MdPerson size={16} />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-gray-400 dark:text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ROLE BADGE */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                        user.role === "SUPER_ADMIN"
                          ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                          : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* LEVEL / XP */}
                  <td className="px-6 py-4 text-center">
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      Lvl {user.level}
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500">
                      {user.xp} XP
                    </div>
                  </td>

                  {/* STREAK */}
                  <td className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                    🔥 {user.streakDays} days
                  </td>

                  {/* JOINED DATE */}
                  <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                    {user.createdAt}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRoleToggle(user.id)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg text-[10px] font-semibold transition"
                    >
                      Toggle Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
