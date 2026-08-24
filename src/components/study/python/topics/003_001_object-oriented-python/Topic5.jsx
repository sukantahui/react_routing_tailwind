import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import methodMechanics from "./topic5_files/classmethod_vs_staticmethod_mechanics.py?raw";
import alternativeFactories from "./topic5_files/alternative_constructors_and_factories.py?raw";
import staticHelpers from "./topic5_files/staticmethod_utility_and_namespace_helpers.py?raw";
import payrollSuite from "./topic5_files/enterprise_payroll_and_tax_calculator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Class methods (@classmethod) & Static methods (@staticmethod)
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("triad");

  // Interactive Method Dispatcher Playground State
  const [selectedMethodType, setSelectedMethodType] = useState("instance");
  const [hoursWorked, setHoursWorked] = useState("45");
  const [stdHours, setStdHours] = useState("40");
  const [panNumber, setPanNumber] = useState("ABCDE1234F");

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

  // Static PAN validation logic
  const isPanValid = (pan) => {
    const clean = pan.trim().toUpperCase();
    return clean.length === 10 && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(clean);
  };

  // Instance Pay Calculation logic
  const parsedHours = parseFloat(hoursWorked) || 0;
  const parsedStdHours = parseFloat(stdHours) || 40;
  const rate = 600;
  const regularHours = Math.min(parsedHours, parsedStdHours);
  const overtimeHours = Math.max(0, parsedHours - parsedStdHours);
  const grossPay = (regularHours * rate) + (overtimeHours * rate * 1.5);

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
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Class Methods (<code className="text-teal-400 font-mono">@classmethod</code>) &amp; Static Methods (<code className="text-cyan-400 font-mono">@staticmethod</code>)
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's method triad: Instance Methods (<code className="text-teal-300 font-mono">self</code>), Class Methods (<code className="text-teal-400 font-mono">@classmethod</code>, <code className="text-teal-300 font-mono">cls</code>) for alternative factory constructors, and Static Methods (<code className="text-cyan-400 font-mono">@staticmethod</code>) for domain utilities and algorithmic calculations.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧬 The Three Method Types (self vs cls vs None)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏭 Alternative Factory Constructors (from_dict)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Polymorphic Subclass Instantiation (cls)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧮 Pure Static Utility Namespaces
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE METHOD TRIAD */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔱</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Python Method Archetypes: Instance, Class &amp; Static
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python provides three distinct categories of methods within class bodies, defined by their first parameter binding:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Type 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Instance Method</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">def method(self, ...):</code>
                <p className="text-[11px] text-slate-300">
                  Receives living instance <code className="text-teal-300 font-mono">self</code>. Accesses and modifies instance state and class attributes.
                </p>
              </div>

              {/* Type 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Class Method</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">@classmethod def f(cls, ...):</code>
                <p className="text-[11px] text-slate-300">
                  Receives the class <code className="text-cyan-300 font-mono">cls</code>. Powers alternative constructors (<code className="text-cyan-300 font-mono">from_dict</code>) and class state updates.
                </p>
              </div>

              {/* Type 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Static Method</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">@staticmethod def u(...):</code>
                <p className="text-[11px] text-slate-300">
                  Receives neither <code className="text-slate-400 font-mono">self</code> nor <code className="text-slate-400 font-mono">cls</code>. Scopes pure utility algorithms into the class namespace.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-cyan-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Subclass Factory Advantage: Why cls(...) Matters
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When a subclass inherits a <code className="text-cyan-300 font-mono">@classmethod</code> factory method, calling <code className="text-cyan-300 font-mono">SubClass.from_dict()</code> passes <code className="text-cyan-300 font-mono">SubClass</code> as <code className="text-cyan-300 font-mono">cls</code>, automatically returning an instance of the derived class!
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
                2. Visualizing Method Bindings &amp; Factory Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("triad")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "triad"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The Method Triad
              </button>
              <button
                onClick={() => setActiveInteractiveTab("factories")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "factories"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Polymorphic Factory (cls)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("utilities")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "utilities"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Static Utility Namespace
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining parameter injections, factory instantiation, and pure utility scoping:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "triad" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE THREE METHOD TYPES IN CPYTHON</text>

                {/* 3 Columns */}
                <g transform="translate(30, 50)">
                  {/* Instance Method */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Instance Method</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="10 font-mono">def calc_pay(self, hrs):</text>
                  <text x="15" y="75" fill="#cbd5e1" fontSize="10 font-mono">    return self.rate * hrs</text>
                  <rect x="15" y="110" width="220" height="60" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="135" fill="#34d399" fontSize="10 font-bold">1st Param: self (Instance)</text>
                  <text x="25" y="155" fill="#ecfdf5" fontSize="9">Reads/mutates self.__dict__</text>
                  <text x="15" y="200" fill="#a7f3d0" fontSize="10">Called via: emp.calc_pay(40)</text>

                  {/* Class Method */}
                  <rect x="280" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="295" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">@classmethod</text>
                  <text x="295" y="55" fill="#ecfdf5" fontSize="10 font-mono">@classmethod</text>
                  <text x="295" y="75" fill="#ecfdf5" fontSize="10 font-mono">def from_dict(cls, data):</text>
                  <rect x="295" y="110" width="220" height="60" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="305" y="135" fill="#38bdf8" fontSize="10 font-bold">1st Param: cls (Class Object)</text>
                  <text x="305" y="155" fill="#e0f2fe" fontSize="9">Factory &amp; Class State Updates</text>
                  <text x="295" y="200" fill="#7dd3fc" fontSize="10">Called via: Emp.from_dict(d)</text>

                  {/* Static Method */}
                  <rect x="560" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="575" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">@staticmethod</text>
                  <text x="575" y="55" fill="#ecfdf5" fontSize="10 font-mono">@staticmethod</text>
                  <text x="575" y="75" fill="#ecfdf5" fontSize="10 font-mono">def validate_pan(pan):</text>
                  <rect x="575" y="110" width="220" height="60" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="585" y="135" fill="#c084fc" fontSize="10 font-bold">1st Param: None (Plain Arg)</text>
                  <text x="585" y="155" fill="#f3e8ff" fontSize="9">Pure Utility Function</text>
                  <text x="575" y="200" fill="#c4b5fd" fontSize="10">Called via: Emp.validate_pan(p)</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "factories" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">SUBCLASS POLYMORPHIC FACTORY: cls(...) ADVANTAGE</text>

                {/* Base Class */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">class BaseCourse:</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="10 font-mono">  @classmethod</text>
                  <text x="20" y="80" fill="#ecfdf5" fontSize="10 font-mono">  def from_dict(cls, data):</text>
                  <text x="20" y="100" fill="#34d399" fontSize="10 font-mono font-bold">      return cls(**data)  # &lt;-- Dynamic!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#a7f3d0" fontSize="10 font-bold">When called as BaseCourse.from_dict():</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="9 font-mono">cls is BaseCourse → Returns BaseCourse instance</text>
                </g>

                {/* Subclass */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">class PremiumCourse(BaseCourse):</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="10 font-mono">  # Inherits from_dict without changes!</text>

                  <rect x="20" y="100" width="340" height="115" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="125" fill="#c084fc" fontSize="10 font-bold">When called as PremiumCourse.from_dict():</text>
                  <text x="30" y="150" fill="#38bdf8" fontSize="10 font-mono">cls is PremiumCourse</text>
                  <text x="30" y="175" fill="#34d399" fontSize="10 font-bold">✓ Automatically Returns PremiumCourse instance!</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="9">Zero factory code duplication in subclasses!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">STATIC METHOD AS LOGICAL DOMAIN NAMESPACE</text>

                {/* Class Utility Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="400" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">class FinancialMathUtils:</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="10 font-mono">  @staticmethod</text>
                  <text x="20" y="80" fill="#ecfdf5" fontSize="10 font-mono">  def calculate_emi(P, r, n): ...</text>
                  <text x="20" y="115" fill="#ecfdf5" fontSize="10 font-mono">  @staticmethod</text>
                  <text x="20" y="135" fill="#ecfdf5" fontSize="10 font-mono">  def calculate_gst(gross, rate): ...</text>
                  <text x="20" y="170" fill="#ecfdf5" fontSize="10 font-mono">  @staticmethod</text>
                  <text x="20" y="190" fill="#ecfdf5" fontSize="10 font-mono">  def is_valid_gstin(gstin): ...</text>
                </g>

                {/* Right benefits */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Architectural Advantages:</text>
                  <text x="20" y="70" fill="#cbd5e1" fontSize="10">• High Domain Cohesion: Related math grouped together</text>
                  <text x="20" y="100" fill="#cbd5e1" fontSize="10">• Clean Import API: from finance import FinancialMathUtils</text>
                  <text x="20" y="130" fill="#cbd5e1" fontSize="10">• Pure Functions: Deterministic, trivial to unit test</text>
                  <text x="20" y="160" fill="#cbd5e1" fontSize="10">• Usable without instantiating dummy objects</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE METHOD DISPATCHER PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Method Dispatcher &amp; Execution Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a method archetype to execute simulated Python method bindings live:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Method Chooser */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Select Method Archetype to Dispatch
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedMethodType("instance")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedMethodType === "instance"
                      ? "bg-teal-950/80 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-teal-300">1. Instance Method: emp.calculate_weekly_pay()</div>
                  <div className="text-[11px] text-slate-400">Uses self.hourly_rate (INR 600) + class standard_hours ({stdHours}h)</div>
                </button>

                <button
                  onClick={() => setSelectedMethodType("class")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedMethodType === "class"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-cyan-300">2. Class Method: EmployeePayroll.set_standard_hours()</div>
                  <div className="text-[11px] text-slate-400">Updates cls.standard_work_hours globally for all employees</div>
                </button>

                <button
                  onClick={() => setSelectedMethodType("static")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedMethodType === "static"
                      ? "bg-purple-950/80 border-purple-500 text-purple-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-purple-300">3. Static Method: EmployeePayroll.validate_pan_card()</div>
                  <div className="text-[11px] text-slate-400">Pure regex validator requiring neither self nor cls</div>
                </button>
              </div>

              {/* Dynamic Inputs depending on selected type */}
              <div className="pt-2">
                {selectedMethodType === "instance" && (
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Hours Worked this week</label>
                    <input
                      type="number"
                      value={hoursWorked}
                      onChange={(e) => setHoursWorked(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-teal-300 font-mono"
                    />
                  </div>
                )}

                {selectedMethodType === "class" && (
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Company Standard Hours (cls.standard_work_hours)</label>
                    <input
                      type="number"
                      value={stdHours}
                      onChange={(e) => setStdHours(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-cyan-300 font-mono"
                    />
                  </div>
                )}

                {selectedMethodType === "static" && (
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Indian PAN Card Number</label>
                    <input
                      type="text"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-purple-300 font-mono"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Execution Result */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Execution &amp; Parameter Inspection
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs font-mono flex-1">
                {selectedMethodType === "instance" && (
                  <>
                    <div className="text-teal-300 font-bold">
                      [INSTANCE METHOD EXECUTED]
                    </div>
                    <div className="text-slate-300 space-y-1">
                      <div>First Param 'self': &lt;EmployeePayroll object at 0x7fa20&gt;</div>
                      <div>Regular Hours   : {regularHours}h @ INR 600/h</div>
                      <div>Overtime Hours  : {overtimeHours}h @ 1.5x (INR 900/h)</div>
                      <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                        Gross Disbursed : INR {grossPay.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </>
                )}

                {selectedMethodType === "class" && (
                  <>
                    <div className="text-cyan-300 font-bold">
                      [CLASS METHOD EXECUTED]
                    </div>
                    <div className="text-slate-300 space-y-1">
                      <div>First Param 'cls' : &lt;class 'EmployeePayroll'&gt;</div>
                      <div>Global Update    : cls.standard_work_hours = {stdHours}</div>
                      <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                        ✓ All employee objects immediately compute overtime based on {stdHours}h!
                      </div>
                    </div>
                  </>
                )}

                {selectedMethodType === "static" && (
                  <>
                    <div className="text-purple-300 font-bold">
                      [STATIC METHOD EXECUTED]
                    </div>
                    <div className="text-slate-300 space-y-1">
                      <div>First Param       : None (Direct arguments)</div>
                      <div>Testing PAN Format: "{panNumber}"</div>
                      <div className="pt-2 border-t border-slate-800 font-bold">
                        Validation Result:{" "}
                        <span className={isPanValid(panNumber) ? "text-emerald-400" : "text-rose-400"}>
                          {isPanValid(panNumber) ? "✓ VALID PAN FORMAT" : "❌ INVALID PAN FORMAT (Must be 5 letters, 4 digits, 1 letter)"}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER METHOD ARCHETYPES MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Method Archetypes Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Archetype</th>
                  <th className="py-3.5 px-4 font-bold">Decorator</th>
                  <th className="py-3.5 px-4 font-bold">First Parameter</th>
                  <th className="py-3.5 px-4 font-bold">Can Access Instance?</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Instance Method</td>
                  <td className="py-3 px-4 font-mono text-slate-400">None</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">self (Instance)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">YES</td>
                  <td className="py-3 px-4">Standard object state and business operations</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Class Method</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">@classmethod</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">cls (Class)</td>
                  <td className="py-3 px-4 text-rose-400">NO</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Alternative constructors (from_dict) &amp; class state</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Static Method</td>
                  <td className="py-3 px-4 font-mono text-purple-300">@staticmethod</td>
                  <td className="py-3 px-4 font-mono text-slate-400">None</td>
                  <td className="py-3 px-4 text-rose-400">NO</td>
                  <td className="py-3 px-4">Pure math/validation utility functions in domain</td>
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
            Explore 4 production-grade Python scripts demonstrating method bindings, polymorphic factories, static domain utilities, and enterprise payroll suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "classmethod_vs_staticmethod_mechanics.py",
                code: methodMechanics,
                description: "The 3 Python method archetypes: instance (self), class (@classmethod, cls), and static (@staticmethod).",
              },
              {
                filename: "alternative_constructors_and_factories.py",
                code: alternativeFactories,
                description: "Polymorphic factory constructors using @classmethod and why cls(...) preserves subclass inheritance.",
              },
              {
                filename: "staticmethod_utility_and_namespace_helpers.py",
                code: staticHelpers,
                description: "Domain utility namespaces with @staticmethod for EMI loan math, reverse GST breakdown, and GSTIN regex validation.",
              },
              {
                filename: "enterprise_payroll_and_tax_calculator.py",
                code: payrollSuite,
                description: "Enterprise Payroll & TDS Income Tax Calculator integrating instance methods, @classmethod factories, and @staticmethod tax calculations.",
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
                <span>❌</span> Trap 1: Forgetting `@classmethod` Decorator
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">def from_dict(cls, data):</code> without <code className="text-rose-300 font-mono">@classmethod</code> causes Python to treat it as an instance method expecting an instance in <code className="text-rose-300 font-mono">cls</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always add <code className="text-emerald-300">@classmethod</code> above factory methods.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Hardcoding ClassName in Factory
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">return BaseCourse(**data)</code> inside a classmethod breaks subclasses! Calling <code className="text-amber-300 font-mono">SubClass.from_dict()</code> will incorrectly return a <code className="text-amber-300 font-mono">BaseCourse</code> instance.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always instantiate via <code className="text-emerald-300">return cls(**data)</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Accessing `self` in Static Methods
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Attempting to access instance attributes like <code className="text-purple-300 font-mono">self.name</code> inside a <code className="text-purple-300 font-mono">@staticmethod</code> raises <code className="text-purple-300 font-mono">NameError: name 'self' is not defined</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Static methods must receive all needed data explicitly as parameters.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Chaining `@classmethod` &amp; `@property`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Combining <code className="text-cyan-300 font-mono">@classmethod @property</code> was deprecated in Python 3.11 and removed in 3.13 due to architectural ambiguity.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use standard class methods (<code className="text-emerald-300">get_value()</code>) or metaclass properties.
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
            Comprehensive question-and-answer repository covering class methods, static methods, polymorphic factories, and utility namespaces:
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
            Download or print the complete reference sheet with method triad matrices, alternative constructor recipes, and static utility patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic5_classmethods_and_staticmethods_notes.txt"
              title="Print Topic 5 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
