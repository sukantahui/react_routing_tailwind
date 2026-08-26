import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic23_files/topic23_note.txt?raw";
import questions from "./topic23_files/topic23_questions";

/**
 * Topic23 – Introduction to SQL
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Introduce Structured Query Language (SQL) — the standard
 *          language for managing relational databases. Covers its
 *          history, purpose, key features, and why it's essential.
 *          Builds on all previous topics about relational databases.
 */
const Topic23 = () => {
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

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .feature-card:hover {
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
            Module 1 · Topic 23
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Introduction
            </span>
            <br className="sm:hidden" />
            to SQL
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The universal language of relational databases — how to talk to
            your data.
          </p>
        </div>

        {/* ─── SVG: SQL Overview ────────────────────────────── */}
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
              viewBox="0 0 600 190"
              className="w-full h-auto"
              role="img"
              aria-label="SQL overview: what it is and what it does"
            >
              <rect width="600" height="190" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                📝 SQL — The Language of Databases
              </text>

              {/* Central SQL icon */}
              <rect x="220" y="40" width="160" height="100" rx="12" fill="#3b82f6" opacity="0.1" className="dark:fill-blue-400 dark:opacity-15 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="2" />
              <text x="300" y="75" textAnchor="middle" fontSize="22" fontWeight="800" fill="#1e293b" className="dark:fill-slate-200">SQL</text>
              <text x="300" y="100" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Structured</text>
              <text x="300" y="115" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Query Language</text>

              {/* Feature labels */}
              <text x="80" y="65" textAnchor="middle" fontSize="11" fill="#10b981" className="dark:fill-emerald-400">📊 DDL</text>
              <text x="80" y="80" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Define</text>

              <text x="80" y="115" textAnchor="middle" fontSize="11" fill="#8b5cf6" className="dark:fill-purple-400">📝 DML</text>
              <text x="80" y="130" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Manipulate</text>

              <text x="520" y="65" textAnchor="middle" fontSize="11" fill="#f59e0b" className="dark:fill-amber-400">🔒 DCL</text>
              <text x="520" y="80" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Control</text>

              <text x="520" y="115" textAnchor="middle" fontSize="11" fill="#ef4444" className="dark:fill-red-400">📋 DQL</text>
              <text x="520" y="130" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Query</text>

              {/* Arrows */}
              <line x1="160" y1="75" x2="220" y2="75" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="160" y1="120" x2="220" y2="100" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="440" y1="75" x2="380" y2="75" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="440" y1="120" x2="380" y2="100" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
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
              What is SQL?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-blue-600 dark:text-blue-400">SQL</strong>{" "}
              (Structured Query Language) is the standard language for
              managing and manipulating relational databases. It allows you to
              create, read, update, and delete data, as well as define and
              control the database structure.
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
                  Key Characteristics:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li><strong>Declarative</strong> — specify what you want, not how to get it</li>
                  <li><strong>Standardised</strong> — works across many RDBMS (with some variations)</li>
                  <li><strong>Set-based</strong> — operates on sets of rows</li>
                  <li><strong>Powerful</strong> — complex queries with minimal code</li>
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
                  Think of SQL like a <strong>search engine</strong> for your
                  database. You type a question (query) and the database engine
                  finds the answer. You don't need to know how it searches;
                  you just describe what you want.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Brief History ────────────────────────────────── */}
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
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">📜</span>
              A Brief History of SQL
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-3",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-3",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">1970s</h4>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>IBM develops SEQUEL (later SQL)</li>
                  <li>Based on Codd's relational model</li>
                  <li>Initial implementation at IBM</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-3",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">1980s</h4>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>SQL becomes ANSI standard (1986)</li>
                  <li>Commercial RDBMS emerge</li>
                  <li>Oracle, Sybase, SQL Server</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-3",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">1990s–Present</h4>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>SQL becomes universal</li>
                  <li>MySQL, PostgreSQL open source</li>
                  <li>Extensions: JSON, GIS, etc.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SQL Categories ────────────────────────────────── */}
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
              <span className="text-2xl">📂</span>
              SQL Language Categories
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "📊",
                  title: "DDL",
                  full: "Data Definition Language",
                  desc: "Define and modify database schema",
                  examples: "CREATE, ALTER, DROP, TRUNCATE",
                  color: "blue",
                },
                {
                  icon: "📝",
                  title: "DML",
                  full: "Data Manipulation Language",
                  desc: "Manage data within tables",
                  examples: "INSERT, UPDATE, DELETE, MERGE",
                  color: "emerald",
                },
                {
                  icon: "🔍",
                  title: "DQL",
                  full: "Data Query Language",
                  desc: "Retrieve data from the database",
                  examples: "SELECT (with clauses)",
                  color: "purple",
                },
                {
                  icon: "🔒",
                  title: "DCL",
                  full: "Data Control Language",
                  desc: "Control access and permissions",
                  examples: "GRANT, REVOKE",
                  color: "amber",
                },
                {
                  icon: "📋",
                  title: "TCL",
                  full: "Transaction Control Language",
                  desc: "Manage transactions",
                  examples: "COMMIT, ROLLBACK, SAVEPOINT",
                  color: "red",
                },
              ].map((cat, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  red: "text-red-700 dark:text-red-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "feature-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[cat.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 400}ms` }}
                  >
                    <div className="text-2xl">{cat.icon}</div>
                    <h3
                      className={clsx(
                        "mt-1 font-bold",
                        textColorMap[cat.color]
                      )}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {cat.full}
                    </p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {cat.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {cat.examples}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Why SQL? ───────────────────────────────────────── */}
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
              <span className="text-2xl">❓</span>
              Why Learn SQL?
            </h2>
            <ul
              className={clsx(
                "space-y-2 text-sm leading-relaxed",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Universal:</strong> SQL is used by almost every
                  relational database — MySQL, PostgreSQL, Oracle, SQL Server,
                  and more.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Essential Skill:</strong> Required for data analysts,
                  developers, data engineers, and many other roles.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Powerful:</strong> Complex data retrieval, analysis,
                  and reporting with minimal code.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Declarative:</strong> You describe what you want, not
                  how to get it — the database optimizes execution.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Foundation:</strong> Understanding SQL helps you
                  understand data modelling and database design.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── SQL Example ───────────────────────────────────── */}
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
              <span className="text-2xl">💻</span>
              SQL in Action: A Simple Example
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
                Suppose we have a <code>Students</code> table:
              </p>
              <pre
                className={clsx(
                  "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                  "dark:bg-slate-900 dark:text-slate-300"
                )}
              >
                {`StudentID | Name      | Class | City
----------|-----------|-------|------------
101       | Swadeep   | 10    | Barrackpore
102       | Tuhina    | 12    | Shyamnagar
103       | Abhronila | 11    | Ichapur
104       | Debangshu | 12    | Naihati
105       | Susmita   | 10    | Barrackpore`}
              </pre>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                A simple SQL query to find all students in Class 10:
              </p>
              <pre
                className={clsx(
                  "mt-1 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                  "dark:bg-slate-900 dark:text-slate-300"
                )}
              >
                {`SELECT Name, City
FROM Students
WHERE Class = 10;
-- Result:
-- Swadeep  | Barrackpore
-- Susmita  | Barrackpore`}
              </pre>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                ✅ SQL is intuitive and readable — it reads like English.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "700ms" }}
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
              Real-World Example: SQL in Action
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
                <strong>Abhronila</strong>, a business analyst at a retail
                company in <strong>Barrackpore</strong>, uses SQL daily:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Sales dashboard:</strong> <code>SELECT SUM(amount)
                    FROM sales WHERE date &gt;= '2024-01-01'</code> — total
                    sales this year.
                  </li>
                  <li>
                    <strong>Top customers:</strong> <code>SELECT customer_id,
                    SUM(amount) FROM sales GROUP BY customer_id ORDER BY SUM(amount)
                    DESC LIMIT 10</code> — finds the top 10 customers.
                  </li>
                  <li>
                    <strong>Inventory alerts:</strong> <code>SELECT product_id,
                    stock_level FROM products WHERE stock_level &lt; reorder_point</code>{" "}
                    — identifies low-stock products.
                  </li>
                  <li>
                    <strong>Monthly reports:</strong> <code>SELECT DATE_TRUNC('month',
                    sale_date) AS month, COUNT(order_id) FROM orders GROUP BY
                    month</code> — monthly order count.
                  </li>
                </ul>
                <strong>Why SQL?</strong> It's fast, efficient, and enables
                real-time decision-making. Without SQL, this analysis would take
                hours or require custom code.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "800ms" }}
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
                  <strong>Write readable SQL:</strong> Use uppercase for keywords,
                  lower_case for table/column names, and indent clauses for clarity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Start with SELECT *:</strong> When exploring a new
                  table, use SELECT * to see all columns. Then refine your query.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use comments:</strong> Document complex queries with
                  comments (<code>--</code> in SQL). It helps others (and your
                  future self).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Practice with real data:</strong> Use sample databases
                  (like Sakila, Northwind) to practice SQL in a realistic context.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "900ms" }}
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
                  <strong>Forgetting quotes:</strong> String literals must be in
                  single quotes (<code>'value'</code>). Double quotes are for
                  identifiers in some databases.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using = with NULL:</strong> <code>WHERE column = NULL</code>{" "}
                  is wrong. Use <code>IS NULL</code> or <code>IS NOT NULL</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Missing GROUP BY columns:</strong> If you use an
                  aggregate function (COUNT, SUM), all non-aggregated columns
                  must be in GROUP BY.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using indexes:</strong> Without proper indexes,
                  queries on large tables can be extremely slow.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
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
                  <strong>Use uppercase for SQL keywords:</strong> <code>SELECT</code>,
                  <code>FROM</code>, <code>WHERE</code> — helps readability.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Alias tables and columns:</strong> Use meaningful
                  aliases (<code>AS</code>) for clarity, especially in complex
                  queries.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Test queries on a sample:</strong> Before running a
                  heavy query on production, test it on a subset of data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use parameterized queries:</strong> To prevent SQL
                  injection, always use parameterized queries or prepared
                  statements in your applications.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
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
                <span>I can define SQL and its purpose</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the five SQL language categories (DDL, DML, DQL, DCL, TCL)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the history of SQL</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can write a simple SELECT query</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand why SQL is important for data professionals</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can avoid common SQL pitfalls</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
        >
          <FAQTemplate
            title="Introduction to SQL – FAQs"
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
            title="Introduction to SQL"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic23_note.txt"
          />
        </section>

        {/* ─── Teacher's Note ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1300ms" }}
        >
          <Teacher
            note={
              "SQL is the single most important skill for working with data. " +
              "I've seen developers who know many programming languages but can't " +
              "write a basic SQL query — and they struggle. SQL is declarative, " +
              "which is a different mindset from procedural programming. You tell " +
              "the database 'what' you want, and it figures out 'how' to get it. " +
              "My advice: practice SQL every day. Use online platforms, build " +
              "projects, and challenge yourself with complex queries. The more " +
              "you practice, the more natural it becomes. And remember: SQL is not " +
              "just for DBAs — it's for everyone who works with data."
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
            Topic 23 · Introduction to SQL · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic23;