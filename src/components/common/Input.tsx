import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type InputProps = {
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
};

export const Input = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  showPasswordToggle = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && showPassword ? "text" : type;

  return (
    <div>
      {label && <label className="font-semibold dark:text-white text-gray-800 ">{label}</label>}

      <div className="relative">

 <input
 type={inputType}
 value={value}
 placeholder={placeholder}
 onChange={onChange}

 className="
 w-full
 h-14

 rounded-2xl

 px-6

 text-md
 md:text-lg


 /* Light mode */
 bg-gray-50
 border
 border-gray-200

 text-[#1d1a24]

 placeholder:text-[#7b7486]



 /* Dark mode */
 dark:bg-white/[0.05]

 dark:border-white/10

 dark:text-white

 dark:placeholder:text-[#6B8A85]



 focus:ring-2

 focus:ring-[#16423C]

 dark:focus:ring-[#E2FB6C]


 outline-none

 transition-all

 duration-300
 "
 />



 {showPasswordToggle && (

 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}

 className="
 absolute
 right-4
 top-5

 cursor-pointer

 transition
 "
 >

 {
 showPassword ?

 (
 <FaEye
 className="
 text-[#16423C]
 dark:text-[#E2FB6C]
 "
 />
 )

 :

 (
 <FaEyeSlash
 className="
 text-[#16423C]
 dark:text-[#E2FB6C]
 "
 />
 )
 }

 </button>

 )}

</div>
    </div>
  );
};
