import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AuthNavBar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage")); // keep sync
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 text-gray-100 px-6 py-3 flex justify-between items-center shadow-lg"
    >
      {/* 🔹 Brand */}
      <div
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-sky-400 tracking-wide cursor-pointer hover:text-sky-300 transition"
      >
        Coder<span className="text-purple-400">&</span>AccoTax
      </div>

      {/* 🔹 Navigation Links */}
      <div className="hidden md:flex space-x-6 text-sm font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `transition-all duration-300 ${
                isActive
                  ? "text-sky-400 border-b-2 border-sky-500 pb-1"
                  : "text-gray-300 hover:text-sky-400"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* 🔹 Right Side */}
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

      {/* 🔹 Mobile Menu (Optional Future) */}
      <div className="md:hidden text-sky-400 text-2xl cursor-pointer">
        <i className="bi bi-list"></i>
      </div>
    </motion.nav>
  );
};

export default AuthNavBar;
