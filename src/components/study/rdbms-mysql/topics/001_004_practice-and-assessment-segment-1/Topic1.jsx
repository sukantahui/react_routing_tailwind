import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Hands-on Lab 1: College Student Admission Database Setup
 * Module: 001_004_practice-and-assessment-segment-1
 *
 * @component
 * @returns {JSX.Element} Interactive lab workbench and step-by-step database implementation tutorial: building a multi-table college admission schema in MySQL, applying Primary/Foreign keys, CHECK/UNIQUE constraints, seeding realistic academic records, testing constraint defenses, and running analytical reports.
 */
const Topic1 = () => {
  // Interactive Lab Step State
  const [selectedLabStep, setSelectedLabStep] = useState("step1_ddl");

  const labSteps = {
    step1_ddl: {
      stepNumber: "Step 1: DDL Schema",
      title: "1. Step 1: Complete DDL Schema with Foreign Keys & Constraints",
      badge: "DDL Schema Setup",
      badgeColor: "emerald",
      sqlScript: `-- 🏛️ STEP 1: CREATE COLLEGE ADMISSION DATABASE & TABLES:
CREATE DATABASE IF NOT EXISTS college_admissions;
USE college_admissions;

-- 1. Departments Table (Parent Table)
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_code VARCHAR(10) NOT NULL UNIQUE,
    dept_name VARCHAR(100) NOT NULL,
    campus_city VARCHAR(50) DEFAULT 'Barrackpore'
) ENGINE=InnoDB;

-- 2. Courses Table (Child of Departments)
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    duration_years INT CHECK (duration_years BETWEEN 1 AND 5),
    total_tuition_fee_inr DECIMAL(10,2) CHECK (total_tuition_fee_inr > 0),
    CONSTRAINT fk_course_dept 
        FOREIGN KEY (department_id) REFERENCES departments(department_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3. Students Table (Parent Table)
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    blood_group VARCHAR(5) DEFAULT 'O+'
) ENGINE=InnoDB;

-- 4. Admissions Table (Junction / Child Table with 1:1 Student Link)
CREATE TABLE admissions (
    admission_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL UNIQUE,
    course_id INT NOT NULL,
    admission_date DATE DEFAULT (CURDATE()),
    initial_deposit_inr DECIMAL(10,2) CHECK (initial_deposit_inr >= 5000),
    admission_status ENUM('Provisional', 'Confirmed', 'Cancelled') DEFAULT 'Provisional',
    CONSTRAINT fk_admission_student 
        FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_admission_course 
        FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;`,
      tableSummary: [
        { table: "departments", purpose: "Parent table for academic departments & campuses", key: "PK: department_id" },
        { table: "courses", purpose: "Degree programs with fee & duration validation", key: "FK → departments" },
        { table: "students", purpose: "Candidate personal profiles with unique contacts", key: "PK: student_id" },
        { table: "admissions", purpose: "Enrollment ledgers with deposit checks (>= ₹5,000)", key: "FK → students, courses" }
      ],
      explanation:
        "The DDL script establishes strict topological dependency order: parent tables (`departments`, `students`) are created first, followed by dependent child tables (`courses`, `admissions`). Constraints guarantee entity, domain, and referential integrity."
    },
    step2_seeding: {
      stepNumber: "Step 2: Seed Data",
      title: "2. Step 2: Seeding Realistic Academic Data (Barrackpore & Kolkata)",
      badge: "Batch Data Ingestion",
      badgeColor: "cyan",
      sqlScript: `-- 📝 STEP 2: BATCH SEEDING REALISTIC ACADEMIC RECORDS:

-- 1. Seed Departments:
INSERT INTO departments (dept_code, dept_name, campus_city) VALUES
('CSE', 'Computer Science & Engineering', 'Barrackpore'),
('ECE', 'Electronics & Communication', 'Barrackpore'),
('BCA', 'Computer Applications', 'Kolkata'),
('BBA', 'Business Administration', 'Kolkata');

-- 2. Seed Courses:
INSERT INTO courses (department_id, course_name, duration_years, total_tuition_fee_inr) VALUES
(1, 'B.Tech CSE', 4, 380000.00),
(2, 'B.Tech ECE', 4, 340000.00),
(3, 'BCA (Hons)', 3, 160000.00),
(4, 'BBA (Finance)', 3, 150000.00);

-- 3. Seed Students:
INSERT INTO students (first_name, last_name, email, phone_number, date_of_birth, gender, blood_group) VALUES
('Mamata', 'Hui', 'mamata.hui@example.com', '9830011223', '2006-05-14', 'Female', 'O+'),
('Susmita', 'Roy', 'susmita.roy@example.com', '9830022334', '2005-11-20', 'Female', 'A+'),
('Abhronila', 'Das', 'abhronila.das@example.com', '9830033445', '2006-02-18', 'Female', 'B+'),
('Debangshu', 'Dey', 'debangshu.dey@example.com', '9830044556', '2005-08-25', 'Male', 'AB+');

-- 4. Seed Admissions:
INSERT INTO admissions (student_id, course_id, initial_deposit_inr, admission_status) VALUES
(1, 1, 45000.00, 'Confirmed'),
(2, 3, 20000.00, 'Confirmed'),
(3, 1, 35000.00, 'Confirmed'),
(4, 4, 15000.00, 'Provisional');`,
      tableSummary: [
        { table: "departments", purpose: "4 Campuses & Departments Seeded", key: "4 Rows Inserted" },
        { table: "courses", purpose: "4 Degree Programs (Fees: ₹1,50,000 to ₹3,80,000)", key: "4 Rows Inserted" },
        { table: "students", purpose: "4 Students (Mamata, Susmita, Abhronila, Debangshu)", key: "4 Rows Inserted" },
        { table: "admissions", purpose: "4 Confirmed & Provisional Admission Records", key: "4 Rows Inserted" }
      ],
      explanation:
        "Seeding data in transaction-safe batches populates all foreign key relationships cleanly without referential conflicts. All monetary values are stored in Indian Rupees (`DECIMAL(10,2)`)."
    },
    step3_constraint_tests: {
      stepNumber: "Step 3: Constraint Tests",
      title: "3. Step 3: Intentional Constraint Defense Testing",
      badge: "Constraint Violation Defense",
      badgeColor: "rose",
      sqlScript: `-- 🛡️ STEP 3: TESTING DATABASE DEFENSIVE CONSTRAINTS:

-- ❌ Test 1: Trigger Duplicate Email Violation (Error 1062):
INSERT INTO students (first_name, last_name, email, phone_number, date_of_birth, gender)
VALUES ('Duplicate', 'Student', 'mamata.hui@example.com', '9830099999', '2006-01-01', 'Female');
-- Result: Error 1062 (23000): Duplicate entry 'mamata.hui@example.com' for key 'students.email' 🛡️

-- ❌ Test 2: Trigger Initial Deposit CHECK Constraint (< ₹5,000) (Error 3819):
INSERT INTO admissions (student_id, course_id, initial_deposit_inr)
VALUES (1, 2, 2500.00); -- Under ₹5,000 minimum deposit rule!
-- Result: Error 3819 (HY000): Check constraint 'admissions_chk_1' is violated. 🛡️

-- ❌ Test 3: Trigger Non-Existent Foreign Key Parent (Error 1452):
INSERT INTO admissions (student_id, course_id, initial_deposit_inr)
VALUES (1, 999, 10000.00); -- Course 999 does not exist!
-- Result: Error 1452 (23000): Cannot add or update a child row: a foreign key constraint fails 🛡️

-- ❌ Test 4: Attempt Deleting Department with Active Courses (Error 1451):
DELETE FROM departments WHERE department_id = 1;
-- Result: Error 1451 (23000): Cannot delete or update a parent row (ON DELETE RESTRICT) 🛡️`,
      tableSummary: [
        { table: "Unique Constraint Test", purpose: "Blocks duplicate email registration", key: "Error 1062 Handled ✅" },
        { table: "CHECK Constraint Test", purpose: "Rejects deposit under ₹5,000 threshold", key: "Error 3819 Handled ✅" },
        { table: "Foreign Key Insertion Test", purpose: "Blocks referencing non-existent course ID", key: "Error 1452 Handled ✅" },
        { table: "RESTRICT Deletion Test", purpose: "Blocks deleting parent department with active courses", key: "Error 1451 Handled ✅" }
      ],
      explanation:
        "Intentional constraint testing validates that business rules are enforced natively by the MySQL storage engine, rejecting dirty or invalid data before it can corrupt the database."
    },
    step4_reports: {
      stepNumber: "Step 4: Analytical Queries",
      title: "4. Step 4: Production Analytical Queries & Balance Reports",
      badge: "Analytical Queries",
      badgeColor: "amber",
      sqlScript: `-- 📊 STEP 4: PRODUCTION REPORTING QUERIES:

-- Query 1: Comprehensive Student Admission Ledger & Remaining Tuition Balance (INR ₹):
SELECT 
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    s.email,
    d.dept_code,
    c.course_name,
    c.total_tuition_fee_inr AS total_fee_inr,
    a.initial_deposit_inr AS deposit_paid_inr,
    (c.total_tuition_fee_inr - a.initial_deposit_inr) AS remaining_balance_inr,
    a.admission_status
FROM students s
JOIN admissions a ON s.student_id = a.student_id
JOIN courses c ON a.course_id = c.course_id
JOIN departments d ON c.department_id = d.department_id
ORDER BY remaining_balance_inr DESC;

-- Query 2: Department-wise Admission Statistics & Revenue Summary:
SELECT 
    d.dept_name,
    d.campus_city,
    COUNT(a.admission_id) AS total_admissions,
    COALESCE(SUM(a.initial_deposit_inr), 0.00) AS total_revenue_collected_inr
FROM departments d
LEFT JOIN courses c ON d.department_id = c.department_id
LEFT JOIN admissions a ON c.course_id = a.course_id
GROUP BY d.department_id, d.dept_name, d.campus_city;`,
      tableSummary: [
        { table: "Student Ledger Query", purpose: "Calculates exact remaining balance per candidate", key: "4 Records Joined" },
        { table: "Department Summary", purpose: "Aggregates revenue & enrollment per campus", key: "Grouped Summary" }
      ],
      explanation:
        "Analytical queries combine multiple joined tables to calculate outstanding tuition balances and aggregate department enrollment counts across the Barrackpore and Kolkata campuses."
    }
  };

  const navItems = [
    { id: "lab-overview", label: "1. Lab Architecture" },
    { id: "er-diagram", label: "2. Schema Diagram" },
    { id: "interactive-workbench", label: "3. Interactive Lab Workbench" },
    { id: "case-studies", label: "4. Production Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Student Lab Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 001_004</span>
            <span>•</span>
            <span>Topic 1 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Hands-on Lab 1
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Hands-on Lab 1: College Student Admission Database Setup
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Build a complete multi-table academic database from scratch: master foreign key relationships, implement strict business rule constraints, seed realistic candidate records, test defensive error handling, and execute financial balance reports.
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
        {/* SECTION 1: Lab Architecture */}
        <section id="lab-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. College Admission Database Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A robust 4-table relational schema designed for college admissions across West Bengal campuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Table 1</span>
              <h3 className="font-bold text-white">departments</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stores department codes, titles, and campus locations (Barrackpore / Kolkata).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Table 2</span>
              <h3 className="font-bold text-white">courses</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Degree programs linked to departments with tuition fee validation (`&gt; 0`).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Table 3</span>
              <h3 className="font-bold text-white">students</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Candidate personal records with unique email, phone, and blood group defaults.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Table 4</span>
              <h3 className="font-bold text-white">admissions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enrollment ledger with 1:1 student linkage and minimum deposit check (`&gt;= ₹5,000`).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Schema Diagram */}
        <section id="er-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Relational Schema &amp; Constraint Flow Diagram
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing foreign key linkages and defensive constraint checkpoints.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 1.1: 4-Table College Admission Relational Schema
              </h3>
              <span className="text-xs text-slate-400 font-mono">InnoDB Foreign Keys</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrLabCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: Departments */}
                <rect x="30" y="40" width="240" height="130" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="150" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">DEPARTMENTS (Parent)</text>
                <line x1="30" y1="75" x2="270" y2="75" stroke="#334155" />
                <text x="45" y="98" fill="#bae6fd" fontSize="10">🔑 department_id (PK)</text>
                <text x="45" y="118" fill="#e2e8f0" fontSize="10">dept_code (UNIQUE)</text>
                <text x="45" y="138" fill="#94a3b8" fontSize="10">campus_city</text>

                {/* Box 2: Courses */}
                <rect x="340" y="40" width="260" height="140" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="470" y="65" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">COURSES (Child / Parent)</text>
                <line x1="340" y1="75" x2="600" y2="75" stroke="#334155" />
                <text x="355" y="98" fill="#bae6fd" fontSize="10">🔑 course_id (PK)</text>
                <text x="355" y="118" fill="#38bdf8" fontSize="10">🔗 department_id (FK)</text>
                <text x="355" y="138" fill="#e2e8f0" fontSize="10">course_name, duration_years</text>
                <text x="355" y="158" fill="#94a3b8" fontSize="10">total_tuition_fee_inr (CHECK)</text>

                {/* Box 3: Students */}
                <rect x="670" y="40" width="250" height="150" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="795" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">STUDENTS (Parent)</text>
                <line x1="670" y1="75" x2="920" y2="75" stroke="#334155" />
                <text x="685" y="98" fill="#bae6fd" fontSize="10">🔑 student_id (PK)</text>
                <text x="685" y="118" fill="#e2e8f0" fontSize="10">first_name, last_name</text>
                <text x="685" y="138" fill="#fca5a5" fontSize="10">email, phone_number (UNIQUE)</text>
                <text x="685" y="158" fill="#94a3b8" fontSize="10">date_of_birth, gender</text>

                {/* Box 4: Admissions */}
                <rect x="340" y="220" width="260" height="120" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="470" y="245" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">ADMISSIONS (Child / Junction)</text>
                <line x1="340" y1="255" x2="600" y2="255" stroke="#334155" />
                <text x="355" y="278" fill="#bae6fd" fontSize="10">🔑 admission_id (PK)</text>
                <text x="355" y="298" fill="#38bdf8" fontSize="10">🔗 student_id (FK UNIQUE - 1:1)</text>
                <text x="355" y="318" fill="#38bdf8" fontSize="10">🔗 course_id (FK) | deposit (CHECK)</text>

                {/* Arrows */}
                <path d="M 340 115 L 270 115" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrLabCyan)" />
                <path d="M 470 220 L 470 180" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrLabCyan)" />
                <path d="M 600 280 C 660 280, 680 200, 685 170" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrLabCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Lab Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Hands-on Lab Execution Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step through the 4 lab stages to inspect SQL scripts, seeding data, constraint test runs, and analytical query outputs.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(labSteps).map((key) => {
              const step = labSteps[key];
              const isSelected = selectedLabStep === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLabStep(key)}
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
                      step.badgeColor === "emerald" && "bg-emerald-400",
                      step.badgeColor === "cyan" && "bg-cyan-400",
                      step.badgeColor === "amber" && "bg-amber-400",
                      step.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{step.stepNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {labSteps[selectedLabStep].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  labSteps[selectedLabStep].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  labSteps[selectedLabStep].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  labSteps[selectedLabStep].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  labSteps[selectedLabStep].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {labSteps[selectedLabStep].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Lab Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {labSteps[selectedLabStep].sqlScript}
              </pre>
            </div>

            {/* Table Summary Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Schema &amp; Execution Highlights:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Entity / Test Case</th>
                      <th className="py-2.5 px-4">Description / Purpose</th>
                      <th className="py-2.5 px-4">Integrity / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {labSteps[selectedLabStep].tableSummary.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.table}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.purpose}</td>
                        <td className="py-3 px-4 text-emerald-400">{row.key}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Insight:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {labSteps[selectedLabStep].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Production Case Studies: Barrackpore &amp; Kolkata Admissions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world academic deployment of the lab schema.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Barrackpore Enrollment */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Managing Barrackpore B.Tech CSE Admissions
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Confirmed Enrollments
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, 120 students enrolled in B.Tech CSE paying initial deposits between ₹35,000 and ₹50,000. The CHECK constraint guaranteed that no student was admitted with zero deposit, and the 1:1 unique constraint on `student_id` prevented double enrollment.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Kolkata ₹ Financial Ledger */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Tracking ₹12.5 Lakh Outstanding Tuition Fees
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Exact Decimal Precision
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, calculating outstanding balances across 200 BCA and BBA students using `DECIMAL(10,2)` preserved exact paise precision, generating flawless financial balance reports for the college bursar.
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
              Avoid critical schema setup errors in multi-table database projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Out-of-Order DDL Script Execution
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attempting to create `courses` before `departments` fails with `Table does not exist`. Child tables require their parent primary keys to exist first.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Create parents first; drop children first.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing Currency in FLOAT / DOUBLE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Binary floating-point types introduce rounding inaccuracies in financial balances (e.g. `₹45000.00` becoming `₹44999.99998`).
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use DECIMAL(10,2) or DECIMAL(12,2) for money.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Name Foreign Keys Explicitly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use descriptive constraint symbols (`CONSTRAINT fk_admission_course FOREIGN KEY...`) to make future migrations and error messages easy to read.
              </p>
              <div className="text-xs text-slate-400">
                Simplifies debugging and future ALTER TABLE maintenance.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use ENUM for Fixed States
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `ENUM('Provisional', 'Confirmed', 'Cancelled')` for discrete status fields to prevent typo bugs from entering the database.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees domain validation directly at the column level.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Student Lab Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Student Hands-on Lab Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key milestones to complete for Lab 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Lab 1 Completion Milestones
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Schema Created</strong> = Execute DDL for all 4 tables with InnoDB engine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Seed Records Inserted</strong> = Insert sample departments, courses, students, and admissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Constraints Verified</strong> = Trigger Errors 1062, 3819, and 1451 intentionally.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Reports Executed</strong> = Calculate remaining tuition fees and enrollment counts.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe 1:1 unique foreign keys...”</span>
                  Notice that `student_id` in `admissions` has a `UNIQUE` constraint. This turns a standard 1:N relationship into a strict 1:1 relationship!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about ON DELETE CASCADE...”</span>
                  We set `ON DELETE CASCADE` from `admissions` to `students` so that deleting a student record cleanly deletes their admission file without leaving orphan records.
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
              Comprehensive reference questions covering the College Student Admission Lab.
            </p>
          </div>

          <FAQTemplate
            title="College Student Admission Lab FAQs"
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
            title="Hands-on Lab 1: College Student Admission Database Setup"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="Building your first real multi-table schema is a milestone for every database developer. In this lab, you saw how foreign keys link academic departments to courses and students to admissions. But more importantly, you saw how defensive constraints (like `CHECK (initial_deposit_inr >= 5000)` and `UNIQUE (email)`) protect your application from bad data. Always write your DDL in dependency order, name your constraints explicitly, and test intentional error conditions in your MySQL terminal to verify your database's defenses!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
