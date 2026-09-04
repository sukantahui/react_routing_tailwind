import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import {
  User,
  BookOpen,
  IndianRupee,
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
  CheckCircle2,
} from "lucide-react";
import { admissionService } from "../services/admissionService";
import { studentService } from "../services/studentService";
import { courseService } from "../services/courseService";
import api from "../api/api";

const StudentAdmission = () => {
  const [searchParams] = useSearchParams();
  const urlStudentId = searchParams.get("studentId");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [feeModes, setFeeModes] = useState([
    { id: 1, fee_modes_name: "Monthly" },
    { id: 2, fee_modes_name: "Course Fees (Full / Lump sum)" },
  ]);
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
    studentId: urlStudentId ? String(urlStudentId) : "",
    courseId: "",
    courseStatusId: 1,
    feeModesId: 1,
    courseFees: "",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  const [feePayment, setFeePayment] = useState({
    collectFeeNow: true,
    amountPaid: "",
    paymentMode: "UPI",
    paymentDate: new Date().toISOString().split("T")[0],
    periodFrom: "",
    periodTo: "",
    remarks: "",
  });

  const [showFormJson, setShowFormJson] = useState(false);

  // Real-time Due Calculation for both Monthly and Lump-sum fee modes
  const dueCalculation = useMemo(() => {
    const feeMode = Number(formData.feeModesId || 1); // 1 = Monthly, 2 = Course Fees
    const agreedFee = Number(formData.courseFees) || 0;
    const amountPaid = feePayment.collectFeeNow ? (Number(feePayment.amountPaid) || 0) : 0;

    if (feeMode === 2) {
      // Course Fees / Lump Sum Mode
      const due = Math.max(0, agreedFee - amountPaid);
      return {
        mode: "lump_sum",
        totalPayable: agreedFee,
        amountPaid,
        dueAmount: due,
      };
    }

    // Monthly Mode:
    const admDateStr = formData.admissionDate || new Date().toISOString().split("T")[0];
    const payDateStr = (feePayment.collectFeeNow && feePayment.paymentDate) ? feePayment.paymentDate : new Date().toISOString().split("T")[0];

    const admD = new Date(admDateStr);
    const payD = new Date(payDateStr);
    const todayD = new Date();

    // Months elapsed from admission up to CURRENT PERIOD (Today, e.g. September 2026)
    let currentElapsedMonths = (todayD.getFullYear() - admD.getFullYear()) * 12 + (todayD.getMonth() - admD.getMonth()) + 1;
    if (currentElapsedMonths < 1) currentElapsedMonths = 1;

    // Months elapsed from admission up to Payment Date (e.g. June 2026)
    let paymentElapsedMonths = (payD.getFullYear() - admD.getFullYear()) * 12 + (payD.getMonth() - admD.getMonth()) + 1;
    if (paymentElapsedMonths < 1) paymentElapsedMonths = 1;

    // Accrued fees up to current period (e.g. 4 months * 600 = 2,400)
    const totalAccruedFee = currentElapsedMonths * agreedFee;
    const dueAmount = Math.max(0, totalAccruedFee - amountPaid);
    const monthsDue = agreedFee > 0 ? Math.max(0, (dueAmount / agreedFee)).toFixed(1).replace(/\.0$/, "") : "0";

    // Number of full months covered by this payment
    const fullMonthsCovered = agreedFee > 0 ? Math.floor(amountPaid / agreedFee) : 0;
    const monthsPaid = agreedFee > 0 ? (amountPaid / agreedFee).toFixed(1).replace(/\.0$/, "") : "0";

    // Period Range covered by this payment
    let periodFromStr = "";
    let periodToStr = "";
    let periodLabel = "";
    if (amountPaid > 0 && agreedFee > 0) {
      const pStart = new Date(admD.getFullYear(), admD.getMonth(), 1);
      const pEnd = new Date(admD.getFullYear(), admD.getMonth() + Math.max(1, fullMonthsCovered), 0);
      const startYear = pStart.getFullYear();
      const startMonth = String(pStart.getMonth() + 1).padStart(2, "0");
      const endYear = pEnd.getFullYear();
      const endMonth = String(pEnd.getMonth() + 1).padStart(2, "0");
      const endDay = String(pEnd.getDate()).padStart(2, "0");

      periodFromStr = `${startYear}-${startMonth}-01`;
      periodToStr = `${endYear}-${endMonth}-${endDay}`;

      const startMonthLabel = pStart.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      const endMonthLabel = pEnd.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      periodLabel = startMonthLabel === endMonthLabel ? startMonthLabel : `${startMonthLabel} – ${endMonthLabel}`;
    }

    const admissionMonthName = admD.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const currentMonthName = todayD.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const paymentDateFormatted = payD.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    // Pending months names (e.g. ["Jul 2026", "Aug 2026", "Sep 2026"])
    const pendingMonthsList = [];
    if (agreedFee > 0 && fullMonthsCovered < currentElapsedMonths) {
      for (let i = fullMonthsCovered; i < currentElapsedMonths; i++) {
        const m = new Date(admD.getFullYear(), admD.getMonth() + i, 1);
        pendingMonthsList.push(m.toLocaleDateString("en-US", { month: "short", year: "numeric" }));
      }
    }

    return {
      mode: "monthly",
      elapsedMonths: currentElapsedMonths,
      paymentElapsedMonths,
      monthlyRate: agreedFee,
      totalAccruedFee,
      amountPaid,
      dueAmount,
      monthsPaid,
      monthsDue,
      fullMonthsCovered,
      admissionMonthName,
      currentMonthName,
      paymentDateFormatted,
      periodFromStr,
      periodToStr,
      periodLabel,
      pendingMonthsList,
    };
  }, [formData.feeModesId, formData.courseFees, formData.admissionDate, feePayment.collectFeeNow, feePayment.paymentDate, feePayment.amountPaid]);

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
    const initData = async () => {
      setLoading({ students: true, courses: true, admissions: true, submit: false });
      try {
        const [stRes, cRes, admRes, fmRes] = await Promise.all([
          studentService.getAll(),
          courseService.getAll(),
          admissionService.getAll(),
          api.get("/fee-modes").catch(() => null),
        ]);

        if (fmRes?.data?.status && Array.isArray(fmRes.data.data)) {
          setFeeModes(fmRes.data.data);
        }

        let stList = [];
        if (stRes?.status && Array.isArray(stRes.data)) stList = stRes.data;
        else if (Array.isArray(stRes?.data)) stList = stRes.data;
        else if (Array.isArray(stRes)) stList = stRes;

        let cList = [];
        if (cRes?.status && Array.isArray(cRes.data)) cList = cRes.data;
        else if (Array.isArray(cRes?.data)) cList = cRes.data;
        else if (Array.isArray(cRes)) cList = cRes;

        let admList = [];
        if (admRes?.status && Array.isArray(admRes.data)) admList = admRes.data;
        else if (Array.isArray(admRes?.data)) admList = admRes.data;
        else if (Array.isArray(admRes)) admList = admRes;

        setStudents(stList);
        setCourses(cList);
        setAdmissions(admList);

        if (urlStudentId) {
          setFormData((prev) => ({
            ...prev,
            studentId: String(urlStudentId),
            admissionDate: prev.admissionDate || new Date().toISOString().split("T")[0],
          }));
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load admission data.",
          ...getSwalTheme(),
        });
      } finally {
        setLoading({ students: false, courses: false, admissions: false, submit: false });
      }
    };

    initData();
  }, [urlStudentId]);

  const loadAdmissions = async () => {
    setLoading((prev) => ({ ...prev, admissions: true }));
    try {
      const response = await admissionService.getAll();
      let admList = [];
      if (response?.status && Array.isArray(response.data)) admList = response.data;
      else if (Array.isArray(response?.data)) admList = response.data;
      else if (Array.isArray(response)) admList = response;
      setAdmissions(admList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, admissions: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "courseId" && value) {
        const sel = courses.find((c) => String(c.id || c.courseId) === String(value));
        if (sel) {
          const fee = sel.courseFees || sel.course_fees;
          if (fee) {
            updated.courseFees = fee;
            // Auto-sync amount received to the new agreed course fees
            setFeePayment((prevFee) => ({
              ...prevFee,
              amountPaid: fee,
            }));
          }
          // Strictly adopt course's assigned fee mode!
          const mode = sel.feeModesId || sel.fee_modes_id || 1;
          updated.feeModesId = Number(mode);
        }
      }
      return updated;
    });

    // When agreed course fees changes directly in input, auto-update amount received
    if (name === "courseFees") {
      setFeePayment((prevFee) => ({
        ...prevFee,
        amountPaid: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentId) {
      Swal.fire({
        icon: "warning",
        title: "Student Required",
        text: "Please select a student to admit.",
        ...getSwalTheme(),
      });
      return;
    }

    if (!formData.courseId) {
      Swal.fire({
        icon: "warning",
        title: "Course Required",
        text: "Please select an academic course.",
        ...getSwalTheme(),
      });
      return;
    }

    const payload = {
      studentId: Number(formData.studentId),
      courseId: Number(formData.courseId),
      courseStatusId: Number(formData.courseStatusId || 1),
      feeModesId: Number(formData.feeModesId || 1),
      courseFees: Number(formData.courseFees),
      admissionDate: formData.admissionDate || new Date().toISOString().split("T")[0],
    };

    if (feePayment.collectFeeNow && Number(feePayment.amountPaid) > 0) {
      payload.initial_fee = {
        amount_paid: Number(feePayment.amountPaid),
        payment_mode: feePayment.paymentMode,
        payment_date: feePayment.paymentDate,
      };
      if (feePayment.periodFrom || dueCalculation.periodFromStr) {
        payload.initial_fee.period_from = feePayment.periodFrom || dueCalculation.periodFromStr;
      }
      if (feePayment.periodTo || dueCalculation.periodToStr) {
        payload.initial_fee.period_to = feePayment.periodTo || dueCalculation.periodToStr;
      }
      if (feePayment.remarks?.trim()) {
        payload.initial_fee.remarks = feePayment.remarks.trim();
      } else if (dueCalculation.periodLabel) {
        payload.initial_fee.remarks = `Admission Fee payment for ${dueCalculation.periodLabel}`;
      }
    }

    const swalTheme = getSwalTheme();

    const result = await Swal.fire({
      title: "Save Admission?",
      text: "Do you want to confirm this student admission?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm Admission",
      ...swalTheme,
    });

    if (!result.isConfirmed) return;

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      await admissionService.create(payload);

      await Swal.fire({
        icon: "success",
        title: "Admission Confirmed!",
        text: "Student has been successfully enrolled into the course.",
        timer: 2500,
        showConfirmButton: false,
        ...swalTheme,
      });

      setFormData({
        studentId: "",
        courseId: "",
        courseStatusId: 1,
        feeModesId: 1,
        courseFees: "",
        admissionDate: new Date().toISOString().split("T")[0],
      });
      setFeePayment({
        collectFeeNow: true,
        amountPaid: "",
        paymentMode: "UPI",
        paymentDate: new Date().toISOString().split("T")[0],
        periodFrom: "",
        periodTo: "",
        remarks: "",
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

  // Sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedAdmissions = useMemo(() => {
    let items = [...admissions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(
        (adm) =>
          (adm.student?.studentName || "").toLowerCase().includes(term) ||
          (adm.student?.registrationNumber || "").toLowerCase().includes(term) ||
          (adm.course?.courseName || "").toLowerCase().includes(term) ||
          (adm.course?.courseCode || "").toLowerCase().includes(term)
      );
    }

    if (sortConfig.key) {
      items.sort((a, b) => {
        let aVal, bVal;

        switch (sortConfig.key) {
          case "student":
            aVal = a.student?.studentName || "";
            bVal = b.student?.studentName || "";
            break;
          case "course":
            aVal = a.course?.courseName || "";
            bVal = b.course?.courseName || "";
            break;
          case "courseFees":
            aVal = a.courseFees || 0;
            bVal = b.courseFees || 0;
            break;
          case "admissionDate":
            aVal = a.admissionDate ? new Date(a.admissionDate) : new Date(0);
            bVal = b.admissionDate ? new Date(b.admissionDate) : new Date(0);
            break;
          default:
            aVal = a[sortConfig.key];
            bVal = b[sortConfig.key];
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return items;
  }, [admissions, searchTerm, sortConfig]);

  // Selected student object for live callout
  const selectedStudentObj = useMemo(() => {
    if (!formData.studentId) return null;
    return students.find((s) => String(s.id || s.studentId) === String(formData.studentId));
  }, [students, formData.studentId]);

  const selectedCourseObj = useMemo(() => {
    if (!formData.courseId) return null;
    return courses.find((c) => String(c.id || c.courseId) === String(formData.courseId));
  }, [courses, formData.courseId]);

  // Grouped courses for clean, lightweight optgroup dropdown
  const groupedCourses = useMemo(() => {
    const groups = {
      "💻 Software & Web Development": [],
      "📊 Accounting, Finance & Office": [],
      "🎓 School & Board Curriculum (ICSE / ISC / CBSE / WBCHSE)": [],
      "🤖 Advanced Technologies & Other": [],
    };

    courses.forEach((c) => {
      const code = (c.course_code || c.courseCode || "").toUpperCase();
      const name = (c.course_name || c.courseName || "").toLowerCase();

      if (
        code.includes("ICSE") ||
        code.includes("ISC") ||
        code.includes("CBSE") ||
        code.includes("WBCHSE") ||
        code.includes("SCHOOL")
      ) {
        groups["🎓 School & Board Curriculum (ICSE / ISC / CBSE / WBCHSE)"].push(c);
      } else if (
        code.includes("TALLY") ||
        code.includes("EXCEL") ||
        code.includes("GST") ||
        code.includes("DFA") ||
        code.includes("DCA") ||
        code.includes("OP") ||
        name.includes("office") ||
        name.includes("accounting")
      ) {
        groups["📊 Accounting, Finance & Office"].push(c);
      } else if (
        code.includes("AI") ||
        code.includes("ROBOT") ||
        name.includes("ai") ||
        name.includes("robotics")
      ) {
        groups["🤖 Advanced Technologies & Other"].push(c);
      } else {
        groups["💻 Software & Web Development"].push(c);
      }
    });

    return groups;
  }, [courses]);

  // Excel Export
  const exportToExcel = () => {
    const exportData = sortedAdmissions.map((adm, index) => ({
      "#": index + 1,
      "Student Name": adm.student?.studentName || `ID: ${adm.student?.studentId}`,
      Course: adm.course?.courseName || `ID: ${adm.course?.courseId}`,
      "Fees (₹)": adm.courseFees || 0,
      "Admission Date": adm.admissionDate ? new Date(adm.admissionDate).toLocaleDateString() : "",
      "Completion Date": adm.completionDate ? new Date(adm.completionDate).toLocaleDateString() : "—",
      Status: adm.courseStatus?.courseStatusName || "Unknown",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(data, `admissions_export_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // Print function
  const handlePrint = () => {
    const printContent = document.getElementById("admissions-table");
    const printWindow = window.open("", "_blank");

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
            </body>
            </html>
        `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 opacity-30 group-hover:opacity-100" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen from-gray-950 via-gray-900 to-black text-gray-100 pt-24 p-6 dark:bg-gray-900 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl shadow-xl p-8"
      >
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Admit Student to Course</span>
          </div>
        </div>

        {/* Admission Form Card */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-sky-400 mb-2 text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            Admit Student to Course
          </h2>
          <p className="text-center text-xs text-slate-400 mb-6">
            Assign an academic course and tuition fee to an existing registered student.
          </p>

          {/* Prefilled Student Banner */}
          {selectedStudentObj && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 border border-sky-500/30 flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 font-bold text-lg flex items-center justify-center">
                  🎓
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 mb-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    PREFILLED STUDENT FROM DASHBOARD
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    {selectedStudentObj.student_name || selectedStudentObj.studentName}
                    <span className="font-mono text-xs text-slate-400 font-normal ml-2">
                      ({selectedStudentObj.registration_number || selectedStudentObj.registrationNumber})
                    </span>
                  </h3>
                </div>
              </div>

              {selectedStudentObj.whatsapp && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">WhatsApp Contact</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {selectedStudentObj.whatsapp}
                  </span>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Select */}
            <Select
              label="Student"
              name="studentId"
              value={String(formData.studentId || "")}
              onChange={handleChange}
              required
              disabled={loading.students}
              options={students.map((s) => ({
                value: String(s.id || s.studentId),
                label: `${s.student_name || s.studentName || "Student"} [${s.registration_number || s.registrationNumber || s.whatsapp || ""}]`,
              }))}
              loading={loading.students}
            />

            {/* GROUPED CLEAN ACADEMIC COURSE DROPDOWN */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>Select Academic Course</span>
                  <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {courses.length} courses across 4 categories
                </span>
              </div>

              <select
                name="courseId"
                value={formData.courseId || ""}
                onChange={handleChange}
                required
                disabled={loading.courses}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer shadow-inner"
              >
                <option value="" className="text-slate-500 bg-gray-900">
                  -- Select Academic Course Program --
                </option>
                {Object.entries(groupedCourses).map(([groupTitle, courseList]) =>
                  courseList.length > 0 ? (
                    <optgroup
                      key={groupTitle}
                      label={groupTitle}
                      className="bg-gray-900 font-bold text-sky-400 text-xs py-1"
                    >
                      {courseList.map((c) => {
                        const fee = Number(c.courseFees || c.course_fees || 0);
                        const code = c.course_code || c.courseCode;
                        const name = c.course_name || c.courseName;
                        return (
                          <option
                            key={c.id || c.courseId}
                            value={c.id || c.courseId}
                            className="bg-gray-950 text-slate-100 font-normal py-1.5 pl-2 text-xs"
                          >
                            {name} ({code}) — ₹{fee.toLocaleString()}
                          </option>
                        );
                      })}
                    </optgroup>
                  ) : null
                )}
              </select>

              {/* Selected Course Quick Summary Banner */}
              {selectedCourseObj && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-sky-950/40 via-gray-900 to-indigo-950/30 border border-sky-500/30 flex items-center justify-between gap-3 text-xs animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-md font-mono font-bold text-xs bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      {selectedCourseObj.course_code || selectedCourseObj.courseCode}
                    </span>
                    <span className="font-bold text-white">
                      {selectedCourseObj.course_name || selectedCourseObj.courseName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {Number(selectedCourseObj.feeModesId || selectedCourseObj.fee_modes_id) === 2 ? "Course Fees" : "Monthly Plan"}
                    </span>
                    <span className="font-extrabold text-emerald-400">
                      ₹{Number(selectedCourseObj.courseFees || selectedCourseObj.course_fees || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Payment Schedule / Fee Mode & Course Fees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Payment Schedule / Fee Mode"
                name="feeModesId"
                value={String(formData.feeModesId || "1")}
                onChange={handleChange}
                required
                options={feeModes.map((fm) => ({
                  value: String(fm.id),
                  label: fm.fee_modes_name || (fm.id === 1 ? "Monthly" : "Course Fees (Full / Lump sum)"),
                }))}
              />

              <Input
                label="Agreed Course Fees (₹)"
                name="courseFees"
                value={formData.courseFees}
                onChange={handleChange}
                type="number"
                required
                min="0"
                step="any"
                placeholder="e.g. 14000"
              />
            </div>



            {/* LIVE COURSE & PAYMENT MODE CARD (Displayed on selection of course) */}
            {selectedCourseObj && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-sky-500/15 to-purple-500/15 border border-emerald-500/30 space-y-2.5 shadow-lg animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono font-bold text-xs border border-sky-500/30">
                      {selectedCourseObj.course_code || selectedCourseObj.courseCode}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {selectedCourseObj.course_name || selectedCourseObj.courseName}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Standard Catalog Fee: ₹{Number(selectedCourseObj.courseFees || selectedCourseObj.course_fees || 0).toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold">Payment Mode:</span>
                    <span className="px-2.5 py-0.5 rounded-full font-bold text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {String(formData.feeModesId) === "2" ? "Course Fees (Full / Lump sum)" : "Monthly Installment Plan"}
                    </span>
                  </div>

                  {/* Mode-specific detail */}
                  {String(formData.feeModesId) === "2" ? (
                    <span className="text-slate-300">
                      Payment Schedule: <strong className="text-emerald-400">Single lump sum of ₹{Number(formData.courseFees || 0).toLocaleString()}</strong> at admission
                    </span>
                  ) : (
                    <span className="text-emerald-300 font-medium">
                      Estimated Monthly Installment: <strong className="text-emerald-400 font-bold">~₹{Math.round(Number(formData.courseFees || 0) / 12).toLocaleString()} / month</strong> (12 monthly installments)
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* INITIAL FEES RECEIVED ENTRIES (WITH DATE AND MODE) */}
            <div className="p-4 rounded-2xl bg-gray-950 border border-sky-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={feePayment.collectFeeNow}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFeePayment((prev) => ({
                        ...prev,
                        collectFeeNow: checked,
                        amountPaid: checked && !prev.amountPaid ? (formData.courseFees || "") : prev.amountPaid,
                      }));
                    }}
                    className="w-4 h-4 rounded text-sky-500 bg-gray-900 border-gray-700 focus:ring-sky-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <span>💳 Collect Initial Fees Received Now (Issue Receipt)</span>
                  </span>
                </label>
                <span className="text-[10px] text-slate-400 font-semibold">
                  {feePayment.collectFeeNow ? "Active (Receipt will generate)" : "Optional"}
                </span>
              </div>

              {feePayment.collectFeeNow && (
                <div className="space-y-3 pt-1 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Amount Paid */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Amount Received (₹) <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-sm">₹</span>
                        <input
                          type="number"
                          min="0"
                          
                          placeholder="e.g. 3000"
                          value={feePayment.amountPaid}
                          onChange={(e) => setFeePayment((prev) => ({ ...prev, amountPaid: e.target.value }))}
                          className="w-full bg-gray-900 border border-sky-500/40 rounded-xl pl-7 pr-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>

                    {/* Payment Date */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Payment Date <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="date"
                        value={feePayment.paymentDate}
                        onChange={(e) => setFeePayment((prev) => ({ ...prev, paymentDate: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </div>

                    {/* Payment Mode */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Payment Mode <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={feePayment.paymentMode}
                        onChange={(e) => setFeePayment((prev) => ({ ...prev, paymentMode: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer"
                      >
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI (GPay / PhonePe / QR)</option>
                        <option value="Bank Transfer">Bank Transfer (NEFT / IMPS)</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Card">Card / POS</option>
                      </select>
                    </div>
                  </div>



                  {/* Quick Pay Amount Shortcuts for Monthly Course */}
                  {dueCalculation.mode === "monthly" && dueCalculation.monthlyRate > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Quick Select:</span>
                      <button
                        type="button"
                        onClick={() => setFeePayment((prev) => ({ ...prev, amountPaid: dueCalculation.monthlyRate }))}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          Number(feePayment.amountPaid) === dueCalculation.monthlyRate
                            ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20"
                            : "bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700"
                        }`}
                      >
                        Pay 1 Month ({dueCalculation.admissionMonthName || "June"}: ₹{dueCalculation.monthlyRate.toLocaleString()})
                      </button>

                      {dueCalculation.elapsedMonths > 1 && (
                        <button
                          type="button"
                          onClick={() => setFeePayment((prev) => ({ ...prev, amountPaid: dueCalculation.totalAccruedFee }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                            Number(feePayment.amountPaid) === dueCalculation.totalAccruedFee
                              ? "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20"
                              : "bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
                          }`}
                        >
                          Pay All Up to Current ({dueCalculation.currentMonthName || "Sep"}, {dueCalculation.elapsedMonths} mos: ₹{dueCalculation.totalAccruedFee.toLocaleString()})
                        </button>
                      )}
                    </div>
                  )}

                  {/* Payment Coverage Period Indicator */}
                  {dueCalculation.mode === "monthly" && dueCalculation.periodLabel && (
                    <div className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                        <span className="text-slate-300 font-medium">Receipt Covers Period:</span>
                        <strong className="text-sky-300 font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                          {dueCalculation.periodLabel} ({dueCalculation.fullMonthsCovered || 1} month{(dueCalculation.fullMonthsCovered > 1 ? "s" : "")})
                        </strong>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Admission: <strong className="text-slate-200">{dueCalculation.admissionMonthName}</strong> • Current Billing: <strong className="text-amber-300">{dueCalculation.currentMonthName}</strong>
                      </span>
                    </div>
                  )}

                  {/* Live Real-time Due & Payment Summary */}
                  <div className="p-3.5 rounded-xl bg-gray-900/90 border border-gray-800 space-y-2.5 text-xs text-slate-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span>Fees Paid Now: </span>
                        <strong className="text-emerald-400 font-bold text-sm">
                          ₹{Number(feePayment.amountPaid || 0).toLocaleString()}
                        </strong>
                        <span className="text-slate-400 ml-1.5">via {feePayment.paymentMode}</span>
                        {dueCalculation.mode === "monthly" && dueCalculation.periodLabel && (
                          <span className="ml-1.5 text-[11px] text-sky-300 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20 font-semibold">
                            for {dueCalculation.periodLabel}
                          </span>
                        )}
                      </div>

                      <div>
                        <span>
                          {dueCalculation.mode === "monthly"
                            ? `Accrued to Date (${dueCalculation.currentMonthName}): `
                            : "Agreed Total Fees: "}
                        </span>
                        <strong className="text-white font-semibold">
                          ₹{(dueCalculation.mode === "monthly" ? dueCalculation.totalAccruedFee : dueCalculation.totalPayable).toLocaleString()}
                        </strong>
                        {dueCalculation.mode === "monthly" && (
                          <span className="text-slate-400 text-[11px] ml-1">
                            ({dueCalculation.elapsedMonths} mo @ ₹{dueCalculation.monthlyRate.toLocaleString()}/mo)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-slate-400">Current Status ({dueCalculation.currentMonthName}):</span>
                        {dueCalculation.dueAmount === 0 ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            ✓ Cleared up to {dueCalculation.currentMonthName} (No Due)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            ⚠ {dueCalculation.monthsDue} Month{Number(dueCalculation.monthsDue) > 1 ? "s" : ""} Pending Due
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="text-slate-400">Due Amount: </span>
                        <strong className={`text-sm font-extrabold ${dueCalculation.dueAmount > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                          ₹{dueCalculation.dueAmount.toLocaleString()}
                        </strong>
                        {dueCalculation.mode === "monthly" && dueCalculation.dueAmount > 0 && (
                          <span className="text-rose-400/90 text-[11px] ml-1 font-semibold">
                            ({dueCalculation.pendingMonthsList?.join(", ") || `${dueCalculation.monthsDue} mo`})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Admission Date vs Current Date Context Explanation Note */}
                    {dueCalculation.mode === "monthly" && dueCalculation.elapsedMonths > 1 && (
                      <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/60 flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg">
                        <span className="text-amber-400 text-xs shrink-0 mt-0.5">ℹ️</span>
                        <span className="leading-relaxed">
                          Student enrolled in <strong className="text-slate-200">{dueCalculation.admissionMonthName}</strong> and paid for <strong className="text-emerald-300">{dueCalculation.periodLabel || "June"}</strong>. Because current billing period is <strong className="text-sky-300">{dueCalculation.currentMonthName}</strong>, <strong>{dueCalculation.monthsDue} month(s) ({dueCalculation.pendingMonthsList?.join(", ")})</strong> have accrued to date and remain payable.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Admission Date with Interactive Selection Button & Presets */}
            <DatePicker
              label="Admission Date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading.submit}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer text-sm"
              >
                {loading.submit ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Confirming Admission...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Confirm &amp; Save Admission</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Admissions History Table Card */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
              <List className="w-5 h-5 text-sky-400" />
              Admitted Students Directory ({sortedAdmissions.length})
            </h3>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search student or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 text-gray-100 pl-9 pr-4 py-2 rounded-xl text-xs border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={loadAdmissions}
                disabled={loading.admissions}
                className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
                title="Refresh Table"
              >
                <RefreshCw className={`w-4 h-4 ${loading.admissions ? "animate-spin" : ""}`} />
              </button>

              <button
                onClick={exportToExcel}
                className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition cursor-pointer"
                title="Export to Excel"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrint}
                className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 transition cursor-pointer"
                title="Print Table"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div id="admissions-table" className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-800/80 text-gray-400 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="p-3.5">#</th>
                  <th className="p-3.5 cursor-pointer" onClick={() => handleSort("student")}>
                    <div className="flex items-center gap-1 group">
                      Student <SortIcon columnKey="student" />
                    </div>
                  </th>
                  <th className="p-3.5 cursor-pointer" onClick={() => handleSort("course")}>
                    <div className="flex items-center gap-1 group">
                      Course <SortIcon columnKey="course" />
                    </div>
                  </th>
                  <th className="p-3.5 cursor-pointer text-right" onClick={() => handleSort("courseFees")}>
                    <div className="flex items-center justify-end gap-1 group">
                      Fees (₹) <SortIcon columnKey="courseFees" />
                    </div>
                  </th>
                  <th className="p-3.5 cursor-pointer" onClick={() => handleSort("admissionDate")}>
                    <div className="flex items-center gap-1 group">
                      Admission Date <SortIcon columnKey="admissionDate" />
                    </div>
                  </th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {sortedAdmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No admission records found.
                    </td>
                  </tr>
                ) : (
                  sortedAdmissions.map((adm, i) => (
                    <tr key={adm.admissionId || adm.id || i} className="hover:bg-gray-800/40 transition">
                      <td className="p-3.5">{i + 1}</td>
                      <td className="p-3.5 font-semibold text-white">
                        {adm.student?.studentName || `ID: ${adm.student?.studentId}`}
                      </td>
                      <td className="p-3.5 text-sky-400">
                        {adm.course?.courseName || `ID: ${adm.course?.courseId}`}
                      </td>
                      <td className="p-3.5 text-right font-extrabold text-emerald-400">
                        ₹{Number(adm.courseFees || 0).toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        {adm.admissionDate ? new Date(adm.admissionDate).toLocaleDateString() : "—"}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {adm.courseStatus?.courseStatusName || "Ongoing"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Form Helper Components
function Select({ label, name, value, onChange, options = [], required = false, disabled = false, loading = false }) {
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
        disabled={disabled || loading}
        className="bg-gray-950 text-gray-100 border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 cursor-pointer"
      >
        <option value="">{loading ? "Loading..." : `-- Select ${label} --`}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function DatePicker({ label, name, value, onChange, required = false }) {
  const inputRef = React.useRef(null);

  const openCalendar = () => {
    if (inputRef.current) {
      if (typeof inputRef.current.showPicker === "function") {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    }
  };

  const setPreset = (preset) => {
    const d = new Date();
    if (preset === "today") {
      // today
    } else if (preset === "yesterday") {
      d.setDate(d.getDate() - 1);
    } else if (preset === "startOfMonth") {
      d.setDate(1);
    }
    const iso = d.toISOString().split("T")[0];
    onChange({ target: { name, value: iso } });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          <span>{label}</span> {required && <span className="text-rose-400">*</span>}
        </label>
        {value && (
          <span className="text-[11px] font-mono text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
            {new Date(value).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
          </span>
        )}
      </div>

      <div className="relative flex items-center group">
        <input
          ref={inputRef}
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onClick={openCalendar}
          className="w-full bg-gray-950 text-gray-100 border border-gray-700 hover:border-gray-600 focus:border-sky-500 rounded-xl pl-4 pr-36 py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition shadow-inner"
        />

        <button
          type="button"
          onClick={openCalendar}
          className="absolute right-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-sky-500/20 active:scale-95"
          title="Click to open calendar"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span>Select Date</span>
        </button>
      </div>

      {/* Quick Date Presets */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] uppercase font-bold text-slate-500">Quick Shortcuts:</span>
        <button
          type="button"
          onClick={() => setPreset("today")}
          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-900 hover:bg-gray-800 text-sky-300 hover:text-white border border-gray-800 transition cursor-pointer"
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => setPreset("yesterday")}
          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-900 hover:bg-gray-800 text-slate-300 hover:text-white border border-gray-800 transition cursor-pointer"
        >
          Yesterday
        </button>
        <button
          type="button"
          onClick={() => setPreset("startOfMonth")}
          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-900 hover:bg-gray-800 text-slate-300 hover:text-white border border-gray-800 transition cursor-pointer"
        >
          1st of Month
        </button>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", required = false, min, step, placeholder }) {
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
        min={min}
        step={step}
        placeholder={placeholder}
        className="bg-gray-950 text-gray-100 border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
}

export default StudentAdmission;