import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5 – Problems with File-Based Systems
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the critical limitations and issues of traditional
 *          file-based data storage, which motivate the need for
 *          database systems. Builds on Topic 4 (File System vs Database).
 */
const Topic5 = () => {
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

  // ─── Problems Data ────────────────────────────────────────
  const problems = [
    {
      id: 1,
      icon: "🗃️",
      title: "Data Redundancy",
      desc: "Same data is duplicated across multiple files, wasting storage and complicating updates.",
      detail: "For example, student names and addresses appear in attendance, marks, and fee files.",
      color: "red",
    },
    {
      id: 2,
      icon: "❌",
      title: "Data Inconsistency",
      desc: "Updates to one copy may not be reflected in others, leading to conflicting data.",
      detail: "If a student changes address, you must update every file — easy to miss one.",
      color: "amber",
    },
    {
      id: 3,
      icon: "🔒",
      title: "Difficult Data Access",
      desc: "No standard query language; you write custom code to search and retrieve data.",
      detail: "Finding all students who scored above 80 requires scanning entire files.",
      color: "blue",
    },
    {
      id: 4,
      icon: "👥",
      title: "No Concurrency Control",
      desc: "Multiple users cannot update files simultaneously without risk of corruption.",
      detail: "Two teachers updating the same marks file can overwrite each other's changes.",
      color: "purple",
    },
    {
      id: 5,
      icon: "🔐",
      title: "Security Problems",
      desc: "Only basic OS-level permissions; no granular control over data access.",
      detail: "Cannot restrict a teacher to see only their class's marks.",
      color: "indigo",
    },
    {
      id: 6,
      icon: "🚫",
      title: "Data Isolation",
      desc: "Data is scattered across different files with no built-in relationships.",
      detail: "To find all courses taken by a student, you must manually join files.",
      color: "pink",
    },
    {
      id: 7,
      icon: "📐",
      title: "Integrity Issues",
      desc: "No automatic enforcement of business rules; application must handle it.",
      detail: "Nothing prevents a negative mark or a student without an enrolled course.",
      color: "rose",
    },
    {
      id: 8,
      icon: "⏳",
      title: "Limited Scalability",
      desc: "Performance degrades as data grows; no indexing or query optimisation.",
      detail: "Searching a 1GB text file becomes painfully slow.",
      color: "cyan",
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

        .problem-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .problem-card:hover {
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
            Module 1 · Topic 5
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            Problems with <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent dark:from-red-400 dark:to-orange-300">
              File-Based Systems
            </span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Understanding the critical flaws of traditional file storage — and
            why they led to the invention of databases.
          </p>
        </div>

        {/* ─── SVG: Problem Symptoms ────────────────────────── */}
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
              viewBox="0 0 600 170"
              className="w-full h-auto"
              role="img"
              aria-label="Illustration of file system problems"
            >
              <rect width="600" height="170" rx="12" fill="transparent" />

              {/* Problem icons */}
              <text x="60" y="50" textAnchor="middle" fontSize="30">🗃️</text>
              <text x="60" y="70" textAnchor="middle" fontSize="9" fill="#ef4444" className="dark:fill-red-400">Redundancy</text>

              <text x="150" y="50" textAnchor="middle" fontSize="30">❌</text>
              <text x="150" y="70" textAnchor="middle" fontSize="9" fill="#f59e0b" className="dark:fill-amber-400">Inconsistency</text>

              <text x="240" y="50" textAnchor="middle" fontSize="30">🔒</text>
              <text x="240" y="70" textAnchor="middle" fontSize="9" fill="#3b82f6" className="dark:fill-blue-400">Access</text>

              <text x="330" y="50" textAnchor="middle" fontSize="30">👥</text>
              <text x="330" y="70" textAnchor="middle" fontSize="9" fill="#8b5cf6" className="dark:fill-purple-400">Concurrency</text>

              <text x="420" y="50" textAnchor="middle" fontSize="30">🔐</text>
              <text x="420" y="70" textAnchor="middle" fontSize="9" fill="#6366f1" className="dark:fill-indigo-400">Security</text>

              <text x="510" y="50" textAnchor="middle" fontSize="30">🚫</text>
              <text x="510" y="70" textAnchor="middle" fontSize="9" fill="#ec4899" className="dark:fill-pink-400">Isolation</text>

              <text x="105" y="105" textAnchor="middle" fontSize="30">📐</text>
              <text x="105" y="125" textAnchor="middle" fontSize="9" fill="#f43f5e" className="dark:fill-rose-400">Integrity</text>

              <text x="240" y="105" textAnchor="middle" fontSize="30">⏳</text>
              <text x="240" y="125" textAnchor="middle" fontSize="9" fill="#06b6d4" className="dark:fill-cyan-400">Scalability</text>

              <text x="375" y="105" textAnchor="middle" fontSize="30">💸</text>
              <text x="375" y="125" textAnchor="middle" fontSize="9" fill="#f59e0b" className="dark:fill-amber-400">Cost</text>

              <text x="510" y="105" textAnchor="middle" fontSize="30">⏰</text>
              <text x="510" y="125" textAnchor="middle" fontSize="9" fill="#8b5cf6" className="dark:fill-purple-400">Maintenance</text>

              <text x="300" y="158" textAnchor="middle" fontSize="11" fill="#94a3b8" className="dark:fill-slate-500">
                File systems suffer from many critical problems
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
              Why File Systems Fail for Modern Data Management
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              While file systems are simple and suitable for small-scale,
              single-user applications, they have <strong>critical flaws</strong>
              that make them unsuitable for enterprise data management. These
              problems directly led to the development of database systems.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-red-50/40 p-4",
                "dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-red-600 dark:text-red-400">Key Insight:</span>{" "}
                The problems of file systems are not just inconveniences — they
                can lead to data corruption, security breaches, and business
                failure.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Problems Grid ─────────────────────────────────── */}
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
              The 8 Major Problems of File-Based Systems
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
                "text-sm"
              )}
            >
              {problems.map((problem, idx) => {
                const colorMap = {
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  pink: "border-pink-200/50 bg-pink-50/40 dark:border-pink-700/50 dark:bg-pink-900/10",
                  rose: "border-rose-200/50 bg-rose-50/40 dark:border-rose-700/50 dark:bg-rose-900/10",
                  cyan: "border-cyan-200/50 bg-cyan-50/40 dark:border-cyan-700/50 dark:bg-cyan-900/10",
                };
                const textColorMap = {
                  red: "text-red-700 dark:text-red-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  blue: "text-blue-700 dark:text-blue-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  pink: "text-pink-700 dark:text-pink-300",
                  rose: "text-rose-700 dark:text-rose-300",
                  cyan: "text-cyan-700 dark:text-cyan-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "problem-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[problem.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="text-3xl">{problem.icon}</div>
                    <h3
                      className={clsx(
                        "mt-2 font-bold",
                        textColorMap[problem.color]
                      )}
                    >
                      {problem.title}
                    </h3>
                    <p
                      className={clsx(
                        "mt-1 leading-relaxed text-slate-600",
                        "dark:text-slate-400"
                      )}
                    >
                      {problem.desc}
                    </p>
                    <div
                      className={clsx(
                        "mt-2 text-xs italic text-slate-500",
                        "dark:text-slate-500"
                      )}
                    >
                      {problem.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Detailed Explanations ─────────────────────────── */}
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
              Understanding the Problems in Detail
            </h2>
            <div
              className={clsx(
                "space-y-4 text-sm",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <div className="rounded-lg border-l-4 border-red-500 pl-4 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors">
                <span className="font-bold text-red-600 dark:text-red-400">1. Data Redundancy:</span>{" "}
                In a school file system, student details are stored in
                `attendance.txt`, `marks.txt`, and `fees.txt`. When 1,000
                students are enrolled, the same name, address, and contact
                information are repeated 3,000 times — wasting storage and
                increasing the risk of inconsistency.
              </div>
              <div className="rounded-lg border-l-4 border-amber-500 pl-4 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors">
                <span className="font-bold text-amber-600 dark:text-amber-400">2. Data Inconsistency:</span>{" "}
                When <strong>Susmita</strong> changes her address, the
                administrator must update `attendance.txt`, `marks.txt`, and
                `fees.txt`. If they miss one, different files show different
                addresses — leading to communication and billing errors.
              </div>
              <div className="rounded-lg border-l-4 border-blue-500 pl-4 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                <span className="font-bold text-blue-600 dark:text-blue-400">3. Difficult Data Access:</span>{" "}
                To find all students who scored above 80 in Mathematics, you must
                write a custom script that reads the entire marks file, parses
                it, and filters the results. This is time-consuming and
                error-prone, especially for complex queries.
              </div>
              <div className="rounded-lg border-l-4 border-purple-500 pl-4 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                <span className="font-bold text-purple-600 dark:text-purple-400">4. No Concurrency Control:</span>{" "}
                Two teachers trying to update the same marks file simultaneously
                can overwrite each other's changes. Even with file locking, one
                teacher is blocked, causing delays and frustration.
              </div>
              <div className="rounded-lg border-l-4 border-indigo-500 pl-4 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">5. Security Problems:</span>{" "}
                File systems only offer read/write/execute permissions at the
                file level. You cannot restrict a teacher to view only their
                class's marks or prevent a student from seeing other students'
                data.
              </div>
              <div className="rounded-lg border-l-4 border-pink-500 pl-4 hover:bg-pink-50/30 dark:hover:bg-pink-900/10 transition-colors">
                <span className="font-bold text-pink-600 dark:text-pink-400">6. Data Isolation:</span>{" "}
                There is no relationship between `students.txt` and `marks.txt`.
                To get a student's marks, you must manually match student IDs
                across files — a process that is slow and error-prone.
              </div>
              <div className="rounded-lg border-l-4 border-rose-500 pl-4 hover:bg-rose-50/30 dark:hover:bg-rose-900/10 transition-colors">
                <span className="font-bold text-rose-600 dark:text-rose-400">7. Integrity Issues:</span>{" "}
                Nothing prevents a negative mark, a student ID that doesn't
                exist, or a fee payment without a corresponding student. The
                application code must enforce all rules, and bugs can easily
                violate them.
              </div>
              <div className="rounded-lg border-l-4 border-cyan-500 pl-4 hover:bg-cyan-50/30 dark:hover:bg-cyan-900/10 transition-colors">
                <span className="font-bold text-cyan-600 dark:text-cyan-400">8. Limited Scalability:</span>{" "}
                As the school grows to 10,000 students, searching for a student
                in a 100MB text file becomes painfully slow. There are no
                indexes or query optimisers to speed up retrieval.
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
              Real-World Disaster: The File System Nightmare
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
                <strong>Debangshu</strong>, the school principal at{" "}
                <strong>Shyamnagar</strong> Public School, faced a crisis. The
                school used a file-based system:
                <br />
                <code className="block my-2 bg-white/80 dark:bg-slate-700/40 p-2 rounded">
                  ├── students.txt (ID, Name, Class, Address, Phone)<br />
                  ├── marks.txt (StudentID, Subject, Score)<br />
                  ├── fees.txt (StudentID, Amount, Date)<br />
                  └── attendance.txt (StudentID, Date, Status)
                </code>
                <br />
                <strong>Problems that emerged:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Inconsistency:</strong> <strong>Abhronila</strong>
                    's address was updated in `students.txt` but not in
                    `fees.txt`, so her fee receipt had the wrong address.
                  </li>
                  <li>
                    <strong>Concurrency:</strong> Two teachers tried to update
                    marks at the same time, and the file was corrupted. Marks
                    for 50 students were lost.
                  </li>
                  <li>
                    <strong>Integrity:</strong> A clerk accidentally entered a
                    negative mark (-50) for a student because there was no
                    validation.
                  </li>
                  <li>
                    <strong>Scalability:</strong> When the school grew to 2,000
                    students, finding a student's record took over 30 seconds.
                  </li>
                </ul>
                The school decided to migrate to a database system. This decision
                saved the school from a total data catastrophe.
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
                  <strong>Identify the warning signs:</strong> If you see
                  duplicated data, manual queries, or file corruption, it's time
                  to move to a database.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Plan your migration carefully:</strong> Before
                  migrating, document all files, their structure, and how they
                  are used. Design the database schema accordingly.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use files for import/export only:</strong> Even with a
                  database, you might need to read/write files for bulk data
                  loading or reporting.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Learn from the past:</strong> Understanding these
                  problems will make you appreciate the power of databases and
                  design better systems.
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
              Common Pitfalls When Moving from Files to Databases
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
                  <strong>Rushing the migration:</strong> Moving data without
                  proper planning leads to data loss and downtime.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not normalising the data:</strong> If you just import
                  file data into a single table, you still have redundancy and
                  inconsistency.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring constraints:</strong> If you don't add primary
                  keys, foreign keys, and check constraints, you'll still have
                  integrity issues.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Underestimating the effort:</strong> Migrating from
                  files is not just a technical task — it requires business
                  process changes and user training.
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
              Best Practices to Avoid File System Problems
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
                  <strong>Assess early:</strong> Before building a system,
                  evaluate whether a file system will be sufficient. If there's
                  any chance of growth or multiple users, choose a database.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use a database from the start:</strong> For production
                  applications, the upfront cost of a database is far outweighed
                  by the cost of fixing file system problems later.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document your data:</strong> Whether using files or
                  databases, document the schema, relationships, and business
                  rules. This helps with migration and maintenance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Test your migration:</strong> Always test the migration
                  process with a copy of production data before the actual switch.
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
                <span>I can list at least 5 problems of file-based systems</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand why redundancy leads to inconsistency</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know why concurrency is a critical issue</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the security limitations of file systems</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can explain why integrity is hard to enforce in files</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the warning signs that indicate a need for a database</span>
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
            title="Problems with File-Based Systems – FAQs"
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
              "The problems of file systems are not just academic — they have " +
              "real-world consequences. I've consulted for organisations that " +
              "spent months cleaning up inconsistent data from file-based " +
              "systems. The worst cases involved legal issues because of " +
              "incorrect records. My advice: if you're building anything beyond " +
              "a personal project, seriously consider using a database. The " +
              "initial learning curve is worth it. And for those who must " +
              "maintain legacy file systems, plan for a gradual migration. " +
              "Remember: a database is not a luxury; it's a necessity for " +
              "professional applications."
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
            Topic 5 · Problems with File-Based Systems · Built with ❤️ for
            classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic5;