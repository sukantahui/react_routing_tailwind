// Topic42.jsx
import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// ----------------------------------------------------------------------
// Inline raw XONSH scripts – in a real project these would be separate
// .xsh files imported with `?raw` (e.g. via Vite).
// We keep them as constants here to make the component self-contained.
// ----------------------------------------------------------------------
const xonshHelloScript = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Hello from XONSH – mixing Python and shell seamlessly
# ----------------------------------------------------------------------
echo "Welcome to XONSH, the Python-powered shell!"

# Shell command: list files
files = $(ls -la)
print(f"📁 Found {len(files.splitlines())} files in current directory")

# Python expression right in the prompt
answer = 42
print(f"The answer is @(answer)")`;

const xonshComprehensionScript = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Python list comprehension inside a shell script
# ----------------------------------------------------------------------
# Imagine Swadeep needs to filter even numbers and square them
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [x**2 for x in numbers if x % 2 == 0]
echo "Even squares: @(squares)"

# Real‑world: count large log files in /var/log
log_files = $(ls /var/log/*.log 2>/dev/null).splitlines()
large_logs = [f for f in log_files if $(du -k @(f) | cut -f1) > 1024]
echo "Logs >1MB: @(len(large_logs))"`;

const xonshEnvScript = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Environment variable handling – like Python dicts
# ----------------------------------------------------------------------
$CITY = "Barrackpore"
echo "We are coding in $CITY"

# Append to PATH (no export needed)
$PATH.append("/home/tuhina/.local/bin")
echo "PATH now contains: $PATH"

# Access Python environment
import os
print(f"Current user: {os.getlogin()}")`;

// ----------------------------------------------------------------------
// Teacher's experience calculation (from 1998)
// ----------------------------------------------------------------------
const currentYear = new Date().getFullYear();
const teachingYears = currentYear - 1998;

// ----------------------------------------------------------------------
// Inline keyframes for zero‑config Tailwind animations
// ----------------------------------------------------------------------
const animationStyles = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes gentlePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.75; }
  }
  .animate-fadeSlideUp {
    animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
  }
  .animate-gentlePulse {
    animation: gentlePulse 3s ease-in-out infinite;
  }
`;

