import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – DROP TABLE vs TRUNCATE TABLE Mechanics
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Data Removal Simulator,
 *                        SVGs, 3-way comparison matrix, best practices, FAQs, and printable notes.
 */
const Topic6 = () => {
  const sectionRefs = useRef([]);

  // Interactive Simulator State
  const [activeCommand, setActiveCommand] = useState("truncate"); // "truncate", "drop", "delete"

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
            Module 001_002 · SQL Fundamentals · Topic 6
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            DROP TABLE vs{" "}
            <span className="bg-gradient-to-r from-teal-400 via-amber-400 to-rose-500 bg-clip-text text-transparent">
              TRUNCATE TABLE
            </span>{" "}
            Mechanics
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the architectural differences between total structural destruction (DROP),
            fast bulk tablespace deallocation (TRUNCATE), and transactional row-by-row deletion (DELETE).
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              💣 DROP TABLE (DDL)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ TRUNCATE TABLE (DDL)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔄 DELETE FROM (DML)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔢 AUTO_INCREMENT Reset
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Architectural Comparison ───────────────── */}
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
                The 3-Way Data Removal Comparison
              </h2>
              <p className="text-xs text-slate-400">
                How DROP, TRUNCATE, and DELETE interact with storage pages, undo logs, and sequences
              </p>
            </div>
          </div>

          {/* 3-Way Comparison Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* DROP */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                DROP TABLE (DDL)
              </span>
              <p className="text-xs text-slate-400 mb-3">Total structural annihilation.</p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>• <strong>Schema:</strong> Destroyed completely.</li>
                <li>• <strong>Data:</strong> Unlinked from disk.</li>
                <li>• <strong>Auto-Inc:</strong> Destroyed with schema.</li>
                <li>• <strong>Rollback:</strong> Impossible (Implicit commit).</li>
                <li>• <strong>Speed:</strong> Instantaneous (&lt;0.1s).</li>
              </ul>
            </div>

            {/* TRUNCATE */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                TRUNCATE TABLE (DDL)
              </span>
              <p className="text-xs text-slate-400 mb-3">Fast bulk data reset.</p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>• <strong>Schema:</strong> Preserved (Empty).</li>
                <li>• <strong>Data:</strong> Deallocated in bulk.</li>
                <li>• <strong>Auto-Inc:</strong> Resets to 1.</li>
                <li>• <strong>Rollback:</strong> Impossible (Implicit commit).</li>
                <li>• <strong>Speed:</strong> Instantaneous (&lt;0.05s).</li>
              </ul>
            </div>

            {/* DELETE */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                DELETE FROM (DML)
              </span>
              <p className="text-xs text-slate-400 mb-3">Row-by-row transactional deletion.</p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>• <strong>Schema:</strong> Preserved (Empty).</li>
                <li>• <strong>Data:</strong> Deleted row by row.</li>
                <li>• <strong>Auto-Inc:</strong> Retains current counter.</li>
                <li>• <strong>Rollback:</strong> Full support (Undo logs).</li>
                <li>• <strong>Speed:</strong> Slow on large tables.</li>
              </ul>
            </div>
          </div>

          {/* ── Semantic SVG 1: Memory & Disk Deallocation ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: How MySQL Handles Pages During DROP vs TRUNCATE vs DELETE
            </h3>
            <svg
              viewBox="0 0 780 200"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Storage Deallocation Diagram"
            >
              {/* Box 1: DROP */}
              <g transform="translate(30, 20)">
                <rect width="220" height="160" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="110" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">DROP TABLE</text>
                <line x1="10" y1="34" x2="210" y2="34" stroke="#334155" />
                <rect x="25" y="50" width="170" height="30" rx="4" fill="#881337" stroke="#f43f5e" strokeDasharray="3,3" />
                <text x="110" y="70" fill="#ffffff" textAnchor="middle" fontSize="10">❌ .ibd Unlinked from OS</text>
                <rect x="25" y="90" width="170" height="30" rx="4" fill="#881337" stroke="#f43f5e" strokeDasharray="3,3" />
                <text x="110" y="110" fill="#ffffff" textAnchor="middle" fontSize="10">❌ Metadata Erased</text>
                <text x="110" y="145" fill="#fda4af" textAnchor="middle" fontSize="10">Table No Longer Exists</text>
              </g>

              {/* Box 2: TRUNCATE */}
              <g transform="translate(280, 20)">
                <rect width="220" height="160" rx="8" fill="#1e293b" stroke="#f59e0b" />
                <text x="110" y="24" fill="#f59e0b" textAnchor="middle" fontWeight="bold">TRUNCATE TABLE</text>
                <line x1="10" y1="34" x2="210" y2="34" stroke="#334155" />
                <rect x="25" y="50" width="170" height="30" rx="4" fill="#0f172a" stroke="#10b981" />
                <text x="110" y="70" fill="#10b981" textAnchor="middle" fontSize="10">✓ Schema Preserved</text>
                <rect x="25" y="90" width="170" height="30" rx="4" fill="#451a03" stroke="#f59e0b" />
                <text x="110" y="110" fill="#fcd34d" textAnchor="middle" fontSize="10">⚡ Fresh .ibd Created</text>
                <text x="110" y="145" fill="#fef08a" textAnchor="middle" fontSize="10">AUTO_INCREMENT = 1</text>
              </g>

              {/* Box 3: DELETE */}
              <g transform="translate(530, 20)">
                <rect width="220" height="160" rx="8" fill="#1e293b" stroke="#14b8a6" />
                <text x="110" y="24" fill="#14b8a6" textAnchor="middle" fontWeight="bold">DELETE FROM</text>
                <line x1="10" y1="34" x2="210" y2="34" stroke="#334155" />
                <rect x="25" y="50" width="170" height="30" rx="4" fill="#0f172a" stroke="#10b981" />
                <text x="110" y="70" fill="#10b981" textAnchor="middle" fontSize="10">✓ Schema Preserved</text>
                <rect x="25" y="90" width="170" height="30" rx="4" fill="#064e3b" stroke="#14b8a6" />
                <text x="110" y="110" fill="#6ee7b7" textAnchor="middle" fontSize="10">📝 Undo Log Written</text>
                <text x="110" y="145" fill="#a7f3d0" textAnchor="middle" fontSize="10">Counter Unchanged (501)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Data Removal Simulator ─────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Command Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Select a command to observe the exact operational consequences on the table state
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Command Toggle Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveCommand("truncate")}
                className={clsx(
                  "flex-1 py-2.5 px-3 rounded-lg text-xs font-bold font-mono transition-all border",
                  activeCommand === "truncate"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                TRUNCATE TABLE students;
              </button>
              <button
                onClick={() => setActiveCommand("drop")}
                className={clsx(
                  "flex-1 py-2.5 px-3 rounded-lg text-xs font-bold font-mono transition-all border",
                  activeCommand === "drop"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                DROP TABLE students;
              </button>
              <button
                onClick={() => setActiveCommand("delete")}
                className={clsx(
                  "flex-1 py-2.5 px-3 rounded-lg text-xs font-bold font-mono transition-all border",
                  activeCommand === "delete"
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                DELETE FROM students;
              </button>
            </div>

            {/* Diagnostic Matrix Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Attribute</th>
                    <th className="p-3">Resulting State</th>
                    <th className="p-3">Explanation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                  {activeCommand === "truncate" && (
                    <>
                      <tr>
                        <td className="p-3 font-bold text-white">Table Structure</td>
                        <td className="p-3 text-emerald-400 font-bold">PRESERVED (Ready for INSERT)</td>
                        <td className="p-3 text-slate-400">Schema, indexes, and constraints remain intact.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Row Count</td>
                        <td className="p-3 text-amber-400 font-bold">0 Rows</td>
                        <td className="p-3 text-slate-400">All data wiped in under 0.05 seconds.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">AUTO_INCREMENT</td>
                        <td className="p-3 text-cyan-400 font-bold">RESETS TO 1</td>
                        <td className="p-3 text-slate-400">Next inserted student receives ID 1.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Transaction Rollback</td>
                        <td className="p-3 text-rose-400 font-bold">IMPOSSIBLE</td>
                        <td className="p-3 text-slate-400">DDL triggers an implicit commit.</td>
                      </tr>
                    </>
                  )}

                  {activeCommand === "drop" && (
                    <>
                      <tr>
                        <td className="p-3 font-bold text-white">Table Structure</td>
                        <td className="p-3 text-rose-400 font-bold">DESTROYED (Error 1146)</td>
                        <td className="p-3 text-slate-400">Relation metadata removed from catalog.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Row Count</td>
                        <td className="p-3 text-rose-400 font-bold">NON-EXISTENT</td>
                        <td className="p-3 text-slate-400">.ibd tablespace file deleted from OS disk.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">AUTO_INCREMENT</td>
                        <td className="p-3 text-rose-400 font-bold">DESTROYED</td>
                        <td className="p-3 text-slate-400">No table exists to track counters.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Transaction Rollback</td>
                        <td className="p-3 text-rose-400 font-bold">IMPOSSIBLE</td>
                        <td className="p-3 text-slate-400">DDL triggers an implicit commit.</td>
                      </tr>
                    </>
                  )}

                  {activeCommand === "delete" && (
                    <>
                      <tr>
                        <td className="p-3 font-bold text-white">Table Structure</td>
                        <td className="p-3 text-emerald-400 font-bold">PRESERVED</td>
                        <td className="p-3 text-slate-400">Schema, indexes, and constraints remain intact.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Row Count</td>
                        <td className="p-3 text-amber-400 font-bold">0 Rows</td>
                        <td className="p-3 text-slate-400">Deleted row-by-row with undo logs.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">AUTO_INCREMENT</td>
                        <td className="p-3 text-purple-400 font-bold">UNCHANGED (Retains max ID)</td>
                        <td className="p-3 text-slate-400">Next inserted student receives ID 501.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Transaction Rollback</td>
                        <td className="p-3 text-emerald-400 font-bold">SUPPORTED (ROLLBACK works)</td>
                        <td className="p-3 text-slate-400">Can be rolled back inside active transaction.</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
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
                Safe data wipe routines from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata Resetting Weekly Staging Database in Barrackpore
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Fast reset of student enrollment staging tables before running weekly automated integration tests.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Fast bulk wipe for staging test suite
TRUNCATE TABLE staging_course_enrollments;
TRUNCATE TABLE staging_students;

-- Verification: Next student inserted receives ID 1
INSERT INTO staging_students (first_name, email)
VALUES ('Mamata', 'mamata@test.in'); -- student_id = 1`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu Decommissioning Legacy Tables in Kolkata E-Commerce
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Dropping obsolete temporary tables after data migration to the new PostgreSQL ledger.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Idempotent drop of obsolete tables
DROP TABLE IF EXISTS legacy_order_items_2024;
DROP TABLE IF EXISTS legacy_orders_2024;`}
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
                Critical warnings to prevent irreversible data loss in production environments
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
                  <strong className="text-white">1. Error 1701 on FK Parent Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>TRUNCATE</code> fails if any active foreign key references the table.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Assuming TRUNCATE Can Be Rolled Back:</strong>
                  <p className="text-slate-400 mt-0.5">
                    DDL commands trigger an implicit commit immediately before and after execution.
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
                  <strong className="text-white">1. Use TRUNCATE for Fast Test Resets:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Reclaims disk space and resets auto-increment in milliseconds between unit tests.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Always Use DROP TABLE IF EXISTS:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensures migration scripts are idempotent and do not crash on missing tables.
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
              <span><code>DROP TABLE</code> removes both schema and data permanently</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>TRUNCATE TABLE</code> wipes data, preserves schema, and resets AUTO_INCREMENT to 1</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>DELETE FROM</code> allows WHERE filters and transaction rollback</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>TRUNCATE does NOT fire DELETE triggers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>TRUNCATE is blocked on tables referenced by active Foreign Keys (Error 1701)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use <code>DROP TABLE IF EXISTS</code> in automation pipelines</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="DROP vs TRUNCATE Mechanics – FAQs"
            questions={questions}
            subtitle="Master data deletion mechanics, auto-increment resets, and tablespace deallocation with 30 comprehensive Q&As"
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
            title="DROP TABLE vs TRUNCATE TABLE Mechanics"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic6_drop_truncate_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "One of the most frequent interview questions for database developers is: 'What is the difference between " +
              "DROP, TRUNCATE, and DELETE?' In my classes in Barrackpore, I emphasize three key takeaways: " +
              "1) DROP removes the house AND the furniture (schema + data), 2) TRUNCATE throws away all the furniture and resets the counter to 1 in milliseconds, " +
              "and 3) DELETE removes furniture piece by piece while writing undo notes in case you change your mind. " +
              "Never confuse them in production!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 6 · DROP vs TRUNCATE Mechanics · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;
