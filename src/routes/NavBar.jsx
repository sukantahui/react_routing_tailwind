// ===============================================
// NavBar.jsx - Modern Professional Navigation
// ===============================================

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import cnat from "../assets/cnat.png";

const isDev = import.meta.env.DEV;

const NavBar = () => {
  const location = useLocation();
  const navRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [tutorialsOpen, setTutorialsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(location.hash || "");

  useEffect(() => {
    setActiveHash(location.hash);
  }, [location.hash]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setToolsOpen(false);
        setTutorialsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setToolsOpen(false);
    setTutorialsOpen(false);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setToolsOpen(false);
    setTutorialsOpen(false);
  };

  const isHome = location.pathname === "/";

  // Unified Professional Nav Link Styling
  const navLinkClass = (isActive) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? "text-sky-400 bg-slate-800/90 border border-slate-700/80 shadow-sm"
        : "text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent"
    }`;

  const toolsItems = [
    { to: "/tools/type-test", icon: "bi-keyboard", label: "Typing Speed Test" },
    { to: "/tools/typing-learn", icon: "bi-pencil", label: "Typing Tutor" },
    { to: "/python-play", icon: "bi-filetype-py", label: "Python Interactive Editor" },
    { to: "/play", icon: "bi-code-square", label: "JavaScript Playground" },
    { to: "/vscode", icon: "bi-window", label: "Web VS Code" },
    { to: "/whiteBoard", icon: "bi-easel", label: "Interactive Whiteboard" },
    { to: "/qrcode", icon: "bi-qr-code-scan", label: "QR Code Generator" },
    { to: "/LinkedListVisualizer", icon: "bi-diagram-2", label: "Linked List Visualizer" },
    { to: "/BinaryTreeVisualizer", icon: "bi-diagram-3", label: "Binary Tree Visualizer" },
    { to: "/AvlTreeVisualizer", icon: "bi-diagram-3", label: "AVL Tree Visualizer" },
  ];

  const tutorialsItems = [
    { to: "/javascript/roadmap", icon: "bi-filetype-js", label: "JavaScript Roadmap" },
    { to: "/python/roadmap", icon: "bi-filetype-py", label: "Python Roadmap" },
    { to: "/c-language/roadmap", icon: "bi-filetype-c", label: "C Programming" },
    { to: "/tally/roadmap", icon: "bi-calculator", label: "Tally Prime & Accounts" },
    { to: "/excel/roadmap", icon: "bi-file-spreadsheet", label: "Advanced Excel" },
    { to: "/icse-java-ix/roadmap", icon: "bi-journal-code", label: "ICSE Class 9 Java" },
    { to: "/icse-java-x/roadmap", icon: "bi-journal-code", label: "ICSE Class 10 Java" },
    { to: "/java-core/roadmap", icon: "bi-cpu", label: "Core Java" },
    { to: "/java-web/roadmap", icon: "bi-globe", label: "Java Web" },
    { to: "/rdbms-mysql/roadmap", icon: "bi-database", label: "RDBMS MySQL" },
    { to: "/react/roadmap", icon: "bi-code-slash", label: "React Roadmap" },
    { to: "/css/roadmap", icon: "bi-filetype-css", label: "Modern CSS & Tailwind" },
    { to: "/isc-11/roadmap", icon: "bi-journal-richtext", label: "ISC 11 Computer Science" },
    { to: "/isc-12/roadmap", icon: "bi-journal-richtext", label: "ISC 12 Computer Science" },
    { to: "/computer-architecture/roadmap", icon: "bi-motherboard", label: "Computer Architecture" },
    { to: "/unix/roadmap", icon: "bi-terminal", label: "UNIX" },
    { to: "/network/roadmap", icon: "bi-diagram-3", label: "Computer Networks" },
    { to: "/cyber-security/roadmap", icon: "bi-shield-lock", label: "Cyber Security" },
    { to: "/quantitative-analysis/roadmap", icon: "bi-graph-up-arrow", label: "Quantitative Analysis" },
    { to: "/general/roadmap", icon: "bi-files", label: "General" },
    ...(isDev ? [{ to: "/node/roadmap", icon: "bi-hdd-network", label: "Node.js Roadmap" }] : []),
  ];

  return (
    <header
      ref={navRef}
      className="w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/90 shadow-lg shadow-black/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="w-full flex items-center justify-between h-14">
          {/* Brand Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
          >
            <div className="relative flex items-center">
              <img
                src={cnat}
                alt="Coder & AccoTax"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                Coder & AccoTax
              </span>
              <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider hidden sm:block -mt-0.5">
                ISO 9001:2015 Certified
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {!isHome && (
              <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
                <i className="bi bi-house-door text-slate-400"></i>
                <span>Home</span>
              </NavLink>
            )}

            {isHome && (
              <>
                <HashLink smooth to="/#about" className={navLinkClass(activeHash === "#about")}>
                  <i className="bi bi-info-circle text-slate-400 text-xs"></i>
                  <span>About</span>
                </HashLink>
                <HashLink smooth to="/#courses" className={navLinkClass(activeHash === "#courses")}>
                  <i className="bi bi-book text-slate-400 text-xs"></i>
                  <span>Courses</span>
                </HashLink>
                <HashLink smooth to="/#teachers" className={navLinkClass(activeHash === "#teachers")}>
                  <i className="bi bi-people text-slate-400 text-xs"></i>
                  <span>Teachers</span>
                </HashLink>
                <HashLink smooth to="/#contact" className={navLinkClass(activeHash === "#contact")}>
                  <i className="bi bi-envelope text-slate-400 text-xs"></i>
                  <span>Contact</span>
                </HashLink>
              </>
            )}

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setToolsOpen(!toolsOpen);
                  setTutorialsOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                  toolsOpen
                    ? "text-sky-400 bg-slate-800/90 border border-slate-700/80"
                    : "text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent"
                }`}
              >
                <i className="bi bi-tools text-slate-400 text-xs"></i>
                <span>Tools</span>
                <i className={`bi bi-chevron-down text-[10px] text-slate-400 transition-transform ${toolsOpen ? "rotate-180 text-sky-400" : ""}`}></i>
              </button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 ring-1 ring-white/5"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-800 mb-1">
                      Online Tools & Compilers
                    </div>
                    <div className="max-h-80 overflow-y-auto space-y-0.5">
                      {toolsItems.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setToolsOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition ${
                              isActive
                                ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                                : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                            }`
                          }
                        >
                          <i className={`bi ${item.icon} text-sky-400 text-sm`}></i>
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tutorials Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setTutorialsOpen(!tutorialsOpen);
                  setToolsOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                  tutorialsOpen
                    ? "text-sky-400 bg-slate-800/90 border border-slate-700/80"
                    : "text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent"
                }`}
              >
                <i className="bi bi-collection-play text-slate-400 text-xs"></i>
                <span>Tutorials</span>
                <i className={`bi bi-chevron-down text-[10px] text-slate-400 transition-transform ${tutorialsOpen ? "rotate-180 text-sky-400" : ""}`}></i>
              </button>

              <AnimatePresence>
                {tutorialsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 ring-1 ring-white/5"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-800 mb-1">
                      Academic & Professional Roadmaps
                    </div>
                    <div className="max-h-96 overflow-y-auto space-y-0.5">
                      {tutorialsItems.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setTutorialsOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition ${
                              isActive
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                            }`
                          }
                        >
                          <i className={`bi ${item.icon} text-purple-400 text-sm`}></i>
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login Button */}
            <div className="ml-2">
              <NavLink
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all"
              >
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
              </NavLink>
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <NavLink
              to="/login"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition"
            >
              <span>Login</span>
            </NavLink>
            <button
              onClick={toggleMenu}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-slate-800/80 py-3 space-y-1"
            >
              {!isHome && (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
                      isActive ? "bg-slate-800 text-sky-400" : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  <i className="bi bi-house-door text-sky-400"></i>
                  <span>Home</span>
                </NavLink>
              )}

              {isHome && (
                <>
                  <HashLink
                    smooth
                    to="/#about"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                    onClick={closeMobileMenu}
                  >
                    <i className="bi bi-info-circle text-sky-400"></i>
                    <span>About</span>
                  </HashLink>
                  <HashLink
                    smooth
                    to="/#courses"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                    onClick={closeMobileMenu}
                  >
                    <i className="bi bi-book text-sky-400"></i>
                    <span>Courses</span>
                  </HashLink>
                  <HashLink
                    smooth
                    to="/#teachers"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                    onClick={closeMobileMenu}
                  >
                    <i className="bi bi-people text-sky-400"></i>
                    <span>Teachers</span>
                  </HashLink>
                  <HashLink
                    smooth
                    to="/#contact"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                    onClick={closeMobileMenu}
                  >
                    <i className="bi bi-envelope text-sky-400"></i>
                    <span>Contact</span>
                  </HashLink>
                </>
              )}

              {/* Mobile Tools accordion */}
              <div className="pt-1">
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <i className="bi bi-tools text-sky-400"></i>
                    <span>Tools & Compilers</span>
                  </span>
                  <i className={`bi bi-chevron-down text-[10px] transition-transform ${toolsOpen ? "rotate-180" : ""}`}></i>
                </button>
                {toolsOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-0.5">
                    {toolsItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={closeMobileMenu}
                        className="block px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Tutorials accordion */}
              <div className="pt-1">
                <button
                  onClick={() => setTutorialsOpen(!tutorialsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <i className="bi bi-collection-play text-purple-400"></i>
                    <span>Tutorials & Roadmaps</span>
                  </span>
                  <i className={`bi bi-chevron-down text-[10px] transition-transform ${tutorialsOpen ? "rotate-180" : ""}`}></i>
                </button>
                {tutorialsOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-0.5">
                    {tutorialsItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={closeMobileMenu}
                        className="block px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavBar;