import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Temporal Types Deep Dive: DATE, TIME, DATETIME vs TIMESTAMP (Timezone Conversions & Limits)
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive temporal types workbench: analyzing the temporal spectrum (DATE, TIME, DATETIME, TIMESTAMP), timezone translation engines (UTC vs IST), the Year 2038 overflow bug, and microsecond fractional precision audit trails in MySQL.
 */
const Topic6 = () => {
  // Interactive Temporal State
  const [selectedTemporalPhase, setSelectedTemporalPhase] = useState("phase1_temporal_spectrum");

  const temporalPhases = {
    phase1_temporal_spectrum: {
      phaseNumber: "Phase 1: Temporal Spectrum",
      title: "1. The Temporal Data Type Spectrum & Storage Layout",
      badge: "Storage Engine Layout",
      badgeColor: "emerald",
      sqlSnippet: `-- 🕒 TEMPORAL TYPES PHYSICAL STORAGE LAYOUT:
-- 1. YEAR      : 1 Byte  (1901 to 2155)
-- 2. DATE      : 3 Bytes (1000-01-01 to 9999-12-31, YYYY-MM-DD)
-- 3. TIME      : 3 Bytes (-838:59:59 to 838:59:59, Durations & Time-of-day)
-- 4. DATETIME  : 5 Bytes base + FSP (1000-01-01 00:00:00 to 9999-12-31 23:59:59)
-- 5. TIMESTAMP : 4 Bytes base + FSP (1970-01-01 00:00:01 to 2038-01-19 03:14:07)

CREATE TABLE student_course_schedule (
    schedule_id INT PRIMARY KEY AUTO_INCREMENT,
    course_date DATE NOT NULL,             -- 3 Bytes (e.g. '2026-08-25')
    start_time TIME NOT NULL,              -- 3 Bytes (e.g. '10:00:00')
    batch_year YEAR NOT NULL               -- 1 Byte  (e.g. 2026)
);`,
      metricsTable: [
        { type: "YEAR", storage: "1 Byte", range: "1901 to 2155", bestUse: "Academic batch years, model manufacturing year" },
        { type: "DATE", storage: "3 Bytes", range: "1000-01-01 to 9999-12-31", bestUse: "Birthdates, holidays, invoice billing dates" },
        { type: "TIME", storage: "3 Bytes", range: "-838:59:59 to 838:59:59", bestUse: "Class times, elapsed job durations" },
        { type: "DATETIME", storage: "5 Bytes (+FSP)", range: "Year 1000 to 9999", bestUse: "Historical & future events, contract expiry" },
        { type: "TIMESTAMP", storage: "4 Bytes (+FSP)", range: "1970 to 2038 UTC", bestUse: "Timezone-aware session audit logs" }
      ],
      explanation:
        "MySQL temporal types range from 1-byte `YEAR` to 5-byte `DATETIME`. `DATETIME` covers all human history and future centuries (1000-9999), while `TIMESTAMP` covers 1970 to 2038."
    },
    phase2_timezone_conversion: {
      phaseNumber: "Phase 2: Timezone Engine",
      title: "2. Timezone Translation Engine: DATETIME vs TIMESTAMP",
      badge: "Timezone Engine",
      badgeColor: "cyan",
      sqlSnippet: `-- 🌐 TIMEZONE CONVERSION DEMONSTRATION:
-- Step 1: Session 1 in Indian Standard Time (IST, +05:30):
SET time_zone = '+05:30';

CREATE TABLE event_audit (
    event_name VARCHAR(50),
    dt_val DATETIME,     -- Literal (No conversion)
    ts_val TIMESTAMP     -- Timezone Aware (Converts to UTC!)
);

INSERT INTO event_audit VALUES 
('Barrackpore Admission', '2026-08-25 10:00:00', '2026-08-25 10:00:00');

-- Step 2: Session 2 in UTC Timezone (+00:00):
SET time_zone = '+00:00';

SELECT event_name, dt_val, ts_val FROM event_audit;
-- dt_val : '2026-08-25 10:00:00' (Remains 10:00 AM unchanged!)
-- ts_val : '2026-08-25 04:30:00' (Automatically converted to UTC! -5.5 hours) ✅`,
      metricsTable: [
        { feature: "DATETIME", conversion: "No Conversion (Literal)", onDisk: "Stores literal string", behavior: "Same value in every country" },
        { feature: "TIMESTAMP", conversion: "Converts to/from UTC", onDisk: "Stores UTC seconds", behavior: "Adapts to user's local timezone" },
        { feature: "Session Variable", conversion: "SET time_zone = '+05:30'", onDisk: "N/A", behavior: "Controls TIMESTAMP display offset" },
        { feature: "Global Neutral", conversion: "UTC_TIMESTAMP()", onDisk: "N/A", behavior: "Returns true UTC time" }
      ],
      explanation:
        "`DATETIME` stores the literal calendar datetime and never converts timezones. `TIMESTAMP` converts to UTC upon insertion and converts back to the active session timezone on retrieval, providing automatic localized display."
    },
    phase3_y2038_overflow: {
      phaseNumber: "Phase 3: Y2038 Overflow",
      title: "3. The Year 2038 Problem: Avoiding TIMESTAMP Overflow",
      badge: "Y2038 Bug Hazard",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ THE YEAR 2038 PROBLEM (Y2038):
-- TIMESTAMP is a 32-bit signed integer (Max: 2,147,483,647 seconds).
-- Overflow moment: January 19, 2038 at 03:14:07 UTC.

-- Inserting a date beyond Jan 19, 2038 into TIMESTAMP:
CREATE TABLE loan_contracts (
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    mature_date_ts TIMESTAMP, -- ❌ FAILS on 30-year mortgages!
    mature_date_dt DATETIME   -- ✅ SAFE up to year 9999!
);

-- Attempting 30-year maturity date:
INSERT INTO loan_contracts (mature_date_ts, mature_date_dt)
VALUES ('2045-01-01 00:00:00', '2045-01-01 00:00:00');

-- ❌ TIMESTAMP inserts fail with: Error 1292 (22001): Incorrect datetime value!
-- Always use DATETIME for birthdates and future expiration dates!`,
      metricsTable: [
        { riskType: "Y2038 Epoch Overflow", threshold: "2038-01-19 03:14:07 UTC", impact: "Fails on all 30-year loans / pensions ❌" },
        { riskType: "Historical Birthdates", threshold: "Prior to 1970-01-01", impact: "TIMESTAMP cannot store birthdates < 1970 ❌" },
        { riskType: "DATETIME Solution", threshold: "Year 1000 to 9999", impact: "Immune to Y2038; fully future-proof ✅" },
        { riskType: "Migration Pattern", threshold: "ALTER TABLE MODIFY", impact: "Convert TIMESTAMP columns to DATETIME(6)" }
      ],
      explanation:
        "Because `TIMESTAMP` uses a 32-bit integer measuring seconds since 1970, it overflows on January 19, 2038. All future-dated business records (like 30-year loans, insurance policies) and historical birthdates must use `DATETIME` or `DATE`."
    },
    phase4_microsecond_auditing: {
      phaseNumber: "Phase 4: Microsecond Audits",
      title: "4. Fractional Microsecond Precision & Automated Auditing",
      badge: "Audit Architecture",
      badgeColor: "amber",
      sqlSnippet: `-- ⚡ HIGH-RESOLUTION MICROSECOND AUDIT LOGGING:
-- DATETIME(6) stores up to 6 fractional digits (microseconds):
CREATE TABLE admission_ledger (
    admission_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    fee_paid DECIMAL(10, 2) NOT NULL,
    
    -- High-precision microsecond audit trail:
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) 
               ON UPDATE CURRENT_TIMESTAMP(6),
               
    INDEX idx_created (created_at)
);

-- Insertion captures exact microsecond:
INSERT INTO admission_ledger (student_name, fee_paid) 
VALUES ('Mamata Banerjee', 12500.00);

-- Output: 2026-08-25 14:32:45.892134 (Microsecond fidelity! ✅)`,
      metricsTable: [
        { precision: "FSP (0)", syntax: "DATETIME", storageOverhead: "+0 Bytes", resolution: "1 Second (Standard)" },
        { precision: "FSP (3)", syntax: "DATETIME(3)", storageOverhead: "+2 Bytes", resolution: "1 Millisecond (.001s)" },
        { precision: "FSP (6)", syntax: "DATETIME(6)", storageOverhead: "+3 Bytes", resolution: "1 Microsecond (.000001s) ⚡" },
        { precision: "Auto-Update", syntax: "ON UPDATE CURRENT_TIMESTAMP(6)", storageOverhead: "N/A", resolution: "Automatic update trigger" }
      ],
      explanation:
        "`DATETIME(6)` enables microsecond-level audit logging with only 3 extra bytes of storage. Combining this with `DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)` creates an automated, tamper-evident audit trail."
    }
  };

  const navItems = [
    { id: "temporal-overview", label: "1. Temporal Overview" },
    { id: "spectrum-diagram", label: "2. Spectrum & Timezone Diagram" },
    { id: "interactive-workbench", label: "3. Temporal Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Temporal Sizing Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_002</span>
            <span>•</span>
            <span>Topic 6 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Temporal Data Types
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Temporal Types Deep Dive: DATE, TIME, DATETIME vs TIMESTAMP (Timezone Conversions &amp; Limits)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master time in MySQL: explore literal <code className="text-emerald-400 font-mono">DATETIME</code> vs timezone-aware <code className="text-cyan-400 font-mono">TIMESTAMP</code>, avoid the <code className="text-rose-400 font-mono">Year 2038 (Y2038)</code> overflow bug, configure session timezones, and implement microsecond audit trails with <code className="text-amber-400 font-mono">DATETIME(6)</code>.
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
        {/* SECTION 1: Temporal Overview */}
        <section id="temporal-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Temporal Data Type Spectrum
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Choosing the correct temporal type for dates, durations, historical timestamps, and future contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. DATE &amp; TIME</span>
              <h3 className="font-bold text-white">3 Bytes Each</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                `DATE` for calendar days (1000-9999); `TIME` for daily time or elapsed intervals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. DATETIME</span>
              <h3 className="font-bold text-white">5 Bytes Base</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Literal calendar time (1000-9999). Immune to Y2038 and timezone changes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. TIMESTAMP</span>
              <h3 className="font-bold text-white">4 Bytes Base</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Timezone-aware (converts to UTC). Range 1970 to 2038 (Y2038 limit).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. FSP (0 to 6)</span>
              <h3 className="font-bold text-white">Microseconds</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adds 0 to 3 extra bytes for fractional precision up to 6 decimal places.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Spectrum & Timezone Diagram */}
        <section id="spectrum-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Timezone Pipeline &amp; Y2038 Boundary
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing DATETIME literal storage vs TIMESTAMP UTC translation and the 2038 overflow barrier.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 6.1: Timezone Translation Pipeline &amp; Y2038 Limit
              </h3>
              <span className="text-xs text-slate-400 font-mono">Temporal Architecture</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* Left Box: DATETIME Pipeline */}
                <rect x="20" y="40" width="440" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="240" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  1. DATETIME (TIMEZONE AGNOSTIC &amp; FUTURE-PROOF)
                </text>
                <line x1="20" y1="85" x2="460" y2="85" stroke="#334155" />

                <rect x="40" y="105" width="400" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="50" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">Input: '2045-08-25 10:00:00' in IST (+05:30)</text>
                <text x="50" y="140" fill="#94a3b8" fontSize="8">Literal calendar input</text>

                <rect x="40" y="160" width="400" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="50" y="180" fill="#34d399" fontSize="10" fontWeight="bold">Storage: '2045-08-25 10:00:00' (5 Bytes on Disk)</text>
                <text x="50" y="195" fill="#94a3b8" fontSize="8">Zero timezone conversion; literal storage</text>

                <rect x="40" y="215" width="400" height="65" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="50" y="235" fill="#34d399" fontSize="10" fontWeight="bold">Range: 1000-01-01 to 9999-12-31 ✅</text>
                <text x="50" y="250" fill="#bae6fd" fontSize="9">Immune to Year 2038 Problem!</text>
                <text x="50" y="265" fill="#a7f3d0" fontSize="8">Ideal for 30-year loans, birthdates, contracts</text>

                {/* Right Box: TIMESTAMP Pipeline */}
                <rect x="490" y="40" width="440" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="710" y="70" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">
                  2. TIMESTAMP (TIMEZONE AWARE &amp; Y2038 LIMIT)
                </text>
                <line x1="490" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="510" y="105" width="400" height="45" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="520" y="125" fill="#bae6fd" fontSize="10" fontWeight="bold">Input: '2026-08-25 10:00:00' in IST (+05:30)</text>
                <text x="520" y="140" fill="#94a3b8" fontSize="8">Application local time</text>

                <rect x="510" y="160" width="400" height="45" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="520" y="180" fill="#fde68a" fontSize="10" fontWeight="bold">Storage: Converts to UTC &rarr; '2026-08-25 04:30:00'</text>
                <text x="520" y="195" fill="#94a3b8" fontSize="8">Stores 32-bit seconds since 1970 Unix Epoch</text>

                <rect x="510" y="215" width="400" height="65" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="520" y="235" fill="#f87171" fontSize="10" fontWeight="bold">Y2038 Ceiling: 2038-01-19 03:14:07 UTC ⚠️</text>
                <text x="520" y="250" fill="#fca5a5" fontSize="9">32-bit integer overflows; crashes future dates!</text>
                <text x="520" y="265" fill="#fca5a5" fontSize="8">Never use for dates &gt; 2038 or &lt; 1970!</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Temporal Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Temporal Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a temporal phase to inspect timezone conversions, Y2038 boundary tests, and microsecond audit scripts.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(temporalPhases).map((key) => {
              const ph = temporalPhases[key];
              const isSelected = selectedTemporalPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTemporalPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
                      ph.badgeColor === "rose" && "bg-rose-400",
                      ph.badgeColor === "amber" && "bg-amber-400"
                    )}
                  />
                  <span>{ph.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {temporalPhases[selectedTemporalPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  temporalPhases[selectedTemporalPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  temporalPhases[selectedTemporalPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  temporalPhases[selectedTemporalPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800",
                  temporalPhases[selectedTemporalPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800"
                )}
              >
                {temporalPhases[selectedTemporalPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Temporal SQL &amp; Timezone Execution Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {temporalPhases[selectedTemporalPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Temporal Specifications &amp; Behaviors:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Temporal Type / Feature</th>
                      <th className="py-2.5 px-4">Storage &amp; Precision</th>
                      <th className="py-2.5 px-4">Range &amp; Architectural Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {temporalPhases[selectedTemporalPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.type || row.feature || row.riskType || row.precision}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.storage || row.conversion || row.threshold || row.syntax}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.bestUse || row.behavior || row.impact || row.resolution}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {temporalPhases[selectedTemporalPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Temporal Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fixing 30-year loan maturity bugs and timezone shifts in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Y2038 Prevention */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing 30-Year Home Loan Maturity Crash in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Y2038 Bug Resolved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a banking database threw Error 1292 when inserting 30-year home loan contracts maturing in 2056 because the `maturity_date` column was defined as `TIMESTAMP`. Migrating the column to `DATETIME` allowed future loan maturities to be scheduled cleanly up to year 9999 without Y2038 overflow crashes.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Timezone Audit */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Eliminating 5.5 Hour Time Shifting in Kolkata Healthcare
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Timezone Aligned
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a hospital doctor appointment portal displayed consultation slots shifted 5.5 hours earlier for patients in the UK because appointment times were stored in timezone-aware `TIMESTAMP`. Refactoring appointment time to literal `DATETIME` and adding an explicit `patient_timezone` column resolved all scheduling ambiguities globally.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid temporal overflow traps and unexpected timezone shift bugs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using TIMESTAMP for Birthdates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `TIMESTAMP` cannot represent dates before `1970-01-01`, meaning any user born before 1970 will trigger an insert error.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use DATE for birthdates and historical dates.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing Epoch Milliseconds in BIGINT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Storing raw epoch timestamps in `BIGINT` prevents using MySQL temporal operators (`DATE_ADD`, `DATEDIFF`, `DATE_FORMAT`).
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use DATETIME(6) to enable native SQL date math and indexing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Default to DATETIME(6) for Audits
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)` to guarantee future-proof date ranges with microsecond audit precision.
              </p>
              <div className="text-xs text-slate-400">
                Immune to Y2038 bug and supports high-throughput event sequencing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Explicit Session Timezone Setting
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always set `SET time_zone = '+05:30';` (or application timezone) in backend connection pool initialization scripts.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees predictable TIMESTAMP display across all servers.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Temporal Sizing Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Temporal Sizing Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify temporal safety and precision across database tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Temporal Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">DATETIME for Future</strong> = Ensure loan and contract expiry dates use `DATETIME`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">DATE for Birthdays</strong> = Use `DATE` (3B) for birthdates and historical dates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Microsecond Audits</strong> = Use `DATETIME(6)` for event ordering precision.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Audit Y2038 Columns</strong> = Migrate legacy `TIMESTAMP` columns before 2038.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe DATETIME vs TIMESTAMP Storage...”</span>
                  In MySQL 5.6+, `DATETIME` storage was compressed from 8 bytes down to 5 bytes! Because `TIMESTAMP` takes 4 bytes, `DATETIME` costs only 1 extra byte while providing 8,000 years of extra range!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about ON UPDATE CURRENT_TIMESTAMP...”</span>
                  Adding `ON UPDATE CURRENT_TIMESTAMP(6)` allows MySQL to update the audit timestamp automatically on every `UPDATE` statement without requiring application backend code!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering DATE, TIME, DATETIME, and TIMESTAMP.
            </p>
          </div>

          <FAQTemplate
            title="Temporal Data Types (DATE, TIME, DATETIME vs TIMESTAMP) FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Temporal Types Deep Dive: DATE, TIME, DATETIME vs TIMESTAMP (Timezone Conversions & Limits)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="Temporal modeling requires looking decades into the future. Storing birthdates or 30-year bank loan agreements in TIMESTAMP is a recipe for disaster because of the 1970 floor and 2038 ceiling (the Y2038 problem). Standardize on DATETIME(6) for audit trails and business records: it is timezone-neutral, gives you microsecond precision for only 3 extra bytes, and spans from year 1000 to 9999, ensuring your database will run without temporal crashes for centuries to come!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
