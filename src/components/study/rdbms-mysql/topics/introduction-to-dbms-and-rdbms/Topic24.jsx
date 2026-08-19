import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic24_files/topic24_questions";

/**
 * Topic24 – SQL Categories (DDL, DML, DCL, TCL, DQL)
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain the five categories of SQL statements: Data Definition
 *          Language (DDL), Data Manipulation Language (DML), Data Query
 *          Language (DQL), Data Control Language (DCL), and Transaction
 *          Control Language (TCL). Covers the purpose, commands, and
 *          examples of each. Builds on Topic 23 (Introduction to SQL).
 */
const Topic24 = () => {
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

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .category-card:hover {
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
            Module 1 · Topic 24
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              SQL Categories
            </span>
            <br className="sm:hidden" />
            (DDL, DML, DCL, TCL, DQL)
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Understanding the five families of SQL statements — and when to use
            each one.
          </p>
        </div>

        {/* ─── SVG: SQL Categories ──────────────────────────── */}
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
              aria-label="SQL categories represented as a pie chart"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                📂 SQL Language Categories
              </text>

              {/* DDL */}
              <rect x="40" y="40" width="100" height="70" rx="8" fill="#3b82f6" opacity="0.12" className="dark:fill-blue-400 dark:opacity-15" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-400" />
              <text x="90" y="65" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">DDL</text>
              <text x="90" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Define</text>
              <text x="90" y="100" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">CREATE, ALTER, DROP</text>

              {/* DML */}
              <rect x="160" y="40" width="100" height="70" rx="8" fill="#10b981" opacity="0.12" className="dark:fill-emerald-400 dark:opacity-15" stroke="#10b981" strokeWidth="2" className="dark:stroke-emerald-400" />
              <text x="210" y="65" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">DML</text>
              <text x="210" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Manipulate</text>
              <text x="210" y="100" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">INSERT, UPDATE, DELETE</text>

              {/* DQL */}
              <rect x="280" y="40" width="100" height="70" rx="8" fill="#8b5cf6" opacity="0.12" className="dark:fill-purple-400 dark:opacity-15" stroke="#8b5cf6" strokeWidth="2" className="dark:stroke-purple-400" />
              <text x="330" y="65" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">DQL</text>
              <text x="330" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Query</text>
              <text x="330" y="100" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">SELECT</text>

              {/* DCL */}
              <rect x="400" y="40" width="100" height="70" rx="8" fill="#f59e0b" opacity="0.12" className="dark:fill-amber-400 dark:opacity-15" stroke="#f59e0b" strokeWidth="2" className="dark:stroke-amber-400" />
              <text x="450" y="65" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">DCL</text>
              <text x="450" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Control</text>
              <text x="450" y="100" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">GRANT, REVOKE</text>

              {/* TCL (bottom row) */}
              <rect x="160" y="130" width="280" height="45" rx="8" fill="#ef4444" opacity="0.08" className="dark:fill-red-400 dark:opacity-10" stroke="#ef4444" strokeWidth="2" className="dark:stroke-red-400" />
              <text x="300" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">TCL</text>
              <text x="300" y="168" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Transaction Control: COMMIT, ROLLBACK, SAVEPOINT</text>

              <text x="300" y="195" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Each category serves a different purpose in database management</text>
            </svg>
          </div>
        </div>

        {/* ─── Overview ──────────────────────────────────────── */}
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
              The Five SQL Language Categories
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              SQL is divided into five distinct categories based on the
              operations they perform. Each category has specific commands and
              serves a unique purpose in the database lifecycle.
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
                  Command Types:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li><strong>DDL:</strong> Define database structure</li>
                  <li><strong>DML:</strong> Manipulate data</li>
                  <li><strong>DQL:</strong> Query data</li>
                  <li><strong>DCL:</strong> Control access</li>
                  <li><strong>TCL:</strong> Manage transactions</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-blue-50/60 p-3",
                  "dark:bg-blue-900/20"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Memory Aid:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <strong>D</strong>efine (<strong>DDL</strong>),
                  <strong>M</strong>anipulate (<strong>DML</strong>),
                  <strong>Q</strong>uery (<strong>DQL</strong>),
                  <strong>C</strong>ontrol (<strong>DCL</strong>),
                  <strong>T</strong>ransaction (<strong>TCL</strong>).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Detailed Categories ──────────────────────────── */}
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
              <span className="text-2xl">📂</span>
              Deep Dive into Each Category
            </h2>

            {/* DDL */}
            <div
              className={clsx(
                "mb-6 rounded-xl border-l-4 border-blue-500 pl-4",
                "hover:bg-blue-50/30 dark:hover:bg-blue-900/10",
                "transition-colors duration-300"
              )}
            >
              <h3
                className={clsx(
                  "text-lg font-bold text-blue-600",
                  "dark:text-blue-400"
                )}
              >
                📊 DDL — Data Definition Language
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Used to define, alter, and drop database objects (tables,
                indexes, views, etc.). These commands are <strong>auto-committed</strong>{" "}
                in most databases.
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Commands:</span> CREATE,
                  ALTER, DROP, TRUNCATE, RENAME
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Example:</span>{" "}
                  <code>CREATE TABLE Students (ID INT, Name VARCHAR(50));</code>
                </div>
              </div>
            </div>

            {/* DML */}
            <div
              className={clsx(
                "mb-6 rounded-xl border-l-4 border-emerald-500 pl-4",
                "hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10",
                "transition-colors duration-300"
              )}
            >
              <h3
                className={clsx(
                  "text-lg font-bold text-emerald-600",
                  "dark:text-emerald-400"
                )}
              >
                📝 DML — Data Manipulation Language
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Used to manage data within tables. DML operations can be{" "}
                <strong>rolled back</strong> if used within a transaction.
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Commands:</span> INSERT,
                  UPDATE, DELETE, MERGE
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Example:</span>{" "}
                  <code>INSERT INTO Students (ID, Name) VALUES (1, 'Swadeep');</code>
                </div>
              </div>
            </div>

            {/* DQL */}
            <div
              className={clsx(
                "mb-6 rounded-xl border-l-4 border-purple-500 pl-4",
                "hover:bg-purple-50/30 dark:hover:bg-purple-900/10",
                "transition-colors duration-300"
              )}
            >
              <h3
                className={clsx(
                  "text-lg font-bold text-purple-600",
                  "dark:text-purple-400"
                )}
              >
                🔍 DQL — Data Query Language
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Used to retrieve data from the database. DQL does not modify
                data and is <strong>read-only</strong>.
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Commands:</span> SELECT
                  (with clauses: WHERE, GROUP BY, ORDER BY, HAVING)
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Example:</span>{" "}
                  <code>SELECT * FROM Students WHERE Class = 10;</code>
                </div>
              </div>
            </div>

            {/* DCL */}
            <div
              className={clsx(
                "mb-6 rounded-xl border-l-4 border-amber-500 pl-4",
                "hover:bg-amber-50/30 dark:hover:bg-amber-900/10",
                "transition-colors duration-300"
              )}
            >
              <h3
                className={clsx(
                  "text-lg font-bold text-amber-600",
                  "dark:text-amber-400"
                )}
              >
                🔒 DCL — Data Control Language
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Used to control access to database objects. DCL commands
                manage <strong>permissions</strong> and <strong>security</strong>.
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Commands:</span> GRANT,
                  REVOKE
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Example:</span>{" "}
                  <code>GRANT SELECT ON Students TO user1;</code>
                </div>
              </div>
            </div>

            {/* TCL */}
            <div
              className={clsx(
                "rounded-xl border-l-4 border-red-500 pl-4",
                "hover:bg-red-50/30 dark:hover:bg-red-900/10",
                "transition-colors duration-300"
              )}
            >
              <h3
                className={clsx(
                  "text-lg font-bold text-red-600",
                  "dark:text-red-400"
                )}
              >
                📋 TCL — Transaction Control Language
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Used to manage <strong>transactions</strong> — groups of
                operations that must be executed together. TCL commands ensure
                data consistency.
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Commands:</span> COMMIT,
                  ROLLBACK, SAVEPOINT, SET TRANSACTION
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Example:</span>{" "}
                  <code>BEGIN TRANSACTION; ... COMMIT;</code>
                </div>
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
              SQL Categories Comparison
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
                        "px-3 py-2 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Category
                    </th>
                    <th
                      className={clsx(
                        "px-3 py-2 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Purpose
                    </th>
                    <th
                      className={clsx(
                        "px-3 py-2 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Commands
                    </th>
                    <th
                      className={clsx(
                        "px-3 py-2 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Auto-commit?
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
                    <td className="px-3 py-2 font-medium text-blue-600 dark:text-blue-400">DDL</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Define schema</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">CREATE, ALTER, DROP</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Yes (auto-commit)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium text-emerald-600 dark:text-emerald-400">DML</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Manipulate data</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">INSERT, UPDATE, DELETE</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">No (can rollback)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium text-purple-600 dark:text-purple-400">DQL</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Query data</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">SELECT</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">N/A (read-only)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium text-amber-600 dark:text-amber-400">DCL</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Control access</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">GRANT, REVOKE</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Yes (auto-commit)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium text-red-600 dark:text-red-400">TCL</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Manage transactions</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">COMMIT, ROLLBACK</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">N/A (controls commits)</td>
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
              Real-World Example: Building a Library System
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
                <strong>Debangshu</strong>, a database developer, is building a
                library management system. He uses all five SQL categories:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>DDL:</strong> <code>CREATE TABLE Books (BookID INT
                    PRIMARY KEY, Title VARCHAR(100), Author VARCHAR(50));</code>
                  </li>
                  <li>
                    <strong>DML:</strong> <code>INSERT INTO Books VALUES (1,
                    'Database Systems', 'E.F. Codd');</code>
                  </li>
                  <li>
                    <strong>DQL:</strong> <code>SELECT Title FROM Books WHERE
                    Author = 'E.F. Codd';</code>
                  </li>
                  <li>
                    <strong>DCL:</strong> <code>GRANT SELECT ON Books TO
                    librarian;</code>
                  </li>
                  <li>
                    <strong>TCL:</strong> <code>BEGIN TRANSACTION; UPDATE Books
                    SET Stock = Stock - 1 WHERE BookID = 1; COMMIT;</code>
                  </li>
                </ul>
                <strong>Key Insight:</strong> Each category has a specific role.
                DDL defines the structure, DML populates data, DQL retrieves
                information, DCL controls who can do what, and TCL ensures
                transactions are safe.
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
                  <strong>Remember the acronym:</strong> <strong>D</strong>efine,
                  <strong>M</strong>anipulate, <strong>Q</strong>uery,
                  <strong>C</strong>ontrol, <strong>T</strong>ransact.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use explicit transactions for DML:</strong> Always
                  wrap multiple DML operations in a transaction to ensure
                  atomicity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Test DDL in a development environment:</strong> DDL
                  changes are permanent and can break applications.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>DCL is crucial for security:</strong> Always follow
                  the principle of least privilege when granting permissions.
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
                  <strong>Forgetting that DDL is auto-committed:</strong> You
                  cannot rollback a DDL statement in most databases.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using transactions for DML:</strong> If you don't
                  explicitly use TCL, DML statements may be auto-committed,
                  losing the chance to undo changes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Over-privileging with DCL:</strong> Granting too many
                  permissions (e.g., GRANT ALL) is a security risk.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Confusing DML and DDL:</strong> DML changes data; DDL
                  changes structure. They are not interchangeable.
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
                  <strong>Use DDL scripts with version control:</strong> Always
                  keep DDL in version control to track schema changes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Wrap DML in transactions:</strong> Use TCL to ensure
                  data consistency and enable rollback on errors.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use DCL to enforce security:</strong> Grant only the
                  minimum necessary permissions to users and roles.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Test DQL queries thoroughly:</strong> Ensure your
                  SELECT queries are correct and performant before using them
                  in production.
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
                <span>I can name the five SQL categories and their purpose</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the commands for each category (DDL, DML, DQL, DCL, TCL)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the difference between DDL and DML</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know when to use DCL (GRANT, REVOKE)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the role of TCL in transactions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for each category</span>
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
            title="SQL Categories – FAQs"
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
              "Understanding the SQL categories is like knowing the grammar of " +
              "a language. DDL is the 'nouns' (defining things), DML is the 'verbs' " +
              "(doing things), DQL is the 'questions' (asking), DCL is the 'rules' " +
              "(who can do what), and TCL is the 'checkpoints' (saving or undoing). " +
              "I advise my students to always think about which category a command " +
              "belongs to before using it — it helps prevent mistakes. For example, " +
              "if you're trying to change data, use DML; if you're trying to change " +
              "the table itself, use DDL. This mental model will serve you well."
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
            Topic 24 · SQL Categories (DDL, DML, DCL, TCL, DQL) · Built with ❤️
            for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic24;