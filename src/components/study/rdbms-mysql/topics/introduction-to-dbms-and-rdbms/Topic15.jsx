import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic15_files/topic15_questions";

/**
 * Topic15 – Concept of Tables (Relations)
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Deep dive into the fundamental building block of the
 *          relational model: the Table (Relation). Covers structure,
 *          properties, terminology, and real-world usage.
 *          Builds on Topic 14 (Relational Model).
 */
const Topic15 = () => {
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

        .table-demo {
          transition: all 0.3s ease;
        }
        .table-demo:hover {
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
        }
        .dark .table-demo:hover {
          filter: drop-shadow(0 10px 15px rgba(255,255,255,0.05));
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
            Module 1 · Topic 15
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            Concept of <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Tables (Relations)
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The foundation of relational databases — understanding the structure
            and properties of tables.
          </p>
        </div>

        {/* ─── SVG: Table Anatomy ───────────────────────────── */}
        <div
          ref={addRef}
          className="reveal-section mb-12 flex justify-center"
          style={{ animationDelay: "100ms" }}
        >
          <div
            className={clsx(
              "table-demo w-full max-w-xl rounded-2xl border border-slate-200/60 bg-slate-50/60 p-6",
              "dark:border-slate-700/60 dark:bg-slate-800/30",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <svg
              viewBox="0 0 600 200"
              className="w-full h-auto"
              role="img"
              aria-label="Anatomy of a table in a relational database"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              {/* Table Frame */}
              <rect x="40" y="20" width="520" height="165" rx="8" fill="none" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />

              {/* Table Title */}
              <text x="300" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📊 Students</text>

              {/* Header Row */}
              <rect x="50" y="55" width="500" height="25" rx="4" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-20" />
              <text x="120" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">StudentID (PK)</text>
              <text x="250" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Name</text>
              <text x="350" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Class</text>
              <text x="450" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">City</text>

              {/* Data Rows */}
              <rect x="50" y="85" width="500" height="22" rx="2" fill="#f8fafc" className="dark:fill-slate-800" />
              <text x="120" y="100" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">101</text>
              <text x="250" y="100" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Swadeep</text>
              <text x="350" y="100" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">10</text>
              <text x="450" y="100" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Barrackpore</text>

              <rect x="50" y="110" width="500" height="22" rx="2" fill="#f1f5f9" className="dark:fill-slate-700" />
              <text x="120" y="125" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">102</text>
              <text x="250" y="125" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Tuhina</text>
              <text x="350" y="125" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">12</text>
              <text x="450" y="125" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Shyamnagar</text>

              <rect x="50" y="135" width="500" height="22" rx="2" fill="#f8fafc" className="dark:fill-slate-800" />
              <text x="120" y="150" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">103</text>
              <text x="250" y="150" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Abhronila</text>
              <text x="350" y="150" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">11</text>
              <text x="450" y="150" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Ichapur</text>

              {/* Labels */}
              <text x="20" y="70" textAnchor="start" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">← Attributes (Columns) →</text>
              <text x="300" y="185" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Tuples (Rows) ↓</text>
            </svg>
          </div>
        </div>

        {/* ─── Definition ────────────────────────────────────── */}
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
              <span className="text-2xl">📖</span>
              What is a Table (Relation)?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">table (relation)</strong>{" "}
              is the fundamental data structure in a relational database. It
              organises data into <strong>rows (tuples)</strong> and{" "}
              <strong>columns (attributes)</strong>. Each table represents a
              specific entity (e.g., Students, Courses, Employees) and contains
              all the data related to that entity.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-lg bg-slate-100/70 p-3",
                  "dark:bg-slate-800/50"
                )}
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Formal Definition:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  A relation (R) is a subset of the Cartesian product of one or
                  more domains (D1 × D2 × ... × Dn). It consists of a heading
                  (schema) and a body (set of tuples).
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-blue-50/60 p-3",
                  "dark:bg-blue-900/20"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Analogy:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  Think of a table as a spreadsheet — but with strict rules:
                  every cell holds a single value, every column has a specific
                  data type, and every row is unique.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Properties ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "300ms" }}
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
              <span className="text-2xl">🔑</span>
              Key Properties of a Table
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🔢",
                  title: "No Duplicate Rows",
                  desc: "Each row (tuple) in a table must be unique. No two rows can have identical values in all columns.",
                  detail: "Ensured by primary keys or unique constraints.",
                  color: "blue",
                },
                {
                  icon: "🔄",
                  title: "Unordered Rows",
                  desc: "Rows in a table have no inherent order. The order of rows does not affect the table's meaning.",
                  detail: "However, query results can be ordered using ORDER BY.",
                  color: "emerald",
                },
                {
                  icon: "📐",
                  title: "Atomic Values",
                  desc: "Each cell (intersection of row and column) must contain a single, indivisible value.",
                  detail: "No repeating groups or nested data structures.",
                  color: "purple",
                },
                {
                  icon: "🏷️",
                  title: "Attribute Names",
                  desc: "Each column (attribute) has a unique name within the table.",
                  detail: "Column names should be descriptive and follow naming conventions.",
                  color: "amber",
                },
                {
                  icon: "📊",
                  title: "Data Types",
                  desc: "Each column has a defined data type (INT, VARCHAR, DATE, etc.) that restricts the values it can hold.",
                  detail: "Enforces domain integrity.",
                  color: "red",
                },
                {
                  icon: "🔗",
                  title: "Relationships",
                  desc: "Tables are linked through primary and foreign keys, enabling data consistency across the database.",
                  detail: "Foreign keys reference primary keys in other tables.",
                  color: "indigo",
                },
              ].map((prop, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  red: "text-red-700 dark:text-red-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]",
                      colorMap[prop.color]
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{prop.icon}</span>
                      <h3
                        className={clsx(
                          "font-bold",
                          textColorMap[prop.color]
                        )}
                      >
                        {prop.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {prop.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {prop.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Table Terminology ────────────────────────────── */}
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
              <span className="text-2xl">📝</span>
              Table Terminology
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
                      Formal Term
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Practical Term
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Description
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Example
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
                    <td className="px-4 py-3 font-medium">Relation</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Table</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">A 2D data structure with rows and columns</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Students</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Tuple</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Row / Record</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">A single instance of the entity</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">(101, 'Swadeep', 10, 'Barrackpore')</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Attribute</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Column / Field</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">A property of the entity</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">StudentID, Name</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Domain</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Data Type</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">The set of allowed values for an attribute</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">INT, VARCHAR(50), DATE</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Schema</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Table Structure</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">The definition of the table (columns, data types, constraints)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">CREATE TABLE Students (...)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Cardinality</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Row Count</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Number of tuples in the relation</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">3 rows</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Degree</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Column Count</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Number of attributes in the relation</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">4 columns</td>
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
              Real-World Example: A School Database
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
                <strong>Susmita</strong>, a school administrator in{" "}
                <strong>Naihati</strong>, manages a database for her school.
                Here are some tables she uses:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Students Table:</strong> Stores student information.
                    <br />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Columns: StudentID (PK), Name, Class, Section, Address,
                      Phone, Email
                    </span>
                  </li>
                  <li>
                    <strong>Teachers Table:</strong> Stores teacher information.
                    <br />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Columns: TeacherID (PK), Name, Subject, Qualification,
                      HireDate
                    </span>
                  </li>
                  <li>
                    <strong>Courses Table:</strong> Stores course information.
                    <br />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Columns: CourseID (PK), CourseName, Credits,
                      Department, TeacherID (FK)
                    </span>
                  </li>
                  <li>
                    <strong>Enrollments Table:</strong> Links students to
                    courses.
                    <br />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Columns: EnrollmentID (PK), StudentID (FK), CourseID (FK),
                      EnrollDate, Grade
                    </span>
                  </li>
                </ul>
                <strong>Key Insights:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    Each table has a <strong>primary key</strong> to uniquely
                    identify each row.
                  </li>
                  <li>
                    <strong>Foreign keys</strong> (like TeacherID in Courses)
                    link tables together.
                  </li>
                  <li>
                    The <strong>schema</strong> is defined before any data is
                    inserted, ensuring structure and integrity.
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
                  <strong>Use singular names:</strong> Name tables after the
                  entity they represent (e.g., <code>Student</code>, not
                  <code>Students</code>). This is a common naming convention.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Consistent naming:</strong> Use a consistent naming
                  style. If you use camelCase for columns, stick to it
                  everywhere. Snake_case is common in SQL.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Choose descriptive column names:</strong> Avoid
                  abbreviations. <code>StudentID</code> is better than{" "}
                  <code>SID</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Define foreign keys explicitly:</strong> Foreign keys
                  enforce referential integrity. Always define them in your
                  schema.
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
                  <strong>Storing duplicate data:</strong> Storing the same
                  information in multiple tables leads to redundancy and
                  inconsistency. Normalise your tables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not defining a primary key:</strong> Every table must
                  have a primary key to uniquely identify rows. Without it, you
                  can't enforce uniqueness or establish relationships.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using overly generic column names:</strong> Columns
                  named <code>Name</code> or <code>ID</code> can be ambiguous.
                  Use <code>StudentName</code>, <code>CourseID</code>, etc.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring data types:</strong> Storing dates as text or
                  numbers leads to problems with sorting and validation. Use
                  appropriate data types.
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
                  <strong>Design the schema carefully:</strong> Spend time
                  understanding the data and relationships before creating
                  tables. Changes later are expensive.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use constraints:</strong> Define PRIMARY KEY, FOREIGN
                  KEY, UNIQUE, and CHECK constraints to enforce data integrity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Normalise to 3NF:</strong> Apply normalisation to
                  reduce redundancy and improve maintainability.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document the schema:</strong> Maintain an ER diagram
                  and data dictionary to describe the tables and their relationships.
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
                <span>I can define a table (relation) and its purpose</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the difference between rows (tuples) and columns (attributes)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the key properties of a table (uniqueness, atomicity, etc.)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the terminology: schema, degree, cardinality, domain</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for designing tables</span>
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
            title="Concept of Tables (Relations) – FAQs"
            questions={questions}
            subtitle="Test your understanding with these practice questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
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
              "Tables are the heart of relational databases. I always tell my " +
              "students: 'If you understand tables, you understand 80% of what " +
              "you need to know about data modelling.' The key is to think in " +
              "terms of entities and their attributes. A good table design " +
              "reflects the real world — each table represents a noun (Student, " +
              "Course, Teacher) and each column represents an adjective or " +
              "property of that noun. And remember: the rules (like atomicity) " +
              "aren't arbitrary — they exist to ensure data quality. Practice " +
              "by drawing a table for a real-world scenario you encounter daily, " +
              "like a library system or a gym membership database. This will " +
              "make the concepts concrete."
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
            Topic 15 · Concept of Tables (Relations) · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic15;