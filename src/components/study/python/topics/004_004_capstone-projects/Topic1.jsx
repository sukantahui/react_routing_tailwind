import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import sqliteSchemaCode from "./topic1_files/sqlite_schema_migrations_and_ddl.py?raw";
import jsonAtomicCode from "./topic1_files/json_document_store_and_serializer.py?raw";
import repoCrudCode from "./topic1_files/repository_pattern_crud_operations.py?raw";
import institutionalLedgerCode from "./topic1_files/institutional_ledger_persistence_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Integrating SQLite / JSON persistence, OOP models, and business logic
 * Module: 004_004_capstone-projects
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("sqliteSchema");

  // Interactive Laboratory State
  const [activeTxAction, setActiveTxAction] = useState("ENROLL"); // ENROLL | PAY_PARTIAL | PAY_FULL | CRASH_ROLLBACK

  let txSummary = "Mamata enrolled at Barrackpore (Total Tuition: Rs. 25,000)";
  let ledgerBalance = 25000;
  let txStatus = "COMMITTED ✅ (1 Charge Entry Created)";

  if (activeTxAction === "ENROLL") {
    txSummary = "Mamata enrolled at Barrackpore (Total Tuition: Rs. 25,000)";
    ledgerBalance = 25000;
    txStatus = "COMMITTED ✅ (1 Charge Entry Created)";
  } else if (activeTxAction === "PAY_PARTIAL") {
    txSummary = "Installment 1 Payment of Rs. 15,000 via NetBanking";
    ledgerBalance = 10000;
    txStatus = "COMMITTED ✅ (1 Payment Entry Created, Balance: Rs. 10,000)";
  } else if (activeTxAction === "PAY_FULL") {
    txSummary = "Installment 2 Payment of Rs. 10,000 (Full Settlement)";
    ledgerBalance = 0;
    txStatus = "COMMITTED ✅ (Account Fully Settled, Balance: Rs. 0.00)";
  } else if (activeTxAction === "CRASH_ROLLBACK") {
    txSummary = "Invalid Payment (> Balance or Network Exception midway)";
    ledgerBalance = 10000;
    txStatus = "ROLLED BACK 🔄 (Zero State Corrupted, ACID Protected)";
  }

  const generatedPythonSnippet = `# SQLite Atomic Transaction & Repository Execution
# Action: ${activeTxAction} | Student: Mamata (STU_BP_01)

${
  activeTxAction === "ENROLL"
    ? `# 1. Enrolling new student inside atomic transaction
with conn:
    # Foreign key constraint verified: 'BP' exists in campuses table
    conn.execute(
        "INSERT INTO students (sid, name, campus_id, total_fee) VALUES (?, ?, ?, ?);",
        ("STU_BP_01", "Mamata", "BP", 25000.0)
    )
    conn.execute(
        "INSERT INTO ledger (sid, entry_type, amount, description) VALUES (?, 'CHARGE', ?, ?);",
        ("STU_BP_01", 25000.0, "Initial Tuition Fee")
    )
