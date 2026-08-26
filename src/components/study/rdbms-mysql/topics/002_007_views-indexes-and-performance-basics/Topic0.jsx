import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – What is a Database View? Benefits of Abstraction and Security
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on database view fundamentals, abstraction, and security.
 */
const Topic0 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("column_masking_security");

  const scenarios = {
    column_masking_security: {
      title: "1. Column-Level Data Masking & PII Protection View",
      badge: "Security & PII Masking",
      badgeColor: "emerald",
      sqlQuery: `-- Base Table 'students_master' contains sensitive Aadhaar, phone, and fee balance.
-- Restricted View exposes ONLY sanitized public profile columns to staff portal:

CREATE VIEW view_student_public_directory AS
SELECT 
    student_id,
    CONCAT(first_name, ' ', last_name) AS full_name,
    course_stream,
    centre_city,
    admission_status,
    -- PII Masking: Exposes only last 4 digits of phone number
    CONCAT('XXXXXX', RIGHT(phone_number, 4)) AS masked_phone
FROM students_master
WHERE is_active = 1;

-- Staff queries the clean virtual table:
SELECT * FROM view_student_public_directory;`,
      resultRows: [
        { col1: "STU-101", col2: "Mamata Hui", col3: "React Fullstack", col4: "Barrackpore", col5: "XXXXXX9821", col6: "CONFIRMED", status: "Masked Safe" },
        { col1: "STU-102", col2: "Susmita Sen", col3: "Java Enterprise", col4: "Barrackpore", col5: "XXXXXX7412", col6: "CONFIRMED", status: "Masked Safe" },
        { col1: "STU-103", col2: "Abhronila Saha", col3: "Python Data Science", col4: "Kolkata Central", col5: "XXXXXX4590", col6: "CONFIRMED", status: "Masked Safe" },
        { col1: "STU-104", col2: "Debangshu Roy", col3: "React Fullstack", col4: "Ichapur Hub", col5: "XXXXXX1134", col6: "CONFIRMED", status: "Masked Safe" },
      ],
      explanation:
        "The view strips away raw financial balances, bank account details, and full phone numbers. Non-privileged application users are granted access ONLY to the view.",
    },
    row_level_security: {
      title: "2. Row-Level Security & Regional Branch Isolation View",
      badge: "Branch Data Isolation",
      badgeColor: "cyan",
      sqlQuery: `-- Restricts Barrackpore Center Coordinator to see ONLY Barrackpore branch records:

CREATE VIEW view_barrackpore_campus_enrollments AS
SELECT 
    enrollment_id,
    student_name,
    course_stream,
    batch_timing,
    fee_paid_inr
FROM student_enrollments
WHERE centre_city = 'Barrackpore' 
  AND enrollment_status = 'ACTIVE';

-- Barrackpore staff queries this view without ability to see Kolkata or Ichapur data:
SELECT * FROM view_barrackpore_campus_enrollments;`,
      resultRows: [
        { col1: "ENR-501", col2: "Mamata Hui", col3: "React Fullstack", col4: "Morning (08:00 AM)", col5: "₹25,000.00", col6: "Barrackpore Only", status: "Isolated" },
        { col1: "ENR-502", col2: "Susmita Sen", col3: "Java Enterprise", col4: "Evening (06:00 PM)", col5: "₹25,000.00", col6: "Barrackpore Only", status: "Isolated" },
        { col1: "ENR-505", col2: "Mahima Das", col3: "Python Data Science", col4: "Morning (10:00 AM)", col5: "₹25,000.00", col6: "Barrackpore Only", status: "Isolated" },
      ],
      explanation:
        "Row-level filtering inside the view definition prevents unauthorized cross-branch data inspection without requiring separate physical tables for each city.",
    },
    query_simplification: {
      title: "3. Complex Multi-Table Join & KPI Abstraction View",
      badge: "Query Encapsulation",
      badgeColor: "indigo",
      sqlQuery: `-- Encapsulates a 4-table join with calculations into a reusable virtual relation:

CREATE VIEW view_student_academic_summary AS
SELECT 
    s.student_id,
    s.student_name,
    c.course_title,
    b.batch_code,
    COALESCE(SUM(p.amount_inr), 0.00) AS total_fee_paid_inr,
    ROUND(AVG(e.marks_pct), 2) AS average_exam_score
FROM students s
JOIN enrollments en ON s.student_id = en.student_id
JOIN courses c ON en.course_id = c.course_id
JOIN batches b ON en.batch_id = b.batch_id
LEFT JOIN fee_payments p ON en.enrollment_id = p.enrollment_id
LEFT JOIN exam_scores e ON en.enrollment_id = e.enrollment_id
GROUP BY s.student_id, s.student_name, c.course_title, b.batch_code;

-- Frontend developer writes simple 1-line query:
SELECT * FROM view_student_academic_summary WHERE average_exam_score >= 80;`,
      resultRows: [
        { col1: "STU-101", col2: "Mamata Hui", col3: "Advanced React & Redux", col4: "BKP-REACT-M01", col5: "₹25,000.00", col6: "92.50% (Distinction)", status: "Encapsulated" },
        { col1: "STU-102", col2: "Susmita Sen", col3: "Java Microservices Pro", col4: "BKP-JAVA-E02", col5: "₹25,000.00", col6: "88.40% (Distinction)", status: "Encapsulated" },
        { col1: "STU-103", col2: "Abhronila Saha", col3: "Python Machine Learning", col4: "KOL-PY-M01", col5: "₹25,000.00", col6: "86.00% (Distinction)", status: "Encapsulated" },
      ],
      explanation:
        "Frontend applications and reporting dashboards write simple 1-line queries against the view, eliminating the need to duplicate complex 30-line JOIN statements.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. What is a View?" },
    { id: "core-benefits", label: "2. Key Benefits: Security & Abstraction" },
    { id: "comparison-table", label: "3. Base Table vs Virtual vs Materialized" },
    { id: "svg-diagrams", label: "4. Architecture & Security SVGs" },
    { id: "interactive-sandbox", label: "5. Live View Sandbox" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "10. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 0 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Relational View Fundamentals
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What is a Database View? Benefits of Abstraction & Security
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Discover virtual relations in SQL. Learn how database views act as dynamic security firewalls, mask sensitive PII, encapsulate 5-table relational joins, and provide logical data independence.
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
        {/* SECTION 1: Core Concept */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Virtual Relation: What is a Database View?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A logical lens positioned directly above physical database storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-sm font-bold border border-cyan-800">
                  Virtual Table
                </span>
                <h3 className="text-lg font-semibold text-white">Stored Query Definition (Zero Disk Rows)</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                A standard View does not store physical rows on disk. It stores only its SQL query definition in the database metadata dictionary (<code className="text-cyan-300 font-mono">information_schema.VIEWS</code>).
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>When queried, MySQL merges the view's query with the outer caller's query.</li>
                <li>Data is always 100% fresh and reflects live base table updates instantly.</li>
                <li>Consumes virtually zero storage space on the database server.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-sm font-bold border border-emerald-800">
                  Algebra
                </span>
                <h3 className="text-lg font-semibold text-white">Formal Relational Projection</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Mathematically, a View is a named persistent relational expression evaluated over base relations:
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
                <div>View = π<sub>(attributes)</sub>(σ<sub>(conditions)</sub>(Relation<sub>1</sub> ⨝ Relation<sub>2</sub>))</div>
                <div className="text-slate-500">-- Named relational abstraction stored in catalog</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Key Benefits */}
        <section id="core-benefits" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Core Architectural Benefits of Views
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why enterprise software architectures rely heavily on database views.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase mb-2">01. Security & PII</div>
              <h3 className="text-base font-bold text-white mb-2">Column Data Masking</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hides salary, bank details, and password hashes. Staff only get SELECT permission on sanitized views.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-2">02. Multi-Tenancy</div>
              <h3 className="text-base font-bold text-white mb-2">Row-Level Isolation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filters records by branch or organization (e.g. Barrackpore branch sees only Barrackpore students).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300">
              <div className="text-indigo-400 font-mono text-xs font-bold uppercase mb-2">03. Code Reuse</div>
              <h3 className="text-base font-bold text-white mb-2">Query Simplification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Packages 50 lines of complex JOINs, GROUP BYs, and CASE statements into a clean 1-line virtual table.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-all duration-300">
              <div className="text-violet-400 font-mono text-xs font-bold uppercase mb-2">04. Maintainability</div>
              <h3 className="text-base font-bold text-white mb-2">Logical Independence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Underlying base tables can be normalized or split without breaking existing frontend queries.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Comparison Table */}
        <section id="comparison-table" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Architectural Comparison: Base Table vs Virtual View vs Materialized View
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Understanding trade-offs across physical storage, execution overhead, and data freshness.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Architecture Feature</th>
                  <th className="py-3.5 px-4 font-mono text-white">Base Physical Table</th>
                  <th className="py-3.5 px-4 font-mono text-emerald-400">Standard Virtual View</th>
                  <th className="py-3.5 px-4 font-mono text-indigo-400">Materialized View (Cache)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Physical Row Storage</td>
                  <td className="py-3 px-4 text-slate-300">Stores physical bytes on disk</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Zero row storage (Query metadata only)</td>
                  <td className="py-3 px-4 text-slate-300">Stores precomputed data snapshot</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Data Freshness</td>
                  <td className="py-3 px-4 text-emerald-400">100% Real-time live</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">100% Real-time live (Dynamically queried)</td>
                  <td className="py-3 px-4 text-amber-400">Stale until explicitly refreshed</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Read Query Overhead</td>
                  <td className="py-3 px-4 text-slate-300">Direct index seek/scan</td>
                  <td className="py-3 px-4 text-cyan-300">Re-executes inner query each time</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Extremely fast (Reads precomputed cache)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">MySQL Native Support</td>
                  <td className="py-3 px-4 text-emerald-400">Native</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Native (CREATE VIEW)</td>
                  <td className="py-3 px-4 text-rose-400">Emulated via summary tables + triggers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Visual Architecture: Virtual Abstraction Layer & Security Firewall
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              See how views intercept client requests and project a sanitized, simplified relational model.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: View Abstraction Layer */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Database View as a Virtual Lens over Physical Relations
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Client applications interact with a single virtual table, while the database engine transparently joins physical base tables.
              </p>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 300" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: Client App Layer */}
                  <g>
                    <rect x="250" y="20" width="350" height="50" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="425" y="42" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Client Application / Web Portal</text>
                    <text x="425" y="58" fill="#94a3b8" fontSize="10" textAnchor="middle font-mono">SELECT * FROM view_student_summary WHERE avg_marks &gt;= 80</text>
                  </g>

                  {/* Middle: The Virtual View Lens */}
                  <g>
                    <rect x="180" y="110" width="490" height="60" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" strokeDasharray="5 3" />
                    <text x="425" y="133" fill="#c7d2fe" fontSize="13" fontWeight="bold" textAnchor="middle">🔍 VIRTUAL VIEW: view_student_summary</text>
                    <text x="425" y="153" fill="#a5b4fc" fontSize="10" textAnchor="middle">Logical schema abstraction (Zero bytes stored on disk)</text>
                  </g>

                  {/* Flow Arrow Client -> View */}
                  <path d="M 425 70 L 425 110" stroke="#38bdf8" strokeWidth="2" />

                  {/* Bottom: Physical Base Tables */}
                  <g>
                    {/* Table 1: students */}
                    <rect x="50" y="210" width="220" height="65" rx="6" fill="#020617" stroke="#059669" strokeWidth="1.5" />
                    <text x="160" y="232" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Base Table: students</text>
                    <text x="160" y="250" fill="#64748b" fontSize="9" textAnchor="middle">student_id, name, phone, aadhaar</text>
                    <text x="160" y="264" fill="#64748b" fontSize="9" textAnchor="middle">(Physical InnoDB storage)</text>

                    {/* Table 2: enrollments */}
                    <rect x="315" y="210" width="220" height="65" rx="6" fill="#020617" stroke="#059669" strokeWidth="1.5" />
                    <text x="425" y="232" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Base Table: enrollments</text>
                    <text x="425" y="250" fill="#64748b" fontSize="9" textAnchor="middle">enroll_id, student_id, course_id</text>
                    <text x="425" y="264" fill="#64748b" fontSize="9" textAnchor="middle">(Physical InnoDB storage)</text>

                    {/* Table 3: payments */}
                    <rect x="580" y="210" width="220" height="65" rx="6" fill="#020617" stroke="#059669" strokeWidth="1.5" />
                    <text x="690" y="232" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Base Table: payments</text>
                    <text x="690" y="250" fill="#64748b" fontSize="9" textAnchor="middle">payment_id, enroll_id, fee_amount</text>
                    <text x="690" y="264" fill="#64748b" fontSize="9" textAnchor="middle">(Physical InnoDB storage)</text>
                  </g>

                  {/* Flow Arrows View -> Base Tables */}
                  <path d="M 300 170 L 160 210" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M 425 170 L 425 210" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M 550 170 L 690 210" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Security & Column Masking Firewall */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> View-Based Security Firewall & Column Masking
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Preventing unauthorized users from directly querying sensitive base tables by funneling queries through sanitized views.
              </p>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Restricted App Role */}
                  <g>
                    <rect x="30" y="40" width="200" height="180" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="130" y="65" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">Frontend / Support Staff</text>
                    <rect x="45" y="85" width="170" height="30" rx="4" fill="#1e293b" />
                    <text x="130" y="104" fill="#38bdf8" fontSize="10" textAnchor="middle font-mono">GRANT SELECT ON view_*</text>
                    <rect x="45" y="130" width="170" height="30" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="130" y="149" fill="#fca5a5" fontSize="10" textAnchor="middle font-mono">NO ACCESS to base tables</text>
                  </g>

                  {/* Middle: Security Firewall View */}
                  <g>
                    <rect x="290" y="40" width="260" height="180" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="420" y="65" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">🛡️ Sanitized Public View</text>
                    <rect x="310" y="85" width="220" height="24" rx="4" fill="#022c22" />
                    <text x="320" y="101" fill="#a7f3d0" fontSize="9">✓ student_id, full_name (Exposed)</text>
                    <rect x="310" y="115" width="220" height="24" rx="4" fill="#022c22" />
                    <text x="320" y="131" fill="#a7f3d0" fontSize="9">✓ masked_phone: 'XXXXXX9821'</text>
                    <rect x="310" y="145" width="220" height="24" rx="4" fill="#022c22" />
                    <text x="320" y="161" fill="#a7f3d0" fontSize="9">✓ course_stream, centre_city</text>
                    <text x="420" y="195" fill="#6ee7b7" fontSize="9" textAnchor="middle font-bold">100% Zero PII Leaks</text>
                  </g>

                  {/* Right: Raw Sensitive Base Table */}
                  <g>
                    <rect x="610" y="40" width="210" height="180" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="715" y="65" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">Raw Base Table</text>
                    <text x="715" y="82" fill="#818cf8" fontSize="9" textAnchor="middle font-mono">(Physical Schema)</text>
                    <rect x="625" y="95" width="180" height="20" rx="3" fill="#0f172a" />
                    <text x="635" y="109" fill="#fca5a5" fontSize="8">🔒 raw_aadhaar_number</text>
                    <rect x="625" y="120" width="180" height="20" rx="3" fill="#0f172a" />
                    <text x="635" y="134" fill="#fca5a5" fontSize="8">🔒 raw_bank_account_no</text>
                    <rect x="625" y="145" width="180" height="20" rx="3" fill="#fecaca" />
                    <text x="635" y="159" fill="#991b1b" fontSize="8 font-bold">🔒 fee_due_balance_inr</text>
                    <text x="715" y="195" fill="#f87171" fontSize="9" textAnchor="middle">Admin ONLY</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 230 130 L 290 130" stroke="#10b981" strokeWidth="2" />
                  <path d="M 550 130 L 610 130" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Live Interactive Simulator */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Interactive Database View Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a production view architecture to inspect SQL DDL definitions, masking expressions, and live virtual outputs.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(scenarios).map(([key, item]) => {
              const isActive = selectedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
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
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Virtual Table" : "○ Inspect View"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Simulator Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{scenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{scenarios[selectedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Logical Virtual Lens
              </span>
            </div>

            {/* SQL DDL & Query Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>View DDL & Client Query Execution</span>
                <span className="text-emerald-400">Zero Physical Table Footprint</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {scenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Virtual Table Output Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Virtual Table Output (Live dynamically retrieved tuples)</span>
                <span className="text-indigo-400">PII Masked & Encapsulated</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-mono text-cyan-400">Identifier</th>
                      <th className="py-3 px-4 font-mono text-white">Full Name</th>
                      <th className="py-3 px-4 font-mono text-emerald-400">Stream / Code</th>
                      <th className="py-3 px-4 font-mono text-cyan-400">Campus / Timing</th>
                      <th className="py-3 px-4 font-mono text-indigo-400">Sanitized Attribute</th>
                      <th className="py-3 px-4 font-mono text-amber-400">Security Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {scenarios[selectedScenario].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-bold text-cyan-300">{row.col1}</td>
                        <td className="py-3 px-4 font-sans font-semibold text-white">{row.col2}</td>
                        <td className="py-3 px-4 text-emerald-300 font-sans">{row.col3}</td>
                        <td className="py-3 px-4 text-slate-300">{row.col4}</td>
                        <td className="py-3 px-4 text-indigo-300 font-bold">{row.col5}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Industry Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world patterns from West Bengal educational institutes, healthcare networks, and billing platforms.
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
                  Training Academy Public Roster & Teacher View
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata, Ichapur</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui creates specialized views for class teachers (showing student names, batch attendance, and assignment marks for Mamata, Susmita, Abhronila, Debangshu) while completely masking fee transaction records and personal home addresses.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE VIEW view_faculty_attendance_roster AS
SELECT 
    s.student_id,
    s.student_name,
    b.batch_name,
    b.instructor_name,
    COUNT(a.attendance_id) AS sessions_attended,
    ROUND(AVG(e.assignment_score_pct), 1) AS avg_assignment_grade
FROM students s
JOIN enrollments en ON s.student_id = en.student_id
JOIN batches b ON en.batch_id = b.batch_id
LEFT JOIN attendance_log a ON en.enrollment_id = a.enrollment_id AND a.status = 'PRESENT'
LEFT JOIN assignment_evaluations e ON en.enrollment_id = e.enrollment_id
GROUP BY s.student_id, s.student_name, b.batch_name, b.instructor_name;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Hospital Doctor Consultation View (Clinical vs Financial Separation)
                </h3>
                <span className="text-xs text-slate-400 font-mono">Healthcare Network: Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Separating medical charts from billing insurance data: Attending physicians query clinical vitals and allergy lists through a dedicated view without seeing insurance billing claim disputes.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE VIEW view_doctor_patient_chart AS
SELECT 
    p.patient_id,
    p.full_name,
    p.blood_group,
    p.known_allergies,
    v.recorded_at AS last_vitals_timestamp,
    v.blood_pressure,
    v.heart_rate_bpm,
    v.body_temp_celsius
FROM patients p
JOIN vitals_log v ON p.patient_id = v.patient_id
WHERE p.discharge_status = 'ADMITTED';`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls & Database View Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Eliminate common misconceptions and architectural bottlenecks with database views.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> The "Views Make Queries Faster" Myth
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Standard views are purely logical and do NOT cache results. Running <code className="text-rose-300 font-mono">SELECT * FROM my_view</code> executes the underlying query plan every time.
              </p>
              <div className="text-xs text-slate-400">
                To speed up views, ensure that the <strong>underlying base tables</strong> have appropriate B-Tree indexes on join and filter columns.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Avoid SELECT * in View Definitions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always enumerate explicit column names (<code className="text-emerald-300 font-mono">SELECT id, name, city...</code>). Using <code className="text-rose-300 font-mono">SELECT *</code> risks silent column mapping drift when base tables change.
              </p>
              <div className="text-xs text-slate-400">
                Explicit column lists protect downstream applications from unexpected schema additions.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for exams and technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Exam Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>A standard view contains zero data pages; it stores only SQL query metadata.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Views provide both column-level data masking and row-level security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Views grant logical data independence when refactoring physical schemas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Indexes cannot be built directly on standard virtual views; index base tables instead.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe view permissions...”</span>
                  By creating a view and running <code className="text-cyan-300 font-mono">GRANT SELECT ON view_name TO 'user'</code>, you give users access to computed metrics without exposing the physical base tables!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about predicate pushdown...”</span>
                  When you filter a view (<code className="text-cyan-300 font-mono">WHERE city = 'Barrackpore'</code>), the MySQL optimizer pushes that condition down into the base table scan to utilize base table indexes.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering view definitions, security modes, performance, and best practices.
            </p>
          </div>

          <FAQTemplate
            title="What is a Database View? FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="What is a Database View? Benefits of Abstraction and Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="When introducing database views, make sure students understand that a view is essentially a stored SELECT query—not a copy of the data. Use the analogy of a specialized camera lens: the physical scene (base table) remains unchanged, but the lens (view) decides which angles, colors, and details the viewer gets to see. Views are your #1 tool for data masking, PII protection, and providing clean, simplified APIs to frontend software."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
