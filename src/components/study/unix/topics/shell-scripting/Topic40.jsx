import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic40_files/
import debuggingDemoSh from "./topic40_files/debugging_demo.sh?raw";
import debuggingTricksSh from "./topic40_files/debugging_tricks.sh?raw";

/**
 * Component: Topic40
 * Purpose: Example Script – Debugging with set -x.
 *          Demonstrates how to trace execution, inspect variables,
 *          and systematically debug shell scripts.
 * Prototype: function Topic40(): JSX.Element
 * Return: Full educational section with script walkthrough and professional insights.
 *
 * Prerequisites: All topics 0–39
 */
const Topic40 = () => {
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
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes magnifyGlow {
          0% { filter: drop-shadow(0 0 2px rgba(96,165,250,0.5)); }
          50% { filter: drop-shadow(0 0 12px rgba(96,165,250,0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(96,165,250,0.5)); }
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
            🔍 Example Script: <span className="text-blue-400">Debugging with set -x</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            When scripts misbehave, you need X‑ray vision. 
            <span className="text-blue-400"> Tuhina</span> in <span className="italic">Ichapur</span> and
            <span className="text-blue-400"> Debangshu</span> in <span className="italic">Barrackpore</span> 
            use <code>set -x</code> to see exactly what the shell is doing – and fix bugs in minutes.
          </p>

          {/* SVG: Magnifying glass over code with +x tracing */}
          <div className="flex justify-center pt-6">
            <svg
              width="340"
              height="140"
              viewBox="0 0 340 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Magnifying glass over shell code showing traced lines"
            >
              {/* Magnifying glass handle */}
              <g transform="translate(240, 60)">
                <rect x="0" y="0" width="30" height="6" rx="3" fill="#9ca3af" transform="rotate(45)" />
                <circle cx="-8" cy="22" r="18" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" values="0;20;0" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="-8" cy="22" r="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
              </g>

              {/* Code lines with + signs (trace output) */}
              <g transform="translate(40, 30)">
                <rect x="0" y="0" width="160" height="80" rx="6" fill="#1e293b" stroke="#4b5563" />
                <text x="15" y="20" fontSize="12" fill="#e0e7ff" fontFamily="monospace">
                  + [[ -f config.sh ]]
                </text>
                <text x="15" y="40" fontSize="12" fill="#e0e7ff" fontFamily="monospace">
                  + source config.sh
                </text>
                <text x="15" y="60" fontSize="12" fill="#e0e7ff" fontFamily="monospace">
                  + BACKUP_DIR=/backup
                </text>
              </g>

              {/* set -x badge */}
              <g transform="translate(120, 110)">
                <rect x="0" y="0" width="70" height="22" rx="11" fill="#312e81" />
                <text x="15" y="17" fontSize="12" fill="#e0e7ff">set -x</text>
              </g>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: WHY DEBUGGING IS A SKILL ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            🧠 Debugging = Understanding What Actually Happens
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="text-amber-400">`set -x`</span> (or <code>set -o xtrace</code>) prints each command
                and its arguments after expansion, prefixed with <code>+</code>. It's the single most useful
                tool for diagnosing shell script problems.
              </p>
              <p>
                <span className="text-blue-400">Swadeep</span> once spent hours on a condition that never evaluated
                true. One line of <code>set -x</code> revealed that a variable contained a trailing newline – invisible
                in normal output, but obvious in trace mode.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-blue-700",
                "hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Quick Start
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li><code>bash -x script.sh</code> – run with tracing from start</li>
                <li><code>set -x; ...; set +x</code> – trace only a section</li>
                <li><code>#!/bin/bash -x</code> – permanent trace (not recommended)</li>
                <li><code>{`PS4='+\${BASH_SOURCE}:\${LINENO}: '`}</code> – custom trace prefix</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT: BASIC DEBUGGING DEMO ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            📜 debugging_demo.sh – Tracing Functions and Loops
          </h2>
          <ShellFileLoader
            fileModule={debuggingDemoSh}
            title="🐞 debugging_demo.sh – Before and after set -x"
            highlightLines={[4, 15, 22]} // set -x, function trace, loop trace
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
            <div><span className="font-bold">🔹 No tracing</span> – normal output</div>
            <div><span className="font-bold">🔹 With set -x</span> – each step printed</div>
            <div><span className="font-bold">🔹 Function calls</span> – see arguments passed</div>
            <div><span className="font-bold">🔹 Variable expansion</span> – see actual values</div>
            <div><span className="font-bold">🔹 Loop iterations</span> – track index</div>
          </div>
        </section>

        {/* ---------- SCRIPT: ADVANCED DEBUGGING TRICKS ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-purple-800 light:border-purple-300 pb-3 inline-block">
            🎩 debugging_tricks.sh – Custom PS4, trap DEBUG, Selective Tracing
          </h2>
          <ShellFileLoader
            fileModule={debuggingTricksSh}
            title="🔧 debugging_tricks.sh – Professional debugging techniques"
            highlightLines={[5, 11, 17, 22]} // custom PS4, trap DEBUG, selective tracing
          />
          <p className="text-lg leading-relaxed">
            For complex scripts, basic <code>set -x</code> can be too noisy. These techniques let you
            focus on what matters: line numbers, file names, conditional tracing, and even breaking
            on specific conditions.
          </p>
        </section>

        {/* ---------- COMMON PITFALLS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Debugging Pitfalls – Avoid These
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Leaving `set -x` enabled in production scripts (exposes internal data).",
              "❌ Forgetting that `set -x` outputs to stderr – may fill logs if not redirected.",
              "❌ Assuming `+` is part of the command output, not the trace marker.",
              "❌ Not quoting variables – trace shows the expanded values, but may mislead if word splitting occurs.",
              "❌ Using `set -x` with `set -e` – the trace may exit unexpectedly on error.",
              "❌ Overwhelming output – trace every line instead of focusing on suspicious sections.",
              "❌ Not preserving exit codes when inserting debug code (`|| true` can mask errors).",
            ].map((pitfall, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-4 rounded-lg border border-red-800 light:border-red-300",
                  "bg-red-900/10 light:bg-red-50",
                  "hover:bg-red-900/20 light:hover:bg-red-100 transition-colors"
                )}
              >
                <span className="text-red-400 light:text-red-700">{pitfall}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- BEST PRACTICES ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ Debugging Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "🔹 Use `bash -x script.sh` for one‑off debugging runs.",
              "🔹 Wrap trace sections with `set -x` / `set +x` – don't trace the whole script.",
              "🔹 Customize `PS4` to include line numbers and function names.",
              "🔹 Redirect trace output to a file: `exec 5> debug.log; BASH_XTRACEFD=5`.",
              "🔹 Use `trap DEBUG` to run a command before every statement (e.g., print variable).",
              "🔹 Keep a clean version of the script without debug code in version control.",
              "🔹 Combine `set -x` with `set -v` to see raw lines before expansion.",
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
            🧠 Pro Tips – Advanced Debugging
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Use `PS4` to show line numbers and function stack.</strong> Example:
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-2 rounded">
                {`export PS4='+\${BASH_SOURCE}:\${LINENO}: \${FUNCNAME[0]:+\${FUNCNAME[0]}(): }'`}
              </code>
              This pinpoints exactly where each trace line originates.
            </p>
            <p>
              🔹 <strong>Conditional debugging with `if` and a variable.</strong> Define a debug flag:
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-2 rounded">
                [[ "$DEBUG" == 1 ]] &amp;&amp; set -x
              </code>
              Enable only when needed: <code>DEBUG=1 ./script.sh</code>.
            </p>
            <p>
              🔹 <strong>Use `trap DEBUG` to create a breakpoint.</strong> 
              <code>trap 'echo "Stopped at line $LINENO"; read -p "Continue? "' DEBUG</code> – this pauses before each line.
            </p>
            <p>
              🔹 <strong>Log trace to a separate file.</strong> Preserve your terminal output:
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-2 rounded">
                exec 5&gt; trace.log; BASH_XTRACEFD=5; set -x
              </code>
            </p>
            <p>
              🔹 <strong>For POSIX sh,</strong> there's no `PS4`; use `sh -x script.sh` or manually insert
              `echo "DEBUG: ..."` statements.
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
            <h3 className="text-2xl font-bold">Observe carefully…</h3>
            <p className="text-lg leading-relaxed">
              In <code>debugging_tricks.sh</code>, we set <code>PS4='+ $BASH_SOURCE:$LINENO '</code>.
              What does <code>$BASH_SOURCE</code> contain? How does it differ from <code>$0</code>?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try adding a <code>trap DEBUG</code> that prints the value of a variable before each command.
              Can you make it conditional so it only triggers when the variable is empty?
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
                “For <span className="font-semibold">{experience} years</span>, I've watched students stare at
                broken scripts. The moment they learn <code>set -x</code>, their debugging time drops from hours to minutes.
                <span className="text-blue-400">Abhronila</span> in <span className="italic">Shyamnagar</span> now starts
                every debugging session with <code>bash -x</code> – she calls it her ‘superpower’. It really is.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #bash_x
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #xtrace
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #PS4
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Debugging Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-blue-400">
            <li>Run with `bash -x script.sh` to see full trace.</li>
            <li>Wrap suspicious sections with `set -x` … `set +x`.</li>
            <li>Customize `PS4` to show line numbers and source file.</li>
            <li>Redirect trace output to a file if it's too verbose.</li>
            <li>Never commit `set -x` to production code.</li>
            <li>Combine with `set -v` to see original source lines.</li>
            <li>Use `trap DEBUG` for breakpoint‑like debugging.</li>
            <li>Test one fix at a time; don't change multiple things simultaneously.</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Example Script – Signal handling using trap (Topic41)</p>
        </footer>
      </div>
    </>
  );
};

export default Topic40;