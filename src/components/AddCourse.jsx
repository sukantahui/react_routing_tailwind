// ============================================================================
// AddCourse.jsx - Course Catalog, Pricing & Curriculum Management Console
// ============================================================================

import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  PlusCircle,
  Trash2,
  List,
  Eye,
  Edit3,
  Search,
  Calendar,
  IndianRupee,
  TrendingUp,
  Clock,
  Layers,
  CheckCircle2,
  X,
  Filter,
} from "lucide-react";

import { courseService } from "../services/courseService";

const emptyForm = {
  courseCode: "",
  courseName: "",
  feeModesId: 1,
  courseFees: 12000,
  feesValidUpTo: "2026-12-31",
  upcomingFees: 15000,
  topics: [
    {
      topicTitle: "",
      topicDescription: "",
      theoryDuration: 2.0,
      practicalDuration: 1.0,
      sequence: 1,
    },
  ],
};

export default function AddCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Search, Filter & Sort
  const [searchTerm, setSearchTerm] = useState("");
  const [feeFilter, setFeeFilter] = useState("ALL"); // ALL, UNDER_10K, 10K_25K, ABOVE_25K

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("CREATE"); // "CREATE" or "MODIFY"
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  // Syllabus Viewer Modal
  const [viewingCourse, setViewingCourse] = useState(null);

  const getSwalTheme = () => ({
    background: "#0f172a",
    color: "#f8fafc",
    confirmButtonColor: "#0284c7",
    cancelButtonColor: "#475569",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await courseService.getAllWithDetails();
      let data = [];
      if (res?.status === true && Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res?.data)) {
        data = res.data;
      } else if (Array.isArray(res)) {
        data = res;
      }
      setCourses(data);
    } catch (err) {
      console.error("Error loading courses:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Courses",
        text: "Could not fetch course catalog from server.",
        ...getSwalTheme(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Open modal in CREATE mode
  const openCreateModal = () => {
    setModalMode("CREATE");
    setEditingCourseId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  // Open modal in MODIFY mode with pre-filled course details
  const openModifyModal = (course) => {
    setModalMode("MODIFY");
    setEditingCourseId(course.id || course.courseId);

    const mappedTopics =
      Array.isArray(course.details) && course.details.length > 0
        ? course.details.map((t, idx) => ({
            topicTitle: t.topicTitle || t.topic_title || "",
            topicDescription: t.topicDescription || t.topic_description || "",
            theoryDuration: Number(t.theoryDuration || t.theory_duration || 0),
            practicalDuration: Number(t.practicalDuration || t.practical_duration || 0),
            sequence: t.sequence || idx + 1,
          }))
        : [
            {
              topicTitle: "",
              topicDescription: "",
              theoryDuration: 2.0,
              practicalDuration: 1.0,
              sequence: 1,
            },
          ];

    setFormData({
      courseCode: course.courseCode || course.course_code || "",
      courseName: course.courseName || course.course_name || "",
      feeModesId: Number(course.feeModesId || course.fee_modes_id || 1),
      courseFees: Number(course.courseFees || course.course_fees || 0),
      feesValidUpTo: course.feesValidUpTo || course.fees_valid_up_to || "2026-12-31",
      upcomingFees: course.upcomingFees || course.upcoming_fees || "",
      topics: mappedTopics,
    });

    setIsModalOpen(true);
  };

  // Form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "courseFees" || name === "upcomingFees"
          ? value === "" ? "" : Number(value)
          : value,
    }));
  };

  // Topic changes
  const handleTopicChange = (index, field, value) => {
    const updated = [...formData.topics];
    updated[index][field] = field.includes("Duration") ? Number(value) || 0 : value;
    setFormData((prev) => ({ ...prev, topics: updated }));
  };

  const addTopic = () => {
    setFormData((prev) => ({
      ...prev,
      topics: [
        ...prev.topics,
        {
          topicTitle: "",
          topicDescription: "",
          theoryDuration: 2.0,
          practicalDuration: 1.0,
          sequence: prev.topics.length + 1,
        },
      ],
    }));
  };

  const removeTopic = (index) => {
    if (formData.topics.length <= 1) return;
    const updated = formData.topics
      .filter((_, i) => i !== index)
      .map((t, i) => ({ ...t, sequence: i + 1 }));
    setFormData((prev) => ({ ...prev, topics: updated }));
  };

  // Handle Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseCode.trim() || !formData.courseName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Please provide both Course Code and Course Name.",
        ...getSwalTheme(),
      });
      return;
    }

    const payload = {
      course_code: formData.courseCode.trim().toUpperCase(),
      course_name: formData.courseName.trim(),
      fee_modes_id: Number(formData.feeModesId || 1),
      course_fees: Number(formData.courseFees) || 0,
      fees_valid_up_to: formData.feesValidUpTo || null,
      upcoming_fees: formData.upcomingFees ? Number(formData.upcomingFees) : null,
      topics: formData.topics
        .filter((t) => t.topicTitle.trim() !== "")
        .map((t, idx) => ({
          topic_title: t.topicTitle.trim(),
          topic_description: t.topicDescription?.trim() || null,
          theory_duration: Number(t.theoryDuration) || 0,
          practical_duration: Number(t.practicalDuration) || 0,
          sequence: idx + 1,
        })),
    };

    setSaving(true);
    try {
      if (modalMode === "CREATE") {
        await courseService.create(payload);
        Swal.fire({
          icon: "success",
          title: "Course Created!",
          text: `Course ${payload.course_code} has been added successfully.`,
          ...getSwalTheme(),
        });
      } else {
        await courseService.update(editingCourseId, payload);
        Swal.fire({
          icon: "success",
          title: "Course Modified!",
          text: `Course ${payload.course_code} updated successfully.`,
          ...getSwalTheme(),
        });
      }

      setIsModalOpen(false);
      loadCourses();
    } catch (err) {
      console.error("Save course error:", err);
      let msg = "Failed to save course changes.";
      if (err.response?.data?.message) {
        msg = err.response.data.message;
      }
      if (err.response?.data?.errors) {
        msg = Object.values(err.response.data.errors).flat().join("<br>");
      }

      Swal.fire({
        icon: "error",
        title: "Error Saving Course",
        html: `<div class="text-left text-xs text-rose-300">${msg}</div>`,
        ...getSwalTheme(),
      });
    } finally {
      setSaving(false);
    }
  };

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const code = (c.courseCode || c.course_code || "").toLowerCase();
      const name = (c.courseName || c.course_name || "").toLowerCase();
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = !query || code.includes(query) || name.includes(query);

      const fee = Number(c.courseFees || c.course_fees || 0);
      let matchesFee = true;
      if (feeFilter === "UNDER_10K") matchesFee = fee < 10000;
      else if (feeFilter === "10K_25K") matchesFee = fee >= 10000 && fee <= 25000;
      else if (feeFilter === "ABOVE_25K") matchesFee = fee > 25000;

      return matchesSearch && matchesFee;
    });
  }, [courses, searchTerm, feeFilter]);

  // Catalog metrics
  const metrics = useMemo(() => {
    const total = courses.length;
    const fees = courses.map((c) => Number(c.courseFees || c.course_fees || 0)).filter((f) => f > 0);
    const avgFee = fees.length > 0 ? Math.round(fees.reduce((a, b) => a + b, 0) / fees.length) : 0;
    const activeOffers = courses.filter((c) => c.feesValidUpTo || c.fees_valid_up_to).length;
    const totalTopics = courses.reduce(
      (acc, c) => acc + (Array.isArray(c.details) ? c.details.length : 0),
      0
    );

    return { total, avgFee, activeOffers, totalTopics };
  }, [courses]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Background ambient glows */}
      <div className="fixed w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[160px] -top-32 -left-20 pointer-events-none" />
      <div className="fixed w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] top-1/2 -right-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Navigation & Header */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <span>/</span>
              <span className="text-slate-400">Academics</span>
              <span>/</span>
              <span className="text-sky-400 font-semibold">Courses &amp; Pricing</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>COURSE CATALOG &amp; PRICING GOVERNANCE</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Course Curriculum &amp; Pricing Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Create new courses, edit course codes &amp; titles, set course catalog fees, configure price validity dates, and manage topics.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={openCreateModal}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-sky-500/20 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Courses</p>
              <p className="text-xl sm:text-2xl font-black text-white">{metrics.total}</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Average Fee</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-400">
                ₹{metrics.avgFee.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Valid Offer Courses</p>
              <p className="text-xl sm:text-2xl font-black text-amber-300">{metrics.activeOffers}</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Syllabus Topics</p>
              <p className="text-xl sm:text-2xl font-black text-purple-300">{metrics.totalTopics}</p>
            </div>
          </div>
        </div>

        {/* Search, Filter & Quick Toolbar */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search course name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Fee Filter:
            </span>
            {[
              { id: "ALL", label: "All Fees" },
              { id: "UNDER_10K", label: "< ₹10k" },
              { id: "10K_25K", label: "₹10k - ₹25k" },
              { id: "ABOVE_25K", label: "> ₹25k" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFeeFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  feeFilter === f.id
                    ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                    : "bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Table & Directory */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <svg className="animate-spin h-8 w-8 text-sky-400 mx-auto mb-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm">Loading course curriculum and pricing catalog...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <BookOpen className="w-12 h-12 mx-auto text-slate-600" />
              <p className="text-sm font-semibold">No courses match your filter criteria.</p>
              <button
                onClick={() => { setSearchTerm(""); setFeeFilter("ALL"); }}
                className="text-xs text-sky-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4">Code</th>
                    <th className="py-3.5 px-4">Course Name</th>
                    <th className="py-3.5 px-4">Fee &amp; Mode</th>
                    <th className="py-3.5 px-4">Price Validity</th>
                    <th className="py-3.5 px-4">Post-Hike Fee</th>
                    <th className="py-3.5 px-4">Syllabus</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                  {filteredCourses.map((c) => {
                    const fee = Number(c.courseFees || c.course_fees || 0);
                    const validDate = c.feesValidUpTo || c.fees_valid_up_to;
                    const upcoming = Number(c.upcomingFees || c.upcoming_fees || 0);
                    const topicCount = Array.isArray(c.details) ? c.details.length : 0;

                    return (
                      <tr
                        key={c.id || c.courseId}
                        className="hover:bg-slate-800/40 transition group"
                      >
                        {/* Course Code */}
                        <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                          <span className="px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20">
                            {c.courseCode || c.course_code}
                          </span>
                        </td>

                        {/* Course Name */}
                        <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">
                          {c.courseName || c.course_name}
                        </td>

                        {/* Course Fee & Mode */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            {fee > 0 ? (
                              <span className="font-extrabold text-emerald-400 text-sm">
                                ₹{fee.toLocaleString()}
                              </span>
                            ) : (
                              <span className="text-slate-500 italic">Not set</span>
                            )}
                            <span className="inline-block mt-0.5 text-[10px] text-purple-300 font-semibold">
                              {c.feeMode || (Number(c.fee_modes_id) === 2 ? "Course Fees" : "Monthly")}
                            </span>
                          </div>
                        </td>

                        {/* Validity Date */}
                        <td className="py-3.5 px-4">
                          {validDate ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              <Calendar className="w-3 h-3 text-amber-400" />
                              <span>{validDate}</span>
                            </span>
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </td>

                        {/* Upcoming Fee */}
                        <td className="py-3.5 px-4">
                          {upcoming > 0 ? (
                            <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                              <TrendingUp className="w-3 h-3 text-rose-400" />
                              <span>₹{upcoming.toLocaleString()}</span>
                            </span>
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </td>

                        {/* Syllabus Topics Count */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => setViewingCourse(c)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                          >
                            <Layers className="w-3 h-3 text-indigo-400" />
                            <span>{topicCount} Topics</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => openModifyModal(c)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 border border-sky-500/30 transition cursor-pointer"
                            title="Modify course code, name, fees, and syllabus"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Modify</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD / MODIFY COURSE                                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-6"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-1">
                    {modalMode === "CREATE" ? "NEW CURRICULUM ENTRY" : "UPDATE CATALOG ITEM"}
                  </div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {modalMode === "CREATE" ? (
                      <>
                        <PlusCircle className="w-5 h-5 text-sky-400" />
                        <span>Add New Course</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-5 h-5 text-purple-400" />
                        <span>Modify Course: {formData.courseCode}</span>
                      </>
                    )}
                  </h2>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* SECTION 1: CORE COURSE DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Course Code <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="courseCode"
                      placeholder="e.g. PY_ADV"
                      value={formData.courseCode}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-white uppercase focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Course Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      placeholder="e.g. Advanced Python, Fast API & Microservices"
                      value={formData.courseName}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* SECTION 2: PRICING & ONLINE VALIDITY GOVERNANCE */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-purple-500/10 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4" />
                      <span>Online Course Fees &amp; Price Urgency Governance</span>
                    </h3>
                    <span className="text-[11px] text-slate-400">Live Website Pricing</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {/* Course Fees */}
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Catalog Fee (₹) <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-xs">₹</span>
                        <input
                          type="number"
                          name="courseFees"
                          min="0"
                          step="any"
                          placeholder="12000"
                          value={formData.courseFees}
                          onChange={handleFormChange}
                          required
                          className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl pl-7 pr-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Fee Mode */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Fee Mode (Strict) <span className="text-rose-400">*</span>
                      </label>
                      <select
                        name="feeModesId"
                        value={formData.feeModesId}
                        onChange={handleFormChange}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value={1}>Monthly (Default)</option>
                        <option value={2}>Course Fees (Lump sum)</option>
                      </select>
                    </div>

                    {/* Fees Valid Up To */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Fees Valid Until</span>
                      </label>
                      <input
                        type="date"
                        name="feesValidUpTo"
                        value={formData.feesValidUpTo}
                        onChange={handleFormChange}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    {/* Upcoming Fees (Post-Hike) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                        <span>Price After Validity (₹)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400 font-bold text-xs">₹</span>
                        <input
                          type="number"
                          name="upcomingFees"
                          min="0"
                          step="any"
                          placeholder="15000"
                          value={formData.upcomingFees}
                          onChange={handleFormChange}
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-7 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fee Presets */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">Quick Fee Presets:</span>
                    {[8000, 12000, 18000, 25000, 35000, 45000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            courseFees: amt,
                            upcomingFees: Math.round(amt * 1.2),
                          }))
                        }
                        className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer"
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Live Online Preview Callout */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-bold">Online Student View:</span>
                      <span className="text-white font-bold text-sm">
                        ₹{Number(formData.courseFees || 0).toLocaleString()}
                      </span>
                      {formData.feesValidUpTo && (
                        <span className="text-amber-300 ml-2 text-[11px]">
                          (Offer valid till: {formData.feesValidUpTo})
                        </span>
                      )}
                    </div>

                    {formData.upcomingFees && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Next Batch Fee:</span>
                        <span className="text-rose-400 line-through text-xs font-semibold">
                          ₹{Number(formData.upcomingFees).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SECTION 3: TOPICS / SYLLABUS BUILDER */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      <span>Curriculum Topics &amp; Durations ({formData.topics.length})</span>
                    </h3>

                    <button
                      type="button"
                      onClick={addTopic}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 transition cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add Topic</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {/* Dedicated Topic Headers Bar */}
                    <div className="hidden sm:grid sm:grid-cols-4 gap-3 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/80 rounded-lg border border-slate-800/80">
                      <div className="sm:col-span-2 flex items-center gap-1">
                        <span>Topic Title / Syllabus Module</span>
                        <span className="text-rose-400">*</span>
                      </div>
                      <div className="text-center">Theory (hrs)</div>
                      <div className="text-center">Practical (hrs)</div>
                    </div>

                    {formData.topics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-sky-400">
                            Topic #{idx + 1}
                          </span>

                          {formData.topics.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTopic(idx)}
                              className="text-slate-500 hover:text-rose-400 transition cursor-pointer flex items-center gap-1 text-[11px]"
                              title="Delete Topic"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                          {/* Topic Title */}
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                              Topic Title <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Database Architecture & SQL"
                              value={topic.topicTitle}
                              onChange={(e) => handleTopicChange(idx, "topicTitle", e.target.value)}
                              required
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          {/* Theory Duration */}
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-300 mb-1 text-left sm:text-center">
                              Theory (hrs)
                            </label>
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              placeholder="Theory (hrs)"
                              value={topic.theoryDuration}
                              onChange={(e) => handleTopicChange(idx, "theoryDuration", e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-left sm:text-center"
                            />
                          </div>

                          {/* Practical Duration */}
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-300 mb-1 text-left sm:text-center">
                              Practical (hrs)
                            </label>
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              placeholder="Practical (hrs)"
                              value={topic.practicalDuration}
                              onChange={(e) => handleTopicChange(idx, "practicalDuration", e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-left sm:text-center"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-xl shadow-sky-500/25 transition cursor-pointer disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{modalMode === "CREATE" ? "Save Course" : "Update Course"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL: SYLLABUS TOPICS VIEWER                                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {viewingCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                <div>
                  <span className="font-mono text-sky-400 font-bold text-xs">
                    {viewingCourse.courseCode || viewingCourse.course_code}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {viewingCourse.courseName || viewingCourse.course_name}
                  </h3>
                </div>

                <button
                  onClick={() => setViewingCourse(null)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {Array.isArray(viewingCourse.details) && viewingCourse.details.length > 0 ? (
                  viewingCourse.details.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white">
                          #{idx + 1}. {t.topicTitle || t.topic_title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                          <span>Th: {t.theoryDuration || t.theory_duration || 0}h</span>
                          <span>•</span>
                          <span>Pr: {t.practicalDuration || t.practical_duration || 0}h</span>
                        </div>
                      </div>
                      {(t.topicDescription || t.topic_description) && (
                        <p className="text-slate-400 text-[11px]">
                          {t.topicDescription || t.topic_description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-500 text-xs py-8">
                    No curriculum topics defined for this course.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}