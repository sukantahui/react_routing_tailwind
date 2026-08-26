import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Numeric Data Types Deep Dive: INT, BIGINT, DECIMAL (Exact Precision) vs FLOAT / DOUBLE
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive numeric data types workbench: analyzing integer byte spectra (TINYINT to BIGINT), exact fixed-point DECIMAL vs approximate floating-point FLOAT/DOUBLE, Indian Rupee financial ledger precision, and auto-increment primary key exhaustion forecasting in MySQL.
 */
const Topic5 = () => {
  // Interactive Numeric State
  const [selectedNumericPhase, setSelectedNumericPhase] = useState("phase1_integer_spectrum");

  const numericPhases = {
    phase1_integer_spectrum: {
      phaseNumber: "Phase 1: Integer Spectrum",
      title: "1. The Integer Data Type Spectrum: Signed vs UNSIGNED",
      badge: "Integer Ranges",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔢 INTEGER SPECTRUM SIZING & STORAGE:
-- 1. TINYINT  (1 Byte) : -128 to 127 | UNSIGNED: 0 to 255 (Optimal for Age / Ratings!)
-- 2. SMALLINT (2 Bytes): -32,768 to 32,767 | UNSIGNED: 0 to 65,535
-- 3. MEDIUMINT(3 Bytes): -8.38M to +8.38M | UNSIGNED: 0 to 16.77 Million
-- 4. INT      (4 Bytes): -2.14B to +2.14B | UNSIGNED: 0 to 4.29 Billion
-- 5. BIGINT   (8 Bytes): -9.22 Quintillion to +9.22 Quintillion | UNSIGNED: 0 to 18.44 Quintillion!

CREATE TABLE telemetry_metrics (
    sensor_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, -- Up to 4.29 Billion IDs! ✅
    battery_pct TINYINT UNSIGNED NOT NULL,             -- 0 - 100 (1 Byte strictly)
    status_flag BIT(1) NOT NULL DEFAULT b'1'           -- 1-bit boolean
);`,
      metricsTable: [
        { type: "TINYINT", size: "1 Byte", signedRange: "-128 to 127", unsignedRange: "0 to 255 (Age, Status codes)" },
        { type: "SMALLINT", size: "2 Bytes", signedRange: "-32,768 to 32,767", unsignedRange: "0 to 65,535 (Years, Port numbers)" },
        { type: "MEDIUMINT", size: "3 Bytes", signedRange: "-8.38M to +8.38M", unsignedRange: "0 to 16.77 Million (Zipcodes, Medium IDs)" },
        { type: "INT", size: "4 Bytes", signedRange: "-2.14B to +2.14B", unsignedRange: "0 to 4.29 Billion (Standard Primary Keys)" },
        { type: "BIGINT", size: "8 Bytes", signedRange: "-9.22Q to +9.22Q", unsignedRange: "0 to 18.44 Quintillion (Enterprise High-Scale)" }
      ],
      explanation:
        "Choosing the right integer type saves RAM and storage. Using `TINYINT UNSIGNED` (1 byte) instead of `INT` (4 bytes) saves 75% memory on columns like age or percentage scores, maximizing Buffer Pool density."
    },
    phase2_decimal_vs_float: {
      phaseNumber: "Phase 2: DECIMAL vs FLOAT",
      title: "2. Exact Precision (DECIMAL) vs Floating-Point Trap (FLOAT/DOUBLE)",
      badge: "Precision Comparison",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ THE DANGEROUS FLOATING-POINT ROUNDING TRAP:
-- FLOAT and DOUBLE use IEEE 754 Binary Floating-Point arithmetic:
-- In binary floating-point, 0.1 + 0.2 CANNOT be represented exactly!

SELECT 
    CAST(0.1 AS FLOAT) + CAST(0.2 AS FLOAT) AS float_sum,
    CAST(0.1 AS DECIMAL(10,2)) + CAST(0.2 AS DECIMAL(10,2)) AS decimal_sum;

-- FLOAT Result   : 0.30000001192092896  ❌ (Causes financial discrepancies!)
-- DECIMAL Result : 0.30                 ✅ (100% Mathematically Exact!)

-- NEVER use FLOAT or DOUBLE for monetary amounts, taxes, or invoices!`,
      metricsTable: [
        { metric: "DECIMAL(M, D)", nature: "Exact Fixed-Point", storage: "Packed binary (4B per 9 digits)", bestUse: "Banking, invoices, Indian Rupee (₹) ledgers 🔒" },
        { metric: "FLOAT", nature: "Approximate Float (32-bit)", storage: "4 Bytes (~7 decimal digits)", bestUse: "Scientific telemetry, GPS coordinates, physics" },
        { metric: "DOUBLE", nature: "Approximate Float (64-bit)", storage: "8 Bytes (~15 decimal digits)", bestUse: "Complex machine learning / graphics matrices" },
        { metric: "Rounding Error", nature: "FLOAT has rounding drift", storage: "Accumulates in SUM()", bestUse: "Banned in accounting schemas ❌" }
      ],
      explanation:
        "`FLOAT` and `DOUBLE` use IEEE 754 binary floating-point representation, which introduces subtle rounding discrepancies during mathematical operations. `DECIMAL` stores base-10 digits exactly in packed binary format, making it mandatory for all financial calculations."
    },
    phase3_financial_ledger: {
      phaseNumber: "Phase 3: Financial Ledgers",
      title: "3. Financial Accounting Precision: Indian Rupee (₹) Ledgers",
      badge: "Accounting Standard",
      badgeColor: "cyan",
      sqlSnippet: `-- 💳 PRODUCTION FINANCIAL ACCOUNTING SCHEMA:
CREATE TABLE bank_ledger (
    entry_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    account_number VARCHAR(20) NOT NULL,
    
    -- Exact Currency Amount in Indian Rupees (₹) with 2 decimal paise:
    transaction_amount DECIMAL(15, 2) NOT NULL,
    
    -- Micro-Interest rate stored with 4 decimal precision:
    annual_interest_rate DECIMAL(6, 4) NOT NULL, -- e.g. 0.0825 (8.2500%)
    
    running_balance DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_positive_amt CHECK (transaction_amount &ge; 0.00)
);

-- Accurate aggregation without losing a single paisa:
SELECT account_number, SUM(transaction_amount) AS total_deposits_inr
FROM bank_ledger
GROUP BY account_number;`,
      metricsTable: [
        { field: "transaction_amount", type: "DECIMAL(15, 2)", capacity: "Up to ₹999,999,999,999.99 (999 Billion ₹)" },
        { field: "interest_rate", type: "DECIMAL(6, 4)", capacity: "Up to 99.9999% exact interest rate" },
        { field: "running_balance", type: "DECIMAL(15, 2)", capacity: "Zero rounding error across 100M entries" },
        { field: "CHECK Constraint", type: "CHECK (amt >= 0)", capacity: "Enforces non-negative values cleanly" }
      ],
      explanation:
        "For financial systems in India, `DECIMAL(15, 2)` accommodates transactions up to 999 Billion Rupees while guaranteeing exact paise accuracy. Using `CHECK` constraints enforces non-negative constraints without relying on deprecated `UNSIGNED` float modifiers."
    },
    phase4_autoincrement_forecast: {
      phaseNumber: "Phase 4: PK Capacity Sizing",
      title: "4. Auto-Increment Primary Key Exhaustion Forecasting",
      badge: "DBA Capacity Sizing",
      badgeColor: "amber",
      sqlSnippet: `-- 📈 PRIMARY KEY AUTO-INCREMENT CAPACITY MONITORING:
-- Query current auto-increment values across high-volume tables:
SELECT 
    table_name,
    auto_increment,
    CASE 
        -- If column is INT UNSIGNED (Max: 4,294,967,295):
        WHEN auto_increment > 3500000000 THEN '🚨 CRITICAL: Approaching 4.29B Limit!'
        WHEN auto_increment > 2000000000 THEN '⚠️ WARNING: > 50% Capacity Used'
        ELSE '✅ SAFE'
    END AS capacity_status
FROM information_schema.tables
WHERE table_schema = 'college_admissions'
  AND auto_increment IS NOT NULL;

-- If a table will exceed 4.29 Billion records, use BIGINT UNSIGNED:
-- BIGINT UNSIGNED ceiling = 18,446,744,073,709,551,615 (18.44 Quintillion)!`,
      metricsTable: [
        { pkType: "INT SIGNED", maxRecords: "2.14 Billion", risk: "Exhausts quickly on clickstream / payment logs ⚠️" },
        { pkType: "INT UNSIGNED", maxRecords: "4.29 Billion", risk: "Standard for medium-scale entity tables" },
        { pkType: "BIGINT UNSIGNED", maxRecords: "18.44 Quintillion", risk: "Unbreakable for high-scale enterprise ledgers 🚀" },
        { pkType: "Exhaustion Hazard", maxRecords: "Error 1062", risk: "Halts all application write operations ❌" }
      ],
      explanation:
        "Reaching the maximum value of an `AUTO_INCREMENT` column halts all write traffic with duplicate key errors. Monitoring `auto_increment` in Information Schema and sizing high-volume tables to `BIGINT UNSIGNED` guarantees future scalability."
    }
  };

  const navItems = [
    { id: "numeric-overview", label: "1. Numeric Types Overview" },
    { id: "precision-diagram", label: "2. Precision & Rounding Diagram" },
    { id: "interactive-workbench", label: "3. Numeric Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Numeric Sizing Checklist" },
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
            <span>Topic 5 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Numeric Data Types
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Numeric Data Types Deep Dive: INT, BIGINT, DECIMAL (Exact Precision) vs FLOAT / DOUBLE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the mathematical foundation of MySQL numeric storage: explore integer byte ranges (<code className="text-emerald-400 font-mono">TINYINT</code> to <code className="text-cyan-400 font-mono">BIGINT</code>), eliminate floating-point rounding errors with exact fixed-point <code className="text-amber-400 font-mono">DECIMAL</code>, and forecast primary key auto-increment scalability.
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
        {/* SECTION 1: Numeric Overview */}
        <section id="numeric-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Numeric Data Type Spectrum
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Distinguishing between integer bounds, exact decimal arithmetic, and approximate scientific floats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. Integers</span>
              <h3 className="font-bold text-white">TINYINT to BIGINT</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1 to 8 bytes. Signed and Unsigned options for IDs, counts, and flags.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. DECIMAL(M, D)</span>
              <h3 className="font-bold text-white">Exact Fixed-Point</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Packed binary format. 100% exact math. Mandatory for Indian Rupee (₹) ledgers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. FLOAT / DOUBLE</span>
              <h3 className="font-bold text-white">Approximate Float</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                IEEE 754 standard. High-range scientific calculations and sensor telemetry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. BIT(M)</span>
              <h3 className="font-bold text-white">Bitfield Flags</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1 to 64 bits. Compact storage for boolean switches and permission bitmasks.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Precision Diagram */}
        <section id="precision-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Exact DECIMAL vs Approximate FLOAT Arithmetic
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why IEEE 754 binary floating-point representation causes financial rounding errors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 5.1: Mathematical Comparison: FLOAT Rounding Drift vs DECIMAL Accuracy
              </h3>
              <span className="text-xs text-slate-400 font-mono">Arithmetic Engine</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* Left Box: Approximate FLOAT */}
                <rect x="20" y="40" width="440" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="240" y="70" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">
                  1. APPROXIMATE FLOATING-POINT (FLOAT / DOUBLE)
                </text>
                <line x1="20" y1="85" x2="460" y2="85" stroke="#334155" />

                <rect x="40" y="105" width="400" height="50" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="50" y="127" fill="#fca5a5" fontSize="11" fontWeight="bold">Formula: 0.1 + 0.2 in IEEE 754 Binary</text>
                <text x="50" y="143" fill="#94a3b8" fontSize="9">Non-terminating binary fraction in base-2</text>

                <rect x="40" y="165" width="400" height="50" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="50" y="187" fill="#f87171" fontSize="11" fontWeight="bold">Result = 0.30000001192092896 ❌</text>
                <text x="50" y="203" fill="#fca5a5" fontSize="9">Introduces rounding error drift in SUM() queries!</text>

                <rect x="40" y="225" width="400" height="55" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="50" y="245" fill="#fca5a5" fontSize="10" fontWeight="bold">Financial Impact: Audit Discrepancies!</text>
                <text x="50" y="260" fill="#94a3b8" fontSize="9">Banned in banking, payroll, and invoice databases</text>

                {/* Right Box: Exact DECIMAL */}
                <rect x="490" y="40" width="440" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="710" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  2. EXACT FIXED-POINT (DECIMAL / NUMERIC)
                </text>
                <line x1="490" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="510" y="105" width="400" height="50" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="520" y="127" fill="#a7f3d0" fontSize="11" fontWeight="bold">Formula: 0.10 + 0.20 in DECIMAL(10, 2)</text>
                <text x="520" y="143" fill="#94a3b8" fontSize="9">Stores exact base-10 digits in packed binary chunks</text>

                <rect x="510" y="165" width="400" height="50" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="520" y="187" fill="#34d399" fontSize="12" fontWeight="bold">Result = 0.30 (100% Mathematically Exact!) ✅</text>
                <text x="520" y="203" fill="#bae6fd" fontSize="9">Zero rounding drift across millions of transactions</text>

                <rect x="510" y="225" width="400" height="55" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="520" y="245" fill="#34d399" fontSize="10" fontWeight="bold">Financial Standard: Indian Rupee (₹) Ledgers</text>
                <text x="520" y="260" fill="#bae6fd" fontSize="9">Guarantees exact paise accuracy for enterprise banking</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Numeric Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Numeric Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a numeric phase to inspect integer ranges, DECIMAL ledger definitions, and auto-increment monitoring queries.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(numericPhases).map((key) => {
              const ph = numericPhases[key];
              const isSelected = selectedNumericPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedNumericPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                &gt;
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "rose" && "bg-rose-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
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
                {numericPhases[selectedNumericPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  numericPhases[selectedNumericPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  numericPhases[selectedNumericPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800",
                  numericPhases[selectedNumericPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  numericPhases[selectedNumericPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800"
                )}
              >
                {numericPhases[selectedNumericPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                DDL &amp; Arithmetic Precision Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {numericPhases[selectedNumericPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Numeric Data Type Specifications:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Numeric Type / Parameter</th>
                      <th className="py-2.5 px-4">Byte Size &amp; Nature</th>
                      <th className="py-2.5 px-4">Signed / Unsigned Range &amp; Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {numericPhases[selectedNumericPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.type || row.metric || row.field || row.pkType}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.size || row.nature || row.type || row.maxRecords}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.unsignedRange || row.bestUse || row.capacity || row.risk}
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
                {numericPhases[selectedNumericPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Numeric Types Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Eliminating audit rounding errors and preventing auto-increment outages in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Financial Precision Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Resolving ₹4,850 Financial Audit Discrepancy in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Exact Math Restored
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an institute fee ledger using `FLOAT` for tuition fee payments accumulated a ₹4,850.34 discrepancy across 80,000 student transactions due to floating-point rounding. Converting the column to `DECIMAL(12, 2)` restored 100% exact mathematical reconciliation, passing external financial audit with zero paise error.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Auto-Increment Migration */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Preventing 4.29B Auto-Increment Outage in Kolkata Telemetry
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Outage Migration
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a IoT smart meter telemetry table approached 3.8 billion rows on an `INT UNSIGNED` primary key, threatening a catastrophic write outage at 4.29 billion. Executing an online DDL migration to `BIGINT UNSIGNED` expanded the key capacity to 18.44 Quintillion, ensuring decades of uninterrupted scaling.
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
              Avoid numerical precision flaws and primary key sequence exhaustion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using FLOAT/DOUBLE for Money
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using floating-point types for currency causes cumulative rounding errors that corrupt financial balances and fail regulatory audits.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use DECIMAL(15, 2) for financial ledgers.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: INT Primary Keys on High-Write Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                `INT SIGNED` tops out at 2.14 billion rows; high-volume event logs will exhaust the sequence, triggering Error 1062 and halting all writes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use BIGINT UNSIGNED for high-volume append tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Right-Size Integer Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `TINYINT UNSIGNED` (0-255) for ages and status codes to save 75% memory and disk space compared to standard 4-byte `INT`.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes Buffer Pool caching density.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Monitor auto_increment in Catalog
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Query `information_schema.tables` in weekly health checks to verify auto-increment sequence headroom before tables reach 70% capacity.
              </p>
              <div className="text-xs text-slate-400">
                Early warning against primary key exhaustion outages.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Numeric Sizing Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Numeric Sizing Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify mathematical precision and sequence safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Numeric Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Currency in DECIMAL</strong> = Verify all prices and amounts use `DECIMAL(M, 2)`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">High-Volume PKs</strong> = Use `BIGINT UNSIGNED` on high-traffic event tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Right-Sized Integers</strong> = Use `TINYINT` / `SMALLINT` for compact domain ranges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">FLOAT Restricted</strong> = Limit `FLOAT/DOUBLE` strictly to scientific metrics.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe INT(11) in MySQL 8.0...”</span>
                  In MySQL 8.0, the `(11)` in `INT(11)` is ignored! It never meant 11 bytes or 11 digits—it was only for ZEROFILL formatting. An INT is always 4 bytes!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about DECIMAL Packed Storage...”</span>
                  MySQL packs groups of 9 decimal digits into 4 bytes. That is why `DECIMAL(10, 2)` (8 integer + 2 fraction digits) takes only 5 bytes on disk!
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
              Comprehensive reference questions covering Integer Sizing, DECIMAL, and FLOAT/DOUBLE.
            </p>
          </div>

          <FAQTemplate
            title="Numeric Data Types (INT, BIGINT, DECIMAL vs FLOAT) FAQs"
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
            title="Numeric Data Types Deep Dive: INT, BIGINT, DECIMAL (Exact Precision) vs FLOAT / DOUBLE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="Numeric data type selection is where database engineering meets exact mathematics. In financial and accounting systems, using FLOAT instead of DECIMAL is one of the most dangerous rookie mistakes—cumulative binary rounding errors will corrupt balance sheets and trigger audit discrepancies. Always use DECIMAL for currency amounts (like Indian Rupees ₹), right-size integer types to save Buffer Pool RAM, and size high-volume primary keys to BIGINT UNSIGNED to prevent catastrophic auto-increment exhaustion outages!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
