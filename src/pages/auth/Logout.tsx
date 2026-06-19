import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { MdLogout } from "react-icons/md";

interface LogoutButtonProps {
  hideText?: boolean;
  className?: string;
}

export const LogoutButton = ({
  hideText = false,
  className,
}: LogoutButtonProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const defaultStyle = `
    w-full flex items-center justify-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold 
    text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 
    hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200 group relative cursor-pointer
  `.trim();

  return (
    <button
      onClick={handleLogout}
      className={className || defaultStyle}
      title={hideText ? "Log Out" : undefined}
    >
      <MdLogout
        size={18}
        className="shrink-0 text-gray-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors"
      />

      {!hideText && (
        <span className="whitespace-nowrap transition-opacity duration-200">
          Log Out
        </span>
      )}

      {hideText && (
        <div className="absolute left-16 bg-[#16423C] border border-white/10 text-xs text-white px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-50 whitespace-nowrap">
          Log Out
        </div>
      )}
    </button>
  );
};
