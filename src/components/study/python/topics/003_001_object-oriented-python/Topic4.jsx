import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import fundamentals from "./topic4_files/class_vs_instance_attributes_fundamentals.py?raw";
import shadowingGotchas from "./topic4_files/attribute_shadowing_and_mutation_gotchas.py?raw";
import classPatterns from "./topic4_files/class_attribute_patterns_and_constants.py?raw";
import enrollmentAnalytics from "./topic4_files/student_enrollment_tracker_and_analytics.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Class attributes vs Instance attributes
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("namespaces");

  // Interactive Shadowing Simulator State
  const [classHq, setClassHq] = useState("Barrackpore, Kolkata");
  const [inst1Shadow, setInst1Shadow] = useState(null); // null means not shadowed

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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          <span className="text-teal-400">Class Attributes</span> vs <span className="text-cyan-400">Instance Attributes</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master memory distribution and namespace mechanics: <code className="text-teal-300 font-mono">Class.__dict__</code> vs <code className="text-cyan-300 font-mono">instance.__dict__</code>, the Attribute Shadowing trap, the mutable class attribute disaster, sequence ID counters, and domain constants with <code className="text-purple-300 font-mono">ClassVar</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ Shared Class Scope (Class.__dict__)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            👤 Isolated Instance Scope (instance.__dict__)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌓 Attribute Shadowing Dynamics
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 Global Institute Analytics Patterns
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE CORE DISTINCTION */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Shared Class State vs Isolated Instance State
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, attributes can live at two distinct scopes: directly on the <strong>Class</strong> (shared across all instances in a single memory location) or on the <strong>Instance</strong> (uniquely owned by each individual object):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
              {/* Class Attribute Card */}
              <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-2">
                  <span>🏛️</span> Class Attributes (Shared Memory)
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div>• <strong>Defined:</strong> Directly in the class body.</div>
                  <div>• <strong>Storage:</strong> Inside <code className="text-teal-300">Class.__dict__</code> (Exactly 1 copy in RAM).</div>
                  <div>• <strong>Use Cases:</strong> Constants, default configs, sequence counters, registries.</div>
                </div>
              </div>

              {/* Instance Attribute Card */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-2">
                  <span>👤</span> Instance Attributes (Isolated Heap)
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div>• <strong>Defined:</strong> Inside <code className="text-cyan-300">__init__</code> on <code className="text-cyan-300">self</code>.</div>
                  <div>• <strong>Storage:</strong> Inside <code className="text-cyan-300">instance.__dict__</code> (Unique copy per instance).</div>
                  <div>• <strong>Use Cases:</strong> Student names, balances, individual entity properties.</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Resolution Order: Instance &gt; Class
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When you evaluate <code className="text-teal-300 font-mono">obj.attr</code>, Python first checks <code className="text-cyan-300 font-mono">obj.__dict__</code>. If not found, it falls back to <code className="text-teal-300 font-mono">Class.__dict__</code>. If found on the instance, it <strong>shadows</strong> the class attribute!
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
                2. Visualizing Namespaces &amp; Shadowing Mechanics
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("namespaces")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "namespaces"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Namespace Isolation
              </button>
              <button
                onClick={() => setActiveInteractiveTab("shadowing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "shadowing"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Attribute Shadowing
              </button>
              <button
                onClick={() => setActiveInteractiveTab("mutabletrap")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "mutabletrap"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Mutable Class List Bug
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining dictionary mappings, memory overrides, and shared memory heap bugs:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "namespaces" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">CLASS NAMESPACE VS ISOLATED INSTANCE NAMESPACES</text>

                {/* Class Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="240" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Class: Franchise</text>
                  <text x="20" y="55" fill="#a7f3d0" fontSize="11 font-mono">hq = "Barrackpore"</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="10">• Franchise.__dict__</text>
                  <text x="20" y="105" fill="#cbd5e1" fontSize="10">• Exactly 1 memory copy</text>
                  <rect x="20" y="180" width="200" height="40" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="205" fill="#34d399" fontSize="10 font-bold">Shared Class Scope</text>
                </g>

                {/* Instances */}
                <g transform="translate(320, 50)">
                  {/* Inst 1 */}
                  <rect x="0" y="0" width="500" height="105" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="25" fill="#c4b5fd" fontSize="12" fontWeight="bold">f1 = Franchise("BR-01")</text>
                  <text x="20" y="50" fill="#cbd5e1" fontSize="11 font-mono">f1.__dict__ = {'{'} 'branch_code': 'BR-01' {'}'}</text>
                  <text x="20" y="75" fill="#a7f3d0" fontSize="10">f1.hq → Falls back to Class.__dict__ → "Barrackpore"</text>

                  {/* Inst 2 */}
                  <rect x="0" y="130" width="500" height="105" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="155" fill="#a5f3fc" fontSize="12" fontWeight="bold">f2 = Franchise("BR-02")</text>
                  <text x="20" y="180" fill="#cbd5e1" fontSize="11 font-mono">f2.__dict__ = {'{'} 'branch_code': 'BR-02' {'}'}</text>
                  <text x="20" y="205" fill="#38bdf8" fontSize="10">f2.hq → Falls back to Class.__dict__ → "Barrackpore"</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "shadowing" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">THE ATTRIBUTE SHADOWING MECHANISM: f1.hq = 'Shyamnagar'</text>

                {/* Left: Class */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="240" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Class: Franchise</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="11 font-mono">hq = "Barrackpore"</text>
                  <text x="20" y="100" fill="#cbd5e1" fontSize="10 font-bold">Unchanged in RAM!</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="10">Franchise.hq remains</text>
                  <text x="20" y="145" fill="#cbd5e1" fontSize="10">"Barrackpore"</text>
                </g>

                {/* Right: Shadowed instance */}
                <g transform="translate(320, 50)">
                  {/* Inst 1 */}
                  <rect x="0" y="0" width="500" height="110" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="25" fill="#c4b5fd" fontSize="12" fontWeight="bold">f1.__dict__ (Shadow Created):</text>
                  <text x="20" y="50" fill="#34d399" fontSize="11 font-mono font-bold">f1.__dict__ = {'{'} 'branch_code': 'BR-01', 'hq': 'Shyamnagar' {'}'}</text>
                  <text x="20" y="75" fill="#a7f3d0" fontSize="10">f1.hq returns 'Shyamnagar' directly from f1.__dict__ (Shadowing!)</text>

                  {/* Inst 2 */}
                  <rect x="0" y="130" width="500" height="105" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="155" fill="#a5f3fc" fontSize="12" fontWeight="bold">f2.__dict__ (Unshadowed):</text>
                  <text x="20" y="180" fill="#cbd5e1" fontSize="11 font-mono">f2.__dict__ = {'{'} 'branch_code': 'BR-02' {'}'}</text>
                  <text x="20" y="205" fill="#38bdf8" fontSize="10 font-bold">f2.hq still resolves to "Barrackpore" from Class!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">THE MUTABLE CLASS LIST TRAP (IN-PLACE MUTATION)</text>

                {/* Left: Buggy Class */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">❌ The Bug: Class Level List</text>
                  <text x="20" y="60" fill="#fca5a5" fontSize="11 font-mono">class Student:</text>
                  <text x="40" y="85" fill="#fca5a5" fontSize="11 font-mono">all_skills = []  # Shared List!</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="10 font-mono">s1 = Student()</text>
                  <text x="20" y="145" fill="#cbd5e1" fontSize="10 font-mono">s1.all_skills.append("Python")</text>
                  <text x="20" y="180" fill="#fca5a5" fontSize="10">s1.all_skills modifies the SINGLE list</text>
                  <text x="20" y="200" fill="#fca5a5" fontSize="10">stored at Student.all_skills in RAM!</text>
                </g>

                {/* Right: RAM Collision */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#881337" stroke="#e11d48" />
                  <text x="20" y="30" fill="#ffe4e6" fontSize="12" fontWeight="bold">Single Heap Memory List (0x7fa2990)</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="11 font-mono">['Python', 'Django']</text>

                  <rect x="20" y="95" width="340" height="85" rx="4" fill="#4c0519" stroke="#f43f5e" />
                  <text x="30" y="120" fill="#fda4af" fontSize="10 font-bold">s1.all_skills → points to 0x7fa2990</text>
                  <text x="30" y="140" fill="#fda4af" fontSize="10 font-bold">s2.all_skills → points to 0x7fa2990</text>
                  <text x="30" y="160" fill="#fda4af" fontSize="10 font-bold">s3.all_skills → points to 0x7fa2990</text>

                  <text x="20" y="205" fill="#34d399" fontSize="10 font-bold">Fix: Declare `self.skills = []` inside `__init__`!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SHADOWING SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Attribute Shadowing &amp; Namespace Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Manipulate class attributes and instance attributes to witness live namespace shadowing:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Actions */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Namespace Mutation Controls
              </span>

              <div className="space-y-2">
                <button
                  onClick={() => setClassHq("Kolkata Central Office")}
                  className="w-full text-left bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-700 p-2.5 rounded-lg text-xs font-mono transition-all"
                >
                  1. Update Class Globally: <code className="text-emerald-300">Franchise.hq = "Kolkata Central"</code>
                </button>
                <button
                  onClick={() => setInst1Shadow("Shyamnagar Regional Sub-Branch")}
                  className="w-full text-left bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-700 p-2.5 rounded-lg text-xs font-mono transition-all"
                >
                  2. Shadow on Instance 1: <code className="text-cyan-300">f1.hq = "Shyamnagar Sub-Branch"</code>
                </button>
                <button
                  onClick={() => setInst1Shadow(null)}
                  className="w-full text-left bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700 p-2.5 rounded-lg text-xs font-mono transition-all"
                >
                  3. Delete Shadow on f1: <code className="text-purple-300">del f1.hq</code> (Restores Class fallback)
                </button>
                <button
                  onClick={() => { setClassHq("Barrackpore, Kolkata"); setInst1Shadow(null); }}
                  className="w-full text-left bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 p-2.5 rounded-lg text-xs font-mono transition-all"
                >
                  Reset All to Default
                </button>
              </div>
            </div>

            {/* Live Inspection */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Live State Inspection
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-teal-300 font-bold">
                  Class: Franchise.hq = "{classHq}"
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Instance 1 (f1.hq):</span>{" "}
                  <span className={clsx("font-bold", inst1Shadow ? "text-cyan-300" : "text-slate-200")}>
                    "{inst1Shadow || classHq}"
                  </span>
                  {inst1Shadow ? (
                    <span className="text-[11px] text-cyan-400 block">  (Read from f1.__dict__ - SHADOWED!)</span>
                  ) : (
                    <span className="text-[11px] text-slate-500 block">  (Read from Franchise.__dict__ - Unshadowed)</span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Instance 2 (f2.hq):</span>{" "}
                  <span className="font-bold text-slate-200">"{classHq}"</span>
                  <span className="text-[11px] text-slate-500 block">  (Read from Franchise.__dict__ - Unshadowed)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ATTRIBUTES COMPARISON MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Class vs Instance Attributes Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Feature</th>
                  <th className="py-3.5 px-4 font-bold">Class Attribute</th>
                  <th className="py-3.5 px-4 font-bold">Instance Attribute</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Location in RAM</td>
                  <td className="py-3 px-4 font-mono text-slate-200">Class.__dict__ (Single Copy)</td>
                  <td className="py-3 px-4 font-mono text-slate-200">instance.__dict__ (Per Object)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Syntax to Assign</td>
                  <td className="py-3 px-4 font-mono text-slate-200">ClassName.var = val</td>
                  <td className="py-3 px-4 font-mono text-slate-200">self.var = val</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Scope of Modification</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Global across all instances</td>
                  <td className="py-3 px-4 text-cyan-300">Local to that single instance</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Recommended Data</td>
                  <td className="py-3 px-4">Constants, defaults, sequence counters</td>
                  <td className="py-3 px-4">Unique identity, personal state, balances</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">Mutable Safety</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">DANGEROUS (In-place shared mutation)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">SAFE (Isolated per instance)</td>
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
            Explore 4 production-grade Python scripts demonstrating attribute scopes, shadowing traps, sequence counters, and executive analytics:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "class_vs_instance_attributes_fundamentals.py",
                code: fundamentals,
                description: "Fundamental comparison between class and instance attributes, namespace scopes, and global class updates.",
              },
              {
                filename: "attribute_shadowing_and_mutation_gotchas.py",
                code: shadowingGotchas,
                description: "The Attribute Shadowing trap and the catastrophic mutable class list shared memory collision.",
              },
              {
                filename: "class_attribute_patterns_and_constants.py",
                code: classPatterns,
                description: "Production patterns: domain constants with ClassVar, auto-incrementing ID generators, and object registries.",
              },
              {
                filename: "student_enrollment_tracker_and_analytics.py",
                code: enrollmentAnalytics,
                description: "Enterprise Student Enrollment Tracker and Institute Analytics Dashboard computing financial aggregates.",
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
                <span>❌</span> Trap 1: Accidentally Shadowing with `self.attr = val`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">self.total_count += 1</code> creates a local instance attribute instead of updating the class-level counter!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always update class variables via <code className="text-emerald-300">ClassName.total_count += 1</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Mutable Class List Shared Memory
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Placing <code className="text-amber-300 font-mono">registered_items = []</code> in the class body causes all instances to append to the exact same list in RAM.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Declare mutable collections on <code className="text-emerald-300">self.registered_items = []</code> inside <code className="text-emerald-300">__init__</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Attempting `del obj.class_attr`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">del obj.class_attr</code> raises <code className="text-purple-300 font-mono">AttributeError</code> because del only inspects the instance dict.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Delete class attributes via <code className="text-emerald-300">del ClassName.class_attr</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Memory Leaks in Instance Registries
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Storing living instances in a plain class list (<code className="text-cyan-300 font-mono">_registry = []</code>) prevents garbage collection permanently.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">weakref.WeakSet()</code> to allow automatic memory deallocation.
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
            Comprehensive question-and-answer repository covering class attributes, instance attributes, attribute shadowing, and mutable collection traps:
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
            Download or print the complete reference sheet with attribute comparison tables, shadowing diagrams, and analytics patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic4_class_vs_instance_attributes_notes.txt"
              title="Print Topic 4 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
