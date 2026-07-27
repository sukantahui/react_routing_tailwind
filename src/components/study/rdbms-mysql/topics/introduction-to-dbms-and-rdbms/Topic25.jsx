import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic25_files/topic25_questions";

/**
 * Topic25 – Introduction to MySQL
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Introduce MySQL — the world's most popular open-source relational
 *          database management system. Covers its history, features,
 *          architecture, and why it's widely used. Builds on all previous
 *          topics about databases and SQL.
 */
const Topic25 = () => {
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
            Module 1 · Topic 25
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Introduction
            </span>
            <br className="sm:hidden" />
            to MySQL
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The world's most popular open-source relational database —
            powering millions of websites and applications.
          </p>
        </div>

        {/* ─── SVG: MySQL Overview ──────────────────────────── */}
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
              aria-label="MySQL overview"
            >
              <rect width="600" height="190" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🐬 MySQL — The World's Most Popular RDBMS
              </text>

              {/* MySQL Logo Area */}
              <rect x="220" y="40" width="160" height="80" rx="12" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-400" />
              <text x="300" y="70" textAnchor="middle" fontSize="30">🐬</text>
              <text x="300" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">MySQL</text>

              {/* Features */}
              <text x="80" y="65" textAnchor="middle" fontSize="11" fill="#10b981" className="dark:fill-emerald-400">⚡ Fast</text>
              <text x="80" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">High performance</text>

              <text x="80" y="120" textAnchor="middle" fontSize="11" fill="#8b5cf6" className="dark:fill-purple-400">🔓 Open Source</text>
              <text x="80" y="140" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Community-driven</text>

              <text x="520" y="65" textAnchor="middle" fontSize="11" fill="#f59e0b" className="dark:fill-amber-400">🔒 Reliable</text>
              <text x="520" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">ACID compliant</text>

              <text x="520" y="120" textAnchor="middle" fontSize="11" fill="#ef4444" className="dark:fill-red-400">🌐 Popular</text>
              <text x="520" y="140" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Millions of users</text>

              {/* Arrows */}
              <line x1="160" y1="75" x2="220" y2="75" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="160" y1="125" x2="220" y2="100" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="440" y1="75" x2="380" y2="75" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="440" y1="125" x2="380" y2="100" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />

              <text x="300" y="180" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Powering websites like Facebook, Twitter, YouTube, and more</text>
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
              What is MySQL?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-blue-600 dark:text-blue-400">MySQL</strong>{" "}
              is the world's most popular open-source <strong>Relational
              Database Management System (RDBMS)</strong>. It is fast, reliable,
              and easy to use, making it the database of choice for web
              applications, e-commerce platforms, and content management systems.
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
                  Key Facts:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Developed by MySQL AB (now Oracle)</li>
                  <li>Written in C and C++</li>
                  <li>Uses SQL for querying</li>
                  <li>Open-source (GPL license)</li>
                  <li>Part of the LAMP stack</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-blue-50/60 p-3",
                  "dark:bg-blue-900/20"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Why It's Popular:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  MySQL is used by <strong>millions of websites</strong>,
                  including Facebook, Twitter, YouTube, and Wikipedia. It's
                  the <strong>M</strong> in the LAMP stack (Linux, Apache,
                  MySQL, PHP/Perl/Python).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── History ───────────────────────────────────────── */}
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
              <span className="text-2xl">📜</span>
              A Brief History of MySQL
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-3",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-3",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">1995</h4>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>MySQL founded by MySQL AB</li>
                  <li>First version released</li>
                  <li>Developed by Michael Widenius</li>
                  <li>Named after daughter "My"</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-3",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">2000s</h4>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Became open-source (GPL)</li>
                  <li>Widely adopted by web developers</li>
                  <li>LAMP stack becomes popular</li>
                  <li>MySQL AB grows rapidly</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-3",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">2010–Present</h4>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Acquired by Oracle (2010)</li>
                  <li>MySQL 5.5, 5.6, 5.7, 8.0</li>
                  <li>JSON support added</li>
                  <li>MySQL 8.0: window functions, CTEs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Features ──────────────────────────────────── */}
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
                "mb-4 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">✨</span>
              Key Features of MySQL
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "⚡",
                  title: "High Performance",
                  desc: "Fast query processing with advanced indexing and query optimization.",
                  detail: "Handles high-volume workloads efficiently.",
                  color: "blue",
                },
                {
                  icon: "🔒",
                  title: "Reliability & ACID",
                  desc: "ACID-compliant transactions ensure data integrity and consistency.",
                  detail: "With InnoDB storage engine.",
                  color: "emerald",
                },
                {
                  icon: "🔓",
                  title: "Open Source",
                  desc: "Free to use, modify, and distribute under the GPL license.",
                  detail: "Large community for support.",
                  color: "purple",
                },
                {
                  icon: "📊",
                  title: "Scalability",
                  desc: "Supports large databases with millions of records.",
                  detail: "Clustering and replication options.",
                  color: "amber",
                },
                {
                  icon: "🔗",
                  title: "JSON Support",
                  desc: "Native support for storing and querying JSON documents.",
                  detail: "Combines relational and document features.",
                  color: "indigo",
                },
                {
                  icon: "🔐",
                  title: "Security",
                  desc: "Strong security features: SSL, encryption, and access control.",
                  detail: "User authentication and privileges.",
                  color: "red",
                },
                {
                  icon: "🔌",
                  title: "Extensibility",
                  desc: "Supports stored procedures, triggers, and user-defined functions.",
                  detail: "Custom extensions and plugins.",
                  color: "teal",
                },
                {
                  icon: "🌐",
                  title: "Cross-Platform",
                  desc: "Runs on Linux, Windows, macOS, and Unix-like systems.",
                  detail: "Consistent across platforms.",
                  color: "cyan",
                },
                {
                  icon: "📝",
                  title: "Full-Text Search",
                  desc: "Built-in full-text search for text-heavy applications.",
                  detail: "Fast text indexing and searching.",
                  color: "pink",
                },
              ].map((feature, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                  cyan: "border-cyan-200/50 bg-cyan-50/40 dark:border-cyan-700/50 dark:bg-cyan-900/10",
                  pink: "border-pink-200/50 bg-pink-50/40 dark:border-pink-700/50 dark:bg-pink-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  red: "text-red-700 dark:text-red-300",
                  teal: "text-teal-700 dark:text-teal-300",
                  cyan: "text-cyan-700 dark:text-cyan-300",
                  pink: "text-pink-700 dark:text-pink-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "feature-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[feature.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 400}ms` }}
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

        {/* ─── MySQL Architecture ───────────────────────────── */}
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
              <span className="text-2xl">🏗️</span>
              MySQL Architecture
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              MySQL has a layered architecture that separates the client,
              server, and storage engine layers, making it flexible and extensible.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-3",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🖥️ Client Layer
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Users and applications</li>
                  <li>Send SQL queries</li>
                  <li>Receive results</li>
                  <li>Examples: mysql CLI, Workbench</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  ⚙️ Server Layer
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Connection Manager</li>
                  <li>Query Parser &amp; Optimizer</li>
                  <li>Query Cache</li>
                  <li>Stored Procedures</li>
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
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  💾 Storage Engine Layer
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>InnoDB (default)</li>
                  <li>MyISAM</li>
                  <li>Memory</li>
                  <li>CSV, Archive, etc.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Storage Engines ───────────────────────────────── */}
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
              <span className="text-2xl">🔧</span>
              MySQL Storage Engines
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              MySQL supports multiple storage engines, each optimised for
              different use cases. The choice of engine affects performance,
              features, and transactional support.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  InnoDB (Default)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>ACID-compliant transactions</li>
                  <li>Foreign key support</li>
                  <li>Row-level locking</li>
                  <li>Crash recovery</li>
                  <li>Best for most applications</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-amber-200/50 p-4",
                  "dark:border-amber-700/50",
                  "bg-amber-50/40 dark:bg-amber-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-amber-700 dark:text-amber-300">
                  MyISAM (Legacy)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>No transactions</li>
                  <li>Table-level locking</li>
                  <li>Faster for read-heavy loads</li>
                  <li>Full-text search support</li>
                  <li>Not recommended for new projects</li>
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
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  Memory (HEAP)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Data stored in RAM</li>
                  <li>Extremely fast</li>
                  <li>Data lost on restart</li>
                  <li>Best for temporary tables</li>
                  <li>Limited size (memory constraints)</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  Other Engines
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>CSV — stores data as CSV files</li>
                  <li>Archive — for archiving data</li>
                  <li>Blackhole — discards data (for testing)</li>
                  <li>Federated — access remote tables</li>
                </ul>
              </div>
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
              Real-World Example: Facebook Uses MySQL
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
                <strong>Swadeep</strong>, a database engineer, learns that
                Facebook (Meta) uses MySQL at massive scale:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Scale:</strong> Facebook runs thousands of MySQL
                    servers, storing billions of records.
                  </li>
                  <li>
                    <strong>Use Cases:</strong> User profiles, posts, messages,
                    friend connections.
                  </li>
                  <li>
                    <strong>Customisation:</strong> Facebook has heavily
                    customised MySQL for their needs.
                  </li>
                  <li>
                    <strong>Why MySQL?</strong> Fast, reliable, and they had
                    the expertise to scale it horizontally.
                  </li>
                </ul>
                <strong>Other big users:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Twitter (uses MySQL for tweets)</li>
                  <li>YouTube (uses MySQL for metadata)</li>
                  <li>WordPress (MySQL is the default database)</li>
                </ul>
                <strong>Key Takeaway:</strong> MySQL is not just for small
                websites — it scales to the largest applications in the world.
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
                  <strong>Always use InnoDB:</strong> For new projects, InnoDB
                  is the best choice. It's ACID-compliant and supports
                  transactions and foreign keys.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Know your storage engines:</strong> Different engines
                  have different strengths. Choose the right one for your use
                  case.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use MySQL Workbench:</strong> It's a powerful tool
                  for designing, managing, and querying MySQL databases.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Monitor performance:</strong> Use <code>EXPLAIN</code>
                  to analyse query execution plans and optimise slow queries.
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
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring indexing:</strong> Without proper indexes,
                  queries on large tables will be extremely slow.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using default configuration:</strong> MySQL's default
                  configuration is for a small, general-purpose system. Tune it
                  for your workload.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using transactions:</strong> For critical
                  operations, always use transactions to ensure data consistency.
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
                  <strong>Use transactions for data integrity:</strong> Wrap
                  related DML operations in transactions with COMMIT/ROLLBACK.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Regularly backup your databases:</strong> Use
                  <code>mysqldump</code> or other backup tools to prevent
                  data loss.
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
                <span>I can define MySQL and its purpose</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the history of MySQL</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can list key features of MySQL</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand MySQL's layered architecture</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the difference between InnoDB and MyISAM</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for using MySQL</span>
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
            title="Introduction to MySQL – FAQs"
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
              "MySQL is where many developers start their database journey — " +
              "and for good reason. It's free, well-documented, and powering " +
              "some of the largest websites in the world. I tell my students: " +
              "'If you master MySQL, you'll never be short of job opportunities.' " +
              "The key is to understand not just how to write queries, but also " +
              "how to design schemas, choose storage engines, and optimise " +
              "performance. Practice with sample databases (like Sakila or " +
              "World) and experiment with different features. MySQL is a great " +
              "choice for both learning and production applications."
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
            Topic 25 · Introduction to MySQL · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic25;