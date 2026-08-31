import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – String Transformations: UPPER, LOWER, TRIM, LTRIM, RTRIM, REPLACE, LPAD, RPAD
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive String Transformation Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  // Interactive Transformation State
  const [selectedTransformMode, setSelectedTransformMode] = useState("mode_trim_case"); // "mode_trim_case" | "mode_lpad_sequence" | "mode_replace_sanitize" | "mode_custom_field_sort"

  const transformScenarios = {
    mode_trim_case: {
      title: "1. Case Normalization & Whitespace Trimming (TRIM + UPPER/LOWER)",
      sqlQuery: `SELECT 
    raw_name,
    UPPER(TRIM(raw_name)) AS sanitized_name,
    raw_email,
    LOWER(TRIM(raw_email)) AS standardized_email
FROM dirty_student_inputs;`,
      resultRows: [
        { before: "'  mamata hui  '", after1: "MAMATA HUI", after2: "mamata@coder.co.in", badgeColor: "emerald" },
        { before: "' Debangshu Roy '", after1: "DEBANGSHU ROY", after2: "debangshu@coder.co.in", badgeColor: "emerald" },
        { before: "'   susmita sen '", after1: "SUSMITA SEN", after2: "susmita@coder.co.in", badgeColor: "emerald" },
      ],
      verdictText: "✓ CLEANED & CASE STANDARDIZED",
      badgeColor: "emerald",
      explanation: "TRIM strips leading and trailing spaces, while UPPER and LOWER ensure uniform casing across user logins and certificates.",
    },
    mode_lpad_sequence: {
      title: "2. Fixed-Width Sequence Generation (LPAD & RPAD)",
      sqlQuery: `SELECT 
    invoice_id,
    CONCAT('INV-', LPAD(invoice_id, 6, '0')) AS formatted_invoice_no,
    RPAD(course_title, 20, '.') AS fixed_width_display
FROM student_invoices;`,
      resultRows: [
        { before: "ID: 42", after1: "INV-000042", after2: "MySQL Master........", badgeColor: "cyan" },
        { before: "ID: 108", after1: "INV-000108", after2: "React Architect.....", badgeColor: "cyan" },
        { before: "ID: 5021", after1: "INV-005021", after2: "Python AI & ML......", badgeColor: "cyan" },
      ],
      verdictText: "✓ FIXED-WIDTH ZERO PADDING",
      badgeColor: "cyan",
      explanation: "LPAD left-pads numeric IDs with zeros to generate standard 6-digit invoice codes, while RPAD formats fixed-width display columns.",
    },
    mode_replace_sanitize: {
      title: "3. Global Text Substitution & Sanitization (REPLACE)",
      sqlQuery: `-- Stripping international prefixes, spaces, and formatting characters:
SELECT 
    raw_phone,
    REPLACE(REPLACE(raw_phone, '+91-', ''), ' ', '') AS sanitized_mobile,
    REPLACE(doc_url, 'http://', 'https://') AS secure_url
FROM student_contacts;`,
      resultRows: [
        { before: "+91-98300 12345", after1: "9830012345", after2: "https://codernaccotax.co.in", badgeColor: "indigo" },
        { before: "+91-70037 56860", after1: "7003756860", after2: "https://codernaccotax.co.in", badgeColor: "indigo" },
      ],
      verdictText: "✓ GLOBAL CHARACTER SANITIZATION",
      badgeColor: "indigo",
      explanation: "Chained REPLACE() calls strip country prefixes and spaces, standardizing mobile numbers for SMS gateway integration.",
    },
    mode_custom_field_sort: {
      title: "4. Custom Sequence Sorting (ORDER BY FIELD)",
      sqlQuery: `-- Sorting by custom business priority instead of alphabetical order:
SELECT 
    student_name,
    batch_status,
    FIELD(batch_status, 'ACTIVE', 'PENDING', 'COMPLETED', 'SUSPENDED') AS priority_rank
FROM student_batches
ORDER BY FIELD(batch_status, 'ACTIVE', 'PENDING', 'COMPLETED', 'SUSPENDED');`,
      resultRows: [
        { before: "Mamata Hui", after1: "ACTIVE (Rank 1)", after2: "Priority: Highest", badgeColor: "emerald" },
        { before: "Debangshu Roy", after1: "PENDING (Rank 2)", after2: "Priority: Normal", badgeColor: "amber" },
        { before: "Susmita Sen", after1: "SUSPENDED (Rank 4)", after2: "Priority: Low", badgeColor: "rose" },
      ],
      verdictText: "✓ CUSTOM ENUM SEQUENCE SORT",
      badgeColor: "amber",
      explanation: "FIELD() returns the 1-based index position of values, enabling custom business sort sequences in executive reports.",
    },
  };

  const currentTransform = transformScenarios[selectedTransformMode];

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
            Module 002_006 · SQL Functions · Topic 2
          </div>

          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            String Transformations:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              UPPER, LOWER, TRIM, REPLACE &amp; LPAD
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master data sanitization and text transformation functions: stripping stray whitespace with TRIM, case normalization,
            global character substitution with REPLACE, fixed-width zero-padding with LPAD, and custom priority sorting with FIELD.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🧹 Whitespace Stripping: TRIM() / LTRIM() / RTRIM()
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔤 Case Normalization: UPPER() &amp; LOWER()
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 Global Replacement: REPLACE()
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 Fixed-Width Sequence: LPAD('101', 6, '0')
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: String Transformation Mechanics ────────── */}
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
                The Mechanics of Data Sanitization &amp; Formatting
              </h2>
              <p className="text-xs text-slate-400">
                How text cleaning pipelines transform dirty user inputs into standardized relational records
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. Sanitization Pipeline</span>
              <strong className="text-white text-xs block font-mono">LOWER(TRIM(user_input))</strong>
              <p className="text-xs text-slate-300">
                Eliminates leading/trailing spaces and normalizes case, preventing duplicate email registrations and failed lookup queries.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Fixed-Width Formatting</span>
              <strong className="text-white text-xs block font-mono">LPAD(id, 6, '0') ➔ '000101'</strong>
              <p className="text-xs text-slate-300">
                Generates uniform fixed-width sequence numbers for invoices, roll numbers, and banking export files.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Transformation Pipeline Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Multi-Stage Text Sanitization &amp; Sequence Formatting Pipeline
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Text Sanitization Pipeline Diagram"
            >
              {/* Step 1: Raw Input */}
              <g transform="translate(20, 20)">
                <rect width="160" height="90" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="80" y="22" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="9">Raw Dirty Input</text>
                <text x="10" y="48" fill="#fca5a5" fontSize="8">'  mamata hui  '</text>
                <text x="10" y="68" fill="#cbd5e1" fontSize="8">Stray spaces &amp; case</text>
              </g>

              {/* Arrow 1 */}
              <g transform="translate(185, 55)">
                <line x1="0" y1="10" x2="25" y2="10" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="25,5 35,10 25,15" fill="#38bdf8" />
                <text x="17" y="0" fill="#38bdf8" textAnchor="middle" fontSize="7">TRIM()</text>
              </g>

              {/* Step 2: Trimmed */}
              <g transform="translate(225, 20)">
                <rect width="150" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="75" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="9">Whitespace Stripped</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="8">'mamata hui'</text>
                <text x="10" y="68" fill="#a7f3d0" fontSize="8">0 leading/trailing</text>
              </g>

              {/* Arrow 2 */}
              <g transform="translate(380, 55)">
                <line x1="0" y1="10" x2="25" y2="10" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="25,5 35,10 25,15" fill="#f59e0b" />
                <text x="17" y="0" fill="#f59e0b" textAnchor="middle" fontSize="7">UPPER()</text>
              </g>

              {/* Step 3: Normalized */}
              <g transform="translate(420, 20)">
                <rect width="150" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="75" y="22" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="9">Case Normalized</text>
                <text x="10" y="48" fill="#fde68a" fontSize="8">'MAMATA HUI'</text>
                <text x="10" y="68" fill="#cbd5e1" fontSize="8">Standard casing</text>
              </g>

              {/* Arrow 3 */}
              <g transform="translate(575, 55)">
                <line x1="0" y1="10" x2="25" y2="10" stroke="#10b981" strokeWidth="2" />
                <polygon points="25,5 35,10 25,15" fill="#10b981" />
                <text x="17" y="0" fill="#10b981" textAnchor="middle" fontSize="7">LPAD(id,6)</text>
              </g>

              {/* Step 4: Final Output */}
              <g transform="translate(615, 20)">
                <rect width="145" height="90" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="72" y="22" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="9">Certified Output</text>
                <text x="10" y="48" fill="#a7f3d0" fontSize="8">INV-000101</text>
                <text x="10" y="68" fill="#cbd5e1" fontSize="8">MAMATA HUI</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Sandbox ────────────────────── */}
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
                Interactive String Transformation Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Explore trimming, case normalization, fixed-width LPAD zero-padding, REPLACE sanitization, and FIELD custom sorting
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedTransformMode("mode_trim_case")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedTransformMode === "mode_trim_case"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. TRIM &amp; Case Normal
              </button>

              <button
                onClick={() => setSelectedTransformMode("mode_lpad_sequence")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedTransformMode === "mode_lpad_sequence"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. LPAD Sequences
              </button>

              <button
                onClick={() => setSelectedTransformMode("mode_replace_sanitize")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedTransformMode === "mode_replace_sanitize"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. REPLACE Sanitization
              </button>

              <button
                onClick={() => setSelectedTransformMode("mode_custom_field_sort")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedTransformMode === "mode_custom_field_sort"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. FIELD Custom Sort
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentTransform.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentTransform.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentTransform.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentTransform.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      )}
                    >
                      {currentTransform.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentTransform.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentTransform.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Transformed String Output Tuples
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Input / Raw String</th>
                        <th className="p-1.5">Transformed Value 1</th>
                        <th className="p-1.5">Transformed Value 2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentTransform.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-rose-300">{r.before}</td>
                          <td className="p-1.5 text-white font-bold">{r.after1}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.after2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                How Barrackpore and Kolkata training institutes structure text sanitization in production
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Admission Registration Sanitization
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Sanitizing user inputs on student signup forms before committing to database:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Data Cleaning Insert Pipeline:
INSERT INTO clean_students (student_id, student_name, email, clean_phone)
SELECT 
    student_id,
    UPPER(TRIM(student_name)),
    LOWER(TRIM(email)),
    REPLACE(REPLACE(REPLACE(phone_number, '+91', ''), '-', ''), ' ', '')
FROM raw_admission_leads;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Bank NEFT File Export Generator
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Exporting fixed-width text records for banking settlement files:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Fixed-Width Banking Settlement Line:
SELECT 
    CONCAT(
        LPAD(account_no, 16, '0'),
        RPAD(SUBSTRING(beneficiary_name, 1, 30), 30, ' '),
        LPAD(CAST(ROUND(amount_inr * 100) AS UNSIGNED), 12, '0'), -- Amount in Paise
        RPAD(ifsc_code, 11, ' ')
    ) AS fixed_length_edi_record
FROM vendor_payouts;`}
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
                Guidelines for transforming strings safely without unexpected truncations
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
                  <strong className="text-white">1. LPAD / RPAD Truncation Hazard:</strong>
                  <p className="text-slate-400 mt-0.5">
                    If the pad length is shorter than the string, MySQL truncates the string rather than padding it.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming REPLACE is Case-Insensitive:</strong>
                  <p className="text-slate-400 mt-0.5">
                    By default, <code>REPLACE()</code> is case-sensitive; <code>REPLACE('Cat', 'cat', 'dog')</code> leaves 'Cat' unchanged.
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
                  <strong className="text-white">1. Sanitize Emails on Write:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Store emails as <code>LOWER(TRIM(email))</code> to guarantee uniqueness across authentication tables.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use FIELD() for Custom Enum Sorting:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>ORDER BY FIELD(status, 'ACTIVE', 'PENDING', 'CLOSED')</code> for intuitive executive report sequences.
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
              <span>UPPER() and LOWER() normalize alphabetic case</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>TRIM() strips whitespace and custom leading/trailing characters</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>REPLACE(str, from, to) performs global character substitutions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>LPAD() and RPAD() format fixed-width numbers and sequence codes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Watch out: LPAD truncates if the requested length is shorter than string</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use ORDER BY FIELD() for custom priority sorting sequences</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="String Transformations &amp; Formatting – FAQs"
            questions={questions}
            subtitle="Master text transformation functions, whitespace trimming, case normalization, global string replacement, fixed-width zero padding, and custom enum sorting with 30 comprehensive Q&As"
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
            title="String Transformations: UPPER, LOWER, TRIM, LTRIM, RTRIM, REPLACE, LPAD, RPAD"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic2_string_transformations_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Data cleaning is 80% of real-world database administration! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I advise students: " +
              "'Never trust raw user input. Users will type spaces before their names, mix upper and lowercase in emails, and enter phone numbers with random hyphens.' " +
              "Mastering `UPPER()`, `LOWER()`, `TRIM()`, and `REPLACE()` gives you the power to sanitize incoming streams instantly. " +
              "And when generating invoice numbers or student roll numbers, `LPAD(id, 6, '0')` guarantees that your numbers look crisp, professional, and standardized!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 2 · String Transformations · Module 002_006 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;
