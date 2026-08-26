import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Database Anomalies: Insertion, Update, and Deletion Anomalies
 * Module: 002_004_normalization (Functional Dependencies & Database Normalization)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Cardinal Anomaly Laboratory,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic1 = () => {
  const sectionRefs = useRef([]);

  // Interactive Anomaly Laboratory State
  const [selectedOpKey, setSelectedOpKey] = useState("op_insert"); // "op_insert" | "op_update" | "op_delete" | "op_3nf"

  const anomalyLab = {
    op_insert: {
      title: "1. Insertion Anomaly: Adding Standalone Instructor",
      category: "Entity Integrity Blocker",
      description: "Hire new instructor 'Debangshu Roy' for 'Lab-D' before any course or student is assigned.",
      unnormalizedSql: `INSERT INTO student_course_emp 
(student_id, student_name, city, course_id, instructor_id, instructor_name, instructor_room)
VALUES (NULL, NULL, NULL, NULL, 'INS04', 'Debangshu Roy', 'Lab-D');
-- ❌ MySQL Error 1048 (23000): Column 'student_id' cannot be null!`,
      normalizedSql: `-- In 3NF: Direct, clean insert into dedicated Instructors table!
INSERT INTO instructors (instructor_id, instructor_name, instructor_room)
VALUES ('INS04', 'Debangshu Roy', 'Lab-D');
-- ✓ 1 row inserted successfully! Zero student dependencies.`,
      statusText: "❌ BLOCKED (PK Cannot be NULL)",
      statusColor: "rose",
      tableRows: [
        { sId: "#101", sName: "Mamata Hui", cId: "C101", insId: "INS01", insName: "Sukanta Hui", room: "Lab-A" },
        { sId: "#102", sName: "Mahima Sharma", cId: "C101", insId: "INS01", insName: "Sukanta Hui", room: "Lab-A" },
        { sId: "❌ NULL", sName: "❌ NULL", cId: "❌ NULL", insId: "INS04", insName: "Debangshu Roy", room: "Lab-D (REJECTED)" },
      ],
    },
    op_update: {
      title: "2. Update Anomaly: Relocating Instructor Room",
      category: "Data Desynchronization",
      description: "Instructor 'Sukanta Hui' relocates from 'Lab-A' to 'Lab-X'. 500 students are enrolled.",
      unnormalizedSql: `-- In unnormalized table: Must update 500 rows across database!
UPDATE student_course_emp 
SET instructor_room = 'Lab-X' 
WHERE instructor_id = 'INS01' AND city = 'Barrackpore';
-- ⚠️ Partial update failure: Rows in Kolkata still show 'Lab-A'. Inconsistency!`,
      normalizedSql: `-- In 3NF: Single atomic update in Instructors table!
UPDATE instructors 
SET instructor_room = 'Lab-X' 
WHERE instructor_id = 'INS01';
-- ✓ 1 row updated! Automatically reflected across all enrollments.`,
      statusText: "⚠️ DATA DESYNCHRONIZATION",
      statusColor: "amber",
      tableRows: [
        { sId: "#101", sName: "Mamata Hui", cId: "C101", insId: "INS01", insName: "Sukanta Hui", room: "Lab-X (Updated)" },
        { sId: "#103", sName: "Abhronila Das", cId: "C101", insId: "INS01", insName: "Sukanta Hui", room: "Lab-X (Updated)" },
        { sId: "#105", sName: "Debangshu Roy", cId: "C101", insId: "INS01", insName: "Sukanta Hui", room: "Lab-A (MISSED!)" },
      ],
    },
    op_delete: {
      title: "3. Deletion Anomaly: Student Admission Withdrawal",
      category: "Catastrophic Data Loss",
      description: "Susmita Ghosh is the ONLY student enrolled in 'Cloud DevOps'. She withdraws her admission.",
      unnormalizedSql: `DELETE FROM student_course_emp 
WHERE student_id = '#104';
-- 💥 Catastrophe: Course C103 'Cloud DevOps' and Instructor 'Alok Sen' are ERASED!`,
      normalizedSql: `-- In 3NF: Only removes the enrollment link!
DELETE FROM enrollments 
WHERE student_id = '#104' AND course_id = 'C103';
-- ✓ Enrollment removed! Course 'Cloud DevOps' and Instructor remain 100% safe.`,
      statusText: "💥 MASTER DATA DESTROYED",
      statusColor: "rose",
      tableRows: [
        { sId: "🗑️ DELETED", sName: "Susmita Ghosh", cId: "C103 (LOST)", insId: "INS03 (LOST)", insName: "Alok Sen (LOST)", room: "Lab-C (LOST)" },
      ],
    },
    op_3nf: {
      title: "4. Decomposed 3NF Architecture (100% Anomaly-Free)",
      category: "Relational Best Practice",
      description: "Decomposed into 4 clean relations: Students, Instructors, Courses, and Enrollments.",
      unnormalizedSql: `-- Unnormalized: 1 giant table mixing 4 independent real-world entities.`,
      normalizedSql: `-- 3NF Decomposed Schema:
1. Students(student_id PK, full_name, city)
2. Instructors(instructor_id PK, instructor_name, instructor_room)
3. Courses(course_id PK, course_title, course_fee, instructor_id FK)
4. Enrollments(student_id FK, course_id FK, grade, enrolled_at)
-- ✓ Zero anomalies, zero storage redundancy, 100% entity independence!`,
      statusText: "✓ 100% ROBUST & ANOMALY-FREE",
      statusColor: "emerald",
      tableRows: [
        { sId: "Students (PK)", sName: "Instructors (PK)", cId: "Courses (PK)", insId: "Enrollments (FK Bridge)", insName: "Single Fact Per Cell", room: "Lossless Join Ready" },
      ],
    },
  };

  const currentOp = anomalyLab[selectedOpKey];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <>
      {/* ─── Scoped Component Styles & Reveal Keyframes ────────── */}
      <style>{`
        .reveal-section {
          transform: translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ─── Main Container ────────────────────────────────────── */}
      <div
        className={clsx(
          "w-full max-w-5xl mx-auto px-4 py-10 md:py-14",
          "bg-slate-950 text-slate-100 font-sans leading-relaxed"
        )}
      >
        {/* ─── Module Breadcrumb & Topic Header ────────────────── */}
        <div ref={addRef} className="reveal-section mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Module 002_004 · Database Normalization · Topic 1
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Database Anomalies:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Insertion, Update &amp; Deletion
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Deep dive into the operational failure modes of unnormalized relations: why insertion fails,
            how updates cause contradictory desynchronization, and how deletions cause catastrophic accidental data loss.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🚫 Insertion Blocker
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚠️ Update Desynchronization
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💥 Accidental Deletion Loss
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ 3NF Architectural Cure
            </span>
          </div>
        </div>

        {/* ─── SECTION 0: Masterclass on Database Anomalies (Plain English Guide) ── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-rose-950/20 transition-all duration-300 hover:border-rose-500/50"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 font-bold text-lg">
              ⚠️
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                What are Database Anomalies? <span className="text-rose-400 text-sm font-normal">(Explained Simply &amp; Clearly)</span>
              </h2>
              <p className="text-xs text-slate-400">
                How poor database schema design leads to unexpected, catastrophic side effects during daily operations
              </p>
            </div>
          </div>

          {/* Simple Definition & Everyday Analogy */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2">
                  <span>📖</span> The Core Definition
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  A <strong className="text-rose-300">Database Anomaly</strong> is an unexpected, damaging side-effect or data corruption that occurs when you try to <strong>Insert</strong>, <strong>Update</strong>, or <strong>Delete</strong> records in a poorly designed (unnormalized) database table.
                </p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Anomalies happen when you force <strong>multiple independent business entities</strong> (like Students, Courses, and Teachers) to live inside the <strong>same single row</strong> instead of separating them into their own dedicated tables.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200">
                💡 <strong>The Core Law:</strong> <em>"When you mix 2 different real-world things in 1 table, changing one will always break the other!"</em>
              </div>
            </div>

            {/* Real-World Analogy */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏡</span> The Real-World Hotel &amp; Guest Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Imagine a hotel that does NOT keep a separate list of rooms, but only writes down rooms when a guest checks in:
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-1.5 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Insertion Problem:</strong> You build a brand new luxury suite (Room 501), but you <em>cannot save it in the computer</em> until someone books it!
                  </li>
                  <li>
                    <strong className="text-slate-200">Update Problem:</strong> If room price changes from ₹3,000 to ₹3,500, you have to edit 200 past guest bills. If you miss one, the price is desynchronized.
                  </li>
                  <li>
                    <strong className="text-slate-200">Deletion Problem:</strong> The only guest in Room 302 checks out. Deleting their bill <em>accidentally deletes Room 302 from the hotel's memory</em>!
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                🏨 <strong>Solution:</strong> Separate the <code className="font-mono text-amber-300">Rooms</code> table from the <code className="font-mono text-amber-300">Bookings</code> table!
              </div>
            </div>
          </div>

          {/* Deep Breakdown of the 3 Cardinal Anomalies */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
              The 3 Cardinal Anomalies in Detail: What Happens &amp; Why MySQL Fails
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Insertion Anomaly */}
              <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/40 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      1. INSERTION ANOMALY
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2">The "Trapped Entity" Blocker</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    <strong>The Problem:</strong> You want to record a new entity (e.g. hire a new teacher 'Debangshu Roy' or create a new course 'Python AI'), but no student has registered yet.
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    <strong>Why MySQL Fails:</strong> The table's primary key is <code className="text-rose-300 font-mono">(student_id, course_id)</code>. Because primary key columns <em>cannot be NULL</em>, MySQL rejects the insert with <code className="text-rose-300 font-mono">Error 1048</code>!
                  </p>
                </div>
                <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/50 text-[11px] font-mono text-rose-300">
                  ❌ INSERT INTO universal VALUES (NULL, 'Debangshu', 'Lab-D'); -- BLOCKED!
                </div>
              </div>

              {/* 2. Update Anomaly */}
              <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                      2. UPDATE ANOMALY
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2">The "Contradictory Truth" Bug</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    <strong>The Problem:</strong> A single real-world fact changes (e.g. Teacher Sukanta relocates from 'Lab-A' to 'Lab-X').
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    <strong>Why MySQL Fails:</strong> Because teacher room is duplicated on 500 student enrollment rows, an interrupted update query updates 499 rows and misses 1. The database now holds two conflicting rooms for the same teacher!
                  </p>
                </div>
                <div className="p-2.5 rounded bg-amber-950/40 border border-amber-900/50 text-[11px] font-mono text-amber-300">
                  ⚠️ 499 rows show 'Lab-X', 1 row shows 'Lab-A' (Data Corrupted!)
                </div>
              </div>

              {/* 3. Deletion Anomaly */}
              <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/40 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      3. DELETION ANOMALY
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2">The "Accidental Erasure" Catastrophe</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    <strong>The Problem:</strong> Susmita Ghosh is the only student enrolled in 'Cloud DevOps'. She cancels her admission.
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    <strong>Why MySQL Fails:</strong> Because student and course details share the same physical row, deleting Susmita's student row permanently deletes the course title, syllabus, fee, and teacher from existence!
                  </p>
                </div>
                <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/50 text-[11px] font-mono text-rose-300">
                  💥 DELETE FROM universal WHERE student='#104'; -- Course Erased!
                </div>
              </div>
            </div>
          </div>

          {/* Quick Checklist Card: How to Spot Anomalies */}
          <div className="mt-8 p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-2">
              <span>🔍</span> The 3-Question Mental Checklist to Spot Anomalies in Any Table
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-rose-400 block mb-1">❓ Test 1 (Insertion):</span>
                <p className="text-slate-300 text-[11px]"><em>"Can I add a course or teacher if no students are registered yet?"</em></p>
                <span className="text-[10px] text-slate-500 mt-1 block">If NO &rarr; You have an Insertion Anomaly!</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">❓ Test 2 (Update):</span>
                <p className="text-slate-300 text-[11px]"><em>"If course fee or teacher phone changes, must I update multiple rows?"</em></p>
                <span className="text-[10px] text-slate-500 mt-1 block">If YES &rarr; You have an Update Anomaly!</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-rose-400 block mb-1">❓ Test 3 (Deletion):</span>
                <p className="text-slate-300 text-[11px]"><em>"If the last student drops out, do we lose the course information?"</em></p>
                <span className="text-[10px] text-slate-500 mt-1 block">If YES &rarr; You have a Deletion Anomaly!</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 1: Deep Anatomy of the 3 Modification Anomalies ── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Detailed Anatomy of the 3 Modification Anomalies
              </h2>
              <p className="text-xs text-slate-400">
                Understanding the mechanical root causes of database failure in flat tables
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">1. Insertion Anomaly</span>
              <strong className="text-white text-xs block font-mono">Entity Integrity Clash</strong>
              <p className="text-[11px] text-slate-400">Primary key NOT NULL prevents adding independent parent entities without dummy child rows.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">2. Update Anomaly</span>
              <strong className="text-white text-xs block font-mono">Redundant Multi-Row I/O</strong>
              <p className="text-[11px] text-slate-400">Updating 1 logical value requires updating 1,000 duplicate rows; partial updates corrupt truth.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-slate-950 space-y-1">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">3. Deletion Anomaly</span>
              <strong className="text-white text-xs block font-mono">Phantom Fact Erasure</strong>
              <p className="text-[11px] text-slate-400">Deleting a child enrollment accidentally erases the only copy of the course and instructor record.</p>
            </div>
          </div>

          {/* ── Semantic SVG 1: The Three Failure Modes Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Three Cardinal Anomaly Failure Mechanisms
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Database Anomalies Diagram"
            >
              {/* Box 1: Insertion */}
              <g transform="translate(15, 20)">
                <rect width="230" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="230" height="22" rx="6" fill="#0f172a" stroke="#f43f5e" />
                <text x="115" y="15" fill="#f43f5e" textAnchor="middle" fontWeight="bold">1. Insertion Anomaly</text>
                <text x="10" y="42" fill="#fca5a5">Scenario: Add new Course C205</text>
                <text x="10" y="60" fill="#cbd5e1">Blocker: student_id = NULL</text>
                <text x="10" y="78" fill="#f43f5e" fontWeight="bold">Result: ❌ SQL Error 1048 (Reject)</text>
              </g>

              {/* Box 2: Update */}
              <g transform="translate(275, 20)">
                <rect width="230" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect width="230" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="115" y="15" fill="#f59e0b" textAnchor="middle" fontWeight="bold">2. Update Anomaly</text>
                <text x="10" y="42" fill="#fde68a">Scenario: Fee changes to ₹5000</text>
                <text x="10" y="60" fill="#cbd5e1">Blocker: 500 rows must update</text>
                <text x="10" y="78" fill="#f59e0b" fontWeight="bold">Result: ⚠️ Inconsistent Data State</text>
              </g>

              {/* Box 3: Deletion */}
              <g transform="translate(535, 20)">
                <rect width="230" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <rect width="230" height="22" rx="6" fill="#0f172a" stroke="#f43f5e" />
                <text x="115" y="15" fill="#f43f5e" textAnchor="middle" fontWeight="bold">3. Deletion Anomaly</text>
                <text x="10" y="42" fill="#fca5a5">Scenario: Delete Susmita's row</text>
                <text x="10" y="60" fill="#cbd5e1">Blocker: Only row for 'Cloud DevOps'</text>
                <text x="10" y="78" fill="#f43f5e" fontWeight="bold">Result: 💥 Entire Course Erased!</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Cardinal Anomaly Laboratory ─── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Cardinal Anomaly Laboratory
              </h2>
              <p className="text-xs text-slate-400">
                Simulate each anomaly operation and compare unnormalized failure with 3NF decomposed success
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Action Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedOpKey("op_insert")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOpKey === "op_insert"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                1. Insert Blocker
              </button>

              <button
                onClick={() => setSelectedOpKey("op_update")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOpKey === "op_update"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                2. Update Desync
              </button>

              <button
                onClick={() => setSelectedOpKey("op_delete")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOpKey === "op_delete"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                3. Delete Erasure
              </button>

              <button
                onClick={() => setSelectedOpKey("op_3nf")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center",
                  selectedOpKey === "op_3nf"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              &gt;
                4. 3NF Architecture
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Scenario & Code */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentOp.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentOp.statusColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentOp.statusColor === "amber"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentOp.statusText}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 italic">"{currentOp.description}"</p>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-rose-400 block text-[11px] uppercase font-bold">Unnormalized Flat Table SQL:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-rose-300 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentOp.unnormalizedSql}
                      </pre>
                    </div>

                    <div>
                      <span className="text-emerald-400 block text-[11px] uppercase font-bold">Normalized 3NF Architecture SQL:</span>
                      <pre className="rounded bg-slate-900 p-2 font-mono text-emerald-400 border border-slate-800 overflow-x-auto text-[11px] whitespace-pre-wrap">
                        {currentOp.normalizedSql}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Table State Visualizer */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Simulated Relation State</span>
                    <span className="text-teal-400 font-mono text-[11px]">
                      {currentOp.tableRows.length} Tuples Visualized
                    </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-teal-400 uppercase font-semibold border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-1.5">student_id</th>
                          <th className="p-1.5">student_name</th>
                          <th className="p-1.5">course_id</th>
                          <th className="p-1.5">instructor_id</th>
                          <th className="p-1.5">instructor_name</th>
                          <th className="p-1.5">room</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                        {currentOp.tableRows.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-1.5 text-white font-bold">{row.sId}</td>
                            <td className="p-1.5 text-cyan-300">{row.sName}</td>
                            <td className="p-1.5 text-amber-300">{row.cId}</td>
                            <td className="p-1.5 text-slate-300">{row.insId}</td>
                            <td className="p-1.5 text-slate-300">{row.insName}</td>
                            <td className="p-1.5 text-emerald-300 font-bold">{row.room}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Production Scenarios (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                How Barrackpore and Kolkata training institutes prevent critical data corruption
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Faculty Room Relocation in Barrackpore
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                When instructor Sukanta Hui moves to 'Lab-X', 3NF guarantees a single atomic update:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Atomic single-row update in 3NF:
UPDATE instructors
SET instructor_room = 'Lab-X'
WHERE instructor_id = 'INS01';
-- 1 row affected; 0 risk of partial desynchronization!`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Safe Course Catalog Preservation in Kolkata
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata University</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                When student Susmita drops out, the course catalog remains completely unharmed:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Deleting enrollment leaves course master record 100% intact:
DELETE FROM enrollments
WHERE student_id = '#104' AND course_id = 'C103';

-- Verifying course still exists in catalog:
SELECT * FROM courses WHERE course_id = 'C103';
-- Emits: ('C103', 'Cloud DevOps', 6000.00, 'INS03')`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Guidelines for designing anomaly-free schemas with clean entity boundaries
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Common Pitfalls
              </h3>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Using Dummy Records to Bypass Insertion:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Inserting fake <code>student_id = 'DUMMY'</code> skews aggregates (<code>COUNT(*)</code>) and breaks reporting.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming Auto-Increment Prevents Anomalies:</strong>
                  <p className="text-slate-400 mt-0.5">
                    An auto-increment PK table that mixes orders and product data still suffers from all 3 anomalies.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>✅</span> Production Best Practices
              </h3>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. One Entity Per Table (Single Source of Truth):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Every business entity must possess its own dedicated table with its own primary key.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use Foreign Keys with Referential Actions:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Connect tables with <code>FOREIGN KEY</code> and use <code>ON DELETE RESTRICT</code> to guard against accidental deletions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Summary Checklist ─────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40"
        >
          <h2 className="text-lg md:text-xl font-bold text-white border-b border-slate-800 pb-3">
            Summary Checklist (What You Must Remember)
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Anomalies stem from mixing multiple business entities in 1 unnormalized table</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Insertion Anomaly: Cannot insert standalone parent without dummy child row</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Update Anomaly: Redundant copies require multi-row updates, risking desync</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Deletion Anomaly: Deleting child record erases unrelated master catalog data</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Decomposition into 3NF/BCNF relations completely purges all 3 anomalies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Never use dummy records; decompose into dedicated tables with Foreign Keys</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Database Anomalies – FAQs"
            questions={questions}
            subtitle="Master Insertion, Update, and Deletion anomalies, their architectural root causes, and how 3NF decomposition eliminates all data corruption risks with 30 comprehensive Q&As"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 7: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="Database Anomalies: Insertion, Update, and Deletion Anomalies"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_database_anomalies_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Understanding the 3 cardinal modification anomalies is the turning point in becoming a professional database engineer! " +
              "In my classroom in Barrackpore, I give students an unnormalized table and ask them: " +
              "'Can you add a new teacher who hasn't been assigned any students yet?' (Insertion Anomaly). " +
              "'If a teacher changes their phone number, how many rows must you update?' (Update Anomaly). " +
              "'If the only student in a course drops out, what happens to that course?' (Deletion Anomaly). " +
              "When you see these failure modes in practice, the beauty and necessity of relational decomposition becomes crystal clear. " +
              "Always design with the Single Source of Truth principle: every distinct business fact must live in exactly ONE place!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 1 · Database Anomalies · Module 002_004 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;
