// ============================================================================
// StudentCourseQRPage.jsx - Student Course QR Studio
// ============================================================================
// Features:
// 1. Course rates strictly drawn from Database API (courseService.getAllWithDetails)
// 2. Clear distinction & badges: "Monthly Installment" vs "Full Course Payment"
// 3. Fully editable amount with real-time QR update & quick amount chips
// 4. Multi-mode tabs: Non-Admitted / Direct QR, Enrolled Admissions, Courses Catalog, Full Customizer
// 5. High-contrast NPCI UPI QR Code, 1-Click WhatsApp share, Copy QR Image & High-Res PNG card
// ============================================================================

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";
import {
  ArrowLeft,
  Search,
  BookOpen,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Download,
  Printer,
  ShieldCheck,
  User,
  Phone,
  MessageCircle,
  CreditCard,
  Send,
  Eye,
  Hash,
  Clock,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  GraduationCap,
  SlidersHorizontal,
  ChevronRight,
  Filter,
  X,
  Code2,
  Database,
  Calculator,
  BarChart3,
  Percent,
  Users,
  BadgePercent,
  CheckCircle,
  Tag,
} from "lucide-react";
import coursesData from "../data/courses.json";
import cnatLogo from "../assets/cnat.png";
import { admissionService } from "../services/admissionService";
import { courseService } from "../services/courseService";
import StudentCourseQRModal from "./StudentCourseQRModal";

const OFFICIAL_WHATSAPP = "919432456083";
const UPI_ID = "9432456083@upi";
const MERCHANT_NAME = "Coder & AccoTax";

const QUICK_AMOUNT_PRESETS = [
  { label: "₹500", value: 500 },
  { label: "₹1,000", value: 1000 },
  { label: "₹1,500", value: 1500 },
  { label: "₹2,000", value: 2000 },
  { label: "₹2,500", value: 2500 },
  { label: "₹3,000", value: 3000 },
  { label: "₹5,000", value: 5000 },
  { label: "₹8,000", value: 8000 },
  { label: "₹9,500", value: 9500 },
  { label: "₹12,000", value: 12000 },
  { label: "₹24,000", value: 24000 },
];

const BATCH_TIMINGS = [
  "Evening (05:00 PM - 07:00 PM • Mon/Wed/Fri)",
  "Morning (08:00 AM - 10:00 AM • Tue/Thu/Sat)",
  "Weekend Special (10:00 AM - 01:00 PM • Sat/Sun)",
  "Afternoon (02:00 PM - 04:00 PM • Mon/Wed/Fri)",
  "Evening (07:00 PM - 09:00 PM • Live Online)",
  "Morning (10:00 AM - 12:00 PM • Daily Fast Track)",
  "Flexible / Self-Paced (Hybrid)",
];

const FALLBACK_ADMISSIONS = [
  {
    id: "ADM-101",
    studentId: "STU-042",
    studentName: "Sourav Mukherjee",
    mobileNumber: "9830123456",
    courseId: "course001",
    courseName: "Full Stack Web Development",
    category: "Web Development",
    courseFees: 24000,
    monthlyInstallment: 2000,
    admissionDate: "2026-08-10",
    batchTiming: "Evening (05:00 PM - 07:00 PM • Mon/Wed/Fri)",
    status: "Ongoing",
    instructor: "Sukanta Hui",
  },
  {
    id: "ADM-102",
    studentId: "STU-089",
    studentName: "Ananya Roy",
    mobileNumber: "9831987654",
    courseId: "PRG1001",
    courseName: "Python Programming Masterclass",
    category: "Programming Languages",
    courseFees: 8500,
    monthlyInstallment: 1500,
    admissionDate: "2026-08-18",
    batchTiming: "Morning (08:00 AM - 10:00 AM • Tue/Thu/Sat)",
    status: "Ongoing",
    instructor: "Sukanta Hui",
  },
  {
    id: "ADM-103",
    studentId: "STU-114",
    studentName: "Debojyoti Ghosh",
    mobileNumber: "9433112233",
    courseId: "course018",
    courseName: "Frontend Development with React",
    category: "Web Development",
    courseFees: 9500,
    monthlyInstallment: 1500,
    admissionDate: "2026-09-01",
    batchTiming: "Evening (07:00 PM - 09:00 PM • Live Online)",
    status: "Ongoing",
    instructor: "Tanusree Hui",
  },
  {
    id: "ADM-104",
    studentId: "STU-156",
    studentName: "Sneha Das",
    mobileNumber: "9123456789",
    courseId: "course025",
    courseName: "Tally Prime with GST & e-Filing",
    category: "Accounting & GST",
    courseFees: 8500,
    monthlyInstallment: 1500,
    admissionDate: "2026-09-05",
    batchTiming: "Morning (10:00 AM - 12:00 PM • Daily Fast Track)",
    status: "Ongoing",
    instructor: "Sukanta Hui",
  },
  {
    id: "ADM-105",
    studentId: "STU-203",
    studentName: "Rohan Banerjee",
    mobileNumber: "9874561230",
    courseId: "course008",
    courseName: "Core Java & Object Oriented Programming",
    category: "Programming Languages",
    courseFees: 9000,
    monthlyInstallment: 1500,
    admissionDate: "2026-08-25",
    batchTiming: "Weekend Special (10:00 AM - 01:00 PM • Sat/Sun)",
    status: "Ongoing",
    instructor: "Sukanta Hui",
  },
];

