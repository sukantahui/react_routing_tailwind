import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic17_files/topic17_questions";

/**
 * Topic17 – Domains and Data Types
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the concept of domains (the set of allowed values)
 *          and data types (how data is stored and processed) in
 *          relational databases. Builds on Topics 15-16 (Tables,
 *          Rows, and Columns).
 */
const Topic17 = () => {
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

  // ─── Data Types Table ──────────────────────────────────────
  const dataTypes = [
    {
      category: "Numeric",
      types: [
        { name: "INT", desc: "Integer (whole numbers)", size: "4 bytes", range: "-2,147,483,648 to 2,147,483,647" },
        { name: "SMALLINT", desc: "Small integer", size: "2 bytes", range: "-32,768 to 32,767" },
        { name: "TINYINT", desc: "Very small integer", size: "1 byte", range: "-128 to 127" },
        { name: "BIGINT", desc: "Large integer", size: "8 bytes", range: "-9.2e18 to 9.2e18" },
        { name: "DECIMAL(p,s)", desc: "Exact numeric with precision p and scale s", size: "Variable", range: "Up to 65 digits" },
        { name: "FLOAT", desc: "Approximate numeric (floating point)", size: "4 or 8 bytes", range: "Approximate" },
      ],
      color: "blue",
    },
    {
      category: "String",
      types: [
        { name: "CHAR(n)", desc: "Fixed-length string (padded with spaces)", size: "n bytes", range: "0 to 255 characters" },
        { name: "VARCHAR(n)", desc: "Variable-length string (storage depends on actual length)", size: "n bytes max", range: "0 to 65,535 characters" },
        { name: "TEXT", desc: "Large variable-length string", size: "Up to 65,535 bytes", range: "For long text" },
        { name: "BLOB", desc: "Binary large object (for images, files)", size: "Variable", range: "Up to 65,535 bytes" },
      ],
      color: "emerald",
    },
    {
      category: "Date/Time",
      types: [
        { name: "DATE", desc: "Date value (year, month, day)", size: "3 bytes", range: "1000-01-01 to 9999-12-31" },
        { name: "TIME", desc: "Time value (hours, minutes, seconds)", size: "3 bytes", range: "-838:59:59 to 838:59:59" },
        { name: "DATETIME", desc: "Date and time combined", size: "8 bytes", range: "1000-01-01 00:00:00 to 9999-12-31 23:59:59" },
        { name: "TIMESTAMP", desc: "Date and time with time zone", size: "4 bytes", range: "1970-01-01 to 2038-01-19" },
        { name: "YEAR", desc: "Year value", size: "1 byte", range: "1901 to 2155" },
      ],
      color: "purple",
    },
    {
      category: "Boolean",
      types: [
        { name: "BOOLEAN", desc: "TRUE or FALSE values", size: "1 byte", range: "TRUE, FALSE, NULL" },
        { name: "BIT(n)", desc: "Bit-field (n bits)", size: "1-8 bytes", range: "Up to 64 bits" },
      ],
      color: "amber",
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

        .type-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .type-card:hover {
          box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.05);
        }

        .domain-row:hover {
          background-color: rgba(59, 130, 246, 0.05);
        }
        .dark .domain-row:hover {
          background-color: rgba(59, 130, 246, 0.1);
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
            Module 1 · Topic 17
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Domains
            </span>
            <span className="text-slate-400 dark:text-slate-500"> and </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Data Types
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Understanding what values can be stored in each column — the rules
            that govern the data in your database.
          </p>
        </div>

        {/* ─── SVG: Domain and Data Type ────────────────────── */}
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
              aria-label="Domain and data type visualisation"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🔒 Domain: Set of Allowed Values
              </text>

              {/* Domain box */}
              <rect x="40" y="40" width="520" height="60" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 4" />
              <text x="300" y="65" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Domain: Integers 1 to 100</text>
              <text x="300" y="85" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Allowed: 1, 2, 3, ..., 99, 100</text>

              {/* Data Type box */}
              <rect x="40" y="115" width="520" height="60" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 4" />
              <text x="300" y="140" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">📊 Data Type: INT</text>
              <text x="300" y="160" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Storage: 4 bytes · Range: -2,147,483,648 to 2,147,483,647</text>

              {/* Labels */}
              <text x="20" y="65" textAnchor="start" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">← Domain (Semantic)</text>
              <text x="20" y="140" textAnchor="start" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">← Data Type (Physical)</text>
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
              What is a Domain?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-blue-600 dark:text-blue-400">domain</strong>{" "}
              is the set of all allowable values for a column (attribute) in a
              table. It defines the <em>semantic</em> rules for the data —
              what values make sense for that particular attribute.
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
                  <li>A domain is a <strong>conceptual</strong> constraint</li>
                  <li>It defines <strong>allowed values</strong> (e.g., 0-100 for marks)</li>
                  <li>It is enforced by <strong>data types</strong> and <strong>constraints</strong></li>
                  <li>Domains enhance <strong>data integrity</strong></li>
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
                  Think of a domain as the rules for a game. The data type is
                  the equipment (e.g., a ball). The domain tells you what you
                  can do with it (e.g., it must be thrown underhand).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Understanding Domains ─────────────────────────── */}
<section
  ref={addRef}
  className="reveal-section mb-10"
  style={{ animationDelay: "250ms" }}
>
  <div
    className={clsx(
      "rounded-2xl border border-blue-200/60 bg-white/50 p-6",
      "dark:border-blue-700/60 dark:bg-slate-800/20",
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
      Understanding Domains
    </h2>

    <p
      className={clsx(
        "leading-relaxed text-slate-700 dark:text-slate-300"
      )}
    >
      A <strong className="text-blue-600 dark:text-blue-400">domain</strong>
      defines the set of values that are allowed for an attribute (column).
      It acts like a <strong>rule book</strong> that tells the database which
      values are valid and which values should be rejected.
    </p>

    {/* Example Table */}
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
        <thead className="bg-blue-100 dark:bg-blue-900/30">
          <tr>
            <th className="px-4 py-3 text-left">Column</th>
            <th className="px-4 py-3 text-left">Domain (Allowed Values)</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">

          <tr>
            <td className="px-4 py-3 font-semibold">Age</td>
            <td className="px-4 py-3">0 – 120</td>
          </tr>

          <tr>
            <td className="px-4 py-3 font-semibold">Marks</td>
            <td className="px-4 py-3">0 – 100</td>
          </tr>

          <tr>
            <td className="px-4 py-3 font-semibold">Gender</td>
            <td className="px-4 py-3">Male, Female, Other</td>
          </tr>

          <tr>
            <td className="px-4 py-3 font-semibold">Blood Group</td>
            <td className="px-4 py-3">
              A+, A-, B+, B-, AB+, AB-, O+, O-
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    {/* Allowed vs Not Allowed */}
    <div className="mt-6 grid gap-4 md:grid-cols-2">

      <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">

        <h3 className="font-bold text-green-700 dark:text-green-300">
          ✅ Allowed Values
        </h3>

        <ul className="mt-3 list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
          <li>Age = 25</li>
          <li>Marks = 92</li>
          <li>Gender = Female</li>
          <li>Blood Group = O+</li>
        </ul>

      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">

        <h3 className="font-bold text-red-700 dark:text-red-300">
          ❌ Not Allowed Values
        </h3>

        <ul className="mt-3 list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
          <li>Age = -10</li>
          <li>Marks = 150</li>
          <li>Gender = Banana</li>
          <li>Blood Group = XYZ</li>
        </ul>

      </div>

    </div>

    {/* SQL Example */}

    <div className="mt-6 rounded-xl bg-slate-900 p-5 overflow-x-auto">

      <h3 className="mb-3 text-lg font-semibold text-white">
        💻 SQL Example
      </h3>

<pre className="text-sm text-green-300">
{`CREATE TABLE Student (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100),
    Age INT CHECK (Age BETWEEN 0 AND 120),
    Marks INT CHECK (Marks BETWEEN 0 AND 100),
    Gender VARCHAR(10)
        CHECK (Gender IN ('Male','Female','Other'))
);`}
</pre>

    </div>

    {/* Why Domains */}

    <div className="mt-6 rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20">

      <h3 className="font-bold text-blue-700 dark:text-blue-300">
        💡 Why Are Domains Important?
      </h3>

      <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
        <li>Prevent invalid data from entering the database.</li>
        <li>Maintain data consistency and accuracy.</li>
        <li>Enforce business rules automatically.</li>
        <li>Improve the reliability of reports and applications.</li>
        <li>Reduce human errors during data entry.</li>
      </ul>

    </div>

    {/* Memory Trick */}

    <div className="mt-6 rounded-xl border-l-4 border-blue-500 bg-slate-100 p-5 dark:bg-slate-800">

      <h3 className="font-bold text-slate-800 dark:text-white">
        🧠 Remember
      </h3>

      <p className="mt-2 text-slate-700 dark:text-slate-300">
        <strong>Data Type</strong> tells the database
        <strong> how to store</strong> the data.
      </p>

      <p className="text-slate-700 dark:text-slate-300">
        <strong>Domain</strong> tells the database
        <strong> which values are allowed.</strong>
      </p>

      <div className="mt-4 rounded-lg bg-blue-600 px-4 py-3 text-center text-lg font-bold text-white">
        Domain = Data Type + Business Rules
      </div>

    </div>

  </div>
</section>

        {/* ─── Data Types ────────────────────────────────────── */}
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
              <span className="text-2xl">📊</span>
              What is a Data Type?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              A <strong className="text-emerald-600 dark:text-emerald-400">data type</strong>{" "}
              defines the <em>physical</em> characteristics of a column — what
              kind of data it can store, how much storage it uses, and what
              operations are valid on it.
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
                  <li>Specifies <strong>storage format</strong></li>
                  <li>Determines <strong>storage size</strong></li>
                  <li>Enables <strong>operations</strong> (e.g., arithmetic on numbers)</li>
                  <li>Affects <strong>performance</strong> (e.g., indexing, sorting)</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-emerald-50/60 p-3",
                  "dark:bg-emerald-900/20"
                )}
              >
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Examples:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li><code>INT</code> — whole numbers</li>
                  <li><code>VARCHAR</code> — variable text</li>
                  <li><code>DATE</code> — date values</li>
                  <li><code>BOOLEAN</code> — true/false</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Domain vs Data Type ───────────────────────────── */}
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
              <span className="text-2xl">⚖️</span>
              Domain vs Data Type: The Distinction
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
                      Domain
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-emerald-600",
                        "dark:text-emerald-400"
                      )}
                    >
                      Data Type
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={clsx(
                    "divide-y divide-slate-200/60",
                    "dark:divide-slate-700/60"
                  )}
                >
                  <tr className="domain-row transition-colors">
                    <td className="px-4 py-3 font-medium">Definition</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Set of allowed values (semantic)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Storage and operation rules (physical)</td>
                  </tr>
                  <tr className="domain-row transition-colors">
                    <td className="px-4 py-3 font-medium">Examples</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">0-100 for marks, A-F for grades</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">INT, VARCHAR, DATE, BOOLEAN</td>
                  </tr>
                  <tr className="domain-row transition-colors">
                    <td className="px-4 py-3 font-medium">Enforced by</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">CHECK constraints, application logic</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Database engine (built-in)</td>
                  </tr>
                  <tr className="domain-row transition-colors">
                    <td className="px-4 py-3 font-medium">Level</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Business/application level</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Physical database level</td>
                  </tr>
                  <tr className="domain-row transition-colors">
                    <td className="px-4 py-3 font-medium">Example</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Marks must be between 0 and 100</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">INT (4 bytes, stores integer values)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Common Data Types ────────────────────────────── */}
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
              <span className="text-2xl">🗂️</span>
              Common Data Types in SQL (MySQL)
            </h2>
            <div className="space-y-6">
              {dataTypes.map((category, catIdx) => (
                <div key={catIdx}>
                  <h3
                    className={clsx(
                      "mb-2 text-lg font-semibold",
                      {
                        "text-blue-600 dark:text-blue-400": category.color === "blue",
                        "text-emerald-600 dark:text-emerald-400": category.color === "emerald",
                        "text-purple-600 dark:text-purple-400": category.color === "purple",
                        "text-amber-600 dark:text-amber-400": category.color === "amber",
                      }
                    )}
                  >
                    {category.category}
                  </h3>
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
                            "bg-slate-100/80 text-left",
                            "dark:bg-slate-800/60"
                          )}
                        >
                          <th
                            className={clsx(
                              "px-3 py-2 font-semibold text-slate-700",
                              "dark:text-slate-300"
                            )}
                          >
                            Data Type
                          </th>
                          <th
                            className={clsx(
                              "px-3 py-2 font-semibold text-slate-700",
                              "dark:text-slate-300"
                            )}
                          >
                            Description
                          </th>
                          <th
                            className={clsx(
                              "px-3 py-2 font-semibold text-slate-700",
                              "dark:text-slate-300"
                            )}
                          >
                            Storage
                          </th>
                          <th
                            className={clsx(
                              "px-3 py-2 font-semibold text-slate-700",
                              "dark:text-slate-300"
                            )}
                          >
                            Range
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={clsx(
                          "divide-y divide-slate-200/60",
                          "dark:divide-slate-700/60"
                        )}
                      >
                        {category.types.map((type, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                          >
                            <td
                              className={clsx(
                                "px-3 py-2 font-mono text-xs",
                                "text-slate-700 dark:text-slate-300"
                              )}
                            >
                              {type.name}
                            </td>
                            <td
                              className={clsx(
                                "px-3 py-2",
                                "text-slate-600 dark:text-slate-400"
                              )}
                            >
                              {type.desc}
                            </td>
                            <td
                              className={clsx(
                                "px-3 py-2",
                                "text-slate-600 dark:text-slate-400"
                              )}
                            >
                              {type.size}
                            </td>
                            <td
                              className={clsx(
                                "px-3 py-2 text-xs",
                                "text-slate-600 dark:text-slate-400"
                              )}
                            >
                              {type.range}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <p
              className={clsx(
                "mt-4 text-xs text-slate-500 dark:text-slate-500"
              )}
            >
              * Data types may vary across RDBMS (MySQL, PostgreSQL, Oracle, SQL
              Server, etc.).
            </p>
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
              Real-World Example: Choosing Data Types
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
                <strong>Debangshu</strong>, a database designer at a company in{" "}
                <strong>Ichapur</strong>, is creating a database for a library.
                He carefully chooses data types:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <code>BookID INT PRIMARY KEY</code> — Integer for unique IDs
                  </li>
                  <li>
                    <code>Title VARCHAR(255)</code> — Variable text up to 255
                    characters
                  </li>
                  <li>
                    <code>ISBN VARCHAR(13)</code> — 13-character ISBN (not
                    numeric because it's formatted with dashes)
                  </li>
                  <li>
                    <code>Price DECIMAL(10,2)</code> — Precise decimal for
                    monetary values (2 decimal places)
                  </li>
                  <li>
                    <code>PublishedDate DATE</code> — Date of publication
                  </li>
                  <li>
                    <code>InStock BOOLEAN</code> — True or false
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Choosing the right data type is
                critical for:
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Storage efficiency</strong> — Save space with appropriate types</li>
                  <li><strong>Data integrity</strong> — Prevent invalid data</li>
                  <li><strong>Performance</strong> — Proper data types enable efficient indexing and sorting</li>
                </ul>
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
                  <strong>Use the smallest data type that works:</strong> For
                  example, if you only need numbers up to 255, use <code>TINYINT</code>
                  instead of <code>INT</code> to save storage.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use `VARCHAR` with appropriate length:</strong> Don't
                  use <code>VARCHAR(255)</code> if you only need 20 characters.
                  It wastes storage and can impact performance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use `DECIMAL` for exact numbers:</strong> For monetary
                  values, always use <code>DECIMAL</code> or <code>NUMERIC</code>.
                  Avoid <code>FLOAT</code> which can have rounding errors.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use `ENUM` for fixed values:</strong> For columns with
                  a small set of fixed values (e.g., 'M', 'F'), consider using
                  <code>ENUM</code> or <code>CHECK</code> constraints.
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
                  <strong>Storing numbers as text:</strong> Using <code>VARCHAR</code>
                  for phone numbers or IDs is sometimes okay, but for numbers you
                  need to perform arithmetic on, use numeric types.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using `FLOAT` for money:</strong> Floating-point
                  numbers can have rounding errors. Always use <code>DECIMAL</code>
                  for precise values.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not considering time zones:</strong> Storing times
                  without timezone information can lead to confusion across
                  different regions.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring domain constraints:</strong> Relying solely
                  on the data type without additional domain constraints (like
                  <code>CHECK</code>) can allow invalid business values.
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
                  <strong>Define domains early:</strong> Before creating tables,
                  think about the domains for each attribute. What values are
                  allowed? What's the business rule?
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use appropriate data types:</strong> Match the data
                  type to the nature of the data. Consider storage, range, and
                  operations.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Add domain constraints:</strong> Use <code>CHECK</code>
                  constraints to enforce domain rules (e.g., <code>CHECK (Age BETWEEN 0 AND 120)</code>).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document your domains:</strong> Maintain a data
                  dictionary that describes the domains and constraints for each
                  column.
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
                <span>I can define a domain and a data type</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the difference between domain and data type</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can list common data types (INT, VARCHAR, DATE, etc.)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know when to use DECIMAL vs FLOAT</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for choosing data types</span>
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
            title="Domains and Data Types – FAQs"
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
          style={{ animationDelay: "1200ms" }}
        >
          <Teacher
            note={
              "Domains and data types are often overlooked, but they're the first " +
              "line of defence for data quality. I tell my students: 'A database " +
              "is only as good as its domains.' If you allow invalid data to enter, " +
              "all your queries and reports are compromised. Spend time defining " +
              "domains carefully — it's much cheaper than cleaning bad data later. " +
              "Also, don't just use the default data type. Think about what the " +
              "data represents. A phone number is not a number — it's a string " +
              "because you don't perform arithmetic on it. These nuances make " +
              "the difference between a good and a great database design."
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
            Topic 17 · Domains and Data Types · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic17;