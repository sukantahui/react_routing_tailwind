import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import cnat from "../assets/cnat.png";

const isDev = import.meta.env.DEV;

/**
 * Professional navigation bar with responsive menu,
 * dropdowns for Tools and Tutorials, and smooth animations.
 */
const NavBar = () => {
  const location = useLocation();
  const navRef = useRef(null);

  // State for mobile menu and dropdowns
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [tutorialsOpen, setTutorialsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(location.hash || "");

  // Update active hash when location changes
  useEffect(() => {
    setActiveHash(location.hash);
  }, [location.hash]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setServicesOpen(false);
        setTutorialsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setServicesOpen(false);
    setTutorialsOpen(false);
  };

  const toggleServices = () => {
    setServicesOpen((prev) => !prev);
    setTutorialsOpen(false);
  };

  const toggleTutorials = () => {
    setTutorialsOpen((prev) => !prev);
    setServicesOpen(false);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setTutorialsOpen(false);
  };

  // Helper to get icon class based on link key
  const getIconClass = (key) => {
    const icons = {
      home: "bi-house-door",
      about: "bi-info-circle",
      courses: "bi-book",
      teachers: "bi-people",
      services: "bi-tools",
      tutorials: "bi-collection-play",
      contact: "bi-envelope",
      login: "bi-box-arrow-in-right",
      "typing-test": "bi-keyboard",
      "typing-learn": "bi-pencil",
      "python-play": "bi-code-slash",
      play: "bi-code-square",
      icons: "bi-grid-3x3",
      vscode: "bi-window",
      whiteboard: "bi-easel",
      javascript: "bi-filetype-js",
      python: "bi-filetype-py",
      "c-language": "bi-filetype-c",
      tally: "bi-calculator",
      excel: "bi-file-spreadsheet",
      "icse-java-ix": "bi-journal-code",
      "icse-java-x": "bi-journal-code",
      "java-core": "bi-cpu",
      general: "bi-files",
      "computer-architecture": "bi-motherboard",
      "isc-11": "bi-journal-richtext",
      css: "bi-filetype-css",
      unix: "bi-terminal",
      react: "bi-filetype-js",     // ✅ replaced bi-react with existing icon
      node: "bi-node",             // ✅ bi-node exists in Bootstrap Icons
      "java-web": "bi-globe",
      "qr-code": "bi-qr-code-scan",
      network: "bi-diagram-3",
      LinkedListVisualizer: "bi-diagram-2",
    };
    return icons[key] || "bi-link";
  };

  // Dynamic styling for navigation links
  const linkClass = (key, isActive) => {
    const activeColors = {
      home: "from-sky-600 to-purple-600",
      about: "from-green-500 to-lime-500",
      courses: "from-pink-500 to-rose-500",
      teachers: "from-amber-500 to-orange-500",
      services: "from-indigo-500 to-blue-500",
      tutorials: "from-yellow-500 to-amber-500",
      contact: "from-emerald-500 to-teal-500",
      login: "from-red-500 to-pink-500",
    };

    return `flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-200 ${
      isActive
        ? `bg-gradient-to-r ${activeColors[key]} text-white shadow-lg shadow-${activeColors[key].split(" ")[0]}/30`
        : "text-gray-300 hover:text-white hover:bg-gray-800/70 hover:scale-105"
    }`;
  };

  const isHome = location.pathname === "/";

  // Define menu items (DRY)
  const toolsItems = [
    { to: "/tools/type-test", key: "typing-test", label: "Typing Test" },
    { to: "/tools/typing-learn", key: "typing-learn", label: "Typing Learn" },
    { to: "/python-play", key: "python-play", label: "Python Editor" },
    { to: "/play", key: "play", label: "JavaScript Editor" },
    { to: "/icons", key: "icons", label: "Icons" },
    { to: "/vscode", key: "vscode", label: "VS Code" },
    { to: "/whiteBoard", key: "whiteboard", label: "Whiteboard" },
    { to: "/qrcode", key: "qr-code", label: "QR Code Generator" },
    { to: "/LinkedListVisualizer", key: "LinkedListVisualizer", label: "Linked List Visualizer" },
    { to: "/DoublyLinkedListVisualizer", key: "DoublyLinkedListVisualizer", label: "Double Linked List Visualizer" },
    { to: "/BinaryTreeVisualizer", key: "BinaryTreeVisualizer", label: "Binary Tree Visualizer" },
    { to: "/AvlTreeVisualizer", key: "AvlTreeVisualizer", label: "AVL Tree Visualizer" },
  ];

  const tutorialsItems = [
    { to: "/javascript/roadmap", key: "javascript", label: "JavaScript", icon: "bi-filetype-js" },
    { to: "/python/roadmap", key: "python", label: "Python", icon: "bi-filetype-py" },
    { to: "/c-language/roadmap", key: "c-language", label: "C Programming", icon: "bi-filetype-c" },
    { to: "/tally/roadmap", key: "tally", label: "Tally", icon: "bi-calculator" },
    { to: "/excel/roadmap", key: "excel", label: "Excel", icon: "bi-file-spreadsheet" },
    { to: "/icse-java-ix/roadmap", key: "icse-java-ix", label: "ICSE Class 9", icon: "bi-journal-code" },
    { to: "/icse-java-x/roadmap", key: "icse-java-x", label: "ICSE Class X", icon: "bi-journal-code" },
    { to: "/java-core/roadmap", key: "java-core", label: "Core Java", icon: "bi-cpu" },
    { to: "/general/roadmap", key: "general", label: "General", icon: "bi-files" },
    { to: "/css/roadmap", key: "css", label: "CSS", icon: "bi-filetype-css" },
    { to: "/isc-11/roadmap", key: "isc-11", label: "ISC 11 Com. Sc.", icon: "bi-journal-richtext" },
    { to: "/isc-12/roadmap", key: "isc-11", label: "ISC 12 Com. Sc.", icon: "bi-journal-richtext" },
    { to: "/computer-architecture/roadmap", key: "computer-architecture", label: "Computer Architecture", icon: "bi-motherboard" },
    { to: "/unix/roadmap", key: "unix", label: "UNIX", icon: "bi-terminal" },
    { to: "/react/roadmap", key: "react", label: "React", icon: "bi-filetype-js" },   // ✅ updated to valid icon
    { to: "/network/roadmap", key: "network", label: "Network", icon: "bi-diagram-3" },
    ...(isDev ? [{ to: "/node/roadmap", key: "node", label: "Node.js", icon: "bi-node" }] : []),
    { to: "/java-web/roadmap", key: "java-web", label: "Java Web", icon: "bi-globe" },
  ];

  return (
    <motion.header
      ref={navRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-gradient-to-b from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Brand */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 sm:gap-3 font-semibold text-lg sm:text-xl text-white"
          >
            <img src={cnat} alt="Coder & AccoTax Logo" className="w-8 h-8 sm:w-9 sm:h-9" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 whitespace-nowrap">
              Coder & AccoTax
            </span>
          </motion.div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-gray-300 text-2xl focus:outline-none hover:text-white transition"
            aria-label="Toggle navigation"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex items-center gap-2 md:gap-3">
            {!isHome && (
              <NavLink to="/" className={({ isActive }) => linkClass("home", isActive)}>
                <i className={`bi ${getIconClass("home")}`}></i>
                <span>Home</span>
              </NavLink>
            )}

            {isHome && (
              <>
                <HashLink smooth to="/#about" className={linkClass("about", activeHash === "#about")}>
                  <i className={`bi ${getIconClass("about")}`}></i>
                  <span>About</span>
                </HashLink>
                <HashLink smooth to="/#courses" className={linkClass("courses", activeHash === "#courses")}>
                  <i className={`bi ${getIconClass("courses")}`}></i>
                  <span>Courses</span>
                </HashLink>
                <HashLink smooth to="/#teachers" className={linkClass("teachers", activeHash === "#teachers")}>
                  <i className={`bi ${getIconClass("teachers")}`}></i>
                  <span>Teachers</span>
                </HashLink>
                <HashLink smooth to="/#services" className={linkClass("services", activeHash === "#services")}>
                  <i className={`bi ${getIconClass("services")}`}></i>
                  <span>Services</span>
                </HashLink>
                <HashLink smooth to="/#contact" className={linkClass("contact", activeHash === "#contact")}>
                  <i className={`bi ${getIconClass("contact")}`}></i>
                  <span>Contact</span>
                </HashLink>
              </>
            )}

            {/* Tools dropdown */}
            <div className="relative">
              <button
                onClick={toggleServices}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 text-sm sm:text-base font-medium rounded-full transition"
              >
                <i className={`bi ${getIconClass("services")}`}></i>
                <span>Tools</span>
                <i className={`bi bi-chevron-down text-xs transition-transform ${servicesOpen ? "rotate-180" : ""}`}></i>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 z-50"
                  >
                    {toolsItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={toggleServices}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                            isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"
                          }`
                        }
                      >
                        <i className={`bi ${getIconClass(item.key)} text-lg`}></i>
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tutorials dropdown */}
            <div className="relative">
              <button
                onClick={toggleTutorials}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 text-sm sm:text-base font-medium rounded-full transition"
              >
                <i className={`bi ${getIconClass("tutorials")}`}></i>
                <span>Tutorials</span>
                <i className={`bi bi-chevron-down text-xs transition-transform ${tutorialsOpen ? "rotate-180" : ""}`}></i>
              </button>

              <AnimatePresence>
                {tutorialsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 z-50 max-h-96 overflow-y-auto"
                  >
                    {tutorialsItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={toggleTutorials}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                            isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"
                          }`
                        }
                      >
                        <i className={`bi ${item.icon} text-lg`}></i>
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login */}
            <NavLink to="/login" className={({ isActive }) => linkClass("login", isActive)}>
              <i className={`bi ${getIconClass("login")}`}></i>
              <span>Login</span>
            </NavLink>
          </nav>
        </div>

        {/* Mobile menu */}
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
                <NavLink to="/" className={({ isActive }) => linkClass("home", isActive)} onClick={closeMobileMenu}>
                  <i className={`bi ${getIconClass("home")}`}></i>
                  <span>Home</span>
                </NavLink>
              )}

              {isHome && (
                <>
                  <HashLink smooth to="/#about" className={linkClass("about", activeHash === "#about")} onClick={closeMobileMenu}>
                    <i className={`bi ${getIconClass("about")}`}></i>
                    <span>About</span>
                  </HashLink>
                  <HashLink smooth to="/#courses" className={linkClass("courses", activeHash === "#courses")} onClick={closeMobileMenu}>
                    <i className={`bi ${getIconClass("courses")}`}></i>
                    <span>Courses</span>
                  </HashLink>
                  <HashLink smooth to="/#teachers" className={linkClass("teachers", activeHash === "#teachers")} onClick={closeMobileMenu}>
                    <i className={`bi ${getIconClass("teachers")}`}></i>
                    <span>Teachers</span>
                  </HashLink>
                  <HashLink smooth to="/#services" className={linkClass("services", activeHash === "#services")} onClick={closeMobileMenu}>
                    <i className={`bi ${getIconClass("services")}`}></i>
                    <span>Services</span>
                  </HashLink>
                  <HashLink smooth to="/#contact" className={linkClass("contact", activeHash === "#contact")} onClick={closeMobileMenu}>
                    <i className={`bi ${getIconClass("contact")}`}></i>
                    <span>Contact</span>
                  </HashLink>
                </>
              )}

              {/* Mobile Tools dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={toggleServices}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-full text-left"
                >
                  <i className={`bi ${getIconClass("services")}`}></i>
                  <span>Tools</span>
                  <i className={`bi bi-chevron-down text-xs ml-auto transition-transform ${servicesOpen ? "rotate-180" : ""}`}></i>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 flex flex-col gap-1 overflow-hidden"
                    >
                      {toolsItems.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                              isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"
                            }`
                          }
                        >
                          <i className={`bi ${getIconClass(item.key)}`}></i>
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Tutorials dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={toggleTutorials}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-full text-left"
                >
                  <i className={`bi ${getIconClass("tutorials")}`}></i>
                  <span>Tutorials</span>
                  <i className={`bi bi-chevron-down text-xs ml-auto transition-transform ${tutorialsOpen ? "rotate-180" : ""}`}></i>
                </button>

                <AnimatePresence>
                  {tutorialsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 flex flex-col gap-1 overflow-hidden"
                    >
                      {tutorialsItems.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                              isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"
                            }`
                          }
                        >
                          <i className={`bi ${item.icon}`}></i>
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Login */}
              <NavLink to="/login" className={({ isActive }) => linkClass("login", isActive)} onClick={closeMobileMenu}>
                <i className={`bi ${getIconClass("login")}`}></i>
                <span>Login</span>
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default NavBar;