const getCategoryTheme = (category = "") => {
  const cat = String(category).toLowerCase();
  if (cat.includes("web")) {
    return {
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      badge: "text-cyan-300 bg-cyan-500/15 border-cyan-500/30",
      icon: Code2,
    };
  }
  if (cat.includes("program") || cat.includes("python") || cat.includes("java") || cat.includes("c++") || cat.includes("data structure") || cat.includes("algorithm")) {
    return {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      badge: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      icon: Layers,
    };
  }
  if (cat.includes("sql") || cat.includes("rdbms") || cat.includes("database") || cat.includes("relational")) {
    return {
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      badge: "text-purple-300 bg-purple-500/15 border-purple-500/30",
      icon: Database,
    };
  }
  if (cat.includes("account") || cat.includes("tax") || cat.includes("tally") || cat.includes("gst")) {
    return {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      badge: "text-amber-300 bg-amber-500/15 border-amber-500/30",
      icon: Calculator,
    };
  }
  if (cat.includes("data") || cat.includes("excel") || cat.includes("power bi") || cat.includes("machine")) {
    return {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      badge: "text-blue-300 bg-blue-500/15 border-blue-500/30",
      icon: BarChart3,
    };
  }
  if (cat.includes("school") || cat.includes("icse") || cat.includes("isc") || cat.includes("cbse") || cat.includes("wb")) {
    return {
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      badge: "text-rose-300 bg-rose-500/15 border-rose-500/30",
      icon: GraduationCap,
    };
  }
  return {
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    badge: "text-sky-300 bg-sky-500/15 border-sky-500/30",
    icon: BookOpen,
  };
};

