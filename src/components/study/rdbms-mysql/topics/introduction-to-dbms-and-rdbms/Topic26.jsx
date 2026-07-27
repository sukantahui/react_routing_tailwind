import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic26_files/topic26_questions";

/**
 * Topic26 – History of MySQL
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Trace the evolution of MySQL from its humble beginnings in 1995
 *          to becoming the world's most popular open-source database.
 *          Covers key milestones, version releases, and the Oracle acquisition.
 *          Builds on Topic 25 (Introduction to MySQL).
 */
const Topic26 = () => {
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

  // ─── Timeline Data ────────────────────────────────────────
  const timelineEvents = [
    {
      year: "1995",
      title: "MySQL AB Founded",
      desc: "Michael Widenius (Monty) and David Axmark founded MySQL AB in Sweden. The first version of MySQL was released, named after Monty's daughter 'My'.",
      icon: "🇸🇪",
      color: "blue",
    },
    {
      year: "1996",
      title: "MySQL 1.0 Released",
      desc: "The first production release. MySQL was initially designed for small to medium-sized applications with a focus on speed and simplicity.",
      icon: "📦",
      color: "emerald",
    },
    {
      year: "2000",
      title: "Open-Source Release",
      desc: "MySQL became available under the GNU General Public License (GPL), making it free and open-source. This decision led to rapid adoption in the web development community.",
      icon: "🔓",
      color: "purple",
    },
    {
      year: "2003",
      title: "MySQL 4.0",
      desc: "Introduced the InnoDB storage engine, which added transaction support (ACID) and foreign key constraints. This made MySQL suitable for enterprise applications.",
      icon: "⚡",
      color: "amber",
    },
    {
      year: "2005",
      title: "MySQL 5.0",
      desc: "A major release adding stored procedures, triggers, views, and cursors. This brought MySQL closer to feature parity with commercial databases.",
      icon: "📊",
      color: "indigo",
    },
    {
      year: "2008",
      title: "Sun Microsystems Acquisition",
      desc: "Sun Microsystems acquired MySQL AB for approximately $1 billion. This brought MySQL under a major corporate umbrella.",
      icon: "☀️",
      color: "orange",
    },
    {
      year: "2010",
      title: "Oracle Corporation Acquisition",
      desc: "Oracle acquired Sun Microsystems, and with it, MySQL. The acquisition raised concerns about MySQL's future as open-source, but Oracle has continued to invest in MySQL.",
      icon: "🔶",
      color: "red",
    },
    {
      year: "2013",
      title: "MySQL 5.6",
      desc: "Improved InnoDB performance, introduced memcached integration, and added better replication features.",
      icon: "🚀",
      color: "teal",
    },
    {
      year: "2015",
      title: "MySQL 5.7",
      desc: "Significant performance improvements, JSON support, enhanced security, and SQL mode improvements. A major step towards modern data management.",
      icon: "📝",
      color: "cyan",
    },
    {
      year: "2018",
      title: "MySQL 8.0",
      desc: "A landmark release with window functions, common table expressions (CTEs), a new data dictionary, and improved JSON handling. Still the current major version.",
      icon: "🎯",
      color: "pink",
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

        .timeline-event {
          transition: all 0.3s ease;
        }
        .timeline-event:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .timeline-event:hover {
          box-shadow: 0 8px 20px -5px rgba(255, 255, 255, 0.05);
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
            Module 1 · Topic 26
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              History
            </span>
            <br className="sm:hidden" />
            of MySQL
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            From a small Swedish project to powering the world's biggest
            websites — the remarkable journey of MySQL.
          </p>
        </div>

        {/* ─── SVG: MySQL History Timeline ──────────────────── */}
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
              aria-label="MySQL history timeline"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                📜 MySQL: A Journey Through Time
              </text>

              {/* Timeline line */}
              <line x1="50" y1="70" x2="550" y2="70" stroke="#94a3b8" strokeWidth="3" className="dark:stroke-slate-500">
                <animate attributeName="stroke-dashoffset" values="0;1000" dur="8s" repeatCount="indefinite" />
              </line>

              {/* Timeline dots with labels */}
              <circle cx="70" cy="70" r="6" fill="#3b82f6" className="dark:fill-blue-400">
                <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="70" y="90" textAnchor="middle" fontSize="8" fill="#3b82f6" className="dark:fill-blue-400">1995</text>

              <circle cx="160" cy="70" r="6" fill="#10b981" className="dark:fill-emerald-400" />
              <text x="160" y="90" textAnchor="middle" fontSize="8" fill="#10b981" className="dark:fill-emerald-400">2000</text>

              <circle cx="250" cy="70" r="6" fill="#8b5cf6" className="dark:fill-purple-400" />
              <text x="250" y="90" textAnchor="middle" fontSize="8" fill="#8b5cf6" className="dark:fill-purple-400">2005</text>

              <circle cx="340" cy="70" r="6" fill="#f59e0b" className="dark:fill-amber-400" />
              <text x="340" y="90" textAnchor="middle" fontSize="8" fill="#f59e0b" className="dark:fill-amber-400">2010</text>

              <circle cx="430" cy="70" r="6" fill="#ef4444" className="dark:fill-red-400" />
              <text x="430" y="90" textAnchor="middle" fontSize="8" fill="#ef4444" className="dark:fill-red-400">2015</text>

              <circle cx="520" cy="70" r="6" fill="#ec4899" className="dark:fill-pink-400" />
              <text x="520" y="90" textAnchor="middle" fontSize="8" fill="#ec4899" className="dark:fill-pink-400">2020</text>

              {/* Bottom text */}
              <text x="300" y="160" textAnchor="middle" fontSize="10" fill="#94a3b8" className="dark:fill-slate-500">
                1995 — MySQL 1.0 → 2000 — GPL → 2005 — MySQL 5.0 → 2010 — Oracle → 2018 — MySQL 8.0
              </text>
              <text x="300" y="180" textAnchor="middle" fontSize="9" fill="#94a3b8" className="dark:fill-slate-500">
                ⭐ From a small Swedish project to powering the world
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
              The Remarkable Story of MySQL
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              MySQL's journey from a small Swedish startup to the world's most
              popular open-source relational database is a story of vision,
              innovation, and community. What started as a personal project of
              <strong className="text-blue-600 dark:text-blue-400"> Michael
              "Monty" Widenius</strong> in the mid-1990s became the backbone of
              the internet, powering companies like Facebook, Twitter, and YouTube.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                Understanding MySQL's history helps you appreciate its design
                decisions, its strengths, and why it remains so popular today.
              </p>
            </div>
          </div>
        </section>

        {/* ─── The Creators ──────────────────────────────────── */}
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
              <span className="text-2xl">👨‍💻</span>
              The Creators of MySQL
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
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🇸🇪 Michael "Monty" Widenius
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Born in 1962 in Finland</li>
                  <li>Co-founder of MySQL AB</li>
                  <li>Namesake: MySQL named after his daughter "My"</li>
                  <li>Lead developer of MySQL</li>
                  <li>Later founded MariaDB</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  🇸🇪 David Axmark
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Co-founder of MySQL AB</li>
                  <li>Business and strategic mind</li>
                  <li>Instrumental in MySQL's growth</li>
                  <li>Helped drive open-source adoption</li>
                  <li>Left MySQL AB in 2008</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Timeline ──────────────────────────────────────── */}
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
              <span className="text-2xl">⏱️</span>
              MySQL Timeline: Key Milestones
            </h2>
            <div className="space-y-3">
              {timelineEvents.map((event, idx) => {
                const colorMap = {
                  blue: "border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/10",
                  emerald: "border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10",
                  purple: "border-l-purple-500 bg-purple-50/30 dark:bg-purple-900/10",
                  amber: "border-l-amber-500 bg-amber-50/30 dark:bg-amber-900/10",
                  indigo: "border-l-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10",
                  orange: "border-l-orange-500 bg-orange-50/30 dark:bg-orange-900/10",
                  red: "border-l-red-500 bg-red-50/30 dark:bg-red-900/10",
                  teal: "border-l-teal-500 bg-teal-50/30 dark:bg-teal-900/10",
                  cyan: "border-l-cyan-500 bg-cyan-50/30 dark:bg-cyan-900/10",
                  pink: "border-l-pink-500 bg-pink-50/30 dark:bg-pink-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  orange: "text-orange-700 dark:text-orange-300",
                  red: "text-red-700 dark:text-red-300",
                  teal: "text-teal-700 dark:text-teal-300",
                  cyan: "text-cyan-700 dark:text-cyan-300",
                  pink: "text-pink-700 dark:text-pink-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "timeline-event rounded-xl border-l-4 p-4 transition-all duration-300",
                      colorMap[event.color],
                      "border-slate-200/50 dark:border-slate-700/50"
                    )}
                    style={{ animationDelay: `${idx * 50 + 400}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{event.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={clsx(
                              "text-lg font-bold",
                              textColorMap[event.color]
                            )}
                          >
                            {event.year}
                          </span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {event.title}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                          {event.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── The Oracle Era ────────────────────────────────── */}
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
              <span className="text-2xl">🔶</span>
              The Oracle Era (2010–Present)
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              In 2010, Oracle Corporation acquired Sun Microsystems, and with it,
              MySQL. This acquisition raised concerns about MySQL's future as an
              open-source project. However, Oracle has continued to invest heavily
              in MySQL, releasing significant updates and keeping it open-source.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  ✅ Positive Impacts
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Continued investment and development</li>
                  <li>Major releases: 5.6, 5.7, 8.0</li>
                  <li>Improved performance and features</li>
                  <li>Enterprise-grade security</li>
                  <li>Comprehensive documentation</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-red-200/50 p-4",
                  "dark:border-red-700/50",
                  "bg-red-50/40 dark:bg-red-900/10"
                )}
              >
                <h4 className="font-bold text-red-700 dark:text-red-300">
                  ❌ Concerns
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Potential for closed-source future</li>
                  <li>Vendor lock-in risks</li>
                  <li>Community concerns</li>
                  <li>Led to MariaDB fork</li>
                  <li>Some features in Enterprise edition</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The MariaDB Fork ──────────────────────────────── */}
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
              <span className="text-2xl">🔀</span>
              The MariaDB Fork
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              In 2009, Michael "Monty" Widenius, the original creator of MySQL,
              forked MySQL to create <strong>MariaDB</strong>. This was done to
              ensure that MySQL would remain open-source and to continue
              development outside of Oracle's control.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🐬 MySQL
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Owned by Oracle Corporation</li>
                  <li>Open-source (GPL)</li>
                  <li>Enterprise edition available</li>
                  <li>Widely adopted</li>
                  <li>Large community</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  🐬 MariaDB
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Fork of MySQL (2009)</li>
                  <li>Led by Monty Widenius</li>
                  <li>Fully open-source</li>
                  <li>Additional storage engines</li>
                  <li>Improved performance</li>
                </ul>
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
              Real-World Impact: MySQL's Global Reach
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
                <strong>Tuhina</strong>, a database historian, studies MySQL's
                impact:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Facebook:</strong> Uses MySQL to store billions of
                    user profiles, posts, and messages.
                  </li>
                  <li>
                    <strong>Twitter:</strong> Relies on MySQL for tweets and
                    timelines.
                  </li>
                  <li>
                    <strong>YouTube:</strong> Stores video metadata and user
                    comments in MySQL.
                  </li>
                  <li>
                    <strong>Wikipedia:</strong> Uses MySQL for its content
                    management system.
                  </li>
                  <li>
                    <strong>WordPress:</strong> Powers over 40% of all websites
                    with MySQL as the default database.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> MySQL's history is not just about
                a database — it's about enabling the digital revolution.
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
                  <strong>Understand the context:</strong> Knowing MySQL's
                  history helps you understand its design decisions and
                  ecosystem.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Follow the evolution:</strong> Keep up with MySQL's
                  version history to know what features are available in each
                  release.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Choose wisely:</strong> MySQL vs MariaDB — both have
                  their strengths. Understand your needs before choosing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Learn from the past:</strong> The story of MySQL
                  teaches us about open-source communities, corporate
                  acquisitions, and the power of community-driven development.
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
                  <strong>Assuming all MySQL versions are the same:</strong>
                  Features vary widely between versions. Always check the
                  documentation for your version.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Confusing MySQL and MariaDB:</strong> While similar,
                  they have differences. Make sure you're using the right
                  commands and features.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring the license:</strong> MySQL is GPL-licensed.
                  Understand the licensing implications for your project.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Thinking MySQL is dead:</strong> MySQL is very much
                  alive and actively developed. It's still the most popular
                  open-source database.
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
                  <strong>Use the latest stable version:</strong> Always use the
                  latest stable MySQL release to benefit from performance
                  improvements, security patches, and new features.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Follow the community:</strong> Join MySQL forums,
                  follow the development blog, and stay updated on the latest
                  developments.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Test migrations carefully:</strong> When upgrading
                  MySQL versions, test thoroughly in a development environment
                  first.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Learn the history:</strong> Understanding the history
                  of MySQL gives you perspective on the ecosystem and helps you
                  make better decisions.
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
                <span>I know when MySQL was founded and who created it</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the key milestones in MySQL's history</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know about the Oracle acquisition and its impact</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the difference between MySQL and MariaDB</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know major version releases and their features</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can avoid common pitfalls related to MySQL history</span>
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
            title="History of MySQL – FAQs"
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
              "The history of MySQL is a lesson in how open-source software can " +
              "change the world. I tell my students: 'Every time you use Facebook, " +
              "Twitter, or WordPress, you're interacting with a database that traces " +
              "its roots back to a small Swedish startup.' Understanding this history " +
              "gives you perspective on the software industry, the power of community, " +
              "and the importance of open-source licensing. It also helps you make " +
              "informed decisions about whether to use MySQL, MariaDB, or another " +
              "database. This isn't just history — it's context for your career."
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
            Topic 26 · History of MySQL · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic26;