// src/components/Dashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { visitorService } from "../services/visitorService";
import { studentService } from "../services/studentService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load all data
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
        const [visitorsRes, studentsRes] = await Promise.all([
          visitorService.getAll(),
          studentService.getAll(),
        ]);

        if (visitorsRes?.status) setVisitors(visitorsRes.data);
        if (studentsRes?.status) setStudents(studentsRes.data);
      } catch {
        Swal.fire({
          title: "Error",
          text: "Failed to load dashboard data.",
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

  // ✅ Derived visitor stats
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 p-6 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl font-bold text-sky-400">
            Welcome, {user?.employee?.employeeName || user?.userName}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {user?.userType?.userTypeName} Dashboard
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          <StatCard title="Total Visitors" value={stats.total} icon="👥" color="text-sky-400" />
          <StatCard title="Today’s Visitors" value={stats.today} icon="☀️" color="text-emerald-400" />
          <StatCard title="This Month" value={stats.month} icon="🗓️" color="text-purple-400" />
          <StatCard title="Unique Pages" value={stats.uniquePages} icon="🌐" color="text-pink-400" />
          <StatCard title="Total Students" value={students.length} icon="🎓" color="text-amber-400" />
        </motion.div>

        {/* Visitors Section */}
        <DataTable
          title="Recent Visitors"
          color="text-sky-400"
          data={visitors}
          headers={["#", "Name", "Email", "Interest", "Device", "Page URL", "Date"]}
          renderRow={(v, i) => (
            <>
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium text-sky-300">{v.name}</td>
              <td className="p-3">{v.email}</td>
              <td className="p-3">{v.interest}</td>
              <td className="p-3 hidden md:table-cell">{v.device_type}</td>
              <td className="p-3 hidden lg:table-cell truncate max-w-[220px]">{v.page_url}</td>
              <td className="p-3 text-gray-400">{new Date(v.created_at).toLocaleString()}</td>
            </>
          )}
        />

        {/* Students Section */}
        <div className="flex items-center justify-between mb-2 mt-12">
          <h2 className="text-2xl font-semibold text-amber-400">Registered Students</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/students/add")}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl shadow-md transition-all"
          >
            + Add Student
          </motion.button>
        </div>
        <DataTable
          title="Registered Students"
          color="text-amber-400"
          data={students}
          headers={["#", "Reg No", "Name", "Email", "Phone", "City", "Joined"]}
          renderRow={(s, i) => (
            <>
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium text-amber-300">{s.registration_number}</td>
              <td className="p-3">{s.student_name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.phone1}</td>
              <td className="p-3">{s.city}</td>
              <td className="p-3 text-gray-400">{new Date(s.created_at).toLocaleDateString()}</td>
            </>
          )}
        />
      </div>
    </div>
  );
}

/* 📊 Reusable StatCard */
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

/* 📋 Reusable DataTable */
function DataTable({ title, color, data, headers, renderRow }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-6 overflow-x-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-semibold ${color}`}>{title}</h2>
        <span className="text-gray-400 text-sm">Total: {data.length}</span>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No records found.</p>
      ) : (
        <table className="w-full text-sm text-gray-300 border-collapse">
          <thead className="bg-gray-800/80 text-gray-300">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="p-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
              >
                {renderRow(item, index)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
}
