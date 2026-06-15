import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { useToast } from "../../context/toast/useToast";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";


type LoginErrors = {
 email?: string;
 password?: string;
 general?: string;
};


export default function Login() {

 const navigate = useNavigate();

 const { login } = useAuth();
 const { showToast } = useToast();


 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");


 const [errors, setErrors] =
 useState<LoginErrors>({});

 const [loading, setLoading] =
 useState(false);



 const validate = () => {

 const newErrors: LoginErrors = {};


 if (!email.trim()) {
 newErrors.email =
 "Email is required";
 }
 else if (!email.includes("@")) {
 newErrors.email =
 "Enter a valid email";
 }


 if (!password.trim()) {
 newErrors.password =
 "Password is required";
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


 await login(email, password);


 showToast(
 "Login successful",
 "success"
 );


 navigate("/dashboard");


 } catch (error: any) {


 const message =
 error?.response?.data?.message ||
 "Invalid email or password";


 setErrors({
 general: message,
 });


 showToast(
 message,
 "error"
 );

 }


 finally {
 setLoading(false);
 }

 };



 return (

 <>


 {errors.general && (

 <p>
 {errors.general}
 </p>

 )}

 <div className="min-h-screen px-5 md:px-10  mb-10 mt-10 ">
<main className="flex shadow rounded-2xl overflow-hidden border border-gray-100 justify-center items-center">

 <section className="hidden  py-10 lg:flex lg:w-1/2 relative flex-col px-16 bg-[#5300b7]">

 {/* Overlay */}
 <div className="absolute inset-0 z-0 bg-[#5300b7]/70"></div>


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
 Welcome Back to{" "}
 <span className="text-[#ffd700]">
 Excellence
 </span>
 </h1>


 {/* Subtext */}
 <p className="text-[18px] leading-[1.6] font-normal text-white/80 mb-10">
Accesss your world class certificate  dashboard and continue  your journe towards professional mastery.
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
Sign In
 </h2>

 <p className="text-[16px] leading-[1.5] text-[#4a4455]">
Enter your credentials to manage your learning.
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
 placeholder="Enter your password"
 value={password}
 showPasswordToggle
 onChange={(e) =>
 setPassword(e.target.value)
 }
/>
{errors.password && (

 <p>
 {errors.password}
 </p>

 )}



 </div>

 
 {/* CTA Button */}
 
    <Button
    text="Sign In"

 loading={loading}
loadingText="signing in..."
 type="submit"
 />



 </form>

 {/* Login Footer */}
 <p className="mt-12 text-center text-[16px] leading-[1.5] text-[#4a4455]">
Don't  have an account?{" "}
 <Link
 className="text-[#5300b7] font-bold hover:underline"
 to="/register"
 >
 Sign Up
 </Link>
 </p>
 </div>
 </section>
</main>
 </div>
 </> );

}