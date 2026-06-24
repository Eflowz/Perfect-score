import { MdOutlineMenuBook, MdAdd } from "react-icons/md";

type Props = {
 title?: string;
 description?: string;
 onAction?: ()=> void;
 actionText?: string;
};

export default function EmptyModulesState({
 title = "No modules yet",
 description = "This course doesn't have any modules. Start building your learning content.",
 onAction,
 actionText = "Create Module",
}: Props) {
 return (
 <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl shadow-sm">
 
 {/* ICON */}
 <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#16423C]/10 dark:bg-[#E2FB6C]/10 mb-4">
 <MdOutlineMenuBook
 size={28}
 className="text-[#16423C] dark:text-[#E2FB6C]"
 />
 </div>

 {/* TITLE */}
 <h2 className="text-lg font-bold text-gray-900 dark:text-white">
 {title}
 </h2>

 {/* DESCRIPTION */}
 <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
 {description}
 </p>

 {/* ACTION */}
 {onAction && (
<button
 onClick={onAction}
 className="
 mt-6 inline-flex items-center gap-2
 px-4 py-2 rounded-xl
 bg-[#16423C]
 text-white
 "
>
<MdAdd size={18}/>
{actionText}
</button>
)}
 </div>
 );
}