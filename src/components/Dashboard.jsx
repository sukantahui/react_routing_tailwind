// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Load user safely
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log(storedUser);
      if (!storedUser) {
        Swal.fire({
          title: "Session Expired",
          text: "Please log in again.",
          icon: "warning",
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#f9fafb",
        }).then(() => navigate("/login"));
      } else {
        setUser(storedUser);
      }
    } catch {
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({
      title: "Logged Out",
      text: "You have been logged out successfully.",
      icon: "info",
      confirmButtonColor: "#2563eb",
      background: "#111827",
      color: "#f9fafb",
    }).then(() => navigate("/login"));
  };

  // ✅ Loading fallback
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        Loading Dashboard...
      </div>
    );

  // ✅ Main dashboard view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 text-center max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-sky-400 mb-4">
          Welcome, {user?.employee?.employeeName || user?.userName}
        </h1>

        <p className="text-gray-400 mb-2">
          <span className="text-purple-400 font-medium">
            {user?.userType?.userTypeName}
          </span>{" "}
          Dashboard
        </p>

        <p className="text-gray-400 text-sm mb-6">
          Email:{" "}
          <span className="text-sky-400">
            {user?.employee?.email || "N/A"}
          </span>
          <br />
          Mobile:{" "}
          <span className="text-sky-400">
            {user?.employee?.mobile || "N/A"}
          </span>
        </p>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300"
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
