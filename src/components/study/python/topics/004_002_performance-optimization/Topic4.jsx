import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import slotsFundCode from "./topic4_files/slots_memory_footprint_fundamentals.py?raw";
import inheritanceCode from "./topic4_files/slots_inheritance_and_attribute_access_speed.py?raw";
import tracemallocCode from "./topic4_files/tracemalloc_memory_profiling.py?raw";
import dossierOptCode from "./topic4_files/institutional_student_dossier_memory_optimizer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Memory profiling and reducing object footprint with __slots__
 * Module: 004_002_performance-optimization
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("memoryLayout");

  // Interactive Laboratory State
  const [objectCount, setObjectCount] = useState(50000);
  const [classModel, setClassModel] = useState("SLOTS"); // STANDARD | SLOTS | DATACLASS_SLOTS | NAMEDTUPLE

  // Memory calculation estimates
  const stdMb = ((objectCount * 280) / (1024 * 1024)).toFixed(2);
  const slotsMb = ((objectCount * 96) / (1024 * 1024)).toFixed(2);
  const namedTupleMb = ((objectCount * 88) / (1024 * 1024)).toFixed(2);

  let currentMb = slotsMb;
  let savingsPct = "65.7%";
  let hasDict = false;
  let accessSpeed = "1.2x Faster (Descriptor Offset)";

  if (classModel === "STANDARD") {
    currentMb = stdMb;
    savingsPct = "0% (Baseline)";
    hasDict = true;
    accessSpeed = "1.0x (Dynamic __dict__ Lookup)";
  } else if (classModel === "DATACLASS_SLOTS") {
    currentMb = slotsMb;
    savingsPct = "65.7%";
    hasDict = false;
    accessSpeed = "1.2x Faster (Descriptor Offset)";
  } else if (classModel === "NAMEDTUPLE") {
    currentMb = namedTupleMb;
    savingsPct = "68.5%";
    hasDict = false;
    accessSpeed = "1.1x (Tuple Struct Indexing)";
  }

  const generatedPythonSnippet = `# Object Memory Allocation for N = ${objectCount.toLocaleString()} instances:
# Model: ${classModel}

${
  classModel === "STANDARD"
    ? `class StudentRecord:\n    def __init__(self, sid, name, fee):\n        self.sid = sid\n        self.name = name\n        self.fee = fee\n\n# Dynamic __dict__ allocated per instance: ~${currentMb} MB total RAM`
    : classModel === "DATACLASS_SLOTS"
    ? `from dataclasses import dataclass\n\n@dataclass(slots=True)\nclass StudentRecord:\n    sid: str\n    name: str\n    fee: float\n\n# Fixed C pointer struct: ~${currentMb} MB total RAM (${savingsPct} Saved!)`
    : classModel === "NAMEDTUPLE"
    ? `from collections import namedtuple\n\nStudentRecord = namedtuple("StudentRecord", ["sid", "name", "fee"])\n\n# Compact immutable C tuple: ~${currentMb} MB total RAM (${savingsPct} Saved!)`
    : `class StudentRecord:\n    __slots__ = ("sid", "name", "fee")\n    def __init__(self, sid, name, fee):\n        self.sid = sid\n        self.name = name\n        self.fee = fee\n\n# Fixed C pointer struct: ~${currentMb} MB total RAM (${savingsPct} Saved!)`
}`;

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
            Segment 4 • Module 004_002
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Performance Optimization, Profiling &amp; Big-O Thinking
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Memory Optimization: <span className="text-teal-400">`__slots__` &amp; tracemalloc</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python instance heap memory reduction: replacing bloated dynamic <code className="text-rose-400 font-mono">__dict__</code> hash tables with compact <code className="text-teal-300 font-mono">__slots__</code> C struct pointer arrays, cutting RAM consumption by <span className="text-emerald-400 font-bold">65%+</span>, accelerating attribute access with descriptors, modernizing dataclasses with <code className="text-cyan-300 font-mono">@dataclass(slots=True)</code>, and profiling heap allocations with <code className="text-purple-300 font-mono">tracemalloc</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧠 65%+ RAM Reduction
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Fast Descriptor Access
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Typo &amp; `AttributeError` Safety
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 `tracemalloc` Heap Profiling
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: SLOTS ARCHITECTURAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Memory Architecture of Python Instances
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              By default, Python prioritizes dynamic flexibility over memory efficiency. Understanding instance internals explains the drastic savings of <code className="text-teal-300 font-mono">__slots__</code>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 shadow-lg">
                <div className="text-rose-400 font-bold text-sm mb-1">1️⃣ Standard Instance (`__dict__`)</div>
                <code className="text-xs font-mono text-rose-300 block mb-1">~280 bytes per object</code>
                <p className="text-[11px] text-slate-300">
                  Allocates an entire dynamic hash table dictionary and weakref pointer per instance, consuming massive heap memory at scale.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">2️⃣ Slotted Instance (`__slots__`)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">~96 bytes per object (65% Saved)</code>
                <p className="text-[11px] text-slate-300">
                  Replaces the dictionary with a fixed-size C struct array of pointers directly in the object header.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Heap Tracker (`tracemalloc`)</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">snapshot.compare_to()</code>
                <p className="text-[11px] text-slate-300">
                  Profiles exact bytecode memory allocations down to source line numbers to pinpoint leaks and heap bloat.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Bonus Feature: Free Attribute Typo Protection
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Because <code className="text-teal-300 font-mono">__slots__</code> eliminates the dynamic <code className="text-rose-400 font-mono">__dict__</code>, attempting to assign an unslotted attribute (e.g. <code className="text-rose-400 font-mono">student.scroe = 95</code>) immediately raises an <code className="text-emerald-400 font-mono">AttributeError</code>, catching silent data-corruption bugs at runtime!
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
                2. Visualizing Instance Memory Layouts &amp; tracemalloc Diffs
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("memoryLayout")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memoryLayout"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Memory Layouts
              </button>
              <button
                onClick={() => setActiveInteractiveTab("tracemallocDiff")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "tracemallocDiff"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                tracemalloc Heap Tracker
              </button>
              <button
                onClick={() => setActiveInteractiveTab("scaleShootout")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "scaleShootout"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Scale Shootout
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comparing standard instance dictionaries against compact slotted pointer structs and heap tracking:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "memoryLayout" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">INSTANCE MEMORY LAYOUT: STANDARD CLASS VS __SLOTS__ CLASS</text>

                {/* Left: Standard Class */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Standard Instance (~280 Bytes)</text>
                  
                  <rect x="20" y="55" width="340" height="40" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="80" fill="#fca5a5" fontSize="8 font-mono">PyObject Header (16B) | Pointer to `__dict__`</text>

                  <rect x="20" y="110" width="340" height="100" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="135" fill="#fda4af" fontSize="9 font-bold">Dynamic `__dict__` Hash Table (~200+ Bytes):</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8 font-mono">- Bucket Array (Keys + Hashes + Values)</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8 font-mono">- Weakref Pointer Head (8 Bytes)</text>
                  <text x="30" y="195" fill="#f43f5e" fontSize="8 font-mono font-bold">Total overhead for 50,000 objects: ~14.0 MB RAM!</text>
                </g>

                {/* Right: Slotted Class */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`__slots__` Instance (~96 Bytes - 65% SAVED)</text>

                  <rect x="20" y="55" width="340" height="40" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="80" fill="#34d399" fontSize="8 font-mono">PyObject Header (16B) | Direct Descriptor Struct</text>

                  <rect x="20" y="110" width="340" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="135" fill="#34d399" fontSize="9 font-bold">Fixed C Pointer Array (Zero Dict Overhead):</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8 font-mono">[Ptr 0: sid] [Ptr 1: name] [Ptr 2: fee]</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8 font-mono">- Direct offset pointer indexing (Faster reads/writes)</text>
                  <text x="30" y="195" fill="#34d399" fontSize="8 font-mono font-bold">Total overhead for 50,000 objects: ~4.8 MB RAM!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "tracemallocDiff" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">TRACEMALLOC HEAP SNAPSHOT DIFFERENTIAL TRACKING</text>

                {/* 3 Step Flow */}
                <g transform="translate(30, 50)">
                  {/* Snapshot 1 */}
                  <rect x="0" y="0" width="240" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Baseline Snapshot</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">`snap1 = take_snapshot()`</text>
                  <text x="15" y="80" fill="#cbd5e1" fontSize="8">Records heap allocations</text>
                  <text x="15" y="95" fill="#cbd5e1" fontSize="8">prior to execution.</text>

                  <rect x="15" y="130" width="210" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="155" fill="#34d399" fontSize="9 font-bold">Baseline RAM:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Current: 2.1 MB</text>

                  {/* Arrow 1 */}
                  <text x="255" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Execution */}
                  <rect x="285" y="0" width="260" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="300" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Run Workload &amp; Snap 2</text>
                  <text x="300" y="55" fill="#38bdf8" fontSize="8 font-mono">`snap2 = take_snapshot()`</text>
                  <text x="300" y="80" fill="#cbd5e1" fontSize="8">Allocates 50,000 student</text>
                  <text x="300" y="95" fill="#cbd5e1" fontSize="8">domain records.</text>

                  <rect x="300" y="130" width="230" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="310" y="155" fill="#38bdf8" fontSize="9 font-bold">Peak RAM Tracking:</text>
                  <text x="310" y="175" fill="#cbd5e1" fontSize="8">`get_traced_memory()`</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Diff Analysis */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Line-by-Line Diff</text>
                  <text x="605" y="55" fill="#c084fc" fontSize="8 font-mono">`snap2.compare_to(snap1)`</text>
                  <text x="605" y="80" fill="#cbd5e1" fontSize="8">Pinpoints exact source</text>
                  <text x="605" y="95" fill="#cbd5e1" fontSize="8">lines allocating RAM.</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="155" fill="#c4b5fd" fontSize="9 font-bold">Line Attribution:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">models.py:45 (+4.8 MB)</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">OBJECT ALLOCATION SHOOTOUT (50,000 OBJECTS IN RAM)</text>

                {/* 4 Contestant Bars */}
                <g transform="translate(30, 50)">
                  {/* Standard */}
                  <rect x="0" y="0" width="820" height="50" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="22" fill="#fda4af" fontSize="10 font-bold">1. Standard Class (with `__dict__`): 14.00 MB [BASELINE - HIGHEST MEMORY]</text>
                  <text x="20" y="40" fill="#fca5a5" fontSize="8 font-mono">Allocates ~280 bytes per object across 50,000 instances</text>

                  {/* Slotted Class */}
                  <rect x="0" y="60" width="820" height="50" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="82" fill="#a7f3d0" fontSize="10 font-bold">2. Slotted Class (`__slots__ = (...)`): 4.80 MB [65.7% RAM SAVED]</text>
                  <text x="20" y="100" fill="#34d399" fontSize="8 font-mono">Compact fixed pointer struct; zero per-instance hash table</text>

                  {/* Dataclass slots=True */}
                  <rect x="0" y="120" width="820" height="50" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="142" fill="#a7f3d0" fontSize="10 font-bold">3. Dataclass (`@dataclass(slots=True)`): 4.80 MB [65.7% RAM SAVED]</text>
                  <text x="20" y="160" fill="#34d399" fontSize="8 font-mono">Clean modern syntax with identical low-memory C struct allocation</text>

                  {/* NamedTuple */}
                  <rect x="0" y="180" width="820" height="50" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="202" fill="#a5f3fc" fontSize="10 font-bold">4. `collections.namedtuple`: 4.40 MB [68.5% RAM SAVED - MINIMAL]</text>
                  <text x="20" y="220" fill="#38bdf8" fontSize="8 font-mono">Immutable C tuple struct; ideal for static read-only tabular records</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SLOTS LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Memory Footprint &amp; `__slots__` Lab
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select object instantiation count <code className="text-teal-300 font-mono">N</code>, switch class architecture paradigms, and inspect real-time RAM allocation and descriptor speedups:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* N Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Object Count (Instances):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[1000, 10000, 50000, 100000].map((count) => (
                    <button
                      key={count}
                      onClick={() => setObjectCount(count)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        objectCount === count
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {count.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Model Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Object Architecture Model:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "STANDARD", label: "1. Standard Class (__dict__)" },
                    { id: "SLOTS", label: "2. Pure __slots__ Class" },
                    { id: "DATACLASS_SLOTS", label: "3. @dataclass(slots=True)" },
                    { id: "NAMEDTUPLE", label: "4. collections.namedtuple" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setClassModel(m.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        classModel === m.id
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scorecard */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex justify-between items-center text-slate-300">
                  <span>RAM Footprint:</span>
                  <span className={clsx("font-bold text-sm", hasDict ? "text-rose-400" : "text-emerald-400")}>
                    {currentMb} MB ({savingsPct} Saved)
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>`__dict__` Allocated:</span>
                  <span className={clsx(hasDict ? "text-rose-400 font-bold" : "text-teal-300 font-bold")}>
                    {hasDict ? "Yes (150+ Bytes / obj)" : "No (Eliminated)"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Attribute Access Speed:</span>
                  <span className="text-cyan-300 font-bold">{accessSpeed}</span>
                </div>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python Class Definition:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonSnippet}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>tracemalloc Heap Telemetry:</span>
                  <span className="text-emerald-400">Peak: {currentMb} MB</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {`[TRACEMALLOC] Instantiating ${objectCount.toLocaleString()} ${classModel} objects:
