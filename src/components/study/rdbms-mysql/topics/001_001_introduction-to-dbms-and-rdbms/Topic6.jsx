import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6 – What is DBMS?
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Define a Database Management System (DBMS), explain its
 *          key components, and discuss its role in modern information
 *          systems. Builds on previous topics (databases, file system
 *          problems).
 */
const Topic6 = () => {
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

        .component-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .component-card:hover {
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
            Module 1 · Topic 6
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            What is <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              DBMS?
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The software that manages data — the bridge between users, applications,
            and the physical database.
          </p>
        </div>

        {/* ─── SVG: DBMS Architecture ───────────────────────── */}
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
              viewBox="0 0 600 190"
              className="w-full h-auto"
              role="img"
              aria-label="DBMS architecture layered diagram"
            >
              <rect width="600" height="190" rx="12" fill="transparent" />

              {/* Top: Users */}
              <rect x="50" y="10" width="500" height="30" rx="8" fill="#3b82f6" opacity="0.12" className="dark:fill-blue-400 dark:opacity-15" />
              <text x="300" y="30" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">👤 Users / Applications</text>

              {/* Arrow down */}
              <line x1="300" y1="40" x2="300" y2="55" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="295,50 305,50 300,58" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Middle: DBMS */}
              <rect x="50" y="58" width="500" height="50" rx="8" fill="#8b5cf6" opacity="0.15" className="dark:fill-purple-400 dark:opacity-20 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="300" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🗄️ Database Management System (DBMS)</text>
              <text x="300" y="98" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">SQL Interface · Query Optimizer · Transaction Manager · Security</text>

              {/* Arrow down */}
              <line x1="300" y1="108" x2="300" y2="123" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="295,118 305,118 300,126" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Bottom: Database */}
              <rect x="150" y="126" width="300" height="45" rx="8" fill="#10b981" opacity="0.12" className="dark:fill-emerald-400 dark:opacity-15 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" />
              <text x="300" y="148" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📦 Database (Data Files)</text>
              <text x="300" y="165" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Tables · Indexes · Views · Logs</text>
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
              What is a DBMS?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-purple-600 dark:text-purple-400">
                Database Management System (DBMS)
              </strong>{" "}
              is a software system that enables users to define, create, maintain,
              and control access to databases. It acts as an intermediary between
              the users and the physical database files, providing a systematic
              way to manage data.
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
                  Key Functions:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Data definition (schema creation)</li>
                  <li>Data manipulation (CRUD operations)</li>
                  <li>Data security and integrity</li>
                  <li>Concurrency and transaction management</li>
                  <li>Backup and recovery</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-purple-50/60 p-3",
                  "dark:bg-purple-900/20"
                )}
              >
                <span className="font-semibold text-purple-700 dark:text-purple-300">
                  Analogy:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  Think of the DBMS as a librarian. The librarian doesn't create
                  the books (data), but organises them, helps you find them,
                  ensures they're secure, and manages who can access them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Components of a DBMS ──────────────────────────── */}
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
              <span className="text-2xl">🧩</span>
              Components of a DBMS
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "📐",
                  name: "DDL Compiler",
                  desc: "Processes Data Definition Language (CREATE, ALTER, DROP) to define database schema.",
                },
                {
                  icon: "🔍",
                  name: "Query Processor",
                  desc: "Parses and optimises SQL queries, generating efficient execution plans.",
                },
                {
                  icon: "📊",
                  name: "Query Optimizer",
                  desc: "Finds the most efficient way to execute a query using indexes and statistics.",
                },
                {
                  icon: "📝",
                  name: "Transaction Manager",
                  desc: "Ensures ACID properties and handles concurrent transactions.",
                },
                {
                  icon: "💾",
                  name: "Storage Manager",
                  desc: "Manages physical storage, file I/O, and buffer management.",
                },
                {
                  icon: "🔒",
                  name: "Security Manager",
                  desc: "Controls user access, authentication, and authorisation.",
                },
              ].map((comp, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "component-card rounded-xl border border-slate-200/50 p-4",
                    "dark:border-slate-700/50",
                    "bg-slate-50/40 dark:bg-slate-800/20",
                    "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                  )}
                  style={{ animationDelay: `${idx * 50 + 300}ms` }}
                >
                  <div className="text-2xl">{comp.icon}</div>
                  <h3
                    className={clsx(
                      "mt-1 font-bold text-slate-800",
                      "dark:text-slate-200"
                    )}
                  >
                    {comp.name}
                  </h3>
                  <p
                    className={clsx(
                      "mt-1 leading-relaxed text-slate-600",
                      "dark:text-slate-400"
                    )}
                  >
                    {comp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Types of DBMS ──────────────────────────────────── */}
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
              <span className="text-2xl">🏷️</span>
              Types of DBMS
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
                  Relational DBMS (RDBMS)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Data organised in tables with rows and columns</li>
                  <li>Enforces relationships via foreign keys</li>
                  <li>Uses SQL for queries</li>
                  <li>Examples: MySQL, PostgreSQL, Oracle</li>
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
                  NoSQL DBMS
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Non-relational, flexible schemas</li>
                  <li>Document (MongoDB), Key-value (Redis), Graph (Neo4j)</li>
                  <li>Horizontal scaling and high performance</li>
                  <li>Examples: MongoDB, Cassandra, Redis</li>
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
                  Object-Oriented DBMS
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Integrates object-oriented programming concepts</li>
                  <li>Supports complex data types (objects, inheritance)</li>
                  <li>Examples: ObjectDB, db4o</li>
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
                  Cloud DBMS
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Hosted on cloud platforms</li>
                  <li>Managed service with automatic scaling and backups</li>
                  <li>Examples: Amazon RDS, Azure SQL, Google Cloud Spanner</li>
                </ul>
              </div>
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
              Real-World Example: E-Commerce with MySQL
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
                <strong>Swadeep</strong> runs an online store in{" "}
                <strong>Barrackpore</strong>. His website uses a DBMS (MySQL)
                to manage:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Product catalog:</strong> Thousands of products with
                    descriptions, prices, and stock levels.
                  </li>
                  <li>
                    <strong>Customer data:</strong> Names, addresses, order
                    histories, and preferences.
                  </li>
                  <li>
                    <strong>Orders:</strong> Each order links customers, products,
                    and payment details.
                  </li>
                  <li>
                    <strong>Inventory:</strong> Real-time stock updates as
                    orders are placed.
                  </li>
                </ul>
                <strong>The DBMS handles:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Concurrency:</strong> Hundreds of customers shop
                    simultaneously without data corruption.
                  </li>
                  <li>
                    <strong>Transactions:</strong> When a customer buys a product,
                    the stock is reduced and order is created atomically.
                  </li>
                  <li>
                    <strong>Security:</strong> Customer data is protected with
                    encryption and access controls.
                  </li>
                  <li>
                    <strong>Backup:</strong> Daily automated backups prevent data
                    loss.
                  </li>
                </ul>
                Without a DBMS, managing this would be impossible.
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
                  <strong>Choose the right DBMS for your needs:</strong>
                  Evaluate your data structure, scalability requirements, and
                  team expertise before selecting a DBMS.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Understand the ACID properties:</strong> For
                  transactional systems, ACID compliance is crucial.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Leverage the DBMS's features:</strong> Use built-in
                  features like views, stored procedures, and triggers to
                  encapsulate business logic.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Monitor performance:</strong> Regularly check query
                  execution plans and system resources to ensure optimal
                  performance.
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
                  <strong>Choosing the wrong DBMS:</strong> Using a relational
                  database for unstructured data or a NoSQL database for complex
                  transactions leads to problems.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Neglecting indexing:</strong> Without proper indexes,
                  queries become slow as data grows.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring security:</strong> Default passwords and weak
                  access controls are common security holes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not planning for backup:</strong> Without proper backup
                  and recovery strategies, data loss can be catastrophic.
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
                  <strong>Design your schema carefully:</strong> Think about
                  normalization, data types, and relationships before creating
                  tables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use transactions for data integrity:</strong> Group
                  related operations into transactions to ensure atomicity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Implement security best practices:</strong> Use strong
                  passwords, least-privilege access, and encryption.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Monitor and tune regularly:</strong> Use the DBMS's
                  performance tools to identify and fix bottlenecks.
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
                <span>I can define a DBMS and explain its purpose</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can list the key components of a DBMS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the different types of DBMS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the functions of a DBMS (DDL, DML, etc.)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices in DBMS usage</span>
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
            title="What is DBMS? – FAQs"
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
              "The DBMS is the heart of any data-driven application. I've seen " +
              "students think it's just a fancy file manager, but it's much more. " +
              "A good DBMS handles concurrency, security, and integrity, which are " +
              "difficult to implement correctly from scratch. When choosing a DBMS, " +
              "consider not just the features but also the ecosystem: community " +
              "support, tools, and documentation. Also, remember that the DBMS is " +
              "not a silver bullet — it needs to be designed and configured properly. " +
              "I always recommend starting with a relational DBMS like MySQL or " +
              "PostgreSQL to learn the fundamentals before exploring NoSQL or " +
              "specialised systems."
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
            Topic 6 · What is DBMS? · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic6;