import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic19_files/topic19_questions";

/**
 * Topic19 – Candidate Key
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain the concept of candidate keys — all possible
 *          columns that could uniquely identify rows in a table.
 *          Covers properties, selection of primary key, and
 *          alternate keys. Builds on Topic 18 (Primary Key).
 */
const Topic19 = () => {
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

        .candidate-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .candidate-card:hover {
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
            Module 1 · Topic 19
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Candidate Key
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            All the columns that could uniquely identify a row — and how to
            choose the best one as the primary key.
          </p>
        </div>

        {/* ─── SVG: Candidate Key Visualisation ────────────── */}
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
              viewBox="0 0 600 220"
              className="w-full h-auto"
              role="img"
              aria-label="Candidate keys visualisation"
            >
              <rect width="600" height="220" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🔑 Candidate Keys — Multiple Options for Uniqueness
              </text>

              {/* Table Frame */}
              <rect x="40" y="35" width="520" height="160" rx="6" fill="none" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />

              {/* Header */}
              <rect x="40" y="35" width="520" height="25" rx="6" fill="#f1f5f9" className="dark:fill-slate-700" />
              <text x="100" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🔑 StudentID</text>
              <text x="210" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📧 Email</text>
              <text x="320" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📱 Phone</text>
              <text x="430" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Name</text>

              {/* Candidate Key 1: StudentID highlighted */}
              <rect x="50" y="62" width="90" height="18" rx="2" fill="#3b82f6" opacity="0.2" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="95" y="75" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">101</text>
              <text x="205" y="75" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">s@email.com</text>
              <text x="315" y="75" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">1234567890</text>
              <text x="430" y="75" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Swadeep</text>

              <rect x="50" y="83" width="90" height="18" rx="2" fill="#3b82f6" opacity="0.2" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="95" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">102</text>
              <text x="205" y="96" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">t@email.com</text>
              <text x="315" y="96" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">1234567891</text>
              <text x="430" y="96" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Tuhina</text>

              <rect x="50" y="104" width="90" height="18" rx="2" fill="#3b82f6" opacity="0.2" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="95" y="117" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">103</text>
              <text x="205" y="117" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">a@email.com</text>
              <text x="315" y="117" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">1234567892</text>
              <text x="430" y="117" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Abhronila</text>

              <rect x="50" y="125" width="90" height="18" rx="2" fill="#3b82f6" opacity="0.2" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="95" y="138" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">104</text>
              <text x="205" y="138" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">d@email.com</text>
              <text x="315" y="138" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">1234567893</text>
              <text x="430" y="138" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Debangshu</text>

              <rect x="50" y="146" width="90" height="18" rx="2" fill="#3b82f6" opacity="0.2" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="95" y="159" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">105</text>
              <text x="205" y="159" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">s2@email.com</text>
              <text x="315" y="159" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">1234567894</text>
              <text x="430" y="159" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Susmita</text>

              {/* Labels */}
              <rect x="45" y="62" width="5" height="102" rx="2" fill="#3b82f6" opacity="0.2" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="28" y="118" textAnchor="middle" fontSize="9" fill="#3b82f6" className="dark:fill-blue-400" transform="rotate(-90,28,118)">Candidate Key 1: StudentID</text>

              <rect x="190" y="62" width="5" height="102" rx="2" fill="#10b981" opacity="0.2" className="dark:fill-emerald-400 dark:opacity-25" />
              <text x="175" y="118" textAnchor="middle" fontSize="9" fill="#10b981" className="dark:fill-emerald-400" transform="rotate(-90,175,118)">Candidate Key 2: Email</text>

              <rect x="190" y="62" width="5" height="102" rx="2" fill="#8b5cf6" opacity="0.2" className="dark:fill-purple-400 dark:opacity-25" />
              <text x="305" y="118" textAnchor="middle" fontSize="9" fill="#8b5cf6" className="dark:fill-purple-400" transform="rotate(-90,305,118)">Candidate Key 3: Phone</text>

              <rect x="190" y="62" width="5" height="102" rx="2" fill="#94a3b8" opacity="0.15" className="dark:fill-slate-500 dark:opacity-15" />
              <text x="420" y="118" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500" transform="rotate(-90,420,118)">Not Unique: Name</text>
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
              What is a Candidate Key?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">candidate key</strong>{" "}
              is a column (or a set of columns) in a table that has the ability
              to uniquely identify each row in that table. It is a potential
              <strong> primary key</strong> candidate. A table can have multiple
              candidate keys, but only one is chosen as the primary key.
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
                  Key Properties:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li><strong>Unique</strong> — No two rows have the same value</li>
                  <li><strong>NOT NULL</strong> — Every row must have a value</li>
                  <li><strong>Minimal</strong> — No unnecessary columns (irreducible)</li>
                  <li><strong>Multiple possible</strong> — A table can have several</li>
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
                  Think of candidate keys like <strong>job applicants</strong>{" "}
                  — multiple candidates are qualified (unique, NOT NULL), but
                  only one is hired as the <strong>primary key</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Candidate Key vs Primary Key ──────────────────── */}
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
              <span className="text-2xl">⚖️</span>
              Candidate Key vs Primary Key
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
                      Aspect
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-blue-600",
                        "dark:text-blue-400"
                      )}
                    >
                      Candidate Key
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-emerald-600",
                        "dark:text-emerald-400"
                      )}
                    >
                      Primary Key
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={clsx(
                    "divide-y divide-slate-200/60",
                    "dark:divide-slate-700/60"
                  )}
                >
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Definition</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">A column that could be a primary key</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">The selected candidate key</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Number per table</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Several</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Exactly one</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">NULL allowed?</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">No</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">No</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Used as foreign key?</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Can be, but not common</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Yes, commonly referenced</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Status</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Potential primary key</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">The chosen identifier</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Examples of Candidate Keys ────────────────────── */}
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
              <span className="text-2xl">📋</span>
              Examples of Candidate Keys
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
                  🏫 Students Table
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>StudentID</code> — Unique ID (surrogate)</li>
                  <li><code>Email</code> — Unique email address</li>
                  <li><code>Phone</code> — Unique phone number</li>
                  <li><code>Aadhaar</code> — Unique government ID</li>
                  <li><span className="text-xs text-slate-500">All are candidate keys</span></li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Chosen Primary Key: <code>StudentID</code>
                </div>
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
                  📚 Books Table
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>BookID</code> — Unique ID</li>
                  <li><code>ISBN</code> — International Standard Book Number</li>
                  <li><code>Barcode</code> — Library barcode</li>
                  <li><span className="text-xs text-slate-500">All are candidate keys</span></li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Chosen Primary Key: <code>BookID</code>
                </div>
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
                  👔 Employees Table
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>EmployeeID</code> — Unique ID</li>
                  <li><code>PAN</code> — Tax ID</li>
                  <li><code>Email</code> — Work email</li>
                  <li><code>Phone</code> — Mobile number</li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Chosen Primary Key: <code>EmployeeID</code>
                </div>
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
                  📦 Products Table
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>ProductID</code> — Unique ID</li>
                  <li><code>SKU</code> — Stock Keeping Unit</li>
                  <li><code>Barcode</code> — Product barcode</li>
                  <li><span className="text-xs text-slate-500">All are candidate keys</span></li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Chosen Primary Key: <code>ProductID</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Alternate Keys ────────────────────────────────── */}
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
              <span className="text-2xl">🔄</span>
              Alternate Keys
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              An <strong className="text-purple-600 dark:text-purple-400">alternate key</strong>{" "}
              is a candidate key that is <strong>not</strong> chosen as the
              primary key. All candidate keys except one become alternate keys.
              They still enforce uniqueness and can be used as unique constraints.
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
                  🔑 Candidate Keys
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>StudentID</li>
                  <li>Email</li>
                  <li>Phone</li>
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
                  🎯 Primary Key
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      StudentID
                    </span>{" "}
                    (chosen)
                  </li>
                </ul>
                <h4 className="mt-3 font-bold text-purple-700 dark:text-purple-300">
                  🔄 Alternate Keys
                </h4>
                <ul className="mt-1 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>
                    <span className="text-slate-500 dark:text-slate-500">Email</span>{" "}
                    (unique constraint)
                  </li>
                  <li>
                    <span className="text-slate-500 dark:text-slate-500">Phone</span>{" "}
                    (unique constraint)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Choosing a Primary Key from Candidate Keys ──── */}
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
              <span className="text-2xl">🎯</span>
              How to Choose the Primary Key from Candidate Keys
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
                  <strong>Choose the simplest:</strong> Prefer a single-column
                  key over a composite key. It's easier to work with and more
                  efficient.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Choose the most stable:</strong> Avoid columns that
                  change (like email, phone). A surrogate key is the safest
                  choice.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Choose the smallest:</strong> Smaller keys are more
                  efficient for indexing and relationships. <code>INT</code> is
                  better than <code>VARCHAR</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Choose a surrogate key:</strong> System-generated IDs
                  are stable, simple, and independent of business data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">➜</span>
                <span>
                  <strong>Consider future growth:</strong> Choose a data type
                  that can accommodate future rows without exceeding the limit.
                </span>
              </li>
            </ul>
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
              Real-World Example: University Student Database
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
                <strong>Abhronila</strong>, the database administrator at{" "}
                <strong>Shyamnagar</strong> University, is designing the
                Students table. She identifies these candidate keys:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <code>StudentID</code> — Auto-generated integer (surrogate)
                  </li>
                  <li>
                    <code>Email</code> — University email (unique)
                  </li>
                  <li>
                    <code>Aadhaar</code> — Government ID (unique)
                  </li>
                  <li>
                    <code>Phone</code> — Mobile number (unique)
                  </li>
                </ul>
                <strong>Decision process:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">✅ Chosen:</span>{" "}
                    <code>StudentID</code> — It's simple, stable, and system-generated.
                  </li>
                  <li>
                    <span className="font-bold text-purple-600 dark:text-purple-400">🔄 Alternate:</span>{" "}
                    <code>Email</code> — Unique constraint added, used for login.
                  </li>
                  <li>
                    <span className="font-bold text-purple-600 dark:text-purple-400">🔄 Alternate:</span>{" "}
                    <code>Aadhaar</code> — Unique constraint added, used for verification.
                  </li>
                  <li>
                    <span className="font-bold text-slate-500 dark:text-slate-500">❌ Not chosen:</span>{" "}
                    <code>Phone</code> — Might change, not as reliable.
                  </li>
                </ul>
                <strong>Why StudentID?</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Stable (never changes)</li>
                  <li>Small (INT)</li>
                  <li>Simple (single column)</li>
                  <li>Independent of business rules</li>
                </ul>
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
                  <strong>Identify all candidate keys early:</strong> During
                  design, list all columns that could serve as a unique
                  identifier. This helps you understand your data better.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use surrogate keys as primary keys:</strong> They are
                  always the safest choice. Natural keys can change or have
                  validation rules that evolve.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Add unique constraints for alternate keys:</strong>
                  Even if not the primary key, alternate keys should still have
                  <code>UNIQUE</code> constraints to enforce data integrity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Document your decisions:</strong> Explain why you
                  chose one candidate key as the primary key and how alternate
                  keys are used.
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
                  <strong>Assuming only one candidate key exists:</strong> Many
                  beginners think only the primary key is unique. Always look
                  for all candidate keys.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Choosing a changing column as primary key:</strong>
                  Using email or phone as a primary key is risky because they
                  can change.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring alternate keys:</strong> Candidate keys that
                  aren't chosen still need unique constraints to ensure data
                  quality.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using large candidate keys:</strong> If a candidate
                  key is large (like <code>VARCHAR(255)</code>), it's not a good
                  choice for a primary key due to performance.
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
                  <strong>Identify all candidate keys:</strong> During design,
                  list all columns that could be unique identifiers. This is a
                  key part of data modelling.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Prefer surrogate keys:</strong> Always choose a
                  system-generated key as the primary key for stability and
                  simplicity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Add unique constraints for alternate keys:</strong>
                  This ensures data integrity and prevents duplicates.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document candidate keys:</strong> Maintain a data
                  dictionary that lists all candidate keys and why they were
                  chosen or not.
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
                <span>I can define a candidate key and its properties</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the difference between candidate and primary keys</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify candidate keys in a table</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand what alternate keys are</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know how to choose a primary key from candidate keys</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for candidate key design</span>
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
            title="Candidate Key – FAQs"
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
              "Candidate keys are a crucial concept because they force you to think " +
              "about all the ways you might identify a row. I've seen students " +
              "jump straight to choosing a primary key without considering other " +
              "candidates. This is a mistake — understanding all candidate keys " +
              "helps you design better databases and enforce data integrity. " +
              "A practical exercise: take a real-world dataset and list all the " +
              "candidate keys. Then, decide which one to use as the primary key " +
              "and justify your choice. This is exactly what you'll do as a " +
              "database designer."
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
            Topic 19 · Candidate Key · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic19;