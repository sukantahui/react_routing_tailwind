import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic36_files/topic36_note.txt?raw";
import questions from "./topic36_files/topic36_questions";

/**
 * Topic36 – Executing SQL Statements
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Guide students through executing SQL statements using
 *          various methods: command line, MySQL Workbench, phpMyAdmin,
 *          and scripts. Covers the execution process, handling results,
 *          and best practices. Builds on Topics 33-35 (connecting,
 *          creating databases, Workbench interface).
 */
const Topic36 = () => {
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

        .method-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .method-card:hover {
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
            Module 1 · Topic 36
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Executing
            </span>
            <br className="sm:hidden" />
            SQL Statements
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Putting your SQL knowledge into action — executing queries and
            seeing results in real-time.
          </p>
        </div>

        {/* ─── SVG: Execution Flow ──────────────────────────── */}
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
              aria-label="SQL statement execution flow"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                ⚡ SQL Execution Flow
              </text>

              {/* Step 1: Write */}
              <rect x="20" y="40" width="110" height="90" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="75" y="70" textAnchor="middle" fontSize="24">✏️</text>
              <text x="75" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Write</text>
              <text x="75" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Compose Query</text>

              {/* Arrow */}
              <line x1="130" y1="85" x2="170" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="165,80 175,85 165,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Step 2: Execute */}
              <rect x="180" y="40" width="110" height="90" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" />
              <text x="235" y="70" textAnchor="middle" fontSize="24">⚡</text>
              <text x="235" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Execute</text>
              <text x="235" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Run Query</text>

              {/* Arrow */}
              <line x1="290" y1="85" x2="330" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="325,80 335,85 325,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Step 3: Process */}
              <rect x="340" y="40" width="110" height="90" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="395" y="70" textAnchor="middle" fontSize="24">⚙️</text>
              <text x="395" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Process</text>
              <text x="395" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">DB Optimizes</text>

              {/* Arrow */}
              <line x1="450" y1="85" x2="490" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="485,80 495,85 485,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Step 4: Results */}
              <rect x="500" y="40" width="80" height="90" rx="10" fill="#f59e0b" opacity="0.08" className="dark:fill-amber-400 dark:opacity-12 dark:stroke-amber-400" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="540" y="70" textAnchor="middle" fontSize="24">📋</text>
              <text x="540" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Results</text>
              <text x="540" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Output</text>

              {/* Bottom labels */}
              <text x="75" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">1. Write</text>
              <text x="235" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">2. Execute</text>
              <text x="395" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">3. Process</text>
              <text x="540" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">4. Results</text>
            </svg>
          </div>
        </div>

        {/* ─── Introduction ──────────────────────────────────── */}
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
              Executing SQL: Making It Happen
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              Writing SQL is only half the battle — you need to <strong
              className="text-blue-600 dark:text-blue-400">execute</strong> it
              to see results. Whether you're running a simple <code>SELECT</code>,
              inserting data, or creating tables, the execution process is the
              bridge between your query and the database.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-emerald-50/40 p-4",
                "dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Key Insight:</span>{" "}
                Executing SQL is interactive — you write, execute, see results,
                and iterate. This is the core workflow of a database professional.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Methods to Execute SQL ────────────────────────── */}
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
              <span className="text-2xl">🔌</span>
              Ways to Execute SQL Statements
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "💻",
                  title: "Command Line",
                  desc: "Execute queries directly in the MySQL shell.",
                  detail: "mysql> SELECT * FROM users;",
                  color: "blue",
                },
                {
                  icon: "🖥️",
                  title: "MySQL Workbench",
                  desc: "Run queries in the SQL Editor with visual results.",
                  detail: "Click 'Execute' or Ctrl+Enter.",
                  color: "emerald",
                },
                {
                  icon: "🌐",
                  title: "phpMyAdmin",
                  desc: "Web-based execution with a simple interface.",
                  detail: "Use the SQL tab.",
                  color: "purple",
                },
                {
                  icon: "📄",
                  title: "Scripts",
                  desc: "Execute SQL from files or command line.",
                  detail: "mysql -u root -p < script.sql",
                  color: "amber",
                },
              ].map((method, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "method-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[method.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="text-3xl">{method.icon}</div>
                    <h3
                      className={clsx(
                        "mt-1 font-bold",
                        textColorMap[method.color]
                      )}
                    >
                      {method.title}
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {method.desc}
                    </p>
                    <div className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-500">
                      {method.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Executing in Command Line ─────────────────────── */}
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
                "mb-3 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">💻</span>
              Executing SQL in the Command Line
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The <strong>mysql</strong> command-line client is the most direct
              way to execute SQL. Here's how:
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  📝 Interactive Mode
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`mysql -u root -p
Enter password: ********

mysql> USE mydb;
Database changed

mysql> SELECT * FROM users;
+----+---------+
| id | name    |
+----+---------+
| 1  | Swadeep |
| 2  | Tuhina  |
+----+---------+
2 rows in set (0.00 sec)

mysql> EXIT;
Bye`}
                </pre>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  ⚡ Non-Interactive Mode (Scripting)
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Single query
mysql -u root -p -e "SELECT * FROM users;"

# From a file
mysql -u root -p < script.sql

# With output to file
mysql -u root -p < script.sql > output.txt

# Execute with database
mysql -u root -p mydb < script.sql`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Executing in Workbench ────────────────────────── */}
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
              <span className="text-2xl">🖥️</span>
              Executing SQL in MySQL Workbench
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Workbench provides a rich environment for executing SQL with
              visual feedback:
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-3",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  ✏️ Write Your Query
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Open a new query tab (Ctrl+T)</li>
                  <li>Type your SQL statement</li>
                  <li>Use syntax highlighting</li>
                  <li>Auto-complete for tables/columns</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  ⚡ Execute Your Query
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Click the lightning bolt icon</li>
                  <li>Use Ctrl+Enter</li>
                  <li>Execute selected statement</li>
                  <li>Or execute all statements</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  📊 View Results
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Results grid appears below</li>
                  <li>Export results (CSV, JSON)</li>
                  <li>View execution time</li>
                  <li>Check the Output panel for messages</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Understanding Execution Results ───────────────── */}
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
              <span className="text-2xl">📊</span>
              Understanding Execution Results
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "✅",
                  title: "Success Messages",
                  desc: "Indicates the query executed successfully.",
                  detail: 'Example: "Query OK, 1 row affected"',
                  color: "emerald",
                },
                {
                  icon: "📋",
                  title: "Result Sets (SELECT)",
                  desc: "Displays rows returned by a SELECT query.",
                  detail: "Column names, data types, and values.",
                  color: "blue",
                },
                {
                  icon: "📊",
                  title: "Affected Rows",
                  desc: "Number of rows affected by INSERT, UPDATE, DELETE.",
                  detail: 'Example: "Rows matched: 5 Changed: 3"',
                  color: "purple",
                },
                {
                  icon: "⚠️",
                  title: "Errors & Warnings",
                  desc: "Messages indicating issues with the query.",
                  detail: "Check the error code and message.",
                  color: "red",
                },
              ].map((item, idx) => {
                const colorMap = {
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                };
                const textColorMap = {
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  blue: "text-blue-700 dark:text-blue-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  red: "text-red-700 dark:text-red-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]",
                      colorMap[item.color]
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h4
                        className={clsx(
                          "font-bold",
                          textColorMap[item.color]
                        )}
                      >
                        {item.title}
                      </h4>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {item.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Execution Options ────────────────────────────── */}
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
              <span className="text-2xl">⚙️</span>
              Execution Options and Controls
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  title: "Execute Selected Statement",
                  desc: "Run only the highlighted or selected SQL statement.",
                  shortcut: "Ctrl+Enter",
                  color: "blue",
                },
                {
                  title: "Execute All Statements",
                  desc: "Run every statement in the query tab.",
                  shortcut: "Ctrl+Shift+Enter",
                  color: "emerald",
                },
                {
                  title: "Explain Query",
                  desc: "Show the execution plan without running the query.",
                  shortcut: "Ctrl+E (in Workbench)",
                  color: "purple",
                },
                {
                  title: "Limit Results",
                  desc: "Limit the number of rows returned (e.g., LIMIT 1000).",
                  shortcut: "SET SQL_SELECT_LIMIT=1000;",
                  color: "amber",
                },
              ].map((item, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]",
                      colorMap[item.color]
                    )}
                  >
                    <h4
                      className={clsx(
                        "font-bold",
                        textColorMap[item.color]
                      )}
                    >
                      {item.title}
                    </h4>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                    <div className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-500">
                      {item.shortcut}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Script Execution ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "800ms" }}
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
              <span className="text-2xl">📄</span>
              Executing SQL from Scripts
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Scripts allow you to execute multiple SQL statements in batch mode
              — perfect for migrations, backups, and automated tasks.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  📝 Example Script (script.sql)
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`-- Create database
CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

-- Create table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name) VALUES
  ('Swadeep'), ('Tuhina'), ('Abhronila');

