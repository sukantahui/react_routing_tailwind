import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic31_files/topic31_note.txt?raw";
import questions from "./topic31_files/topic31_questions";

/**
 * Topic31 – Installing XAMPP / WAMP (Optional)
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Provide a comprehensive guide to installing XAMPP and WAMP,
 *          the popular all-in-one web development environments that
 *          include MySQL. Covers installation, configuration, and
 *          initial setup for both Windows and cross-platform use.
 *          Builds on Topics 29-30 (MySQL Server and Workbench).
 */
const Topic31 = () => {
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

        .stack-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .stack-card:hover {
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
            Module 1 · Topic 31
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Installing XAMPP / WAMP
            </span>
            <br className="sm:hidden" />
            <span className="text-base font-medium text-slate-500 dark:text-slate-400">(Optional)</span>
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            All-in-one development environments that make setting up MySQL
            and web servers a breeze.
          </p>
        </div>

        {/* ─── SVG: XAMPP / WAMP Overview ───────────────────── */}
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
              aria-label="XAMPP and WAMP overview"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                ⚡ All-in-One Web Development Environments
              </text>

              {/* XAMPP */}
              <rect x="40" y="45" width="240" height="130" rx="10" fill="#f59e0b" opacity="0.08" className="dark:fill-amber-400 dark:opacity-12 dark:stroke-amber-400" stroke="#f59e0b" strokeWidth="2" />
              <text x="160" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🟠 XAMPP</text>
              <text x="160" y="92" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Cross-platform</text>
              <text x="160" y="108" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">X = Any OS · Apache · MySQL · PHP · Perl</text>
              <text x="160" y="124" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Free &amp; Open Source</text>
              <text x="160" y="140" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Great for Learning</text>
              <text x="160" y="156" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Control Panel Included</text>

              {/* WAMP */}
              <rect x="320" y="45" width="240" height="130" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12 dark:stroke-blue-400" stroke="#3b82f6" strokeWidth="2" />
              <text x="440" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🟦 WAMP</text>
              <text x="440" y="92" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Windows Only</text>
              <text x="440" y="108" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Windows · Apache · MySQL · PHP</text>
              <text x="440" y="124" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Easy Windows Integration</text>
              <text x="440" y="140" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ Simple to Use</text>
              <text x="440" y="156" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">✓ System Tray Control</text>
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
              What are XAMPP and WAMP?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-amber-600 dark:text-amber-400">XAMPP</strong>{" "}
              and <strong className="text-blue-600 dark:text-blue-400">WAMP</strong>{" "}
              are <strong>all-in-one web development environments</strong> that
              bundle Apache (web server), MySQL (database), and PHP (scripting
              language) into a single, easy-to-install package. They are
              perfect for developers who want to set up a local development
              environment quickly.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
                "text-sm"
              )}
            >
              <div
                className={clsx(
                  "rounded-lg bg-amber-50/60 p-3",
                  "dark:bg-amber-900/20"
                )}
              >
                <span className="font-semibold text-amber-700 dark:text-amber-300">
                  🟠 XAMPP
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li><strong>Cross-platform</strong> (Windows, macOS, Linux)</li>
                  <li>X = Any OS, A = Apache, M = MySQL, P = PHP, P = Perl</li>
                  <li>Developed by Apache Friends</li>
                  <li>Comes with phpMyAdmin</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-blue-50/60 p-3",
                  "dark:bg-blue-900/20"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  🟦 WAMP
                </span>
                <ul
                  className={clsx(
                    "mt-1 list-disc space-y-1 pl-5",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li><strong>Windows only</strong></li>
                  <li>W = Windows, A = Apache, M = MySQL, P = PHP</li>
                  <li>Developed by Romain Bourdon</li>
                  <li>System tray integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Comparison ────────────────────────────────────── */}
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
              XAMPP vs WAMP: Which One to Choose?
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
                        "px-3 py-2 font-semibold text-amber-600",
                        "dark:text-amber-400"
                      )}
                    >
                      XAMPP
                    </th>
                    <th
                      className={clsx(
                        "px-3 py-2 font-semibold text-blue-600",
                        "dark:text-blue-400"
                      )}
                    >
                      WAMP
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
                    <td className="px-3 py-2 font-medium">Platform</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Windows, macOS, Linux</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Windows only</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">Components</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Apache, MySQL, PHP, Perl</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Apache, MySQL, PHP</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">Control Panel</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Graphical control panel</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">System tray icon</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">phpMyAdmin</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">✅ Included</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">✅ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">Portability</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Portable version available</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Not portable</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2 font-medium">Best For</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Cross-platform development</td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400">Windows-only development</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Installing XAMPP ──────────────────────────────── */}
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
              <span className="text-2xl">🟠</span>
              Installing XAMPP (Cross-Platform)
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-3",
                "text-sm"
              )}
            >
              {[
                {
                  os: "Windows",
                  steps: [
                    "Download XAMPP from apachefriends.org",
                    "Run the .exe installer",
                    "Click 'Next' and follow the wizard",
                    "Choose installation directory (e.g., C:\\xampp)",
                    "Select components (Apache, MySQL, PHP, phpMyAdmin)",
                    "Finish installation",
                    "Launch the XAMPP Control Panel",
                    "Start Apache and MySQL services",
                  ],
                  color: "blue",
                },
                {
                  os: "macOS",
                  steps: [
                    "Download the DMG file from apachefriends.org",
                    "Double-click to open the DMG",
                    "Drag XAMPP to the Applications folder",
                    "Open XAMPP from Applications",
                    "If security warning appears, click 'Open Anyway'",
                    "Start Apache and MySQL from the control panel",
                  ],
                  color: "purple",
                },
                {
                  os: "Linux (Ubuntu/Debian)",
                  steps: [
                    "Download the .run file from apachefriends.org",
                    "Make executable: `chmod +x xampp-linux-*.run`",
                    "Run: `sudo ./xampp-linux-*.run`",
                    "Follow the installer prompts",
                    "Start XAMPP: `sudo /opt/lampp/lampp start`",
                    "Stop XAMPP: `sudo /opt/lampp/lampp stop`",
                  ],
                  color: "emerald",
                },
              ].map((osGuide, guideIdx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                };
                return (
                  <div
                    key={guideIdx}
                    className={clsx(
                      "stack-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[osGuide.color]
                    )}
                    style={{ animationDelay: `${guideIdx * 100 + 400}ms` }}
                  >
                    <h4
                      className={clsx(
                        "font-bold",
                        textColorMap[osGuide.color]
                      )}
                    >
                      {osGuide.os}
                    </h4>
                    <ol
                      className={clsx(
                        "mt-2 list-decimal list-inside space-y-1 text-xs",
                        "text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {osGuide.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Installing WAMP ───────────────────────────────── */}
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
              <span className="text-2xl">🟦</span>
              Installing WAMP (Windows Only)
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
                  📥 Installation Steps
                </h4>
                <ol
                  className={clsx(
                    "mt-2 list-decimal list-inside space-y-1 text-xs",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>Download WAMP from wampserver.com</li>
                  <li>Run the installer (.exe) as administrator</li>
                  <li>Follow the installation wizard</li>
                  <li>Choose installation directory (e.g., C:\wamp64)</li>
                  <li>Select default browser (if prompted)</li>
                  <li>Select text editor (if prompted)</li>
                  <li>Complete the installation</li>
                  <li>Launch WAMP from the Start menu</li>
                </ol>
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
                  🔧 Post-Installation
                </h4>
                <ul
                  className={clsx(
                    "mt-2 list-disc list-inside space-y-1 text-xs",
                    "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <li>WAMP icon appears in system tray (green = running)</li>
                  <li>Click the icon to access control panel</li>
                  <li>Start Apache and MySQL services</li>
                  <li>Access localhost: <code>http://localhost/</code></li>
                  <li>Access phpMyAdmin: <code>http://localhost/phpmyadmin/</code></li>
                  <li>Manage virtual hosts from the tray menu</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Using phpMyAdmin ──────────────────────────────── */}
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
              <span className="text-2xl">📊</span>
              phpMyAdmin — Web-Based MySQL Management
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              Both XAMPP and WAMP include <strong>phpMyAdmin</strong>, a
              popular web-based tool for managing MySQL databases through a
              browser. It's an alternative to MySQL Workbench for quick
              database tasks.
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🌐",
                  title: "Accessing phpMyAdmin",
                  desc: "After starting Apache and MySQL, navigate to `http://localhost/phpmyadmin/` in your browser.",
                  detail: "Login with MySQL username (root) and password.",
                  color: "blue",
                },
                {
                  icon: "📋",
                  title: "What You Can Do",
                  desc: "Create databases, manage tables, run SQL queries, import/export data, and manage users.",
                  detail: "A full-featured GUI for MySQL administration.",
                  color: "emerald",
                },
                {
                  icon: "🔑",
                  title: "Default Login",
                  desc: "Default username is `root` with no password (on fresh installations).",
                  detail: "⚠️ Important: Set a password for security!",
                  color: "amber",
                },
                {
                  icon: "🛡️",
                  title: "Security Notice",
                  desc: "phpMyAdmin is a powerful tool. Always secure it with a password and restrict access.",
                  detail: "Don't use it on production servers without proper security.",
                  color: "red",
                },
              ].map((item, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  red: "text-red-700 dark:text-red-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]",
                      colorMap[item.color]
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h4
                        className={clsx(
                          "font-bold",
                          textColorMap[item.color]
                        )}
                      >
                        {item.title}
                      </h4>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {item.detail}
                    </div>
                  </div>
                );
              })}
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
              Real-World Example: Building a WordPress Site Locally
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
                <strong>Debangshu</strong>, a web developer in <strong>Naihati</strong>,
                wants to build a WordPress site locally:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Installs XAMPP:</strong> Downloads and installs
                    XAMPP on his Windows laptop.
                  </li>
                  <li>
                    <strong>Starts Services:</strong> Opens XAMPP Control Panel
                    and starts Apache and MySQL.
                  </li>
                  <li>
                    <strong>Creates Database:</strong> Uses phpMyAdmin at
                    <code className="mx-1 bg-white/80 px-1 py-0.5 rounded dark:bg-slate-700/40">http://localhost/phpmyadmin/</code>{" "}
                    to create a new database called <code>wordpress</code>.
                  </li>
                  <li>
                    <strong>Installs WordPress:</strong> Downloads WordPress and
                    copies it to <code>C:\xampp\htdocs\wordpress</code>.
                  </li>
                  <li>
                    <strong>Configures WordPress:</strong> Edits the
                    <code>wp-config.php</code> file with database credentials.
                  </li>
                  <li>
                    <strong>Starts Building:</strong> Opens{" "}
                    <code>http://localhost/wordpress/</code> in his browser and
                    starts building the site.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> XAMPP/WAMP makes it incredibly
                easy to set up a complete web development environment in minutes.
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
                  <strong>Change the default port:</strong> If port 80 is in
                  use, change Apache's port in the configuration files or use
                  the control panel.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use virtual hosts:</strong> Create multiple websites
                  on your local machine by setting up virtual hosts in Apache.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Keep it updated:</strong> Regularly update XAMPP/WAMP
                  to get the latest security patches and features.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use the portable version:</strong> XAMPP has a
                  portable version that can run from a USB drive — great for
                  development on the go.
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
                  <strong>Port conflict:</strong> If another web server (like
                  IIS or Skype) is using port 80 or 443, Apache won't start.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Forgetting to start services:</strong> Apache and
                  MySQL don't start automatically — you must start them from
                  the control panel.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using the default root password:</strong> Fresh
                  installations have no root password. This is a security risk.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Running XAMPP/WAMP on production:</strong> These are
                  development tools. Don't use them on production servers
                  without hardening security.
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
                  <strong>Install in the default location:</strong> Use the
                  recommended installation directory to avoid path issues.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Set a MySQL root password:</strong> Immediately after
                  installation, set a strong password for MySQL root user.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use for development only:</strong> XAMPP/WAMP are for
                  local development. For production, use a properly configured
                  server environment.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Backup your projects:</strong> Regularly backup your
                  <code className="mx-1 bg-white/80 px-1 py-0.5 rounded dark:bg-slate-700/40">htdocs</code>{" "}
                  folder and databases.
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
                <span>I can distinguish between XAMPP and WAMP</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can download and install XAMPP/WAMP</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can start Apache and MySQL services</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can access phpMyAdmin and create a database</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the security implications</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for using XAMPP/WAMP</span>
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
            title="Installing XAMPP / WAMP – FAQs"
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
            title="Installing XAMPP / WAMP (Optional)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic31_note.txt"
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
              "XAMPP and WAMP are your best friends when starting web development. " +
              "I tell my students: 'They're like a Swiss Army knife for web development.' " +
              "You get everything you need in one package, with zero configuration hassles. " +
              "The key is to remember that these are for development, not production. " +
              "Always secure them with passwords, and never expose them to the internet " +
              "without proper hardening. My advice: start with XAMPP if you're on Windows — " +
              "it's cross-platform so you'll learn skills that work everywhere. And don't " +
              "forget to explore phpMyAdmin — it's a lifesaver for quick database tasks."
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
            Topic 31 · Installing XAMPP / WAMP (Optional) · Built with ❤️ for
            classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic31;