// ----------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------
const Topic42 = () => {
  return (
    <>
      <style>{animationStyles}</style>

      <div
        className={clsx(
          "max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8",
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
          "transition-colors duration-300"
        )}
      >
        {/* ----- HEADER (staggered) ----- */}
        <div className="space-y-3 mb-10 animate-fadeSlideUp [animation-delay:0ms]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-700">
              Topic 42
            </span>
            <span className="px-3 py-1 text-xs font-mono bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-700">
              XONSH
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            XONSH: Unix Shell with{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Python Integration
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            A shell that speaks both Bash <strong>and</strong> Python. No more
            awk/sed for simple data structures — use lists, dicts, and
            comprehensions directly in your terminal.
          </p>
        </div>

        {/* ----- CONCEPTUAL EXPLANATION (staggered) ----- */}
        <section
          className={clsx(
            "mb-12 p-6 rounded-xl",
            "bg-gray-50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700",
            "animate-fadeSlideUp [animation-delay:100ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🐍</span> What & Why?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column – explanation */}
            <div className="space-y-4">
              <p className="leading-relaxed">
                <strong className="text-indigo-600 dark:text-indigo-400">
                  XONSH
                </strong>{" "}
                is a command‑line shell and scripting language that fuses Unix
                commands with Python. Every line is parsed both as a shell
                pipeline <em>and</em> as a Python expression – you decide the
                mode.
              </p>
              <p className="leading-relaxed">
                Imagine <strong>Swadeep</strong> needs to filter files by
                extension and then run a Python regex on their content.
                Instead of wrapping Python in a subshell, he writes:
              </p>
              <div className="bg-gray-800/10 dark:bg-gray-900/50 p-3 rounded font-mono text-sm">
                {`files = $(ls *.txt)\nfor f in files:\n    if re.search(r'error', $(cat @(f))):\n        print(f"⚠️ {f}")`}
              </div>
              <p className="leading-relaxed">
                <strong>Why industry loves it?</strong> Data scientists,
                DevOps engineers, and sysadmins at{" "}
                <em>Ichapur, Naihati</em> and beyond use XONSH to prototype
                pipelines, manage cloud infrastructure, and process logs —
                without context‑switching.
              </p>
            </div>

            {/* Right column – semantic SVG with <animate> */}
            <div className="flex items-center justify-center p-2 group">
              <svg
                width="280"
                height="160"
                viewBox="0 0 280 160"
                className="w-full max-w-xs"
                aria-label="XONSH integration diagram"
              >
                {/* Shell commands box */}
                <rect
                  x="10"
                  y="30"
                  width="80"
                  height="60"
                  rx="8"
                  fill="#374151"
                  className="dark:fill-gray-700 group-hover:fill-indigo-800/50 transition-all duration-300"
                />
                <text x="22" y="60" fill="#E5E7EB" fontSize="12">
                  ls -l
                </text>
                <text x="22" y="80" fill="#E5E7EB" fontSize="12">
                  grep error
                </text>

                {/* Python box */}
                <rect
                  x="190"
                  y="30"
                  width="80"
                  height="60"
                  rx="8"
                  fill="#374151"
                  className="dark:fill-gray-700 group-hover:fill-amber-800/50 transition-all duration-300"
                />
                <text x="202" y="60" fill="#E5E7EB" fontSize="12">
                  [x**2 for x]
                </text>
                <text x="202" y="80" fill="#E5E7EB" fontSize="12">
                  dict.items()
                </text>

                {/* Plus sign with gentle pulse animation */}
                <text
                  x="130"
                  y="60"
                  fontSize="28"
                  fill="#818CF8"
                  className="dark:fill-indigo-400 animate-gentlePulse"
                >
                  +
                </text>

                {/* Arrow with motion */}
                <line
                  x1="110"
                  y1="120"
                  x2="170"
                  y2="120"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="x2"
                    from="120"
                    to="180"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x1"
                    from="100"
                    to="160"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>

                {/* XONSH box – destination */}
                <rect
                  x="100"
                  y="100"
                  width="80"
                  height="40"
                  rx="8"
                  fill="#4F46E5"
                  className="dark:fill-indigo-600 group-hover:fill-indigo-500 transition-all"
                />
                <text x="120" y="126" fill="white" fontSize="14" fontWeight="bold">
                  XONSH
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ----- CODE EXAMPLES (ShellFileLoader) ----- */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold mb-2 animate-fadeSlideUp [animation-delay:200ms]">
            ⚡ XONSH in action
          </h2>

          <div
            className={clsx(
              "grid md:grid-cols-2 gap-6",
              "animate-fadeSlideUp [animation-delay:300ms]"
            )}
          >
            <ShellFileLoader
              fileModule={xonshHelloScript}
              title="Hello, XONSH – Python & Shell mix"
              highlightLines={[6, 9]}
            />
            <ShellFileLoader
              fileModule={xonshComprehensionScript}
              title="List comprehension inside shell"
              highlightLines={[5, 10]}
            />
          </div>
          <div
            className={clsx(
              "grid md:grid-cols-1 lg:grid-cols-2 gap-6",
              "animate-fadeSlideUp [animation-delay:400ms]"
            )}
          >
            <ShellFileLoader
              fileModule={xonshEnvScript}
              title="Environment as Python dict"
              highlightLines={[3, 6]}
            />
            {/* Placeholder for another example – could be expanded */}
            <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <span className="text-sm">More examples in Topic 44–46</span>
            </div>
          </div>
        </section>

        {/* ----- TIPS, PITFALLS, BEST PRACTICES (cards) ----- */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Tips card */}
          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:500ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💡</span>
              <h3 className="font-semibold text-lg">Pro Tips</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Use <code className="text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">@()</code>{" "}
                  to interpolate Python variables into shell commands.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  <code className="text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">$PATH</code>{" "}
                  is a real Python list – <code>.append()</code>, <code>.remove()</code> work.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Keep interactive config in{" "}
                  <code className="text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">~/.xonshrc</code>.
                </span>
              </li>
            </ul>
          </div>

          {/* Common pitfalls card */}
          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:600ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚠️</span>
              <h3 className="font-semibold text-lg">Common Pitfalls</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Subshell confusion:</strong> <code>$(command)</code> in XONSH is Python
                  subprocess, not command substitution. Use <code>$()</code> (with space?) – actually
                  just <code>$(ls)</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Mixing Python and shell globbing:</strong> <code>*.txt</code> is shell
                  glob; Python needs <code>glob.glob</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Shebang:</strong> use <code>#!/usr/bin/env xonsh</code>, not <code>bash</code>.
                </span>
              </li>
            </ul>
          </div>

          {/* Best practices card */}
          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:700ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✅</span>
              <h3 className="font-semibold text-lg">Best Practices</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Use Python f‑strings for readability:{" "}
                  <code>{`f"Found {len(files)} items"`}</code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Keep shell‑heavy parts in separate aliases, Python‑heavy parts in functions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Test scripts with <code>xonsh -c</code> before deployment.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ----- MINI CHECKLIST ----- */}
        <section
          className={clsx(
            "mb-12 p-6 rounded-xl",
            "bg-indigo-50 dark:bg-indigo-900/20",
            "border border-indigo-200 dark:border-indigo-800",
            "animate-fadeSlideUp [animation-delay:800ms]"
          )}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span> Mini Checklist – XONSH Essentials
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "I can run both shell commands and Python expressions in the same line.",
              "I know the difference between `$(command)` (subprocess) and `$()` (environment var).",
              "I can manipulate `$PATH` as a Python list.",
              "I can use Python list/dict comprehensions in scripts.",
              "I have a working `~/.xonshrc` with my aliases.",
              "I remember to use `@()` for variable interpolation.",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-indigo-500 dark:text-indigo-300 mt-0.5">◻️</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ----- TEACHER'S NOTE (with hover effect) ----- */}
        <section
          className={clsx(
            "mb-10 p-6 rounded-xl",
            "bg-amber-50 dark:bg-amber-900/20",
            "border border-amber-200 dark:border-amber-800",
            "hover:shadow-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30",
            "transition-all duration-300",
            "animate-fadeSlideUp [animation-delay:900ms]"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🧑‍🏫</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Teacher's Note</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Sukanta Hui</strong> • {teachingYears} years of programming & systems
                education (since 1998)
                <br />
                <span className="font-mono text-xs">
                  sukantahui@codernaccotax.co.in • 📱 7003756860
                </span>
              </p>
              <p className="leading-relaxed">
                XONSH is a brilliant gateway to show students like{" "}
                <strong>Debangshu</strong> and <strong>Abhronila</strong> that “shell” is not
                fixed to Bash – it's an interface. When they realise they can use Python's{" "}
                <code>re</code> or <code>json</code> modules without a separate script, their
                automation skills leap forward. I recommend introducing XONSH after they've
                mastered basic Bash; then contrast the two approaches. The "Python-first"
                thinking reduces errors in data‑heavy tasks.
              </p>
            </div>
          </div>
        </section>

        {/* ----- HINT SECTION (subtle) ----- */}
        <div
          className={clsx(
            "text-sm p-5 rounded-lg",
            "bg-gray-100 dark:bg-gray-800/60",
            "border border-gray-300 dark:border-gray-600",
            "animate-fadeSlideUp [animation-delay:1000ms]"
          )}
        >
          <span className="font-semibold block mb-1">🔍 Think about…</span>
          <p>
            How would you parse a CSV file in a pure Bash script? In XONSH, you can simply import
            <code className="mx-1 text-xs">csv</code> and use Python's reader. Try rewriting a
            complex pipeline from Topic 19 (pipes) in XONSH – what becomes simpler?
          </p>
        </div>

        {/* ----- FOOTER / CONTINUATION ----- */}
        <div className="mt-12 pt-6 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 text-center">
          <p>
            Next: <strong>Topic 43 – XONSH Installation</strong> (config, package managers) and
            hands‑on examples in Topics 44–46.
          </p>
        </div>
      </div>
    </>
  );
};

export default Topic42;