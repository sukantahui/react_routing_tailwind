import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic29_files/
import bashismDemoSh from "./topic29_files/bashism_demo.sh?raw";
import posixCompliantSh from "./topic29_files/posix_compliant.sh?raw";
import portableScriptSh from "./topic29_files/portable_script.sh?raw";
import shebangPortabilitySh from "./topic29_files/shebang_portability.sh?raw";

/**
 * Component: Topic29
 * Purpose: Teach portable shell scripting – differences between bash and sh,
 *          POSIX compliance, and how to write scripts that run everywhere.
 * Prototype: function Topic29(): JSX.Element
 * Return: Full educational section with SVGs, examples, and best practices.
 *
 * Prerequisites: Topics 0–28 (assumes knowledge of shebang, variables, etc.)
 */
const Topic29 = () => {
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
        @keyframes softGlow {
          0% { filter: drop-shadow(0 0 2px rgba(168,85,247,0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(168,85,247,0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(168,85,247,0.4)); }
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
        {/* ---------- HERO ---------- */}
        <header
          className={clsx(
            "text-center space-y-4",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            🧳 Portable Shell Scripting: <span className="text-purple-400">bash</span> vs <span className="text-amber-400">sh</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Write once, run everywhere – from a student's laptop in{" "}
            <span className="text-purple-400 light:text-purple-600">Ichapur</span> to a production server in{" "}
            <span className="text-purple-400 light:text-purple-600">Barrackpore</span>.
          </p>

          {/* SVG: Family tree of shells + portability badge */}
          <div className="flex justify-center pt-6">
            <svg
              width="340"
              height="150"
              viewBox="0 0 340 150"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Shell family tree: Bourne, POSIX, Bash, Dash, Ash"
            >
              {/* Bourne shell (ancestor) */}
              <g id="bourne">
                <rect
                  x="20"
                  y="60"
                  width="60"
                  height="30"
                  rx="6"
                  fill="#312e81"
                  stroke="#a78bfa"
                  strokeWidth="1.5"
                  className="light:fill-indigo-100 light:stroke-indigo-600"
                />
                <text x="32" y="82" fontSize="12" fill="#e0e7ff">sh (Bourne)</text>
                <line x1="50" y1="60" x2="50" y2="30" stroke="#a78bfa" strokeWidth="1.5" />
                <circle cx="50" cy="25" r="5" fill="#c084fc">
                  <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin="mouseover" />
                </circle>
              </g>

              {/* POSIX sh */}
              <g transform="translate(100, 20)">
                <rect
                  x="0"
                  y="40"
                  width="70"
                  height="30"
                  rx="6"
                  fill="#4c1d95"
                  stroke="#c084fc"
                  strokeWidth="1.5"
                />
                <text x="14" y="62" fontSize="12" fill="#f3e8ff">POSIX sh</text>
                <line x1="35" y1="40" x2="35" y2="10" stroke="#c084fc" />
                <circle cx="35" cy="5" r="4" fill="#e879f9" />
              </g>

              {/* Bash */}
              <g transform="translate(200, 20)">
                <rect
                  x="0"
                  y="40"
                  width="70"
                  height="30"
                  rx="6"
                  fill="#701a75"
                  stroke="#f0abfc"
                  strokeWidth="2"
                />
                <text x="18" y="62" fontSize="12" fill="#fae8ff" fontWeight="bold">bash</text>
                <line x1="35" y1="40" x2="35" y2="10" stroke="#f0abfc" />
                <circle cx="35" cy="5" r="4" fill="#f472b6" />
              </g>

              {/* Dash / Ash (lightweight) */}
              <g transform="translate(200, 90)">
                <rect
                  x="0"
                  y="40"
                  width="70"
                  height="30"
                  rx="6"
                  fill="#374151"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                />
                <text x="20" y="62" fontSize="12" fill="#d1d5db">dash/ash</text>
                <line x1="35" y1="40" x2="35" y2="10" stroke="#9ca3af" />
              </g>

              {/* Portability badge */}
              <g transform="translate(280, 100)">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" values="0;20;0" dur="4s" repeatCount="indefinite" />
                </circle>
                <text x="12" y="27" fontSize="20" fill="#34d399">✓</text>
                <text x="45" y="27" fontSize="14" fill="#d1d5db" className="light:fill-gray-600">Portable</text>
              </g>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT EXPLANATION ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-purple-800 light:border-purple-300 pb-3 inline-block">
            🔍 What Does “Portable” Mean?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="font-bold text-purple-400">bash</span> (Bourne Again SHell) extends the
                original Bourne shell with many conveniences: arrays, associative arrays, <code>[[ ]]</code>,
                <code>${"{var^^}"}</code>, <code>let</code>, etc. But these are <span className="text-amber-400">bashisms</span>.
              </p>
              <p>
                <span className="font-bold text-amber-400">/bin/sh</span> on many systems is a symlink to a
                POSIX‑compliant shell (like dash, or bash in POSIX mode). Scripts starting with <code>#!/bin/sh</code>{" "}
                must not use bash‑specific features.
              </p>
              <p>
                <span className="text-blue-400 light:text-blue-600">Why care?</span> Your script might run on
                embedded devices, Alpine Linux (no bash by default), or old Solaris boxes. Portability = reliability.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-purple-700",
                "hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span> Shebang Rule
              </h3>
              <ul className="space-y-3 list-disc list-inside marker:text-purple-400">
                <li>
                  <code className="bg-gray-900 light:bg-gray-200 px-2 py-1 rounded">#!/bin/bash</code> → “I need bash features.”
                </li>
                <li>
                  <code className="bg-gray-900 light:bg-gray-200 px-2 py-1 rounded">#!/bin/sh</code> → “I am POSIX‑compliant.”
                </li>
                <li>
                  <span className="text-yellow-400">⚠️</span> On some systems <code>/bin/sh</code> <em>is</em> bash,
                  but in POSIX mode – still, avoid bashisms.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT EXAMPLES (bashisms vs POSIX) ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-purple-800 light:border-purple-300 pb-3 inline-block">
            📜 bashisms & POSIX Equivalents
          </h2>

          <ShellFileLoader
            fileModule={bashismDemoSh}
            title="🚫 bashism_demo.sh – What NOT to write for /bin/sh"
            highlightLines={[3, 6, 9, 12]} // arrays, [[ ]], +=, uppercase
          />
          <ShellFileLoader
            fileModule={posixCompliantSh}
            title="✅ posix_compliant.sh – Portable version"
            highlightLines={[5, 9, 14, 19]} // case, test, loops
          />
          <ShellFileLoader
            fileModule={portableScriptSh}
            title="📦 portable_script.sh – A fully POSIX‑compliant utility"
            highlightLines={[1, 15, 22]} // shebang, getopts, variable quoting
          />
          <ShellFileLoader
            fileModule={shebangPortabilitySh}
            title="🧪 shebang_portability.sh – Detecting the shell at runtime"
            highlightLines={[3, 8, 16]} // $0, $SHELL, readlink
          />
        </section>

        {/* ---------- COMMON BASHISMS TO AVOID ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Bashisms That Break /bin/sh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { bash: "[[ $a =~ $regex ]]", posix: `case $a in … ;; esac` },
              { bash: "array=(one two); echo ${array[1]}", posix: 'set -- one two; echo "$2"' },
              { bash: 'echo "${var^^}"', posix: 'echo "$var" | tr "[:lower:]" "[:upper:]"' },
              { bash: "let i++", posix: 'i=$((i + 1))' },
              { bash: 'source file.sh', posix: '. file.sh' },
              { bash: "echo {1..10}", posix: 'seq 1 10 (if available) or manual loop' },
              { bash: "export -f func", posix: 'not possible – define in dot scripts' },
              { bash: ">&2 echo error", posix: 'echo error >&2' },
              { bash: '[[ -v var ]]', posix: 'test -n "${var+set}"' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-5 rounded-lg border border-red-800 light:border-red-300",
                  "bg-red-900/20 light:bg-red-50",
                  "hover:bg-red-900/30 light:hover:bg-red-100 transition-colors"
                )}
              >
                <div className="font-mono text-sm">
                  <span className="text-red-400 light:text-red-600 line-through mr-2">bash</span>
                  <span className="text-gray-200 light:text-gray-800">{item.bash}</span>
                </div>
                <div className="font-mono text-sm mt-2 text-green-400 light:text-green-700">
                  ✓ POSIX: {item.posix}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- REAL‑WORLD SCENARIO ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 light:from-purple-50 light:to-gray-100",
            "border border-purple-800 light:border-purple-300",
            "motion-safe:animate-[fadeIn_0.8s_ease-out]"
          )}
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
            <span className="text-3xl">🌍</span> When Portability Saved the Day
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              <span className="text-purple-400 light:text-purple-700 font-semibold">Abhronila</span> wrote a
              backup script for the school server in <span className="italic">Shyamnagar</span>. She used
              <code className="bg-gray-900 light:bg-gray-200 px-2 py-1 rounded">#!/bin/bash</code> and array
              tricks. It worked perfectly on her Ubuntu laptop.
            </p>
            <p>
              But the server ran Alpine Linux – no bash. The script failed silently. After rewriting it in
              pure POSIX <code>sh</code> and changing the shebang to <code>#!/bin/sh</code>, it ran
              flawlessly for months.
            </p>
            <p className="font-medium text-gray-200 light:text-gray-800">
              ✅ Lesson: Know your target environment – or stay POSIX by default.
            </p>
          </div>
        </section>

        {/* ---------- BEST PRACTICES ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ Best Practices for Portable Scripts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Start with `#!/bin/sh` unless you explicitly need bash features.",
              "Test your script with `dash` (or `busybox sh`) – the strictest POSIX shell.",
              "Use `case` for pattern matching, `test` (or `[ ]`) for conditions.",
              "Avoid arrays, associative arrays, `[[ ]]`, `+=`, `=~`, `${var^^}` etc.",
              "Prefer `printf` over `echo` for portability (especially with options).",
              "Quote all variable expansions – always, even in POSIX.",
              "Use `getopts` for option parsing – it's POSIX, unlike `getopt`.",
              "Avoid process substitution `<(...)` and here‑strings `<<<`.",
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded hover:bg-gray-800 light:hover:bg-gray-100">
                <span className="text-green-400 light:text-green-600 text-xl">✓</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PROFESSIONAL TIPS ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-yellow-800 light:border-yellow-300 pb-3 inline-block">
            🧠 Tips from the Field
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Check shebang at runtime:</strong> Use <code className="bg-gray-800 light:bg-gray-200 px-2 py-1 rounded">
                readlink /proc/$$/exe
              </code> to see which shell is actually running (Linux).
            </p>
            <p>
              🔹 <strong>Emulate arrays with positional parameters:</strong>{" "}
              <code>set -- value1 value2</code> and <code>shift</code>.
            </p>
            <p>
              🔹 <strong>Use `command -v`</strong> instead of `which` – both POSIX and reliable.
            </p>
            <p>
              🔹 <strong>Keep a POSIX reference card:</strong> `man dash`, `man sh` or{" "}
              <a href="https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                POSIX Shell & Utilities
              </a>.
            </p>
            <p>
              🔹 <strong>Use `shellcheck` with `-s sh`</strong> to catch bashisms:{" "}
              <code>shellcheck -s sh my_script.sh</code>.
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
          <span className="text-5xl">💭</span>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">Try changing this…</h3>
            <p className="text-lg leading-relaxed">
              In <code>bashism_demo.sh</code>, replace the array with a <code>set --</code> loop.
              Then run it with <kbd className="bg-gray-700 light:bg-gray-300 px-2 py-0.5 rounded">sh bashism_demo.sh</kbd>.
              What error do you see?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Observe carefully: bash ignores the shebang when invoked directly as <code>sh script</code>.
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
                “I often tell my students in <span className="italic">Naihati</span> and{" "}
                <span className="italic">Barrackpore</span>: ‘Bash is a comfortable car, but POSIX sh is a
                bicycle – it goes anywhere and never breaks down.’ Start with the bicycle; upgrade only
                when you know the road is paved.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #POSIXFirst
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #NoBashisms
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
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Portable Scripting Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-purple-400">
            <li>Shebang is <code>#!/bin/sh</code> (unless you really need bash).</li>
            <li>No arrays, associative arrays, <code>[[ ]]</code>, <code>=~</code>.</li>
            <li>No <code>{`{1..10}`}</code> brace expansion.</li>
            <li>No <code>let</code>, <code>((i++))</code> – use <code>$((i+1))</code>.</li>
            <li>No <code>source</code> – use <code>.</code> (dot).</li>
            <li>No <code>&gt;&amp;2</code> redirection order – use <code>echo error &gt;&amp;2</code>.</li>
            <li>Tested with <code>dash</code> or <code>busybox sh</code>.</li>
            <li>Run <code>shellcheck -s sh</code> – zero warnings.</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Version controlling shell scripts with Git – Topic30</p>
        </footer>
      </div>
    </>
  );
};

export default Topic29;