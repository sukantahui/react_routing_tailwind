// src/components/Dashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { visitorService } from "../services/visitorService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load user and visitors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
          Swal.fire({
            title: "Session Expired",
            text: "Please log in again.",
            icon: "warning",
            confirmButtonColor: "#2563eb",
            background: "#111827",
            color: "#f9fafb",
          }).then(() => navigate("/login"));
          return;
        }

        setUser(storedUser);
        const res = await visitorService.getAll();
        if (res?.status) setVisitors(res.data);
      } catch {
        Swal.fire({
          title: "Error",
          text: "Failed to load visitors data.",
          icon: "error",
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#f9fafb",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  // ✅ Derived stats
  const stats = useMemo(() => {
    const total = visitors.length;
    const today = visitors.filter((v) => {
      const date = new Date(v.created_at);
      const now = new Date();
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;

    const month = visitors.filter((v) => {
      const date = new Date(v.created_at);
      const now = new Date();
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;

    const uniquePages = new Set(visitors.map((v) => v.page_url)).size;

    return { total, today, month, uniquePages };
  }, [visitors]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        Fetching Dashboard Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-sky-400">
              Welcome, {user?.employee?.employeeName || user?.userName}
            </h1>
            <p className="text-gray-400">
              {user?.userType?.userTypeName} Dashboard
            </p>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300"
          >
            Logout
          </motion.button>
        </motion.div>

        {/* ✅ Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard title="Total Visitors" value={stats.total} icon="👥" color="text-sky-400" />
          <StatCard title="Today’s Visitors" value={stats.today} icon="☀️" color="text-emerald-400" />
          <StatCard title="This Month" value={stats.month} icon="🗓️" color="text-purple-400" />
          <StatCard title="Unique Pages" value={stats.uniquePages} icon="🌐" color="text-pink-400" />
        </motion.div>

        {/* ✅ Visitors Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-6 overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-sky-400">
              Recent Visitors
            </h2>
            <span className="text-gray-400 text-sm">
              Showing {visitors.length} records
            </span>
          </div>

          {visitors.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              No visitors found.
            </p>
          ) : (
            <table className="w-full text-sm text-gray-300 border-collapse">
              <thead className="bg-gray-800/80 text-sky-400">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Interest</th>
                  <th className="p-3 text-left hidden md:table-cell">
                    Device
                  </th>
                  <th className="p-3 text-left hidden lg:table-cell">
                    Page URL
                  </th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v, index) => (
                  <tr
                    key={v.id}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium text-sky-300">{v.name}</td>
                    <td className="p-3">{v.email}</td>
                    <td className="p-3">{v.interest}</td>
                    <td className="p-3 hidden md:table-cell">{v.device_type}</td>
                    <td className="p-3 hidden lg:table-cell truncate max-w-[220px]">
                      {v.page_url}
                    </td>
                    <td className="p-3 text-gray-400">
                      {new Date(v.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ✅ Reusable StatCard Component
function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900/70 border border-gray-800 rounded-2xl shadow-lg p-5 flex items-center justify-between"
    >
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <div className="text-4xl opacity-70">{icon}</div>
    </motion.div>
  );
}
