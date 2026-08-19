import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2 – What is a Database?
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Define a database, explain its key components, and discuss
 *          its role in modern information systems. Builds on topics
 *          0 (data/information) and 1 (data processing).
 */
const Topic2 = () => {
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
            Module 1 · Topic 2
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            What is a <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Database?
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The organised collection of data that powers modern applications
            and decision-making.
          </p>
        </div>

        {/* ─── SVG: Database Illustration ───────────────────── */}
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
              aria-label="Database representation with tables and data"
            >
              <rect width="600" height="180" rx="12" fill="transparent" />

              {/* Database icon */}
              <ellipse
                cx="130"
                cy="80"
                rx="60"
                ry="25"
                fill="#3b82f6"
                opacity="0.15"
                className="dark:fill-blue-400 dark:opacity-20"
              />
              <rect x="70" y="55" width="120" height="50" fill="#3b82f6" opacity="0.1" className="dark:fill-blue-400 dark:opacity-15" />
              <ellipse
                cx="130"
                cy="105"
                rx="60"
                ry="25"
                fill="#3b82f6"
                opacity="0.15"
                className="dark:fill-blue-400 dark:opacity-20"
              />
              <rect x="75" y="80" width="110" height="25" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="dark:stroke-blue-400" />
              <text x="130" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📦 Database</text>

              {/* Tables */}
              <rect x="220" y="40" width="130" height="30" rx="6" fill="#10b981" opacity="0.15" className="dark:fill-emerald-400 dark:opacity-20" />
              <text x="285" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Students</text>

              <rect x="220" y="80" width="130" height="30" rx="6" fill="#8b5cf6" opacity="0.15" className="dark:fill-purple-400 dark:opacity-20" />
              <text x="285" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Courses</text>

              <rect x="220" y="120" width="130" height="30" rx="6" fill="#f59e0b" opacity="0.15" className="dark:fill-amber-400 dark:opacity-20" />
              <text x="285" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Enrollments</text>

              {/* Connections between tables */}
              <line x1="190" y1="55" x2="220" y2="55" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" className="dark:stroke-slate-500" />
              <line x1="190" y1="95" x2="220" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" className="dark:stroke-slate-500" />
              <line x1="190" y1="135" x2="220" y2="135" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" className="dark:stroke-slate-500" />

              {/* Labels */}
              <text x="130" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Structured storage</text>
              <text x="400" y="60" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Tables (Relations)</text>
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
              What is a Database?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">database</strong>{" "}
              is an organised collection of structured data or information,
              typically stored electronically in a computer system. It is
              designed to store, manage, and retrieve data efficiently.
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
                  Key Points:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Organised and <strong>structured</strong> data</li>
                  <li>Managed by a <strong>Database Management System (DBMS)</strong></li>
                  <li>Supports <strong>efficient</strong> storage and retrieval</li>
                  <li>Enables <strong>concurrent</strong> access by multiple users</li>
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
                  Think of a database as a digital filing cabinet. It contains
                  drawers (tables), folders (records), and files (fields) that
                  are organised for easy access and retrieval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why We Need Databases ────────────────────────── */}
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
              <span className="text-2xl">❓</span>
              Why Do We Need Databases?
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
                  <strong>Data persistence:</strong> Databases store data
                  permanently, even after the application is closed.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Efficient retrieval:</strong> Using indexes and
                  queries, databases find data quickly even in large datasets.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Data integrity:</strong> Databases enforce rules to
                  ensure data is accurate and consistent.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Concurrency:</strong> Multiple users can access and
                  modify data simultaneously without conflict.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Security:</strong> Databases provide access controls
                  to protect sensitive data.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Components of a Database ─────────────────────── */}
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
              <span className="text-2xl">🧩</span>
              Components of a Database
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "📊",
                  name: "Tables (Entities)",
                  desc: "Collections of related data organised in rows and columns.",
                },
                {
                  icon: "📋",
                  name: "Records (Rows)",
                  desc: "Individual entries in a table, each representing a single instance.",
                },
                {
                  icon: "🏷️",
                  name: "Fields (Columns)",
                  desc: "Attributes or properties that define the data in a table.",
                },
                {
                  icon: "🔗",
                  name: "Relationships",
                  desc: "Connections between tables that link related data.",
                },
                {
                  icon: "📐",
                  name: "Schema",
                  desc: "The overall structure or blueprint of the database.",
                },
                {
                  icon: "🔑",
                  name: "Keys",
                  desc: "Special fields used to identify records and enforce relationships.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "rounded-xl border border-slate-200/50 p-4",
                    "dark:border-slate-700/50",
                    "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
                    "bg-slate-50/40 dark:bg-slate-800/20"
                  )}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <h3
                    className={clsx(
                      "mt-1 font-bold text-slate-800",
                      "dark:text-slate-200"
                    )}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={clsx(
                      "mt-1 leading-relaxed text-slate-600",
                      "dark:text-slate-400"
                    )}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
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
                <strong>Abhronila</strong>, the school administrator at{" "}
                <strong>Shyamnagar</strong> High School, manages a database that
                stores:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Students table:</strong> Columns: StudentID, Name,
                    Class, Section, Address, Phone
                  </li>
                  <li>
                    <strong>Teachers table:</strong> Columns: TeacherID, Name,
                    Subject, Qualification, Email
                  </li>
                  <li>
                    <strong>Subjects table:</strong> Columns: SubjectID, Name,
                    Class, TeacherID (to link to teachers)
                  </li>
                  <li>
                    <strong>Marks table:</strong> Columns: MarkID, StudentID,
                    SubjectID, Marks, ExamDate
                  </li>
                </ul>
                Using the database, she can:
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Generate report cards for each student</li>
                  <li>Track attendance and performance</li>
                  <li>Assign teachers to subjects</li>
                  <li>Communicate with parents</li>
                </ul>
                This database is the backbone of the school's operations.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Types of Databases ────────────────────────────── */}
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
              <span className="text-2xl">🏷️</span>
              Types of Databases
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  Relational Databases (RDBMS)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Data stored in tables with rows and columns</li>
                  <li>Relationships between tables via keys</li>
                  <li>Examples: MySQL, PostgreSQL, Oracle</li>
                  <li>Uses SQL for querying</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  NoSQL Databases
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Non-relational, flexible schemas</li>
                  <li>Document-based (MongoDB), key-value (Redis), graph (Neo4j)</li>
                  <li>Designed for scalability and big data</li>
                  <li>Handles unstructured data well</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  Cloud Databases
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Hosted on cloud platforms (AWS, Azure, GCP)</li>
                  <li>Scalable and highly available</li>
                  <li>Examples: Amazon RDS, Azure SQL, Google Cloud Spanner</li>
                  <li>Reduced maintenance overhead</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-amber-200/50 p-4",
                  "dark:border-amber-700/50",
                  "bg-amber-50/40 dark:bg-amber-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                )}
              >
                <h4 className="font-bold text-amber-700 dark:text-amber-300">
                  Specialised Databases
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Optimised for specific use cases</li>
                  <li>Examples: Spatial (PostGIS), Time-series (InfluxDB), Vector (Pinecone)</li>
                  <li>Handle specialised data types and queries</li>
                </ul>
              </div>
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
                  <strong>Design before you build:</strong> Spend time on schema
                  design. A well-designed database is easier to maintain and
                  scale.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Normalise your data:</strong> Avoid redundancy by
                  normalising data into related tables. This reduces anomalies.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use indexes wisely:</strong> Indexes speed up queries
                  but slow down writes. Index only the columns you query often.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Backup regularly:</strong> Always have a backup strategy
                  to prevent data loss.
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
                  <strong>Ignoring data types:</strong> Using incorrect data types
                  (e.g., storing numbers as text) leads to performance and
                  accuracy issues.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using primary keys:</strong> Every table should have
                  a primary key to uniquely identify records.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overlooking security:</strong> Failing to secure the
                  database with proper access controls and encryption.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not planning for growth:</strong> Designing a database
                  that doesn't scale as data volume grows.
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
                  <strong>Follow naming conventions:</strong> Use consistent,
                  descriptive names for tables and columns (e.g., `students`,
                  `student_id`).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document your schema:</strong> Maintain an up-to-date
                  ER diagram and data dictionary.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use transactions:</strong> Group related operations into
                  transactions to ensure data consistency.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Monitor performance:</strong> Regularly monitor query
                  performance and optimize slow queries.
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
                <span>I can define a database and its purpose</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand why databases are needed</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can list the components of a database</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can distinguish between different types of databases</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices in database design</span>
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
            title="What is a Database? – FAQs"
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
          style={{ animationDelay: "1200ms" }}
        >
          <Teacher
            note={
              "A database is more than just a collection of data — it's an ecosystem. " +
              "I tell my students that a database is like a well-organised library. " +
              "The books are the data, the catalogue is the schema, and the librarian " +
              "is the DBMS. The key is to design it thoughtfully from the start. " +
              "Students often think of databases as just tables, but they're also " +
              "about relationships, constraints, and performance. Always think about " +
              "how your database will be queried and updated. That insight will guide " +
              "your design decisions and save you countless hours of refactoring later."
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
            Topic 2 · What is a Database? · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic2;