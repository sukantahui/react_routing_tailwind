import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import zipMechanicsCode from "./topic5_files/zip_and_zip_longest_mechanics.py?raw";
import infiniteCode from "./topic5_files/infinite_iterators_count_cycle_repeat.py?raw";
import chainCompressCode from "./topic5_files/chain_compress_and_islice_iterators.py?raw";
import schedulerEngineCode from "./topic5_files/institutional_multicampus_roundrobin_scheduler.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: zip() and itertools module essentials (count, cycle, repeat, chain)
 * Module: 003_005_advance-comprehensions
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("zipPairing");

  // Interactive Laboratory State
  const candidates = [
    { id: "STU-101", name: "Sourav Mukherjee", course: "PY-AI" },
    { id: "STU-102", name: "Priyanka Sen", course: "DS-ML" },
    { id: "STU-103", name: "Debolina Roy", course: "PY-AI" },
    { id: "STU-104", name: "Rahul Verma", course: "WEB-DEV" },
  ];

  const facultyProctors = ["Sukanta Hui", "Prabhat Sen"]; // 2 proctors for 4 students

  const [strategy, setStrategy] = useState("cycle"); // cycle | standardZip | zipLongest | strictZip
  const [roomChunkSize, setRoomChunkSize] = useState(2);

  // Compute allocation based on strategy
  let dutyAllocations = [];
  let executionStatus = "SUCCESS";
  let statusMessage = "All allocations computed cleanly using itertools streaming generator.";
  let generatedPythonCode = "";

  if (strategy === "cycle") {
    generatedPythonCode = `# Round-robin cycling with itertools.cycle():
proctor_cycler = itertools.cycle(["Sukanta Hui", "Prabhat Sen"])
duty_chart = [
    {"student": s['name'], "proctor": next(proctor_cycler)}
    for s in candidates
]`;
    dutyAllocations = candidates.map((s, idx) => ({
      roll_no: `EXAM-${1001 + idx}`,
      student: s.name,
      course: s.course,
      proctor: facultyProctors[idx % facultyProctors.length],
    }));
  } else if (strategy === "standardZip") {
    generatedPythonCode = `# Standard zip() silently truncates to length 2 (dropping 2 students!):
duty_chart = [
    {"student": s['name'], "proctor": p}
    for s, p in zip(candidates, ["Sukanta Hui", "Prabhat Sen"])
]`;
    dutyAllocations = facultyProctors.map((p, idx) => ({
      roll_no: `EXAM-${1001 + idx}`,
      student: candidates[idx].name,
      course: candidates[idx].course,
      proctor: p,
    }));
    executionStatus = "TRUNCATED";
    statusMessage = "WARNING: Standard zip() silently dropped STU-103 and STU-104 due to unequal list lengths!";
  } else if (strategy === "zipLongest") {
    generatedPythonCode = `# itertools.zip_longest() pads missing proctors with fillvalue:
duty_chart = [
    {"student": s['name'], "proctor": p}
    for s, p in itertools.zip_longest(candidates, ["Sukanta Hui", "Prabhat Sen"], fillvalue="SELF_STUDY_HALL")
]`;
    dutyAllocations = candidates.map((s, idx) => ({
      roll_no: `EXAM-${1001 + idx}`,
      student: s.name,
      course: s.course,
      proctor: facultyProctors[idx] || "SELF_STUDY_HALL",
    }));
    statusMessage = "itertools.zip_longest padded unmatched candidates with 'SELF_STUDY_HALL'.";
  } else {
    // strictZip
    generatedPythonCode = `# Python 3.10+ zip(strict=True) detects length mismatches:
try:
    duty_chart = list(zip(candidates, ["Sukanta Hui", "Prabhat Sen"], strict=True))
except ValueError as exc:
    print("Defensive Validation Error:", exc)`;
    executionStatus = "STRICT_ERROR";
    statusMessage = "ValueError: zip() argument 2 is shorter than argument 1 (2 proctors vs 4 candidates)!";
    dutyAllocations = [];
  }

  // Compute room chunk pagination with islice logic
  const roomChunks = [];
  for (let i = 0; i < dutyAllocations.length; i += roomChunkSize) {
    roomChunks.push({
      roomName: `HALL-${Math.floor(i / roomChunkSize) + 1}`,
      students: dutyAllocations.slice(i, i + roomChunkSize),
    });
  }

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
            Segment 3 • Module 003_005
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced Comprehensions &amp; Functional Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          zip() &amp; itertools: <span className="text-teal-400">count, cycle, repeat, chain</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master parallel iteration and high-performance stream tools: <code className="text-teal-300 font-mono">zip(strict=True)</code> length validation, <code className="text-teal-300 font-mono">itertools.zip_longest</code> padding, infinite round-robin cycles with <code className="text-cyan-300 font-mono">count()</code> and <code className="text-cyan-300 font-mono">cycle()</code>, zero-copy sequence chaining (<code className="text-purple-300 font-mono">chain.from_iterable</code>), boolean masking with <code className="text-purple-300 font-mono">compress()</code>, and stream pagination with <code className="text-amber-300 font-mono">islice()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ `zip(strict=True)`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 `itertools.cycle` (Round-Robin)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔗 `chain.from_iterable` (Zero-Copy)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✂️ `itertools.islice` (Pagination)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ITERTOOLS SUITE OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧰</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The `itertools` Streaming Powerhouse
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              The <code className="text-teal-300 font-mono">itertools</code> module implements fast, memory-efficient C-level iterator building blocks that stream data in constant <code className="text-teal-300 font-mono">O(1)</code> memory:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Infinite Generators</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">count(), cycle(), repeat()</code>
                <p className="text-[11px] text-slate-300">
                  Infinite sequential numbers, round-robin rotating queues, and constant fillers.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Parallel &amp; Padded Pairing</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">zip(strict=True), zip_longest()</code>
                <p className="text-[11px] text-slate-300">
                  Pairs multiple iterables in lockstep with defensive length verification or fallback padding.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Chaining &amp; Slicing</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">chain.from_iterable(), islice()</code>
                <p className="text-[11px] text-slate-300">
                  Zero-copy sequence flattening, boolean mask filtering (<code className="text-purple-300 font-mono">compress</code>), and pagination.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Silent Truncation Trap in Standard `zip()`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Standard <code className="text-rose-400 font-mono">zip(A, B)</code> silently stops at the end of the shorter sequence, dropping excess items without any warning. In Python 3.10+, always use <code className="text-teal-300 font-mono">zip(A, B, strict=True)</code> or <code className="text-cyan-300 font-mono">itertools.zip_longest(A, B, fillvalue=None)</code> to prevent silent data loss!
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
                2. Visualizing Parallel Pairing, Round-Robin &amp; Chaining
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("zipPairing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "zipPairing"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `zip` vs `zip_longest`
              </button>
              <button
                onClick={() => setActiveInteractiveTab("roundRobin")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "roundRobin"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `cycle` Round-Robin
              </button>
              <button
                onClick={() => setActiveInteractiveTab("zeroCopy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "zeroCopy"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `chain` Zero-Copy
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining parallel pairing truncation, infinite round-robin cycles, and zero-copy sequence flattening:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "zipPairing" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">PARALLEL PAIRING: `zip()` (TRUNCATED) VS `itertools.zip_longest()` (PADDED)</text>

                {/* Left: Standard zip() */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Standard `zip(A, B)` [SILENT TRUNCATION]</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">List A: [STU-101, STU-102, STU-103, STU-104] (Len: 4)</text>
                  <text x="20" y="78" fill="#ecfdf5" fontSize="8 font-mono">List B: [Sukanta, Prabhat] (Len: 2)</text>

                  <text x="20" y="105" fill="#fca5a5" fontSize="8 font-mono font-bold">Output: [(STU-101, Sukanta), (STU-102, Prabhat)]</text>
                  <text x="20" y="125" fill="#f43f5e" fontSize="8 font-mono">❌ STU-103 &amp; STU-104 Silently Dropped!</text>

                  <rect x="20" y="145" width="340" height="75" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="170" fill="#fda4af" fontSize="9 font-bold">Silent Data Loss Hazard:</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">Fails silently when datasets are of mismatched lengths.</text>
                </g>

                {/* Right: zip_longest() */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`itertools.zip_longest(A, B, fillvalue='N/A')`</text>

                  <text x="20" y="60" fill="#34d399" fontSize="8 font-mono font-bold">1. (STU-101, Sukanta)</text>
                  <text x="20" y="78" fill="#34d399" fontSize="8 font-mono font-bold">2. (STU-102, Prabhat)</text>
                  <text x="20" y="96" fill="#38bdf8" fontSize="8 font-mono">3. (STU-103, 'N/A') [PADDED]</text>
                  <text x="20" y="114" fill="#38bdf8" fontSize="8 font-mono">4. (STU-104, 'N/A') [PADDED]</text>

                  <rect x="20" y="145" width="340" height="75" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="170" fill="#34d399" fontSize="9 font-bold">100% Data Preservation:</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">All 4 records preserved with explicit fallback padding.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "roundRobin" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">ROUND-ROBIN CYCLING: `itertools.cycle(['Sukanta', 'Prabhat'])`</text>

                {/* 4 Step Pipeline */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Rotating Fixed Resource Pool across Dynamic Streams</text>

                  <g transform="translate(20, 55)">
                    {/* Item 1 */}
                    <rect x="0" y="0" width="180" height="150" rx="6" fill="#022c22" stroke="#059669" />
                    <text x="10" y="25" fill="#34d399" fontSize="10 font-bold">STU-101</text>
                    <text x="10" y="55" fill="#ecfdf5" fontSize="8 font-mono">next(cycler)</text>
                    <text x="10" y="80" fill="#34d399" fontSize="10 font-mono font-bold">➡️ Sukanta Hui</text>

                    {/* Item 2 */}
                    <rect x="200" y="0" width="180" height="150" rx="6" fill="#022c22" stroke="#059669" />
                    <text x="210" y="25" fill="#34d399" fontSize="10 font-bold">STU-102</text>
                    <text x="210" y="55" fill="#ecfdf5" fontSize="8 font-mono">next(cycler)</text>
                    <text x="210" y="80" fill="#38bdf8" fontSize="10 font-mono font-bold">➡️ Prabhat Sen</text>

                    {/* Item 3 */}
                    <rect x="400" y="0" width="180" height="150" rx="6" fill="#022c22" stroke="#059669" />
                    <text x="410" y="25" fill="#34d399" fontSize="10 font-bold">STU-103</text>
                    <text x="410" y="55" fill="#ecfdf5" fontSize="8 font-mono">next(cycler) [WRAPS]</text>
                    <text x="410" y="80" fill="#34d399" fontSize="10 font-mono font-bold">➡️ Sukanta Hui</text>

                    {/* Item 4 */}
                    <rect x="600" y="0" width="180" height="150" rx="6" fill="#022c22" stroke="#059669" />
                    <text x="610" y="25" fill="#34d399" fontSize="10 font-bold">STU-104</text>
                    <text x="610" y="55" fill="#ecfdf5" fontSize="8 font-mono">next(cycler)</text>
                    <text x="610" y="80" fill="#38bdf8" fontSize="10 font-mono font-bold">➡️ Prabhat Sen</text>
                  </g>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ZERO-COPY STREAM FLATTENING: `itertools.chain.from_iterable()`</text>

                {/* Left: + Concat */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">`L1 + L2 + L3` or `reduce(operator.concat)`</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">Creates new intermediate list at every '+'</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">Copies elements repeatedly: O(N²) quadratic time</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Heavy Garbage Collection Triggers</text>

                  <rect x="20" y="135" width="340" height="80" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="160" fill="#fda4af" fontSize="9 font-bold">High Memory Copying:</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">Re-allocates memory buffer for every sublist joined.</text>
                </g>

                {/* Right: chain.from_iterable */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`itertools.chain.from_iterable(nested_lists)`</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">Streams elements directly from inner iterables</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">Zero intermediate list allocations: O(N) linear time</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Optimized C-level iterator wrapper</text>

                  <rect x="20" y="135" width="340" height="80" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="160" fill="#34d399" fontSize="9 font-bold">Zero-Copy Streaming:</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">Flattens nested multi-gigabyte files with constant O(1) RAM.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SCHEDULER LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Round-Robin Proctor &amp; Room Scheduler Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test allocating 4 candidates to 2 faculty proctors using <code className="text-teal-300 font-mono">itertools.cycle</code>, standard <code className="text-rose-400 font-mono">zip()</code>, <code className="text-cyan-300 font-mono">zip_longest()</code>, and <code className="text-purple-300 font-mono">strict=True</code> validation:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                1. Pairing &amp; Allocation Strategy:
              </span>

              {/* Strategy Selector */}
              <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setStrategy("cycle")}
                  className={clsx(
                    "py-1.5 rounded transition-all",
                    strategy === "cycle"
                      ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  1. `cycle()` Round-Robin
                </button>
                <button
                  onClick={() => setStrategy("standardZip")}
                  className={clsx(
                    "py-1.5 rounded transition-all",
                    strategy === "standardZip"
                      ? "bg-rose-900/60 text-rose-300 font-bold border border-rose-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  2. Standard `zip()`
                </button>
                <button
                  onClick={() => setStrategy("zipLongest")}
                  className={clsx(
                    "py-1.5 rounded transition-all",
                    strategy === "zipLongest"
                      ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  3. `zip_longest()` Pad
                </button>
                <button
                  onClick={() => setStrategy("strictZip")}
                  className={clsx(
                    "py-1.5 rounded transition-all",
                    strategy === "strictZip"
                      ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  4. `zip(strict=True)`
                </button>
              </div>

              {/* Room Chunk Size Slider (islice) */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Room Chunk Size (`itertools.islice`):</span>
                  <span className="text-teal-300 font-bold">{roomChunkSize} students/room</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={roomChunkSize}
                  onChange={(e) => setRoomChunkSize(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Status Banner */}
              <div
                className={clsx(
                  "p-3 rounded-lg border font-mono text-xs space-y-1",
                  executionStatus === "SUCCESS"
                    ? "bg-emerald-950/40 border-emerald-700/80 text-emerald-300"
                    : executionStatus === "TRUNCATED"
                    ? "bg-amber-950/40 border-amber-700/80 text-amber-300"
                    : "bg-rose-950/40 border-rose-700/80 text-rose-300"
                )}
              >
                <div className="font-bold text-[10px] uppercase">Engine Execution Status:</div>
                <div className="text-[11px] leading-relaxed">{statusMessage}</div>
              </div>
            </div>

            {/* Python Code Display & Output Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python itertools Expression:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Allocation Duty Chart Inspector */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Allocated Duty Roster ({dutyAllocations.length} Active Records):</span>
                  <span>Rooms: {roomChunks.length}</span>
                </div>
                {dutyAllocations.length === 0 ? (
                  <div className="text-rose-400 text-[11px] pt-2">
                    [ERROR] No records allocated due to length mismatch in strict mode.
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {dutyAllocations.map((d, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] text-slate-200 border-b border-slate-800/60 pb-1">
                        <span>
                          <strong className="text-teal-300">{d.roll_no}</strong>: {d.student} ({d.course})
                        </span>
                        <span className="text-cyan-300 font-semibold">{d.proctor}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ITERTOOLS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master `itertools` Function Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Function Signature</th>
                  <th className="py-3.5 px-4 font-bold">Iterator Category</th>
                  <th className="py-3.5 px-4 font-bold">Memory &amp; Time Complexity</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`zip(strict=True)`</td>
                  <td className="py-3 px-4 text-slate-200">Parallel Pairing</td>
                  <td className="py-3 px-4 text-emerald-400">O(1) RAM / O(N) Time</td>
                  <td className="py-3 px-4">Defensive parallel aggregation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`zip_longest(fillvalue)`</td>
                  <td className="py-3 px-4 text-slate-200">Padded Parallel</td>
                  <td className="py-3 px-4 text-emerald-400">O(1) RAM / O(N) Time</td>
                  <td className="py-3 px-4">Mismatched sequence padding</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`cycle(iterable)`</td>
                  <td className="py-3 px-4 text-purple-300">Infinite Generator</td>
                  <td className="py-3 px-4 text-emerald-400">O(1) RAM / Infinite</td>
                  <td className="py-3 px-4">Round-robin load balancing</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`chain.from_iterable()`</td>
                  <td className="py-3 px-4 text-amber-300">Stream Flattening</td>
                  <td className="py-3 px-4 text-emerald-400">O(1) RAM / O(N) Time</td>
                  <td className="py-3 px-4">Zero-copy multi-list flattening</td>
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
            Explore 4 production-grade Python scripts demonstrating zip mechanics, infinite generator bounding, chain/compress/islice, and institutional round-robin schedulers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "zip_and_zip_longest_mechanics.py",
                code: zipMechanicsCode,
                description: "zip, zip strict=True, and itertools.zip_longest padding.",
              },
              {
                filename: "infinite_iterators_count_cycle_repeat.py",
                code: infiniteCode,
                description: "count, cycle, repeat, islice, and round-robin allocations.",
              },
              {
                filename: "chain_compress_and_islice_iterators.py",
                code: chainCompressCode,
                description: "chain, chain.from_iterable, compress, and islice.",
              },
              {
                filename: "institutional_multicampus_roundrobin_scheduler.py",
                code: schedulerEngineCode,
                description: "round-robin proctor rotation, sequential roll numbers, and islice pagination.",
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
                <span>❌</span> Trap 1: Silent Truncation in Standard `zip()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">zip([1, 2, 3], ['a'])</code> silently drops elements 2 and 3 without raising any error.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> In Python 3.10+, always specify <code className="text-emerald-300">strict=True</code> or use <code className="text-emerald-300">zip_longest()</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Unbounded Infinite Iterators Materialization
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Passing <code className="text-amber-300 font-mono">list(itertools.count())</code> or <code className="text-amber-300 font-mono">list(itertools.cycle([1, 2]))</code> causes an infinite loop that crashes the process with MemoryError.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always bound infinite streams with <code className="text-emerald-300">itertools.islice()</code> or finite <code className="text-emerald-300">zip()</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Unsorted Data with `itertools.groupby()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-purple-300 font-mono">itertools.groupby()</code> only aggregates consecutive matching keys. If unsorted, identical keys will be fragmented across multiple separate groups!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always pre-sort input data: <code className="text-emerald-300">sorted(data, key=keyfunc)</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Quadratic List Concatenation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Concatenating lists with <code className="text-cyan-300 font-mono">L1 + L2 + L3</code> creates intermediate copies on every step, yielding terrible O(N²) time.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">itertools.chain.from_iterable()</code> for linear O(N) flattening.
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
            Comprehensive question-and-answer repository covering zip, strict zip, itertools count, cycle, repeat, chain, compress, and islice:
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
            Download or print the complete reference sheet with zip pairing patterns, infinite stream recipes, and itertools flattening templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic5_zip_and_itertools_notes.txt"
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