# Result: Transaction committed automatically!`
    : activeTxAction === "PAY_PARTIAL"
    ? `# 2. Recording partial payment installment
with conn:
    conn.execute(
        "INSERT INTO ledger (sid, entry_type, amount, description) VALUES (?, 'PAYMENT', ?, ?);",
        ("STU_BP_01", 15000.0, "Installment 1 - NetBanking")
    )

# Outstanding Balance: Rs. 10,000.00`
    : activeTxAction === "PAY_FULL"
    ? `# 3. Final settlement installment
with conn:
    conn.execute(
        "INSERT INTO ledger (sid, entry_type, amount, description) VALUES (?, 'PAYMENT', ?, ?);",
        ("STU_BP_01", 10000.0, "Installment 2 - UPI Settlement")
    )

# Outstanding Balance: Rs. 0.00 (Fully Settled)`
    : `# 4. Exception Handling & Automated Rollback Demo
try:
    with conn:
        conn.execute(
            "INSERT INTO ledger (sid, entry_type, amount, description) VALUES (?, 'PAYMENT', ?, ?);",
            ("STU_BP_01", 50000.0, "Overpayment")
        )
        raise ValueError("Payment amount exceeds outstanding debt!")
except ValueError as e:
    # 'with conn' automatically executes ROLLBACK on active transaction!
    print(f"Transaction aborted safely: {e}")`
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
            Segment 4 • Module 004_004
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Capstone Projects, Portfolio &amp; Interview Mastery
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Integrating SQLite &amp; JSON: <span className="text-teal-400">Persistence &amp; Business Logic</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master industrial data persistence in Python: enforcing relational integrity with <code className="text-teal-300 font-mono">PRAGMA foreign_keys = ON</code>, preventing SQL Injection with parameterized queries (<code className="text-cyan-300 font-mono">?</code>), managing atomic ACID transactions with <code className="text-purple-300 font-mono">with conn:</code>, crash-proof atomic JSON file writing via temporary files and <code className="text-amber-300 font-mono">os.replace()</code>, and abstracting data storage behind the Repository Pattern.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🗄️ SQLite Relational Architecture
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Parameterized SQL (?) &amp; Injection Defense
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Atomic JSON File Swapping
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ Repository Pattern CRUD Abstraction
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ARCHITECTURAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Data Persistence Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Professional Python applications combine relational databases for structured, high-integrity transactional data with JSON document stores for configuration and export artifacts:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Referential Integrity</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">PRAGMA foreign_keys=ON</code>
                <p className="text-[11px] text-slate-300">
                  Strictly validates relationships between parents (campuses) and children (students, ledgers) to eliminate orphan rows.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Parameterized SQL</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">execute("... WHERE id=?", (id,))</code>
                <p className="text-[11px] text-slate-300">
                  Separates query structure from user data, permanently neutralizing SQL Injection vulnerabilities.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Atomic File Writing</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">tempfile + os.replace()</code>
                <p className="text-[11px] text-slate-300">
                  Writes JSON to temporary files first and swaps atomically, preventing zero-byte file corruption during crashes.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Repository Pattern</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">IStudentRepository</code>
                <p className="text-[11px] text-slate-300">
                  Mediates between domain entities and database tables, keeping business calculation rules 100% free of raw SQL.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The SQLite Context Manager Superpower: Automated Commit &amp; Rollback
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Wrapping database operations in <code className="text-teal-300 font-mono">with conn:</code> opens an ACID transaction. If all statements complete successfully, <code className="text-emerald-400 font-mono">conn.commit()</code> is called automatically. If any statement raises an error, <code className="text-rose-400 font-mono">conn.rollback()</code> is triggered instantly, preventing partially mutated ledger balances!
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
                2. Visualizing Relational Integrity, Atomic JSON &amp; Repository Layers
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("sqliteSchema")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "sqliteSchema"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Relational Foreign Keys
              </button>
              <button
                onClick={() => setActiveInteractiveTab("atomicJson")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "atomicJson"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Crash-Proof Atomic JSON
              </button>
              <button
                onClick={() => setActiveInteractiveTab("repoPattern")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "repoPattern"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Repository Pattern Decoupling
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining SQLite table schemas, temporary file swapping mechanisms, and repository abstraction boundaries:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "sqliteSchema" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  RELATIONAL SCHEMA INTEGRITY: CAMPUSES ➔ STUDENTS ➔ LEDGER ENTRIES
                </text>

                {/* Table 1: Campuses */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="220" height="235" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <rect x="0" y="0" width="220" height="30" rx="6" fill="#0d9488" />
                  <text x="15" y="20" fill="#ffffff" fontSize="11" fontWeight="bold">TABLE: campuses</text>
                  
                  <text x="15" y="55" fill="#facc15" fontSize="9" fontFamily="monospace">🔑 campus_id TEXT PK</text>
                  <text x="15" y="75" fill="#ccfbf1" fontSize="9" fontFamily="monospace">name TEXT NOT NULL</text>
                  <text x="15" y="95" fill="#ccfbf1" fontSize="9" fontFamily="monospace">city TEXT NOT NULL</text>
                  <text x="15" y="115" fill="#ccfbf1" fontSize="9" fontFamily="monospace">regional_grant_pct REAL</text>

                  <rect x="10" y="145" width="200" height="75" rx="4" fill="#022c22" />
                  <text x="15" y="165" fill="#86efac" fontSize="8" fontWeight="bold">Seed Data:</text>
                  <text x="15" y="180" fill="#a7f3d0" fontSize="8" fontFamily="monospace">BP: Barrackpore (15%)</text>
                  <text x="15" y="195" fill="#a7f3d0" fontSize="8" fontFamily="monospace">CC: Kolkata (5%)</text>
                  <text x="15" y="210" fill="#a7f3d0" fontSize="8" fontFamily="monospace">IC: Ichapur (10%)</text>
                </g>

                {/* Table 2: Students */}
                <g transform="translate(290, 50)">
                  <rect x="0" y="0" width="250" height="235" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <rect x="0" y="0" width="250" height="30" rx="6" fill="#0284c7" />
                  <text x="15" y="20" fill="#ffffff" fontSize="11" fontWeight="bold">TABLE: students</text>

                  <text x="15" y="55" fill="#facc15" fontSize="9" fontFamily="monospace">🔑 sid TEXT PK</text>
                  <text x="15" y="75" fill="#bae6fd" fontSize="9" fontFamily="monospace">name TEXT NOT NULL</text>
                  <text x="15" y="95" fill="#38bdf8" fontSize="9" fontFamily="monospace">🔗 campus_id FK ➔ campuses</text>
                  <text x="15" y="115" fill="#bae6fd" fontSize="9" fontFamily="monospace">base_fee REAL NOT NULL</text>
                  <text x="15" y="135" fill="#bae6fd" fontSize="9" fontFamily="monospace">created_at TIMESTAMP</text>

                  <rect x="10" y="155" width="230" height="65" rx="4" fill="#082f49" />
                  <text x="15" y="175" fill="#38bdf8" fontSize="8" fontWeight="bold">Foreign Key Rule:</text>
                  <text x="15" y="192" fill="#e0f2fe" fontSize="8">ON DELETE RESTRICT</text>
                  <text x="15" y="208" fill="#e0f2fe" fontSize="8">INDEX: idx_student_campus</text>
                </g>

                {/* Table 3: Ledger */}
                <g transform="translate(580, 50)">
                  <rect x="0" y="0" width="250" height="235" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <rect x="0" y="0" width="250" height="30" rx="6" fill="#4f46e5" />
                  <text x="15" y="20" fill="#ffffff" fontSize="11" fontWeight="bold">TABLE: ledger_entries</text>

                  <text x="15" y="55" fill="#facc15" fontSize="9" fontFamily="monospace">🔑 entry_id INTEGER PK AUTO</text>
                  <text x="15" y="75" fill="#818cf8" fontSize="9" fontFamily="monospace">🔗 sid FK ➔ students</text>
                  <text x="15" y="95" fill="#c7d2fe" fontSize="9" fontFamily="monospace">entry_type TEXT CHECK</text>
                  <text x="15" y="115" fill="#c7d2fe" fontSize="9" fontFamily="monospace">amount REAL CHECK(&gt;0)</text>
                  <text x="15" y="135" fill="#c7d2fe" fontSize="9" fontFamily="monospace">description TEXT</text>

                  <rect x="10" y="155" width="230" height="65" rx="4" fill="#0f172a" />
                  <text x="15" y="175" fill="#818cf8" fontSize="8" fontWeight="bold">Audit &amp; Balance:</text>
                  <text x="15" y="192" fill="#e0e7ff" fontSize="8">SUM(CHARGE) - SUM(PAYMENT)</text>
                  <text x="15" y="208" fill="#86efac" fontSize="8">Immutable Transaction Log</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "atomicJson" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  CRASH-PROOF ATOMIC FILE PERSISTENCE PIPELINE (OS.REPLACE)
                </text>

                {/* Pipeline Stages */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Step 1: Memory */}
                  <rect x="25" y="40" width="220" height="165" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="35" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">1. In-Memory Dataclass</text>
                  <text x="35" y="90" fill="#bae6fd" fontSize="8" fontFamily="monospace">StudentProfile(</text>
                  <text x="45" y="105" fill="#bae6fd" fontSize="8" fontFamily="monospace">name="Mamata",</text>
                  <text x="45" y="120" fill="#bae6fd" fontSize="8" fontFamily="monospace">updated=datetime.now()</text>
                  <text x="35" y="135" fill="#bae6fd" fontSize="8" fontFamily="monospace">)</text>
                  <text x="35" y="180" fill="#facc15" fontSize="8" fontWeight="bold">Custom JSONEncoder</text>

                  {/* Arrow 1 */}
                  <path d="M 255 120 L 285 120" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 2: Temp file */}
                  <rect x="295" y="40" width="240" height="165" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="305" y="65" fill="#f3e8ff" fontSize="11" fontWeight="bold">2. Write to Temp File</text>
                  <text x="305" y="90" fill="#d8b4fe" fontSize="8" fontFamily="monospace">registry.json.tmp</text>
                  <text x="305" y="115" fill="#e9d5ff" fontSize="8">Data written in full to disk</text>
                  <text x="305" y="130" fill="#e9d5ff" fontSize="8">If crash occurs here, main</text>
                  <text x="305" y="145" fill="#e9d5ff" fontSize="8">file is untouched &amp; intact!</text>
                  <text x="305" y="180" fill="#fb7185" fontSize="8" fontWeight="bold">Crash Isolation Zone</text>

                  {/* Arrow 2 */}
                  <path d="M 545 120 L 575 120" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 3: Atomic Swap */}
                  <rect x="585" y="40" width="210" height="165" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="595" y="65" fill="#5eead4" fontSize="11" fontWeight="bold">3. Atomic os.replace()</text>
                  <text x="595" y="90" fill="#ccfbf1" fontSize="8" fontFamily="monospace">os.replace(tmp, live)</text>
                  <text x="595" y="115" fill="#a7f3d0" fontSize="8">Instant OS inode swap</text>
                  <text x="595" y="130" fill="#a7f3d0" fontSize="8">Zero partial-write window</text>
                  <text x="595" y="145" fill="#a7f3d0" fontSize="8">100% crash resilient</text>
                  <text x="595" y="180" fill="#86efac" fontSize="8" fontWeight="bold">✅ Production Safe</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  THE REPOSITORY PATTERN: DECOUPLING BUSINESS LOGIC FROM SQL
                </text>

                {/* Repository Decoupling */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Client / Service */}
                  <rect x="25" y="40" width="220" height="165" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="35" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">Admission Service</text>
                  <text x="35" y="90" fill="#bae6fd" fontSize="8" fontFamily="monospace">def calculate_waiver()</text>
                  <text x="35" y="105" fill="#bae6fd" fontSize="8" fontFamily="monospace">def enroll_student()</text>
                  <text x="35" y="135" fill="#e0f2fe" fontSize="8">Knows pure business rules</text>
                  <text x="35" y="150" fill="#e0f2fe" fontSize="8">Zero SQL knowledge</text>
                  <text x="35" y="180" fill="#86efac" fontSize="8" fontWeight="bold">Pure Business Logic</text>

                  {/* Arrow 1 */}
                  <path d="M 255 120 L 285 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Repository Interface & Implementation */}
                  <rect x="295" y="40" width="240" height="165" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="305" y="65" fill="#5eead4" fontSize="11" fontWeight="bold">StudentRepository</text>
                  <text x="305" y="90" fill="#ccfbf1" fontSize="8" fontFamily="monospace">repo.add(student)</text>
                  <text x="305" y="105" fill="#ccfbf1" fontSize="8" fontFamily="monospace">repo.get(sid)</text>
                  <text x="305" y="120" fill="#ccfbf1" fontSize="8" fontFamily="monospace">repo.list_by_campus()</text>
                  <text x="305" y="150" fill="#a7f3d0" fontSize="8">Encapsulates all SQL &amp; queries</text>
                  <text x="305" y="180" fill="#facc15" fontSize="8" fontWeight="bold">Storage Abstraction Gate</text>

                  {/* Arrow 2 */}
                  <path d="M 545 120 L 575 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Database Engine */}
                  <rect x="585" y="40" width="210" height="165" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="595" y="65" fill="#f3e8ff" fontSize="11" fontWeight="bold">Physical Storage</text>
                  <text x="595" y="90" fill="#d8b4fe" fontSize="8" fontFamily="monospace">institutional_data.db</text>
                  <text x="595" y="110" fill="#d8b4fe" fontSize="8" fontFamily="monospace">(SQLite / PostgreSQL)</text>
                  <text x="595" y="140" fill="#e9d5ff" fontSize="8">Can swap SQLite for</text>
                  <text x="595" y="155" fill="#e9d5ff" fontSize="8">Postgres with 0 service edits!</text>
                  <text x="595" y="180" fill="#c084fc" fontSize="8" fontWeight="bold">Swappable Engine</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE LEDGER & TRANSACTION SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Ledger &amp; ACID Transaction Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Execute real-time ledger mutations for Mamata at Barrackpore campus, testing installment settlements, balance auditing, and automatic transaction rollback on errors:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Action Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Database Mutation Action:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: "ENROLL", label: "1. Enroll Student", tag: "Rs. 25,000 Tuition Charge" },
                  { id: "PAY_PARTIAL", label: "2. Pay Installment 1", tag: "Rs. 15,000 NetBanking" },
                  { id: "PAY_FULL", label: "3. Pay Installment 2", tag: "Rs. 10,000 Full Settlement" },
                  { id: "CRASH_ROLLBACK", label: "4. Exception Rollback", tag: "Simulate Error & Rollback" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTxAction(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      activeTxAction === item.id
                        ? item.id === "CRASH_ROLLBACK"
                          ? "bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950/50"
                          : "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  &gt;
                    <div className="text-xs sm:text-sm font-bold text-slate-200">{item.label}</div>
                    <div className="text-[10px] text-teal-400 font-mono mt-0.5">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Active Mutation</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1 leading-snug">
                  {txSummary}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Outstanding Balance</div>
                <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
                  Rs. {ledgerBalance.toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">ACID Transaction State</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {txStatus}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Executed SQLite Statements &amp; Python Context Manager:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                {generatedPythonSnippet}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: DEEP DIVE CODE LABS (PYTHON FILE LOADERS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Production Code Labs &amp; Persistence Engines
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade persistence labs covering SQLite Foreign Keys DDL, crash-proof atomic JSON serialization, the Repository pattern, and the complete institutional ledger engine:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: SQLite Schema DDL, Foreign Keys &amp; Indexes
                </h3>
                <p className="text-sm text-slate-400">
                  Enforcing referential integrity with <code className="text-teal-300 font-mono">PRAGMA foreign_keys = ON</code>, indexing queries, and executing relational JOINs.
                </p>
              </div>
              <PythonFileLoader
                fileModule={sqliteSchemaCode}
                title="sqlite_schema_migrations_and_ddl.py"
                highlightLines={[16, 28, 48, 64]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Crash-Proof Atomic JSON Persistence &amp; Custom Encoders
                </h3>
                <p className="text-sm text-slate-400">
                  Serializing datetimes and dataclasses with custom encoders and swapping temporary files with <code className="text-cyan-300 font-mono">os.replace()</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={jsonAtomicCode}
                title="json_document_store_and_serializer.py"
                highlightLines={[22, 34, 40]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Repository Pattern CRUD Abstraction
                </h3>
                <p className="text-sm text-slate-400">
                  Decoupling business logic from database tables with <code className="text-purple-300 font-mono">IStudentRepository</code> abstract interface.
                </p>
              </div>
              <PythonFileLoader
                fileModule={repoCrudCode}
                title="repository_pattern_crud_operations.py"
                highlightLines={[20, 48, 62, 70]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Complete Multi-Campus Institutional Ledger Engine
                </h3>
                <p className="text-sm text-slate-400">
                  Full persistence engine recording tuition charges, installment payments, and computing outstanding balances for Mamata and Mahima across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalLedgerCode}
                title="institutional_ledger_persistence_engine.py"
                highlightLines={[36, 56, 70, 92]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS & ANTI-PATTERNS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Persistence Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. String Formatting in SQL (SQL Injection)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Using f-strings or <code className="text-rose-400 font-mono">%</code> formatting in SQL queries creates critical security vulnerabilities allowing attackers to dump or delete databases.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # VULNERABLE: f"SELECT * FROM users WHERE name='&#123;name&#125;'"
                {'\n'}# SECURE: execute("SELECT * FROM users WHERE name=?", (name,))
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Forgetting PRAGMA foreign_keys = ON
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                SQLite disables foreign key enforcement by default for backwards compatibility; omitting this PRAGMA allows corrupted orphan child records.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: conn = sqlite3.connect(...) (FKs disabled!){'\n'}
                # FIX: conn.execute("PRAGMA foreign_keys = ON;")
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Direct JSON Overwrite Without Temp Files
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Opening an existing JSON file in <code className="text-rose-400 font-mono">"w"</code> mode truncates the file immediately; a crash midway leaves a permanently corrupted 0-byte file.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # RISKY: with open("data.json", "w") as f: json.dump(d, f){'\n'}
                # SAFE: Write data.tmp then os.replace(data.tmp, data.json)
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Leaking Raw SQL Tuples to UI Layers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Passing raw tuples like <code className="text-rose-400 font-mono">row[3]</code> directly to frontend templates breaks if database columns are reordered.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: return cursor.fetchall()  # [(1, 'Mamata')]{'\n'}
                # BEST PRACTICE: return [Student(*row) for row in rows]
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: BEST PRACTICES CHECKLIST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✅</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Professional Persistence Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Always Enable Foreign Keys:</strong> Run <code className="text-teal-300 font-mono">PRAGMA foreign_keys = ON;</code> immediately upon opening every SQLite connection.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Strict Parameterization:</strong> Never format variables into SQL queries; always pass parameters via <code className="text-teal-300 font-mono">?</code> tuples.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Atomic JSON Swapping:</strong> Always write JSON files to temporary files first and swap atomically with <code className="text-teal-300 font-mono">os.replace()</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Encapsulate with Repositories:</strong> Wrap SQL queries in dedicated Repository classes returning strongly typed domain dataclasses.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="SQLite &amp; JSON Persistence FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Integrating SQLite / JSON Persistence Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Data integrity is the non-negotiable foundation of all professional software. When tracking admissions and financial ledgers for Mamata, Mahima, Abhronila, Susmita, and Debangshu across Barrackpore, Kolkata, Ichapur, and Jadavpur, executing 'PRAGMA foreign_keys = ON', parameterizing every query with '?', and managing multi-step ledger mutations inside atomic 'with conn:' blocks ensures that our data remains mathematically sound, secure from injection, and completely crash-resilient."
            }
          />
        </section>

      </div>
    </div>
  );
}
