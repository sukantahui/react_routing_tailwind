// ============================================================================
// StudentWithAdmission.jsx - Rapid Minimal Student Enrollment & Fee Portal
// ============================================================================

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, ChevronDown, CheckCircle2, XCircle, Sparkles, Calendar, IndianRupee } from "lucide-react";
import api from "../../api/api";
import { courseService } from "../../services/courseService";

export default function StudentWithAdmission() {
  const navigate = useNavigate();

  // Authentication & Authorization
  const [, setCurrentUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);

  // External data lists
  const [courses, setCourses] = useState([]);
  const [feeModes, setFeeModes] = useState([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Accordion toggle for secondary details
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);



  // Student Form State (Minimal required: studentName, whatsapp)
  const [studentForm, setStudentForm] = useState({
    studentName: "",
    whatsapp: "",
    // Secondary optional fields
    nickname: "",
    email: "",
    dob: "",
    bloodGroup: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianRelation: "Father",
    guardianPhone: "",
    phone1: "",
    phone2: "",
    address: "",
    districtId: 2, // North 24 Parganas default
    city: "Barrackpore",
    pin: "700120",
    genderId: 1, // Male default
  });

  // Admission & Fee Configuration Form State
  const [admissionForm, setAdmissionForm] = useState({
    courseId: "",
    feeModesId: 1, // 1: Monthly, 2: Course Fees
    courseStatusId: 1, // 1: Ongoing
    courseFees: "",
    admissionDate: new Date().toISOString().split("T")[0],
    completionDate: "",
  });

  // Initial Fee Payment Received State
  const [feePayment, setFeePayment] = useState({
    collectFeeNow: false,
    amountPaid: "",
    paymentMode: "Cash",
    paymentDate: new Date().toISOString().split("T")[0],
    periodFrom: "",
    periodTo: "",
    remarks: "",
  });

  // Check role authorization on mount
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        setCurrentUser(parsed);
        const role = (parsed?.role || parsed?.userType?.userTypeName || "").trim().toLowerCase();
        const allowed = ["admin", "developer", "owner", "manager"].includes(role);
        setIsAuthorized(allowed);
      } else {
        setIsAuthorized(false);
      }
    } catch {
      setIsAuthorized(false);
    }
  }, []);

  // Fetch courses and fee modes
  useEffect(() => {
    const fetchResources = async () => {
      setLoadingResources(true);
      try {
        const [courseRes, feeModesRes] = await Promise.all([
          courseService.getAll(),
          api.get("/fee-modes"),
        ]);

        let cData = [];
        if (courseRes?.status === true && Array.isArray(courseRes.data)) {
          cData = courseRes.data;
        } else if (Array.isArray(courseRes?.data)) {
          cData = courseRes.data;
        } else if (Array.isArray(courseRes)) {
          cData = courseRes;
        }
        setCourses(cData);

        if (feeModesRes?.data?.status && Array.isArray(feeModesRes.data.data)) {
          setFeeModes(feeModesRes.data.data);
        } else {
          setFeeModes([
            { id: 1, fee_modes_name: "Monthly" },
            { id: 2, fee_modes_name: "Course Fees (Full / Lump sum)" },
          ]);
        }
      } catch (err) {
        console.error("Error fetching admission resources:", err);
      } finally {
        setLoadingResources(false);
      }
    };

    fetchResources();
  }, []);

  // Handle student fields change
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prev) => ({
      ...prev,
      [name]: name === "districtId" || name === "genderId" ? Number(value) || "" : value,
    }));
  };

  // Handle admission and fee changes
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

      // When course changes, set completion date and auto-fill catalog course fee
      if (name === "courseId" && value) {
        const selected = courses.find((c) => String(c.id || c.courseId) === String(value));
        if (selected) {
          const catalogFee = selected.courseFees || selected.course_fees || 0;
          if (catalogFee > 0) {
            updated.courseFees = Number(catalogFee);
            // Auto-sync amount received to the new agreed course fees
            setFeePayment((prevFee) => ({
              ...prevFee,
              amountPaid: Number(catalogFee),
            }));
          }
          // Strictly adopt course's assigned fee mode!
          const mode = selected.feeModesId || selected.fee_modes_id || 1;
          updated.feeModesId = Number(mode);
        }
        if (!updated.completionDate && updated.admissionDate) {
          const admDate = new Date(updated.admissionDate);
          admDate.setFullYear(admDate.getFullYear() + 1);
          admDate.setDate(admDate.getDate() - 1);
          updated.completionDate = admDate.toISOString().split("T")[0];
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

  const selectedCourseObj = useMemo(() => {
    return courses.find((c) => String(c.id || c.courseId) === String(admissionForm.courseId));
  }, [courses, admissionForm.courseId]);

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

  const selectedFeeModeObj = useMemo(() => {
    return feeModes.find((f) => String(f.id) === String(admissionForm.feeModesId));
  }, [feeModes, admissionForm.feeModesId]);

  // Real-time Due Calculation for both Monthly and Lump-sum fee modes
  const dueCalculation = useMemo(() => {
    const feeMode = Number(admissionForm.feeModesId || 1); // 1 = Monthly, 2 = Course Fees
    const agreedFee = Number(admissionForm.courseFees) || 0;
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
    const admDateStr = admissionForm.admissionDate || new Date().toISOString().split("T")[0];
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
  }, [admissionForm.feeModesId, admissionForm.courseFees, admissionForm.admissionDate, feePayment.collectFeeNow, feePayment.paymentDate, feePayment.amountPaid]);

  // Monthly estimate calculator
  const monthlyBreakdown = useMemo(() => {
    const fees = Number(admissionForm.courseFees) || 0;
    if (fees <= 0) return null;

    let months = 12;
    if (admissionForm.admissionDate && admissionForm.completionDate) {
      const d1 = new Date(admissionForm.admissionDate);
      const d2 = new Date(admissionForm.completionDate);
      const diffMonths = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
      if (diffMonths > 0) months = diffMonths;
    }

    const perMonth = Math.round(fees / months);
    return { months, perMonth };
  }, [admissionForm.courseFees, admissionForm.admissionDate, admissionForm.completionDate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthorized) {
      Swal.fire({
        icon: "error",
        title: "Access Restricted",
        text: "Only Administrators and Managers are authorized to register students and set course fees.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    if (!studentForm.studentName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Student Name Required",
        text: "Please enter the student's full name.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (!studentForm.whatsapp.trim() || studentForm.whatsapp.trim().length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Invalid WhatsApp Number",
        text: "WhatsApp number is mandatory and must be exactly 10 digits.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (!admissionForm.courseId) {
      Swal.fire({
        icon: "warning",
        title: "Course Selection Required",
        text: "Please assign an academic course to this student.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (!admissionForm.courseFees || Number(admissionForm.courseFees) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Course Fees Required",
        text: "Please set the agreed course fees for this student enrollment.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    // Build clean student payload
    const studentData = {
      student_name: studentForm.studentName.trim(),
      whatsapp: studentForm.whatsapp.trim(),
      district_id: Number(studentForm.districtId) || 2,
      gender_id: Number(studentForm.genderId) || 1,
    };

    if (studentForm.nickname?.trim()) studentData.nickname = studentForm.nickname.trim();
    if (studentForm.email?.trim()) studentData.email = studentForm.email.trim();
    if (studentForm.dob) studentData.dob = studentForm.dob;
    if (studentForm.bloodGroup) studentData.blood_group = studentForm.bloodGroup;
    if (studentForm.fatherName?.trim()) studentData.father_name = studentForm.fatherName.trim();
    if (studentForm.motherName?.trim()) studentData.mother_name = studentForm.motherName.trim();
    if (studentForm.guardianName?.trim()) studentData.guardian_name = studentForm.guardianName.trim();
    if (studentForm.guardianRelation?.trim()) studentData.guardian_relation = studentForm.guardianRelation.trim();
    if (studentForm.guardianPhone?.trim()) studentData.guardian_phone = studentForm.guardianPhone.trim();
    if (studentForm.phone1?.trim()) studentData.phone1 = studentForm.phone1.trim();
    if (studentForm.phone2?.trim()) studentData.phone2 = studentForm.phone2.trim();
    if (studentForm.address?.trim()) studentData.address = studentForm.address.trim();
    if (studentForm.city?.trim()) studentData.city = studentForm.city.trim();
    if (studentForm.pin?.trim()) {
      const p = studentForm.pin.trim();
      if (p.length === 6) studentData.pin = p;
    }

    const payload = {
      student: studentData,
      admission: {
        course_id: Number(admissionForm.courseId),
        fee_modes_id: Number(admissionForm.feeModesId) || 1,
        course_status_id: Number(admissionForm.courseStatusId) || 1,
        course_fees: Math.round(Number(admissionForm.courseFees)),
        admission_date: admissionForm.admissionDate,
      },
    };

    if (admissionForm.completionDate) {
      payload.admission.completion_date = admissionForm.completionDate;
    }

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

    const confirmResult = await Swal.fire({
      title: "Confirm Student Enrollment?",
      html: `
        <div class="text-left text-xs text-slate-300 space-y-2.5 p-4 rounded-xl bg-slate-900 border border-slate-700 mt-2">
          <p><b class="text-slate-400">Student Name:</b> <span class="text-white font-bold">${studentForm.studentName}</span></p>
          <p><b class="text-slate-400">WhatsApp / Mobile:</b> <span class="text-emerald-400 font-mono font-bold">${studentForm.whatsapp}</span></p>
          <p><b class="text-slate-400">Assigned Course:</b> <span class="text-sky-400 font-semibold">${selectedCourseObj?.course_name || selectedCourseObj?.courseName || "Course"}</span></p>
          <p><b class="text-slate-400">Agreed Course Fee:</b> <span class="text-emerald-400 font-extrabold">₹${Number(admissionForm.courseFees).toLocaleString()}</span></p>
          <p><b class="text-slate-400">Payment Schedule:</b> <span class="text-purple-300 font-semibold">${selectedFeeModeObj?.fee_modes_name || (Number(admissionForm.feeModesId) === 2 ? "Course Fees (Lump sum)" : "Monthly")}</span></p>
          ${feePayment.collectFeeNow && Number(feePayment.amountPaid) > 0 ? `
            <div class="p-2.5 rounded-lg bg-slate-950 border border-sky-500/30 text-[11px] space-y-1">
              <p><b class="text-sky-300">Initial Fee Received:</b> <span class="text-emerald-400 font-bold">₹${Number(feePayment.amountPaid).toLocaleString()}</span> via <span class="text-white font-semibold">${feePayment.paymentMode}</span></p>
              <p><b class="text-slate-400">Payment Date:</b> ${feePayment.paymentDate}</p>
              ${dueCalculation.mode === "monthly" ? `
                <p><b class="text-sky-300">Fee Period Covered:</b> <span class="text-white font-bold">${dueCalculation.periodLabel || "Admission Month"}</span></p>
                <p><b class="text-slate-400">Current Period (${dueCalculation.currentMonthName}):</b> <span class="text-slate-200">${dueCalculation.elapsedMonths} months accrued (₹${dueCalculation.totalAccruedFee.toLocaleString()})</span></p>
                <p><b class="${dueCalculation.dueAmount > 0 ? "text-rose-400" : "text-emerald-400"}">Current Due Balance (${dueCalculation.currentMonthName}):</b> ₹${dueCalculation.dueAmount.toLocaleString()}${dueCalculation.dueAmount > 0 ? ` (${dueCalculation.monthsDue} mo pending: ${dueCalculation.pendingMonthsList?.join(", ")})` : " (Cleared)"}</p>
              ` : `
                <p><b class="text-amber-300">Remaining Balance:</b> ₹${Math.max(0, Number(admissionForm.courseFees) - Number(feePayment.amountPaid)).toLocaleString()}</p>
              `}
            </div>
          ` : `<p class="text-[11px] text-slate-400">Initial Payment: <span class="text-slate-400 italic">None at admission (pay later)</span></p>`}
          <p class="text-[11px] text-slate-400 pt-2 border-t border-slate-700/80">
            Do you want to confirm and save this registration and course admission record?
          </p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm & Register",
      cancelButtonText: "Cancel & Review",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#0284c7",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/admissions/admissionWithStudent", payload);

      if (res?.data?.status) {
        const admData = res.data?.data?.admission || res.data?.data || {};
        const receiptData = res.data?.data?.receipt || null;

        Swal.fire({
          icon: "success",
          title: "Student Enrolled Successfully!",
          html: `
            <div class="text-left text-xs text-slate-300 space-y-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700 mt-3">
              <p><b>Student:</b> <span class="text-white font-semibold">${studentForm.studentName}</span></p>
              <p><b>WhatsApp:</b> <span class="text-emerald-400 font-mono">${studentForm.whatsapp}</span></p>
              <p><b>Assigned Course:</b> <span class="text-sky-400 font-semibold">${selectedCourseObj?.course_name || "Course"}</span></p>
              <p><b>Agreed Course Fee:</b> <span class="text-emerald-400 font-bold">₹${Number(admissionForm.courseFees).toLocaleString()}</span></p>
              <p><b>Payment Schedule:</b> <span class="text-purple-300">${selectedFeeModeObj?.fee_modes_name || "Monthly"}</span></p>
              ${admData?.admissionNumber ? `<p><b>Admission Number:</b> <span class="font-mono text-amber-300">${admData.admissionNumber}</span></p>` : ""}
              ${receiptData?.receiptNo ? `<p><b>Receipt Generated:</b> <span class="font-mono text-emerald-400 font-bold">${receiptData.receiptNo}</span></p>` : ""}
              <div class="mt-2 pt-2 border-t border-slate-700 text-slate-400 text-[11px]">
                💡 You can complete full parent, address, or document details anytime from the Dashboard!
              </div>
            </div>
          `,
          background: "#0f172a",
          color: "#f8fafc",
          iconColor: "#38bdf8",
          showCancelButton: true,
          confirmButtonColor: "#0284c7",
          cancelButtonColor: "#475569",
          confirmButtonText: "View on Dashboard",
          cancelButtonText: "Enroll Another Student",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard");
          } else {
            setStudentForm({
              studentName: "",
              whatsapp: "",
              nickname: "",
              email: "",
              dob: "",
              bloodGroup: "",
              fatherName: "",
              motherName: "",
              guardianName: "",
              guardianRelation: "Father",
              guardianPhone: "",
              phone1: "",
              phone2: "",
              address: "",
              districtId: 2,
              city: "Barrackpore",
              pin: "700120",
              genderId: 1,
            });
            setAdmissionForm((prev) => ({
              ...prev,
              courseId: "",
              courseFees: "",
              completionDate: "",
            }));
            setFeePayment({
              collectFeeNow: true,
              amountPaid: "",
              paymentMode: "UPI",
              paymentDate: new Date().toISOString().split("T")[0],
              periodFrom: "",
              periodTo: "",
              remarks: "",
            });
            setShowOptionalDetails(false);
          }
        });
      } else {
        throw new Error(res?.data?.message || "Failed to create student and admission.");
      }
    } catch (err) {
      console.error("Admission error:", err);
      let errorMsg = err.response?.data?.message || "Could not complete student registration and admission.";

      const valErrors = err.response?.data?.data || err.response?.data?.errors;
      if (valErrors && typeof valErrors === "object") {
        errorMsg = Object.entries(valErrors)
          .map(([field, msgs]) => {
            const label = field.replace(/^student\.|^admission\.|^initial_fee\./, "").replace(/_/g, " ");
            const msgList = Array.isArray(msgs) ? msgs.join(", ") : String(msgs);
            return `<div class="p-2 rounded-lg bg-rose-950/60 border border-rose-800/60 mb-1.5"><b class="text-rose-200 capitalize">${label}:</b> <span class="text-rose-300">${msgList}</span></div>`;
          })
          .join("");
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        html: `<div class="text-left text-xs text-rose-300 mt-2">${errorMsg}</div>`,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Background ambient glows */}
      <div className="fixed w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[160px] -top-32 -left-20 pointer-events-none" />
      <div className="fixed w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] top-1/2 -right-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Navigation & Header */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <span>/</span>
              <span className="text-slate-400">Students</span>
              <span>/</span>
              <span className="text-sky-400 font-semibold">Fast Admission &amp; Fees</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <i className="bi bi-lightning-charge-fill text-amber-400"></i>
              <span>QUICK 10-SECOND STUDENT ONBOARDING</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <i className="bi bi-mortarboard-fill text-sky-400"></i>
              Student Registration &amp; Course Enrollment
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Enter minimal essential data (Name, WhatsApp &amp; Course) to admit immediately. All other details can be updated anytime later from the Dashboard.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition"
          >
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Rapid Onboarding Tip */}
        <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between gap-4 text-xs text-sky-300">
          <div className="flex items-center gap-2.5">
            <i className="bi bi-info-circle-fill text-sky-400 text-base flex-shrink-0"></i>
            <span>
              <strong>Minimal Data Mode Active:</strong> Only <strong>Student Name</strong>, <strong>WhatsApp</strong>, and <strong>Course</strong> are required to admit a student right now.
            </span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-sky-500/20 text-[11px] font-semibold text-sky-200">
            Fast Onboarding
          </span>
        </div>

        {loadingResources ? (
          <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-2xl text-center text-slate-400">
            <svg className="animate-spin h-8 w-8 text-sky-400 mx-auto mb-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-sm">Loading course catalogs and fee schedules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: The Rapid Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: ESSENTIAL STUDENT IDENTIFIERS (NAME & WHATSAPP) */}
                <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-bold">1</span>
                      Student Identity (Minimal Required)
                    </h2>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <i className="bi bi-check-circle-fill"></i> Mandatory
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Student Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        placeholder="e.g. Suman Sengupta"
                        value={studentForm.studentName}
                        onChange={handleStudentChange}
                        required
                        disabled={!isAuthorized}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                        <i className="bi bi-whatsapp"></i>
                        <span>WhatsApp / Mobile (10 digits)</span> <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        maxLength="10"
                        placeholder="10-digit phone number"
                        value={studentForm.whatsapp}
                        onChange={handleStudentChange}
                        required
                        disabled={!isAuthorized}
                        className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 2: COURSE ASSIGNMENT & FEES */}
                <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">2</span>
                      Course Assignment &amp; Agreed Fees
                    </h2>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <i className="bi bi-check-circle-fill"></i> Mandatory
                    </span>
                  </div>

                  {/* GROUPED CLEAN ACADEMIC COURSE DROPDOWN */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        <span>Select Academic Course</span>
                        <span className="text-rose-400">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {courses.length} courses across 4 categories
                      </span>
                    </div>

                    <select
                      name="courseId"
                      value={admissionForm.courseId}
                      onChange={handleAdmissionChange}
                      required
                      disabled={!isAuthorized}
                      className="w-full bg-slate-950 border border-slate-700/90 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-inner"
                    >
                      <option value="" className="text-slate-500 bg-slate-900">
                        -- Select Academic Course Program --
                      </option>
                      {Object.entries(groupedCourses).map(([groupTitle, courseList]) =>
                        courseList.length > 0 ? (
                          <optgroup
                            key={groupTitle}
                            label={groupTitle}
                            className="bg-slate-900 font-bold text-emerald-400 text-xs py-1"
                          >
                            {courseList.map((c) => {
                              const fee = Number(c.courseFees || c.course_fees || 0);
                              const code = c.course_code || c.courseCode;
                              const name = c.course_name || c.courseName;
                              return (
                                <option
                                  key={c.id || c.courseId}
                                  value={c.id || c.courseId}
                                  className="bg-slate-950 text-slate-100 font-normal py-1.5 pl-2 text-xs"
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
                      <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/30 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs animate-fadeIn">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded-md font-mono font-bold text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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
                  {/* Agreed Course Fee & Payment Mode */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Set Course Fee */}
                      <div>
                        <label className="block text-xs font-bold text-emerald-400 mb-1.5">
                          Agreed Course Fees (₹) <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-sm">₹</span>
                          <input
                            type="number"
                            name="courseFees"
                            min="0"
                            step="any"
                            placeholder="e.g. 14000"
                            value={admissionForm.courseFees}
                            onChange={handleAdmissionChange}
                            required
                            disabled={!isAuthorized}
                            className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl pl-7 pr-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>

                      {/* Payment Schedule */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Payment Schedule / Mode <span className="text-rose-400">*</span>
                        </label>
                        <select
                          name="feeModesId"
                          value={admissionForm.feeModesId}
                          onChange={handleAdmissionChange}
                          required
                          disabled={!isAuthorized}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          {feeModes.map((fm) => (
                            <option key={fm.id} value={fm.id}>
                              {fm.fee_modes_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Admission Date Field with Interactive Picker & Shortcuts */}
                    <div className="pt-3 border-t border-slate-800">
                      <DatePicker
                        label="Admission Date"
                        name="admissionDate"
                        value={admissionForm.admissionDate}
                        onChange={handleAdmissionChange}
                        required
                      />
                    </div>


                  </div>

                  {/* INITIAL FEES RECEIVED ENTRIES (WITH DATE AND MODE) */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-sky-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={feePayment.collectFeeNow}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setFeePayment((prev) => ({
                              ...prev,
                              collectFeeNow: checked,
                              amountPaid: checked && !prev.amountPaid ? (admissionForm.courseFees || "") : prev.amountPaid,
                            }));
                          }}
                          className="w-4 h-4 rounded text-sky-500 bg-slate-900 border-slate-700 focus:ring-sky-500 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                          <span>💳 Initial Fees Received at Admission</span>
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
                                placeholder="e.g. 600"
                                value={feePayment.amountPaid}
                                onChange={(e) => setFeePayment((prev) => ({ ...prev, amountPaid: e.target.value }))}
                                className="w-full bg-slate-900 border border-sky-500/40 rounded-xl pl-7 pr-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-sky-400"
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
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
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
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer"
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
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs text-slate-300">
                          {/* Row 1: Paid Now & Accrued to Current Period */}
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

                          {/* Row 2: Status & Due Breakdown */}
                          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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
                </div>

                {/* STEP 3: OPTIONAL / SECONDARY DETAILS (ACCORDION - CAN BE FILLED LATER) */}
                <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowOptionalDetails(!showOptionalDetails)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-850/40 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                        +
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-purple-300">
                          Optional Details (Parents, Address, DOB, Blood Group)
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {showOptionalDetails
                            ? "Click to collapse secondary fields"
                            : "Skip for now if you're in a hurry — you can complete these later anytime!"}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                      {showOptionalDetails ? "Hide Optional" : "Add Details"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showOptionalDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 pt-0 border-t border-slate-800/60 space-y-4"
                      >
                        {/* Email & Alternate Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Email Address (Optional)
                            </label>
                            <input
                              type="email"
                              name="email"
                              placeholder="student@example.com"
                              value={studentForm.email}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Alternate Calling Phone (Optional)
                            </label>
                            <input
                              type="tel"
                              name="phone1"
                              maxLength="15"
                              placeholder="e.g. 9830123456"
                              value={studentForm.phone1}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        </div>

                        {/* DOB, Gender & Blood Group */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Date of Birth (Optional)
                            </label>
                            <input
                              type="date"
                              name="dob"
                              value={studentForm.dob}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Gender
                            </label>
                            <select
                              name="genderId"
                              value={studentForm.genderId}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                            >
                              <option value={1}>Male</option>
                              <option value={2}>Female</option>
                              <option value={3}>Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Blood Group (Optional)
                            </label>
                            <select
                              name="bloodGroup"
                              value={studentForm.bloodGroup}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                            >
                              <option value="">-- Not Available / Unknown --</option>
                              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                                <option key={bg} value={bg}>{bg}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Parents & Guardians */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Father's Name (Optional)
                            </label>
                            <input
                              type="text"
                              name="fatherName"
                              placeholder="Father's full name"
                              value={studentForm.fatherName}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Mother's Name (Optional)
                            </label>
                            <input
                              type="text"
                              name="motherName"
                              placeholder="Mother's full name"
                              value={studentForm.motherName}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Guardian Phone (Optional)
                            </label>
                            <input
                              type="tel"
                              name="guardianPhone"
                              placeholder="Guardian phone number"
                              value={studentForm.guardianPhone}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                            />
                          </div>
                        </div>

                        {/* Address & City */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Residential Address (Optional)
                            </label>
                            <input
                              type="text"
                              name="address"
                              placeholder="House / Street / Locality"
                              value={studentForm.address}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              City / Town (Optional)
                            </label>
                            <input
                              type="text"
                              name="city"
                              placeholder="e.g. Barrackpore"
                              value={studentForm.city}
                              onChange={handleStudentChange}
                              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* SUBMIT ACTIONS */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Link
                    to="/dashboard"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={submitting || !isAuthorized}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-sky-600 to-indigo-600 hover:from-emerald-400 hover:via-sky-500 hover:to-indigo-500 shadow-xl shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Enrolling Student...</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-lightning-charge-fill text-amber-300"></i>
                        <span>Fast Register &amp; Confirm Enrollment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Live Interactive Admission Voucher Card */}
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl sticky top-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <i className="bi bi-receipt-cutoff text-emerald-400"></i>
                  Admission Voucher Preview
                </h3>

                {/* Preview Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-950 border border-slate-750/80 shadow-inner space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-lg shadow-sky-600/30">
                      {(studentForm.studentName || "ST").substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight">
                        {studentForm.studentName || "Student Full Name"}
                      </h4>
                      <p className="text-[11px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                        <i className="bi bi-whatsapp text-[10px]"></i>
                        <span>{studentForm.whatsapp || "WhatsApp Number"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Enrolled Program:</span>
                      <span className="text-sky-300 font-semibold text-xs leading-snug block">
                        {selectedCourseObj?.course_name || selectedCourseObj?.courseName || "No course selected yet"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400 text-[11px]">Agreed Total Fees:</span>
                      <span className="text-emerald-400 font-extrabold text-sm">
                        {admissionForm.courseFees ? `₹${Number(admissionForm.courseFees).toLocaleString()}` : "Not set"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Payment Schedule:</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                        {selectedFeeModeObj?.fee_modes_name || "Monthly"}
                      </span>
                    </div>

                    {monthlyBreakdown && selectedFeeModeObj?.id === 1 && (
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                        <span className="font-bold">Estimated Monthly:</span> ~₹{monthlyBreakdown.perMonth.toLocaleString()} / mo
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                    <i className="bi bi-shield-check"></i>
                    <span>Fast Registration Protocol:</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Submit with just <strong>Name, WhatsApp &amp; Course</strong>. The student record is saved instantly and can be enriched with full address/parent documents later from the Dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// Interactive DatePicker Helper Component with Selection Button & Shortcuts
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
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
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
          className="w-full bg-slate-900 text-gray-100 border border-slate-700 hover:border-slate-600 focus:border-sky-500 rounded-xl pl-4 pr-36 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition shadow-inner"
        />

        <button
          type="button"
          onClick={openCalendar}
          className="absolute right-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-sky-500/20 active:scale-95"
          title="Click to open calendar"
        >
          <Calendar className="w-3.5 h-3.5 text-white" />
          <span>Select Date</span>
        </button>
      </div>

      {/* Quick Date Presets */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] uppercase font-bold text-slate-500">Shortcuts:</span>
        <button
          type="button"
          onClick={() => setPreset("today")}
          className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border border-slate-800 transition cursor-pointer"
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => setPreset("yesterday")}
          className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer"
        >
          Yesterday
        </button>
        <button
          type="button"
          onClick={() => setPreset("startOfMonth")}
          className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer"
        >
          1st of Month
        </button>
      </div>
    </div>
  );
}
