import { useEffect, useMemo, useState } from "react";

import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Navbar() {
 const [open, setOpen] = useState(false);
 const [active, setActive] = useState("features");

 const links = useMemo(
 () => [
 { name: "Features", id: "features" },
 { name: "Courses", id: "courses" },
 { name: "How it Works", id: "HowItWork" },
 { name: "FAQ", id: "FAQ" },
 ],
 []
 );

 // Dark mode toggle
 const [darkMode, setDarkMode] = useState(() => {
 if (typeof window === "undefined") return false;
 return localStorage.getItem("theme") === "dark";
 });

 const toggleTheme = () => {
 setDarkMode((prevDarkMode) => {
 const nextDarkMode = !prevDarkMode;
 localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
 return nextDarkMode;
 });
 };

 useEffect(() => {
 if (darkMode) {
 document.documentElement.classList.add("dark");
 } else {
 document.documentElement.classList.remove("dark");
 }
 }, [darkMode]);

 // Scroll spy (active section tracking)
 useEffect(() => {
 const handleScroll = () => {
 const scrollPos = window.scrollY + 150;

 links.forEach((link) => {
 const section = document.getElementById(link.id);
 if (section) {
 if (
 scrollPos >= section.offsetTop &&
 scrollPos < section.offsetTop + section.offsetHeight
 ) {
 setActive(link.id);
 }
 }
 });
 };

 window.addEventListener("scroll", handleScroll);
 return () => window.removeEventListener("scroll", handleScroll);
 }, [links]);

 return (
 <>
 {/* NAVBAR */}
 <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-sm">
 <div className=" px-6 py-6 md:py-4 flex justify-between items-center">

 {/* Logo */}
 <div className="flex gap-4">
 <h1 className="text-xl font-bold text-[#5300b7] dark:text-[#d3bbff]">
 Perfect Score
 </h1>
{/* Dark toggle */}
 <button
 onClick={toggleTheme}
 className="text-2xl cursor-pointer dark:text-[#d3bbff] text-[#5300b7] "
>
 {darkMode ? <MdDarkMode /> : <MdLightMode />}
</button>
 </div>
 {/* Desktop Links */}
 <div className="hidden md:flex space-x-6">
 {links.map((link) => (
 <a
 key={link.id}
 href={`#${link.id}`}
 className={`transition font-medium ${
 active === link.id
 ? "text-[#5300b7] dark:text-[#d3bbff] text-lg border-b-2 border-[#5300b7] dark:border-[#d3bbff]"
 : "text-gray-600 text-lg dark:text-gray-100"
 }`}
 >
 {link.name}
 </a>
 ))}
 </div>

 {/* Right controls */}
<div className="hidden md:flex items-center gap-4 shadow-b-lg flex-gap-2 text-white w-fit rounded-xl dark:text-[#381e72] bg-[#5300b7] dark:bg-[#d3bbff] font-semibold px-8 py-2">
                <button className="text-lg cursor-pointer ">Sign in</button>
               
            </div>
 <div className="flex md:hidden items-center gap-3">

 

 {/* Hamburger */}
 <button
 onClick={() => setOpen(true)}
 className="md:hidden flex flex-col gap-1 cursor-pointer"
 >
 <span className="w-6 h-1 bg-[#5300b7] dark:bg-white"></span>
 <span className="w-6 h-1 bg-[#5300b7] dark:bg-white"></span>
 <span className="w-6 h-1 bg-[#5300b7] dark:bg-white"></span>
 </button>
 </div>
 </div>
 </nav>

 {/* OVERLAY */}
 {open && (
 <div
 onClick={() => setOpen(false)}
 className="fixed inset-0 bg-black/40 z-40"
 />
 )}

 {/* MOBILE MENU (SLIDE FROM LEFT) */}
 <div
 className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
 open ? "translate-x-0" : "-translate-x-full"
 }`}
>
 <div className="p-6">

 {/* HEADER (NEW CLOSE BUTTON ADDED HERE) */}
 <div className="flex  justify-end items-right mb-6">
 

 {/* ❌ CLOSE BUTTON */}
 <button
 onClick={() => setOpen(false)}
 className="text-2xl cursor-pointer text-gray-600 dark:text-gray-300"
 >
 ×
 </button>
 </div>

 {/* LINKS */}
 <div className="flex flex-col space-y-8">
 {links.map((link) => (
 <a
 key={link.id}
 href={`#${link.id}`}
 onClick={() => {
 setActive(link.id);
 setOpen(false);
 }}
 className={`text-left text-lg transition ${
 active === link.id
 ? "text-[#5300b7] font-semibold dark:text-[#d3bbff]"
 : "text-gray-700 dark:text-gray-200"
 }`}
 >
 {link.name}
 </a>
 ))}
 </div>
 <div className="md:hidden mt-5 flex items-center gap-4 shadow-b-lg flex-gap-2 text-white dark:text-[#381e72] w-fit rounded-xl bg-[#5300b7] dark:bg-[#d3bbff] font-semibold px-8 py-2">
                <button className="text-lg cursor-pointer">Sign in</button>
               
            </div>
 </div>
</div>
 </>
 );
}