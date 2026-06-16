import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { PasswordStrength } from "../../components/common/PasswordStrength";

type RegisterErrors = {
 name?: string;
 email?: string;
 password?: string;
 general?: string;
 confirmPassword?: string;
 accepted?:string;
};
export default function Register() {
 const navigate = useNavigate();
 const { register } = useAuth();
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
 const [errors, setErrors] =
 useState<RegisterErrors>({});
 const [accepted, setAccepted]=useState(false)
 const [loading, setLoading] =
 useState(false);
 const validate = () => {
 const newErrors: RegisterErrors = {};
 // Name validation
 if (!name.trim()) {

 newErrors.name = "Name is required";
 } 
 else if (name.trim().length < 3) {
 newErrors.name =
 "Name must be at least 3 characters";
 }
 // Email validation
 if (!email.trim()) {

 newErrors.email =
 "Email is required";

 } 
 else if (!email.includes("@")) {
 newErrors.email =
 "Enter a valid email";
 }
 if(!accepted){
    newErrors.accepted="You must acccept the terms and condition before continuing"
 }
 // Password validation
 if (!confirmPassword.trim()) {

 newErrors.confirmPassword =
 "Please confirm your password";
}
else if (password !== confirmPassword) {
 newErrors.confirmPassword =
 "Passwords do not match";
}
 else if (password.length < 8) {
 newErrors.password =
 "Password must be at least 8 characters";
 }
 setErrors(newErrors);
 return Object.keys(newErrors).length === 0;
 };
 const handleSubmit = async (
 e: React.FormEvent
 ) => {
 e.preventDefault();
 if (!validate()) return;
 try {
 setLoading(true);
 setErrors({});
 await register({
 name,
 email,
 password,
 });
 navigate("/login");
 } catch (error: any) {

 const message =
 error?.response?.data?.message;


 if (message === "Email already exists") {

 setErrors({
 email: message,
 });

 } else {

 setErrors({
 general:
 message || "Registration failed",
 });

 }

}finally {
 setLoading(false);
 }
 };
 return (
 <div className="min-h-screen px-5 md:px-10  mb-10 mt-10 ">
<main className="flex shadow  rounded-2xl overflow-hidden border border-gray-100 ">
{/* --- Premium Background SVG Lines & Defs --- */}
        
 <section className="hidden lg:flex relative py-10 lg:w-1/2  flex-col px-16 bg-[#16423C]">
<div className="absolute inset-0 pointer-events-none select-none z-10 opacity-40">
 <svg
 className="w-full h-full"
 viewBox="0 0 800 400"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 preserveAspectRatio="xMidYMid slice"
 >
 <defs>
 {/* Soft gradient glow */}
 <linearGradient id="soft-wave" x1="0%" y1="0%" x2="100%" y2="0%">
 <stop offset="0%" stopColor="#E2FB6C" stopOpacity="0.25" />
 <stop offset="50%" stopColor="#3ab3a2" stopOpacity="0.15" />
 <stop offset="100%" stopColor="#16423C" stopOpacity="0" />
 </linearGradient>

 {/* subtle blur glow */}
 <filter id="blur">
 <feGaussianBlur stdDeviation="2" />
 </filter>
 </defs>

 {/* Main smooth wave */}
 <path
 d="M0 250 C 150 150, 350 350, 500 250 C 650 150, 750 300, 900 200"
 stroke="url(#soft-wave)"
 strokeWidth="1.5"
 fill="none"
 filter="url(#blur)"
 />

 {/* Secondary wave */}
 <path
 d="M-50 300 C 200 200, 300 400, 600 280 C 750 220, 850 260, 950 180"
 stroke="url(#soft-wave)"
 strokeWidth="1"
 fill="none"
 opacity="0.7"
 />

 {/* Soft diagonal energy line */}
 <path
 d="M-100 100 C 200 50, 400 200, 800 80"
 stroke="url(#soft-wave)"
 strokeWidth="1.5"
 fill="none"
 opacity="0.5"
 />
 </svg>
</div>
 {/* Overlay */}
 <div className="absolute inset-0 z-0 bg-[#16423C]/70"></div>


 {/* Content */}
 <div className="relative z-10 flex flex-col gap-70  h-full">


 {/* Logo / Brand */}
 <div>
    {/* Badge */}
 <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 border border-white/20">
 <span className="material-symbols-outlined text-sm mr-1">
 school
 </span>
 Academic Excellence System
 </div>
 <h1 className="text-4xl font-bold text-white">
 PerfectScore
 </h1>
 </div>


 {/* Text Content */}
 <div className="max-w-xl">


 


 {/* Main Heading */}
 <h1 className="text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-white mb-4">
 Start Your Journey to{" "}
 <span className="text-[#ffd700]">
 Excellence
 </span>
 </h1>


 {/* Subtext */}
 <p className="text-[18px] leading-[1.6] font-normal text-white/80 mb-10">
 Gain industry-recognized credentials and master the skills that define modern professions through our curated learning paths.
 </p>

 </div>

 </div>

</section>
 
 {/* Right Side: Form */}
 <section className="w-full lg:w-1/2  bg-white flex flex-col justify-center items-center px-6 py-12 lg:px-16">
 <div className="w-full max-w-[440px] md:max-w-[600px]">
 {/* Logo */}
 <div className="flex items-center gap-2 mb-12">
 <div className="w-10 lg:hidden h-10 bg-[#5300b7] rounded-xl flex items-center justify-center text-white">
 <span
 className="material-symbols-outlined"
 style={{ fontVariationSettings: "'FILL' 1" }}
 >

 </span>
 </div>

 <span className="text-[24px] lg:hidden  leading-[1.3] font-bold text-[#5300b7] tracking-tight">
 PerfectScore
 </span> </div>

 {/* Header */}
 <div className="mb-8 ">
 <h2 className="text-3xl whitespace-nowrap md:text-4xl leading-[1.25] font-semibold text-[#1d1a24] mb-1">
 Create your account
 </h2>

 <p className="text-[16px] leading-[1.5] text-[#4a4455]">
 Start learning from industry experts today.
 </p>
 </div>
{
 errors.general && (

 <p className="text-red-400">
 {errors.general}
 </p>

 )
 }
 {/* Form */}
 <form className="space-y-6" onSubmit={handleSubmit}>
 <div>
 <Input
 label="Full Name"
 placeholder="Enter your name"
 value={name}
 onChange={(e)=>
 setName(e.target.value)
 }
 />
 {
 errors.name && (
 <p className="text-red-400">
 {errors.name}
 </p>
 )
 }
 </div>
 <div>
 <Input
 label="Email"
 type="email"
 placeholder="Enter your email"
 value={email}
 onChange={(e)=>
 setEmail(e.target.value)
 }
 />


 {
 errors.email && (

 <p className="text-red-400">
 {errors.email}
 </p>
 )
 }
 </div>
 <div>
 <Input
 label="Password"
 type="password"
 placeholder="Create password"
 value={password}
 showPasswordToggle
 onChange={(e)=>
 setPassword(e.target.value)
 }
/>

<PasswordStrength password={password} />


 </div>
 
 <div>
    <Input
 label="Confirm Password"
 type="password"
 placeholder="Confirm password"
 value={confirmPassword}
 showPasswordToggle
 onChange={(e)=>
 setConfirmPassword(e.target.value)
 }
/>
{
 errors.confirmPassword && (
 <p className="text-red-400">
 {errors.confirmPassword}
 </p>
 )
}
 {
 errors.password && (

 <p>
 {errors.password}
 </p>

 )
 }
 </div>
 {/* Terms */}
 <div className="flex items-start  gap-2">
 <div className="flex items-center h-5 ">
 <input
 className="w-5 h-5 cursor-pointer accent-[#1d1a24] border-[#7b7486] rounded-md focus:ring-[#5300b7]"
 id="terms"
 type="checkbox"
 onChange={(e)=> setAccepted(e.target.checked)}
 />
 </div>

 <label
 className="text-xs font-semibold text-[#4a4455]"
 htmlFor="terms"
 >
 I agree to the{" "}
 <span
 className="text-[#16423C] font-semibold "

 >
 Terms of Service
 </span>{" "}
 and{" "}

 <span
 className="text-[#16423C] font-semibold "
 
 >
 Privacy Policy
 </span>
 </label>
 </div>
 {
 errors.accepted && (

 <p>
 {errors.accepted}
 </p>

 )
 }
 {/* CTA Button */}
 
    <Button
 text="Create Account"
 loading={loading}
loadingText="Creating account..."
 type="submit"
 />



 </form>

 {/* Login Footer */}
 <p className="mt-12 text-center text-[16px] leading-[1.5] text-[#4a4455]">
 Already have an account?{" "}
 <Link
 className="text-[#16423C] font-bold hover:underline"
 to="/login"
 >
 Log In
 </Link>
 </p>
 </div>
 </section>
</main>
 </div>

 );

}