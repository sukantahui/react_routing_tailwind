// src/components/FeePaymentsList.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";
import * as htmlToImage from "html-to-image";
import {
  Search,
  RefreshCw,
  Download,
  Printer,
  Calendar,
  IndianRupee,
  Receipt,
  User,
  Users,
  BookOpen,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Wallet,
  ArrowUpDown,
  FileText,
  ExternalLink,
  X,
  Copy,
  MessageCircle,
  Camera,
  Plus,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import api from "../api/api";
import { loginService } from "../services/loginService";
import { studentService } from "../services/studentService";
import CNATLogo from "../../public/assets/cnat.png";
import paidStamp from "../assets/images/paid-stamp.png";
import CNATQR from "../../public/assets/CNAT_QR.jpeg";
import QRCode from "qrcode";

export default function FeePaymentsList() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortField, setSortField] = useState("date"); // 'date' | 'amount'
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' | 'asc'
  const [activeTab, setActiveTab] = useState("ALL"); // 'ALL' | 'MONTHLY' | 'NON_MONTHLY' | 'CASH' | 'UPI' | 'TODAY'
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState(null);

  // User & Branding States for Official Voucher
  const [currentUser, setCurrentUser] = useState(null);
  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [paidStampDataUrl, setPaidStampDataUrl] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);
  const receiptCardRef = useRef(null);

  // Fresh Payment Recording State for Already Admitted Students
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
  const [admissionsList, setAdmissionsList] = useState([]);
  const [loadingAdmissions, setLoadingAdmissions] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [studentSearchTerm, setStudentSearchTerm] = useState("");

  // Student Fee Ledger States (Based on Admission ID)
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [loadingLedger, setLoadingLedger] = useState(false);
  const [showLedgerModal, setShowLedgerModal] = useState(false);
  const [showLedgerSelectorModal, setShowLedgerSelectorModal] = useState(false);
  const [ledgerSearchTerm, setLedgerSearchTerm] = useState("");

  // Student & Course-wise Due List States
  const [showDueListModal, setShowDueListModal] = useState(false);
  const [loadingDues, setLoadingDues] = useState(false);
  const [duesData, setDuesData] = useState({ summary: {}, students: [], enrollments: [] });
  const [duesViewMode, setDuesViewMode] = useState("STUDENT"); // 'STUDENT' | 'COURSE'
  const [duesFilter, setDuesFilter] = useState("DUES_ONLY"); // 'DUES_ONLY' | 'ALL' | 'MULTI_COURSE' | 'MONTHLY' | 'LUMPSUM' | 'CLEARED'
  const [duesSearchTerm, setDuesSearchTerm] = useState("");
  const [expandedStudents, setExpandedStudents] = useState({});

  // Live Comprehensive Filter for Student Ledger Modal (Admission ID, Admission No, Reg No, Student Name, Phone, Course)
  const filteredAdmissions = useMemo(() => {
    if (!ledgerSearchTerm.trim()) return admissionsList;
    const term = ledgerSearchTerm.trim().toLowerCase();
    const cleanNum = term.replace(/^#/, "");
    return admissionsList.filter((adm) => {
      const sName = (adm.student?.studentName || adm.student?.student_name || "").toLowerCase();
      const admNo = (adm.admissionNumber || "").toLowerCase();
      const sReg = (adm.student?.registrationNumber || adm.student?.registration_number || "").toLowerCase();
      const sPhone = (adm.student?.whatsapp || adm.student?.phone1 || "").toLowerCase();
      const cName = (adm.course?.courseName || adm.course?.course_name || "").toLowerCase();
      const cCode = (adm.course?.courseCode || adm.course?.course_code || "").toLowerCase();
      const admId = String(adm.admissionId || adm.id || "");

      return (
        admId === cleanNum ||
        admId.includes(cleanNum) ||
        admNo.includes(term) ||
        sReg.includes(term) ||
        sName.includes(term) ||
        sPhone.includes(term) ||
        cName.includes(term) ||
        cCode.includes(term)
      );
    });
  }, [admissionsList, ledgerSearchTerm]);

  // Load Base64 Images for popup print window reliability & offline rendering
  useEffect(() => {
    const loadImagesAsDataUrls = async () => {
      try {
        const logoRes = await fetch(CNATLogo);
        const logoBlob = await logoRes.blob();
        const logoReader = new FileReader();
        logoReader.onloadend = () => setLogoDataUrl(logoReader.result);
        logoReader.readAsDataURL(logoBlob);

        const stampRes = await fetch(paidStamp);
        const stampBlob = await stampRes.blob();
        const stampReader = new FileReader();
        stampReader.onloadend = () => setPaidStampDataUrl(stampReader.result);
        stampReader.readAsDataURL(stampBlob);

        const qrRes = await fetch(CNATQR);
        const qrBlob = await qrRes.blob();
        const qrReader = new FileReader();
        qrReader.onloadend = () => setQrCodeDataUrl(qrReader.result);
        qrReader.readAsDataURL(qrBlob);
      } catch (err) {
        console.error("Error pre-loading voucher images:", err);
      }
    };
    loadImagesAsDataUrls();
  }, []);

  // Fetch current user details for collector signature/info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await loginService.currentUser();
        if (res?.status && res.data) {
          setCurrentUser(res.data);
        }
      } catch {
        try {
          const raw = localStorage.getItem("user");
          if (raw) setCurrentUser(JSON.parse(raw));
        } catch {
          // Ignored storage error
        }
      }
    };
    fetchUser();
  }, []);

  // Fetch receipts from backend
  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/fees-receipts");
      let list = [];
      if (res.data?.status && Array.isArray(res.data.data)) {
        list = res.data.data;
      } else if (Array.isArray(res.data?.data)) {
        list = res.data.data;
      } else if (Array.isArray(res.data)) {
        list = res.data;
      }
      setReceipts(list);
    } catch (err) {
      console.error("Error loading fee receipts:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Payments",
        text: err.response?.data?.message || "Could not retrieve fee receipts from server.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  // Filter and Sort Receipts
  const filteredReceipts = useMemo(() => {
    return receipts
      .filter((r) => {
        // Quick Active Tab Filter
        if (activeTab === "MONTHLY") {
          const type = (r.feeType || r.fee_type || "").toLowerCase();
          if (type !== "monthly") return false;
        } else if (activeTab === "NON_MONTHLY") {
          const type = (r.feeType || r.fee_type || "").toLowerCase();
          if (type === "monthly") return false;
        } else if (activeTab === "CASH") {
          const mode = (r.paymentMode || r.payment_mode || "").toLowerCase();
          if (mode !== "cash") return false;
        } else if (activeTab === "UPI") {
          const mode = (r.paymentMode || r.payment_mode || "").toLowerCase();
          if (!mode.includes("upi") && !mode.includes("online")) return false;
        } else if (activeTab === "TODAY") {
          const todayStr = new Date().toISOString().split("T")[0];
          const pDate = (r.paymentDate || r.payment_date || r.createdAt || "").split("T")[0];
          if (pDate !== todayStr) return false;
        }

        // Search text matching across all student and receipt attributes
        const q = searchTerm.toLowerCase().trim();
        if (q) {
          const rNo = (r.receiptNo || r.receipt_no || "").toLowerCase();
          const sName = (r.studentName || r.student_name || r.student?.student_name || "").toLowerCase();
          const sReg = (r.registrationNumber || r.registration_number || r.student?.registration_number || "").toLowerCase();
          const phone = (r.studentPhone || r.phone || r.student?.whatsapp || r.student?.phone || "").toLowerCase();
          const cName = (r.courseName || r.course_name || r.course?.course_name || "").toLowerCase();
          const mode = (r.paymentMode || r.payment_mode || "").toLowerCase();
          const period = (r.coveragePeriodText || "").toLowerCase();

          const matches =
            rNo.includes(q) ||
            sName.includes(q) ||
            sReg.includes(q) ||
            phone.includes(q) ||
            cName.includes(q) ||
            mode.includes(q) ||
            period.includes(q);

          if (!matches) return false;
        }

        // Payment Mode Filter
        if (modeFilter !== "ALL") {
          const mode = (r.paymentMode || r.payment_mode || "").toLowerCase();
          if (modeFilter.toLowerCase() !== mode) return false;
        }

        // Fee Type Filter
        if (typeFilter !== "ALL") {
          const type = (r.feeType || r.fee_type || "").toLowerCase();
          if (typeFilter.toLowerCase() !== type) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortField === "amount") {
          const amtA = Number(a.amountPaid || a.amount_paid || 0);
          const amtB = Number(b.amountPaid || b.amount_paid || 0);
          return sortOrder === "asc" ? amtA - amtB : amtB - amtA;
        }
        // Default Sort by Payment Date
        const dateA = new Date(a.paymentDate || a.payment_date || a.createdAt || a.created_at).getTime();
        const dateB = new Date(b.paymentDate || b.payment_date || b.createdAt || b.created_at).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [receipts, activeTab, searchTerm, modeFilter, typeFilter, sortField, sortOrder]);

  // Overall Financial Statistics
  const stats = useMemo(() => {
    let totalAmount = 0;
    let cashAmount = 0;
    let cashCount = 0;
    let upiAmount = 0;
    let upiCount = 0;
    let bankAmount = 0;
    let monthlyTotal = 0;
    let monthlyCount = 0;
    let lumpSumTotal = 0;
    let lumpSumCount = 0;
    let todayCount = 0;
    let todayAmount = 0;

    const todayStr = new Date().toISOString().split("T")[0];

    receipts.forEach((r) => {
      const amt = Number(r.amountPaid || r.amount_paid || 0);
      const mode = (r.paymentMode || r.payment_mode || "").toLowerCase();
      const type = (r.feeType || r.fee_type || "").toLowerCase();
      const pDate = (r.paymentDate || r.payment_date || r.createdAt || "").split("T")[0];

      totalAmount += amt;

      if (mode === "cash") {
        cashAmount += amt;
        cashCount++;
      } else if (mode.includes("upi") || mode.includes("online")) {
        upiAmount += amt;
        upiCount++;
      } else {
        bankAmount += amt;
      }

      if (type === "monthly") {
        monthlyTotal += amt;
        monthlyCount++;
      } else {
        lumpSumTotal += amt;
        lumpSumCount++;
      }

      if (pDate === todayStr) {
        todayCount++;
        todayAmount += amt;
      }
    });

    return {
      totalCount: receipts.length,
      totalAmount,
      cashAmount,
      cashCount,
      upiAmount,
      upiCount,
      bankAmount,
      monthlyTotal,
      monthlyCount,
      lumpSumTotal,
      lumpSumCount,
      todayCount,
      todayAmount,
    };
  }, [receipts]);

  // Filtered total for currently visible subset
  const filteredTotalAmount = useMemo(() => {
    return filteredReceipts.reduce(
      (sum, r) => sum + Number(r.amountPaid || r.amount_paid || 0),
      0
    );
  }, [filteredReceipts]);

  // Copy receipt number to clipboard
  const handleCopyReceipt = (receiptNo) => {
    navigator.clipboard.writeText(receiptNo);
    setCopyFeedback(receiptNo);
    setTimeout(() => setCopyFeedback(null), 1500);
  };

  // Export to Excel
  const handleExportExcel = () => {
    if (filteredReceipts.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Data to Export",
        text: "There are no payment receipts matching your current filters.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const exportRows = filteredReceipts.map((r, i) => ({
      "SL #": i + 1,
      "Receipt Number": r.receiptNo || r.receipt_no,
      "Payment Date": r.paymentDate ? new Date(r.paymentDate).toLocaleDateString() : "",
      "Student Name": r.studentName || r.student_name,
      "Registration Number": r.registrationNumber || r.registration_number,
      "Course Program": r.courseName || r.course_name,
      "Fee Type": (r.feeType || r.fee_type) === "monthly" ? "Monthly" : "Course Fees (Lump sum)",
      "Payment Mode": r.paymentMode || r.payment_mode,
      "Amount Paid (₹)": Number(r.amountPaid || r.amount_paid || 0),
      "Coverage Period": formatPeriodCoverage(r),
      "Collected By": r.collectedBy || "Admin",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Payments");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, `CNAT_Fee_Payments_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // Print Table
  const handlePrintTable = () => {
    window.print();
  };

  // Convert Number to Words (Indian numbering system: Crore, Lakh, Thousand, Hundred)
  const numberToWords = (num) => {
    if (!num || isNaN(num)) return "";
    num = Math.floor(Number(num));
    if (num === 0) return "Zero Only";

    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const convertBelowHundred = (n) => {
      if (n === 0) return "";
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    };

    const convertBelowThousand = (n) => {
      if (n === 0) return "";
      if (n < 100) return convertBelowHundred(n);
      const hundredPart = Math.floor(n / 100);
      const remainder = n % 100;
      return ones[hundredPart] + " Hundred" + (remainder ? " and " + convertBelowHundred(remainder) : "");
    };

    let result = "";
    let remaining = num;

    if (remaining >= 10000000) {
      const crores = Math.floor(remaining / 10000000);
      result += convertBelowHundred(crores) + " Crore";
      remaining %= 10000000;
      if (remaining > 0) result += " ";
    }
    if (remaining >= 100000) {
      const lakhs = Math.floor(remaining / 100000);
      result += convertBelowHundred(lakhs) + " Lakh";
      remaining %= 100000;
      if (remaining > 0) result += " ";
    }
    if (remaining >= 1000) {
      const thousands = Math.floor(remaining / 1000);
      result += convertBelowThousand(thousands) + " Thousand";
      remaining %= 1000;
      if (remaining > 0) result += " ";
    }
    if (remaining > 0) {
      result += convertBelowThousand(remaining);
    }
    return result + " Only";
  };

  // Collector Helpers
  const getCollectorName = () => {
    if (selectedReceipt?.collectedBy || selectedReceipt?.collected_by) {
      return selectedReceipt.collectedBy || selectedReceipt.collected_by;
    }
    if (currentUser?.student_name || currentUser?.name) {
      return currentUser.student_name || currentUser.name;
    }
    if (currentUser?.email) {
      return currentUser.email.split("@")[0];
    }
    return "Accounts Section";
  };

  const getCollectorDesignation = () => {
    if (selectedReceipt?.collectorDesignation || selectedReceipt?.collector_designation) {
      return selectedReceipt.collectorDesignation || selectedReceipt.collector_designation;
    }
    if (currentUser?.role || (currentUser?.userType && currentUser.userType.userTypeName)) {
      return currentUser.role || currentUser.userType.userTypeName;
    }
    return "Accounts Department";
  };

  // Open Record New Payment Modal & load student admissions
  const handleOpenNewPaymentModal = async () => {
    setShowNewPaymentModal(true);
    setStudentSearchTerm("");
    if (admissionsList.length === 0) {
      setLoadingAdmissions(true);
      try {
        const res = await api.get("/admissions");
        const list = res?.data?.data || res?.data || [];
        const validAdmissions = Array.isArray(list) ? list.filter((a) => a.student && a.course) : [];
        setAdmissionsList(validAdmissions);
      } catch (err) {
        console.error("Failed to load admissions:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to load admissions",
          text: "Could not load admitted students. Please try again.",
          background: "#0f172a",
          color: "#f8fafc",
        });
      } finally {
        setLoadingAdmissions(false);
      }
    }
  };

  // Real-time ledger calculation for an admitted student
  const getAdmissionLedger = (admission) => {
    if (!admission || !admission.student || !admission.course) return null;

    const studentId = admission.student.id;
    const courseId = admission.course.id;
    const isMonthly = Number(admission.feeModesId) === 1 || admission.feeModeName?.toLowerCase().includes("monthly");
    const rateOrFee = Number(admission.courseFees || admission.course?.courseFees || 600);

    const studentReceipts = receipts.filter(
      (r) =>
        (r.studentId === studentId || r.student_id === studentId) &&
        (r.courseId === courseId || r.course_id === courseId)
    );

    const previousPaid = studentReceipts.reduce(
      (sum, r) => sum + Number(r.amountPaid || r.amount_paid || 0),
      0
    );

    if (isMonthly) {
      const monthlyRate = rateOrFee > 0 ? rateOrFee : 600;
      const monthsCleared = Math.floor(previousPaid / monthlyRate);
      const admDate = new Date(admission.admissionDate || new Date());

      const clearedMonthsList = [];
      for (let i = 0; i < monthsCleared; i++) {
        const m = new Date(admDate);
        m.setMonth(m.getMonth() + i);
        clearedMonthsList.push(m.toLocaleDateString("en-IN", { month: "long", year: "numeric" }));
      }

      const nextD = new Date(admDate);
      nextD.setMonth(nextD.getMonth() + monthsCleared);
      const nextDueMonth = nextD.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

      return {
        isMonthly: true,
        monthlyRate,
        previousPaid,
        monthsCleared,
        clearedMonthsList,
        nextDueMonth,
        suggestedAmount: monthlyRate,
        admissionDate: admission.admissionDate,
      };
    } else {
      const totalCourseFee = rateOrFee;
      const balanceDue = Math.max(0, totalCourseFee - previousPaid);
      return {
        isMonthly: false,
        totalCourseFee,
        previousPaid,
        balanceDue,
        suggestedAmount: balanceDue,
        isPaidInFull: balanceDue <= 0,
        admissionDate: admission.admissionDate,
      };
    }
  };

  // Handle selecting an admission in the recording modal
  const handleSelectAdmission = (adm) => {
    setSelectedAdmission(adm);
    const ledger = getAdmissionLedger(adm);
    if (ledger) {
      setPaymentAmount(ledger.suggestedAmount > 0 ? ledger.suggestedAmount.toString() : "");
    }
  };

  // Compute which months will be cleared by entered amount
  const getMonthsClearedByEnteredAmount = (ledger, amount) => {
    if (!ledger || !ledger.isMonthly || !amount || Number(amount) <= 0) return [];
    const count = Math.floor(Number(amount) / ledger.monthlyRate);
    if (count <= 0) return [];

    const admDate = new Date(ledger.admissionDate || new Date());
    const startOffset = ledger.monthsCleared;
    const months = [];
    for (let i = 0; i < count; i++) {
      const m = new Date(admDate);
      m.setMonth(m.getMonth() + startOffset + i);
      months.push(m.toLocaleDateString("en-IN", { month: "long", year: "numeric" }));
    }
    return months;
  };

  // Handle submitting fresh fee payment
  const handleRecordPaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAdmission) {
      Swal.fire({
        icon: "warning",
        title: "Select Student",
        text: "Please select an admitted student first.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }
    const amt = Number(paymentAmount);
    if (!amt || amt <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Amount",
        text: "Please enter a valid payment amount.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const ledger = getAdmissionLedger(selectedAdmission);
    if (ledger?.isMonthly && amt < ledger.monthlyRate) {
      Swal.fire({
        icon: "warning",
        title: "Amount Less than Monthly Fee",
        text: `Monthly installment is ₹${ledger.monthlyRate}. Amount paid cannot be less than ₹${ledger.monthlyRate}.`,
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    setIsSubmittingPayment(true);
    try {
      const payload = {
        student_id: selectedAdmission.student.id,
        course_id: selectedAdmission.course.id,
        fee_type: ledger?.isMonthly ? "monthly" : "non_monthly",
        amount_paid: amt,
        payment_date: paymentDate,
        payment_mode: paymentMode,
      };

      const res = await api.post("/fees-receipts", payload);
      const createdReceipt = res?.data?.data || res?.data;

      // Refresh receipts table
      await fetchReceipts();

      setShowNewPaymentModal(false);
      setSelectedAdmission(null);
      setPaymentAmount("");

      Swal.fire({
        icon: "success",
        title: "Fee Payment Recorded!",
        text: `Receipt #${createdReceipt?.receiptNo || createdReceipt?.receipt_no || "Issued"} recorded successfully. Opening voucher...`,
        timer: 1600,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#f8fafc",
      });

      // Automatically open newly created receipt in Voucher Modal!
      if (createdReceipt) {
        setSelectedReceipt(createdReceipt);
      }
    } catch (err) {
      console.error("Failed to record fee payment:", err);
      const errMsg = err.response?.data?.message || err.response?.data?.data || "Failed to record payment. Please check required fields.";
      Swal.fire({
        icon: "error",
        title: "Payment Recording Failed",
        text: typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg),
        background: "#0f172a",
        color: "#f8fafc",
      });
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  // Open & Fetch complete student ledger by Admission ID
  const handleOpenLedgerForAdmission = async (admissionId) => {
    if (!admissionId) return;
    setLoadingLedger(true);
    try {
      const res = await api.get(`/admissions/${admissionId}/ledger`);
      if (res?.data?.status && res?.data?.data) {
        setSelectedLedger(res.data.data);
        setShowLedgerSelectorModal(false);
        setShowLedgerModal(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Ledger Not Found",
          text: res?.data?.message || "Could not load student fee ledger.",
          background: "#0f172a",
          color: "#f8fafc",
        });
      }
    } catch (err) {
      console.error("Failed to load student ledger:", err);
      Swal.fire({
        icon: "error",
        title: "Ledger Error",
        text: err.response?.data?.message || "Failed to load student fee ledger. Please verify Admission ID.",
        background: "#0f172a",
        color: "#f8fafc",
      });
    } finally {
      setLoadingLedger(false);
    }
  };

  // Open ledger directly from a receipt object
  const handleOpenLedgerForReceipt = async (receipt) => {
    if (!receipt) return;
    const sId = receipt.studentId || receipt.student_id;
    const cId = receipt.courseId || receipt.course_id;

    // 1. Try finding in admissionsList
    let adm = admissionsList.find(
      (a) => (a.student?.id === sId || a.studentId === sId) && (a.course?.id === cId || a.courseId === cId)
    );

    // 2. If admissionsList not loaded or not found, fetch admissions first
    if (!adm) {
      try {
        const res = await api.get("/admissions");
        const list = res?.data?.data || res?.data || [];
        const validList = Array.isArray(list) ? list.filter((a) => a.student && a.course) : [];
        setAdmissionsList(validList);
        adm = validList.find(
          (a) => (a.student?.id === sId || a.studentId === sId) && (a.course?.id === cId || a.courseId === cId)
        );
      } catch (err) {
        console.error("Error fetching admissions for receipt ledger:", err);
      }
    }

    const admId = adm?.admissionId || adm?.id;
    if (admId) {
      handleOpenLedgerForAdmission(admId);
    } else {
      try {
        const res = await api.get(`/students/${sId}/admissions`);
        const studAdms = res?.data?.data || res?.data || [];
        const found = studAdms.find((a) => a.courseId === cId || a.course_id === cId || a.course?.id === cId);
        if (found && (found.id || found.admissionId)) {
          handleOpenLedgerForAdmission(found.id || found.admissionId);
          return;
        }
      } catch (err) {
        console.error("Fallback student admissions error:", err);
      }
      Swal.fire({
        icon: "warning",
        title: "Admission Record Not Found",
        text: "Could not locate an active admission record for this student and course.",
        background: "#0f172a",
        color: "#f8fafc",
      });
    }
  };

  // Share Ledger Statement via WhatsApp
  const handleSendLedgerWhatsApp = (ledger) => {
    if (!ledger) return;
    const s = ledger.student;
    const phone = s?.whatsapp || s?.phone;
    if (!phone) {
      Swal.fire({
        icon: "warning",
        title: "No WhatsApp Number",
        text: "Student does not have a WhatsApp number registered.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    let text = `🏛️ *CODER & ACCOTAX (CNAT)*\n`;
    text += `📋 *Official Student Fee Ledger Statement*\n\n`;
    text += `👤 *Student Name:* ${s.name}\n`;
    text += `🆔 *Registration #:* ${s.registrationNumber || "N/A"}\n`;
    text += `📝 *Admission #:* ${ledger.admission?.admissionNumber} (ID: #${ledger.admission?.admissionId})\n`;
    text += `📚 *Course:* ${ledger.course?.name}\n`;
    text += `📅 *Admission Date:* ${ledger.admission?.admissionDate}\n`;
    text += `💰 *Fee Plan:* ${ledger.admission?.feeMode} (${ledger.admission?.isMonthly ? "₹" + ledger.summary?.monthlyRate + "/mo" : "₹" + ledger.summary?.totalCourseFee + " Total"})\n\n`;

    text += `📊 *Account Summary:*\n`;
    text += `• *Total Cumulative Paid:* ₹${ledger.summary?.totalPaid?.toLocaleString("en-IN")}/-\n`;
    if (ledger.admission?.isMonthly) {
      if (ledger.summary?.clearedMonthsText) {
        text += `• *Months Cleared:* ${ledger.summary.clearedMonthsText} (${ledger.summary.clearedMonthsCount} Months)\n`;
      }
      if (ledger.summary?.nextDueMonth) {
        text += `• *⚠️ Next Due Month:* ${ledger.summary.nextDueMonth} (Due: ₹${ledger.summary.dueAmount?.toLocaleString("en-IN")}/-)\n`;
      }
    } else {
      text += `• *Total Course Fee:* ₹${ledger.summary?.totalCourseFee?.toLocaleString("en-IN")}/-\n`;
      text += `• *Outstanding Balance Due:* ₹${ledger.summary?.balanceDue?.toLocaleString("en-IN")}/-\n`;
    }
    text += `• *Account Status:* ${ledger.summary?.statusBadge}\n\n`;

    text += `🧾 *Transaction History (${ledger.transactions?.length || 0} Payment${(ledger.transactions?.length || 0) > 1 ? "s" : ""}):*\n`;
    (ledger.transactions || []).forEach((t) => {
      text += `• ${t.paymentDate || "N/A"}: *${t.receiptNo}* — ₹${t.amountPaid?.toLocaleString("en-IN")}/- (${t.coveragePeriod}) [${t.paymentMode}]\n`;
    });

    text += `\n💳 *Pay Online via UPI:* codernaccotax@okhdfcbank\n`;
    text += `_For any accounts queries, contact CNAT Accounts Department._`;

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Dedicated A4 Print Function for Student Fee Ledger Statement
  const handlePrintStudentLedger = (ledger) => {
    if (!ledger) return;

    const printWindow = window.open("", "_blank", "width=920,height=850");
    if (!printWindow) {
      Swal.fire({
        icon: "warning",
        title: "Popup Blocked",
        text: "Please allow pop-ups for this site to print the student ledger statement.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const logoSrc = logoDataUrl || CNATLogo || "/assets/cnat.png";
    const qrSrc = qrCodeDataUrl || CNATQR || "/assets/CNAT_QR.jpeg";
    const stampSrc = paidStampDataUrl || paidStamp || "/assets/images/paid-stamp.png";
    const nowFormatted = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const isMonthly = ledger.admission?.isMonthly;
    const summary = ledger.summary || {};
    const student = ledger.student || {};
    const course = ledger.course || {};
    const admission = ledger.admission || {};
    const txns = ledger.transactions || [];

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Student Fee Ledger - ${student.name || "Student"} - ${admission.admissionNumber || ""}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 10.5px;
      color: #1e293b;
      background: #fff;
      line-height: 1.35;
      padding: 8px;
    }
    .ledger-container {
      max-width: 100%;
      margin: 0 auto;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #0f766e;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header-left img {
      width: 52px;
      height: 52px;
      object-fit: contain;
    }
    .org-title {
      font-size: 17px;
      font-weight: 800;
      color: #0f766e;
      letter-spacing: 0.5px;
      line-height: 1.2;
    }
    .org-subtitle {
      font-size: 8.5px;
      color: #475569;
      font-weight: 500;
    }
    .org-contact {
      font-size: 8px;
      color: #64748b;
      margin-top: 1px;
    }
    .statement-badge {
      text-align: right;
    }
    .badge-title {
      font-size: 13px;
      font-weight: 800;
      color: #1e293b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-meta {
      font-size: 8.5px;
      color: #64748b;
      margin-top: 1px;
    }
    .badge-status {
      display: inline-block;
      margin-top: 3px;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 8.5px;
      font-weight: 700;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }
    .badge-status.partial {
      background: #fffbeb;
      color: #92400e;
      border: 1px solid #fde68a;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }
    .info-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 7px 9px;
      background: #f8fafc;
    }
    .info-card-title {
      font-size: 9.5px;
      font-weight: 700;
      color: #0f766e;
      text-transform: uppercase;
      margin-bottom: 5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      margin-bottom: 2.5px;
    }
    .info-label {
      color: #64748b;
    }
    .info-value {
      font-weight: 600;
      color: #1e293b;
      text-align: right;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    .kpi-box {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 8px;
      background: #ffffff;
      text-align: center;
    }
    .kpi-label {
      font-size: 8px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }
    .kpi-value {
      font-size: 13px;
      font-weight: 800;
      color: #0f766e;
      margin-top: 1px;
    }
    .kpi-value.due {
      color: #b45309;
    }
    table.txn-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
      font-size: 9px;
    }
    table.txn-table th {
      background: #0f766e;
      color: #ffffff;
      font-weight: 700;
      padding: 5px 7px;
      text-align: left;
      border: 1px solid #0f766e;
    }
    table.txn-table th.right, table.txn-table td.right {
      text-align: right;
    }
    table.txn-table th.center, table.txn-table td.center {
      text-align: center;
    }
    table.txn-table td {
      padding: 4px 7px;
      border: 1px solid #cbd5e1;
      color: #334155;
    }
    table.txn-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    table.txn-table tfoot td {
      font-weight: 800;
      background: #f1f5f9;
      border-top: 2px solid #0f766e;
      color: #0f766e;
    }
    .clearance-box {
      border: 1px dashed #0f766e;
      border-radius: 6px;
      padding: 6px 8px;
      background: #f0fdfa;
      margin-bottom: 10px;
      font-size: 9px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid #cbd5e1;
      align-items: center;
    }
    .upi-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .upi-section img {
      width: 50px;
      height: 50px;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 2px;
    }
    .upi-text {
      font-size: 8px;
      color: #475569;
    }
    .upi-id {
      font-family: monospace;
      font-weight: 700;
      color: #0f766e;
      font-size: 9px;
    }
    .signature-section {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 15px;
      text-align: center;
    }
    .stamp-container img {
      width: 60px;
      height: 60px;
      object-fit: contain;
      opacity: 0.85;
    }
    .sig-line {
      border-top: 1px solid #475569;
      width: 130px;
      padding-top: 3px;
      font-size: 8px;
      font-weight: 700;
      color: #334155;
    }
    .disclaimer {
      font-size: 7.5px;
      color: #94a3b8;
      text-align: center;
      margin-top: 8px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="ledger-container">
    <div class="header">
      <div class="header-left">
        <img src="${logoSrc}" alt="CNAT Logo" />
        <div>
          <div class="org-title">CODER &amp; ACCOTAX</div>
          <div class="org-subtitle">Advance Technical Education &amp; Career Training Academy</div>
          <div class="org-contact">Barrackpore, Kolkata - 700120 | Phone: +91 9830371685 | Web: www.cnat.in</div>
        </div>
      </div>
      <div class="statement-badge">
        <div class="badge-title">Student Fee Ledger</div>
        <div class="badge-meta">Statement Date: ${nowFormatted}</div>
        <div class="badge-meta">Academic Session: 2026–2027</div>
        <div class="badge-status ${!summary.isPaidInFull && !isMonthly ? 'partial' : ''}">
          ${summary.statusBadge || 'Account Active'}
        </div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-card">
        <div class="info-card-title">Student Profile</div>
        <div class="info-row">
          <span class="info-label">Student Name:</span>
          <span class="info-value">${student.name || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Registration No:</span>
          <span class="info-value" style="font-family: monospace;">${student.registrationNumber || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Admission ID / No:</span>
          <span class="info-value" style="font-family: monospace;">#${admission.admissionId} (${admission.admissionNumber || "N/A"})</span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone / WhatsApp:</span>
          <span class="info-value">${student.whatsapp || student.phone || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Location / City:</span>
          <span class="info-value">${student.city || student.address || "Barrackpore"}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="info-card-title">Academic &amp; Fee Details</div>
        <div class="info-row">
          <span class="info-label">Enrolled Course:</span>
          <span class="info-value">${course.name || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Course Code:</span>
          <span class="info-value" style="font-family: monospace;">${course.code || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date of Admission:</span>
          <span class="info-value">${admission.admissionDate || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Fee Plan:</span>
          <span class="info-value">${admission.feeMode || (isMonthly ? "Monthly" : "Lump sum")}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Agreed Fee Rate:</span>
          <span class="info-value" style="color: #0f766e;">₹ ${Number(admission.agreedFee || 0).toLocaleString("en-IN")}/- ${isMonthly ? "per month" : "total"}</span>
        </div>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-box">
        <div class="kpi-label">${isMonthly ? "Monthly Rate" : "Total Course Fee"}</div>
        <div class="kpi-value">₹ ${Number(isMonthly ? summary.monthlyRate || 0 : summary.totalCourseFee || 0).toLocaleString("en-IN")}</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-label">Cumulative Paid</div>
        <div class="kpi-value">₹ ${Number(summary.totalPaid || 0).toLocaleString("en-IN")}</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-label">${isMonthly ? "Next Due Month" : "Balance Due"}</div>
        <div class="kpi-value ${summary.balanceDue > 0 || isMonthly ? 'due' : ''}">
          ${isMonthly ? (summary.nextDueMonth || "Up to Date") : ("₹ " + Number(summary.balanceDue || 0).toLocaleString("en-IN"))}
        </div>
      </div>
      <div class="kpi-box">
        <div class="kpi-label">${isMonthly ? "Installments Cleared" : "Payment Status"}</div>
        <div class="kpi-value">
          ${isMonthly ? (summary.clearedMonthsCount + " Months") : (summary.isPaidInFull ? "100% Cleared" : "Partial")}
        </div>
      </div>
    </div>

    ${isMonthly ? `
    <div class="clearance-box">
      <div>
        <strong style="color: #0f766e;">✓ Months Cleared by Received Fees:</strong> 
        <span>${summary.clearedMonthsText || "None recorded yet"} (${summary.clearedMonthsCount} Months)</span>
      </div>
      ${summary.nextDueMonth ? `
      <div style="font-weight: 700; color: #b45309;">
        ⚠️ Next Due: ${summary.nextDueMonth} (Due: ₹ ${Number(summary.dueAmount || 0).toLocaleString("en-IN")}/-)
      </div>
      ` : ''}
    </div>
    ` : ''}

    <table class="txn-table">
      <thead>
        <tr>
          <th class="center" style="width: 25px;">#</th>
          <th>Payment Date</th>
          <th>Receipt No</th>
          <th>Coverage / Description</th>
          <th>Payment Mode</th>
          <th class="right">Amount Paid (₹)</th>
          <th class="right">Cumulative Total (₹)</th>
          <th>Collected By</th>
        </tr>
      </thead>
      <tbody>
        ${txns.length > 0 ? txns.map((t) => `
          <tr>
            <td class="center">${t.slNo}</td>
            <td>${t.paymentDate || "N/A"}</td>
            <td style="font-family: monospace; font-weight: 700; color: #0f766e;">${t.receiptNo}</td>
            <td>${t.coveragePeriod}</td>
            <td>${t.paymentMode}</td>
            <td class="right" style="font-weight: 700; color: #047857;">₹ ${Number(t.amountPaid || 0).toLocaleString("en-IN")}/-</td>
            <td class="right" style="font-weight: 700; color: #0f766e;">₹ ${Number(t.runningTotal || 0).toLocaleString("en-IN")}/-</td>
            <td>${t.collectedBy}</td>
          </tr>
        `).join("") : `
          <tr>
            <td colspan="8" class="center" style="padding: 12px; color: #64748b;">No fee payment transactions recorded for this admission yet.</td>
          </tr>
        `}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="right">TOTAL PAYMENTS RECEIVED TO DATE:</td>
          <td class="right">₹ ${Number(summary.totalPaid || 0).toLocaleString("en-IN")}/-</td>
          <td class="right">₹ ${Number(summary.totalPaid || 0).toLocaleString("en-IN")}/-</td>
          <td></td>
        </tr>
      </tfoot>
    </table>

    <div class="footer-grid">
      <div class="upi-section">
        <img src="${qrSrc}" alt="UPI QR" />
        <div class="upi-text">
          <strong>Online Fee Payment via UPI:</strong><br />
          Scan QR code or send payment to UPI ID:<br />
          <span class="upi-id">codernaccotax@okhdfcbank</span><br />
          Supports Google Pay, PhonePe, Paytm, BHIM UPI.
        </div>
      </div>

      <div class="signature-section">
        <div class="stamp-container">
          <img src="${stampSrc}" alt="Official Stamp" />
        </div>
        <div>
          <div class="sig-line">Authorized Signatory</div>
          <div style="font-size: 7.5px; color: #64748b; margin-top: 2px;">Accounts Department, CNAT</div>
        </div>
      </div>
    </div>

    <div class="disclaimer">
      This is a computer-generated official student fee ledger &amp; statement of account issued by Coder &amp; AccoTax (CNAT). For billing discrepancies, please contact accounts@cnat.in.
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Fetch Student & Course-wise Due List from Backend
  const fetchDuesList = async () => {
    setLoadingDues(true);
    try {
      const res = await api.get("/admissions/dues");
      const data = res.data?.data || { summary: {}, students: [], enrollments: [] };
      setDuesData(data);
      // Auto-expand all students with dues or multiple courses
      const initialExpanded = {};
      (data.students || []).forEach((s) => {
        if (s.hasMultipleCourses || s.totalDue > 0) {
          initialExpanded[s.studentId] = true;
        }
      });
      setExpandedStudents(initialExpanded);
    } catch (err) {
      console.error("Error fetching dues list:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Dues List",
        text: err.response?.data?.message || "Could not retrieve student dues statement.",
        background: "#0f172a",
        color: "#f8fafc",
      });
    } finally {
      setLoadingDues(false);
    }
  };

  const toggleStudentExpand = (studentId) => {
    setExpandedStudents((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // Filtered Students for Due List Modal
  const filteredDuesStudents = useMemo(() => {
    if (!duesData.students) return [];
    let list = [...duesData.students];

    if (duesFilter === "DUES_ONLY") {
      list = list.filter((s) => s.totalDue > 0);
    } else if (duesFilter === "MULTI_COURSE") {
      list = list.filter((s) => s.hasMultipleCourses);
    } else if (duesFilter === "CLEARED") {
      list = list.filter((s) => s.totalDue <= 0);
    } else if (duesFilter === "MONTHLY") {
      list = list.filter((s) => s.courses.some((c) => c.isMonthly && c.balanceDue > 0));
    } else if (duesFilter === "LUMPSUM") {
      list = list.filter((s) => s.courses.some((c) => !c.isMonthly && c.balanceDue > 0));
    }

    if (duesSearchTerm.trim()) {
      const q = duesSearchTerm.trim().toLowerCase();
      list = list.filter((s) => {
        const nameMatch = (s.studentName || "").toLowerCase().includes(q);
        const regMatch = (s.studentRegNo || "").toLowerCase().includes(q);
        const phoneMatch = (s.studentPhone || "").toLowerCase().includes(q);
        const courseMatch = s.courses.some(
          (c) =>
            (c.courseName || "").toLowerCase().includes(q) ||
            (c.courseCode || "").toLowerCase().includes(q)
        );
        return nameMatch || regMatch || phoneMatch || courseMatch;
      });
    }

    return list;
  }, [duesData.students, duesFilter, duesSearchTerm]);

  // Filtered Course Enrollments for Flat Table View in Due List Modal
  const filteredDuesEnrollments = useMemo(() => {
    if (!duesData.enrollments) return [];
    let list = [...duesData.enrollments];

    if (duesFilter === "DUES_ONLY") {
      list = list.filter((e) => e.balanceDue > 0);
    } else if (duesFilter === "CLEARED") {
      list = list.filter((e) => e.balanceDue <= 0);
    } else if (duesFilter === "MONTHLY") {
      list = list.filter((e) => e.isMonthly);
    } else if (duesFilter === "LUMPSUM") {
      list = list.filter((e) => !e.isMonthly);
    }

    if (duesSearchTerm.trim()) {
      const q = duesSearchTerm.trim().toLowerCase();
      list = list.filter((e) => {
        return (
          (e.studentName || "").toLowerCase().includes(q) ||
          (e.studentRegNo || "").toLowerCase().includes(q) ||
          (e.studentPhone || "").toLowerCase().includes(q) ||
          (e.courseName || "").toLowerCase().includes(q) ||
          (e.courseCode || "").toLowerCase().includes(q)
        );
      });
    }

    return list;
  }, [duesData.enrollments, duesFilter, duesSearchTerm]);

  // Send WhatsApp Due Reminder for a Student (Handles Multi-Course Itemization)
  const handleSendDueReminderWhatsApp = (student) => {
    const cleanPhone = (student.studentPhone || "").replace(/\D/g, "");
    if (!cleanPhone) {
      Swal.fire({
        icon: "warning",
        title: "No WhatsApp Number",
        text: `No phone number recorded for ${student.studentName}.`,
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const phoneToSend = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    let msg =
      `🔔 *Fee Due Reminder - Coder & AccoTax* 🔔\n\n` +
      `Dear *${student.studentName}* (${student.studentRegNo || "Student"}),\n` +
      `Greetings from Coder & AccoTax!\n\n` +
      `This is a friendly reminder regarding your outstanding tuition fees for the current academic session:\n\n`;

    student.courses.forEach((c, idx) => {
      msg += `📚 *${idx + 1}. ${c.courseName}* [${c.feeMode}]\n`;
      if (c.isMonthly) {
        msg += `   • Monthly Rate: ₹${Number(c.monthlyRate || 0).toLocaleString("en-IN")}/-\n`;
        msg += `   • Status: ${c.status}\n`;
        if (c.balanceDue > 0) {
          msg += `   • Outstanding Due: *₹${Number(c.balanceDue).toLocaleString("en-IN")}/-*\n`;
        } else {
          msg += `   • Status: Dues Cleared ✓\n`;
        }
      } else {
        msg += `   • Course Fee: ₹${Number(c.totalCourseFee || 0).toLocaleString("en-IN")}/-\n`;
        msg += `   • Paid to Date: ₹${Number(c.totalPaid || 0).toLocaleString("en-IN")}/-\n`;
        if (c.balanceDue > 0) {
          msg += `   • Outstanding Balance: *₹${Number(c.balanceDue).toLocaleString("en-IN")}/-*\n`;
        } else {
          msg += `   • Status: Paid in Full ✓\n`;
        }
      }
      msg += `\n`;
    });

    msg +=
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *TOTAL OUTSTANDING DUE: ₹${Number(student.totalDue).toLocaleString("en-IN")}/-*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `📱 *Instant Payment via UPI / QR:*\n` +
      `UPI ID: *codernaccotax@okhdfcbank*\n` +
      `Pay via Google Pay / PhonePe / Paytm / BHIM\n\n` +
      `Kindly clear the pending dues at your earliest convenience. If already paid, please ignore or share the transaction screenshot.\n\n` +
      `For queries: +91 70037 56860\n` +
      `Coder & AccoTax (Barrackpore)`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?phone=${phoneToSend}&text=${encoded}`, "_blank");
  };

  // Send WhatsApp Due Reminder for a Single Course Enrollment
  const handleSendSingleCourseReminderWhatsApp = (enrollment) => {
    const cleanPhone = (enrollment.studentPhone || "").replace(/\D/g, "");
    if (!cleanPhone) {
      Swal.fire({
        icon: "warning",
        title: "No WhatsApp Number",
        text: `No phone number recorded for ${enrollment.studentName}.`,
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const phoneToSend = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    let msg =
      `🔔 *Fee Due Reminder - Coder & AccoTax* 🔔\n\n` +
      `Dear *${enrollment.studentName}* (${enrollment.studentRegNo || "Student"}),\n` +
      `Greetings from Coder & AccoTax!\n\n` +
      `Course: *${enrollment.courseName}* [${enrollment.feeMode}]\n`;

    if (enrollment.isMonthly) {
      msg +=
        `Monthly Rate: ₹${Number(enrollment.monthlyRate || 0).toLocaleString("en-IN")}/-\n` +
        `Current Status: ${enrollment.status}\n` +
        `Outstanding Due: *₹${Number(enrollment.balanceDue).toLocaleString("en-IN")}/-*\n\n`;
    } else {
      msg +=
        `Total Course Fee: ₹${Number(enrollment.totalCourseFee || 0).toLocaleString("en-IN")}/-\n` +
        `Paid to Date: ₹${Number(enrollment.totalPaid || 0).toLocaleString("en-IN")}/-\n` +
        `Outstanding Balance: *₹${Number(enrollment.balanceDue).toLocaleString("en-IN")}/-*\n\n`;
    }

    msg +=
      `📱 *Instant Payment via UPI / QR:*\n` +
      `UPI ID: *codernaccotax@okhdfcbank*\n\n` +
      `Please clear the dues at your earliest convenience.\n` +
      `Coder & AccoTax (Barrackpore) | +91 70037 56860`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?phone=${phoneToSend}&text=${encoded}`, "_blank");
  };

  // Pay Due for an Enrollment (Pre-fills and opens Payment Modal)
  const handlePayDue = (enrollment) => {
    setShowDueListModal(false);
    const adm = admissionsList.find(
      (a) => a.id === enrollment.admissionId || a.admissionId === enrollment.admissionId
    );
    if (adm) {
      setSelectedAdmission(adm);
      setPaymentAmount(String(enrollment.balanceDue > 0 ? enrollment.balanceDue : enrollment.monthlyRate || ""));
      setShowNewPaymentModal(true);
    } else {
      setLoadingAdmissions(true);
      api
        .get("/admissions")
        .then((res) => {
          const list = res?.data?.data || res?.data || [];
          const fullList = Array.isArray(list) ? list.filter((a) => a.student) : [];
          setAdmissionsList(fullList);
          const found = fullList.find(
            (a) => a.id === enrollment.admissionId || a.admissionId === enrollment.admissionId
          );
          if (found) {
            setSelectedAdmission(found);
            setPaymentAmount(String(enrollment.balanceDue > 0 ? enrollment.balanceDue : enrollment.monthlyRate || ""));
          }
          setShowNewPaymentModal(true);
        })
        .catch((e) => console.error(e))
        .finally(() => setLoadingAdmissions(false));
    }
  };

  // Open Ledger for an Enrollment
  const handleViewLedgerForDue = (enrollment) => {
    setShowDueListModal(false);
    handleOpenLedgerForAdmission(enrollment.admissionId);
  };

  // Print Official A4 Due Report
  const handlePrintDueReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      Swal.fire({
        icon: "warning",
        title: "Pop-up Blocked",
        text: "Please allow pop-ups to print the official Dues Statement.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const nowFormatted = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const students = filteredDuesStudents;
    const totalDue = students.reduce((sum, s) => sum + Number(s.totalDue || 0), 0);

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CNAT - Outstanding Student Dues Statement</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #1e293b; margin: 0; padding: 0; line-height: 1.35; }
    .header { text-align: center; border-bottom: 2px solid #0f766e; padding-bottom: 8px; margin-bottom: 12px; }
    .inst-name { font-size: 18px; font-weight: 900; color: #0f766e; letter-spacing: 0.5px; margin: 0; }
    .inst-sub { font-size: 10px; color: #475569; margin: 2px 0 6px; }
    .report-title { font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; margin: 4px 0 2px; }
    .meta-bar { display: flex; justify-content: space-between; font-size: 9px; color: #64748b; margin-top: 4px; }
    
    .kpi-row { display: flex; gap: 8px; margin-bottom: 12px; }
    .kpi-card { flex: 1; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; background: #f8fafc; }
    .kpi-label { font-size: 9px; color: #64748b; text-transform: uppercase; font-weight: bold; }
    .kpi-val { font-size: 14px; font-weight: 900; color: #0f172a; margin-top: 2px; }
    .kpi-val.due { color: #dc2626; }

    table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 10px; }
    th { background: #0f766e; color: #ffffff; font-weight: bold; text-align: left; padding: 6px 8px; border: 1px solid #0f766e; font-size: 9px; text-transform: uppercase; }
    td { padding: 5px 8px; border: 1px solid #cbd5e1; vertical-align: top; }
    tr:nth-child(even) td { background: #f8fafc; }
    .center { text-align: center; }
    .right { text-align: right; }
    .bold { font-weight: bold; }
    .mono { font-family: monospace; }
    .badge { display: inline-block; padding: 2px 5px; border-radius: 4px; font-size: 8px; font-weight: bold; }
    .badge-monthly { background: #e0f2fe; color: #0369a1; }
    .badge-lumpsum { background: #fef3c7; color: #92400e; }
    .badge-multi { background: #f3e8ff; color: #7e22ce; margin-left: 4px; }
    .due-amount { color: #dc2626; font-weight: bold; }

    .course-subtable { width: 100%; border-collapse: collapse; margin-top: 3px; font-size: 9px; }
    .course-subtable td { border: none; padding: 2px 4px; background: transparent !important; }
    .course-subtable tr:hover td { background: transparent; }

    .footer { margin-top: 20px; display: flex; justify-content: space-between; align-items: flex-end; page-break-inside: avoid; }
    .signature-box { text-align: center; width: 160px; }
    .sig-line { border-top: 1px solid #94a3b8; margin-top: 35px; padding-top: 4px; font-size: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <div class="inst-name">CODER &amp; ACCOTAX</div>
    <div class="inst-sub">Computer Training &amp; Academic Coaching Institute • Barasat Road, Barrackpore, Kolkata - 700120 • Ph: +91 70037 56860</div>
    <div class="report-title">Student &amp; Course-wise Outstanding Dues Statement</div>
    <div class="meta-bar">
      <span>Academic Session: 2026–2027</span>
      <span>UPI Payment ID: codernaccotax@okhdfcbank</span>
      <span>Statement As Of: ${nowFormatted}</span>
    </div>
  </div>

  <div class="kpi-row">
    <div class="kpi-card">
      <div class="kpi-label">Total Outstanding Dues</div>
      <div class="kpi-val due">₹ ${totalDue.toLocaleString("en-IN")}/-</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Students with Pending Dues</div>
      <div class="kpi-val">${students.filter((s) => s.totalDue > 0).length} Students</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Multi-Course Students</div>
      <div class="kpi-val">${students.filter((s) => s.hasMultipleCourses).length} Students</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total Listed Enrollments</div>
      <div class="kpi-val">${students.reduce((sum, s) => sum + s.courses.length, 0)} Courses</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 24px;" class="center">#</th>
        <th style="width: 140px;">Student Information</th>
        <th>Enrolled Courses &amp; Due Breakdown</th>
        <th style="width: 80px;" class="right">Total Paid (₹)</th>
        <th style="width: 90px;" class="right">Total Due (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${students
        .map(
          (s, idx) => `
        <tr>
          <td class="center bold">${idx + 1}</td>
          <td>
            <div class="bold" style="color: #0f172a; font-size: 11px;">${s.studentName}</div>
            <div class="mono" style="color: #64748b; font-size: 9px;">${s.studentRegNo || "—"}</div>
            <div style="color: #0f766e; font-size: 9px;">📞 ${s.studentPhone || "N/A"}</div>
            ${s.hasMultipleCourses ? `<span class="badge badge-multi">${s.totalCoursesCount} Courses</span>` : ""}
          </td>
          <td>
            <table class="course-subtable">
              ${s.courses
                .map(
                  (c) => `
                <tr style="border-bottom: 1px dashed #e2e8f0;">
                  <td class="bold" style="color: #1e293b;">• ${c.courseName}</td>
                  <td>
                    <span class="badge ${c.isMonthly ? "badge-monthly" : "badge-lumpsum"}">
                      ${c.isMonthly ? "Monthly (₹" + c.monthlyRate + "/mo)" : "Lump sum (₹" + (c.totalCourseFee || 0) + ")"}
                    </span>
                  </td>
                  <td style="color: #475569;">
                    ${c.isMonthly ? c.status : "Paid ₹" + c.totalPaid + " of ₹" + (c.totalCourseFee || 0)}
                  </td>
                  <td class="right ${c.balanceDue > 0 ? "due-amount" : "bold"}" style="width: 70px;">
                    ${c.balanceDue > 0 ? "₹ " + Number(c.balanceDue).toLocaleString("en-IN") + "/-" : '<span style="color: #16a34a;">Cleared ✓</span>'}
                  </td>
                </tr>
              `
                )
                .join("")}
            </table>
          </td>
          <td class="right bold" style="color: #0f766e;">
            ₹ ${Number(s.totalPaid || 0).toLocaleString("en-IN")}/-
          </td>
          <td class="right bold ${s.totalDue > 0 ? "due-amount" : ""}">
            ${s.totalDue > 0 ? "₹ " + Number(s.totalDue).toLocaleString("en-IN") + "/-" : '<span style="color: #16a34a;">₹0 (Cleared)</span>'}
          </td>
        </tr>
      `
        )
        .join("")}
    </tbody>
    <tfoot>
      <tr style="background: #0f172a; color: #ffffff; font-weight: bold; font-size: 11px;">
        <td colspan="4" class="right" style="padding: 8px; border: 1px solid #0f172a; color: white;">
          GRAND TOTAL OUTSTANDING DUES:
        </td>
        <td class="right" style="padding: 8px; border: 1px solid #0f172a; color: #f87171; font-size: 12px;">
          ₹ ${totalDue.toLocaleString("en-IN")}/-
        </td>
      </tr>
    </tfoot>
  </table>

  <div class="footer">
    <div style="font-size: 9px; color: #64748b; max-width: 380px;">
      * Computer generated institutional fee report. All figures are verified from system ledger.<br>
      Students with pending dues can pay via official UPI ID <strong>codernaccotax@okhdfcbank</strong>.
    </div>
    <div class="signature-box">
      <div class="sig-line">Accounts Department / Admin</div>
      <div style="font-size: 8px; color: #64748b;">Coder &amp; AccoTax</div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Export Due List to Excel (Both Student Summary & Course-wise Dues)
  const handleExportDuesExcel = () => {
    if (!duesData.students || duesData.students.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Data to Export",
        text: "There is no dues data to export.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const studentRows = filteredDuesStudents.map((s, idx) => ({
      "Sl No": idx + 1,
      "Student Name": s.studentName,
      "Registration No": s.studentRegNo || "—",
      "Phone / WhatsApp": s.studentPhone || "—",
      "Total Courses Enrolled": s.totalCoursesCount,
      "Total Fees Paid (₹)": s.totalPaid,
      "Total Due Amount (₹)": s.totalDue,
      "Enrolled Courses": s.courses.map((c) => `${c.courseName} (${c.feeMode}: Due ₹${c.balanceDue})`).join("; "),
    }));

    const courseRows = filteredDuesEnrollments.map((e, idx) => ({
      "Sl No": idx + 1,
      "Student Name": e.studentName,
      "Registration No": e.studentRegNo || "—",
      "Phone": e.studentPhone || "—",
      "Course Name": e.courseName,
      "Course Code": e.courseCode || "—",
      "Fee Mode": e.feeMode,
      "Agreed Fee / Rate (₹)": e.agreedFee,
      "Total Paid (₹)": e.totalPaid,
      "Cleared / Status": e.status,
      "Next Due Month": e.nextDueMonth || "—",
      "Outstanding Due (₹)": e.balanceDue,
    }));

    const workbook = XLSX.utils.book_new();
    const wsStudents = XLSX.utils.json_to_sheet(studentRows);
    const wsCourses = XLSX.utils.json_to_sheet(courseRows);

    XLSX.utils.book_append_sheet(workbook, wsStudents, "Student Summary Dues");
    XLSX.utils.book_append_sheet(workbook, wsCourses, "Course-wise Dues");

    XLSX.writeFile(workbook, `CNAT_Student_Course_Dues_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // Ledger & Dues Calculator considering Admission Date & Previous Payments (Both Monthly & Non-Monthly)
  const getLedgerDetails = (receipt) => {
    if (!receipt) return null;

    const isMonthly = (receipt.feeType || receipt.fee_type) === "monthly";
    const amountPaid = Number(receipt.amountPaid || receipt.amount_paid || 0);
    const monthlyRate = Number(
      receipt.monthlyFeeAmount || receipt.monthly_fee_amount || receipt.course?.course_fees || 600
    );
    const totalCourseFee = Number(
      receipt.totalCourseFee || receipt.course?.course_fees || (isMonthly ? 0 : amountPaid)
    );

    let previousPaid = Number(receipt.previousPaid ?? 0);
    let totalPaidToDate = Number(receipt.totalPaidToDate ?? (previousPaid + amountPaid));
    let coveredMonths = Array.isArray(receipt.coveredMonths) ? [...receipt.coveredMonths] : [];
    let nextDueMonth = receipt.nextDueMonth || null;
    let balanceDue = Number(
      receipt.balanceDue ?? (isMonthly ? 0 : Math.max(0, totalCourseFee - totalPaidToDate))
    );
    let isPaidInFull = receipt.isPaidInFull ?? (isMonthly ? true : balanceDue <= 0);
    let dueAmount = Number(receipt.dueAmount || (isMonthly ? monthlyRate : balanceDue));
    let admissionDate = receipt.admissionDate || receipt.student?.admission_date || null;

    // Fallback: If previousPaid is 0 and we have receipts in memory, calculate prior payments
    if (previousPaid === 0) {
      const studentId = receipt.studentId || receipt.student_id;
      const courseId = receipt.courseId || receipt.course_id;
      const receiptId = receipt.id;

      if (studentId && courseId) {
        const studentReceipts = receipts.filter(
          (r) =>
            (r.studentId === studentId || r.student_id === studentId) &&
            (r.courseId === courseId || r.course_id === courseId)
        );

        const priorReceipts = studentReceipts.filter(
          (r) => (r.id && receiptId ? r.id < receiptId : false)
        );

        if (priorReceipts.length > 0) {
          previousPaid = priorReceipts.reduce(
            (sum, r) => sum + Number(r.amountPaid || r.amount_paid || 0),
            0
          );
          totalPaidToDate = previousPaid + amountPaid;
          if (!isMonthly) {
            balanceDue = Math.max(0, totalCourseFee - totalPaidToDate);
            dueAmount = balanceDue;
            isPaidInFull = balanceDue <= 0;
          }
        }
      }
    }

    // Monthly fallback calculation
    if (isMonthly && coveredMonths.length === 0) {
      const rate = monthlyRate > 0 ? monthlyRate : 600;
      const rawAdm = admissionDate || receipt.periodFrom || receipt.paymentDate || receipt.createdAt;
      if (rawAdm) {
        const admDate = new Date(rawAdm);
        const monthsPrior = Math.floor(previousPaid / rate);
        const totalCovered = Math.floor(totalPaidToDate / rate);

        const monthsArr = [];
        for (let i = monthsPrior; i < totalCovered; i++) {
          const m = new Date(admDate);
          m.setMonth(m.getMonth() + i);
          monthsArr.push(m.toLocaleDateString("en-IN", { month: "long", year: "numeric" }));
        }
        coveredMonths = monthsArr;

        const nextD = new Date(admDate);
        nextD.setMonth(nextD.getMonth() + totalCovered);
        nextDueMonth = nextD.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
        dueAmount = rate;
      }
    }

    let admissionDateFormatted = "N/A";
    const rawAdm = admissionDate || receipt.periodFrom;
    if (rawAdm) {
      admissionDateFormatted = new Date(rawAdm).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    let coveragePeriodText = receipt.coveragePeriodText || null;
    if (isMonthly && !coveragePeriodText && coveredMonths.length > 0) {
      const firstM = coveredMonths[0];
      const lastM = coveredMonths[coveredMonths.length - 1];
      if (firstM === lastM) {
        coveragePeriodText = firstM;
      } else {
        const fp = firstM.split(" ");
        const lp = lastM.split(" ");
        coveragePeriodText =
          fp[1] && lp[1] && fp[1] === lp[1]
            ? `${fp[0]} to ${lp[0]} ${lp[1]}`
            : `${firstM} to ${lastM}`;
      }
    } else if (!isMonthly) {
      if (balanceDue > 0) {
        coveragePeriodText = "Part Payment";
      } else {
        coveragePeriodText = (previousPaid > 0) ? "Final Payment" : "Paid in Full";
      }
    }

    return {
      isMonthly,
      amountPaid,
      monthlyRate,
      totalCourseFee,
      previousPaid,
      totalPaidToDate,
      balanceDue,
      isPaidInFull,
      coveredMonths,
      coveredMonthsText: coveredMonths.length > 0 ? coveredMonths.join(", ") : null,
      coveragePeriodText,
      nextDueMonth,
      dueAmount,
      admissionDateFormatted,
    };
  };

  // Format period coverage (e.g. "June to August 2026" for monthly, "Full Course" for lumpsum)
  const formatPeriodCoverage = (r) => {
    if (!r) return "—";
    const ledger = getLedgerDetails(r);
    if (ledger?.coveragePeriodText) {
      return ledger.coveragePeriodText;
    }
    if (ledger?.isMonthly && ledger?.coveredMonths && ledger.coveredMonths.length > 0) {
      const firstM = ledger.coveredMonths[0];
      const lastM = ledger.coveredMonths[ledger.coveredMonths.length - 1];
      if (firstM === lastM) return firstM;
      const fp = firstM.split(" ");
      const lp = lastM.split(" ");
      return (fp[1] && lp[1] && fp[1] === lp[1])
        ? `${fp[0]} to ${lp[0]} ${lp[1]}`
        : `${firstM} to ${lastM}`;
    }
    if (!ledger?.isMonthly) {
      if (ledger?.balanceDue > 0) {
        return "Part Payment";
      }
      return (ledger?.previousPaid > 0) ? "Final Payment" : "Paid in Full";
    }
    return "—";
  };

  // WhatsApp Voucher Sender with Image Capture, Clipboard Copy & Direct Launcher
  const handleSendWhatsApp = async (receipt) => {
    if (!receipt) return;

    let targetPhone =
      receipt.whatsapp ||
      receipt.studentPhone ||
      receipt.phone ||
      receipt.student?.whatsapp ||
      receipt.student?.phone ||
      "";

    // If phone number is missing from the receipt object, try fetching from student record
    if (!targetPhone && receipt.studentId) {
      try {
        const studentRes = await studentService.getById(receipt.studentId);
        const sData = studentRes?.data || studentRes;
        targetPhone = sData?.whatsapp || sData?.phone1 || sData?.phone || "";
      } catch {
        // Fallback
      }
    }

    let cleanPhone = (targetPhone || "").replace(/\D/g, "");

    // If phone is missing or incomplete, prompt user to enter or verify
    if (cleanPhone.length < 10) {
      const { value: inputPhone, isConfirmed } = await Swal.fire({
        title: "WhatsApp Number",
        text: `Please enter the 10-digit WhatsApp mobile number for ${receipt.studentName || "the student"}:`,
        input: "tel",
        inputValue: cleanPhone,
        inputPlaceholder: "e.g. 9876543210",
        showCancelButton: true,
        confirmButtonText: "Prepare & Open WhatsApp",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#475569",
        background: "#0f172a",
        color: "#f8fafc",
        inputValidator: (value) => {
          const digits = (value || "").replace(/\D/g, "");
          if (digits.length !== 10 && digits.length !== 12) {
            return "Please enter a valid 10-digit mobile number";
          }
        },
      });

      if (!isConfirmed || !inputPhone) return;
      cleanPhone = inputPhone.replace(/\D/g, "");
    }

    if (cleanPhone.length === 10) {
      cleanPhone = "91" + cleanPhone;
    }

    setIsSendingWhatsApp(true);

    try {
      const amt = Number(receipt.amountPaid || receipt.amount_paid || 0);
      const rNo = receipt.receiptNo || receipt.receipt_no || "N/A";
      const regNo = receipt.registrationNumber || receipt.registration_number || receipt.student?.registration_number || "N/A";
      const sName = receipt.studentName || receipt.student_name || receipt.student?.student_name || "Student";
      const cName = receipt.courseName || receipt.course_name || receipt.course?.course_name || "Course";
      const rawDate = receipt.paymentDate || receipt.payment_date || receipt.createdAt || receipt.created_at;
      const payDate = rawDate ? new Date(rawDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A";

      const ledger = getLedgerDetails(receipt);

      let messageText =
        `📄 *Fee Payment Receipt - Coder & AccoTax* 📄\n\n` +
        `👤 *Student:* ${sName}\n` +
        `🆔 *Registration No:* ${regNo}\n` +
        `📚 *Course:* ${cName}\n`;

      if (ledger?.admissionDateFormatted && ledger.admissionDateFormatted !== "N/A") {
        messageText += `📅 *Admission Date:* ${ledger.admissionDateFormatted}\n`;
      }

      messageText +=
        `💰 *Amount Paid (This Voucher):* ₹${amt.toLocaleString("en-IN")}/-\n` +
        `📅 *Payment Date:* ${payDate}\n` +
        `🧾 *Receipt No:* ${rNo}\n` +
        `💳 *Payment Mode:* ${receipt.paymentMode || receipt.payment_mode || "Cash"}\n\n`;

      if (ledger?.isMonthly) {
        messageText +=
          `📊 *Payment Accounting & Dues Status:*\n` +
          `• *Monthly Fee Rate:* ₹${ledger.monthlyRate.toLocaleString("en-IN")}/- per month\n` +
          `• *Previous Payments Considered:* ₹${ledger.previousPaid.toLocaleString("en-IN")}/-\n` +
          `• *Total Cumulative Paid to Date:* ₹${ledger.totalPaidToDate.toLocaleString("en-IN")}/-\n`;

        if (ledger.coveredMonthsText) {
          messageText += `• *Months Cleared:* ${ledger.coveredMonthsText} (${ledger.coveredMonths.length} Months)\n`;
        }
        if (ledger.nextDueMonth) {
          messageText += `• *⚠️ Next Due Month:* ${ledger.nextDueMonth} (Due: ₹${ledger.dueAmount.toLocaleString("en-IN")}/-)\n`;
        }
        messageText += `\n`;
      } else {
        messageText +=
          `📊 *Course Fee Accounting & Balance:*\n` +
          `• *Total Agreed Course Fee:* ₹${ledger.totalCourseFee.toLocaleString("en-IN")}/-\n` +
          `• *Previous Payments Considered:* ₹${ledger.previousPaid.toLocaleString("en-IN")}/-\n` +
          `• *Paid in this Voucher:* ₹${amt.toLocaleString("en-IN")}/-\n` +
          `• *Total Cumulative Paid:* ₹${ledger.totalPaidToDate.toLocaleString("en-IN")}/-\n`;

        if (ledger.balanceDue > 0) {
          messageText += `• *⚠️ Outstanding Balance Due:* ₹${ledger.balanceDue.toLocaleString("en-IN")}/-\n`;
          messageText += `• *Payment Classification:* Part Payment\n\n`;
        } else if (ledger.previousPaid > 0) {
          messageText += `• *Payment Classification:* Final Payment ✓ (Course Fee Fully Cleared)\n\n`;
        } else {
          messageText += `• *Payment Classification:* Paid in Full ✓ (No Balance Due)\n\n`;
        }
      }

      messageText +=
        `Thank you for choosing Coder & AccoTax! ✨\n` +
        `For any queries, contact: +91 70037 56860 | www.codernaccotax.co.in`;

      let imageBlob = null;
      let imageDataUrl = null;

      // 1. Capture voucher image if card ref is mounted in modal
      if (receiptCardRef.current) {
        try {
          const imageOptions = {
            quality: 0.95,
            backgroundColor: "#ffffff",
            pixelRatio: 2,
            skipFonts: true,
            fontEmbedCSS: "",
          };
          imageDataUrl = await htmlToImage.toPng(receiptCardRef.current, imageOptions);
          try {
            imageBlob = await htmlToImage.toBlob(receiptCardRef.current, imageOptions);
          } catch {
            if (imageDataUrl) {
              const res = await fetch(imageDataUrl);
              imageBlob = await res.blob();
            }
          }
        } catch (captureErr) {
          console.warn("Could not capture voucher image:", captureErr);
        }
      }

      // 2. Try copying voucher image to clipboard so user can just Ctrl+V into WhatsApp
      let copiedToClipboard = false;
      if (imageBlob && navigator.clipboard && typeof window.ClipboardItem !== "undefined") {
        try {
          await navigator.clipboard.write([
            new window.ClipboardItem({ "image/png": imageBlob }),
          ]);
          copiedToClipboard = true;
        } catch (clipErr) {
          console.warn("Could not write image to clipboard:", clipErr);
        }
      }

      // 3. Download the voucher image file automatically so they have the file ready to attach
      if (imageDataUrl) {
        const link = document.createElement("a");
        const safeRNo = String(rNo).replace(/[^a-zA-Z0-9_-]/g, "_");
        const safeSName = String(sName).replace(/[^a-zA-Z0-9_-]/g, "_");
        link.download = `Voucher_${safeRNo}_${safeSName}.png`;
        link.href = imageDataUrl;
        link.click();
      }

      // 4. Open WhatsApp Web or App
      const encoded = encodeURIComponent(messageText);
      const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
      window.open(waUrl, "_blank");

      // 5. Show step-by-step guidance in SweetAlert
      Swal.fire({
        icon: "success",
        title: "Opening WhatsApp...",
        html: `
          <div class="text-left text-xs space-y-2.5 text-slate-300 p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 mt-2">
            <p class="text-white font-semibold flex items-center gap-1.5">
              <span class="text-base">✅</span> <b>Voucher image downloaded & prepared!</b>
            </p>
            ${
              copiedToClipboard
                ? `
              <div class="text-emerald-300 font-medium bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-800/50 space-y-1">
                <p>📋 <b>Voucher image copied to your clipboard!</b></p>
                <p class="text-slate-300 text-[11px]">
                  Inside WhatsApp, simply press <kbd class="px-1.5 py-0.5 bg-slate-900 border border-slate-600 rounded text-white font-mono font-bold">Ctrl + V</kbd> to paste the voucher directly!
                </p>
              </div>
            `
                : `
              <p class="text-slate-300">
                📎 Click the attachment icon (📎) in WhatsApp and attach the downloaded voucher image.
              </p>
            `
            }
            <div class="pt-2 border-t border-slate-700/80 flex items-center justify-between">
              <span class="text-[11px] text-slate-400">If WhatsApp didn't open automatically:</span>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition inline-flex items-center gap-1">
                Open WhatsApp
              </a>
            </div>
          </div>
        `,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#16a34a",
        confirmButtonText: "Got it!",
      });
    } catch (err) {
      console.error("WhatsApp sender error:", err);
      Swal.fire({
        icon: "error",
        title: "WhatsApp Failed",
        text: "Could not launch WhatsApp. Please check pop-up settings or download the voucher as JPG.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSendingWhatsApp(false);
    }
  };

  // Save Voucher as High-Quality JPG
  const handleSaveReceiptImage = async (receipt) => {
    if (!receipt || !receiptCardRef.current) return;
    setIsSavingImage(true);
    try {
      const dataUrl = await htmlToImage.toJpeg(receiptCardRef.current, {
        quality: 0.95,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        skipFonts: true,
        fontEmbedCSS: "",
      });
      const link = document.createElement("a");
      const rNo = (receipt.receiptNo || receipt.receipt_no || "receipt").replace(/[^a-zA-Z0-9_-]/g, "_");
      const sName = (receipt.studentName || receipt.student_name || "student").replace(/[^a-zA-Z0-9_-]/g, "_");
      link.download = `Receipt_${rNo}_${sName}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error saving receipt image:", err);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Could not generate image. Please use the Print Official Voucher button.",
        background: "#0f172a",
        color: "#f8fafc",
      });
    } finally {
      setIsSavingImage(false);
    }
  };

  // Print Official Voucher (Dedicated Window with Clean A4 / Slip Styling)
  const handlePrintOfficialVoucher = async (receipt) => {
    if (!receipt) return;

    const amt = Number(receipt.amountPaid || receipt.amount_paid || 0);
    const qrImgSrc = qrCodeDataUrl || CNATQR || "/assets/CNAT_QR.jpeg";

    const printWindow = window.open("", "_blank", "width=850,height=750");
    if (!printWindow) {
      Swal.fire({
        icon: "warning",
        title: "Popup Blocked",
        text: "Please allow pop-ups for this site to print the official voucher.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const ledger = getLedgerDetails(receipt);
    const amountInWords = numberToWords(amt);
    const paidAmountFormatted = amt.toLocaleString("en-IN");
    const rNo = receipt.receiptNo || receipt.receipt_no || "N/A";
    const regNo = receipt.registrationNumber || receipt.registration_number || receipt.student?.registration_number || "N/A";
    const sName = receipt.studentName || receipt.student_name || receipt.student?.student_name || "N/A";
    const phone = receipt.studentPhone || receipt.phone || receipt.student?.whatsapp || receipt.student?.phone || "N/A";
    const cName = receipt.courseName || receipt.course_name || receipt.course?.course_name || "N/A";
    const payMode = receipt.paymentMode || receipt.payment_mode || "Cash";

    let payDateFormatted = "N/A";
    const rawDate = receipt.paymentDate || receipt.payment_date || receipt.createdAt || receipt.created_at;
    if (rawDate) {
      payDateFormatted = new Date(rawDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    const periodFormatted = formatPeriodCoverage(receipt);

    const currentDateTime = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const collectorName = getCollectorName();
    const collectorDesignation = getCollectorDesignation();
    const logoImgSrc = logoDataUrl || CNATLogo || "/assets/cnat.png";
    const paidStampImgSrc = paidStampDataUrl || paidStamp;

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Fee Receipt - ${rNo} - Coder & AccoTax</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            background: white;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
          }
          .receipt-container {
            width: 100%;
            max-width: 100%;
            margin: 0;
            position: relative;
            overflow: visible;
          }
          .receipt {
            position: relative;
            background: white;
            border-radius: 0;
            box-shadow: none;
            margin: 0;
            padding: 10px 20px 20px 20px;
            overflow: visible;
            width: 100%;
          }
          .receipt-content {
            padding: 10px;
            position: relative;
            z-index: 1;
            width: 100%;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #1a3e6f;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .organisation-name {
            font-size: 24px;
            font-weight: bold;
            color: #1a3e6f;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          .organisation-logo {
            height: 35px;
            width: auto;
            vertical-align: middle;
          }
          .organisation-tagline {
            font-size: 10px;
            color: #4a5568;
            margin-top: 3px;
          }
          .address {
            font-size: 9px;
            color: #4a5568;
            margin-top: 5px;
            line-height: 1.3;
          }
          .contact-row {
            display: flex;
            justify-content: center;
            gap: 15px;
            font-size: 9px;
            color: #4a5568;
            margin-top: 5px;
            flex-wrap: wrap;
          }
          .receipt-title {
            font-size: 14px;
            font-weight: bold;
            color: #2d3748;
            margin-top: 8px;
            background: #f0f4f8;
            display: inline-block;
            padding: 4px 15px;
            border-radius: 20px;
            letter-spacing: 0.5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 12px 0;
            padding: 10px;
            background: #f7fafc;
            border-radius: 6px;
            border: 1px solid #edf2f7;
          }
          .info-item {
            display: flex;
            flex-direction: column;
          }
          .info-label {
            font-size: 9px;
            font-weight: 600;
            color: #4a5568;
            text-transform: uppercase;
            margin-bottom: 3px;
          }
          .info-value {
            font-size: 11px;
            font-weight: bold;
            color: #2d3748;
            word-break: break-word;
          }
          .details-section {
            margin-bottom: 12px;
          }
          .section-title {
            font-size: 11px;
            font-weight: bold;
            color: #1a3e6f;
            border-left: 3px solid #1a3e6f;
            padding-left: 8px;
            margin-bottom: 8px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
          }
          .details-table tr {
            border-bottom: 1px solid #e2e8f0;
          }
          .details-table td {
            padding: 6px;
            font-size: 10px;
          }
          .details-table td:first-child {
            font-weight: 600;
            color: #4a5568;
            width: 35%;
          }
          .details-table td:last-child {
            color: #2d3748;
          }
          .fee-section {
            background: #f0f9ff;
            padding: 10px;
            margin: 12px 0;
            border-radius: 6px;
            border: 1px solid #cbd5e0;
          }
          .fee-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
          }
          .fee-label {
            font-weight: bold;
            font-size: 11px;
            color: #4a5568;
          }
          .fee-amount {
            font-weight: bold;
            font-size: 14px;
            color: #2f855a;
          }
          .amount-words {
            font-size: 9px;
            color: #4a5568;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px dashed #cbd5e0;
            font-style: italic;
            font-weight: 600;
          }
          
          .qr-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 12px 0;
            padding: 10px;
            background: #faf5ff;
            border-radius: 6px;
            border: 1px solid #d8b4fe;
          }
          .qr-info {
            flex: 1;
            padding-right: 10px;
          }
          .qr-title {
            font-size: 10px;
            font-weight: bold;
            color: #6b21a5;
            margin-bottom: 5px;
          }
          .qr-text {
            font-size: 8px;
            color: #4a5568;
            margin-bottom: 3px;
          }
          .upi-id {
            font-size: 9px;
            font-weight: bold;
            color: #1a3e6f;
            background: white;
            padding: 3px 6px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 5px;
            border: 1px solid #e9d5ff;
          }
          .qr-code {
            width: 70px;
            height: 70px;
            object-fit: contain;
          }
          
          .collector-info {
            margin-top: 8px;
            padding: 6px;
            background: #f0fdf4;
            border-radius: 4px;
            font-size: 8px;
            text-align: center;
            border: 1px solid #bbf7d0;
          }
          .collector-label {
            font-weight: bold;
            color: #166534;
          }

          .footer {
            text-align: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            margin-top: 10px;
          }
          .signature-area {
            display: flex;
            justify-content: space-between;
            margin: 16px 0 8px;
          }
          .signature-line {
            text-align: center;
            width: 45%;
          }
          .signature-line p:first-child {
            font-size: 8px;
            color: #718096;
            margin-bottom: 6px;
          }
          .signature-line p:last-child {
            font-size: 9px;
            font-weight: 600;
            color: #4a5568;
            border-top: 1px solid #cbd5e0;
            padding-top: 5px;
            display: inline-block;
            min-width: 120px;
          }
          .footer-note {
            font-size: 7px;
            color: #a0aec0;
            margin-top: 6px;
            line-height: 1.3;
          }
          .contact-info {
            margin-top: 8px;
            padding-top: 6px;
            border-top: 1px solid #e2e8f0;
          }
          .contact-info p {
            font-size: 8px;
            color: #4a5568;
            margin-top: 3px;
          }
          .thankyou {
            font-size: 9px;
            font-weight: bold;
            color: #1a3e6f;
            margin-top: 6px;
          }
          
          .watermark-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 10;
            opacity: 0.08;
          }
          .watermark-image {
            width: 50%;
            height: auto;
            transform: rotate(-25deg);
          }

          .stamp-container {
            position: absolute;
            top: 55%;
            right: 12%;
            transform: translateY(-50%) rotate(-15deg);
            z-index: 20;
            pointer-events: none;
          }

          .paid-stamp-image {
            width: 120px;
            height: auto;
            opacity: 0.6;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .receipt-container {
              margin: 0;
              padding: 0;
              width: 100%;
            }
            .receipt {
              padding: 0;
              margin: 0;
              width: 100%;
            }
            .stamp-container {
              opacity: 0.7 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .paid-stamp-image {
              opacity: 0.7 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .qr-section {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @page {
              size: A4;
              margin: 0.8cm;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="receipt">
            <div class="watermark-container">
              <img src="${logoImgSrc}" alt="Watermark" class="watermark-image" />
            </div>
            
            <div class="stamp-container">
              <img src="${paidStampImgSrc}" alt="Paid Stamp" class="paid-stamp-image" />
            </div>
            
            <div class="receipt-content">
              <div class="header">
                <div class="organisation-name">
                  <img src="${logoImgSrc}" alt="Coder & AccoTax Logo" class="organisation-logo" />
                  <span>CODER & ACCOTAX</span>
                </div>
                <div class="organisation-tagline">Quality Education | Professional Training | Tax Solutions</div>
                <div class="address">
                  25(10/A) Shibtala Road, PO-N C Pukur, Barrackpore, Kolkata-700122
                </div>
                <div class="contact-row">
                  <span>📞 +91 70037 56860</span>
                  <span>✉️ info@codernaccotax.co.in</span>
                </div>
                <div>
                  <span class="receipt-title">Fee Payment Receipt</span>
                </div>
              </div>
              
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Registration No.</div>
                  <div class="info-value">${regNo}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Receipt No.</div>
                  <div class="info-value">${rNo}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Payment Date</div>
                  <div class="info-value">${payDateFormatted}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Payment Mode</div>
                  <div class="info-value">${payMode}</div>
                </div>
              </div>

              <div class="details-section">
                <div class="section-title">Student & Course Details</div>
                <table class="details-table">
                  <tr>
                    <td>Student Name</td>
                    <td>${sName}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>${phone}</td>
                  </tr>
                  <tr>
                    <td>Course Enrolled</td>
                    <td>${cName}</td>
                  </tr>
                  ${ledger?.admissionDateFormatted && ledger.admissionDateFormatted !== 'N/A' ? `
                  <tr>
                    <td>Admission Date</td>
                    <td><b>${ledger.admissionDateFormatted}</b></td>
                  </tr>
                  ` : ''}
                  ${periodFormatted && periodFormatted !== "—" ? `
                  <tr>
                    <td>${ledger?.isMonthly ? 'Coverage Period' : 'Payment Classification'}</td>
                    <td><b>${periodFormatted}</b></td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <div class="fee-section">
                <div class="fee-row">
                  <span class="fee-label">${ledger?.isMonthly ? 'Monthly Fee Rate' : 'Total Course Fee (Lump sum Plan)'}</span>
                  <span class="fee-amount">₹ ${ledger?.isMonthly ? paidAmountFormatted : ledger?.totalCourseFee?.toLocaleString('en-IN') || paidAmountFormatted}/-</span>
                </div>
                <div class="fee-row">
                  <span class="fee-label">Payment Status</span>
                  ${ledger?.isMonthly
                    ? `<span style="color: #2f855a; font-weight: bold;">✓ Monthly Fee Paid</span>`
                    : (ledger?.balanceDue > 0
                        ? `<span style="color: #c05621; font-weight: bold;">⚠️ Part Payment (Due: ₹ ${ledger?.balanceDue?.toLocaleString('en-IN')}/-)</span>`
                        : ((ledger?.previousPaid > 0)
                            ? `<span style="color: #2f855a; font-weight: bold;">✓ Final Payment (Paid in Full)</span>`
                            : `<span style="color: #2f855a; font-weight: bold;">✓ Paid in Full</span>`))}
                </div>

                ${!ledger?.isMonthly ? `
                <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e0; font-size: 8px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #4a5568;">Total Agreed Course Fee:</span>
                    <span style="font-weight: bold; color: #2d3748;">₹ ${ledger?.totalCourseFee?.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #4a5568;">Previous Payments Considered:</span>
                    <span style="font-weight: bold; color: #2d3748;">₹ ${ledger?.previousPaid?.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #4a5568;">Current Payment (This Voucher):</span>
                    <span style="font-weight: bold; color: #15803d;">₹ ${paidAmountFormatted}/-</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px; padding-top: 2px; border-top: 1px solid #e2e8f0;">
                    <span style="color: #2d3748; font-weight: bold;">Total Cumulative Paid:</span>
                    <span style="font-weight: bold; color: #1a3e6f;">₹ ${ledger?.totalPaidToDate?.toLocaleString('en-IN')}/-</span>
                  </div>
                  ${ledger?.balanceDue > 0 ? `
                  <div style="display: flex; justify-content: space-between; margin-top: 3px; background: #fffbeb; padding: 3px 4px; border-radius: 3px; border: 1px solid #fde68a;">
                    <span style="color: #92400e; font-weight: bold;">⚠️ Remaining Balance Due:</span>
                    <span style="font-weight: 800; color: #b45309;">₹ ${ledger?.balanceDue?.toLocaleString('en-IN')}/-</span>
                  </div>
                  ` : `
                  <div style="display: flex; justify-content: space-between; margin-top: 3px; background: #ecfdf5; padding: 3px 4px; border-radius: 3px; border: 1px solid #a7f3d0;">
                    <span style="color: #065f46; font-weight: bold;">✓ Fee Clearance Status:</span>
                    <span style="font-weight: bold; color: #047857;">100% Cleared (₹0 Balance Due)</span>
                  </div>
                  `}
                </div>
                ` : `
                <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e0; font-size: 8px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #4a5568;">Monthly Fee Rate:</span>
                    <span style="font-weight: bold; color: #2d3748;">₹ ${ledger.monthlyRate.toLocaleString('en-IN')}/- per month</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #4a5568;">Previous Payments Considered:</span>
                    <span style="font-weight: bold; color: #2d3748;">₹ ${ledger.previousPaid.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #4a5568;">Total Cumulative Paid to Date:</span>
                    <span style="font-weight: bold; color: #1a3e6f;">₹ ${ledger.totalPaidToDate.toLocaleString('en-IN')}/-</span>
                  </div>
                  ${ledger.coveredMonthsText ? `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 3px; background: #ecfdf5; padding: 2px 4px; border-radius: 3px; border: 1px solid #a7f3d0;">
                    <span style="color: #065f46; font-weight: bold;">Months Cleared by this Voucher:</span>
                    <span style="font-weight: bold; color: #047857;">${ledger.coveredMonthsText} (${ledger.coveredMonths.length} Months)</span>
                  </div>
                  ` : ''}
                  ${ledger.nextDueMonth ? `
                  <div style="display: flex; justify-content: space-between; margin-top: 3px; background: #fffbeb; padding: 3px 4px; border-radius: 3px; border: 1px solid #fde68a;">
                    <span style="color: #92400e; font-weight: bold;">⚠️ Next Due Month:</span>
                    <span style="font-weight: 800; color: #b45309;">${ledger.nextDueMonth} (Due: ₹ ${ledger.dueAmount.toLocaleString('en-IN')}/-)</span>
                  </div>
                  ` : ''}
                </div>
                `}

                <div class="amount-words">
                  Amount in words: Rupees ${amountInWords}
                </div>
              </div>

              <div class="qr-section">
                <div class="qr-info">
                  <div class="qr-title">📱 Pay Online via UPI</div>
                  <div class="qr-text">Scan official QR to pay installments or verify</div>
                  <div class="qr-text">Any UPI App (Google Pay, PhonePe, Paytm)</div>
                  <div class="upi-id">UPI ID: codernaccotax@okhdfcbank</div>
                </div>
                <div class="qr-code" style="width: 78px; height: 96px; display: flex; align-items: center; justify-content: center;">
                  <img src="${qrImgSrc}" alt="CNAT Payment QR Code" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px; border: 1px solid #e9d5ff;" />
                </div>
              </div>

              <div class="collector-info">
                <span class="collector-label">💰 Collected By:</span> ${collectorName}
                <span style="color: #6b7280; margin: 0 4px;">|</span> 
                <span class="collector-label">📋 Designation:</span> ${collectorDesignation}
                <br/>
                <span style="font-size: 7px; color: #9ca3af;">📅 Printed on: ${currentDateTime}</span>
              </div>

              <div class="footer">
                <div class="signature-area">
                  <div class="signature-line">
                    <p>Student's Signature</p>
                    <p>(Student)</p>
                  </div>
                  <div class="signature-line">
                    <p>Authorized Signatory</p>
                    <p>(Coder & AccoTax)</p>
                  </div>
                </div>
                <div class="footer-note">
                  This is a computer generated receipt - Valid without signature
                </div>
                <div class="contact-info">
                  <p>📞 For any query: <strong>7003756860</strong></p>
                  <p>🌐 Visit us: <strong style="color: #1a3e6f;">www.codernaccotax.co.in</strong></p>
                </div>
                <div class="thankyou">
                  ✨ Thank you for choosing Coder & AccoTax! ✨
                </div>
              </div>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }, 500);
          };
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };

  // Helper for mode badge colors
  const getModeBadge = (modeStr) => {
    const mode = (modeStr || "").toLowerCase();
    if (mode === "cash") {
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    }
    if (mode === "upi" || mode.includes("online")) {
      return "bg-sky-500/15 text-sky-400 border-sky-500/30";
    }
    if (mode.includes("bank") || mode.includes("neft")) {
      return "bg-purple-500/15 text-purple-400 border-purple-500/30";
    }
    if (mode.includes("cheque")) {
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    }
    return "bg-indigo-500/15 text-indigo-400 border-indigo-500/30";
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Background ambient glows */}
      <div className="fixed w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] -top-32 -left-20 pointer-events-none" />
      <div className="fixed w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[150px] top-1/2 -right-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Navigation Breadcrumb & Executive Command Center */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <span>/</span>
              <span className="text-slate-400">Finance &amp; Accounts</span>
              <span>/</span>
              <span className="text-emerald-400 font-semibold">Fees Management</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  Fees &amp; Collections Desk
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Record tuition payments, generate branded vouchers, query student fee ledgers, and audit collections.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Operations & Utilities Hub */}
          <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
            {/* Primary Action 1: Record Fee Payment */}
            <button
              type="button"
              onClick={handleOpenNewPaymentModal}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              title="Record a fresh fee receipt for an already admitted student"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Record Fee Payment</span>
            </button>

            {/* Primary Action 2: Student Fee Ledger */}
            <button
              type="button"
              onClick={() => {
                setShowLedgerSelectorModal(true);
                setLedgerSearchTerm("");
                if (admissionsList.length === 0) {
                  setLoadingAdmissions(true);
                  api.get("/admissions")
                    .then((res) => {
                      const list = res?.data?.data || res?.data || [];
                      setAdmissionsList(Array.isArray(list) ? list.filter((a) => a.student) : []);
                    })
                    .catch((e) => console.error("Error loading admissions:", e))
                    .finally(() => setLoadingAdmissions(false));
                }
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              title="View & Print Student Fee Ledger by Admission ID"
            >
              <BookOpen className="w-4 h-4 stroke-[2]" />
              <span>Student Ledger</span>
            </button>

            {/* Primary Action 3: Student & Course-wise Due List */}
            <button
              type="button"
              onClick={() => {
                setShowDueListModal(true);
                fetchDuesList();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              title="Audit Student & Course-wise Outstanding Dues (Handles multi-course students)"
            >
              <AlertCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Outstanding Due List</span>
            </button>

            {/* Secondary Utilities: + Admission, Export, Print, Refresh */}
            <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
              <Link
                to="/students/student-admission"
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition flex items-center gap-1 shadow-sm"
                title="Register and admit a new student"
              >
                <span>+ Admission</span>
              </Link>

              <button
                onClick={handleExportExcel}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-emerald-400 border border-slate-700/80 transition flex items-center gap-1 cursor-pointer"
                title="Export filtered records to Excel"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrintTable}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-sky-400 border border-slate-700/80 transition flex items-center gap-1 cursor-pointer"
                title="Print Current Table View"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={fetchReceipts}
                disabled={loading}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                title="Refresh Receipts"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-sky-400" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* INTERACTIVE KPI FINANCIAL STATS DECK (CLICK TO FILTER) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Total Collections */}
          <div
            onClick={() => { setActiveTab("ALL"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
            className={`rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition cursor-pointer relative overflow-hidden group ${
              activeTab === "ALL" && modeFilter === "ALL" && typeFilter === "ALL"
                ? "bg-slate-900/90 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/10"
                : "bg-slate-900/60 border border-slate-800/80 hover:border-slate-700"
            }`}
          >
            <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Total Collections</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                ₹
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
              ₹{stats.totalAmount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>Across <strong className="text-white">{stats.totalCount}</strong> receipts</span>
              <span className="text-[10px] text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition">View All →</span>
            </div>
          </div>

          {/* Cash Collections */}
          <div
            onClick={() => { setActiveTab("CASH"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
            className={`rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition cursor-pointer relative overflow-hidden group ${
              activeTab === "CASH"
                ? "bg-slate-900/90 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/10"
                : "bg-slate-900/60 border border-slate-800/80 hover:border-slate-700"
            }`}
          >
            <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-emerald-600/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Cash Collections</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ₹{stats.cashAmount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>{stats.cashCount} cash payments</span>
              <span className="text-[10px] text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition">Filter Cash →</span>
            </div>
          </div>

          {/* UPI & Online */}
          <div
            onClick={() => { setActiveTab("UPI"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
            className={`rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition cursor-pointer relative overflow-hidden group ${
              activeTab === "UPI"
                ? "bg-slate-900/90 border-2 border-sky-500/60 shadow-lg shadow-sky-500/10"
                : "bg-slate-900/60 border border-slate-800/80 hover:border-slate-700"
            }`}
          >
            <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-sky-500/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">UPI / QR Digital</span>
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-sky-400 tracking-tight">
              ₹{stats.upiAmount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>{stats.upiCount} digital payments</span>
              <span className="text-[10px] text-sky-400 font-semibold opacity-0 group-hover:opacity-100 transition">Filter UPI →</span>
            </div>
          </div>

          {/* Plan Collections Breakdown */}
          <div
            className={`rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition relative overflow-hidden ${
              activeTab === "MONTHLY" || activeTab === "NON_MONTHLY"
                ? "bg-slate-900/90 border-2 border-purple-500/60 shadow-lg shadow-purple-500/10"
                : "bg-slate-900/60 border border-slate-800/80"
            }`}
          >
            <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Plan Collections</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => { setActiveTab("MONTHLY"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
                className={`w-full flex items-center justify-between text-xs p-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === "MONTHLY" ? "bg-purple-500/30 text-white font-bold border border-purple-500/40" : "hover:bg-slate-800/60 text-slate-300"
                }`}
              >
                <span className="text-slate-400">Monthly ({stats.monthlyCount}):</span>
                <span className="text-emerald-300 font-bold font-mono">₹{stats.monthlyTotal.toLocaleString()}</span>
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab("NON_MONTHLY"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
                className={`w-full flex items-center justify-between text-xs p-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === "NON_MONTHLY" ? "bg-amber-500/30 text-white font-bold border border-amber-500/40" : "hover:bg-slate-800/60 text-slate-300"
                }`}
              >
                <span className="text-slate-400">Course Fee ({stats.lumpSumCount}):</span>
                <span className="text-amber-300 font-bold font-mono">₹{stats.lumpSumTotal.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>

        {/* WORKSPACE COMMAND BAR: FAST TABS + SEARCH & SORT */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
          {/* 1. Fast Category Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => { setActiveTab("ALL"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "ALL" && modeFilter === "ALL" && typeFilter === "ALL"
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span>All Receipts</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-black/20 rounded-full font-mono">
                {receipts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("MONTHLY"); setTypeFilter("ALL"); setModeFilter("ALL"); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "MONTHLY"
                  ? "bg-purple-500 text-white shadow-md shadow-purple-500/20"
                  : "bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span>Monthly Plans</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-black/20 rounded-full font-mono">
                {stats.monthlyCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("NON_MONTHLY"); setTypeFilter("ALL"); setModeFilter("ALL"); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "NON_MONTHLY"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span>Course Fee (Lump sum)</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-black/20 rounded-full font-mono">
                {stats.lumpSumCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("CASH"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "CASH"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Cash Desk</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-black/20 rounded-full font-mono">
                {stats.cashCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("UPI"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "UPI"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                  : "bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>UPI / QR</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-black/20 rounded-full font-mono">
                {stats.upiCount}
              </span>
            </button>

            {stats.todayCount > 0 && (
              <button
                type="button"
                onClick={() => { setActiveTab("TODAY"); setModeFilter("ALL"); setTypeFilter("ALL"); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === "TODAY"
                    ? "bg-teal-500 text-white shadow-md shadow-teal-500/20"
                    : "bg-slate-950/80 text-teal-400 hover:text-white hover:bg-slate-800 border border-teal-500/30"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Today's Receipts</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-black/20 rounded-full font-mono">
                  {stats.todayCount}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setShowDueListModal(true);
                fetchDuesList();
              }}
              className="ml-auto px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 hover:from-amber-500/30 hover:to-rose-500/30 border border-amber-500/40 shadow-sm"
              title="Open Student & Course-wise Due List Desk"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Outstanding Due Desk</span>
            </button>
          </div>

          {/* 2. Unified Search Bar & Dropdown Selectors */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student name, registration #, receipt # (e.g. REC-10004), phone, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Sort */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Payment Mode */}
              <div className="flex items-center gap-1 text-xs">
                <select
                  value={modeFilter}
                  onChange={(e) => setModeFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                  title="Filter by payment mode"
                >
                  <option value="ALL">All Modes</option>
                  <option value="Cash">Cash Only</option>
                  <option value="UPI">UPI / Online</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              {/* Fee Plan Type */}
              <div className="flex items-center gap-1 text-xs">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                  title="Filter by fee plan type"
                >
                  <option value="ALL">All Plan Types</option>
                  <option value="monthly">Monthly Plans</option>
                  <option value="non_monthly">Course Fees (Lump sum)</option>
                </select>
              </div>

              {/* Sort Order Selector */}
              <div className="flex items-center gap-1 text-xs">
                <select
                  value={`${sortField}_${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split("_");
                    setSortField(field);
                    setSortOrder(order);
                  }}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
                  title="Sort order"
                >
                  <option value="date_desc">Date: Newest First</option>
                  <option value="date_asc">Date: Oldest First</option>
                  <option value="amount_desc">Amount: Highest First</option>
                  <option value="amount_asc">Amount: Lowest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Status summary bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
            <div className="flex items-center gap-2">
              <span>Showing <strong className="text-white">{filteredReceipts.length}</strong> of <strong className="text-slate-300">{receipts.length}</strong> receipts</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-bold">Filtered Total: ₹{filteredTotalAmount.toLocaleString()}/-</span>
            </div>

            {(searchTerm || modeFilter !== "ALL" || typeFilter !== "ALL" || activeTab !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setModeFilter("ALL");
                  setTypeFilter("ALL");
                  setActiveTab("ALL");
                }}
                className="text-xs text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* RECEIPTS DATA TABLE */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                  <th className="p-3.5">Receipt #</th>
                  <th className="p-3.5">Payment Date</th>
                  <th className="p-3.5">Student &amp; Contact</th>
                  <th className="p-3.5">Course Program</th>
                  <th className="p-3.5">Mode</th>
                  <th className="p-3.5">Coverage / Status</th>
                  <th className="p-3.5 text-right">Amount Paid</th>
                  <th className="p-3.5 text-center">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
                        <span className="text-xs">Loading fee receipts...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredReceipts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Receipt className="w-10 h-10 text-slate-600 stroke-[1.5]" />
                        <p className="text-sm font-semibold text-slate-300">No payment receipts found</p>
                        <p className="text-xs text-slate-500 max-w-sm">
                          {searchTerm
                            ? `No records match your search "${searchTerm}".`
                            : "No student fee payments have been recorded for the selected filter."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredReceipts.map((r) => {
                    const receiptNo = r.receiptNo || r.receipt_no;
                    const studentName = r.studentName || r.student_name || r.student?.student_name || "Student";
                    const regNo = r.registrationNumber || r.registration_number || r.student?.registration_number;
                    const studentPhone = r.studentPhone || r.phone || r.student?.whatsapp || r.student?.phone;
                    const courseName = r.courseName || r.course_name || r.course?.course_name || "Course";
                    const mode = r.paymentMode || r.payment_mode || "Cash";
                    const feeType = (r.feeType || r.fee_type || "").toLowerCase();
                    const amt = Number(r.amountPaid || r.amount_paid || 0);
                    const rawDate = r.paymentDate || r.payment_date || r.createdAt || r.created_at;
                    const payDateFormatted = rawDate
                      ? new Date(rawDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A";

                    return (
                      <tr
                        key={r.id || receiptNo}
                        className="hover:bg-slate-800/40 transition group"
                      >
                        {/* Receipt No with copy trigger */}
                        <td className="p-3.5 font-mono text-xs font-bold text-sky-400 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded-lg">
                              {receiptNo}
                            </span>
                            <button
                              onClick={() => handleCopyReceipt(receiptNo)}
                              className="opacity-0 group-hover:opacity-100 transition text-slate-500 hover:text-white p-0.5 rounded cursor-pointer"
                              title="Copy Receipt #"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            {copyFeedback === receiptNo && (
                              <span className="text-[10px] text-emerald-400 font-sans font-normal">Copied!</span>
                            )}
                          </div>
                        </td>

                        {/* Payment Date */}
                        <td className="p-3.5 text-slate-300 whitespace-nowrap text-xs">
                          {payDateFormatted}
                        </td>

                        {/* Student Details with Avatar & WhatsApp */}
                        <td className="p-3.5 min-w-[200px]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 font-mono shadow-sm">
                              {studentName.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-white truncate text-xs sm:text-sm flex items-center gap-1.5">
                                <span>{studentName}</span>
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                                {regNo && <span className="text-slate-300">{regNo}</span>}
                                {studentPhone && (
                                  <>
                                    <span className="text-slate-600">•</span>
                                    <a
                                      href={`https://api.whatsapp.com/send?phone=91${studentPhone.replace(/\D/g, "")}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-emerald-400 hover:underline flex items-center gap-0.5"
                                      title="Open WhatsApp Chat"
                                    >
                                      <MessageCircle className="w-2.5 h-2.5" />
                                      <span>{studentPhone}</span>
                                    </a>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Course & Plan Badge */}
                        <td className="p-3.5 min-w-[180px]">
                          <p className="text-xs font-semibold text-slate-200 truncate">
                            {courseName}
                          </p>
                          <span
                            className={`inline-block mt-0.5 px-2 py-0.2 rounded text-[9px] font-semibold ${
                              feeType === "monthly"
                                ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                                : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {feeType === "monthly" ? "Monthly Plan" : "Course Fee Plan"}
                          </span>
                        </td>

                        {/* Payment Mode Badge */}
                        <td className="p-3.5 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1 w-fit ${getModeBadge(mode)}`}>
                            {mode.toLowerCase() === "cash" ? (
                              <Wallet className="w-3 h-3" />
                            ) : (
                              <CreditCard className="w-3 h-3" />
                            )}
                            <span>{mode}</span>
                          </span>
                        </td>

                        {/* Period / Coverage */}
                        <td className="p-3.5 text-[11px] text-slate-300 whitespace-nowrap">
                          {(() => {
                            const cov = formatPeriodCoverage(r);
                            if (cov === "Part Payment") {
                              return (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  Part Payment
                                </span>
                              );
                            }
                            if (cov === "Final Payment") {
                              return (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                                  Final Payment
                                </span>
                              );
                            }
                            if (cov === "Paid in Full") {
                              return (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                  Paid in Full
                                </span>
                              );
                            }
                            if (cov !== "—") {
                              return <span className="font-semibold text-slate-200">{cov}</span>;
                            }
                            return <span className="text-slate-600">—</span>;
                          })()}
                        </td>

                        {/* Amount */}
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <span className="font-extrabold text-emerald-400 text-sm sm:text-base font-mono">
                            ₹{amt.toLocaleString()}
                          </span>
                        </td>

                        {/* Action Dock: 4 Quick Actions */}
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* 1. Official Voucher Modal */}
                            <button
                              type="button"
                              onClick={() => setSelectedReceipt(r)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition cursor-pointer flex items-center gap-1"
                              title="View Official Receipt Voucher"
                            >
                              <FileText className="w-3.5 h-3.5 text-sky-400" />
                              <span>Voucher</span>
                            </button>

                            {/* 2. Direct Print Official Voucher */}
                            <button
                              type="button"
                              onClick={() => handlePrintOfficialVoucher(r)}
                              className="p-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition cursor-pointer"
                              title="Direct Print Official Voucher"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            {/* 3. Send WhatsApp Voucher */}
                            <button
                              type="button"
                              onClick={() => handleSendWhatsApp(r)}
                              className="p-1.5 rounded-lg text-xs font-semibold bg-emerald-600/15 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition cursor-pointer"
                              title="Share Fee Voucher via WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>

                            {/* 4. Student Fee Ledger */}
                            <button
                              type="button"
                              onClick={() => handleOpenLedgerForReceipt(r)}
                              className="p-1.5 rounded-lg text-xs font-semibold bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 transition cursor-pointer"
                              title="View & Print Full Student Ledger (Account Statement)"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POPUP RECORD FRESH FEE PAYMENT MODAL */}
      <AnimatePresence>
        {showNewPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-5 sm:p-6 space-y-4 my-auto max-h-[95vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                      Record Fresh Fee Payment
                    </h3>
                    <p className="text-xs text-slate-400">
                      Collect tuition installment for an already admitted student
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewPaymentModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleRecordPaymentSubmit} className="space-y-4 overflow-y-auto pr-1">
                {/* 1. Select Admitted Student */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>1. Select Admitted Student</span>
                    {selectedAdmission && (
                      <button
                        type="button"
                        onClick={() => setSelectedAdmission(null)}
                        className="text-xs text-sky-400 hover:underline cursor-pointer lowercase"
                      >
                        (change student)
                      </button>
                    )}
                  </label>

                  {loadingAdmissions ? (
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                      Loading admitted students...
                    </div>
                  ) : !selectedAdmission ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={studentSearchTerm}
                          onChange={(e) => setStudentSearchTerm(e.target.value)}
                          placeholder="Search student by name, registration #, or WhatsApp..."
                          className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/60 divide-y divide-slate-800/60">
                        {admissionsList
                          .filter((adm) => {
                            if (!studentSearchTerm.trim()) return true;
                            const term = studentSearchTerm.toLowerCase();
                            const sName = (adm.student?.studentName || adm.student?.student_name || "").toLowerCase();
                            const reg = (adm.admissionNumber || adm.student?.registrationNumber || "").toLowerCase();
                            const phone = (adm.student?.whatsapp || adm.student?.phone1 || "").toLowerCase();
                            const cName = (adm.course?.courseName || adm.course?.course_name || "").toLowerCase();
                            return sName.includes(term) || reg.includes(term) || phone.includes(term) || cName.includes(term);
                          })
                          .map((adm) => (
                            <div
                              key={adm.admissionId || adm.id}
                              onClick={() => handleSelectAdmission(adm)}
                              className="p-2.5 hover:bg-emerald-500/10 transition cursor-pointer flex items-center justify-between group"
                            >
                              <div>
                                <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 flex items-center gap-2">
                                  <span>{adm.student?.studentName || adm.student?.student_name}</span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                                    {adm.student?.registrationNumber || adm.admissionNumber}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5">
                                  Course: <strong className="text-slate-300">{adm.course?.courseName || adm.course?.course_name}</strong>
                                  {" • "}
                                  <span>{Number(adm.feeModesId) === 1 ? "Monthly Plan" : "Lumpsum Plan"}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-bold text-emerald-400">
                                  ₹{Number(adm.courseFees || adm.course?.courseFees || 0).toLocaleString("en-IN")}
                                </span>
                                <div className="text-[10px] text-slate-500">
                                  {Number(adm.feeModesId) === 1 ? "/ month" : "total fee"}
                                </div>
                              </div>
                            </div>
                          ))}
                        {admissionsList.length === 0 && (
                          <div className="p-4 text-center text-xs text-slate-400">
                            No admitted students found in database.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Selected Student Summary Card */
                    <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span className="text-sm">{selectedAdmission.student?.studentName || selectedAdmission.student?.student_name}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono border border-emerald-500/30">
                            {selectedAdmission.student?.registrationNumber || selectedAdmission.admissionNumber}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-200/80">
                          Course: <strong className="text-white">{selectedAdmission.course?.courseName || selectedAdmission.course?.course_name}</strong>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Phone / WhatsApp: <span className="font-mono text-slate-300">{selectedAdmission.student?.whatsapp || selectedAdmission.student?.phone1 || "N/A"}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-emerald-400 block">
                          ₹{Number(selectedAdmission.courseFees || selectedAdmission.course?.courseFees || 0).toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-emerald-400/70 font-semibold uppercase">
                          {Number(selectedAdmission.feeModesId) === 1 ? "Monthly Rate" : "Total Fee"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Live Dues & Accounting Breakdown */}
                {selectedAdmission && (() => {
                  const ledger = getAdmissionLedger(selectedAdmission);
                  if (!ledger) return null;
                  const monthsToClear = getMonthsClearedByEnteredAmount(ledger, paymentAmount);

                  return (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>2. Current Dues & Accounting Ledger</span>
                      </label>

                      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300 text-[11px]">
                          <div>
                            <span className="text-slate-500 block">Admission Date:</span>
                            <span className="font-semibold text-white">{ledger.admissionDate || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Previously Paid:</span>
                            <span className="font-semibold text-white font-mono">₹{ledger.previousPaid.toLocaleString("en-IN")}/-</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Fee Plan:</span>
                            <span className="font-semibold text-emerald-400">
                              {ledger.isMonthly ? `Monthly (₹${ledger.monthlyRate}/mo)` : "Lump sum Course Fee"}
                            </span>
                          </div>
                        </div>

                        {ledger.isMonthly ? (
                          <div className="space-y-1.5 pt-2 border-t border-dashed border-slate-800">
                            {ledger.clearedMonthsList.length > 0 ? (
                              <div className="text-[11px] text-slate-400">
                                <span className="text-emerald-400 font-semibold">Months Already Cleared:</span>{" "}
                                {ledger.clearedMonthsList.join(", ")} ({ledger.monthsCleared} Months)
                              </div>
                            ) : (
                              <div className="text-[11px] text-slate-400 italic">
                                No prior monthly installments recorded.
                              </div>
                            )}

                            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between text-xs">
                              <span className="font-bold flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4 text-amber-400" />
                                Next Due Month: {ledger.nextDueMonth}
                              </span>
                              <span className="font-extrabold font-mono text-amber-400">
                                Due: ₹{ledger.monthlyRate.toLocaleString("en-IN")}/-
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1.5 pt-2 border-t border-dashed border-slate-800">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-400">Total Course Fee:</span>
                              <span className="font-bold text-white font-mono">₹{ledger.totalCourseFee.toLocaleString("en-IN")}/-</span>
                            </div>
                            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between text-xs">
                              <span className="font-bold flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4 text-amber-400" />
                                Outstanding Balance Due:
                              </span>
                              <span className="font-extrabold font-mono text-amber-400">
                                ₹{ledger.balanceDue.toLocaleString("en-IN")}/-
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 3. Enter Payment Details */}
                      <div className="space-y-3 pt-2">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                          3. Payment Details
                        </label>

                        {/* Amount */}
                        <div>
                          <div className="flex justify-between items-center text-xs mb-1.5">
                            <span className="text-slate-300 font-semibold">Amount Received (₹):</span>
                            {ledger.isMonthly && (
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setPaymentAmount(ledger.monthlyRate.toString())}
                                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-sky-400 hover:bg-slate-700 cursor-pointer"
                                >
                                  1 Mo (₹{ledger.monthlyRate})
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPaymentAmount((ledger.monthlyRate * 2).toString())}
                                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-sky-400 hover:bg-slate-700 cursor-pointer"
                                >
                                  2 Mos (₹{ledger.monthlyRate * 2})
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPaymentAmount((ledger.monthlyRate * 3).toString())}
                                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-sky-400 hover:bg-slate-700 cursor-pointer"
                                >
                                  3 Mos (₹{ledger.monthlyRate * 3})
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="relative">
                            <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                            <input
                              type="number"
                              min="1"
                              step="any"
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              placeholder="Enter amount received..."
                              required
                              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          {/* Dynamic Clearance Feedback */}
                          {ledger.isMonthly && monthsToClear.length > 0 && (
                            <div className="mt-1.5 text-[11px] text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>
                                This payment clears: <strong>{monthsToClear.join(", ")}</strong> ({monthsToClear.length} Month{monthsToClear.length > 1 ? "s" : ""})
                              </span>
                            </div>
                          )}

                          {!ledger.isMonthly && paymentAmount && (
                            <div className="mt-1.5 text-[11px] text-slate-300 flex items-center justify-between bg-slate-800/70 p-2 rounded-lg border border-slate-700">
                              <span>Remaining Balance after this payment:</span>
                              <strong className="font-mono text-amber-400">
                                ₹{Math.max(0, ledger.balanceDue - Number(paymentAmount)).toLocaleString("en-IN")}/-
                              </strong>
                            </div>
                          )}
                        </div>

                        {/* Mode & Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-300 font-semibold mb-1 block">
                              Payment Mode:
                            </label>
                            <select
                              value={paymentMode}
                              onChange={(e) => setPaymentMode(e.target.value)}
                              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                            >
                              <option value="Cash">Cash</option>
                              <option value="UPI">UPI / Google Pay / PhonePe</option>
                              <option value="Bank Transfer">Bank Transfer (NEFT/IMPS)</option>
                              <option value="Card">Debit / Credit Card</option>
                              <option value="Cheque">Cheque</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs text-slate-300 font-semibold mb-1 block">
                              Payment Date:
                            </label>
                            <input
                              type="date"
                              value={paymentDate}
                              onChange={(e) => setPaymentDate(e.target.value)}
                              max={new Date().toISOString().split("T")[0]}
                              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Submit Buttons */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowNewPaymentModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingPayment || !selectedAdmission || !paymentAmount}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white transition flex items-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingPayment ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Recording Payment...</span>
                      </>
                    ) : (
                      <>
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>Confirm &amp; Record Payment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP OFFICIAL RECEIPT VOUCHER MODAL */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-4 sm:p-6 space-y-4 my-auto max-h-[95vh] flex flex-col"
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                      Official Fee Receipt Voucher
                      <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Official
                      </span>
                    </h3>
                    <p className="text-xs text-sky-400 font-mono">
                      {selectedReceipt.receiptNo || selectedReceipt.receipt_no}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  title="Close Voucher"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Container for Preview Document */}
              <div className="overflow-y-auto pr-1 flex-1 py-1">
                {/* Authentic White Paper Voucher Slip Container */}
                <div
                  ref={receiptCardRef}
                  className="w-full max-w-xl mx-auto bg-white text-slate-900 rounded-2xl shadow-xl overflow-hidden relative border border-slate-200 p-5 sm:p-6 select-text font-serif"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
                    <img
                      src={logoDataUrl || CNATLogo || "/assets/cnat.png"}
                      alt="Watermark"
                      className="w-64 h-auto transform -rotate-25"
                    />
                  </div>

                  {/* PAID Stamp Image */}
                  <div className="absolute top-[56%] right-[8%] transform -translate-y-1/2 -rotate-12 z-20 pointer-events-none">
                    <img
                      src={paidStampDataUrl || paidStamp}
                      alt="Paid Stamp"
                      className="w-28 sm:w-32 opacity-70 drop-shadow-md"
                    />
                  </div>

                  <div className="relative z-10 space-y-4">
                    {/* Header Section */}
                    <div className="text-center border-b-2 border-[#1a3e6f] pb-3">
                      <div className="flex items-center justify-center gap-2.5 mb-1">
                        <img
                          src={logoDataUrl || CNATLogo || "/assets/cnat.png"}
                          alt="Coder & AccoTax Logo"
                          className="h-9 w-auto"
                        />
                        <span className="text-2xl font-bold tracking-tight text-[#1a3e6f]">
                          CODER &amp; ACCOTAX
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 font-sans">
                        Quality Education | Professional Training | Tax Solutions
                      </p>
                      <p className="text-[9px] text-slate-500 font-sans mt-0.5">
                        25(10/A) Shibtala Road, PO-N C Pukur, Barrackpore, Kolkata-700122
                      </p>
                      <div className="flex items-center justify-center gap-4 text-[9px] text-slate-500 font-sans mt-0.5">
                        <span>📞 +91 70037 56860</span>
                        <span>✉️ info@codernaccotax.co.in</span>
                      </div>
                      <div className="mt-2.5">
                        <span className="text-xs uppercase font-bold tracking-wider px-3.5 py-1 bg-slate-100 text-slate-800 rounded-full border border-slate-200 font-sans">
                          Fee Payment Receipt
                        </span>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                          Registration No.
                        </span>
                        <span className="font-mono font-bold text-slate-800 text-xs">
                          {selectedReceipt.registrationNumber || selectedReceipt.registration_number || selectedReceipt.student?.registration_number || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                          Receipt No.
                        </span>
                        <span className="font-mono font-bold text-sky-700 text-xs">
                          {selectedReceipt.receiptNo || selectedReceipt.receipt_no}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                          Payment Date
                        </span>
                        <span className="font-medium text-slate-800">
                          {selectedReceipt.paymentDate ? new Date(selectedReceipt.paymentDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                          Payment Mode
                        </span>
                        <span className="font-bold text-emerald-700">
                          {selectedReceipt.paymentMode || selectedReceipt.payment_mode || "Cash"}
                        </span>
                      </div>
                    </div>

                    {/* Student & Course Details Table */}
                    <div className="font-sans">
                      <div className="text-xs font-bold text-[#1a3e6f] border-l-3 border-[#1a3e6f] pl-2 mb-1.5 uppercase tracking-wide">
                        Student &amp; Course Details
                      </div>
                      <table className="w-full text-xs border-collapse">
                        <tbody>
                          <tr className="border-b border-slate-200">
                            <td className="py-1.5 text-slate-600 font-semibold w-1/3">Student Name</td>
                            <td className="py-1.5 text-slate-900 font-bold">
                              {selectedReceipt.studentName || selectedReceipt.student_name || selectedReceipt.student?.student_name}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="py-1.5 text-slate-600 font-semibold">Phone Number</td>
                            <td className="py-1.5 text-slate-800">
                              {selectedReceipt.studentPhone || selectedReceipt.phone || selectedReceipt.student?.whatsapp || selectedReceipt.student?.phone || "N/A"}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="py-1.5 text-slate-600 font-semibold">Course Enrolled</td>
                            <td className="py-1.5 text-slate-900 font-medium">
                              {selectedReceipt.courseName || selectedReceipt.course_name || selectedReceipt.course?.course_name}
                            </td>
                          </tr>
                          {getLedgerDetails(selectedReceipt)?.admissionDateFormatted && getLedgerDetails(selectedReceipt).admissionDateFormatted !== "N/A" && (
                            <tr className="border-b border-slate-200">
                              <td className="py-1.5 text-slate-600 font-semibold">Admission Date</td>
                              <td className="py-1.5 text-slate-900 font-bold">
                                {getLedgerDetails(selectedReceipt).admissionDateFormatted}
                              </td>
                            </tr>
                          )}
                          {formatPeriodCoverage(selectedReceipt) !== "—" && (
                            <tr className="border-b border-slate-200">
                              <td className="py-1.5 text-slate-600 font-semibold">
                                {getLedgerDetails(selectedReceipt)?.isMonthly ? "Coverage Period" : "Payment Classification"}
                              </td>
                              <td className="py-1.5 text-slate-900 font-bold">
                                {formatPeriodCoverage(selectedReceipt)}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Fee Summary & Ledger Box */}
                    {(() => {
                      const ledger = getLedgerDetails(selectedReceipt);
                      return (
                        <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 font-sans space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-700">
                              {ledger?.isMonthly ? "Monthly Installment Paid" : "Total Course Fee"}
                            </span>
                            <span className="text-base font-extrabold text-slate-900">
                              ₹{Number(ledger?.isMonthly ? selectedReceipt.amountPaid || selectedReceipt.amount_paid || 0 : ledger?.totalCourseFee || selectedReceipt.amountPaid || 0).toLocaleString("en-IN")}/-
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-600">Payment Status:</span>
                            {ledger?.isMonthly ? (
                              <span className="font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[11px] border border-emerald-300">
                                ✓ Monthly Fee Paid
                              </span>
                            ) : ledger?.balanceDue > 0 ? (
                              <span className="font-bold text-amber-700 flex items-center gap-1 bg-amber-100/80 px-2 py-0.5 rounded-full text-[11px] border border-amber-300">
                                ⚠️ Part Payment (Due: ₹{ledger?.balanceDue?.toLocaleString("en-IN")}/-)
                              </span>
                            ) : ledger?.previousPaid > 0 ? (
                              <span className="font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[11px] border border-emerald-300">
                                ✓ Final Payment (Paid in Full)
                              </span>
                            ) : (
                              <span className="font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[11px] border border-emerald-300">
                                ✓ Paid in Full
                              </span>
                            )}
                          </div>

                          {/* Non-Monthly Ledger Breakdown */}
                          {!ledger?.isMonthly && (
                            <div className="pt-2 border-t border-dashed border-sky-300 text-xs space-y-1.5">
                              <div className="flex justify-between text-slate-600 text-[11px]">
                                <span>Total Agreed Course Fee:</span>
                                <span className="font-bold text-slate-800 font-mono">
                                  ₹{ledger?.totalCourseFee?.toLocaleString("en-IN")}/-
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-600 text-[11px]">
                                <span>Previous Payments Considered:</span>
                                <span className="font-bold text-slate-800 font-mono">
                                  ₹{ledger?.previousPaid?.toLocaleString("en-IN")}/-
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-600 text-[11px]">
                                <span>Current Payment (This Voucher):</span>
                                <span className="font-bold text-emerald-700 font-mono">
                                  ₹{Number(selectedReceipt.amountPaid || selectedReceipt.amount_paid || 0).toLocaleString("en-IN")}/-
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-600 text-[11px] pt-1 border-t border-slate-200">
                                <span className="font-semibold text-slate-700">Total Cumulative Paid:</span>
                                <span className="font-extrabold text-[#1a3e6f] font-mono">
                                  ₹{ledger?.totalPaidToDate?.toLocaleString("en-IN")}/-
                                </span>
                              </div>
                              {ledger?.balanceDue > 0 ? (
                                <div className="p-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-[11px] flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <span className="text-amber-600 text-xs">⚠️</span>
                                    <span className="font-bold">Outstanding Balance Due:</span>
                                  </div>
                                  <span className="font-mono font-black text-amber-800 text-xs">
                                    ₹{ledger.balanceDue.toLocaleString("en-IN")}/-
                                  </span>
                                </div>
                              ) : (
                                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="font-bold">Course Fee Status:</span>
                                  </div>
                                  <span className="font-mono font-bold text-emerald-800">
                                    100% Cleared (₹0 Due)
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Monthly Ledger Breakdown */}
                          {ledger?.isMonthly && (
                            <div className="pt-2 border-t border-dashed border-sky-300 text-xs space-y-1.5">
                              <div className="flex justify-between text-slate-600 text-[11px]">
                                <span>Monthly Fee Rate:</span>
                                <span className="font-bold text-slate-800 font-mono">
                                  ₹{ledger.monthlyRate.toLocaleString("en-IN")}/- per month
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-600 text-[11px]">
                                <span>Previous Payments Considered:</span>
                                <span className="font-bold text-slate-800 font-mono">
                                  ₹{ledger.previousPaid.toLocaleString("en-IN")}/-
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-600 text-[11px]">
                                <span>Total Cumulative Paid to Date:</span>
                                <span className="font-bold text-[#1a3e6f] font-mono">
                                  ₹{ledger.totalPaidToDate.toLocaleString("en-IN")}/-
                                </span>
                              </div>

                              {ledger.coveredMonthsText && (
                                <div className="p-2 rounded-lg bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-[11px] flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold">Months Cleared by this Payment:</span>{" "}
                                    <span className="font-semibold">{ledger.coveredMonthsText}</span>{" "}
                                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                                      {ledger.coveredMonths.length} Months
                                    </span>
                                  </div>
                                </div>
                              )}

                              {ledger.nextDueMonth && (
                                <div className="p-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-[11px] flex items-start justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-amber-600 text-xs">⚠️</span>
                                    <div>
                                      <span className="font-bold">Next Due Month:</span>{" "}
                                      <span className="font-extrabold text-amber-800">{ledger.nextDueMonth}</span>
                                    </div>
                                  </div>
                                  <span className="font-mono font-extrabold text-amber-800">
                                    Due: ₹{ledger.dueAmount.toLocaleString("en-IN")}/-
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="pt-2 border-t border-dashed border-sky-300 text-[11px] text-slate-700 italic font-medium">
                            Amount in words: Rupees {numberToWords(Number(selectedReceipt.amountPaid || selectedReceipt.amount_paid || 0))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Official Payment QR Code Section */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/70 border border-purple-200 font-sans">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-purple-900">📱 Pay Online via UPI</p>
                        <p className="text-[9px] text-slate-600">Scan official QR to pay installments or verify</p>
                        <p className="text-[9px] text-slate-500">Works with Google Pay, PhonePe, Paytm, etc.</p>
                        <div className="inline-block mt-1 px-2 py-0.5 rounded bg-white border border-purple-200 text-[10px] font-mono font-bold text-[#1a3e6f]">
                          UPI ID: codernaccotax@okhdfcbank
                        </div>
                      </div>
                      <div className="shrink-0 bg-white p-1 rounded-lg border border-purple-200 shadow-sm flex items-center justify-center">
                        <img
                          src={qrCodeDataUrl || CNATQR || "/assets/CNAT_QR.jpeg"}
                          alt="CNAT Official Payment QR"
                          className="w-20 h-24 object-contain rounded"
                        />
                      </div>
                    </div>

                    {/* Collector Info */}
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-center text-[10px] font-sans text-slate-700">
                      <span className="font-bold text-emerald-800">💰 Collected By:</span> {getCollectorName()}
                      <span className="text-slate-400 mx-2">|</span>
                      <span className="font-bold text-emerald-800">📋 Designation:</span> {getCollectorDesignation()}
                    </div>

                    {/* Signatures */}
                    <div className="pt-4 flex justify-between items-end font-sans">
                      <div className="text-center w-40">
                        <p className="text-[9px] text-slate-500 mb-1">Student's Signature</p>
                        <div className="border-t border-slate-300 pt-1 text-[10px] font-semibold text-slate-700">
                          (Student)
                        </div>
                      </div>
                      <div className="text-center w-44">
                        <p className="text-[9px] text-slate-500 mb-1">Authorized Signatory</p>
                        <div className="border-t border-slate-300 pt-1 text-[10px] font-semibold text-slate-800">
                          (Coder &amp; AccoTax)
                        </div>
                      </div>
                    </div>

                    {/* Computer Generated Disclaimer */}
                    <div className="text-center border-t border-slate-200 pt-2 text-[8px] text-slate-500 font-sans space-y-0.5">
                      <p>This is a computer generated receipt - Valid without physical signature</p>
                      <p className="text-slate-600">📞 For query: <strong>7003756860</strong> | 🌐 Visit: <strong>www.codernaccotax.co.in</strong></p>
                      <p className="text-[#1a3e6f] font-bold text-[9px]">✨ Thank you for choosing Coder &amp; AccoTax! ✨</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveReceiptImage(selectedReceipt)}
                    disabled={isSavingImage}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    title="Save voucher as high-quality JPG image"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{isSavingImage ? "Saving..." : "Save JPG"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendWhatsApp(selectedReceipt)}
                    disabled={isSendingWhatsApp}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
                    title="Send voucher image and details to student on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{isSendingWhatsApp ? "Preparing..." : "WhatsApp"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenLedgerForReceipt(selectedReceipt)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition flex items-center gap-1.5 cursor-pointer"
                    title="View & Print Full Student Account Statement"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View Student Ledger</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrintOfficialVoucher(selectedReceipt)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
                    title="Print clean official A4 / slip receipt"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official Voucher</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP ADMISSION SELECTOR FOR STUDENT LEDGER */}
      <AnimatePresence>
        {showLedgerSelectorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-5 sm:p-6 space-y-4 my-auto max-h-[95vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg">
                      Student Fee Ledger
                    </h3>
                    <p className="text-xs text-slate-400">
                      View and print account statement based on Admission ID
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLedgerSelectorModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Unified Single Search & Query Form */}
              <div className="space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const trimmed = ledgerSearchTerm.trim();
                    if (!trimmed) return;
                    if (filteredAdmissions.length > 0) {
                      handleOpenLedgerForAdmission(filteredAdmissions[0].admissionId || filteredAdmissions[0].id);
                    } else {
                      handleOpenLedgerForAdmission(trimmed);
                    }
                  }}
                  className="space-y-1.5"
                >
                  <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        autoFocus
                        value={ledgerSearchTerm}
                        onChange={(e) => setLedgerSearchTerm(e.target.value)}
                        placeholder="Search by Admission ID (e.g. 14), Reg #, Student Name, Phone, Course..."
                        className="w-full bg-slate-800/90 border border-indigo-500/40 focus:border-indigo-400 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-inner"
                      />
                      {ledgerSearchTerm && (
                        <button
                          type="button"
                          onClick={() => setLedgerSearchTerm("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loadingLedger || !ledgerSearchTerm.trim()}
                      className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white transition disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0 shadow-lg shadow-indigo-600/25"
                    >
                      {loadingLedger ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                      <span>View Ledger</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                    <span>
                      {ledgerSearchTerm.trim()
                        ? `Found ${filteredAdmissions.length} matching admission${filteredAdmissions.length === 1 ? "" : "s"}`
                        : `Showing all ${admissionsList.length} admitted students`}
                    </span>
                    <span className="text-[10px] text-indigo-300">
                      Press <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[9px]">Enter ↵</kbd> to open
                    </span>
                  </div>
                </form>
              </div>

              {/* Admissions List */}
              <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/70 divide-y divide-slate-800/60 p-1">
                {loadingAdmissions ? (
                  <div className="p-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Loading admissions catalog...</span>
                  </div>
                ) : filteredAdmissions.length > 0 ? (
                  filteredAdmissions.map((adm) => {
                    const admId = adm.admissionId || adm.id;
                    const sName = adm.student?.studentName || adm.student?.student_name || "Unknown Student";
                    const sReg = adm.student?.registrationNumber || adm.student?.registration_number;
                    const admNo = adm.admissionNumber;
                    const cName = adm.course?.courseName || adm.course?.course_name || "Course";
                    const phone = adm.student?.whatsapp || adm.student?.phone1;
                    const isMonthly = Number(adm.feeModesId) === 1;

                    return (
                      <div
                        key={admId}
                        onClick={() => handleOpenLedgerForAdmission(admId)}
                        className="p-3 hover:bg-indigo-500/10 rounded-xl transition cursor-pointer flex items-center justify-between group gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-white">{sName}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-bold">
                              ID: #{admId}
                            </span>
                            {admNo && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                                {admNo}
                              </span>
                            )}
                            {sReg && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-mono">
                                {sReg}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap">
                            <span>Course: <strong className="text-slate-300">{cName}</strong></span>
                            <span>•</span>
                            <span className={isMonthly ? "text-sky-400 font-medium" : "text-amber-400 font-medium"}>
                              {isMonthly ? "Monthly Plan" : "Lump sum"}
                            </span>
                            {phone && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-slate-400">📞 {phone}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600/20 text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition cursor-pointer flex items-center gap-1 shadow-sm"
                          >
                            <span>Open Ledger</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 space-y-2">
                    <p>No student found locally matching <strong className="text-indigo-300">"{ledgerSearchTerm}"</strong></p>
                    <button
                      type="button"
                      onClick={() => handleOpenLedgerForAdmission(ledgerSearchTerm.trim())}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer"
                    >
                      Search backend database for "{ledgerSearchTerm}" →
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP FULL STUDENT FEE LEDGER STATEMENT MODAL */}
      <AnimatePresence>
        {showLedgerModal && selectedLedger && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-5 sm:p-6 space-y-4 my-auto max-h-[95vh] flex flex-col"
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                      <span>Student Fee Ledger Statement</span>
                      <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                        Admission #{selectedLedger.admission?.admissionId} ({selectedLedger.admission?.admissionNumber})
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Complete fee accounting audit, transaction timeline &amp; dues clearance
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLedgerModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="space-y-4 overflow-y-auto pr-1 flex-1">
                {/* Profile & Course Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-indigo-400 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                      👤 Student Information
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name:</span>
                      <strong className="text-white text-sm">{selectedLedger.student?.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registration #:</span>
                      <span className="font-mono font-semibold text-slate-200">{selectedLedger.student?.registrationNumber || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone / WhatsApp:</span>
                      <span className="font-mono text-slate-200">{selectedLedger.student?.whatsapp || selectedLedger.student?.phone || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">City / Address:</span>
                      <span className="text-slate-300">{selectedLedger.student?.city || selectedLedger.student?.address || "Barrackpore"}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-indigo-400 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                      📚 Academic Enrollment
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Enrolled Course:</span>
                      <strong className="text-white">{selectedLedger.course?.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Admission Date:</span>
                      <span className="text-slate-200 font-semibold">{selectedLedger.admission?.admissionDate || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fee Mode:</span>
                      <span className="text-emerald-400 font-bold">{selectedLedger.admission?.feeMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Agreed Fee Rate:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        ₹{Number(selectedLedger.admission?.agreedFee || 0).toLocaleString("en-IN")}/- {selectedLedger.admission?.isMonthly ? "per month" : "total"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">
                      {selectedLedger.admission?.isMonthly ? "Monthly Rate" : "Course Fee"}
                    </div>
                    <div className="text-lg font-black text-white mt-0.5">
                      ₹{Number(selectedLedger.admission?.isMonthly ? selectedLedger.summary?.monthlyRate : selectedLedger.summary?.totalCourseFee).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Cumulative Paid</div>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">
                      ₹{Number(selectedLedger.summary?.totalPaid || 0).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">
                      {selectedLedger.admission?.isMonthly ? "Next Due Month" : "Balance Due"}
                    </div>
                    <div className="text-lg font-black text-amber-400 mt-0.5">
                      {selectedLedger.admission?.isMonthly
                        ? (selectedLedger.summary?.nextDueMonth || "Up to Date")
                        : `₹${Number(selectedLedger.summary?.balanceDue || 0).toLocaleString("en-IN")}`}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Account Status</div>
                    <div className="text-xs font-black text-emerald-400 mt-1.5 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {selectedLedger.admission?.isMonthly
                          ? `${selectedLedger.summary?.clearedMonthsCount} Mos Cleared`
                          : selectedLedger.summary?.isPaidInFull
                          ? (selectedLedger.summary?.statusBadge?.includes("Final Payment") ? "Final Payment Cleared" : "Paid in Full")
                          : "Part Payment"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monthly Cleared Badges (if monthly) */}
                {selectedLedger.admission?.isMonthly && (
                  <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs flex items-center justify-between">
                    <div>
                      <strong className="text-emerald-300">✓ Cleared Months:</strong>{" "}
                      <span className="text-slate-200">{selectedLedger.summary?.clearedMonthsText || "None recorded yet"}</span>
                    </div>
                    {selectedLedger.summary?.nextDueMonth && (
                      <div className="text-amber-400 font-bold">
                        ⚠️ Due: {selectedLedger.summary?.nextDueMonth} (₹{Number(selectedLedger.summary?.dueAmount || 0).toLocaleString("en-IN")}/-)
                      </div>
                    )}
                  </div>
                )}

                {/* Transactions Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300 uppercase tracking-wider">
                      Transaction History ({selectedLedger.transactions?.length || 0} Receipts)
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[11px]">
                        <tr>
                          <th className="p-3 text-center w-10">#</th>
                          <th className="p-3">Payment Date</th>
                          <th className="p-3">Receipt No</th>
                          <th className="p-3">Coverage / Description</th>
                          <th className="p-3">Mode</th>
                          <th className="p-3 text-right">Amount Paid</th>
                          <th className="p-3 text-right">Cumulative Total</th>
                          <th className="p-3">Collector</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {(selectedLedger.transactions || []).length > 0 ? (
                          selectedLedger.transactions.map((t) => (
                            <tr key={t.receiptId || t.slNo} className="hover:bg-slate-800/40 transition">
                              <td className="p-3 text-center text-slate-400">{t.slNo}</td>
                              <td className="p-3 text-slate-200 font-medium">{t.paymentDate || "N/A"}</td>
                              <td className="p-3 font-mono font-bold text-emerald-400">{t.receiptNo}</td>
                              <td className="p-3 text-slate-300">{t.coveragePeriod}</td>
                              <td className="p-3 text-slate-300">{t.paymentMode}</td>
                              <td className="p-3 text-right font-mono font-bold text-emerald-300">
                                ₹{Number(t.amountPaid || 0).toLocaleString("en-IN")}/-
                              </td>
                              <td className="p-3 text-right font-mono font-bold text-indigo-300">
                                ₹{Number(t.runningTotal || 0).toLocaleString("en-IN")}/-
                              </td>
                              <td className="p-3 text-slate-400">{t.collectedBy}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="p-6 text-center text-slate-500">
                              No payment receipts recorded for this admission yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot className="bg-slate-900/90 font-bold border-t border-slate-800 text-xs">
                        <tr>
                          <td colSpan={5} className="p-3 text-right text-slate-400 uppercase">
                            Total Cumulative Paid:
                          </td>
                          <td className="p-3 text-right font-mono text-emerald-400 text-sm">
                            ₹{Number(selectedLedger.summary?.totalPaid || 0).toLocaleString("en-IN")}/-
                          </td>
                          <td className="p-3 text-right font-mono text-indigo-400 text-sm">
                            ₹{Number(selectedLedger.summary?.totalPaid || 0).toLocaleString("en-IN")}/-
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="border-t border-slate-800 pt-3 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setShowLedgerModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSendLedgerWhatsApp(selectedLedger)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer"
                    title="Share complete statement to student via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Statement</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrintStudentLedger(selectedLedger)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-teal-600 hover:from-indigo-400 hover:to-teal-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 cursor-pointer"
                    title="Print clean official A4 statement"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official A4 Ledger</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. STUDENT & COURSE-WISE OUTSTANDING DUE LIST MODAL */}
        {/* ========================================================= */}
        {showDueListModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl shadow-2xl p-4 sm:p-6 flex flex-col max-h-[92vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>Student & Course-wise Outstanding Due List</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                        Session 2026–2027
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Audit pending monthly installments & course fee balances across all enrollments • Multi-course support
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={fetchDuesList}
                    disabled={loadingDues}
                    className="p-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                    title="Reload fresh dues data"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingDues ? "animate-spin text-amber-400" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDueListModal(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Top Financial KPI Metrics Deck */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 my-3 shrink-0">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-rose-500/30">
                  <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Total Outstanding Due</div>
                  <div className="text-xl font-black font-mono text-rose-300 mt-0.5">
                    ₹{Number(duesData.summary?.totalOutstandingDue || 0).toLocaleString("en-IN")}/-
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Across all students & courses</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-amber-500/30">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Students with Dues</div>
                  <div className="text-xl font-black font-mono text-amber-300 mt-0.5">
                    {duesData.summary?.studentsWithDuesCount ?? 0}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ {duesData.summary?.totalStudents ?? 0} admitted</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Students with balance pending</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-purple-500/30">
                  <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Multi-Course Students</div>
                  <div className="text-xl font-black font-mono text-purple-300 mt-0.5">
                    {duesData.summary?.multiCourseStudentsCount ?? 0}
                    <span className="text-xs font-normal text-slate-400 ml-1">students</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Enrolled in 2 or more courses</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-teal-500/30">
                  <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Total Enrollments</div>
                  <div className="text-xl font-black font-mono text-teal-300 mt-0.5">
                    {duesData.summary?.totalEnrollments ?? 0}
                    <span className="text-xs font-normal text-slate-400 ml-1">active courses</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">As of {duesData.summary?.asOfDate || "Today"}</div>
                </div>
              </div>

              {/* View Toggle + Filter Chips + Search + Print / Export Toolbar */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 mb-3 space-y-2.5 shrink-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {/* View Mode Switcher (Group by Student vs Course-wise) */}
                  <div className="flex items-center p-0.5 bg-slate-900 border border-slate-700/80 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setDuesViewMode("STUDENT")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        duesViewMode === "STUDENT"
                          ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Group by Student (Consolidated)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDuesViewMode("COURSE")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        duesViewMode === "COURSE"
                          ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Course-wise Detailed List</span>
                    </button>
                  </div>

                  {/* Print & Export Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleExportDuesExcel}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                      title="Export Dues List to Excel (Student & Course sheets)"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Excel</span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePrintDueReport}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
                      title="Print Official A4 Due Report"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print A4 Statement</span>
                    </button>
                  </div>
                </div>

                {/* Filter Chips & Universal Search */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 pt-1 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setDuesFilter("DUES_ONLY")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                        duesFilter === "DUES_ONLY"
                          ? "bg-rose-500/25 text-rose-300 border border-rose-500/50 font-bold"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      Has Dues Only
                    </button>

                    <button
                      type="button"
                      onClick={() => setDuesFilter("MULTI_COURSE")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                        duesFilter === "MULTI_COURSE"
                          ? "bg-purple-500/25 text-purple-300 border border-purple-500/50 font-bold"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      Multi-Course (2+)
                    </button>

                    <button
                      type="button"
                      onClick={() => setDuesFilter("MONTHLY")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                        duesFilter === "MONTHLY"
                          ? "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      Monthly Dues
                    </button>

                    <button
                      type="button"
                      onClick={() => setDuesFilter("LUMPSUM")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                        duesFilter === "LUMPSUM"
                          ? "bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      Course Fee Dues
                    </button>

                    <button
                      type="button"
                      onClick={() => setDuesFilter("CLEARED")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                        duesFilter === "CLEARED"
                          ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 font-bold"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      Fully Cleared
                    </button>

                    <button
                      type="button"
                      onClick={() => setDuesFilter("ALL")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                        duesFilter === "ALL"
                          ? "bg-slate-700 text-white border border-slate-600 font-bold"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      All
                    </button>
                  </div>

                  <div className="relative min-w-[240px]">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={duesSearchTerm}
                      onChange={(e) => setDuesSearchTerm(e.target.value)}
                      placeholder="Search student, reg #, phone, course..."
                      className="w-full pl-8 pr-7 py-1 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    {duesSearchTerm && (
                      <button
                        type="button"
                        onClick={() => setDuesSearchTerm("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* DUES CONTENT AREA (SCROLLABLE) */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                {loadingDues ? (
                  <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                    <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mb-3" />
                    <p className="text-sm font-semibold">Calculating student and course-wise dues...</p>
                  </div>
                ) : duesViewMode === "STUDENT" ? (
                  /* VIEW 1: STUDENT GROUPED (CONSOLIDATED) */
                  filteredDuesStudents.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                      <AlertCircle className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                      <p className="text-sm">No students match the current dues filter or search criteria.</p>
                    </div>
                  ) : (
                    filteredDuesStudents.map((s) => {
                      const isExpanded = expandedStudents[s.studentId];
                      return (
                        <div
                          key={s.studentId}
                          className="bg-slate-950/60 border border-slate-800 hover:border-slate-700/90 rounded-xl overflow-hidden transition"
                        >
                          {/* Student Header Bar */}
                          <div className="p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-900/40">
                            {/* Student Identity */}
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm shrink-0">
                                {s.studentName ? s.studentName.charAt(0).toUpperCase() : "S"}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-white">{s.studentName}</span>
                                  {s.hasMultipleCourses && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold flex items-center gap-1">
                                      <span>📚</span> {s.totalCoursesCount} Courses
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                                  <span className="font-mono text-slate-300 bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px]">
                                    {s.studentRegNo || "—"}
                                  </span>
                                  <span>•</span>
                                  <span>{s.studentCity || "Barrackpore"}</span>
                                  {s.studentPhone && (
                                    <>
                                      <span>•</span>
                                      <a
                                        href={`https://wa.me/${s.studentPhone.replace(/\D/g, "").length === 10 ? `91${s.studentPhone.replace(/\D/g, "")}` : s.studentPhone.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                                      >
                                        <MessageCircle className="w-3 h-3" />
                                        <span>{s.studentPhone}</span>
                                      </a>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Dues Financial Summary & Action Dock */}
                            <div className="flex items-center gap-4 self-end md:self-center">
                              <div className="text-right">
                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Dues</div>
                                <div
                                  className={`text-base font-black font-mono ${
                                    s.totalDue > 0 ? "text-rose-400" : "text-emerald-400"
                                  }`}
                                >
                                  {s.totalDue > 0 ? `₹${Number(s.totalDue).toLocaleString("en-IN")}/-` : "₹0 (Cleared)"}
                                </div>
                                <div className="text-[10px] text-slate-500">
                                  Paid: ₹{Number(s.totalPaid || 0).toLocaleString("en-IN")}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleSendDueReminderWhatsApp(s)}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white transition flex items-center gap-1 shadow-sm cursor-pointer"
                                  title="Send WhatsApp reminder for all courses"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">WhatsApp</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => toggleStudentExpand(s.studentId)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
                                  title={isExpanded ? "Collapse course details" : "Expand course details"}
                                >
                                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Course Breakdown Drawer */}
                          {isExpanded && (
                            <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
                              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                                <span>Enrolled Courses Breakdown ({s.courses.length})</span>
                                <span className="text-[10px] text-slate-500 font-normal">
                                  Click 'Pay Fee' to record payment for specific course
                                </span>
                              </div>

                              <div className="space-y-2">
                                {s.courses.map((c, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs"
                                  >
                                    {/* Course Information */}
                                    <div className="flex items-start gap-2.5">
                                      <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                        {cIdx + 1}
                                      </span>
                                      <div>
                                        <div className="font-bold text-white flex items-center gap-1.5">
                                          <span>{c.courseName}</span>
                                          {c.courseCode && (
                                            <span className="font-mono text-[10px] text-slate-400">
                                              ({c.courseCode})
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                          <span
                                            className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                                              c.isMonthly
                                                ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                                                : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                            }`}
                                          >
                                            {c.isMonthly ? `Monthly (₹${c.monthlyRate}/mo)` : `Lump sum Fee (₹${c.totalCourseFee || 0})`}
                                          </span>
                                          <span>•</span>
                                          <span>Total Paid: ₹{Number(c.totalPaid || 0).toLocaleString("en-IN")}</span>
                                          <span>•</span>
                                          <span className="text-slate-300 font-medium">{c.status}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Dues and Quick Actions */}
                                    <div className="flex items-center gap-3 self-end sm:self-center">
                                      <div className="text-right">
                                        <span className="text-[10px] text-slate-400 block">Due Amount</span>
                                        <span
                                          className={`font-mono font-bold text-sm ${
                                            c.balanceDue > 0 ? "text-rose-400" : "text-emerald-400"
                                          }`}
                                        >
                                          {c.balanceDue > 0
                                            ? `₹${Number(c.balanceDue).toLocaleString("en-IN")}/-`
                                            : "Cleared ✓"}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-1.5">
                                        <button
                                          type="button"
                                          onClick={() => handleSendSingleCourseReminderWhatsApp(c)}
                                          className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer"
                                          title={`Send WhatsApp reminder for ${c.courseName}`}
                                        >
                                          <MessageCircle className="w-3.5 h-3.5" />
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => handleViewLedgerForDue(c)}
                                          className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-500/20 transition cursor-pointer"
                                          title="View complete ledger for this course"
                                        >
                                          <BookOpen className="w-3.5 h-3.5" />
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => handlePayDue(c)}
                                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1 shadow-sm cursor-pointer"
                                          title="Record fee payment for this course"
                                        >
                                          <Plus className="w-3 h-3" />
                                          <span>Pay Fee</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )
                ) : (
                  /* VIEW 2: COURSE-WISE DETAILED FLAT TABLE */
                  filteredDuesEnrollments.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                      <AlertCircle className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                      <p className="text-sm">No course enrollments match the current criteria.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                          <tr>
                            <th className="p-2.5 text-center">#</th>
                            <th className="p-2.5">Student</th>
                            <th className="p-2.5">Course & Code</th>
                            <th className="p-2.5">Plan Type</th>
                            <th className="p-2.5 text-right">Agreed / Rate</th>
                            <th className="p-2.5 text-right">Paid to Date</th>
                            <th className="p-2.5">Clearance / Due Status</th>
                            <th className="p-2.5 text-right">Outstanding Due</th>
                            <th className="p-2.5 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {filteredDuesEnrollments.map((e, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/30 transition">
                              <td className="p-2.5 text-center text-slate-500 font-mono">{idx + 1}</td>
                              <td className="p-2.5">
                                <div className="font-bold text-white">{e.studentName}</div>
                                <div className="font-mono text-[10px] text-slate-400">{e.studentRegNo || "—"}</div>
                              </td>
                              <td className="p-2.5">
                                <div className="font-semibold text-slate-200">{e.courseName}</div>
                                {e.courseCode && (
                                  <div className="font-mono text-[10px] text-slate-500">{e.courseCode}</div>
                                )}
                              </td>
                              <td className="p-2.5">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                    e.isMonthly
                                      ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  }`}
                                >
                                  {e.feeMode}
                                </span>
                              </td>
                              <td className="p-2.5 text-right font-mono font-semibold text-slate-300">
                                ₹{Number(e.agreedFee || 0).toLocaleString("en-IN")}/-
                              </td>
                              <td className="p-2.5 text-right font-mono font-semibold text-emerald-400">
                                ₹{Number(e.totalPaid || 0).toLocaleString("en-IN")}/-
                              </td>
                              <td className="p-2.5">
                                <span className="text-[11px] text-slate-300">{e.status}</span>
                              </td>
                              <td className="p-2.5 text-right font-mono font-bold">
                                <span className={e.balanceDue > 0 ? "text-rose-400" : "text-emerald-400"}>
                                  {e.balanceDue > 0 ? `₹${Number(e.balanceDue).toLocaleString("en-IN")}/-` : "₹0 (Cleared)"}
                                </span>
                              </td>
                              <td className="p-2.5">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleSendSingleCourseReminderWhatsApp(e)}
                                    className="p-1 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer"
                                    title="WhatsApp Reminder"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleViewLedgerForDue(e)}
                                    className="p-1 rounded-lg text-indigo-400 hover:bg-indigo-500/20 transition cursor-pointer"
                                    title="View Ledger"
                                  >
                                    <BookOpen className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handlePayDue(e)}
                                    className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
                                    title="Record Fee Payment"
                                  >
                                    Pay
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
              </div>

              {/* Modal Footer Summary */}
              <div className="border-t border-slate-800 pt-3 mt-3 flex items-center justify-between shrink-0 text-xs text-slate-400">
                <div>
                  Showing{" "}
                  <span className="text-white font-bold">
                    {duesViewMode === "STUDENT" ? filteredDuesStudents.length : filteredDuesEnrollments.length}
                  </span>{" "}
                  records • Filtered Dues:{" "}
                  <span className="text-rose-400 font-mono font-bold">
                    ₹
                    {(duesViewMode === "STUDENT"
                      ? filteredDuesStudents.reduce((acc, s) => acc + Number(s.totalDue || 0), 0)
                      : filteredDuesEnrollments.reduce((acc, e) => acc + Number(e.balanceDue || 0), 0)
                    ).toLocaleString("en-IN")}
                    /-
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDueListModal(false)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}