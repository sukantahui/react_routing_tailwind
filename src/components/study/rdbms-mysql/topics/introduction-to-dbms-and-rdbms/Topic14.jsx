import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";

/**
 * Topic14 – Relational Model by E. F. Codd
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the relational model proposed by Dr. Edgar F. Codd,
 *          its mathematical foundations, key components, rules, and
 *          its lasting impact on database management. Builds on
 *          Topics 12 (RDBMS) and 13 (DBMS vs RDBMS).
 */
const Topic14 = () => {
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

        .rule-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .rule-card:hover {
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
            Module 1 · Topic 14
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Relational Model
            </span>
            <br className="sm:hidden" />
            by E. F. Codd
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The revolutionary database theory that changed the world of data
            management forever.
          </p>
        </div>

        {/* ─── SVG: Codd and the Relational Model ──────────── */}
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
              aria-label="E.F. Codd and the relational model"
            >
              <rect width="600" height="190" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                👨‍🔬 E.F. Codd's Relational Model
              </text>

              {/* Person icon */}
              <circle cx="80" cy="80" r="30" fill="#3b82f6" opacity="0.1" className="dark:fill-blue-400 dark:opacity-15" />
              <text x="80" y="90" textAnchor="middle" fontSize="36">👨‍🔬</text>
              <text x="80" y="115" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">E.F. Codd</text>
              <text x="80" y="128" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">IBM · 1970</text>

              {/* Arrow from Codd to model */}
              <line x1="110" y1="80" x2="160" y2="80" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500">
                <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
              </line>

              {/* Model components */}
              <rect x="170" y="35" width="120" height="90" rx="8" fill="#3b82f6" opacity="0.06" className="dark:fill-blue-400 dark:opacity-10" stroke="#3b82f6" strokeWidth="1.5" className="dark:stroke-blue-400" />
              <text x="230" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📊 Relations</text>
              <text x="230" y="78" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">(Tables)</text>
              <text x="230" y="95" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Tuples &amp; Attributes</text>

              <rect x="310" y="35" width="120" height="90" rx="8" fill="#10b981" opacity="0.06" className="dark:fill-emerald-400 dark:opacity-10" stroke="#10b981" strokeWidth="1.5" className="dark:stroke-emerald-400" />
              <text x="370" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🔑 Keys</text>
              <text x="370" y="78" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">(Primary, Foreign)</text>
              <text x="370" y="95" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Integrity</text>

              <rect x="450" y="35" width="120" height="90" rx="8" fill="#8b5cf6" opacity="0.06" className="dark:fill-purple-400 dark:opacity-10" stroke="#8b5cf6" strokeWidth="1.5" className="dark:stroke-purple-400" />
              <text x="510" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📝 SQL</text>
              <text x="510" y="78" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">(Query Language)</text>
              <text x="510" y="95" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Set Theory</text>

              {/* Bottom text */}
              <text x="300" y="160" textAnchor="middle" fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">
                "A Relational Model of Data for Large Shared Data Banks" — 1970
              </text>
              <text x="300" y="178" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">
                ⭐ The foundation of modern RDBMS ⭐
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
              The Revolutionary Relational Model
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              In 1970, <strong className="text-blue-600 dark:text-blue-400">
                Dr. Edgar F. Codd
              </strong>{" "}
              published a groundbreaking paper that would change the course of
              computer science. His <strong>relational model</strong> proposed
              organising data in <strong>tables (relations)</strong> with
              <strong> rows (tuples)</strong> and <strong>columns (attributes)</strong>,
              using <strong>set theory</strong> as the foundation for data
              manipulation. This was a radical departure from the hierarchical
              and network models of the time.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                The relational model introduced <strong>data independence</strong>{" "}
                — separating the logical view of data from its physical storage —
                which is now a fundamental principle of modern databases.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Who Was E.F. Codd? ───────────────────────────── */}
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
              <span className="text-2xl">👨‍🔬</span>
              Who Was E.F. Codd?
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-3",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border p-4",
                  "border-blue-200/50 bg-blue-50/40",
                  "dark:border-blue-700/50 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">📅 Early Life</h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Born: 1923 in England</li>
                  <li>Studied mathematics at Oxford</li>
                  <li>Joined IBM in 1949</li>
                  <li>Worked on early computing systems</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border p-4",
                  "border-emerald-200/50 bg-emerald-50/40",
                  "dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">🏆 Key Contributions</h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Relational model (1970)</li>
                  <li>12 Rules for RDBMS</li>
                  <li>Normalisation theory</li>
                  <li>Data independence concept</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border p-4",
                  "border-purple-200/50 bg-purple-50/40",
                  "dark:border-purple-700/50 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">🏅 Legacy</h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>ACM Turing Award (1981)</li>
                  <li>Father of RDBMS</li>
                  <li>Revolutionised data management</li>
                  <li>Passed away in 2003</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Core Concepts of the Relational Model ────────── */}
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
              <span className="text-2xl">🧩</span>
              Core Concepts of the Relational Model
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "📊",
                  title: "Relation (Table)",
                  desc: "A set of tuples (rows) with the same attributes (columns). Each relation represents an entity.",
                  detail: "e.g., Students, Courses, Enrollments",
                  color: "blue",
                },
                {
                  icon: "📋",
                  title: "Tuple (Row)",
                  desc: "An unordered set of attribute values representing a single instance of the entity.",
                  detail: "e.g., (101, 'Swadeep', 'Barrackpore')",
                  color: "emerald",
                },
                {
                  icon: "🏷️",
                  title: "Attribute (Column)",
                  desc: "A named property of the entity, with a defined domain (data type).",
                  detail: "e.g., StudentID, Name, Address",
                  color: "purple",
                },
                {
                  icon: "🔒",
                  title: "Domain",
                  desc: "The set of allowed values for an attribute, based on its data type and constraints.",
                  detail: "e.g., StudentID must be a 3-digit number",
                  color: "amber",
                },
                {
                  icon: "🔑",
                  title: "Key",
                  desc: "One or more attributes that uniquely identify a tuple in a relation.",
                  detail: "e.g., Primary Key, Candidate Key, Foreign Key",
                  color: "red",
                },
                {
                  icon: "🔗",
                  title: "Relationship",
                  desc: "An association between two or more relations, enforced via foreign keys.",
                  detail: "e.g., One-to-Many, Many-to-Many",
                  color: "indigo",
                },
              ].map((concept, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  red: "text-red-700 dark:text-red-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "rule-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[concept.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 400}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{concept.icon}</span>
                      <h3
                        className={clsx(
                          "font-bold",
                          textColorMap[concept.color]
                        )}
                      >
                        {concept.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {concept.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {concept.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Codd's 12 Rules ───────────────────────────────── */}
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
              <span className="text-2xl">📋</span>
              Codd's 12 Rules
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Codd proposed a set of 12 rules (actually 13, numbered 0-12) that
              define what a fully relational DBMS should support. While no
              commercial RDBMS fully complies, they serve as a benchmark for
              relational systems.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
                "text-xs"
              )}
            >
              {[
                { num: "0", title: "Foundation", desc: "All data must be represented as tables." },
                { num: "1", title: "Information Rule", desc: "All data is in tables (no hidden structures)." },
                { num: "2", title: "Guaranteed Access", desc: "Every datum is accessible by table, key, and column." },
                { num: "3", title: "Null Support", desc: "Systematic handling of null values." },
                { num: "4", title: "Catalog (Metadata)", desc: "Descriptive data must be stored in tables." },
                { num: "5", title: "Comprehensive Language", desc: "One language (SQL) for all operations." },
                { num: "6", title: "View Updation", desc: "All views must be updateable." },
                { num: "7", title: "Insert/Update/Delete", desc: "Operates on tables, not specific rows." },
                { num: "8", title: "Physical Independence", desc: "Storage changes don't affect applications." },
                { num: "9", title: "Logical Independence", desc: "Schema changes don't affect applications." },
                { num: "10", title: "Integrity Independence", desc: "Integrity rules stored in catalog." },
                { num: "11", title: "Distribution Independence", desc: "Data location should not affect query." },
                { num: "12", title: "Non-subversion Rule", desc: "Cannot bypass integrity rules." },
              ].map((rule, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "rounded-xl border border-slate-200/50 p-3",
                    "dark:border-slate-700/50",
                    "bg-slate-50/40 dark:bg-slate-800/20",
                    "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
                  )}
                  style={{ animationDelay: `${idx * 20 + 500}ms` }}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {rule.num}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {rule.title}:
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {" "}{rule.desc}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Normalisation ────────────────────────────────── */}
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
              <span className="text-2xl">📐</span>
              Normalisation Theory
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Codd also introduced <strong>normalisation</strong> — a systematic
              process of organising data to reduce redundancy and improve
              integrity. Normal forms (1NF, 2NF, 3NF, BCNF) are progressive
              levels of normalisation.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4",
                "text-sm"
              )}
            >
              {[
                {
                  level: "1NF",
                  desc: "Eliminate repeating groups; each cell contains a single value.",
                  icon: "1️⃣",
                  color: "blue",
                },
                {
                  level: "2NF",
                  desc: "Remove partial dependencies; every attribute depends on the whole primary key.",
                  icon: "2️⃣",
                  color: "emerald",
                },
                {
                  level: "3NF",
                  desc: "Remove transitive dependencies; non-key attributes depend only on the primary key.",
                  icon: "3️⃣",
                  color: "purple",
                },
                {
                  level: "BCNF",
                  desc: "A stronger version of 3NF; every determinant is a candidate key.",
                  icon: "🔷",
                  color: "amber",
                },
              ].map((nf, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]",
                      colorMap[nf.color]
                    )}
                  >
                    <div className="text-2xl">{nf.icon}</div>
                    <h3
                      className={clsx(
                        "mt-1 font-bold",
                        textColorMap[nf.color]
                      )}
                    >
                      {nf.level}
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {nf.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Mathematical Foundations ────────────────────── */}
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
              <span className="text-2xl">📐</span>
              Mathematical Foundations
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The relational model is rooted in <strong>set theory</strong> and{" "}
              <strong>predicate logic</strong>. Relations are subsets of the
              Cartesian product of domains. Operations like SELECT, PROJECT,
              JOIN are based on relational algebra.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  📊 Relational Algebra
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>
                    <strong>SELECT (σ):</strong> Filter rows by condition
                  </li>
                  <li>
                    <strong>PROJECT (π):</strong> Choose columns
                  </li>
                  <li>
                    <strong>JOIN (⋈):</strong> Combine relations
                  </li>
                  <li>
                    <strong>UNION (∪), INTERSECT (∩), DIFFERENCE (-)</strong>
                  </li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  📝 Predicate Logic
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Queries are expressed as predicates</li>
                  <li>Domain and relational calculi</li>
                  <li>Formal foundation for SQL</li>
                  <li>Proves query correctness</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
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
              <span className="text-2xl">🌍</span>
              Real-World Example: Codd's Model in Action
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
                <strong>Abhronila</strong>, a database architect, applies Codd's
                principles daily:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Data Independence:</strong> She added an index to
                    the `Students` table to speed up queries. The application
                    code didn't change — physical independence in action.
                  </li>
                  <li>
                    <strong>Relationships:</strong> She defined foreign keys
                    between `Enrollments` and `Students`, ensuring referential
                    integrity.
                  </li>
                  <li>
                    <strong>Normalisation:</strong> She normalised a denormalised
                    table into 3NF, reducing redundancy and improving data
                    quality.
                  </li>
                  <li>
                    <strong>SQL:</strong> She writes complex queries using
                    SELECT, JOIN, and GROUP BY, leveraging relational algebra.
                  </li>
                </ul>
                <strong>Impact:</strong> The database is efficient, maintainable,
                and scalable — all thanks to Codd's relational model.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "900ms" }}
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
                  <strong>Think in sets:</strong> The relational model is
                  set-based. Write queries that operate on sets of rows, not
                  row-by-row loops.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Apply normalisation:</strong> Always design your
                  schema in at least 3NF to avoid redundancy and anomalies.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use keys consistently:</strong> Every table should
                  have a primary key. Define foreign keys for all relationships.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Leverage relational algebra:</strong> Understanding
                  relational algebra (SELECT, PROJECT, JOIN) helps you write
                  better SQL.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
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
                  <strong>Ignoring normalisation:</strong> Storing duplicate
                  data leads to redundancy and inconsistency.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using foreign keys:</strong> Without foreign keys,
                  referential integrity is not enforced.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Over-normalisation:</strong> Too many tables can hurt
                  performance. Find the right balance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Forgetting the mathematical foundation:</strong> The
                  relational model is mathematical. Understanding the theory
                  helps you avoid errors.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
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
                  <strong>Design with the relational model in mind:</strong>
                  Use tables, keys, and relationships to model your data
                  faithfully.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Normalise to 3NF:</strong> Most applications benefit
                  from a 3NF design, balancing integrity and performance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use constraints:</strong> Define PRIMARY KEY, FOREIGN
                  KEY, and CHECK constraints to enforce data rules.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Think relationally:</strong> Write SQL queries using
                  joins, not nested loops. Leverage the power of set-based
                  operations.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
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
                <span>I can explain who E.F. Codd was and his contribution</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the core concepts: relations, tuples, attributes, domains, keys</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know about Codd's 12 rules for RDBMS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand normalisation and its importance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the mathematical foundations (set theory, relational algebra)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply relational model principles in database design</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1300ms" }}
        >
          <FAQTemplate
            title="Relational Model by E.F. Codd – FAQs"
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
          style={{ animationDelay: "1400ms" }}
        >
          <Teacher
            note={
              "The relational model is one of the most elegant ideas in computer " +
              "science. I tell my students: 'Codd saw the world through sets, and " +
              "that changed everything.' The key insight is that data can be managed " +
              "mathematically — with set operations, predicate logic, and integrity " +
              "rules. This is why SQL is so powerful: it's not just a language, " +
              "it's a mathematical framework. If you understand the relational " +
              "model, you understand the foundation of all modern databases. " +
              "And always remember: normalisation is not a constraint; it's a gift " +
              "that makes your data more reliable and maintainable."
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
            Topic 14 · Relational Model by E. F. Codd · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic14;