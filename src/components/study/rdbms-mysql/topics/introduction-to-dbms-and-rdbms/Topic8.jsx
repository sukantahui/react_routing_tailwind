import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8 – Advantages of DBMS
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the numerous benefits of using a DBMS over traditional
 *          file-based systems, including data independence, security,
 *          integrity, concurrency, backup, and more. Builds on Topics 6 & 7.
 */
const Topic8 = () => {
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

  // ─── Advantages Data ──────────────────────────────────────
  const advantages = [
    {
      icon: "🔒",
      title: "Data Security",
      desc: "Provides robust security mechanisms including authentication, authorisation, and encryption to protect sensitive data.",
      detail: "Users have unique credentials, roles, and permissions. Data is encrypted at rest and in transit.",
      color: "red",
    },
    {
      icon: "⚖️",
      title: "Data Integrity",
      desc: "Enforces business rules and constraints to ensure data accuracy, consistency, and validity.",
      detail: "Primary keys, foreign keys, unique constraints, and check constraints prevent invalid data entry.",
      color: "emerald",
    },
    {
      icon: "👥",
      title: "Concurrency Control",
      desc: "Allows multiple users to access and modify data simultaneously without conflicts or data corruption.",
      detail: "Uses locking, isolation levels, and MVCC to manage concurrent transactions safely.",
      color: "purple",
    },
    {
      icon: "🔄",
      title: "Transaction Management",
      desc: "Supports ACID transactions, ensuring reliable and atomic operations even in the presence of failures.",
      detail: "Commit and rollback operations maintain data consistency. All-or-nothing execution.",
      color: "amber",
    },
    {
      icon: "💾",
      title: "Backup and Recovery",
      desc: "Provides automated backup and point-in-time recovery to protect data from loss and corruption.",
      detail: "Full backups, incremental backups, and transaction logs enable recovery to any point in time.",
      color: "cyan",
    },
    {
      icon: "📐",
      title: "Data Independence",
      desc: "Separates logical schema from physical storage, allowing changes without affecting applications.",
      detail: "Physical independence: storage changes don't break apps. Logical independence: schema changes are isolated.",
      color: "indigo",
    },
    {
      icon: "🗂️",
      title: "Reduced Data Redundancy",
      desc: "Minimises duplicate data through normalisation, saving storage and reducing inconsistency.",
      detail: "Data is stored once and referenced via relationships, eliminating unnecessary copies.",
      color: "blue",
    },
    {
      icon: "✅",
      title: "Data Consistency",
      desc: "Ensures data is uniform across the entire system, avoiding conflicting values.",
      detail: "Constraints and transactions enforce consistency. Updates are propagated to all relevant places.",
      color: "teal",
    },
    {
      icon: "📊",
      title: "Powerful Querying",
      desc: "Provides a declarative query language (SQL) for complex data retrieval and analysis.",
      detail: "Supports joins, aggregations, subqueries, and set operations for sophisticated queries.",
      color: "blue",
    },
    {
      icon: "📈",
      title: "Scalability",
      desc: "Supports growing data volumes and user loads through vertical and horizontal scaling.",
      detail: "Partitioning, sharding, replication, and clustering enable handling large-scale applications.",
      color: "orange",
    },
    {
      icon: "🔗",
      title: "Data Relationships",
      desc: "Enables definition and enforcement of relationships between entities (foreign keys).",
      detail: "One-to-one, one-to-many, and many-to-many relationships are easily represented and queried.",
      color: "pink",
    },
    {
      icon: "⏰",
      title: "Reduced Maintenance",
      desc: "Automates routine tasks like backups, indexing, and statistics updates, lowering administrative overhead.",
      detail: "Built-in scheduling, self-tuning, and monitoring reduce the burden on DBAs.",
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

        .advantage-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .advantage-card:hover {
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
            Module 1 · Topic 8
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Advantages
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
            Why every organisation should use a DBMS — the transformative
            benefits that make modern data management possible.
          </p>
        </div>

        {/* ─── SVG: Advantages Showcase ────────────────────── */}
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
              aria-label="DBMS advantages icons"
            >
              <rect width="600" height="180" rx="12" fill="transparent" />

              {/* Advantage icons in a row */}
              <rect x="20" y="20" width="120" height="120" rx="12" fill="#10b981" opacity="0.06" className="dark:fill-emerald-400 dark:opacity-10" />
              <text x="80" y="70" textAnchor="middle" fontSize="32">🔒</text>
              <text x="80" y="100" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Security</text>

              <rect x="160" y="20" width="120" height="120" rx="12" fill="#8b5cf6" opacity="0.06" className="dark:fill-purple-400 dark:opacity-10" />
              <text x="220" y="70" textAnchor="middle" fontSize="32">⚖️</text>
              <text x="220" y="100" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Integrity</text>

              <rect x="300" y="20" width="120" height="120" rx="12" fill="#3b82f6" opacity="0.06" className="dark:fill-blue-400 dark:opacity-10" />
              <text x="360" y="70" textAnchor="middle" fontSize="32">👥</text>
              <text x="360" y="100" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Concurrency</text>

              <rect x="440" y="20" width="120" height="120" rx="12" fill="#f59e0b" opacity="0.06" className="dark:fill-amber-400 dark:opacity-10" />
              <text x="500" y="70" textAnchor="middle" fontSize="32">💾</text>
              <text x="500" y="100" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Recovery</text>

              <text x="300" y="165" textAnchor="middle" fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">
                + Data Independence · Reduced Redundancy · Consistency · Scalability · Querying
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
              Why DBMS is a Game-Changer
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">DBMS</strong>{" "}
              offers a multitude of advantages over traditional file-based systems.
              These benefits are not just technical improvements — they translate
              to real business value: better decision-making, reduced costs,
              improved security, and increased agility.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-emerald-50/40 p-4",
                "dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Key Insight:</span>{" "}
                The advantages of DBMS are so significant that they justify the
                upfront costs and complexity. They are essential for any
                professional data-driven application.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Advantages Grid ───────────────────────────────── */}
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
              Key Advantages of Using a DBMS
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                "text-sm"
              )}
            >
              {advantages.map((adv, idx) => {
                const colorMap = {
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  cyan: "border-cyan-200/50 bg-cyan-50/40 dark:border-cyan-700/50 dark:bg-cyan-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                  orange: "border-orange-200/50 bg-orange-50/40 dark:border-orange-700/50 dark:bg-orange-900/10",
                  pink: "border-pink-200/50 bg-pink-50/40 dark:border-pink-700/50 dark:bg-pink-900/10",
                  slate: "border-slate-200/50 bg-slate-50/40 dark:border-slate-700/50 dark:bg-slate-800/20",
                };
                const textColorMap = {
                  red: "text-red-700 dark:text-red-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  cyan: "text-cyan-700 dark:text-cyan-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  blue: "text-blue-700 dark:text-blue-300",
                  teal: "text-teal-700 dark:text-teal-300",
                  orange: "text-orange-700 dark:text-orange-300",
                  pink: "text-pink-700 dark:text-pink-300",
                  slate: "text-slate-700 dark:text-slate-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "advantage-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[adv.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="text-3xl">{adv.icon}</div>
                    <h3
                      className={clsx(
                        "mt-2 font-bold",
                        textColorMap[adv.color]
                      )}
                    >
                      {adv.title}
                    </h3>
                    <p
                      className={clsx(
                        "mt-1 leading-relaxed text-slate-600",
                        "dark:text-slate-400"
                      )}
                    >
                      {adv.desc}
                    </p>
                    <div
                      className={clsx(
                        "mt-2 text-xs italic text-slate-500",
                        "dark:text-slate-500"
                      )}
                    >
                      {adv.detail}
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
              Real-World Example: E-Commerce with DBMS
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
                <strong>Abhronila</strong> started an online store in{" "}
                <strong>Shyamnagar</strong>. She used a file system initially,
                but soon faced problems. She migrated to a DBMS (PostgreSQL)
                and experienced these advantages:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Security:</strong> Customer credit card information
                    is encrypted and accessible only to authorised staff.
                  </li>
                  <li>
                    <strong>Concurrency:</strong> During a flash sale, hundreds
                    of customers buy products simultaneously without inventory
                    conflicts.
                  </li>
                  <li>
                    <strong>Transaction Management:</strong> When a customer
                    purchases, the order is recorded and stock is reduced
                    atomically — no partial updates.
                  </li>
                  <li>
                    <strong>Backup and Recovery:</strong> After a server crash,
                    the DBMS restored all orders up to the last second before
                    the crash, preventing data loss.
                  </li>
                  <li>
                    <strong>Querying:</strong> She can run SQL queries to find
                    best-selling products, customer trends, and sales by region.
                  </li>
                  <li>
                    <strong>Scalability:</strong> As her business grows, she can
                    scale the database with replication and read replicas.
                  </li>
                </ul>
                The DBMS turned her small store into a scalable e-commerce
                platform.
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
                  <strong>Leverage all advantages:</strong> Don't just use a
                  DBMS for storage — take full advantage of its features like
                  constraints, triggers, and views to simplify your application
                  code.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Plan for disaster recovery:</strong> Use the DBMS's
                  backup and recovery features to implement a robust disaster
                  recovery plan.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use transactions for critical operations:</strong>
                  Always wrap related updates in transactions to ensure
                  consistency and integrity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Monitor performance:</strong> Use the DBMS's built-in
                  performance monitoring to identify and fix slow queries
                  before they become problems.
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
                  <strong>Underutilizing DBMS features:</strong> Many developers
                  use only basic CRUD operations and implement security,
                  integrity, and concurrency in application code, duplicating
                  DBMS capabilities.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring backup testing:</strong> Having backups is
                  not enough — you must regularly test the recovery process to
                  ensure it works.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using indexes:</strong> Without proper indexes,
                  the query performance advantage of DBMS is lost, especially
                  for large tables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overlooking isolation levels:</strong> Using the wrong
                  isolation level can lead to deadlocks or data inconsistency.
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
                  <strong>Use constraints for integrity:</strong> Define primary
                  keys, foreign keys, and check constraints at the database level
                  for automatic enforcement.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Implement proper security:</strong> Use role-based
                  access control, strong passwords, and encryption. Follow the
                  principle of least privilege.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use transactions wisely:</strong> Keep transactions
                  short and use appropriate isolation levels. Avoid long-running
                  transactions that cause locks.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Monitor and optimise:</strong> Regularly review query
                  execution plans, index usage, and system performance. Tune as
                  needed.
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
                <span>I can list at least 10 advantages of a DBMS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand why security is a critical advantage</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the importance of concurrency and transaction management</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand how DBMS reduces redundancy and ensures consistency</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can explain data independence and its benefits</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices to leverage DBMS advantages</span>
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
            title="Advantages of DBMS – FAQs"
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
              "The advantages of DBMS are not just theoretical — they translate to real-world success. I've seen startups fail because they used files and couldn't scale. I've seen enterprises transform after migrating to a proper DBMS. The key is to understand that these advantages are not automatic: they require proper design, configuration, and administration. A poorly designed database can still have redundancy and inconsistency, even with a DBMS. So, the power is in your hands. Use constraints, transactions, and security features wisely. Think of the DBMS as a partner, not a magic box."
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
            Topic 8 · Advantages of DBMS · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic8;