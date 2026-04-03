import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AuthNavBar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [masterOpen, setMasterOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [tutorialsOpen, setTutorialsOpen] = useState(false);

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
  };

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
      "bi-filetype-js": true, // for React
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
    { to: "/isc-12/roadmap", key: "isc-11", label: "ISC 12 Com. Sc.", icon: "bi-journal-richtext" },
    { to: "/computer-architecture/roadmap", key: "computer-architecture", label: "Computer Architecture", icon: "bi-motherboard" },
    { to: "/unix/roadmap", key: "unix", label: "UNIX", icon: "bi-terminal" },
    { to: "/react/roadmap", key: "react", label: "React", icon: "bi-filetype-js" },   // ✅ updated to valid icon
    { to: "/network/roadmap", key: "network", label: "Network", icon: "bi-diagram-3" },
    ...(isDev ? [{ to: "/node/roadmap", key: "node", label: "Node.js", icon: "bi-node" }] : []),
    { to: "/java-web/roadmap", key: "java-web", label: "Java Web", icon: "bi-globe" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 text-gray-100 px-6 py-3 flex justify-between items-center shadow-lg"
    >
      {/* Brand */}
      <div
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-sky-400 tracking-wide cursor-pointer hover:text-sky-300 transition"
      >
        Coder<span className="text-purple-400">&</span>AccoTax
      </div>

      {/* Navigation */}
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

        {/* ================= MASTER MENU ================= */}
        <div className="relative">
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
                <NavLink
                  to="/students/add"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Students
                </NavLink>
                <NavLink
                  to="/courses"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Courses
                </NavLink>
                <NavLink
                  to="/admission"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Admission
                </NavLink>
                <NavLink
                  to="/results"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Result
                </NavLink>
                <NavLink
                  to="/teachers"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Teachers
                </NavLink>
                <NavLink
                  to="/certificates"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Certificates
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= TOOLS MENU ================= */}
        <div className="relative">
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
                <NavLink
                  to="/tools/type-test"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Typing Test
                </NavLink>
                <NavLink
                  to="/tools/typing-learn"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Typing Learn
                </NavLink>
                <NavLink
                  to="/python-play"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Python Editor
                </NavLink>
                <NavLink
                  to="/play"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  JavaScript Editor
                </NavLink>
                <NavLink
                  to="/icons"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Icons
                </NavLink>
                <NavLink
                  to="/whiteBoard"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Whiteboard
                </NavLink>
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
                    onClick={toggleTutorials}
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

      {/* Logout */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 px-4 py-1.5 text-sm rounded-md font-semibold shadow-md transition-all duration-300"
        >
          Logout
        </motion.button>
      </div>

      {/* Mobile icon */}
      <div className="md:hidden text-sky-400 text-2xl cursor-pointer">
        <i className="bi bi-list"></i>
      </div>
    </motion.nav>
  );
};

export default AuthNavBar;