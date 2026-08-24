import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic34_files/topic34_questions";

/**
 * Topic34 – Creating the First Database
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Guide students through creating their first MySQL database
 *          using various methods (command line, MySQL Workbench, phpMyAdmin).
 *          Covers database naming conventions, character sets, and
 *          verification. Builds on Topics 29-33 (installation, connection).
 */
const Topic34 = () => {
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
            Module 1 · Topic 34
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Creating the
            </span>
            <br className="sm:hidden" />
            First Database
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Your first step into the world of MySQL — creating your very first
            database.
          </p>
        </div>

        {/* ─── SVG: Database Creation Process ──────────────── */}
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
              aria-label="Database creation process"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🚀 Creating Your First Database
              </text>

              {/* Command line method */}
              <rect x="20" y="40" width="170" height="90" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="105" y="65" textAnchor="middle" fontSize="20">💻</text>
              <text x="105" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Command Line</text>
              <text x="105" y="100" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">CREATE DATABASE mydb;</text>

              {/* Workbench method */}
              <rect x="215" y="40" width="170" height="90" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" />
              <text x="300" y="65" textAnchor="middle" fontSize="20">🖥️</text>
              <text x="300" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">MySQL Workbench</text>
              <text x="300" y="100" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Right-click → Create Schema</text>

              {/* phpMyAdmin method */}
              <rect x="410" y="40" width="170" height="90" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="495" y="65" textAnchor="middle" fontSize="20">🌐</text>
              <text x="495" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">phpMyAdmin</text>
              <text x="495" y="100" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">New → Create Database</text>

              {/* Result */}
              <rect x="200" y="150" width="200" height="30" rx="8" fill="#f59e0b" opacity="0.12" className="dark:fill-amber-400 dark:opacity-15 dark:stroke-amber-400" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="300" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">✅ Database Created!</text>
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
              Creating Your First Database
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              Now that you have MySQL installed and connected, it's time to
              create your <strong className="text-blue-600 dark:text-blue-400">
              first database</strong>. This is an exciting milestone — you're
              about to build the foundation for all your future projects!
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-emerald-50/40 p-4",
                "dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Key Insight:</span>{" "}
                Creating a database is like preparing a blank canvas. You'll
                then create tables, insert data, and build your application on
                top of it.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Prerequisites ─────────────────────────────────── */}
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
              <span className="text-2xl">📋</span>
              Prerequisites
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
                  <strong>MySQL Server installed</strong> — From Topics 29-31.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>MySQL Server running</strong> — Check with
                  <code className="mx-1 bg-white/80 px-1 py-0.5 rounded dark:bg-slate-700/40">systemctl status mysql</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Connected to MySQL</strong> — As covered in Topic 33.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Sufficient privileges</strong> — You need
                  <code className="mx-1 bg-white/80 px-1 py-0.5 rounded dark:bg-slate-700/40">CREATE DATABASE</code> permission.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── SQL Syntax ────────────────────────────────────── */}
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
              <span className="text-2xl">📝</span>
              SQL Syntax: CREATE DATABASE
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The basic syntax for creating a database is:
            </p>
            <pre
              className={clsx(
                "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-4 text-xs text-slate-200",
                "dark:bg-slate-900 dark:text-slate-300",
                "font-mono leading-relaxed"
              )}
            >
              {`CREATE DATABASE database_name;

-- With options (recommended):
CREATE DATABASE database_name
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Check if database exists before creating:
CREATE DATABASE IF NOT EXISTS database_name;

-- Show all databases:
SHOW DATABASES;`}
            </pre>
          </div>
        </section>

        {/* ─── Methods to Create Database ───────────────────── */}
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
                "mb-4 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">🔧</span>
              Three Ways to Create a Database
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
                  title: "Command Line",
                  steps: [
                    "Connect: `mysql -u root -p`",
                    "Run: `CREATE DATABASE mydb;`",
                    "Verify: `SHOW DATABASES;`",
                  ],
                  color: "blue",
                },
                {
                  icon: "🖥️",
                  title: "MySQL Workbench",
                  steps: [
                    "Open Workbench and connect",
                    "Right-click in Navigator → Create Schema",
                    "Enter name → Apply → Apply",
                  ],
                  color: "emerald",
                },
                {
                  icon: "🌐",
                  title: "phpMyAdmin",
                  steps: [
                    "Open `http://localhost/phpmyadmin/`",
                    "Click 'New' in the sidebar",
                    "Enter name → Create",
                  ],
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
                    style={{ animationDelay: `${idx * 50 + 500}ms` }}
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
                    <ol
                      className={clsx(
                        "mt-2 list-decimal list-inside space-y-1 text-xs",
                        "text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {method.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Important Considerations ──────────────────────── */}
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
              <span className="text-2xl">⚠️</span>
              Important Considerations
            </h2>
            <div
              className={clsx(
                "space-y-3 text-sm",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-blue-500 pl-4",
                  "hover:bg-blue-50/30 dark:hover:bg-blue-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">📛 Naming Conventions</span>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Use lowercase letters (e.g., <code>mydb</code>)</li>
                  <li>Use underscores for spaces (e.g., <code>my_database</code>)</li>
                  <li>Start with a letter (not a number)</li>
                  <li>Maximum length: 64 characters</li>
                  <li>Cannot be a reserved keyword (e.g., <code>SELECT</code>)</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-emerald-500 pl-4",
                  "hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-emerald-600 dark:text-emerald-400">🔤 Character Set &amp; Collation</span>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>utf8mb4</code> is the recommended character set</li>
                  <li><code>utf8mb4_unicode_ci</code> is the recommended collation</li>
                  <li>Supports all Unicode characters (including emojis)</li>
                  <li>Important for multilingual applications</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-amber-500 pl-4",
                  "hover:bg-amber-50/30 dark:hover:bg-amber-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-amber-600 dark:text-amber-400">💾 Storage Engine</span>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Default is <code>InnoDB</code> (recommended)</li>
                  <li>Supports transactions, foreign keys</li>
                  <li>Can be changed per table</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Verifying Database Creation ───────────────────── */}
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
              <span className="text-2xl">✅</span>
              Verifying Your Database
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              After creating your database, verify it exists:
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
                  🔍 In Command Line
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`SHOW DATABASES;
-- Look for your database in the list

USE mydb;
SELECT DATABASE();
-- Shows current database`}
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
                  🖥️ In Workbench
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Check the Navigator sidebar</li>
                  <li>Click the refresh button</li>
                  <li>Your database should appear in the list</li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  Right-click on the database to explore it.
                </div>
              </div>
            </div>
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
              Real-World Example: School Database
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
                <strong>Naihati</strong>, needs to create a database for her
                school:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Step 1:</strong> Connects to MySQL as root.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Runs the command:
                    <pre
                      className={clsx(
                        "mt-1 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                        "dark:bg-slate-900 dark:text-slate-300"
                      )}
                    >
                      {`CREATE DATABASE school_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;`}
                    </pre>
                  </li>
                  <li>
                    <strong>Step 3:</strong> Verifies with{" "}
                    <code>SHOW DATABASES;</code> — sees <code>school_db</code>{" "}
                    in the list.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Creates a user for the school app:
                    <pre
                      className={clsx(
                        "mt-1 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                        "dark:bg-slate-900 dark:text-slate-300"
                      )}
                    >
                      {`GRANT ALL ON school_db.* TO 'school_app'@'localhost'
IDENTIFIED BY 'SecurePass123!';`}
                    </pre>
                  </li>
                  <li>
                    <strong>Step 5:</strong> Now ready to create tables!
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Creating a database is the
                foundation of every data-driven application.
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
                  <strong>Use `IF NOT EXISTS`:</strong> This prevents errors if
                  the database already exists:
                  <code className="mx-1 bg-white/80 px-1 py-0.5 rounded dark:bg-slate-700/40">
                    CREATE DATABASE IF NOT EXISTS mydb;
                  </code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use `utf8mb4` character set:</strong> This supports
                  all Unicode characters, including emojis.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Choose a meaningful name:</strong> Use names that
                  describe the purpose (e.g., <code>ecommerce_db</code>,
                  <code>blog_db</code>).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Create a dedicated user:</strong> Don't use root for
                  your application. Create a user with limited privileges.
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
                  <strong>Using reserved keywords:</strong> <code>CREATE DATABASE
                  SELECT;</code> will fail. Choose a different name.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Forgetting the semicolon:</strong> SQL statements
                  require a semicolon (<code>;</code>) to execute.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using spaces in database names:</strong> <code>CREATE DATABASE
                  my database;</code> is invalid. Use underscores:{" "}
                  <code>my_database</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not having sufficient privileges:</strong> The user
                  must have <code>CREATE DATABASE</code> permission.
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
                  <strong>Use `IF NOT EXISTS`:</strong> This makes your scripts
                  idempotent and prevents errors.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Always specify character set:</strong> Set{" "}
                  <code>utf8mb4</code> and <code>utf8mb4_unicode_ci</code> for
                  maximum compatibility.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Keep naming consistent:</strong> Use the same naming
                  convention for all databases in your organisation.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document your databases:</strong> Maintain a list of
                  databases, their purpose, and who owns them.
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
                <span>I can connect to MySQL using the command line</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can write the CREATE DATABASE syntax correctly</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can create a database using three different methods</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand naming conventions and character sets</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can verify that the database was created</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can avoid common pitfalls when creating databases</span>
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
            title="Creating the First Database – FAQs"
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
          style={{ animationDelay: "1400ms" }}
        >
          <Teacher
            note={
              "Creating your first database is a milestone moment. I tell my students: " +
              "'You're no longer just reading about databases — you're building them.' " +
              "The `CREATE DATABASE` command is simple, but it's the foundation of " +
              "everything you'll do. My advice: start with a meaningful name, always " +
              "use `utf8mb4` for character set, and create a dedicated user for your " +
              "application. Don't use root for your daily work — create a user with " +
              "only the privileges you need. This is your first step toward becoming " +
              "a database professional. Make it count!"
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
            Topic 34 · Creating the First Database · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic34;