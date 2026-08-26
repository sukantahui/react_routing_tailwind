import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic39_files/topic39_note.txt?raw";
import questions from "./topic39_files/topic39_questions";

/**
 * Topic39 – Exporting Databases
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Guide students through exporting (dumping) databases and tables
 *          using mysqldump, MySQL Workbench, and phpMyAdmin. Covers options,
 *          compression, best practices, and security. Builds on Topics 37-38
 *          (saving, importing scripts).
 */
const Topic39 = () => {
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
            Module 1 · Topic 39
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Exporting
            </span>
            <br className="sm:hidden" />
            Databases
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Safely backing up and moving your data — how to export databases
            using the most reliable methods.
          </p>
        </div>

        {/* ─── SVG: Export Process ──────────────────────────── */}
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
              aria-label="Database export process"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                📤 Exporting Databases
              </text>

              {/* Database */}
              <rect x="30" y="40" width="110" height="90" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="85" y="70" textAnchor="middle" fontSize="28">🗄️</text>
              <text x="85" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">MySQL</text>
              <text x="85" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Database</text>

              {/* Arrow */}
              <line x1="140" y1="85" x2="180" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="175,80 185,85 175,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Export Methods */}
              <rect x="190" y="40" width="220" height="90" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" />
              <text x="300" y="65" textAnchor="middle" fontSize="20">🔄</text>
              <text x="300" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Export Methods</text>
              <text x="300" y="100" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">mysqldump · Workbench</text>
              <text x="300" y="115" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">phpMyAdmin · Scripts</text>

              {/* Arrow */}
              <line x1="410" y1="85" x2="450" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="445,80 455,85 445,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* File */}
              <rect x="460" y="40" width="110" height="90" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="515" y="70" textAnchor="middle" fontSize="28">📄</text>
              <text x="515" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">SQL File</text>
              <text x="515" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">.sql / .zip</text>

              {/* Bottom label */}
              <text x="300" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">
                Database → Export → SQL Dump File
              </text>
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
              Why Export Databases?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              Exporting (also called <strong>dumping</strong>) a database creates
              a <strong>backup</strong> in the form of a SQL script that can be
              re‑imported later. This is essential for <strong
              className="text-blue-600 dark:text-blue-400">disaster recovery</strong>,
              <strong className="text-blue-600 dark:text-blue-400"> data
              migration</strong>, and <strong className="text-blue-600 dark:text-blue-400">
              sharing</strong> your database with others.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                Exporting is the counterpart to importing. A good backup strategy
                includes regular exports of your databases.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Methods to Export ────────────────────────────── */}
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
              Three Ways to Export Databases
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-3",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "💻",
                  title: "mysqldump",
                  desc: "The most powerful and flexible command‑line tool.",
                  detail: "mysqldump -u root -p db_name &gt; backup.sql",
                  color: "blue",
                },
                {
                  icon: "🖥️",
                  title: "MySQL Workbench",
                  desc: "Visual Data Export tool with many options.",
                  detail: "Server → Data Export",
                  color: "emerald",
                },
                {
                  icon: "🌐",
                  title: "phpMyAdmin",
                  desc: "Web‑based export for quick backups.",
                  detail: "Export tab → Go",
                  color: "purple",
                },
              ].map((method, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
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

        {/* ─── mysqldump Deep Dive ───────────────────────────── */}
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
              mysqldump — The Ultimate Export Tool
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              <strong>mysqldump</strong> is a command‑line utility that produces
              a SQL file containing the structure and/or data of your database.
              It is the most common and reliable method for backups.
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
                  📝 Basic Syntax
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Export entire database
mysqldump -u root -p db_name &gt; backup.sql

# Export only structure (no data)
mysqldump -u root -p --no-data db_name > structure.sql

# Export only data (no structure)
mysqldump -u root -p --no-create-info db_name > data.sql

# Export specific tables
mysqldump -u root -p db_name table1 table2 > tables.sql

# Export multiple databases
mysqldump -u root -p --databases db1 db2 > multi.sql

# Export all databases
mysqldump -u root -p --all-databases > all.sql`}
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
                  ⚙️ Common Options
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>--add-drop-table</code> — Add DROP TABLE statements</li>
                  <li><code>--no-create-db</code> — Don't include CREATE DATABASE</li>
                  <li><code>--single-transaction</code> — Consistent backup (InnoDB)</li>
                  <li><code>--lock-tables</code> — Lock tables for consistency</li>
                  <li><code>--routines</code> — Include stored procedures</li>
                  <li><code>--triggers</code> — Include triggers</li>
                  <li><code>--compress</code> — Compress output (with gzip)</li>
                  <li><code>--default-character-set=utf8mb4</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── mysqldump with Compression ────────────────────── */}
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
              <span className="text-2xl">🗜️</span>
              Compressing Exports
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Large databases produce large SQL files. Compressing them saves
              storage and speeds up transfers.
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
                  📝 Using gzip
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Export and compress on the fly
mysqldump -u root -p db_name | gzip &gt; backup.sql.gz

# Or use --compress in some versions
mysqldump -u root -p --compress db_name > backup.sql.gz

# View compressed file size
ls -lh backup.sql.gz

# Decompress and import
gunzip -c backup.sql.gz | mysql -u root -p db_name`}
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
                  📁 Using zip
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Export first, then zip
mysqldump -u root -p db_name &gt; backup.sql
zip backup.zip backup.sql

# Or pipe directly (some systems)
mysqldump -u root -p db_name | zip > backup.zip

# Check size
ls -lh backup.zip`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MySQL Workbench Export ───────────────────────── */}
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
              <span className="text-2xl">🖥️</span>
              Exporting with MySQL Workbench
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Workbench provides a user‑friendly <strong>Data Export</strong> tool
              that allows you to export structure, data, or both, with many options.
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
                  📝 Steps to Export
                </h4>
                <ol className="mt-2 list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Server → Data Export</li>
                  <li>Select the database(s) to export</li>
                  <li>Choose 'Export to Self-Contained File'</li>
                  <li>Select the output file location</li>
                  <li>Choose options (structure, data, both)</li>
                  <li>Click 'Start Export'</li>
                </ol>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  ⚙️ Export Options
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Export Structure Only</li>
                  <li>Export Data Only</li>
                  <li>Include CREATE DATABASE</li>
                  <li>Drop tables before creation</li>
                  <li>Add IF NOT EXISTS</li>
                  <li>Export stored procedures and functions</li>
                  <li>Export triggers and events</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── phpMyAdmin Export ─────────────────────────────── */}
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
              <span className="text-2xl">🌐</span>
              Exporting with phpMyAdmin
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              phpMyAdmin offers a simple web interface for exporting databases
              or tables, with options to include structure, data, or both.
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
                  📝 Steps to Export
                </h4>
                <ol className="mt-2 list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Select the database</li>
                  <li>Click the 'Export' tab</li>
                  <li>Choose 'Quick' or 'Custom' method</li>
                  <li>Select format: SQL (default)</li>
                  <li>Click 'Go' to download</li>
                </ol>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-amber-200/50 p-4",
                  "dark:border-amber-700/50",
                  "bg-amber-50/40 dark:bg-amber-900/10"
                )}
              >
                <h4 className="font-bold text-amber-700 dark:text-amber-300">
                  ⚠️ Limitations
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Export size limited by PHP memory</li>
                  <li>May time out for large databases</li>
                  <li>Use 'Custom' to export specific tables</li>
                  <li>Can compress output (zip, gzip)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Automating Exports ────────────────────────────── */}
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
              <span className="text-2xl">🤖</span>
              Automating Database Exports
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              For regular backups, automate the export process using cron (Linux)
              or Task Scheduler (Windows) with a script.
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
                  🐧 Linux (cron)
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Create backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -p'password' db_name | gzip &gt; $BACKUP_DIR/db_$DATE.sql.gz

# Add to crontab (daily at 2am)
0 2 * * * /path/to/backup.sh

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete`}
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
                  🪟 Windows (Task Scheduler)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Create a batch file (`.bat`) with the `mysqldump` command</li>
                  <li>Open Task Scheduler</li>
                  <li>Create a new task with daily trigger</li>
                  <li>Point to the batch file</li>
                  <li>Set to run with highest privileges</li>
                </ul>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`@echo off
set BACKUP_DIR=C:\\backups
set DATE=%date:~10,4%%date:~4,2%%date:~7,2%
mysqldump -u root -p'password' db_name &gt; %BACKUP_DIR%\\db_%DATE%.sql`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Security Considerations ───────────────────────── */}
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
              <span className="text-2xl">🔐</span>
              Security Best Practices
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
                  <strong>Never hardcode passwords:</strong> Use configuration
                  files with restricted permissions or environment variables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Encrypt backup files:</strong> Use `gpg` or `openssl`
                  to encrypt sensitive backups.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Store backups off‑site:</strong> Use cloud storage or
                  a remote server for critical backups.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Limit access to backup files:</strong> Use file
                  permissions (600 or 640) to restrict access.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Test your backups:</strong> Regularly restore backups
                  to ensure they are valid.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
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
              <span className="text-2xl">🌍</span>
              Real-World Example: Scheduled Backup
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
                <strong>Swadeep</strong>, a DevOps engineer in <strong>Barrackpore</strong>,
                sets up automated backups for his company's e‑commerce database:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Database:</strong> <code>ecommerce_db</code> (50 GB)
                  </li>
                  <li>
                    <strong>Backup Script:</strong> A bash script using
                    <code>mysqldump</code> with <code>--single-transaction</code>{" "}
                    and <code>--routines</code>.
                  </li>
                  <li>
                    <strong>Compression:</strong> Pipes output to <code>gzip</code>{" "}
                    to save space.
                  </li>
                  <li>
                    <strong>Schedule:</strong> Runs daily at 2 AM via cron.
                  </li>
                  <li>
                    <strong>Retention:</strong> Keeps 7 daily backups, 4 weekly,
                    and 12 monthly.
                  </li>
                  <li>
                    <strong>Storage:</strong> Backups are stored on a separate
                    server and also uploaded to AWS S3.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Automating exports with proper
                retention and off‑site storage is essential for disaster recovery.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
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
                  <strong>Use `--single-transaction` for InnoDB:</strong> This
                  ensures a consistent snapshot without locking tables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Exclude certain tables:</strong> Use `--ignore-table`
                  to skip large, unimportant tables (e.g., logs).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use `--compress` for network backups:</strong> When
                  exporting over the network, compression reduces bandwidth.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Check backup size:</strong> Monitor the size of backups
                  to catch unexpected growth.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
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
                  <strong>Not testing backups:</strong> A backup is useless if
                  you can't restore it. Test regularly!
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Storing backups on the same server:</strong> If the
                  server fails, you lose both the database and the backup.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using `--single-transaction`:</strong> This can
                  lead to inconsistent backups with data changes during the dump.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Forgetting to include routines:</strong> Stored
                  procedures, functions, and triggers are not exported by
                  default — use `--routines`.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1300ms" }}
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
                  <strong>Regularly schedule exports:</strong> Automate backups
                  to run at off‑peak hours.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use compression:</strong> Save storage and bandwidth
                  by compressing backup files.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Store backups in multiple locations:</strong> Use
                  local, cloud, and off‑site storage for redundancy.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document your backup strategy:</strong> Include
                  schedules, locations, retention, and restoration procedures.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1400ms" }}
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
                <span>I can export a database using mysqldump</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can export using MySQL Workbench</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can export using phpMyAdmin</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the mysqldump options (--no-data, --routines, --single-transaction)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can compress exports using gzip or zip</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can automate exports with cron/Task Scheduler</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1500ms" }}
        >
          <FAQTemplate
            title="Exporting Databases – FAQs"
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
            title="Exporting Databases"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic39_note.txt"
          />
        </section>

        {/* ─── Teacher's Note ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1600ms" }}
        >
          <Teacher
            note={
              "Exporting is your safety net. I tell my students: 'A database without " +
              "a backup is a disaster waiting to happen.' The `mysqldump` tool is " +
              "your best friend — it's reliable, flexible, and scriptable. Always " +
              "test your backups by restoring them on a test server. And remember: " +
              "backups are not set‑and‑forget; monitor their size, integrity, and " +
              "retention. A good backup strategy saves your career (and your company)."
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
            Topic 39 · Exporting Databases · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic39;