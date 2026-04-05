import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AuthNavBar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [masterOpen, setMasterOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [tutorialsOpen, setTutorialsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMasterOpen, setMobileMasterOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileTutorialsOpen, setMobileTutorialsOpen] = useState(false);

  // Refs for click outside detection
  const masterMenuRef = useRef(null);
  const toolsMenuRef = useRef(null);
  const tutorialsMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMaster = () => {
    setMasterOpen(!masterOpen);
    setToolsOpen(false);
    setTutorialsOpen(false);
  };

  const toggleTools = () => {
    setToolsOpen(!toolsOpen);
    setMasterOpen(false);
    setTutorialsOpen(false);
  };

  const toggleTutorials = () => {
    setTutorialsOpen(!tutorialsOpen);
    setMasterOpen(false);
    setToolsOpen(false);
  };

  const closeMenus = () => {
    setMasterOpen(false);
    setToolsOpen(false);
    setTutorialsOpen(false);
    setMobileMenuOpen(false);
    setMobileMasterOpen(false);
    setMobileToolsOpen(false);
    setMobileTutorialsOpen(false);
  };

  // Handle click outside for desktop menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close master menu if clicked outside
      if (masterMenuRef.current && !masterMenuRef.current.contains(event.target)) {
        setMasterOpen(false);
      }
      // Close tools menu if clicked outside
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
      // Close tutorials menu if clicked outside
      if (tutorialsMenuRef.current && !tutorialsMenuRef.current.contains(event.target)) {
        setTutorialsOpen(false);
      }
      // Close mobile menu if clicked outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]); // Re-run when mobile menu state changes

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      if (event.key === "Escape" && masterOpen) {
        setMasterOpen(false);
      }
      if (event.key === "Escape" && toolsOpen) {
        setToolsOpen(false);
      }
      if (event.key === "Escape" && tutorialsOpen) {
        setTutorialsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [mobileMenuOpen, masterOpen, toolsOpen, tutorialsOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("After logout - token:", localStorage.getItem("token"));
    console.log("After logout - user:", localStorage.getItem("user"));
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const isDev = import.meta.env.DEV;

  // Helper to get icon class – fallback to "bi-folder" if not found
  const getIconClass = (iconName) => {
    const validIcons = {
      "bi-filetype-js": true,
      "bi-filetype-py": true,
      "bi-filetype-c": true,
      "bi-calculator": true,
      "bi-file-spreadsheet": true,
      "bi-journal-code": true,
      "bi-cpu": true,
      "bi-files": true,
      "bi-filetype-css": true,
      "bi-journal-richtext": true,
      "bi-motherboard": true,
      "bi-terminal": true,
      "bi-diagram-3": true,
      "bi-node": true,
      "bi-globe": true,
    };
    return validIcons[iconName] ? iconName : "bi-folder";
  };

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
    { to: "/isc-12/roadmap", key: "isc-12", label: "ISC 12 Com. Sc.", icon: "bi-journal-richtext" },
    { to: "/computer-architecture/roadmap", key: "computer-architecture", label: "Computer Architecture", icon: "bi-motherboard" },
    { to: "/unix/roadmap", key: "unix", label: "UNIX", icon: "bi-terminal" },
    { to: "/react/roadmap", key: "react", label: "React", icon: "bi-filetype-js" },
    { to: "/network/roadmap", key: "network", label: "Network", icon: "bi-diagram-3" },
    ...(isDev ? [{ to: "/node/roadmap", key: "node", label: "Node.js", icon: "bi-node" }] : []),
    { to: "/java-web/roadmap", key: "java-web", label: "Java Web", icon: "bi-globe" },
  ];

  const masterItems = [
    { to: "/students/add", label: "Students" },
    { to: "/subjects", label: "Add Subject" },
    { to: "/courses", label: "Courses" },
    { to: "/admission", label: "Admission" },
    { to: "/results", label: "Result" },
    { to: "/teachers", label: "Teachers" },
    { to: "/certificates", label: "Certificates" },
    { to: "/certificate", label: "Gen. Certificate" }
  ];

  const toolsItems = [
    { to: "/tools/type-test", label: "Typing Test" },
    { to: "/tools/typing-learn", label: "Typing Learn" },
    { to: "/python-play", label: "Python Editor" },
    { to: "/play", label: "JavaScript Editor" },
    { to: "/icons", label: "Icons" },
    { to: "/whiteBoard", label: "Whiteboard" },
    { to: "/studentFeesReceipt", label: "Student Fees Receipt" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 text-gray-100 px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg"
      >
        {/* Brand */}
        <div
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-sky-400 tracking-wide cursor-pointer hover:text-sky-300 transition"
        >
          Coder<span className="text-purple-400">&</span>AccoTax
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/dashboard"
            onClick={closeMenus}
            className={({ isActive }) =>
              isActive
                ? "text-sky-400 border-b-2 border-sky-500 pb-1"
                : "text-gray-300 hover:text-sky-400"
            }
          >
            Dashboard
          </NavLink>

          {/* MASTER MENU */}
          <div className="relative" ref={masterMenuRef}>
            <button
              onClick={toggleMaster}
              className="text-gray-300 hover:text-white flex items-center gap-1"
            >
              Master ▾
            </button>

            <AnimatePresence>
              {masterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2"
                >
                  {masterItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="block px-3 py-2 hover:bg-gray-800 rounded"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TOOLS MENU */}
          <div className="relative" ref={toolsMenuRef}>
            <button
              onClick={toggleTools}
              className="text-gray-300 hover:text-white flex items-center gap-1"
            >
              Tools ▾
            </button>

            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2"
                >
                  {toolsItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="block px-3 py-2 hover:bg-gray-800 rounded"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tutorials dropdown */}
          <div className="relative" ref={tutorialsMenuRef}>
            <button
              onClick={toggleTutorials}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 text-sm sm:text-base font-medium rounded-full transition"
            >
              <i className={`bi ${getIconClass("bi-folder")}`}></i>
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
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                          isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"
                        }`
                      }
                    >
                      <i className={`bi ${getIconClass(item.icon)} text-lg`}></i>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/profile"
            onClick={closeMenus}
            className={({ isActive }) =>
              isActive
                ? "text-sky-400 border-b-2 border-sky-500 pb-1"
                : "text-gray-300 hover:text-sky-400"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            onClick={closeMenus}
            className={({ isActive }) =>
              isActive
                ? "text-sky-400 border-b-2 border-sky-500 pb-1"
                : "text-gray-300 hover:text-sky-400"
            }
          >
            Settings
          </NavLink>
        </div>

        {/* Logout Button - Always Visible */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-1.5 text-sm rounded-md font-semibold shadow-md transition-all duration-300"
          >
            Logout
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-sky-400 text-2xl cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Moved outside the nav to avoid z-index issues */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4 pt-20 space-y-2">
                {/* Close button inside menu */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl p-2 hover:bg-gray-800 rounded-lg transition"
                  aria-label="Close menu"
                >
                  <i className="bi bi-x-lg"></i>
                </button>

                {/* Mobile Dashboard Link */}
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition ${
                      isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"
                    }`
                  }
                >
                  <i className="bi bi-speedometer2 mr-3"></i>
                  Dashboard
                </NavLink>

                {/* Mobile Master Menu */}
                <div className="border-t border-gray-700 pt-2">
                  <button
                    onClick={() => setMobileMasterOpen(!mobileMasterOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                  >
                    <span><i className="bi bi-database mr-3"></i>Master</span>
                    <i className={`bi bi-chevron-down transition-transform ${mobileMasterOpen ? "rotate-180" : ""}`}></i>
                  </button>
                  
                  <AnimatePresence>
                    {mobileMasterOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 mt-1 space-y-1">
                          {masterItems.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                            >
                              {item.label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Tools Menu */}
                <div className="border-t border-gray-700 pt-2">
                  <button
                    onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                  >
                    <span><i className="bi bi-tools mr-3"></i>Tools</span>
                    <i className={`bi bi-chevron-down transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`}></i>
                  </button>
                  
                  <AnimatePresence>
                    {mobileToolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 mt-1 space-y-1">
                          {toolsItems.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                            >
                              {item.label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Tutorials Menu */}
                <div className="border-t border-gray-700 pt-2">
                  <button
                    onClick={() => setMobileTutorialsOpen(!mobileTutorialsOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                  >
                    <span><i className="bi bi-journal-bookmark-fill mr-3"></i>Tutorials</span>
                    <i className={`bi bi-chevron-down transition-transform ${mobileTutorialsOpen ? "rotate-180" : ""}`}></i>
                  </button>
                  
                  <AnimatePresence>
                    {mobileTutorialsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 mt-1 space-y-1 max-h-80 overflow-y-auto">
                          {tutorialsItems.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                            >
                              <i className={`bi ${getIconClass(item.icon)}`}></i>
                              <span>{item.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Profile Link */}
                <div className="border-t border-gray-700 pt-2">
                  <NavLink
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition ${
                        isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`
                    }
                  >
                    <i className="bi bi-person mr-3"></i>
                    Profile
                  </NavLink>
                </div>

                {/* Mobile Settings Link */}
                <div>
                  <NavLink
                    to="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition ${
                        isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`
                    }
                  >
                    <i className="bi bi-gear mr-3"></i>
                    Settings
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthNavBar;