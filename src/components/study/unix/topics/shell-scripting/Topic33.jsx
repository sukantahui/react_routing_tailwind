import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic33_files/
import mistakesDemoSh from "./topic33_files/mistakes_demo.sh?raw";
import correctedDemoSh from "./topic33_files/corrected_demo.sh?raw";
import pitfallArraySh from "./topic33_files/pitfall_array.sh?raw";
import defensiveTemplateSh from "./topic33_files/defensive_template.sh?raw";
import shellcheckExampleSh from "./topic33_files/shellcheck_example.sh?raw";

/**
 * Component: Topic33
 * Purpose: Summarise the most common shell scripting mistakes and
 *          establish a canon of best practices.
 * Prototype: function Topic33(): JSX.Element
 * Return: Full educational section with before/after examples,
 *         professional insights, and a reusable template.
 *
 * Prerequisites: All topics 0–32
 */
const Topic33 = () => {
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        @keyframes checkmark {
          0% { stroke-dashoffset: 20; }
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
            ⚠️ Common Shell Scripting Mistakes<br />& <span className="text-green-400">Best Practices</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            What every student in <span className="text-blue-400">Barrackpore</span>,{" "}
            <span className="text-blue-400">Shyamnagar</span>, and every production server wishes
            they knew from day one.
          </p>

          {/* SVG: Before/After – Broken script → Fixed script with shield */}
          <div className="flex justify-center pt-6">
            <svg
              width="380"
              height="140"
              viewBox="0 0 380 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="From broken script (red cross) to robust script (green check)"
            >
              {/* Left: broken script */}
              <g transform="translate(20, 40)">
                <rect x="0" y="0" width="70" height="50" rx="8" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                <text x="18" y="32" fontSize="14" fill="#fee2e2">script.sh</text>
                {/* Red X */}
                <line x1="10" y1="10" x2="30" y2="30" stroke="#ef4444" strokeWidth="3" />
                <line x1="30" y1="10" x2="10" y2="30" stroke="#ef4444" strokeWidth="3" />
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
              </g>

              {/* Arrow */}
              <line x1="100" y1="65" x2="140" y2="65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Right: fixed script */}
              <g transform="translate(160, 40)">
                <rect x="0" y="0" width="70" height="50" rx="8" fill="#14532d" stroke="#4ade80" strokeWidth="2" />
                <text x="18" y="32" fontSize="14" fill="#dcfce7">script.sh</text>
                {/* Green check */}
                <polyline points="10,25 20,35 35,15" stroke="#4ade80" strokeWidth="3" fill="none">
                  <animate attributeName="stroke-dashoffset" values="20;0" dur="0.5s" fill="freeze" begin="mouseover" />
                </polyline>
              </g>

              {/* Shield around fixed script */}
              <path d="M195 25 L210 18 L225 25 L225 50 Q210 70 195 50 Z" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="5 3">
                <animate attributeName="stroke-dashoffset" values="0;20;0" dur="3s" repeatCount="indefinite" />
              </path>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
              </defs>

              {/* ShellCheck logo hint */}
              <g transform="translate(280, 70)">
                <text x="0" y="0" fontSize="20" fill="#d1d5db">🔍</text>
                <text x="30" y="6" fontSize="12" fill="#9ca3af">ShellCheck</text>
              </g>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: WHY MISTAKES HAPPEN ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-gray-600 pb-3 inline-block">
            🧠 Why Even Good Programmers Write Buggy Shell Scripts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Shell is <span className="text-amber-400">glue code</span> – it often grows organically.
                Unlike compiled languages, there is no compiler to catch type errors or unset variables.
              </p>
              <p>
                <span className="text-blue-400">Tuhina</span> once spent two hours debugging a backup
                script that failed silently – a single unquoted <code>$BACKUP_DIR</code> with a space
                in the path caused <code>rm -rf</code> to delete the wrong folder.
              </p>
              <p>
                Most mistakes fall into a few well‑understood categories. Recognise them, and you’ll
                write scripts that survive in production.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-gray-700",
                "hover:shadow-[0_0_15px_rgba(156,163,175,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span> Top 5 Mistake Categories
              </h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Quoting / word splitting / globbing</li>
                <li>Ignoring exit codes</li>
                <li>Assuming input is safe (no validation)</li>
                <li>Using <code>[ ]</code> vs <code>[[ ]]</code> incorrectly</li>
                <li>Parsing <code>ls</code> / using <code>for i in $(...)</code></li>
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- BEFORE & AFTER SCRIPT PAIR ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            🔁 Before & After: A Real‑World Example
          </h2>
          <ShellFileLoader
            fileModule={mistakesDemoSh}
            title="💥 mistakes_demo.sh – What NOT to do"
            highlightLines={[3, 6, 9, 12, 15]} // unquoted, [ vs [[, ls, backticks, exit ignore
          />
          <ShellFileLoader
            fileModule={correctedDemoSh}
            title="✅ corrected_demo.sh – Professional rewrite"
            highlightLines={[2, 8, 12, 18, 24]} // set -u, quoting, [[ ]], find, exit check
          />
          <div className="bg-blue-900/20 light:bg-blue-50 p-6 rounded-xl border border-blue-700 mt-4">
            <p className="text-lg flex gap-3">
              <span className="text-2xl">🔍</span>
              <span>
                <strong>Observe carefully:</strong> In the fixed version, every variable expansion is quoted,
                <code>[[ ... ]]</code> replaces <code>[ ... ]</code>, and <code>find</code> replaces the
                <code>ls</code> parsing nightmare.
              </span>
            </p>
          </div>
        </section>

        {/* ---------- PITFALL: WORD SPLITTING & GLOBBING ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-yellow-800 light:border-yellow-300 pb-3 inline-block">
            🧨 The Silent Killer: Word Splitting & Pathname Expansion
          </h2>
          <ShellFileLoader
            fileModule={pitfallArraySh}
            title="📁 pitfall_array.sh – When unquoted variables explode"
            highlightLines={[5, 9, 13]} // wrong, wrong, fixed
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-800 light:bg-gray-100 p-5 rounded-lg">
              <span className="font-bold text-red-400">❌ Unquoted</span>
              <pre className="mt-2 text-sm bg-gray-900 light:bg-gray-200 p-2 rounded">
                files=$(ls); for f in $files; do ...
              </pre>
              <p className="mt-2">Breaks on spaces, newlines, glob characters (*).</p>
            </div>
            <div className="bg-gray-800 light:bg-gray-100 p-5 rounded-lg">
              <span className="font-bold text-green-400">✅ Quoted + array</span>
              <pre className="mt-2 text-sm bg-gray-900 light:bg-gray-200 p-2 rounded">
                {`files=(*); for f in "\${{files[@]}}"; do ...`}
              </pre>
              <p className="mt-2">Handles any filename correctly (bash). For POSIX: use `while IFS= read -r`.</p>
            </div>
          </div>
        </section>

        {/* ---------- DEFENSIVE TEMPLATE ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            🛡️ A Bulletproof Script Template
          </h2>
          <ShellFileLoader
            fileModule={defensiveTemplateSh}
            title="📄 defensive_template.sh – Start every new script with this"
            highlightLines={[2, 5, 8, 18, 28]} // set -euo pipefail, IFS, usage, getopts, trap
          />
          <p className="text-lg leading-relaxed">
            This template incorporates everything we've learned: strict mode, help function,
            argument parsing, logging, temporary files, and signal cleanup. Copy it, rename it,
            and you'll never forget the basics again.
          </p>
        </section>

        {/* ---------- SHELLCHECK ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-purple-800 light:border-purple-300 pb-3 inline-block">
            🔬 ShellCheck: Your Tireless Code Reviewer
          </h2>
          <ShellFileLoader
            fileModule={shellcheckExampleSh}
            title="🧪 shellcheck_example.sh – Script that triggers ShellCheck warnings"
            highlightLines={[3, 5, 7]} // SC2086, SC2002, SC2162, etc.
          />
          <div className="bg-purple-900/20 light:bg-purple-50 p-6 rounded-xl border border-purple-700">
            <p className="text-lg">
              <span className="font-bold text-purple-400">Install ShellCheck</span> – 
              <code className="bg-gray-800 light:bg-gray-200 px-3 py-1 mx-2 rounded">sudo apt install shellcheck</code> or 
              <code className="bg-gray-800 light:bg-gray-200 px-3 py-1 rounded">brew install shellcheck</code>.
              Then run <code>shellcheck your_script.sh</code>. It catches 80% of the mistakes we just discussed.
            </p>
          </div>
        </section>

        {/* ---------- COMMON MISTAKES (full list) ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            📋 The Master List of Shell Scripting Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            {[
              { mistake: "Unquoted variable expansion", consequence: "Word splitting, globbing, silent errors" },
              { mistake: "Using `[ ]` instead of `[[ ]]` (in bash)", consequence: "Broken comparisons, need for escaping" },
              { mistake: "Parsing `ls`", consequence: "Fails on special characters; use globs or `find`" },
              { mistake: "Not checking exit codes", consequence: "Script continues after failure, corrupts state" },
              { mistake: "Missing `set -e` / `set -u`", consequence: "Continues on error, uses unset variables" },
              { mistake: "Forgetting `local` in functions", consequence: "Variables leak, cause side effects" },
              { mistake: "Using backticks instead of `$()`", consequence: "Nesting issues, readability" },
              { mistake: "`cat file | grep` (useless use of cat)", consequence: "Unnecessary process; use `< file grep`" },
              { mistake: "Not quoting `$@` / `$*`", consequence: "Arguments with spaces break" },
              { mistake: "Hard‑coding paths", consequence: "Script not portable; use config or relative" },
              { mistake: "No input validation", consequence: "Security risks, unexpected behavior" },
              { mistake: "Using `echo` with arbitrary data", consequence: "Options like `-n` may be interpreted; use `printf`" },
              { mistake: "Not using `--` to separate options from arguments", consequence: "Filenames starting with `-` cause trouble" },
              { mistake: "Assuming `IFS` is default", consequence: "Modified IFS can break loops and expansions" },
              { mistake: "No `trap` for temporary files", consequence: "Leftover files on interruption" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-4 rounded-lg border border-red-800 light:border-red-300",
                  "bg-red-900/10 light:bg-red-50",
                  "hover:bg-red-900/20 light:hover:bg-red-100 transition-colors"
                )}
              >
                <div className="font-bold text-red-400 light:text-red-700">⚠️ {item.mistake}</div>
                <div className="text-sm text-gray-300 light:text-gray-700 mt-1">{item.consequence}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- BEST PRACTICES (condensed) ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ Best Practices – The Short Version
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Always use `#!/bin/bash` (or `#!/bin/sh` with caution)",
              "Start with `set -euo pipefail` and `IFS=$'\\n\\t'`",
              "Quote every variable expansion: `\"$var\"`, `\"$(cmd)\"`",
              "Use `[[ ]]` for tests in bash (fewer surprises)",
              "Prefer `$()` over backticks",
              "Use `for file in *.txt; do` – never parse `ls`",
              "Always check exit status of critical commands",
              "Make functions self‑contained with `local`",
              "Validate all external input",
              "Provide `--help` and usage message",
              "Use `trap` to clean up temporary resources",
              "Run `shellcheck` – treat warnings as errors",
              "Version control your scripts (Git!)",
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 rounded hover:bg-gray-800 light:hover:bg-gray-100">
                <span className="text-green-400 light:text-green-600 text-xl">✓</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PROFESSIONAL TIPS ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-yellow-800 light:border-yellow-300 pb-3 inline-block">
            🧠 Advanced Wisdom
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Fail early, fail loudly.</strong> A silent error is worse than a crash.
              Use <code>set -e</code> and check return codes explicitly when you expect failure.
            </p>
            <p>
              🔹 <strong>Never trust filenames.</strong> They can contain spaces, newlines, control characters,
              and leading dashes. Always quote, and use <code>--</code> to separate options from arguments:
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-2 rounded">rm -- "$filename"</code>
            </p>
            <p>
              🔹 <strong>Use `read -r`</strong> unless you explicitly want backslash interpretation.
              Almost always you don't.
            </p>
            <p>
              🔹 <strong>Prefer `printf` over `echo`</strong> – its behavior is consistent across shells.
            </p>
            <p>
              🔹 <strong>Know when to stop shell scripting.</strong> If your script grows beyond 500 lines,
              has complex data structures, or requires performance, consider Python or Go.
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
            <h3 className="text-2xl font-bold">Try changing this…</h3>
            <p className="text-lg leading-relaxed">
              In <code>pitfall_array.sh</code>, remove the quotes around <code>{`"\${files[@]}"`}</code>.
              Create a file named <code>*</code> (asterisk) in the directory and run the script again.
              What happens? This is why quoting is non‑negotiable.
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Think about: what other filenames could break an unquoted loop?
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
                “Over <span className="font-semibold">{experience} years</span>, I’ve reviewed thousands of
                student scripts. <span className="text-blue-400">Debangshu</span> once lost a term project
                because he forgot to quote <code>$FILE</code> – it contained a backspace character. 
                <span className="text-blue-400">Abhronila</span> now keeps a printed checklist of these
                mistakes next to her monitor in <span className="italic">Shyamnagar</span>. 
                Print this page. Memorise it. Your future self will thank you.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #QuoteAllTheThings
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #ShellCheck
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #FailEarly
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Pre‑commit Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-green-400">
            <li>Shebang correct?</li>
            <li><code>set -euo pipefail</code> (or POSIX equivalent) present?</li>
            <li>All variable expansions quoted?</li>
            <li><code>[[ ]]</code> used instead of <code>[ ]</code> (bash scripts)?</li>
            <li>No parsing of <code>ls</code> – using globs or <code>find</code>?</li>
            <li>Exit codes checked after important commands?</li>
            <li>Input validated?</li>
            <li>Temporary files use <code>mktemp</code> + <code>trap</code>?</li>
            <li><code>shellcheck</code> reports 0 warnings?</li>
            <li>Tested with filenames containing spaces and glob characters?</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Practical Examples and Reference Scripts – Topic34</p>
        </footer>
      </div>
    </>
  );
};

export default Topic33;