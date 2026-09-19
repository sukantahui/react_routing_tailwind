import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";
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
  Phone,
  Check,
  X,
  GraduationCap,
  Sparkles,
  Users,
  CreditCard,
  AlertCircle,
  ExternalLink,
  Receipt,
  MapPin,
  Mail,
  Layers,
} from "lucide-react";
import { admissionService } from "../services/admissionService";
import { studentService } from "../services/studentService";
import { courseService } from "../services/courseService";
import api from "../api/api";

const StudentAdmission = () => {
  const navigate = useNavigate();
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

  // Previous course admissions and payment ledger history for selected student
  const [studentHistory, setStudentHistory] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [expandedReceipts, setExpandedReceipts] = useState({});



  // Fetch previous admissions & course payment history whenever selected student changes
  useEffect(() => {
    if (!formData.studentId) {
      setStudentHistory(null);
      return;
    }

    let isMounted = true;
    const fetchStudentHistory = async () => {
      setLoadingHistory(true);
      try {
        const res = await studentService.getPreviousAdmissions(formData.studentId);
        if (isMounted && res?.status && res?.data) {
          setStudentHistory(res.data);
        }
      } catch (err) {
        console.error("Error loading previous admissions history:", err);
        if (isMounted) setStudentHistory(null);
      } finally {
        if (isMounted) setLoadingHistory(false);
      }
    };

    fetchStudentHistory();
    return () => {
      isMounted = false;
    };
  }, [formData.studentId]);

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
      title: "Assign Course & Confirm Admission?",
      text: "Do you want to assign this course to the student and create their official admission record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Assign Course & Admit",
      cancelButtonText: "Review Details",
      ...swalTheme,
    });

    if (!result.isConfirmed) return;

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      const createdAdmissionRes = await admissionService.create(payload);
      const studentIdSaved = formData.studentId;

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

      // Offer immediate actionable next-steps for the admin
      const postAction = await Swal.fire({
        icon: "success",
        title: "Course Assigned & Student Admitted! 🎓",
        text: "Student has been successfully enrolled into the course. What would you like to do next?",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "💰 Collect Additional Fees",
        denyButtonText: "📊 Record Exam Result",
        cancelButtonText: "Stay on Admissions",
        confirmButtonColor: "#10b981",
        denyButtonColor: "#6366f1",
        cancelButtonColor: "#475569",
        ...swalTheme,
      });

      if (postAction.isConfirmed) {
        navigate(`/payments?studentId=${studentIdSaved}`);
      } else if (postAction.isDenied) {
        navigate(`/results?studentId=${studentIdSaved}`);
      }
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
            <span className="text-sky-400 font-semibold">Assign Course to Student (Admission)</span>
          </div>
        </div>

        {/* Admission Form Card */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center flex items-center justify-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-sky-400" />
            <span>Assign Course to Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">(Admission)</span></span>
          </h2>
          <p className="text-center text-xs sm:text-sm text-slate-400 mb-5 max-w-2xl mx-auto">
            Assign an academic course program and fee structure to an existing student. This assigns the course and officially enrolls the student into the academy.
          </p>

          {/* Prominent Workflow Callout Banner */}
          <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-sky-500/15 border border-sky-500/30 flex items-center justify-between gap-4 shadow-lg shadow-sky-950/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-sky-300 uppercase tracking-wider block">
                  Course Assignment = Official Student Admission
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Select a student from the directory below, choose their desired course, set the tuition fee mode, and save to confirm their enrollment.
                </p>
              </div>
            </div>
            <Link
              to="/students/add"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold whitespace-nowrap transition hidden md:inline-flex items-center gap-1.5 shrink-0"
            >
              <span>+ Register New Student</span>
            </Link>
          </div>



          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Interactive Searchable Student Directory Selector */}
            <SearchableStudentSelect
              students={students}
              value={formData.studentId}
              onChange={handleChange}
              loading={loading.students}
              required
            />

            {/* STUDENT ACADEMIC PROFILE & PREVIOUS COURSE ADMISSIONS / PAYMENT HISTORY */}
            {formData.studentId && (
              <StudentAcademicHistoryCard
                history={studentHistory}
                loading={loadingHistory}
                expandedReceipts={expandedReceipts}
                onToggleReceipts={(admId) =>
                  setExpandedReceipts((prev) => ({ ...prev, [admId]: !prev[admId] }))
                }
                selectedStudentObj={selectedStudentObj}
              />
            )}

            {/* SEARCHABLE & CATEGORIZED ACADEMIC COURSE SELECTOR */}
            <SearchableCourseSelect
              courses={courses}
              value={formData.courseId}
              onChange={handleChange}
              disabled={loading.courses}
              required
              accentColor="sky"
            />
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
                  label: fm.feeModesName || fm.feeModeName || fm.fee_modes_name || fm.name || (fm.id === 1 ? "Monthly" : "Course Fees (Full / Lump sum)"),
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
                    <span>Assigning Course &amp; Enrolling...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>🎓 Assign Course &amp; Confirm Admission</span>
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
function SearchableStudentSelect({
  students = [],
  value,
  onChange,
  loading = false,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Selected student object
  const selectedStudent = useMemo(() => {
    if (!value) return null;
    return students.find((s) => String(s.id || s.studentId) === String(value));
  }, [students, value]);

  // Filtered students based on search query
  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase().trim();
    return students.filter((s) => {
      const name = (s.student_name || s.studentName || "").toLowerCase();
      const reg = (s.registration_number || s.registrationNumber || "").toLowerCase();
      const phone = (s.whatsapp || s.mobile || s.phone1 || s.phone2 || "").toLowerCase();
      const email = (s.email || "").toLowerCase();
      return name.includes(q) || reg.includes(q) || phone.includes(q) || email.includes(q);
    });
  }, [students, search]);

  const handleSelect = (s) => {
    onChange({ target: { name: "studentId", value: String(s.id || s.studentId) } });
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ target: { name: "studentId", value: "" } });
    setSearch("");
  };

  const getAvatarGradient = (name = "") => {
    const gradients = [
      "from-sky-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-rose-600",
      "from-blue-600 to-cyan-500",
      "from-violet-600 to-fuchsia-600",
      "from-teal-500 to-sky-600",
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return gradients[sum % gradients.length];
  };

  const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "ST";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {/* Hidden input for HTML form validation */}
      <input
        type="text"
        name="studentId"
        value={value || ""}
        required={required}
        onChange={() => {}}
        className="sr-only"
        tabIndex={-1}
      />

      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-sky-400" />
          <span>Student Directory</span>
          {required && <span className="text-rose-400">*</span>}
        </label>
        <span className="text-[11px] font-mono text-slate-400">
          {loading ? "Loading directory..." : `${students.length} Registered Students`}
        </span>
      </div>

      {/* Main Trigger Card */}
      <div className="relative">
        <div
          onClick={() => !loading && setIsOpen((prev) => !prev)}
          className={`w-full rounded-2xl border transition duration-200 cursor-pointer text-left select-none ${
            isOpen
              ? "border-sky-500 ring-2 ring-sky-500/20 bg-slate-900 shadow-xl"
              : selectedStudent
              ? "bg-gradient-to-r from-slate-900 via-slate-900/95 to-sky-950/30 border-sky-500/40 hover:border-sky-500/70 shadow-lg"
              : "bg-gray-950 border-gray-700 hover:border-gray-600 hover:bg-slate-900/50 shadow-inner"
          } p-3 sm:p-3.5`}
        >
          {loading ? (
            <div className="flex items-center gap-3 py-1">
              <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin shrink-0" />
              <span className="text-xs text-slate-400 font-medium">Loading student directory...</span>
            </div>
          ) : selectedStudent ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${getAvatarGradient(
                    selectedStudent.student_name || selectedStudent.studentName || ""
                  )} text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-md ring-1 ring-white/20`}
                >
                  {getInitials(selectedStudent.student_name || selectedStudent.studentName || "")}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-white text-sm sm:text-base truncate">
                      {selectedStudent.student_name || selectedStudent.studentName || "Student"}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-500/30 text-sky-300 font-mono text-[11px] font-semibold">
                      {selectedStudent.registration_number || selectedStudent.registrationNumber || "No Reg No"}
                    </span>

                    {(selectedStudent.whatsapp || selectedStudent.mobile) && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <Phone className="w-3 h-3" />
                        {selectedStudent.whatsapp || selectedStudent.mobile}
                      </span>
                    )}

                    {selectedStudent.email && (
                      <span className="text-[11px] text-slate-400 truncate hidden md:inline">
                        {selectedStudent.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear Selection"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="px-2.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 text-xs font-semibold flex items-center gap-1.5 border border-sky-500/30 transition cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Change</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 block">
                    Click to Search & Select Student
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Search by student name, CNAT reg number, or WhatsApp
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[11px] font-mono">
                  {students.length} available
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-sky-400" : ""}`} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Animated Dropdown Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-slate-900/98 backdrop-blur-2xl border border-slate-700/90 shadow-2xl shadow-black/95 overflow-hidden ring-1 ring-white/10"
            >
              {/* Dropdown Header with Search Box */}
              <div className="p-3 bg-slate-950/95 border-b border-slate-800 flex items-center gap-2.5">
                <Search className="w-4 h-4 text-sky-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name (e.g. Mehuly, Puja), CNAT reg no, or mobile..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50 shrink-0">
                  {filteredStudents.length} {filteredStudents.length === 1 ? "match" : "matches"}
                </span>
              </div>

              {/* Scrollable Student Items List */}
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50 p-1.5 custom-scrollbar">
                {filteredStudents.length === 0 ? (
                  <div className="py-8 px-4 text-center">
                    <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No students found</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      No registered student matches "{search}".
                    </p>
                    <div className="mt-3">
                      <Link
                        to="/students/student-admission"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-semibold transition"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                        Register New Student
                      </Link>
                    </div>
                  </div>
                ) : (
                  filteredStudents.map((s) => {
                    const studentIdStr = String(s.id || s.studentId);
                    const isCurrent = String(value) === studentIdStr;
                    const name = s.student_name || s.studentName || "Student";
                    const reg = s.registration_number || s.registrationNumber;
                    const phone = s.whatsapp || s.mobile || s.phone1;

                    return (
                      <div
                        key={studentIdStr}
                        onClick={() => handleSelect(s)}
                        className={`p-2.5 rounded-xl flex items-center justify-between gap-3 transition cursor-pointer ${
                          isCurrent
                            ? "bg-sky-500/20 border border-sky-500/40 text-white"
                            : "hover:bg-slate-800/80 border border-transparent text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getAvatarGradient(
                              name
                            )} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow ring-1 ring-white/10`}
                          >
                            {getInitials(name)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs sm:text-sm text-white truncate">
                                {name}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-500/30">
                                  Current
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 mt-0.5">
                              {reg && (
                                <span className="text-[11px] font-mono text-sky-300 font-semibold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                                  {reg}
                                </span>
                              )}
                              {phone && (
                                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-0.5">
                                  <Phone className="w-2.5 h-2.5 text-slate-500" />
                                  {phone}
                                </span>
                              )}
                              {s.email && (
                                <span className="text-[11px] text-slate-500 truncate hidden lg:inline">
                                  • {s.email}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isCurrent ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <span className="text-xs text-sky-400/70 hover:text-sky-300 font-semibold flex items-center gap-1">
                              Select <span className="text-sm">→</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Dropdown Footer */}
              <div className="p-2.5 bg-slate-950/90 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Showing {filteredStudents.length} of {students.length} students</span>
                <span className="text-slate-500 font-mono">ESC to dismiss</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// Searchable & Categorized Academic Course Selector Component
// ============================================================================
function SearchableCourseSelect({
  courses = [],
  value,
  onChange,
  disabled = false,
  required = false,
  accentColor = "sky",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectedCourse = useMemo(() => {
    if (!value) return null;
    return courses.find((c) => String(c.id || c.courseId) === String(value));
  }, [courses, value]);

  const getCourseCategory = (c) => {
    const code = (c.course_code || c.courseCode || "").toUpperCase();
    const name = (c.course_name || c.courseName || "").toLowerCase();

    if (
      code.includes("ICSE") ||
      code.includes("ISC") ||
      code.includes("CBSE") ||
      code.includes("WBCHSE") ||
      code.includes("SCHOOL")
    ) {
      return { id: "school", label: "School & Boards", icon: "🎓" };
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
      return { id: "accounting", label: "Accounts & Office", icon: "📊" };
    } else if (
      code.includes("AI") ||
      code.includes("ROBOT") ||
      name.includes("ai") ||
      name.includes("robotics")
    ) {
      return { id: "tech", label: "Advanced Tech", icon: "🤖" };
    } else {
      return { id: "software", label: "Software & Web", icon: "💻" };
    }
  };

  const categories = useMemo(() => [
    { id: "all", label: "All Courses", count: courses.length, icon: "📚" },
    { id: "software", label: "Software & Web", count: courses.filter((c) => getCourseCategory(c).id === "software").length, icon: "💻" },
    { id: "accounting", label: "Accounts & Office", count: courses.filter((c) => getCourseCategory(c).id === "accounting").length, icon: "📊" },
    { id: "school", label: "School & Boards", count: courses.filter((c) => getCourseCategory(c).id === "school").length, icon: "🎓" },
    { id: "tech", label: "Advanced Tech", count: courses.filter((c) => getCourseCategory(c).id === "tech").length, icon: "🤖" },
  ], [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const cat = getCourseCategory(c);
      if (activeCategory !== "all" && cat.id !== activeCategory) {
        return false;
      }
      if (!search.trim()) return true;

      const q = search.toLowerCase().trim();
      const name = (c.course_name || c.courseName || "").toLowerCase();
      const code = (c.course_code || c.courseCode || "").toLowerCase();
      const fee = String(c.courseFees || c.course_fees || "");
      const catLabel = cat.label.toLowerCase();

      return name.includes(q) || code.includes(q) || fee.includes(q) || catLabel.includes(q);
    });
  }, [courses, search, activeCategory]);

  const groupedFiltered = useMemo(() => {
    const groups = {};
    filteredCourses.forEach((c) => {
      const cat = getCourseCategory(c);
      const key = `${cat.icon} ${cat.label}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });
    return groups;
  }, [filteredCourses]);

  const handleSelect = (c) => {
    onChange({ target: { name: "courseId", value: String(c.id || c.courseId) } });
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ target: { name: "courseId", value: "" } });
    setSearch("");
  };

  const isEmerald = accentColor === "emerald";
  const ringAccent = isEmerald ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-sky-500 ring-2 ring-sky-500/20";
  const glowGradient = isEmerald
    ? "from-slate-900 via-slate-900/95 to-emerald-950/30 border-emerald-500/40 hover:border-emerald-500/70"
    : "from-slate-900 via-slate-900/95 to-sky-950/30 border-sky-500/40 hover:border-sky-500/70";
  const badgeClass = isEmerald
    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
    : "bg-sky-500/15 border-sky-500/30 text-sky-300";
  const iconColor = isEmerald ? "text-emerald-400" : "text-sky-400";
  const activeTabClass = isEmerald
    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
    : "bg-sky-500/20 border-sky-500/50 text-sky-200";

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {/* Hidden input for HTML5 form validation */}
      <input
        type="text"
        name="courseId"
        value={value || ""}
        required={required}
        onChange={() => {}}
        className="sr-only"
        tabIndex={-1}
      />

      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
          <BookOpen className={`w-4 h-4 ${iconColor}`} />
          <span>Select Academic Course Program</span>
          {required && <span className="text-rose-400">*</span>}
        </label>
        <span className="text-[11px] font-mono text-slate-400">
          {courses.length} Courses across 4 Categories
        </span>
      </div>

      {/* Main Trigger Box */}
      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className={`w-full rounded-2xl border transition duration-200 cursor-pointer text-left select-none ${
            isOpen
              ? `${ringAccent} bg-slate-900 shadow-xl`
              : selectedCourse
              ? `bg-gradient-to-r ${glowGradient} shadow-lg`
              : "bg-gray-950 border-gray-700 hover:border-gray-600 hover:bg-slate-900/50 shadow-inner"
          } p-3 sm:p-3.5 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {selectedCourse ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0 shadow-md">
                  {getCourseCategory(selectedCourse).icon}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-white text-sm sm:text-base truncate">
                      {selectedCourse.course_name || selectedCourse.courseName}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 flex-wrap text-xs">
                    <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] border ${badgeClass}`}>
                      {selectedCourse.course_code || selectedCourse.courseCode}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {getCourseCategory(selectedCourse).label}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-[11px]">
                      {Number(selectedCourse.feeModesId || selectedCourse.fee_modes_id) === 2 ? "Full Course Fee" : "Monthly Plan"}
                    </span>
                    <span className="font-extrabold text-emerald-400 font-mono text-xs">
                      ₹{Number(selectedCourse.courseFees || selectedCourse.course_fees || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear Selection"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${badgeClass}`}>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Change</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${isEmerald ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-sky-500/10 border-sky-500/20 text-sky-400"} border flex items-center justify-center shrink-0`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 block">
                    Click to Search &amp; Select Academic Course Program
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Choose from {courses.length} courses across Software, Accounts, School Boards &amp; Tech
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[11px] font-mono">
                  {courses.length} available
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 " + iconColor : ""}`} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-slate-900/98 backdrop-blur-2xl border border-slate-700/90 shadow-2xl shadow-black/95 overflow-hidden ring-1 ring-white/10"
            >
              {/* Search Bar Header */}
              <div className="p-3 bg-slate-950/95 border-b border-slate-800 flex items-center gap-2.5">
                <Search className={`w-4 h-4 ${iconColor} shrink-0`} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search course by name, code (e.g. JS01, RDBMS, TALLY), or category..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50 shrink-0">
                  {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
                </span>
              </div>

              {/* Category Filter Tabs */}
              <div className="p-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border ${
                      activeCategory === cat.id
                        ? activeTabClass
                        : "bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-70">({cat.count})</span>
                  </button>
                ))}
              </div>

              {/* Scrollable Course Items List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-3 custom-scrollbar">
                {filteredCourses.length === 0 ? (
                  <div className="py-8 px-4 text-center">
                    <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No courses match your search</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      No course found for "{search}". Try searching with a different term.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setSearch(""); setActiveCategory("all"); }}
                      className="mt-3 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  Object.entries(groupedFiltered).map(([groupTitle, courseList]) => (
                    <div key={groupTitle} className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between border-b border-slate-800/60">
                        <span>{groupTitle}</span>
                        <span className="text-[10px] text-slate-500 font-mono font-normal">
                          {courseList.length} {courseList.length === 1 ? "course" : "courses"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {courseList.map((c) => {
                          const courseIdStr = String(c.id || c.courseId);
                          const isCurrent = String(value) === courseIdStr;
                          const name = c.course_name || c.courseName;
                          const code = c.course_code || c.courseCode;
                          const fee = Number(c.courseFees || c.course_fees || 0);
                          const isLump = Number(c.feeModesId || c.fee_modes_id) === 2;

                          return (
                            <div
                              key={courseIdStr}
                              onClick={() => handleSelect(c)}
                              className={`p-2.5 rounded-xl flex items-center justify-between gap-3 transition cursor-pointer ${
                                isCurrent
                                  ? `${badgeClass} bg-opacity-20 border`
                                  : "hover:bg-slate-800/80 border border-transparent text-slate-200"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs ${iconColor} shrink-0`}>
                                  {code ? code.substring(0, 3) : "CRS"}
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs sm:text-sm text-white truncate">
                                      {name}
                                    </span>
                                    {isCurrent && (
                                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-500/30">
                                        Selected
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                                      [{code}]
                                    </span>
                                    <span className="text-[10px] text-purple-300 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/20 font-medium">
                                      {isLump ? "Course Fee" : "Monthly Plan"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                  <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-400 block">
                                    ₹{fee.toLocaleString()}
                                  </span>
                                  <span className="text-[10px] text-slate-500 block">
                                    {isLump ? "Total Fee" : "Est. Rate"}
                                  </span>
                                </div>

                                {isCurrent ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <span className="text-xs text-slate-500 group-hover:text-slate-300">
                                    Select →
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Dropdown Footer */}
              <div className="p-2.5 bg-slate-950/90 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Showing {filteredCourses.length} of {courses.length} courses</span>
                <span className="text-slate-500 font-mono">ESC to dismiss</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

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

// ============================================================================
// Student Academic Profile & Previous Course Admissions History Card
// ============================================================================
function StudentAcademicHistoryCard({
  history,
  loading,
  expandedReceipts = {},
  onToggleReceipts,
  selectedStudentObj,
}) {
  const student = history?.student || (selectedStudentObj ? {
    studentName: selectedStudentObj.student_name || selectedStudentObj.studentName,
    registrationNumber: selectedStudentObj.registration_number || selectedStudentObj.registrationNumber,
    whatsapp: selectedStudentObj.whatsapp,
    phone1: selectedStudentObj.phone1 || selectedStudentObj.phone,
    email: selectedStudentObj.email,
    district: selectedStudentObj.district?.district_name || selectedStudentObj.district,
    state: selectedStudentObj.state?.state_name || selectedStudentObj.state,
  } : null);

  if (!student) return null;

  const initials = (student.studentName || "ST")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const hasAdmissions = history?.hasPreviousAdmissions && Array.isArray(history?.admissions) && history.admissions.length > 0;
  const admissions = hasAdmissions ? history.admissions : [];
  const stats = history?.overallStats || { totalAgreedFees: 0, totalPaidAmount: 0, totalBalanceDue: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-sky-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-sky-950/25 p-4 sm:p-5 shadow-2xl backdrop-blur-xl space-y-4"
    >
      {/* Top Student Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center shadow-lg shadow-sky-900/30 shrink-0 ring-2 ring-white/10">
            {initials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white truncate">
                {student.studentName}
              </h3>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-800 text-sky-300 border border-sky-500/30 font-bold tracking-wider">
                {student.registrationNumber || "ID-" + (student.id || "")}
              </span>
            </div>

            {/* Sub-pills: WhatsApp, Phone, Location */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap text-xs">
              {student.whatsapp && (
                <a
                  href={`https://wa.me/91${String(student.whatsapp).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30 transition cursor-pointer"
                  title="Open in WhatsApp"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{student.whatsapp}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}

              {student.phone1 && student.phone1 !== student.whatsapp && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                  <span>📞 {student.phone1}</span>
                </span>
              )}

              {student.email && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                  <Mail className="w-3 h-3 text-sky-400" />
                  <span className="truncate max-w-[150px]">{student.email}</span>
                </span>
              )}

              {(student.city || student.district) && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/40">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{[student.city, student.district].filter(Boolean).join(", ")}</span>
                </span>
              )}

              {student.guardianName && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/40">
                  <span>Guardian: {student.guardianName} ({student.guardianRelation || "Parent"})</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Status Badge */}
        <div className="shrink-0 self-start sm:self-center">
          {loading ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800 text-sky-300 border border-slate-700 text-xs font-semibold">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
              <span>Fetching Records...</span>
            </div>
          ) : hasAdmissions ? (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs flex items-center gap-1.5 shadow-sm">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>{admissions.length} Enrolled Course{admissions.length > 1 ? "s" : ""}</span>
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>First-Time Admission Candidate</span>
            </span>
          )}
        </div>
      </div>

      {/* Loading state skeleton */}
      {loading && !history && (
        <div className="py-4 text-center space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin text-sky-400 mx-auto" />
          <p className="text-xs text-slate-300 font-semibold">Loading student's previous courses and payment ledger...</p>
        </div>
      )}

      {/* Case 1: Student has previous course admissions */}
      {!loading && hasAdmissions && (
        <div className="space-y-4">
          {/* Overall Financial Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 shadow-inner">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Courses</span>
              <span className="text-base sm:text-lg font-black text-white">{admissions.length}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 shadow-inner">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Fees Chargeable to Date</span>
              <span className="text-base sm:text-lg font-mono font-bold text-slate-200">₹{Number(stats.totalAgreedFees || 0).toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/30 shadow-inner">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">Total Paid to Date</span>
              <span className="text-base sm:text-lg font-mono font-black text-emerald-400">₹{Number(stats.totalPaidAmount || 0).toLocaleString()}</span>
            </div>

            <div className={`p-3 rounded-xl ${Number(stats.totalBalanceDue) > 0 ? "bg-rose-950/25 border border-rose-500/30" : "bg-emerald-950/15 border border-emerald-500/20"} shadow-inner`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Outstanding Balance</span>
              <span className={`text-base sm:text-lg font-mono font-black ${Number(stats.totalBalanceDue) > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                ₹{Number(stats.totalBalanceDue || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Previous Course Cards List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold px-0.5">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-sky-400">
                <Layers className="w-3.5 h-3.5" />
                Previous Enrolled Courses &amp; Payment Ledger
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {admissions.length} course record{admissions.length > 1 ? "s" : ""} found
              </span>
            </div>

            {admissions.map((adm, index) => {
              const course = adm.course || {};
              const fin = adm.financials || {};
              const feeMode = adm.feeMode || {};
              const receipts = adm.receipts || [];
              const isExpanded = !!expandedReceipts[adm.admissionId || index];

              return (
                <div
                  key={adm.admissionId || index}
                  className="rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition p-3.5 space-y-3 shadow-md"
                >
                  {/* Course Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {course.courseCode ? course.courseCode.substring(0, 3) : "CRS"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-sm text-white truncate">
                            {course.courseName}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            [{course.courseCode}]
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {adm.courseStatus?.statusName || "Ongoing"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 flex-wrap">
                          <span className="font-mono font-semibold text-amber-300">
                            Adm No: {adm.admissionNumber || "—"}
                          </span>
                          <span>•</span>
                          <span>
                            Admitted: {adm.admissionDate ? new Date(adm.admissionDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </span>
                          {adm.completionDate && (
                            <>
                              <span>•</span>
                              <span>Target Completion: {new Date(adm.completionDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Fee Mode & Agreed Fee Badge */}
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-300">
                        {feeMode.modeName || (feeMode.isMonthly ? "Monthly" : "Course Fee")}
                      </span>
                      <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                        ₹{Number(adm.agreedFee || 0).toLocaleString()}
                        {feeMode.isMonthly ? "/mo" : " total"}
                      </span>
                    </div>
                  </div>

                  {/* Payment Progress & Monthly/Lump details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    {/* Progress Bar & Amount Paid */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">
                          {feeMode.isMonthly ? `Fees Paid (${fin.elapsedMonths || 1} mos chargeable):` : "Fees Paid Progress:"}
                        </span>
                        <span className="font-mono font-bold text-white">
                          <strong className="text-emerald-400">₹{Number(fin.totalPaid || 0).toLocaleString()}</strong>
                          {" / "}
                          <span className="text-slate-300">₹{Number(fin.chargeableFee || fin.totalCourseFee || adm.agreedFee || 0).toLocaleString()}</span>
                          {` (${fin.paymentPercentage || 0}%)`}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-500 rounded-full"
                          style={{ width: `${Math.min(100, fin.paymentPercentage || 0)}%` }}
                        />
                      </div>
                    </div>

                    {/* Due / Monthly schedule indicator */}
                    <div className="space-y-1">
                      {feeMode.isMonthly ? (
                        <div className="flex items-center justify-between gap-2 flex-wrap text-[11px]">
                          <div>
                            <span className="text-slate-400">Cleared Months: </span>
                            <span className="font-semibold text-emerald-400">
                              {fin.clearedMonthsCount > 0 ? `${fin.clearedMonthsCount} mo (${fin.clearedMonthsText})` : "None yet"}
                            </span>
                          </div>
                          {Number(fin.balanceDue) > 0 ? (
                            <div className="px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-[10px] flex items-center gap-1">
                              <span>⚠️ Balance Due: ₹{Number(fin.balanceDue).toLocaleString()}</span>
                              {fin.nextDueMonth && <span>(from {fin.nextDueMonth})</span>}
                            </div>
                          ) : (
                            <div className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                              ✓ All Months Cleared to Date
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Remaining Balance Due:</span>
                          <span className={`font-mono font-bold ${Number(fin.balanceDue) > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                            {Number(fin.balanceDue) > 0 ? `₹${Number(fin.balanceDue).toLocaleString()}` : "Fully Cleared ✓"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Receipts Dropdown Toggle */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => onToggleReceipts(adm.admissionId || index)}
                      className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold transition cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>
                        Payment Receipts History ({receipts.length} record{receipts.length !== 1 ? "s" : ""})
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 space-y-2 animate-fadeIn">
                        {receipts.length === 0 ? (
                          <div className="p-3 rounded-lg bg-slate-900 text-slate-400 text-xs italic border border-slate-800">
                            No payment receipts generated for this admission record yet.
                          </div>
                        ) : (
                          <div className="overflow-x-auto rounded-xl border border-slate-800">
                            <table className="w-full text-left text-xs text-slate-300">
                              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                                <tr>
                                  <th className="p-2.5">Receipt #</th>
                                  <th className="p-2.5">Date</th>
                                  <th className="p-2.5">Mode</th>
                                  <th className="p-2.5 text-right">Amount (₹)</th>
                                  <th className="p-2.5">Coverage Period</th>
                                  <th className="p-2.5">Collected By</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                                {receipts.map((rcpt) => (
                                  <tr key={rcpt.receiptId || rcpt.receiptNo} className="hover:bg-slate-800/40">
                                    <td className="p-2.5 font-mono text-sky-400 font-bold">{rcpt.receiptNo}</td>
                                    <td className="p-2.5 text-slate-300">{rcpt.paymentDate || "—"}</td>
                                    <td className="p-2.5">
                                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                                        {rcpt.paymentMode}
                                      </span>
                                    </td>
                                    <td className="p-2.5 text-right font-mono font-black text-emerald-400">
                                      ₹{Number(rcpt.amountPaid || 0).toLocaleString()}
                                    </td>
                                    <td className="p-2.5 text-slate-300">{rcpt.coveragePeriod || "—"}</td>
                                    <td className="p-2.5 text-slate-400">{rcpt.collectedBy || "Staff"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Case 2: First-time student with 0 previous course admissions */}
      {!loading && !hasAdmissions && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3.5 shadow-inner">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>First-Time Academic Enrollment</span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                New Candidate
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              <strong>{student.studentName}</strong> is registered in the directory but has not yet been assigned to any course program. Selecting an academic course below and confirming will create their official initial admission record.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default StudentAdmission;