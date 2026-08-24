import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Optimistic Concurrency Control using Version / Timestamp Columns
 * Module: 003_005_transactions-and-concurrency
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on Optimistic Concurrency Control (OCC) in MySQL: integer version columns, ROW_COUNT() conflict verification, Compare-And-Swap (CAS), JPA @Version mappings, and automated retry loops.
 */
const Topic13 = () => {
  // Interactive Simulator State
  const [selectedOccScenario, setSelectedOccScenario] = useState("successful_occ_update");

  const occScenarios = {
    successful_occ_update: {
      title: "1. Successful OCC: Lock-Free Read & Monotonic Version Increment",
      badge: "Successful OCC",
      badgeColor: "emerald",
      sqlQuery: `-- 🛡️ SUCCESSFUL OPTIMISTIC CONCURRENCY CONTROL (First Committer):
-- Step 1: Lock-Free Read (Reads version = 1):
SELECT student_id, phone, address, version 
FROM student_profiles 
WHERE student_id = 101; 
-- 📊 Staged in Web UI: phone = '98300-11111', version = 1 (Zero DB Locks Held!)

-- User edits phone number in browser for 3 minutes... (Zero lock contention!)

-- Step 2: Atomic Update with Version Check:
UPDATE student_profiles 
SET phone = '98300-22222', 
    version = version + 1 
WHERE student_id = 101 AND version = 1;

-- Step 3: Verification in Application:
SELECT ROW_COUNT(); -- ⚡ Returns 1! Update Succeeded! New Version is 2!`,
      resultRows: [
        { actor: "User 1 (Mamata)", readVersion: "version = 1", writeClause: "WHERE id = 101 AND version = 1", rowCountResult: "ROW_COUNT() = 1 ✅", newVersionOnDisk: "version = 2", status: "Succeeded ✅" },
      ],
      explanation:
        "User 1 reads data lock-free at `version = 1`. During update, MySQL atomically checks `version = 1` and increments to `version = 2`. Because `ROW_COUNT() = 1`, the update succeeds seamlessly.",
    },
    conflict_detected_occ: {
      title: "2. Conflict Detection: Stale Update Rejected with ROW_COUNT() = 0",
      badge: "Conflict Detection",
      badgeColor: "rose",
      sqlQuery: `-- 💥 OCC CONFLICT DETECTION (Second Committer Fails):
-- User 2 (Admin) ALSO read Mamata's profile at version = 1:
-- (User 2 reads: address = 'Barrackpore', version = 1)

-- User 1 ALREADY committed earlier, incrementing version to 2!

-- User 2 NOW attempts to submit update with STALE version = 1:
UPDATE student_profiles 
SET address = 'Kolkata Central', 
    version = version + 1 
WHERE student_id = 101 AND version = 1;

-- 🔍 MySQL Evaluates WHERE Clause:
-- Current disk version is 2, but query expects version = 1!
-- Zero rows match the WHERE predicate!

-- Step 3: Verification in Application:
SELECT ROW_COUNT(); -- 🚨 Returns 0! Conflict Detected!
-- 🛡️ Application rolls back, prevents blind overwrite, and prompts User 2!`,
      resultRows: [
        { actor: "User 1 (Earlier Commit)", readVersion: "version = 1", writeClause: "WHERE id = 101 AND version = 1", rowCountResult: "ROW_COUNT() = 1 ✅", newVersionOnDisk: "version = 2", status: "Committed First ✅" },
        { actor: "User 2 (Stale Attempt)", readVersion: "version = 1 (Stale)", writeClause: "WHERE id = 101 AND version = 1", rowCountResult: "ROW_COUNT() = 0 🚨", newVersionOnDisk: "version = 2 (Unchanged)", status: "Conflict Detected 🛡️" },
      ],
      explanation:
        "When User 2 submits with stale `version = 1`, zero rows match the `WHERE` predicate because User 1 already updated the version to `2`. `ROW_COUNT() = 0` instantly alerts the application to abort or prompt the user.",
    },
    automated_retry_loop: {
      title: "3. Automated Retry Loop: Resolving OCC Conflicts with Backoff",
      badge: "Automated Retry",
      badgeColor: "cyan",
      sqlQuery: `-- 🔄 APPLICATION / PROCEDURAL OCC RETRY LOOP:
DELIMITER //

CREATE PROCEDURE sp_update_phone_with_occ_retry(
    IN p_student_id INT,
    IN p_new_phone VARCHAR(20)
)
BEGIN
    DECLARE v_version INT;
    DECLARE v_rows_affected INT DEFAULT 0;
    DECLARE v_attempts INT DEFAULT 0;

    retry_loop: LOOP
        SET v_attempts = v_attempts + 1;

        -- 1. Fresh Lock-Free Read:
        SELECT version INTO v_version FROM student_profiles WHERE student_id = p_student_id;

        -- 2. Attempt OCC Update:
        UPDATE student_profiles 
        SET phone = p_new_phone, version = version + 1 
        WHERE student_id = p_student_id AND version = v_version;

        SELECT ROW_COUNT() INTO v_rows_affected;

        -- 3. Check Success:
        IF v_rows_affected = 1 THEN
            LEAVE retry_loop; -- Succeeded!
        END IF;

        -- 4. Max Retries Guard:
        IF v_attempts >= 3 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'OCC Error: Max update retries exceeded!';
        END IF;
    END LOOP retry_loop;
END //

DELIMITER ;`,
      resultRows: [
        { actor: "Attempt 1", readVersion: "version = 1", writeClause: "WHERE version = 1", rowCountResult: "ROW_COUNT() = 0", newVersionOnDisk: "version = 2", status: "Conflict ⏳" },
        { actor: "Attempt 2 (Re-read)", readVersion: "version = 2 (Fresh)", writeClause: "WHERE version = 2", rowCountResult: "ROW_COUNT() = 1 ✅", newVersionOnDisk: "version = 3", status: "Succeeded on Retry ⚡" },
      ],
      explanation:
        "Automated retry loops catch `ROW_COUNT() = 0`, re-read the fresh version, and re-attempt the update with exponential backoff, resolving transient concurrency conflicts automatically.",
    },
    compare_and_swap_cas: {
      title: "4. Compare-And-Swap (CAS): Guarding Invariants in Single Queries",
      badge: "Compare-And-Swap (CAS)",
      badgeColor: "amber",
      sqlQuery: `-- ⚡ COMPARE-AND-SWAP (CAS) INVENTORY / SEAT GUARD:
-- Decrement available exam seats ONLY IF at least 1 seat is currently available:
UPDATE exam_labs 
SET available_seats = available_seats - 1 
WHERE lab_id = 1 AND available_seats >= 1;

-- 🔍 Verification:
-- If seats were > 0: ROW_COUNT() = 1 (Seat successfully allocated!)
-- If seats were = 0: ROW_COUNT() = 0 (Overbooking prevented! Room full!)`,
      resultRows: [
        { actor: "Student 1 (1 Seat Left)", readVersion: "Seats = 1", writeClause: "WHERE lab_id = 1 AND seats >= 1", rowCountResult: "ROW_COUNT() = 1 ✅", newVersionOnDisk: "Seats = 0", status: "Seat Booked ⚡" },
        { actor: "Student 2 (0 Seats Left)", readVersion: "Seats = 0", writeClause: "WHERE lab_id = 1 AND seats >= 1", rowCountResult: "ROW_COUNT() = 0 🚨", newVersionOnDisk: "Seats = 0", status: "Rejected Cleanly 🛡️" },
      ],
      explanation:
        "Compare-And-Swap (CAS) embeds business invariant validation directly into the `UPDATE ... WHERE` clause, atomically enforcing constraints in a single roundtrip without explicit version columns.",
    },
  };

  const navItems = [
    { id: "occ-overview", label: "1. What is OCC?" },
    { id: "version-pattern", label: "2. Version Pattern & CAS" },
    { id: "svg-diagrams", label: "3. Timeline & Tradeoff SVGs" },
    { id: "interactive-sandbox", label: "4. Live OCC Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_005</span>
            <span>•</span>
            <span>Topic 13 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Optimistic Concurrency
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Optimistic Concurrency Control (OCC)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the architecture and implementation of Optimistic Concurrency Control using integer <code className="text-cyan-300 font-mono">version</code> columns and Compare-And-Swap (<code className="text-cyan-300 font-mono">CAS</code>) predicates. Learn how lock-free reads maximize connection pool scalability in web applications and microservices.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: What is OCC? */}
        <section id="occ-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is Optimistic Concurrency Control?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The lock-free paradigm designed for web UIs, REST APIs, and microservice architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Optimistic Philosophy (OCC)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assumes conflicts are rare. Queries read data completely lock-free. At update time, the query validates whether data was changed by another transaction. If changed, the update affects 0 rows, prompting a retry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">Connection Pool Scalability</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Because reads hold zero database locks, users can edit web forms for minutes without holding open database transactions, maximizing database connection pool throughput.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Version Pattern & CAS */}
        <section id="version-pattern" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Version Column &amp; Compare-And-Swap (CAS)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The canonical implementation patterns for optimistic concurrency in relational schemas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Pattern 1</span>
              <h3 className="font-bold text-white">Integer version Column</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-cyan-300 font-mono text-xs border border-slate-800">
{`-- Step 1: Read
SELECT id, val, version FROM tbl WHERE id = 101;
-- Step 2: Atomic Increment
UPDATE tbl SET val = 'new', version = version + 1 
WHERE id = 101 AND version = @read_ver;`}
              </pre>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Pattern 2</span>
              <h3 className="font-bold text-white">Compare-And-Swap (CAS)</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-emerald-300 font-mono text-xs border border-slate-800">
{`-- Atomic State Transition Guard:
UPDATE orders 
SET status = 'SHIPPED' 
WHERE order_id = 500 AND status = 'PENDING';
-- ROW_COUNT() = 1 (OK), 0 (Conflict/Already shipped)`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: OCC Execution Timeline &amp; Tradeoff Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the First-Committer-Wins lifecycle and Pessimistic vs Optimistic tradeoffs.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: OCC Timeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> First-Committer-Wins OCC Execution Timeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Both Read */}
                  <g>
                    <rect x="20" y="30" width="220" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="130" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">1. Both Users Read (T0)</text>
                    <rect x="30" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="130" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Mamata reads version = 1</text>
                    <text x="130" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Susmita reads version = 1 (Lock-free)</text>
                  </g>

                  {/* Step 2: Mamata Commits */}
                  <g>
                    <rect x="270" y="30" width="260" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="400" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. Mamata Commits First (T1)</text>
                    <rect x="280" y="70" width="240" height="40" rx="4" fill="#022c22" />
                    <text x="400" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">WHERE version = 1 → ROW_COUNT() = 1</text>
                    <text x="400" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ Version increments to 2 on Disk ✅</text>
                  </g>

                  {/* Step 3: Susmita Fails */}
                  <g>
                    <rect x="560" y="30" width="260" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="690" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3. Susmita Submits Stale (T2)</text>
                    <rect x="570" y="70" width="240" height="40" rx="4" fill="#1e293b" />
                    <text x="690" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">WHERE version = 1 → ROW_COUNT() = 0</text>
                    <text x="690" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">🛡️ Stale Update Rejected Safely!</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 240 80 L 270 80" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 530 80 L 560 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Tradeoff */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Pessimistic vs Optimistic Locking Tradeoff
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Pessimistic */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">PESSIMISTIC (FOR UPDATE)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">High Contention · Short Transactions · Banking Debits</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Locks rows during read · Zero retry overhead</text>
                  </g>

                  {/* Right: Optimistic */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">OPTIMISTIC (Version Column)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Low-Medium Contention · Long Think-Times · Web UIs</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Zero read locks · Maximum pool scalability ⚡</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive OCC Simulator Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test lock-free reads, version increments, stale update conflict detection, automated retry loops, and Compare-And-Swap (CAS) live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(occScenarios).map(([key, item]) => {
              const isActive = selectedOccScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedOccScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Model" : "○ Run OCC Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{occScenarios[selectedOccScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{occScenarios[selectedOccScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                OCC Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Optimistic Concurrency Trace</span>
                <span className="text-emerald-400">ROW_COUNT() Evaluation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {occScenarios[selectedOccScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Actor / Attempt</th>
                    <th className="py-3 px-4 text-white">Staged Read Version</th>
                    <th className="py-3 px-4 text-amber-400">SQL Update Predicate</th>
                    <th className="py-3 px-4 text-cyan-400">ROW_COUNT() Output</th>
                    <th className="py-3 px-4 text-emerald-400">New Disk Version</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {occScenarios[selectedOccScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.actor}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.readVersion}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.writeClause}</td>
                      <td className="py-3 px-4 text-cyan-300 font-mono">{row.rowCountResult}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.newVersionOnDisk}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Succeeded") || row.status.includes("First") || row.status.includes("Booked")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-rose-950 text-rose-400 border-rose-800"
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world elimination of student profile edit overwrites in Barrackpore portal.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Eliminating Profile Blind Overwrites across 50,000 Students in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Student Self-Service Portal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui resolved a persistent data loss defect where a student and parent edited contact information concurrently: The parent updated the home address, and 10 seconds later the student updated their phone number, blindly overwriting and wiping out the parent's new address! Adding a <code className="text-emerald-300 font-mono">version INT UNSIGNED NOT NULL DEFAULT 0</code> column converted the application to OCC. When the student submitted with stale version 1, the update affected 0 rows, prompting the student with: <em>'Profile modified by parent—please review latest changes before submitting!'</em>
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Java Spring Data JPA Entity Mapping:
@Entity
@Table(name = "student_profiles")
public class StudentProfile {
    @Id
    private Long id;
    private String phone;
    private String address;

    @Version // Automatically generates WHERE version = ? checks!
    private Integer version;
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Never omit version checks from UPDATE statements and avoid timestamps for versioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting AND version = ? in WHERE Clause
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting the `AND version = ?` predicate turns an optimistic update into an unconditional blind overwrite, silently destroying concurrent edits!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always verify that your query builder or ORM includes the version predicate!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Prefer Integer version Over Timestamps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use an integer <code className="text-emerald-400 font-mono">BIGINT UNSIGNED</code> column rather than timestamps to avoid clock drift, NTP skew, and microsecond truncation issues.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees strictly monotonic version sequence across all servers.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for Optimistic Concurrency Control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> OCC Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Reads are lock-free; updates validate <code className="text-cyan-300 font-mono">WHERE id = ? AND version = ?</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Check <code className="text-cyan-300 font-mono">ROW_COUNT()</code>: 1 = Success, 0 = Conflict detected.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use integer <code className="text-cyan-300 font-mono">version</code> columns to avoid timestamp clock skew.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Ideal for web UIs and long think-times; use <code className="text-cyan-300 font-mono">FOR UPDATE</code> for flash sales.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe HTTP ETags...”</span>
                  In REST APIs, pass the entity version as an `ETag` header; on `PUT`, verify with `If-Match` to return HTTP `412 Precondition Failed` on OCC conflicts!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about retry storms...”</span>
                  If 100 users edit the exact same row simultaneously, OCC causes 99 retries! Switch to Pessimistic Locking (`FOR UPDATE`) for extreme write bottlenecks!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering Optimistic Concurrency Control (OCC) in MySQL: integer version columns, ROW_COUNT() conflict verification, Compare-And-Swap (CAS), JPA @Version mappings, and automated retry loops.
            </p>
          </div>

          <FAQTemplate
            title="Optimistic Concurrency Control FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Optimistic Concurrency Control using Version / Timestamp Columns"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic13_note.txt"
          />

          <Teacher
            note="Optimistic Concurrency Control (OCC) is the gold standard for web applications and stateless RESTful microservices. By avoiding locks during the read phase and checking an integer version column at update time, OCC enables thousands of users to edit forms concurrently without exhausting database connection pools. Always inspect ROW_COUNT() = 1 to verify success, and implement clean retry handlers with exponential backoff!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
