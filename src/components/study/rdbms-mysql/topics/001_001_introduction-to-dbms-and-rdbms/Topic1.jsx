import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1 – Understanding Data Processing
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain the concept of data processing – the transformation
 *          of raw data into meaningful information. Covers the data
 *          processing cycle, stages, methods, and real-world applications.
 *          Builds on Topic 0 (Data and Information).
 */
const Topic1 = () => {
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

        .processing-step:hover {
          background-color: rgba(59, 130, 246, 0.05);
        }
        .dark .processing-step:hover {
          background-color: rgba(59, 130, 246, 0.12);
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
            Module 1 · Topic 1
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            Understanding <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Data Processing
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The transformation journey — from raw data to meaningful,
            actionable information.
          </p>
        </div>

        {/* ─── SVG: Data Processing Cycle ───────────────────── */}
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
              aria-label="Data Processing Cycle diagram"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              {/* Cycle path */}
              <path
                d="M 100 100 L 200 50 L 300 50 L 400 100 L 300 150 L 200 150 Z"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="8 6"
                className="dark:stroke-slate-500"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;1000"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Step 1: Collection */}
              <circle cx="150" cy="80" r="35" fill="#3b82f6" opacity="0.15" className="dark:fill-blue-400 dark:opacity-20" />
              <text x="150" y="72" textAnchor="middle" fontSize="20">📥</text>
              <text x="150" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Collection</text>

              {/* Step 2: Preparation */}
              <circle cx="250" cy="60" r="35" fill="#8b5cf6" opacity="0.15" className="dark:fill-purple-400 dark:opacity-20" />
              <text x="250" y="52" textAnchor="middle" fontSize="20">🧹</text>
              <text x="250" y="76" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Preparation</text>

              {/* Step 3: Input */}
              <circle cx="350" cy="80" r="35" fill="#10b981" opacity="0.15" className="dark:fill-emerald-400 dark:opacity-20" />
              <text x="350" y="72" textAnchor="middle" fontSize="20">⌨️</text>
              <text x="350" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Input</text>

              {/* Step 4: Processing */}
              <circle cx="400" cy="130" r="35" fill="#f59e0b" opacity="0.15" className="dark:fill-amber-400 dark:opacity-20" />
              <text x="400" y="122" textAnchor="middle" fontSize="20">⚙️</text>
              <text x="400" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Processing</text>

              {/* Step 5: Output */}
              <circle cx="300" cy="155" r="35" fill="#ef4444" opacity="0.15" className="dark:fill-red-400 dark:opacity-20" />
              <text x="300" y="147" textAnchor="middle" fontSize="20">📤</text>
              <text x="300" y="171" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Output</text>

              {/* Step 6: Storage */}
              <circle cx="200" cy="155" r="35" fill="#6366f1" opacity="0.15" className="dark:fill-indigo-400 dark:opacity-20" />
              <text x="200" y="147" textAnchor="middle" fontSize="20">💾</text>
              <text x="200" y="171" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Storage</text>

              {/* Feedback arrow */}
              <path d="M 200 170 L 150 120" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" className="dark:stroke-slate-500" />
              <text x="140" y="115" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">Feedback</text>
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
              What is Data Processing?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-blue-600 dark:text-blue-400">Data processing</strong>{" "}
              is the collection and manipulation of raw data to produce meaningful
              information. It is the essential bridge that transforms raw facts
              into insights that can drive decisions, actions, and understanding.
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
                  <li>Transforms <strong>data</strong> into <strong>information</strong></li>
                  <li>Involves a <strong>cycle</strong> of steps</li>
                  <li>Can be <strong>manual, mechanical, or electronic</strong></li>
                  <li>Essential for <strong>all information systems</strong></li>
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
                  Think of data processing like cooking: raw ingredients (data)
                  are washed, chopped, cooked, and plated (processed) to become
                  a delicious meal (information).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The Data Processing Cycle ────────────────────── */}
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
              <span className="text-2xl">🔄</span>
              The Data Processing Cycle
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Data processing follows a structured cycle with six distinct stages.
              Each stage adds value and transforms the data progressively.
            </p>
            <div
              className={clsx(
                "mt-4 space-y-3",
                "text-sm"
              )}
            >
              {[
                {
                  step: "1. Collection",
                  icon: "📥",
                  desc: "Gathering raw data from various sources – surveys, sensors, transactions, forms, etc.",
                  color: "blue",
                },
                {
                  step: "2. Preparation",
                  icon: "🧹",
                  desc: "Cleaning, validating, and formatting data to ensure quality and consistency.",
                  color: "purple",
                },
                {
                  step: "3. Input",
                  icon: "⌨️",
                  desc: "Entering prepared data into the processing system for transformation.",
                  color: "emerald",
                },
                {
                  step: "4. Processing",
                  icon: "⚙️",
                  desc: "Applying algorithms, calculations, sorting, filtering, or other operations to transform data.",
                  color: "amber",
                },
                {
                  step: "5. Output",
                  icon: "📤",
                  desc: "Presenting the processed information in a usable format – reports, dashboards, visualizations.",
                  color: "red",
                },
                {
                  step: "6. Storage",
                  icon: "💾",
                  desc: "Saving data and information for future use, retrieval, or further processing.",
                  color: "indigo",
                },
              ].map((item, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "processing-step rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]",
                      colorMap[item.color]
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {item.step}
                      </span>
                    </div>
                    <p className="mt-1 pl-10 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Methods of Data Processing ────────────────────── */}
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
              <span className="text-2xl">🔧</span>
              Methods of Data Processing
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
                <div className="text-2xl">📝</div>
                <h3
                  className={clsx(
                    "mt-1 font-bold text-slate-800",
                    "dark:text-slate-200"
                  )}
                >
                  Manual Processing
                </h3>
                <p
                  className={clsx(
                    "mt-1 leading-relaxed text-slate-600",
                    "dark:text-slate-400"
                  )}
                >
                  Data is processed by humans without the use of machines or
                  electronic devices. Slow and error-prone, but still used in
                  small-scale operations.
                </p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  e.g., Handwritten ledgers, manual calculations
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
                <div className="text-2xl">⚙️</div>
                <h3
                  className={clsx(
                    "mt-1 font-bold text-slate-800",
                    "dark:text-slate-200"
                  )}
                >
                  Mechanical Processing
                </h3>
                <p
                  className={clsx(
                    "mt-1 leading-relaxed text-slate-600",
                    "dark:text-slate-400"
                  )}
                >
                  Uses mechanical devices like typewriters, calculators, and
                  sorting machines. Faster than manual but limited in capability.
                </p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  e.g., Mechanical calculators, punch card machines
                </div>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-slate-200/50 p-4",
                  "dark:border-slate-700/50",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <div className="text-2xl">💻</div>
                <h3
                  className={clsx(
                    "mt-1 font-bold text-slate-800",
                    "dark:text-slate-200"
                  )}
                >
                  Electronic Processing
                </h3>
                <p
                  className={clsx(
                    "mt-1 leading-relaxed text-slate-600",
                    "dark:text-slate-400"
                  )}
                >
                  Uses computers and software to process data automatically,
                  quickly, and accurately. Most common in modern systems.
                </p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  e.g., Databases, spreadsheets, ERP systems
                </div>
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
              Real-World Example: School Attendance System
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
                  <strong>Susmita</strong>, a teacher at a school in{" "}
                  <strong>Ichapur</strong>, uses a digital attendance system.
                  Here's how data processing works:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Collection:</strong> Students scan their ID cards
                    when entering the classroom.
                  </li>
                  <li>
                    <strong>Preparation:</strong> The system validates each scan
                    against the student database.
                  </li>
                  <li>
                    <strong>Input:</strong> The validated attendance data is
                    entered into the system.
                  </li>
                  <li>
                    <strong>Processing:</strong> The system calculates total
                    present, absent, and late arrivals. It also updates
                    attendance records.
                  </li>
                  <li>
                    <strong>Output:</strong> A daily attendance report is
                    generated and displayed on the screen or sent to parents.
                  </li>
                  <li>
                    <strong>Storage:</strong> The attendance history is stored
                    in the school's database for future reference and report cards.
                  </li>
                </ul>
                <p>
                  This cycle happens thousands of times a day in schools,
                  transforming raw attendance data into meaningful records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Types of Data Processing ──────────────────────── */}
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
              <span className="text-2xl">🏷️</span>
              Types of Data Processing
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
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
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  Batch Processing
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Data is collected and processed in groups (batches)</li>
                  <li>Usually done periodically (nightly, weekly)</li>
                  <li>Examples: Payroll, bank statement generation</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-slate-200/50 p-4",
                  "dark:border-slate-700/50",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  Real-time Processing
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Data is processed as soon as it is generated</li>
                  <li>Immediate results are required</li>
                  <li>Examples: ATM transactions, online bookings</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-slate-200/50 p-4",
                  "dark:border-slate-700/50",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
                  "bg-purple-50/40 dark:bg-purple-900/10"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  Online Processing
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Processing happens interactively with user input</li>
                  <li>Data is processed and results returned immediately</li>
                  <li>Examples: Website searches, form submissions</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-slate-200/50 p-4",
                  "dark:border-slate-700/50",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]",
                  "bg-amber-50/40 dark:bg-amber-900/10"
                )}
              >
                <h4 className="font-bold text-amber-700 dark:text-amber-300">
                  Distributed Processing
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Processing is spread across multiple computers/servers</li>
                  <li>Handles large volumes of data efficiently</li>
                  <li>Examples: Cloud computing, Hadoop clusters</li>
                </ul>
              </div>
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
                  <strong>Plan before you process:</strong> Understand what
                  information you need and design your processing steps
                  accordingly. Don't collect data without a purpose.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Clean data early:</strong> The earlier you clean and
                  validate data, the less time you waste on incorrect results.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Document your process:</strong> Always document each
                  step of your data processing pipeline for reproducibility and
                  debugging.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Think about the output first:</strong> Know what the
                  final output should look like and work backwards to design the
                  processing steps.
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
                  <strong>Garbage In, Garbage Out (GIGO):</strong> Processing
                  poor quality data leads to poor quality information. Always
                  validate inputs.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Skipping the preparation stage:</strong> Many beginners
                  jump straight to processing without cleaning or validating
                  data, leading to errors.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring storage requirements:</strong> Not planning
                  for data storage can lead to capacity issues and data loss.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Over-processing:</strong> Doing too many transformations
                  can make the data harder to understand and maintain.
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
                  <strong>Follow the cycle:</strong> Never skip stages in the
                  data processing cycle. Each stage serves a purpose.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Automate where possible:</strong> Use scripts and tools
                  to automate repetitive processing tasks, reducing errors and
                  saving time.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Maintain audit trails:</strong> Keep logs of all data
                  processing steps for transparency and troubleshooting.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Involve stakeholders:</strong> Understand the needs of
                  the people who will use the processed information.
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
                <span>I can define data processing in my own words</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the six stages of the data processing cycle</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the three methods of data processing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can distinguish between batch and real-time processing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices in data processing</span>
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
            title="Understanding Data Processing – FAQs"
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
            title="Understanding Data Processing"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_note.txt"
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
              "The data processing cycle is a core concept that students often " +
              "gloss over, thinking it's just common sense. But the magic happens " +
              "in the details. I've seen brilliant data scientists fail because " +
              "they didn't properly prepare their data. My advice: always spend " +
              "at least 50% of your time on preparation. It's tedious but pays off. " +
              "Also, remember that processing isn't a one-way street — you often " +
              "need to loop back to earlier stages as you discover issues. That's " +
              "why the cycle has feedback arrows. Treat data processing as an " +
              "iterative craft, not a linear pipeline."
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
            Topic 1 · Understanding Data Processing · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;