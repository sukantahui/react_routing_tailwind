import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic31_files/
import loggingLibSh from "./topic31_files/logging_lib.sh?raw";
import backupUsingLibSh from "./topic31_files/backup_using_lib.sh?raw";
import loadConfigSh from "./topic31_files/load_config.sh?raw";
import pipeFilterExampleSh from "./topic31_files/pipe_filter_example.sh?raw";

// Config file is plain text, not a script, but we can import as raw
import configExampleConf from "./topic31_files/config_example.conf?raw";

/**
 * Component: Topic31
 * Purpose: Teach how to write reusable utility scripts – functions,
 *          libraries, sourcing, design patterns, and best practices.
 * Prototype: function Topic31(): JSX.Element
 * Return: Full educational section with examples, SVGs, and professional insights.
 *
 * Prerequisites: Topics 0–30 (functions, exit status, redirection, version control)
 */
const Topic31 = () => {
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <>
      {/* Custom keyframes – zero‑config Tailwind arbitrary animations */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gearRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes moduleConnect {
          0% { stroke-dashoffset: 80; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* MAIN – dark mode default, light mode via 'light:' prefix */}
      <div
        className={clsx(
          "max-w-7xl mx-auto px-4 py-12 space-y-16",
          "bg-gray-900 text-gray-100",
          "light:bg-white light:text-gray-900"
        )}
      >
        {/* ---------- HERO SECTION ---------- */}
        <header
          className={clsx(
            "text-center space-y-4",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            🔧 Writing Reusable Utility Scripts
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Don't copy‑paste – <span className="text-amber-400 light:text-amber-600">DRY</span> (Don't Repeat Yourself).
            Build a toolbox of shell functions that{" "}
            <span className="text-blue-400">Swadeep</span>,{" "}
            <span className="text-blue-400">Tuhina</span>, and your entire team can share.
          </p>

          {/* SVG: Modular blocks connecting */}
          <div className="flex justify-center pt-6">
            <svg
              width="360"
              height="160"
              viewBox="0 0 360 160"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Modular script components connected"
            >
              {/* Library block */}
              <g transform="translate(30, 40)">
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="50"
                  rx="8"
                  fill="#312e81"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  className="light:fill-indigo-100 light:stroke-indigo-600"
                />
                <text x="12" y="30" fontSize="14" fill="#e0e7ff">lib.sh</text>
                {/* Gear icon */}
                <circle cx="55" cy="15" r="6" fill="#c084fc" />
                <path d="M55 9 L55 21 M49 12 L61 18 M49 18 L61 12" stroke="white" strokeWidth="1" />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 55 15; 360 55 15"
                  dur="8s"
                  repeatCount="indefinite"
                  begin="mouseover"
                />
              </g>

              {/* Connector line */}
              <line x1="100" y1="65" x2="130" y2="65" stroke="#6b7280" strokeWidth="2" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;30;0" dur="2s" repeatCount="indefinite" />
              </line>

              {/* Consumer script 1 */}
              <g transform="translate(140, 20)">
                <rect x="0" y="0" width="70" height="40" rx="6" fill="#1e293b" stroke="#60a5fa" />
                <text x="8" y="25" fontSize="12" fill="#bfdbfe">backup.sh</text>
              </g>

              {/* Consumer script 2 */}
              <g transform="translate(140, 80)">
                <rect x="0" y="0" width="70" height="40" rx="6" fill="#1e293b" stroke="#60a5fa" />
                <text x="8" y="25" fontSize="12" fill="#bfdbfe">cleanup.sh</text>
              </g>

              {/* Another library */}
              <g transform="translate(240, 100)">
                <rect x="0" y="0" width="70" height="50" rx="8" fill="#374151" stroke="#9ca3af" />
                <text x="12" y="30" fontSize="14" fill="#d1d5db">config.sh</text>
              </g>

              {/* Connection from second library */}
              <line x1="240" y1="125" x2="180" y2="100" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT EXPLANATION ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-amber-800 light:border-amber-300 pb-3 inline-block">
            🧱 What Makes a Script “Reusable”?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="font-bold text-amber-400">Modularity</span> – break code into
                functions, each doing one thing well. Group related functions into <strong>libraries</strong>.
              </p>
              <p>
                <span className="font-bold text-amber-400">Sourcing</span> – use <code>.</code> or <code>source</code>{" "}
                to import functions. Never copy‑paste the same validation logic into ten scripts.
              </p>
              <p>
                <span className="font-bold text-amber-400">Configuration separation</span> – keep
                settings (file paths, thresholds) outside the code, in config files or environment variables.
              </p>
              <p>
                <span className="font-bold text-amber-400">Chainability</span> – scripts that read
                from stdin and write to stdout can be combined with pipes, just like traditional Unix tools.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-amber-700",
                "hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span> Real‑world Scenario
              </h3>
              <p className="text-lg">
                The school's IT club in <span className="italic">Ichapur</span> maintains 20+ scripts.
                <span className="text-blue-400"> Abhronila</span> created a logging library; now every
                script logs consistently. When they added timestamps, all scripts improved instantly.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT EXAMPLES (ShellFileLoader) ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-amber-800 light:border-amber-300 pb-3 inline-block">
            🧪 Reusable Components in Action
          </h2>

          <ShellFileLoader
            fileModule={loggingLibSh}
            title="📚 logging_lib.sh – A reusable logging library"
            highlightLines={[3, 7, 15]} // local, return, die function
          />
          <ShellFileLoader
            fileModule={backupUsingLibSh}
            title="💾 backup_using_lib.sh – Script that sources the library"
            highlightLines={[2, 9, 16]} // source, log_info, die
          />
          <ShellFileLoader
            fileModule={configExampleConf}
            title="⚙️ config_example.conf – Sample configuration file (key=value)"
            highlightLines={[]}
          />
          <ShellFileLoader
            fileModule={loadConfigSh}
            title="🔧 load_config.sh – Load and validate configuration"
            highlightLines={[6, 12, 18]} // sourcing config, parameter expansion
          />
          <ShellFileLoader
            fileModule={pipeFilterExampleSh}
            title="🔀 pipe_filter_example.sh – Filter pattern (stdin → stdout)"
            highlightLines={[4, 10]} // while read, output
          />
        </section>

        {/* ---------- COMMON PITFALLS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Pitfalls in Reusable Scripts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Not using `local` in functions – variables leak and cause side effects.",
              "❌ Sourcing without checking if already sourced (no guard).",
              "❌ Hard‑coding paths inside libraries (use config or env vars).",
              "❌ Functions that both print and return – mixed output vs status.",
              "❌ Assuming library is in $PATH – source with relative/absolute path.",
              "❌ No help/usage message – others can't figure out how to use it.",
              "❌ Not returning meaningful exit codes – 0 for success, 1‑127 for errors.",
              "❌ Polluting the environment with unnecessary variables.",
            ].map((pitfall, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-5 rounded-lg border border-red-800 light:border-red-300",
                  "bg-red-900/20 light:bg-red-50",
                  "hover:bg-red-900/30 light:hover:bg-red-100 transition-colors"
                )}
              >
                <span className="text-lg">{pitfall}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- BEST PRACTICES ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "📦 Group related functions in one file – e.g., logging.sh, validation.sh.",
              "🔒 Always declare function-scoped variables with `local`.",
              "📖 Provide usage/help function: `show_help() { ... }`.",
              "📂 Source libraries using `dirname $0` to locate relative paths.",
              "⚙️ Separate configuration from code – source a .conf file or read with `grep`.",
              "🔄 Return numeric exit codes; use `return` in functions, `exit` in scripts.",
              "🧪 Test libraries independently – write small test scripts.",
              "📚 Use `set -euo pipefail` inside scripts, but be careful in libraries (avoid unexpected exits).",
              "🗂️ Install libraries to standard locations (e.g., /usr/local/lib) and add to $PATH.",
            ].map((practice, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded hover:bg-gray-800 light:hover:bg-gray-100">
                <span className="text-green-400 light:text-green-600 text-xl">✓</span>
                <span>{practice}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PROFESSIONAL TIPS ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-yellow-800 light:border-yellow-300 pb-3 inline-block">
            🧠 Pro Tips
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Guard against multiple sourcing</strong> – at the top of your library:
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-2 rounded">
                [ -n "$_LOGGING_LIB" ] &amp;&amp; return; _LOGGING_LIB=1
              </code>
            </p>
            <p>
              🔹 <strong>Make scripts idempotent</strong> – running them twice should not break things.
              Use `mkdir -p`, `rsync --ignore-existing`, etc.
            </p>
            <p>
              🔹 <strong>Provide a `--version` flag</strong> – embed a version string in your library.
              Update it with each change.
            </p>
            <p>
              🔹 <strong>Use `declare -g` in bash</strong> to intentionally set global variables from functions.
              But prefer local + return values.
            </p>
            <p>
              🔹 <strong>Write a man page or README</strong> – even a simple text file. Your future self will thank you.
            </p>
          </div>
        </section>

        {/* ---------- HINT SECTION ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-indigo-900/20 light:bg-indigo-50 border border-indigo-700",
            "flex flex-col md:flex-row gap-6 items-start"
          )}
        >
          <span className="text-5xl">💡</span>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">Think about…</h3>
            <p className="text-lg leading-relaxed">
              In <code>logging_lib.sh</code>, why do we use <code>echo ... &gt;&amp;2</code> for errors?
              What happens if a function prints something instead of using return values?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try modifying <code>backup_using_lib.sh</code> to source the library using a relative path,
              then move the script to another directory. Does it still work? How can you fix it?
            </p>
          </div>
        </section>

        {/* ---------- TEACHER'S NOTE ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-amber-900/20 light:bg-amber-50 border border-amber-700",
            "hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] transition-shadow"
          )}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <span className="text-6xl">🧑‍🏫</span>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Teacher's Note</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-lg">
                <p><span className="font-semibold">Sukanta Hui</span></p>
                <p>📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                <p>🧰 Programming, RDBMS, OS, Web</p>
                <p>⏳ {experience} years (since 1998)</p>
              </div>
              <p className="text-lg leading-relaxed mt-4">
                “When <span className="text-blue-400">Debangshu</span> first refactored his backup script
                to use our logging library, he accidentally left debug echoes. We caught it in code review.
                That's the power of reuse: one fix benefits everyone. Teach your students in{" "}
                <span className="italic">Naihati</span> to think in libraries, not just scripts.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #DRY
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #ModularShell
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #LocalVariables
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Reusable Script Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-amber-400">
            <li>Functions use `local` variables.</li>
            <li>Libraries have a guard against multiple sourcing.</li>
            <li>Configuration is separated (no hard‑coded paths).</li>
            <li>Scripts return meaningful exit codes.</li>
            <li>Error messages go to stderr.</li>
            <li>Help/usage message is provided.</li>
            <li>Library can be sourced from anywhere (relative path resolved).</li>
            <li>No unintended side effects (global namespace pollution).</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Mini Project – Automated backup script (Topic32)</p>
        </footer>
      </div>
    </>
  );
};

export default Topic31;