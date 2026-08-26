import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions";

/**
 * Topic18 – Primary Key Concept
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain the primary key concept — the fundamental mechanism
 *          for uniquely identifying rows in a table. Covers properties,
 *          types, rules, and best practices. Builds on Topics 15-17
 *          (Tables, Rows, Columns, Domains).
 */
const Topic18 = () => {
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

        .key-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .key-card:hover {
          box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.05);
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
            Module 1 · Topic 18
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Primary Key
            </span>
            <br className="sm:hidden" />
            Concept
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The unique identifier — the cornerstone of relational database
            design.
          </p>
        </div>

        {/* ─── SVG: Primary Key Visualisation ──────────────── */}
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
              viewBox="0 0 600 200"
              className="w-full h-auto"
              role="img"
              aria-label="Primary key illustration in a table"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🔑 Primary Key Uniquely Identifies Each Row
              </text>

              {/* Table with highlighted primary key */}
              <rect x="40" y="35" width="520" height="145" rx="6" fill="none" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />

              {/* Header */}
              <rect x="40" y="35" width="520" height="25" rx="6" fill="#3b82f6" opacity="0.12" className="dark:fill-blue-400 dark:opacity-20" />
              <rect x="50" y="38" width="80" height="19" rx="3" fill="#3b82f6" opacity="0.3" className="dark:fill-blue-400 dark:opacity-40" />
              <text x="90" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🔑 StudentID</text>
              <text x="200" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Name</text>
              <text x="310" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Class</text>
              <text x="420" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">City</text>

              {/* Data rows with key highlighting */}
              <rect x="50" y="62" width="80" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="75" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">101</text>
              <text x="200" y="75" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Swadeep</text>
              <text x="310" y="75" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">10</text>
              <text x="420" y="75" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Barrackpore</text>

              <rect x="50" y="83" width="80" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">102</text>
              <text x="200" y="96" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Tuhina</text>
              <text x="310" y="96" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">12</text>
              <text x="420" y="96" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Shyamnagar</text>

              <rect x="50" y="104" width="80" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="117" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">103</text>
              <text x="200" y="117" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Abhronila</text>
              <text x="310" y="117" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">11</text>
              <text x="420" y="117" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Ichapur</text>

              <rect x="50" y="125" width="80" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="138" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">104</text>
              <text x="200" y="138" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Debangshu</text>
              <text x="310" y="138" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">12</text>
              <text x="420" y="138" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Naihati</text>

              <rect x="50" y="146" width="80" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="159" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">105</text>
              <text x="200" y="159" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Susmita</text>
              <text x="310" y="159" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">10</text>
              <text x="420" y="159" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Barrackpore</text>

              {/* Key icon on left */}
              <text x="35" y="52" textAnchor="end" fontSize="12">🔑</text>
              <text x="35" y="75" textAnchor="end" fontSize="12">🔑</text>
              <text x="35" y="96" textAnchor="end" fontSize="12">🔑</text>
              <text x="35" y="117" textAnchor="end" fontSize="12">🔑</text>
              <text x="35" y="138" textAnchor="end" fontSize="12">🔑</text>
              <text x="35" y="159" textAnchor="end" fontSize="12">🔑</text>
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
              What is a Primary Key?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">primary key</strong>{" "}
              is a column (or a set of columns) in a table that uniquely
              identifies each row in that table. It is the fundamental mechanism
              for enforcing <strong>entity integrity</strong> in a relational
              database.
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
                  Key Properties:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li><strong>Unique</strong> — No two rows have the same value</li>
                  <li><strong>Not NULL</strong> — Every row must have a value</li>
                  <li><strong>Immutable</strong> — Should not change over time</li>
                  <li><strong>Single per table</strong> — Only one primary key per table</li>
                </ul>
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
                  Think of a primary key like a <strong>passport number</strong>{" "}
                  or <strong>Aadhaar ID</strong> — it uniquely identifies a person
                  and never changes. Similarly, a primary key uniquely identifies
                  a row in a database table.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Rules for Primary Key ─────────────────────────── */}
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
              <span className="text-2xl">📋</span>
              Rules and Properties of a Primary Key
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🔒",
                  title: "Uniqueness",
                  desc: "No two rows can have the same primary key value. This ensures each row is distinct.",
                  detail: "Enforced by the database automatically when a PRIMARY KEY constraint is defined.",
                  color: "blue",
                },
                {
                  icon: "🚫",
                  title: "NOT NULL",
                  desc: "The primary key column(s) cannot contain NULL values. Every row must have a value.",
                  detail: "If a column is part of the primary key, it cannot be NULL.",
                  color: "red",
                },
                {
                  icon: "🔁",
                  title: "Immutability",
                  desc: "Primary key values should never change. Once assigned, they should remain constant.",
                  detail: "Changing primary key values can break relationships with foreign keys.",
                  color: "amber",
                },
                {
                  icon: "📏",
                  title: "Single per Table",
                  desc: "Each table can have only one primary key, though it can consist of multiple columns.",
                  detail: "A composite key uses multiple columns but is still a single primary key.",
                  color: "purple",
                },
                {
                  icon: "📊",
                  title: "Minimal",
                  desc: "The primary key should use the fewest columns necessary to ensure uniqueness.",
                  detail: "Avoid using unnecessarily large or multiple columns if a single column suffices.",
                  color: "emerald",
                },
                {
                  icon: "🔗",
                  title: "Stable",
                  desc: "The primary key should be stable over time, not changing with business changes.",
                  detail: "Avoid using business attributes (like Social Security Number) that might change.",
                  color: "indigo",
                },
              ].map((rule, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  red: "text-red-700 dark:text-red-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "key-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[rule.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{rule.icon}</span>
                      <h3
                        className={clsx(
                          "font-bold",
                          textColorMap[rule.color]
                        )}
                      >
                        {rule.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {rule.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {rule.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Types of Primary Keys ─────────────────────────── */}
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
              <span className="text-2xl">🏷️</span>
              Types of Primary Keys
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-3",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🔢 Simple Key
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Single column primary key</li>
                  <li>Example: <code>StudentID INT PRIMARY KEY</code></li>
                  <li>Most common type</li>
                  <li>Simple to implement and query</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  🔗 Composite Key
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Uses multiple columns</li>
                  <li>Example: <code>PRIMARY KEY (StudentID, CourseID)</code></li>
                  <li>Used when a single column is not sufficient</li>
                  <li>Common in junction tables</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  📊 Surrogate Key
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Artificial, system-generated key</li>
                  <li>Example: <code>ID INT AUTO_INCREMENT</code></li>
                  <li>Has no business meaning</li>
                  <li>Ideal for stability and performance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Creating Primary Keys ─────────────────────────── */}
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
              <span className="text-2xl">💻</span>
              Creating Primary Keys in SQL
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  Column-Level Definition
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Students (
  StudentID INT PRIMARY KEY,
  Name VARCHAR(50),
  Class INT
);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Simple and concise
                </p>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  Table-Level Definition
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Enrollments (
  StudentID INT,
  CourseID INT,
  Grade CHAR(1),
  PRIMARY KEY (StudentID, CourseID)
);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Required for composite keys
                </p>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  Surrogate Key with Auto-Increment
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Products (
  ProductID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(100),
  Price DECIMAL(10,2)
);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Auto-generates unique IDs
                </p>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-amber-200/50 p-4",
                  "dark:border-amber-700/50",
                  "bg-amber-50/40 dark:bg-amber-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-amber-700 dark:text-amber-300">
                  Adding Primary Key After Creation
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`ALTER TABLE Students
ADD PRIMARY KEY (StudentID);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ⚠️ Table must have unique, non-null values
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "600ms" }}
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
              Real-World Example: Library Management System
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
                <strong>Swadeep</strong>, the librarian at{" "}
                <strong>Barrackpore</strong> Public Library, uses primary keys
                in his database:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Books Table:</strong> <code>BookID</code> (Primary Key)
                    — Each book has a unique ID, like a library catalogue number.
                  </li>
                  <li>
                    <strong>Members Table:</strong> <code>MemberID</code> (Primary
                    Key) — Each member has a unique membership number.
                  </li>
                  <li>
                    <strong>Loans Table:</strong> <code>LoanID</code> (Primary
                    Key) — Each loan transaction has a unique ID.
                  </li>
                  <li>
                    <strong>Loans Table (Composite):</strong>{" "}
                    <code>PRIMARY KEY (BookID, MemberID)</code> — To ensure a
                    member can't borrow the same book twice at the same time.
                  </li>
                </ul>
                <strong>Why primary keys matter:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Uniqueness:</strong> No two books have the same
                    <code>BookID</code>.
                  </li>
                  <li>
                    <strong>Relationships:</strong> Foreign keys (like
                    <code>BookID</code> in Loans) reference the primary key
                    <code>BookID</code> in Books.
                  </li>
                  <li>
                    <strong>Integrity:</strong> You can't have a loan for a
                    book that doesn't exist.
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
          style={{ animationDelay: "700ms" }}
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
                  <strong>Always define a primary key:</strong> Every table
                  should have a primary key. It's a fundamental rule of good
                  database design.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Prefer surrogate keys:</strong> Use auto-generated
                  numeric IDs (e.g., <code>INT AUTO_INCREMENT</code>) instead
                  of natural keys (like email). They are simple, stable, and
                  efficient.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Keep it simple:</strong> Use a single column primary
                  key whenever possible. Composite keys add complexity to your
                  queries and relationships.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Don't use business data as primary key:</strong> Things
                  like email, phone number, or SSN can change. Use a stable,
                  system-generated key instead.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "800ms" }}
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
                  <strong>Not defining a primary key:</strong> Tables without
                  primary keys can have duplicate rows, making queries ambiguous
                  and relationships impossible.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using NULLable columns as primary key:</strong> A
                  primary key must be <code>NOT NULL</code>. If a column allows
                  <code>NULL</code>, it cannot be part of a primary key.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using large columns as primary key:</strong> Primary
                  keys are referenced by foreign keys. If you use a large column
                  (like <code>VARCHAR(255)</code>), indexes will be large and
                  slow.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Changing primary key values:</strong> Updating a
                  primary key breaks all foreign key relationships. If you must,
                  use <code>ON UPDATE CASCADE</code> but it's better to avoid
                  changing them.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "900ms" }}
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
                  <strong>Define a primary key for every table:</strong> It's a
                  non-negotiable rule of good database design.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use surrogate keys:</strong> System-generated keys
                  (like <code>AUTO_INCREMENT</code>) are the safest option.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Keep it minimal:</strong> Use the smallest data type
                  that can accommodate your expected row count (e.g., <code>INT</code>
                  for most applications).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use foreign keys to reference primary keys:</strong>
                  Always reference the primary key of another table when
                  establishing relationships.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
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
                <span>I can define a primary key and its purpose</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the key properties: unique, NOT NULL, immutable</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can distinguish between simple, composite, and surrogate keys</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can create primary keys using SQL (CREATE TABLE, ALTER TABLE)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for primary key design</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
        >
          <FAQTemplate
            title="Primary Key Concept – FAQs"
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
            title="Primary Key Concept"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic18_note.txt"
          />
        </section>

        {/* ─── Teacher's Note ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
        >
          <Teacher
            note={
              "The primary key is the single most important concept in relational " +
              "database design. I tell my students: 'If you get the primary key " +
              "right, everything else falls into place.' The rules — uniqueness, " +
              "NOT NULL, immutability — are not arbitrary; they ensure data " +
              "integrity. When in doubt, use a surrogate key. It's always the " +
              "safest choice. And remember: a primary key is not just for the " +
              "database — it's for you. It's how you talk about your data. " +
              "When you say 'Student 101', you're using the primary key."
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
            Topic 18 · Primary Key Concept · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic18;