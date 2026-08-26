import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { admissionService } from "../../services/admissionService";
import { courseService } from "../../services/courseService";

export default function StudentWithAdmission() {
  const navigate = useNavigate();

  // 🔹 State for courses dropdown
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Student Form State
  const [studentForm, setStudentForm] = useState({
    studentName: "",
    nickname: "",
    email: "",
    dob: "",
    bloodGroup: "A+",
    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianRelation: "Father",
    guardianPhone: "",
    phone1: "",
    phone2: "",
    whatsapp: "",
    address: "",
    districtId: 3,
    city: "Kolkata",
    pin: "700000",
    genderId: 2,
  });

  // 🔹 Admission Form State
  const [admissionForm, setAdmissionForm] = useState({
    courseId: "",
    feeModesId: 1,
    courseStatusId: 1,
    courseFees: "",
    admissionDate: new Date().toISOString().split("T")[0],
    completionDate: "",
  });

  // Helper for SweetAlert2 dark theme matching project standard
  const getSwalTheme = () => ({
    background: "#111827",
    color: "#f9fafb",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    didOpen: (popup) => {
      popup.style.border = "1px solid #374151";
    },
  });

  useEffect(() => {
    document.body.classList.add("dark");
    loadCourses();
  }, []);

  // 🔹 Fetch courses list
  const loadCourses = async () => {
    setLoadingCourses(true);
    try {
      const response = await courseService.getAll();
      let coursesData = [];
      if (response && response.status === true && Array.isArray(response.data)) {
        coursesData = response.data;
      } else if (Array.isArray(response)) {
        coursesData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        coursesData = response.data;
      }
      setCourses(coursesData);
    } catch (err) {
      console.error("Error loading courses:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load courses. Please try again.",
        ...getSwalTheme(),
      });
    } finally {
      setLoadingCourses(false);
    }
  };

  // 🔹 Handle Student Input Changes
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prev) => ({
      ...prev,
      [name]:
        name === "districtId" || name === "genderId"
          ? Number(value) || ""
          : value,
    }));
  };

  // 🔹 Handle Admission Input Changes
  const handleAdmissionChange = (e) => {
    const { name, value } = e.target;
    setAdmissionForm((prev) => {
      const updated = {
        ...prev,
        [name]:
          name === "courseId" || name === "feeModesId" || name === "courseStatusId"
            ? Number(value) || ""
            : name === "courseFees"
            ? value === "" ? "" : Number(value)
            : value,
      };

      // Auto-populate course fees and completion date when course changes
      if (name === "courseId" && value) {
        const selected = courses.find((c) => String(c.id || c.courseId) === String(value));
        if (selected) {
          if (selected.courseFees || selected.fees || selected.totalFees) {
            updated.courseFees = Number(selected.courseFees || selected.fees || selected.totalFees);
          }
          // If completion date is not yet set, default to 1 year ahead of admission date
          if (!updated.completionDate && updated.admissionDate) {
            const admDate = new Date(updated.admissionDate);
            admDate.setFullYear(admDate.getFullYear() + 1);
            admDate.setDate(admDate.getDate() - 1);
            updated.completionDate = admDate.toISOString().split("T")[0];
          }
        }
      }

      return updated;
    });
  };

  // 🔹 Construct the Complete API Payload
  const getPayload = () => ({
    student: {
      studentName: studentForm.studentName.trim(),
      nickname: studentForm.nickname.trim(),
      email: studentForm.email.trim(),
      dob: studentForm.dob,
      bloodGroup: studentForm.bloodGroup,
      fatherName: studentForm.fatherName.trim(),
      motherName: studentForm.motherName.trim(),
      guardianName: studentForm.guardianName.trim(),
      guardianRelation: studentForm.guardianRelation,
      guardianPhone: studentForm.guardianPhone.trim(),
      phone1: studentForm.phone1.trim(),
      phone2: studentForm.phone2.trim(),
      whatsapp: studentForm.whatsapp.trim(),
      address: studentForm.address.trim(),
      districtId: Number(studentForm.districtId) || 1,
      city: studentForm.city.trim(),
      pin: studentForm.pin.trim(),
      genderId: Number(studentForm.genderId) || 1,
    },
    admission: {
      courseId: Number(admissionForm.courseId),
      feeModesId: Number(admissionForm.feeModesId) || 1,
      courseStatusId: Number(admissionForm.courseStatusId) || 1,
      courseFees: Number(admissionForm.courseFees) || 0,
      admissionDate: admissionForm.admissionDate,
      completionDate: admissionForm.completionDate,
    },
  });

  // 🔹 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admissionForm.courseId) {
      Swal.fire({
        icon: "warning",
        title: "Course Required",
        text: "Please select a course for admission.",
        ...getSwalTheme(),
      });
      return;
    }

    const payload = getPayload();
    setLoading(true);

    try {
      const res = await admissionService.createAdmissionWithStudent(payload);

      if (res && (res.status === true || res.status === "success" || res.data || res.admissionId)) {
        Swal.fire({
          icon: "success",
          title: "Student & Admission Registered!",
          text: res.message || "The student and course admission have been successfully registered.",
          confirmButtonColor: "#2563eb",
          ...getSwalTheme(),
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        throw new Error(res?.message || "Failed to save student with admission.");
      }
    } catch (err) {
      console.error("Error saving student with admission:", err);
      let msg = "Failed to add student and admission.";

      // Handle backend / Laravel validation errors
      if (err.response?.data?.status === false && err.response?.data?.data) {
        const validationErrors = err.response.data.data;
        const allErrors = Object.entries(validationErrors)
          .map(
            ([field, messages]) =>
              `<strong class='text-sky-400'>${field}</strong>: ${
                Array.isArray(messages) ? messages.join(", ") : messages
              }`
          )
          .join("<br>");
        msg = `<div style='text-align:left;'>${allErrors}</div>`;

        Swal.fire({
          icon: "error",
          title: "Validation Failed",
          html: msg,
          width: 600,
          ...getSwalTheme(),
        });
      } else if (err.response?.data?.errors) {
        const validationErrors = err.response.data.errors;
        const allErrors = Object.entries(validationErrors)
          .map(
            ([field, messages]) =>
              `<strong class='text-sky-400'>${field}</strong>: ${
                Array.isArray(messages) ? messages.join(", ") : messages
              }`
          )
          .join("<br>");
        msg = `<div style='text-align:left;'>${allErrors}</div>`;

        Swal.fire({
          icon: "error",
          title: "Validation Failed",
          html: msg,
          width: 600,
          ...getSwalTheme(),
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || err.message || msg,
          ...getSwalTheme(),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 pt-24 p-6 dark:bg-gray-900 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl shadow-xl p-6 md:p-8"
      >
        <h1 className="text-3xl font-bold text-sky-400 mb-2 text-center">
          New Student Admission
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          Register a new student profile and assign course admission simultaneously
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================= 1. STUDENT PERSONAL DETAILS ================= */}
          <div className="border-b border-gray-800 pb-6">
            <h2 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
              <span>👤</span> Student Personal Information
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Student Name"
                  name="studentName"
                  value={studentForm.studentName}
                  onChange={handleStudentChange}
                  placeholder="e.g. Ananya Mukherjee"
                  required
                />
                <Input
                  label="Nickname"
                  name="nickname"
                  value={studentForm.nickname}
                  onChange={handleStudentChange}
                  placeholder="e.g. ananya05"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={studentForm.email}
                  onChange={handleStudentChange}
                  placeholder="e.g. ananya@example.com"
                  required
                />
                <Input
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={studentForm.dob}
                  onChange={handleStudentChange}
                  required
                />
                <Select
                  label="Gender"
                  name="genderId"
                  value={studentForm.genderId}
                  onChange={handleStudentChange}
                  required
                  options={[
                    { label: "Male", value: 1 },
                    { label: "Female", value: 2 },
                    { label: "Other", value: 3 },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Blood Group"
                  name="bloodGroup"
                  value={studentForm.bloodGroup}
                  onChange={handleStudentChange}
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
                <Input
                  label="Father's Name"
                  name="fatherName"
                  value={studentForm.fatherName}
                  onChange={handleStudentChange}
                  placeholder="e.g. Arindam Mukherjee"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Mother's Name"
                  name="motherName"
                  value={studentForm.motherName}
                  onChange={handleStudentChange}
                  placeholder="e.g. Soma Mukherjee"
                />
                <Input
                  label="Guardian Name"
                  name="guardianName"
                  value={studentForm.guardianName}
                  onChange={handleStudentChange}
                  placeholder="e.g. Arindam Mukherjee"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Guardian Relation"
                  name="guardianRelation"
                  value={studentForm.guardianRelation}
                  onChange={handleStudentChange}
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
                  name="guardianPhone"
                  value={studentForm.guardianPhone}
                  onChange={handleStudentChange}
                  placeholder="e.g. 9838923456"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Phone 1"
                  name="phone1"
                  value={studentForm.phone1}
                  onChange={handleStudentChange}
                  placeholder="e.g. 1234967890"
                />
                <Input
                  label="Phone 2"
                  name="phone2"
                  value={studentForm.phone2}
                  onChange={handleStudentChange}
                  placeholder="e.g. 1234867891"
                />
                <Input
                  label="WhatsApp"
                  name="whatsapp"
                  value={studentForm.whatsapp}
                  onChange={handleStudentChange}
                  placeholder="e.g. 1234967890"
                />
              </div>

              <Input
                label="Address"
                name="address"
                value={studentForm.address}
                onChange={handleStudentChange}
                placeholder="e.g. Flat 4B, Lake View Residency, Garia"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={studentForm.city}
                  onChange={handleStudentChange}
                  placeholder="e.g. Kolkata"
                />
                <Select
                  label="District"
                  name="districtId"
                  value={studentForm.districtId}
                  onChange={handleStudentChange}
                  options={[
                    { label: "North 24 Parganas", value: 1 },
                    { label: "South 24 Parganas", value: 2 },
                    { label: "Kolkata", value: 3 },
                    { label: "Hooghly", value: 4 },
                    { label: "Howrah", value: 5 },
                    { label: "Nadia", value: 6 },
                    { label: "Murshidabad", value: 7 },
                    { label: "Purba Bardhaman", value: 8 },
                    { label: "Paschim Bardhaman", value: 9 },
                    { label: "Bankura", value: 10 },
                    { label: "Birbhum", value: 11 },
                    { label: "Purulia", value: 12 },
                    { label: "Purba Medinipur", value: 13 },
                    { label: "Paschim Medinipur", value: 14 },
                    { label: "Malda", value: 15 },
                    { label: "Jalpaiguri", value: 16 },
                    { label: "Darjeeling", value: 17 },
                    { label: "Cooch Behar", value: 18 },
                    { label: "Alipurduar", value: 19 },
                    { label: "Kalimpong", value: 20 },
                    { label: "Uttar Dinajpur", value: 21 },
                    { label: "Dakshin Dinajpur", value: 22 },
                    { label: "Jhargram", value: 23 },
                  ]}
                />
                <Input
                  label="PIN Code"
                  name="pin"
                  value={studentForm.pin}
                  onChange={handleStudentChange}
                  placeholder="e.g. 700000"
                />
              </div>
            </div>
          </div>

          {/* ================= 2. ADMISSION & COURSE DETAILS ================= */}
          <div className="border-b border-gray-800 pb-6">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <span>🎓</span> Course &amp; Admission Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Course"
                  name="courseId"
                  value={admissionForm.courseId}
                  onChange={handleAdmissionChange}
                  required
                  disabled={loadingCourses}
                  options={courses.map((c) => ({
                    value: c.id || c.courseId,
                    label: `${c.courseCode || "CODE"} | ${c.courseName || "Course"}`,
                  }))}
                />

                <Select
                  label="Fee Mode"
                  name="feeModesId"
                  value={admissionForm.feeModesId}
                  onChange={handleAdmissionChange}
                  required
                  options={[
                    { label: "Monthly", value: 1 },
                    { label: "One-Time / Lump Sum", value: 2 },
                    { label: "Installment", value: 3 },
                    { label: "Quarterly", value: 4 },
                    { label: "Half-Yearly", value: 5 },
                    { label: "Annually", value: 6 },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Course Status"
                  name="courseStatusId"
                  value={admissionForm.courseStatusId}
                  onChange={handleAdmissionChange}
                  required
                  options={[
                    { label: "Active / Ongoing", value: 1 },
                    { label: "Completed", value: 2 },
                    { label: "Dropped", value: 3 },
                  ]}
                />

                <Input
                  label="Course Fees (₹)"
                  name="courseFees"
                  type="number"
                  min="0"
                  step="0.01"
                  value={admissionForm.courseFees}
                  onChange={handleAdmissionChange}
                  placeholder="e.g. 42000"
                  required
                />

                <Input
                  label="Admission Date"
                  name="admissionDate"
                  type="date"
                  value={admissionForm.admissionDate}
                  onChange={handleAdmissionChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Completion Date"
                  name="completionDate"
                  type="date"
                  value={admissionForm.completionDate}
                  onChange={handleAdmissionChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Saving Admission...</span>
                </>
              ) : (
                <span>Save Student &amp; Admission</span>
              )}
            </button>
          </div>
        </form>

        {/* 🧑‍💻 Developer Tools (visible in development) */}
        {import.meta.env.MODE === "development" && (
          <div className="mt-10 p-4 rounded-2xl border border-gray-800 bg-gray-800/60 text-gray-300">
            <h2 className="text-base font-semibold text-sky-400 mb-2">
              🧑‍💻 Developer Tools (Development Mode)
            </h2>
            <p className="text-xs mb-3 text-gray-400">
              Quick test helpers matching the exact <code className="text-sky-300">/admissions/admissionWithStudent</code> API structure.
            </p>

            <div className="flex flex-wrap gap-2">
              {/* Log payload in console */}
              <button
                type="button"
                onClick={() => {
                  const payload = getPayload();
                  console.log("Admission With Student Payload:", payload);
                  Swal.fire({
                    title: "Payload Logged",
                    text: "Check browser console (F12 → Console tab).",
                    icon: "info",
                    ...getSwalTheme(),
                  });
                }}
                className="px-3 py-1.5 text-xs rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200"
              >
                Log Payload
              </button>

              {/* Autofill test data matching user example */}
              <button
                type="button"
                onClick={() => {
                  const sampleCourseId = courses.length > 0 ? (courses[0].id || courses[0].courseId) : 3;
                  setStudentForm({
                    studentName: "Ananya Mukherjee",
                    nickname: "ananya05",
                    email: `ananya_${Math.floor(Math.random() * 1000)}@example.com`,
                    dob: "2001-11-22",
                    bloodGroup: "A+",
                    fatherName: "Arindam Mukherjee",
                    motherName: "Soma Mukherjee",
                    guardianName: "Arindam Mukherjee",
                    guardianRelation: "Father",
                    guardianPhone: "9838923456",
                    phone1: "1234967890",
                    phone2: "1234867891",
                    whatsapp: "1234967890",
                    address: "Flat 4B, Lake View Residency, Garia",
                    districtId: 3,
                    city: "Kolkata",
                    pin: "700000",
                    genderId: 2,
                  });
                  setAdmissionForm({
                    courseId: sampleCourseId,
                    feeModesId: 1,
                    courseStatusId: 1,
                    courseFees: 42000,
                    admissionDate: "2026-08-10",
                    completionDate: "2027-08-09",
                  });
                  Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Autofilled sample data!",
                    showConfirmButton: false,
                    timer: 1500,
                    ...getSwalTheme(),
                  });
                }}
                className="px-3 py-1.5 text-xs rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium"
              >
                Autofill Test Data
              </button>

              {/* Show JSON Modal */}
              <button
                type="button"
                onClick={() => {
                  const jsonData = JSON.stringify(getPayload(), null, 2);
                  Swal.fire({
                    title: "API Payload Preview (JSON)",
                    html: `
                      <pre style="
                        text-align: left;
                        background: #0f172a;
                        color: #e2e8f0;
                        padding: 12px;
                        border-radius: 10px;
                        font-size: 12px;
                        overflow-x: auto;
                        max-height: 320px;
                      ">${jsonData}</pre>
                    `,
                    width: 620,
                    confirmButtonText: "Copy JSON",
                    showCancelButton: true,
                    cancelButtonText: "Close",
                    ...getSwalTheme(),
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
                        ...getSwalTheme(),
                      });
                    }
                  });
                }}
                className="px-3 py-1.5 text-xs rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium"
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

/* 🔹 Reusable Input Component */
function Input({
  label,
  name,
  value = "",
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  min,
  step,
  disabled = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-400 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        step={step}
        disabled={disabled}
        className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      />
    </div>
  );
}

/* 🔹 Reusable Select Component */
function Select({
  label,
  name,
  value = "",
  onChange,
  options = [],
  required = false,
  disabled = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-400 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
