import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic21_files/topic21_questions";

/**
 * Topic21 – Composite Key
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain the concept of composite keys — primary keys that
 *          consist of two or more columns. Covers when to use them,
 *          how to create them, advantages and disadvantages.
 *          Builds on Topics 18-20 (Primary, Candidate, Alternate Keys).
 */
const Topic21 = () => {
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
            Module 1 · Topic 21
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Composite Key
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            When one column isn't enough — combining two or more columns to
            uniquely identify rows.
          </p>
        </div>

        {/* ─── SVG: Composite Key Visualisation ────────────── */}
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
              aria-label="Composite key visualisation"
            >
              <rect width="600" height="220" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🔗 Composite Key: (StudentID, CourseID)
              </text>

              {/* Table Frame */}
              <rect x="40" y="40" width="520" height="155" rx="6" fill="none" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />

              {/* Header */}
              <rect x="40" y="40" width="520" height="25" rx="6" fill="#f1f5f9" className="dark:fill-slate-700" />
              <text x="90" y="57" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🔑 StudentID</text>
              <text x="190" y="57" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🔑 CourseID</text>
              <text x="300" y="57" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Grade</text>
              <text x="400" y="57" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Semester</text>
              <text x="490" y="57" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">Year</text>

              {/* Data Rows */}
              <rect x="50" y="68" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="80" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">101</text>
              <rect x="50" y="68" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="190" y="80" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">CS101</text>
              <text x="300" y="80" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">A</text>
              <text x="400" y="80" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Fall</text>
              <text x="490" y="80" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">2024</text>

              <rect x="50" y="90" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="102" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">101</text>
              <rect x="50" y="90" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="190" y="102" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">MATH202</text>
              <text x="300" y="102" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">B</text>
              <text x="400" y="102" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Fall</text>
              <text x="490" y="102" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">2024</text>

              <rect x="50" y="112" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="124" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">102</text>
              <rect x="50" y="112" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="190" y="124" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">CS101</text>
              <text x="300" y="124" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">A+</text>
              <text x="400" y="124" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Spring</text>
              <text x="490" y="124" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">2025</text>

              <rect x="50" y="134" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="146" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">102</text>
              <rect x="50" y="134" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="190" y="146" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">PHY301</text>
              <text x="300" y="146" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">B+</text>
              <text x="400" y="146" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Spring</text>
              <text x="490" y="146" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">2025</text>

              <rect x="50" y="156" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="90" y="168" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">103</text>
              <rect x="50" y="156" width="140" height="18" rx="2" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-25" />
              <text x="190" y="168" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">CS101</text>
              <text x="300" y="168" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">A</text>
              <text x="400" y="168" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Spring</text>
              <text x="490" y="168" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">2025</text>

              {/* Labels */}
              <text x="30" y="110" textAnchor="middle" fontSize="9" fill="#3b82f6" className="dark:fill-blue-400" transform="rotate(-90,30,110)">Composite Primary Key (StudentID, CourseID)</text>
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
              What is a Composite Key?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">composite key</strong>{" "}
              (also called a <strong>compound key</strong>) is a primary key that
              consists of <strong>two or more columns</strong>. The combination
              of these columns must be unique for each row, even though each
              individual column may contain duplicates.
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
                  <li>Made up of <strong>multiple columns</strong></li>
                  <li>The <strong>combination</strong> must be unique</li>
                  <li>Each column alone may have duplicates</li>
                  <li>Often used in <strong>junction</strong> tables (many-to-many)</li>
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
                  Think of a composite key like a <strong>coordinate pair</strong>{" "}
                  (x, y) — each coordinate alone doesn't identify a unique point,
                  but together they do. A single column is not enough; you need
                  the combination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── When to Use Composite Keys ────────────────────── */}
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
              <span className="text-2xl">🎯</span>
              When to Use Composite Keys
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🔗",
                  title: "Many-to-Many Relationships",
                  desc: "In junction tables, the combination of two foreign keys forms a natural composite primary key.",
                  detail: "Example: Enrollments (StudentID, CourseID).",
                  color: "blue",
                },
                {
                  icon: "📋",
                  title: "Data Dependencies",
                  desc: "When no single column is unique, but a combination of columns is.",
                  detail: "Example: Orders (OrderNumber, ProductCode) where an order can have multiple products.",
                  color: "purple",
                },
                {
                  icon: "📐",
                  title: "Natural Keys",
                  desc: "Sometimes the real-world business key is naturally composite.",
                  detail: "Example: (First_Name, Last_Name, DOB) for a person.",
                  color: "emerald",
                },
                {
                  icon: "📊",
                  title: "Historical Data",
                  desc: "When you need to track versions or time-based uniqueness.",
                  detail: "Example: (EmployeeID, EffectiveDate) for salary history.",
                  color: "amber",
                },
              ].map((item, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  amber: "text-amber-700 dark:text-amber-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "key-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[item.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h3
                        className={clsx(
                          "font-bold",
                          textColorMap[item.color]
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {item.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Creating Composite Keys in SQL ───────────────── */}
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
              <span className="text-2xl">💻</span>
              Creating Composite Keys in SQL
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
                  🔑 Composite Primary Key (Table-Level)
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Enrollments (
  StudentID INT,
  CourseID INT,
  Grade CHAR(1),
  Semester VARCHAR(10),
  PRIMARY KEY (StudentID, CourseID)
);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Combination of StudentID and CourseID is unique
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
                  📝 Composite Unique Constraint
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  ProductCode VARCHAR(20),
  Quantity INT,
  CONSTRAINT UQ_Order_Product
    UNIQUE (OrderID, ProductCode)
);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ This is a unique constraint, not a primary key
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
                  📋 Adding Composite Key After Creation
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`-- Add composite primary key
ALTER TABLE Enrollments
ADD PRIMARY KEY (StudentID, CourseID);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ⚠️ The columns must have unique combinations
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
                  🔍 Querying with Composite Key
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`-- Find grade for a specific enrollment
SELECT Grade FROM Enrollments
WHERE StudentID = 101
  AND CourseID = 'CS101';

-- Delete a specific enrollment
DELETE FROM Enrollments
WHERE StudentID = 101
  AND CourseID = 'CS101';`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ Use both columns in WHERE clause
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Advantages and Disadvantages ──────────────────── */}
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
                "mb-4 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">⚖️</span>
              Advantages and Disadvantages of Composite Keys
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  ✅ Advantages
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Natural representation of many-to-many relationships</li>
                  <li>No need for a separate surrogate key</li>
                  <li>Ensures uniqueness based on business rules</li>
                  <li>Can improve query performance in some cases</li>
                  <li>Self-documenting — the key explains the relationship</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-red-200/50 p-4",
                  "dark:border-red-700/50",
                  "bg-red-50/40 dark:bg-red-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-red-700 dark:text-red-300">
                  ❌ Disadvantages
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>More complex to query (need to join on multiple columns)</li>
                  <li>Larger indexes (multiple columns)</li>
                  <li>Harder to change if business rules change</li>
                  <li>Can be overkill for simple tables</li>
                  <li>May not be supported by all frameworks (e.g., ORM)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Composite Key vs Surrogate Key ────────────────── */}
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
                "mb-4 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">⚖️</span>
              Composite Key vs Surrogate Key
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
                      Composite Key
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-emerald-600",
                        "dark:text-emerald-400"
                      )}
                    >
                      Surrogate Key
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
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Multiple business columns</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Single system-generated ID</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Meaning</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Has business significance</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">No business meaning</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Number of columns</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">2 or more</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">1</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Stability</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Can change if business rules change</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Stable (never changes)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Query complexity</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">More complex (multiple columns in JOIN)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Simple (single column)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Index size</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Larger</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Smaller</td>
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
              Real-World Example: University Enrollment System
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
                <strong>Swadeep</strong> is the database architect for{" "}
                <strong>Shyamnagar</strong> University. He designs the
                <code className="mx-1 bg-white/80 px-1.5 py-0.5 rounded dark:bg-slate-700/40">Enrollments</code>{" "}
                table:
                <br />
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Enrollments (
  StudentID INT NOT NULL,
  CourseID VARCHAR(10) NOT NULL,
  Semester VARCHAR(10) NOT NULL,
  Year INT NOT NULL,
  Grade CHAR(2),
  PRIMARY KEY (StudentID, CourseID, Semester, Year)
);`}
                </pre>
                <strong>Why a composite key?</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    A student (StudentID) can take the same course in different
                    semesters (e.g., CS101 in Fall 2024 and Spring 2025).
                  </li>
                  <li>
                    The combination of <code>(StudentID, CourseID, Semester, Year)</code>{" "}
                    uniquely identifies each enrollment.
                  </li>
                  <li>
                    A surrogate key would also work, but the composite key
                    naturally represents the business rule.
                  </li>
                </ul>
                <strong>Query example:</strong>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`-- Find grade for a specific enrollment
SELECT Grade FROM Enrollments
WHERE StudentID = 101
  AND CourseID = 'CS101'
  AND Semester = 'Fall'
  AND Year = 2024;`}
                </pre>
                <strong>Decision:</strong> Swadeep chose a composite key because
                it reflects the natural uniqueness of the business rule and
                avoids an unnecessary surrogate column.
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
                  <strong>Use composite keys in junction tables:</strong> For
                  many-to-many relationships, a composite key made of the two
                  foreign keys is natural and efficient.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Keep composite keys minimal:</strong> Use the fewest
                  columns necessary to ensure uniqueness. Too many columns
                  complicate queries and indexes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Consider surrogate keys for stability:</strong> If the
                  business rules for uniqueness are likely to change, a surrogate
                  key is safer.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Index composite keys wisely:</strong> The order of
                  columns in a composite key matters for query performance.
                  Put the most selective column first.
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
                  <strong>Assuming any combination works:</strong> Not every
                  set of columns is a valid composite key. The combination must
                  be unique and minimal.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Making the key too large:</strong> Composite keys with
                  many columns are unwieldy and slow. Keep them small (2-3 columns
                  max).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Forgetting the order:</strong> The order of columns in
                  a composite key affects indexing and query performance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Changing composite key columns:</strong> If the
                  business definition of uniqueness changes, updating a composite
                  key is difficult and error-prone.
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
                  <strong>Use composite keys for junction tables:</strong> They
                  are the natural choice for many-to-many relationships.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Keep it simple:</strong> Use a composite key only when
                  a single column is insufficient. Otherwise, use a single-column
                  primary key.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Define foreign keys correctly:</strong> When a table
                  has a composite primary key, all foreign keys referencing it
                  must also be composite.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Consider using a surrogate key:</strong> If you're
                  uncertain about the stability of the composite key, use a
                  surrogate key and add a unique constraint on the combination.
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
                <span>I can define a composite key</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand when to use composite keys</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can create composite keys using SQL (CREATE TABLE, ALTER TABLE)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the advantages and disadvantages</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can choose between composite and surrogate keys</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for composite keys</span>
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
            title="Composite Key – FAQs"
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
              "Composite keys are a powerful tool, but they come with complexity. " +
              "I advise students: 'Use a composite key when it naturally represents " +
              "the business rule, but always consider a surrogate key as an alternative.' " +
              "The most common use case is junction tables for many-to-many relationships. " +
              "The key insight is that the combination of columns must be unique and " +
              "minimal. Don't just throw columns together — understand the business " +
              "uniqueness. Also, remember the performance implications: composite " +
              "keys are larger and can slow down joins. Weigh the pros and cons " +
              "carefully."
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
            Topic 21 · Composite Key · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic21;