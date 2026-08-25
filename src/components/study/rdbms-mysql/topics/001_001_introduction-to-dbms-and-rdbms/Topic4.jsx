import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4 – Traditional File System vs Database System
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Compare and contrast traditional file-based data storage
 *          with modern database systems, highlighting why databases
 *          are superior for most applications. Builds on topics
 *          0-3 (data, processing, databases, and characteristics).
 */
const Topic4 = () => {
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

        .comparison-card:hover {
          transform: translateY(-4px);
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
            Module 1 · Topic 4
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            Traditional File System <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              vs Database System
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Understanding the evolution from simple files to powerful database
            systems — and why the shift is necessary.
          </p>
        </div>

        {/* ─── SVG: Comparison ──────────────────────────────── */}
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
              aria-label="Comparison of file system vs database system"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              {/* Left: File System */}
              <rect x="20" y="20" width="260" height="160" rx="10" fill="#ef4444" opacity="0.08" className="dark:fill-red-400 dark:opacity-10 dark:stroke-red-400" stroke="#ef4444" strokeWidth="1.5" />
              <text x="150" y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📁 File System</text>

              <rect x="40" y="60" width="220" height="30" rx="6" fill="#94a3b8" opacity="0.15" className="dark:fill-slate-500 dark:opacity-20" />
              <text x="150" y="80" textAnchor="middle" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">student.txt</text>

              <rect x="40" y="100" width="220" height="30" rx="6" fill="#94a3b8" opacity="0.15" className="dark:fill-slate-500 dark:opacity-20" />
              <text x="150" y="120" textAnchor="middle" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">course.txt</text>

              <rect x="40" y="140" width="220" height="30" rx="6" fill="#94a3b8" opacity="0.15" className="dark:fill-slate-500 dark:opacity-20" />
              <text x="150" y="160" textAnchor="middle" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">marks.txt</text>

              {/* Right: Database System */}
              <rect x="320" y="20" width="260" height="160" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-10 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="450" y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🗄️ Database System</text>

              <rect x="340" y="60" width="220" height="30" rx="6" fill="#10b981" opacity="0.15" className="dark:fill-emerald-400 dark:opacity-20" />
              <text x="450" y="80" textAnchor="middle" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">📊 Students Table</text>

              <rect x="340" y="100" width="220" height="30" rx="6" fill="#8b5cf6" opacity="0.15" className="dark:fill-purple-400 dark:opacity-20" />
              <text x="450" y="120" textAnchor="middle" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">📊 Courses Table</text>

              <rect x="340" y="140" width="220" height="30" rx="6" fill="#f59e0b" opacity="0.15" className="dark:fill-amber-400 dark:opacity-20" />
              <text x="450" y="160" textAnchor="middle" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">📊 Marks Table</text>

              {/* Arrows between */}
              <line x1="280" y1="100" x2="320" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-slate-500">
                <animate attributeName="stroke-dashoffset" values="0;20" dur="1s" repeatCount="indefinite" />
              </line>
              <text x="300" y="90" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">vs</text>
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
              <span className="text-2xl">⚖️</span>
              The Great Divide: Files vs. Databases
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              Before databases became mainstream, data was stored in{" "}
              <strong className="text-red-600 dark:text-red-400">file systems</strong>{" "}
              — simple text or binary files. While this approach works for small,
              single-user applications, it fails when data grows, users increase,
              and relationships become complex. This is where{" "}
              <strong className="text-blue-600 dark:text-blue-400">database systems</strong>{" "}
              shine.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-lg bg-red-50/60 p-3",
                  "dark:bg-red-900/10"
                )}
              >
                <span className="font-semibold text-red-700 dark:text-red-300">
                  File System:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Simple, unstructured</li>
                  <li>No built-in relationships</li>
                  <li>Manual data management</li>
                  <li>Limited security</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-blue-50/60 p-3",
                  "dark:bg-blue-900/10"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Database System:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Structured, organised</li>
                  <li>Relationships enforced</li>
                  <li>Automated management (DBMS)</li>
                  <li>Robust security</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Comparison Table ──────────────────────────────── */}
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
              <span className="text-2xl">📊</span>
              Head-to-Head Comparison
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
                      Feature
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-red-600",
                        "dark:text-red-400"
                      )}
                    >
                      File System
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-blue-600",
                        "dark:text-blue-400"
                      )}
                    >
                      Database System
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
                    <td className="px-4 py-3 font-medium">Data Structure</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Unstructured, flat files</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Structured tables with relationships</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Data Redundancy</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">High (data duplicated across files)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Low (normalised, controlled)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Data Consistency</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Manual, prone to errors</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Enforced automatically (constraints)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Concurrency</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Not supported (file locks only)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Full support with transactions</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Security</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Basic OS-level permissions</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Granular, role-based, and encryption</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Querying</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Manual searching (grep, custom code)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Powerful, declarative (SQL)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Backup/Recovery</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Manual copy</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Automated, with point-in-time recovery</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Scalability</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Limited, hardware-dependent</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Highly scalable (horizontal/vertical)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Cost</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Low (no DBMS license)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Higher (DBMS licensing, administration)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Complexity</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Low</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">High (requires expertise)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Why Databases Win ──────────────────────────────── */}
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
              <span className="text-2xl">🏆</span>
              Why Databases Dominate Modern Systems
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
                  <strong>Data Independence:</strong> Changes in storage don't
                  affect applications, and vice versa.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Multi-User Access:</strong> Thousands of users can
                  access the same data simultaneously without corruption.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Complex Relationships:</strong> Databases handle
                  intricate relationships between entities (students, courses,
                  teachers) seamlessly.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Data Integrity Rules:</strong> Business rules (like
                  "marks must be between 0 and 100") are enforced at the
                  database level.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Security and Auditing:</strong> Fine-grained controls
                  and activity logs protect sensitive data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Standardization:</strong> SQL is a universal language
                  for querying, reducing dependency on specific applications.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── When Files Are Still Useful ────────────────────── */}
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
              <span className="text-2xl">📁</span>
              When Are File Systems Still the Right Choice?
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Despite their limitations, file systems are still used in specific
              scenarios where databases are overkill or impractical.
            </p>
            <ul
              className={clsx(
                "mt-3 space-y-2 text-sm leading-relaxed",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <li className="flex gap-3">
                <span className="text-amber-500 dark:text-amber-400">➜</span>
                <span>
                  <strong>Simple configurations:</strong> Storing configuration
                  files (e.g., <code>.ini</code>, <code>.json</code>).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 dark:text-amber-400">➜</span>
                <span>
                  <strong>Small-scale applications:</strong> Single-user tools
                  where concurrent access is not a concern.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 dark:text-amber-400">➜</span>
                <span>
                  <strong>Data exchange:</strong> Importing/exporting data as
                  CSV, JSON, or XML files.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 dark:text-amber-400">➜</span>
                <span>
                  <strong>Log files:</strong> Application logs that are written
                  sequentially and rarely queried.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 dark:text-amber-400">➜</span>
                <span>
                  <strong>Embedded systems:</strong> Resource-constrained
                  environments where a DBMS is too heavy.
                </span>
              </li>
            </ul>
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
              Real-World Example: School Management
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
                Imagine <strong>Swadeep</strong>, the school administrator at
                <strong>Barrackpore</strong> High School. He used to maintain
                student records in text files:
                <br />
                <code className="block my-2 bg-white/80 dark:bg-slate-700/40 p-2 rounded">
                  students.txt<br />
                  courses.txt<br />
                  marks.txt
                </code>
                <br />
                <strong>Problems he faced:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>
                    When <strong>Tuhina</strong> moved to a new class, he had to
                    update multiple files manually — leading to inconsistencies.
                  </li>
                  <li>
                    Two teachers tried to update marks at the same time, and
                    one file was corrupted.
                  </li>
                  <li>
                    Searching for "all students who scored above 80" required
                    writing custom scripts.
                  </li>
                </ul>
                <strong>Solution:</strong> Migrating to a database system:
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>
                    <strong>Integrity:</strong> Foreign keys ensure that marks
                    are always linked to valid students and courses.
                  </li>
                  <li>
                    <strong>Concurrency:</strong> Transactions handle multiple
                    updates safely.
                  </li>
                  <li>
                    <strong>Querying:</strong> A simple SQL query finds top
                    students instantly.
                  </li>
                </ul>
                The database transformed the school's operations.
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
                  <strong>Choose wisely:</strong> Don't use a database for
                  simple, single-user applications where a file would suffice.
                  But for multi-user, data-intensive systems, always choose a
                  database.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Start with a database if you expect growth:</strong>
                  Even small projects often become complex over time. Planning
                  for a database from the start saves migration headaches.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use files for import/export:</strong> Even in database
                  systems, files (CSV, JSON) are useful for bulk data loading
                  and reporting.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Understand the limitations:</strong> Know the
                  weaknesses of your chosen approach. If using files, be aware
                  of concurrency issues. If using databases, be aware of
                  operational complexity.
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
                  <strong>Using files for multi-user applications:</strong> File
                  locking and manual concurrency control are error-prone and
                  inefficient.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Assuming a database is always better:</strong> For
                  simple, read-only data, a file can be faster and simpler.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not planning for data growth:</strong> Starting with
                  files and migrating later is painful. Think ahead.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring data integrity:</strong> Even with a database,
                  if you don't use constraints, you'll have the same problems as
                  a file system.
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
                  <strong>Evaluate your needs:</strong> Consider data volume,
                  number of users, concurrency, security, and query complexity
                  before choosing between files and databases.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Design for the future:</strong> Even if you start with
                  files, design your data structure so that migration to a
                  database is easier later.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use the right tool for the right job:</strong>
                  Consider hybrid approaches — e.g., using a database for
                  structured data and files for large blobs (images, videos).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Learn both:</strong> Understanding file systems and
                  databases makes you a more versatile developer.
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
                <span>I understand the key differences between file and database systems</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can list the advantages of databases over file systems</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know when a file system is still appropriate</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the importance of data integrity and concurrency</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can make informed decisions about storage choices</span>
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
            title="File System vs Database System – FAQs"
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
            title="Traditional File System vs Database System"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_note.txt"
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
              "The file system vs database debate is one of the most practical " +
              "decisions in software design. I've seen students build impressive " +
              "applications using files, only to hit a wall when they needed to " +
              "scale or add concurrency. The key insight is that a database is " +
              "not just a fancy file — it's a different way of thinking about data. " +
              "Files are about storing, databases are about managing. I always " +
              "tell my students: 'If you need to search, sort, relate, or secure " +
              "your data, you probably need a database.' Understanding this " +
              "trade-off early saves years of pain."
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
            Topic 4 · Traditional File System vs Database System · Built with ❤️
            for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic4;