import { MdOutlineSchool } from "react-icons/md";
import { Link } from "react-router-dom";
type Props = {
  title?: string;
  description?: string;
  actionText?: string;
  actionLink?: string;
  showAction?: boolean;
};
export default function EmptyState({
  title = "No courses yet",
  description = "Start building your learning content by creating your first course.",
  actionText = "Create Course",
  actionLink = "/admin/courses/new",
  showAction = true,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="p-5 rounded-full bg-[#16423C]/10 dark:bg-[#dcf36c]/10">
        <MdOutlineSchool
          size={40}
          className="text-[#16423C] dark:text-[#dcf36c]"
        />
      </div>

      <h2 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md">
        {description}
      </p>

      {showAction && (
        <Link
          to={actionLink}
          className="mt-6 px-5 py-2 rounded-xl bg-[#16423C] text-white text-sm font-medium hover:opacity-90 transition"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