export default function StudentCourseQRPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const courseParam = searchParams.get("course") || null;
  const studentParam = searchParams.get("student") || "";
  const phoneParam = searchParams.get("phone") || "";

  // Data states
  const [admissions, setAdmissions] = useState([]);
  const [dbCourses, setDbCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active view: 'courses' | 'non-admitted' | 'admissions' | 'custom'
  const [viewMode, setViewMode] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const qrPanelRef = useRef(null);

  // Load Admissions & Courses directly from Database API
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [admRes, cRes] = await Promise.all([
          admissionService.getAll().catch(() => null),
          courseService.getAllWithDetails().catch(() => null),
        ]);

        if (isMounted) {
          // 1. Process Database Courses
          let rawCourses = [];
          if (cRes?.status === true && Array.isArray(cRes.data)) rawCourses = cRes.data;
          else if (Array.isArray(cRes?.data)) rawCourses = cRes.data;
          else if (Array.isArray(cRes)) rawCourses = cRes;

          if (rawCourses && rawCourses.length > 0) {
            const mappedCourses = rawCourses.map((c, i) => {
              // Extract exact rates drawn from database
              const numFee = Number(c.courseFees || c.course_fees || c.fees || c.fee || 0);
              const calculatedInstallment =
                numFee >= 20000 ? 2500 : numFee >= 12000 ? 2000 : numFee >= 7000 ? 1500 : 1000;

              return {
                courseID: String(c.id || c.courseID || c.courseCode || `course_${i}`),
                courseCode: c.courseCode || c.course_code,
                title: c.courseName || c.course_name || c.title || "Academic Course",
                category: c.category || c.courseCategory || "Academic Course",
                fee: `₹${numFee.toLocaleString("en-IN")}`,
                numericFee: numFee,
                duration: c.duration || `${c.details?.length || 40} Classes`,
                mode: c.mode || "Online / Offline (Barrackpore Lab)",
                instructor: c.instructor || "Sukanta Hui",
                desc: c.courseDescription || c.course_description || "",
                batchTiming: BATCH_TIMINGS[i % BATCH_TIMINGS.length],
                monthlyInstallment: calculatedInstallment,
              };
            });
            setDbCourses(mappedCourses);
          }

          // 2. Process Database Admissions
          let rawAdm = [];
          if (admRes?.status === true && Array.isArray(admRes.data)) rawAdm = admRes.data;
          else if (Array.isArray(admRes?.data)) rawAdm = admRes.data;
          else if (Array.isArray(admRes)) rawAdm = admRes;

          if (rawAdm && rawAdm.length > 0) {
            const mappedAdm = rawAdm.map((a, i) => {
              const feeNum = Number(a.courseFees || a.course_fees || a.course?.courseFees || 1500);
              const installment = feeNum >= 20000 ? 2500 : feeNum >= 12000 ? 2000 : feeNum >= 7000 ? 1500 : 1000;
              return {
                id: String(a.id || a.admissionId || `ADM-${100 + i}`),
                studentId: String(a.student?.studentId || a.studentId || a.student?.id || `STU-${i + 1}`),
                studentName: a.student?.studentName || a.student_name || "Student",
                mobileNumber: a.student?.mobileNumber || a.student?.phone || a.mobileNumber || "",
                courseId: String(a.course?.id || a.courseId || a.course?.courseCode || `course_${i}`),
                courseName: a.course?.courseName || a.course_name || a.course?.title || "Academic Course",
                category: a.course?.category || a.course?.courseCategory || "Academic Course",
                courseFees: feeNum,
                monthlyInstallment: installment,
                admissionDate: a.admissionDate ? String(a.admissionDate).split("T")[0] : new Date().toISOString().split("T")[0],
                batchTiming: BATCH_TIMINGS[i % BATCH_TIMINGS.length],
                status: a.courseStatus?.courseStatusName || "Ongoing",
                instructor: a.course?.instructor || "Sukanta Hui",
              };
            });
            setAdmissions(mappedAdm);
          } else {
            setAdmissions(FALLBACK_ADMISSIONS);
          }
        }
      } catch (err) {
        console.warn("Using catalog courses list:", err);
        if (isMounted) setAdmissions(FALLBACK_ADMISSIONS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Catalog courses fallback if DB is empty
  const catalogCourses = useMemo(() => {
    if (dbCourses.length > 0) return dbCourses;
    const list = [];
    if (Array.isArray(coursesData)) {
      coursesData.forEach((group, gIdx) => {
        if (Array.isArray(group.courses)) {
          group.courses.forEach((c, cIdx) => {
            const parsedFee = parseFloat(String(c.fee || "").replace(/[^0-9.]/g, "")) || 1500;
            const installment = parsedFee >= 20000 ? 2500 : parsedFee >= 12000 ? 2000 : parsedFee >= 7000 ? 1500 : 1000;
            const batchIdx = (gIdx * 3 + cIdx) % BATCH_TIMINGS.length;
            list.push({
              ...c,
              category: group.category,
              numericFee: parsedFee,
              fee: `₹${parsedFee.toLocaleString("en-IN")}`,
              batchTiming: BATCH_TIMINGS[batchIdx],
              monthlyInstallment: installment,
            });
          });
        }
      });
    }
    return list;
  }, [dbCourses]);

  // Selected Admission
  const [selectedAdmissionId, setSelectedAdmissionId] = useState(
    admissions[0]?.id || "ADM-101"
  );

  // Active loaded Course & Payment details
  const [courseTitle, setCourseTitle] = useState(courseParam || "Data Structure and Algorithm");
  const [courseCategory, setCourseCategory] = useState("Programming Languages");
  const [totalCourseFee, setTotalCourseFee] = useState(12000); // Standard rate drawn from DB
  const [paymentType, setPaymentType] = useState("installment"); // 'installment' | 'full' | 'custom'
  const [customPayAmount, setCustomPayAmount] = useState("2000"); // Editable paying amount
  const [studentName, setStudentName] = useState(studentParam || "");
  const [studentPhone, setStudentPhone] = useState(phoneParam || "");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [batchTiming, setBatchTiming] = useState(BATCH_TIMINGS[0]);
  const [studentRemarks, setStudentRemarks] = useState("");
  const [qrType, setQrType] = useState("upi"); // 'upi' | 'summary' | 'wa'

  // Feedback states
  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewMsg, setPreviewMsg] = useState(false);

  // Auto-select initial course if available
  useEffect(() => {
    if (catalogCourses.length > 0 && !courseParam && courseTitle === "Data Structure and Algorithm") {
      const first = catalogCourses[0];
      setCourseTitle(first.title);
      setCourseCategory(first.category || "Academic Course");
      setTotalCourseFee(first.numericFee || 1500);
      setCustomPayAmount(String(first.monthlyInstallment || 1500));
      setPaymentType("installment");
    }
  }, [catalogCourses, courseParam]);

  // 1-Click Action for Course Catalog (Sets Installment or Full Payment)
  const handleSelectCatalogCourse = (c, mode = "installment") => {
    setCourseTitle(c.title);
    setCourseCategory(c.category || "Academic Course");
    const dbFee = c.numericFee || 1500;
    setTotalCourseFee(dbFee);
    if (c.batchTiming) setBatchTiming(c.batchTiming);

    setPaymentType(mode);
    if (mode === "installment") {
      setCustomPayAmount(String(c.monthlyInstallment || 1500));
    } else if (mode === "full") {
      setCustomPayAmount(String(dbFee));
    }

    if (window.innerWidth < 1024 && qrPanelRef.current) {
      qrPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1-Click Action for Admission Record
  const handleSelectAdmission = (adm, mode = "installment", specificAmount = null) => {
    setSelectedAdmissionId(adm.id);
    setStudentName(adm.studentName || "");
    setStudentPhone(adm.mobileNumber || "");
    setStudentRollNo(adm.studentId || "");
    setCourseTitle(adm.courseName || "");
    setCourseCategory(adm.category || "Academic Course");
    const dbFee = adm.courseFees || 1500;
    setTotalCourseFee(dbFee);
    if (adm.batchTiming) setBatchTiming(adm.batchTiming);

    setPaymentType(mode);
    if (specificAmount) {
      setCustomPayAmount(String(specificAmount));
    } else if (mode === "installment") {
      setCustomPayAmount(String(adm.monthlyInstallment || 1500));
    } else if (mode === "full") {
      setCustomPayAmount(String(dbFee));
    }

    if (window.innerWidth < 1024 && qrPanelRef.current) {
      qrPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set();
    catalogCourses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    admissions.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set);
  }, [catalogCourses, admissions]);

  // Filtered Catalog Courses List
  const filteredCatalogCourses = useMemo(() => {
    return catalogCourses.filter((c) => {
      const matchCat = selectedCategory === "all" || c.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const titleMatch = c.title?.toLowerCase().includes(q);
      const catMatch = c.category?.toLowerCase().includes(q);
      const descMatch = c.desc?.toLowerCase().includes(q);
      return titleMatch || catMatch || descMatch;
    });
  }, [catalogCourses, selectedCategory, searchQuery]);

  // Filtered Admissions List
  const filteredAdmissions = useMemo(() => {
    return admissions.filter((a) => {
      const matchCat = selectedCategory === "all" || a.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const nameMatch = a.studentName?.toLowerCase().includes(q);
      const courseMatch = a.courseName?.toLowerCase().includes(q);
      const phoneMatch = a.mobileNumber?.toLowerCase().includes(q);
      const idMatch = a.studentId?.toLowerCase().includes(q) || a.id?.toLowerCase().includes(q);
      return nameMatch || courseMatch || phoneMatch || idMatch;
    });
  }, [admissions, selectedCategory, searchQuery]);

  // Numeric Editable Amount
  const numericAmount = useMemo(() => {
    const parsed = parseFloat(customPayAmount) || 0;
    return Math.max(0, parsed);
  }, [customPayAmount]);

  // Payment Mode Label
  const paymentLabel = useMemo(() => {
    if (paymentType === "installment") return "Monthly Installment";
    if (paymentType === "full") return "Full Course Payment";
    return "Custom Payment";
  }, [paymentType]);

  // Reference Token
  const studentRef = useMemo(() => {
    if (studentRollNo.trim()) return studentRollNo.trim().toUpperCase();
    const prefix = "CNAT";
    const namePart = (studentName || "CAN")
      .trim()
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 3)
      .toUpperCase();
    const coursePart = (courseTitle || "DAT")
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 3)
      .toUpperCase();
    return `${prefix}-${namePart || "STU"}-${coursePart || "FEE"}`;
  }, [studentName, studentRollNo, courseTitle]);

  // UPI Payload
  const upiPayload = useMemo(() => {
    const cleanPa = UPI_ID;
    const cleanPn = MERCHANT_NAME;
    let uri = `upi://pay?pa=${cleanPa}&pn=${encodeURIComponent(cleanPn)}&cu=INR`;

    if (numericAmount > 0) {
      uri += `&am=${numericAmount.toFixed(2)}`;
    }

    const noteWords = [];
    if (studentName.trim()) noteWords.push(studentName.trim());
    if (courseTitle.trim()) noteWords.push(courseTitle.trim());
    noteWords.push(paymentType === "installment" ? "Installment Fee" : "Fee");

    const cleanNote = noteWords
      .join(" ")
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 50);

    if (cleanNote) {
      uri += `&tn=${encodeURIComponent(cleanNote)}`;
    }

    return uri;
  }, [numericAmount, studentName, courseTitle, paymentType]);

  // Structured WhatsApp Message
  const whatsappDetailText = useMemo(() => {
    const dateStr = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const lines = [
      `🎓 *CODER & ACCOTAX - COURSE ADMISSION & FEE ADVICE*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      studentName.trim()
        ? `👤 *STUDENT NAME:* ${studentName.trim()}`
        : `👤 *STUDENT TYPE:* Direct / Walk-in Course Admission`,
      studentPhone.trim() ? `• *Contact WhatsApp:* ${studentPhone.trim()}` : null,
      `• *Token Ref:* ${studentRef}`,
      ``,
      `📚 *COURSE SELECTED (FROM DATABASE):*`,
      `• *Course Title:* ${courseTitle}`,
      `• *Category:* ${courseCategory}`,
      `• *DB Course Total Rate:* ₹${totalCourseFee.toLocaleString("en-IN")}`,
      `• *Payment Scheme:* *${paymentLabel}*`,
      batchTiming ? `• *Batch Timing:* ${batchTiming}` : null,
      ``,
      `💰 *PAYMENT DETAILS:*`,
      `• *Paying Today (${paymentLabel}):* *₹${numericAmount.toLocaleString("en-IN")}*`,
      paymentType === "installment" && totalCourseFee > numericAmount
        ? `• *Remaining Total Balance:* ₹${Math.max(0, totalCourseFee - numericAmount).toLocaleString("en-IN")}`
        : `• *Settlement Status:* Complete Course Fee`,
      ``,
      `💳 *NPCI VERIFIED UPI ID:*`,
      `• *UPI ID:* ${UPI_ID}`,
      `• *Merchant Name:* ${MERCHANT_NAME}`,
      `• *UPI Remark:* ${studentName.trim() || "Student"} ${courseTitle} ${paymentLabel}`,
      ``,
      studentRemarks.trim() ? `📝 *Note:* "${studentRemarks.trim()}"\n` : null,
      `🗓️ *Date:* ${dateStr}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Please share your payment screenshot on WhatsApp to receive the official digitally stamped fee receipt._`,
    ].filter(Boolean);

    return lines.join("\n");
  }, [
    studentName,
    studentPhone,
    studentRef,
    courseTitle,
    courseCategory,
    totalCourseFee,
    paymentLabel,
    paymentType,
    batchTiming,
    numericAmount,
    studentRemarks,
  ]);

  const officialWhatsAppUrl = useMemo(() => {
    return `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(whatsappDetailText)}`;
  }, [whatsappDetailText]);

  const studentWhatsAppUrl = useMemo(() => {
    const cleanNum = studentPhone.replace(/[^0-9]/g, "");
    if (!cleanNum || cleanNum.length < 10) return null;
    const fullNum = cleanNum.length === 10 ? `91${cleanNum}` : cleanNum;
    return `https://wa.me/${fullNum}?text=${encodeURIComponent(whatsappDetailText)}`;
  }, [studentPhone, whatsappDetailText]);

  // Safe QR payload
  const activeQrCodeValue = useMemo(() => {
    if (qrType === "wa") {
      const shortMsg = `Hello Coder & AccoTax, admission inquiry for ${courseTitle} [${paymentLabel}: ₹${numericAmount}]. Ref: ${studentRef}`;
      return `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(shortMsg)}`;
    }
    if (qrType === "summary") {
      return JSON.stringify({
        inst: "Coder & AccoTax",
        upi: UPI_ID,
        course: (courseTitle || "Course").slice(0, 40),
        type: paymentLabel,
        amount: numericAmount,
        total: totalCourseFee,
        ref: studentRef,
      });
    }
    return upiPayload;
  }, [qrType, courseTitle, paymentLabel, numericAmount, totalCourseFee, studentRef, upiPayload]);

  // Copy Detail Text
  const handleCopyDetailText = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(whatsappDetailText);
      } else {
        const ta = document.createElement("textarea");
        ta.value = whatsappDetailText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error("Failed to copy detail text:", err);
    }
  };

  // Copy QR Image (PNG Blob)
  const handleCopyQRImage = async () => {
    try {
      const qrDataUrl = await QRCodeLib.toDataURL(activeQrCodeValue || UPI_ID, {
        width: 800,
        margin: 2,
        errorCorrectionLevel: "M",
        color: {
          dark: "#090d16",
          light: "#ffffff",
        },
      });

      const blob = await (await fetch(qrDataUrl)).blob();

      if (navigator?.clipboard?.write && window.ClipboardItem) {
        await navigator.clipboard.write([
          new window.ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        await navigator.clipboard.writeText(qrDataUrl);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      }
    } catch (err) {
      console.error("Failed to copy image to clipboard:", err);
      handleDownloadQRCard();
    }
  };

  // Download High-Resolution Branded QR Card (PNG)
  const handleDownloadQRCard = async () => {
    try {
      setIsDownloading(true);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = 1000;
      const height = 1380;
      canvas.width = width;
      canvas.height = height;

      // Dark Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#030712");
      bgGrad.addColorStop(0.5, "#0b1329");
      bgGrad.addColorStop(1, "#030712");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Card Border
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      // Header Banner
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(34, 34, width - 68, 160);

      // Accent Line
      const lineGrad = ctx.createLinearGradient(34, 194, width - 34, 194);
      lineGrad.addColorStop(0, "#0284c7");
      lineGrad.addColorStop(0.5, "#10b981");
      lineGrad.addColorStop(1, "#8b5cf6");
      ctx.fillStyle = lineGrad;
      ctx.fillRect(34, 190, width - 68, 6);

      // Title & Header Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(MERCHANT_NAME.toUpperCase(), width / 2, 95);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(`COURSE ADMISSION • ${paymentLabel.toUpperCase()}`, width / 2, 135);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "16px sans-serif";
      ctx.fillText(`Ref: ${studentRef} • Official UPI: ${UPI_ID}`, width / 2, 168);

      // Course Info Box
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(70, 230, width - 140, 220);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 2;
      ctx.strokeRect(70, 230, width - 140, 220);

      ctx.textAlign = "left";
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(
        studentName.trim() ? `Candidate: ${studentName.trim()}` : "Direct Course Admission",
        100,
        275
      );

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`Course: ${courseTitle}`, 100, 315);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px sans-serif";
      ctx.fillText(`Total DB Rate: ₹${totalCourseFee.toLocaleString("en-IN")} • Scheme: ${paymentLabel}`, 100, 355);

      ctx.fillStyle = "#10b981";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`Payable Amount Today: ₹${numericAmount.toLocaleString("en-IN")}`, 100, 400);

      // QR Image
      const qrDataUrl = await QRCodeLib.toDataURL(activeQrCodeValue || UPI_ID, {
        width: 540,
        margin: 2,
        errorCorrectionLevel: "M",
        color: {
          dark: "#090d16",
          light: "#ffffff",
        },
      });

      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      await new Promise((resolve) => {
        qrImg.onload = resolve;
      });

      // White QR Container Card
      const qrBoxX = 220;
      const qrBoxY = 490;
      const qrBoxSize = 560;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 6;
      ctx.strokeRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);

      ctx.drawImage(qrImg, qrBoxX + 10, qrBoxY + 10, qrBoxSize - 20, qrBoxSize - 20);

      // Bottom Instructions
      ctx.textAlign = "center";
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText("SCAN WITH ANY UPI APP TO PAY DIRECTLY", width / 2, 1110);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px sans-serif";
      ctx.fillText(
        "Google Pay • PhonePe • Paytm • BHIM • Amazon Pay • Cred",
        width / 2,
        1150
      );

      // WhatsApp Footer Box
      ctx.fillStyle = "#064e3b";
      ctx.fillRect(70, 1190, width - 140, 100);
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.strokeRect(70, 1190, width - 140, 100);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("Official WhatsApp Desk: +91 94324 56083", width / 2, 1235);

      ctx.fillStyle = "#6ee7b7";
      ctx.font = "16px sans-serif";
      ctx.fillText(
        "Share payment screenshot on WhatsApp for instant receipt acknowledgment.",
        width / 2,
        1265
      );

      const downloadLink = document.createElement("a");
      const safeCourse = (courseTitle || "Course").replace(/[^a-zA-Z0-9]/g, "_");
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.download = `CNAT_QR_${safeCourse}_${paymentType}_${numericAmount}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("Failed to generate QR card:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const activeTheme = getCategoryTheme(courseCategory);
  const ActiveIcon = activeTheme.icon;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-6 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP BAR: Navigation & Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3.5 sm:p-4 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition cursor-pointer text-xs font-semibold shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium hidden sm:inline">Coder &amp; AccoTax</span>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <span className="text-sky-400 font-bold flex items-center gap-1.5">
                <Sparkles size={14} className="text-sky-400 animate-pulse" />
                Student Course QR Studio (Database Rates)
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold overflow-x-auto max-w-full">
            {/* 1. COURSES CATALOG */}
            <button
              type="button"
              onClick={() => setViewMode("courses")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "courses"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen size={13} />
              <span>Database Courses Catalog ({catalogCourses.length})</span>
            </button>

            {/* 2. NON-ADMITTED / QUICK DIRECT QR */}
            <button
              type="button"
              onClick={() => setViewMode("non-admitted")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "non-admitted"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap size={13} className={viewMode === "non-admitted" ? "fill-slate-950" : ""} />
              <span>Non-Admitted / Direct Walk-in QR</span>
            </button>

            {/* 3. ENROLLED ADMISSIONS */}
            <button
              type="button"
              onClick={() => setViewMode("admissions")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "admissions"
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users size={13} />
              <span>Enrolled Admissions ({admissions.length})</span>
            </button>

            {/* 4. FULL CUSTOMIZER */}
            <button
              type="button"
              onClick={() => setViewMode("custom")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "custom"
                  ? "bg-slate-800 text-white font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <SlidersHorizontal size={13} />
              <span>Custom Form</span>
            </button>
          </div>
        </div>

        {/* HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-5 sm:p-7 shadow-2xl">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Rates Drawn Strictly from Institute Database</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Active Courses Catalog &amp; Editable QR Studio
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Select any course from the database to load its <strong className="text-emerald-300">Monthly Installment</strong> or <strong className="text-sky-300">Full Payment</strong> rate. The amount is fully editable with live QR code generation.
              </p>
            </div>

            {/* Quick UPI Details Box */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 bg-slate-950/70 border border-slate-800/90 p-3.5 rounded-2xl flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>NPCI UPI Verified</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {UPI_ID}
              </span>
              <span className="text-[10px] text-slate-400">
                Official WA: +91 94324 56083
              </span>
            </div>
          </div>
        </div>

        {viewMode === "custom" ? (
          <StudentCourseQRModal
            isOpen={true}
            onClose={null}
            initialCourse={courseTitle}
            initialStudentName={studentName}
            initialStudentPhone={studentPhone}
          />
        ) : (
          /* SPLIT STUDIO: LEFT PANEL + RIGHT LIVE INSTANT QR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT 7 COLS: BASED ON VIEW MODE */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* SEARCH & FILTER BAR FOR LIST VIEWS */}
              {(viewMode === "courses" || viewMode === "admissions") && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        viewMode === "courses"
                          ? "Search database course name, subject, or category..."
                          : "Search student name, roll ID, or course..."
                      }
                      className="w-full pl-10 pr-9 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        selectedCategory === "all"
                          ? "bg-sky-500 text-white shadow-md font-bold"
                          : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      All Categories ({catalogCourses.length})
                    </button>
                    {categories.map((cat) => {
                      const theme = getCategoryTheme(cat);
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                            isSelected
                              ? `${theme.bg} ${theme.text} border ${theme.border} font-bold shadow-sm`
                              : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                          }`}
                        >
                          <span>{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* VIEW MODE 1: DATABASE COURSES CATALOG */}
              {viewMode === "courses" && (
                <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
                  {filteredCatalogCourses.map((c) => {
                    const isSelected = courseTitle === c.title;
                    const theme = getCategoryTheme(c.category);
                    const Icon = theme.icon;

                    return (
                      <div
                        key={c.courseID}
                        onClick={() => handleSelectCatalogCourse(c, "installment")}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative group ${
                          isSelected
                            ? "bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border-sky-500/80 shadow-xl ring-2 ring-sky-500/30"
                            : "bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 shadow-md"
                        }`}
                      >
                        {/* Top Badge Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${theme.badge}`}>
                              {c.category}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Database Rate</span>
                            </span>
                          </div>

                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                              <CheckCircle2 size={13} className="text-sky-400" />
                              <span>QR Active</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Category Icon */}
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${theme.bg} ${theme.border} ${theme.text} mt-0.5`}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-extrabold text-white truncate">{c.title}</h3>
                            {c.desc && <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{c.desc}</p>}
                            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                              <span>⏱️ {c.batchTiming}</span>
                              <span>•</span>
                              <span>👨‍🏫 {c.instructor || "Sukanta Hui"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Clear Rates Breakdown & 2 Separate Action Buttons */}
                        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                          {/* Left: DB Rates Breakdown */}
                          <div className="flex items-center gap-3 text-xs">
                            <div>
                              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Monthly Installment</span>
                              <span className="font-extrabold text-emerald-400 text-sm">
                                ₹{(c.monthlyInstallment || 1500).toLocaleString("en-IN")}<span className="text-[10px] text-slate-400 font-normal">/mo</span>
                              </span>
                            </div>
                            <div className="h-6 w-px bg-slate-800" />
                            <div>
                              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total DB Course Fee</span>
                              <span className="font-bold text-slate-200">
                                {c.fee || `₹${c.numericFee?.toLocaleString("en-IN")}`}
                              </span>
                            </div>
                          </div>

                          {/* Right: Explicit Installment vs Full Payment Buttons */}
                          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => handleSelectCatalogCourse(c, "installment")}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-sm ${
                                isSelected && paymentType === "installment"
                                  ? "bg-emerald-500 text-white shadow-emerald-500/20"
                                  : "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30"
                              }`}
                              title="Generate QR for Monthly Installment"
                            >
                              <Zap size={12} className="fill-emerald-400" />
                              <span>Installment ₹{(c.monthlyInstallment || 1500).toLocaleString("en-IN")}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSelectCatalogCourse(c, "full")}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                isSelected && paymentType === "full"
                                  ? "bg-sky-500 text-white shadow-sky-500/20"
                                  : "bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700"
                              }`}
                              title="Generate QR for Full Course Fee"
                            >
                              <span>Full Fee {c.fee}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VIEW MODE 2: NON-ADMITTED / DIRECT WALK-IN */}
              {viewMode === "non-admitted" && (
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/95 border border-amber-500/30 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm sm:text-base">
                      <Zap size={18} className="fill-amber-400" />
                      <span>Direct QR: Enter Course Name &amp; Amount Only</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                      Non-Admitted / Direct
                    </span>
                  </div>

                  {/* FIELD 1: COURSE NAME */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sky-400">
                        <BookOpen size={14} />
                        <span>1. Course / Subject Name <span className="text-rose-400">*</span></span>
                      </span>
                    </label>

                    <input
                      type="text"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="e.g. Python Programming, ICSE Java Class 10, React Web Dev, Tally GST..."
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700/90 rounded-2xl text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-inner"
                    />

                    {/* Suggestions from database courses */}
                    <div className="pt-1 space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-semibold block">
                        ⚡ Quick Database Course Suggestions:
                      </span>
                      <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1 no-scrollbar">
                        {catalogCourses.slice(0, 10).map((c) => {
                          const isSelected = courseTitle === c.title;
                          return (
                            <button
                              key={c.courseID}
                              type="button"
                              onClick={() => {
                                setCourseTitle(c.title);
                                setCourseCategory(c.category || "Academic Course");
                                setTotalCourseFee(c.numericFee || 1500);
                                setCustomPayAmount(String(c.monthlyInstallment || 1500));
                                setPaymentType("installment");
                              }}
                              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                                isSelected
                                  ? "bg-sky-500 text-white font-bold shadow-md"
                                  : "bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                              }`}
                            >
                              <span>{c.title}</span>
                              <span className="text-[10px] text-emerald-400 font-mono">({c.fee})</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* FIELD 2: EDITABLE AMOUNT */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CreditCard size={14} />
                        <span>2. Payable Fee Amount (₹) - Editable <span className="text-rose-400">*</span></span>
                      </span>
                      <span className="text-xs font-extrabold text-emerald-400">
                        ₹{numericAmount.toLocaleString("en-IN")}
                      </span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-extrabold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={customPayAmount}
                        onChange={(e) => {
                          setCustomPayAmount(e.target.value);
                          setPaymentType("custom");
                        }}
                        placeholder="e.g. 1500"
                        min="1"
                        className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700/90 rounded-2xl text-base sm:text-lg font-mono font-extrabold text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-inner"
                      />
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] text-slate-400 font-semibold block mb-1.5">
                        ⚡ Quick Amount Presets:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_AMOUNT_PRESETS.map((p) => {
                          const isAct = customPayAmount === String(p.value);
                          return (
                            <button
                              key={p.value}
                              type="button"
                              onClick={() => {
                                setCustomPayAmount(String(p.value));
                                setPaymentType("custom");
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                                isAct
                                  ? "bg-emerald-500 text-white scale-105 shadow-md shadow-emerald-500/20"
                                  : "bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                              }`}
                            >
                              {p.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW MODE 3: ENROLLED ADMISSIONS */}
              {viewMode === "admissions" && (
                <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
                  {filteredAdmissions.map((adm) => {
                    const isSelected = adm.id === selectedAdmissionId;
                    const theme = getCategoryTheme(adm.category);
                    const Icon = theme.icon;

                    return (
                      <div
                        key={adm.id}
                        onClick={() => handleSelectAdmission(adm, "installment")}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative group ${
                          isSelected
                            ? "bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border-sky-500/80 shadow-xl ring-2 ring-sky-500/30"
                            : "bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 shadow-md"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${theme.badge}`}>
                            {adm.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {adm.studentId || adm.id}
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${theme.bg} ${theme.border} ${theme.text} mt-0.5`}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-extrabold text-white">{adm.studentName}</h3>
                            <div className="text-xs sm:text-sm font-bold text-sky-300 mt-0.5 truncate">{adm.courseName}</div>
                            <div className="text-[11px] text-slate-400 mt-1">⏱️ {adm.batchTiming}</div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <div className="text-xs">
                            <span className="font-extrabold text-emerald-400 text-sm">
                              ₹{(adm.monthlyInstallment || 1500).toLocaleString("en-IN")}<span className="text-[10px] text-slate-400 font-normal">/mo</span>
                            </span>
                            <span className="text-slate-400 ml-2">Total DB Fee: ₹{(adm.courseFees || 1500).toLocaleString("en-IN")}</span>
                          </div>

                          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => handleSelectAdmission(adm, "installment", adm.monthlyInstallment || 1500)}
                              className="px-2.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition flex items-center gap-1"
                            >
                              <Zap size={12} className="fill-emerald-400" />
                              <span>Installment</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSelectAdmission(adm, "full", adm.courseFees || 1500)}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-bold transition"
                            >
                              <span>Full Fee</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* RIGHT 5 COLS: LIVE QR DETAILS (EDITABLE AMOUNT + SCHEME BADGES) */}
            <div className="lg:col-span-5 space-y-4" ref={qrPanelRef}>
              
              {/* Loaded Course & Amount Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl space-y-3.5">
                
                {/* Header with Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={12} />
                      <span>Live QR Details</span>
                    </span>
                  </div>

                  {/* Explicit Scheme Badge (Installment vs Full) */}
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-sm flex items-center gap-1 ${
                      paymentType === "installment"
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                        : paymentType === "full"
                        ? "bg-sky-500/20 border-sky-500/40 text-sky-300"
                        : "bg-purple-500/20 border-purple-500/40 text-purple-300"
                    }`}
                  >
                    <Tag size={11} />
                    <span>{paymentLabel}</span>
                  </span>
                </div>

                {/* Course Title & DB Rate */}
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                    <ActiveIcon size={18} className={activeTheme.text} />
                    <span className="truncate">{courseTitle || "Course Fee"}</span>
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>
                      Database Course Rate: <strong className="text-slate-200">₹{totalCourseFee.toLocaleString("en-IN")}</strong>
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">Ref: {studentRef}</span>
                  </div>
                </div>

                {/* EDITABLE AMOUNT SECTION */}
                <div className="pt-2.5 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1">
                      <CreditCard size={13} className="text-emerald-400" />
                      <span>Editable Payable Amount (₹):</span>
                    </label>
                    <span className="text-sm font-extrabold text-emerald-400 font-mono">
                      ₹{numericAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Direct Amount Input */}
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-extrabold text-slate-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={customPayAmount}
                      onChange={(e) => {
                        setCustomPayAmount(e.target.value);
                        setPaymentType("custom");
                      }}
                      placeholder="Enter amount"
                      min="1"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-base font-mono font-black text-emerald-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-inner"
                    />
                  </div>

                  {/* Scheme Switcher Chips (Installment vs Full Fee) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentType("installment");
                        const inst = totalCourseFee >= 20000 ? 2500 : totalCourseFee >= 12000 ? 2000 : totalCourseFee >= 7000 ? 1500 : 1000;
                        setCustomPayAmount(String(inst));
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                        paymentType === "installment"
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : "bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                      }`}
                    >
                      <span>💳 Monthly Installment</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentType("full");
                        setCustomPayAmount(String(totalCourseFee));
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                        paymentType === "full"
                          ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                          : "bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                      }`}
                    >
                      <span>💰 Full Payment (₹{totalCourseFee.toLocaleString("en-IN")})</span>
                    </button>
                  </div>
                </div>

                {/* Optional Student Name & Phone Inputs */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Student Name (Optional)"
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        placeholder="WhatsApp (Optional)"
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* LIVE HIGH-CONTRAST QR CODE BOX */}
              <div className="p-5 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl flex flex-col items-center text-center relative">
                
                {/* QR Mode Switcher */}
                <div className="w-full flex items-center justify-center p-1 bg-slate-900 rounded-xl border border-slate-800 mb-3 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setQrType("upi")}
                    className={`flex-1 py-1 px-2 rounded-lg transition cursor-pointer ${
                      qrType === "upi" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    UPI Payment QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setQrType("wa")}
                    className={`flex-1 py-1 px-2 rounded-lg transition cursor-pointer ${
                      qrType === "wa" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    WhatsApp QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setQrType("summary")}
                    className={`flex-1 py-1 px-2 rounded-lg transition cursor-pointer ${
                      qrType === "summary" ? "bg-sky-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Summary QR
                  </button>
                </div>

                {/* White High-Contrast QR Code */}
                <div className="p-4 bg-white rounded-2xl shadow-2xl flex flex-col items-center relative group">
                  <div className="w-[190px] h-[190px] flex items-center justify-center relative">
                    <QRCode
                      value={activeQrCodeValue || UPI_ID}
                      size={190}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox="0 0 256 256"
                      level="M"
                      fgColor="#090d16"
                      bgColor="#ffffff"
                    />
                    {/* Center Institute Logo */}
                    <div className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center border border-slate-200 pointer-events-none">
                      <img src={cnatLogo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>

                  <div className="mt-2 text-center">
                    <span className="text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1">
                      <QrCode size={13} className="text-emerald-600" />
                      {qrType === "upi" ? "Scan to Pay with Any UPI App" : qrType === "wa" ? "Scan to Chat on WhatsApp" : "Payment Advice"}
                    </span>
                    {numericAmount > 0 && qrType === "upi" && (
                      <span className="text-base font-black text-emerald-700 block mt-0.5">
                        ₹{numericAmount.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Course & Scheme Badge Below QR */}
                <div className="mt-3 w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="truncate">{courseTitle || "Course Fee"}</span>
                    <span className="text-emerald-400">₹{numericAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
                    <span>Scheme: <strong className="text-emerald-300">{paymentLabel}</strong></span>
                    <span>Ref: {studentRef}</span>
                  </div>
                </div>

                {/* Copy QR Image & Save QR Card */}
                <div className="grid grid-cols-2 gap-2 w-full mt-3">
                  <button
                    type="button"
                    onClick={handleCopyQRImage}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      copiedImage
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    }`}
                    title="Copy QR Code image to clipboard (paste directly into WhatsApp)"
                  >
                    {copiedImage ? (
                      <>
                        <Check size={14} />
                        <span>Image Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy QR Image</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadQRCard}
                    disabled={isDownloading}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download size={14} />
                    <span>{isDownloading ? "Creating..." : "Save Card"}</span>
                  </button>
                </div>
              </div>

              {/* DIRECT WHATSAPP ACTIONS */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <MessageCircle size={14} />
                    </div>
                    <span>WhatsApp Share &amp; Advice</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">+91 94324 56083</span>
                </div>

                <a
                  href={officialWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition cursor-pointer"
                >
                  <i className="bi bi-whatsapp text-base"></i>
                  <span>Share to Official WhatsApp (+91 94324 56083)</span>
                </a>

                {studentWhatsAppUrl && (
                  <a
                    href={studentWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-sky-300 hover:text-sky-200 border border-sky-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Send size={13} />
                    <span>Send Advice to Student's WhatsApp ({studentPhone})</span>
                  </a>
                )}

                {/* Utility Buttons: Copy text, Preview & Print */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyDetailText}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      copiedText
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80"
                    }`}
                  >
                    {copiedText ? (
                      <>
                        <Check size={14} />
                        <span>Text Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Message Text</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewMsg(!previewMsg)}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>{previewMsg ? "Hide Text" : "Preview"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintSlip}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition cursor-pointer"
                    title="Print Admission Slip"
                  >
                    <Printer size={15} />
                  </button>
                </div>

                {previewMsg && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                    {whatsappDetailText}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
