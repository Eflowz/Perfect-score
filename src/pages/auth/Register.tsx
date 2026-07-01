import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { PasswordStrength } from "../../components/common/PasswordStrength";
import { useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { BsLayers, BsStars } from "react-icons/bs";
type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
  confirmPassword?: string;
  accepted?: string;
};
export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const validate = () => {
    const newErrors: RegisterErrors = {};
    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
    if (!accepted) {
      newErrors.accepted =
        "You must acccept the terms and condition before continuing";
    }
    // Password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// Dark mode theme initialization toggle
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
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
      const message = error?.response?.data?.message;

      if (message === "Email already exists") {
        setErrors({
          email: message,
        });
      } else {
        setErrors({
          general: message || "Registration failed",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  /*
  return (
    <div className="min-h-screen px-5 md:px-10  mb-10 mt-10 ">
      <main className="flex shadow  rounded-2xl overflow-hidden border border-gray-100 ">
 

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
           
                <linearGradient
                  id="soft-wave"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E2FB6C" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#3ab3a2" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#16423C" stopOpacity="0" />
                </linearGradient>

               
                <filter id="blur">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              <path
                d="M0 250 C 150 150, 350 350, 500 250 C 650 150, 750 300, 900 200"
                stroke="url(#soft-wave)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#blur)"
              />

              <path
                d="M-50 300 C 200 200, 300 400, 600 280 C 750 220, 850 260, 950 180"
                stroke="url(#soft-wave)"
                strokeWidth="1"
                fill="none"
                opacity="0.7"
              />

           
              <path
                d="M-100 100 C 200 50, 400 200, 800 80"
                stroke="url(#soft-wave)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
      
          <div className="absolute inset-0 z-0 bg-[#16423C]/70"></div>

          <div className="relative z-10 flex flex-col gap-70  h-full">

            <div>
           
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 border border-white/20">
                <span className="material-symbols-outlined text-sm mr-1">
                  school
                </span>
                Academic Excellence System
              </div>
              <h1 className="text-4xl font-bold text-white">PerfectScore</h1>
            </div>

          
            <div className="max-w-xl">
              
              <h1 className="text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-white mb-4">
                Start Your Journey to{" "}
                <span className="text-[#ffd700]">Excellence</span>
              </h1>

              
              <p className="text-[18px] leading-[1.6] font-normal text-white/80 mb-10">
                Gain industry-recognized credentials and master the skills that
                define modern professions through our curated learning paths.
              </p>
            </div>
          </div>
        </section>
        
        <section className="w-full lg:w-1/2  bg-white flex flex-col justify-center items-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-[440px] md:max-w-[600px]">
         
            <div className="flex items-center gap-2 mb-12">
              <div className="w-10 lg:hidden h-10 bg-[#16423C] rounded-xl flex items-center justify-center text-white">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                ></span>
              </div>
              <span className="text-[24px] lg:hidden  leading-[1.3] font-bold text-[#16423C] tracking-tight">
                PerfectScore
              </span>{" "}
            </div>

            
            <div className="mb-8 ">
              <h2 className="text-3xl whitespace-nowrap md:text-4xl leading-[1.25] font-semibold text-[#1d1a24] mb-1">
                Create your account
              </h2>

              <p className="text-[16px] leading-[1.5] text-[#4a4455]">
                Start learning from industry experts today.
              </p>
            </div>
            {errors.general && <p className="text-red-400">{errors.general}</p>}
         
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-400">{errors.name}</p>}
              </div>
              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {errors.email && <p className="text-red-400">{errors.email}</p>}
              </div>
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create password"
                  value={password}
                  showPasswordToggle
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400">{errors.confirmPassword}</p>
                )}
                {errors.password && <p>{errors.password}</p>}
              </div>
             
              <div className="flex items-start  gap-2">
                <div className="flex items-center h-5 ">
                  <input
                    className="w-5 h-5 cursor-pointer accent-[#1d1a24] border-[#7b7486] rounded-md focus:ring-[#16423C]"
                    id="terms"
                    type="checkbox"
                    onChange={(e) => setAccepted(e.target.checked)}
                  />
                </div>

                <label
                  className="text-xs font-semibold text-[#4a4455]"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <span className="text-[#16423C] font-semibold ">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#16423C] font-semibold ">
                    Privacy Policy
                  </span>
                </label>
              </div>
              {errors.accepted && <p>{errors.accepted}</p>}
      

              <Button
                text="Create Account"
                loading={loading}
                loadingText="Creating account..."
                type="submit"
              />
            </form>

          
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
  */
return (
<main
className="
min-h-screen
flex
items-center
justify-center

p-4
sm:p-6

bg-white
dark:bg-[#061311]

transition-colors
duration-500

relative
overflow-hidden
"
>
{/* Premium light rays - dark mode only */}

<div
 className="
 hidden
 dark:block

 absolute
 -top-40
 right-20

 w-[180px]
 h-[650px]

 rotate-[35deg]

 bg-gradient-to-b
 from-[#E2FB6C]/30
 via-[#45B88B]/20
 to-transparent
lg:hidden
 blur-3xl

 pointer-events-none
 "
/>


<div
 className="
 hidden
 dark:block
lg:hidden
 absolute
 -top-20
 right-64

 w-[120px]
 h-[500px]

 rotate-[35deg]

 bg-gradient-to-b
 from-white/20
 via-[#E2FB6C]/10
 to-transparent

 blur-2xl

 pointer-events-none
 "
/>

{/* Mobile Glow */}

<div
className="
absolute
top-0
left-0

w-full
h-72

lg:hidden

bg-gradient-to-b
from-[#16423C]/20
to-transparent

dark:from-[#16423C]/40

blur-3xl
"
/>



{/* Theme Toggle */}

<button
onClick={()=>setDarkMode(!darkMode)}

className="
absolute
top-5
right-5

z-50

p-3

rounded-full

bg-gray-100
dark:bg-white/10

border
border-gray-200
dark:border-white/10
"
>

{
darkMode ?

<MdDarkMode
className="
text-[#E2FB6C]
text-2xl
"
/>

:

<MdLightMode
className="
text-[#16423C]
text-2xl
"
/>

}

</button>






<section
className="
relative

w-full
max-w-7xl

min-h-[700px]

grid

lg:grid-cols-2

rounded-[40px]

overflow-hidden

bg-white

dark:bg-[#0B1514]

border
border-gray-200
dark:border-white/10

shadow-2xl
"
>



{/* Premium light rays - dark mode only */}

<div
 className="
 hidden
 dark:block

 absolute
 -top-40
 right-20

 w-[180px]
 h-[650px]

 rotate-[35deg]

 bg-gradient-to-b
 from-[#E2FB6C]/30
 via-[#45B88B]/20
 to-transparent
lg:hidden
 blur-3xl

 pointer-events-none
 "
/>


<div
 className="
 hidden
 dark:block
lg:hidden
 absolute
 -top-20
 right-64

 w-[120px]
 h-[500px]

 rotate-[35deg]

 bg-gradient-to-b
 from-white/20
 via-[#E2FB6C]/10
 to-transparent

 blur-2xl

 pointer-events-none
 "
/>


{/* FORM SIDE */}





{/* RIGHT DESIGN PANEL */}


<div
className="
hidden lg:flex
relative
m-5
rounded-[35px]
overflow-hidden

bg-gradient-to-br
from-[#16423C]
to-[#071C18]

p-10

flex-col
justify-between
"
>


{/* Premium light rays */}

<div
className="
absolute
-top-40
-right-40

w-[500px]
h-[500px]

rounded-full

bg-[#E2FB6C]/20

blur-[120px]
"
/>



{/* Abstract SVG learning path */}

<svg
className="
absolute
inset-0
w-full
h-full
opacity-30
pointer-events-none
"
viewBox="0 0 600 800"
fill="none"
>

<path
d="
M80 180
C250 80 400 250 300 400
C200 550 430 620 520 500
"
stroke="#E2FB6C"
strokeWidth="0.5"
strokeDasharray="8 10"
/>


<circle
cx="80"
cy="180"
r="5"
fill="#E2FB6C"
/>


<circle
cx="300"
cy="400"
r="5"
fill="#E2FB6C"
/>


<circle
cx="520"
cy="500"
r="5"
fill="#E2FB6C"
/>


</svg>




{/* Grain */}

<div
className="
absolute
inset-0

opacity-[0.05]

mix-blend-overlay

pointer-events-none
"
style={{
backgroundImage:
"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
}}
/>





{/* Header content */}

<div className="relative z-10">







<h2
className="
mt-7

font-serif

text-6xl

font-bold

leading-[1.05]

text-white
"
>

Learn.

<br/>

Grow.

<br/>


<span
className="
bg-gradient-to-r
from-[#E2FB6C]
to-[#45B88B]

bg-clip-text

text-transparent
"
>
Excel.
</span>


</h2>



<p
className="
mt-6

max-w-sm

text-white/60

leading-relaxed
"
>
Every path is mapped and every step measured — helping learners build knowledge with confidence.
</p>


</div>







{/* Bottom feature card */}


<div
className="
relative
z-10

mt-10

bg-[#45B88B]

rounded-[32px]

p-6

overflow-hidden

shadow-2xl
"
>


{/* L cut */}

<div
className="
absolute

top-0
right-0

w-24
h-24

bg-[#16423C]

rounded-bl-[45px]
"
>


<div
className="
absolute

top-5
right-5

w-12
h-12

rounded-full

bg-white/10

backdrop-blur-xl

flex
items-center
justify-center
"
>

<BsStars
className="
text-[#E2FB6C]

text-3xl

"
/>


</div>


</div>





{/* Icon */}

<div
className="
w-12
h-12

rounded-2xl

bg-white/20

flex
items-center
justify-center

mb-5
"
>

<BsLayers
className="
text-white

text-xl
"
/>

</div>




<h3
className="
text-white

font-bold

text-xl
"
>
Structured Learning Paths
</h3>



<p
className="
mt-3

text-white/80

text-sm

leading-relaxed

max-w-sm
"
>
Each module unlocks once you've mastered the last — creating a clear path from beginner to mastery.
</p>




{/* Mini roadmap */}

<div
className="
mt-6

flex

items-center

gap-3
"
>


{
[1,2,3,4].map((item)=>(
<div
key={item}
className="
flex
items-center
gap-3
"
>

<div
className="
w-3
h-3

rounded-full

bg-[#E2FB6C]
"
/>


{
item !==4 &&
<div
className="
w-8
h-px

bg-white/30
"
/>
}


</div>
))
}



</div>



</div>


</div>

<div
className="
p-6
sm:p-10
lg:p-14

flex
flex-col
justify-center
"
>


<h1
className="
text-3xl
font-bold

text-[#16423C]

dark:text-white
"
>
PerfectScore
</h1>



<p
className="
mt-3

text-gray-500

dark:text-[#6B8A85]
"
>
Create your learning account
</p>




<form className="space-y-6" onSubmit={handleSubmit}>
              
              <div>
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create password"
                  value={password}
                  showPasswordToggle
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
                {errors.password && <p>{errors.password}</p>}
              </div>
             
              <div className="flex items-start  gap-2">
                <div className="flex items-center h-5 ">
                  <input
                    className="w-5 h-5 cursor-pointer accent-[#1d1a24] border-[#7b7486] rounded-md focus:ring-[#16423C]"
                    id="terms"
                    type="checkbox"
                    onChange={(e) => setAccepted(e.target.checked)}
                  />
                </div>

                <label
                  className="text-xs font-semibold text-[#4a4455] dark:text-gray-200"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <span className="text-[#16423C] dark:text-[#E2FB6C] font-semibold ">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#16423C] dark:text-[#E2FB6C] font-semibold ">
                    Privacy Policy
                  </span>
                </label>
              </div>
              {errors.accepted && <p>{errors.accepted}</p>}
      

              <Button
                text="Create Account"
                loading={loading}
                loadingText="Creating account..."
                type="submit"
              />
            </form>
            <p className="mt-12 text-center text-[16px] leading-[1.5] text-[#4a4455] dark:text-gray-200">
              Already have an account?{" "}
              <Link
                className="text-[#16423C] dark:text-[#E2FB6C] font-bold hover:underline"
                to="/login"
              >
                Log In
              </Link>
            </p>


</div>

</section>


</main>
)
}
