import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3 – Characteristics of a Good Database
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the essential qualities that make a database
 *          effective, reliable, and maintainable. Builds on
 *          Topics 0-2 (data, processing, and databases).
 */
const Topic3 = () => {
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

  // ─── Characteristic Data ──────────────────────────────────
  const characteristics = [
    {
      icon: "🔗",
      name: "Data Integrity",
      desc: "Ensures data is accurate, consistent, and reliable through constraints and validation.",
      color: "blue",
    },
    {
      icon: "🔒",
      name: "Security",
      desc: "Protects data from unauthorized access through authentication, authorisation, and encryption.",
      color: "red",
    },
    {
      icon: "⚡",
      name: "Performance",
      desc: "Provides fast response times for queries, updates, and transactions, even with large datasets.",
      color: "amber",
    },
    {
      icon: "📈",
      name: "Scalability",
      desc: "Can handle growing volumes of data and users without significant performance degradation.",
      color: "emerald",
    },
    {
      icon: "🔁",
      name: "Availability",
      desc: "Is accessible whenever needed, with minimal downtime and robust backup/recovery mechanisms.",
      color: "purple",
    },
    {
      icon: "🧹",
      name: "Data Consistency",
      desc: "Ensures data is the same across all tables and systems, avoiding duplication and anomalies.",
      color: "indigo",
    },
    {
      icon: "🗂️",
      name: "Flexibility",
      desc: "Allows for changes in data structure and requirements without significant disruption.",
      color: "pink",
    },
    {
      icon: "📊",
      name: "Ease of Use",
      desc: "Provides intuitive interfaces and query languages for users and developers.",
      color: "teal",
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

        .char-card:hover {
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
            Module 1 · Topic 3
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            Characteristics of <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              a Good Database
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            What separates an effective database from a poor one — the essential
            qualities for reliability, performance, and maintainability.
          </p>
        </div>

        {/* ─── SVG: Quality Database ────────────────────────── */}
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
              aria-label="Characteristics of a good database as a shield"
            >
              <rect width="600" height="180" rx="12" fill="transparent" />

              {/* Shield background */}
              <path
                d="M 300 20 L 470 70 L 470 130 L 300 170 L 130 130 L 130 70 Z"
                fill="#3b82f6"
                opacity="0.08"
                className="dark:fill-blue-400 dark:opacity-12 dark:stroke-slate-500"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />

              {/* Database icon in shield */}
              <ellipse
                cx="300"
                cy="80"
                rx="40"
                ry="15"
                fill="#3b82f6"
                opacity="0.15"
                className="dark:fill-blue-400 dark:opacity-20"
              />
              <rect x="260" y="65" width="80" height="30" fill="#3b82f6" opacity="0.1" className="dark:fill-blue-400 dark:opacity-15" />
              <ellipse
                cx="300"
                cy="95"
                rx="40"
                ry="15"
                fill="#3b82f6"
                opacity="0.15"
                className="dark:fill-blue-400 dark:opacity-20"
              />
              <rect x="265" y="80" width="70" height="15" rx="3" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="dark:stroke-blue-400" />
              <text x="300" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Database</text>

              {/* Quality badges */}
              <rect x="70" y="55" width="110" height="24" rx="12" fill="#10b981" opacity="0.15" className="dark:fill-emerald-400 dark:opacity-20" />
              <text x="125" y="71" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">🔒 Secure</text>

              <rect x="70" y="85" width="110" height="24" rx="12" fill="#8b5cf6" opacity="0.15" className="dark:fill-purple-400 dark:opacity-20" />
              <text x="125" y="101" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">⚡ Fast</text>

              <rect x="70" y="115" width="110" height="24" rx="12" fill="#f59e0b" opacity="0.15" className="dark:fill-amber-400 dark:opacity-20" />
              <text x="125" y="131" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">📈 Scalable</text>

              <rect x="420" y="55" width="110" height="24" rx="12" fill="#ef4444" opacity="0.15" className="dark:fill-red-400 dark:opacity-20" />
              <text x="475" y="71" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">🔁 Reliable</text>

              <rect x="420" y="85" width="110" height="24" rx="12" fill="#6366f1" opacity="0.15" className="dark:fill-indigo-400 dark:opacity-20" />
              <text x="475" y="101" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">📊 Consistent</text>

              <rect x="420" y="115" width="110" height="24" rx="12" fill="#14b8a6" opacity="0.15" className="dark:fill-teal-400 dark:opacity-20" />
              <text x="475" y="131" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">🗂️ Flexible</text>

              <text x="300" y="165" textAnchor="middle" fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">
                A good database is a shield for your data
              </text>
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
              What Makes a Database "Good"?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">good database</strong>{" "}
              is not just about storing data — it's about storing data in a way
              that is <strong>reliable, secure, efficient, and maintainable</strong>.
              The quality of a database directly impacts the applications and
              decisions that depend on it.
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
                  Key Insight:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  A database is "good" if it serves its purpose well — it must
                  meet the needs of its users, applications, and the organisation
                  while maintaining data quality.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-blue-50/60 p-3",
                  "dark:bg-blue-900/20"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Think About:
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  Would you trust a bank's database that's slow, insecure, or
                  inconsistent? The characteristics of a good database directly
                  affect trust and usability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Characteristics Grid ──────────────────────────── */}
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
              <span className="text-2xl">✨</span>
              Key Characteristics of a Good Database
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
                "text-sm"
              )}
            >
              {characteristics.map((item, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  pink: "border-pink-200/50 bg-pink-50/40 dark:border-pink-700/50 dark:bg-pink-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                };
                const colorTextMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  red: "text-red-700 dark:text-red-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  pink: "text-pink-700 dark:text-pink-300",
                  teal: "text-teal-700 dark:text-teal-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "char-card rounded-xl border p-4 transition-all duration-300 hover:shadow-md",
                      colorMap[item.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="text-3xl">{item.icon}</div>
                    <h3
                      className={clsx(
                        "mt-2 font-bold",
                        colorTextMap[item.color]
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
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Detailed Explanation ──────────────────────────── */}
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
              <span className="text-2xl">🔍</span>
              Why Each Characteristic Matters
            </h2>
            <div
              className={clsx(
                "space-y-4 text-sm",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-blue-500 pl-4",
                  "hover:bg-blue-50/30 dark:hover:bg-blue-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">Data Integrity:</span>{" "}
                Without integrity, decisions based on data are flawed. Integrity
                ensures that data is accurate, consistent, and trustworthy —
                essential for reporting, analytics, and operations.
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-red-500 pl-4",
                  "hover:bg-red-50/30 dark:hover:bg-red-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-red-600 dark:text-red-400">Security:</span>{" "}
                Data breaches can destroy an organisation's reputation. Security
                protects sensitive information from theft, loss, and unauthorised
                access — a legal and ethical requirement.
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-amber-500 pl-4",
                  "hover:bg-amber-50/30 dark:hover:bg-amber-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-amber-600 dark:text-amber-400">Performance:</span>{" "}
                Slow databases frustrate users and reduce productivity. Good
                performance means queries return quickly, even as data grows,
                enabling real-time decision-making.
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-emerald-500 pl-4",
                  "hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Scalability:</span>{" "}
                As businesses grow, their data grows. A scalable database can
                handle increasing volumes without redesigning the entire system,
                saving time and money.
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-purple-500 pl-4",
                  "hover:bg-purple-50/30 dark:hover:bg-purple-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-purple-600 dark:text-purple-400">Availability:</span>{" "}
                Downtime costs money. High availability ensures the database is
                accessible when needed, with robust backup and disaster recovery
                to prevent data loss.
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
              Real-World Example: Hospital Database
            </h2>
            <div
              className={clsx(
                "rounded-lg bg-slate-100/60 p-4",
                "dark:bg-slate-800/40"
              )}
            >
              <div
                className={clsx(
                  "text-sm leading-relaxed text-slate-700 space-y-2",
                  "dark:text-slate-300"
                )}
              >
                <p>
                  <strong>Dr. Debangshu</strong> works at a hospital in{" "}
                  <strong>Naihati</strong>. The hospital's patient database must
                  be excellent. Here's why:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Integrity:</strong> Patient records must be accurate
                    — a wrong medication could be life-threatening.
                  </li>
                  <li>
                    <strong>Security:</strong> Patient data is confidential and
                    protected by law (HIPAA, GDPR).
                  </li>
                  <li>
                    <strong>Performance:</strong> During emergencies, doctors
                    need to access patient history in seconds.
                  </li>
                  <li>
                    <strong>Scalability:</strong> The hospital grows every year,
                    adding more patients and records.
                  </li>
                  <li>
                    <strong>Availability:</strong> The database must be available
                    24/7 — lives depend on it.
                  </li>
                  <li>
                    <strong>Consistency:</strong> A patient's data must be the
                    same across all departments (lab, pharmacy, appointments).
                  </li>
                  <li>
                    <strong>Flexibility:</strong> New treatments, tests, and
                    procedures are added regularly.
                  </li>
                  <li>
                    <strong>Ease of Use:</strong> Doctors and nurses need an
                    intuitive interface to quickly update records.
                  </li>
                </ul>
                <p>
                  A poor database in this context would have serious consequences.
                </p>
              </div>
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
                  <strong>Design for integrity from day one:</strong> Use
                  constraints (primary keys, foreign keys, check constraints)
                  to enforce data rules automatically.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Plan for security early:</strong> Implement role-based
                  access control (RBAC) and encrypt sensitive data at rest and
                  in transit.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Index strategically:</strong> Create indexes on columns
                  used in WHERE clauses, JOINs, and ORDER BY to optimise performance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Test for scalability:</strong> Don't wait until the
                  database is slow — test with realistic data volumes early.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Automate backups:</strong> Never rely on manual backups.
                  Set up automated, tested backup and recovery procedures.
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
                  <strong>Neglecting data integrity:</strong> Not using foreign
                  keys or constraints leads to orphaned records and inconsistent
                  data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Underestimating security:</strong> Poor authentication,
                  weak passwords, and lack of encryption can lead to devastating
                  breaches.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring performance monitoring:</strong> Not tracking
                  slow queries and resource usage leads to unresponsive systems.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not planning for growth:</strong> Designing a database
                  without considering future data volume and user load.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Failing to test backups:</strong> Having backups is not
                  enough — they must be tested and proven to work.
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
                  <strong>Document everything:</strong> Maintain an up-to-date
                  data dictionary, ER diagram, and operational procedures.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use transactions:</strong> Group related operations into
                  transactions to ensure atomicity and consistency.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Monitor proactively:</strong> Set up monitoring for
                  performance, disk space, errors, and security alerts.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Review and refactor:</strong> Periodically review
                  database design and query patterns for optimisation.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Embrace automation:</strong> Automate backups, patching,
                  and routine maintenance tasks.
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
                <span>I can list at least 6 characteristics of a good database</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand why integrity and security are critical</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the difference between scalability and performance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the importance of availability and backups</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify common pitfalls in database design</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices to ensure database quality</span>
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
            title="Characteristics of a Good Database – FAQs"
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
              "I often tell my students: 'A database is only as good as its design.' " +
              "The characteristics we discussed aren't just theoretical — they have " +
              "real business impact. I've seen companies fail because they didn't " +
              "prioritise data integrity or scalability. One of the best exercises " +
              "is to take a real-world scenario (like a school database) and evaluate " +
              "it against each characteristic. Ask: 'Is this secure? Is it consistent? " +
              "Can it grow?' This builds a practical mindset that goes beyond the " +
              "classroom. Remember: a good database is invisible — it just works."
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
            Topic 3 · Characteristics of a Good Database · Built with ❤️ for
            classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic3;