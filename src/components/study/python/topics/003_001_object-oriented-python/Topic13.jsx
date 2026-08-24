import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import abcFundamentals from "./topic13_files/abc_module_fundamentals_and_enforcement.py?raw";
import abstractProps from "./topic13_files/abstract_properties_and_classmethods.py?raw";
import collectionsCompliance from "./topic13_files/collections_abc_and_interface_compliance.py?raw";
import payrollABC from "./topic13_files/enterprise_payroll_and_tax_abc_system.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic13_files/topic13_note.txt?raw";

// FAQ Questions
import questions from "./topic13_files/topic13_questions";

/**
 * Topic13: Abstract Base Classes (abc module)
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic13() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("blocker");

  // Interactive Payroll Simulator State
  const [selectedStaff, setSelectedStaff] = useState("faculty");
  const [baseInput, setBaseInput] = useState(85000);

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

  const staffArchetypes = {
    faculty: {
      name: "FullTimeFaculty (Prof. Sukanta Hui)",
      tier: "Permanent Full-Time Faculty",
      taxRate: 0.15,
      gross: baseInput + 15000, // Base + HRA
      taxAmount: (baseInput + 15000) * 0.15,
      net: (baseInput + 15000) * 0.85,
      isError: false,
    },
    visiting: {
      name: "VisitingAdjunctLecturer (Dr. Amitava Roy)",
      tier: "Visiting Adjunct Lecturer",
      taxRate: 0.10,
      gross: 32 * 1500, // 32 Hours @ 1500/hr
      taxAmount: 32 * 1500 * 0.10,
      net: 32 * 1500 * 0.90,
      isError: false,
    },
    incomplete: {
      name: "IncompleteStaffStub (Missing calculate_gross)",
      tier: "Uninitialized Stub",
      taxRate: 0.0,
      gross: 0,
      taxAmount: 0,
      net: 0,
      isError: true,
      errorMsg: "TypeError: Can't instantiate abstract class IncompleteStaffStub with abstract method calculate_gross_earnings",
    },
  };

  const currentStaff = staffArchetypes[selectedStaff];

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
            Topic 13 (Module Capstone)
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Abstract Base Classes (<code className="text-teal-400 font-mono">abc</code> module)
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master formal API contract enforcement: <code className="text-teal-300 font-mono">abc.ABC</code>, <code className="text-cyan-300 font-mono">@abstractmethod</code>, abstract properties (<code className="text-purple-300 font-mono">@property @abstractmethod</code>), virtual subclasses via <code className="text-amber-300 font-mono">ABC.register()</code>, the Template Method pattern, and standard library <code className="text-emerald-300 font-mono">collections.abc</code> compliance.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Instantiation Contract Enforcement
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💎 Abstract Properties &amp; Classmethods
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📑 Virtual Subclasses via register()
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ Template Method Design Pattern
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ABC ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Contract Enforcement Engine: `abc.ABC`
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              While Python is famous for Duck Typing, enterprise frameworks and plugin architectures often require <strong>strict compile/initialization-time contract enforcement</strong>. The <code className="text-teal-300 font-mono">abc</code> module provides this guarantee:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Type 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Instantiation Blocker</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">class Base(ABC): ...</code>
                <p className="text-[11px] text-slate-300">
                  Direct instantiation is forbidden at runtime. Incomplete subclasses raise <code className="text-rose-400 font-mono">TypeError</code>.
                </p>
              </div>

              {/* Type 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Abstract Properties</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">@property @abstractmethod</code>
                <p className="text-[11px] text-slate-300">
                  Forces all derived concrete classes to implement validated getter/setter attributes.
                </p>
              </div>

              {/* Type 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Template Method</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">def workflow(self): ...</code>
                <p className="text-[11px] text-slate-300">
                  Concrete methods in the ABC orchestrate the workflow, calling abstract steps implemented by children.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                When to use ABCs vs Duck Typing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Use <strong>Duck Typing</strong> for flexible scripting, testing mocks, and lightweight components. Use <strong>Abstract Base Classes (ABCs)</strong> when architecting formal plugin systems, large multi-team enterprise libraries, or when missing methods must <em>fail fast</em> at instantiation rather than silently crashing later in production!
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
                2. Visualizing Abstract Base Classes &amp; Template Workflows
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("blocker")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "blocker"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Instantiation Blocker Engine
              </button>
              <button
                onClick={() => setActiveInteractiveTab("template")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "template"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Template Method Pattern
              </button>
              <button
                onClick={() => setActiveInteractiveTab("virtual")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "virtual"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Virtual Subclasses (register)
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining CPython instantiation checks, abstract template workflows, and virtual subtype registrations:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "blocker" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">CPYTHON INSTANTIATION BLOCKER MECHANISM</text>

                {/* Left: Attempting Bad Init */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Incomplete Subclass Declaration</text>
                  <text x="20" y="60" fill="#fca5a5" fontSize="10 font-mono">class IncompleteSQLite(BaseConnector):</text>
                  <text x="40" y="80" fill="#fca5a5" fontSize="10 font-mono">def connect(self): pass</text>
                  <text x="40" y="105" fill="#fca5a5" fontSize="9 font-mono text-rose-300 font-bold"># FORGOT: execute_query()</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="155" fill="#ffe4e6" fontSize="10 font-bold">Execution: `conn = IncompleteSQLite()`</text>
                  <text x="30" y="180" fill="#fda4af" fontSize="8 font-mono">TypeError: Can't instantiate abstract class with</text>
                  <text x="30" y="195" fill="#fda4af" fontSize="8 font-mono">abstract methods execute_query</text>
                </g>

                {/* Right: Successful Init */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Complete Concrete Implementation</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="10 font-mono">class PostgreSQLConnector(BaseConnector):</text>
                  <text x="40" y="80" fill="#34d399" fontSize="10 font-mono">def connect(self): ...</text>
                  <text x="40" y="100" fill="#34d399" fontSize="10 font-mono">def execute_query(self, sql): ...</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#a7f3d0" fontSize="10 font-bold">Execution: `conn = PostgreSQLConnector()`</text>
                  <text x="30" y="180" fill="#34d399" fontSize="10 font-bold">✓ Instantiation Permitted (200 OK)</text>
                  <text x="30" y="198" fill="#ecfdf5" fontSize="8 font-mono">All abstract methods fulfilled!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "template" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">THE TEMPLATE METHOD DESIGN PATTERN IN ABCs</text>

                {/* ABC Template */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">BaseEmployeePayroll(ABC) - Template</text>
                  
                  <rect x="20" y="55" width="340" height="75" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="75" fill="#34d399" fontSize="10 font-bold">Concrete Template Method:</text>
                  <text x="30" y="95" fill="#ecfdf5" fontSize="9 font-mono">def generate_payslip(self):</text>
                  <text x="45" y="112" fill="#ecfdf5" fontSize="9 font-mono">gross = self.calculate_gross()  # Abstract Call</text>

                  <text x="20" y="155" fill="#99f6e4" fontSize="10 font-bold">Abstract Contracts Enforced:</text>
                  <text x="20" y="175" fill="#cbd5e1" fontSize="9 font-mono">• @property @abstractmethod: income_tax_rate</text>
                  <text x="20" y="195" fill="#cbd5e1" fontSize="9 font-mono">• @abstractmethod: calculate_gross_earnings()</text>
                </g>

                {/* Arrow */}
                <g transform="translate(420, 140)">
                  <text x="10" y="20" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Subclass */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">FullTimeFaculty - Concrete Details</text>
                  
                  <rect x="20" y="60" width="340" height="150" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="85" fill="#c4b5fd" fontSize="10 font-bold">Fulfills Abstract Steps:</text>
                  <text x="30" y="110" fill="#34d399" fontSize="9 font-mono">income_tax_rate = 0.15 (15% TDS)</text>
                  <text x="30" y="135" fill="#34d399" fontSize="9 font-mono">calculate_gross() = base_salary + hra</text>
                  <text x="30" y="175" fill="#a7f3d0" fontSize="9 font-bold">✓ Reuses overall payslip generation logic!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">VIRTUAL SUBCLASSES: ABC.register(ExternalVendorClass)</text>

                {/* Left: ABC & External */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="360" height="110" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="25" fill="#99f6e4" fontSize="11 font-bold">BaseCloudStorageProvider(ABC)</text>
                  <text x="20" y="50" fill="#ecfdf5" fontSize="9 font-mono">@abstractmethod def upload_file(self, f, d): ...</text>

                  <rect x="0" y="130" width="360" height="110" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="155" fill="#c4b5fd" fontSize="11 font-bold">ExternalThirdPartyDropBox (Unmodified Code)</text>
                  <text x="20" y="180" fill="#ecfdf5" fontSize="9 font-mono">def upload_file(self, f, d): ...</text>
                </g>

                {/* Registration Bridge */}
                <g transform="translate(420, 100)">
                  <rect x="0" y="0" width="430" height="140" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12 font-bold">Registration Statement:</text>
                  <text x="20" y="55" fill="#34d399" fontSize="10 font-mono font-bold">BaseCloudStorageProvider.register(DropBox)</text>

                  <rect x="20" y="75" width="390" height="50" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="95" fill="#ecfdf5" fontSize="9 font-mono">issubclass(DropBox, BaseProvider) → True!</text>
                  <text x="30" y="112" fill="#ecfdf5" fontSize="9 font-mono">isinstance(dropbox_inst, BaseProvider) → True!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PAYROLL & ABC VALIDATOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Enterprise Payroll &amp; ABC Validator Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select an employee entity to execute the abstract payroll template algorithm or test CPython's live instantiation blocker:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Staff Chooser */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Select Institutional Employee Concrete Class
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedStaff("faculty")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedStaff === "faculty"
                      ? "bg-teal-950/80 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-teal-300">1. FullTimeFaculty (Sukanta Hui)</div>
                  <div className="text-[11px] text-slate-400">Base Salary + HRA | 15% TDS Bracket</div>
                </button>

                <button
                  onClick={() => setSelectedStaff("visiting")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedStaff === "visiting"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-cyan-300">2. VisitingAdjunctLecturer (Dr. Amitava Roy)</div>
                  <div className="text-[11px] text-slate-400">32 Hours @ INR 1,500/hr | 10% Professional Tax</div>
                </button>

                <button
                  onClick={() => setSelectedStaff("incomplete")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedStaff === "incomplete"
                      ? "bg-rose-950/80 border-rose-500 text-rose-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-rose-300">3. IncompleteStaffStub (Missing Contract Method)</div>
                  <div className="text-[11px] text-slate-400">Demonstrates CPython TypeError instantiation block</div>
                </button>
              </div>

              {selectedStaff === "faculty" && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">Base Faculty Salary:</span>
                    <span className="text-teal-300 font-bold">INR {baseInput.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="150000"
                    step="5000"
                    value={baseInput}
                    onChange={(e) => setBaseInput(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
              )}
            </div>

            {/* Live Template Payslip Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Template Method Output: `generate_monthly_payslip()`
              </span>

              <div className={clsx(
                "p-4 rounded-xl border flex-1 space-y-2.5 text-xs font-mono",
                currentStaff.isError ? "bg-rose-950/40 border-rose-800" : "bg-slate-900 border-slate-800"
              )}>
                {!currentStaff.isError ? (
                  <>
                    <div className="text-slate-400">
                      Staff Member: <span className="text-teal-300 font-bold">{currentStaff.name}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Employment Tier:</span>{" "}
                      <span className="text-cyan-300 font-bold">{currentStaff.tier}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gross Earnings:</span>
                        <span className="text-emerald-300 font-bold">INR {currentStaff.gross.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">TDS Tax ({(currentStaff.taxRate * 100).toFixed(0)}%):</span>
                        <span className="text-rose-300">-INR {currentStaff.taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm">
                      <span className="text-slate-300">NET DISBURSED:</span>
                      <span className="text-teal-300">INR {currentStaff.net.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 text-rose-300">
                    <div className="font-bold text-rose-400 text-sm">❌ CPython TypeError: Blocked Instantiation</div>
                    <p className="text-[11px] leading-relaxed">
                      {currentStaff.errorMsg}
                    </p>
                    <div className="p-2.5 bg-slate-950 rounded border border-rose-900 text-[11px] text-emerald-400 font-bold">
                      ✓ Fix: Implement all `@abstractmethod` definitions before instantiating!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ABC REFERENCE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Abstract Base Class Decorators &amp; Protocols Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Decorator / Tool</th>
                  <th className="py-3.5 px-4 font-bold">Signature Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Enforcement Timing</th>
                  <th className="py-3.5 px-4 font-bold">Primary Architectural Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">@abstractmethod</td>
                  <td className="py-3 px-4 font-mono text-slate-200">@abstractmethod def func(self):</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Instantiation Time</td>
                  <td className="py-3 px-4">Enforces mandatory method implementation in child subclasses</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">@property @abstractmethod</td>
                  <td className="py-3 px-4 font-mono text-slate-200">@property @abstractmethod def attr(self):</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Instantiation Time</td>
                  <td className="py-3 px-4">Forces children to implement validated getter properties</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">ABC.register()</td>
                  <td className="py-3 px-4 font-mono text-slate-200">MyABC.register(VendorClass)</td>
                  <td className="py-3 px-4">issubclass() Check</td>
                  <td className="py-3 px-4">Registers third-party classes as virtual subclasses</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">collections.abc.Sequence</td>
                  <td className="py-3 px-4 font-mono text-slate-200">class CustomList(Sequence):</td>
                  <td className="py-3 px-4">Inheritance / Protocol</td>
                  <td className="py-3 px-4">Provides free __iter__, __contains__, count(), and index()</td>
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
            Explore 4 production-grade Python scripts demonstrating ABC contract enforcement, abstract properties, collections.abc compliance, and enterprise payroll systems:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "abc_module_fundamentals_and_enforcement.py",
                code: abcFundamentals,
                description: "ABC fundamentals, @abstractmethod enforcement, and CPython instantiation blocker mechanics.",
              },
              {
                filename: "abstract_properties_and_classmethods.py",
                code: abstractProps,
                description: "Abstract properties (@property @abstractmethod), classmethods, and virtual subclasses via ABC.register().",
              },
              {
                filename: "collections_abc_and_interface_compliance.py",
                code: collectionsCompliance,
                description: "Python standard library collections.abc.Sequence compliance and free inherited mixin methods.",
              },
              {
                filename: "enterprise_payroll_and_tax_abc_system.py",
                code: payrollABC,
                description: "Enterprise Institutional Payroll & Tax System with abstract properties and template workflows.",
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
                <span>❌</span> Trap 1: Forgetting to Inherit from `ABC`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-rose-300 font-mono">@abstractmethod</code> on a regular class without inheriting from <code className="text-rose-300 font-mono">ABC</code> does NOT prevent instantiation!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always inherit from <code className="text-emerald-300">abc.ABC</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Premature Over-Abstraction
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Creating ABCs for simple 2-class scripts introduces unnecessary cognitive overhead. Pythonic Duck Typing is often cleaner.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use ABCs only when creating formal contracts or plugin frameworks.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Expecting `register()` to Validate Methods
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-purple-300 font-mono">ABC.register()</code> updates subclass caches without checking if the registered class actually implements the abstract methods.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Ensure registered classes fulfill interfaces via unit tests.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Wrong Decorator Order for Abstract Properties
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Placing <code className="text-cyan-300 font-mono">@abstractmethod</code> ABOVE <code className="text-cyan-300 font-mono">@property</code> breaks Python descriptor resolution.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always place <code className="text-emerald-300">@property</code> at the very top, followed by <code className="text-emerald-300">@abstractmethod</code>.
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
            Comprehensive question-and-answer repository covering Abstract Base Classes, @abstractmethod, abstract properties, and collections.abc:
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
            Download or print the complete reference sheet with ABC syntax tables, abstract property templates, and virtual subclass recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic13_abstract_base_classes_abc_notes.txt"
              title="Print Topic 13 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
