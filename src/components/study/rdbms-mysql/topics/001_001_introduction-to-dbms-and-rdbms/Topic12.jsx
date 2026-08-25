import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

/**
 * Topic12 – What is RDBMS?
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Define Relational Database Management System (RDBMS),
 *          explain its key characteristics, the relational model,
 *          and how it differs from general DBMS. Builds on Topics
 *          6-11 (DBMS concepts and examples).
 */
const Topic12 = () => {
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

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .feature-card:hover {
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
                        Module 1 · Topic 12
                    </div>
                    <h1
                        className={clsx(
                            "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
                            "text-slate-800 dark:text-white"
                        )}
                    >
                        What is <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
                            RDBMS?
                        </span>
                    </h1>
                    <p
                        className={clsx(
                            "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
                            "text-slate-600 dark:text-slate-400"
                        )}
                    >
                        The Relational Database Management System — the foundation of
                        modern data management.
                    </p>
                </div>

                {/* ─── SVG: Relational Model ────────────────────────── */}
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
                            aria-label="Relational database model showing tables with relationships"
                        >
                            <rect width="600" height="180" rx="12" fill="transparent" />

                            <text x="300" y="22" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                                🗄️ Relational Database Model
                            </text>

                            {/* Table 1: Students */}
                            <rect x="20" y="35" width="160" height="120" rx="8" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="1.5" />
                            <text x="100" y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📊 Students</text>
                            <line x1="30" y1="62" x2="170" y2="62" stroke="#3b82f6" strokeWidth="1" className="dark:stroke-blue-400" />
                            <text x="35" y="78" fontSize="9" fill="#475569" className="dark:fill-slate-400">ID (PK)</text>
                            <text x="35" y="92" fontSize="9" fill="#475569" className="dark:fill-slate-400">Name</text>
                            <text x="35" y="106" fontSize="9" fill="#475569" className="dark:fill-slate-400">Class</text>
                            <text x="35" y="120" fontSize="9" fill="#475569" className="dark:fill-slate-400">...</text>

                            {/* Table 2: Courses */}
                            <rect x="220" y="35" width="160" height="120" rx="8" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12 dark:stroke-emerald-400" stroke="#10b981" strokeWidth="1.5" />
                            <text x="300" y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📊 Courses</text>
                            <line x1="230" y1="62" x2="370" y2="62" stroke="#10b981" strokeWidth="1" className="dark:stroke-emerald-400" />
                            <text x="235" y="78" fontSize="9" fill="#475569" className="dark:fill-slate-400">CourseID (PK)</text>
                            <text x="235" y="92" fontSize="9" fill="#475569" className="dark:fill-slate-400">Title</text>
                            <text x="235" y="106" fontSize="9" fill="#475569" className="dark:fill-slate-400">Credits</text>
                            <text x="235" y="120" fontSize="9" fill="#475569" className="dark:fill-slate-400">...</text>

                            {/* Table 3: Enrollments */}
                            <rect x="420" y="35" width="160" height="120" rx="8" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12 dark:stroke-purple-400" stroke="#8b5cf6" strokeWidth="1.5" />
                            <text x="500" y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">📊 Enrollments</text>
                            <line x1="430" y1="62" x2="570" y2="62" stroke="#8b5cf6" strokeWidth="1" className="dark:stroke-purple-400" />
                            <text x="435" y="78" fontSize="9" fill="#475569" className="dark:fill-slate-400">EnrollID (PK)</text>
                            <text x="435" y="92" fontSize="9" fill="#475569" className="dark:fill-slate-400">StudentID (FK)</text>
                            <text x="435" y="106" fontSize="9" fill="#475569" className="dark:fill-slate-400">CourseID (FK)</text>
                            <text x="435" y="120" fontSize="9" fill="#475569" className="dark:fill-slate-400">Grade</text>

                            {/* Relationship lines */}
                            <line x1="180" y1="80" x2="220" y2="80" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" className="dark:stroke-slate-500" />
                            <text x="200" y="75" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">1</text>
                            <text x="200" y="95" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">*</text>

                            <line x1="380" y1="80" x2="420" y2="80" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" className="dark:stroke-slate-500" />
                            <text x="400" y="75" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">1</text>
                            <text x="400" y="95" textAnchor="middle" fontSize="8" fill="#94a3b8" className="dark:fill-slate-500">*</text>
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
                            What is RDBMS?
                        </h2>
                        <p
                            className={clsx(
                                "leading-relaxed text-slate-700",
                                "dark:text-slate-300"
                            )}
                        >
                            A <strong className="text-blue-600 dark:text-blue-400">Relational Database Management System (RDBMS)</strong>{" "}
                            is a type of DBMS that is based on the <strong>relational model</strong>{" "}
                            introduced by E. F. Codd in 1970. It stores data in <strong>tables</strong>{" "}
                            (also called relations) with rows and columns, and uses
                            <strong> relationships</strong> between tables to organise data.
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
                                    Key Features:
                                </span>
                                <ul
                                    className={clsx(
                                        "mt-1 list-disc space-y-1 pl-5",
                                        "text-slate-600 dark:text-slate-400"
                                    )}
                                >
                                    <li>Data stored in <strong>tables (relations)</strong></li>
                                    <li>Relationships via <strong>foreign keys</strong></li>
                                    <li>Standard <strong>SQL</strong> interface</li>
                                    <li><strong>ACID</strong> transactions</li>
                                    <li>Enforces <strong>data integrity</strong></li>
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
                                    Think of an RDBMS as a digital spreadsheet on steroids — it
                                    has multiple spreadsheets (tables) that are linked by common
                                    fields (keys), with powerful querying capabilities.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── ACID Properties ───────────────────────────────────── */}
                <section
                    ref={addRef}
                    className="reveal-section mb-10"
                    style={{ animationDelay: "250ms" }}
                >
                    <div
                        className={clsx(
                            "rounded-2xl border border-teal-200/60 bg-white/50 p-6",
                            "dark:border-teal-700/60 dark:bg-slate-800/20",
                            "transition-all duration-300 hover:shadow-md"
                        )}
                    >
                        <h2
                            className={clsx(
                                "mb-4 flex items-center gap-2 text-xl font-bold",
                                "text-slate-800 dark:text-white"
                            )}
                        >
                            <span className="text-2xl">🛡️</span>
                            Understanding ACID Properties
                        </h2>

                        <p
                            className={clsx(
                                "mb-5 leading-relaxed text-slate-700",
                                "dark:text-slate-300"
                            )}
                        >
                            <strong>ACID</strong> is a set of four properties that ensure database
                            transactions are processed accurately, reliably, and safely, even if
                            multiple users access the database simultaneously or a system failure
                            occurs.
                        </p>

                        <div className="grid gap-4 md:grid-cols-2">

                            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-700 dark:bg-blue-900/20">
                                <h3 className="font-bold text-blue-700 dark:text-blue-300">
                                    A — Atomicity
                                </h3>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    A transaction is treated as a single unit. Either all operations are
                                    completed successfully or none of them are performed.
                                </p>
                                <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">
                                    Example: During a bank transfer, money is deducted and deposited
                                    together. If one step fails, the entire transaction is rolled back.
                                </p>
                            </div>

                            <div className="rounded-xl border border-green-200 bg-green-50/60 p-4 dark:border-green-700 dark:bg-green-900/20">
                                <h3 className="font-bold text-green-700 dark:text-green-300">
                                    C — Consistency
                                </h3>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    Every transaction moves the database from one valid state to another,
                                    maintaining all rules, constraints, and relationships.
                                </p>
                                <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">
                                    Example: A foreign key cannot reference a record that does not exist.
                                </p>
                            </div>

                            <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-4 dark:border-purple-700 dark:bg-purple-900/20">
                                <h3 className="font-bold text-purple-700 dark:text-purple-300">
                                    I — Isolation
                                </h3>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    Multiple transactions can run simultaneously without interfering with
                                    each other. Each transaction behaves as if it is executed alone.
                                </p>
                                <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">
                                    Example: Two customers booking tickets at the same time cannot reserve
                                    the same seat.
                                </p>
                            </div>

                            <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-4 dark:border-orange-700 dark:bg-orange-900/20">
                                <h3 className="font-bold text-orange-700 dark:text-orange-300">
                                    D — Durability
                                </h3>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                    Once a transaction is committed, the changes become permanent and
                                    remain even if the system crashes immediately afterward.
                                </p>
                                <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">
                                    Example: After an online payment is confirmed, the payment record is
                                    not lost even if the server suddenly shuts down.
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 rounded-xl bg-slate-100/70 p-4 dark:bg-slate-800/50">
                            <h3 className="font-semibold text-slate-800 dark:text-white">
                                💡 Memory Trick
                            </h3>

                            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                <li><strong>A</strong> → All or Nothing</li>
                                <li><strong>C</strong> → Correct Database State</li>
                                <li><strong>I</strong> → Independent Transactions</li>
                                <li><strong>D</strong> → Data Stays Forever</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ─── Key Characteristics ──────────────────────────── */}
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
                            <span className="text-2xl">✨</span>
                            Key Characteristics of RDBMS
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
                                    title: "Tables (Relations)",
                                    desc: "Data is organised into tables with rows (tuples) and columns (attributes). Each table represents an entity.",
                                    color: "blue",
                                },
                                {
                                    icon: "🔑",
                                    title: "Primary Keys",
                                    desc: "Each row is uniquely identified by a primary key, ensuring no duplicate records.",
                                    color: "red",
                                },
                                {
                                    icon: "🔗",
                                    title: "Foreign Keys",
                                    desc: "Tables are linked through foreign keys, establishing relationships and enforcing referential integrity.",
                                    color: "purple",
                                },
                                {
                                    icon: "📐",
                                    title: "Schema",
                                    desc: "A predefined schema defines the structure, data types, and constraints of the database.",
                                    color: "indigo",
                                },
                                {
                                    icon: "🔍",
                                    title: "SQL Language",
                                    desc: "Uses Structured Query Language (SQL) for defining, querying, and manipulating data.",
                                    color: "emerald",
                                },
                                {
                                    icon: "⚖️",
                                    title: "Data Integrity",
                                    desc: "Enforces rules via constraints (UNIQUE, NOT NULL, CHECK) to maintain accuracy and consistency.",
                                    color: "amber",
                                },
                                {
                                    icon: "📋",
                                    title: "ACID Transactions",
                                    desc: "Supports atomic, consistent, isolated, and durable transactions for reliable operations.",
                                    color: "teal",
                                },
                                {
                                    icon: "📈",
                                    title: "Normalisation",
                                    desc: "Organises data to minimise redundancy and eliminate anomalies through normal forms.",
                                    color: "cyan",
                                },
                            ].map((feature, idx) => {
                                const colorMap = {
                                    blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                                    red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                                    purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                                    indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                                    emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                                    amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                                    teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                                    cyan: "border-cyan-200/50 bg-cyan-50/40 dark:border-cyan-700/50 dark:bg-cyan-900/10",
                                };
                                const textColorMap = {
                                    blue: "text-blue-700 dark:text-blue-300",
                                    red: "text-red-700 dark:text-red-300",
                                    purple: "text-purple-700 dark:text-purple-300",
                                    indigo: "text-indigo-700 dark:text-indigo-300",
                                    emerald: "text-emerald-700 dark:text-emerald-300",
                                    amber: "text-amber-700 dark:text-amber-300",
                                    teal: "text-teal-700 dark:text-teal-300",
                                    cyan: "text-cyan-700 dark:text-cyan-300",
                                };
                                return (
                                    <div
                                        key={idx}
                                        className={clsx(
                                            "feature-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                                            colorMap[feature.color],
                                            "hover:-translate-y-[2px]"
                                        )}
                                        style={{ animationDelay: `${idx * 50 + 300}ms` }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{feature.icon}</span>
                                            <h3
                                                className={clsx(
                                                    "font-bold",
                                                    textColorMap[feature.color]
                                                )}
                                            >
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <p className="mt-1 text-slate-600 dark:text-slate-400">
                                            {feature.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── E.F. Codd and the Relational Model ───────────── */}
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
                            <span className="text-2xl">👨‍🔬</span>
                            E.F. Codd and the Relational Model
                        </h2>
                        <p
                            className={clsx(
                                "text-sm leading-relaxed text-slate-600",
                                "dark:text-slate-400"
                            )}
                        >
                            <strong className="text-blue-600 dark:text-blue-400">Dr. Edgar F. Codd</strong>{" "}
                            (1923-2003), a British computer scientist working at IBM, proposed
                            the relational model for database management in 1970. His paper,
                            "A Relational Model of Data for Large Shared Data Banks,"
                            revolutionised the database industry.
                        </p>
                        <div
                            className={clsx(
                                "mt-4 grid grid-cols-1 gap-4 md:grid-cols-3",
                                "text-sm"
                            )}
                        >
                            <div
                                className={clsx(
                                    "rounded-xl border p-4",
                                    "border-blue-200/50 bg-blue-50/40",
                                    "dark:border-blue-700/50 dark:bg-blue-900/10"
                                )}
                            >
                                <h4 className="font-bold text-blue-700 dark:text-blue-300">Key Contributions</h4>
                                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                                    <li>Introduced relational model</li>
                                    <li>Defined normalisation</li>
                                    <li>Proposed 12 rules</li>
                                </ul>
                            </div>
                            <div
                                className={clsx(
                                    "rounded-xl border p-4",
                                    "border-emerald-200/50 bg-emerald-50/40",
                                    "dark:border-emerald-700/50 dark:bg-emerald-900/10"
                                )}
                            >
                                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">The Model</h4>
                                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                                    <li>Tables = Relations</li>
                                    <li>Rows = Tuples</li>
                                    <li>Columns = Attributes</li>
                                    <li>Keys enforce relationships</li>
                                </ul>
                            </div>
                            <div
                                className={clsx(
                                    "rounded-xl border p-4",
                                    "border-purple-200/50 bg-purple-50/40",
                                    "dark:border-purple-700/50 dark:bg-purple-900/10"
                                )}
                            >
                                <h4 className="font-bold text-purple-700 dark:text-purple-300">Impact</h4>
                                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                                    <li>Foundation of modern DBMS</li>
                                    <li>SQL as standard language</li>
                                    <li>Data independence</li>
                                    <li>Integrity enforcement</li>
                                </ul>
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
                            Real-World Example: University Database
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
                                <strong>Tuhina</strong>, a university administrator at{" "}
                                <strong>Shyamnagar</strong> University, uses an RDBMS (PostgreSQL)
                                to manage all academic data:
                                <br />
                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                    <li>
                                        <strong>Students table:</strong> StudentID (PK), Name,
                                        Email, DOB, Address
                                    </li>
                                    <li>
                                        <strong>Courses table:</strong> CourseID (PK), Title,
                                        Credits, Department
                                    </li>
                                    <li>
                                        <strong>Professors table:</strong> ProfessorID (PK), Name,
                                        Department, Email
                                    </li>
                                    <li>
                                        <strong>Enrollments table:</strong> EnrollmentID (PK),
                                        StudentID (FK), CourseID (FK), ProfessorID (FK), Semester,
                                        Grade
                                    </li>
                                </ul>
                                <strong>Power of RDBMS:</strong>
                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                    <li>
                                        <strong>Relationships:</strong> Enrollments links students
                                        and courses via foreign keys, ensuring data integrity.
                                    </li>
                                    <li>
                                        <strong>Integrity:</strong> A student can't enroll in a
                                        course that doesn't exist (foreign key constraint).
                                    </li>
                                    <li>
                                        <strong>Querying:</strong> "Show all students enrolled in
                                        'Database Systems' with grades above 80" — a simple SQL
                                        query joins three tables.
                                    </li>
                                </ul>
                                This RDBMS is the backbone of the university's operations.
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
                                    <strong>Understand the relational model:</strong> The
                                    mathematical foundation (set theory, predicate logic) helps
                                    you write better queries and design better schemas.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 dark:text-blue-400">▸</span>
                                <span>
                                    <strong>Normalise your data:</strong> Follow normalisation
                                    rules (1NF, 2NF, 3NF) to reduce redundancy and anomalies.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 dark:text-blue-400">▸</span>
                                <span>
                                    <strong>Use foreign keys for integrity:</strong> Always define
                                    foreign key constraints to ensure referential integrity.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 dark:text-blue-400">▸</span>
                                <span>
                                    <strong>Learn SQL thoroughly:</strong> SQL is the language of
                                    RDBMS. Master SELECT, JOIN, GROUP BY, and subqueries.
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
                                    <strong>Not defining primary keys:</strong> Every table should
                                    have a primary key to uniquely identify each row.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-500 dark:text-red-400">✗</span>
                                <span>
                                    <strong>Ignoring foreign keys:</strong> Without foreign keys,
                                    relationships are not enforced, leading to orphaned records.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-500 dark:text-red-400">✗</span>
                                <span>
                                    <strong>Over-normalisation:</strong> Normalisation is good,
                                    but too many tables can hurt performance. Find the right
                                    balance.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-500 dark:text-red-400">✗</span>
                                <span>
                                    <strong>Forgetting constraints:</strong> Not using CHECK,
                                    UNIQUE, or NOT NULL constraints allows invalid data to enter.
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
                                    <strong>Design the schema first:</strong> Spend time
                                    understanding the data and relationships before creating tables.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                                <span>
                                    <strong>Use meaningful names:</strong> Table and column names
                                    should be descriptive and consistent (e.g., students, student_id).
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                                <span>
                                    <strong>Index wisely:</strong> Create indexes on columns used
                                    in WHERE, JOIN, and ORDER BY clauses for performance.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                                <span>
                                    <strong>Document the database:</strong> Maintain an ER diagram
                                    and data dictionary for reference.
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
                                <span>I can define RDBMS and its key characteristics</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-500 dark:text-blue-400">☐</span>
                                <span>I understand tables, rows, columns, and keys</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-500 dark:text-blue-400">☐</span>
                                <span>I know who E.F. Codd is and his contribution</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-500 dark:text-blue-400">☐</span>
                                <span>I understand the role of foreign keys in relationships</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-500 dark:text-blue-400">☐</span>
                                <span>I can identify common pitfalls and how to avoid them</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-500 dark:text-blue-400">☐</span>
                                <span>I can apply best practices for RDBMS design</span>
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
                        title="What is RDBMS? – FAQs"
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
            title="What is RDBMS?"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic12_note.txt"
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
                            "The relational model is one of the most elegant and enduring ideas " +
                            "in computer science. I tell my students: 'If you understand relations, " +
                            "you understand the foundation of modern data management.' The key " +
                            "insights are: data is organised in tables, relationships are defined " +
                            "by keys, and we can query using set theory (SQL). Once you grasp " +
                            "this, you can design any database. The best way to learn is to practice " +
                            "— create your own database for a library, a school, or an e-commerce " +
                            "site. Map out the entities, define the relationships, and write the " +
                            "DDL. This hands-on experience is invaluable."
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
                        Topic 12 · What is RDBMS? · Built with ❤️ for classroom learning
                    </span>
                </div>
            </div>
        </>
    );
};

export default Topic12;