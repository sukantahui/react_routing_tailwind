import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

/**
 * Topic16 – Rows (Tuples) and Columns (Attributes)
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Deep dive into the building blocks of tables: rows (tuples)
 *          and columns (attributes). Understand their properties, roles,
 *          and how they together form the structure of relational data.
 *          Builds on Topic 15 (Concept of Tables).
 */
const Topic16 = () => {
  // ─── Refs for Intersection Observer ──────────────────────
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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
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

  // ─── Render ────────────────────────────────────────────────
  return (
    <>
      {/* ─── Inline Keyframes ────────────────────────────── */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            transform: translateY(28px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .reveal-section {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .reveal-section.is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        .highlight-row {
          transition: all 0.3s ease;
        }
        .highlight-row:hover {
          background-color: rgba(59, 130, 246, 0.08);
        }
        .dark .highlight-row:hover {
          background-color: rgba(59, 130, 246, 0.15);
        }

        .highlight-col:hover {
          background-color: rgba(16, 185, 129, 0.08);
        }
        .dark .highlight-col:hover {
          background-color: rgba(16, 185, 129, 0.15);
        }
      `}</style>

      {/* ─── Main Container ────────────────────────────────── */}
      <div
        className={clsx(
          "w-full max-w-4xl mx-auto px-4 py-10 md:py-14",
          "bg-white text-slate-800",
          "dark:bg-slate-950 dark:text-slate-100"
        )}
      >
        {/* ─── Header ──────────────────────────────────────── */}
        <div ref={addRef} className="reveal-section mb-10 text-center">
          <div className="inline-block rounded-2xl bg-blue-100/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            Module 1 · Topic 16
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            Rows <span className="text-slate-400 dark:text-slate-500">(Tuples)</span>
            <br className="sm:hidden" />
            and Columns <span className="text-slate-400 dark:text-slate-500">(Attributes)</span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The two dimensions of a relational table — understanding records and
            fields.
          </p>
        </div>

        {/* ─── SVG: Rows and Columns ───────────────────────── */}
        <div
          ref={addRef}
          className="reveal-section mb-12 flex justify-center"
          style={{ animationDelay: "100ms" }}
        >
          <div
            className={clsx(
              "w-full max-w-xl rounded-2xl border border-slate-200/60 bg-slate-50/60 p-6",
              "dark:border-slate-700/60 dark:bg-slate-800/30",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <svg
              viewBox="0 0 600 220"
              className="w-full h-auto"
              role="img"
              aria-label="Visualisation of rows (tuples) and columns (attributes)"
            >
              <rect width="600" height="220" rx="12" fill="transparent" />

              {/* Table Frame */}
              <rect x="40" y="20" width="520" height="175" rx="6" fill="none" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />

              {/* Header Row */}
              <rect x="40" y="20" width="520" height="28" rx="6" fill="#3b82f6" opacity="0.12" className="dark:fill-blue-400 dark:opacity-20" />
              <text x="120" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">StudentID</text>
              <text x="250" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Name</text>
              <text x="370" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Class</text>
              <text x="480" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">City</text>

              {/* Data Rows with alternating colors */}
              <rect x="50" y="52" width="500" height="22" rx="2" fill="#f8fafc" className="dark:fill-slate-800" />
              <text x="120" y="67" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">101</text>
              <text x="250" y="67" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Swadeep</text>
              <text x="370" y="67" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">10</text>
              <text x="480" y="67" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Barrackpore</text>

              <rect x="50" y="78" width="500" height="22" rx="2" fill="#f1f5f9" className="dark:fill-slate-700" />
              <text x="120" y="93" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">102</text>
              <text x="250" y="93" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Tuhina</text>
              <text x="370" y="93" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">12</text>
              <text x="480" y="93" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Shyamnagar</text>

              <rect x="50" y="104" width="500" height="22" rx="2" fill="#f8fafc" className="dark:fill-slate-800" />
              <text x="120" y="119" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">103</text>
              <text x="250" y="119" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Abhronila</text>
              <text x="370" y="119" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">11</text>
              <text x="480" y="119" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Ichapur</text>

              <rect x="50" y="130" width="500" height="22" rx="2" fill="#f1f5f9" className="dark:fill-slate-700" />
              <text x="120" y="145" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">104</text>
              <text x="250" y="145" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Debangshu</text>
              <text x="370" y="145" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">12</text>
              <text x="480" y="145" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Naihati</text>

              <rect x="50" y="156" width="500" height="22" rx="2" fill="#f8fafc" className="dark:fill-slate-800" />
              <text x="120" y="171" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">105</text>
              <text x="250" y="171" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Susmita</text>
              <text x="370" y="171" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">10</text>
              <text x="480" y="171" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Barrackpore</text>

              {/* Column label */}
              <rect x="30" y="50" width="10" height="130" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-20" />
              <text x="18" y="120" textAnchor="middle" fontSize="9" fill="#3b82f6" className="dark:fill-blue-400" transform="rotate(-90,18,120)">Attributes (Columns)</text>

              {/* Row label */}
              <rect x="45" y="185" width="510" height="10" rx="2" fill="#10b981" opacity="0.15" className="dark:fill-emerald-400 dark:opacity-20" />
              <text x="300" y="200" textAnchor="middle" fontSize="9" fill="#10b981" className="dark:fill-emerald-400">Tuples (Rows) ↓</text>
            </svg>
          </div>
        </div>

        {/* ─── Rows (Tuples) ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "200ms" }}
        >
          <div
            className={clsx(
              "rounded-2xl border border-slate-200/60 bg-white/50 p-6",
              "dark:border-slate-700/60 dark:bg-slate-800/20",
              "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
            )}
          >
            <h2
              className={clsx(
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">📋</span>
              Rows (Tuples) — The Records
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-emerald-600 dark:text-emerald-400">row (tuple)</strong>{" "}
              is a single, horizontal entry in a table. It represents a complete
              instance of the entity that the table models. For example, in a
              "Students" table, each row contains all the data for one specific
              student.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "highlight-row rounded-lg p-3",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Key Characteristics:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Each row is <strong>unique</strong> (identified by primary key)</li>
                  <li>Rows are <strong>unordered</strong> (no inherent sequence)</li>
                  <li>A row contains values for each column (attribute)</li>
                  <li>Represents a single <strong>entity instance</strong></li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-slate-100/70 p-3",
                  "dark:bg-slate-800/50"
                )}
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Example:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <code className="bg-white/60 px-1.5 py-0.5 rounded dark:bg-slate-700/40">
                    (101, 'Swadeep', 10, 'Barrackpore')
                  </code>
                  <br />
                  This row represents the student with ID 101, named Swadeep,
                  in class 10, from Barrackpore.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Columns (Attributes) ──────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "300ms" }}
        >
          <div
            className={clsx(
              "rounded-2xl border border-slate-200/60 bg-white/50 p-6",
              "dark:border-slate-700/60 dark:bg-slate-800/20",
              "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
            )}
          >
            <h2
              className={clsx(
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">🏷️</span>
              Columns (Attributes) — The Fields
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">column (attribute)</strong>{" "}
              is a vertical data field in a table. It represents a specific
              property or characteristic of the entity. In the "Students" table,
              columns could include StudentID, Name, Class, and City.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "highlight-col rounded-lg p-3",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Key Characteristics:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Each column has a <strong>name</strong> and a <strong>data type</strong></li>
                  <li>Columns are <strong>ordered</strong> (they have a defined order in the table)</li>
                  <li>All values in a column are of the same data type</li>
                  <li>Can have <strong>constraints</strong> (NOT NULL, UNIQUE, CHECK)</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-slate-100/70 p-3",
                  "dark:bg-slate-800/50"
                )}
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Example:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <code className="bg-white/60 px-1.5 py-0.5 rounded dark:bg-slate-700/40">
                    StudentID INT PRIMARY KEY
                  </code>
                  <br />
                  This column stores integer IDs, is the primary key, and
                  uniquely identifies each row.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Comparison Table ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "400ms" }}
        >
          <div
            className={clsx(
              "rounded-2xl border border-slate-200/60 bg-white/50 p-6",
              "dark:border-slate-700/60 dark:bg-slate-800/20",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <h2
              className={clsx(
                "mb-4 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">⚖️</span>
              Rows vs Columns: A Side-by-Side Comparison
            </h2>
            <div className="overflow-x-auto">
              <table
                className={clsx(
                  "w-full text-sm",
                  "border-collapse rounded-lg overflow-hidden"
                )}
              >
                <thead>
                  <tr
                    className={clsx(
                      "bg-slate-200/80 text-left",
                      "dark:bg-slate-700/80"
                    )}
                  >
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Aspect
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-emerald-600",
                        "dark:text-emerald-400"
                      )}
                    >
                      Rows (Tuples)
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-blue-600",
                        "dark:text-blue-400"
                      )}
                    >
                      Columns (Attributes)
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={clsx(
                    "divide-y divide-slate-200/60",
                    "dark:divide-slate-700/60"
                  )}
                >
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Definition</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">A single record/instance</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">A property/field of the entity</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Orientation</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Horizontal</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Vertical</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Uniqueness</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Uniquely identified by primary key</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Column name must be unique within table</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Order</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Unordered (set)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Defined order (positional)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Data Type</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Values can be of different types (one per cell)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">All values have the same data type</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Constraints</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Primary key, unique constraints enforce row-level rules</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">NOT NULL, UNIQUE, CHECK, FOREIGN KEY</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "500ms" }}
        >
          <div
            className={clsx(
              "rounded-2xl border border-slate-200/60 bg-white/50 p-6",
              "dark:border-slate-700/60 dark:bg-slate-800/20",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <h2
              className={clsx(
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">🌍</span>
              Real-World Example: A School Report Card
            </h2>
            <div
              className={clsx(
                "rounded-lg bg-slate-100/60 p-4",
                "dark:bg-slate-800/40"
              )}
            >
              <p
                className={clsx(
                  "text-sm leading-relaxed text-slate-700",
                  "dark:text-slate-300"
                )}
              >
                <strong>Tuhina</strong>, a class teacher at a school in{" "}
                <strong>Shyamnagar</strong>, maintains a table called
                <code className="mx-1 bg-white/80 px-1.5 py-0.5 rounded dark:bg-slate-700/40">Students</code>.
                <br />
                <br />
                <strong>Columns (Attributes):</strong>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li><code>StudentID</code> (INT) — Unique number for each student</li>
                  <li><code>Name</code> (VARCHAR) — Full name of the student</li>
                  <li><code>Class</code> (INT) — Class/grade</li>
                  <li><code>City</code> (VARCHAR) — Hometown</li>
                </ul>
                <strong>Rows (Tuples):</strong>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>
                    Row 1: <code>(101, 'Swadeep', 10, 'Barrackpore')</code>
                  </li>
                  <li>
                    Row 2: <code>(102, 'Abhronila', 11, 'Ichapur')</code>
                  </li>
                  <li>
                    Row 3: <code>(103, 'Debangshu', 12, 'Naihati')</code>
                  </li>
                </ul>
                <strong>Key Takeaway:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>
                    The <strong>columns</strong> define <em>what data</em> is
                    stored (the schema).
                  </li>
                  <li>
                    The <strong>rows</strong> are the <em>actual data</em> for
                    each student.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "600ms" }}
        >
          <div
            className={clsx(
              "rounded-2xl border border-blue-200/40 bg-blue-50/40 p-6",
              "dark:border-blue-800/30 dark:bg-blue-900/10",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <h2
              className={clsx(
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-blue-800 dark:text-blue-300"
              )}
            >
              <span className="text-2xl">💎</span>
              Tips &amp; Tricks
            </h2>
            <ul
              className={clsx(
                "space-y-2 text-sm leading-relaxed",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Think of rows as objects:</strong> Each row is an
                  instance of the entity. If you're designing a database,
                  each table's rows should represent a single "thing" (student,
                  order, product).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Design columns first:</strong> Before inserting data,
                  carefully design the columns (attributes) and their data types.
                  This is the schema design phase.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use descriptive column names:</strong> <code>StudentID</code>
                  is clearer than <code>ID</code>. Consistency in naming is crucial.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Order of columns matters for data entry:</strong>
                  While the order doesn't affect query results, it's good to
                  place the most important columns (e.g., primary key) first.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "700ms" }}
        >
          <div
            className={clsx(
              "rounded-2xl border border-red-200/40 bg-red-50/40 p-6",
              "dark:border-red-800/30 dark:bg-red-900/10",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <h2
              className={clsx(
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-red-800 dark:text-red-300"
              )}
            >
              <span className="text-2xl">⚠️</span>
              Common Pitfalls
            </h2>
            <ul
              className={clsx(
                "space-y-2 text-sm leading-relaxed",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Confusing rows and columns:</strong> A common mistake
                  is to think of a column as a row. Remember: rows are horizontal
                  (records), columns are vertical (fields).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using the same column for different data types:</strong>
                  All values in a column must be of the same data type. Storing
                  numbers as text leads to performance and sorting issues.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not enforcing uniqueness:</strong> Without a primary
                  key or unique constraint, duplicate rows can be entered,
                  breaking the relational model.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overlooking column order in queries:</strong> While
                  the order of rows is irrelevant, the order of columns in the
                  result of a query is determined by the SELECT clause.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "800ms" }}
        >
          <div
            className={clsx(
              "rounded-2xl border border-emerald-200/40 bg-emerald-50/40 p-6",
              "dark:border-emerald-800/30 dark:bg-emerald-900/10",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <h2
              className={clsx(
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-emerald-800 dark:text-emerald-300"
              )}
            >
              <span className="text-2xl">✅</span>
              Best Practices
            </h2>
            <ul
              className={clsx(
                "space-y-2 text-sm leading-relaxed",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Define a primary key for every table:</strong> This
                  ensures each row is uniquely identifiable and enables
                  relationships with other tables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use appropriate data types:</strong> Choose data types
                  that match the nature of the data (e.g., DATE for dates, INT for
                  numbers, VARCHAR for text) to ensure accuracy and efficiency.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Leverage constraints:</strong> Use NOT NULL, UNIQUE,
                  and CHECK constraints to enforce data integrity at the column
                  level.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Order columns logically:</strong> Group related columns
                  together and place the primary key first. This improves
                  readability and maintenance.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "900ms" }}
        >
          <div
            className={clsx(
              "rounded-2xl border border-slate-200/60 bg-white/50 p-6",
              "dark:border-slate-700/60 dark:bg-slate-800/20",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <h2
              className={clsx(
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">📋</span>
              Mini Checklist
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-2 sm:grid-cols-2",
                "text-sm text-slate-700 dark:text-slate-300"
              )}
            >
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can define rows (tuples) and columns (attributes)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the difference between rows and columns</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the properties of each (uniqueness, ordering, data type)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify rows and columns in a table</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for designing rows and columns</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
        >
          <FAQTemplate
            title="Rows (Tuples) and Columns (Attributes) – FAQs"
            questions={questions}
            subtitle="Test your understanding with these practice questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        
        {/* ─── Plain Text Printable Study Note ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1250ms" }}
        >
          <PlainTextPrint
            content={noteText}
            title="Rows (Tuples) and Columns (Attributes)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic16_note.txt"
          />
        </section>

        {/* ─── Teacher's Note ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
        >
          <Teacher
            note={
              "The distinction between rows and columns is fundamental, but I've seen " +
              "students get confused even after several classes. I use a simple analogy: " +
              "think of a table as a filing cabinet. The drawers are the columns — they " +
              "each hold a specific kind of information. The file folders are the rows — " +
              "each one is a complete record for one entity. To really internalise this, " +
              "grab a spreadsheet and practice: add new columns (fields) and new rows " +
              "(records). Play with sorting (rows) and filtering (based on columns). " +
              "This hands-on experience will make the concepts stick."
            }
          />
        </section>

        {/* ─── Footer ────────────────────────────────────────── */}
        <div
          className={clsx(
            "mt-12 border-t border-slate-200/60 pt-6 text-center text-xs",
            "text-slate-500 dark:border-slate-700/60 dark:text-slate-500"
          )}
        >
          <span>
            Topic 16 · Rows (Tuples) and Columns (Attributes) · Built with ❤️
            for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic16;