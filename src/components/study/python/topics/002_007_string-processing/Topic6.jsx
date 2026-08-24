import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import joinBasics from "./topic6_files/join_basics_and_delimiters.py?raw";
import typeCasting from "./topic6_files/iterables_and_type_casting.py?raw";
import memoryPerf from "./topic6_files/performance_and_memory_architecture.py?raw";
import reportBuilder from "./topic6_files/log_exporter_and_report_builder.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Joining Lists of Strings with join()
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("memory");

  // Playground State
  const [inputItemsStr, setInputItemsStr] = useState("Barrackpore, Kolkata, Shyamnagar, Sodepur");
  const [delimiter, setDelimiter] = useState(", ");
  const [wrapperFormat, setWrapperFormat] = useState("none"); // none, brackets, quotes, html

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

  // Helper to compute playground output
  const computePlaygroundOutput = () => {
    const rawList = inputItemsStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const formattedList = rawList.map((item) => {
      if (wrapperFormat === "quotes") return `"${item}"`;
      if (wrapperFormat === "brackets") return `[${item}]`;
      if (wrapperFormat === "html") return `<li>${item}</li>`;
      if (wrapperFormat === "sql") return `'${item}'`;
      return item;
    });

    const joinedResult = formattedList.join(delimiter);

    let pyExpr = "";
    if (wrapperFormat === "none") {
      pyExpr = `${JSON.stringify(delimiter)}.join(items)`;
    } else if (wrapperFormat === "quotes") {
      pyExpr = `${JSON.stringify(delimiter)}.join(f'"{x}"' for x in items)`;
    } else if (wrapperFormat === "brackets") {
      pyExpr = `${JSON.stringify(delimiter)}.join(f'[{x}]' for x in items)`;
    } else if (wrapperFormat === "html") {
      pyExpr = `${JSON.stringify(delimiter)}.join(f'<li>{x}</li>' for x in items)`;
    } else if (wrapperFormat === "sql") {
      pyExpr = `${JSON.stringify(delimiter)}.join(f"'{x}'" for x in items)`;
    }

    return {
      itemsCount: rawList.length,
      result: joinedResult,
      pythonSnippet: `items = ${JSON.stringify(rawList)}\nresult = ${pyExpr}\nprint(result)`,
      charLength: joinedResult.length,
    };
  };

  const playgroundData = computePlaygroundOutput();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-pink-500/30 selection:text-pink-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowPink {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(236, 72, 153, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.8)); }
        }
        .animate-glow-pink {
          animation: pulseGlowPink 3s infinite ease-in-out;
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-pink-950/80 text-pink-300 px-3 py-1 rounded-full border border-pink-800/80 shadow-sm shadow-pink-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-purple-950/80 text-purple-300 px-3 py-1 rounded-full border border-purple-800/80 shadow-sm shadow-purple-950/50">
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Joining Lists of Strings with <code className="text-pink-400 font-mono">delimiter.join()</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master high-performance <span className="text-emerald-400 font-semibold">O(N)</span> sequence stitching, design polymorphism (why <code className="text-pink-300 font-mono">str.join</code> instead of <code className="text-rose-400 font-mono">list.join</code>), defensive type casting (<code className="text-cyan-400 font-mono">map(str, ...)</code>), and CPython memory allocation mechanics.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ O(N) Linear Time (CPython 2-Pass C memcpy)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Defensive Type Casting (map &amp; generator)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Strict Between-Item Delimiter Invariant
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📑 CSV, Markdown, SQL &amp; HTML Exporters
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CORE SYNTAX & DESIGN RATIONALE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧵</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Anatomy &amp; Design Rationale of `delimiter.join()`
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, joining a collection of strings is executed by calling <code className="text-pink-400 font-mono">"separator".join(iterable)</code>. Beginners often wonder why it isn't <code className="text-rose-400 font-mono">my_list.join(", ")</code>. Python's designers intentionally placed <code className="text-pink-300 font-mono">join()</code> on the <strong className="text-white">string class</strong> for three crucial architectural reasons:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-5 rounded-xl bg-pink-950/40 border border-pink-800/60 shadow-lg shadow-pink-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-pink-500">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-lg mb-2">
                  <span>🔄</span> Universal Polymorphism
                </div>
                <p className="text-sm text-slate-300">
                  <code className="text-pink-300 font-mono">join()</code> works seamlessly with <strong>ANY iterable</strong> (lists, tuples, sets, dictionaries, generators, open file lines), not just lists!
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-2">
                  <span>🔒</span> Guaranteed Type Safety
                </div>
                <p className="text-sm text-slate-300">
                  Because the method belongs to <code className="text-cyan-300 font-mono">str</code>, Python is guaranteed that the separator itself is a valid string instance before processing.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>🧼</span> Zero Redundancy (DRY)
                </div>
                <p className="text-sm text-slate-300">
                  Avoids duplicating the exact same join implementation across <code className="text-emerald-300 font-mono">list</code>, <code className="text-emerald-300 font-mono">tuple</code>, <code className="text-emerald-300 font-mono">set</code>, and <code className="text-emerald-300 font-mono">dict</code> classes.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-pink-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                The Delimiter Placement Invariant
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                • <strong className="text-emerald-400">Strictly Between Elements:</strong> The separator is inserted strictly between adjacent items (<code className="text-emerald-300 font-mono">N - 1</code> delimiters for <code className="text-emerald-300 font-mono">N</code> items).
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-1">
                • <strong className="text-cyan-400">No Edge Leftovers:</strong> Joining an empty list <code className="text-cyan-300 font-mono">[]</code> yields <code className="text-cyan-300 font-mono">""</code>. Joining a single element <code className="text-cyan-300 font-mono">['A']</code> yields <code className="text-cyan-300 font-mono">'A'</code> without any leading or trailing commas.
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
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Memory Allocation &amp; Complexity
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("memory")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memory"
                    ? "bg-pink-900/50 text-pink-300 border border-pink-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                O(N) vs O(N²) Memory
              </button>
              <button
                onClick={() => setActiveInteractiveTab("placement")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "placement"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Delimiter Placement
              </button>
              <button
                onClick={() => setActiveInteractiveTab("polymorphism")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "polymorphism"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Iterable Polymorphism
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Exploring CPython internal allocation pipelines, delimiter insertion, and collection processing:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "memory" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#34d399" fontSize="14" fontWeight="bold">CPYTHON TWO-PASS join() [O(N)] VS LOOP += [O(N²)]</text>

                {/* Left: join() Two-Pass */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="250" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="14" fontWeight="bold">1. delimiter.join(list) [O(N) Linear]</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="12">• <tspan fill="#34d399" fontWeight="bold">Pass 1:</tspan> Scans list in C, sums total byte size.</text>
                  <text x="20" y="80" fill="#f8fafc" fontSize="12">• <tspan fill="#34d399" fontWeight="bold">Alloc:</tspan> Allocates EXACTLY 1 heap buffer block.</text>
                  <text x="20" y="105" fill="#f8fafc" fontSize="12">• <tspan fill="#34d399" fontWeight="bold">Pass 2:</tspan> Copies all chars directly with native memcpy.</text>

                  <rect x="20" y="130" width="350" height="95" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="160" fill="#a7f3d0" fontSize="13" fontWeight="bold">Single Heap Block Allocation:</text>
                  <text x="35" y="185" fill="#ecfdf5" fontSize="12" fontStyle="italic">"Barrackpore, Kolkata, Shyamnagar"</text>
                  <text x="35" y="210" fill="#34d399" fontSize="11" fontWeight="bold">Zero intermediate string object reallocations!</text>
                </g>

                {/* Right: += Loop Nightmare */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="250" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#fda4af" fontSize="14" fontWeight="bold">2. str += in loop [O(N²) Quadratic]</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="12">• Step 1: Allocates "A" + copies.</text>
                  <text x="20" y="80" fill="#f8fafc" fontSize="12">• Step 2: Allocates "A, B" + copies "A" + copies "B".</text>
                  <text x="20" y="105" fill="#f8fafc" fontSize="12">• Step 3: Allocates "A, B, C" + copies "A, B" + "C"...</text>

                  <rect x="20" y="130" width="350" height="95" rx="6" fill="#881337" stroke="#e11d48" />
                  <text x="35" y="160" fill="#fecdd3" fontSize="13" fontWeight="bold">Repeated Garbage Reallocation:</text>
                  <text x="35" y="185" fill="#ffe4e6" fontSize="12">Copies 1L + 2L + 3L + ... + NL bytes!</text>
                  <text x="35" y="210" fill="#fca5a5" fontSize="11" fontWeight="bold">40x - 100x slower on large lists!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "placement" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">DELIMITER PLACEMENT INVARIANT: STRICTLY BETWEEN ELEMENTS</text>

                {/* Case 1: Multi Elements */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="75" rx="8" fill="#1e293b" stroke="#0284c7" />
                  <text x="20" y="28" fill="#38bdf8" fontSize="13" fontWeight="bold">Case 1: Multi-Item List: ", ".join(["A", "B", "C"])</text>
                  <g transform="translate(20, 38)">
                    <rect x="0" y="0" width="60" height="26" rx="4" fill="#082f49" stroke="#38bdf8" /><text x="30" y="18" fill="#f8fafc" fontSize="12" textAnchor="middle">"A"</text>
                    <text x="75" y="18" fill="#f43f5e" fontSize="14" fontWeight="bold">, </text>
                    <rect x="90" y="0" width="60" height="26" rx="4" fill="#082f49" stroke="#38bdf8" /><text x="120" y="18" fill="#f8fafc" fontSize="12" textAnchor="middle">"B"</text>
                    <text x="165" y="18" fill="#f43f5e" fontSize="14" fontWeight="bold">, </text>
                    <rect x="180" y="0" width="60" height="26" rx="4" fill="#082f49" stroke="#38bdf8" /><text x="210" y="18" fill="#f8fafc" fontSize="12" textAnchor="middle">"C"</text>
                    <text x="260" y="18" fill="#34d399" fontSize="12">→ Output: "A, B, C" (2 commas for 3 elements)</text>
                  </g>
                </g>

                {/* Case 2: Single Element */}
                <g transform="translate(30, 140)">
                  <rect x="0" y="0" width="810" height="75" rx="8" fill="#1e293b" stroke="#0284c7" />
                  <text x="20" y="28" fill="#38bdf8" fontSize="13" fontWeight="bold">Case 2: Single-Item List: ", ".join(["Barrackpore"])</text>
                  <g transform="translate(20, 38)">
                    <rect x="0" y="0" width="120" height="26" rx="4" fill="#082f49" stroke="#38bdf8" /><text x="60" y="18" fill="#f8fafc" fontSize="12" textAnchor="middle">"Barrackpore"</text>
                    <text x="140" y="18" fill="#34d399" fontSize="12">→ Output: "Barrackpore" (Zero comma added! Clean single value)</text>
                  </g>
                </g>

                {/* Case 3: Empty List */}
                <g transform="translate(30, 230)">
                  <rect x="0" y="0" width="810" height="75" rx="8" fill="#1e293b" stroke="#0284c7" />
                  <text x="20" y="28" fill="#38bdf8" fontSize="13" fontWeight="bold">Case 3: Empty List: ", ".join([])</text>
                  <text x="20" y="55" fill="#34d399" fontSize="13">→ Output: "" (Empty string - perfectly safe no-op)</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ITERABLE POLYMORPHISM: JOINING DIVERSE PYTHON STRUCTURES</text>

                <g transform="translate(30, 50)">
                  {/* Tuple */}
                  <rect x="0" y="0" width="390" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="20" y="25" fill="#c7d2fe" fontSize="13" fontWeight="bold">Tuple : ", ".join(("22.76 N", "88.36 E"))</text>
                  <text x="20" y="52" fill="#a7f3d0" fontSize="14">"22.76 N, 88.36 E"</text>

                  {/* Dictionary Keys */}
                  <rect x="420" y="0" width="390" height="75" rx="8" fill="#3b0764" stroke="#a855f7" />
                  <text x="440" y="25" fill="#e9d5ff" fontSize="13" fontWeight="bold">Dictionary Keys : ", ".join(student_dict)</text>
                  <text x="440" y="52" fill="#a7f3d0" fontSize="14">"name, course, city" (Keys by default!)</text>

                  {/* Generator */}
                  <rect x="0" y="90" width="390" height="75" rx="8" fill="#0c4a6e" stroke="#0ea5e9" />
                  <text x="20" y="115" fill="#bae6fd" fontSize="13" fontWeight="bold">Generator : "-".join(f"0x&#123;x:02X&#125;" for x in range(4))</text>
                  <text x="20" y="142" fill="#a7f3d0" fontSize="14">"0x00-0x01-0x02-0x03"</text>

                  {/* Set (Sorted) */}
                  <rect x="420" y="90" width="390" height="75" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="440" y="115" fill="#a7f3d0" fontSize="13" fontWeight="bold">Sorted Set : " | ".join(sorted(skills_set))</text>
                  <text x="440" y="142" fill="#a7f3d0" fontSize="14">"Pandas | Python | SQL"</text>

                  {/* Characters */}
                  <rect x="0" y="180" width="810" height="65" rx="8" fill="#090d16" stroke="#334155" />
                  <text x="20" y="205" fill="#38bdf8" fontSize="13" fontWeight="bold">String as Char Iterable : "-".join("PYTHON")</text>
                  <text x="20" y="228" fill="#cbd5e1" fontSize="13">"P-Y-T-H-O-N" (Strings are sequences of 1-character elements)</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE JOIN PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive String Join Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Customize the elements list, choose or type a delimiter, and select formatting wrappers to see live Python <code className="text-pink-300 font-mono">delimiter.join()</code> code and output:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Controls */}
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Input Elements (Comma-Separated)
                </label>
                <textarea
                  value={inputItemsStr}
                  onChange={(e) => setInputItemsStr(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Delimiter Presets */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Choose Delimiter Separator
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[
                    { val: ", ", label: "Comma ', '" },
                    { val: "-", label: "Hyphen '-'" },
                    { val: " | ", label: "Pipe ' | '" },
                    { val: "\n", label: "Newline '\\n'" },
                    { val: "", label: "Empty ''" },
                    { val: " -> ", label: "Arrow ' -> '" },
                    { val: "/", label: "Slash '/'" },
                    { val: " & ", label: "And ' & '" },
                  ].map((btn) => (
                    <button
                      key={btn.val}
                      onClick={() => setDelimiter(btn.val)}
                      className={clsx(
                        "py-1.5 px-2 rounded-lg text-xs font-mono border transition-all text-center",
                        delimiter === btn.val
                          ? "bg-pink-950 border-pink-500 text-pink-300 shadow font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-mono text-slate-400">Custom:</span>
                  <input
                    type="text"
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-xs text-pink-300"
                  />
                </div>
              </div>

              {/* Wrapper Formats */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Element Wrapper Style
                </label>
                <div className="flex gap-2">
                  {[
                    { id: "none", label: "Raw item" },
                    { id: "quotes", label: '"item"' },
                    { id: "brackets", label: "[item]" },
                    { id: "sql", label: "'item'" },
                    { id: "html", label: "<li>item</li>" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setWrapperFormat(btn.id)}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-mono border transition-all text-center",
                        wrapperFormat === btn.id
                          ? "bg-purple-950 border-purple-500 text-purple-300 font-bold shadow"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Generated Python Code
                  </span>
                  <span className="text-xs font-mono text-pink-400 font-bold">
                    {playgroundData.itemsCount} Elements
                  </span>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-pink-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                  {playgroundData.pythonSnippet}
                </pre>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Rendered String Output
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Length: {playgroundData.charLength} chars
                  </span>
                </div>
                <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap font-bold max-h-40">
                  {playgroundData.result}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: COMPLETE JOIN REFERENCE TABLE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master String Join Cheat Sheet &amp; Recipes
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Recipe Name</th>
                  <th className="py-3.5 px-4 font-bold">Python Expression</th>
                  <th className="py-3.5 px-4 font-bold">Sample Input</th>
                  <th className="py-3.5 px-4 font-bold">Output String</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-200">CSV Row</td>
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">','.join(items)</td>
                  <td className="py-3 px-4 font-mono">['101', 'Susmita', '96.5']</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'101,Susmita,96.5'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-200">Type Cast Numbers</td>
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">', '.join(map(str, nums))</td>
                  <td className="py-3 px-4 font-mono">[95, 88, 100]</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'95, 88, 100'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-200">URL Query String</td>
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">'&amp;'.join(f'&#123;k&#125;=&#123;v&#125;' for k,v in d.items())</td>
                  <td className="py-3 px-4 font-mono">&#123;'q': 'python', 'page': 1&#125;</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'q=python&amp;page=1'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-200">SQL IN Clause</td>
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">', '.join(f"'{x}'" for x in cities)</td>
                  <td className="py-3 px-4 font-mono">['Kolkata', 'Barrackpore']</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">"'Kolkata', 'Barrackpore'"</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-200">Multi-Line Bullets</td>
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">'\n'.join(f'• &#123;x&#125;' for x in list)</td>
                  <td className="py-3 px-4 font-mono">['Item 1', 'Item 2']</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'• Item 1\n• Item 2'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-200">Character Spacing</td>
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">'-'.join('PYTHON')</td>
                  <td className="py-3 px-4 font-mono">'PYTHON'</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'P-Y-T-H-O-N'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-200">Filtered Non-Empty</td>
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">', '.join(x for x in list if x)</td>
                  <td className="py-3 px-4 font-mono">['A', '', 'B', '']</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'A, B'</td>
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
            Explore 4 production-grade Python scripts demonstrating join fundamentals, defensive type casting, CPython two-pass memory benchmarks, and multi-format document generators:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "join_basics_and_delimiters.py",
                code: joinBasics,
                description: "delimiter.join fundamentals, edge cases (empty list, single element), and design rationale.",
              },
              {
                filename: "iterables_and_type_casting.py",
                code: typeCasting,
                description: "Defensive type casting (map & generators), dictionary key/value joining, and SQL/URL builders.",
              },
              {
                filename: "performance_and_memory_architecture.py",
                code: memoryPerf,
                description: "CPython two-pass memcpy algorithm and 20,000-item benchmark (join vs loop += vs StringIO).",
              },
              {
                filename: "log_exporter_and_report_builder.py",
                code: reportBuilder,
                description: "Production report builder exporting CSV tables, Markdown tables, bulk SQL inserts, and HTML lists.",
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
                <span>❌</span> Trap 1: Calling `my_list.join(", ")`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">my_list.join(", ")</code> raises <code className="text-rose-300 font-mono">AttributeError: 'list' object has no attribute 'join'</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Call on separator: <code className="text-emerald-300">", ".join(my_list)</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Joining Non-String Data Types Directly
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">", ".join([10, 20, 30])</code> crashes with <code className="text-amber-300 font-mono">TypeError: sequence item 0: expected str instance, int found</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">", ".join(map(str, nums))</code>
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Building Strings with `+=` in Loops
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-purple-300 font-mono">s += row</code> in a loop creates an <code className="text-purple-300 font-mono">O(N²)</code> bottleneck by reallocating the whole string on every step.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Collect in list, then call <code className="text-emerald-300">"\n".join(rows)</code>!
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Dictionary Key Surprise
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-cyan-300 font-mono">", ".join(my_dict)</code> joins the dictionary's <strong>KEYS</strong>, not its values.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> For values, write <code className="text-emerald-300">", ".join(my_dict.values())</code>
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
            Comprehensive question-and-answer repository covering delimiter mechanics, design rationale, memory architecture, and defensive type casting:
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
            Download or print the complete reference sheet with delimiter placement invariants, CPython memory diagrams, and report exporter recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic6_joining_strings_notes.txt"
              title="Print Topic 6 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
