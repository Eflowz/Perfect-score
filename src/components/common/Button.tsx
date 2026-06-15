
import { Spinner } from "./spinner";
type ButtonProps = {
 text: string;
 loading?: boolean;
 loadingText?:string
 onClick?: () => void;
 type?: "button" | "submit";
};

export const Button = ({
 text,
 loading=false,
 loadingText,
 onClick,
 type = "button",
}: ButtonProps) => {
 return (
 <button
 type={type}
 onClick={onClick}
 disabled={loading}
 className="w-full cursor-pointer h-14 bg-[#5300b7] text-white rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#5300b7]/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#5300b7]/20 group"
 
 >
 {loading ?<>
 <Spinner />
 <span>
 {loadingText || "Loading....."}
 </span>

 </>  : text}
 </button>
 );
};