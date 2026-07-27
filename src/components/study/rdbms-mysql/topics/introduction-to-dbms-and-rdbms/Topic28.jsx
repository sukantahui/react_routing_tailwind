import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic28_files/topic28_questions";

/**
 * Topic28 – MySQL Editions
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Compare the different editions of MySQL — Community Edition
 *          vs Enterprise Edition, their features, licensing, and when
 *          to use each. Builds on Topics 25-27 (MySQL Introduction,
 *          History, Features).
 */
const Topic28 = () => {
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

        .edition-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .edition-card:hover {
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
            Module 1 · Topic 28
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              MySQL
            </span>
            <br className="sm:hidden" />
            Editions
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            Choosing the right MySQL edition — from free open-source to
            enterprise-grade commercial solutions.
          </p>
        </div>

        {/* ─── SVG: Editions Comparison ────────────────────── */}
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
              aria-label="MySQL editions comparison"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                📂 MySQL Editions
              </text>

              {/* Community Edition */}
              <rect x="30" y="40" width="260" height="130" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12" stroke="#10b981" strokeWidth="2" className="dark:stroke-emerald-400" />
              <text x="160" y="65" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🆓 Community Edition</text>
              <text x="160" y="85" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Free · Open Source · GPL</text>
              <text x="160" y="105" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Full SQL Features</text>
              <text x="160" y="120" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ InnoDB · JSON · Full-Text</text>
              <text x="160" y="135" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Community Support</text>
              <text x="160" y="150" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Great for Learning &amp; Startups</text>

              {/* Enterprise Edition */}
              <rect x="310" y="40" width="260" height="130" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-400" />
              <text x="440" y="65" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🏢 Enterprise Edition</text>
              <text x="440" y="85" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Commercial · Paid · Licensed</text>
              <text x="440" y="105" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ All Community Features +</text>
              <text x="440" y="120" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Advanced Security · Backup</text>
              <text x="440" y="135" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ 24/7 Oracle Support</text>
              <text x="440" y="150" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Enterprise-grade Tools</text>

              {/* VS label */}
              <rect x="268" y="90" width="64" height="32" rx="16" fill="#f59e0b" opacity="0.2" className="dark:fill-amber-400 dark:opacity-25" />
              <text x="300" y="111" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e293b" className="dark:fill-slate-200">VS</text>
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
              Understanding MySQL Editions
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              MySQL is available in <strong className="text-emerald-600 dark:text-emerald-400">multiple editions</strong>{" "}
              to suit different needs — from individual developers to large
              enterprises. The two main editions are the <strong
              className="text-emerald-600 dark:text-emerald-400">Community
              Edition</strong> (free and open-source) and the <strong
              className="text-blue-600 dark:text-blue-400">Enterprise Edition</strong>{" "}
              (commercial with advanced features and support).
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-amber-50/40 p-4",
                "dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-amber-600 dark:text-amber-400">Key Insight:</span>{" "}
                The Community Edition is sufficient for most developers and
                startups. The Enterprise Edition is designed for organisations
                that need advanced security, scalability, and professional support.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Editions Comparison Table ────────────────────── */}
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
              <span className="text-2xl">⚖️</span>
              Community Edition vs Enterprise Edition
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
                        "px-3 py-2 font-semibold text-slate-700",
                        "dark:text-slate-200"
                      )}
                    >
                      Feature
                    </th>
                    <th
                      className={clsx(
                        "px-3 py-2 font-semibold text-emerald-600",
                        "dark:text-emerald-400"
                      )}
                    >
                      Community Edition
                    </th>
                    <th
                      className={clsx(
                        "px-3 py-2 font-semibold text-blue-600",
                        "dark:text-blue-400"
                      )}
                    >
                      Enterprise Edition
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
                    <td className="px-3 py-2 font-medium">License</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">GPL (Open Source)</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Commercial (Paid)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">Cost</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Free</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Subscription-based</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">Support</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Community forums</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">24/7 Oracle support</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">MySQL Enterprise Backup</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">❌ Not included</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">✅ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">MySQL Firewall</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">❌ Not included</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">✅ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">MySQL Enterprise Monitor</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">❌ Not included</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">✅ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">MySQL Audit</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">❌ Not included</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">✅ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">MySQL HeatWave</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">❌ Not included</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">✅ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">Best For</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Developers, startups, education</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Large enterprises, mission-critical</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── MySQL Enterprise Edition Features ────────────── */}
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
              <span className="text-2xl">🏢</span>
              MySQL Enterprise Edition Features
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Enterprise Edition includes everything from Community Edition plus
              advanced enterprise-grade features:
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-4 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🔒",
                  title: "MySQL Enterprise Security",
                  desc: "Advanced security features including data encryption, firewall, and audit plugins.",
                  detail: "Protects sensitive data and ensures compliance.",
                  color: "red",
                },
                {
                  icon: "💾",
                  title: "MySQL Enterprise Backup",
                  desc: "Enterprise-grade backup and recovery tool with point-in-time recovery.",
                  detail: "Hot backups, incremental backups, and compression.",
                  color: "blue",
                },
                {
                  icon: "📊",
                  title: "MySQL Enterprise Monitor",
                  desc: "Proactive monitoring and performance advisor for MySQL servers.",
                  detail: "Real-time dashboards, alerts, and query analytics.",
                  color: "emerald",
                },
                {
                  icon: "📋",
                  title: "MySQL Enterprise Audit",
                  desc: "Audit plugin for tracking and logging database activities.",
                  detail: "Compliance with regulatory requirements (GDPR, HIPAA).",
                  color: "purple",
                },
                {
                  icon: "🔥",
                  title: "MySQL HeatWave",
                  desc: "Integrated in-memory query accelerator for analytics.",
                  detail: "Blazing fast OLAP queries on transactional data.",
                  color: "amber",
                },
                {
                  icon: "🛡️",
                  title: "MySQL Enterprise Firewall",
                  desc: "Protects against SQL injection attacks.",
                  detail: "Whitelist of allowed queries.",
                  color: "indigo",
                },
              ].map((feature, idx) => {
                const colorMap = {
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                };
                const textColorMap = {
                  red: "text-red-700 dark:text-red-300",
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "edition-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[feature.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 400}ms` }}
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
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {feature.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── When to Choose Each Edition ──────────────────── */}
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
              <span className="text-2xl">🎯</span>
              Choosing the Right Edition
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
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  ✅ Choose Community Edition If:
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>You are a student or hobbyist</li>
                  <li>You are building a startup or small business</li>
                  <li>You want to learn MySQL without cost</li>
                  <li>You don't need 24/7 enterprise support</li>
                  <li>Your application is non-critical</li>
                  <li>You prefer open-source solutions</li>
                </ul>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  ✅ Choose Enterprise Edition If:
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>You need 24/7 Oracle support</li>
                  <li>You require advanced security features</li>
                  <li>You need Enterprise Backup &amp; Monitor</li>
                  <li>Your application is mission-critical</li>
                  <li>You need compliance (HIPAA, GDPR)</li>
                  <li>You require proactive performance tuning</li>
                </ul>
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
              Real-World Example: Choosing the Right Edition
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
                <strong>Swadeep</strong>, a developer in <strong>Barrackpore</strong>,
                is building a new application:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Swadeep's Startup:</strong> He's building a
                    food delivery app. He starts with <strong className="text-emerald-600 dark:text-emerald-400">Community Edition</strong>{" "}
                    — it's free, and he can learn and iterate quickly.
                  </li>
                  <li>
                    <strong>After Funding:</strong> The app is a success. He
                    migrates to <strong className="text-blue-600 dark:text-blue-400">Enterprise Edition</strong>{" "}
                    to get 24/7 support, advanced security, and Enterprise
                    Backup.
                  </li>
                  <li>
                    <strong>Compliance:</strong> He needs HIPAA compliance for
                    handling health data. Enterprise Audit and Firewall help
                    meet these requirements.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Start with Community Edition and
                upgrade to Enterprise when you need the advanced features and
                support. The migration is straightforward.
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
                  <strong>Start with Community Edition:</strong> It has all the
                  core features and is free. You can always upgrade later.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Evaluate Enterprise Edition trial:</strong> Oracle
                  offers a 30-day trial of Enterprise Edition to test its
                  features before purchasing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Consider MariaDB as an alternative:</strong> If you
                  want an open-source alternative with Enterprise-like features,
                  MariaDB is a good option.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use cloud-managed MySQL:</strong> Cloud providers
                  offer managed MySQL services (AWS RDS, Azure Database) that
                  include many enterprise features without the direct licensing
                  cost.
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
                  <strong>Using Enterprise Edition when not needed:</strong> For
                  small projects, Community Edition is sufficient. Paying for
                  Enterprise features you don't need is a waste of budget.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring licensing:</strong> Enterprise Edition is
                  commercial. Using it without a proper license is illegal and
                  risky.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Assuming Community Edition lacks features:</strong> CE
                  has a rich feature set. Many developers don't realise how much
                  is available for free.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not using cloud alternatives:</strong> Managed cloud
                  services can provide enterprise features at a lower cost.
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
                  <strong>Start with Community Edition:</strong> It's the best
                  way to learn MySQL and build your first applications.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Evaluate your needs:</strong> Before paying for
                  Enterprise, assess if you truly need advanced security,
                  backup, and support.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Consider cloud-managed services:</strong> AWS RDS,
                  Azure Database for MySQL, and GCP Cloud SQL offer many
                  enterprise features with a pay-as-you-go model.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Keep your options open:</strong> Write applications
                  that are database-agnostic so you can switch if needed.
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
                <span>I can distinguish between Community and Enterprise editions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the licensing differences</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know the Enterprise Edition features (Backup, Monitor, Audit, Firewall, HeatWave)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can choose the right edition for my project</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for selecting MySQL editions</span>
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
            title="MySQL Editions – FAQs"
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
              "Many students don't realise that MySQL Community Edition is already " +
              "powerful enough for most applications. I always say: 'Start with " +
              "Community Edition, learn it thoroughly, and then decide if you need " +
              "Enterprise.' The Enterprise features are valuable, but they come at " +
              "a cost. Understanding what's available in Community Edition will " +
              "save you money and prevent you from overpaying. Also, consider " +
              "cloud-managed options — they often provide enterprise-level features " +
              "without the upfront licensing cost. Remember: the best edition is " +
              "the one that fits your needs, not the most expensive one."
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
            Topic 28 · MySQL Editions · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic28;