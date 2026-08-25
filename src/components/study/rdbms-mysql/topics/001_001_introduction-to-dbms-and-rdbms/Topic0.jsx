import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0 – Introduction to Data and Information
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Introduce the foundational concepts of data and information,
 *          the DIKW pyramid, data types, and the role of data in
 *          modern information systems.
 */
const Topic0 = () => {
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
            Module 1 · Topic 0
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            Introduction to <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Data and Information
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Understanding the fundamental building blocks of every information
            system — from raw facts to actionable wisdom.
          </p>
        </div>

        {/* ─── SVG: Data → Information Flow ────────────────── */}
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
              viewBox="0 0 600 160"
              className="w-full h-auto"
              role="img"
              aria-label="Data to Information transformation flow diagram"
            >
              <rect width="600" height="160" rx="12" fill="transparent" />

              {/* Data box */}
              <rect
                x="20"
                y="40"
                width="110"
                height="70"
                rx="10"
                fill="#3b82f6"
                opacity="0.15"
                className="dark:fill-blue-400 dark:opacity-20"
              />
              <text
                x="75"
                y="80"
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill="#1e293b"
                className="dark:fill-slate-200"
              >
                📊 Data
              </text>
              <text
                x="75"
                y="104"
                textAnchor="middle"
                fontSize="11"
                fill="#475569"
                className="dark:fill-slate-400"
              >
                Raw facts
              </text>

              {/* Arrow 1: Data → Processing */}
              <g>
                <line
                  x1="135"
                  y1="75"
                  x2="210"
                  y2="75"
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="dark:stroke-slate-500"
                />
                <polygon
                  points="208,70 220,75 208,80"
                  fill="#94a3b8"
                  className="dark:fill-slate-500"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </g>

              {/* Processing box */}
              <rect
                x="225"
                y="35"
                width="130"
                height="80"
                rx="10"
                fill="#8b5cf6"
                opacity="0.12"
                className="dark:fill-purple-400 dark:opacity-20"
              />
              <text
                x="290"
                y="66"
                textAnchor="middle"
                fontSize="16"
                fontWeight="600"
                fill="#1e293b"
                className="dark:fill-slate-200"
              >
                ⚙️ Processing
              </text>
              <text
                x="290"
                y="90"
                textAnchor="middle"
                fontSize="11"
                fill="#475569"
                className="dark:fill-slate-400"
              >
                Context + Structure
              </text>

              {/* Arrow 2: Processing → Information */}
              <g>
                <line
                  x1="360"
                  y1="75"
                  x2="435"
                  y2="75"
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="dark:stroke-slate-500"
                />
                <polygon
                  points="433,70 445,75 433,80"
                  fill="#94a3b8"
                  className="dark:fill-slate-500"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="2s"
                  begin="0.5s"
                  repeatCount="indefinite"
                />
              </g>

              {/* Information box */}
              <rect
                x="450"
                y="40"
                width="130"
                height="70"
                rx="10"
                fill="#10b981"
                opacity="0.15"
                className="dark:fill-emerald-400 dark:opacity-20"
              />
              <text
                x="515"
                y="75"
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill="#1e293b"
                className="dark:fill-slate-200"
              >
                💡 Information
              </text>
              <text
                x="515"
                y="99"
                textAnchor="middle"
                fontSize="11"
                fill="#475569"
                className="dark:fill-slate-400"
              >
                Meaningful insight
              </text>

              {/* Labels */}
              <text
                x="75"
                y="140"
                textAnchor="middle"
                fontSize="10"
                fill="#94a3b8"
                className="dark:fill-slate-500"
              >
                Unprocessed
              </text>
              <text
                x="515"
                y="140"
                textAnchor="middle"
                fontSize="10"
                fill="#94a3b8"
                className="dark:fill-slate-500"
              >
                Actionable
              </text>
            </svg>
          </div>
        </div>

        {/* ─── What is Data? ────────────────────────────────── */}
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
              <span className="text-2xl">📦</span>
              What is Data?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-blue-600 dark:text-blue-400">Data</strong>{" "}
              is the collection of raw, unprocessed facts, figures, symbols, or
              observations that have no meaning by themselves. It is the
              essential raw material that feeds into information systems.
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
                  Examples:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Student roll numbers: 101, 102, 103</li>
                  <li>Temperature: 28°C, 30°C, 25°C</li>
                  <li>Names: "Swadeep", "Tuhina", "Abhronila"</li>
                  <li>Sales figures: ₹10,000, ₹15,000</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-blue-50/60 p-3",
                  "dark:bg-blue-900/20"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Key Traits:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Raw &amp; unprocessed</li>
                  <li>No context or meaning</li>
                  <li>Can be quantitative or qualitative</li>
                  <li>Foundation for information</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── What is Information? ──────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "300ms" }}
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
              <span className="text-2xl">💡</span>
              What is Information?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-emerald-600 dark:text-emerald-400">
                Information
              </strong>{" "}
              is data that has been processed, organized, structured, or
              presented in a given context to make it meaningful and useful. It
              answers the "who, what, when, where, and why" questions.
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
                  Examples:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>
                    "Student 101, Swadeep, scored 85/100 in Mathematics"
                  </li>
                  <li>"Average temperature in Barrackpore is 28°C today"</li>
                  <li>"Sales of Product X increased by 20% this quarter"</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-emerald-50/60 p-3",
                  "dark:bg-emerald-900/20"
                )}
              >
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Key Traits:
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Processed &amp; meaningful</li>
                  <li>Has context and purpose</li>
                  <li>Supports decision-making</li>
                  <li>Derived from data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Data vs Information Table ────────────────────── */}
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
              Data vs Information
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
                      "bg-slate-100/80 text-left",
                      "dark:bg-slate-800/60"
                    )}
                  >
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-300"
                      )}
                    >
                      Feature
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-300"
                      )}
                    >
                      Data
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-slate-700",
                        "dark:text-slate-300"
                      )}
                    >
                      Information
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={clsx(
                    "divide-y divide-slate-200/60",
                    "dark:divide-slate-700/60"
                  )}
                >
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium">Nature</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      Raw, unprocessed
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      Processed, refined
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium">Meaning</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      No meaning alone
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      Meaningful &amp; useful
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium">Context</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      Lacks context
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      Has context &amp; purpose
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium">Use</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      Raw material
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      Supports decisions
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium">Example</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      "85", "Math"
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      "Swadeep scored 85 in Math"
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── DIKW Pyramid ──────────────────────────────────── */}
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
              <span className="text-2xl">🏛️</span>
              The DIKW Pyramid
            </h2>
            <p
              className={clsx(
                "mb-4 text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The DIKW pyramid shows how raw data is progressively transformed
              into wisdom — each level adds more value, context, and human
              understanding.
            </p>

            <div
              className={clsx(
                "w-full rounded-xl border border-slate-200/50 bg-slate-50/60 p-4",
                "dark:border-slate-700/50 dark:bg-slate-800/30"
              )}
            >
              <svg
                viewBox="0 0 500 340"
                className="w-full h-auto"
                role="img"
                aria-label="DIKW Pyramid showing Data, Information, Knowledge, Wisdom"
              >
                <polygon
                  points="250,30 190,80 310,80"
                  fill="#8b5cf6"
                  opacity="0.25"
                  className="dark:fill-purple-400 dark:opacity-30"
                />
                <text
                  x="250"
                  y="66"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#1e293b"
                  className="dark:fill-slate-200"
                >
                  🧠 Wisdom
                </text>
                <text
                  x="250"
                  y="86"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#475569"
                  className="dark:fill-slate-400"
                >
                  Knowledge applied with insight
                </text>

                <polygon
                  points="250,85 150,150 350,150"
                  fill="#3b82f6"
                  opacity="0.2"
                  className="dark:fill-blue-400 dark:opacity-25"
                />
                <text
                  x="250"
                  y="132"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="#1e293b"
                  className="dark:fill-slate-200"
                >
                  📚 Knowledge
                </text>
                <text
                  x="250"
                  y="152"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#475569"
                  className="dark:fill-slate-400"
                >
                  Information understood &amp; applied
                </text>

                <polygon
                  points="250,155 100,235 400,235"
                  fill="#10b981"
                  opacity="0.2"
                  className="dark:fill-emerald-400 dark:opacity-25"
                />
                <text
                  x="250"
                  y="210"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="#1e293b"
                  className="dark:fill-slate-200"
                >
                  💡 Information
                </text>
                <text
                  x="250"
                  y="230"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#475569"
                  className="dark:fill-slate-400"
                >
                  Data with context &amp; meaning
                </text>

                <polygon
                  points="250,240 30,330 470,330"
                  fill="#f59e0b"
                  opacity="0.2"
                  className="dark:fill-amber-400 dark:opacity-25"
                />
                <text
                  x="250"
                  y="300"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="#1e293b"
                  className="dark:fill-slate-200"
                >
                  📊 Data
                </text>
                <text
                  x="250"
                  y="320"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#475569"
                  className="dark:fill-slate-400"
                >
                  Raw facts &amp; figures
                </text>

                <line
                  x1="130"
                  y1="325"
                  x2="160"
                  y2="235"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="dark:stroke-slate-500"
                />
                <line
                  x1="370"
                  y1="325"
                  x2="340"
                  y2="235"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="dark:stroke-slate-500"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* ─── Types of Data ────────────────────────────────── */}
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
              <span className="text-2xl">📂</span>
              Types of Data
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-3",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-slate-200/50 p-4",
                  "dark:border-slate-700/50",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <div className="text-2xl">📊</div>
                <h3
                  className={clsx(
                    "mt-1 font-bold text-slate-800",
                    "dark:text-slate-200"
                  )}
                >
                  Structured
                </h3>
                <p
                  className={clsx(
                    "mt-1 leading-relaxed text-slate-600",
                    "dark:text-slate-400"
                  )}
                >
                  Organized in fixed fields (rows &amp; columns). Easy to query.
                </p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  e.g. SQL databases, spreadsheets
                </div>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-slate-200/50 p-4",
                  "dark:border-slate-700/50",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
                  "bg-purple-50/40 dark:bg-purple-900/10"
                )}
              >
                <div className="text-2xl">🔀</div>
                <h3
                  className={clsx(
                    "mt-1 font-bold text-slate-800",
                    "dark:text-slate-200"
                  )}
                >
                  Semi-structured
                </h3>
                <p
                  className={clsx(
                    "mt-1 leading-relaxed text-slate-600",
                    "dark:text-slate-400"
                  )}
                >
                  Has organizational properties but flexible schema.
                </p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  e.g. JSON, XML, log files
                </div>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-slate-200/50 p-4",
                  "dark:border-slate-700/50",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
                  "bg-amber-50/40 dark:bg-amber-900/10"
                )}
              >
                <div className="text-2xl">🗂️</div>
                <h3
                  className={clsx(
                    "mt-1 font-bold text-slate-800",
                    "dark:text-slate-200"
                  )}
                >
                  Unstructured
                </h3>
                <p
                  className={clsx(
                    "mt-1 leading-relaxed text-slate-600",
                    "dark:text-slate-400"
                  )}
                >
                  No predefined format. Requires advanced processing.
                </p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  e.g. text, images, video, audio
                </div>
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
              Real-World Example: School Report Card
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
                <strong className="text-blue-600 dark:text-blue-400">Data:</strong>{" "}
                "85", "Math", "Swadeep", "Class 10", "Barrackpore" <br />
                <strong className="text-emerald-600 dark:text-emerald-400">
                  Information:
                </strong>{" "}
                "Swadeep, a Class 10 student from Barrackpore, scored 85/100 in
                Mathematics." <br />
                <strong className="text-purple-600 dark:text-purple-400">
                  Knowledge:
                </strong>{" "}
                "Swadeep is strong in Math but needs improvement in Science."{" "}
                <br />
                <strong className="text-amber-600 dark:text-amber-400">
                  Wisdom:
                </strong>{" "}
                "Provide extra tutoring in Science to help Swadeep achieve
                overall academic excellence."
              </p>
            </div>
            <div
              className={clsx(
                "mt-3 flex flex-wrap gap-2 text-xs",
                "text-slate-500 dark:text-slate-400"
              )}
            >
              <span className="rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900/30">
                Data → Information
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 dark:bg-purple-900/30">
                Information → Knowledge
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 dark:bg-amber-900/30">
                Knowledge → Wisdom
              </span>
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
                  <strong>Think in layers:</strong> Always consider where your
                  data sits on the DIKW pyramid — are you collecting raw facts,
                  or are you creating actionable wisdom?
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Context is king:</strong> The same data point can mean
                  different things in different contexts. Always document the
                  context of your data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Data quality first:</strong> Garbage in, garbage out
                  (GIGO). Always validate and clean your data before processing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Ask the 5 Ws:</strong> Who, What, When, Where, Why —
                  these questions transform raw data into meaningful
                  information.
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
                  <strong>Confusing data with information:</strong> Data is raw;
                  information is processed. Don't use the terms interchangeably.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring context:</strong> Presenting data without
                  context leads to misinterpretation and poor decisions.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Overlooking data quality:</strong> Poor data quality
                  leads to unreliable information and bad outcomes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Assuming all data is useful:</strong> Collecting data
                  without a purpose creates noise and wastes resources.
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
                  <strong>Document everything:</strong> Always document the
                  source, context, and processing steps of your data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Validate early, validate often:</strong> Check data
                  quality at every stage of the pipeline.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Think about the end-user:</strong> Present information
                  in a format that is clear, actionable, and relevant to the
                  decision-maker.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Embrace data governance:</strong> Establish clear
                  policies for data access, quality, and security from day one.
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
                <span>I can define data and information with examples</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the DIKW pyramid hierarchy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can distinguish between data types</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know why context matters for information</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify common data quality issues</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the data → information transformation</span>
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
            title="Introduction to Data & Information – FAQs"
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
            title="Introduction to Data and Information"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic0_note.txt"
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
              "This topic is the foundation of everything we'll learn in this course. " +
              "Students often memorize definitions but miss the real insight: data is " +
              "everywhere, but information is what drives decisions. I always tell my " +
              "students to observe the world around them — from the temperature display " +
              "in Shyamnagar station to the attendance register in Ichapur school — " +
              "and ask: 'Is this data or information?' This mindset separates " +
              "technicians from thinkers. Remember: a database is only as good as " +
              "the quality of data and the wisdom of the people using it."
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
            Topic 0 · Introduction to Data and Information · Built with ❤️ for
            classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic0;