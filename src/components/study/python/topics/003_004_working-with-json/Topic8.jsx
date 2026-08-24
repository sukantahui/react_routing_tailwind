import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import atomicStore from "./topic8_files/atomic_json_file_store_with_tempfile_replace.py?raw";
import docDatabase from "./topic8_files/thread_safe_json_document_database.py?raw";
import walEngine from "./topic8_files/append_only_ndjson_wal_engine.py?raw";
import registryDb from "./topic8_files/institutional_student_registry_json_database.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic8_files/topic8_note.txt?raw";

// FAQ Questions
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: Building JSON-backed persistent data stores
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic8() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("atomic");

  // Interactive Document Database Laboratory State
  const initialDocs = {
    "STU-101": { student_id: "STU-101", full_name: "Sourav Mukherjee", course_code: "PY-AI", fee_paid: 28500.0, status: "ENROLLED" },
    "STU-102": { student_id: "STU-102", full_name: "Priyanka Sen", course_code: "DS-ML", fee_paid: 32000.0, status: "ENROLLED" },
    "STU-103": { student_id: "STU-103", full_name: "Debolina Roy", course_code: "PY-AI", fee_paid: 28500.0, status: "ENROLLED" },
  };

  const initialWal = [
    { action: "INSERT", doc_id: "STU-101", timestamp: "10:00:01" },
    { action: "INSERT", doc_id: "STU-102", timestamp: "10:00:05" },
    { action: "INSERT", doc_id: "STU-103", timestamp: "10:00:12" },
  ];

  const [documents, setDocuments] = useState(initialDocs);
  const [walLogs, setWalLogs] = useState(initialWal);
  const [selectedCourseQuery, setSelectedCourseQuery] = useState("ALL");
  const [dbStatusMsg, setDbStatusMsg] = useState("Database active. All writes synchronized to in-memory store.");
  const [backupSnapshots, setBackupSnapshots] = useState(["backup_20260824_100000.json"]);
  const [isCompacted, setIsCompacted] = useState(false);

  // Compute Secondary Index (course_code -> array of IDs)
  const courseIndex = {};
  for (const [id, doc] of Object.entries(documents)) {
    if (!courseIndex[doc.course_code]) courseIndex[doc.course_code] = [];
    courseIndex[doc.course_code].push(id);
  }

  const handleInsertStudent = () => {
    if (documents["STU-104"]) {
      setDbStatusMsg("Record 'STU-104' already exists! Primary key violation prevented.");
      return;
    }
    const newDoc = {
      student_id: "STU-104",
      full_name: "Rahul Verma",
      course_code: "FULL-STACK",
      fee_paid: 25000.0,
      status: "ENROLLED",
    };
    setDocuments((prev) => ({ ...prev, "STU-104": newDoc }));
    setWalLogs((prev) => [
      ...prev,
      { action: "INSERT", doc_id: "STU-104", timestamp: new Date().toLocaleTimeString() },
    ]);
    setDbStatusMsg("Inserted 'STU-104' (Rahul Verma). Secondary indices updated and WAL line appended.");
  };

  const handleUpdateStatus = () => {
    if (!documents["STU-101"]) {
      setDbStatusMsg("Student 'STU-101' not found!");
      return;
    }
    setDocuments((prev) => ({
      ...prev,
      "STU-101": { ...prev["STU-101"], status: "PAID_VERIFIED" },
    }));
    setWalLogs((prev) => [
      ...prev,
      { action: "UPDATE", doc_id: "STU-101", timestamp: new Date().toLocaleTimeString() },
    ]);
    setDbStatusMsg("Updated 'STU-101' status to 'PAID_VERIFIED'. WAL transaction logged.");
  };

  const handleDeleteStudent = () => {
    if (!documents["STU-103"]) {
      setDbStatusMsg("Student 'STU-103' already deleted or not found!");
      return;
    }
    setDocuments((prev) => {
      const next = { ...prev };
      delete next["STU-103"];
      return next;
    });
    setWalLogs((prev) => [
      ...prev,
      { action: "DELETE", doc_id: "STU-103", timestamp: new Date().toLocaleTimeString() },
    ]);
    setDbStatusMsg("Deleted 'STU-103'. Cleaned from primary store and secondary course index.");
  };

  const handleAtomicFlush = () => {
    setDbStatusMsg("Flushed memory state to disk atomically via 'tempfile' + 'os.fsync' + 'os.replace' (Zero 0-byte risk)!");
  };

  const handleCompactWal = () => {
    setIsCompacted(true);
    setWalLogs([{ action: "CHECKPOINT_COMPACTION", doc_id: "ALL", timestamp: new Date().toLocaleTimeString() }]);
    setDbStatusMsg("Compacted WAL transactions into base snapshot and cleanly reset WAL transaction log!");
  };

  const handleCreateBackup = () => {
    const ts = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
    const snapName = `backup_${ts}.json`;
    setBackupSnapshots((prev) => [snapName, ...prev]);
    setDbStatusMsg(`Created backup snapshot: ${snapName}`);
  };

  const filteredDocs =
    selectedCourseQuery === "ALL"
      ? Object.values(documents)
      : (courseIndex[selectedCourseQuery] || []).map((id) => documents[id]).filter(Boolean);

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
            Topic 8 • Final Topic
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          JSON-Backed <span className="text-teal-400">Persistent Data Stores</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master building robust, crash-resilient embedded JSON databases in Python: atomic file writes with <code className="text-teal-300 font-mono">tempfile</code> and <code className="text-teal-300 font-mono">os.replace</code> (eliminating 0-byte corruptions), thread-safe concurrency with <code className="text-cyan-300 font-mono">threading.RLock</code>, secondary in-memory indexing, append-only NDJSON Write-Ahead Logging (WAL), snapshot compaction, and automated backup rotation.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚛️ Atomic Writes (`os.replace`)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 Thread-Safe Locks (`RLock`)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Fast Secondary Hash Indexing
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📝 Append-Only NDJSON WAL
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PERSISTENT STORE FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🗄️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Architecture of JSON-Backed Document Stores
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              JSON document stores are lightweight, zero-configuration databases ideal for desktop tools, microservices, and embedded caching. Production systems enforce three architectural invariants:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Atomic Writes</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">os.replace(tmp, dest)</code>
                <p className="text-[11px] text-slate-300">
                  Writes to a temporary file, calls <code className="text-teal-300">os.fsync()</code>, and swaps destination atomically.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Concurrency Locking</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">with threading.RLock():</code>
                <p className="text-[11px] text-slate-300">
                  Protects in-memory dictionaries and file handles against simultaneous multi-threaded write corruption.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ NDJSON WAL Engine</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">f.write(json + "\n")</code>
                <p className="text-[11px] text-slate-300">
                  Appends delta events in O(1) time to Write-Ahead Logs before snapshot compaction.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The 0-Byte Direct Truncation Trap
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Opening a file with <code className="text-rose-400 font-mono">open("db.json", "w")</code> immediately truncates the file to 0 bytes. If power fails or an exception occurs before <code className="text-slate-300">json.dump()</code> finishes, all database data is lost. Atomic writes eliminate this hazard completely.
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
                2. Visualizing Atomic Swaps, Secondary Indexing &amp; WAL
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("atomic")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "atomic"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Atomic Write Swap
              </button>
              <button
                onClick={() => setActiveInteractiveTab("indexing")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "indexing"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Secondary Indexing
              </button>
              <button
                onClick={() => setActiveInteractiveTab("wal")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "wal"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                NDJSON WAL Compaction
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining filesystem inode swaps, in-memory hash index mappings, and append-only write-ahead logging:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "atomic" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">ATOMIC WRITE &amp; SWAP ARCHITECTURE (`tempfile` + `os.replace`)</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Write to Temp File</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">fd, tmp = mkstemp(dir=dir)</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">json.dump(data, f, indent=2)</text>
                  <text x="15" y="95" fill="#34d399" fontSize="8 font-mono">f.flush() + os.fsync()</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="140" fill="#c4b5fd" fontSize="9 font-bold">Isolated Staging:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Target database remains</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">untouched during dump.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Atomic Inode Replacement</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono font-bold">os.replace(tmp, "db.json")</text>
                  <text x="310" y="75" fill="#ecfdf5" fontSize="8 font-mono">OS Directory Entry Swap</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">Instant 1-Operation Switch</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="140" fill="#38bdf8" fontSize="9 font-bold">Atomic Swap Guarantee:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">OS guarantees readers see</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">either old or new file 100%.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. 100% Data Integrity</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono font-bold">Zero 0-Byte Corruptions</text>
                  <text x="605" y="75" fill="#ecfdf5" fontSize="8 font-mono">Survives Sudden Power Cuts</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="140" fill="#34d399" fontSize="9 font-bold">ACID Atomicity:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Enterprise-grade durability</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">for embedded JSON files.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "indexing" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">THREAD-SAFE MEMORY CACHE &amp; SECONDARY HASH INDEXING</text>

                {/* Left: Primary Store */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Primary Document Store (Keyed by Student ID)</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">"STU-101": &#123;name: "Sourav", course: "PY-AI"&#125;</text>
                  <text x="20" y="80" fill="#ecfdf5" fontSize="8 font-mono">"STU-102": &#123;name: "Priyanka", course: "DS-ML"&#125;</text>
                  <text x="20" y="100" fill="#ecfdf5" fontSize="8 font-mono">"STU-103": &#123;name: "Debolina", course: "PY-AI"&#125;</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Primary Key Map:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">O(1) direct document retrieval by primary `student_id`.</text>
                </g>

                {/* Right: Secondary Indices */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">2. Secondary Hash Index (`index_course`)</text>

                  <text x="20" y="60" fill="#38bdf8" fontSize="8 font-mono font-bold">"PY-AI"   -&gt; &#123;"STU-101", "STU-103"&#125;</text>
                  <text x="20" y="80" fill="#38bdf8" fontSize="8 font-mono font-bold">"DS-ML"   -&gt; &#123;"STU-102"&#125;</text>
                  <text x="20" y="100" fill="#38bdf8" fontSize="8 font-mono font-bold">"FULL-STK"-&gt; &#123;"STU-104"&#125;</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Index Acceleration:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Instant O(1) course lookup without O(N) full table scan.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">APPEND-ONLY NDJSON WAL LOG &amp; SNAPSHOT COMPACTION</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="30" fill="#a5f3fc" fontSize="11 font-bold">1. Fast Append-Only WAL</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">&#123;action: "INSERT", id: 101&#125;</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">&#123;action: "UPDATE", id: 101&#125;</text>
                  <text x="15" y="95" fill="#fca5a5" fontSize="8 font-mono">&#123;action: "DELETE", id: 103&#125;</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="25" y="140" fill="#38bdf8" fontSize="9 font-bold">O(1) Appends:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Zero full-file rewrites.</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Extremely high write IOPS.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="310" y="30" fill="#99f6e4" fontSize="11 font-bold">2. Snapshot Compactor</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">Replays delta events</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono">Collapses to final state</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">Atomic Base Snapshot</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="320" y="140" fill="#34d399" fontSize="9 font-bold">State Checkpoint:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Overwrites snapshot</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">and truncates WAL log.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Cleaned State</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono">Snapshot Size: 1.2 KB</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono">WAL Size: 0 bytes (Reset)</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="140" fill="#c4b5fd" fontSize="9 font-bold">Constant Efficiency:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Keeps database startup</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">replay times sub-millisecond.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE DOCUMENT DATABASE LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive JSON Document Database &amp; WAL Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Execute CRUD operations on the live in-memory JSON document database, observe secondary index updates, inspect the append-only NDJSON WAL transaction log, and trigger atomic snapshot flushes:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Database Operations Engine
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Total Records: <strong className="text-white">{Object.keys(documents).length}</strong>
                </span>
              </div>

              {/* CRUD Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleInsertStudent}
                  className="py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  ➕ Insert Student (STU-104)
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  ✏️ Update STU-101 (Paid)
                </button>
                <button
                  onClick={handleDeleteStudent}
                  className="py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  🗑️ Delete STU-103
                </button>
                <button
                  onClick={handleAtomicFlush}
                  className="py-2.5 bg-purple-700 hover:bg-purple-600 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  ⚛️ Atomic Flush (`os.replace`)
                </button>
              </div>

              {/* Compaction & Backup Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleCompactWal}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono text-xs rounded-lg transition-all"
                >
                  🧹 Compact WAL Log
                </button>
                <button
                  onClick={handleCreateBackup}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono text-xs rounded-lg transition-all"
                >
                  📦 Create Backup Snapshot
                </button>
              </div>

              {/* Secondary Index Query Filter */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-300">Filter by Secondary Course Index:</span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {["ALL", "PY-AI", "DS-ML", "FULL-STACK"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCourseQuery(c)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        selectedCourseQuery === c
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Index Map Display */}
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Secondary Hash Index Map (`index_course`):</span>
                <div className="text-[11px] text-cyan-300">
                  {JSON.stringify(courseIndex)}
                </div>
              </div>
            </div>

            {/* Database & WAL State Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Status Banner */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Database Engine Status Log:
                </div>
                <div className="text-teal-300 text-[11px] leading-relaxed">
                  {dbStatusMsg}
                </div>
              </div>

              {/* Active Collection View */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[140px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>In-Memory Document Store:</span>
                  <span>Filtered: {filteredDocs.length}</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {JSON.stringify(filteredDocs, null, 2)}
                </pre>
              </div>

              {/* WAL Transaction Stream Preview */}
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1 max-h-[80px] overflow-y-auto">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Append-Only NDJSON WAL Log ({walLogs.length} Lines):
                </span>
                {walLogs.map((wal, idx) => (
                  <div key={idx} className="text-slate-300 text-[10px] flex justify-between">
                    <span>
                      <strong className={clsx(wal.action === "INSERT" ? "text-emerald-400" : wal.action === "UPDATE" ? "text-cyan-400" : wal.action === "DELETE" ? "text-rose-400" : "text-purple-400")}>
                        {wal.action}
                      </strong>{" "}
                      {wal.doc_id}
                    </span>
                    <span className="text-slate-500">{wal.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER JSON DOCUMENT DATABASE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master JSON Database Durability &amp; Performance Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Architecture Layer</th>
                  <th className="py-3.5 px-4 font-bold">Standard Implementation</th>
                  <th className="py-3.5 px-4 font-bold">Failure Mode Prevented</th>
                  <th className="py-3.5 px-4 font-bold">Complexity / Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Atomic Write Swap</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`mkstemp()` + `fsync()` + `os.replace()`</td>
                  <td className="py-3 px-4 text-emerald-400">0-byte corrupted database files</td>
                  <td className="py-3 px-4">O(N) file rewrite time</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Concurrency Lock</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`threading.RLock()`</td>
                  <td className="py-3 px-4 text-emerald-400">Race conditions &amp; torn reads</td>
                  <td className="py-3 px-4">Sub-microsecond lock contention</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Secondary Indexing</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`dict[key] -&gt; Set[doc_ids]`</td>
                  <td className="py-3 px-4 text-emerald-400">O(N) slow full-table scans</td>
                  <td className="py-3 px-4">O(1) query time / slight RAM overhead</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Append-Only WAL</td>
                  <td className="py-3 px-4 font-mono text-slate-200">NDJSON single-line appends</td>
                  <td className="py-3 px-4 text-emerald-400">Slow full-database rewrites on writes</td>
                  <td className="py-3 px-4">O(1) append time + periodic compaction</td>
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
            Explore 4 production-grade Python scripts demonstrating atomic JSON stores, thread-safe indexed document databases, append-only NDJSON WAL engines, and institutional registry databases:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "atomic_json_file_store_with_tempfile_replace.py",
                code: atomicStore,
                description: "Atomic JSON file store with tempfile and os.replace preventing 0-byte corruptions.",
              },
              {
                filename: "thread_safe_json_document_database.py",
                code: docDatabase,
                description: "Thread-safe in-memory document store with secondary indexing and atomic disk persistence.",
              },
              {
                filename: "append_only_ndjson_wal_engine.py",
                code: walEngine,
                description: "High-throughput append-only NDJSON Write-Ahead Logging (WAL) and compaction engine.",
              },
              {
                filename: "institutional_student_registry_json_database.py",
                code: registryDb,
                description: "Complete ACID-like embedded JSON document database with automated backup rotation and recovery.",
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
                <span>❌</span> Trap 1: Direct File Truncation Data Loss
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-rose-300 font-mono">with open("db.json", "w") as f: json.dump(...)</code> truncates the database to 0 bytes immediately. If an unexpected power outage occurs, all data is destroyed.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always write to a temp file and swap atomically with <code className="text-emerald-300">os.replace()</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Cross-Device Temp File Rename Errors
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Creating temp files in <code className="text-amber-300 font-mono">/tmp</code> while the database is on another disk partition causes <code className="text-rose-400 font-mono">os.replace()</code> to fail or become non-atomic.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always specify <code className="text-emerald-300">dir=os.path.dirname(target_path)</code> in <code className="text-emerald-300">mkstemp()</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Multi-Threaded Race Conditions
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Concurrent threads modifying the document store without locks can interleave writes, leading to corrupted in-memory state or torn file writes.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Protect all read and write methods with <code className="text-emerald-300">threading.RLock()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Unbounded WAL Growth
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Never compacting NDJSON transaction logs causes the WAL file to grow indefinitely, slowing down application startup replay times.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Trigger periodic checkpoint compaction to collapse deltas into base snapshots.
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
            Comprehensive question-and-answer repository covering atomic writes, os.replace, RLock concurrency, secondary indexing, NDJSON WAL, and compaction:
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
            Download or print the complete reference sheet with atomic write recipes, thread-safe database templates, and NDJSON WAL engines:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic8_json_persistent_data_stores_notes.txt"
              title="Print Topic 8 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
