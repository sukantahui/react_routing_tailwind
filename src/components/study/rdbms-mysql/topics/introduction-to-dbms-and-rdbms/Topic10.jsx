import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";

/**
 * Topic10 – Applications of Database Systems
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explore the real-world applications of database systems
 *          across various industries and domains, showing how DBMS
 *          powers modern life. Builds on topics 6-9 (DBMS concepts).
 */
const Topic10 = () => {
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

  // ─── Applications Data ────────────────────────────────────
  const applications = [
    {
      icon: "🏦",
      title: "Banking & Finance",
      desc: "Manages customer accounts, transactions, loans, investments, and fraud detection.",
      examples: "ATMs, online banking, stock trading platforms, loan management systems.",
      color: "blue",
    },
    {
      icon: "🏥",
      title: "Healthcare",
      desc: "Stores patient records, treatment histories, prescriptions, and medical research data.",
      examples: "Electronic Health Records (EHR), hospital management systems, telemedicine.",
      color: "red",
    },
    {
      icon: "🏫",
      title: "Education",
      desc: "Manages student records, grades, attendance, course registrations, and library systems.",
      examples: "Student information systems, learning management systems (LMS), online exams.",
      color: "emerald",
    },
    {
      icon: "🛒",
      title: "E-Commerce",
      desc: "Handles product catalogs, inventory, customer data, orders, payments, and recommendations.",
      examples: "Amazon, Flipkart, Shopify, online retail platforms.",
      color: "amber",
    },
    {
      icon: "📱",
      title: "Social Media",
      desc: "Stores user profiles, posts, messages, media, friend connections, and activity feeds.",
      examples: "Facebook, Instagram, Twitter/X, LinkedIn, TikTok.",
      color: "purple",
    },
    {
      icon: "🚗",
      title: "Transportation & Logistics",
      desc: "Manages fleet tracking, route optimisation, shipment tracking, and booking systems.",
      examples: "Uber, Ola, FedEx, airline reservation systems, GPS navigation.",
      color: "indigo",
    },
    {
      icon: "🎮",
      title: "Gaming",
      desc: "Stores player profiles, game states, achievements, leaderboards, and in-game purchases.",
      examples: "Multiplayer games, mobile games, esports platforms.",
      color: "pink",
    },
    {
      icon: "📊",
      title: "Business Intelligence",
      desc: "Enables data warehousing, reporting, dashboards, and analytical insights.",
      examples: "Sales analytics, customer behaviour analysis, financial reporting.",
      color: "teal",
    },
    {
      icon: "🌾",
      title: "Agriculture",
      desc: "Tracks crop yields, weather patterns, soil conditions, and supply chain management.",
      examples: "Precision farming, smart irrigation, crop monitoring systems.",
      color: "emerald",
    },
    {
      icon: "🏛️",
      title: "Government",
      desc: "Manages citizen records, tax data, voter registration, and public services.",
      examples: "Aadhaar/UIDAI, voter ID systems, e-governance portals, passport systems.",
      color: "blue",
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

        .app-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .app-card:hover {
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
            Module 1 · Topic 10
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Applications
            </span>
            <br className="sm:hidden" />
            of Database Systems
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            How databases power the modern world — from banking to healthcare,
            education to e-commerce, and everywhere in between.
          </p>
        </div>

        {/* ─── SVG: Application Showcase ───────────────────── */}
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
              aria-label="Applications of database systems"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🌐 Databases Power Everywhere
              </text>

              {/* First row of apps */}
              <rect x="20" y="40" width="80" height="80" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" />
              <text x="60" y="75" textAnchor="middle" fontSize="28">🏦</text>
              <text x="60" y="105" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Banking</text>

              <rect x="110" y="40" width="80" height="80" rx="10" fill="#ef4444" opacity="0.08" className="dark:fill-red-400 dark:opacity-12" />
              <text x="150" y="75" textAnchor="middle" fontSize="28">🏥</text>
              <text x="150" y="105" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Healthcare</text>

              <rect x="200" y="40" width="80" height="80" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12" />
              <text x="240" y="75" textAnchor="middle" fontSize="28">🏫</text>
              <text x="240" y="105" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Education</text>

              <rect x="290" y="40" width="80" height="80" rx="10" fill="#f59e0b" opacity="0.08" className="dark:fill-amber-400 dark:opacity-12" />
              <text x="330" y="75" textAnchor="middle" fontSize="28">🛒</text>
              <text x="330" y="105" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">E-commerce</text>

              <rect x="380" y="40" width="80" height="80" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12" />
              <text x="420" y="75" textAnchor="middle" fontSize="28">📱</text>
              <text x="420" y="105" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Social</text>

              <rect x="470" y="40" width="80" height="80" rx="10" fill="#6366f1" opacity="0.08" className="dark:fill-indigo-400 dark:opacity-12" />
              <text x="510" y="75" textAnchor="middle" fontSize="28">🚗</text>
              <text x="510" y="105" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Logistics</text>

              {/* Second row */}
              <rect x="65" y="130" width="80" height="50" rx="8" fill="#ec4899" opacity="0.08" className="dark:fill-pink-400 dark:opacity-12" />
              <text x="105" y="152" textAnchor="middle" fontSize="16">🎮</text>
              <text x="105" y="170" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Gaming</text>

              <rect x="170" y="130" width="80" height="50" rx="8" fill="#14b8a6" opacity="0.08" className="dark:fill-teal-400 dark:opacity-12" />
              <text x="210" y="152" textAnchor="middle" fontSize="16">📊</text>
              <text x="210" y="170" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Analytics</text>

              <rect x="275" y="130" width="80" height="50" rx="8" fill="#22c55e" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12" />
              <text x="315" y="152" textAnchor="middle" fontSize="16">🌾</text>
              <text x="315" y="170" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Agriculture</text>

              <rect x="380" y="130" width="80" height="50" rx="8" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" />
              <text x="420" y="152" textAnchor="middle" fontSize="16">🏛️</text>
              <text x="420" y="170" textAnchor="middle" fontSize="8" fill="#1e293b" className="dark:fill-slate-300">Government</text>
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
              Where Are Databases Used?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-blue-600 dark:text-blue-400">Database systems</strong>{" "}
              are everywhere. They are the invisible backbone of nearly every
              modern application we use daily. From banking to healthcare,
              education to entertainment, databases store, organise, and
              protect the data that powers our world.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                Understanding where databases are used helps you appreciate
                their importance and see opportunities for applying your
                database knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Applications Grid ────────────────────────────── */}
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
              <span className="text-2xl">🏗️</span>
              Database Applications Across Industries
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              {applications.map((app, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  pink: "border-pink-200/50 bg-pink-50/40 dark:border-pink-700/50 dark:bg-pink-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  red: "text-red-700 dark:text-red-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  pink: "text-pink-700 dark:text-pink-300",
                  teal: "text-teal-700 dark:text-teal-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "app-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[app.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{app.icon}</span>
                      <h3
                        className={clsx(
                          "font-bold",
                          textColorMap[app.color]
                        )}
                      >
                        {app.title}
                      </h3>
                    </div>
                    <p
                      className={clsx(
                        "mt-2 leading-relaxed text-slate-600",
                        "dark:text-slate-400"
                      )}
                    >
                      {app.desc}
                    </p>
                    <div
                      className={clsx(
                        "mt-2 text-xs font-medium",
                        "text-slate-500 dark:text-slate-500"
                      )}
                    >
                      📌 {app.examples}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Detailed Applications ────────────────────────── */}
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
              How Databases Power Each Industry
            </h2>
            <div
              className={clsx(
                "space-y-4 text-sm",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <div className="rounded-lg border-l-4 border-blue-500 pl-4 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                <span className="font-bold text-blue-600 dark:text-blue-400">🏦 Banking & Finance:</span>{" "}
                Databases manage millions of transactions per second, maintain
                account balances, track loans and investments, and detect fraud
                patterns. They ensure ACID compliance so that every transaction
                is accurate and reliable.
              </div>
              <div className="rounded-lg border-l-4 border-red-500 pl-4 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors">
                <span className="font-bold text-red-600 dark:text-red-400">🏥 Healthcare:</span>{" "}
                Electronic Health Records (EHR) store patient histories,
                diagnoses, prescriptions, and lab results. Databases enable
                secure data sharing between doctors, hospitals, and insurance
                providers while maintaining privacy.
              </div>
              <div className="rounded-lg border-l-4 border-emerald-500 pl-4 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-colors">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">🏫 Education:</span>{" "}
                Schools and universities use databases to manage student
                admissions, course registrations, grades, attendance, and
                alumni records. Learning Management Systems (LMS) deliver
                online courses and track student progress.
              </div>
              <div className="rounded-lg border-l-4 border-amber-500 pl-4 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors">
                <span className="font-bold text-amber-600 dark:text-amber-400">🛒 E-Commerce:</span>{" "}
                Platforms like Amazon handle product catalogs, inventory
                management, customer profiles, shopping carts, order processing,
                and personalised recommendations — all powered by databases.
              </div>
              <div className="rounded-lg border-l-4 border-purple-500 pl-4 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                <span className="font-bold text-purple-600 dark:text-purple-400">📱 Social Media:</span>{" "}
                Social networks store billions of posts, images, friend
                connections, and activity feeds. They must handle massive
                write loads and provide fast querying for timelines.
              </div>
              <div className="rounded-lg border-l-4 border-indigo-500 pl-4 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">🚗 Transportation:</span>{" "}
                Ride-sharing apps track driver locations, match riders with
                drivers, and manage payments. Airlines use databases for
                reservation systems, seat assignments, and flight schedules.
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
              Real-World Example: A Day in the Life with Databases
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
                <strong>Susmita</strong> lives in <strong>Barrackpore</strong>.
                Her day is powered by databases:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>6:00 AM:</strong> Her smart alarm wakes her up using
                    weather data from a database.
                  </li>
                  <li>
                    <strong>7:00 AM:</strong> She checks her bank balance on her
                    phone app — the bank's database processes her request in
                    milliseconds.
                  </li>
                  <li>
                    <strong>9:00 AM:</strong> She logs into her company's
                    attendance system — the HR database records her entry.
                  </li>
                  <li>
                    <strong>11:00 AM:</strong> She orders lunch from a food
                    delivery app — the app's database handles the order, payment,
                    and tracking.
                  </li>
                  <li>
                    <strong>3:00 PM:</strong> She visits the hospital for a
                    checkup — the hospital's EHR system retrieves her medical
                    history.
                  </li>
                  <li>
                    <strong>7:00 PM:</strong> She shops online for her child's
                    birthday — the e-commerce database suggests gifts based on
                    past purchases.
                  </li>
                  <li>
                    <strong>9:00 PM:</strong> She watches a streaming movie —
                    the content database serves personalised recommendations.
                  </li>
                </ul>
                <strong>One day, ten database applications. They're everywhere!</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ─── Why Databases Are Essential ───────────────────── */}
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
              Why Databases Are Essential in Each Domain
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-blue-500 pl-4",
                  "hover:bg-blue-50/30 dark:hover:bg-blue-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">Data Integrity:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  In banking, every penny must be accounted for. Databases
                  ensure transactions are accurate and consistent.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-red-500 pl-4",
                  "hover:bg-red-50/30 dark:hover:bg-red-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-red-600 dark:text-red-400">Security:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Healthcare records contain sensitive information. Databases
                  provide encryption and access controls to protect patient privacy.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-emerald-500 pl-4",
                  "hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Scalability:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  E-commerce platforms must handle millions of users. Databases
                  scale horizontally to support growth.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-purple-500 pl-4",
                  "hover:bg-purple-50/30 dark:hover:bg-purple-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-purple-600 dark:text-purple-400">Concurrency:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Social media processes millions of posts, likes, and comments
                  simultaneously. Databases handle concurrency seamlessly.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-amber-500 pl-4",
                  "hover:bg-amber-50/30 dark:hover:bg-amber-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-amber-600 dark:text-amber-400">Querying:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Business intelligence relies on complex queries. Databases
                  enable powerful analysis and reporting.
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-indigo-500 pl-4",
                  "hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10",
                  "transition-all duration-300"
                )}
              >
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Availability:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Critical systems like transportation must be available 24/7.
                  Databases support high availability and disaster recovery.
                </p>
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
                  <strong>Look for database opportunities:</strong> Wherever
                  you see data being stored, managed, or processed, there's a
                  database at work. Think about how you would design a database
                  for that application.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Learn from real systems:</strong> Study how popular
                  applications (e.g., Netflix, Amazon, Uber) use databases.
                  Their architectures are documented online.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Choose the right database for the job:</strong> A bank
                  needs an RDBMS with ACID. A social media app might use a
                  combination of RDBMS and NoSQL.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Consider data privacy:</strong> Different applications
                  have different privacy requirements. Healthcare and banking
                  have strict regulations (HIPAA, PCI-DSS).
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
              Common Pitfalls in Database Applications
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
                  <strong>One-size-fits-all approach:</strong> Using the same
                  database type for all applications without considering the
                  specific requirements (e.g., using RDBMS for massive,
                  unstructured data).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring security requirements:</strong> Different
                  domains have different security needs. Healthcare and banking
                  require robust security; social media requires privacy controls.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Underestimating scalability needs:</strong> Many
                  applications fail because they can't handle growth in data
                  volume or user count.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Neglecting compliance:</strong> Not understanding
                  regulations like GDPR, HIPAA, or PCI-DSS can lead to legal
                  issues.
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
                  <strong>Understand the domain:</strong> Before designing a
                  database, thoroughly understand the business requirements,
                  data types, and access patterns of the application.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Design for scalability:</strong> Plan for growth from
                  the beginning. Consider partitioning, sharding, and replication
                  strategies.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Prioritise security and compliance:</strong> Implement
                  security and compliance measures from the start. It's harder
                  to retrofit them later.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Choose the right database type:</strong> Evaluate
                  RDBMS, NoSQL, and specialised databases based on your specific
                  needs (ACID, scalability, data model).
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
                <span>I can list at least 8 industries that use databases</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand why banking needs ACID compliance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know how healthcare databases protect patient privacy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the scalability needs of e-commerce</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can identify database applications in daily life</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for different domain requirements</span>
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
            title="Applications of Database Systems – FAQs"
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
              "I love this topic because it brings database theory to life. My " +
              "students often ask: 'Why are we learning all this?' and I point " +
              "them to the applications — every industry needs database skills. " +
              "The next time you use an app, think about its database. What tables " +
              "does it have? How does it handle concurrency? How does it scale? " +
              "This detective work will make you a better database designer. And " +
              "remember: the principles you learn (ACID, normalisation, indexing) " +
              "apply across all industries. Learn them once, apply them everywhere."
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
            Topic 10 · Applications of Database Systems · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic10;