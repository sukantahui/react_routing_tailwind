import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";

/**
 * Topic11 – Examples of Popular DBMS Software
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Introduce the most widely used Database Management Systems,
 *          compare their features, strengths, weaknesses, and typical
 *          use cases. Helps students choose the right DBMS for projects.
 *          Builds on topics 6-10 (DBMS concepts and applications).
 */
const Topic11 = () => {
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

  // ─── DBMS Data ─────────────────────────────────────────────
  const dbmsList = [
    {
      name: "MySQL",
      icon: "🐬",
      type: "RDBMS (Open Source)",
      desc: "The world's most popular open-source relational database. Widely used in web applications and LAMP stack.",
      strengths: "Fast, easy to use, great community support, ACID compliant with InnoDB.",
      useCases: "Web apps, e-commerce, CMS (WordPress), small to medium businesses.",
      color: "blue",
    },
    {
      name: "PostgreSQL",
      icon: "🐘",
      type: "RDBMS (Open Source)",
      desc: "Advanced open-source relational database with strong standards compliance and extensibility.",
      strengths: "ACID compliance, support for JSON, full-text search, spatial data (PostGIS), high concurrency.",
      useCases: "Data warehousing, scientific applications, financial systems, geospatial apps.",
      color: "indigo",
    },
    {
      name: "Oracle Database",
      icon: "🔶",
      type: "RDBMS (Commercial)",
      desc: "Enterprise-grade relational database with advanced features for large-scale systems.",
      strengths: "High availability, scalability, security, advanced analytics, partitioning, RAC (Real Application Clusters).",
      useCases: "Large enterprises, banking, telecom, government, mission-critical applications.",
      color: "red",
    },
    {
      name: "Microsoft SQL Server",
      icon: "🟦",
      type: "RDBMS (Commercial)",
      desc: "Microsoft's enterprise relational database with deep integration with the .NET ecosystem.",
      strengths: "Integration with Azure, business intelligence tools, .NET stack, security features.",
      useCases: "Windows-based enterprise applications, .NET development, Microsoft ecosystem.",
      color: "teal",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      type: "NoSQL (Document)",
      desc: "Leading document-oriented NoSQL database using JSON-like documents with flexible schemas.",
      strengths: "Horizontal scaling, flexible schema, rich query language, sharding, high performance.",
      useCases: "Content management, real-time analytics, mobile apps, IoT, agile development.",
      color: "emerald",
    },
    {
      name: "Redis",
      icon: "🔴",
      type: "NoSQL (Key-Value / In-Memory)",
      desc: "In-memory data store used as a database, cache, and message broker.",
      strengths: "Extremely fast, supports data structures (strings, hashes, lists, sets), persistence options.",
      useCases: "Caching, session management, real-time leaderboards, pub/sub messaging.",
      color: "red",
    },
    {
      name: "Cassandra",
      icon: "🔷",
      type: "NoSQL (Wide Column)",
      desc: "Distributed wide-column store designed for massive scalability with no single point of failure.",
      strengths: "Linear scalability, high availability, fault-tolerant, writes are faster than reads.",
      useCases: "Large-scale applications, time-series data, IoT, fraud detection, social media.",
      color: "purple",
    },
    {
      name: "SQLite",
      icon: "📦",
      type: "RDBMS (Embedded)",
      desc: "Lightweight, serverless, embedded SQL database engine.",
      strengths: "Zero configuration, small footprint, ACID compliant, self-contained.",
      useCases: "Mobile apps, browsers (local storage), IoT devices, embedded systems.",
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

        .dbms-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .dbms-card:hover {
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
            Module 1 · Topic 11
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Popular DBMS
            </span>
            <br className="sm:hidden" />
            Software
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            A tour of the most widely used database management systems —
            their strengths, weaknesses, and where they shine.
          </p>
        </div>

        {/* ─── SVG: DBMS Family ────────────────────────────── */}
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
              aria-label="Popular DBMS logos showcase"
            >
              <rect width="600" height="180" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🗄️ Popular Database Management Systems
              </text>

              {/* Row 1 */}
              <rect x="30" y="40" width="100" height="55" rx="8" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" />
              <text x="80" y="62" textAnchor="middle" fontSize="22">🐬</text>
              <text x="80" y="85" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">MySQL</text>

              <rect x="145" y="40" width="100" height="55" rx="8" fill="#4338ca" opacity="0.08" className="dark:fill-indigo-400 dark:opacity-12" />
              <text x="195" y="62" textAnchor="middle" fontSize="22">🐘</text>
              <text x="195" y="85" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">PostgreSQL</text>

              <rect x="260" y="40" width="100" height="55" rx="8" fill="#ef4444" opacity="0.08" className="dark:fill-red-400 dark:opacity-12" />
              <text x="310" y="62" textAnchor="middle" fontSize="22">🔶</text>
              <text x="310" y="85" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Oracle</text>

              <rect x="375" y="40" width="100" height="55" rx="8" fill="#0d9488" opacity="0.08" className="dark:fill-teal-400 dark:opacity-12" />
              <text x="425" y="62" textAnchor="middle" fontSize="22">🟦</text>
              <text x="425" y="85" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">SQL Server</text>

              <rect x="490" y="40" width="100" height="55" rx="8" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12" />
              <text x="540" y="62" textAnchor="middle" fontSize="22">🍃</text>
              <text x="540" y="85" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">MongoDB</text>

              {/* Row 2 */}
              <rect x="75" y="110" width="90" height="50" rx="8" fill="#ef4444" opacity="0.08" className="dark:fill-red-400 dark:opacity-12" />
              <text x="120" y="135" textAnchor="middle" fontSize="18">🔴</text>
              <text x="120" y="152" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Redis</text>

              <rect x="190" y="110" width="90" height="50" rx="8" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12" />
              <text x="235" y="135" textAnchor="middle" fontSize="18">🔷</text>
              <text x="235" y="152" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">Cassandra</text>

              <rect x="305" y="110" width="90" height="50" rx="8" fill="#06b6d4" opacity="0.08" className="dark:fill-cyan-400 dark:opacity-12" />
              <text x="350" y="135" textAnchor="middle" fontSize="18">📦</text>
              <text x="350" y="152" textAnchor="middle" fontSize="9" fill="#1e293b" className="dark:fill-slate-300">SQLite</text>

              <text x="450" y="135" textAnchor="middle" fontSize="14" fill="#94a3b8" className="dark:fill-slate-500">+ many more...</text>
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
              The Database Landscape
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              There is no single "best" DBMS — each has its strengths and ideal
              use cases. From the <strong className="text-blue-600 dark:text-blue-400">open-source stalwarts</strong>{" "}
              like MySQL and PostgreSQL to <strong className="text-red-600 dark:text-red-400">enterprise giants</strong>{" "}
              like Oracle and SQL Server, and <strong className="text-emerald-600 dark:text-emerald-400">modern NoSQL</strong>{" "}
              databases like MongoDB and Redis, the choice depends on your
              specific requirements.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                Understanding the popular DBMS options is the first step to
                choosing the right tool for your project. Each has a passionate
                community and a rich ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* ─── DBMS Cards ────────────────────────────────────── */}
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
              <span className="text-2xl">📊</span>
              Popular DBMS at a Glance
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              {dbmsList.map((db, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  cyan: "border-cyan-200/50 bg-cyan-50/40 dark:border-cyan-700/50 dark:bg-cyan-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  red: "text-red-700 dark:text-red-300",
                  teal: "text-teal-700 dark:text-teal-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  cyan: "text-cyan-700 dark:text-cyan-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "dbms-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[db.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{db.icon}</span>
                      <div>
                        <h3 className={clsx("font-bold", textColorMap[db.color])}>
                          {db.name}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-500">
                          {db.type}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {db.desc}
                    </p>
                    <div className="mt-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">👍 Strengths:</span>
                      <p className="text-slate-600 dark:text-slate-400">{db.strengths}</p>
                    </div>
                    <div className="mt-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">📌 Use Cases:</span>
                      <p className="text-slate-600 dark:text-slate-400">{db.useCases}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Comparison Table ──────────────────────────────── */}
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
              RDBMS vs NoSQL: Choosing the Right Type
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
                      Feature
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-blue-600",
                        "dark:text-blue-400"
                      )}
                    >
                      RDBMS (MySQL, PostgreSQL, Oracle, SQL Server)
                    </th>
                    <th
                      className={clsx(
                        "px-4 py-3 font-semibold text-emerald-600",
                        "dark:text-emerald-400"
                      )}
                    >
                      NoSQL (MongoDB, Cassandra, Redis)
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
                    <td className="px-4 py-3 font-medium">Data Model</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Structured tables, fixed schema</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Document, key-value, graph, flexible schema</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Query Language</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">SQL (Structured Query Language)</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Proprietary APIs, JSON queries</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Transactions</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">ACID compliant</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">BASE (eventual consistency) or limited ACID</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Scalability</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Vertical scaling (scale-up), limited horizontal</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Horizontal scaling (scale-out), designed for distribution</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Best For</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Complex queries, joins, transactions, reporting</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">High volume, flexible schema, real-time, distributed</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">Examples</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">MySQL, PostgreSQL, Oracle, SQL Server</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">MongoDB (document), Redis (key-value), Cassandra (wide column)</td>
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
              Real-World Example: Choosing the Right DBMS
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
                <strong>Swadeep</strong>, a software architect in{" "}
                <strong>Barrackpore</strong>, is building a new application.
                Here's how he chooses DBMS for different parts:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>User accounts and transactions:</strong>{" "}
                    He chooses <strong>PostgreSQL</strong> because it's ACID
                    compliant, supports complex queries, and has strong JSON
                    support for user profiles.
                  </li>
                  <li>
                    <strong>Product catalog and inventory:</strong>{" "}
                    He uses <strong>MySQL</strong> because it's fast, reliable,
                    and widely supported. The product data is structured and fits
                    well in tables.
                  </li>
                  <li>
                    <strong>Session management and caching:</strong>{" "}
                    He uses <strong>Redis</strong> for ultra-fast in-memory
                    caching and session storage.
                  </li>
                  <li>
                    <strong>Real-time analytics:</strong>{" "}
                    He uses <strong>MongoDB</strong> to store logs and clickstream
                    data with flexible schemas, and <strong>Cassandra</strong> for
                    high-volume time-series data.
                  </li>
                  <li>
                    <strong>Mobile app offline storage:</strong>{" "}
                    He uses <strong>SQLite</strong> for the mobile app's local
                    database.
                  </li>
                </ul>
                <strong>Lesson:</strong> Modern applications often use multiple
                databases (polyglot persistence) to leverage each DBMS's strengths.
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
                  <strong>Start with open-source:</strong> For most projects,
                  MySQL or PostgreSQL are excellent starting points. They are
                  free, well-documented, and have huge communities.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Know the trade-offs:</strong> RDBMS offers consistency
                  (ACID) but may not scale as easily. NoSQL offers scalability
                  but may sacrifice some consistency (BASE). Choose based on
                  your needs.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Consider managed services:</strong> Cloud providers
                  (AWS, Azure, GCP) offer managed versions of all these DBMS,
                  reducing administrative overhead.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Test with real data:</strong> Don't just compare
                  features; test the DBMS with your actual workload and data
                  volume before committing.
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
                  <strong>Using the wrong DBMS for the job:</strong> E.g., using
                  MongoDB for a banking application that requires ACID
                  transactions, or using MySQL for massive time-series data
                  when Cassandra would be better.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Assuming the default configuration is optimal:</strong>
                  Most DBMS need tuning (memory, buffer sizes, connection pools)
                  for your specific workload.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not planning for migration:</strong> Choosing a DBMS
                  without considering future migration options can lead to vendor
                  lock-in.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Underestimating operational complexity:</strong>
                  Every DBMS requires maintenance, backups, monitoring, and
                  upgrades. Plan for these.
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
                  <strong>Evaluate requirements carefully:</strong> Consider
                  data volume, structure, consistency needs, read/write ratio,
                  scalability, and team expertise before choosing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Start simple:</strong> For most projects, start with
                  a well-known RDBMS like PostgreSQL. You can always add other
                  databases later if needed.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use benchmarks:</strong> Use tools like pgbench (for
                  PostgreSQL), Sysbench, or YCSB to test performance with
                  realistic workloads.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Plan for polyglot persistence:</strong> Don't be afraid
                  to use multiple databases for different parts of your
                  application. This is a modern best practice.
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
                <span>I can name at least 6 popular DBMS and their types</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the differences between RDBMS and NoSQL</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the strengths of MySQL and PostgreSQL</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand when to choose a NoSQL database</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the concept of polyglot persistence</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for DBMS selection</span>
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
            title="Popular DBMS Software – FAQs"
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
            note={`
              Choosing the right DBMS is a skill that comes with experience. 
              I recommend students to start with one RDBMS (PostgreSQL) and one 
              NoSQL (MongoDB) and become proficient in both. This will cover 90% 
              of use cases you'll encounter. Also, don't be a "database zealot" — 
              every DBMS has its place. Learn to evaluate trade-offs: consistency, 
              availability, partition tolerance (CAP theorem), and data model 
              fit. The best engineers are pragmatic and choose the right tool 
              "or each job, not the one they're most comfortable with.            `}
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
            Topic 11 · Examples of Popular DBMS Software · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic11;