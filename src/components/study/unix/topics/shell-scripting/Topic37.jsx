import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic37_files/
import exitStatusDemoSh from "./topic37_files/exit_status_demo.sh?raw";
import errorHandlingSh from "./topic37_files/error_handling.sh?raw";
import customExitCodesSh from "./topic37_files/custom_exit_codes.sh?raw";
import commandChainingSh from "./topic37_files/command_chaining.sh?raw";
import checkMultipleCommandsSh from "./topic37_files/check_multiple_commands.sh?raw";

/**
 * Component: Topic37
 * Purpose: Example Script – Checking Exit Status.
 *          Demonstrates how to inspect, use, and propagate exit codes
 *          for robust error handling in shell scripts.
 * Prototype: function Topic37(): JSX.Element
 * Return: Full educational section with script examples and professional insights.
 *
 * Prerequisites: All topics 0–36
 */
const Topic37 = () => {
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
        @keyframes statusPulse {
          0% { fill: #ef4444; }
          50% { fill: #4ade80; }
          100% { fill: #ef4444; }
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
            📟 Example Script: <span className="text-green-400">Checking Exit Status</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Every command tells you if it succeeded or failed. 
            <span className="text-blue-400"> Swadeep</span> in <span className="italic">Barrackpore</span> and
            <span className="text-blue-400"> Tuhina</span> in <span className="italic">Ichapur</span> 
            learned to listen – now their scripts never ignore failure.
          </p>

          {/* SVG: Exit status flow diagram */}
          <div className="flex justify-center pt-6">
            <svg
              width="360"
              height="140"
              viewBox="0 0 360 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Command -> exit code &rarr; 0 success / non-zero failure"
            &gt;
              {/* Command box */}
              <rect x="30" y="50" width="100" height="40" rx="8" fill="#1e293b" stroke="#6b7280" />
              <text x="55" y="77" fontSize="14" fill="#d1d5db">grep pattern</text>
              
              {/* Arrow to exit code */}
              <line x1="135" y1="70" x2="180" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
              
              {/* Exit code value */}
              <rect x="190" y="45" width="50" height="30" rx="6" fill="#312e81" stroke="#a78bfa" />
              <text x="205" y="67" fontSize="16" fill="#e0e7ff">$?</text>
              
              {/* Two paths: 0 and non-zero */}
              <line x1="215" y1="60" x2="240" y2="40" stroke="#4ade80" strokeWidth="2" />
              <line x1="215" y1="60" x2="240" y2="80" stroke="#ef4444" strokeWidth="2" />
              
              <circle cx="260" cy="40" r="8" fill="#4ade80">
                <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="260" cy="80" r="8" fill="#ef4444">
                <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite" />
              </circle>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: WHY EXIT STATUS MATTERS ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            🧠 Every Command Returns a Status
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="text-amber-400">0 = success, anything else = failure.</span> 
                This simple rule is the foundation of robust shell scripting.
              </p>
              <p>
                <span className="text-blue-400">Debangshu</span> once wrote a deployment script that 
                didn't check if <code>npm install</code> succeeded. It failed silently, and the old 
                version remained deployed. Users saw a broken site for hours.
              </p>
              <p>
                Checking exit status is not optional – it's the difference between a professional 
                tool and a fragile script.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-green-700",
                "hover:shadow-[0_0_20px_-5px_rgba(74,222,128,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span> Three Ways to Check
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li><code>if command; then ...</code> – implicit check</li>
                <li><code>command; if [ $? -eq 0 ]; then ...</code> – explicit $?</li>
                <li><code>command &amp;&amp; success || failure</code> – chaining</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT EXAMPLES ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            📜 Exit Status in Practice – Five Essential Patterns
          </h2>

          <ShellFileLoader
            fileModule={exitStatusDemoSh}
            title="🎯 exit_status_demo.sh – $?, if, &&, ||"
            highlightLines={[6, 9, 13, 18]} //# grep check, mkdir check, ping example
          />
          <ShellFileLoader
            fileModule={errorHandlingSh}
            title="🛡️ error_handling.sh – Functions, die(), cleanup on error"
            highlightLines={[6, 10, 16, 22]} //# die function, trap, mkdir -p check
          />
          <ShellFileLoader
            fileModule={customExitCodesSh}
            title="🔢 custom_exit_codes.sh – Define and document custom codes"
            highlightLines={[2, 9, 14, 18]} //# exit codes defined, case statement
          />
          <ShellFileLoader
            fileModule={commandChainingSh}
            title="⛓️ command_chaining.sh – Conditional execution with && and ||"
            highlightLines={[4, 8, 12]} //# create dir and file, one-liners
          />
          <ShellFileLoader
            fileModule={checkMultipleCommandsSh}
            title="🔬 check_multiple_commands.sh – Pipelining and set -e"
            highlightLines={[4, 10, 16]} //# PIPESTATUS, set -e, manual check
          />
        </section>

        {/* ---------- COMMON PITFALLS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Pitfalls When Checking Exit Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Checking `$?` immediately after another command (overwritten).",
              "❌ Using `[ $? -eq 0 ]` but forgetting to quote `$?`.",
              "❌ Assuming `set -e` is enough – it's not a silver bullet.",
              "❌ Not preserving exit status in functions (use `return`, not `exit`).",
              "❌ Masking exit status in a pipeline (use `PIPESTATUS` in bash).",
              "❌ Using `command || true` when you actually need to know if it failed.",
              "❌ Not documenting custom exit codes – user doesn't know why it failed.",
              "❌ Testing `$?` with `-ne 0` but not handling specific codes.",
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
            ✅ Best Practices for Exit Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "🔹 Use `if command; then` instead of checking `$?` explicitly.",
              "🔹 In functions, use `return` with appropriate code; never `exit` unless you mean to terminate the whole script.",
              "🔹 Document exit codes in comments or a usage section.",
              "🔹 For pipelines, check `${PIPESTATUS[0]}` or `set -o pipefail` (bash).",
              "🔹 Use `die()` function to print error and exit with consistent code.",
              "🔹 Preserve exit status of a command before doing other work: `ret=$?; ...; return $ret`.",
              "🔹 Use `set -e` with caution – it's not a replacement for explicit checks.",
              "🔹 In POSIX sh, use `if cmd; then ... else ... fi`.",
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
              🔹 <strong>Reserve exit code 1 for general errors, 2 for misuse (wrong arguments), 
              3+ for specific conditions.</strong> This follows BSD conventions and makes debugging easier.
            </p>
            <p>
              🔹 <strong>Use `trap 'echo "Error on line $LINENO" {`&gt;`}&2' ERR`</strong> to catch unexpected 
              errors when `set -e` is enabled. It prints the line number where the script failed.
            </p>
            <p>
              🔹 <strong>Never use `exit 0` in a function.</strong> It terminates the entire script, 
              not just the function. Use `return 0`.
            </p>
            <p>
              🔹 <strong>Check exit status of `cd`.</strong> A failed `cd` can lead to `rm -rf *` 
              running in the wrong directory. Always `cd somewhere || die "cannot cd"`.
            </p>
            <p>
              🔹 <strong>In pipelines, `set -o pipefail` makes the pipeline return the exit code of 
              the rightmost failing command.</strong> This is often what you want.
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
              In <code>exit_status_demo.sh</code>, we use <code>if grep -q root /etc/passwd; then</code>.
              Why don't we need to write <code>grep ... ; if [ $? -eq 0 ]; then</code>? What's the difference?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try modifying <code>error_handling.sh</code> to remove the <code>set -e</code>. What happens 
              when <code>mkdir</code> fails? Why is <code>die</code> still effective?
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
                “For <span className="font-semibold">{experience} years</span>, I've told students: 
                <span className="text-blue-400"> Abhronila</span> in <span className="italic">Shyamnagar</span> 
                once spent a whole afternoon debugging a script that 'sometimes' failed. The culprit? 
                She checked <code>$?</code> but another command ran in between. Now she captures the exit 
                status immediately. This one habit separates novices from professionals.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #CheckYourStatus
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #0IsSuccess
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #DieGracefully
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Exit Status Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-green-400">
            <li>Do you check if critical commands succeed?</li>
            <li>Do you capture `$?` immediately if needed later?</li>
            <li>Do your functions `return` meaningful codes, not `exit`?</li>
            <li>Are custom exit codes documented?</li>
            <li>Do you handle pipeline failures (`pipefail` or {`\${PIPESTATUS[@]}`})?</li>
            <li>Do you have a `die()` function for consistent error reporting?</li>
            <li>Have you tested your script's behaviour when commands fail?</li>
            <li>Do you avoid `command || true` unless you intentionally ignore failure?</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Example Script – Automated backup utility (Topic38)</p>
        </footer>
      </div>
    </>
  );
};

export default Topic37;