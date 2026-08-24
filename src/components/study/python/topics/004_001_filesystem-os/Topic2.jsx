import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import walkMechanicsCode from "./topic2_files/os_walk_tree_traversal_mechanics.py?raw";
import scandirCode from "./topic2_files/os_scandir_high_performance_iterator.py?raw";
import globFnmatchCode from "./topic2_files/glob_and_fnmatch_pattern_matching.py?raw";
import treeCrawlerCode from "./topic2_files/institutional_multicampus_tree_crawler_and_indexer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Directory traversal: os.walk(), scandir(), and glob patterns
 * Module: 004_001_filesystem-os
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("walkTuple");

  // Interactive Laboratory State
  const [isTopDown, setIsTopDown] = useState(true);
  const [pruneCaches, setPruneCaches] = useState(true);
  const [pruneArchives, setPruneArchives] = useState(true);
  const [filePattern, setFilePattern] = useState("*.pdf"); // *.pdf | *.json | *.csv | *.*

  // Mock multi-campus tree structure
  const rawTreeNodes = [
    { dir: "barrackpore/py_ai_2026", files: ["stu_101.pdf", "stu_101.json", "scores.csv"], size: 45200, isPruned: false },
    { dir: "barrackpore/__pycache__", files: ["module.cpython-313.pyc"], size: 12400, isCache: true },
    { dir: "barrackpore/archive_2025", files: ["legacy_ledger.csv", "archive.zip"], size: 184000, isArchive: true },
    { dir: "kolkata/ds_ml_2026", files: ["stu_102.pdf", "stu_102.json", "model.pkl"], size: 68100, isPruned: false },
    { dir: "kolkata/.temp_cache", files: ["session.tmp"], size: 4200, isCache: true },
  ];

  // Filter tree nodes based on pruning rules
  const activeTreeNodes = rawTreeNodes.filter((node) => {
    if (pruneCaches && node.isCache) return false;
    if (pruneArchives && node.isArchive) return false;
    return true;
  });

  const prunedCount = rawTreeNodes.length - activeTreeNodes.length;

  // Filter files based on pattern
  const matchesPattern = (filename, pat) => {
    if (pat === "*.*") return true;
    if (pat === "*.pdf") return filename.endsWith(".pdf");
    if (pat === "*.json") return filename.endsWith(".json");
    if (pat === "*.csv") return filename.endsWith(".csv");
    return true;
  };

  const indexedFiles = [];
  let totalStorageBytes = 0;

  activeTreeNodes.forEach((node) => {
    node.files.forEach((f) => {
      if (matchesPattern(f, filePattern)) {
        const size = Math.round(node.size / node.files.length);
        indexedFiles.push({
          dir: node.dir,
          filename: f,
          sizeBytes: size,
        });
        totalStorageBytes += size;
      }
    });
  });

  const generatedPythonCode = `# Recursive walk with in-place pruning and fnmatch:
for root, dirs, files in os.walk(root_dir, topdown=${isTopDown ? "True" : "False"}):
    ${pruneCaches || pruneArchives ? `# IN-PLACE PRUNING INVARIANT:\n    dirs[:] = [d for d in dirs if not (` + (pruneCaches ? "d == '__pycache__' or d.startswith('.')" : "") + (pruneCaches && pruneArchives ? " or " : "") + (pruneArchives ? "d.startswith('archive_')" : "") + ")]" : "# No pruning applied"}
    for f in fnmatch.filter(files, "${filePattern}"):
        print(os.path.join(root, f))`;

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
            Segment 4 • Module 004_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced File Operations, OS &amp; Subprocess Automation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Directory Traversal: <span className="text-teal-400">os.walk(), scandir() &amp; glob</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master recursive filesystem traversal and high-speed directory scanning: unpacking the <code className="text-teal-300 font-mono">(root, dirs, files)</code> 3-tuple, dynamic in-place directory subtree pruning (<code className="text-teal-300 font-mono">dirs[:] = [...]</code>), high-performance scanning with <code className="text-cyan-300 font-mono">os.scandir()</code> and <code className="text-purple-300 font-mono">DirEntry</code> inode caching, and wildcard pattern filtering with <code className="text-amber-300 font-mono">fnmatch</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌳 `os.walk` 3-Tuple
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✂️ In-Place `dirs[:]` Pruning
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ High-Speed `os.scandir()`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 `fnmatch.filter()`
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: TRAVERSAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🗂️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Directory Traversal &amp; Scanning Triad
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Navigating deep filesystem directory hierarchies requires choosing the optimal tool based on tree depth, speed, and pruning requirements:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `os.walk()` Generator</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">for root, dirs, files in ...</code>
                <p className="text-[11px] text-slate-300">
                  Recursive tree crawler. Yields 3-tuple and allows in-place subtree pruning with <code className="text-teal-300 font-mono">dirs[:]</code>.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ `os.scandir()` High-Speed</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">with os.scandir(p) as it:</code>
                <p className="text-[11px] text-slate-300">
                  C-level directory scanning. Caches <code className="text-cyan-300 font-mono">DirEntry</code> inode metadata, avoiding slow <code className="text-cyan-300">stat()</code> calls.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ `glob` &amp; `fnmatch`</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">glob.iglob(), fnmatch.filter()</code>
                <p className="text-[11px] text-slate-300">
                  Unix shell wildcard matching (<code className="text-purple-300 font-mono">*.pdf</code>, <code className="text-purple-300 font-mono">q?</code>) across disk and in-memory lists.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The In-Place Slice Assignment Pruning Rule
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Writing <code className="text-rose-400 font-mono">dirs = [d for d in dirs if d != ".git"]</code> rebinds the local variable and fails to prune! You must mutate the list in-place using slice assignment: <code className="text-teal-300 font-mono">dirs[:] = [d for d in dirs if d != ".git"]</code>.
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
                2. Visualizing Tree Walk Tuples, In-Place Pruning &amp; Scandir Caching
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("walkTuple")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "walkTuple"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `os.walk` 3-Tuple
              </button>
              <button
                onClick={() => setActiveInteractiveTab("pruningFlow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pruningFlow"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                In-Place `dirs[:]` Pruning
              </button>
              <button
                onClick={() => setActiveInteractiveTab("scandirSpeed")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "scandirSpeed"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `os.scandir` Inode Cache
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining tree iteration tuple structures, in-place slice mutation pruning, and cached inode performance:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "walkTuple" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">ANATOMY OF THE `(root, dirs, files)` 3-TUPLE IN `os.walk()`</text>

                {/* 3 Step Decomposition */}
                <g transform="translate(30, 50)">
                  {/* Step 1: root */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. `root` (Current Path)</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">Type: str</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">"barrackpore/py_ai_2026"</text>
                  <text x="15" y="95" fill="#34d399" fontSize="8 font-mono">DIRECTORY NODE</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="140" fill="#34d399" fontSize="9 font-bold">Current Base:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Use `os.path.join(root, f)`</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">to get absolute file paths.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2: dirs */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. `dirs` (Subfolders)</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">Type: List[str]</text>
                  <text x="310" y="75" fill="#ecfdf5" fontSize="8 font-mono font-bold">['batch1', '__pycache__']</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">MUTABLE IN-PLACE</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="140" fill="#38bdf8" fontSize="9 font-bold">Pruning Gateway:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Modify `dirs[:]` in-place to</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">skip recursing into subtrees.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3: files */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. `files` (Filenames)</text>
                  <text x="605" y="55" fill="#c084fc" fontSize="8 font-mono">Type: List[str]</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono font-bold">['stu_101.pdf', 'data.csv']</text>
                  <text x="605" y="95" fill="#ecfdf5" fontSize="8 font-mono">LEAF ASSETS</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="140" fill="#c4b5fd" fontSize="9 font-bold">Direct Filter:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Filter with `fnmatch` or</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">comprehension extensions.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "pruningFlow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">IN-PLACE SUBTREE PRUNING WITH `dirs[:] = [...]`</text>

                {/* Left: Reassignment Failure */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Local Variable Rebinding [FAILS TO PRUNE]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">`dirs = [d for d in dirs if d != '__pycache__']`</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">Rebinds only local variable `dirs` in memory</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">os.walk() Still Traverses '__pycache__'!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Silent Pruning Failure:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Generator still holds reference to original mutable list.</text>
                </g>

                {/* Right: In-place Slice */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">In-Place Slice Assignment [SUCCESSFUL PRUNE]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">`dirs[:] = [d for d in dirs if d != '__pycache__']`</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">Mutates internal list referenced by generator</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">os.walk() Completely Skips '__pycache__'!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">True Subtree Pruning:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Saves millions of disk I/O operations across large trees.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">HIGH-SPEED `os.scandir()` VS `os.listdir() + os.stat()`</text>

                {/* Left: listdir */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Legacy `os.listdir()` + `os.stat()` [SLOW]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">1. `os.listdir()` fetches 10,000 filename strings</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">2. Loop executes 10,000 separate `os.stat()` syscalls</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Total Syscalls: 10,001 System Calls!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Heavy Disk I/O Overhead:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Queries kernel for metadata on every individual file.</text>
                </g>

                {/* Right: scandir */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Modern `os.scandir()` [UP TO 10X FASTER]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">1. Reads directory stream &amp; file metadata in 1 pass</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">2. Yields `DirEntry` objects with CACHED attributes</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Total Syscalls: Only 1 Directory Stream Call!</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">C-Level Attribute Caching:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Retrieves file size and type without extra stat calls.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CRAWLER LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Multi-Campus Storage Tree Crawler &amp; Indexer
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure traversal direction, toggle cache and archive subtree pruning, filter by wildcard extension patterns, and observe live crawler telemetry:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Traversal Direction Toggle */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Traversal Direction (`topdown` parameter):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setIsTopDown(true)}
                    className={clsx(
                      "flex-1 py-1.5 rounded transition-all",
                      isTopDown
                        ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Top-Down (`topdown=True`)
                  </button>
                  <button
                    onClick={() => setIsTopDown(false)}
                    className={clsx(
                      "flex-1 py-1.5 rounded transition-all",
                      !isTopDown
                        ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Bottom-Up (`topdown=False`)
                  </button>
                </div>
              </div>

              {/* In-Place Pruning Toggles */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. In-Place Subtree Pruning (`dirs[:]`):
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                    <input
                      type="checkbox"
                      checked={pruneCaches}
                      onChange={(e) => setPruneCaches(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>Prune Caches (`__pycache__`)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                    <input
                      type="checkbox"
                      checked={pruneArchives}
                      onChange={(e) => setPruneArchives(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>Prune Archives (`archive_*`)</span>
                  </label>
                </div>
              </div>

              {/* Pattern Filter */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  3. Extension Wildcard Pattern (`fnmatch`):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {["*.pdf", "*.json", "*.csv", "*.*"].map((pat) => (
                    <button
                      key={pat}
                      onClick={() => setFilePattern(pat)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        filePattern === pat
                          ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {pat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crawler Telemetry KPIs */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Visited Dirs</div>
                  <div className="text-white font-bold text-base">{activeTreeNodes.length}</div>
                </div>
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg">
                  <div className="text-emerald-400 text-[10px] uppercase">Files Matched</div>
                  <div className="text-emerald-300 font-bold text-base">{indexedFiles.length}</div>
                </div>
                <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-lg">
                  <div className="text-amber-400 text-[10px] uppercase">Pruned Subtrees</div>
                  <div className="text-amber-300 font-bold text-base">{prunedCount}</div>
                </div>
              </div>
            </div>

            {/* Generated Python Pipeline Code & Indexed Asset Catalog */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python os.walk &amp; fnmatch Traversal:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Indexed Files Catalog */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Matched Assets ({indexedFiles.length} records):</span>
                  <span className="text-emerald-400">{(totalStorageBytes / 1024).toFixed(1)} KB Total</span>
                </div>
                {indexedFiles.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-slate-200 border-b border-slate-800/60 pb-0.5">
                    <span>
                      <strong className="text-teal-300">{item.filename}</strong> ({item.dir})
                    </span>
                    <span className="text-slate-400 font-mono">{item.sizeBytes} B</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER DIRECTORY MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Traversal &amp; Scanning Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Function / Protocol</th>
                  <th className="py-3.5 px-4 font-bold">Traversal Scope</th>
                  <th className="py-3.5 px-4 font-bold">Pruning Support</th>
                  <th className="py-3.5 px-4 font-bold">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`os.walk(topdown=True)`</td>
                  <td className="py-3 px-4 text-slate-200">Full Directory Tree</td>
                  <td className="py-3 px-4 text-emerald-400">Yes (`dirs[:] = [...]`)</td>
                  <td className="py-3 px-4">Deep tree crawling with selective exclusions</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`os.scandir(path)`</td>
                  <td className="py-3 px-4 text-slate-200">Single Directory</td>
                  <td className="py-3 px-4 text-slate-400">N/A (Single level)</td>
                  <td className="py-3 px-4 text-emerald-400">Ultra fast scanning with cached inode stats</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`glob.iglob(recursive)`</td>
                  <td className="py-3 px-4 text-slate-200">Wildcard Patterns</td>
                  <td className="py-3 px-4 text-slate-400">No</td>
                  <td className="py-3 px-4">Lazy streaming wildcard pattern searches</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`fnmatch.filter(names)`</td>
                  <td className="py-3 px-4 text-slate-200">In-Memory List</td>
                  <td className="py-3 px-4 text-slate-400">N/A</td>
                  <td className="py-3 px-4">Fast wildcard filtering over pre-collected strings</td>
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
            Explore 4 production-grade Python scripts demonstrating tree traversal, scandir performance benchmarks, glob/fnmatch patterns, and institutional storage tree crawlers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "os_walk_tree_traversal_mechanics.py",
                code: walkMechanicsCode,
                description: "(root, dirs, files) tuples, in-place pruning, and topdown=False.",
              },
              {
                filename: "os_scandir_high_performance_iterator.py",
                code: scandirCode,
                description: "os.scandir, DirEntry caching, and performance benchmarking.",
              },
              {
                filename: "glob_and_fnmatch_pattern_matching.py",
                code: globFnmatchCode,
                description: "glob.glob, glob.iglob, and fnmatch pattern filtering.",
              },
              {
                filename: "institutional_multicampus_tree_crawler_and_indexer.py",
                code: treeCrawlerCode,
                description: "os.walk, os.scandir, in-place pruning, and storage telemetry indexing.",
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
                <span>❌</span> Trap 1: Rebinding `dirs` Variable
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">dirs = [d for d in dirs if d != '.git']</code> rebinds the local variable and fails to prune the walk!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use slice assignment: <code className="text-emerald-300">dirs[:] = [...]</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Infinite Loops with `followlinks=True`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Enabling <code className="text-amber-300 font-mono">followlinks=True</code> on cyclical directory symlinks creates infinite recursive loops.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Track visited device/inode sets: <code className="text-emerald-300">(st_dev, st_ino)</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Top-Down Tree Deletion
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Attempting to delete folders with <code className="text-purple-300 font-mono">topdown=True</code> raises <code className="text-slate-300">OSError: Directory not empty</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">topdown=False</code> or <code className="text-emerald-300">shutil.rmtree()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Slow `os.listdir() + os.stat()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Executing <code className="text-cyan-300 font-mono">os.stat()</code> inside an <code className="text-cyan-300 font-mono">os.listdir()</code> loop issues N separate syscalls.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">os.scandir()</code> for cached <code className="text-emerald-300">DirEntry</code> stats.
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
            Comprehensive question-and-answer repository covering os.walk, in-place pruning, os.scandir caching, glob.iglob, and fnmatch patterns:
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
            Download or print the complete reference sheet with os.walk pruning patterns, scandir optimization templates, and crawler recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic2_directory_traversal_notes.txt"
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
