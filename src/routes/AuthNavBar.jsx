import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AuthNavBar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [masterOpen, setMasterOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const toggleMaster = () => {
    setMasterOpen(!masterOpen);
    setToolsOpen(false);
  };

  const toggleTools = () => {
    setToolsOpen(!toolsOpen);
    setMasterOpen(false);
  };

  const closeMenus = () => {
    setMasterOpen(false);
    setToolsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

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

                <NavLink
                  to="/results"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-800 rounded"
                >
                  Results
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