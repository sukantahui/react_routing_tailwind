import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic30_files/topic30_questions";

/**
 * Topic30 – Installing MySQL Workbench
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Provide a comprehensive guide to installing MySQL Workbench,
 *          the official GUI tool for MySQL. Covers installation on
 *          Windows, macOS, and Linux, along with initial configuration
 *          and connection setup. Builds on Topic 29 (Installing MySQL Server).
 */
const Topic30 = () => {
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

  // ─── Install Steps ──────────────────────────────────────
  const installSteps = [
    {
      os: "Windows",
      icon: "🪟",
      steps: [
        "Download the MySQL Workbench MSI installer from the official MySQL website",
        "Run the installer (.msi) as administrator",
        "Follow the installation wizard steps",
        "Choose the installation directory (default is recommended)",
        "Select the components to install (full installation is recommended)",
        "Click 'Install' and wait for the installation to complete",
        "Click 'Finish' to complete the installation",
        "Launch MySQL Workbench from the Start menu or desktop shortcut",
      ],
      color: "blue",
    },
    {
      os: "macOS",
      icon: "🍎",
      steps: [
        "Download the MySQL Workbench DMG file from the official MySQL website",
        "Double-click the DMG file to mount it",
        "Drag the MySQL Workbench icon to the Applications folder",
        "If prompted, click 'Replace' to overwrite existing versions",
        "Launch MySQL Workbench from the Applications folder",
        "If macOS warns about an untrusted developer, go to System Preferences > Security & Privacy and click 'Open Anyway'",
      ],
      color: "purple",
    },
    {
      os: "Linux (Ubuntu/Debian)",
      icon: "🐧",
      steps: [
        "Download the .deb package from the official MySQL website",
        "Install using: `sudo dpkg -i mysql-workbench-community_*.deb`",
        "If there are dependency errors, run: `sudo apt-get install -f`",
        "Alternatively, install via Snap: `sudo snap install mysql-workbench-community`",
        "Launch MySQL Workbench from the applications menu or by typing `mysql-workbench` in the terminal",
      ],
      color: "emerald",
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

        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .step-card:hover {
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
            Module 1 · Topic 30
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Installing
            </span>
            <br className="sm:hidden" />
            MySQL Workbench
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            The official GUI tool for MySQL — install it and manage your
            databases visually.
          </p>
        </div>

        {/* ─── SVG: Workbench Overview ──────────────────────── */}
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
              viewBox="0 0 600 190"
              className="w-full h-auto"
              role="img"
              aria-label="MySQL Workbench overview"
            >
              <rect width="600" height="190" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🖥️ MySQL Workbench — The Official GUI Tool
              </text>

              {/* Workbench icon */}
              <rect x="220" y="40" width="160" height="90" rx="12" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-400" />
              <text x="300" y="75" textAnchor="middle" fontSize="32">🖥️</text>
              <text x="300" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">MySQL Workbench</text>
              <text x="300" y="120" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Version 8.0</text>

              {/* Features */}
              <text x="80" y="65" textAnchor="middle" fontSize="11" fill="#10b981" className="dark:fill-emerald-400">📊 Design</text>
              <text x="80" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">ER Diagrams</text>

              <text x="80" y="120" textAnchor="middle" fontSize="11" fill="#8b5cf6" className="dark:fill-purple-400">📝 Query</text>
              <text x="80" y="140" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">SQL Editor</text>

              <text x="520" y="65" textAnchor="middle" fontSize="11" fill="#f59e0b" className="dark:fill-amber-400">🔧 Admin</text>
              <text x="520" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">User Management</text>

              <text x="520" y="120" textAnchor="middle" fontSize="11" fill="#ef4444" className="dark:fill-red-400">📈 Monitor</text>
              <text x="520" y="140" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Performance</text>

              {/* Arrows */}
              <line x1="160" y1="75" x2="220" y2="75" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="160" y1="125" x2="220" y2="100" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="440" y1="75" x2="380" y2="75" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
              <line x1="440" y1="125" x2="380" y2="100" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-500" />
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
              What is MySQL Workbench?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              <strong className="text-blue-600 dark:text-blue-400">MySQL Workbench</strong>{" "}
              is the official <strong>graphical user interface (GUI)</strong>{" "}
              for MySQL. It provides a visual interface for database design,
              development, and administration. It's an essential tool for both
              beginners and experienced database professionals.
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
                  <li>SQL Development (query editor)</li>
                  <li>Database Design (ER diagrams)</li>
                  <li>Database Administration</li>
                  <li>Data Migration</li>
                  <li>Performance Monitoring</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-lg bg-blue-50/60 p-3",
                  "dark:bg-blue-900/20"
                )}
              >
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Why Use It?
                </span>
                <p
                  className={clsx(
                    "mt-1 text-slate-600 dark:text-slate-400"
                  )}
                >
                  Workbench makes MySQL easier to use with a visual interface.
                  It's perfect for beginners learning SQL and for professionals
                  managing multiple databases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── System Requirements ───────────────────────────── */}
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
              <span className="text-2xl">💻</span>
              System Requirements
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-3",
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
                  🪟 Windows
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Windows 10/11 (64-bit)</li>
                  <li>2 GB RAM minimum</li>
                  <li>~500 MB disk space</li>
                  <li>Microsoft .NET Framework</li>
                  <li>Administrator privileges</li>
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
                  🍎 macOS
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>macOS 10.15 (Catalina)+</li>
                  <li>Intel or Apple Silicon</li>
                  <li>2 GB RAM minimum</li>
                  <li>~500 MB disk space</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  🐧 Linux
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Ubuntu 20.04+, Debian 10+</li>
                  <li>RHEL 8+, CentOS 8+</li>
                  <li>2 GB RAM minimum</li>
                  <li>~500 MB disk space</li>
                  <li>GTK+ libraries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Installation Steps ────────────────────────────── */}
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
              <span className="text-2xl">📋</span>
              Step-by-Step Installation Guides
            </h2>
            {installSteps.map((osGuide, guideIdx) => {
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
                    "step-card mb-4 rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                    colorMap[osGuide.color]
                  )}
                  style={{ animationDelay: `${guideIdx * 100 + 400}ms` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{osGuide.icon}</span>
                    <h3
                      className={clsx(
                        "text-lg font-bold",
                        textColorMap[osGuide.color]
                      )}
                    >
                      {osGuide.os}
                    </h3>
                  </div>
                  <ol
                    className={clsx(
                      "list-decimal list-inside space-y-1 text-sm",
                      "text-slate-600 dark:text-slate-400"
                    )}
                  >
                    {osGuide.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Initial Setup ──────────────────────────────────── */}
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
              <span className="text-2xl">🔧</span>
              First-Time Setup and Configuration
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              After installation, follow these steps to set up MySQL Workbench:
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🔌",
                  title: "Create a Connection",
                  desc: "Click the '+' icon next to 'MySQL Connections' to create a new connection.",
                  detail: "Enter connection name, hostname (localhost), port (3306), and username (root).",
                  color: "blue",
                },
                {
                  icon: "🔑",
                  title: "Store Password",
                  desc: "When prompted, enter your MySQL root password.",
                  detail: "You can choose to store the password in the keychain for convenience.",
                  color: "amber",
                },
                {
                  icon: "✅",
                  title: "Test Connection",
                  desc: "Click 'Test Connection' to verify that Workbench can connect to the MySQL server.",
                  detail: "A success message will appear if the connection works.",
                  color: "green",
                },
                {
                  icon: "📊",
                  title: "Explore the Interface",
                  desc: "Familiarise yourself with the SQL Editor, Navigator, and Administration tabs.",
                  detail: "The Navigator shows your databases, tables, and other objects.",
                  color: "purple",
                },
              ].map((item, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  green: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  green: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
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

        {/* ─── Connecting to MySQL ───────────────────────────── */}
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
              <span className="text-2xl">🔗</span>
              Connecting to MySQL Server
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
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  ✅ Standard Connection (Localhost)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Connection Name: <code>Local MySQL</code></li>
                  <li>Hostname: <code>127.0.0.1</code> or <code>localhost</code></li>
                  <li>Port: <code>3306</code></li>
                  <li>Username: <code>root</code></li>
                  <li>Password: <code>Your root password</code></li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🌐 Remote Connection
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Connection Name: <code>Remote Server</code></li>
                  <li>Hostname: <code>IP address or domain</code></li>
                  <li>Port: <code>3306</code> (or custom)</li>
                  <li>Username: <code>your_username</code></li>
                  <li>Password: <code>your_password</code></li>
                  <li>Enable SSL if required</li>
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
              Real-World Example: Using Workbench
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
                <strong>Susmita</strong>, a junior developer in <strong>Ichapur</strong>,
                installed MySQL Workbench to manage her first database:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Installation:</strong> She downloaded the Windows
                    MSI installer and followed the wizard.
                  </li>
                  <li>
                    <strong>First Connection:</strong> She created a connection
                    to <code>localhost</code> using the root password.
                  </li>
                  <li>
                    <strong>Database Design:</strong> She used the visual
                    designer to create an ER diagram for her school project.
                  </li>
                  <li>
                    <strong>Querying:</strong> She wrote and tested SQL queries
                    in the SQL Editor with syntax highlighting and auto-completion.
                  </li>
                  <li>
                    <strong>Backup:</strong> She exported the database using the
                    Data Export tool.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> MySQL Workbench made her
                database journey smooth and visual. She could focus on learning
                SQL instead of wrestling with the command line.
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
                  <strong>Use the SQL Editor's auto-complete:</strong> Start
                  typing a table name and press <kbd>Ctrl+Space</kbd> for
                  suggestions.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Save frequently used queries:</strong> Create SQL
                  snippets in the Query Editor and save them for later use.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use the Visual Explain feature:</strong> Click the
                  'Explain' button to see the execution plan of your query
                  visually.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Customise the interface:</strong> You can change the
                  theme, font, and layout in Edit → Preferences.
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
                  <strong>Forgetting to install MySQL Server first:</strong>{" "}
                  Workbench is a GUI client; it needs a MySQL server to connect to.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using the wrong hostname or port:</strong> If MySQL
                  is on a different port, you must specify it correctly.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not storing the password:</strong> If you don't save
                  the password, you'll be prompted every time you connect.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring security warnings:</strong> Always use secure
                  connections (SSL) when connecting to remote servers.
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
                  <strong>Keep Workbench updated:</strong> Regularly check for
                  updates to get the latest features and security patches.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use a separate connection for production:</strong>{" "}
                  Create distinct connections for development and production
                  to avoid accidental changes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Backup your connections:</strong> Export your
                  connection settings (Edit → Preferences → Connections) to
                  share or backup.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Explore the documentation:</strong> MySQL Workbench
                  has extensive built-in help and online documentation.
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
                <span>I can download MySQL Workbench from the official website</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can install MySQL Workbench on my operating system</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can create a connection to a MySQL server</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can test the connection and verify connectivity</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the main interface components (Navigator, SQL Editor, Administration)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for using MySQL Workbench</span>
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
            title="Installing MySQL Workbench – FAQs"
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
              "MySQL Workbench is the gateway to visual database management. I tell my students: 'If you can install and use Workbench, you've taken a huge step toward becoming a database professional.' It's not just a tool — it's a learning environment. The visual feedback helps you understand SQL and database design faster. Spend time exploring all the features: the ER diagram designer, the query editor with auto-complete, and the performance dashboard. And remember: Workbench is free, so there's no reason not to use it. Practice makes perfect!"
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
            Topic 30 · Installing MySQL Workbench · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic30;