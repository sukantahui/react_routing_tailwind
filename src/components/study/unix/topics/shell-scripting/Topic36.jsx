import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic36_files/
import loopGlobSh from "./topic36_files/loop_glob.sh?raw";
import loopFindSh from "./topic36_files/loop_find.sh?raw";
import loopRobustSh from "./topic36_files/loop_robust.sh?raw";
import loopRenameSh from "./topic36_files/loop_rename.sh?raw";
import loopMistakesSh from "./topic36_files/loop_mistakes.sh?raw";

/**
 * Component: Topic36
 * Purpose: Example Script – Looping Through Files.
 *          Demonstrates safe, portable, and efficient ways to process files
 *          in shell scripts, covering globbing, find, null‑delimited loops,
 *          and common pitfalls.
 * Prototype: function Topic36(): JSX.Element
 * Return: Full educational section with script examples and professional insights.
 *
 * Prerequisites: All topics 0–35
 */
const Topic36 = () => {
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
        @keyframes fileFlow {
          0% { transform: translateX(0); opacity: 0.6; }
          50% { transform: translateX(10px); opacity: 1; }
          100% { transform: translateX(0); opacity: 0.6; }
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            🔁 Example Script: <span className="text-blue-400">Looping Through Files</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Don't fear filenames with spaces, newlines, or asterisks. 
            <span className="text-blue-400"> Abhronila</span> in <span className="italic">Shyamnagar</span> and
            <span className="text-blue-400"> Debangshu</span> in <span className="italic">Barrackpore</span> 
            now process thousands of files safely – and you will too.
          </p>

          {/* SVG: File loop animation */}
          <div className="flex justify-center pt-6">
            <svg
              width="360"
              height="140"
              viewBox="0 0 360 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Files flowing through a loop"
            >
              {/* Stack of files */}
              <g transform="translate(20, 40)">
                <rect x="0" y="0" width="30" height="35" rx="4" fill="#60a5fa" />
                <rect x="5" y="-3" width="30" height="35" rx="4" fill="#3b82f6" />
                <rect x="10" y="-6" width="30" height="35" rx="4" fill="#2563eb" />
                <text x="15" y="22" fontSize="12" fill="#ffffff">*.txt</text>
              </g>

              {/* Arrow right */}
              <line x1="60" y1="60" x2="100" y2="60" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Loop icon */}
              <g transform="translate(120, 30)">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" values="0;20;0" dur="3s" repeatCount="indefinite" />
                </circle>
                <path d="M40 25 L40 40 L52 48" stroke="#a78bfa" strokeWidth="2" fill="none" />
              </g>

              {/* Files exiting loop */}
              <g transform="translate(230, 40)">
                <rect x="0" y="0" width="30" height="35" rx="4" fill="#4ade80" />
                <rect x="35" y="5" width="30" height="35" rx="4" fill="#34d399" />
                <rect x="70" y="-2" width="30" height="35" rx="4" fill="#10b981" />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; -2 2; 0 0"
                  dur="2s"
                  repeatCount="indefinite"
                  additive="sum"
                />
              </g>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: WHY FILE LOOPING IS TRICKY ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            🧠 The Challenge: Filenames Are Just Bytes
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Unix filenames can contain <span className="text-amber-400">any character except `/` and null</span>.
                That includes spaces, newlines, tabs, asterisks, and even control characters.
              </p>
              <p>
                <span className="text-blue-400">Tuhina</span> once lost hours because a file named 
                <code className="bg-gray-800 light:bg-gray-200 px-2 py-0.5 rounded">-rf *.txt</code> (yes, starting with a dash)
                caused <code>rm $file</code> to interpret it as an option. Quoting and <code>--</code> saved the day.
              </p>
              <p>
                The three robust patterns are:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Glob loop</strong> – simple, non‑recursive, works when filenames don't start with dash.</li>
                <li><strong>Find + -exec</strong> – recursive, safe with `-exec` and `+`.</li>
                <li><strong>Find + while read</strong> – most flexible, but requires `-print0` and `read -d ''`.</li>
              </ul>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-blue-700",
                "hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span> The Golden Rule
              </h3>
              <p className="text-lg italic">
                “Quote everything, and use null delimiters when possible.”
              </p>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT EXAMPLES ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            📜 Safe File Looping – Four Essential Patterns
          </h2>

          <ShellFileLoader
            fileModule={loopGlobSh}
            title="🌀 loop_glob.sh – Simple non‑recursive glob loop"
            highlightLines={[6, 9]} // check if files exist, quoted variable
          />
          <ShellFileLoader
            fileModule={loopFindSh}
            title="🔍 loop_find.sh – Recursive processing with find + read"
            highlightLines={[7, 9]} // while IFS= read -r, find ... -print
          />
          <ShellFileLoader
            fileModule={loopRobustSh}
            title="🛡️ loop_robust.sh – Handle ANY filename (null delimiter)"
            highlightLines={[6, 9]} // find -print0, while IFS= read -r -d ''
          />
          <ShellFileLoader
            fileModule={loopRenameSh}
            title="✏️ loop_rename.sh – Batch rename with pattern (dry‑run support)"
            highlightLines={[9, 15, 20]} // parameter expansion, dry-run, mv
          />
        </section>

        {/* ---------- COMMON MISTAKES ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ loop_mistakes.sh – What NOT to do
          </h2>
          <ShellFileLoader
            fileModule={loopMistakesSh}
            title="💥 loop_mistakes.sh – Classic errors"
            highlightLines={[3, 6, 9]} // for i in $(ls), unquoted, IFS trick
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {[
              "❌ Parsing `ls` – `for i in $(ls *.txt)`",
              "❌ Unquoted variable – `for i in *.txt; do process $i; done`",
              "❌ Using `for i in $(find . -name '*.txt')`",
              "❌ Not checking if glob matches anything (literal '*' when no files)",
              "❌ Forgetting `--` before filenames starting with dash",
              "❌ Modifying `IFS` without saving/restoring",
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
            ✅ Best Practices for File Loops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "🔹 Use `for file in *.txt` – not `ls`.",
              "🔹 Always quote: `\"$file\"`.",
              "🔹 Check if glob expands to non‑null: `for f in *.txt; do [ -f \"$f\" ] || continue; done`.",
              "🔹 For recursive: `find ... -print0 | while IFS= read -r -d '' file; do`.",
              "🔹 Use `--` to separate options from arguments: `rm -- \"$file\"`.",
              "🔹 Prefer `-exec cmd {} +` over `-exec cmd {} \\;` for efficiency.",
              "🔹 Avoid `cat file | while read` – use redirection.",
              "🔹 Test with `--dry-run` before destructive operations.",
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
              🔹 <strong>Glob expansion is safe, but hidden.</strong> If a directory has no `.txt` files,
              the loop still runs once with `file='*.txt'`. Always guard with `[ -f "$file" ]` or use
              `shopt -s nullglob` (bash) to make unmatched globs disappear.
            </p>
            <p>
              🔹 <strong>Use `find -execdir`</strong> instead of `-exec` when possible – it runs the command
              inside the file's directory, avoiding path confusion.
            </p>
            <p>
              🔹 <strong>For parallel processing,</strong> combine `find` with `xargs -0` or GNU Parallel:
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-2 rounded">
                find . -name '*.log' -print0 | xargs -0 -P 4 -n 1 gzip
              </code>
            </p>
            <p>
              🔹 <strong>Set `IFS=$'\n'` carefully</strong> – it still breaks on filenames with newlines.
              Prefer null‑delimiter approaches.
            </p>
            <p>
              🔹 <strong>In bash, use `globstar` (`**`)</strong> for recursive globbing, but be mindful of
              large directories. Enable with `shopt -s globstar`.
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
              In <code>loop_robust.sh</code>, we use <code>while IFS= read -r -d '' file</code>.
              Why must we set <code>IFS=</code>? What happens if we omit it?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try creating a file with a trailing newline in its name – impossible, but you can create
              one with <code>touch $'file\nwith\nnewlines'</code>. Run the robust loop and the find+read loop.
              Which one preserves the full filename?
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
                “I remember a student in <span className="italic">Naihati</span> who named his project file
                <code>final project (2024).txt</code>. The space broke his backup script. He learned to quote.
                Then he named a file <code>*</code> as a joke, and his glob loop deleted everything. 
                Now he teaches null‑delimiters to freshmen. This is the rite of passage for every shell scripter.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #QuoteYourVars
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #NullDelimiter
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #FindNotLs
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ File Looping Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-blue-400">
            <li>Never parse `ls`.</li>
            <li>Always quote `"$file"`.</li>
            <li>Check for empty glob: `[ -f "$f" ] || continue`.</li>
            <li>For recursive, use `find -print0` + `while read -d ''`.</li>
            <li>Use `--` before filenames that might start with dash.</li>
            <li>Avoid modifying `IFS` globally.</li>
            <li>Test with `--dry-run` for destructive loops.</li>
            <li>Know when to use `-exec` vs `while read`.</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Example Script – Checking exit status (Topic37)</p>
        </footer>
      </div>
    </>
  );
};

export default Topic36;