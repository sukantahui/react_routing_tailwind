import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Mini Project: Student Grading & Course Registration System
 * Module: 001_004_practice-and-assessment-segment-1
 *
 * @component
 * @returns {JSX.Element} Interactive mini-project workbench and end-to-end academic database tutorial: designing a 5-table university grading schema, enforcing composite unique keys and score check constraints, batch seeding multi-campus academic cohorts, and executing semester transcript and Dean's list analytical reports.
 */
const Topic5 = () => {
  // Interactive Project Stage State
  const [selectedProjectStage, setSelectedProjectStage] = useState("stage1_schema_ddl");

  const projectStages = {
    stage1_schema_ddl: {
      stageNumber: "Stage 1: Project DDL",
      title: "1. Stage 1: Complete 5-Table DDL Schema with Composite Keys",
      badge: "Project DDL Schema",
      badgeColor: "emerald",
      sqlScript: `-- 🎓 STAGE 1: CREATE UNIVERSITY GRADING DATABASE & 5 NORMALIZED TABLES:
CREATE DATABASE IF NOT EXISTS university_grading_db;
USE university_grading_db;

-- 1. Departments Table
CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    campus_city VARCHAR(50) DEFAULT 'Barrackpore'
) ENGINE=InnoDB;

-- 2. Courses Table
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_id INT NOT NULL,
    course_code VARCHAR(15) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    credits INT CHECK (credits BETWEEN 1 AND 6),
    CONSTRAINT fk_course_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 3. Students Table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    admission_year INT CHECK (admission_year >= 2020)
) ENGINE=InnoDB;

-- 4. Course Enrollments (Junction Table with Composite Unique Key)
CREATE TABLE course_enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    semester_term VARCHAR(20) NOT NULL,
    UNIQUE (student_id, course_id, semester_term), -- 🔑 Composite Unique Key!
    CONSTRAINT fk_enroll_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_enroll_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 5. Grade Ledgers Table
CREATE TABLE grade_ledgers (
    grade_id INT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id INT NOT NULL,
    exam_type ENUM('Mid-Term', 'Final-Term', 'Lab-Practical') NOT NULL,
    marks_obtained DECIMAL(5,2) CHECK (marks_obtained BETWEEN 0 AND 100),
    grade_letter VARCHAR(2) DEFAULT 'F',
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_grade_enrollment FOREIGN KEY (enrollment_id) REFERENCES course_enrollments(enrollment_id) ON DELETE CASCADE
) ENGINE=InnoDB;`,
      tableSummary: [
        { table: "departments", purpose: "Campus departments (Barrackpore, Kolkata)", key: "PK: dept_id" },
        { table: "courses", purpose: "Curriculum with credit check (1 to 6)", key: "FK -> departments" },
        { table: "students", purpose: "Student directory with unique roll numbers", key: "PK: student_id" },
        { table: "course_enrollments", purpose: "Term registrations with composite unique key", key: "UNIQUE (std, crs, sem)" },
        { table: "grade_ledgers", purpose: "Score ledgers with check (0-100 marks)", key: "FK -> enrollments" }
      ],
      explanation:
        "The schema represents an end-to-end academic database. Notice the composite unique key on `course_enrollments` (`UNIQUE (student_id, course_id, semester_term)`), preventing double-registration while allowing students to take different courses in the same semester."
    },
    stage2_seeding: {
      stageNumber: "Stage 2: Academic Seeding",
      title: "2. Stage 2: Seeding Academic Faculty, Courses & Student Cohorts",
      badge: "Cohort Seeding",
      badgeColor: "cyan",
      sqlScript: `-- 📝 STAGE 2: BATCH SEEDING UNIVERSITY COHORTS:

-- 1. Seed Departments:
INSERT INTO departments (dept_name, campus_city) VALUES
('Computer Science & Engineering', 'Barrackpore'),
('Information Technology', 'Kolkata'),
('Electronics Engineering', 'Ichapur');

-- 2. Seed Courses:
INSERT INTO courses (dept_id, course_code, title, credits) VALUES
(1, 'CS-301', 'Database Management Systems', 4),
(1, 'CS-302', 'Data Structures & Algorithms', 4),
(2, 'IT-201', 'Web Application Development', 3),
(3, 'EC-101', 'Digital Logic & Circuit Design', 3);

-- 3. Seed Students:
INSERT INTO students (roll_number, full_name, email, admission_year) VALUES
('BKP-CSE-2601', 'Mamata Hui', 'mamata.hui@university.ac.in', 2026),
('BKP-CSE-2602', 'Susmita Roy', 'susmita.roy@university.ac.in', 2026),
('KOL-IT-2601', 'Abhronila Das', 'abhronila.das@university.ac.in', 2026),
('KOL-IT-2602', 'Debangshu Dey', 'debangshu.dey@university.ac.in', 2026);

-- 4. Seed Course Enrollments (Sem-1):
INSERT INTO course_enrollments (student_id, course_id, semester_term) VALUES
(1, 1, 'Sem-1'), -- Mamata in DBMS
(1, 2, 'Sem-1'), -- Mamata in DSA
(2, 1, 'Sem-1'), -- Susmita in DBMS
(3, 3, 'Sem-1'), -- Abhronila in Web Dev
(4, 3, 'Sem-1'); -- Debangshu in Web Dev`,
      tableSummary: [
        { table: "departments", purpose: "3 University Departments Seeded", key: "3 Rows Inserted" },
        { table: "courses", purpose: "4 Degree Courses Seeded (3-4 Credits)", key: "4 Rows Inserted" },
        { table: "students", purpose: "4 Students across Barrackpore & Kolkata Cohorts", key: "4 Rows Inserted" },
        { table: "course_enrollments", purpose: "5 Active Semester-1 Registrations", key: "5 Rows Inserted" }
      ],
      explanation:
        "All four students are enrolled in their respective degree subjects for Semester-1. The institutional emails (`.ac.in`) and roll numbers adhere to strict uniqueness constraints."
    },
    stage3_grades: {
      stageNumber: "Stage 3: Grading Ledgers",
      title: "3. Stage 3: Score Ingestion & Grade Evaluation Defense",
      badge: "Grading Ledgers",
      badgeColor: "amber",
      sqlScript: `-- 📊 STAGE 3: INGESTING EXAMINATION MARKS:

-- 1. Insert Mid-Term & Final-Term Marks:
INSERT INTO grade_ledgers (enrollment_id, exam_type, marks_obtained, grade_letter) VALUES
(1, 'Mid-Term', 92.50, 'A+'), -- Mamata DBMS Mid-Term
(1, 'Final-Term', 88.00, 'A'),  -- Mamata DBMS Final-Term
(2, 'Mid-Term', 94.00, 'A+'), -- Mamata DSA Mid-Term
(2, 'Final-Term', 91.50, 'A+'), -- Mamata DSA Final-Term
(3, 'Final-Term', 76.00, 'B+'), -- Susmita DBMS Final-Term
(4, 'Final-Term', 89.00, 'A'),  -- Abhronila Web Dev Final-Term
(5, 'Final-Term', 82.50, 'B+'); -- Debangshu Web Dev Final-Term

-- ❌ DEFENSIVE CHECK VIOLATION DEMONSTRATION:
-- Attempting to insert an invalid score (e.g. 105.00 or -5.00):
-- INSERT INTO grade_ledgers (enrollment_id, exam_type, marks_obtained) VALUES (1, 'Final-Term', 105.00);
-- Result: Error 3819 (HY000): Check constraint 'grade_ledgers_chk_1' is violated! 🛡️`,
      tableSummary: [
        { table: "Grade Ingestion", purpose: "Recorded 7 exam scores across Mid-Term & Final-Term", key: "Scores: 76.00 - 94.00" },
        { table: "CHECK Constraint Defense", purpose: "Rejects scores > 100 or < 0", key: "Error 3819 Handled 🛡️" }
      ],
      explanation:
        "Marks are recorded with exact fractional precision (`DECIMAL(5,2)`). The `CHECK (marks_obtained BETWEEN 0 AND 100)` constraint guarantees that score entries are mathematically valid."
    },
    stage4_analytics: {
      stageNumber: "Stage 4: Transcripts & GPA",
      title: "4. Stage 4: Student Transcripts & Dean's List Analytics",
      badge: "Academic Transcripts",
      badgeColor: "rose",
      sqlScript: `-- 📋 STAGE 4: PRODUCTION ACADEMIC TRANSCRIPTS & HONORS:

-- Query 1: Comprehensive Semester-1 Grade Transcript for Student Mamata Hui:
SELECT 
    s.roll_number,
    s.full_name AS student_name,
    c.course_code,
    c.title AS course_title,
    c.credits,
    g.exam_type,
    g.marks_obtained,
    g.grade_letter
FROM students s
JOIN course_enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
JOIN grade_ledgers g ON e.enrollment_id = g.enrollment_id
WHERE s.full_name = 'Mamata Hui' AND e.semester_term = 'Sem-1'
ORDER BY c.course_code, g.exam_type;

-- Query 2: Dean's Honor Roll (Students with Average Marks >= 85.00):
SELECT 
    s.roll_number,
    s.full_name,
    d.campus_city,
    COUNT(DISTINCT e.course_id) AS courses_taken,
    ROUND(AVG(g.marks_obtained), 2) AS overall_average_marks,
    CASE 
        WHEN AVG(g.marks_obtained) >= 90.00 THEN 'High Honors ⭐'
        ELSE 'Honors 🎖️'
    END AS academic_standing
FROM students s
JOIN course_enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
JOIN departments d ON c.dept_id = d.dept_id
JOIN grade_ledgers g ON e.enrollment_id = g.enrollment_id
GROUP BY s.student_id, s.roll_number, s.full_name, d.campus_city
HAVING AVG(g.marks_obtained) >= 85.00
ORDER BY overall_average_marks DESC;`,
      tableSummary: [
        { table: "Transcript Query", purpose: "Generates full itemized marksheet across all registered subjects", key: "4 Grades Joined" },
        { table: "Dean's Honor Roll", purpose: "Identifies top performers with average score >= 85.00", key: "Honors Filtered ⭐" }
      ],
      explanation:
        "The analytics queries join 5 relational tables to generate student grade transcripts and evaluate Dean's Honor Roll eligibility based on weighted semester aggregates."
    }
  };

  const navItems = [
    { id: "project-overview", label: "1. Project Architecture" },
    { id: "er-diagram", label: "2. 5-Table Schema Diagram" },
    { id: "interactive-workbench", label: "3. Project Execution Workbench" },
    { id: "case-studies", label: "4. Real-World Academic Cases" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Project Completion Checklist" },
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
            <span>Topic 5 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Capstone Mini-Project
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Mini Project: Student Grading &amp; Course Registration System
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Synthesize all Segment 1 competencies into a complete working system: model a 5-table normalized university grading schema, enforce composite uniqueness and score boundaries, batch ingest multi-campus student cohorts, and generate official academic transcripts.
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
        {/* SECTION 1: Project Architecture */}
        <section id="project-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. University Grading System Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A 5-table normalized relational architecture designed for multi-term college degree administration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Table 1</span>
              <h3 className="font-bold text-white text-sm">departments</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Academic departments &amp; campuses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Table 2</span>
              <h3 className="font-bold text-white text-sm">courses</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Degree courses &amp; credit weights.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Table 3</span>
              <h3 className="font-bold text-white text-sm">students</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Student directory with roll numbers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase">Table 4</span>
              <h3 className="font-bold text-white text-sm">enrollments</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Term registrations (Composite Key).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Table 5</span>
              <h3 className="font-bold text-white text-sm">grade_ledgers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Exam score ledgers (0-100 check).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 5-Table Schema Diagram */}
        <section id="er-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. 5-Table Normalized Relational Schema Diagram
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the complete university data flow from departments to grade ledgers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 5.1: University Grading &amp; Registration Relational Model
              </h3>
              <span className="text-xs text-slate-400 font-mono">5-Table Relational Schema</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrProjCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: Departments */}
                <rect x="20" y="40" width="200" height="130" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="120" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">DEPARTMENTS</text>
                <line x1="20" y1="75" x2="220" y2="75" stroke="#334155" />
                <text x="30" y="98" fill="#bae6fd" fontSize="10">🔑 dept_id (PK)</text>
                <text x="30" y="118" fill="#e2e8f0" fontSize="10">dept_name (UNIQUE)</text>
                <text x="30" y="138" fill="#94a3b8" fontSize="10">campus_city</text>

                {/* Box 2: Courses */}
                <rect x="260" y="40" width="210" height="130" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="365" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">COURSES</text>
                <line x1="260" y1="75" x2="470" y2="75" stroke="#334155" />
                <text x="270" y="98" fill="#bae6fd" fontSize="10">🔑 course_id (PK)</text>
                <text x="270" y="118" fill="#38bdf8" fontSize="10">🔗 dept_id (FK)</text>
                <text x="270" y="138" fill="#e2e8f0" fontSize="10">course_code, title</text>
                <text x="270" y="158" fill="#94a3b8" fontSize="10">credits (CHECK 1-6)</text>

                {/* Box 3: Students */}
                <rect x="740" y="40" width="190" height="130" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="835" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">STUDENTS</text>
                <line x1="740" y1="75" x2="930" y2="75" stroke="#334155" />
                <text x="750" y="98" fill="#bae6fd" fontSize="10">🔑 student_id (PK)</text>
                <text x="750" y="118" fill="#fca5a5" fontSize="10">roll_number (UNIQUE)</text>
                <text x="750" y="138" fill="#e2e8f0" fontSize="10">full_name, email</text>

                {/* Box 4: Enrollments */}
                <rect x="510" y="40" width="190" height="130" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="605" y="65" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">ENROLLMENTS (Junction)</text>
                <line x1="510" y1="75" x2="700" y2="75" stroke="#334155" />
                <text x="520" y="98" fill="#bae6fd" fontSize="10">🔑 enrollment_id (PK)</text>
                <text x="520" y="118" fill="#38bdf8" fontSize="10">🔗 student_id (FK)</text>
                <text x="520" y="138" fill="#38bdf8" fontSize="10">🔗 course_id (FK)</text>
                <text x="520" y="158" fill="#fde68a" fontSize="9">UNIQUE(std, crs, sem)</text>

                {/* Box 5: Grade Ledgers */}
                <rect x="510" y="215" width="190" height="120" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="605" y="238" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">GRADE_LEDGERS</text>
                <line x1="510" y1="248" x2="700" y2="248" stroke="#334155" />
                <text x="520" y="270" fill="#bae6fd" fontSize="10">🔑 grade_id (PK)</text>
                <text x="520" y="290" fill="#38bdf8" fontSize="10">🔗 enrollment_id (FK)</text>
                <text x="520" y="310" fill="#94a3b8" fontSize="10">marks (CHECK), grade</text>

                {/* Arrows */}
                <path d="M 260 105 L 220 105" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrProjCyan)" />
                <path d="M 510 105 L 470 105" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrProjCyan)" />
                <path d="M 700 105 L 740 105" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrProjCyan)" />
                <path d="M 605 215 L 605 170" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrProjCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Project Execution Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Capstone Mini-Project Execution Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step through the 4 project development stages to inspect schema DDL, seeding batches, grade evaluations, and transcript queries.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(projectStages).map((key) => {
              const stg = projectStages[key];
              const isSelected = selectedProjectStage === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedProjectStage(key)}
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
                      stg.badgeColor === "emerald" && "bg-emerald-400",
                      stg.badgeColor === "cyan" && "bg-cyan-400",
                      stg.badgeColor === "amber" && "bg-amber-400",
                      stg.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{stg.stageNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {projectStages[selectedProjectStage].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  projectStages[selectedProjectStage].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  projectStages[selectedProjectStage].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  projectStages[selectedProjectStage].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  projectStages[selectedProjectStage].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {projectStages[selectedProjectStage].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Project Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {projectStages[selectedProjectStage].sqlScript}
              </pre>
            </div>

            {/* Table Summary Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Execution Results &amp; Schema Metadata:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Entity / Milestone</th>
                      <th className="py-2.5 px-4">Architecture Purpose</th>
                      <th className="py-2.5 px-4">Key Guarantee / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {projectStages[selectedProjectStage].tableSummary.map((row, idx) => (
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
                Project Engineering Note:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {projectStages[selectedProjectStage].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Academic Cases */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Academic Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Deployed student registration and grading workflows across West Bengal campuses.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Multi-Course Enrollment */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Managing Barrackpore B.Tech Semester Registrations
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Duplicate Registrations
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, 180 computer science students registered for 5 core courses simultaneously. The composite unique key (`student_id, course_id, semester_term`) guaranteed that no student was double-registered for the same course in Semester-1, while seamlessly allowing multi-course enrollments.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Dean's Honor Roll */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Generating Automated Dean's Honor Roll in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Automated Honors Analytics
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Kolkata campus, running the automated Dean's Honor Roll aggregation query evaluated over 1,200 grade ledger records in 12ms, instantly producing verified academic transcripts with High Honors distinctions for graduating students.
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
              Avoid structural flaws in multi-table academic database projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Missing Composite Uniqueness on Junction Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Failing to add `UNIQUE (student_id, course_id, semester_term)` allows duplicate enrollment rows, corrupting grade averages and exam rosters.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always place composite unique constraints on junction tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing Exam Marks as INT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Defining exam scores as `INT` truncates fractional scores (`89.50` becomes `89`), altering student GPA ranks and honors eligibility.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use DECIMAL(5,2) for academic examination scoring.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use ON DELETE CASCADE for Dependent Grades
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting `ON DELETE CASCADE` from `course_enrollments` to `grade_ledgers` ensures clean atomic cleanup when an enrollment is dropped.
              </p>
              <div className="text-xs text-slate-400">
                Maintains zero orphan rows without requiring manual multi-table scripts.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Store Timestamps on Score Posting
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always include `recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` to create an immutable audit trail for grade submissions.
              </p>
              <div className="text-xs text-slate-400">
                Crucial for academic dispute resolution and regulatory compliance.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Project Completion Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Capstone Mini-Project Completion Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Milestones to complete for the Capstone Mini-Project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Project Milestones
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">5 Tables Created</strong> = Build departments, courses, students, enrollments, and grade ledgers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Composite Uniqueness</strong> = Enforce `UNIQUE(student_id, course_id, semester_term)`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Grades Ingested</strong> = Record scores with fractional `DECIMAL(5,2)` precision.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Transcripts Generated</strong> = Produce itemized marksheets and Dean's Honor Roll.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe 5-table JOIN queries...”</span>
                  Notice how we joined `students` &rarr; `course_enrollments` &rarr; `courses` &rarr; `departments` &rarr; `grade_ledgers` in a single query. Each join condition matches a primary key to its corresponding foreign key!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about CASE statements...”</span>
                  We used a <code>CASE WHEN AVG(...) &gt;= 90 THEN 'High Honors' ... END</code> expression in the SELECT list. Conditional SQL expressions make reporting dynamic and self-documenting!
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
              Comprehensive reference questions covering the Student Grading & Registration Mini-Project.
            </p>
          </div>

          <FAQTemplate
            title="Student Grading & Registration Mini-Project FAQs"
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
            title="Mini Project: Student Grading & Course Registration System"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic5_note.txt"
          />

          <Teacher
            note="Congratulations on reaching the capstone mini-project of Segment 1! In this project, you saw the entire picture come together: designing 5 normalized tables, enforcing composite uniqueness and check constraints, seeding realistic multi-campus cohorts, and writing 5-table join queries to produce official student marksheets. If you can build and query this project independently, you have truly mastered Segment 1 and are fully prepared for advanced ER modeling, normalization, and relational algebra in Segment 2!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
