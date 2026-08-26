import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic22_files/topic22_note.txt?raw";
import questions from "./topic22_files/topic22_questions";

/**
 * Topic22 – Foreign Key
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain the concept of foreign keys — the mechanism for
 *          establishing relationships between tables and enforcing
 *          referential integrity. Covers properties, types, cascading
 *          actions, and best practices. Builds on Topics 18-21 (keys).
 */
const Topic22 = () => {
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

        .fk-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .fk-card:hover {
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
            Module 1 · Topic 22
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Foreign Key
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The link that connects tables — enforcing relationships and
            referential integrity in relational databases.
          </p>
        </div>

        {/* ─── SVG: Foreign Key Visualisation ──────────────── */}
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
              aria-label="Foreign key relationship between tables"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🔗 Foreign Key Links Students and Enrollments
              </text>

              {/* Students Table */}
              <rect x="30" y="40" width="220" height="135" rx="6" fill="none" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-400" />
              <rect x="30" y="40" width="220" height="25" rx="6" fill="#3b82f6" opacity="0.12" className="dark:fill-blue-400 dark:opacity-20" />
              <text x="140" y="57" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📊 Students</text>
              <text x="45" y="80" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">🔑 StudentID (PK)</text>
              <text x="45" y="98" fontSize="9" fill="#475569" className="dark:fill-slate-400">Name</text>
              <text x="45" y="116" fontSize="9" fill="#475569" className="dark:fill-slate-400">Class</text>
              <text x="45" y="134" fontSize="9" fill="#475569" className="dark:fill-slate-400">City</text>
              <text x="45" y="152" fontSize="9" fill="#475569" className="dark:fill-slate-400">...</text>

              {/* Enrollments Table */}
              <rect x="350" y="40" width="220" height="135" rx="6" fill="none" stroke="#8b5cf6" strokeWidth="2" className="dark:stroke-purple-400" />
              <rect x="350" y="40" width="220" height="25" rx="6" fill="#8b5cf6" opacity="0.12" className="dark:fill-purple-400 dark:opacity-20" />
              <text x="460" y="57" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📊 Enrollments</text>
              <text x="365" y="80" fontSize="9" fill="#1e293b" className="dark:fill-slate-200">EnrollID (PK)</text>
              <text x="365" y="98" fontSize="9" fill="#8b5cf6" className="dark:fill-purple-300">🔗 StudentID (FK)</text>
              <text x="365" y="116" fontSize="9" fill="#8b5cf6" className="dark:fill-purple-300">🔗 CourseID (FK)</text>
              <text x="365" y="134" fontSize="9" fill="#475569" className="dark:fill-slate-400">Grade</text>
              <text x="365" y="152" fontSize="9" fill="#475569" className="dark:fill-slate-400">...</text>

              {/* Arrow from Students to Enrollments */}
              <line x1="250" y1="100" x2="350" y2="100" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="6 4" className="dark:stroke-slate-500" />
              <polygon points="340,94 355,100 340,106" fill="#94a3b8" className="dark:fill-slate-500" />
              <text x="300" y="92" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Reference</text>
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
              What is a Foreign Key?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-purple-600 dark:text-purple-400">foreign key</strong>{" "}
              is a column (or set of columns) in one table that refers to the
              <strong> primary key</strong> (or a candidate key) of another
              table. It establishes a <strong>relationship</strong> between
              the two tables and enforces <strong>referential integrity</strong>.
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
                  <li>Establishes a <strong>relationship</strong> between tables</li>
                  <li>References the <strong>primary key</strong> of another table</li>
                  <li>Enforces <strong>referential integrity</strong></li>
                  <li>Prevents <strong>orphaned</strong> records</li>
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
                  Think of a foreign key like a <strong>reference number</strong>{" "}
                  on a form. For example, an order form includes a customer ID.
                  That ID refers to the customer's record in the customer table,
                  linking the order to the customer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Referential Integrity ─────────────────────────── */}
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
              <span className="text-2xl">🛡️</span>
              Referential Integrity
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              <strong>Referential integrity</strong> ensures that a foreign key
              value always points to an existing row in the referenced table.
              This prevents <strong>orphaned records</strong> and maintains
              data consistency.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-4 md:grid-cols-2",
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
                  ✅ Good — Referential Integrity Enforced
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Every enrollment has a valid StudentID</li>
                  <li>No orphaned enrollments</li>
                  <li>Can't delete a student with enrollments (unless CASCADE)</li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  Example: Student 101 exists, so enrollments with StudentID 101
                  are valid.
                </div>
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
                  ❌ Bad — Referential Integrity Violated
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Enrollment points to a non-existent StudentID</li>
                  <li>Orphaned records</li>
                  <li>Inconsistent data</li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  Example: Enrollment with StudentID 999, but no student with ID
                  999.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Creating Foreign Keys ─────────────────────────── */}
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
              Creating Foreign Keys in SQL
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
                  🔗 Foreign Key in CREATE TABLE
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Enrollments (
  EnrollID INT PRIMARY KEY,
  StudentID INT,
  CourseID VARCHAR(10),
  Grade CHAR(1),
  FOREIGN KEY (StudentID)
    REFERENCES Students(StudentID),
  FOREIGN KEY (CourseID)
    REFERENCES Courses(CourseID)
);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ StudentID references Students(StudentID)
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
                  📝 Adding Foreign Key After Creation
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`ALTER TABLE Enrollments
ADD CONSTRAINT FK_Enrollments_Students
FOREIGN KEY (StudentID)
REFERENCES Students(StudentID);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ⚠️ Data must have valid references
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
                  🔄 Composite Foreign Key
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Grades (
  StudentID INT,
  CourseID VARCHAR(10),
  Semester VARCHAR(10),
  Grade CHAR(1),
  PRIMARY KEY (StudentID, CourseID, Semester),
  FOREIGN KEY (StudentID, CourseID)
    REFERENCES Enrollments(StudentID, CourseID)
);`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ✅ References a composite primary key
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
                  🗑️ Dropping Foreign Key Constraint
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`ALTER TABLE Enrollments
DROP FOREIGN KEY FK_Enrollments_Students;`}
                </pre>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  ⚠️ Removes referential integrity
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Cascading Actions ────────────────────────────── */}
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
              Cascading Actions (ON DELETE / ON UPDATE)
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              When the referenced row is deleted or updated, you can specify
              actions to maintain referential integrity.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
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
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🚫 ON DELETE RESTRICT (default)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Prevents deletion of referenced row</li>
                  <li>Ensures no orphaned records</li>
                </ul>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`FOREIGN KEY (StudentID)
REFERENCES Students(StudentID)
ON DELETE RESTRICT`}
                </pre>
              </div>

              <div
                className={clsx(
                  "rounded-xl border p-4",
                  "border-red-200/50 bg-red-50/40",
                  "dark:border-red-700/50 dark:bg-red-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-red-700 dark:text-red-300">
                  🗑️ ON DELETE CASCADE
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Automatically deletes related rows</li>
                  <li>Use with caution! Data loss is permanent</li>
                </ul>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`FOREIGN KEY (StudentID)
REFERENCES Students(StudentID)
ON DELETE CASCADE`}
                </pre>
              </div>

              <div
                className={clsx(
                  "rounded-xl border p-4",
                  "border-amber-200/50 bg-amber-50/40",
                  "dark:border-amber-700/50 dark:bg-amber-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-amber-700 dark:text-amber-300">
                  🔄 ON DELETE SET NULL
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Sets foreign key to NULL when referenced row is deleted</li>
                  <li>Requires the column to allow NULL</li>
                </ul>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`FOREIGN KEY (StudentID)
REFERENCES Students(StudentID)
ON DELETE SET NULL`}
                </pre>
              </div>

              <div
                className={clsx(
                  "rounded-xl border p-4",
                  "border-purple-200/50 bg-purple-50/40",
                  "dark:border-purple-700/50 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  📝 ON DELETE SET DEFAULT
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Sets foreign key to default value when referenced row deleted</li>
                  <li>Requires a default value defined</li>
                </ul>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`FOREIGN KEY (StudentID)
REFERENCES Students(StudentID)
ON DELETE SET DEFAULT`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
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
              <span className="text-2xl">🌍</span>
              Real-World Example: E-Commerce Database
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
                <strong>Tuhina</strong> runs an online store in{" "}
                <strong>Shyamnagar</strong>. Her database uses foreign keys to
                link tables:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Customers Table:</strong> <code>CustomerID (PK)</code>
                  </li>
                  <li>
                    <strong>Orders Table:</strong> <code>OrderID (PK)</code>,{" "}
                    <code>CustomerID (FK)</code> — links to Customers
                  </li>
                  <li>
                    <strong>Order_Items Table:</strong> <code>OrderID (FK)</code>,
                    <code>ProductID (FK)</code> — links to Orders and Products
                  </li>
                  <li>
                    <strong>Products Table:</strong> <code>ProductID (PK)</code>
                  </li>
                </ul>
                <strong>How foreign keys protect data:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Can't have an order for a non-existent customer</strong>{" "}
                    — <code>Orders.CustomerID</code> must exist in{" "}
                    <code>Customers</code>.
                  </li>
                  <li>
                    <strong>Can't have an order item for a non-existent product</strong>{" "}
                    — <code>Order_Items.ProductID</code> must exist in{" "}
                    <code>Products</code>.
                  </li>
                  <li>
                    <strong>If a customer is deleted:</strong> With{" "}
                    <code>ON DELETE CASCADE</code>, their orders and order items
                    are also deleted (or set to NULL).
                  </li>
                </ul>
                <strong>SQL:</strong>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  CustomerID INT,
  OrderDate DATE,
  FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID)
    ON DELETE CASCADE
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
          style={{ animationDelay: "700ms" }}
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
                  <strong>Always define foreign keys:</strong> They enforce
                  relationships and prevent orphaned records. Don't rely only on
                  application logic.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use meaningful names:</strong> Name foreign key
                  constraints descriptively, e.g.,{" "}
                  <code>FK_Enrollments_Students</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Be careful with CASCADE:</strong> <code>ON DELETE
                  CASCADE</code> can cause unintended data loss. Use it only
                  when you're sure.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Index foreign keys:</strong> Foreign key columns
                  should be indexed for join performance. Many RDBMS do this
                  automatically.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "800ms" }}
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
                  <strong>Not defining foreign keys:</strong> This creates
                  orphaned records and makes joins unreliable.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using CASCADE without thinking:</strong> Accidentally
                  deleting a parent row can wipe out child tables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Forgetting data type compatibility:</strong> A foreign
                  key must have the same data type as the referenced primary key.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Over-constraining with foreign keys:</strong> Too many
                  foreign keys can slow down inserts/updates and make the schema
                  rigid.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "900ms" }}
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
                  <strong>Define foreign keys for all relationships:</strong>
                  Every relationship between tables should be enforced by a
                  foreign key.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use appropriate referential actions:</strong> Choose
                  <code>RESTRICT</code> for most cases, <code>CASCADE</code> for
                  weak relationships, and <code>SET NULL</code> for optional
                  relationships.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Index foreign keys:</strong> Ensure foreign key columns
                  have indexes to speed up joins and queries.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document foreign key relationships:</strong> Maintain
                  an ER diagram showing all foreign key relationships.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
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
                <span>I can define a foreign key and its purpose</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand referential integrity</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can create foreign keys using SQL (CREATE TABLE, ALTER TABLE)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the different cascading actions (RESTRICT, CASCADE, SET NULL, SET DEFAULT)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for using foreign keys</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
        >
          <FAQTemplate
            title="Foreign Key – FAQs"
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
            title="Foreign Key"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic22_note.txt"
          />
        </section>

        {/* ─── Teacher's Note ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
        >
          <Teacher
            note={
              "Foreign keys are the unsung heroes of relational databases. They're " +
              "the glue that holds the database together. I always tell my students: " +
              "'If you don't have foreign keys, you don't have a relational database.' " +
              "They enforce relationships and protect your data from inconsistencies. " +
              "Practice creating foreign keys and experiment with cascading actions " +
              "in a test database — see what happens when you delete a parent record. " +
              "Understanding foreign keys is essential for any database designer or " +
              "developer. Don't skip them!"
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
            Topic 22 · Foreign Key · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic22;