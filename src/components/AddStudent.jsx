// src/components/AddStudent.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Heart,
  Shield,
  MapPin,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { studentService } from "../services/studentService";

export default function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    student_name: "",
    nickname: "",
    email: "",
    dob: "",
    blood_group: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    guardian_relation: "",
    guardian_phone: "",
    phone1: "",
    phone2: "",
    whatsapp: "",
    address: "",
    district_id: 1,
    city: "",
    pin: "",
    gender_id: 1,
  });

  const [loading, setLoading] = useState(false);
  const [showSecondaryDetails, setShowSecondaryDetails] = useState(false);

  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form with pre-save confirmation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.student_name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Student Name Required",
        text: "Please enter the student's full name.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!form.whatsapp || form.whatsapp.trim().length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "WhatsApp Number Required",
        text: "Please provide a valid 10-digit WhatsApp number.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    // Clean payload: normalize empty strings to null & auto-fallback nickname
    const cleanPayload = {};
    for (const key in form) {
      const val = form[key];
      if (typeof val === "string") {
        cleanPayload[key] = val.trim() === "" ? null : val.trim();
      } else {
        cleanPayload[key] = val;
      }
    }

    if (!cleanPayload.nickname && cleanPayload.student_name) {
      cleanPayload.nickname = cleanPayload.student_name;
    }

    // Pre-save confirmation dialog
    const confirmResult = await Swal.fire({
      title: "Register New Student?",
      html: `
        <div class="text-left text-xs text-slate-300 space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 mt-2">
          <p><b class="text-slate-400">Student Name:</b> <span class="text-white font-bold">${form.student_name}</span></p>
          <p><b class="text-slate-400">WhatsApp:</b> <span class="text-emerald-400 font-mono font-bold">${form.whatsapp}</span></p>
          ${cleanPayload.email ? `<p><b class="text-slate-400">Email:</b> <span class="text-sky-300">${cleanPayload.email}</span></p>` : ""}
          ${cleanPayload.dob ? `<p><b class="text-slate-400">Date of Birth:</b> <span class="text-slate-300">${cleanPayload.dob}</span></p>` : ""}
          ${cleanPayload.blood_group ? `<p><b class="text-slate-400">Blood Group:</b> <span class="text-rose-400 font-bold">${cleanPayload.blood_group}</span></p>` : ""}
          <p class="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Secondary details (address, parents, blood group) can be updated anytime from the Dashboard!
          </p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Register Student",
      cancelButtonText: "Cancel & Review",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!confirmResult.isConfirmed) return;

    setLoading(true);
    try {
      const res = await studentService.create(cleanPayload);
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: "Student Registered Successfully!",
          text: `${form.student_name} has been added to the system.`,
          confirmButtonColor: "#2563eb",
          background: "#0f172a",
          color: "#f9fafb",
        }).then(() => navigate("/dashboard"));
      } else {
        throw new Error(res.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error saving student:", err);
      let msg = "Failed to add student.";

      if (err.response?.data?.status === false && err.response?.data?.data) {
        const validationErrors = err.response.data.data;
        const allErrors = Object.entries(validationErrors)
          .map(([field, messages]) => `<strong class='text-sky-400'>${field}</strong>: ${messages.join(", ")}`)
          .join("<br>");
        msg = `<div style='text-align:left;'>${allErrors}</div>`;

        Swal.fire({
          icon: "error",
          title: "Validation Failed",
          html: msg,
          confirmButtonColor: "#2563eb",
          background: "#0f172a",
          color: "#f9fafb",
          width: 500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || err.message || msg,
          confirmButtonColor: "#2563eb",
          background: "#0f172a",
          color: "#f9fafb",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 pt-24 p-4 sm:p-6 dark:bg-gray-900 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl shadow-xl p-6 sm:p-8"
      >
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Add Student</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            Minimal Fast Entry
          </span>
        </div>

        <h1 className="text-3xl font-bold text-sky-400 mb-2 text-center flex items-center justify-center gap-2">
          <User className="w-7 h-7" />
          Add New Student
        </h1>
        <p className="text-center text-xs text-slate-400 mb-8">
          Only Name and WhatsApp are required. Secondary details can be filled now or updated later from the Dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: MANDATORY MINIMAL FIELDS */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-bold">1</span>
                Primary Identity (Required)
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Mandatory</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Student Full Name"
                name="student_name"
                placeholder="e.g. Suman Sengupta"
                value={form.student_name}
                onChange={handleChange}
                required
              />

              <Input
                label="WhatsApp / Mobile (10 digits)"
                name="whatsapp"
                placeholder="10-digit phone number"
                type="tel"
                value={form.whatsapp}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* SECTION 2: OPTIONAL SECONDARY DETAILS (ACCORDION / DRAWER) */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSecondaryDetails(!showSecondaryDetails)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center font-bold text-sm">
                  +
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">
                    Optional Profile Details (Email, DOB, Blood Group, Parents)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Skip if you're in a hurry — you can complete these later anytime!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-sky-400">
                  {showSecondaryDetails ? "Collapse" : "Add Details"}
                </span>
                {showSecondaryDetails ? (
                  <ChevronUp className="w-4 h-4 text-sky-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {showSecondaryDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 border-t border-slate-800 space-y-4 bg-slate-950/80"
                >
                  {/* Nickname and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nickname (Optional)"
                      name="nickname"
                      placeholder="Defaults to Full Name if empty"
                      value={form.nickname}
                      onChange={handleChange}
                    />

                    <Input
                      label="Email Address (Optional)"
                      name="email"
                      placeholder="e.g. student@example.com"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                    />
                  </div>

                  {/* DOB and Blood Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Date of Birth (Optional)"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      type="date"
                    />

                    <Select
                      label="Blood Group (Optional)"
                      name="blood_group"
                      value={form.blood_group}
                      onChange={handleChange}
                      options={[
                        { label: "-- Not Available / Unknown --", value: "" },
                        { label: "A+", value: "A+" },
                        { label: "A−", value: "A−" },
                        { label: "B+", value: "B+" },
                        { label: "B−", value: "B−" },
                        { label: "AB+", value: "AB+" },
                        { label: "AB−", value: "AB−" },
                        { label: "O+", value: "O+" },
                        { label: "O−", value: "O−" },
                      ]}
                    />
                  </div>

                  {/* Parents & Guardians */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Father's Name"
                      name="father_name"
                      placeholder="Father's full name"
                      value={form.father_name}
                      onChange={handleChange}
                    />
                    <Input
                      label="Mother's Name"
                      name="mother_name"
                      placeholder="Mother's full name"
                      value={form.mother_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Guardian Name"
                      name="guardian_name"
                      placeholder="Guardian name"
                      value={form.guardian_name}
                      onChange={handleChange}
                    />
                    <Select
                      label="Guardian Relation"
                      name="guardian_relation"
                      value={form.guardian_relation}
                      onChange={handleChange}
                      options={[
                        { label: "-- Select Relation --", value: "" },
                        { label: "Father", value: "Father" },
                        { label: "Mother", value: "Mother" },
                        { label: "Brother", value: "Brother" },
                        { label: "Sister", value: "Sister" },
                        { label: "Uncle", value: "Uncle" },
                        { label: "Aunt", value: "Aunt" },
                        { label: "Grandfather", value: "Grandfather" },
                        { label: "Grandmother", value: "Grandmother" },
                        { label: "Other", value: "Other" },
                      ]}
                    />
                    <Input
                      label="Guardian Phone"
                      name="guardian_phone"
                      placeholder="Guardian contact"
                      value={form.guardian_phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Additional Contact Numbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Alternative Phone 1"
                      name="phone1"
                      placeholder="Alternative mobile 1"
                      value={form.phone1}
                      onChange={handleChange}
                    />
                    <Input
                      label="Alternative Phone 2"
                      name="phone2"
                      placeholder="Alternative mobile 2"
                      value={form.phone2}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Address, City, PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <Input
                        label="Residential Address"
                        name="address"
                        placeholder="House / Street / Locality"
                        value={form.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Input
                        label="City / Town"
                        name="city"
                        placeholder="e.g. Kolkata"
                        value={form.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="PIN Code"
                      name="pin"
                      placeholder="e.g. 700001"
                      value={form.pin}
                      onChange={handleChange}
                    />

                    <Select
                      label="Gender"
                      name="gender_id"
                      value={form.gender_id}
                      onChange={handleChange}
                      options={[
                        { label: "Male", value: 1 },
                        { label: "Female", value: 2 },
                        { label: "Other", value: 3 },
                      ]}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer text-xs sm:text-sm font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold transition shadow-lg shadow-sky-500/20 disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Saving Student...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Student</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Developer Tools (visible only in development) */}
        {import.meta.env.MODE === "development" && (
          <div className="mt-8 p-4 rounded-2xl border border-gray-800 bg-gray-800/40 text-gray-300">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
              🛠️ Developer Quick Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    ...form,
                    student_name: "Test Student",
                    whatsapp: "9876543210",
                    nickname: "Tester",
                    email: `test${Math.floor(Math.random() * 100)}@example.com`,
                    city: "Kolkata",
                    pin: "700001",
                  });
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white cursor-pointer"
              >
                Autofill Quick Test Data
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Form Helper Components
function Input({ label, name, value, onChange, type = "text", required = false, placeholder = "" }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-gray-300 mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="bg-gray-950 text-gray-100 border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-500"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options = [], required = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-gray-300 mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-gray-950 text-gray-100 border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}