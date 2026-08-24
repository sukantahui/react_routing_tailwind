import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic20_files/topic20_questions";

/**
 * Topic20 – Alternate Key
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain the concept of alternate keys — candidate keys that
 *          are not chosen as the primary key but still enforce uniqueness.
 *          Covers properties, usage, and importance in database design.
 *          Builds on Topics 18 (Primary Key) and 19 (Candidate Key).
 */
const Topic20 = () => {
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

        .key-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .key-card:hover {
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
            Module 1 · Topic 20
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Alternate Key
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The candidate keys that didn't make the cut — but are still
            essential for data integrity.
          </p>
        </div>

        {/* ─── SVG: Alternate Key Visualisation ────────────── */}
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
              aria-label="Alternate key visualisation"
            >
              <rect width="600" height="220" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🔑 Candidate Keys → Primary + Alternate
              </text>

              {/* Candidate Keys Container */}
              <rect x="40" y="40" width="520" height="160" rx="10" fill="#f8fafc" className="dark:fill-slate-800/50 dark:stroke-slate-500" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />

              {/* Primary Key */}
              <rect x="60" y="55" width="220" height="55" rx="8" fill="#3b82f6" opacity="0.12" className="dark:fill-blue-400 dark:opacity-20 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="2" />
              <text x="170" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🎯 Primary Key</text>
              <text x="170" y="95" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">StudentID (chosen)</text>

              {/* Alternate Keys */}
              <rect x="310" y="55" width="220" height="55" rx="8" fill="#8b5cf6" opacity="0.1" className="dark:fill-purple-400 dark:opacity-15 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="2" />
              <text x="420" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🔄 Alternate Keys</text>
              <text x="420" y="95" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Email, Phone</text>

              {/* Arrow from candidate keys */}
              <text x="300" y="140" textAnchor="middle" fontSize="11" fill="#94a3b8" className="dark:fill-slate-500">⬆ All Candidate Keys ⬆</text>

              {/* Legend */}
              <rect x="80" y="165" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.2" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="98" y="175" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">Primary Key</text>

              <rect x="220" y="165" width="12" height="12" rx="2" fill="#8b5cf6" opacity="0.2" className="dark:fill-purple-400 dark:opacity-20" />
              <text x="238" y="175" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">Alternate Keys</text>

              <rect x="380" y="165" width="12" height="12" rx="2" fill="#94a3b8" opacity="0.2" className="dark:fill-slate-500 dark:opacity-15" />
              <text x="398" y="175" fontSize="10" fill="#1e293b" className="dark:fill-slate-300">Not Candidate Keys</text>
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
              What is an Alternate Key?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              An <strong className="text-purple-600 dark:text-purple-400">alternate key</strong>{" "}
              is a <strong>candidate key</strong> that is <strong>not</strong>
              chosen as the <strong>primary key</strong> of a table. It is a
              unique, NOT NULL column (or set of columns) that could have been
              the primary key but was not selected. Alternate keys are often
              implemented as <strong>UNIQUE constraints</strong> to enforce
              data integrity.
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
                  <li>Alternate key is a <strong>candidate key</strong></li>
                  <li>It is <strong>unique</strong> and <strong>NOT NULL</strong></li>
                  <li>It is <strong>not</strong> the primary key</li>
                  <li>Also called <strong>secondary key</strong></li>
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
                  Think of alternate keys like <strong>backup singers</strong>{" "}
                  in a band. The lead singer is the primary key, but the backup
                  singers (alternate keys) are also talented and essential for
                  the performance (data integrity).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Relationship ────────────────────────────── */}
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
              <span className="text-2xl">🔗</span>
              Relationship Between Keys
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
                      Key Type
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Definition
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Example
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Constraint
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
                    <td className="px-4 py-3 font-medium">Candidate Key</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">A column that can uniquely identify a row</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">StudentID, Email, Phone</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">UNIQUE + NOT NULL</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Primary Key</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">The chosen candidate key</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">StudentID</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">PRIMARY KEY</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Alternate Key</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">A candidate key not chosen as primary</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Email, Phone</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">UNIQUE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Examples ──────────────────────────────────────── */}
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
              Examples of Alternate Keys
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
                  <li>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Primary Key:</span>{" "}
                    StudentID
                  </li>
                  <li>
                    <span className="font-bold text-purple-600 dark:text-purple-400">Alternate Keys:</span>
                  </li>
                  <ul className="ml-5 list-disc text-slate-600 dark:text-slate-400">
                    <li>Email</li>
                    <li>Phone</li>
                    <li>Aadhaar</li>
                  </ul>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Each alternate key has a UNIQUE constraint
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
                  <li>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Primary Key:</span>{" "}
                    BookID
                  </li>
                  <li>
                    <span className="font-bold text-purple-600 dark:text-purple-400">Alternate Keys:</span>
                  </li>
                  <ul className="ml-5 list-disc text-slate-600 dark:text-slate-400">
                    <li>ISBN</li>
                    <li>Barcode</li>
                  </ul>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ ISBN and Barcode are unique identifiers
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
                  <li>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Primary Key:</span>{" "}
                    EmployeeID
                  </li>
                  <li>
                    <span className="font-bold text-purple-600 dark:text-purple-400">Alternate Keys:</span>
                  </li>
                  <ul className="ml-5 list-disc text-slate-600 dark:text-slate-400">
                    <li>PAN</li>
                    <li>Email</li>
                  </ul>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ PAN and Email are unique and NOT NULL
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
                  <li>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Primary Key:</span>{" "}
                    ProductID
                  </li>
                  <li>
                    <span className="font-bold text-purple-600 dark:text-purple-400">Alternate Keys:</span>
                  </li>
                  <ul className="ml-5 list-disc text-slate-600 dark:text-slate-400">
                    <li>SKU</li>
                    <li>Barcode</li>
                  </ul>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ SKU and Barcode are unique identifiers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Implementing Alternate Keys in SQL ───────────── */}
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
              <span className="text-2xl">💻</span>
              Implementing Alternate Keys in SQL
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
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🔑 Creating Table with Alternate Keys
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Students (
  StudentID INT PRIMARY KEY,
  Name VARCHAR(50),
  Email VARCHAR(100) UNIQUE,
  Phone VARCHAR(15) UNIQUE,
  Aadhaar CHAR(12) UNIQUE
);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ UNIQUE constraints enforce alternate keys
                </p>
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
                  📝 Adding Alternate Key After Creation
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`-- Add UNIQUE constraint for Email
ALTER TABLE Students
ADD CONSTRAINT UQ_Students_Email
UNIQUE (Email);

-- Add UNIQUE constraint for Phone
ALTER TABLE Students
ADD CONSTRAINT UQ_Students_Phone
UNIQUE (Phone);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ⚠️ Table must have unique, non-null values
                </p>
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
                  🔍 Using Alternate Keys in Queries
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`-- Find student by email (alternate key)
SELECT * FROM Students
WHERE Email = 's@email.com';

