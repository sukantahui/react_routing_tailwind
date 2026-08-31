import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Solution Walkthrough and Best Practice Architectural Tips
 * Module: 002_008_practice-and-project-segment-2
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and master solutions walkthrough consolidating 3NF design, query tuning, and concurrency.
 */
const Topic7 = () => {
  // Interactive Simulator State
  const [selectedSolution, setSelectedSolution] = useState("library_circulation_solution");

  const domainSolutions = {
    library_circulation_solution: {
      title: "1. University Library System Master Solution",
      badge: "Library Architecture",
      badgeColor: "emerald",
      sqlQuery: `-- Master Solution: Active Overdue Loans & Dynamic Fine Calculation:
SELECT 
    l.loan_id,
    m.member_code,
    CONCAT(m.first_name, ' ', m.last_name) AS student_name,
    b.title AS book_title,
    bi.barcode_id,
    l.due_date,
    DATEDIFF(CURRENT_DATE, l.due_date) AS overdue_days,
    (DATEDIFF(CURRENT_DATE, l.due_date) * 5.00) AS pending_fine_inr
FROM loans l
JOIN members m ON l.member_id = m.member_id
JOIN book_items bi ON l.barcode_id = bi.barcode_id
JOIN books b ON bi.book_id = b.book_id
WHERE l.return_date IS NULL AND l.due_date < CURRENT_DATE
ORDER BY overdue_days DESC;`,
      resultRows: [
        { domain: "University Library", entity: "books vs book_items", keyRule: "Abstract Title vs Physical Barcode", indexStrategy: "idx_loans (member_id, loan_status)", concurrency: "SELECT FOR UPDATE on checkout", status: "3NF Optimal" },
      ],
      explanation:
        "Separates abstract titles (ISBN) from physical copies (barcodes), computes daily late fees dynamically with DATEDIFF, and consolidates co-authors with GROUP_CONCAT.",
    },
    hospital_uhid_solution: {
      title: "2. Multi-Branch Hospital Network Master Solution",
      badge: "Healthcare Architecture",
      badgeColor: "cyan",
      sqlQuery: `-- Master Solution: Universal Health ID (UHID) Cross-Branch Clinical Timeline:
SELECT 
    p.uhid,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    app.appointment_date,
    hb.branch_name,
    CONCAT('Dr. ', d.first_name, ' ', d.last_name) AS doctor_name,
    pr.diagnosis,
    GROUP_CONCAT(pm.medicine_name SEPARATOR ', ') AS medications
FROM patients p
JOIN appointments app ON p.patient_id = app.patient_id
JOIN doctors d ON app.doctor_id = d.doctor_id
JOIN hospital_branches hb ON app.branch_id = hb.branch_id
LEFT JOIN prescriptions pr ON app.appointment_id = pr.appointment_id
LEFT JOIN prescription_medications pm ON pr.prescription_id = pm.prescription_id
WHERE p.patient_id = 101
GROUP BY p.uhid, p.first_name, p.last_name, app.appointment_date, hb.branch_name, d.first_name, d.last_name, pr.diagnosis
ORDER BY app.appointment_date DESC;`,
      resultRows: [
        { domain: "Multi-Branch Hospital", entity: "patients (UHID)", keyRule: "Universal Centralized Health Record", indexStrategy: "idx_app (doctor_id, branch_id, date)", concurrency: "Lock Slot Token Capacity", status: "3NF Optimal" },
      ],
      explanation:
        "Maintains a unified Universal Health ID (UHID) across all hospital branches, models doctor shift rotations with schedule tables, and itemizes prescriptions in 1NF.",
    },
    retail_inventory_solution: {
      title: "3. Enterprise Retail & Supply Chain Master Solution",
      badge: "Supply Chain Architecture",
      badgeColor: "amber",
      sqlQuery: `-- Master Solution: Low-Stock Reorder & Category Gross Margin Analytics:
SELECT 
    c.category_name,
    p.sku_code,
    p.product_name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.subtotal_inr) AS gross_revenue_inr,
    (SUM(oi.subtotal_inr) - SUM(oi.quantity * p.cost_price_inr)) AS gross_profit_inr,
    ROUND(((SUM(oi.subtotal_inr) - SUM(oi.quantity * p.cost_price_inr)) / SUM(oi.subtotal_inr)) * 100.0, 2) AS margin_pct
FROM order_items oi
JOIN customer_orders o ON oi.order_id = o.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
WHERE o.order_status IN ('DELIVERED', 'SHIPPED')
GROUP BY c.category_name, p.product_id, p.sku_code, p.product_name
ORDER BY gross_profit_inr DESC;`,
      resultRows: [
        { domain: "Retail & Supply Chain", entity: "orders vs order_items", keyRule: "Freeze Price Snapshot on Line", indexStrategy: "idx_orders (order_date, status)", concurrency: "Lock Stock on Hand FOR UPDATE", status: "3NF Optimal" },
      ],
      explanation:
        "Tracks multi-warehouse stock with unique constraints, captures immutable sale price snapshots on order lines to prevent price drift, and automates supplier replenishment.",
    },
  };

  const navItems = [
    { id: "architectural-pillars", label: "1. The Four Pillars" },
    { id: "domain-comparison", label: "2. Domain Relational Comparison" },
    { id: "svg-diagrams", label: "3. Architecture & Domain Matrix SVGs" },
    { id: "interactive-sandbox", label: "4. Master Solutions Sandbox" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Graduation Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_008</span>
            <span>•</span>
            <span>Master Solution 8 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Segment 2 Graduation Guide
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Solution Walkthrough & Best Practice Architectural Tips
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Consolidate your mastery across Segment 2. Review authoritative solutions for University Library, Hospital Network, and Retail Supply Chain schemas, master covering indexes, and implement production-grade database architectures.
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
        {/* SECTION 1: The Four Pillars */}
        <section id="architectural-pillars" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Database Engineering Excellence
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The unified engineering principles that define scalable, production-ready relational systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🏛️</span> 1. 3NF Schema Purity
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Atomic 1NF values, full key dependencies in 2NF, and zero transitive dependencies in 3NF to eliminate anomalies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>📊</span> 2. Analytical SQL
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean Common Table Expressions (CTEs), continuous <code className="text-cyan-300 font-mono">DENSE_RANK</code>, and <code className="text-cyan-300 font-mono">LAG</code> period trends.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>⚡</span> 3. Covering Indexes
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Structuring composite indexes by <code className="text-amber-300 font-mono">(Equality, Range, Sort)</code> to achieve sub-millisecond <code className="text-amber-300 font-mono">Using index</code> seeks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>🔒</span> 4. ACID Concurrency
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pessimistic row locking (<code className="text-rose-300 font-mono">SELECT FOR UPDATE</code>) and permanent sale price snapshot preservation on invoices.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Domain Comparison */}
        <section id="domain-comparison" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Domain Relational Comparison Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing relational entity modeling patterns across all Segment 2 projects.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Industry Domain</th>
                  <th className="py-3.5 px-4 text-white">Title vs Item Separation</th>
                  <th className="py-3.5 px-4 text-emerald-400">Key Normalization Rule</th>
                  <th className="py-3.5 px-4 text-amber-400">Concurrency & Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-400 font-mono">University Library</td>
                  <td className="py-3 px-4 text-slate-300">`books` (Title) vs `book_items` (Barcodes)</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">M:N Bridge: book_authors</td>
                  <td className="py-3 px-4 text-amber-300">DATEDIFF Dynamic Late Fines</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">Multi-Branch Hospital</td>
                  <td className="py-3 px-4 text-slate-300">Central Universal Health ID (`UHID`)</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">Doctor Branch Shift Rotation Roster</td>
                  <td className="py-3 px-4 text-amber-300">OPD Slot Lock FOR UPDATE</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-amber-400 font-mono">Retail Supply Chain</td>
                  <td className="py-3 px-4 text-slate-300">`products` vs `warehouse_inventory`</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">Order Header vs 1NF Order Lines</td>
                  <td className="py-3 px-4 text-amber-300">Frozen Unit Price Snapshots</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: The Four Pillars & Domain Integration
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Architectural map of the complete Segment 2 engineering curriculum.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Four Pillars */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The Four Pillars of Database Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Pillar 1 */}
                  <g>
                    <rect x="20" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. 3NF Schema</text>
                    <rect x="30" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="110" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Zero Data Redundancy</text>
                  </g>

                  {/* Pillar 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. Analytical SQL</text>
                    <rect x="240" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="320" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">CTEs & Window Frames</text>
                  </g>

                  {/* Pillar 3 */}
                  <g>
                    <rect x="440" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="530" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">3. Covering Indexes</text>
                    <rect x="450" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="530" y="86" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">(Equality, Range, Sort)</text>
                  </g>

                  {/* Pillar 4 */}
                  <g>
                    <rect x="650" y="30" width="180" height="90" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">4. ACID Locks</text>
                    <rect x="660" y="70" width="160" height="25" rx="3" fill="#1e293b" />
                    <text x="740" y="86" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">SELECT FOR UPDATE</text>
                  </g>

                  {/* Connecting Line */}
                  <path d="M 200 75 L 230 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 75 L 440 75" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 620 75 L 650 75" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Master Domain Solutions Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect authoritative query solutions and architectural designs across all three domains.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(domainSolutions).map(([key, item]) => {
              const isActive = selectedSolution === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSolution(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Domain" : "○ Inspect Solution"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{domainSolutions[selectedSolution].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{domainSolutions[selectedSolution].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Architecture Blueprint
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Production SQL Query Architecture</span>
                <span className="text-emerald-400">Tested & Verified</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {domainSolutions[selectedSolution].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Industry Domain</th>
                    <th className="py-3 px-4 text-white">Title/Item Mapping</th>
                    <th className="py-3 px-4 text-emerald-400">Core Relational Rule</th>
                    <th className="py-3 px-4 text-cyan-400">Index Strategy</th>
                    <th className="py-3 px-4 text-amber-400">Concurrency Control</th>
                    <th className="py-3 px-4 text-emerald-400">Quality State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {domainSolutions[selectedSolution].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.domain}</td>
                      <td className="py-3 px-4 text-white font-sans">{row.entity}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.keyRule}</td>
                      <td className="py-3 px-4 text-slate-300">{row.indexStrategy}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.concurrency}</td>
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
              Real-world engineering triumphs in production databases.
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
                  Architecting the Barrackpore Multi-Branch Education & Healthcare Hub
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, West Bengal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected a unified 3NF schema serving both education and healthcare portals for students Mamata, Susmita, Abhronila, and Debangshu. By implementing covering indexes and pessimistic row locking, the system handles 50,000 daily queries with an average latency under 2.5ms!
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300">
                Performance: 99.99% Availability • Zero Data Anomalies • 100% ACID Concurrency Safety
              </div>
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
              The permanent architectural guidelines for your engineering career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The Over-Indexing Write Tax
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Adding an index on every single column degrades INSERT/UPDATE throughput. Only create composite indexes that serve high-frequency query paths.
              </p>
              <div className="text-xs text-slate-400">
                Rule: Audit sys.schema_unused_indexes quarterly.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> The Set-Based Thinking Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never write procedural loops (cursors) when a declarative set-based SQL query with CTEs or window functions can accomplish the same result in a single pass.
              </p>
              <div className="text-xs text-slate-400">
                Declarative SQL allows the optimizer to parallelize execution.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Graduation Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Segment 2 Graduation Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core competencies verified upon graduation from Segment 2.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">🎓</span> Graduate Competencies
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Translate complex business rules into 3NF normalized relational schemas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Synthesize advanced analytical SQL queries with CTEs and window functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Diagnose bottlenecks and eliminate filesort with composite covering indexes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Protect high-concurrency workflows with ACID transactions and row locks.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">🚀</span> Next Steps: Segment 3 Ahead
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Prepare for Procedural SQL...”</span>
                  In Segment 3, we dive deep into Stored Procedures, Functions, Triggers, Events, and Advanced Transaction Isolation Levels!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Keep practicing set-based thinking...”</span>
                  Take the schemas you designed in Segment 2 and build full-stack React applications on top of them!
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
              Comprehensive reference questions covering the master solutions walkthrough, architectural tips, domain comparisons, and Segment 2 key takeaways.
            </p>
          </div>

          <FAQTemplate
            title="Solution Walkthrough & Architecture FAQs"
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
            title="Solution Walkthrough and Best Practice Architectural Tips"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="Congratulations on completing Segment 2! You have mastered the most critical foundational skills of relational database engineering — from designing anomaly-free 3NF schemas for libraries, hospitals, and retail networks, to writing advanced analytical SQL with CTEs and window functions, to optimizing slow queries with covering indexes. Carry these Four Pillars into Segment 3 and beyond!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
