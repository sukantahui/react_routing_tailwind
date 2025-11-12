// src/components/AddStudent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
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

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await studentService.create(form);
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: "Student Added",
          text: "The student has been successfully registered.",
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#f9fafb",
        }).then(() => navigate("/dashboard"));
      } else {
        throw new Error(res.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error saving student:", err);
      let msg = "Failed to add student.";

      // ✅ Handle Laravel validation (custom format)
      if (err.response?.data?.status === false && err.response?.data?.data) {
        const validationErrors = err.response.data.data;
        const allErrors = Object.entries(validationErrors)
          .map(
            ([field, messages]) =>
              `<strong class='text-sky-400'>${field}</strong>: ${messages.join(", ")}`
          )
          .join("<br>");
        msg = `<div style='text-align:left;'>${allErrors}</div>`;

        Swal.fire({
          icon: "error",
          title: "Validation Failed",
          html: msg,
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#f9fafb",
          width: 600,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || err.message || msg,
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#f9fafb",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 pt-24 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-sky-400 mb-8 text-center">
          Add New Student
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* All fields one by one */}
          <Input
            label="Student Name"
            name="student_name"
            value={form.student_name}
            onChange={handleChange}
            required
          />
          <Input
            label="Nickname"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />

          {/* Date of Birth and Blood Group in same line */}
          <div className="flex flex-col md:flex-row md:gap-6">
            <div className="flex-1">
              <Input
                label="Date of Birth"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                type="date"
                required
              />
            </div>
            <div className="flex-1">
              <Select
                label="Blood Group"
                name="blood_group"
                value={form.blood_group}
                onChange={handleChange}
                required
                options={[
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
          </div>

          <Input
            label="Father's Name"
            name="father_name"
            value={form.father_name}
            onChange={handleChange}
          />
          <Input
            label="Mother's Name"
            name="mother_name"
            value={form.mother_name}
            onChange={handleChange}
          />
          <Input
            label="Guardian Name"
            name="guardian_name"
            value={form.guardian_name}
            onChange={handleChange}
          />
          <Select
            label="Guardian Relation"
            name="guardian_relation"
            value={form.guardian_relation}
            onChange={handleChange}
            options={[
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
            value={form.guardian_phone}
            onChange={handleChange}
          />
          <Input
            label="Phone 1"
            name="phone1"
            value={form.phone1}
            onChange={handleChange}
          />
          <Input
            label="Phone 2"
            name="phone2"
            value={form.phone2}
            onChange={handleChange}
          />
          <Input
            label="WhatsApp"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
          />
          <Input
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <Input
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          <Input
            label="PIN Code"
            name="pin"
            value={form.pin}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all"
            >
              {loading ? "Saving..." : "Save Student"}
            </button>
          </div>
        </form>

        {/* 🧑‍💻 Developer Tools (visible only in development) */}
        {import.meta.env.MODE === "development" && (
          <div className="mt-10 p-4 rounded-2xl border border-gray-800 bg-gray-800/60 text-gray-300">
            <h2 className="text-lg font-semibold text-sky-400 mb-2">
              🧑‍💻 Developer Tools
            </h2>
            <p className="text-sm mb-3 text-gray-400">
              Visible only in{" "}
              <span className="text-sky-400 font-semibold">development</span>{" "}
              mode.
            </p>

            <div className="flex flex-wrap gap-2">
              {/* Log form data in console */}
              <button
                type="button"
                onClick={() => {
                  console.log("Form Data:", form);
                  Swal.fire({
                    title: "Form data logged to console",
                    text: "Check your browser console (F12 → Console tab).",
                    icon: "info",
                    confirmButtonColor: "#2563eb",
                    background: "#111827",
                    color: "#f9fafb",
                  });
                }}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Log in Console
              </button>

              {/* Autofill test data */}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    registration_number:
                      "DEV" + Math.floor(Math.random() * 1000),
                    student_name: "Test Student",
                    nickname: "tester" + Math.floor(Math.random() * 100),
                    email: `test${Math.floor(Math.random() * 100)}@example.com`,
                    dob: "2005-05-05",
                    blood_group: "O+",
                    guardian_relation: "Father",
                    guardian_name: "Test Parent",
                    guardian_phone: "9876543210",
                    phone1: "9998887777",
                    phone2: "8887776666",
                    whatsapp: "9999999999",
                    address: "Developer Mode, Test Street",
                    city: "Kolkata",
                    pin: "700001",
                  })
                }
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500"
              >
                Autofill Test Data
              </button>

              {/* ✅ Show JSON for API testing */}
              <button
                type="button"
                onClick={() => {
                  const jsonData = JSON.stringify(form, null, 2);
                  Swal.fire({
                    title: "Form Data (JSON)",
                    html: `
                      <pre style="
                        text-align: left;
                        background: #0f172a;
                        color: #e2e8f0;
                        padding: 10px;
                        border-radius: 10px;
                        font-size: 12px;
                        overflow-x: auto;
                        max-height: 300px;
                      ">${jsonData}</pre>
                    `,
                    width: 600,
                    confirmButtonText: "Copy JSON",
                    showCancelButton: true,
                    cancelButtonText: "Close",
                    confirmButtonColor: "#2563eb",
                    background: "#111827",
                    color: "#f9fafb",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigator.clipboard.writeText(jsonData);
                      Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "Copied to clipboard!",
                        showConfirmButton: false,
                        timer: 1500,
                        background: "#111827",
                        color: "#f9fafb",
                      });
                    }
                  });
                }}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500"
              >
                Show JSON (API Test)
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* 🔹 Input Component */
function Input({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-400 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
}

/* 🔹 Select Component */
function Select({ label, name, value, onChange, options = [], required = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-400 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
