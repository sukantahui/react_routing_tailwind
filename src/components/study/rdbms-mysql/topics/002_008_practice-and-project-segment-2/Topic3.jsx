import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – End-to-End Normalization Exercise: From Unnormalized Spreadsheet to 3NF
 * Module: 002_008_practice-and-project-segment-2
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on decomposing raw spreadsheets through 1NF, 2NF, and 3NF with anomaly mitigation and ETL scripts.
 */
const Topic3 = () => {
  // Interactive Simulator State
  const [selectedStage, setSelectedStage] = useState("stage_3nf_clean");

  const normalizationStages = {
    stage_unf_raw: {
      title: "Stage 0: Unnormalized Form (UNF) — The Flat Spreadsheet",
      badge: "⚠️ Anomaly-Ridden Flat Sheet",
      badgeColor: "rose",
      sqlQuery: `-- Raw Staging Table (Representing flat Excel sheet):
CREATE TABLE raw_academy_spreadsheet (
    student_id INT,
    student_name VARCHAR(100),
    phone_numbers VARCHAR(100),       -- Multi-value cell: "9830098214, 9830074120"
    branch_city VARCHAR(50),
    branch_pincode VARCHAR(10),
    course_codes VARCHAR(100),        -- Multi-value cell: "REACT-01, JAVA-02"
    instructor_name VARCHAR(100),     -- Redundant duplicate across 500 rows!
    instructor_phone VARCHAR(20),
    receipt_no VARCHAR(30),
    amount_paid_inr DECIMAL(10,2),
    exam_score_pct DECIMAL(5,2)
);

-- Severe Anomalies:
-- 1. Insertion Anomaly: Cannot add new instructor or course without a student!
-- 2. Update Anomaly: Changing instructor phone requires editing hundreds of rows!
-- 3. Deletion Anomaly: Deleting a student wipes out the entire course record!`,
      resultRows: [
        { col1: "101", col2: "Mamata Hui", col3: "9830098214, 9830074120", col4: "Barrackpore", col5: "REACT-01, JAVA-02", col6: "Susmita Sen", col7: "₹25,000.00", status: "UNF (Multi-values)" },
        { col1: "102", col2: "Susmita Sen", col3: "9830011111", col4: "Kolkata", col5: "PYTHON-03", col6: "Debangshu Roy", col7: "₹18,000.00", status: "UNF (Redundant)" },
      ],
      explanation:
        "Raw spreadsheets violate atomicity with comma-separated values, causing massive data redundancy and severe insertion, update, and deletion anomalies.",
    },
    stage_1nf_atomic: {
      title: "Stage 1: First Normal Form (1NF) — Atomic Values & Primary Key",
      badge: "1NF (Atomic Cells)",
      badgeColor: "amber",
      sqlQuery: `-- 1NF Transformation:
-- 1. Flatten multi-valued phone numbers and course codes into individual rows.
-- 2. Define Composite Primary Key: (student_id, course_code, receipt_no)

CREATE TABLE academy_1nf (
    student_id INT,
    student_name VARCHAR(100),
    phone_number VARCHAR(15),
    branch_city VARCHAR(50),
    branch_pincode VARCHAR(10),
    course_code VARCHAR(20),
    course_name VARCHAR(100),
    instructor_id INT,
    instructor_name VARCHAR(100),
    instructor_phone VARCHAR(15),
    receipt_no VARCHAR(30),
    payment_date DATE,
    amount_paid_inr DECIMAL(10,2),
    exam_score_pct DECIMAL(5,2),
    PRIMARY KEY (student_id, course_code, receipt_no)
);`,
      resultRows: [
        { col1: "101", col2: "Mamata Hui", col3: "9830098214", col4: "Barrackpore", col5: "REACT-01", col6: "Susmita Sen", col7: "₹15,000.00", status: "1NF (Atomic)" },
        { col1: "101", col2: "Mamata Hui", col3: "9830098214", col4: "Barrackpore", col5: "JAVA-02", col6: "Susmita Sen", col7: "₹10,000.00", status: "1NF (Atomic)" },
      ],
      explanation:
        "1NF enforces scalar atomic values per cell and establishes a unique composite primary key, but suffers from Partial Dependencies on composite key components.",
    },
    stage_2nf_decomposed: {
      title: "Stage 2: Second Normal Form (2NF) — Removing Partial Dependencies",
      badge: "2NF (Full Key Dependency)",
      badgeColor: "cyan",
      sqlQuery: `-- 2NF Decomposition:
-- Eliminate Partial Dependencies where non-key attributes depend on only part of PK!

-- Table 1: students (student_id → student_name, branch_city, branch_pincode)
-- Table 2: courses (course_code → course_name, instructor_id, instructor_name, instructor_phone)
-- Table 3: enrollments (student_id, course_code → exam_score_pct)
-- Table 4: fee_payments (receipt_no → student_id, course_code, payment_date, amount_paid_inr)`,
      resultRows: [
        { col1: "students", col2: "PK: student_id", col3: "student_name, branch_city, pincode", col4: "Entity Table", col5: "Zero Partial Dep", col6: "2NF Compliant", col7: "✓ Fully Dependent", status: "2NF" },
        { col1: "courses", col2: "PK: course_code", col3: "course_name, instructor_id, phone", col4: "Entity Table", col5: "Zero Partial Dep", col6: "2NF Compliant", col7: "✓ Fully Dependent", status: "2NF" },
        { col1: "enrollments", col2: "PK: (student_id, course_code)", col3: "exam_score_pct", col4: "Junction Table", col5: "Zero Partial Dep", col6: "2NF Compliant", col7: "✓ Fully Dependent", status: "2NF" },
      ],
      explanation:
        "2NF splits the schema into 4 tables so every non-key column depends on the ENTIRE primary key, but Transitive Dependencies ($X \\to Y \\to Z$) still exist.",
    },
    stage_3nf_clean: {
      title: "Stage 3: Third Normal Form (3NF) — Removing Transitive Dependencies",
      badge: "✓ 3NF (Zero Anomalies)",
      badgeColor: "emerald",
      sqlQuery: `-- 3NF Final Decomposition:
-- Eliminate Transitive Dependencies where non-key attributes depend on other non-key attributes!
-- 1. students: student_id → branch_city → branch_pincode => Extract 'branches'
-- 2. courses: course_code → instructor_id → instructor_name, phone => Extract 'instructors'

-- 6 Clean 3NF Tables:
-- 1. branches (branch_id PK, branch_city, branch_pincode)
-- 2. students (student_id PK, student_name, branch_id FK)
-- 3. instructors (instructor_id PK, instructor_name, instructor_phone)
-- 4. courses (course_code PK, course_name, instructor_id FK)
-- 5. enrollments (enrollment_id PK, student_id FK, course_code FK, exam_score_pct)
-- 6. fee_payments (receipt_no PK, enrollment_id FK, payment_date, amount_paid_inr)`,
      resultRows: [
        { col1: "branches", col2: "PK: branch_id", col3: "branch_city, branch_pincode", col4: "No Transitivity", col5: "Single Source", col6: "3NF Verified", col7: "✓ Anomaly-Free", status: "3NF Optimal" },
        { col1: "instructors", col2: "PK: instructor_id", col3: "instructor_name, instructor_phone", col4: "No Transitivity", col5: "Single Source", col6: "3NF Verified", col7: "✓ Anomaly-Free", status: "3NF Optimal" },
        { col1: "students", col2: "PK: student_id", col3: "student_name, branch_id (FK)", col4: "No Transitivity", col5: "Single Source", col6: "3NF Verified", col7: "✓ Anomaly-Free", status: "3NF Optimal" },
        { col1: "courses", col2: "PK: course_code", col3: "course_name, instructor_id (FK)", col4: "No Transitivity", col5: "Single Source", col6: "3NF Verified", col7: "✓ Anomaly-Free", status: "3NF Optimal" },
      ],
      explanation:
        "3NF achieves complete relational purity: every non-key column depends on the key, the whole key, and nothing but the key, permanently eliminating all anomalies!",
    },
  };

  const navItems = [
    { id: "project-overview", label: "1. The Spreadsheet Problem" },
    { id: "normalization-pipeline", label: "2. The 1NF → 2NF → 3NF Pipeline" },
    { id: "svg-diagrams", label: "3. Dependency Map & Pipeline SVGs" },
    { id: "interactive-sandbox", label: "4. Live Normalization Workbench" },
    { id: "anomaly-matrix", label: "5. Anomaly Stress Test Matrix" },
    { id: "etl-migration-sql", label: "6. Production ETL Migration SQL" },
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
            <span>Design Project 3 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              End-to-End Normalization
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            End-to-End Normalization: From Spreadsheet to 3NF
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Transform an unstructured, anomaly-ridden Excel sheet into a robust 3NF relational schema. Master atomic flattening, partial dependency removal, and transitive dependency decomposition with production SQL ETL scripts.
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
        {/* SECTION 1: Problem Scope */}
        <section id="project-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Raw Spreadsheet Problem
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why running an academy on a single unnormalized spreadsheet causes data corruption and operational gridlock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>❌</span> Insertion Anomaly
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The academy cannot create a new course or add a new teacher until at least one student enrolls in that class!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>❌</span> Update Anomaly
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When Teacher Susmita updates her contact phone, the administrative team must find and edit 500 individual spreadsheet rows!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>❌</span> Deletion Anomaly
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When a student cancels their enrollment, deleting their row inadvertently wipes out all records of the course and classroom!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Pipeline Stages */}
        <section id="normalization-pipeline" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 3-Step Normalization Journey
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Progressive mathematical decomposition from flat spreadsheet to 3NF.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>1️⃣</span> 1NF: Atomic Cells
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Flatten comma-separated multi-values into individual rows and establish a unique Composite Primary Key.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>2️⃣</span> 2NF: Remove Partial Deps
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract attributes that depend on only part of the composite key into dedicated entity tables (<code className="text-cyan-300 font-mono">students, courses</code>).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>3️⃣</span> 3NF: Remove Transitive Deps
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eliminate non-key column dependencies (<code className="text-emerald-300 font-mono">city → pincode, instructor_id → phone</code>) by extracting lookup tables.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Normalization Pipeline & Functional Dependency Map
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Decomposition stages and functional dependency pruning.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Normalization Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> End-to-End Decomposition Pipeline (UNF → 1NF → 2NF → 3NF)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 220" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* UNF */}
                  <g>
                    <rect x="20" y="30" width="160" height="150" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="100" y="55" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">0. Raw UNF Sheet</text>
                    <rect x="30" y="70" width="140" height="25" rx="3" fill="#0f172a" />
                    <text x="100" y="86" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Multi-Valued Cells</text>
                    <rect x="30" y="105" width="140" height="25" rx="3" fill="#0f172a" />
                    <text x="100" y="121" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Repeating Groups</text>
                    <text x="100" y="160" fill="#fca5a5" fontSize="8 font-bold" textAnchor="middle">❌ All Anomalies</text>
                  </g>

                  {/* 1NF */}
                  <g>
                    <rect x="230" y="30" width="160" height="150" rx="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="310" y="55" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">1. 1NF Flat Table</text>
                    <rect x="240" y="70" width="140" height="25" rx="3" fill="#0f172a" />
                    <text x="310" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Atomic Scalar Values</text>
                    <rect x="240" y="105" width="140" height="25" rx="3" fill="#0f172a" />
                    <text x="310" y="121" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Composite PK Defined</text>
                    <text x="310" y="160" fill="#fcd34d" fontSize="8 font-bold" textAnchor="middle">⚠️ Partial Deps Exist</text>
                  </g>

                  {/* 2NF */}
                  <g>
                    <rect x="440" y="30" width="170" height="150" rx="8" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="525" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">2. 2NF (4 Tables)</text>
                    <rect x="450" y="70" width="150" height="20" rx="3" fill="#020617" />
                    <text x="525" y="84" fill="#a5b4fc" fontSize="8 font-mono" textAnchor="middle">students, courses</text>
                    <rect x="450" y="95" width="150" height="20" rx="3" fill="#020617" />
                    <text x="525" y="109" fill="#a5b4fc" fontSize="8 font-mono" textAnchor="middle">enrollments, payments</text>
                    <text x="525" y="160" fill="#38bdf8" fontSize="8 font-bold" textAnchor="middle">⚠️ Transitive Deps</text>
                  </g>

                  {/* 3NF */}
                  <g>
                    <rect x="660" y="30" width="170" height="150" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="745" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. 3NF (6 Clean Tables)</text>
                    <rect x="670" y="70" width="150" height="20" rx="3" fill="#022c22" />
                    <text x="745" y="84" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">+ branches (Isolated)</text>
                    <rect x="670" y="95" width="150" height="20" rx="3" fill="#022c22" />
                    <text x="745" y="109" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">+ instructors (Isolated)</text>
                    <text x="745" y="160" fill="#34d399" fontSize="8 font-bold" textAnchor="middle">✓ ZERO ANOMALIES</text>
                  </g>

                  {/* Flow Arrows */}
                  <path d="M 180 105 L 230 105" stroke="#f59e0b" strokeWidth="2" />
                  <path d="M 390 105 L 440 105" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 610 105 L 660 105" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Transitive Dependency Pruning */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Transitive Dependency Decomposition ($X \to Y \to Z$)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* X */}
                  <g>
                    <rect x="30" y="40" width="180" height="80" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="120" y="65" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Primary Key (X)</text>
                    <text x="120" y="85" fill="#a7f3d0" fontSize="9 font-mono" textAnchor="middle">student_id (PK)</text>
                  </g>

                  {/* Y */}
                  <g>
                    <rect x="330" y="40" width="180" height="80" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="420" y="65" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Non-Key Attribute (Y)</text>
                    <text x="420" y="85" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">branch_city</text>
                  </g>

                  {/* Z */}
                  <g>
                    <rect x="630" y="40" width="180" height="80" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="720" y="65" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Transitive Attribute (Z)</text>
                    <text x="720" y="85" fill="#f87171" fontSize="9 font-mono" textAnchor="middle">branch_pincode</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 210 80 L 330 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 510 80 L 630 80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="570" y="70" fill="#fca5a5" fontSize="8 font-mono" textAnchor="middle">VIOLATION</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Normalization Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step through the stages of decomposition and inspect live schema structures.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(normalizationStages).map(([key, item]) => {
              const isActive = selectedStage === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStage(key)}
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
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Stage" : "○ View Stage"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{normalizationStages[selectedStage].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{normalizationStages[selectedStage].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Normalization Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Schema DDL / Transformation Logic</span>
                <span className="text-emerald-400">Dependency Audit</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {normalizationStages[selectedStage].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Col 1 / Table</th>
                    <th className="py-3 px-4 text-white">Col 2 / PK</th>
                    <th className="py-3 px-4 text-emerald-400">Col 3 / Attributes</th>
                    <th className="py-3 px-4 text-cyan-400">Col 4 / Type</th>
                    <th className="py-3 px-4 text-indigo-400">Col 5 / Dep State</th>
                    <th className="py-3 px-4 text-amber-400">Col 6 / Compliance</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {normalizationStages[selectedStage].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.col1}</td>
                      <td className="py-3 px-4 text-slate-300">{row.col2}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.col3}</td>
                      <td className="py-3 px-4 text-white font-sans">{row.col4}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.col5}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.col6}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("3NF") || row.status.includes("Optimal")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-amber-950 text-amber-400 border-amber-800"
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

        {/* SECTION 5: Anomaly Stress Test Matrix */}
        <section id="anomaly-matrix" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Anomaly Stress Test Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing operational safety across UNF, 1NF, 2NF, and 3NF.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Normal Form</th>
                  <th className="py-3.5 px-4 text-rose-400">Insertion Anomaly</th>
                  <th className="py-3.5 px-4 text-amber-400">Update Anomaly</th>
                  <th className="py-3.5 px-4 text-rose-400">Deletion Anomaly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-rose-400 font-mono">UNF (Spreadsheet)</td>
                  <td className="py-3 px-4 text-rose-300">Cannot insert new course without student</td>
                  <td className="py-3 px-4 text-rose-300">Updating instructor phone touches 500 rows</td>
                  <td className="py-3 px-4 text-rose-300">Deleting student wipes out course details</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-amber-400 font-mono">1NF (Flat Table)</td>
                  <td className="py-3 px-4 text-rose-300">Cannot insert course without student</td>
                  <td className="py-3 px-4 text-rose-300">Updating instructor phone touches 500 rows</td>
                  <td className="py-3 px-4 text-rose-300">Deleting student wipes out course details</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-400 font-mono">2NF (4 Tables)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">✓ Course can be inserted freely</td>
                  <td className="py-3 px-4 text-amber-300">Updating city pincode touches multiple students</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">✓ Course preserved on enrollment drop</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">3NF (6 Clean Tables)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">✓ Zero Anomalies</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">✓ Single-row edit in branches/instructors</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">✓ Zero Accidental Data Loss</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: Production ETL Migration SQL */}
        <section id="etl-migration-sql" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production ETL Data Migration SQL Scripts
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Idempotent SQL scripts to extract clean relational data from the raw staging spreadsheet.
            </p>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-2xl">
{`-- 1. Populate Branches Lookup:
INSERT IGNORE INTO branches (branch_city, branch_pincode)
SELECT DISTINCT branch_city, branch_pincode 
FROM raw_spreadsheet_staging 
WHERE branch_city IS NOT NULL;

-- 2. Populate Instructors Lookup:
INSERT IGNORE INTO instructors (instructor_id, instructor_name, instructor_phone)
SELECT DISTINCT instructor_id, instructor_name, instructor_phone 
FROM raw_spreadsheet_staging 
WHERE instructor_id IS NOT NULL;

-- 3. Populate Courses Master:
INSERT IGNORE INTO courses (course_code, course_name, instructor_id)
SELECT DISTINCT course_code, course_name, instructor_id 
FROM raw_spreadsheet_staging 
WHERE course_code IS NOT NULL;

-- 4. Populate Students Master:
INSERT IGNORE INTO students (student_id, student_name, branch_id)
SELECT DISTINCT s.student_id, s.student_name, b.branch_id
FROM raw_spreadsheet_staging s
JOIN branches b ON s.branch_city = b.branch_city;`}
          </pre>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid over-normalization traps and preserve relational keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting Foreign Key Indexes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When decomposing into 6 tables, forgetting to index foreign keys like <code className="text-rose-300 font-mono">branch_id</code> or <code className="text-rose-300 font-mono">instructor_id</code> causes JOINs to degrade into full table scans!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always index foreign key columns on child tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> The Bill Kent Normalization Rule
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                "Every non-key attribute must provide a fact about the key (1NF), the whole key (2NF), and nothing but the key (3NF), so help me Codd."
              </p>
              <div className="text-xs text-slate-400">
                The universal memory anchor for all normalization technical interviews.
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
              Key takeaways for normalization project defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Normalization Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>1NF: Flatten multi-valued cells to atomic scalar values + Primary Key.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>2NF: Decompose partial dependencies on composite primary keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>3NF: Decompose transitive dependencies between non-key columns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Migrate data using <code className="text-cyan-300 font-mono">INSERT IGNORE INTO ... SELECT DISTINCT</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Lossless-Join Decomposition...”</span>
                  Always test your 3NF schema by running a multi-table JOIN query to ensure it recreates the original spreadsheet dataset without producing extra phantom rows!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about SELECT DISTINCT during ETL...”</span>
                  When migrating raw spreadsheet rows to entity master tables, use <code className="text-cyan-300 font-mono">SELECT DISTINCT</code> to strip out redundant duplicates cleanly!
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
              Comprehensive reference questions covering spreadsheet normalization, 1NF/2NF/3NF rules, dependency maps, and ETL migration.
            </p>
          </div>

          <FAQTemplate
            title="End-to-End Normalization FAQs"
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
            title="End-to-End Normalization Exercise: From Unnormalized Spreadsheet to 3NF"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="Every student must master the art of looking at a messy Excel spreadsheet and immediately spotting the functional dependencies. Show them: If teacher phone number is repeated 50 times, that is a transitive dependency waiting to cause update anomalies. By splitting the spreadsheet into 6 clean 3NF tables, you eliminate all anomalies and build an enterprise-grade database."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
