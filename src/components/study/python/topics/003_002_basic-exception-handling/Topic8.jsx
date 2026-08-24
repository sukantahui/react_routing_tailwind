import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import customHierarchy from "./topic8_files/custom_exception_hierarchy_fundamentals.py?raw";
import customAttributes from "./topic8_files/custom_exceptions_with_attributes.py?raw";
import hierarchicalDispatch from "./topic8_files/multi_tiered_domain_exception_handling.py?raw";
import admissionSuite from "./topic8_files/institutional_admission_validation_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic8_files/topic8_note.txt?raw";

// FAQ Questions
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: Creating User-Defined Custom Exception Classes
 * Module: 003_002_basic-exception-handling
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic8() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("tree");

  // Interactive Admission Suite Simulator State
  const [studentId, setStudentId] = useState("STU-103");
  const [studentName, setStudentName] = useState("Rahul Verma");
  const [selectedCourse, setSelectedCourse] = useState("PY-ADV");
  const [depositFee, setDepositFee] = useState(6000);

  const [admissionState, setAdmissionState] = useState({
    status: "IDLE",
    exceptionClass: null,
    message: "Ready to process admission application.",
    payload: null,
  });

  const enrolledDatabase = [
    { id: "STU-101", name: "Sourav Mukherjee", course: "PY-ADV", fee: 6000 },
    { id: "STU-102", name: "Priyanka Sen", course: "PY-ADV", fee: 5000 },
    { id: "STU-105", name: "Ananya Ghosh", course: "AI-ML", fee: 10000 },
  ];

  const courseRules = {
    "PY-ADV": { name: "Python Pro Full-Stack", minDeposit: 5000, maxSeats: 2 },
    "DATA-ENG": { name: "Data Engineering Track", minDeposit: 8000, maxSeats: 2 },
    "AI-ML": { name: "AI & Deep Learning", minDeposit: 10000, maxSeats: 1 },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleProcessAdmission = () => {
    const rule = courseRules[selectedCourse];
    const existingInCourse = enrolledDatabase.filter((s) => s.course === selectedCourse);

    // 1. Guard: Duplicate Student ID
    if (enrolledDatabase.some((s) => s.id.toUpperCase() === studentId.toUpperCase())) {
      const existing = enrolledDatabase.find((s) => s.id.toUpperCase() === studentId.toUpperCase());
      setAdmissionState({
        status: "ERROR",
        exceptionClass: "DuplicateStudentRecordError",
        message: `[ERR_DUPLICATE_APPLICANT] Student ID '${studentId}' is already enrolled in '${existing.course}'!`,
        payload: {
          error_code: "ERR_DUPLICATE_APPLICANT",
          student_id: studentId,
          existing_student: existing.name,
          existing_course: existing.course,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    // 2. Guard: Tuition Scheme Deposit Threshold
    if (depositFee < rule.minDeposit) {
      const shortfall = rule.minDeposit - depositFee;
      setAdmissionState({
        status: "ERROR",
        exceptionClass: "TuitionSchemeViolationError",
        message: `[ERR_TUITION_SCHEME_VIOLATION] Minimum deposit for '${selectedCourse}' is INR ${rule.minDeposit.toLocaleString()}. Submitted INR ${depositFee.toLocaleString()} (Shortfall: INR ${shortfall.toLocaleString()})`,
        payload: {
          error_code: "ERR_TUITION_SCHEME_VIOLATION",
          course_code: selectedCourse,
          required_min_fee: rule.minDeposit,
          submitted_fee: depositFee,
          shortfall_inr: shortfall,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    // 3. Guard: Course Quota Capacity
    if (existingInCourse.length >= rule.maxSeats) {
      setAdmissionState({
        status: "ERROR",
        exceptionClass: "CourseCapacityExceededError",
        message: `[ERR_CAPACITY_EXCEEDED] Course '${selectedCourse}' is FULL (Max: ${rule.maxSeats}). Assigned Waitlist #1.`,
        payload: {
          error_code: "ERR_CAPACITY_EXCEEDED",
          course_code: selectedCourse,
          max_capacity: rule.maxSeats,
          assigned_waitlist_position: 1,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    // Success
    setAdmissionState({
      status: "SUCCESS",
      exceptionClass: null,
      message: `[ADMISSION CONFIRMED] ${studentName} (${studentId}) enrolled in ${rule.name}!`,
      payload: {
        status: "CONFIRMED",
        student_id: studentId,
        student_name: studentName,
        course_name: rule.name,
        deposit_paid: depositFee,
        timestamp: new Date().toISOString(),
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 3 • Module 003_002
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 8
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Robust Exception Handling &amp; Defensive Coding
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Creating User-Defined <span className="text-teal-400">Custom Exception Classes</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master domain-driven error engineering: subclassing <code className="text-teal-300 font-mono">Exception</code>, root domain base hierarchies, embedding stateful forensic payloads (<code className="text-cyan-300 font-mono">self.deficit</code>, <code className="text-cyan-300 font-mono">self.error_code</code>), serializing structured API responses, and specific-to-general exception ordering.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌳 Root Domain Base Exception Pattern
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Rich Forensic Payload Attributes
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Specific-to-General Hierarchical Dispatch
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Preventing Shadowing Traps
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CUSTOM EXCEPTION FUNDAMENTALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧱</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Architecting Custom Domain Exceptions
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In enterprise systems, standard built-ins (like <code className="text-slate-200 font-mono">ValueError</code>) are often too generic to represent complex domain failures. Custom exceptions allow you to create <strong>dedicated error types with structured forensic metadata</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Subclass Exception</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">class DomainError(Exception):</code>
                <p className="text-[11px] text-slate-300">
                  Always inherit from <code className="text-teal-300">Exception</code>, never <code className="text-rose-400">BaseException</code> (so KeyboardInterrupt isn't caught).
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Store Context Metadata</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">self.student_id = stu_id</code>
                <p className="text-[11px] text-slate-300">
                  Save diagnostic values on self during <code className="text-cyan-300 font-mono">__init__()</code> for automated JSON serialization and logging.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Root Base Catch-All</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">except DomainBaseError:</code>
                <p className="text-[11px] text-slate-300">
                  Allows API callers to catch all module-specific errors with a single polymorphically matched except block.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Exception Shadowing Trap
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Python processes <code className="text-teal-300 font-mono">except</code> blocks top-to-bottom. If you place a broad parent class (like <code className="text-teal-300 font-mono">except InstituteError:</code>) before a specific child class (<code className="text-cyan-300 font-mono">except QuotaFullError:</code>), the parent catches everything and the child block becomes <strong>unreachable dead code</strong>! Always order from <em>most specific to most general</em>!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Custom Exception Trees &amp; Payloads
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("tree")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "tree"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Domain Hierarchy Tree
              </button>
              <button
                onClick={() => setActiveInteractiveTab("payload")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "payload"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Forensic Payload Architecture
              </button>
              <button
                onClick={() => setActiveInteractiveTab("dispatch")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "dispatch"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Hierarchical Dispatch Ordering
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining domain inheritance trees, structured forensic payloads, and multi-tiered catch dispatch:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "tree" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">INSTITUTIONAL DOMAIN EXCEPTION HIERARCHY TREE</text>

                {/* Level 0: Exception */}
                <g transform="translate(320, 50)">
                  <rect x="0" y="0" width="240" height="40" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="50" y="25" fill="#c4b5fd" fontSize="12" fontWeight="bold">builtins.Exception</text>
                </g>

                {/* Line down to Root Domain */}
                <line x1="440" y1="90" x2="440" y2="120" stroke="#8b5cf6" strokeWidth="2" />

                {/* Level 1: Root Domain Base */}
                <g transform="translate(280, 120)">
                  <rect x="0" y="0" width="320" height="45" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="25" y="28" fill="#99f6e4" fontSize="12" fontWeight="bold">CoderAccoTaxInstituteError (Root Base)</text>
                </g>

                {/* Branch lines */}
                <line x1="440" y1="165" x2="160" y2="210" stroke="#14b8a6" strokeWidth="2" />
                <line x1="440" y1="165" x2="440" y2="210" stroke="#14b8a6" strokeWidth="2" />
                <line x1="440" y1="165" x2="720" y2="210" stroke="#14b8a6" strokeWidth="2" />

                {/* Level 2: Specific Exceptions */}
                <g transform="translate(40, 210)">
                  <rect x="0" y="0" width="240" height="90" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="25" fill="#a5f3fc" fontSize="11" fontWeight="bold">DuplicateStudentRecordError</text>
                  <text x="15" y="50" fill="#cbd5e1" fontSize="9">• student_id</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="9">• existing_course</text>
                </g>

                <g transform="translate(320, 210)">
                  <rect x="0" y="0" width="240" height="90" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="15" y="25" fill="#fda4af" fontSize="11" fontWeight="bold">CourseCapacityExceededError</text>
                  <text x="15" y="50" fill="#cbd5e1" fontSize="9">• max_capacity</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="9">• waitlist_position</text>
                </g>

                <g transform="translate(600, 210)">
                  <rect x="0" y="0" width="240" height="90" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="15" y="25" fill="#a7f3d0" fontSize="11" fontWeight="bold">TuitionSchemeViolationError</text>
                  <text x="15" y="50" fill="#cbd5e1" fontSize="9">• min_required_fee</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="9">• fee_shortfall</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "payload" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">CUSTOM EXCEPTION OBJECT WITH RICH FORENSIC ATTRIBUTES</text>

                {/* Left: Exception class definition */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Class Definition with Custom Attributes</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">class TuitionDeficitError(Exception):</text>
                  <text x="35" y="80" fill="#ecfdf5" fontSize="9 font-mono">def __init__(self, stu_id, req, avail):</text>
                  <text x="50" y="100" fill="#34d399" fontSize="9 font-mono">self.student_id = stu_id</text>
                  <text x="50" y="120" fill="#34d399" fontSize="9 font-mono">self.deficit = req - avail</text>
                  <text x="50" y="140" fill="#38bdf8" fontSize="9 font-mono">super().__init__(f"Shortfall: {self.deficit}")</text>

                  <rect x="20" y="170" width="340" height="50" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="195" fill="#c4b5fd" fontSize="8 font-mono">Preserves str(err) while retaining programmatic attributes!</text>
                </g>

                {/* Arrow */}
                <g transform="translate(430, 140)">
                  <text x="10" y="20" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: API JSON serialization */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Serialized REST API JSON Payload</text>
                  
                  <rect x="20" y="55" width="340" height="165" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="80" fill="#34d399" fontSize="9 font-mono">&#123;</text>
                  <text x="45" y="100" fill="#ecfdf5" fontSize="9 font-mono">"error_code": "TUITION_DEFICIT",</text>
                  <text x="45" y="120" fill="#ecfdf5" fontSize="9 font-mono">"student_id": "STU-103",</text>
                  <text x="45" y="140" fill="#ecfdf5" fontSize="9 font-mono">"deficit_inr": 3000.00,</text>
                  <text x="45" y="160" fill="#ecfdf5" fontSize="9 font-mono">"timestamp": "2026-08-24 22:33:00"</text>
                  <text x="30" y="180" fill="#34d399" fontSize="9 font-mono">&#125;</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">SPECIFIC-TO-GENERAL HIERARCHICAL DISPATCH ORDERING</text>

                {/* 3 Tier Blocks in Order */}
                <g transform="translate(30, 50)">
                  {/* Tier 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="30" fill="#a5f3fc" fontSize="11" fontWeight="bold">1. Leaf Subclass (1st)</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="9 font-mono">except QuotaFullError:</text>
                  <text x="30" y="85" fill="#34d399" fontSize="9 font-mono">add_to_waitlist()</text>
                  
                  <rect x="15" y="120" width="220" height="95" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="25" y="145" fill="#38bdf8" fontSize="9 font-bold">Targeted Recovery:</text>
                  <text x="25" y="165" fill="#cbd5e1" fontSize="8">Executes specialized domain logic</text>
                  <text x="25" y="180" fill="#cbd5e1" fontSize="8">for waitlist allocation.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Tier 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="310" y="30" fill="#99f6e4" fontSize="11" fontWeight="bold">2. Subsystem Base (2nd)</text>
                  <text x="310" y="60" fill="#ecfdf5" fontSize="9 font-mono">except AdmissionError:</text>
                  <text x="325" y="85" fill="#34d399" fontSize="9 font-mono">show_admission_alert()</text>

                  <rect x="310" y="120" width="220" height="95" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="320" y="145" fill="#34d399" fontSize="9 font-bold">Subsystem Catch-All:</text>
                  <text x="320" y="165" fill="#cbd5e1" fontSize="8">Catches other unhandled</text>
                  <text x="320" y="180" fill="#cbd5e1" fontSize="8">admission failures.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Tier 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11" fontWeight="bold">3. Root Base (Last)</text>
                  <text x="605" y="60" fill="#ecfdf5" fontSize="9 font-mono">except InstituteError:</text>
                  <text x="620" y="85" fill="#34d399" fontSize="9 font-mono">log_system_failure()</text>

                  <rect x="605" y="120" width="200" height="95" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="145" fill="#c4b5fd" fontSize="9 font-bold">Top-Level Safety Net:</text>
                  <text x="615" y="165" fill="#cbd5e1" fontSize="8">Prevents application crashes</text>
                  <text x="615" y="180" fill="#cbd5e1" fontSize="8">from any module bug.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE ADMISSION SUITE PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Admission Suite &amp; Custom Exception Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Submit admission records to trigger distinct custom exception classes with live structured JSON payloads:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Form Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                Applicant Admission Entry
              </span>

              {/* Student ID */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">
                  Student ID (STU-101 and STU-102 already exist):
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. STU-103"
                />
              </div>

              {/* Student Name */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">Student Full Name:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. Rahul Verma"
                />
              </div>

              {/* Course Selection */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">Target Course:</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-teal-300 focus:border-teal-500 focus:outline-none"
                >
                  <option value="PY-ADV">PY-ADV (Min Fee: INR 5,000 | Max Seats: 2 - Already Full!)</option>
                  <option value="DATA-ENG">DATA-ENG (Min Fee: INR 8,000 | Max Seats: 2)</option>
                  <option value="AI-ML">AI-ML (Min Fee: INR 10,000 | Max Seats: 1 - Full!)</option>
                </select>
              </div>

              {/* Initial Deposit */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Initial Deposit Paid:</span>
                  <span className="text-teal-300 font-bold">INR {depositFee.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="1000"
                  value={depositFee}
                  onChange={(e) => setDepositFee(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleProcessAdmission}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-lg shadow-teal-950/50"
              >
                Submit Admission Application (process_admission())
              </button>
            </div>

            {/* Live Custom Exception Inspector Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Custom Exception &amp; Payload Inspector
              </span>

              <div className={clsx(
                "p-4 rounded-xl border flex-1 space-y-2.5 text-xs font-mono",
                admissionState.status === "ERROR" ? "bg-rose-950/40 border-rose-800" : "bg-slate-900 border-slate-800"
              )}>
                <div>
                  <span className="text-slate-400">Status: </span>
                  <span className={clsx("font-bold", admissionState.status === "ERROR" ? "text-rose-400" : "text-emerald-400")}>
                    {admissionState.status === "ERROR" ? `❌ ${admissionState.exceptionClass}` : "✓ ADMISSION CONFIRMED"}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 text-slate-300 leading-relaxed">
                  {admissionState.message}
                </div>

                {admissionState.payload && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block mb-1 text-[11px]">Structured Forensic API Payload:</span>
                    <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-teal-300 text-[10px] overflow-x-auto">
                      {JSON.stringify(admissionState.payload, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER CUSTOM EXCEPTION MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Custom Exception Class Design Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Pattern / Element</th>
                  <th className="py-3.5 px-4 font-bold">Python Code Template</th>
                  <th className="py-3.5 px-4 font-bold">Inherits From</th>
                  <th className="py-3.5 px-4 font-bold">Architectural Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Root Domain Base</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class LibraryError(Exception): pass</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">builtins.Exception</td>
                  <td className="py-3 px-4">Single catch-all clause for entire package</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Stateful Payload Error</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def __init__(self, id, code): ...</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">LibraryError</td>
                  <td className="py-3 px-4">Carries forensic metadata for API JSON serialization</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Specialized Value Subtype</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class InvalidPANError(ValueError):</td>
                  <td className="py-3 px-4 font-mono text-purple-300">builtins.ValueError</td>
                  <td className="py-3 px-4">Allows legacy code expecting ValueError to catch it</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Hierarchical Ordering</td>
                  <td className="py-3 px-4 font-mono text-slate-200">except Child: ... except Base: ...</td>
                  <td className="py-3 px-4">N/A</td>
                  <td className="py-3 px-4">Prevents shadow traps and unreachable dead except blocks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating custom exception hierarchies, contextual metadata payloads, hierarchical dispatch, and admission validation suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "custom_exception_hierarchy_fundamentals.py",
                code: customHierarchy,
                description: "Root domain base exception pattern, subclassing Exception, and polymorphic catching.",
              },
              {
                filename: "custom_exceptions_with_attributes.py",
                code: customAttributes,
                description: "Custom exceptions with stateful attributes, deficit calculations, and REST API JSON payloads.",
              },
              {
                filename: "multi_tiered_domain_exception_handling.py",
                code: hierarchicalDispatch,
                description: "Hierarchical exception dispatch from most specific to most general to prevent shadowing traps.",
              },
              {
                filename: "institutional_admission_validation_suite.py",
                code: admissionSuite,
                description: "Enterprise Institutional Student Admission Suite with duplicate, quota, and fee exception classes.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Subclassing BaseException
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">class MyError(BaseException):</code> bypasses normal <code className="text-rose-300 font-mono">except Exception:</code> handlers and can cause dangerous catch-all blocks that intercept <code className="text-rose-300 font-mono">KeyboardInterrupt</code> (Ctrl+C).
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always inherit from <code className="text-emerald-300">builtins.Exception</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Shadowing Specific Child Classes
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Placing <code className="text-amber-300 font-mono">except BaseError:</code> before <code className="text-amber-300 font-mono">except SpecificError:</code> causes the base block to catch everything, leaving the child block as unreachable dead code.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Order except clauses from most specific to most general.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Forgetting `super().__init__()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Overriding <code className="text-purple-300 font-mono">__init__()</code> without calling <code className="text-purple-300 font-mono">super().__init__(message)</code> breaks <code className="text-purple-300 font-mono">str(err)</code> and standard traceback formatting.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always pass formatted message to <code className="text-emerald-300">super().__init__()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Proliferation of Redundant Classes
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Creating separate custom classes for simple standard errors (e.g. <code className="text-cyan-300 font-mono">NegativeAgeError</code>) when <code className="text-cyan-300 font-mono">ValueError</code> is universally understood.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Create custom classes only when domain logic requires specific handling or payload data.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering user-defined custom exceptions, forensic payloads, and exception dispatch:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with custom exception hierarchies, payload templates, and ordering blueprints:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic8_custom_exception_classes_notes.txt"
              title="Print Topic 8 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
