import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic35_files/topic35_questions";

/**
 * Topic35 – Exploring MySQL Workbench Interface
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Provide a comprehensive tour of the MySQL Workbench interface,
 *          covering its main components: Home screen, Navigator, SQL
 *          Editor, Administration, and Modeling tools.
 *          Builds on Topics 30-34 (Installation, Connection, Creation).
 */
const Topic35 = () => {
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

        .area-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .area-card:hover {
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
            Module 1 · Topic 35
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Exploring MySQL
            </span>
            <br className="sm:hidden" />
            Workbench Interface
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            A comprehensive tour of the official MySQL GUI tool — from SQL
            development to database design.
          </p>
        </div>

        {/* ─── SVG: Interface Overview ──────────────────────── */}
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
              aria-label="MySQL Workbench interface layout"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🖥️ MySQL Workbench Interface
              </text>

              {/* Home Screen */}
              <rect x="20" y="40" width="170" height="130" rx="8" fill="#3b82f6" opacity="0.06" className="dark:fill-blue-400 dark:opacity-10 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="105" y="65" textAnchor="middle" fontSize="20">🏠</text>
              <text x="105" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Home Screen</text>
              <text x="105" y="100" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Connections</text>
              <text x="105" y="112" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Recent Projects</text>
              <text x="105" y="124" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Models</text>
              <text x="105" y="136" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Quick Actions</text>

              {/* Navigator */}
              <rect x="215" y="40" width="170" height="130" rx="8" fill="#10b981" opacity="0.06" className="dark:fill-emerald-400 dark:opacity-10 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" />
              <text x="300" y="65" textAnchor="middle" fontSize="20">🧭</text>
              <text x="300" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Navigator</text>
              <text x="300" y="100" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Databases</text>
              <text x="300" y="112" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Tables</text>
              <text x="300" y="124" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Views</text>
              <text x="300" y="136" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Stored Procedures</text>

              {/* Query Editor */}
              <rect x="410" y="40" width="170" height="130" rx="8" fill="#8b5cf6" opacity="0.06" className="dark:fill-purple-400 dark:opacity-10 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="495" y="65" textAnchor="middle" fontSize="20">✏️</text>
              <text x="495" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">SQL Editor</text>
              <text x="495" y="100" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Query Window</text>
              <text x="495" y="112" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Results Grid</text>
              <text x="495" y="124" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Execution Plan</text>
              <text x="495" y="136" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Query Builder</text>

              {/* Labels */}
              <text x="105" y="178" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Home</text>
              <text x="300" y="178" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Navigator</text>
              <text x="495" y="178" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">SQL Development</text>
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
              Getting to Know MySQL Workbench
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-blue-600 dark:text-blue-400">MySQL Workbench</strong>{" "}
              is the official integrated environment for MySQL. It combines
              <strong> SQL development</strong>, <strong>data modeling</strong>,
              and <strong>server administration</strong> into one powerful
              application. Understanding its interface is the key to becoming
              a productive database professional.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                Workbench is divided into functional areas. Mastering each area
                — Home, Navigator, Query Editor, and Administration — will
                dramatically improve your workflow.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Interface Areas ───────────────────────────────── */}
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
              <span className="text-2xl">🏗️</span>
              Main Interface Areas
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🏠",
                  title: "Home Screen",
                  desc: "The starting point. Manage connections, open models, and access quick tutorials.",
                  detail: "View recent projects and MySQL news.",
                  color: "blue",
                },
                {
                  icon: "🧭",
                  title: "Navigator",
                  desc: "Browse and manage database objects. Shows schemas, tables, views, and stored procedures.",
                  detail: "Right-click for quick actions.",
                  color: "emerald",
                },
                {
                  icon: "✏️",
                  title: "SQL Editor",
                  desc: "Write, execute, and debug SQL queries with syntax highlighting and auto-completion.",
                  detail: "Includes results grid and execution plan.",
                  color: "purple",
                },
                {
                  icon: "⚙️",
                  title: "Administration",
                  desc: "Manage server configuration, users, logs, and performance metrics.",
                  detail: "Start/Stop server, manage backups.",
                  color: "amber",
                },
              ].map((area, idx) => {
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
                      "area-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[area.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="text-3xl">{area.icon}</div>
                    <h3
                      className={clsx(
                        "mt-1 font-bold",
                        textColorMap[area.color]
                      )}
                    >
                      {area.title}
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {area.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {area.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Deep Dive: Navigator ──────────────────────────── */}
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
              <span className="text-2xl">🧭</span>
              Deep Dive: The Navigator Panel
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The <strong>Navigator</strong> is your window into the database
              server. It's divided into several key sections:
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "📊",
                  title: "Schemas",
                  desc: "Lists all databases on the server. Expand to see tables, views, and columns.",
                  detail: "Right-click a table for quick actions (Select, Insert, etc.).",
                  color: "blue",
                },
                {
                  icon: "📈",
                  title: "Server Status",
                  desc: "Shows server performance metrics, connections, and uptime.",
                  detail: "Quickly check if the server is healthy.",
                  color: "emerald",
                },
                {
                  icon: "👤",
                  title: "Users & Privileges",
                  desc: "Manage MySQL user accounts and their permissions.",
                  detail: "Add/remove users, grant/revoke privileges.",
                  color: "purple",
                },
                {
                  icon: "📝",
                  title: "Performance",
                  desc: "Dashboard with query performance, I/O, and lock information.",
                  detail: "Identify slow queries and bottlenecks.",
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
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {item.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Deep Dive: SQL Editor ─────────────────────────── */}
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
              <span className="text-2xl">✏️</span>
              Deep Dive: SQL Development (Query Editor)
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The <strong>SQL Editor</strong> is where you spend most of your
              time. It's a full-featured development environment for writing
              and executing queries.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🎨",
                  title: "Syntax Highlighting",
                  desc: "Keywords, strings, and comments are colour-coded for readability.",
                  detail: "SQL keywords are highlighted in blue, strings in green.",
                  color: "blue",
                },
                {
                  icon: "🔮",
                  title: "Auto-Completion",
                  desc: "Type a keyword or table name and press Ctrl+Space for suggestions.",
                  detail: "Speeds up query writing significantly.",
                  color: "emerald",
                },
                {
                  icon: "📋",
                  title: "Query Results",
                  desc: "Results are displayed in a grid below the editor.",
                  detail: "Export results to CSV, JSON, or HTML.",
                  color: "purple",
                },
                {
                  icon: "📊",
                  title: "Execution Plan",
                  desc: "Visualise how MySQL executes your query.",
                  detail: "Identify performance bottlenecks.",
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
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {item.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── EER Diagrams ───────────────────────────────────── */}
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
              <span className="text-2xl">📐</span>
              Visual Design: EER Diagrams
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              MySQL Workbench includes a powerful <strong>visual database
              design</strong> tool for creating <strong>Entity-Relationship
              (ER)</strong> diagrams. This is essential for planning complex
              databases.
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
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🎨 Drag-and-Drop
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Add tables visually</li>
                  <li>Define columns and data types</li>
                  <li>Create relationships</li>
                </ul>
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
                  🔄 Forward Engineering
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Generate SQL CREATE scripts</li>
                  <li>Create the database from the diagram</li>
                  <li>Automated schema creation</li>
                </ul>
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
                  🔄 Reverse Engineering
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Import existing databases</li>
                  <li>Visualise the current schema</li>
                  <li>Document your database</li>
                </ul>
              </div>
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
              Real-World Example: Using Workbench Daily
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
                <strong>Swadeep</strong>, a database developer in{" "}
                <strong>Barrackpore</strong>, uses MySQL Workbench every day:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>8:00 AM:</strong> Opens Workbench, connects to the
                    development database via the Home screen.
                  </li>
                  <li>
                    <strong>8:30 AM:</strong> Uses the <strong>Navigator</strong>{" "}
                    to browse tables and check schema changes.
                  </li>
                  <li>
                    <strong>10:00 AM:</strong> Writes a complex query in the
                    <strong>SQL Editor</strong>, uses auto-complete, and runs it.
                  </li>
                  <li>
                    <strong>11:30 AM:</strong> Opens an <strong>EER Diagram</strong>{" "}
                    to plan a new feature, adds two tables and a relationship.
                  </li>
                  <li>
                    <strong>2:00 PM:</strong> Switches to the{" "}
                    <strong>Administration</strong> tab to check performance
                    metrics and slow query logs.
                  </li>
                  <li>
                    <strong>4:00 PM:</strong> Uses the <strong>Data Export</strong>{" "}
                    tool to backup the database before deploying changes.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Workbench is a daily companion
                for database professionals. Efficiency comes from knowing its
                interface inside-out.
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
                  <strong>Learn the shortcuts:</strong> <kbd>Ctrl+T</kbd> for a
                  new query tab, <kbd>Ctrl+Shift+Enter</kbd> to execute current
                  query, <kbd>Ctrl+B</kbd> to format SQL.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Customise the layout:</strong> Drag and drop panels
                  to rearrange them. You can even undock them into separate
                  windows.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use the Query Builder:</strong> If you're not
                  comfortable with complex SQL, use the graphical Query Builder
                  to visually construct joins.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Save your scripts:</strong> Use the File menu to save
                  your SQL scripts as `.sql` files for version control.
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
                  <strong>Not saving queries:</strong> Always save your SQL
                  scripts. Closing a tab without saving loses your work.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overlooking the Output panel:</strong> The Output
                  panel contains important error messages and query execution
                  times. Always check it.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Accidentally running all queries:</strong>{" "}
                  <kbd>Ctrl+Shift+Enter</kbd> runs all queries in the editor.
                  Highlight only the query you want to run.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring the status bar:</strong> The status bar shows
                  the current database, user, and server status. Use it to
                  ensure you're in the right environment.
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
                  <strong>Use separate connections for Dev/Prod:</strong> Create
                  distinct connections with different colours to avoid
                  accidentally modifying production data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Enable auto-save:</strong> Turn on auto-save for query
                  tabs in Preferences to prevent data loss.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use the Visual Explain plan:</strong> Before running
                  a heavy query on production, use Visual Explain to check the
                  execution plan.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Regularly update Workbench:</strong> Keep your
                  Workbench version up to date for the latest features and
                  security patches.
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
                <span>I can identify the four main areas of Workbench</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can use the Navigator to browse database objects</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can write and execute queries in the SQL Editor</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know how to create an EER diagram</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can use the Administration tools</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for using Workbench</span>
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
            title="Exploring MySQL Workbench Interface – FAQs"
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
          style={{ animationDelay: "1300ms" }}
        >
          <Teacher
            note={`
              "MySQL Workbench is your command center. I tell my students: 
              'Explore every menu, right-click everything, and hover over every '
              'button.' The best way to learn the interface is to use it daily. 
              Start by creating a simple database, writing queries, and then 
              gradually exploring the advanced features like EER diagrams and 
              performance monitoring. Don't be afraid to customize the layout 
              a workspace that fits your workflow makes you more productive. 
              Remember: the interface is designed to help you, not hinder you. 
              Master it, and you'll master MySQL."
            `}
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
            Topic 35 · Exploring MySQL Workbench Interface · Built with ❤️ for
            classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic35;