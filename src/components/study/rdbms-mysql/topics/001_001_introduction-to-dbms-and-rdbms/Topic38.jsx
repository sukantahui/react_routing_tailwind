import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic38_files/topic38_note.txt?raw";
import questions from "./topic38_files/topic38_questions";

/**
 * Topic38 – Importing SQL Scripts
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Guide students through importing SQL scripts and databases
 *          using various methods: command line, MySQL Workbench, phpMyAdmin,
 *          and automated scripts. Covers best practices, troubleshooting,
 *          and security. Builds on Topics 36-37 (executing, saving scripts).
 */
const Topic38 = () => {
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
            Module 1 · Topic 38
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Importing
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
            Bringing data back in — how to import SQL scripts, databases, and
            data into MySQL.
          </p>
        </div>

        {/* ─── SVG: Import Process ──────────────────────────── */}
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
              aria-label="SQL import process"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                📥 SQL Import Process
              </text>

              {/* File */}
              <rect x="30" y="40" width="110" height="90" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="85" y="70" textAnchor="middle" fontSize="28">📄</text>
              <text x="85" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">SQL File</text>
              <text x="85" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">.sql / .zip</text>

              {/* Arrow */}
              <line x1="140" y1="85" x2="180" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="175,80 185,85 175,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Import Methods */}
              <rect x="190" y="40" width="220" height="90" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" />
              <text x="300" y="65" textAnchor="middle" fontSize="20">🔄</text>
              <text x="300" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Import Methods</text>
              <text x="300" y="100" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">CLI · Workbench · phpMyAdmin</text>
              <text x="300" y="115" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Scripts</text>

              {/* Arrow */}
              <line x1="410" y1="85" x2="450" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="445,80 455,85 445,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Database */}
              <rect x="460" y="40" width="110" height="90" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="515" y="70" textAnchor="middle" fontSize="28">🗄️</text>
              <text x="515" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">MySQL</text>
              <text x="515" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Database</text>

              {/* Bottom label */}
              <text x="300" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">
                SQL File → Import → MySQL Database
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
              Why Import SQL Scripts?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              Importing SQL scripts is essential for <strong
              className="text-blue-600 dark:text-blue-400">restoring backups</strong>,
              <strong className="text-blue-600 dark:text-blue-400"> migrating
              data</strong>, and <strong className="text-blue-600 dark:text-blue-400">
              setting up databases</strong> from scratch. Whether you're
              receiving a schema from a teammate, restoring a production backup,
              or seeding a development database, knowing how to import SQL is a
              crucial skill.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                Importing is the reverse of exporting. It's how you bring data
                into a MySQL server. Always test imports on a non-production
                environment first.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Methods to Import ────────────────────────────── */}
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
              Four Ways to Import SQL Scripts
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
                  desc: "Use the `mysql` client to import from a file.",
                  detail: "mysql -u root -p &lt; script.sql",
                  color: "blue",
                },
                {
                  icon: "🖥️",
                  title: "MySQL Workbench",
                  desc: "Use the Data Import tool or run SQL script.",
                  detail: "File → Run SQL Script",
                  color: "emerald",
                },
                {
                  icon: "🌐",
                  title: "phpMyAdmin",
                  desc: "Use the Import tab to upload and execute SQL.",
                  detail: "Import → Choose file → Go",
                  color: "purple",
                },
                {
                  icon: "📄",
                  title: "Source Command",
                  desc: "Use `SOURCE` from within the mysql client.",
                  detail: "mysql&gt; SOURCE /path/file.sql",
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

        {/* ─── Command Line Import ───────────────────────────── */}
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
              Importing via Command Line
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The most common and fastest way to import large SQL files is using
              the <strong>mysql</strong> client with input redirection or the
              <strong>SOURCE</strong> command.
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
                  📝 Using Redirection
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Basic import
mysql -u root -p < backup.sql

# Import into a specific database
mysql -u root -p mydb < backup.sql

# With verbose output
mysql -u root -p --verbose < backup.sql

# From a compressed file
gunzip -c backup.sql.gz | mysql -u root -p mydb`}
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
                  📝 Using SOURCE Command
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Connect first
mysql -u root -p

# Then inside the mysql client
mysql&gt; USE mydb;
Database changed

mysql> SOURCE /path/to/backup.sql;

# You can also specify the full path
mysql> SOURCE C:/backups/backup.sql;`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Workbench Import ──────────────────────────────── */}
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
              Importing in MySQL Workbench
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Workbench provides two main ways to import SQL: running a script
              directly or using the Data Import tool for structured imports.
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
                  📄 Run SQL Script
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>File → Run SQL Script</li>
                  <li>Select the .sql file</li>
                  <li>Choose the default schema</li>
                  <li>Click 'Run'</li>
                  <li>Monitor progress in the Output panel</li>
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
                  📊 Data Import (Restore)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Server → Data Import</li>
                  <li>Import from self-contained file</li>
                  <li>Select the SQL file</li>
                  <li>Choose target schema</li>
                  <li>Click 'Start Import'</li>
                </ul>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                  This is the reverse of Data Export.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── phpMyAdmin Import ─────────────────────────────── */}
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
              <span className="text-2xl">🌐</span>
              Importing with phpMyAdmin
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              phpMyAdmin provides a simple web interface for importing SQL
              files, especially useful for small to medium-sized files.
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
                  📝 Step-by-Step
                </h4>
                <ol className="mt-2 list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Login to phpMyAdmin</li>
                  <li>Select the target database</li>
                  <li>Click the 'Import' tab</li>
                  <li>Choose the SQL file</li>
                  <li>Select format: SQL</li>
                  <li>Adjust options if needed</li>
                  <li>Click 'Go'</li>
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
                  <li>Maximum file size limited by PHP</li>
                  <li>Large files may timeout</li>
                  <li>Use `max_execution_time` and `upload_max_filesize`</li>
                  <li>For large files, use command line</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Troubleshooting Imports ───────────────────────── */}
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
              <span className="text-2xl">🔧</span>
              Troubleshooting Common Import Issues
            </h2>
            <div
              className={clsx(
                "space-y-3 text-sm",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-red-500 pl-4",
                  "hover:bg-red-50/30 dark:hover:bg-red-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-red-600 dark:text-red-400">❌ File too large</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Use command line instead of phpMyAdmin. Split large files if
                  needed. Increase `max_allowed_packet` in MySQL config.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-amber-500 pl-4",
                  "hover:bg-amber-50/30 dark:hover:bg-amber-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-amber-600 dark:text-amber-400">❌ Permission denied</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Ensure the MySQL user has `CREATE`, `INSERT`, and `ALTER`
                  privileges on the target database.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-blue-500 pl-4",
                  "hover:bg-blue-50/30 dark:hover:bg-blue-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">❌ Syntax errors</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Use `--force` option to continue on errors, but review the
                  error log to fix issues. Check for missing semicolons.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-purple-500 pl-4",
                  "hover:bg-purple-50/30 dark:hover:bg-purple-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-purple-600 dark:text-purple-400">❌ Foreign key constraints</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Temporarily disable foreign key checks: `SET FOREIGN_KEY_CHECKS=0;`
                  before import, and re-enable after.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Security Considerations ───────────────────────── */}
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
                  <strong>Validate SQL files:</strong> Always review SQL scripts
                  before importing, especially from untrusted sources.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use a dedicated user:</strong> Create a user with only
                  the necessary privileges for import operations.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Backup first:</strong> Before importing into an
                  existing database, always take a backup.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Test in development:</strong> Never import directly
                  into production without testing on a staging environment.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use SSL:</strong> When importing over the network, use
                  SSL to protect data in transit.
                </span>
              </li>
            </ul>
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
              Real-World Example: Restoring a Database Backup
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
                <strong>Debangshu</strong>, a database administrator in{" "}
                <strong>Naihati</strong>, needs to restore a backup:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Backup File:</strong> <code>prod_backup_2024-01-15.sql</code>{" "}
                    (2.5 GB)
                  </li>
                  <li>
                    <strong>Server:</strong> Remote MySQL server on AWS
                  </li>
                  <li>
                    <strong>Approach:</strong> Uses command line for speed:
                    <pre
                      className={clsx(
                        "mt-1 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                        "dark:bg-slate-900 dark:text-slate-300"
                      )}
                    >
                      {`mysql -h prod-db.example.com -u admin -p prod_db < backup.sql`}
                    </pre>
                  </li>
                  <li>
                    <strong>Challenge:</strong> Connection timeouts — uses
                    <code>--max_allowed_packet=512M</code> and increases
                    timeout settings.
                  </li>
                  <li>
                    <strong>Result:</strong> Successful restore after 12 minutes.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> For large imports, command line
                is the most reliable method.
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
                  <strong>Use `pv` to monitor progress:</strong> `pv large.sql
                  | mysql -u root -p` shows a progress bar.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Disable foreign key checks:</strong> For faster
                  imports, add <code>SET FOREIGN_KEY_CHECKS=0;</code> at the top
                  of the script.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use `--force` to continue on errors:</strong> This is
                  useful for debugging, but be careful not to ignore critical
                  issues.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Compress large files:</strong> Use <code>.gz</code> or
                  <code>.zip</code> to save space and time, then pipe to mysql:
                  <code>gunzip -c backup.sql.gz | mysql -u root -p</code>.
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
                  <strong>Importing to the wrong database:</strong> Always check
                  the <code>USE</code> statement in the script or specify the
                  target database.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overwriting existing data:</strong> If the script
                  contains <code>DROP TABLE</code> or <code>TRUNCATE</code>, it
                  will delete existing data. Review first.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring character set issues:</strong> If the script
                  and database have different character sets, you may get
                  corrupted data. Use <code>--default-character-set=utf8mb4</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Running out of memory:</strong> Large imports can
                  exhaust memory. Increase <code>max_allowed_packet</code> and
                  use the command line for large files.
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
                  <strong>Always test imports first:</strong> Use a development
                  or staging database to verify the script before production.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Keep a backup before importing:</strong> If you're
                  importing into an existing database, take a backup first.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use version control:</strong> Keep your import scripts
                  in Git and document each import.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Monitor performance:</strong> Use <code>SHOW
                  PROCESSLIST</code> to monitor the import progress and identify
                  bottlenecks.
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
                <span>I can import SQL scripts using the command line</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can import using MySQL Workbench</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can import using phpMyAdmin</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand how to troubleshoot common import errors</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know security best practices for imports</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for importing SQL scripts</span>
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
            title="Importing SQL Scripts – FAQs"
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
            title="Importing SQL Scripts"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic38_note.txt"
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
              "Importing is a critical operation — it can restore a failed system " +
              "or accidentally overwrite production data. I tell my students: " +
              "'Always treat import like surgery: prepare, verify, and have a " +
              "backup plan.' The command line is your best friend for large imports, " +
              "but always test on a non-production environment first. Also, never " +
              "import untrusted SQL without review — it could contain malicious " +
              "statements. Finally, document every import: what, when, why, and " +
              "the result. This discipline will save you from many headaches."
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
            Topic 38 · Importing SQL Scripts · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic38;