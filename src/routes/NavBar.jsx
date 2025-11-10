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

  // 🔹 Update active hash when location changes
  useEffect(() => {
    setActiveHash(location.hash);
  }, [location]);

  // 🔹 Color mapping for each section
  const activeColors = {
    home: "from-sky-600 to-purple-600",
    about: "from-green-500 to-lime-500",
    courses: "from-pink-500 to-rose-500",
    teachers: "from-amber-500 to-orange-500",
    services: "from-indigo-500 to-blue-500",
    contact: "from-emerald-500 to-teal-500",
    login: "from-red-500 to-pink-500",
  };

  // 🔹 General function for all link styles
  const linkClass = (key, isActive = false) =>
    `block px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
      isActive
        ? `bg-gradient-to-r ${activeColors[key]} text-white shadow-md`
        : "text-gray-300 hover:text-sky-300 hover:bg-gray-800/40"
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-gray-900/60 backdrop-blur-md border-b border-gray-700/40 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* 🔹 Brand */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 font-semibold text-lg text-white"
          >
            <img src={cnat} alt="Coder & AccoTax Logo" className="w-9 h-9" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-purple-300 to-pink-300">
              Coder & AccoTax
            </span>
          </motion.div>

          {/* 🔹 Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-gray-300 text-2xl focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* 🔹 Desktop Menu */}
          <nav className="hidden sm:flex items-center gap-3">
            {!isHome && (
              <NavLink to="/" className={({ isActive }) => linkClass("home", isActive)}>
                Home
              </NavLink>
            )}

            {isHome && (
              <>
                <HashLink
                  smooth
                  to="/#about"
                  className={linkClass("about", activeHash === "#about")}
                >
                  About
                </HashLink>
                <HashLink
                  smooth
                  to="/#courses"
                  className={linkClass("courses", activeHash === "#courses")}
                >
                  Courses
                </HashLink>
                <HashLink
                  smooth
                  to="/#teachers"
                  className={linkClass("teachers", activeHash === "#teachers")}
                >
                  Teachers
                </HashLink>
                <HashLink
                  smooth
                  to="/#services"
                  className={linkClass("services", activeHash === "#services")}
                >
                  Services
                </HashLink>
                <HashLink
                  smooth
                  to="/#contact"
                  className={linkClass("contact", activeHash === "#contact")}
                >
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
              className="sm:hidden flex flex-col gap-2 pb-3"
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