-- Find student by phone (alternate key)
SELECT * FROM Students
WHERE Phone = '1234567890';`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Alternate keys can be used for searching
                </p>
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
                  🚫 Attempting Duplicate Alternate Key
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`-- This will fail because Email is UNIQUE
INSERT INTO Students (StudentID, Name, Email)
VALUES (101, 'New Student', 's@email.com');
-- ERROR: Duplicate entry 's@email.com'`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ⛔ UNIQUE constraint prevents duplicates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Importance of Alternate Keys ──────────────────── */}
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
              <span className="text-2xl">💡</span>
              Why Are Alternate Keys Important?
            </h2>
            <ul
              className={clsx(
                "space-y-2 text-sm leading-relaxed",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <li className="flex gap-3">
                <span className="text-purple-500 dark:text-purple-400">➜</span>
                <span>
                  <strong>Data Integrity:</strong> Alternate keys ensure that
                  critical business attributes (like email, phone) remain unique
                  across all rows.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 dark:text-purple-400">➜</span>
                <span>
                  <strong>Alternate Search Criteria:</strong> Users can search
                  using alternate keys (e.g., find a student by email) without
                  needing the primary key.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 dark:text-purple-400">➜</span>
                <span>
                  <strong>Relationship Flexibility:</strong> Alternate keys can
                  be referenced by foreign keys in other tables, providing
                  alternative ways to link tables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 dark:text-purple-400">➜</span>
                <span>
                  <strong>Future Proofing:</strong> If you ever need to change
                  the primary key, alternate keys provide fallback identifiers.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 dark:text-purple-400">➜</span>
                <span>
                  <strong>Compliance:</strong> Some regulations require certain
                  attributes (like Aadhaar, PAN) to be unique and tracked
                  separately.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Alternate Keys vs Unique Index ───────────────── */}
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
                "mb-4 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">⚖️</span>
              Alternate Keys vs Unique Index
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
                        "px-4 py-3 font-semibold text-purple-600",
                        "dark:text-purple-400"
                      )}
                    >
                      Alternate Key
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-blue-600",
                        "dark:text-blue-400"
                      )}
                    >
                      Unique Index
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
                    <td className="px-4 py-3 font-medium">Purpose</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Enforce data uniqueness (logical)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Speed up queries (physical)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Implemented by</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">UNIQUE constraint</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">CREATE UNIQUE INDEX</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">NULL allowed?</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Usually one NULL allowed</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Usually one NULL allowed</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Part of constraints?</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Yes, it's a constraint</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">No, it's an index</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">When to use</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Enforce business uniqueness</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Performance tuning</td>
                  </tr>
                </tbody>
              </table>
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
              Real-World Example: Healthcare System
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
                <strong>Dr. Debangshu</strong> runs a hospital in{" "}
                <strong>Naihati</strong>. His patient database uses alternate keys
                effectively:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Patients Table:</strong>
                    <ul className="ml-5 list-disc">
                      <li>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">Primary Key:</span>{" "}
                        PatientID (surrogate)
                      </li>
                      <li>
                        <span className="font-bold text-purple-600 dark:text-purple-400">Alternate Keys:</span>
                      </li>
                      <ul className="ml-5 list-disc">
                        <li>Email — for communication and login</li>
                        <li>Phone — for SMS and emergency contact</li>
                        <li>Aadhaar — for government reporting</li>
                      </ul>
                    </ul>
                  </li>
                </ul>
                <strong>Why alternate keys are critical here:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Search by alternate key:</strong> Receptionists
                    search by phone number quickly.
                  </li>
                  <li>
                    <strong>Data integrity:</strong> No two patients can have
                    the same Aadhaar — enforced by UNIQUE constraint.
                  </li>
                  <li>
                    <strong>Future-proofing:</strong> If the hospital switches
                    to a new patient ID system, they can still use Aadhaar or
                    Email as identifiers.
                  </li>
                </ul>
                <strong>SQL Implementation:</strong>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Patients (
  PatientID INT PRIMARY KEY,
  Name VARCHAR(100),
  Email VARCHAR(100) UNIQUE,
  Phone VARCHAR(15) UNIQUE,
  Aadhaar CHAR(12) UNIQUE
);`}
                </pre>
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
                  <strong>Always identify alternate keys:</strong> During design,
                  list all candidate keys. Those not chosen as primary become
                  alternate keys — add UNIQUE constraints.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use alternate keys for searching:</strong> Index
                  alternate keys to speed up queries that search by email,
                  phone, etc.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Consider alternate keys for foreign keys:</strong>
                  Sometimes it's better to reference a natural alternate key
                  (like Email) rather than the surrogate primary key, for
                  readability.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Document alternate keys:</strong> In your data
                  dictionary, clearly mark which columns are alternate keys
                  and why they are unique.
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
                  <strong>Not adding UNIQUE constraints:</strong> If you don't
                  enforce uniqueness on alternate keys, duplicates can slip in,
                  violating business rules.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overlooking alternate keys in migrations:</strong> When
                  importing data, ensure alternate keys are handled correctly
                  to avoid duplicates.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Assuming alternate keys are not needed:</strong> If
                  you only rely on the primary key, you might miss important
                  uniqueness constraints.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Forgetting to index alternate keys:</strong> While
                  UNIQUE constraints create indexes automatically in most RDBMS,
                  some don't. Always verify.
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
                  <strong>Enforce uniqueness:</strong> Always add UNIQUE
                  constraints for alternate keys to guarantee data integrity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Index alternate keys:</strong> For columns used in
                  searches, create indexes (UNIQUE or non-unique) to speed up
                  queries.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use meaningful names:</strong> Name UNIQUE constraints
                  clearly, e.g., <code>UQ_Students_Email</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Review alternate keys regularly:</strong> Business
                  rules change. Re-evaluate whether alternate keys are still
                  relevant.
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
                <span>I can define an alternate key</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the relationship between candidate, primary, and alternate keys</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify alternate keys in a table</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can implement alternate keys using UNIQUE constraints in SQL</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the importance of alternate keys for data integrity</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for using alternate keys</span>
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
            title="Alternate Key – FAQs"
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
              "Alternate keys are often treated as second-class citizens, but they're " +
              "just as important for data integrity. I've seen many databases fail " +
              "because alternate keys weren't enforced — duplicate emails, phone numbers, " +
              "and IDs caused chaos. The key lesson: 'If it's unique, enforce it.' " +
              "Don't rely on the application to enforce uniqueness; do it at the " +
              "database level with UNIQUE constraints. And always remember: the " +
              "primary key is the star, but alternate keys are the supporting cast — " +
              "without them, the show doesn't go on."
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
            Topic 20 · Alternate Key · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic20;