import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { useToast } from "../../context/toast/useToast";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { MdDarkMode, MdLightMode, MdSchool, MdTrendingUp } from "react-icons/md";

type LoginErrors = {
  email?: string;
  password?: string;
  general?: string;
 
};

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { showToast } = useToast();
const [darkMode,setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

      const user = await login(email, password);

      showToast("Login successful", "success");

      if (user?.role === "SUPER_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Invalid email or password";

      setErrors({ general: message });
    
    } finally {
      setLoading(false);
    }
  };
  /*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

      await login(email, password);

      showToast("Login successful", "success");
      navigate("/dashboard");
    } catch (error: Error) {
      const message =
        error?.response?.data?.message || "Invalid email or password";

      setErrors({ general: message });
      showToast(message, "error")
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errors.general && <p>{errors.general}</p>}

      <div className="min-h-screen px-5 md:px-10 mb-10 mt-10">
        <main className="flex shadow rounded-2xl overflow-hidden border border-gray-100 justify-center items-center">
          <section className="hidden py-10 lg:flex lg:w-1/2 relative flex-col px-16 bg-[#16423C]">
            
            <div className="absolute inset-0 z-0 bg-[#16423C]/70"></div>

           }
            <div className="relative z-10 flex flex-col gap-70 h-full">
              
              <div>
                <div className="inline-flex items-center px-4 py-1   text-white text-sm font-semibold mb-6 ">
                  
                </div>
                <h1 className="text-4xl font-bold text-white">PerfectScore</h1>
              </div>

              <div className="max-w-xl">
        
                <h1 className="text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-white mb-4">
                  Welcome Back to{" "}
                  <span className="text-[#ffd700]">Excellence</span>
                </h1>

                <p className="text-[18px] leading-[1.6] font-normal text-white/80 mb-10">
                  Accesss your world class certificate dashboard and continue
                  your journe towards professional mastery.
                </p>
              </div>
            </div>
          </section>

  
          <section className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-12 lg:px-16">
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

            <div className="w-full max-w-110 md:max-w-150">
         
              <div className="flex items-center gap-2 mb-12">
                <div className="w-10 lg:hidden h-10 bg-[#16423C] rounded-xl flex items-center justify-center text-white">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  ></span>
                </div>

                <span className="text-[24px] lg:hidden leading-[1.3] font-bold text-[#16423C] tracking-tight">
                  PerfectScore
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl whitespace-nowrap md:text-4xl leading-tight font-semibold text-[#1d1a24] mb-1">
                  Sign In
                </h2>

                <p className="text-[16px] leading-normal text-[#4a4455]">
                  Enter your credentials to manage your learning.
                </p>
              </div>

              {errors.general && (
                <p className="text-red-400">{errors.general}</p>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {errors.email && (
                    <p className="text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    showPasswordToggle
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {errors.password && <p>{errors.password}</p>}
                </div>

                <Button
                  text="Sign In"
                  loading={loading}
                  loadingText="signing in..."
                  type="submit"
                />
              </form>

              <p className="mt-12 text-center text-[16px] leading-normal text-[#4a4455]">
                Don't have an account?{" "}
                <Link
                  className="text-[#16423C] font-bold hover:underline"
                  to="/register"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
  */
 return (

<div
className={`
min-h-screen

flex
items-center
justify-center

p-4
sm:p-6

transition-colors
duration-500

${darkMode 
? "dark bg-[#061311]" 
: "bg-gray-50"
}

`}
>



{/* THEME BUTTON */}

<button

onClick={()=>setDarkMode(!darkMode)}

className="
fixed
top-6
right-6

z-50

w-12
h-12

rounded-full

flex
items-center
justify-center

bg-white
dark:bg-white/10

border
border-gray-200
dark:border-white/10

shadow-lg

transition

hover:scale-110

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





<main

className="

relative

w-full

max-w-10xl

min-h-[700px]

grid

lg:grid-cols-2

overflow-hidden

rounded-[40px]

bg-white

dark:bg-[#0B1514]

border

border-gray-200

dark:border-white/10

shadow-2xl

"

>



{/* LEFT PREMIUM PANEL */}


<section

className="

hidden

lg:flex

relative

overflow-hidden

flex-col

justify-between

p-12

bg-gradient-to-br

from-[#16423C]

to-[#071C18]

"

>



{/* Glow */}


<div

className="

absolute

-top-20

-right-20

w-[400px]

h-[400px]

rounded-full

bg-[#E2FB6C]/20

blur-[120px]

"

/>




<div className="relative z-10">


<div

className="

flex

items-center

gap-3

text-white

font-bold

text-xl

"

>

<MdSchool
className="
text-[#E2FB6C]
text-3xl
"
/>


PerfectScore


</div>





<h1

className="

mt-20

text-6xl

font-bold

leading-tight

text-white

"

>

Welcome

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

Back.

</span>


</h1>




<p

className="

mt-6

max-w-md

text-white/60

leading-relaxed

"

>

Continue your learning journey and complete the skills that move you closer to mastery.

</p>


</div>





{/* Progress Card */}


<div

className="

relative

z-10

mt-10

rounded-3xl

bg-white/10

border

border-white/10

backdrop-blur-xl

p-6

"

>


<div

className="

flex

items-center

justify-between

"

>


<div>


<p

className="
text-white/50
text-xs
uppercase
tracking-widest
"

>

Current Progress

</p>


<h3

className="
text-white
font-bold
text-xl
mt-2
"

>

React Mastery

</h3>


</div>


<MdTrendingUp

className="
text-[#E2FB6C]
text-3xl
"

/>


</div>



<div

className="

mt-5

h-2

rounded-full

bg-white/20

overflow-hidden

"

>


<div

className="

h-full

w-[75%]

bg-gradient-to-r

from-[#E2FB6C]

to-[#45B88B]

rounded-full

"

/>


</div>



<p

className="

mt-3

text-white/60

text-sm

"

>

75% completed

</p>



</div>



</section>

{/* FORM SIDE */}

<section
className="
w-full


relative

flex
items-center
justify-center

p-6
sm:p-10
lg:p-16

bg-white
dark:bg-[#0B1514]

transition-colors
duration-500
"
>


{/* Soft background */}

<div
className="
absolute
top-0
right-0

w-72
h-72

bg-[#E2FB6C]/20

dark:bg-[#E2FB6C]/10

blur-3xl
hidden
dark:block
rounded-full

pointer-events-none
"
/>


<div
className="
absolute
bottom-0
left-0
hidden
dark:block
w-60
h-60

bg-[#16423C]/10

dark:bg-[#16423C]/40

blur-3xl

rounded-full

pointer-events-none
"
/>




<div
className="
relative
z-10

w-full
max-w-md
"
>


{/* Mobile Logo */}

<div
className="
flex
items-center
gap-3

mb-10

lg:hidden
"
>

<div
className="
w-11
h-11

rounded-xl

bg-[#16423C]

flex
items-center
justify-center

text-white

font-bold
"
>
P
</div>


<h1
className="
text-2xl
font-bold

text-[#16423C]

dark:text-white
"
>
PerfectScore
</h1>


</div>





{/* Header */}


<div
className="
mb-10
"
>


<p
className="
text-xs
uppercase

tracking-[0.25em]

font-semibold

text-[#16423C]

dark:text-[#E2FB6C]
"
>
Welcome Back
</p>



<h2
className="
mt-3

text-4xl

font-bold

tracking-tight

text-gray-900

dark:text-white
"
>
Sign in to continue
</h2>



<p
className="
mt-3

text-sm

leading-relaxed

text-gray-500

dark:text-gray-400
"
>
Continue your learning journey and track your progress towards mastery.
</p>



</div>





{
errors.general && (

<div
className="
mb-5

rounded-xl

bg-red-50

dark:bg-red-500/10

border

border-red-200

dark:border-red-500/20

p-3

text-sm

text-red-500
"
>

{errors.general}

</div>

)

}





{/* FORM */}


<form
className="
space-y-6
"
onSubmit={handleSubmit}
>


<div>

<Input

label="Email"

type="email"

placeholder="Enter your email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>


{
errors.email &&

<p
className="
mt-2

text-sm

text-red-500
"
>
{errors.email}
</p>

}


</div>





<div>


<Input

label="Password"

type="password"

placeholder="Enter your password"

value={password}

showPasswordToggle

onChange={(e)=>setPassword(e.target.value)}

/>



{
errors.password &&

<p
className="
mt-2

text-sm

text-red-500
"
>
{errors.password}
</p>

}


</div>






{/* Remember / Forgot */}


<div
className="
flex

items-center

justify-between

text-sm
"
>


<label
className="
flex
items-center
gap-2

text-gray-500

dark:text-gray-400

cursor-pointer
"
>


<input

type="checkbox"

className="
w-4
h-4

accent-[#16423C]

"
/>


Remember me


</label>





<Link

to="#"

className="
font-semibold

text-[#16423C]

dark:text-[#E2FB6C]

hover:underline
"
>

Forgot password?

</Link>


</div>







<Button

text="Sign In"

loading={loading}

loadingText="Signing in..."

type="submit"

/>



</form>








{/* Footer */}


<p
className="
mt-10

text-center

text-sm

text-gray-500

dark:text-gray-400
"
>

Don't have an account?


<Link

to="/register"

className="
ml-2

font-bold

text-[#16423C]

dark:text-[#E2FB6C]

hover:underline
"
>

Create account

</Link>


</p>



</div>


</section>
</main>

</div>

);
}
