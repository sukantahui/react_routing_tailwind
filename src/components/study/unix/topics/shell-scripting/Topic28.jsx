import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic28_files/
import validateInputSh from "./topic28_files/validate_input.sh?raw";
import secureTempSh from "./topic28_files/secure_temp.sh?raw";
import setOptionsSh from "./topic28_files/set_options.sh?raw";
import quotingExampleSh from "./topic28_files/quoting_example.sh?raw";

/**
 * Component: Topic28
 * Purpose: Teach defensive and secure shell scripting practices.
 * Prototype: function Topic28(): JSX.Element
 * Return: Fully styled section with explanations, examples, and interactive hints.
 *
 * Concepts covered:
 *   - Input validation & quoting
 *   - Safe temporary files & traps
 *   - Strict mode (set -euo pipefail)
 *   - Avoiding eval, injection risks, and common pitfalls
 */
const Topic28 = () => {
  // Teacher's experience – calculated dynamically from 1998
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <>
      {/* Custom keyframes for section reveal – zero config, no external CSS */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes softPulse {
          0% { filter: drop-shadow(0 0 2px rgba(59,130,246,0.3)); }
          50% { filter: drop-shadow(0 0 8px rgba(59,130,246,0.6)); }
          100% { filter: drop-shadow(0 0 2px rgba(59,130,246,0.3)); }
        }
      `}</style>

      {/* MAIN CONTAINER – dark mode default, light mode override */}
      <div
        className={clsx(
          "max-w-7xl mx-auto px-4 py-12 space-y-16",
          "bg-gray-900 text-gray-100", // dark default
          "light:bg-white light:text-gray-900" // light override
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
            🛡️ Defensive & Secure Shell Scripting
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Write scripts that resist failures, unexpected input, and malicious
            injection – just like building a sturdy school gate in{" "}
            <span className="text-blue-400 light:text-blue-600">Barrackpore</span>
            {" "}or a clean student attendance system.
          </p>
          <div className="flex justify-center pt-4">
            {/* Semantic SVG: shield + validation flow */}
            <svg
              width="280"
              height="140"
              viewBox="0 0 280 140"
              className="drop-shadow-xl hover:scale-105 transition-transform duration-300"
              aria-label="Defensive scripting concept: input validation, quoting, secure temp files"
            >
              {/* Background shield – hover pulse via <animate> */}
              <g id="shieldGroup">
                <path
                  d="M40,20 L120,10 L200,20 L200,80 Q140,130 40,80 Z"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="light:stroke-blue-700"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;20;0"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="mouseover"
                    end="mouseout"
                  />
                </path>
                {/* Lock icon */}
                <rect
                  x="110"
                  y="45"
                  width="20"
                  height="16"
                  rx="3"
                  fill="#3b82f6"
                  opacity="0.9"
                >
                  <animate
                    attributeName="y"
                    values="45;43;45"
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin="mouseover"
                  />
                </rect>
                <circle cx="120" cy="40" r="6" fill="#1e293b" />
              </g>

              {/* Input validation flow – arrow + check */}
              <g transform="translate(160, 30)">
                <rect
                  x="0"
                  y="10"
                  width="70"
                  height="30"
                  rx="6"
                  fill="#0f172a"
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                  className="light:fill-gray-100 light:stroke-blue-500"
                />
                <text x="12" y="31" fontSize="12" fill="#e2e8f0" className="light:fill-gray-800">
                  user input
                </text>
                <polygon
                  points="78,25 88,25 83,15"
                  fill="#60a5fa"
                  className="light:fill-blue-600"
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </polygon>
                <text x="100" y="30" fontSize="14" fill="#4ade80" fontWeight="bold">
                  ✓
                </text>
              </g>

              {/* Quoting example: "$var" */}
              <g transform="translate(30, 100)">
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="26"
                  rx="4"
                  fill="#1e293b"
                  className="light:fill-gray-200"
                />
                <text x="8" y="18" fontSize="14" fill="#facc15" fontFamily="monospace">
                  {"$var"}
                </text>
                <text x="45" y="18" fontSize="14" fill="#94a3b8" fontFamily="monospace">
                  → "quoted"
                </text>
              </g>
            </svg>
          </div>
        </header>

        {/* ---------- PRINCIPLES GRID (staggered animation) ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            🔒 Core Defensive Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Validate & Quote",
                desc: "Always validate input format; always double‑quote variable expansions.",
                icon: "🔎",
              },
              {
                title: "Fail Early & Cleanly",
                desc: "Use `set -euo pipefail` to catch unset vars, pipeline errors, and abrupt exits.",
                icon: "⚡",
              },
              {
                title: "Secure Temp Files",
                desc: "Never guess temp names – use `mktemp` and `trap` for guaranteed cleanup.",
                icon: "🧹",
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className={clsx(
                  "p-6 rounded-xl border border-gray-700 light:border-gray-200",
                  "bg-gray-800 light:bg-gray-50",
                  "hover:shadow-[0_8px_20px_-6px_rgba(59,130,246,0.5)] hover:scale-[1.02]",
                  "transition-all duration-300",
                  "motion-safe:animate-[fadeSlideUp_0.5s_ease-out]",
                  `motion-safe:animate-delay-[${idx * 150}ms]`
                )}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 light:text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- REAL‑WORLD CONTEXT (student scenario) ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 light:from-blue-50 light:to-gray-100",
            "border border-blue-800 light:border-blue-300",
            "motion-safe:animate-[fadeIn_0.8s_ease-out]"
          )}
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
            <span className="text-3xl">🏫</span> From the Classroom
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              When{" "}
              <span className="text-blue-400 light:text-blue-700 font-semibold">
                Tuhina
              </span>{" "}
              wrote a script to collect assignment submissions, she used{" "}
              <code className="bg-gray-900 light:bg-gray-200 px-2 py-1 rounded">
                rm -rf $folder/*
              </code>{" "}
              – but the variable was empty. The whole parent directory vanished.
            </p>
            <p>
              <span className="text-blue-400 light:text-blue-700 font-semibold">
                Debangshu
              </span>{" "}
              built a log rotator for the school server in{" "}
              <span className="italic">Ichapur</span>. Without proper quoting,
              a filename with a space crashed the cron job. A single pair of
              double quotes saved the day.
            </p>
            <p className="font-medium text-gray-200 light:text-gray-800">
              ✅ Defensive scripting isn't paranoia – it's professionalism.
            </p>
          </div>
        </section>

        {/* ---------- EXAMPLE SCRIPTS (ShellFileLoader) ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            📜 Scripts in Action
          </h2>

          <ShellFileLoader
            fileModule={validateInputSh}
            title="Example 1: Input Validation & Quoting"
            highlightLines={[8, 16]} // regex check and quoting
          />
          <ShellFileLoader
            fileModule={secureTempSh}
            title="Example 2: Secure Temp Files + Trap Cleanup"
            highlightLines={[4, 10, 13]} // trap, mktemp, cleanup
          />
          <ShellFileLoader
            fileModule={setOptionsSh}
            title="Example 3: Strict Mode (set -euo pipefail)"
            highlightLines={[2, 9]} // set options, false command
          />
          <ShellFileLoader
            fileModule={quotingExampleSh}
            title="Example 4: Quoting Pitfalls and Fixes"
            highlightLines={[5, 9]} // unquoted vs quoted
          />
        </section>

        {/* ---------- COMMON PITFALLS (grid, hover animation) ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Common Pitfalls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Unquoted variable expansions → word splitting, globbing",
              "Using `eval` on external input (command injection)",
              "Hard‑coded temporary file names (race conditions)",
              "Ignoring exit codes – script continues after failure",
              "`set -e` alone doesn't catch pipe errors (use `set -o pipefail`)",
              "Reading `$REPLY` without `-r` – backslashes interpreted",
            ].map((pitfall, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-5 flex items-start gap-4 rounded-lg",
                  "bg-red-900/20 light:bg-red-50",
                  "border border-red-800 light:border-red-300",
                  "hover:bg-red-900/30 light:hover:bg-red-100",
                  "transition-all duration-200"
                )}
              >
                <span className="text-red-400 light:text-red-600 text-xl">⚠️</span>
                <span className="leading-relaxed">{pitfall}</span>
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
              "Always start with `#!/bin/bash` and `set -euo pipefail`",
              "Quote everything: `\"$var\"`, `\"$(command)\"`, `\"$@\"`",
              "Use `[[ ... ]]` over `[ ... ]` for safer string tests",
              "Create temp files with `mktemp` and `trap cleanup EXIT`",
              "Validate input with regex (`=~`) or case statements",
              "Never parse `ls`; use globs or `find -exec`",
              "Make scripts `shellcheck`‑clean before deployment",
            ].map((practice, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded hover:bg-gray-800 light:hover:bg-gray-100 transition-colors"
              >
                <span className="text-green-400 light:text-green-600 text-xl">✓</span>
                <span>{practice}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PROFESSIONAL TIPS & TRICKS ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-yellow-800 light:border-yellow-300 pb-3 inline-block">
            🧠 Tips & Tricks
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>ShellCheck integration</strong> – integrate into your editor; it catches
              ~70% of security issues instantly.
            </p>
            <p>
              🔹 <strong>Use `readonly` and `declare -r`</strong> for constants – prevents
              accidental overwrites.
            </p>
            <p>
              🔹 <strong>Debug with `set -x`</strong> only temporarily; never commit scripts with
              it enabled.
            </p>
            <p>
              🔹 <strong>Prefer `printf` over `echo`</strong> for portable, predictable output.
            </p>
            <p>
              🔹 <strong>Mind the `IFS`</strong> – restore it after changes:
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-3 rounded">
                {`OLDIFS="$IFS"; IFS=','; ...; IFS="$OLDIFS"`}
              </code>
            </p>
          </div>
        </section>

        {/* ---------- HINT SECTION (subtle guidance) ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-indigo-900/20 light:bg-indigo-50",
            "border border-indigo-700 light:border-indigo-300",
            "flex flex-col md:flex-row gap-6 items-start"
          )}
        >
          <span className="text-5xl">💡</span>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">Observe carefully…</h3>
            <p className="text-lg leading-relaxed">
              In <code className="bg-gray-800 light:bg-gray-200 px-3 py-1 rounded">
                validate_input.sh
              </code>, what happens if we omit the quotes around{" "}
              <code className="bg-gray-800 light:bg-gray-200 px-2 py-1 rounded">"$1"</code>?
              Try changing the username to <kbd className="bg-gray-700 light:bg-gray-300 px-2 py-0.5 rounded">*</kbd>.
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Think about word splitting and pathname expansion – the two silent killers.
            </p>
          </div>
        </section>

        {/* ---------- TEACHER'S NOTE (mandatory) ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-amber-900/20 light:bg-amber-50",
            "border border-amber-700 light:border-amber-300",
            "hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] transition-shadow duration-300"
          )}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <span className="text-6xl">🧑‍🏫</span>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Teacher's Note</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-lg">
                <p>
                  <span className="font-semibold">Sukanta Hui</span>
                </p>
                <p>
                  📧 sukantahui@codernaccotax.co.in | 📞 7003756860
                </p>
                <p>
                  🧰 Programming, RDBMS, OS, Web
                </p>
                <p>
                  ⏳ {experience} years (since 1998)
                </p>
              </div>
              <p className="text-lg leading-relaxed mt-4">
                “Defensive scripting is a mindset. I tell my students in{" "}
                <span className="italic">Shyamnagar</span> and{" "}
                <span className="italic">Naihati</span> to pretend every variable
                is empty, every filename contains spaces, and every user is a
                hacker. After 27+ years, this habit has saved countless production
                systems.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #QuoteAllTheThings
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #FailFast
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #ShellCheck
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            ✅ Mini Checklist – what to remember
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-blue-400 light:marker:text-blue-600">
            <li>Always double‑quote variable expansions and command substitutions</li>
            <li>Start every new script with `set -euo pipefail`</li>
            <li>Validate input against a whitelist (regex/case)</li>
            <li>Use `mktemp` + `trap` for temporary files</li>
            <li>Avoid `eval`, backticks, and `ls` parsing</li>
            <li>Run `shellcheck` before committing</li>
            <li>Prefer `[[ ]]` over `[ ]` for test conditions</li>
          </ul>
        </section>

        {/* ---------- FOOTER / CONTINUATION ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Portable shell scripting (bash vs sh) – Topic29</p>
        </footer>
      </div>
    </>
  );
};

export default Topic28;