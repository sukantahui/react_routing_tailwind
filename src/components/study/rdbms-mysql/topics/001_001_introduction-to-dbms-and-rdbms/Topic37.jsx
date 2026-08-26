import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic37_files/topic37_note.txt?raw";
import questions from "./topic37_files/topic37_questions";

/**
 * Topic37 – Saving SQL Scripts
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain how to save SQL scripts effectively, including
 *          file naming, version control, best practices, and tools
 *          for managing scripts. Builds on Topics 35-36 (Workbench,
 *          executing SQL).
 */
const Topic37 = () => {
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

        .tip-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .tip-card:hover {
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
            Module 1 · Topic 37
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Saving
            </span>
            <br className="sm:hidden" />
            SQL Scripts
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Preserving your work — best practices for saving, organising,
            and versioning SQL scripts.
          </p>
        </div>

        {/* ─── SVG: Script Workflow ──────────────────────────── */}
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
              aria-label="SQL script workflow"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                📄 SQL Script Lifecycle
              </text>

              {/* Write */}
              <rect x="20" y="40" width="110" height="90" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="75" y="70" textAnchor="middle" fontSize="24">✏️</text>
              <text x="75" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Write</text>
              <text x="75" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Create Query</text>

              {/* Arrow */}
              <line x1="130" y1="85" x2="170" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="165,80 175,85 165,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Save */}
              <rect x="180" y="40" width="110" height="90" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" />
              <text x="235" y="70" textAnchor="middle" fontSize="24">💾</text>
              <text x="235" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Save</text>
              <text x="235" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">.sql file</text>

              {/* Arrow */}
              <line x1="290" y1="85" x2="330" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="325,80 335,85 325,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Version Control */}
              <rect x="340" y="40" width="110" height="90" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="395" y="70" textAnchor="middle" fontSize="24">🔁</text>
              <text x="395" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Version</text>
              <text x="395" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Git / SVN</text>

              {/* Arrow */}
              <line x1="450" y1="85" x2="490" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="485,80 495,85 485,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Reuse */}
              <rect x="500" y="40" width="80" height="90" rx="10" fill="#f59e0b" opacity="0.08" className="dark:fill-amber-400 dark:opacity-12 dark:stroke-amber-400" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="540" y="70" textAnchor="middle" fontSize="24">🔄</text>
              <text x="540" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Reuse</text>
              <text x="540" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Scripts</text>

              {/* Bottom labels */}
              <text x="75" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">1. Write</text>
              <text x="235" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">2. Save</text>
              <text x="395" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">3. Version</text>
              <text x="540" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">4. Reuse</text>
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
              Why Save SQL Scripts?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              Saving your SQL scripts is essential for <strong
              className="text-blue-600 dark:text-blue-400">reusability</strong>,
              <strong className="text-blue-600 dark:text-blue-400"> collaboration</strong>,
              and <strong className="text-blue-600 dark:text-blue-400">version
              control</strong>. Instead of rewriting queries every time, saved
              scripts allow you to build a library of reusable SQL code,
              automate tasks, and maintain a history of changes.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-amber-50/40 p-4",
                "dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-amber-600 dark:text-amber-400">Key Insight:</span>{" "}
                "Code that isn't saved is code that will be rewritten. Saving
                scripts is a professional habit that saves hours of work."
              </p>
            </div>
          </div>
        </section>

        {/* ─── How to Save Scripts ───────────────────────────── */}
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
              <span className="text-2xl">💾</span>
              How to Save SQL Scripts
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🖥️",
                  title: "MySQL Workbench",
                  desc: "Save your query tab as a `.sql` file using File → Save or Ctrl+S.",
                  detail: "You can also export the entire script as a file.",
                  color: "blue",
                },
                {
                  icon: "💻",
                  title: "Command Line",
                  desc: "Use output redirection: `mysql -u root -p -e \"SELECT * FROM users;\" &gt; query.sql`.",
                  detail: "Great for capturing query output.",
                  color: "emerald",
                },
                {
                  icon: "📄",
                  title: "Text Editors",
                  desc: "Write SQL in VS Code, Sublime Text, or Notepad++ and save as `.sql`.",
                  detail: "Syntax highlighting available with plugins.",
                  color: "purple",
                },
                {
                  icon: "🌐",
                  title: "phpMyAdmin",
                  desc: "Use the 'Export' feature to save the database structure and data as a SQL file.",
                  detail: "Also the SQL tab has an 'Export' button.",
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
                      "tip-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[method.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{method.icon}</span>
                      <h3
                        className={clsx(
                          "font-bold",
                          textColorMap[method.color]
                        )}
                      >
                        {method.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {method.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {method.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── File Naming Conventions ───────────────────────── */}
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
              <span className="text-2xl">📛</span>
              File Naming Conventions
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Consistent naming helps you find and organise scripts. Here are
              some conventions:
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  title: "Use .sql Extension",
                  example: "script.sql",
                  desc: "Always use `.sql` for SQL files.",
                  color: "blue",
                },
                {
                  title: "Descriptive Names",
                  example: "create_users_table.sql",
                  desc: "Describe what the script does.",
                  color: "emerald",
                },
                {
                  title: "Include Date/Version",
                  example: "2024-01-15_migration.sql",
                  desc: "Use YYYY-MM-DD for sorting.",
                  color: "purple",
                },
                {
                  title: "Group by Function",
                  example: "ddl/create_users.sql",
                  desc: "Organise scripts in folders: ddl/, dml/, procs/.",
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
                    <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-500">
                      {item.example}
                    </p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Version Control ───────────────────────────────── */}
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
              <span className="text-2xl">🔁</span>
              Version Control for SQL Scripts
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              SQL scripts should be treated like application code — stored in
              <strong> version control</strong> (Git, SVN). This provides:
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "📜",
                  title: "History",
                  desc: "Track who made what changes and when.",
                  color: "blue",
                },
                {
                  icon: "🔀",
                  title: "Collaboration",
                  desc: "Multiple team members can work on scripts simultaneously.",
                  color: "emerald",
                },
                {
                  icon: "🔄",
                  title: "Rollback",
                  desc: "Revert to a previous version if something breaks.",
                  color: "purple",
                },
                {
                  icon: "📋",
                  title: "Code Reviews",
                  desc: "Review SQL changes before they are deployed.",
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Organising Scripts ────────────────────────────── */}
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
              <span className="text-2xl">📂</span>
              Organising Your SQL Scripts
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              A well-organised folder structure makes it easy to find and manage
              scripts:
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
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  📁 Project Structure
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`my_project/
├── ddl/
│   ├── create_tables.sql
│   ├── alter_tables.sql
│   └── drop_tables.sql
├── dml/
│   ├── insert_data.sql
│   ├── update_data.sql
│   └── delete_data.sql
├── procs/
│   ├── stored_procedures.sql
│   └── triggers.sql
├── queries/
│   ├── reports/
│   │   └── sales_report.sql
│   └── analytics/
│       └── user_stats.sql
└── migrations/
    ├── v1.0.0_base.sql
    ├── v1.0.1_add_column.sql
    └── v1.1.0_new_table.sql`}
                </pre>
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
                  🏷️ Naming Categories
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>
                    <strong>ddl/</strong> — Data Definition Language (CREATE,
                    ALTER, DROP)
                  </li>
                  <li>
                    <strong>dml/</strong> — Data Manipulation Language (INSERT,
                    UPDATE, DELETE)
                  </li>
                  <li>
                    <strong>procs/</strong> — Stored Procedures, Functions,
                    Triggers
                  </li>
                  <li>
                    <strong>queries/</strong> — SELECT statements for reporting
                  </li>
                  <li>
                    <strong>migrations/</strong> — Versioned schema changes
                  </li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  Always include a README.md explaining the structure.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Including Metadata ───────────────────────────── */}
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
              <span className="text-2xl">🏷️</span>
              Including Metadata in Scripts
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Adding metadata comments at the top of each script helps document
              its purpose, author, and usage:
            </p>
            <pre
              className={clsx(
                "mt-4 overflow-x-auto rounded-lg bg-slate-800 p-4 text-xs text-slate-200",
                "dark:bg-slate-900 dark:text-slate-300",
                "font-mono leading-relaxed"
              )}
            >
              {`/*
 * Filename: create_users_table.sql
 * Author: Swadeep
 * Date: 2024-01-15
 * Purpose: Create the users table for the application.
 * Dependencies: None
 * Usage: mysql -u root -p < create_users_table.sql
 * Note: Run before inserting data.
 */

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`}
            </pre>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
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
              <span className="text-2xl">🌍</span>
              Real-World Example: Managing Scripts for a Project
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
                <strong>Tuhina</strong>, a database developer in{" "}
                <strong>Shyamnagar</strong>, manages scripts for an e-commerce
                project:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Repository:</strong> All scripts are in a Git
                    repository with a <code>database/</code> folder.
                  </li>
                  <li>
                    <strong>DDL:</strong> <code>database/ddl/</code> contains
                    <code>create_products.sql</code>,{" "}
                    <code>create_orders.sql</code>, etc.
                  </li>
                  <li>
                    <strong>Migrations:</strong> <code>database/migrations/</code>{" "}
                    has files like <code>2024-01-15_add_status_column.sql</code>.
                  </li>
                  <li>
                    <strong>Queries:</strong> <code>database/queries/</code>{" "}
                    stores commonly used SELECT statements for reporting.
                  </li>
                  <li>
                    <strong>Documentation:</strong> Each script has a header
                    comment with author, date, and purpose.
                  </li>
                  <li>
                    <strong>Process:</strong> When she makes a change, she
                    commits and pushes to Git, and her team reviews the changes.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Organised scripts save time,
                reduce errors, and make collaboration smooth.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "900ms" }}
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
                  <strong>Use a consistent template:</strong> Create a standard
                  header for all scripts with fields like Author, Date, Purpose,
                  and Dependencies.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use environment variables:</strong> For scripts that
                  connect to databases, use environment variables for credentials
                  instead of hardcoding.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Keep scripts idempotent:</strong> Use{" "}
                  <code>IF NOT EXISTS</code> and similar clauses so scripts can
                  be run multiple times safely.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Tag releases:</strong> Use Git tags to mark database
                  schema versions.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
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
                  <strong>Not saving scripts:</strong> Losing work and having to
                  rewrite queries is a waste of time. Always save!
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using vague names:</strong> <code>query1.sql</code>,
                  <code>final.sql</code>, <code>final_v2.sql</code> — these are
                  unhelpful. Use descriptive names.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring version control:</strong> Without version
                  control, you can't track changes or collaborate effectively.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>No documentation:</strong> Scripts without comments or
                  headers become unmaintainable.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
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
                  <strong>Save early, save often:</strong> Get into the habit of
                  saving your scripts as soon as you write them.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use meaningful names:</strong> Follow a naming
                  convention that includes purpose, date, and version.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Store in version control:</strong> Always use Git for
                  your SQL scripts.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document your scripts:</strong> Include a header
                  comment with metadata and inline comments for complex logic.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
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
                <span>I can save SQL scripts from Workbench, command line, and editors</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand file naming conventions for SQL scripts</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can organise scripts in a logical folder structure</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know how to add metadata headers to scripts</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the importance of version control for scripts</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for managing SQL scripts</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1300ms" }}
        >
          <FAQTemplate
            title="Saving SQL Scripts – FAQs"
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
            title="Saving SQL Scripts"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic37_note.txt"
          />
        </section>

        {/* ─── Teacher's Note ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1400ms" }}
        >
          <Teacher
            note={
              "Saving scripts is a habit that separates amateurs from professionals. " +
              "I tell my students: 'Don't just write SQL — preserve it.' Your future " +
              "self will thank you when you need to revisit a query or debug a " +
              "production issue. Use descriptive names, organise by function, and " +
              "always use version control. Also, add headers with metadata — " +
              "including the author, date, and purpose. This makes your scripts " +
              "self-documenting and maintainable. Remember: code that isn't saved " +
              "is code that will be rewritten."
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
            Topic 37 · Saving SQL Scripts · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic37;