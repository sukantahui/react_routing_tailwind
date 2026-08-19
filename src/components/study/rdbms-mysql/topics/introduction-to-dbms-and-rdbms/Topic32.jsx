import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic32_files/topic32_questions";

/**
 * Topic32 – Configuring MySQL Server
 *
 * @component
 * @returns {JSX.Element} The full topic page with animations,
 *                        dark/light mode, and interactive elements.
 *
 * @purpose Explain how to configure MySQL Server using its configuration
 *          files (my.cnf / my.ini). Covers location, common parameters,
 *          tuning, and best practices. Builds on Topics 29-31 (installation).
 */
const Topic32 = () => {
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

  // ─── Configuration Parameters ─────────────────────────────
  const configParams = [
    {
      param: "port",
      default: "3306",
      desc: "The port number on which MySQL listens for connections.",
      section: "client, mysqld",
      color: "blue",
    },
    {
      param: "max_connections",
      default: "151",
      desc: "Maximum number of simultaneous client connections.",
      section: "mysqld",
      color: "emerald",
    },
    {
      param: "innodb_buffer_pool_size",
      default: "128M",
      desc: "The size of the InnoDB buffer pool (cache). Critical for performance.",
      section: "mysqld",
      color: "purple",
    },
    {
      param: "query_cache_type",
      default: "0 (off in 8.0)",
      desc: "Whether to use the query cache (deprecated in MySQL 8.0).",
      section: "mysqld",
      color: "amber",
    },
    {
      param: "log_error",
      default: "/var/log/mysql/error.log",
      desc: "The file where MySQL writes error logs.",
      section: "mysqld",
      color: "red",
    },
    {
      param: "datadir",
      default: "/var/lib/mysql",
      desc: "The directory where MySQL stores database data files.",
      section: "mysqld",
      color: "indigo",
    },
    {
      param: "innodb_file_per_table",
      default: "ON",
      desc: "Each table has its own tablespace file.",
      section: "mysqld",
      color: "teal",
    },
    {
      param: "max_allowed_packet",
      default: "64M",
      desc: "Maximum size of a packet or any generated/intermediate string.",
      section: "mysqld",
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

        .param-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .param-card:hover {
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
            Module 1 · Topic 32
          </div>
          <h1
            className={clsx(
              "mt-4 text-3xl font-extrabold leading-tight md:text-4xl",
              "text-slate-800 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Configuring
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
            Tuning MySQL for performance, reliability, and security — the
            essential configuration guide.
          </p>
        </div>

        {/* ─── SVG: Configuration Overview ──────────────────── */}
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
              aria-label="MySQL configuration overview"
            >
              <rect width="600" height="190" rx="12" fill="transparent" />

              <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" className="dark:fill-slate-200">
                ⚙️ MySQL Configuration: my.cnf / my.ini
              </text>

              {/* Config file icon */}
              <rect x="220" y="40" width="160" height="80" rx="10" fill="#3b82f6" opacity="0.08" className="dark:fill-blue-400 dark:opacity-12" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-400" />
              <text x="300" y="70" textAnchor="middle" fontSize="28">📄</text>
              <text x="300" y="95" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" className="dark:fill-slate-200">my.cnf / my.ini</text>
              <text x="300" y="108" textAnchor="middle" fontSize="8" fill="#475569" className="dark:fill-slate-400">Configuration file</text>

              {/* Section labels */}
              <text x="80" y="65" textAnchor="middle" fontSize="11" fill="#10b981" className="dark:fill-emerald-400">[mysqld]</text>
              <text x="80" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Server settings</text>

              <text x="80" y="120" textAnchor="middle" fontSize="11" fill="#8b5cf6" className="dark:fill-purple-400">[client]</text>
              <text x="80" y="140" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Client settings</text>

              <text x="520" y="65" textAnchor="middle" fontSize="11" fill="#f59e0b" className="dark:fill-amber-400">[mysql]</text>
              <text x="520" y="85" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">CLI settings</text>

              <text x="520" y="120" textAnchor="middle" fontSize="11" fill="#ef4444" className="dark:fill-red-400">[server]</text>
              <text x="520" y="140" textAnchor="middle" fontSize="9" fill="#475569" className="dark:fill-slate-400">Server-wide</text>

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
              Why Configure MySQL Server?
            </h2>
            <p
              className={clsx(
                "leading-relaxed text-slate-700",
                "dark:text-slate-300"
              )}
            >
              While MySQL works out of the box with default settings, these
              defaults are designed for a <strong>low-resource, general-purpose
              environment</strong>. To get the best performance, reliability,
              and security, you need to <strong>configure</strong> MySQL
              according to your specific workload and hardware.
            </p>
            <div
              className={clsx(
                "mt-4 rounded-lg bg-amber-50/40 p-4",
                "dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30"
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-amber-600 dark:text-amber-400">Key Insight:</span>{" "}
                Tuning MySQL can dramatically improve performance — a
                well-configured server can handle 10x the load of a default
                installation.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Configuration File Location ───────────────────── */}
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
              <span className="text-2xl">📁</span>
              Finding the MySQL Configuration File
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
                  "bg-blue-50/40 dark:bg-blue-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                  🪟 Windows
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>C:\ProgramData\MySQL\MySQL Server X.X\my.ini</code></li>
                  <li><code>C:\Program Files\MySQL\MySQL Server X.X\my.ini</code></li>
                  <li>Check MySQL service properties</li>
                </ul>
              </div>
              <div
                className={clsx(
                  "rounded-xl border border-purple-200/50 p-4",
                  "dark:border-purple-700/50",
                  "bg-purple-50/40 dark:bg-purple-900/10",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300">
                  🍎 macOS (Homebrew)
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>/usr/local/etc/my.cnf</code></li>
                  <li><code>/opt/homebrew/etc/my.cnf</code></li>
                  <li>Check <code>brew info mysql</code></li>
                </ul>
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
                  🐧 Linux
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li><code>/etc/mysql/my.cnf</code></li>
                  <li><code>/etc/my.cnf</code></li>
                  <li><code>/usr/etc/my.cnf</code></li>
                  <li>Or use <code>mysqld --verbose --help | grep cnf</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Configuration File Structure ──────────────────── */}
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
              <span className="text-2xl">📝</span>
              Configuration File Structure
            </h2>
            <p
              className={clsx(
                "text-sm leading-relaxed text-slate-600",
                "dark:text-slate-400"
              )}
            >
              The configuration file uses sections defined in square brackets:
            </p>
            <div
              className={clsx(
                "mt-4 grid grid-cols-1 gap-3 md:grid-cols-3",
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
                  [client]
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Settings for MySQL clients</li>
                  <li><code>port</code>, <code>socket</code></li>
                  <li><code>default-character-set</code></li>
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
                  [mysqld]
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Server settings</li>
                  <li><code>port</code>, <code>datadir</code></li>
                  <li><code>max_connections</code></li>
                  <li><code>innodb_buffer_pool_size</code></li>
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
                  [mysql]
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Settings for mysql CLI</li>
                  <li><code>prompt</code></li>
                  <li><code>auto-rehash</code></li>
                  <li><code>pager</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Configuration Parameters ──────────────────── */}
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
                "mb-4 flex items-center gap-2 text-xl font-bold",
                "text-slate-800 dark:text-white"
              )}
            >
              <span className="text-2xl">🔑</span>
              Key Configuration Parameters
            </h2>
            <div
              className={clsx(
                "grid grid-cols-1 gap-3 md:grid-cols-2",
                "text-sm"
              )}
            >
              {configParams.map((param, idx) => {
                const colorMap = {
                  blue: "border-blue-200/50 bg-blue-50/40 dark:border-blue-700/50 dark:bg-blue-900/10",
                  emerald: "border-emerald-200/50 bg-emerald-50/40 dark:border-emerald-700/50 dark:bg-emerald-900/10",
                  purple: "border-purple-200/50 bg-purple-50/40 dark:border-purple-700/50 dark:bg-purple-900/10",
                  amber: "border-amber-200/50 bg-amber-50/40 dark:border-amber-700/50 dark:bg-amber-900/10",
                  red: "border-red-200/50 bg-red-50/40 dark:border-red-700/50 dark:bg-red-900/10",
                  indigo: "border-indigo-200/50 bg-indigo-50/40 dark:border-indigo-700/50 dark:bg-indigo-900/10",
                  teal: "border-teal-200/50 bg-teal-50/40 dark:border-teal-700/50 dark:bg-teal-900/10",
                  pink: "border-pink-200/50 bg-pink-50/40 dark:border-pink-700/50 dark:bg-pink-900/10",
                };
                const textColorMap = {
                  blue: "text-blue-700 dark:text-blue-300",
                  emerald: "text-emerald-700 dark:text-emerald-300",
                  purple: "text-purple-700 dark:text-purple-300",
                  amber: "text-amber-700 dark:text-amber-300",
                  red: "text-red-700 dark:text-red-300",
                  indigo: "text-indigo-700 dark:text-indigo-300",
                  teal: "text-teal-700 dark:text-teal-300",
                  pink: "text-pink-700 dark:text-pink-300",
                };
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "param-card rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
                      colorMap[param.color],
                      "hover:-translate-y-[2px]"
                    )}
                    style={{ animationDelay: `${idx * 50 + 500}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4
                          className={clsx(
                            "font-bold font-mono",
                            textColorMap[param.color]
                          )}
                        >
                          {param.param}
                        </h4>
                        <p className="mt-1 text-slate-600 dark:text-slate-400">
                          {param.desc}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      <span className="font-semibold">Default:</span>{" "}
                      <code>{param.default}</code> ·{" "}
                      <span className="font-semibold">Section:</span>{" "}
                      <code>{param.section}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Example Configuration File ────────────────────── */}
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
              <span className="text-2xl">📄</span>
              Example Configuration File
            </h2>
            <pre
              className={clsx(
                "overflow-x-auto rounded-lg bg-slate-800 p-4 text-xs text-slate-200",
                "dark:bg-slate-900 dark:text-slate-300",
                "font-mono leading-relaxed"
              )}
            >
              {`[client]
port = 3306
socket = /var/run/mysqld/mysqld.sock

[mysqld]
# Basic Settings
port = 3306
user = mysql
datadir = /var/lib/mysql
socket = /var/run/mysqld/mysqld.sock
pid-file = /var/run/mysqld/mysqld.pid

# Performance
max_connections = 500
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 1
query_cache_type = 0
query_cache_size = 0

# Security
bind-address = 127.0.0.1
max_allowed_packet = 128M
log_error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/mysql-slow.log
long_query_time = 2

# Character Set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
prompt = '\\u@\\h [\\d]> '
auto-rehash = 1`}
            </pre>
          </div>
        </section>

        {/* ─── How to Edit and Reload ────────────────────────── */}
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
              <span className="text-2xl">🔧</span>
              Editing and Reloading Configuration
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
                  ✏️ Editing the File
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>Open the file with a text editor (sudo privileges required)</li>
                  <li>Make changes and save</li>
                  <li>Check syntax: <code>mysqld --validate-config</code></li>
                  <li>Backup the original file first</li>
                </ul>
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
                  🔄 Reloading Configuration
                </h4>
                <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
                  <li>
                    <strong>Restart MySQL:</strong>{" "}
                    <code>sudo systemctl restart mysql</code>
                  </li>
                  <li>
                    <strong>Reload without restart:</strong>{" "}
                    <code>mysqladmin reload</code>
                  </li>
                  <li>Or in MySQL: <code>FLUSH PRIVILEGES;</code></li>
                  <li>Some parameters require full restart</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real-World Example ───────────────────────────── */}
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
              <span className="text-2xl">🌍</span>
              Real-World Example: Tuning for a WordPress Site
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
                <strong>Abhronila</strong>, a WordPress developer in{" "}
                <strong>Shyamnagar</strong>, needs to optimise MySQL for her
                busy blog:
                <br />
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    <strong>Problem:</strong> The site is slow during peak
                    traffic (500 concurrent visitors).
                  </li>
                  <li>
                    <strong>Diagnosis:</strong> Default <code>max_connections</code>{" "}
                    (151) is too low, and <code>innodb_buffer_pool_size</code>{" "}
                    is too small (128MB) for the server's 4GB RAM.
                  </li>
                  <li>
                    <strong>Solution:</strong> Edit <code>my.cnf</code>:
                    <pre
                      className={clsx(
                        "mt-2 overflow-x-auto rounded-lg bg-slate-800 p-2 text-xs text-slate-200",
                        "dark:bg-slate-900 dark:text-slate-300"
                      )}
                    >
                      {`max_connections = 500
innodb_buffer_pool_size = 2G
query_cache_type = 0  # disabled in 8.0`}
                    </pre>
                  </li>
                  <li>
                    <strong>Result:</strong> After restarting MySQL, the site
                    handles peak traffic smoothly.
                  </li>
                </ul>
                <strong>Key Takeaway:</strong> Understanding configuration
                parameters is essential for scaling applications.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Tips & Tricks ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "900ms" }}
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
                  <strong>Start with the default configuration:</strong> Copy
                  the default my.cnf (or my.ini) and make incremental changes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use the official MySQL documentation:</strong> Each
                  parameter is well-documented with recommendations.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Monitor performance before and after:</strong> Use
                  tools like <code>mysqltuner</code> to benchmark changes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 dark:text-blue-400">▸</span>
                <span>
                  <strong>Use variables to check current settings:</strong>{" "}
                  <code>SHOW VARIABLES LIKE '%param%';</code>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Common Pitfalls ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1000ms" }}
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
                  <strong>Setting values too high:</strong> Setting{" "}
                  <code>innodb_buffer_pool_size</code> larger than available
                  RAM can cause swapping.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Forgetting to restart:</strong> Many parameters
                  require a full restart to take effect.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Editing the wrong file:</strong> There may be multiple
                  configuration files; make sure you're editing the one that's
                  actually being used.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 dark:text-red-400">✗</span>
                <span>
                  <strong>Not testing changes:</strong> Always test configuration
                  changes in a development environment first.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Best Practices ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1100ms" }}
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
                  <strong>Backup the configuration file:</strong> Before making
                  changes, save a copy: <code>sudo cp my.cnf my.cnf.bak</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Use variables for dynamic settings:</strong> Some
                  parameters can be set per session using <code>SET GLOBAL</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Monitor performance regularly:</strong> Use tools like
                  <code>mysqltuner</code> and <code>pt-query-digest</code>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 dark:text-emerald-400">✓</span>
                <span>
                  <strong>Keep configuration in version control:</strong> Track
                  changes to your MySQL configuration for auditing and rollback.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Mini Checklist ────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1200ms" }}
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
                <span>I can locate the MySQL configuration file (my.cnf / my.ini)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I understand the structure of the configuration file</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can list key configuration parameters and their purposes</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can edit and reload the configuration</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I know common pitfalls and how to avoid them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">☐</span>
                <span>I can apply best practices for MySQL configuration</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-10"
          style={{ animationDelay: "1300ms" }}
        >
          <FAQTemplate
            title="Configuring MySQL Server – FAQs"
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
          style={{ animationDelay: "1400ms" }}
        >
          <Teacher
            note={
              "Configuring MySQL is a skill that separates beginners from professionals. " +
              "I tell my students: 'The default configuration is for a general-purpose " +
              "system, not your specific workload.' The key is to understand what each " +
              "parameter does and how it affects performance. Start with the big three: " +
              "`innodb_buffer_pool_size` (set to 50-70% of your RAM), `max_connections` " +
              "(based on your user load), and `max_allowed_packet` (for large data). " +
              "Always test changes in a staging environment and monitor the impact. " +
              "And remember: configuration is iterative — you'll tune it as your " +
              "application evolves."
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
            Topic 32 · Configuring MySQL Server · Built with ❤️ for classroom learning
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic32;