import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import cnat from "../assets/cnat.png";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [activeHash, setActiveHash] = useState(location.hash);

  useEffect(() => {
    setActiveHash(location.hash);
  }, [location]);

  const activeColors = {
    home: "from-sky-600 to-purple-600",
    about: "from-green-500 to-lime-500",
    courses: "from-pink-500 to-rose-500",
    teachers: "from-amber-500 to-orange-500",
    services: "from-indigo-500 to-blue-500",
    contact: "from-emerald-500 to-teal-500",
    login: "from-red-500 to-pink-500",
  };

  // 🔹 Minimalist link style — no glow or shadow
  const linkClass = (key, isActive = false) =>
    `block px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-200 ${
      isActive
        ? `bg-gradient-to-r ${activeColors[key]} text-white`
        : "text-gray-300 hover:text-white hover:bg-gray-800/70"
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      // 🖤 Flat, matte, dark gradient — no blur or extra shadow
      className="sticky top-0 z-50 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* 🔹 Brand */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 sm:gap-3 font-semibold text-lg sm:text-xl text-white"
          >
            <img
              src={cnat}
              alt="Coder & AccoTax Logo"
              className="w-8 h-8 sm:w-9 sm:h-9"
            />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 whitespace-nowrap">
              Coder & AccoTax
            </span>
          </motion.div>

          {/* 🔹 Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-gray-300 text-2xl focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* 🔹 Desktop Menu */}
          <nav className="hidden sm:flex items-center gap-2 md:gap-3">
            {!isHome && (
              <NavLink to="/" className={({ isActive }) => linkClass("home", isActive)}>
                Home
              </NavLink>
            )}

            {isHome && (
              <>
                <HashLink smooth to="/#about" className={linkClass("about", activeHash === "#about")}>
                  About
                </HashLink>
                <HashLink smooth to="/#courses" className={linkClass("courses", activeHash === "#courses")}>
                  Courses
                </HashLink>
                <HashLink smooth to="/#teachers" className={linkClass("teachers", activeHash === "#teachers")}>
                  Teachers
                </HashLink>
                <HashLink smooth to="/#services" className={linkClass("services", activeHash === "#services")}>
                  Services
                </HashLink>
                <HashLink smooth to="/#contact" className={linkClass("contact", activeHash === "#contact")}>
                  Contact
                </HashLink>
              </>
            )}

            <NavLink to="/login" className={({ isActive }) => linkClass("login", isActive)}>
              Login
            </NavLink>
          </nav>
        </div>

        {/* 🔹 Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden flex flex-col gap-2 pb-4"
            >
              {!isHome && (
                <NavLink
                  to="/"
                  className={({ isActive }) => linkClass("home", isActive)}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              )}

              {isHome && (
                <>
                  <HashLink
                    smooth
                    to="/#about"
                    className={linkClass("about", activeHash === "#about")}
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </HashLink>
                  <HashLink
                    smooth
                    to="/#courses"
                    className={linkClass("courses", activeHash === "#courses")}
                    onClick={() => setIsOpen(false)}
                  >
                    Courses
                  </HashLink>
                  <HashLink
                    smooth
                    to="/#teachers"
                    className={linkClass("teachers", activeHash === "#teachers")}
                    onClick={() => setIsOpen(false)}
                  >
                    Teachers
                  </HashLink>
                  <HashLink
                    smooth
                    to="/#services"
                    className={linkClass("services", activeHash === "#services")}
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </HashLink>
                  <HashLink
                    smooth
                    to="/#contact"
                    className={linkClass("contact", activeHash === "#contact")}
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </HashLink>
                </>
              )}

              <NavLink
                to="/login"
                className={({ isActive }) => linkClass("login", isActive)}
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
