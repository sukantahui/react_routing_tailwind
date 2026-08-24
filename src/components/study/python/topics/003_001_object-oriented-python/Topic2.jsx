import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import constructorMechanics from "./topic2_files/init_constructor_mechanics.py?raw";
import flexibleConstructors from "./topic2_files/flexible_args_and_kwargs_constructors.py?raw";
import mutableDefaultTrap from "./topic2_files/mutable_default_arguments_trap_in_init.py?raw";
import studentLedger from "./topic2_files/student_admissions_and_fee_ledger.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Constructors & the __init__() method
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("constructflow");

  // Interactive Constructor Playground State
  const [name, setName] = useState("Priyanka Sen");
  const [fee, setFee] = useState("18000");
  const [discount, setDiscount] = useState("10");
  const [coupon, setCoupon] = useState("SUPER2026");

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

  // Constructor Validation Logic Simulation
  const parsedFee = parseFloat(fee);
  const parsedDiscount = parseFloat(discount);
  const isNameValid = name.trim().length > 0;
  const isFeeValid = !isNaN(parsedFee) && parsedFee > 0;
  const isDiscountValid = !isNaN(parsedDiscount) && parsedDiscount >= 0 && parsedDiscount <= 50;
  const isValid = isNameValid && isFeeValid && isDiscountValid;

  const couponDiscount = coupon === "SUPER2026" ? 2000 : 0;
  const netFee = isValid ? Math.max(0, parsedFee * (1 - parsedDiscount / 100) - couponDiscount) : 0;

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
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Constructors &amp; the <code className="text-teal-400 font-mono">__init__()</code> Method
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master object initialization: state assignment with <code className="text-teal-300 font-mono">self</code>, constructor parameter validation, the return <code className="text-cyan-300 font-mono">None</code> rule, the classic mutable default argument disaster (<code className="text-rose-400 font-mono">skills=[]</code>), and alternative constructors via <code className="text-purple-300 font-mono">@classmethod</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ __init__(self, ...) Mechanics
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Invariant Parameter Validation
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚠️ Mutable Default Argument Trap
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏭 Alternative Factory Constructors
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE ROLE OF __init__() */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Initializer Method: Initializing State &amp; Invariants
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When a class is called (e.g. <code className="text-teal-300 font-mono">s = Student("Priyanka")</code>), Python first allocates the raw object via <code className="text-cyan-300 font-mono">__new__</code>, and then immediately invokes <code className="text-teal-400 font-mono">__init__(self, ...)</code> to configure the instance's state:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ The 'self' Parameter</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">self.name = name</code>
                <p className="text-[11px] text-slate-300">
                  Explicit reference to the active newly created instance in memory.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Invariant Validation</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">if fee &lt;= 0: raise ValueError</code>
                <p className="text-[11px] text-slate-300">
                  Guarantees that corrupted or invalid objects can never be born in memory.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Return None Rule</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">return None (Strict)</code>
                <p className="text-[11px] text-slate-300">
                  Returning any non-None value raises a fatal <code className="text-purple-300">TypeError</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Mutable Default Argument Disaster
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-400 font-mono">def __init__(self, skills=[])</code> is a dangerous bug. Python evaluates default lists only once at function definition time, causing <strong>ALL</strong> instances to share the exact same list in RAM! Always default to <code className="text-emerald-400 font-mono">None</code>.
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
                2. Visualizing Constructor Execution &amp; Memory Traps
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("constructflow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "constructflow"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Constructor Execution Flow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("sharedtrap")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "sharedtrap"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Mutable Default Bug (Shared RAM)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("factories")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "factories"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Alternative Constructors (@classmethod)
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining parameter validation pipelines, heap sharing bugs, and factory instantiation:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "constructflow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">CONSTRUCTOR EXECUTION PIPELINE</text>

                {/* 4 Steps */}
                <g transform="translate(30, 60)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="180" height="200" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Call Class</text>
                  <text x="15" y="60" fill="#f8fafc" fontSize="10 font-mono">Student("Priyanka")</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="10">• Passes arguments</text>
                  <text x="15" y="110" fill="#cbd5e1" fontSize="10">• Triggers __new__</text>

                  {/* Step 2 */}
                  <rect x="210" y="0" width="180" height="200" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="225" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">2. Validation Guard</text>
                  <text x="225" y="60" fill="#f8fafc" fontSize="10 font-mono">if fee &lt;= 0:</text>
                  <text x="225" y="85" fill="#fca5a5" fontSize="10">  raise ValueError</text>
                  <text x="225" y="110" fill="#cbd5e1" fontSize="10">• Guards invariants</text>
                  <text x="225" y="130" fill="#cbd5e1" fontSize="10">• Aborts on error</text>

                  {/* Step 3 */}
                  <rect x="420" y="0" width="180" height="200" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="435" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">3. State Binding</text>
                  <text x="435" y="60" fill="#f8fafc" fontSize="10 font-mono">self.name = name</text>
                  <text x="435" y="85" fill="#f8fafc" fontSize="10 font-mono">self.fee = fee</text>
                  <text x="435" y="110" fill="#cbd5e1" fontSize="10">• Injects into __dict__</text>
                  <text x="435" y="130" fill="#cbd5e1" fontSize="10">• Computes net_fee</text>

                  {/* Step 4 */}
                  <rect x="630" y="0" width="180" height="200" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="645" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">4. Return Instance</text>
                  <text x="645" y="60" fill="#ecfdf5" fontSize="10 font-mono">return None</text>
                  <text x="645" y="85" fill="#34d399" fontSize="10 font-bold">✓ Valid Object Ready!</text>
                  <text x="645" y="110" fill="#cbd5e1" fontSize="10">• Bound to variable 's'</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "sharedtrap" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">THE MUTABLE DEFAULT LIST DISASTER IN RAM</text>

                {/* Bug Code */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="110" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ The Bug: def __init__(self, skills=[])</text>
                  <text x="20" y="55" fill="#fca5a5" fontSize="10 font-mono">s1 = Student("Abhishek")</text>
                  <text x="20" y="75" fill="#fca5a5" fontSize="10 font-mono">s1.skills.append("Python")</text>
                  <text x="20" y="95" fill="#fca5a5" fontSize="10 font-mono">s2 = Student("Debolina")</text>
                </g>

                {/* Shared Box in RAM */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#881337" stroke="#e11d48" />
                  <text x="20" y="30" fill="#ffe4e6" fontSize="12" fontWeight="bold">Shared RAM Heap Object (0x9fc810)</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="11 font-mono">['Python', 'FastAPI']</text>
                  
                  <rect x="20" y="90" width="340" height="60" rx="4" fill="#4c0519" stroke="#f43f5e" />
                  <text x="30" y="115" fill="#fda4af" fontSize="10 font-bold">s1.skills points to 0x9fc810</text>
                  <text x="30" y="135" fill="#fda4af" fontSize="10 font-bold">s2.skills points to 0x9fc810 (SAME OBJECT!)</text>

                  <text x="20" y="180" fill="#ffe4e6" fontSize="10">Debolina's profile now silently contains</text>
                  <text x="20" y="200" fill="#ffe4e6" fontSize="10">Abhishek's skills due to shared default pointer!</text>
                </g>

                {/* Fix Box */}
                <g transform="translate(30, 180)">
                  <rect x="0" y="0" width="380" height="110" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ The Fix: Default to None</text>
                  <text x="20" y="55" fill="#ecfdf5" fontSize="10 font-mono">def __init__(self, skills=None):</text>
                  <text x="20" y="75" fill="#34d399" fontSize="10 font-mono font-bold">    self.skills = list(skills) if skills else []</text>
                  <text x="20" y="95" fill="#a7f3d0" fontSize="10">Creates a fresh isolated list for every instance!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ALTERNATIVE CONSTRUCTORS VIA @classmethod</text>

                {/* Class */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="400" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">class StudentProfile:</text>
                  <text x="20" y="55" fill="#ecfdf5" fontSize="10 font-mono">  def __init__(self, id, name, email): ...</text>

                  <text x="20" y="90" fill="#38bdf8" fontSize="11 font-mono font-bold">  @classmethod</text>
                  <text x="20" y="110" fill="#38bdf8" fontSize="10 font-mono">  def from_dict(cls, data):</text>
                  <text x="20" y="130" fill="#38bdf8" fontSize="10 font-mono">      return cls(data['id'], data['name'], ...)</text>

                  <text x="20" y="165" fill="#c084fc" fontSize="11 font-mono font-bold">  @classmethod</text>
                  <text x="20" y="185" fill="#c084fc" fontSize="10 font-mono">  def from_csv(cls, line):</text>
                  <text x="20" y="205" fill="#c084fc" fontSize="10 font-mono">      return cls(*line.split(','))</text>
                </g>

                {/* Usage on Right */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Clean Client Usage:</text>
                  
                  <text x="20" y="70" fill="#ecfdf5" fontSize="10 font-mono"># 1. From JSON REST API:</text>
                  <text x="20" y="90" fill="#34d399" fontSize="10 font-mono">s1 = StudentProfile.from_dict(api_json)</text>

                  <text x="20" y="130" fill="#ecfdf5" fontSize="10 font-mono"># 2. From CSV File Stream:</text>
                  <text x="20" y="150" fill="#34d399" fontSize="10 font-mono">s2 = StudentProfile.from_csv(csv_line)</text>

                  <rect x="20" y="180" width="350" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="205" fill="#cbd5e1" fontSize="10 font-bold">Simulates Multiple Constructors Cleanly</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CONSTRUCTOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Constructor &amp; Invariant Validator Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Enter parameters below to simulate Python constructor invariant validation in real time:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Input Form */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                __init__(self, name, fee, discount, coupon)
              </span>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-teal-300 font-mono"
                />
                {!isNameValid && <span className="text-[11px] text-rose-400 font-mono">ValueError: Name cannot be blank!</span>}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Course Gross Fee (INR)</label>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-teal-300 font-mono"
                />
                {!isFeeValid && <span className="text-[11px] text-rose-400 font-mono">ValueError: Fee must be positive!</span>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Discount % (0-50%)</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-teal-300 font-mono"
                  />
                  {!isDiscountValid && <span className="text-[11px] text-rose-400 font-mono">Must be 0-50%</span>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Coupon</label>
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="SUPER2026"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-teal-300 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Generated Object State */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Constructed Instance State (__dict__)
              </span>

              <div className={clsx(
                "p-4 rounded-xl border flex-1 space-y-2",
                isValid ? "bg-slate-900 border-slate-800" : "bg-rose-950/40 border-rose-800"
              )}>
                {isValid ? (
                  <>
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                      <span>✓</span> Object Initialized Successfully
                    </div>
                    <div className="text-xs font-mono text-slate-300 space-y-1">
                      <div>self.student_name = "{name}"</div>
                      <div>self.course_fee   = INR {parsedFee.toLocaleString()}</div>
                      <div>self.discount     = {parsedDiscount}%</div>
                      <div>self.coupon       = "{coupon}"</div>
                      <div className="text-teal-300 font-bold pt-2 border-t border-slate-800">
                        self.net_fee       = INR {netFee.toLocaleString()}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-rose-400 text-xs font-mono space-y-1">
                    <div className="font-bold">❌ CONSTRUCTOR EXECUTION ABORTED</div>
                    <p>An exception was raised inside __init__; no object was created in memory!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER CONSTRUCTOR PATTERNS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Constructor Patterns Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Signature / Code</th>
                  <th className="py-3.5 px-4 font-bold">Key Benefit</th>
                  <th className="py-3.5 px-4 font-bold">Gotcha / Danger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Standard __init__</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def __init__(self, name, fee):</td>
                  <td className="py-3 px-4">Direct, readable attribute binding</td>
                  <td className="py-3 px-4">Ensure all attributes are initialized</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Optional None Default</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def __init__(self, items=None):</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Prevents shared RAM heap bug</td>
                  <td className="py-3 px-4">Never write <code className="text-rose-400">items=[]</code></td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">@classmethod Factory</td>
                  <td className="py-3 px-4 font-mono text-slate-200">@classmethod def from_dict(cls):</td>
                  <td className="py-3 px-4">Parses JSON / CSV / dict cleanly</td>
                  <td className="py-3 px-4">Must return <code className="text-purple-300">cls(...)</code></td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Keyword-Only Guard</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def __init__(self, name, *, fee):</td>
                  <td className="py-3 px-4">Forces explicit named parameters</td>
                  <td className="py-3 px-4">Positional calling will raise error</td>
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
            Explore 4 production-grade Python scripts demonstrating constructor validation, flexible keyword parameters, mutable default fixes, and full admission ledgers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "init_constructor_mechanics.py",
                code: constructorMechanics,
                description: "Constructor parameter declarations, input validation guards, and the return None constraint.",
              },
              {
                filename: "flexible_args_and_kwargs_constructors.py",
                code: flexibleConstructors,
                description: "Variadic **kwargs constructors and alternative @classmethod factory methods (from_dict, from_csv).",
              },
              {
                filename: "mutable_default_arguments_trap_in_init.py",
                code: mutableDefaultTrap,
                description: "The classic mutable default argument disaster in RAM and its canonical None replacement fix.",
              },
              {
                filename: "student_admissions_and_fee_ledger.py",
                code: studentLedger,
                description: "Enterprise Student Admissions & Fee Ledger Suite with validated invariants and installment scheduling.",
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
                <span>❌</span> Trap 1: Returning a Value from `__init__`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">return self</code> or <code className="text-rose-300 font-mono">return 42</code> raises <code className="text-rose-300 font-mono">TypeError: __init__() should return None</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> <code className="text-emerald-300">__init__</code> must return None (or omit return entirely).
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Using `items=[]` in Parameter List
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                All instances instantiated without specifying <code className="text-amber-300 font-mono">items</code> will silently share the exact same list in RAM!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">items=None</code> and initialize freshly inside <code className="text-emerald-300">__init__</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Heavy I/O in Constructor
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connecting to slow databases or fetching network APIs inside <code className="text-purple-300 font-mono">__init__</code> freezes instantiation and breaks unit testing.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Keep constructors lightweight; use explicit <code className="text-emerald-300">connect()</code> methods.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Forgetting `super().__init__()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Subclasses that override <code className="text-cyan-300 font-mono">__init__</code> without calling <code className="text-cyan-300 font-mono">super().__init__()</code> fail to initialize parent state.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always call <code className="text-emerald-300">super().__init__(*args)</code> at the start of subclass constructors.
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
            Comprehensive question-and-answer repository covering constructor mechanics, validation, mutable default fixes, and alternative factory methods:
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
            Download or print the complete reference sheet with constructor templates, mutable default fix recipes, and factory patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic2_constructors_and_init_notes.txt"
              title="Print Topic 2 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
