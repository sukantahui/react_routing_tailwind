import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7 – Features of DBMS
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the essential features that make a DBMS powerful:
 *          data storage, query language, security, integrity, concurrency,
 *          backup, and more. Builds on Topic 6 (What is DBMS?).
 */
const Topic7 = () => {
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

  // ─── Features Data ────────────────────────────────────────
  const features = [
    {
      icon: "🗂️",
      title: "Data Storage and Retrieval",
      desc: "Provides efficient, structured storage and fast retrieval of data using indexing and query optimisation.",
      detail: "Stores data in tables with rows and columns. Retrieves data using SQL queries with optimised execution plans.",
      color: "blue",
    },
    {
      icon: "📝",
      title: "Query Language (SQL)",
      desc: "Offers a declarative query language (SQL) for data definition, manipulation, and querying.",
      detail: "Supports DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE, SELECT), DCL (GRANT, REVOKE).",
      color: "indigo",
    },
    {
      icon: "🔒",
      title: "Security and Access Control",
      desc: "Provides authentication, authorisation, and encryption to protect data from unauthorised access.",
      detail: "Role-based access control, user management, and data encryption at rest and in transit.",
      color: "red",
    },
    {
      icon: "⚖️",
      title: "Data Integrity",
      desc: "Enforces business rules and data consistency through constraints and validation.",
      detail: "Primary key, foreign key, unique, check constraints, and triggers enforce data correctness.",
      color: "emerald",
    },
    {
      icon: "👥",
      title: "Concurrency Control",
      desc: "Allows multiple users to access and modify data simultaneously without corruption.",
      detail: "Uses locking, isolation levels, and MVCC to manage concurrent transactions safely.",
      color: "purple",
    },
    {
      icon: "📋",
      title: "Transaction Management",
      desc: "Ensures ACID properties (Atomicity, Consistency, Isolation, Durability) for reliable operations.",
      detail: "Supports commit and rollback operations to maintain data consistency.",
      color: "amber",
    },
    {
      icon: "💾",
      title: "Backup and Recovery",
      desc: "Provides automated backup and point-in-time recovery to prevent data loss.",
      detail: "Full backups, incremental backups, and transaction logs for disaster recovery.",
      color: "cyan",
    },
    {
      icon: "📊",
      title: "Data Independence",
      desc: "Separates logical schema from physical storage, allowing changes without affecting applications.",
      detail: "Physical data independence (storage changes) and logical data independence (schema changes).",
      color: "teal",
    },
    {
      icon: "🔗",
      title: "Relationship Management",
      desc: "Supports complex relationships between entities using foreign keys and joins.",
      detail: "One-to-one, one-to-many, and many-to-many relationships between tables.",
      color: "pink",
    },
    {
      icon: "📈",
      title: "Scalability",
      desc: "Supports growing data volumes and user loads through vertical and horizontal scaling.",
      detail: "Partitioning, sharding, replication, and clustering for performance at scale.",
      color: "orange",
    },
    {
      icon: "📐",
      title: "Schema Management",
      desc: "Provides tools to define, modify, and manage database schemas with minimal disruption.",
      detail: "DDL statements, schema versioning, and online schema changes.",
      color: "rose",
    },
    {
      icon: "📊",
      title: "Performance Monitoring",
      desc: "Offers tools for monitoring query performance, resource usage, and system health.",
      detail: "Query execution plans, slow query logs, and performance dashboards.",
      color: "slate",
    },
  ];

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

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .feature-card:hover {
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
            Module 1 · Topic 7
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Features
            </span>
            <br className="sm:hidden" />
            of DBMS
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The powerful capabilities that make DBMS the cornerstone of modern
            data management.
          </p>
        </div>

        {/* ─── SVG: Feature Showcase ────────────────────────── */}
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
              viewBox="0 0 600 170"
              className="w-full h-auto"
              role="img"
              aria-label="DBMS feature icons"
            >
              <rect width="600" height="170" rx="12" fill="transparent" />

              {/* Feature icons in a grid */}
              <rect x="30" y="10" width="120" height="120" rx="10" fill="#3b82f6" opacity="0.06" className="dark:fill-blue-400 dark:opacity-10" />
              <text x="90" y="55" textAnchor="middle" fontSize="28">🗂️</text>
              <text x="90" y="80" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Storage</text>
              <text x="90" y="95" textAnchor="middle" fontSize="8" fill="#64748b" className="dark:fill-slate-500">Efficient</text>

              <rect x="160" y="10" width="120" height="120" rx="10" fill="#8b5cf6" opacity="0.06" className="dark:fill-purple-400 dark:opacity-10" />
              <text x="220" y="55" textAnchor="middle" fontSize="28">📝</text>
              <text x="220" y="80" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">SQL</text>
              <text x="220" y="95" textAnchor="middle" fontSize="8" fill="#64748b" className="dark:fill-slate-500">Query</text>

              <rect x="290" y="10" width="120" height="120" rx="10" fill="#ef4444" opacity="0.06" className="dark:fill-red-400 dark:opacity-10" />
              <text x="350" y="55" textAnchor="middle" fontSize="28">🔒</text>
              <text x="350" y="80" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Security</text>
              <text x="350" y="95" textAnchor="middle" fontSize="8" fill="#64748b" className="dark:fill-slate-500">Access</text>

              <rect x="420" y="10" width="120" height="120" rx="10" fill="#10b981" opacity="0.06" className="dark:fill-emerald-400 dark:opacity-10" />
              <text x="480" y="55" textAnchor="middle" fontSize="28">⚖️</text>
              <text x="480" y="80" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Integrity</text>
              <text x="480" y="95" textAnchor="middle" fontSize="8" fill="#64748b" className="dark:fill-slate-500">Constraints</text>

              <text x="300" y="155" textAnchor="middle" fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">
                + Concurrency · Transactions · Backup · Scalability · Independence
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
              What Makes a DBMS Powerful?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-purple-600 dark:text-purple-400">DBMS</strong>{" "}
              is more than just a data store. It provides a comprehensive set of
              <strong> features</strong> that address the problems of file-based
              systems and enable efficient, reliable, and secure data management.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                The features of a DBMS are not just nice-to-have — they are
                essential for any professional application that manages data.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Features Grid ─────────────────────────────────── */}
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
              <span className="text-2xl">✨</span>
              Core Features of a DBMS
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                "text-sm"
              )}
            >
              {features.map((feature, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  cyan: "border-cyan-200/50 bg-cyan-50/40 dark:border-cyan-700/50 dark:bg-cyan-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                  pink: "border-pink-200/50 bg-pink-50/40 dark:border-pink-700/50 dark:bg-pink-900/10",
                  orange: "border-orange-200/50 bg-orange-50/40 dark:border-orange-700/50 dark:bg-orange-900/10",
                  rose: "border-rose-200/50 bg-rose-50/40 dark:border-rose-700/50 dark:bg-rose-900/10",
                  slate: "border-slate-200/50 bg-slate-50/40 dark:border-slate-700/50 dark:bg-slate-800/20",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  red: "text-red-700 dark:text-red-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  cyan: "text-cyan-700 dark:text-cyan-300",
                  teal: "text-teal-700 dark:text-teal-300",
                  pink: "text-pink-700 dark:text-pink-300",
                  orange: "text-orange-700 dark:text-orange-300",
                  rose: "text-rose-700 dark:text-rose-300",
                  slate: "text-slate-700 dark:text-slate-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "feature-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[feature.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="text-3xl">{feature.icon}</div>
                    <h3
                      className={clsx(
                        "mt-2 font-bold",
                        textColorMap[feature.color]
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={clsx(
                        "mt-1 leading-relaxed text-slate-600",
                        "dark:text-slate-400"
                      )}
                    >
                      {feature.desc}
                    </p>
                    <div
                      className={clsx(
                        "mt-2 text-xs italic text-slate-500",
                        "dark:text-slate-500"
                      )}
                    >
                      {feature.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
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
              <span className="text-2xl">🌍</span>
              Real-World Example: DBMS in Action
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
                <strong>Tuhina</strong>, the IT manager at a large bank in{" "}
                <strong>Naihati</strong>, relies on a DBMS (Oracle) for daily
                operations. Here's how DBMS features are used:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Security:</strong> Only authorised tellers can view
                    customer balances using role-based access control.
                  </li>
                  <li>
                    <strong>Concurrency:</strong> Thousands of customers access
                    their accounts simultaneously at ATMs and online — no
                    transaction is corrupted.
                  </li>
                  <li>
                    <strong>Transaction Management:</strong> When a customer
                    transfers money, the debit and credit are atomic — either
                    both succeed or both fail.
                  </li>
                  <li>
                    <strong>Backup and Recovery:</strong> The database is backed
                    up nightly. After a power outage, the DBMS recovers to the
                    last committed transaction.
                  </li>
                  <li>
                    <strong>Query Language:</strong> The fraud detection team
                    uses SQL to quickly find suspicious transactions.
                  </li>
                </ul>
                Without these DBMS features, banking would be impossible.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "500ms" }}
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
                  <strong>Use features to your advantage:</strong> Don't
                  reimplement features the DBMS already provides (security,
                  integrity, transactions). It's safer and more efficient.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Understand your DBMS's feature set:</strong> Different
                  DBMS offer different features. Know what your DBMS supports
                  and how to leverage it.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use constraints for integrity:</strong> Define primary
                  keys, foreign keys, and check constraints at the database
                  level for automatic enforcement.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Monitor concurrency:</strong> Use appropriate isolation
                  levels to balance consistency and performance.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "600ms" }}
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
                  <strong>Not using available features:</strong> Some developers
                  implement their own security, integrity, or concurrency
                  controls, duplicating DBMS features.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring transaction isolation:</strong> Using the
                  default isolation level without understanding its implications
                  can lead to performance or consistency issues.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overlooking backup features:</strong> Not using the
                  DBMS's built-in backup and recovery tools is a common mistake.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Underestimating security:</strong> Using default
                  passwords or not enabling encryption leaves data vulnerable.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "700ms" }}
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
                  <strong>Leverage the DBMS fully:</strong> Use constraints,
                  triggers, views, and stored procedures to implement business
                  logic at the database level.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use appropriate isolation levels:</strong> Choose the
                  right isolation level for each transaction type to balance
                  consistency and performance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Enable comprehensive logging:</strong> Use the DBMS's
                  audit and logging features to track data access and changes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Test backup and recovery:</strong> Regularly test your
                  backup and recovery procedures to ensure they work when needed.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
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
                <span>I can list at least 8 features of a DBMS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand why security is a critical feature</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the importance of concurrency control</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the ACID properties in transaction management</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the role of backup and recovery</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for using DBMS features</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "900ms" }}
        >
          <FAQTemplate
            title="Features of DBMS – FAQs"
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
          style={{ animationDelay: "1000ms" }}
        >
          <Teacher
            note={
              "The features of a DBMS are what make it so powerful, but they're " +
              "also what make it complex. I always tell students: 'You don't need " +
              "to use every feature, but you should know they exist.' The key is " +
              "to understand the problems each feature solves, so you know when " +
              "to use them. For example, if you have multiple users, you need " +
              "concurrency control. If you have sensitive data, you need security. " +
              "If you have critical operations, you need transactions. This " +
              "problem-first approach will help you design better database systems."
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
            Topic 7 · Features of DBMS · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic7;