import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";

/**
 * Topic13 – DBMS vs RDBMS
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Compare and contrast Database Management Systems (DBMS) and
 *          Relational Database Management Systems (RDBMS), highlighting
 *          the key differences, advantages, and use cases of each.
 *          Builds on Topics 6 (DBMS) and 12 (RDBMS).
 */
const Topic13 = () => {
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

        .comparison-row:hover {
          background-color: rgba(59, 130, 246, 0.05);
        }
        .dark .comparison-row:hover {
          background-color: rgba(59, 130, 246, 0.1);
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
            Module 1 · Topic 13
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              DBMS
            </span>
            <span className="text-slate-600 dark:text-slate-400"> vs </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              RDBMS
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Understanding the evolution from general database systems to the
            relational model — and why it matters.
          </p>
        </div>

        {/* ─── SVG: DBMS vs RDBMS ──────────────────────────── */}
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
              viewBox="0 0 600 180"
              className="w-full h-auto"
              role="img"
              aria-label="DBMS vs RDBMS comparison"
            >
              <rect width="600" height="180" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                ⚖️ DBMS vs RDBMS
              </text>

              {/* DBMS side */}
              <rect x="20" y="40" width="260" height="120" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12" stroke="#8b5cf6" strokeWidth="1.5" className="dark:stroke-purple-400" />
              <text x="150" y="65" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🗄️ DBMS</text>
              <text x="150" y="85" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">General-purpose</text>
              <text x="150" y="100" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">No relationships</text>
              <text x="150" y="115" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">No constraints</text>
              <text x="150" y="130" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Older systems</text>
              <text x="150" y="145" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">File-based</text>

              {/* RDBMS side */}
              <rect x="320" y="40" width="260" height="120" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" stroke="#3b82f6" strokeWidth="1.5" className="dark:stroke-blue-400" />
              <text x="450" y="65" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📊 RDBMS</text>
              <text x="450" y="85" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Relational</text>
              <text x="450" y="100" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Foreign keys</text>
              <text x="450" y="115" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Integrity constraints</text>
              <text x="450" y="130" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">SQL standard</text>
              <text x="450" y="145" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">ACID transactions</text>

              {/* VS text */}
              <rect x="270" y="80" width="60" height="40" rx="10" fill="#f59e0b" opacity="0.2" className="dark:fill-amber-400 dark:opacity-25" />
              <text x="300" y="106" textAnchor="middle" fontSize="16" fontWeight="800" fill="#1e293b" className="dark:fill-slate-200">VS</text>
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
              DBMS vs RDBMS: The Big Picture
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              While both <strong className="text-purple-600 dark:text-purple-400">DBMS</strong>{" "}
              and <strong className="text-blue-600 dark:text-blue-400">RDBMS</strong>{" "}
              manage data, they are <strong>not the same</strong>. The key
              distinction lies in the <strong>relational model</strong> — RDBMS
              is a specialised type of DBMS that follows E.F. Codd's relational
              rules, offering features like relationships, integrity constraints,
              and standard SQL.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-amber-50/40 p-4",
                "dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-amber-600 dark:text-amber-400">Key Insight:</span>{" "}
                All RDBMS are DBMS, but not all DBMS are RDBMS. Understanding
                this difference is crucial for choosing the right system for
                your application.
              </p>
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
              Detailed Comparison
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
                        "px-4 py-3 font-semibold text-purple-600",
                        "dark:text-purple-400"
                      )}
                    >
                      DBMS
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-blue-600",
                        "dark:text-blue-400"
                      )}
                    >
                      RDBMS
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={clsx(
                    "divide-y divide-slate-200/60",
                    "dark:divide-slate-700/60"
                  )}
                >
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Definition</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Software that manages databases</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">DBMS based on relational model</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Data Model</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Hierarchical, network, or file-based</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Relational (tables, rows, columns)</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Relationships</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Not enforced; implicit</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Enforced via foreign keys</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Constraints</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Minimal or none</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Rich constraints (PK, FK, CHECK, UNIQUE)</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Query Language</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Proprietary or no standard</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">SQL (Structured Query Language)</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">ACID Compliance</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Limited or none</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Full ACID support</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Data Integrity</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Application-level only</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Enforced at database level</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Normalisation</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Not supported</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Supported and encouraged</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Examples</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">IMS, IDMS, file-based systems</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">MySQL, PostgreSQL, Oracle, SQL Server</td>
                  </tr>
                  <tr className="comparison-row transition-colors">
                    <td className="px-4 py-3 font-medium">Use Cases</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Legacy systems, simple applications</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Most modern applications</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Why RDBMS is Preferred ───────────────────────── */}
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
              Why RDBMS is the Preferred Choice
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
                  <strong>Data Integrity:</strong> RDBMS enforces constraints
                  at the database level, ensuring data accuracy and consistency
                  without relying on application code.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Relationships:</strong> Foreign keys allow complex
                  data relationships (one-to-many, many-to-many) to be defined
                  and enforced, reducing redundancy.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Standard Query Language:</strong> SQL is a universal
                  language for querying, making it easier to learn, use, and
                  integrate with applications.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>ACID Transactions:</strong> RDBMS guarantees that
                  transactions are atomic, consistent, isolated, and durable,
                  which is critical for financial and business applications.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Normalisation:</strong> RDBMS supports normalisation,
                  reducing data redundancy and improving data quality.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Maturity:</strong> RDBMS has been refined over decades,
                  with robust features for security, performance, and scalability.
                </span>
              </li>
            </ul>
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
              Real-World Example: Choosing the Right System
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
                <strong>Susmita</strong>, a software architect in{" "}
                <strong>Ichapur</strong>, is designing two systems:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>System A: Hospital Patient Records</strong> —
                    Requires complex relationships between patients, doctors,
                    treatments, and billing. Must ensure data integrity and
                    ACID compliance. <br />
                    <span className="text-blue-600 dark:text-blue-400">
                      ✅ Chooses RDBMS (PostgreSQL)
                    </span>
                  </li>
                  <li>
                    <strong>System B: Simple Configuration Manager</strong> —
                    Stores key-value pairs for application settings. No
                    relationships needed; single-user access. <br />
                    <span className="text-purple-600 dark:text-purple-400">
                      ✅ Chooses a simple file-based DBMS (like SQLite or a
                      JSON file)
                    </span>
                  </li>
                </ul>
                <strong>Lesson:</strong> The choice between DBMS and RDBMS
                depends on the application's requirements. RDBMS is not always
                necessary, but for complex, multi-user, and transactional
                systems, it's the clear winner.
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
                  <strong>Don't confuse DBMS and RDBMS:</strong> Remember, RDBMS
                  is a subset of DBMS. Not all DBMS are relational.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Choose RDBMS for most modern applications:</strong>
                  Unless you have a simple, single-user, or legacy use case,
                  RDBMS is the better choice.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Learn SQL thoroughly:</strong> SQL is the language of
                  RDBMS and a critical skill for any developer or data
                  professional.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Understand normalisation:</strong> Normalisation is a
                  key advantage of RDBMS; learn it to design efficient databases.
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
                  <strong>Using the terms interchangeably:</strong> DBMS and
                  RDBMS are different. Using them as synonyms is a common
                  mistake.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Assuming all DBMS are relational:</strong> Some DBMS
                  (like IMS) are hierarchical and not relational.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overlooking ACID requirements:</strong> For transactional
                  applications, choosing a non-ACID DBMS can lead to data
                  inconsistencies.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not enforcing relationships:</strong> Even in RDBMS,
                  failing to define foreign keys means missing out on key benefits.
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
                  <strong>Understand requirements before choosing:</strong>
                  Evaluate data model, consistency needs, scalability, and
                  team expertise.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Prefer RDBMS for new projects:</strong> Unless you
                  have a compelling reason not to, RDBMS is the standard for
                  most applications.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use foreign keys and constraints:</strong> Leverage
                  the full power of RDBMS by defining relationships and
                  integrity rules.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Normalise your data:</strong> Apply normalisation to
                  reduce redundancy and improve maintainability.
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
                <span>I can distinguish between DBMS and RDBMS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the key differences (relationships, constraints, SQL, ACID)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know why RDBMS is preferred for most applications</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify use cases for non-relational DBMS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can avoid common pitfalls in choosing between them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for selecting the right system</span>
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
            title="DBMS vs RDBMS – FAQs"
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
              "I've seen many students use DBMS and RDBMS interchangeably, but " +
              "they are different. The relational model is a paradigm shift — it " +
              "introduced the idea of data independence, set-based queries, and " +
              "integrity constraints. Understanding this distinction is critical " +
              "for database design. The next time you hear 'DBMS', ask yourself: " +
              "Is it relational? If so, it's an RDBMS. If not, what type is it? " +
              "This question will guide you to the right technology for your project."
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
            Topic 13 · DBMS vs RDBMS · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic13;