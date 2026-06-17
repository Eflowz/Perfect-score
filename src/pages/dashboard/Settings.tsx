import { MdSettings, MdPerson, MdLock, MdNotifications } from "react-icons/md";
import { useAuth } from "../../context/auth/useAuth";

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MdSettings className="text-[#16423C] dark:text-[#E2FB6C]" /> Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-[#6B8A85] mt-1">
          Update your account preferences, notifications, and security settings.
        </p>
      </div>

      <div className="bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-xl overflow-hidden divide-y divide-gray-100 dark:divide-white/5">
        
        {/* Profile Card Section */}
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MdPerson size={18} className="text-gray-400 dark:text-[#E2FB6C]" /> Profile Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 dark:text-[#6B8A85] uppercase block mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name || "Alex"}
                className="w-full bg-gray-50 dark:bg-black/10 border border-gray-200 dark:border-white/5 focus:border-[#16423C]/30 dark:focus:border-[#E2FB6C]/30 rounded-xl px-4 py-2 text-xs text-gray-800 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#16423C]/50 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 dark:text-[#6B8A85] uppercase block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email || "alex@example.com"}
                disabled
                className="w-full bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-2 text-xs text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Security / Password */}
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MdLock size={18} className="text-gray-400 dark:text-[#E2FB6C]" /> Change Password
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 dark:text-[#6B8A85] uppercase block mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-black/10 border border-gray-200 dark:border-white/5 focus:border-[#16423C]/30 dark:focus:border-[#E2FB6C]/30 rounded-xl px-4 py-2 text-xs text-gray-800 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#16423C]/50 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 dark:text-[#6B8A85] uppercase block mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-black/10 border border-gray-200 dark:border-white/5 focus:border-[#16423C]/30 dark:focus:border-[#E2FB6C]/30 rounded-xl px-4 py-2 text-xs text-gray-800 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#16423C]/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Notifications preferences */}
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MdNotifications size={18} className="text-gray-400 dark:text-[#E2FB6C]" /> Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#16423C] focus:ring-[#16423C]" />
              <span className="text-xs text-gray-700 dark:text-gray-200 font-medium">Email notifications for new lessons & challenges</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#16423C] focus:ring-[#16423C]" />
              <span className="text-xs text-gray-700 dark:text-gray-200 font-medium">Daily streak reminders</span>
            </label>
          </div>
        </div>

      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C] rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
