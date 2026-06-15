import { useEffect, useMemo, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation schema breaking down route types explicitly
  const links = useMemo(
    () => [
      { name: "Home", id: "hero", type: "hash" },
      { name: "Features", id: "features", type: "hash" },
      { name: "Courses", id: "courses", type: "hash" },
      { name: "Contact", id: "/contact", type: "route" }, // Direct page routing handler
    ],
    []
  );

  // Dark mode theme initialization toggle
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Track dynamic window coordinates for Scroll-Spying page blocks
  useEffect(() => {
    if (location.pathname !== "/") return; // Only spy on home page sections

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 140;
      links.forEach((link) => {
        if (link.type === "hash") {
          const section = document.getElementById(link.id);
          if (section) {
            if (
              scrollPos >= section.offsetTop &&
              scrollPos < section.offsetTop + section.offsetHeight
            ) {
              setActive(link.id);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links, location.pathname]);

  return (
    <>
      {/* ==========================================
          HEADER/NAVBAR BODY 
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-[#FAFBF9]/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/60 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Platform Identity Branding */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-xl font-bold tracking-tight text-[#16423C] dark:text-[#C2FFC1]">
              Perfect<span className="font-light text-gray-700 dark:text-gray-300">Score</span>
            </span>
          </Link>

          {/* Desktop Navigation Links Container */}
          <div className="hidden md:flex items-center bg-gray-100/60 dark:bg-slate-800/40 p-1.5 rounded-full border border-gray-200/30 dark:border-slate-700/30">
            {links.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.id}
                  to={link.id}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.id
                      ? "bg-[#16423C] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#16423C] dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active === link.id && location.pathname === "/"
                      ? "bg-[#16423C] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#16423C] dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* Control Triggers Layer */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-xl rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              aria-label="Toggle Dynamic Theme"
            >
              {darkMode ? <MdDarkMode className="text-[#e1da14]" /> : <MdLightMode className="text-[#16423C]" />}
            </button>
            
            <Link
              to="/login"
              className="hidden md:inline-flex items-center justify-center text-sm font-bold bg-[#16423C] hover:bg-[#0F2C28] dark:bg-[#C2FFC1] dark:hover:bg-[#aefcae] text-white dark:text-[#060e20] px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm"
            >
              Sign In
            </Link>

            {/* Hamburger Interactive Menu Trigger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col items-center justify-center gap-1 w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800/60 z-50 cursor-pointer"
              aria-label="Toggle Drawer Menu"
            >
              <span className={`w-6 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`w-6 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              {/* <span className={`w-4 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-1" : ""}`} /> */}
            </button>
          </div>
        </div>
      </nav>

{/* for mobile */}
      <div
        className={`fixed inset-x-0 top-0 z-40 bg-[#FAFBF9] dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transform transition-all duration-300 ease-in-out md:hidden flex flex-col pt-24 pb-8 px-8 gap-8 ${
          open ? "translate-y-0 opacity-100 shadow-2xl" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Left Aligned Content List Stack */}
        <div className="flex flex-col space-y-5 text-left">
          {links.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.id}
                to={link.id}
                onClick={() => setOpen(false)}
                className={`text-md font-semibold tracking-tight transition-colors ${
                  location.pathname === link.id
                    ? "text-[#16423C] dark:text-[#C2FFC1]"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={() => setOpen(false)}
                className={`text-md font-semibold tracking-tight transition-colors ${
                  active === link.id && location.pathname === "/"
                    ? "text-[#16423C] dark:text-[#C2FFC1]"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.name}
              </a>
            )
          )}
        </div>

        {/* Full width primary interaction utility button row */}
        <div className="w-full pt-4 border-t border-gray-100 dark:border-slate-800/80">
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center text-base font-bold bg-[#16423C] dark:bg-[#C2FFC1] text-white dark:text-[#060e20] py-3.5 px-6 rounded-xl w-full shadow-md active:scale-98 transition-all"
          >
            Get started
          </Link>
        </div>
      </div>
    </>
  );
}