-- Show data
SELECT * FROM users;`}
                </pre>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  ⚡ Executing the Script
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Execute from command line
mysql -u root -p < script.sql

# Execute with verbose output
mysql -u root -p --verbose < script.sql

# Execute from Workbench
# File → Run SQL Script...
# Select file and execute

# Execute with source command
mysql> source /path/to/script.sql`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
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
              <span className="text-2xl">🌍</span>
              Real-World Example: Building a Product Catalog
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
                <strong>Abhronila</strong>, a developer in <strong>Ichapur</strong>,
                is building a product catalog:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Step 1:</strong> Writes a <code>CREATE TABLE</code>{" "}
                    statement in Workbench:
                    <pre
                      className={clsx(
                        "mt-1 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                        "dark:bg-slate-900 dark:text-slate-300"
                      )}
                    >
                      {`CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2)
);`}
                    </pre>
                  </li>
                  <li>
                    <strong>Step 2:</strong> Executes with <kbd>Ctrl+Enter</kbd>{" "}
                    — sees "Query OK, 0 rows affected".
                  </li>
                  <li>
                    <strong>Step 3:</strong> Runs <code>INSERT</code> statements
                    to add products.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Queries with <code>SELECT</code> to
                    verify the data.
                  </li>
                  <li>
                    <strong>Step 5:</strong> Saves the script for future use.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Execution is an iterative process
                — write, execute, verify, refine.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
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
                  <strong>Always start with SELECT:</strong> Before running
                  <code>UPDATE</code> or <code>DELETE</code>, run a{" "}
                  <code>SELECT</code> with the same <code>WHERE</code> clause to
                  see which rows will be affected.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use transactions for DML:</strong> Wrap multiple
                  changes in a transaction so you can rollback if something
                  goes wrong.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Check the execution time:</strong> The time displayed
                  after execution helps identify slow queries.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use `LIMIT` during development:</strong> Add{" "}
                  <code>LIMIT 10</code> to <code>SELECT</code> queries to avoid
                  overwhelming the output.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
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
                  <strong>Forgetting to select a database:</strong> You must use
                  <code>USE database_name;</code> or specify the database in the
                  connection.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Missing semicolons:</strong> SQL statements need a
                  semicolon (<code>;</code>) to terminate in the command line.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Executing destructive queries without WHERE:</strong>{" "}
                  <code>UPDATE table SET col='value';</code> updates all rows.
                  Always use <code>WHERE</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring error messages:</strong> Error messages tell
                  you what went wrong. Read them carefully.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
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
                  <strong>Use transactions for multi-step changes:</strong>{" "}
                  <code>START TRANSACTION; ... COMMIT;</code> or{" "}
                  <code>ROLLBACK;</code> to maintain data consistency.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Test in development first:</strong> Never run
                  destructive queries directly on production without testing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Keep query history:</strong> Save your queries so you
                  can re-run them or use them as a reference.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use comments:</strong> Document complex queries with
                  comments to help others (and your future self).
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1300ms" }}
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
                <span>I can execute SQL from the command line</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can execute SQL in MySQL Workbench</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the different execution options (selected, all, explain)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can read and interpret execution results</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can execute SQL scripts from files</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can avoid common pitfalls when executing SQL</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1400ms" }}
        >
          <FAQTemplate
            title="Executing SQL Statements – FAQs"
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
            title="Executing SQL Statements"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic36_note.txt"
          />
        </section>

        {/* ─── Teacher's Note ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1500ms" }}
        >
          <Teacher
            note={
              "Executing SQL is where the magic happens. I tell my students: " +
              "'Writing SQL is like composing music — execution is the performance.' " +
              "The most important habit is to always check what you're about to " +
              "execute. Run a SELECT first, use transactions for updates, and " +
              "never execute destructive queries without a WHERE clause. Also, " +
              "practice reading error messages — they tell you exactly what's " +
              "wrong. Finally, get comfortable with both the command line and " +
              "Workbench. Each has its strengths, and you'll need both in your " +
              "career."
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
            Topic 36 · Executing SQL Statements · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic36;