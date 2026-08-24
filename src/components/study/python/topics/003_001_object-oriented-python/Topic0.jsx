import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import proceduralVsOop from "./topic0_files/procedural_vs_oop_comparison.py?raw";
import fourPillars from "./topic0_files/the_four_pillars_of_oop.py?raw";
import stateBundling from "./topic0_files/state_and_behavior_bundling.py?raw";
import hospitalCaseStudy from "./topic0_files/hospital_management_oop_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: OOP Paradigm: Procedural vs Object-Oriented thinking
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("paradigm");

  // Interactive Paradigm Simulator State
  const [paradigm, setParadigm] = useState("oop"); // procedural vs oop
  const [balance, setBalance] = useState(5000);
  const [logs, setLogs] = useState(["Initial account balance: INR 5,000.00"]);
  const [isCorrupted, setIsCorrupted] = useState(false);

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

  const handleDeposit = () => {
    const newBal = balance + 2000;
    setBalance(newBal);
    setLogs((prev) => [
      `[DEPOSIT] +INR 2,000.00 | New Balance: INR ${newBal.toLocaleString()}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleWithdraw = () => {
    if (balance < 1500) {
      setLogs((prev) => [
        `[BLOCKED] Insufficient funds for withdrawal of INR 1,500.00`,
        ...prev.slice(0, 4),
      ]);
      return;
    }
    const newBal = balance - 1500;
    setBalance(newBal);
    setLogs((prev) => [
      `[WITHDRAW] -INR 1,500.00 | Remaining Balance: INR ${newBal.toLocaleString()}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleExternalMutation = () => {
    if (paradigm === "procedural") {
      // In POP, external code can silently corrupt dictionary state
      setBalance(-50000);
      setIsCorrupted(true);
      setLogs((prev) => [
        `[CRITICAL CORRUPTION] External code executed: account['balance'] = -50000 (No validation!)`,
        ...prev.slice(0, 4),
      ]);
    } else {
      // In OOP, encapsulation guards prevent illegal direct state corruption
      setLogs((prev) => [
        `[SECURITY GUARD] AttributeError: Cannot mutate private balance directly. Invariants preserved!`,
        ...prev.slice(0, 4),
      ]);
    }
  };

  const handleReset = () => {
    setBalance(5000);
    setIsCorrupted(false);
    setLogs(["Account reset to initial balance: INR 5,000.00"]);
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
            Segment 3 • Module 003_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 0 • OOP Foundation
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          OOP Paradigm: <span className="text-teal-400">Procedural</span> vs <span className="text-cyan-400">Object-Oriented</span> Thinking
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Unlock the mental model of Object-Oriented design: understand the critical transition from sequential procedural scripts to autonomous, self-validating entities, the Four Pillars of OOP (Encapsulation, Abstraction, Inheritance, Polymorphism), and state-invariant protection.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧠 Mental Model Shift (Verbs vs Nouns)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ The 4 Pillars of OOP
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Encapsulation &amp; State Protection
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧩 Domain Entity Modeling
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PROCEDURAL VS OBJECT-ORIENTED PARADIGM */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Fundamental Paradigm Shift
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In traditional <strong>Procedural Programming (POP)</strong>, software is organized as a linear sequence of functions acting on detached, naked data structures (like global variables or dictionaries). In <strong>Object-Oriented Programming (OOP)</strong>, data (state) and functions (behavior) are bundled together into cohesive, autonomous units called <strong>Objects</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
              {/* Procedural Card */}
              <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-2">
                  <span>📜</span> Procedural (POP): "Verbs on Naked Data"
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div>• <strong>Focus:</strong> Step-by-step algorithms (<code className="text-rose-300">deposit(acc, 500)</code>).</div>
                  <div>• <strong>Data:</strong> Naked dictionaries with zero built-in validation.</div>
                  <div>• <strong>Flaw:</strong> Any rogue function can corrupt data (<code className="text-rose-400">acc['bal'] = -99999</code>).</div>
                </div>
              </div>

              {/* OOP Card */}
              <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-2">
                  <span>🏛️</span> Object-Oriented (OOP): "Living Entities"
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div>• <strong>Focus:</strong> Self-governing domain objects (<code className="text-teal-300">acc.deposit(500)</code>).</div>
                  <div>• <strong>Data:</strong> Encapsulated behind validated methods and properties.</div>
                  <div>• <strong>Benefit:</strong> Invariants are protected; external corruption is impossible!</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The OOP Mental Model
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Instead of asking <em>"What sequence of steps must my code execute on raw variables?"</em>, ask: <strong>"What autonomous entities exist in my domain, what state do they own, and how do they collaborate?"</strong>
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
                2. Visualizing OOP Architecture &amp; The Four Pillars
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("paradigm")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "paradigm"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                POP vs OOP Architecture
              </button>
              <button
                onClick={() => setActiveInteractiveTab("fourpillars")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "fourpillars"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The Four Pillars
              </button>
              <button
                onClick={() => setActiveInteractiveTab("lifecycle")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lifecycle"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Class Blueprint vs Instances
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining state cohesion, object instantiation pipelines, and polymorphic dispatch:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "paradigm" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">DECOUPLED PROCEDURAL STATE VS ENCAPSULATED OOP ENTITY</text>

                {/* Left: Procedural */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">Procedural Paradigm (Scattered State)</text>
                  
                  <rect x="20" y="55" width="160" height="70" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="80" fill="#ffe4e6" fontSize="11 font-mono">account_dict</text>
                  <text x="30" y="105" fill="#fca5a5" fontSize="10 font-mono">balance: 5000</text>

                  <rect x="210" y="55" width="160" height="70" rx="4" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="220" y="80" fill="#c4b5fd" fontSize="11 font-mono">deposit(acc, amt)</text>
                  <text x="220" y="105" fill="#cbd5e1" fontSize="10 font-mono">withdraw(acc, amt)</text>

                  <text x="20" y="160" fill="#fca5a5" fontSize="11">❌ Data is detached from functions</text>
                  <text x="20" y="185" fill="#fca5a5" fontSize="11">❌ Anyone can mutate account_dict directly!</text>
                  <text x="20" y="210" fill="#fda4af" fontSize="11 font-bold">Risk: Silent Data Corruption</text>
                </g>

                {/* Right: OOP */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Object-Oriented Paradigm (Encapsulated)</text>
                  
                  <rect x="20" y="55" width="350" height="90" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="80" fill="#34d399" fontSize="12 font-mono font-bold">class BankAccount</text>
                  <text x="35" y="105" fill="#a7f3d0" fontSize="10 font-mono">State: _balance (Private &amp; Protected)</text>
                  <text x="35" y="125" fill="#a7f3d0" fontSize="10 font-mono">Methods: deposit(), withdraw() (Validated)</text>

                  <text x="20" y="175" fill="#ecfdf5" fontSize="11">✓ State and behavior are unified into one unit</text>
                  <text x="20" y="200" fill="#ecfdf5" fontSize="11">✓ Internal state cannot be corrupted from outside</text>
                  <text x="20" y="225" fill="#34d399" fontSize="11 font-bold">Result: 100% Invariant Safety</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "fourpillars" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">THE FOUR FOUNDATIONAL PILLARS OF OBJECT-ORIENTED PROGRAMMING</text>

                {/* 4 Pillars */}
                <g transform="translate(30, 60)">
                  {/* Pillar 1 */}
                  <rect x="0" y="0" width="180" height="220" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">1. Encapsulation</text>
                  <text x="15" y="60" fill="#cbd5e1" fontSize="10">• Data Hiding</text>
                  <text x="15" y="80" fill="#cbd5e1" fontSize="10">• Private _attributes</text>
                  <text x="15" y="100" fill="#cbd5e1" fontSize="10">• Getter / Setter</text>
                  <text x="15" y="130" fill="#34d399" fontSize="10 font-bold">Goal: Protect State</text>

                  {/* Pillar 2 */}
                  <rect x="210" y="0" width="180" height="220" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="225" y="30" fill="#a5f3fc" fontSize="13" fontWeight="bold">2. Abstraction</text>
                  <text x="225" y="60" fill="#cbd5e1" fontSize="10">• Hide Complexity</text>
                  <text x="225" y="80" fill="#cbd5e1" fontSize="10">• Expose Simple APIs</text>
                  <text x="225" y="100" fill="#cbd5e1" fontSize="10">• Abstract Base Classes</text>
                  <text x="225" y="130" fill="#38bdf8" fontSize="10 font-bold">Goal: Reduce Cognitive Load</text>

                  {/* Pillar 3 */}
                  <rect x="420" y="0" width="180" height="220" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="435" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">3. Inheritance</text>
                  <text x="435" y="60" fill="#cbd5e1" fontSize="10">• Code Reuse</text>
                  <text x="435" y="80" fill="#cbd5e1" fontSize="10">• Subclassing</text>
                  <text x="435" y="100" fill="#cbd5e1" fontSize="10">• super() Calls</text>
                  <text x="435" y="130" fill="#c084fc" fontSize="10 font-bold">Goal: Eliminate Duplication</text>

                  {/* Pillar 4 */}
                  <rect x="630" y="0" width="180" height="220" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="645" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">4. Polymorphism</text>
                  <text x="645" y="60" fill="#cbd5e1" fontSize="10">• Duck Typing</text>
                  <text x="645" y="80" fill="#cbd5e1" fontSize="10">• Method Overriding</text>
                  <text x="645" y="100" fill="#cbd5e1" fontSize="10">• Uniform Protocol</text>
                  <text x="645" y="130" fill="#34d399" fontSize="10 font-bold">Goal: Flexible Extension</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">CLASS BLUEPRINT VS INDEPENDENT MEMORY INSTANCES</text>

                {/* Blueprint */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="260" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Class: BankAccount (Blueprint)</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="11 font-mono">def __init__(self, name):</text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="11 font-mono">    self.name = name</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="11 font-mono">    self._bal = 0.0</text>
                  <text x="20" y="135" fill="#ecfdf5" fontSize="11 font-mono">def deposit(self, amt): ...</text>
                  <text x="20" y="155" fill="#ecfdf5" fontSize="11 font-mono">def withdraw(self, amt): ...</text>
                  <rect x="20" y="185" width="220" height="35" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="207" fill="#34d399" fontSize="10 font-bold">Defines Schema &amp; Logic</text>
                </g>

                {/* Arrow */}
                <g transform="translate(305, 140)">
                  <text x="10" y="30" fill="#38bdf8" fontSize="24" fontWeight="bold">→</text>
                  <text x="-5" y="55" fill="#38bdf8" fontSize="10 font-mono">Instantiates</text>
                </g>

                {/* Instances */}
                <g transform="translate(390, 50)">
                  {/* Instance 1 */}
                  <rect x="0" y="0" width="220" height="110" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="25" fill="#c4b5fd" fontSize="11 font-bold">Instance 1: acc1 (0x7fa2)</text>
                  <text x="15" y="50" fill="#cbd5e1" fontSize="10 font-mono">name: 'Debanjan'</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="10 font-mono">_bal: 12,500.00</text>
                  <text x="15" y="95" fill="#a7f3d0" fontSize="9 font-bold">Independent Memory Heap</text>

                  {/* Instance 2 */}
                  <rect x="240" y="0" width="220" height="110" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="255" y="25" fill="#a5f3fc" fontSize="11 font-bold">Instance 2: acc2 (0x9bc1)</text>
                  <text x="255" y="50" fill="#cbd5e1" fontSize="10 font-mono">name: 'Priyanka'</text>
                  <text x="255" y="70" fill="#cbd5e1" fontSize="10 font-mono">_bal: 48,000.00</text>
                  <text x="255" y="95" fill="#38bdf8" fontSize="9 font-bold">Independent Memory Heap</text>

                  {/* Bottom Note */}
                  <rect x="0" y="130" width="460" height="90" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="15" y="155" fill="#f8fafc" fontSize="11 font-bold">Shared Methods, Isolated Attributes:</text>
                  <text x="15" y="180" fill="#cbd5e1" fontSize="10">Both objects share the exact same method code in memory,</text>
                  <text x="15" y="200" fill="#cbd5e1" fontSize="10">but maintain 100% separate, isolated state attributes!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PARADIGM COMPARATOR & SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Paradigm Simulator: Procedural vs OOP
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test deposit, withdrawal, and malicious external state mutation attacks in real time to experience why OOP encapsulation is critical:
          </p>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => { setParadigm("procedural"); handleReset(); }}
              className={clsx(
                "py-2.5 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all",
                paradigm === "procedural"
                  ? "bg-rose-950 border-rose-500 text-rose-300 shadow-md shadow-rose-950"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              📜 Procedural Paradigm (Naked Dictionary)
            </button>
            <button
              onClick={() => { setParadigm("oop"); handleReset(); }}
              className={clsx(
                "py-2.5 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all",
                paradigm === "oop"
                  ? "bg-teal-950 border-teal-500 text-teal-300 shadow-md shadow-teal-950"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              🏛️ Object-Oriented Paradigm (Encapsulated Class)
            </button>
          </div>

          {/* Interactive Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Account Actions
              </span>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleDeposit}
                  className="bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-700 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  Deposit INR 2,000
                </button>
                <button
                  onClick={handleWithdraw}
                  className="bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-700 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  Withdraw INR 1,500
                </button>
                <button
                  onClick={handleExternalMutation}
                  className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  ⚠️ Mutate State (-50k)
                </button>
                <button
                  onClick={handleReset}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-4 py-2 rounded-lg text-xs font-mono transition-all"
                >
                  Reset
                </button>
              </div>

              {/* State Box */}
              <div className={clsx(
                "p-4 rounded-xl border",
                isCorrupted
                  ? "bg-rose-950/50 border-rose-500 text-rose-300"
                  : "bg-slate-900 border-slate-800 text-emerald-300"
              )}>
                <span className="text-xs font-mono uppercase tracking-wider block font-bold text-slate-400 mb-1">
                  Active Account State ({paradigm.toUpperCase()})
                </span>
                <div className="text-2xl font-mono font-bold">
                  INR {balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                {isCorrupted && (
                  <div className="text-xs font-bold text-rose-400 mt-2">
                    ⚠️ CRITICAL CORRUPTION: Balance was mutated illegally without passing through validation!
                  </div>
                )}
              </div>
            </div>

            {/* Live Logs */}
            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Execution Log
              </span>
              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 overflow-y-auto max-h-48 flex-1">
                {logs.map((log, idx) => (
                  <div key={idx} className={clsx(
                    log.includes("[CRITICAL") ? "text-rose-400 font-bold" :
                    log.includes("[SECURITY") ? "text-teal-300 font-bold" :
                    log.includes("[DEPOSIT") ? "text-emerald-300" :
                    log.includes("[WITHDRAW") ? "text-cyan-300" : "text-slate-400"
                  )}>
                    &gt; {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER POP VS OOP COMPARISON MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Procedural vs Object-Oriented Comparison Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Dimension</th>
                  <th className="py-3.5 px-4 font-bold">Procedural Programming (POP)</th>
                  <th className="py-3.5 px-4 font-bold">Object-Oriented Programming (OOP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Core Unit</td>
                  <td className="py-3 px-4">Functions / Procedures</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Objects &amp; Classes</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Data Placement</td>
                  <td className="py-3 px-4">Separated into raw dictionaries, tuples, or globals</td>
                  <td className="py-3 px-4 text-cyan-300">Cohesively encapsulated inside classes</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Data Protection</td>
                  <td className="py-3 px-4 text-rose-400">None (open to direct external mutation)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">High (private attributes &amp; properties)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Code Extensibility</td>
                  <td className="py-3 px-4">Modifying shared functions risks breaking callers</td>
                  <td className="py-3 px-4 text-teal-300">Clean inheritance &amp; polymorphism</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Best Suited For</td>
                  <td className="py-3 px-4">Simple one-off scripts, mathematical calculations</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Complex enterprise domain applications</td>
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
            Explore 4 production-grade Python scripts demonstrating the paradigm shift, the Four Pillars, state cohesion, and multi-object domain modeling:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "procedural_vs_oop_comparison.py",
                code: proceduralVsOop,
                description: "Direct comparison between procedural banking dicts and encapsulated BankAccount classes with invariant guards.",
              },
              {
                filename: "the_four_pillars_of_oop.py",
                code: fourPillars,
                description: "Encapsulation, Abstraction, Inheritance, and Polymorphism in an enterprise PaymentProcessor architecture.",
              },
              {
                filename: "state_and_behavior_bundling.py",
                code: stateBundling,
                description: "Self-validating StudentScoreCard class demonstrating state and behavior cohesion with strict score validation.",
              },
              {
                filename: "hospital_management_oop_case_study.py",
                code: hospitalCaseStudy,
                description: "Enterprise Clinic Suite modeling Doctors, Patients, and Appointments with multi-object collaboration.",
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
                <span>❌</span> Trap 1: The "Anemic Domain Model" Anti-Pattern
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Creating classes that act solely as naked data holders while placing all business logic in external helper functions, defeating the purpose of OOP!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Move operations directly into the class as methods (<code className="text-emerald-300">acc.withdraw()</code>).
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Over-Engineering Simple Scripts
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Creating 5 classes with deep inheritance hierarchies for a 15-line CSV data cleanup script adds unnecessary mental overhead.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use procedural functions for simple scripts; use OOP for domain models.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Deep Inheritance Hierarchies
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nesting classes 6 levels deep creates brittle architectures where modifying a base class breaks unrelated leaf subclasses.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Principle:</span> Favor object composition ("has-a") over inheritance ("is-a").
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Forgetting `self` in Method Definitions
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Defining <code className="text-cyan-300 font-mono">def deposit(amount):</code> causes <code className="text-cyan-300 font-mono">TypeError: deposit() takes 1 positional argument but 2 were given</code>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always include <code className="text-emerald-300">self</code> as the first parameter in instance methods.
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
            Comprehensive question-and-answer repository covering procedural vs OOP differences, the Four Pillars, state encapsulation, and domain design:
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
            Download or print the complete reference sheet with paradigm comparison tables, the Four Pillars summary, and architectural guidelines:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic0_oop_paradigm_procedural_vs_oop_notes.txt"
              title="Print Topic 0 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
