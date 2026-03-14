import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import {
  User,
  BookOpen,
  DollarSign,
  Calendar,
  Save,
  List,
  RefreshCw,
  Search,
  XCircle,
  ChevronUp,
  ChevronDown,
  Download,
  Printer,
} from "lucide-react";
import { admissionService } from "../services/admissionService";
import { studentService } from "../services/studentService";
import { courseService } from "../services/courseService";

const StudentAdmission = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "admissionDate",
    direction: "desc",
  });
  const [loading, setLoading] = useState({
    students: false,
    courses: false,
    admissions: false,
    submit: false,
  });

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    courseStatusId: 1,
    courseFees: "",
    admissionDate: "",
  });

  const [showFormJson, setShowFormJson] = useState(false);

  // Helper for SweetAlert2 theme (dark mode aware)
  const getSwalTheme = () => ({
    background: "#111827",
    color: "#f9fafb",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    didOpen: (popup) => {
      popup.style.border = "1px solid #374151";
    },
  });

  // Load initial data
  useEffect(() => {
    loadStudents();
    loadCourses();
    loadAdmissions();
  }, []);

  const loadStudents = async () => {
    setLoading((prev) => ({ ...prev, students: true }));
    try {
      const response = await studentService.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load students.",
        ...getSwalTheme(),
      });
    } finally {
      setLoading((prev) => ({ ...prev, students: false }));
    }
  };

  const loadCourses = async () => {
    setLoading((prev) => ({ ...prev, courses: true }));
    try {
      const data = await courseService.getAll();
      console.log("Courses ", data.data);
      setCourses(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load courses.",
        ...getSwalTheme(),
      });
    } finally {
      setLoading((prev) => ({ ...prev, courses: false }));
    }
  };

  const loadAdmissions = async () => {
    setLoading((prev) => ({ ...prev, admissions: true }));
    try {
      const response = await admissionService.getAll();
      setAdmissions(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load admissions.",
        ...getSwalTheme(),
      });
    } finally {
      setLoading((prev) => ({ ...prev, admissions: false }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId: Number(formData.studentId),
      courseId: Number(formData.courseId),
      courseStatusId: Number(formData.courseStatusId),
      courseFees: Number(formData.courseFees),
      admissionDate: formData.admissionDate,
    };

    const swalTheme = getSwalTheme();

    const result = await Swal.fire({
      title: "Save Admission?",
      text: "Do you want to save this admission record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
      ...swalTheme,
    });

    if (!result.isConfirmed) return;

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      await admissionService.create(payload);

      await Swal.fire({
        icon: "success",
        title: "Saved Successfully",
        text: "Student admission has been saved.",
        timer: 2000,
        showConfirmButton: false,
        ...swalTheme,
      });

      setFormData({
        studentId: "",
        courseId: "",
        courseStatusId: 1,
        courseFees: "",
        admissionDate: "",
      });
      await loadAdmissions();
    } catch (error) {
      let message = "Something went wrong";

      if (error.response?.data?.data) {
        message = Object.values(error.response.data.data).flat().join("\n");
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: message,
        ...swalTheme,
      });
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  // Sorting logic (unchanged)
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortValue = (admission, key) => {
    switch (key) {
      case "student":
        return admission.student?.studentName?.toLowerCase() || "";
      case "course":
        return admission.course?.courseName?.toLowerCase() || "";
      case "fees":
        return admission.courseFees || 0;
      case "admissionDate":
        return admission.admissionDate
          ? new Date(admission.admissionDate)
          : new Date(0);
      case "completionDate":
        return admission.completionDate
          ? new Date(admission.completionDate)
          : new Date(0);
      case "status":
        return admission.courseStatus?.courseStatusName?.toLowerCase() || "";
      default:
        return "";
    }
  };

  // Filter and sort admissions
  const filteredAdmissions = admissions.filter((admission) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const studentName = admission.student?.studentName?.toLowerCase() || "";
    const courseName = admission.course?.courseName?.toLowerCase() || "";
    return (
      studentName.includes(searchLower) || courseName.includes(searchLower)
    );
  });

  const sortedAdmissions = [...filteredAdmissions].sort((a, b) => {
    const aVal = getSortValue(a, sortConfig.key);
    const bVal = getSortValue(b, sortConfig.key);

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Export to Excel (unchanged)
  const exportToExcel = () => {
    if (sortedAdmissions.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Data",
        text: "No admissions to export.",
        ...getSwalTheme(),
      });
      return;
    }

    const worksheetData = [
      [
        "#",
        "Student",
        "Course",
        "Fees (₹)",
        "Admission Date",
        "Completion Date",
        "Status",
      ],
      ...sortedAdmissions.map((admission, index) => [
        index + 1,
        admission.student?.studentName || `ID: ${admission.student?.studentId}`,
        admission.course?.courseName || `ID: ${admission.course?.courseId}`,
        admission.courseFees || 0,
        admission.admissionDate
          ? new Date(admission.admissionDate).toLocaleDateString()
          : "",
        admission.completionDate
          ? new Date(admission.completionDate).toLocaleDateString()
          : "",
        admission.courseStatus?.courseStatusName || "Unknown",
      ]),
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(wb, ws, "Admissions");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "admissions.xlsx");
  };

  // Print function (unchanged)
  const printAdmissions = () => {
    if (sortedAdmissions.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Data",
        text: "No admissions to print.",
        ...getSwalTheme(),
      });
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      Swal.fire({
        icon: "error",
        title: "Popup Blocked",
        text: "Please allow popups to print.",
        ...getSwalTheme(),
      });
      return;
    }

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const tableRows = sortedAdmissions
      .map(
        (admission, index) => `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.student?.studentName || `ID: ${admission.student?.studentId}`}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.course?.courseName || `ID: ${admission.course?.courseId}`}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${admission.courseFees?.toFixed(2) || "0.00"}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.admissionDate ? new Date(admission.admissionDate).toLocaleDateString() : ""}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.completionDate ? new Date(admission.completionDate).toLocaleDateString() : "—"}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.courseStatus?.courseStatusName || "Unknown"}</td>
            </tr>
        `,
      )
      .join("");

    const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admissions List</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
                    table { border-collapse: collapse; width: 100%; }
                    th { background-color: #f2f2f2; padding: 10px; border: 1px solid #ddd; text-align: left; }
                    td { padding: 8px; border: 1px solid #ddd; }
                    .text-right { text-align: right; }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Admissions List</h1>
                    <div>Printed on: ${today}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Fees (₹)</th>
                            <th>Admission Date</th>
                            <th>Completion Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
                <p style="margin-top: 20px;">Total Records: ${sortedAdmissions.length}</p>
            </body>
            </html>
        `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Sort icon helper (unchanged)
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <ChevronUp className="w-4 h-4 opacity-30 group-hover:opacity-100" />
      );
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 pt-24 p-6 dark:bg-gray-900 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl shadow-xl p-8"
      >
        {/* Admission Form Card */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-sky-400 mb-8 text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            Student Admission
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Select */}
            <Select
              label="Student"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              disabled={loading.students}
              options={students.map((s) => ({
                value: s.studentId,
                label: s.studentName,
              }))}
              loading={loading.students}
            />

            {/* Course Select */}
            <Select
              label="Course"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
              disabled={loading.courses}
              options={courses.map((c) => ({
                value: c.id,
                label: `${c.courseCode} | ${c.courseName}`,
              }))}
              loading={loading.courses}
            />

            {/* Course Fees */}
            <Input
              label="Course Fees"
              name="courseFees"
              value={formData.courseFees}
              onChange={handleChange}
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="Enter amount"
            />

            {/* Admission Date */}
            <Input
              label="Admission Date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              type="date"
              required
            />

            {/* Submit Button (styled like AddStudent) */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading.submit}
                className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading.submit ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Admission</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Admissions List Card */}
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6">
          {/* Header with Title, Search, and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              <List className="w-5 h-5" />
              Admissions List
            </h3>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by student or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-100 placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={printAdmissions}
                disabled={sortedAdmissions.length === 0}
                className="p-2 text-gray-300 hover:text-purple-400 transition rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Print List"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                onClick={exportToExcel}
                disabled={sortedAdmissions.length === 0}
                className="p-2 text-gray-300 hover:text-green-400 transition rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Export to Excel"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={loadAdmissions}
                disabled={loading.admissions}
                className="p-2 text-gray-300 hover:text-blue-400 transition rounded-full hover:bg-gray-700"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-5 h-5 ${loading.admissions ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>

          {loading.admissions ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent"></div>
            </div>
          ) : sortedAdmissions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">
                {searchTerm
                  ? "No admissions match your search."
                  : "No admissions found."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-16"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("student")}
                    >
                      <div className="flex items-center gap-1">
                        Student
                        <SortIcon columnKey="student" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("course")}
                    >
                      <div className="flex items-center gap-1">
                        Course
                        <SortIcon columnKey="course" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("fees")}
                    >
                      <div className="flex items-center gap-1">
                        Fees
                        <SortIcon columnKey="fees" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("admissionDate")}
                    >
                      <div className="flex items-center gap-1">
                        Admission Date
                        <SortIcon columnKey="admissionDate" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("completionDate")}
                    >
                      <div className="flex items-center gap-1">
                        Completion Date
                        <SortIcon columnKey="completionDate" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        <SortIcon columnKey="status" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {sortedAdmissions.map((admission, index) => {
                    const statusColor = () => {
                      const status =
                        admission.courseStatus?.courseStatusName?.toLowerCase() ||
                        "";
                      if (
                        status.includes("active") ||
                        status.includes("ongoing")
                      )
                        return "bg-green-900 text-green-200";
                      if (status.includes("completed"))
                        return "bg-blue-900 text-blue-200";
                      if (
                        status.includes("dropped") ||
                        status.includes("cancelled")
                      )
                        return "bg-red-900 text-red-200";
                      return "bg-gray-700 text-gray-300";
                    };

                    return (
                      <tr
                        key={admission.admissionId}
                        className="hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                          {admission.student?.studentName ||
                            `ID: ${admission.student?.studentId}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {admission.course?.courseName ||
                            `ID: ${admission.course?.courseId}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          ₹
                          {admission.courseFees?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(admission.admissionDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" },
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {admission.completionDate ? (
                            new Date(
                              admission.completionDate,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor()}`}
                          >
                            {admission.courseStatus?.courseStatusName ||
                              "Unknown"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* 🧑‍💻 Developer Tools (visible only in development) */}
        {import.meta.env.MODE === "development" && (
          <div className="mt-10 p-4 rounded-2xl border border-gray-800 bg-gray-800/60 text-gray-300">
            <h2 className="text-lg font-semibold text-sky-400 mb-2">
              🧑‍💻 Developer Tools
            </h2>

            <p className="text-sm mb-3 text-gray-400">
              Visible only in{" "}
              <span className="text-sky-400 font-semibold">development</span> mode.
            </p>

            {/* Toggle Button */}
            <button
              onClick={() => setShowFormJson(!showFormJson)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2"
            >
              {showFormJson ? "Hide Form JSON" : "Show Form JSON"}
            </button>

            {/* JSON Display */}
            {showFormJson && (
              <pre className="mt-4 p-4 bg-black rounded-lg text-green-400 text-xs overflow-x-auto border border-gray-700">
                {JSON.stringify(formData, null, 2)}
              </pre>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

// 🔹 Input Component (from AddStudent)
function Input({ label, name, value, onChange, type = "text", required = false, ...props }) {
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
        {...props}
      />
    </div>
  );
}

// 🔹 Select Component (from AddStudent)
function Select({ label, name, value, onChange, options = [], required = false, disabled = false, loading = false }) {
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
        disabled={disabled || loading}
        className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
      >
        <option value="">
          {loading ? "Loading..." : `Select ${label}`}
        </option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StudentAdmission;