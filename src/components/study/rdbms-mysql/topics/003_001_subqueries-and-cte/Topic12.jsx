import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Recursive CTEs for Generating Sequences, Number Series, and Date Ranges
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on dynamic sequence generation, continuous calendar date ranges, CSV string tokenization, and loan amortization schedules.
 */
const Topic12 = () => {
  // Interactive Simulator State
  const [selectedSequenceScenario, setSelectedSequenceScenario] = useState("calendar_gap_zero_fill");

  const sequenceScenarios = {
    calendar_gap_zero_fill: {
      title: "1. Time-Series Date Generator & Zero-Fill Gap Elimination",
      badge: "Date Grid & Gap Fill",
      badgeColor: "emerald",
      sqlQuery: `-- Step 1: Generate continuous 10-day calendar series for September 2026:
WITH RECURSIVE SeptemberGrid AS (
    SELECT CAST('2026-09-01' AS DATE) AS cal_date
    UNION ALL
    SELECT DATE_ADD(cal_date, INTERVAL 1 DAY)
    FROM SeptemberGrid
    WHERE cal_date < '2026-09-10'
)
-- Step 2: LEFT JOIN against payments to zero-fill missing days:
SELECT 
    g.cal_date,
    DAYNAME(g.cal_date) AS day_of_week,
    COALESCE(SUM(p.amount_paid_inr), 0.00) AS total_collected_inr,
    CASE 
        WHEN SUM(p.amount_paid_inr) IS NULL THEN '⚠️ Zero Activity (Filled)'
        ELSE '✅ Transactions Recorded'
    END AS activity_status
FROM SeptemberGrid g
LEFT JOIN fee_payments p ON g.cal_date = DATE(p.payment_date)
GROUP BY g.cal_date
ORDER BY g.cal_date ASC;`,
      resultRows: [
        { id: "2026-09-01", name: "Tuesday", metric1: "₹25,000.00", metric2: "Mamata Hui Fee", result: "Active Revenue Day", status: "Transactions" },
        { id: "2026-09-02", name: "Wednesday", metric1: "₹0.00", metric2: "[No Payments]", result: "Zero-Filled Missing Day", status: "Zero-Filled" },
        { id: "2026-09-03", name: "Thursday", metric1: "₹22,000.00", metric2: "Abhronila Saha Fee", result: "Active Revenue Day", status: "Transactions" },
        { id: "2026-09-04", name: "Friday", metric1: "₹0.00", metric2: "[No Payments]", result: "Zero-Filled Missing Day", status: "Zero-Filled" },
      ],
      explanation:
        "Generates a complete continuous date sequence (`2026-09-01` to `2026-09-10`). The `LEFT JOIN` with `COALESCE` ensures days with 0 payments appear with ₹0.00 rather than vanishing from analytics charts.",
    },
    csv_string_tokenization: {
      title: "2. Recursive CSV String Tokenization (1NF Row Splitting)",
      badge: "String Splitting",
      badgeColor: "cyan",
      sqlQuery: `-- Splitting comma-separated hobby tags into atomic 1NF rows:
WITH RECURSIVE StringTokenizer AS (
    -- Anchor Member: Extract first token and remaining string:
    SELECT 
        student_id,
        CAST(SUBSTRING_INDEX(hobbies_csv, ',', 1) AS CHAR(100)) AS single_hobby,
        CAST(SUBSTRING(hobbies_csv, LENGTH(SUBSTRING_INDEX(hobbies_csv, ',', 1)) + 2) AS CHAR(255)) AS remaining_str
    FROM student_raw_profiles
    
    UNION ALL
    
    -- Recursive Member: Extract next token until remaining string is empty:
    SELECT 
        student_id,
        CAST(SUBSTRING_INDEX(remaining_str, ',', 1) AS CHAR(100)),
        CAST(SUBSTRING(remaining_str, LENGTH(SUBSTRING_INDEX(remaining_str, ',', 1)) + 2) AS CHAR(255))
    FROM StringTokenizer
    WHERE remaining_str <> ''
)
SELECT student_id, TRIM(single_hobby) AS atomic_hobby_1nf
FROM StringTokenizer
ORDER BY student_id, single_hobby;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", metric1: "Raw: 'SQL, Python, Chess'", metric2: "Iteration 0", result: "SQL (1NF Row)", status: "Atomic Tag" },
        { id: "STU-101", name: "Mamata Hui", metric1: "Raw: 'SQL, Python, Chess'", metric2: "Iteration 1", result: "Python (1NF Row)", status: "Atomic Tag" },
        { id: "STU-101", name: "Mamata Hui", metric1: "Raw: 'SQL, Python, Chess'", metric2: "Iteration 2", result: "Chess (1NF Row)", status: "Atomic Tag" },
      ],
      explanation:
        "Deconstructs unnormalized comma-separated cell strings into individual atomic rows in pure declarative SQL, resolving First Normal Form (1NF) spreadsheet violations.",
    },
    loan_amortization_schedule: {
      title: "3. Financial Loan Amortization Schedule (Monthly EMI Rollup)",
      badge: "Loan Amortization",
      badgeColor: "amber",
      sqlQuery: `-- Computing Declining Loan Amortization Schedule (₹100,000 Loan, 12% Annual, ₹10,000 EMI):
WITH RECURSIVE LoanSchedule AS (
    -- Anchor Member: Month 1 opening balance:
    SELECT 
        1 AS month_num,
        100000.00 AS opening_balance,
        ROUND(100000.00 * (0.12 / 12), 2) AS interest_accrued,
        ROUND(10000.00 - (100000.00 * (0.12 / 12)), 2) AS principal_paid,
        ROUND(100000.00 - (10000.00 - (100000.00 * (0.12 / 12))), 2) AS closing_balance
        
    UNION ALL
    
    -- Recursive Member: Month k+1 amortizes on Month k closing balance:
    SELECT 
        month_num + 1,
        closing_balance,
        ROUND(closing_balance * (0.12 / 12), 2),
        ROUND(10000.00 - (closing_balance * (0.12 / 12)), 2),
        ROUND(closing_balance - (10000.00 - (closing_balance * (0.12 / 12))), 2)
    FROM LoanSchedule
    WHERE closing_balance > 10000.00
)
SELECT * FROM LoanSchedule;`,
      resultRows: [
        { id: "Month 1", name: "Opening: ₹100,000.00", metric1: "Interest: ₹1,000.00", metric2: "Principal: ₹9,000.00", result: "Closing: ₹91,000.00", status: "Amortized" },
        { id: "Month 2", name: "Opening: ₹91,000.00", metric1: "Interest: ₹910.00", metric2: "Principal: ₹9,090.00", result: "Closing: ₹81,910.00", status: "Amortized" },
        { id: "Month 3", name: "Opening: ₹81,910.00", metric1: "Interest: ₹819.10", metric2: "Principal: ₹9,180.90", result: "Closing: ₹72,729.10", status: "Amortized" },
      ],
      explanation:
        "Recursively computes monthly interest accrued, principal reduction, and declining loan balances across subsequent months in pure SQL.",
    },
    missing_invoice_audit: {
      title: "4. Forensic Audit: Detecting Missing Invoice Sequence Gaps",
      badge: "Gap Audit",
      badgeColor: "rose",
      sqlQuery: `-- Forensic Audit: Finding skipped or deleted invoice numbers:
WITH RECURSIVE FullSequence AS (
    -- Anchor: Minimum invoice number in system:
    SELECT 1001 AS expected_inv_num
    UNION ALL
    -- Recursive: Increment to Maximum invoice number:
    SELECT expected_inv_num + 1
    FROM FullSequence
    WHERE expected_inv_num < 1008
)
-- LEFT JOIN against physical invoice table to find NULL entries (GAPS!):
SELECT 
    s.expected_inv_num AS missing_invoice_id,
    '⚠️ SKIPPED / DELETED INVOICE GAP' AS audit_finding
FROM FullSequence s
LEFT JOIN issued_invoices i ON s.expected_inv_num = i.invoice_num
WHERE i.invoice_num IS NULL;`,
      resultRows: [
        { id: "INV-1004", name: "Audit Flag", metric1: "Expected: 1004", metric2: "Physical: NULL", result: "Missing Invoice Found", status: "Audit Flag" },
        { id: "INV-1007", name: "Audit Flag", metric1: "Expected: 1007", metric2: "Physical: NULL", result: "Missing Invoice Found", status: "Audit Flag" },
      ],
      explanation:
        "Generates the full sequential integer range and performs an Anti-Join to detect skipped, deleted, or fraudulent invoice sequence numbers.",
    },
  };

  const navItems = [
    { id: "sequence-concept", label: "1. Dynamic Sequences vs Tally Tables" },
    { id: "core-patterns", label: "2. Core Generation Patterns" },
    { id: "svg-diagrams", label: "3. Calendar Grid & String Split SVGs" },
    { id: "interactive-sandbox", label: "4. Live Sequence Workbench" },
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
            <span>Module 003_001</span>
            <span>•</span>
            <span>Topic 12 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Time-Series & Series Engineering
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Generating Sequences, Number Series & Dates
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Eliminate static numbers and tally tables forever. Master dynamic calendar date grids, zero-filling time-series gaps, CSV string tokenization into 1NF rows, and financial loan amortization schedules in pure SQL.
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
        {/* SECTION 1: Concept */}
        <section id="sequence-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Dynamic Sequences vs Physical Tally Tables
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why generating sequences on-the-fly in RAM replaces physical numbers and date dimension tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🗓️</span> Zero-Storage Date Grids
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate bounding calendar ranges in RAM without needing to maintain static physical date dimension tables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>📊</span> Filling Time-Series Gaps
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-cyan-300 font-mono">LEFT JOIN</code> against transaction data with <code className="text-cyan-300 font-mono">COALESCE()</code> to guarantee continuous daily metrics without missing dates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🔤</span> CSV String Tokenization
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deconstruct delimited spreadsheet cell values into atomic First Normal Form (1NF) rows directly in declarative SQL.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Core Patterns */}
        <section id="core-patterns" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Core Generation Patterns & Blueprints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The four essential sequence generation patterns in enterprise SQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-emerald-400">1. Calendar Date Generator</h3>
              <p className="text-xs text-slate-300">
                Increments dates daily: <code className="text-emerald-300 font-mono">DATE_ADD(cal_date, INTERVAL 1 DAY)</code>.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-cyan-400">2. String Tokenizer</h3>
              <p className="text-xs text-slate-300">
                Extracts tokens iteratively: <code className="text-cyan-300 font-mono">SUBSTRING_INDEX(str, ',', 1)</code>.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-amber-400">3. Loan Amortization Schedule</h3>
              <p className="text-xs text-slate-300">
                Calculates monthly interest, principal payment, and declining balance.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-rose-400">4. Forensic Gap Audit</h3>
              <p className="text-xs text-slate-300">
                Detects missing sequential IDs: <code className="text-rose-300 font-mono">LEFT JOIN ... WHERE id IS NULL</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Date Grid Zero-Filling & CSV Tokenization
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing continuous calendar alignment against recursive string splitting.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Date Grid Gap Fill */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Calendar Date Grid Zero-Filling Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Recursive Grid */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Recursive Date Grid</text>
                    <rect x="45" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Sep 01, Sep 02, Sep 03, Sep 04</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">100% Continuous (No Gaps)</text>
                  </g>

                  {/* Step 2: Raw Sparse Data */}
                  <g>
                    <rect x="310" y="30" width="240" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="430" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">2. Sparse Transaction Logs</text>
                    <rect x="325" y="70" width="210" height="40" rx="4" fill="#1e293b" />
                    <text x="430" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Sep 01 (₹25k), Sep 03 (₹22k)</text>
                    <text x="430" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Missing Sep 02 and Sep 04!</text>
                  </g>

                  {/* Step 3: Final Zero Filled Output */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="705" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. LEFT JOIN + COALESCE</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#022c22" />
                    <text x="705" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Sep 02 → ₹0.00 | Sep 04 → ₹0.00</text>
                    <text x="705" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Zero Reporting Gaps!</text>
                  </g>

                  {/* Connectors */}
                  <path d="M 270 80 L 310 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 590 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: String Tokenization */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Recursive CSV String Tokenization Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Raw String */}
                  <g>
                    <rect x="30" y="45" width="240" height="70" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="75" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Raw CSV Cell (Non-1NF)</text>
                    <text x="150" y="95" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">'SQL, Python, Chess'</text>
                  </g>

                  {/* Split Steps */}
                  <g>
                    <rect x="380" y="15" width="440" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="600" y="37" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Iter 0: Token = 'SQL', Remaining = 'Python, Chess'</text>
                  </g>
                  <g>
                    <rect x="380" y="60" width="440" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="600" y="82" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Iter 1: Token = 'Python', Remaining = 'Chess'</text>
                  </g>
                  <g>
                    <rect x="380" y="105" width="440" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="600" y="127" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Iter 2: Token = 'Chess', Remaining = '' (HALT)</text>
                  </g>

                  {/* Flow Arrows */}
                  <path d="M 270 80 L 380 32" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 270 80 L 380 77" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 270 80 L 380 122" stroke="#10b981" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Sequence & Series Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test calendar zero-filling, CSV string tokenization, loan amortization schedules, and forensic gap audits live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(sequenceScenarios).map(([key, item]) => {
              const isActive = selectedSequenceScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSequenceScenario(key)}
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
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Series" : "○ Run Series"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{sequenceScenarios[selectedSequenceScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{sequenceScenarios[selectedSequenceScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Dynamic Series Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Recursive SQL Generator</span>
                <span className="text-emerald-400">Pure Memory Execution</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {sequenceScenarios[selectedSequenceScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Date / Step ID</th>
                    <th className="py-3 px-4 text-white">Entity / Interval</th>
                    <th className="py-3 px-4 text-emerald-400">Metric 1</th>
                    <th className="py-3 px-4 text-cyan-400">Metric 2</th>
                    <th className="py-3 px-4 text-amber-400">Calculated Output</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {sequenceScenarios[selectedSequenceScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.metric1}</td>
                      <td className="py-3 px-4 text-slate-300">{row.metric2}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.result}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
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
              Real-world time-series gap zero-filling and spreadsheet normalization.
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
                  Eliminating Reporting Gaps in Academy Daily Cash Flow Charts
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Finance</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited academy financial charts: In frontend line charts, days with 0 payments disappeared entirely, causing incorrect slope calculations! Implementing a recursive date grid with a `LEFT JOIN` and `COALESCE` zero-filled all unrecorded days in 2ms, producing smooth, continuous financial curves!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Continuous Financial Time-Series with Zero Gaps:
WITH RECURSIVE CalGrid AS (
    SELECT DATE('2026-09-01') AS dt UNION ALL SELECT DATE_ADD(dt, INTERVAL 1 DAY) FROM CalGrid WHERE dt < '2026-09-30'
)
SELECT g.dt, COALESCE(SUM(p.amount_paid_inr), 0.00) AS daily_total
FROM CalGrid g LEFT JOIN fee_payments p ON g.dt = DATE(p.payment_date)
GROUP BY g.dt ORDER BY g.dt;`}
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
              Avoid default recursion limits and date typing errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Generating 5+ Year Series Without Raising Limits
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Generating 5 years of daily dates requires 1,826 iterations. Running this without raising <code className="text-rose-300 font-mono">cte_max_recursion_depth</code> aborts with Error 3636 after day 1000!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Add hint <code className="text-emerald-400 font-mono">/*+ SET_VAR(cte_max_recursion_depth = 5000) */</code>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always CAST Initial Dates in Anchor
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always write <code className="text-emerald-400 font-mono">CAST('2026-09-01' AS DATE)</code> in the Anchor Member rather than a raw string literal to guarantee native date type inheritance.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees fast native date arithmetic in the engine.
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
              Key takeaways for sequence and date generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Sequence Generation Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use Recursive CTEs to generate sequences on-the-fly in RAM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Eliminate physical Numbers and Date Dimension tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Zero-fill missing reporting dates using <code className="text-cyan-300 font-mono">LEFT JOIN + COALESCE()</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Raise <code className="text-cyan-300 font-mono">cte_max_recursion_depth</code> for multi-year time-series.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe CSV string unnesting...”</span>
                  Recursive string splitting with <code className="text-cyan-300 font-mono">SUBSTRING_INDEX()</code> is the fastest way to normalize dirty imported spreadsheet columns into pure 1NF relational rows!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about financial amortization...”</span>
                  Recursive CTEs can compute declining loan balances, compound interest, and depreciation schedules in pure declarative SQL without procedural code!
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
              Comprehensive reference questions covering dynamic sequence generation, date ranges, gap zero-filling, string splitting, and loan amortization.
            </p>
          </div>

          <FAQTemplate
            title="Generating Sequences & Dates FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Recursive CTEs for Generating Sequences, Number Series, and Date Ranges"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic12_note.txt"
          />

          <Teacher
            note="Dynamic sequence generation is one of the most practical everyday superpowers of Recursive CTEs. You no longer need static tally tables in your schema. Whenever you need to build daily time-series reports, zero-fill gaps, split CSV tags into 1NF rows, or compute loan schedules, a clean 5-line recursive CTE will generate exactly the sequence you need in RAM in milliseconds."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
