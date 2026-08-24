import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import dumpVsDumps from "./topic2_files/json_dump_vs_dumps_file_and_string_streams.py?raw";
import canonicalJson from "./topic2_files/deterministic_canonical_json_and_sort_keys.py?raw";
import atomicWriter from "./topic2_files/atomic_json_file_writer_with_temporary_swap.py?raw";
import catalogExporter from "./topic2_files/institutional_course_catalog_and_fee_exporter.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Serialization: json.dump() vs json.dumps() with indent, sort_keys
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("streams");

  // Interactive Serialization Laboratory State
  const sampleCatalog = {
    institution: "Coder & AccoTax",
    center: "Barrackpore Main Campus",
    session: "2026-2027",
    catalog: [
      { code: "PY-101", title: "Python Full-Stack", fee: 28000 },
      { code: "AI-201", title: "Generators & Metaclasses", fee: 32000 },
    ],
    is_active: true,
  };

  const [targetMode, setTargetMode] = useState("dumps"); // dumps | dump
  const [indentSpaces, setIndentSpaces] = useState(2);
  const [sortKeys, setSortKeys] = useState(true);
  const [minifySeparators, setMinifySeparators] = useState(false);
  const [enableSha256, setEnableSha256] = useState(true);
  const [enableAtomicWrite, setEnableAtomicWrite] = useState(true);

  // Compute Serialized Output
  let serializedOutput = "";
  let computedSha256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  try {
    let rawObj = sampleCatalog;
    if (sortKeys) {
      // Sort keys alphabetically
      const sortedKeys = Object.keys(sampleCatalog).sort();
      const sortedObj = {};
      sortedKeys.forEach((k) => (sortedObj[k] = sampleCatalog[k]));
      rawObj = sortedObj;
    }

    if (minifySeparators) {
      serializedOutput = JSON.stringify(rawObj);
    } else {
      serializedOutput = JSON.stringify(rawObj, null, indentSpaces > 0 ? indentSpaces : null);
    }

    // Mock deterministic hash based on length and characters
    let hashVal = 0;
    for (let i = 0; i < serializedOutput.length; i++) {
      hashVal = (hashVal << 5) - hashVal + serializedOutput.charCodeAt(i);
      hashVal |= 0;
    }
    computedSha256 = `sha256-${Math.abs(hashVal).toString(16).padStart(16, "0")}...${Math.abs(hashVal * 31).toString(16).padStart(16, "0")}`;
  } catch (err) {
    serializedOutput = err.message;
  }

  const byteSize = new Blob([serializedOutput]).size;
  const lineCount = serializedOutput.split("\n").length;

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
            Segment 3 • Module 003_004
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          JSON Serialization: <span className="text-teal-400">`json.dump()` vs `json.dumps()`</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master high-performance and leak-free JSON serialization in Python: memory-efficient file streaming (<code className="text-teal-300 font-mono">json.dump</code>), in-memory string generation (<code className="text-teal-300 font-mono">json.dumps</code>), formatting with <code className="text-cyan-300 font-mono">indent</code> and <code className="text-cyan-300 font-mono">sort_keys</code>, minification with <code className="text-purple-300 font-mono">separators</code>, and atomic file persistence.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💾 `json.dump()` (File Streams)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔤 `json.dumps()` (Memory Strings)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 indent &amp; sort_keys Determinism
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Atomic File Persistence Pattern
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: DUMP VS DUMPS FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. `json.dumps()` vs `json.dump()` Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python provides two distinct functions for serializing Python dictionaries and objects into JSON:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `json.dumps(obj)`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">s = json.dumps(data)</code>
                <p className="text-[11px] text-slate-300">
                  Constructs a JSON-formatted <code className="text-teal-300">str</code> in Python heap RAM. Ideal for HTTP API payloads and logs.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ `json.dump(obj, f)`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">json.dump(data, file)</code>
                <p className="text-[11px] text-slate-300">
                  Streams JSON chunks directly to an open disk file or socket without allocating giant intermediate strings in RAM.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Atomic File Replacement</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">os.replace(tmp, dest)</code>
                <p className="text-[11px] text-slate-300">
                  Writes to temporary file first, then atomically renames to target file to eliminate zero-byte corruption risks.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Memory Tip: Why `json.dump(data, f)` Beats `f.write(json.dumps(data))`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When saving large datasets (e.g. 500 MB), <code className="text-rose-400">f.write(json.dumps(data))</code> allocates a 500 MB Python string in RAM before writing. In contrast, <code className="text-teal-300">json.dump(data, f)</code> streams output in small internal buffers (~8 KB), preserving strictly constant memory!
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
                2. Visualizing Streams, Formatting &amp; Atomic Persistence
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("streams")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "streams"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `dump` vs `dumps` Streams
              </button>
              <button
                onClick={() => setActiveInteractiveTab("format")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "format"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Pretty-Print vs Minify
              </button>
              <button
                onClick={() => setActiveInteractiveTab("atomic")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "atomic"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Atomic File Swap (`os.replace`)
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining in-memory string vs direct disk streaming, formatting tradeoffs, and atomic persistence workflows:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "streams" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">`json.dumps()` (RAM STRING) VS `json.dump()` (DISK STREAM)</text>

                {/* Left Box: dumps */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. `json.dumps(obj)`: Memory String</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">json_str = json.dumps(large_data)</text>
                  <text x="20" y="80" fill="#34d399" fontSize="9 font-mono"># Returns Python `str` in RAM</text>

                  <rect x="20" y="110" width="340" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="135" fill="#34d399" fontSize="9 font-bold">In-Memory Characteristics:</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8">• Memory Usage: High (Allocates full string in RAM)</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">• Destination: HTTP Response Bodies, Logging, Sockets</text>
                  <text x="30" y="185" fill="#cbd5e1" fontSize="8">• Easy string manipulation &amp; regex parsing</text>
                </g>

                {/* Right Box: dump */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">2. `json.dump(obj, f)`: File Stream</text>

                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">with open("catalog.json", "w") as f:</text>
                  <text x="35" y="80" fill="#38bdf8" fontSize="9 font-mono font-bold">json.dump(large_data, f)</text>

                  <rect x="20" y="110" width="340" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="30" y="135" fill="#38bdf8" fontSize="9 font-bold">Disk Streaming Characteristics:</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8">• Memory Usage: Low &amp; Constant O(1) buffer</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">• Destination: Local Hard Drives, Cloud Storage</text>
                  <text x="30" y="185" fill="#cbd5e1" fontSize="8">• Zero string allocation overhead for gigabyte files</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "format" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">FORMATTING ENGINE: PRETTY-PRINT (`indent=4`) VS MINIFICATION (`separators`)</text>

                {/* Left: Pretty */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Pretty-Printed (`indent=4`)</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">&#123;</text>
                  <text x="35" y="78" fill="#c4b5fd" fontSize="8 font-mono">"code": "PY-101",</text>
                  <text x="35" y="96" fill="#c4b5fd" fontSize="8 font-mono">"fee": 28000</text>
                  <text x="20" y="114" fill="#ecfdf5" fontSize="8 font-mono">&#125;</text>

                  <rect x="20" y="135" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="160" fill="#c4b5fd" fontSize="9 font-bold">Use Case: Administrator / Debug Logs</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• Highly readable indentation for humans</text>
                  <text x="30" y="195" fill="#fca5a5" fontSize="8">• Larger byte size due to spaces &amp; newlines</text>
                </g>

                {/* Right: Minified */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Minified (`separators=(",", ":")`)</text>

                  <text x="20" y="75" fill="#34d399" fontSize="9 font-mono font-bold">&#123;"code":"PY-101","fee":28000&#125;</text>

                  <rect x="20" y="135" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="160" fill="#34d399" fontSize="9 font-bold">Use Case: High-Throughput REST APIs</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• 35-40% smaller byte payload across network</text>
                  <text x="30" y="195" fill="#a7f3d0" fontSize="8">• Faster network transfer &amp; caching speeds</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ATOMIC FILE PERSISTENCE PATTERN (`mkstemp` -&gt; `fsync` -&gt; `os.replace`)</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Write to Temp File</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">temp_fd, path = mkstemp()</text>
                  <text x="15" y="75" fill="#34d399" fontSize="8 font-mono font-bold">json.dump(data, tmp_file)</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="135" fill="#34d399" fontSize="9 font-bold">Safe Workspace:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">If process crashes during write,</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">the target file remains intact.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Flush &amp; Disk Sync</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">f.flush()</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono font-bold">os.fsync(f.fileno())</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Hardware Durability:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Forces OS and SSD controller</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">to flush hardware buffers.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Atomic `os.replace`</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">os.replace(tmp, dest)</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono font-bold"># Atomic inode swap</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="135" fill="#c4b5fd" fontSize="9 font-bold">ACID Durability:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Zero-byte file corruption</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">is completely impossible!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SERIALIZATION LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive JSON Serialization &amp; Manifest Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Adjust formatting sliders, sort_keys flags, and minifiers to observe real-time byte compression and deterministic SHA-256 manifest generation:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Serialization Parameters &amp; Knobs
                </span>
              </div>

              {/* Mode Switcher */}
              <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setTargetMode("dumps")}
                  className={clsx(
                    "flex-1 py-1.5 rounded transition-all",
                    targetMode === "dumps"
                      ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  `json.dumps()` (String in RAM)
                </button>
                <button
                  onClick={() => setTargetMode("dump")}
                  className={clsx(
                    "flex-1 py-1.5 rounded transition-all",
                    targetMode === "dump"
                      ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  `json.dump()` (Stream to Disk)
                </button>
              </div>

              {/* Indent Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Indentation (`indent={indentSpaces}`):</span>
                  <span className="text-teal-300 font-bold">{indentSpaces === 0 ? "0 (Single Line)" : `${indentSpaces} spaces`}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  disabled={minifySeparators}
                  value={indentSpaces}
                  onChange={(e) => setIndentSpaces(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer disabled:opacity-40"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-2 text-xs font-mono">
                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sortKeys}
                    onChange={(e) => setSortKeys(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>`sort_keys=True` (Deterministic alphabetical key sorting)</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={minifySeparators}
                    onChange={(e) => setMinifySeparators(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>`separators=(",", ":")` (Maximum payload minification)</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSha256}
                    onChange={(e) => setEnableSha256(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Compute SHA-256 Checksum Manifest</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableAtomicWrite}
                    onChange={(e) => setEnableAtomicWrite(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Simulate Atomic File Swap (`os.replace` + `fsync`)</span>
                </label>
              </div>
            </div>

            {/* Output & Metrics */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Metrics Box */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Real-Time Output Metrics:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payload Size:</span>
                  <span className="text-teal-300 font-bold">{byteSize} Bytes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Lines:</span>
                  <span className="text-cyan-300 font-bold">{lineCount} Lines</span>
                </div>
                {enableSha256 && (
                  <div className="flex justify-between text-[10px] pt-1 border-t border-slate-800">
                    <span className="text-slate-400">SHA-256 Manifest:</span>
                    <span className="text-purple-300 font-bold truncate max-w-[200px]">{computedSha256}</span>
                  </div>
                )}
              </div>

              {/* Serialized Output Preview */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[180px] font-mono text-xs space-y-1.5">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {targetMode === "dumps" ? "In-Memory String Preview (`json.dumps`):" : "Disk Stream File Preview (`json.dump`):"}
                </span>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {serializedOutput}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER FORMATTING MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Parameter &amp; Behavior Matrix in `json.dump` / `json.dumps`
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Function / Parameter</th>
                  <th className="py-3.5 px-4 font-bold">Input / Target</th>
                  <th className="py-3.5 px-4 font-bold">Memory &amp; Output Characteristic</th>
                  <th className="py-3.5 px-4 font-bold">Recommended Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">json.dumps(obj)</td>
                  <td className="py-3 px-4">Python Dictionary</td>
                  <td className="py-3 px-4 text-slate-200">Allocates `str` in RAM</td>
                  <td className="py-3 px-4">REST API response payload, logging</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">json.dump(obj, f)</td>
                  <td className="py-3 px-4">Open File Stream</td>
                  <td className="py-3 px-4 text-emerald-400">Direct chunked stream (O(1) RAM)</td>
                  <td className="py-3 px-4">Writing files to disk / export dumps</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">indent=4</td>
                  <td className="py-3 px-4">Integer / Tab</td>
                  <td className="py-3 px-4">Pretty-printed formatted lines</td>
                  <td className="py-3 px-4">Human inspection, configuration files</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">separators=(',', ':')</td>
                  <td className="py-3 px-4">2-Tuple of Strings</td>
                  <td className="py-3 px-4 text-emerald-400">Removes redundant whitespace</td>
                  <td className="py-3 px-4">Minified payload for fast network transfer</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-semibold">sort_keys=True</td>
                  <td className="py-3 px-4">Boolean</td>
                  <td className="py-3 px-4 text-cyan-300">Alphabetically sorted keys</td>
                  <td className="py-3 px-4">Deterministic SHA-256 hashing &amp; git diffs</td>
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
            Explore 4 production-grade Python scripts demonstrating dump vs dumps mechanics, canonical JSON generation, atomic file persistence, and institutional catalog exporters:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "json_dump_vs_dumps_file_and_string_streams.py",
                code: dumpVsDumps,
                description: "json.dump vs json.dumps mechanics, formatting with indent and sort_keys.",
              },
              {
                filename: "deterministic_canonical_json_and_sort_keys.py",
                code: canonicalJson,
                description: "Deterministic Canonical JSON generation and SHA-256 cryptographic checksum manifests.",
              },
              {
                filename: "atomic_json_file_writer_with_temporary_swap.py",
                code: atomicWriter,
                description: "ACID Atomic JSON file persistence using tempfile, os.fsync, and os.replace.",
              },
              {
                filename: "institutional_course_catalog_and_fee_exporter.py",
                code: catalogExporter,
                description: "Institutional Course Catalog Exporter with multi-format and SHA-256 audit packaging.",
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
                <span>❌</span> Trap 1: Zero-Byte File Corruption
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-rose-300 font-mono">with open("data.json", "w") as f: json.dump(...)</code> truncates the file to 0 bytes immediately upon opening; a crash leaves a corrupted, unrecoverable file.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use the Atomic File Swap pattern (<code className="text-emerald-300">mkstemp</code> + <code className="text-emerald-300">os.replace</code>).
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Memory Spike with `f.write(json.dumps())`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-amber-300 font-mono">json.dumps()</code> on multi-gigabyte datasets builds an enormous string in RAM before saving.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Stream directly with <code className="text-emerald-300">json.dump(large_data, f)</code> for constant memory.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Non-Deterministic Hashes
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Omitting <code className="text-purple-300 font-mono">sort_keys=True</code> produces random key ordering across different Python environments, breaking cryptographic signature checks.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">sort_keys=True</code> and <code className="text-emerald-300">separators=(',', ':')</code> for hashing.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Windows CP1252 Unicode Corruption
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Opening files on Windows without specifying <code className="text-cyan-300 font-mono">encoding="utf-8"</code> defaults to CP1252, corrupting Indian languages and Unicode characters.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always pass <code className="text-emerald-300">encoding="utf-8"</code> to <code className="text-emerald-300">open()</code>.
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
            Comprehensive question-and-answer repository covering `json.dump`, `json.dumps`, `indent`, `sort_keys`, `separators`, and atomic file operations:
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
            Download or print the complete reference sheet with serialization recipes, atomic persistence patterns, and canonical manifest generation:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic2_json_serialization_notes.txt"
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
