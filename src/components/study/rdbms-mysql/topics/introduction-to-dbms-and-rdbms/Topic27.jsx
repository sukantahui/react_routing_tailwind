import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic27_files/topic27_questions";

/**
 * Topic27 – Features of MySQL
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the rich feature set of MySQL that makes it the
 *          world's most popular open-source RDBMS. Covers storage
 *          engines, security, performance, data types, and advanced
 *          features. Builds on Topics 25-26 (MySQL Introduction & History).
 */
const Topic27 = () => {
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
      icon: "⚡",
      title: "High Performance",
      desc: "Optimized for speed with advanced query optimization, indexing, and caching mechanisms.",
      detail: "Handles millions of queries per second with low latency.",
      color: "blue",
    },
    {
      icon: "🔒",
      title: "ACID Compliance",
      desc: "Supports Atomicity, Consistency, Isolation, and Durability through the InnoDB engine.",
      detail: "Ensures reliable transaction processing for critical applications.",
      color: "emerald",
    },
    {
      icon: "🔗",
      title: "Foreign Key Support",
      desc: "Enforces referential integrity between tables using foreign key constraints.",
      detail: "Prevents orphaned records and ensures data consistency.",
      color: "purple",
    },
    {
      icon: "🔐",
      title: "Security Features",
      desc: "Provides robust security with SSL/TLS encryption, user authentication, and role-based access.",
      detail: "Encryption at rest and in transit, auditing, and firewall.",
      color: "red",
    },
    {
      icon: "📊",
      title: "JSON Support",
      desc: "Native support for storing, indexing, and querying JSON documents.",
      detail: "Combines relational and document database features.",
      color: "amber",
    },
    {
      icon: "🔍",
      title: "Full-Text Search",
      desc: "Built-in full-text search capabilities for text-heavy applications.",
      detail: "Fast searching of large text columns with relevance ranking.",
      color: "indigo",
    },
    {
      icon: "📝",
      title: "Stored Procedures & Triggers",
      desc: "Supports stored procedures, functions, triggers, and events.",
      detail: "Encapsulates business logic at the database level.",
      color: "pink",
    },
    {
      icon: "📋",
      title: "Views",
      desc: "Virtual tables that present data from one or more tables.",
      detail: "Simplifies complex queries and provides data abstraction.",
      color: "teal",
    },
    {
      icon: "🔁",
      title: "Replication",
      desc: "Supports master-slave and master-master replication for high availability.",
      detail: "Scales read operations and provides disaster recovery.",
      color: "cyan",
    },
    {
      icon: "📈",
      title: "Scalability",
      desc: "Scales horizontally with sharding and vertically with hardware upgrades.",
      detail: "Supports large databases with billions of records.",
      color: "orange",
    },
    {
      icon: "💾",
      title: "Multiple Storage Engines",
      desc: "Pluggable storage engine architecture (InnoDB, MyISAM, Memory, etc.).",
      detail: "Choose the right engine for each use case.",
      color: "blue",
    },
    {
      icon: "🔌",
      title: "Extensibility",
      desc: "Supports user-defined functions (UDFs) and custom plugins.",
      detail: "Extend MySQL functionality with custom code.",
      color: "purple",
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
            Module 1 · Topic 27
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
            of MySQL
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The powerful features that make MySQL the most popular open-source
            database in the world.
          </p>
        </div>

        {/* ─── SVG: Features Showcase ───────────────────────── */}
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
              aria-label="MySQL features showcase"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                ✨ Key Features of MySQL
              </text>

              {/* Feature bubbles */}
              <rect x="20" y="40" width="130" height="40" rx="20" fill="#3b82f6" opacity="0.1" className="dark:fill-blue-400 dark:opacity-15" stroke="#3b82f6" strokeWidth="1.5" className="dark:stroke-blue-400" />
              <text x="85" y="65" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">⚡ High Perf</text>

              <rect x="165" y="40" width="130" height="40" rx="20" fill="#10b981" opacity="0.1" className="dark:fill-emerald-400 dark:opacity-15" stroke="#10b981" strokeWidth="1.5" className="dark:stroke-emerald-400" />
              <text x="230" y="65" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">🔒 ACID</text>

              <rect x="310" y="40" width="130" height="40" rx="20" fill="#8b5cf6" opacity="0.1" className="dark:fill-purple-400 dark:opacity-15" stroke="#8b5cf6" strokeWidth="1.5" className="dark:stroke-purple-400" />
              <text x="375" y="65" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">🔗 Foreign Keys</text>

              <rect x="455" y="40" width="130" height="40" rx="20" fill="#ef4444" opacity="0.1" className="dark:fill-red-400 dark:opacity-15" stroke="#ef4444" strokeWidth="1.5" className="dark:stroke-red-400" />
              <text x="520" y="65" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">🔐 Security</text>

              <rect x="60" y="95" width="130" height="40" rx="20" fill="#f59e0b" opacity="0.1" className="dark:fill-amber-400 dark:opacity-15" stroke="#f59e0b" strokeWidth="1.5" className="dark:stroke-amber-400" />
              <text x="125" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">📊 JSON</text>

              <rect x="205" y="95" width="130" height="40" rx="20" fill="#6366f1" opacity="0.1" className="dark:fill-indigo-400 dark:opacity-15" stroke="#6366f1" strokeWidth="1.5" className="dark:stroke-indigo-400" />
              <text x="270" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">🔍 Full-Text</text>

              <rect x="350" y="95" width="130" height="40" rx="20" fill="#ec4899" opacity="0.1" className="dark:fill-pink-400 dark:opacity-15" stroke="#ec4899" strokeWidth="1.5" className="dark:stroke-pink-400" />
              <text x="415" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">📝 Stored Proc</text>

              <rect x="120" y="150" width="130" height="40" rx="20" fill="#14b8a6" opacity="0.1" className="dark:fill-teal-400 dark:opacity-15" stroke="#14b8a6" strokeWidth="1.5" className="dark:stroke-teal-400" />
              <text x="185" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">🔁 Replication</text>

              <rect x="265" y="150" width="130" height="40" rx="20" fill="#06b6d4" opacity="0.1" className="dark:fill-cyan-400 dark:opacity-15" stroke="#06b6d4" strokeWidth="1.5" className="dark:stroke-cyan-400" />
              <text x="330" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">📈 Scalability</text>

              <rect x="410" y="150" width="130" height="40" rx="20" fill="#3b82f6" opacity="0.1" className="dark:fill-blue-400 dark:opacity-15" stroke="#3b82f6" strokeWidth="1.5" className="dark:stroke-blue-400" />
              <text x="475" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">💾 Storage</text>
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
              Why MySQL is So Powerful
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              MySQL's success is built on a rich set of features that make it
              fast, reliable, secure, and easy to use. From <strong
              className="text-blue-600 dark:text-blue-400">ACID compliance</strong>{" "}
              to <strong className="text-emerald-600 dark:text-emerald-400">JSON
              support</strong>, MySQL offers a comprehensive toolkit for modern
              application development.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                MySQL's feature set is constantly evolving. Version 8.0
                introduced window functions, CTEs, and improved JSON handling,
                making it competitive with any commercial database.
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
              Comprehensive Feature Set
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
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  pink: "border-pink-200/50 bg-pink-50/40 dark:border-pink-700/50 dark:bg-pink-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                  cyan: "border-cyan-200/50 bg-cyan-50/40 dark:border-cyan-700/50 dark:bg-cyan-900/10",
                  orange: "border-orange-200/50 bg-orange-50/40 dark:border-orange-700/50 dark:bg-orange-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  red: "text-red-700 dark:text-red-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  pink: "text-pink-700 dark:text-pink-300",
                  teal: "text-teal-700 dark:text-teal-300",
                  cyan: "text-cyan-700 dark:text-cyan-300",
                  orange: "text-orange-700 dark:text-orange-300",
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
                    <div className="text-2xl">{feature.icon}</div>
                    <h3
                      className={clsx(
                        "mt-1 font-bold",
                        textColorMap[feature.color]
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {feature.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {feature.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Storage Engines ───────────────────────────────── */}
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
              <span className="text-2xl">🔧</span>
              Storage Engine Architecture
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              MySQL's pluggable storage engine architecture is one of its most
              powerful features. It allows you to choose the best storage
              mechanism for each table based on your specific requirements.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  name: "InnoDB",
                  desc: "The default engine. Supports transactions, foreign keys, ACID compliance, and row-level locking.",
                  use: "Best for most applications.",
                  color: "blue",
                },
                {
                  name: "MyISAM",
                  desc: "Legacy engine. No transactions, table-level locking. Fast for read-heavy workloads.",
                  use: "Read-only or read-heavy applications.",
                  color: "amber",
                },
                {
                  name: "Memory (HEAP)",
                  desc: "Stores data in RAM. Extremely fast but volatile (data lost on restart).",
                  use: "Temporary tables, caching.",
                  color: "emerald",
                },
                {
                  name: "Archive",
                  desc: "Optimized for archiving. No indexes on data, but small storage footprint.",
                  use: "Historical data, audit logs.",
                  color: "purple",
                },
              ].map((engine, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]",
                      colorMap[engine.color]
                    )}
                  >
                    <h4 className={clsx("font-bold", textColorMap[engine.color])}>
                      {engine.name}
                    </h4>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {engine.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      <span className="font-semibold">Use:</span> {engine.use}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Security Features ────────────────────────────── */}
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
              <span className="text-2xl">🔐</span>
              Security Features
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              MySQL provides a comprehensive security framework to protect your
              data from unauthorised access and breaches.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-3",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-red-200/50 p-4",
                  "dark:border-red-700/50",
                  "bg-red-50/40 dark:bg-red-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-red-700 dark:text-red-300">🔑 Authentication</h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Username and password</li>
                  <li>Pluggable authentication</li>
                  <li>LDAP and PAM support</li>
                  <li>SHA-256 password hashing</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">🛡️ Authorisation</h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Privilege-based access</li>
                  <li>Role-based access control</li>
                  <li>Column-level privileges</li>
                  <li>Dynamic privileges</li>
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
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">🔒 Encryption</h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>SSL/TLS for connections</li>
                  <li>Data at rest encryption</li>
                  <li>Tablespace encryption</li>
                  <li>Key management</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Advanced Features ────────────────────────────── */}
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
              <span className="text-2xl">🚀</span>
              Advanced Features (MySQL 8.0+)
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "📊",
                  title: "Window Functions",
                  desc: "Perform calculations across rows related to the current row.",
                  example: "ROW_NUMBER(), RANK(), LAG(), LEAD()",
                },
                {
                  icon: "📝",
                  title: "Common Table Expressions (CTEs)",
                  desc: "Define temporary result sets for complex queries.",
                  example: "WITH RECURSIVE ...",
                },
                {
                  icon: "📋",
                  title: "JSON Functions",
                  desc: "Store and query JSON data efficiently.",
                  example: "JSON_EXTRACT(), JSON_ARRAY()",
                },
                {
                  icon: "🔍",
                  title: "Invisible Indexes",
                  desc: "Create indexes that are not used by the optimizer.",
                  example: "CREATE INDEX ... INVISIBLE",
                },
                {
                  icon: "📈",
                  title: "Descending Indexes",
                  desc: "Index columns in descending order.",
                  example: "CREATE INDEX ... (col DESC)",
                },
                {
                  icon: "🔄",
                  title: "Atomic DDL",
                  desc: "DDL operations are atomic and crash-safe.",
                  example: "ALTER TABLE ... (rollback on failure)",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "rounded-xl border border-slate-200/50 p-4",
                    "dark:border-slate-700/50",
                    "bg-slate-50/40 dark:bg-slate-800/20",
                    "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
                  )}
                  style={{ animationDelay: `${idx * 50 + 600}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{feature.icon}</span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    {feature.desc}
                  </p>
                  <div className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-500">
                    {feature.example}
                  </div>
                </div>
              ))}
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
              Real-World Example: Using MySQL Features
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
                <strong>Abhronila</strong>, a senior developer at a tech company
                in <strong>Barrackpore</strong>, uses MySQL features daily:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>InnoDB:</strong> All tables use InnoDB for ACID
                    compliance and foreign key support.
                  </li>
                  <li>
                    <strong>JSON:</strong> Product data with flexible attributes
                    is stored as JSON in the database.
                  </li>
                  <li>
                    <strong>Window Functions:</strong> Used for ranking products
                    by sales and calculating running totals.
                  </li>
                  <li>
                    <strong>Full-Text Search:</strong> Powers the product search
                    feature on the website.
                  </li>
                  <li>
                    <strong>Stored Procedures:</strong> Complex business logic
                    is encapsulated in stored procedures.
                  </li>
                  <li>
                    <strong>Replication:</strong> A read replica is used for
                    reporting and analytics.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> MySQL's features enable modern,
                scalable, and maintainable applications.
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
                  <strong>Use InnoDB by default:</strong> It's the most
                  feature-complete and reliable storage engine. Only use others
                  when you have a specific need.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Leverage JSON for flexibility:</strong> Use JSON
                  columns for semi-structured data to avoid creating many
                  columns or tables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use window functions for advanced analytics:</strong>
                  They make complex queries simpler and more efficient.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Enable full-text search for text-heavy data:</strong>
                  It's much faster than using LIKE with wildcards.
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
                  <strong>Using MyISAM for new projects:</strong> MyISAM lacks
                  transactions and foreign keys. InnoDB is almost always a
                  better choice.
                </strong>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using indexes properly:</strong> Without proper
                  indexes, queries on large tables will be extremely slow.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring JSON performance:</strong> While JSON is
                  useful, large JSON documents can be slow to query. Use it
                  wisely.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overusing stored procedures:</strong> While useful,
                  too many stored procedures can make maintenance difficult.
                  Balance with application code.
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
                  <strong>Use InnoDB as the default storage engine:</strong> It
                  provides ACID compliance, foreign keys, and crash recovery.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Create appropriate indexes:</strong> Index columns
                  used in WHERE, JOIN, and ORDER BY clauses to speed up queries.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use JSON for flexibility, not as a replacement for
                  proper normalisation:</strong> JSON is great for flexible
                  attributes, but don't overuse it.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Leverage MySQL 8.0 features:</strong> Use window
                  functions, CTEs, and invisible indexes to write better queries.
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
                <span>I can list at least 10 features of MySQL</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the storage engine architecture</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the difference between InnoDB and MyISAM</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand MySQL's security features</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know about JSON support and window functions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for using MySQL features</span>
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
            title="Features of MySQL – FAQs"
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
            note={
              "MySQL's features are what make it the Swiss Army knife of databases. " +
              "I tell my students: 'You don't need to know every feature, but you " +
              "should know what's available.' When you encounter a problem, you'll " +
              "remember that MySQL has a solution — like JSON for flexible data, " +
              "window functions for analytics, or full-text search for text queries. " +
              "The key is to understand the feature landscape so you can choose the " +
              "right tool for each job. Practice by building small projects that use " +
              "different features. This hands-on experience is invaluable."
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
            Topic 27 · Features of MySQL · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic27;