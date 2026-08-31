import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Design Project 1: University Library Management System (Schema + Queries)
 * Module: 002_008_practice-and-project-segment-2
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and real-world project guide on university library schema design, physical copy tracking, and complex SQL queries.
 */
const Topic0 = () => {
  // Interactive Simulator State
  const [selectedWorkflow, setSelectedWorkflow] = useState("overdue_loans_fine_calculator");

  const libraryWorkflows = {
    overdue_loans_fine_calculator: {
      title: "1. Overdue Loans & Dynamic Fine Calculator (₹5.00/day)",
      badge: "Circulation Ledger",
      badgeColor: "rose",
      sqlQuery: `-- Finding overdue unreturned books and calculating fines dynamically:
SELECT 
    l.loan_id,
    m.member_code,
    CONCAT(m.first_name, ' ', m.last_name) AS member_name,
    b.title AS book_title,
    bi.barcode_id,
    l.issue_date,
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
        { id: "LN-9801", member: "Mamata Hui (MEM-101)", book: "Clean Code & Refactoring", barcode: "BC-CC-004", due: "2026-08-10", overdue: "15 Days", fine: "₹75.00", status: "OVERDUE" },
        { id: "LN-9804", member: "Debangshu Roy (MEM-104)", book: "Designing Data-Intensive Apps", barcode: "BC-DD-002", due: "2026-08-18", overdue: "7 Days", fine: "₹35.00", status: "OVERDUE" },
      ],
      explanation:
        "Joins 4 relational tables (loans, members, book items, and books) to calculate dynamic daily late fees without hardcoding values into tables before return.",
    },
    multi_author_catalog_search: {
      title: "2. Multi-Author Book Catalog Search (GROUP_CONCAT)",
      badge: "Catalog Aggregation",
      badgeColor: "cyan",
      sqlQuery: `-- Consolidating co-authors into a single formatted list per book:
SELECT 
    b.book_id,
    b.isbn_13,
    b.title,
    b.category,
    p.publisher_name,
    GROUP_CONCAT(a.author_name ORDER BY a.author_name SEPARATOR ', ') AS co_authors,
    b.available_copies,
    b.total_copies
FROM books b
JOIN publishers p ON b.publisher_id = p.publisher_id
JOIN book_authors ba ON b.book_id = ba.book_id
JOIN authors a ON ba.author_id = a.author_id
GROUP BY b.book_id, b.isbn_13, b.title, b.category, p.publisher_name, b.available_copies, b.total_copies
ORDER BY b.title ASC;`,
      resultRows: [
        { id: "BK-101", member: "O'Reilly Media", book: "Enterprise React & Redux", barcode: "ISBN: 978-0134685", due: "Edition: 2026", overdue: "Available: 4 / 6", fine: "₹0.00", status: "Sukanta Hui, Susmita Sen" },
        { id: "BK-102", member: "Pearson Education", book: "Microservices with Spring Cloud", barcode: "ISBN: 978-0321125", due: "Edition: 2025", overdue: "Available: 2 / 5", fine: "₹0.00", status: "Abhronila Saha, Martin Fowler" },
      ],
      explanation:
        "Resolves the Many-to-Many relationship between books and authors using the `book_authors` junction table and consolidates co-authors with `GROUP_CONCAT()`.",
    },
    student_borrowing_quota_audit: {
      title: "3. Student Borrowing Quota & Fine Clearance Audit",
      badge: "Quota Firewall",
      badgeColor: "emerald",
      sqlQuery: `-- Auditing active borrowings against max allowed quota (3 books max):
SELECT 
    m.member_id,
    m.member_code,
    CONCAT(m.first_name, ' ', m.last_name) AS student_name,
    m.max_books_allowed,
    COUNT(l.loan_id) AS currently_borrowed_count,
    (m.max_books_allowed - COUNT(l.loan_id)) AS remaining_quota,
    COALESCE(SUM(f.fine_amount_inr), 0.00) AS total_unpaid_fines_inr
FROM members m
LEFT JOIN loans l ON m.member_id = l.member_id AND l.return_date IS NULL
LEFT JOIN fines f ON l.loan_id = f.loan_id AND f.payment_status = 'UNPAID'
GROUP BY m.member_id, m.member_code, m.first_name, m.last_name, m.max_books_allowed;`,
      resultRows: [
        { id: "MEM-101", member: "Mamata Hui", book: "Quota: 3 Books", barcode: "Active Loans: 1", due: "Remaining: 2", overdue: "Unpaid Fine: ₹75.00", fine: "₹75.00", status: "Active (Eligible)" },
        { id: "MEM-103", member: "Abhronila Saha", book: "Quota: 3 Books", barcode: "Active Loans: 3", due: "Remaining: 0", overdue: "Unpaid Fine: ₹0.00", fine: "₹0.00", status: "Quota Full (3/3)" },
      ],
      explanation:
        "Calculates active loan quotas and outstanding financial penalties per student, ensuring students do not exceed their borrowing allowances.",
    },
  };

  const navItems = [
    { id: "project-overview", label: "1. Project Scope & Requirements" },
    { id: "schema-design", label: "2. 3NF Normalized Schema" },
    { id: "svg-diagrams", label: "3. ER Diagram & Lifecycle SVGs" },
    { id: "interactive-sandbox", label: "4. Live Library System Workbench" },
    { id: "ddl-scripts", label: "5. Production DDL Scripts" },
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
            <span>Module 002_008</span>
            <span>•</span>
            <span>Design Project 1 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Full Schema & Query Project
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Design Project 1: University Library Management System
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Architect a production-grade 3NF normalized University Central Library database. Master physical barcode copy tracking, multi-author M:N relationships, dynamic overdue fine calculations, and concurrency-safe book loans.
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
        {/* SECTION 1: Project Scope */}
        <section id="project-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Project Scope & Business Specifications
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world requirements for University Central Library branches across Barrackpore and Kolkata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>📚</span> Title vs Copy Separation
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A book title (ISBN, title, category) has multiple physical copies tracked by barcodes, shelf locations, and wear condition.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>👥</span> Co-Author Bridge Table
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Resolves Many-to-Many relationships between books and authors using a composite primary key junction table.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>💰</span> Dynamic Overdue Penalties
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculates daily late fees at ₹5.00/day dynamically using <code className="text-rose-300 font-mono">DATEDIFF</code> and records financial settlements.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 3NF Relational Schema */}
        <section id="schema-design" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. 3NF Normalized Relational Tables (8 Core Entities)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fully normalized schema eliminating insertion, update, and deletion anomalies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block text-sm">1. members</span>
              <p className="text-slate-400 font-sans">Students & faculty profiles, quotas, and membership statuses.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block text-sm">2. publishers</span>
              <p className="text-slate-400 font-sans">Publishing houses and corporate contact information.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block text-sm">3. authors</span>
              <p className="text-slate-400 font-sans">Author bios and unique author identifiers.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block text-sm">4. books</span>
              <p className="text-slate-400 font-sans">Abstract title metadata, ISBN, edition, and total/available counts.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block text-sm">5. book_authors</span>
              <p className="text-slate-400 font-sans">M:N bridge linking books to multiple co-authors.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block text-sm">6. book_items</span>
              <p className="text-slate-400 font-sans">Physical inventory copies tracked by unique barcodes and shelves.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block text-sm">7. loans</span>
              <p className="text-slate-400 font-sans">Circulation checkout logs, due dates, and return timestamps.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block text-sm">8. fines</span>
              <p className="text-slate-400 font-sans">Financial penalty ledgers, receipts, and payment statuses.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Relational ER Diagram & Circulation Flow
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Entity relationship diagram and loan circulation state progression.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: ER Diagram */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> University Central Library Relational ER Diagram (3NF)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Members */}
                  <g>
                    <rect x="20" y="20" width="160" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="100" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">members</text>
                    <text x="30" y="60" fill="#38bdf8" fontSize="8 font-mono">PK member_id</text>
                    <text x="30" y="75" fill="#94a3b8" fontSize="8 font-mono">member_code (UQ)</text>
                    <text x="30" y="90" fill="#94a3b8" fontSize="8 font-mono">max_books_allowed</text>
                  </g>

                  {/* Loans */}
                  <g>
                    <rect x="240" y="20" width="170" height="105" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="325" y="42" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">loans</text>
                    <text x="250" y="60" fill="#38bdf8" fontSize="8 font-mono">PK loan_id</text>
                    <text x="250" y="75" fill="#fcd34d" fontSize="8 font-mono">FK member_id</text>
                    <text x="250" y="90" fill="#fcd34d" fontSize="8 font-mono">FK barcode_id</text>
                    <text x="250" y="105" fill="#94a3b8" fontSize="8 font-mono">due_date, return_date</text>
                  </g>

                  {/* Fines */}
                  <g>
                    <rect x="240" y="155" width="170" height="85" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="325" y="177" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">fines</text>
                    <text x="250" y="195" fill="#38bdf8" fontSize="8 font-mono">PK fine_id</text>
                    <text x="250" y="210" fill="#fcd34d" fontSize="8 font-mono">FK loan_id (UQ)</text>
                    <text x="250" y="225" fill="#94a3b8" fontSize="8 font-mono">fine_amount_inr</text>
                  </g>

                  {/* Book Items */}
                  <g>
                    <rect x="470" y="20" width="160" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="550" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">book_items</text>
                    <text x="480" y="60" fill="#38bdf8" fontSize="8 font-mono">PK barcode_id</text>
                    <text x="480" y="75" fill="#fcd34d" fontSize="8 font-mono">FK book_id</text>
                    <text x="480" y="90" fill="#94a3b8" fontSize="8 font-mono">shelf_location</text>
                  </g>

                  {/* Books */}
                  <g>
                    <rect x="680" y="20" width="150" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="755" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">books</text>
                    <text x="690" y="60" fill="#38bdf8" fontSize="8 font-mono">PK book_id</text>
                    <text x="690" y="75" fill="#94a3b8" fontSize="8 font-mono">isbn_13 (UQ)</text>
                    <text x="690" y="90" fill="#fcd34d" fontSize="8 font-mono">FK publisher_id</text>
                  </g>

                  {/* Book Authors */}
                  <g>
                    <rect x="680" y="155" width="150" height="85" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="755" y="177" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">book_authors (Bridge)</text>
                    <text x="690" y="195" fill="#38bdf8" fontSize="8 font-mono">PK/FK book_id</text>
                    <text x="690" y="210" fill="#38bdf8" fontSize="8 font-mono">PK/FK author_id</text>
                  </g>

                  {/* Connecting Links */}
                  <path d="M 180 65 L 240 65" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 325 125 L 325 155" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M 410 65 L 470 65" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 630 65 L 680 65" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 755 110 L 755 155" stroke="#10b981" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Circulation Lifecycle */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Book Circulation & Penalty Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="20" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Book Issued</text>
                    <rect x="30" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="110" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">available_copies - 1</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="240" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="330" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. Due Date Reached</text>
                    <rect x="250" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="330" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">14-Day Lending Period</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="460" y="30" width="180" height="90" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="550" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3. Overdue & Fine Accrual</text>
                    <rect x="470" y="70" width="160" height="25" rx="3" fill="#1e293b" />
                    <text x="550" y="86" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">₹5.00 / day * Overdue Days</text>
                  </g>

                  {/* Step 4 */}
                  <g>
                    <rect x="680" y="30" width="150" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="755" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Return & Paid</text>
                    <rect x="690" y="70" width="130" height="25" rx="3" fill="#022c22" />
                    <text x="755" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">available_copies + 1</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 200 75 L 240 75" stroke="#10b981" strokeWidth="2" />
                  <path d="M 420 75 L 460 75" stroke="#818cf8" strokeWidth="2" />
                  <path d="M 640 75 L 680 75" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive University Library Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test dynamic overdue calculations, multi-author book catalog queries, and student borrowing quota audits live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(libraryWorkflows).map(([key, item]) => {
              const isActive = selectedWorkflow === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedWorkflow(key)}
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
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Query" : "○ Run Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{libraryWorkflows[selectedWorkflow].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{libraryWorkflows[selectedWorkflow].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Relational SQL Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Multi-Table Join Traversal</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {libraryWorkflows[selectedWorkflow].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Record ID</th>
                    <th className="py-3 px-4 text-white">Member / Publisher</th>
                    <th className="py-3 px-4 text-emerald-400">Book Title / Info</th>
                    <th className="py-3 px-4 text-cyan-400">Barcode / Details</th>
                    <th className="py-3 px-4 text-indigo-400">Dates / Counts</th>
                    <th className="py-3 px-4 text-rose-400">Overdue / Quota</th>
                    <th className="py-3 px-4 text-amber-400">Status / Authors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {libraryWorkflows[selectedWorkflow].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.member}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.book}</td>
                      <td className="py-3 px-4 text-slate-300">{row.barcode}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.due}</td>
                      <td className="py-3 px-4 text-rose-300 font-bold">{row.overdue}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production DDL Scripts */}
        <section id="ddl-scripts" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production DDL Schema Creation Script
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Ready-to-deploy MySQL schema script with foreign key constraints, indexes, and cascades.
            </p>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-2xl">
{`-- 1. Members
CREATE TABLE members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    member_code VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    member_type ENUM('STUDENT', 'FACULTY', 'RESEARCHER') DEFAULT 'STUDENT',
    max_books_allowed TINYINT DEFAULT 3,
    status ENUM('ACTIVE', 'SUSPENDED', 'EXPIRED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Books (Title Metadata)
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn_13 VARCHAR(17) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    publisher_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    edition_year SMALLINT NOT NULL,
    total_copies INT DEFAULT 0,
    available_copies INT DEFAULT 0,
    INDEX idx_category (category),
    FULLTEXT idx_ft_title_cat (title, category),
    FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 3. Book Items (Physical Copies)
CREATE TABLE book_items (
    barcode_id VARCHAR(30) PRIMARY KEY,
    book_id INT NOT NULL,
    shelf_location VARCHAR(30) NOT NULL,
    item_status ENUM('AVAILABLE', 'LOANED', 'LOST', 'DAMAGED') DEFAULT 'AVAILABLE',
    acquisition_date DATE NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Loans (Circulation Ledger)
CREATE TABLE loans (
    loan_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    barcode_id VARCHAR(30) NOT NULL,
    member_id INT NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    loan_status ENUM('ISSUED', 'RETURNED', 'OVERDUE') DEFAULT 'ISSUED',
    INDEX idx_member_status (member_id, loan_status),
    INDEX idx_due_return (due_date, return_date),
    FOREIGN KEY (barcode_id) REFERENCES book_items(barcode_id) ON DELETE RESTRICT,
    FOREIGN KEY (member_id) REFERENCES members(member_id) ON DELETE RESTRICT
) ENGINE=InnoDB;`}
          </pre>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world implementations of university library circulation and financial audits.
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
                  Concurrency-Safe Book Checkout Transaction
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Central Library</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui deploys pessimistic locking with <code className="text-emerald-300 font-mono">SELECT ... FOR UPDATE</code> during book checkout to prevent two students from simultaneously loaning the last remaining copy of a book!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`START TRANSACTION;
-- 1. Lock the book record to check available copies:
SELECT available_copies FROM books WHERE book_id = 101 FOR UPDATE;

-- 2. Insert the loan record:
INSERT INTO loans (barcode_id, member_id, issue_date, due_date)
VALUES ('BC-CC-004', 101, CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY));

-- 3. Decrement available copies & update item status:
UPDATE books SET available_copies = available_copies - 1 WHERE book_id = 101;
UPDATE book_items SET item_status = 'LOANED' WHERE barcode_id = 'BC-CC-004';
COMMIT;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Exam Admit Card Library Fine Clearance Audit
                </h3>
                <span className="text-xs text-slate-400 font-mono">Academic Exam Clearance</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Querying students with unpaid library fines exceeding ₹500 across Barrackpore and Kolkata campuses to hold exam admit cards until library dues are settled.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    m.member_code, 
    CONCAT(m.first_name, ' ', m.last_name) AS student_name,
    SUM(f.fine_amount_inr) AS total_unpaid_fines_inr
FROM members m
JOIN loans l ON m.member_id = l.member_id
JOIN fines f ON l.loan_id = f.loan_id
WHERE f.payment_status = 'UNPAID'
GROUP BY m.member_id, m.member_code, m.first_name, m.last_name
HAVING total_unpaid_fines_inr > 500.00;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid structural flaws and circulation data anomalies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Loaning at the Title Level
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Referencing <code className="text-rose-300 font-mono">books.book_id</code> directly in <code className="text-rose-300 font-mono">loans</code> makes it impossible to know which specific physical copy was borrowed, lost, or damaged!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always loan at the physical <code className="text-emerald-400 font-mono">book_items.barcode_id</code> level.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Enforce UNIQUE loan_id on Fines
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure <code className="text-emerald-400 font-mono">fines.loan_id</code> has a UNIQUE constraint. This mathematically guarantees a 1-to-1 relationship and prevents charging students double fines for the same overdue return.
              </p>
              <div className="text-xs text-slate-400">
                Maintains strict financial integrity and auditability.
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
              Key takeaways for project evaluations and technical viva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Project Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Separate abstract title metadata (books) from physical copies (book_items).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Resolve Many-to-Many book-author relationships with bridge table <code className="text-cyan-300 font-mono">book_authors</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Calculate dynamic fines using <code className="text-cyan-300 font-mono">DATEDIFF(CURRENT_DATE, due_date) * 5.00</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Use transactions with <code className="text-cyan-300 font-mono">SELECT ... FOR UPDATE</code> during book checkouts.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe GROUP_CONCAT for multi-author display...”</span>
                  When writing catalog APIs, use <code className="text-cyan-300 font-mono">GROUP_CONCAT(a.author_name SEPARATOR ', ')</code> to return books with all co-authors in a single clean JSON row!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about circulation indexing...”</span>
                  Always create a composite index on <code className="text-cyan-300 font-mono">loans(member_id, loan_status)</code> and <code className="text-cyan-300 font-mono">loans(due_date, return_date)</code> to keep front-desk queries blazing fast!
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
              Comprehensive reference questions covering university library schema modeling, physical copy tracking, DATEDIFF fines, and checkout concurrency.
            </p>
          </div>

          <FAQTemplate
            title="University Library System FAQs"
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
            title="Design Project 1: University Library Management System (Schema + Queries)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic0_note.txt"
          />

          <Teacher
            note="This university library project is the ultimate test of students' 3NF normalization skills. The number one mistake beginners make is putting a barcode directly on the books table. Remind them: if your library owns 5 copies of 'Clean Code', they have the same ISBN, same title, and same authors, but 5 different barcodes and shelf positions! Always separate the abstract book title from the physical book items."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
