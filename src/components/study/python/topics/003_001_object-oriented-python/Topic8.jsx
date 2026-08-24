import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import singleMultilevel from "./topic8_files/single_and_multilevel_inheritance.py?raw";
import multipleMixins from "./topic8_files/multiple_inheritance_and_mixins.py?raw";
import hierarchicalHybrid from "./topic8_files/hierarchical_and_hybrid_inheritance.py?raw";
import educationalRBAC from "./topic8_files/enterprise_educational_hierarchy_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic8_files/topic8_note.txt?raw";

// FAQ Questions
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: Inheritance: Single, Multiple, Multilevel, and Hierarchical
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic8() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("topologies");

  // Interactive RBAC Hierarchy Inspector State
  const [selectedRole, setSelectedRole] = useState("superadmin");

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

  const roleDetails = {
    student: {
      title: "StudentUser",
      topology: "Hierarchical (Child of BaseSystemUser)",
      ancestors: ["StudentUser", "BaseSystemUser", "object"],
      attributes: ["user_id", "display_name", "email", "enrolled_course", "permissions"],
      permissions: ["VIEW_LESSONS", "SUBMIT_ASSIGNMENTS", "JOIN_DISCORD"],
      isBaseUser: true,
      hasAuditMixin: false,
      hasPaymentMixin: false,
    },
    faculty: {
      title: "FacultyInstructor",
      topology: "Hierarchical (Child of BaseSystemUser)",
      ancestors: ["FacultyInstructor", "BaseSystemUser", "object"],
      attributes: ["user_id", "display_name", "email", "specialization", "permissions"],
      permissions: ["GRADE_ASSIGNMENTS", "CREATE_QUIZZES", "UPLOAD_VIDEOS"],
      isBaseUser: true,
      hasAuditMixin: false,
      hasPaymentMixin: false,
    },
    hod: {
      title: "DepartmentHead",
      topology: "Multilevel (Person -> InstituteStaff -> DepartmentHead)",
      ancestors: ["DepartmentHead", "InstituteStaff", "Person", "object"],
      attributes: ["full_name", "national_id", "email", "emp_id", "department", "base_salary", "annual_budget"],
      permissions: ["ALLOCATE_BUDGET", "MANAGE_FACULTY", "SIGN_CERTIFICATES"],
      isBaseUser: false,
      hasAuditMixin: false,
      hasPaymentMixin: false,
    },
    superadmin: {
      title: "SuperAdminUser",
      topology: "Multiple Inheritance (BaseSystemUser + SecurityAuditing + PaymentGateway)",
      ancestors: ["SuperAdminUser", "BaseSystemUser", "SecurityAuditingCapability", "PaymentGatewayCapability", "object"],
      attributes: ["user_id", "display_name", "email", "permissions"],
      permissions: ["ALL_SYSTEM_PRIVILEGES", "MANAGE_USERS", "EXECUTE_REFUNDS", "FORENSIC_AUDIT"],
      isBaseUser: true,
      hasAuditMixin: true,
      hasPaymentMixin: true,
    },
  };

  const currentRole = roleDetails[selectedRole];

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
            Segment 3 • Module 003_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 8
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Inheritance: <span className="text-teal-400">Single</span>, <span className="text-cyan-400">Multiple</span>, <span className="text-purple-400">Multilevel</span> &amp; <span className="text-amber-400">Hierarchical</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's inheritance topologies: single base inheritance, multilevel linear chains, multiple inheritance with composable <code className="text-teal-300 font-mono">Mixins</code>, hierarchical branching, constructor chaining with <code className="text-cyan-300 font-mono">super().__init__()</code>, and the principle of <span className="text-amber-300 font-semibold">Composition over Inheritance</span>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌳 4 Core Topologies
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧩 Composable Mixin Architecture
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔗 Constructor Chaining (super)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ RBAC User Role Hierarchies
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE 4 TOPOLOGIES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Four Primary Inheritance Topologies
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python natively supports all four foundational object-oriented inheritance structures, allowing child classes to inherit attributes, methods, and invariants from ancestor classes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 not-prose">
              {/* 1. Single */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Single</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">class Staff(Person):</code>
                <p className="text-[11px] text-slate-300">
                  Direct 1-to-1 inheritance from a single base parent class.
                </p>
              </div>

              {/* 2. Multilevel */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">2️⃣ Multilevel</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">HOD(Staff) -&gt; Staff(Person)</code>
                <p className="text-[11px] text-slate-300">
                  Linear chain of descent (Grandparent → Parent → Child).
                </p>
              </div>

              {/* 3. Multiple */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">3️⃣ Multiple</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Admin(User, AuditMixin):</code>
                <p className="text-[11px] text-slate-300">
                  Child class inheriting simultaneously from 2+ base classes / mixins.
                </p>
              </div>

              {/* 4. Hierarchical */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Hierarchical</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">Student(User), Faculty(User)</code>
                <p className="text-[11px] text-slate-300">
                  Multiple sibling classes branching from a single shared parent root.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-amber-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Architectural Principle: IS-A vs HAS-A
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Use <strong>Inheritance (IS-A)</strong> only when a strict taxonomic relationship holds (<code className="text-teal-300 font-mono">Student IS-A User</code>). Use <strong>Composition (HAS-A)</strong> when an object merely owns or delegates to another component (<code className="text-cyan-300 font-mono">Student HAS-AN Address</code>).
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
                2. Visualizing Topologies &amp; Mixin Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("topologies")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "topologies"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                4 Topologies Map
              </button>
              <button
                onClick={() => setActiveInteractiveTab("mixins")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "mixins"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Mixin Composition Pipeline
              </button>
              <button
                onClick={() => setActiveInteractiveTab("chaining")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "chaining"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                super() Constructor Chaining
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining taxonomic lineage, capability mixins, and linear constructor propagation:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "topologies" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE 4 INHERITANCE TOPOLOGIES IN PYTHON</text>

                {/* 4 Quadrants */}
                <g transform="translate(30, 50)">
                  {/* Single */}
                  <rect x="0" y="0" width="190" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Single</text>
                  <rect x="25" y="60" width="140" height="40" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="50" y="85" fill="#34d399" fontSize="11 font-mono font-bold">Person</text>
                  <text x="90" y="125" fill="#34d399" fontSize="18" fontWeight="bold">↓</text>
                  <rect x="25" y="145" width="140" height="40" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="55" y="170" fill="#a7f3d0" fontSize="11 font-mono font-bold">Staff</text>

                  {/* Multilevel */}
                  <rect x="210" y="0" width="190" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="225" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">2. Multilevel</text>
                  <rect x="235" y="50" width="140" height="35" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="260" y="72" fill="#c4b5fd" fontSize="10 font-mono">Person</text>
                  <text x="300" y="102" fill="#c4b5fd" fontSize="14">↓</text>
                  <rect x="235" y="110" width="140" height="35" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="265" y="132" fill="#c4b5fd" fontSize="10 font-mono">Staff</text>
                  <text x="300" y="162" fill="#c4b5fd" fontSize="14">↓</text>
                  <rect x="235" y="170" width="140" height="35" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="255" y="192" fill="#e9d5ff" fontSize="10 font-mono font-bold">DeptHead</text>

                  {/* Multiple */}
                  <rect x="420" y="0" width="190" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="435" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">3. Multiple</text>
                  <rect x="430" y="55" width="75" height="35" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="440" y="77" fill="#38bdf8" fontSize="9 font-mono">BaseUser</text>
                  <rect x="520" y="55" width="75" height="35" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="530" y="77" fill="#38bdf8" fontSize="9 font-mono">AuditMixin</text>
                  <text x="505" y="125" fill="#38bdf8" fontSize="18" fontWeight="bold">↘ ↙</text>
                  <rect x="445" y="145" width="140" height="40" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="460" y="170" fill="#a5f3fc" fontSize="11 font-mono font-bold">SuperAdmin</text>

                  {/* Hierarchical */}
                  <rect x="630" y="0" width="220" height="240" rx="8" fill="#451a03" stroke="#d97706" />
                  <text x="645" y="30" fill="#fde68a" fontSize="12" fontWeight="bold">4. Hierarchical</text>
                  <rect x="670" y="55" width="140" height="35" rx="4" fill="#78350f" stroke="#b45309" />
                  <text x="705" y="77" fill="#fef3c7" fontSize="10 font-mono font-bold">BaseCourse</text>
                  <text x="735" y="115" fill="#fde68a" fontSize="18" fontWeight="bold">↙  ↓  ↘</text>
                  <rect x="640" y="135" width="60" height="35" rx="4" fill="#78350f" stroke="#b45309" />
                  <text x="645" y="157" fill="#fde68a" fontSize="8 font-mono">Online</text>
                  <rect x="710" y="135" width="60" height="35" rx="4" fill="#78350f" stroke="#b45309" />
                  <text x="715" y="157" fill="#fde68a" fontSize="8 font-mono">Classroom</text>
                  <rect x="780" y="135" width="60" height="35" rx="4" fill="#78350f" stroke="#b45309" />
                  <text x="785" y="157" fill="#fde68a" fontSize="8 font-mono">Corporate</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "mixins" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">THE MIXIN CAPABILITY COMPOSITION PIPELINE</text>

                {/* Left: 3 Mixins */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="340" height="60" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="25" fill="#99f6e4" fontSize="11 font-bold">JSONExportMixin</text>
                  <text x="20" y="45" fill="#ecfdf5" fontSize="9 font-mono">def to_json(self): ...</text>

                  <rect x="0" y="80" width="340" height="60" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="105" fill="#c4b5fd" fontSize="11 font-bold">AuditLoggerMixin</text>
                  <text x="20" y="125" fill="#ecfdf5" fontSize="9 font-mono">def log_event(self, action): ...</text>

                  <rect x="0" y="160" width="340" height="60" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="185" fill="#a5f3fc" fontSize="11 font-bold">SMSNotifierMixin</text>
                  <text x="20" y="205" fill="#ecfdf5" fontSize="9 font-mono">def dispatch_sms(self, phone, msg): ...</text>
                </g>

                {/* Arrow */}
                <g transform="translate(390, 130)">
                  <text x="10" y="30" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: Composite Entity */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">class CorporateClientContract(...):</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="10 font-mono">contract = CorporateClientContract(...)</text>
                  
                  <rect x="20" y="95" width="350" height="115" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="120" fill="#34d399" fontSize="11 font-bold">Instantly Inherits All 3 Capabilities:</text>
                  <text x="30" y="145" fill="#ecfdf5" fontSize="10 font-mono">✓ contract.to_json()</text>
                  <text x="30" y="168" fill="#ecfdf5" fontSize="10 font-mono">✓ contract.log_event("Renewed")</text>
                  <text x="30" y="191" fill="#ecfdf5" fontSize="10 font-mono">✓ contract.dispatch_sms(phone, msg)</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">super().__init__() CONSTRUCTOR CHAINING PROPAGATION</text>

                {/* 3 Step Sequence */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">1. DepartmentHead.__init__</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="10 font-mono font-bold">super().__init__(*args)</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="10">• Passes name, email, salary</text>
                  <text x="15" y="120" fill="#34d399" fontSize="10 font-mono font-bold">self.annual_budget = budget</text>
                  <text x="15" y="150" fill="#cbd5e1" fontSize="10">• Binds child-specific state</text>

                  {/* Arrow 1 */}
                  <text x="260" y="130" fill="#38bdf8" fontSize="24" fontWeight="bold">←</text>

                  {/* Step 2 */}
                  <rect x="290" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="305" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">2. InstituteStaff.__init__</text>
                  <text x="305" y="60" fill="#ecfdf5" fontSize="10 font-mono font-bold">super().__init__(*args)</text>
                  <text x="305" y="90" fill="#cbd5e1" fontSize="10">• Passes name, email</text>
                  <text x="305" y="120" fill="#34d399" fontSize="10 font-mono font-bold">self.emp_id = emp_id</text>
                  <text x="305" y="150" fill="#cbd5e1" fontSize="10">• Binds parent-specific state</text>

                  {/* Arrow 2 */}
                  <text x="550" y="130" fill="#38bdf8" fontSize="24" fontWeight="bold">←</text>

                  {/* Step 3 */}
                  <rect x="580" y="0" width="240" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="595" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">3. Person.__init__ (Root)</text>
                  <text x="595" y="60" fill="#34d399" fontSize="10 font-mono font-bold">self.full_name = name</text>
                  <text x="595" y="85" fill="#34d399" fontSize="10 font-mono font-bold">self.email = email</text>
                  <text x="595" y="120" fill="#cbd5e1" fontSize="10">• Binds root human identity</text>
                  <text x="595" y="150" fill="#a7f3d0" fontSize="10">✓ Complete state assembled!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE RBAC ROLE INSPECTOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Educational RBAC Role &amp; Lineage Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select an educational system user entity to inspect inherited ancestry, mixin capabilities, and dynamic <code className="text-teal-300 font-mono">isinstance()</code> evaluations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Chooser */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Select Domain Entity to Introspect
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedRole("student")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedRole === "student"
                      ? "bg-teal-950/80 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-teal-300">1. StudentUser</div>
                  <div className="text-[11px] text-slate-400">Hierarchical branch of BaseSystemUser</div>
                </button>

                <button
                  onClick={() => setSelectedRole("faculty")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedRole === "faculty"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-cyan-300">2. FacultyInstructor</div>
                  <div className="text-[11px] text-slate-400">Hierarchical branch of BaseSystemUser</div>
                </button>

                <button
                  onClick={() => setSelectedRole("hod")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedRole === "hod"
                      ? "bg-purple-950/80 border-purple-500 text-purple-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-purple-300">3. DepartmentHead (Multilevel)</div>
                  <div className="text-[11px] text-slate-400">Person → InstituteStaff → DepartmentHead</div>
                </button>

                <button
                  onClick={() => setSelectedRole("superadmin")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedRole === "superadmin"
                      ? "bg-amber-950/80 border-amber-500 text-amber-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-amber-300">4. SuperAdminUser (Multiple + Mixins)</div>
                  <div className="text-[11px] text-slate-400">BaseSystemUser + SecurityAuditMixin + PaymentGatewayMixin</div>
                </button>
              </div>
            </div>

            {/* Live Lineage & Attribute Inspector */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Lineage &amp; Attribute Reflection
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5 text-xs font-mono flex-1">
                <div>
                  <span className="text-slate-400">Topology:</span>{" "}
                  <span className="text-teal-300 font-bold">{currentRole.topology}</span>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">MRO Ancestral Chain:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentRole.ancestors.map((anc, idx) => (
                      <span key={idx} className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-cyan-300">
                        {anc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Inherited Permissions:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentRole.permissions.map((p, idx) => (
                      <span key={idx} className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px] border border-emerald-800">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex gap-2">
                  <span className={clsx("px-2 py-0.5 rounded text-[10px] border", currentRole.isBaseUser ? "bg-teal-950 border-teal-700 text-teal-300" : "bg-slate-950 border-slate-800 text-slate-500")}>
                    isinstance(BaseUser): {currentRole.isBaseUser ? "True" : "False"}
                  </span>
                  <span className={clsx("px-2 py-0.5 rounded text-[10px] border", currentRole.hasAuditMixin ? "bg-amber-950 border-amber-700 text-amber-300" : "bg-slate-950 border-slate-800 text-slate-500")}>
                    SecurityAudit: {currentRole.hasAuditMixin ? "Active" : "None"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER INHERITANCE COMPARISON MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Inheritance Topologies Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Topology</th>
                  <th className="py-3.5 px-4 font-bold">Class Definition Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Key Strength</th>
                  <th className="py-3.5 px-4 font-bold">Gotcha / Danger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Single</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class Child(Parent):</td>
                  <td className="py-3 px-4">Simple, predictable, zero MRO ambiguity</td>
                  <td className="py-3 px-4">Can lead to deep monolithic base classes</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Multilevel</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class C(B): ... class B(A):</td>
                  <td className="py-3 px-4">Layered specialized behavioral accumulation</td>
                  <td className="py-3 px-4">Fragile base class problem if hierarchy exceeds 3 levels</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Multiple (Mixins)</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class Child(Parent, Mixin1, Mixin2):</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">High composability; plug-and-play features</td>
                  <td className="py-3 px-4">Diamond inheritance and method conflict risks</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Hierarchical</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class B(A): ... class C(A):</td>
                  <td className="py-3 px-4">Shared common identity for sibling variants</td>
                  <td className="py-3 px-4">Subclasses must honor parent contract (LSP)</td>
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
            Explore 4 production-grade Python scripts demonstrating single, multilevel, multiple mixin composition, hierarchical courses, and educational RBAC suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "single_and_multilevel_inheritance.py",
                code: singleMultilevel,
                description: "Single and multilevel inheritance mechanics, constructor chaining via super(), and type introspection.",
              },
              {
                filename: "multiple_inheritance_and_mixins.py",
                code: multipleMixins,
                description: "Multiple inheritance and composable Mixin architecture (JSONExportMixin, AuditLoggerMixin, SMSNotifierMixin).",
              },
              {
                filename: "hierarchical_and_hybrid_inheritance.py",
                code: hierarchicalHybrid,
                description: "Hierarchical inheritance branching across course formats (Online, Classroom, Corporate) and composition rules.",
              },
              {
                filename: "enterprise_educational_hierarchy_suite.py",
                code: educationalRBAC,
                description: "Enterprise Educational RBAC User Hierarchy combining hierarchical users and multi-inheritance mixin capabilities.",
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
                <span>❌</span> Trap 1: Deep Monolithic Inheritance Trees
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Building hierarchies 5–8 levels deep creates the "Fragile Base Class" disaster, where modifying root classes breaks dozens of subclasses unpredictably.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Keep hierarchies shallow (2–3 levels) and favor Composition for capabilities.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Stateful `__init__` in Mixins
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Defining complex parameter-heavy <code className="text-amber-300 font-mono">__init__</code> inside mixins creates argument conflicts during multiple inheritance.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Mixins should provide modular behavior methods rather than heavy stateful constructors.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Using `type(obj) is Parent`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Checking <code className="text-purple-300 font-mono">type(student) is BaseUser</code> returns <code className="text-purple-300 font-mono">False</code>, breaking polymorphic handling of subclasses!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use <code className="text-emerald-300">isinstance(student, BaseUser)</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Forgetting `super().__init__()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If a subclass overrides <code className="text-cyan-300 font-mono">__init__</code> without calling <code className="text-cyan-300 font-mono">super().__init__()</code>, all parent attributes fail to initialize.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always invoke <code className="text-emerald-300">super().__init__(*args)</code> at the start of child constructors.
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
            Comprehensive question-and-answer repository covering single, multiple, multilevel, hierarchical inheritance, and mixin patterns:
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
            Download or print the complete reference sheet with inheritance topology maps, mixin blueprints, and RBAC user hierarchies:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic8_inheritance_and_mixins_notes.txt"
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
