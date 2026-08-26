import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Introduction to Procedural SQL and Server-Side Programming
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on procedural SQL, server-side execution, network round-trip reduction, centralized business logic, least-privilege security, and the MySQL procedural ecosystem.
 */
const Topic0 = () => {
  // Interactive Simulator State
  const [selectedProceduralScenario, setSelectedProceduralScenario] = useState("network_round_trip_benchmark");

  const proceduralScenarios = {
    network_round_trip_benchmark: {
      title: "1. Network Latency Benchmark: 10 App Hops vs 1 Stored Procedure",
      badge: "Network Round-Trips",
      badgeColor: "emerald",
      sqlQuery: `-- ⚠️ Legacy App-Side Queries (10 Network Round-Trips from Node.js/Python):
-- Hop 1: SELECT student_id FROM students WHERE id = 101;
-- Hop 2: SELECT fee_balance FROM student_ledger WHERE id = 101;
-- Hop 3: SELECT current_discount FROM scholarship_rules WHERE id = 101;
-- Hop 4: UPDATE student_ledger SET balance = balance - 15000 WHERE id = 101;
-- Hop 5: INSERT INTO payment_receipts (student_id, amount, gst) VALUES (101, 15000, 2700);
-- (5 more queries for invoice numbering, audit logs, SMS dispatch...) -> 280 ms total!

-- ✅ Modern Server-Side Stored Procedure (1 Single Network Call):
CALL sp_process_student_fee_payment(
    101,            -- in_student_id
    15000.00,       -- in_payment_amount_inr
    'UPI_RAZORPAY', -- in_payment_mode
    @out_receipt_id,
    @out_status
);
SELECT @out_receipt_id, @out_status; -- Evaluates in 4 ms (70x Faster!)`,
      resultRows: [
        { id: "App-Side Multiple Hops", architecture: "Node.js → MySQL (10 Network Calls)", hops: "10 Hops", latency: "280 ms (High Latency)", security: "Direct Table DML Required", status: "⚠️ Legacy Sluggish" },
        { id: "Stored Procedure Execution", architecture: "Single Call (sp_process_fee)", hops: "1 Hop", latency: "4 ms (70x Faster!)", security: "Granular EXECUTE Privilege", status: "✅ Modern Server-Side" },
      ],
      explanation:
        "Executing multi-step financial logic inside a single Stored Procedure eliminates 9 network round-trips between the web server and database, slashing total execution latency from 280 ms to just 4 ms!",
    },
    centralized_business_rules: {
      title: "2. Centralized Business Rule Consistency Across Clients",
      badge: "Centralized Logic",
      badgeColor: "cyan",
      sqlQuery: `-- Centralizing GST Tax (18%) and Discount Calculation in a Stored Function:
DELIMITER //
CREATE FUNCTION fn_calculate_academic_gst(
    p_base_fee DECIMAL(10,2),
    p_is_scholarship_holder BOOLEAN
) 
RETURNS DECIMAL(10,2)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_applicable_gst DECIMAL(10,2);
    IF p_is_scholarship_holder = TRUE THEN
        SET v_applicable_gst = (p_base_fee * 0.05); -- Concessional 5% GST
    ELSE
        SET v_applicable_gst = (p_base_fee * 0.18); -- Standard 18% GST
    END IF;
    RETURN ROUND(v_applicable_gst, 2);
END //
DELIMITER ;

-- Guaranteed identical tax calculation in Web, Mobile App & Admin Portal:
SELECT student_name, base_fee, fn_calculate_academic_gst(base_fee, is_scholarship) AS gst_tax FROM students;`,
      resultRows: [
        { id: "STU-101", architecture: "Mamata Hui (Regular)", hops: "Base: ₹15,000", latency: "18% Standard GST", security: "₹2,700.00 GST", status: "Standard Tax" },
        { id: "STU-103", architecture: "Abhronila Saha (Scholarship)", hops: "Base: ₹20,000", latency: "5% Concessional GST", security: "₹1,000.00 GST", status: "Concessional Tax" },
      ],
      explanation:
        "Encapsulating GST tax math inside `fn_calculate_academic_gst` guarantees that the Android App, React Portal, and Admin Desktop ERP all calculate identical tax amounts without duplicated code.",
    },
    least_privilege_security: {
      title: "3. Granular Least-Privilege Security (EXECUTE vs Table DML)",
      badge: "Least Privilege",
      badgeColor: "amber",
      sqlQuery: `-- Restricting junior receptionists from accessing raw sensitive financial tables:
-- 1. Revoke direct SELECT, UPDATE, DELETE on financial tables:
REVOKE ALL PRIVILEGES ON barrackpore_academy.fee_ledger FROM 'receptionist_user'@'%';
REVOKE ALL PRIVILEGES ON barrackpore_academy.student_banking_info FROM 'receptionist_user'@'%';

-- 2. Grant strictly EXECUTE on the audited procedure:
GRANT EXECUTE ON PROCEDURE barrackpore_academy.sp_record_walkin_fee_payment 
TO 'receptionist_user'@'%';

-- Receptionist can successfully record payments through the procedure,
-- but CANNOT directly tamper, delete, or inspect other students' banking records!`,
      resultRows: [
        { id: "Direct Table Access", architecture: "SELECT / UPDATE on fee_ledger", hops: "Restricted", latency: "Access Denied (Error 1142)", security: "❌ Blocked for Safety", status: "Table Protected" },
        { id: "Procedure Invocation", architecture: "CALL sp_record_walkin_fee_payment()", hops: "Allowed", latency: "Success (Audited)", security: "✅ Granted EXECUTE Only", status: "Safe & Audited" },
      ],
      explanation:
        "By granting `EXECUTE ON PROCEDURE` while revoking table permissions, junior staff can execute official business workflows without having direct access to alter, delete, or snoop on raw financial records.",
    },
    ecosystem_components_matrix: {
      title: "4. MySQL Procedural Ecosystem: Procedures vs Functions vs Triggers vs Events",
      badge: "Ecosystem Matrix",
      badgeColor: "rose",
      sqlQuery: `-- The 4 Pillars of Server-Side Procedural Programming in MySQL 8.0:
-- 1. STORED PROCEDURE: Multi-statement transactions, IN/OUT params, returns multiple result sets.
-- 2. STORED FUNCTION: Scalar return value, deterministic/non-deterministic, callable in queries.
-- 3. DATABASE TRIGGER: Event-driven (BEFORE/AFTER INSERT, UPDATE, DELETE), enforces audit logs.
-- 4. EVENT SCHEDULER: Scheduled cron jobs (e.g. nightly ledger reconciliation at 02:00 AM).`,
      resultRows: [
        { id: "Stored Procedure", architecture: "CALL proc_name()", hops: "IN, OUT, INOUT", latency: "Multi-table Transactions & Result Sets", security: "Business Workflows", status: "Core Routine" },
        { id: "Stored Function", architecture: "SELECT func_name()", hops: "IN parameters only", latency: "Returns Exactly 1 Scalar Value", security: "Calculations in SQL", status: "Scalar Math" },
        { id: "Database Trigger", architecture: "BEFORE/AFTER DML", hops: "OLD and NEW records", latency: "Automated Audit Logs & Constraints", security: "Integrity Enforcement", status: "Event-Driven" },
        { id: "Event Scheduler", architecture: "ON SCHEDULE EVERY", hops: "Cron expressions", latency: "Nightly Backups & Maintenance", security: "Automated Jobs", status: "Background Cron" },
      ],
      explanation:
        "The MySQL procedural ecosystem divides server-side responsibilities into 4 specialized constructs: Procedures for workflows, Functions for calculations, Triggers for audit logs, and Events for scheduling.",
    },
  };

  const navItems = [
    { id: "procedural-concept", label: "1. Declarative vs Procedural" },
    { id: "why-serverside", label: "2. Why Server-Side Logic?" },
    { id: "svg-diagrams", label: "3. Network & Architecture SVGs" },
    { id: "interactive-sandbox", label: "4. Live Procedural Workbench" },
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
            <span>Module 003_003</span>
            <span>•</span>
            <span>Topic 0 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Server-Side Programming
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Introduction to Procedural SQL &amp; Server-Side Programming
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Transition from declarative set-based SQL to robust server-side procedural programming. Understand network latency reduction, centralized business rule consistency, least-privilege security, and the four pillars of MySQL procedural architecture.
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
        <section id="procedural-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Declarative SQL vs Procedural SQL
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing set-based query declarations with sequential server-side control flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>📄</span> Declarative SQL (Set-Based)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Describes <strong>WHAT</strong> data you need (<code className="text-cyan-300 font-mono">SELECT ... JOIN ... GROUP BY</code>). The relational engine's query optimizer decides the internal algorithm, index usage, and join order.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <span>⚙️</span> Procedural SQL (Server-Side Logic)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Describes <strong>HOW</strong> step-by-step algorithms execute on the server using sequential statements, local variables, conditional branching (<code className="text-emerald-300 font-mono">IF / CASE</code>), iteration loops (<code className="text-emerald-300 font-mono">WHILE / LOOP</code>), and exception handlers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Why Server-Side */}
        <section id="why-serverside" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Why Use Server-Side Programming in MySQL?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key engineering drivers for executing logic directly on the database engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>⚡</span> Network Round-Trip Reduction
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replaces 10 back-and-forth network round trips with 1 single procedure call, cutting latency by up to 70x on busy networks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🏢</span> Centralized Business Consistency
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enforces identical financial validation, GST calculation, and ledger balances across Web, Mobile, and Desktop clients.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🛡️</span> Least-Privilege Security
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Grant junior users <code className="text-amber-300 font-mono">EXECUTE</code> privileges on procedures while denying direct access to raw financial tables.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Network Round-Trips &amp; Routine Ecosystem
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing client-server round-trip latency with the MySQL procedural execution model.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Network Round-Trips */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Client-Server Network Round Trips: App Hops vs Stored Procedure
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Legacy Multi-Hop */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Legacy Multi-Hop App Queries (10 Network Round-Trips)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#1e293b" />
                    <text x="215" y="88" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Query 1 ↔ Query 2 ↔ Query 3 ↔ Update 4 ↔ Insert 5 ...</text>
                    <text x="215" y="102" fill="#fca5a5" fontSize="7 font-bold" textAnchor="middle">Total Latency: 280 ms (Network Transport Overhead) ⚠️</text>
                  </g>

                  {/* Single Stored Procedure */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">✅ Modern Stored Procedure (1 Single Network Call)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">CALL sp_process_fee_payment() (All 10 steps run on DB)</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Total Latency: 4 ms (70x Speedup with In-Memory Plan Cache!)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Routine Ecosystem */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> The 4 Pillars of MySQL Procedural Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Pillar 1 */}
                  <g>
                    <rect x="30" y="30" width="180" height="100" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="120" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Stored Procedures</text>
                    <rect x="40" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="120" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">CALL proc(IN, OUT)</text>
                    <text x="120" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Transactions &amp; Result Sets</text>
                  </g>

                  {/* Pillar 2 */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. Stored Functions</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="320" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">SELECT func(val)</text>
                    <text x="320" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Scalar Math Calculations</text>
                  </g>

                  {/* Pillar 3 */}
                  <g>
                    <rect x="430" y="30" width="180" height="100" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="520" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Database Triggers</text>
                    <rect x="440" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="520" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">BEFORE/AFTER DML</text>
                    <text x="520" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Audit Logs &amp; Integrity</text>
                  </g>

                  {/* Pillar 4 */}
                  <g>
                    <rect x="630" y="30" width="190" height="100" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="725" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Event Scheduler</text>
                    <rect x="640" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="725" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">ON SCHEDULE EVERY</text>
                    <text x="725" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Nightly DB Maintenance</text>
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
              4. Interactive Procedural SQL Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test network round-trip benchmarks, centralized tax functions, least-privilege permissions, and routine ecosystem comparisons live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(proceduralScenarios).map(([key, item]) => {
              const isActive = selectedProceduralScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedProceduralScenario(key)}
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
                    {isActive ? "● Active Model" : "○ Run Procedural Scenario"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{proceduralScenarios[selectedProceduralScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{proceduralScenarios[selectedProceduralScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Server-Side Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Server-Side Script</span>
                <span className="text-emerald-400">Compiled Bytecode Execution</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {proceduralScenarios[selectedProceduralScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Execution Mode / ID</th>
                    <th className="py-3 px-4 text-white">Architecture / Target</th>
                    <th className="py-3 px-4 text-emerald-400">Network Hops / Base</th>
                    <th className="py-3 px-4 text-indigo-400">Latency / GST Rate</th>
                    <th className="py-3 px-4 text-amber-400">Security / Output</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {proceduralScenarios[selectedProceduralScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.architecture}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.hops}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.latency}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.security}</td>
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
              Real-world fee payment automation and least-privilege security architectures.
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
                  Centralizing Multi-Campus Fee Payment &amp; GST Invoicing in Barrackpore ERP
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui refactored the academy fee payment system: Previously, Node.js ran 8 separate SQL statements over the network during student enrollment. Moving the workflow into a single stored procedure <code className="text-emerald-300 font-mono">sp_process_student_fee_payment</code> cut network latency by 95% while guaranteeing that GST tax calculation and ledger updates execute atomically with zero data drift!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Atomic Server-Side Stored Procedure Invocation:
CALL sp_process_student_fee_payment(
    101,            -- student_id (Mamata Hui)
    15000.00,       -- amount_inr
    'UPI_RAZORPAY', -- payment_mode
    @out_receipt,   -- OUT parameter
    @out_status     -- OUT parameter
);`}
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
              Avoid database CPU exhaustion and privilege escalation vulnerabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Excessive CPU-Heavy Logic on Database Server
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Putting non-relational business tasks (e.g. image resizing, PDF rendering, external HTTP calls) inside stored routines exhausts database CPU, which is harder to scale horizontally than web apps.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Keep database routines focused on data validation, joins, aggregations, and multi-table transactions!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Version Control Database Routines
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never write or modify stored procedures directly in production GUI tools without tracking them in Git repository migration scripts (<code className="text-emerald-400 font-mono">V1_0__create_sp_fee.sql</code>).
              </p>
              <div className="text-xs text-slate-400">
                Ensures automated CI/CD deployment and auditability.
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
              Key takeaways for Introduction to Procedural SQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Procedural SQL Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Use Stored Procedures (<code className="text-cyan-300 font-mono">CALL</code>) for multi-table transactional workflows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use Stored Functions (<code className="text-cyan-300 font-mono">SELECT func()</code>) for pure scalar calculations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Grant <code className="text-cyan-300 font-mono">EXECUTE</code> privileges to enforce least-privilege security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Version control all stored routine scripts in Git migrations.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the DELIMITER command...”</span>
                  Because procedures contain multiple internal semicolons (;), MySQL requires temporarily changing the command delimiter (e.g. `DELIMITER //`) so the engine doesn't terminate creation prematurely!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Welcome to Module 003_003...”</span>
                  You are now entering the world of procedural database programming, where you will master control flow, loops, cursors, triggers, and scheduled jobs!
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
              Comprehensive reference questions covering declarative vs procedural SQL, server-side execution, network round-trip reduction, centralized business logic, and security permissions.
            </p>
          </div>

          <FAQTemplate
            title="Introduction to Procedural SQL FAQs"
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
            title="Introduction to Procedural SQL and Server-Side Programming"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="Welcome to Module 003_003: Stored Procedures, Functions & Triggers! In this module, you will learn how to turn MySQL from a simple data repository into a powerful, intelligent server-side computing engine. By executing multi-step business transactions inside stored procedures, you eliminate network latency hops, centralize business logic across all client applications, and protect underlying tables with granular least-privilege security."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