* Current Memory: ${currentMb} MB
* Peak Memory   : ${currentMb} MB
* RAM Savings   : ${savingsPct} relative to Standard Classes!
* Protection    : Typo attribute assignments raise AttributeError.`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER SLOTS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Object Paradigm Memory &amp; Feature Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Class Paradigm</th>
                  <th className="py-3.5 px-4 font-bold">RAM per 50k Objs</th>
                  <th className="py-3.5 px-4 font-bold">Mutability</th>
                  <th className="py-3.5 px-4 font-bold">Typo Safety</th>
                  <th className="py-3.5 px-4 font-bold">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-semibold">Standard Class</td>
                  <td className="py-3 px-4 text-rose-400">~14.0 MB (High)</td>
                  <td className="py-3 px-4 text-slate-200">Mutable</td>
                  <td className="py-3 px-4 text-rose-400">No (Allows typos)</td>
                  <td className="py-3 px-4">Dynamic plugins &amp; low object count models</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`__slots__` Class</td>
                  <td className="py-3 px-4 text-emerald-400">~4.8 MB (65% Saved)</td>
                  <td className="py-3 px-4 text-slate-200">Mutable</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (AttributeError)</td>
                  <td className="py-3 px-4">High-volume custom domain records</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`@dataclass(slots=True)`</td>
                  <td className="py-3 px-4 text-emerald-400">~4.8 MB (65% Saved)</td>
                  <td className="py-3 px-4 text-slate-200">Mutable / Frozen</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (AttributeError)</td>
                  <td className="py-3 px-4">Modern Python 3.10+ enterprise microservices</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`namedtuple`</td>
                  <td className="py-3 px-4 text-emerald-400">~4.4 MB (68% Saved)</td>
                  <td className="py-3 px-4 text-amber-300">Immutable</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (Read-only)</td>
                  <td className="py-3 px-4">Static tabular database rows &amp; tuples</td>
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
            Explore 4 production-grade Python scripts demonstrating slots memory fundamentals, descriptor access speed, tracemalloc heap tracking, and institutional dossier optimizers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "slots_memory_footprint_fundamentals.py",
                code: slotsFundCode,
                description: "tracemalloc memory comparison between standard and __slots__ classes.",
              },
              {
                filename: "slots_inheritance_and_attribute_access_speed.py",
                code: inheritanceCode,
                description: "Attribute access speedup, inheritance rules, and dynamic attribute prevention.",
              },
              {
                filename: "tracemalloc_memory_profiling.py",
                code: tracemallocCode,
                description: "tracemalloc snapshots, diff comparison, and peak heap memory tracking.",
              },
              {
                filename: "institutional_student_dossier_memory_optimizer.py",
                code: dossierOptCode,
                description: "RAM comparisons across standard classes, NamedTuples, slotted dataclasses, and pure slots classes.",
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
                <span>❌</span> Trap 1: The String Slots Bug (`__slots__ = "id"`)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing a single string iterates over characters, creating slots for <code className="text-rose-300 font-mono">'i'</code> and <code className="text-rose-300 font-mono">'d'</code> rather than <code className="text-rose-300 font-mono">'id'</code>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always declare a tuple: <code className="text-emerald-300">__slots__ = ("id",)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Subclasses Without `__slots__`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If a subclass does not define <code className="text-amber-300 font-mono">__slots__</code>, Python automatically creates a dynamic <code className="text-amber-300 font-mono">__dict__</code> on the subclass, eliminating memory gains.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Declare <code className="text-emerald-300">__slots__ = ()</code> on subclasses if no new fields are added.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Multiple Non-Empty Slots Inheritance
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Multiple inheritance from two base classes that both define non-empty slots causes <code className="text-purple-300 font-mono">TypeError: layout conflict</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use composition or empty abstract base class slots.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Forgetting Weakref Support
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Slotted instances cannot be weakly referenced by default, breaking tools like `weakref.ref()` or caching libraries.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Add <code className="text-emerald-300">"__weakref__"</code> into the <code className="text-emerald-300">__slots__</code> tuple if needed.
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
            Comprehensive question-and-answer repository covering __slots__, memory reduction, tracemalloc, dataclasses with slots, and inheritance:
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
            Download or print the complete reference sheet with slots recipes, tracemalloc diff patterns, and memory optimization rules:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic4_slots_memory_optimization_notes.txt"
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
