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
      {label && <label className="font-semibold">{label}</label>}

      <div className="relative">
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full h-14 border border-[#fef7ff] bg-gray-50 rounded-2xl px-6 text-[#1d1a24] placeholder:text-[#7b7486] focus:ring-2 focus:ring-[#16423C] outline-none transition-all text-md md:text-lg"
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-5 cursor-pointer"
          >
            {showPassword ? (
              <FaEye className="text-[#277268]" />
            ) : (
              <FaEyeSlash className="text-[#277268]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
