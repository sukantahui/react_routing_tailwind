import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic33_files/topic33_questions";

/**
 * Topic33 – Connecting to MySQL Server
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain the various ways to connect to a MySQL server,
 *          including command line, MySQL Workbench, and programmatic
 *          connections. Covers connection parameters, authentication,
 *          security, and troubleshooting. Builds on Topics 29-32
 *          (installation, configuration).
 */
const Topic33 = () => {
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

        .method-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .method-card:hover {
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
            Module 1 · Topic 33
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Connecting to
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
            Establishing a connection — the first step to working with your
            MySQL database.
          </p>
        </div>

        {/* ─── SVG: Connection Overview ────────────────────── */}
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
              aria-label="MySQL connection methods"
            >
              <rect width="600" height="200" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                🔌 Connecting to MySQL Server
              </text>

              {/* Client icons */}
              <rect x="30" y="40" width="110" height="90" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" stroke="#3b82f6" strokeWidth="1.5" className="dark:stroke-blue-400" />
              <text x="85" y="70" textAnchor="middle" fontSize="28">💻</text>
              <text x="85" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Command Line</text>
              <text x="85" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">mysql -u root -p</text>

              <rect x="160" y="40" width="110" height="90" rx="10" fill="#10b981" opacity="0.08" className="dark:fill-emerald-400 dark:opacity-12" stroke="#10b981" strokeWidth="1.5" className="dark:stroke-emerald-400" />
              <text x="215" y="70" textAnchor="middle" fontSize="28">🖥️</text>
              <text x="215" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Workbench</text>
              <text x="215" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">GUI Client</text>

              <rect x="290" y="40" width="110" height="90" rx="10" fill="#8b5cf6" opacity="0.08" className="dark:fill-purple-400 dark:opacity-12" stroke="#8b5cf6" strokeWidth="1.5" className="dark:stroke-purple-400" />
              <text x="345" y="70" textAnchor="middle" fontSize="28">🌐</text>
              <text x="345" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Web Apps</text>
              <text x="345" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">PHP, Python, Java</text>

              <rect x="420" y="40" width="110" height="90" rx="10" fill="#f59e0b" opacity="0.08" className="dark:fill-amber-400 dark:opacity-12" stroke="#f59e0b" strokeWidth="1.5" className="dark:stroke-amber-400" />
              <text x="475" y="70" textAnchor="middle" fontSize="28">📱</text>
              <text x="475" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">Mobile Apps</text>
              <text x="475" y="110" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Node.js, Flutter</text>

              {/* MySQL Server */}
              <rect x="200" y="150" width="200" height="30" rx="8" fill="#ef4444" opacity="0.08" className="dark:fill-red-400 dark:opacity-12" stroke="#ef4444" strokeWidth="1.5" className="dark:stroke-red-400" />
              <text x="300" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">🗄️ MySQL Server (port 3306)</text>
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
              Why Connecting to MySQL Matters
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              Before you can work with your database, you need to <strong
              className="text-blue-600 dark:text-blue-400">establish a
              connection</strong>. Whether you're using the command line, a GUI
              tool like MySQL Workbench, or an application written in Python,
              PHP, or Java, the connection process is the gateway to all
              database operations.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-blue-50/40 p-4",
                "dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Key Insight:</span>{" "}
                Understanding connection parameters and authentication is
                essential for security and troubleshooting. Most connection
                issues are due to incorrect credentials or network misconfiguration.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Connection Methods ───────────────────────────── */}
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
              <span className="text-2xl">🔌</span>
              Methods of Connecting to MySQL
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
                "text-sm"
              )}
            >
              {[
                {
                  icon: "💻",
                  title: "Command Line",
                  desc: "Use the `mysql` client to connect interactively.",
                  detail: "`mysql -u root -p`",
                  color: "blue",
                },
                {
                  icon: "🖥️",
                  title: "MySQL Workbench",
                  desc: "GUI tool for database design and management.",
                  detail: "Connect via a saved connection profile.",
                  color: "emerald",
                },
                {
                  icon: "🌐",
                  title: "Web Applications",
                  desc: "PHP, Python, Java, Node.js, etc.",
                  detail: "Use language-specific drivers (PDO, MySQLi, PyMySQL, JDBC).",
                  color: "purple",
                },
                {
                  icon: "📱",
                  title: "Mobile & Desktop Apps",
                  desc: "Apps that need local or remote MySQL.",
                  detail: "Use connectors for your platform.",
                  color: "amber",
                },
              ].map((method, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "method-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[method.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 300}ms` }}
                  >
                    <div className="text-3xl">{method.icon}</div>
                    <h3
                      className={clsx(
                        "mt-1 font-bold",
                        textColorMap[method.color]
                      )}
                    >
                      {method.title}
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {method.desc}
                    </p>
                    <div className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-500">
                      {method.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Command Line Connection ──────────────────────── */}
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
              <span className="text-2xl">💻</span>
              Command Line Connection
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The <strong>mysql</strong> command-line client is the simplest way
              to connect to MySQL. It's available on all platforms and is
              essential for administration and scripting.
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
                  📝 Basic Command
                </h4>
                <pre
                  className={clsx(
                    "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200",
                    "dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  {`mysql -u root -p

# Then enter password
# After login:
mysql> SHOW DATABASES;
mysql> USE mydb;
mysql> SELECT * FROM users;`}
                </pre>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-emerald-200/50 p-4",
                  "dark:border-emerald-700/50",
                  "bg-emerald-50/40 dark:bg-emerald-900/10"
                )}
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  🔧 Common Options
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>-h hostname</code> : remote server</li>
                  <li><code>-P port</code> : change port</li>
                  <li><code>-u username</code> : user</li>
                  <li><code>-p</code> : prompt for password</li>
                  <li><code>-e "query"</code> : execute and exit</li>
                  <li><code>--ssl-mode=REQUIRED</code> : enforce SSL</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Connection Parameters ────────────────────────── */}
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
              <span className="text-2xl">🔑</span>
              Connection Parameters
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  param: "Hostname",
                  desc: "The server address (localhost, IP, or domain).",
                  example: "localhost, 192.168.1.100, db.example.com",
                  color: "blue",
                },
                {
                  param: "Port",
                  desc: "The port MySQL is listening on (default: 3306).",
                  example: "3306 (default)",
                  color: "emerald",
                },
                {
                  param: "Username",
                  desc: "The MySQL user account (e.g., root, app_user).",
                  example: "root",
                  color: "purple",
                },
                {
                  param: "Password",
                  desc: "The password for the user account.",
                  example: "Your secure password",
                  color: "amber",
                },
                {
                  param: "Database",
                  desc: "The default database to use after connecting.",
                  example: "mydb",
                  color: "indigo",
                },
                {
                  param: "SSL Options",
                  desc: "Secure connection parameters (--ssl-mode, --ssl-ca, etc.).",
                  example: "--ssl-mode=REQUIRED",
                  color: "red",
                },
              ].map((p, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  red: "text-red-700 dark:text-red-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "rounded-xl border p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]",
                      colorMap[p.color]
                    )}
                  >
                    <h4
                      className={clsx(
                        "font-bold",
                        textColorMap[p.color]
                      )}
                    >
                      {p.param}
                    </h4>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {p.desc}
                    </p>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      <code>{p.example}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Programmatic Connections ──────────────────────── */}
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
              <span className="text-2xl">🌐</span>
              Programmatic Connections (Code Examples)
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {[
                {
                  lang: "PHP (PDO)",
                  code: `$dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";
$pdo = new PDO($dsn, 'username', 'password');`,
                },
                {
                  lang: "Python (PyMySQL)",
                  code: `import pymysql
conn = pymysql.connect(
  host='localhost',
  user='username',
  password='password',
  database='mydb'
)`,
                },
                {
                  lang: "Java (JDBC)",
                  code: `String url = "jdbc:mysql://localhost:3306/mydb";
Connection conn = DriverManager.getConnection(
  url, "username", "password"
);`,
                },
                {
                  lang: "Node.js (mysql2)",
                  code: `const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'mydb'
});`,
                },
              ].map((ex, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "rounded-xl border border-slate-200/50 p-4",
                    "dark:border-slate-700/50",
                    "bg-slate-50/40 dark:bg-slate-800/20",
                    "transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
                  )}
                >
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">
                    {ex.lang}
                  </h4>
                  <pre
                    className={clsx(
                      "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                      "dark:bg-slate-900 dark:text-slate-300"
                    )}
                  >
                    {ex.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Troubleshooting ───────────────────────────────── */}
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
              <span className="text-2xl">🔍</span>
              Troubleshooting Connection Issues
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
                <span className="font-bold text-red-600 dark:text-red-400">❌ Access denied for user</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Check username and password. Reset password if needed. Also,
                  ensure the user has the correct host permission (e.g.,
                  'username'@'localhost' vs 'username'@'%').
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-amber-500 pl-4",
                  "hover:bg-amber-50/30 dark:hover:bg-amber-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-amber-600 dark:text-amber-400">❌ Can't connect to MySQL server</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Check if MySQL is running (<code>sudo systemctl status mysql</code>).
                  Verify the hostname and port. Check firewall rules (port 3306).
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-blue-500 pl-4",
                  "hover:bg-blue-50/30 dark:hover:bg-blue-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">❌ Host not allowed</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Grant remote access: <code>GRANT ALL ON *.* TO 'user'@'%' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;</code>
                </p>
              </div>
              <div
                className={clsx(
                  "rounded-lg border-l-4 border-purple-500 pl-4",
                  "hover:bg-purple-50/30 dark:hover:bg-purple-900/10",
                  "transition-colors duration-300"
                )}
              >
                <span className="font-bold text-purple-600 dark:text-purple-400">❌ SSL connection error</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Use <code>--ssl-mode=DISABLED</code> for testing, or correctly
                  configure SSL certificates (--ssl-ca, --ssl-cert, --ssl-key).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Security Considerations ──────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "800ms" }}
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
              <span className="text-2xl">🔐</span>
              Security Best Practices
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
                  <strong>Use SSL/TLS:</strong> Always use encrypted connections
                  when connecting over untrusted networks.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Don't use root:</strong> Create dedicated application
                  users with minimal privileges (principle of least privilege).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use strong passwords:</strong> Use long, random
                  passwords for MySQL users.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Restrict host access:</strong> Use 'username'@'specific_ip'
                  instead of '%' (any host) where possible.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Don't store passwords in code:</strong> Use environment
                  variables or configuration files outside the codebase.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
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
              <span className="text-2xl">🌍</span>
              Real-World Example: Connecting from a Python Script
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
                <strong>Swadeep</strong>, a data analyst in <strong>Barrackpore</strong>,
                writes a Python script to analyse sales data:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Step 1:</strong> Installs PyMySQL:{" "}
                    <code>pip install pymysql</code>
                  </li>
                  <li>
                    <strong>Step 2:</strong> Creates a connection:
                    <pre
                      className={clsx(
                        "mt-1 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                        "dark:bg-slate-900 dark:text-slate-300"
                      )}
                    >
                      {`import pymysql
conn = pymysql.connect(
    host='localhost',
    user='analyst',
    password='SecurePass123!',
    database='sales_db'
)`}
                    </pre>
                  </li>
                  <li>
                    <strong>Step 3:</strong> Runs a query and processes results.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Closes the connection.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Connecting programmatically is
                the backbone of data-driven applications.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
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
                  <strong>Use connection pooling:</strong> For web applications,
                  use connection pools to reuse connections and improve performance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Test connections early:</strong> In your application
                  startup, test the connection to fail fast if the database is
                  unavailable.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use connection timeouts:</strong> Set reasonable
                  connection timeouts to avoid hanging when the database is down.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Store credentials securely:</strong> Use environment
                  variables or secret management tools (like AWS Secrets Manager)
                  for production.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
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
                  <strong>Hardcoding credentials:</strong> Storing passwords in
                  source code is a security risk. Use environment variables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not closing connections:</strong> Forgetting to close
                  connections can lead to connection exhaustion.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Using the wrong hostname:</strong> 'localhost' vs
                  '127.0.0.1' can behave differently (socket vs. TCP).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Ignoring SSL warnings:</strong> Always use secure
                  connections in production. Disabling SSL is a security risk.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
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
                  <strong>Use SSL in production:</strong> Encrypt all connections
                  to protect sensitive data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Create dedicated users:</strong> One user per
                  application with the minimum necessary privileges.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use connection pools:</strong> Reuse connections to
                  reduce overhead and improve performance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Monitor connections:</strong> Use <code>SHOW PROCESSLIST</code>
                  to monitor active connections and identify issues.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1300ms" }}
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
                <span>I can connect to MySQL using the command line</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can connect using MySQL Workbench</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand connection parameters (host, port, user, password, database)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can troubleshoot common connection errors</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know security best practices for connections</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can connect programmatically from at least one language</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1400ms" }}
        >
          <FAQTemplate
            title="Connecting to MySQL Server – FAQs"
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
          style={{ animationDelay: "1500ms" }}
        >
          <Teacher
            note={
              "Connecting to MySQL is the first practical skill you'll use every day. " +
              "I tell my students: 'Master the command line connection first — it's " +
              "your Swiss Army knife.' Understanding the connection parameters " +
              "and common errors will save you hours of debugging. Also, never " +
              "underestimate security: always use SSL in production, never hardcode " +
              "passwords, and create application-specific users with limited privileges. " +
              "Practice by connecting from different tools and languages; this " +
              "versatility will make you a more effective developer."
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
            Topic 33 · Connecting to MySQL Server · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic33;