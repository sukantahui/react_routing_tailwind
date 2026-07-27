import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic29_files/topic29_questions";

/**
 * Topic29 – Installing MySQL Server
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Provide a comprehensive, step-by-step guide to installing
 *          MySQL Server on different operating systems (Windows, macOS,
 *          Linux). Covers installation methods, configuration,
 *          initial setup, and verification. Builds on Topics 25-28
 *          (MySQL Introduction, History, Features, Editions).
 */
const Topic29 = () => {
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

  // ─── Installation Steps ──────────────────────────────────
  const installSteps = [
    {
      os: "Windows",
      icon: "🪟",
      steps: [
        "Download MySQL Installer from the official MySQL website",
        "Run the installer (.msi file) as administrator",
        "Choose Setup Type: Developer Default, Server only, Client only, or Custom",
        "Select 'Server only' for a basic MySQL server installation",
        "Click 'Execute' to install the required components",
        "Configure MySQL Server: Choose the configuration type (Development or Production)",
        "Set the root password (IMPORTANT: Remember this password!)",
        "Choose the Windows service name (default: MySQL) and whether to start automatically",
        "Apply the configuration and complete the installation",
      ],
      color: "blue",
    },
    {
      os: "macOS",
      icon: "🍎",
      steps: [
        "Download the MySQL DMG file from the official MySQL website",
        "Double-click the DMG file to mount it",
        "Run the MySQL installer package (.pkg)",
        "Follow the installation wizard",
        "Choose the installation type (typical or custom)",
        "Set the root password when prompted",
        "MySQL server will start automatically after installation",
        "Alternatively, use Homebrew: `brew install mysql`",
      ],
      color: "purple",
    },
    {
      os: "Linux (Ubuntu/Debian)",
      icon: "🐧",
      steps: [
        "Update the package list: `sudo apt update`",
        "Install MySQL server: `sudo apt install mysql-server`",
        "Run the security script: `sudo mysql_secure_installation`",
        "Set the root password during the security setup",
        "Check MySQL status: `sudo systemctl status mysql`",
        "Start MySQL service: `sudo systemctl start mysql`",
        "Enable MySQL to start on boot: `sudo systemctl enable mysql`",
      ],
      color: "emerald",
    },
    {
      os: "Linux (RHEL/CentOS/Fedora)",
      icon: "🐧",
      steps: [
        "Enable the MySQL repository: `sudo yum install mysql80-community-release`",
        "Install MySQL server: `sudo yum install mysql-community-server`",
        "Start MySQL: `sudo systemctl start mysqld`",
        "Get temporary root password: `sudo grep 'temporary password' /var/log/mysqld.log`",
        "Run the security script: `sudo mysql_secure_installation`",
        "Enable MySQL to start on boot: `sudo systemctl enable mysqld`",
      ],
      color: "indigo",
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

        .cmd-code {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
        }
        .dark .cmd-code {
          background-color: #0f172a;
          color: #e2e8f0;
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
            Module 1 · Topic 29
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
            MySQL Server
          </h1>
          <p
            className={clsx(
              "mx-auto mt-3 max-w-2xl text-base leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}
          >
            A step-by-step guide to getting MySQL Server up and running on
            Windows, macOS, and Linux.
          </p>
        </div>

        {/* ─── SVG: Installation Overview ───────────────────── */}
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
              aria-label="MySQL installation process overview"
            >
              <rect width="600" height="190" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                📥 MySQL Installation Process
              </text>

              {/* Step 1: Download */}
              <rect x="40" y="40" width="110" height="90" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" stroke="#3b82f6" strokeWidth="1.5" className="dark:stroke-blue-400" />
              <text x="95" y="70" textAnchor="middle" fontSize="28">🌐</text>
              <text x="95" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">1. Download</text>
              <text x="95" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Official MySQL site</text>

              {/* Arrow */}
              <line x1="150" y1="85" x2="180" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="175,80 185,85 175,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Step 2: Install */}
              <rect x="190" y="40" width="110" height="90" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12" stroke="#10b981" strokeWidth="1.5" className="dark:stroke-emerald-400" />
              <text x="245" y="70" textAnchor="middle" fontSize="28">⚙️</text>
              <text x="245" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">2. Install</text>
              <text x="245" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Run installer</text>

              {/* Arrow */}
              <line x1="300" y1="85" x2="330" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="325,80 335,85 325,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Step 3: Configure */}
              <rect x="340" y="40" width="110" height="90" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12" stroke="#8b5cf6" strokeWidth="1.5" className="dark:stroke-purple-400" />
              <text x="395" y="70" textAnchor="middle" fontSize="28">🔧</text>
              <text x="395" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">3. Configure</text>
              <text x="395" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Root password</text>

              {/* Arrow */}
              <line x1="450" y1="85" x2="480" y2="85" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-slate-500" />
              <polygon points="475,80 485,85 475,90" fill="#94a3b8" className="dark:fill-slate-500" />

              {/* Step 4: Verify */}
              <rect x="490" y="40" width="90" height="90" rx="10" fill="#f59e0b" opacity="0.08" className="dark:fill-amber-400 dark:opacity-12" stroke="#f59e0b" strokeWidth="1.5" className="dark:stroke-amber-400" />
              <text x="535" y="70" textAnchor="middle" fontSize="28">✅</text>
              <text x="535" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">4. Verify</text>
              <text x="535" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Test connection</text>

              {/* Platforms */}
              <rect x="80" y="150" width="440" height="25" rx="6" fill="#94a3b8" opacity="0.08" className="dark:fill-slate-500 dark:opacity-10" />
              <text x="300" y="168" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">
                🪟 Windows &nbsp;·&nbsp; 🍎 macOS &nbsp;·&nbsp; 🐧 Linux (Ubuntu/Debian/RHEL)
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
              Getting MySQL Server Up and Running
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              Before you can start using MySQL, you need to install it on your
              system. This topic provides <strong>comprehensive, step-by-step
              instructions</strong> for installing MySQL Server on <strong
              className="text-blue-600 dark:text-blue-400">Windows</strong>,{" "}
              <strong className="text-purple-600 dark:text-purple-400">macOS</strong>,
              and <strong className="text-emerald-600 dark:text-emerald-400">Linux</strong>.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-amber-50/40 p-4",
                "dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-amber-600 dark:text-amber-400">Key Insight:</span>{" "}
                The installation process varies by operating system, but the
                core steps are similar: <strong>Download → Install → Configure →
                Verify</strong>. Always set a secure root password!
              </p>
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
                  <li>Windows Server 2016+</li>
                  <li>2 GB RAM minimum</li>
                  <li>~500 MB disk space</li>
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
                  <li>2 GB RAM minimum</li>
                  <li>~500 MB disk space</li>
                  <li>Admin privileges</li>
                  <li>Homebrew (optional)</li>
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
                  <li>sudo privileges</li>
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
                indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
              };
              const textColorMap = {
                blue: "text-blue-700 dark:text-blue-300",
                purple: "text-purple-700 dark:text-purple-300",
                emerald: "text-emerald-700 dark:text-emerald-300",
                indigo: "text-indigo-700 dark:text-indigo-300",
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
                        <span
                          dangerouslySetInnerHTML={{ __html: step }}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Post-Installation Steps ───────────────────────── */}
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
              Post-Installation Steps (All Platforms)
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "🔑",
                  title: "Set Root Password",
                  desc: 'If not set during installation, run `mysql_secure_installation` or use `ALTER USER \'root\'@\'localhost\' IDENTIFIED BY \'your_password\';`',
                  color: "red",
                },
                {
                  icon: "🔒",
                  title: "Secure Installation",
                  desc: "Run `mysql_secure_installation` to remove anonymous users, disable remote root login, and remove test databases.",
                  color: "amber",
                },
                {
                  icon: "🔌",
                  title: "Test Connection",
                  desc: 'Connect to MySQL: `mysql -u root -p` and run `SHOW DATABASES;` to verify the installation.',
                  color: "blue",
                },
                {
                  icon: "📝",
                  title: "Check Version",
                  desc: 'Run `SELECT VERSION();` to confirm the installed MySQL version.',
                  color: "emerald",
                },
              ].map((item, idx) => {
                const colorMap = {
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                };
                const textColorMap = {
                  red: "text-red-700 dark:text-red-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Verifying Installation ────────────────────────── */}
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
              <span className="text-2xl">✅</span>
              Verifying Your MySQL Installation
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              After installation, verify that MySQL is working correctly:
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
                  ✅ Step 1: Check MySQL Service
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`# Windows
net start MySQL

# macOS / Linux
sudo systemctl status mysql
# or
sudo service mysql status`}
                </pre>
              </div>

              <div
                className={clsx(
                  "rounded-xl border border-blue-200/50 p-4",
                  "dark:border-blue-700/50",
                  "bg-blue-50/40 dark:bg-blue-900/10"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  ✅ Step 2: Connect to MySQL
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`mysql -u root -p
Enter password: ********

# After successful login:
mysql> SHOW DATABASES;
mysql> SELECT VERSION();
mysql> EXIT;`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Common Installation Errors ───────────────────── */}
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
              <span className="text-2xl">⚠️</span>
              Common Installation Errors and Solutions
            </h2>
            <div
              className={clsx(
                "space-y-3 text-sm",
                "text-slate-700 dark:text-slate-300"
              )}
            >
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-red-500 pl-4",
                  "hover:bg-red-50/30 dark:hover:bg-red-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-red-600 dark:text-red-400">Error: Access denied for user 'root'@'localhost'</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Solution: Reset the root password using the
                  <code className="mx-1 bg-white/80 px-1 py-0.5 rounded dark:bg-slate-700/40">--skip-grant-tables</code>{" "}
                  option or use the MySQL installer's recovery feature.
                </p>
              </div>

              <div
                className={clsx(
                  "rounded-lg border-l-4 border-amber-500 pl-4",
                  "hover:bg-amber-50/30 dark:hover:bg-amber-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-amber-600 dark:text-amber-400">Error: MySQL service failed to start</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Solution: Check the error log (<code className="mx-1 bg-white/80 px-1 py-0.5 rounded dark:bg-slate-700/40">/var/log/mysql/error.log</code>
                  on Linux, or the Event Viewer on Windows). Ensure no other MySQL service is running.
                </p>
              </div>

              <div
                className={clsx(
                  "rounded-lg border-l-4 border-blue-500 pl-4",
                  "hover:bg-blue-50/30 dark:hover:bg-blue-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">Error: Can't connect to MySQL server on 'localhost'</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Solution: Ensure the MySQL service is running. Check if the
                  port is correct (default: 3306) and no firewall is blocking it.
                </p>
              </div>
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
                  <strong>Save your root password:</strong> Use a password
                  manager or save it in a secure location. Losing it can be
                  difficult to recover.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use `mysql_secure_installation`:</strong> Always run
                  this after installation to secure your MySQL server.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Install MySQL Workbench:</strong> The official GUI
                  tool makes database management much easier, especially for
                  beginners.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Check the logs:</strong> If something goes wrong,
                  check the MySQL error logs for clues. They are usually in
                  <code className="mx-1 bg-white/80 px-1 py-0.5 rounded dark:bg-slate-700/40">/var/log/mysql/</code>{" "}
                  on Linux or in the data directory on Windows.
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
                  <strong>Forgetting the root password:</strong> Losing the root
                  password requires special recovery procedures. Store it safely!
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not running `mysql_secure_installation`:</strong> Your
                  database will have default settings that are insecure (anonymous
                  users, test databases).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Installing the wrong version:</strong> Make sure you
                  download the correct version for your operating system and
                  architecture (32-bit vs 64-bit).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not checking system prerequisites:</strong> Ensure you
                  have enough disk space, memory, and required dependencies before
                  installation.
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
                  <strong>Use a strong root password:</strong> Use a combination
                  of uppercase, lowercase, numbers, and special characters.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Run `mysql_secure_installation`:</strong> This is a
                  critical security step. Always run it after installation.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Install from official sources:</strong> Always download
                  MySQL from the official MySQL website to avoid malware and
                  viruses.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Document your installation:</strong> Keep a record of
                  your installation choices (version, location, port) for future
                  reference.
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
                <span>I can download MySQL Server from the official website</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can install MySQL on Windows/macOS/Linux</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know how to set the root password</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can run `mysql_secure_installation`</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can connect to MySQL using the command line</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can verify the installation by running queries</span>
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
            title="Installing MySQL Server – FAQs"
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
              "Installing MySQL Server is your first step toward becoming a " +
              "database professional. I always tell my students: 'Don't just " +
              "follow the steps — understand them.' Know why you're setting a " +
              "root password, why `mysql_secure_installation` is important, and " +
              "how to verify your installation. The most common mistakes are " +
              "forgetting the root password and not securing the installation. " +
              "Take your time, document your steps, and don't hesitate to search " +
              "for solutions if you encounter errors. Installing MySQL is a skill " +
              "you'll use throughout your career."
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
            Topic 29 · Installing MySQL Server · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic29;