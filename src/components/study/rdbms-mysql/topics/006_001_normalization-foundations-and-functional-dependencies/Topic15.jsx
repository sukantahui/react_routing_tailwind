import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15 – Exceptions and Common Analytical Pitfalls When Formulating Functional Dependencies
 * Module: 006_001_normalization-foundations-and-functional-dependencies
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with live Anomaly & FD Simulator,
 *                        West Bengal real-world case studies, before/after relational tables,
 *                        senior pitfalls, FAQs, and printable notes.
 */
const Topic15 = () => {
  const [selectedTab, setSelectedTab] = useState("insert_anomaly");
  const [copiedCode, setCopiedCode] = useState(false);
  const [closureInput, setClosureInput] = useState("student_id");
  const [computedClosure, setComputedClosure] = useState("{ student_id, student_name, city }");
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleComputeClosure = (attr) => {
    setClosureInput(attr);
    if (attr.includes("student_id") && attr.includes("course_id")) {
      setComputedClosure("{ student_id, course_id, student_name, city, course_title, instructor, fee_inr } &rarr; SUPERKEY / CANDIDATE KEY");
    } else if (attr.includes("student_id")) {
      setComputedClosure("{ student_id, student_name, city } (Partial Closure)");
    } else if (attr.includes("course_id")) {
      setComputedClosure("{ course_id, course_title, instructor, fee_inr } (Partial Closure)");
    } else {
      setComputedClosure(`{ ${attr} } (Non-determining attribute)`);
    }
  };

  const simulatorScenarios = {
    insert_anomaly: {
      badge: "INSERTION BLOCKED",
      badgeColor: "bg-rose-950/80 text-rose-300 border-rose-800",
      title: "1. Insertion Anomaly: Inability to Add Independent Entities",
      problem: "You want to add a brand new course: 'C108: Advanced PostgreSQL' (Fee: ₹6,000, Instructor: 'Sukanta Hui'), but no student in Barrackpore has registered for it yet.",
      cause: "In an unnormalized composite table (student_id, course_id), student_id is part of the Primary Key. Inserting NULL for student_id violates Entity Integrity, so the course CANNOT be added.",
      rawRows: [
        { sId: "#101", sName: "Mamata Hui", city: "Barrackpore", cId: "C101", cTitle: "MySQL Master", fee: "₹4,500" },
        { sId: "#102", sName: "Mahima Sharma", city: "Kolkata", cId: "C102", cTitle: "React 19 Pro", fee: "₹5,500" },
        { sId: "❌ NULL (Rejected)", sName: "❌ NULL", city: "❌ NULL", cId: "C108", cTitle: "Adv PostgreSQL", fee: "₹6,000" }
      ],
      sqlCode: `-- Attempting to add course C108 without a student in unnormalized table:
INSERT INTO student_enrollment_universal 
(student_id, student_name, city, course_id, course_title, instructor, fee_inr)
VALUES (NULL, NULL, NULL, 'C108', 'Adv PostgreSQL', 'Sukanta Hui', 6000.00);
-- ❌ MySQL Error 1048 (23000): Column 'student_id' cannot be null`
    },
    update_anomaly: {
      badge: "DATA INCONSISTENCY",
      badgeColor: "bg-amber-950/80 text-amber-300 border-amber-800",
      title: "2. Update / Modification Anomaly: Incomplete Sync Across Duplicates",
      problem: "Course 'MySQL Master' fee increases from ₹4,500 to ₹5,000. 250 students across Barrackpore & Kolkata are enrolled.",
      cause: "Because course fee is duplicated on every student row, updating 249 rows and missing 1 row due to an interrupted script leaves contradictory prices in the database.",
      rawRows: [
        { sId: "#101", sName: "Mamata Hui", city: "Barrackpore", cId: "C101", cTitle: "MySQL Master", fee: "₹5,000.00 (Updated)" },
        { sId: "#103", sName: "Abhronila Das", city: "Barrackpore", cId: "C101", cTitle: "MySQL Master", fee: "₹5,000.00 (Updated)" },
        { sId: "#105", sName: "Debangshu Roy", city: "Kolkata", cId: "C101", cTitle: "MySQL Master", fee: "₹4,500.00 (MISSED!)" }
      ],
      sqlCode: `-- Partial update produces contradictory records for the same course C101:
UPDATE student_enrollment_universal 
SET fee_inr = 5000.00 
WHERE course_id = 'C101' AND city = 'Barrackpore';
-- ⚠️ INCONSISTENCY: C101 has fee ₹5000 for Barrackpore rows but ₹4500 for Kolkata rows!`
    },
    delete_anomaly: {
      badge: "CATASTROPHIC DATA LOSS",
      badgeColor: "bg-rose-950/80 text-rose-300 border-rose-800",
      title: "3. Deletion Anomaly: Unintended Destruction of Catalog Data",
      problem: "Student #104 (Susmita Ghosh in Ichapur) is the ONLY student enrolled in 'Cloud DevOps'. She withdraws her admission.",
      cause: "Deleting Susmita's row permanently destroys all record of course C103, its syllabus, instructor, and fee from the entire institution.",
      rawRows: [
        { sId: "🗑️ DELETED", sName: "Susmita Ghosh", city: "Ichapur", cId: "C103", cTitle: "Cloud DevOps", fee: "₹6,000.00" }
      ],
      sqlCode: `-- Removing student enrollment:
DELETE FROM student_enrollment_universal 
WHERE student_id = '#104';
-- 💥 CATASTROPHE: Course C103 'Cloud DevOps' has completely vanished from the system!`
    },
    normalized_solution: {
      badge: "NORMALIZED (ZERO ANOMALIES)",
      badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-800",
      title: "4. Normalized 3NF Solution: Independent Relations with Foreign Keys",
      problem: "Decompose the wide unnormalized table into 3 clean, independent entities: Students, Courses, and Enrollments.",
      cause: "Entities exist independently. A course can exist with 0 students. Updates happen in exactly 1 row. Deletions only remove enrollment associations.",
      rawRows: [
        { sId: "students (Table 1)", sName: "student_id (PK)", city: "student_name, city", cId: "courses (Table 2)", cTitle: "course_id (PK), fee_inr", fee: "enrollments (Bridge PK)" }
      ],
      sqlCode: `-- 1. Independent Students Table
CREATE TABLE students (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  student_name VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore'
) ENGINE=InnoDB;

-- 2. Independent Courses Table (Can exist with 0 students!)
CREATE TABLE courses (
  course_id VARCHAR(10) PRIMARY KEY,
  course_title VARCHAR(100) NOT NULL,
  instructor VARCHAR(100) NOT NULL,
  fee_inr DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

-- 3. Enrollments Bridge Table
CREATE TABLE enrollments (
  enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id VARCHAR(10) NOT NULL,
  enrolled_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  CONSTRAINT fk_enr_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE RESTRICT,
  CONSTRAINT fk_enr_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE RESTRICT
) ENGINE=InnoDB;`
    }
  };

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        {/* ─── Header ─────────────────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>📐</span>
            <span>Relational Normalization Masterclass · Topic 15</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Exceptions and Common Analytical Pitfalls When Formulating Functional Dependencies
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate insertion, deletion, and update anomalies through rigorous functional dependency analysis,
            Armstrong's axioms, attribute closures, and lossless relational decomposition.
          </p>
        </header>

        {/* ─── Architectural Pillars ──────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-teal-400">🏛️</span> Core Architectural Pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-base font-bold text-teal-300 mb-2">Single Source of Truth</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every business fact exists in exactly one place, making contradictory data impossible.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-teal-400">Zero Redundancy</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-base font-bold text-teal-300 mb-2">Deterministic Dependencies</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Formal mathematical functional dependencies (X &rarr; Y) prevent partial and transitive leaks.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-teal-400">Armstrong Verified</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-base font-bold text-teal-300 mb-2">Lossless Join Property</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Natural joins of decomposed tables reconstruct the original relation with zero spurious rows.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-teal-400">100% Non-Loss Proof</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-base font-bold text-teal-300 mb-2">OLTP High-Throughput</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Compact normalized rows reduce page cache pollution and eliminate multi-row update locks.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-teal-400">Enterprise Ready</div>
            </div>
          </div>
        </section>

        {/* ─── Interactive Database Anomaly Simulator ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Interactive Database Anomaly & Normalization Simulator
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
            {/* Simulator Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
              <button
                onClick={() => setSelectedTab("insert_anomaly")}
                className={clsx(
                  "px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 flex items-center gap-2",
                  selectedTab === "insert_anomaly"
                    ? "border-rose-400 text-rose-300 bg-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              &gt;
                <span>🚫</span>
                <span>1. Insertion Anomaly</span>
              </button>

              <button
                onClick={() => setSelectedTab("update_anomaly")}
                className={clsx(
                  "px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 flex items-center gap-2",
                  selectedTab === "update_anomaly"
                    ? "border-amber-400 text-amber-300 bg-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              &gt;
                <span>⚠️</span>
                <span>2. Update Anomaly</span>
              </button>

              <button
                onClick={() => setSelectedTab("delete_anomaly")}
                className={clsx(
                  "px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 flex items-center gap-2",
                  selectedTab === "delete_anomaly"
                    ? "border-rose-400 text-rose-300 bg-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              &gt;
                <span>💥</span>
                <span>3. Deletion Anomaly</span>
              </button>

              <button
                onClick={() => setSelectedTab("normalized_solution")}
                className={clsx(
                  "px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 flex items-center gap-2",
                  selectedTab === "normalized_solution"
                    ? "border-emerald-400 text-emerald-300 bg-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              &gt;
                <span>✅</span>
                <span>4. Normalized Solution</span>
              </button>
            </div>

            {/* Simulator Details */}
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className={clsx("px-2.5 py-1 rounded text-xs font-mono font-bold border", simulatorScenarios[selectedTab].badgeColor)}>
                    {simulatorScenarios[selectedTab].badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-2">
                    {simulatorScenarios[selectedTab].title}
                  </h3>
                </div>

                <button
                  onClick={() => handleCopy(simulatorScenarios[selectedTab].sqlCode)}
                  className="px-3 py-1.5 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                &gt;
                  {copiedCode ? "✓ SQL Copied" : "📋 Copy SQL Code"}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm space-y-2">
                <p className="text-slate-300">
                  <strong className="text-teal-300">Scenario Problem:</strong> {simulatorScenarios[selectedTab].problem}
                </p>
                <p className="text-slate-400">
                  <strong className="text-amber-300">Root Relational Cause:</strong> {simulatorScenarios[selectedTab].cause}
                </p>
              </div>

              {/* Data Table Preview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Relation State Preview (Student_Enrollment_Universal)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-300">
                      <tr>
                        <th className="p-3">student_id (PK)</th>
                        <th className="p-3">student_name</th>
                        <th className="p-3">city</th>
                        <th className="p-3">course_id (PK)</th>
                        <th className="p-3">course_title</th>
                        <th className="p-3">fee_inr</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {simulatorScenarios[selectedTab].rawRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/40">
                          <td className="p-3 font-semibold text-teal-400">{row.sId}</td>
                          <td className="p-3">{row.sName}</td>
                          <td className="p-3">{row.city}</td>
                          <td className="p-3 text-amber-400 font-semibold">{row.cId}</td>
                          <td className="p-3">{row.cTitle}</td>
                          <td className="p-3 text-emerald-400 font-bold">{row.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SQL Code Box */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Executable SQL Demonstration & MySQL Engine Feedback
                </h4>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  {simulatorScenarios[selectedTab].sqlCode}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Interactive Attribute Closure Calculator ───────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-teal-400">🧮</span> Interactive Attribute Closure (X+) Engine
          </h2>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Given Relation <code className="text-teal-300 font-mono">R(student_id, course_id, student_name, city, course_title, instructor, fee_inr)</code> and FDs:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-teal-400">FD1:</strong> student_id &rarr; student_name, city
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400">FD2:</strong> course_id &rarr; course_title, instructor, fee_inr
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Determinant Attribute Set to Test Closure:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleComputeClosure("student_id")}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-xs font-mono font-semibold border transition",
                    closureInput === "student_id" ? "bg-teal-900/60 border-teal-500 text-teal-200" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                &gt;
                  {'{ student_id }'}
                </button>
                <button
                  onClick={() => handleComputeClosure("course_id")}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-xs font-mono font-semibold border transition",
                    closureInput === "course_id" ? "bg-amber-900/60 border-amber-500 text-amber-200" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                &gt;
                  {'{ course_id }'}
                </button>
                <button
                  onClick={() => handleComputeClosure("student_id, course_id")}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-xs font-mono font-semibold border transition",
                    closureInput === "student_id, course_id" ? "bg-emerald-900/60 border-emerald-500 text-emerald-200" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                &gt;
                  {'{ student_id, course_id } (Composite)'}
                </button>
                <button
                  onClick={() => handleComputeClosure("city")}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-xs font-mono font-semibold border transition",
                    closureInput === "city" ? "bg-rose-900/60 border-rose-500 text-rose-200" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                &gt;
                  {'{ city }'}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300">
              <span className="text-slate-500 font-bold block mb-1">Computed Closure Result ({'{'} {closureInput} {'}'}+):</span>
              {computedClosure}
            </div>
          </div>
        </section>

        {/* ─── Real-World West Bengal Case Studies ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE RETAIL POS
                  </span>
                  <span className="text-xs text-slate-400">Barrackpore Bazaar</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Inventory & Invoice Normalization</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Susmita refactored a retail billing POS processing 2,500 daily grocery invoices in Barrackpore.
                  By separating Item master prices from invoice line snapshots, she eliminated pricing desynchronization across cash counters.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                ₹15 Lakh Daily Transactions Secured
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    KOLKATA MUNICIPAL TAX
                  </span>
                  <span className="text-xs text-slate-400">KMC Head Office, Kolkata</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Property Tax & Citizen Ledger Architecture</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu normalized a municipal property assessment database across 144 Kolkata wards.
                  Isolating Ward valuation rates from Citizen property owners eliminated duplicate updates during annual rate revisions.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                100% Ward Rate Consistency Guaranteed
              </div>
            </div>
          </div>
        </section>

        {/* ─── Senior Pitfalls & Best Practices ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400">🛡️</span> Senior Pitfalls & Production Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Common Pitfalls & Antipatterns
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Confusing Composite Primary Keys with Multi-Column Foreign Keys:</strong>
                Declaring multiple foreign keys without creating a proper junction table causes Cartesian product duplication.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Storing Calculated Redundant Fields in OLTP:</strong>
                Storing derived totals (e.g. <code className="text-rose-300 font-mono">total_price = quantity * unit_price</code>) in transactional tables risks silent drift when item quantities change.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Always Design to 3NF/BCNF First:</strong>
                Start every transactional OLTP database schema in full 3NF/BCNF. Only consider denormalization after profiling actual production queries.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Verify Lossless Join via Matrix Decomposition:</strong>
                Ensure that for any split of R into R1 and R2, <code className="text-emerald-300 font-mono">(R1 &cap; R2) &rarr; R1</code> or <code className="text-emerald-300 font-mono">(R1 &cap; R2) &rarr; R2</code> holds.
              </div>
            </div>
          </div>
        </section>

        {/* ─── Printable Study Note ──────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Exceptions and Common Analytical Pitfalls When Formulating Functional Dependencies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic15_note.txt"
          />
        </section>

        {/* ─── Teacher's Master Note ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In my classes at Barrackpore, I always ask students: 'If your database crashed right after updating row #100 out of 500, what happens to your data integrity?' " +
              "Normalization is the mathematical guarantee that prevents this disaster. By establishing single sources of truth, you eliminate update anomalies forever. " +
              "Never treat a database like a flat spreadsheet. Master functional dependencies from first principles!"
            }
          />
        </section>

        {/* ─── FAQ & Practice Questions ───────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Exceptions and Common Analytical Pitfalls When Formulating Functional Dependencies – Practice Questions"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── Footer ─────────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 15 · Exceptions and Common Analytical Pitfalls When Formulating Functional Dependencies · RDBMS MySQL Masterclass · Coder & AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic15;
