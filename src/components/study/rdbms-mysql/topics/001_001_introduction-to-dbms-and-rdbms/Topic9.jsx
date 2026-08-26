import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

/**
 * Topic9 – Disadvantages of DBMS
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the drawbacks and challenges of using a DBMS,
 *          including cost, complexity, performance overhead, and
 *          security risks. Provides a balanced perspective for
 *          decision-making. Builds on Topic 8 (Advantages of DBMS).
 */
const Topic9 = () => {
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

  // ─── Disadvantages Data ──────────────────────────────────
  const disadvantages = [
    {
      icon: "💰",
      title: "High Cost",
      desc: "DBMS software licenses, hardware, and maintenance can be expensive, especially for enterprise-grade systems.",
      detail: "Oracle, SQL Server, and other commercial DBMS have significant licensing costs. Even open-source DBMS require skilled DBAs.",
      color: "amber",
    },
    {
      icon: "🧩",
      title: "Complexity",
      desc: "DBMS are complex systems that require expertise to install, configure, tune, and maintain.",
      detail: "Understanding normalization, indexing, query optimization, and replication requires significant learning.",
      color: "purple",
    },
    {
      icon: "👨‍💻",
      title: "Need for Skilled Personnel",
      desc: "Database administration and tuning require specialised skills that are often hard to find and expensive.",
      detail: "DBAs, data architects, and developers must understand database internals and performance tuning.",
      color: "blue",
    },
    {
      icon: "🐌",
      title: "Performance Overhead",
      desc: "The DBMS adds layers of abstraction and management that can slow down operations compared to direct file access.",
      detail: "Query parsing, optimization, locking, and logging add overhead, especially for simple operations.",
      color: "red",
    },
    {
      icon: "🔓",
      title: "Security Risks",
      desc: "While DBMS offers security features, misconfiguration can expose data to breaches and attacks.",
      detail: "Default passwords, weak access controls, and SQL injection are common vulnerabilities.",
      color: "rose",
    },
    {
      icon: "🔄",
      title: "Vendor Lock-in",
      desc: "Using a specific DBMS can make it hard to switch to another, due to proprietary features and data formats.",
      detail: "Migrating from Oracle to PostgreSQL or SQL Server can be complex and costly.",
      color: "indigo",
    },
    {
      icon: "📏",
      title: "Size and Resource Usage",
      desc: "DBMS require significant disk space, memory, and CPU resources, especially for large databases.",
      detail: "Indexes, logs, and temporary tables consume storage. Memory buffers and query caches use RAM.",
      color: "cyan",
    },
    {
      icon: "📚",
      title: "Learning Curve",
      desc: "Developers and users must learn SQL, database design, and query optimization, which takes time.",
      detail: "Mastering advanced features like window functions, CTEs, and performance tuning requires experience.",
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

        .disadvantage-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .disadvantage-card:hover {
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
            Module 1 · Topic 9
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent dark:from-red-400 dark:to-orange-300">
              Disadvantages
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
            The challenges and drawbacks that come with the power of a DBMS
            — and how to mitigate them.
          </p>
        </div>

        {/* ─── SVG: Disadvantages Showcase ─────────────────── */}
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
              aria-label="Disadvantages of DBMS"
            >
              <rect width="600" height="180" rx="12" fill="transparent" />

              {/* Disadvantage icons */}
              <rect x="20" y="20" width="120" height="120" rx="12" fill="#f59e0b" opacity="0.06" className="dark:fill-amber-400 dark:opacity-10" />
              <text x="80" y="70" textAnchor="middle" fontSize="32">💰</text>
              <text x="80" y="100" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Cost</text>

              <rect x="160" y="20" width="120" height="120" rx="12" fill="#8b5cf6" opacity="0.06" className="dark:fill-purple-400 dark:opacity-10" />
              <text x="220" y="70" textAnchor="middle" fontSize="32">🧩</text>
              <text x="220" y="100" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Complexity</text>

              <rect x="300" y="20" width="120" height="120" rx="12" fill="#3b82f6" opacity="0.06" className="dark:fill-blue-400 dark:opacity-10" />
              <text x="360" y="70" textAnchor="middle" fontSize="32">👨‍💻</text>
              <text x="360" y="100" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Skills</text>

              <rect x="440" y="20" width="120" height="120" rx="12" fill="#ef4444" opacity="0.06" className="dark:fill-red-400 dark:opacity-10" />
              <text x="500" y="70" textAnchor="middle" fontSize="32">🐌</text>
              <text x="500" y="100" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Overhead</text>

              <text x="300" y="165" textAnchor="middle" fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">
                + Security Risks · Vendor Lock-in · Resource Usage · Learning Curve
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
              The Challenges of DBMS
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              While a <strong className="text-red-600 dark:text-red-400">DBMS</strong>{" "}
              offers powerful advantages, it also comes with significant
              challenges. Understanding these disadvantages is crucial for
              making informed decisions and mitigating risks. No technology is
              perfect — DBMS requires careful planning and management.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-amber-50/40 p-4",
                "dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-amber-600 dark:text-amber-400">Key Insight:</span>{" "}
                The disadvantages of DBMS are not reasons to avoid them, but
                factors to consider and plan for. Proper design, training, and
                management can mitigate most of these issues.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Disadvantages Grid ───────────────────────────── */}
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
              <span className="text-2xl">⚠️</span>
              Key Disadvantages of DBMS
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
                "text-sm"
              )}
            >
              {disadvantages.map((disadv, idx) => {
                const colorMap = {
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  rose: "border-rose-200/50 bg-rose-50/40 dark:border-rose-700/50 dark:bg-rose-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  cyan: "border-cyan-200/50 bg-cyan-50/40 dark:border-cyan-700/50 dark:bg-cyan-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                };
                const textColorMap = {
                  amber: "text-amber-700 dark:text-amber-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  blue: "text-blue-700 dark:text-blue-300",
                  red: "text-red-700 dark:text-red-300",
                  rose: "text-rose-700 dark:text-rose-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  cyan: "text-cyan-700 dark:text-cyan-300",
                  teal: "text-teal-700 dark:text-teal-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "disadvantage-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[disadv.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="text-3xl">{disadv.icon}</div>
                    <h3
                      className={clsx(
                        "mt-2 font-bold",
                        textColorMap[disadv.color]
                      )}
                    >
                      {disadv.title}
                    </h3>
                    <p
                      className={clsx(
                        "mt-1 leading-relaxed text-slate-600",
                        "dark:text-slate-400"
                      )}
                    >
                      {disadv.desc}
                    </p>
                    <div
                      className={clsx(
                        "mt-2 text-xs italic text-slate-500",
                        "dark:text-slate-500"
                      )}
                    >
                      {disadv.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Detailed Explanations ────────────────────────── */}
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
              Understanding the Disadvantages in Depth
            </h2>
            <div
              className={clsx(
                "space-y-4 text-sm",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <div className="rounded-lg border-l-4 border-amber-500 pl-4 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors">
                <span className="font-bold text-amber-600 dark:text-amber-400">1. High Cost:</span>{" "}
                Enterprise DBMS licenses can cost thousands of dollars per CPU core.
                Even open-source DBMS require skilled DBAs who command high salaries.
                Hardware for large databases (SSDs, lots of RAM) adds to the expense.
              </div>
              <div className="rounded-lg border-l-4 border-purple-500 pl-4 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                <span className="font-bold text-purple-600 dark:text-purple-400">2. Complexity:</span>{" "}
                Database design involves normalization, indexing, and query
                optimization — concepts that take time to master. Configuration,
                backup, and replication add further complexity. Mistakes can lead
                to performance and data issues.
              </div>
              <div className="rounded-lg border-l-4 border-blue-500 pl-4 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                <span className="font-bold text-blue-600 dark:text-blue-400">3. Need for Skilled Personnel:</span>{" "}
                Not everyone can be a DBA. Organisations often struggle to find
                and retain qualified database professionals. This can lead to
                outsourcing or heavy training costs.
              </div>
              <div className="rounded-lg border-l-4 border-red-500 pl-4 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors">
                <span className="font-bold text-red-600 dark:text-red-400">4. Performance Overhead:</span>{" "}
                The DBMS adds layers: query parsing, optimization, locking, logging,
                and transaction management. For simple operations, this can be
                slower than direct file access. Proper indexing and tuning are
                required to mitigate this.
              </div>
              <div className="rounded-lg border-l-4 border-rose-500 pl-4 hover:bg-rose-50/30 dark:hover:bg-rose-900/10 transition-colors">
                <span className="font-bold text-rose-600 dark:text-rose-400">5. Security Risks:</span>{" "}
                Default passwords, weak access controls, and SQL injection are
                common vulnerabilities. Misconfiguration can expose sensitive data.
                Security is not automatic — it requires diligent administration.
              </div>
              <div className="rounded-lg border-l-4 border-indigo-500 pl-4 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">6. Vendor Lock-in:</span>{" "}
                Once you choose a DBMS, migrating to another is difficult and
                expensive. Proprietary features (stored procedures, data types)
                can make switching almost impossible.
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
              Real-World Example: The Cost of DBMS
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
                <strong>Debangshu</strong>, the CTO of a fast-growing startup in{" "}
                <strong>Ichapur</strong>, decided to use Oracle for their new
                e-commerce platform. He quickly realised the challenges:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Cost:</strong> The Oracle license cost $40,000 per
                    year — a huge expense for a startup.
                  </li>
                  <li>
                    <strong>Complexity:</strong> They hired a DBA at a high
                    salary, but configuring high availability and performance
                    tuning took months.
                  </li>
                  <li>
                    <strong>Security:</strong> An intern used a default password
                    for a test database, and it was hacked within days.
                  </li>
                  <li>
                    <strong>Performance Overhead:</strong> Simple CRUD operations
                    were slower than expected; they had to invest in SSDs and
                    more RAM.
                  </li>
                  <li>
                    <strong>Vendor Lock-in:</strong> After two years, they wanted
                    to switch to PostgreSQL to save costs, but the migration was
                    so complex they abandoned the idea.
                  </li>
                </ul>
                <strong>Lesson:</strong> They should have chosen a DBMS that fit
                their scale and budget, and invested in proper training and
                security from the start.
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
                  <strong>Choose the right DBMS for your scale:</strong> For
                  small projects, open-source DBMS like PostgreSQL or MySQL are
                  often sufficient. Don't overpay for enterprise features you
                  don't need.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Invest in training:</strong> The cost of training is
                  far less than the cost of downtime or data breaches caused by
                  misconfiguration.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use managed services:</strong> Cloud DBMS (AWS RDS,
                  Azure SQL) reduce administrative overhead and complexity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Plan for vendor independence:</strong> Avoid using
                  proprietary features unless absolutely necessary. Stick to
                  standard SQL.
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
                  <strong>Underestimating costs:</strong> Many projects fail to
                  budget for DBMS licenses, hardware, and DBA salaries, leading
                  to budget overruns.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overcomplicating the design:</strong> Using advanced
                  features (like table partitioning or replication) when they
                  are not needed adds unnecessary complexity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Neglecting security basics:</strong> Default passwords,
                  unpatched systems, and no encryption are common entry points
                  for attackers.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Assuming the DBMS will automatically be fast:</strong>
                  Without proper indexing and query tuning, performance will be
                  poor. The DBMS doesn't optimise itself.
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
                  <strong>Start small, grow as needed:</strong> Begin with a
                  simple, cost-effective DBMS. Scale up only when necessary.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use standard SQL and features:</strong> This makes
                  migration easier and reduces vendor lock-in.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Implement a security-first approach:</strong> Regular
                  audits, strong passwords, and least-privilege access are
                  non-negotiable.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Monitor performance continuously:</strong> Proactively
                  identify slow queries and tune them before they become problems.
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
                <span>I can list at least 6 disadvantages of DBMS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand why cost is a significant factor</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the importance of skilled personnel</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand vendor lock-in and its implications</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify common security risks</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices to mitigate disadvantages</span>
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
            title="Disadvantages of DBMS – FAQs"
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
            title="Disadvantages of DBMS"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic9_note.txt"
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
              "I always tell my students: 'Every powerful tool has a price.' The " +
              "disadvantages of DBMS are real, but they are manageable. The key " +
              "is to be aware of them early and plan accordingly. For example, " +
              "rather than being surprised by licensing costs, budget for them " +
              "from the start. Rather than struggling with complexity, invest in " +
              "training. And rather than being locked in, use standard SQL. The " +
              "worst mistake is ignoring these disadvantages until they become " +
              "crises. A mature engineer plans for both the benefits and the costs."
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
            Topic 9 · Disadvantages of DBMS · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic9;