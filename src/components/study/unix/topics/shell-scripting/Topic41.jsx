import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic41_files/
import trapDemoSh from "./topic41_files/trap_demo.sh?raw";
import trapIgnoreSh from "./topic41_files/trap_ignore.sh?raw";
import trapMultipleSh from "./topic41_files/trap_multiple.sh?raw";
import trapCleanupSh from "./topic41_files/trap_cleanup.sh?raw";

/**
 * Component: Topic41
 * Purpose: Example Script – Signal handling using trap.
 *          Demonstrates how to catch and respond to signals (INT, TERM, EXIT, etc.)
 *          for graceful cleanup and robust script behaviour.
 * Prototype: function Topic41(): JSX.Element
 * Return: Full educational section with script walkthrough and professional insights.
 *
 * Prerequisites: All topics 0–40
 */
const Topic41 = () => {
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
        @keyframes signalPulse {
          0% { r: 4; opacity: 0.8; }
          50% { r: 8; opacity: 1; }
          100% { r: 4; opacity: 0.8; }
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
            🛑 Example Script: <span className="text-red-400">Signal Handling with trap</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Interrupts happen. Be ready. 
            <span className="text-blue-400"> Abhronila</span> in <span className="italic">Shyamnagar</span> uses 
            <code>trap</code> to clean up temporary files; <span className="text-blue-400">Debangshu</span> in 
            <span className="italic">Barrackpore</span> ensures his backups aren't left half‑written.
          </p>

          {/* SVG: Process receiving signal, cleaning up */}
          <div className="flex justify-center pt-6">
            <svg
              width="360"
              height="140"
              viewBox="0 0 360 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Signal sent to process, trap catches it and runs cleanup"
            >
              {/* Process box */}
              <rect x="30" y="40" width="80" height="60" rx="8" fill="#1e293b" stroke="#6b7280" />
              <text x="50" y="77" fontSize="14" fill="#d1d5db">script.sh</text>
              
              {/* Incoming signal (lightning) */}
              <g transform="translate(130, 30)">
                <path d="M0 0 L15 20 L8 20 L20 40" stroke="#ef4444" strokeWidth="2" fill="none" />
                <circle cx="20" cy="40" r="4" fill="#ef4444">
                  <animate attributeName="r" values="4;8;4" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
              
              {/* Trap handler */}
              <g transform="translate(160, 40)">
                <rect x="0" y="0" width="90" height="30" rx="6" fill="#312e81" stroke="#a78bfa" />
                <text x="20" y="22" fontSize="14" fill="#e0e7ff">trap</text>
              </g>
              
              {/* Cleanup action */}
              <g transform="translate(270, 40)">
                <rect x="0" y="0" width="30" height="30" rx="4" fill="#4ade80" />
                <text x="5" y="22" fontSize="12" fill="#ffffff">🧹</text>
                <text x="40" y="22" fontSize="12" fill="#d1d5db">cleanup</text>
              </g>
              
              {/* Arrow connecting signal to trap */}
              <line x1="135" y1="50" x2="160" y2="55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
              {/* Arrow connecting trap to cleanup */}
              <line x1="250" y1="55" x2="270" y2="55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: SIGNALS AND TRAP ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            🧠 Signals: The Kernel's Way of Saying "Stop!"
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="text-amber-400">Signals</span> are asynchronous notifications sent to a process.
                Common ones: <code>SIGINT</code> (Ctrl+C), <code>SIGTERM</code> (default <code>kill</code>), 
                <code>SIGHUP</code> (terminal closed), and <code>EXIT</code> (pseudo‑signal for script exit).
              </p>
              <p>
                <code>trap</code> lets you intercept signals and execute custom code. Without it, the default
                action is usually to terminate the process – often leaving behind temporary files, incomplete
                data, or corrupted state.
              </p>
              <p>
                <span className="text-blue-400">Tuhina</span> in <span className="italic">Ichapur</span> once 
                lost a day's work because her script was killed mid‑write. Now every script she writes has a
                <code>trap</code> to save partial progress.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-red-700",
                "hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span> Signal Quick Reference
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li><code>INT</code> – interactive attention (Ctrl+C)</li>
                <li><code>TERM</code> – termination request</li>
                <li><code>EXIT</code> – script exits (any reason)</li>
                <li><code>ERR</code> – any command returns non‑zero (with <code>set -e</code>)</li>
                <li><code>DEBUG</code> – before every command</li>
                <li><code>RETURN</code> – after function or sourced script</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT EXAMPLES ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            📜 Four Essential Trap Patterns
          </h2>

          <ShellFileLoader
            fileModule={trapDemoSh}
            title="🧹 trap_demo.sh – Basic cleanup on EXIT and INT"
            highlightLines={[5, 7, 12]} //# trap, cleanup function, sleep loop
          />
          <ShellFileLoader
            fileModule={trapIgnoreSh}
            title="🚫 trap_ignore.sh – Temporarily ignore SIGINT during critical section"
            highlightLines={[4, 10, 15]} //# trap '' INT, critical work, restore
          />
          <ShellFileLoader
            fileModule={trapMultipleSh}
            title="🔄 trap_multiple.sh – Multiple signals, multiple handlers, listing traps"
            highlightLines={[5, 8, 18, 26]} //# multiple traps, trap -p, resetting
          />
          <ShellFileLoader
            fileModule={trapCleanupSh}
            title="📦 trap_cleanup.sh – Structured cleanup with functions and stack"
            highlightLines={[6, 13, 23]} //# push_cleanup, pop_cleanup, trap EXIT
          />
        </section>

        {/* ---------- COMMON PITFALLS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Signal Handling Pitfalls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Using `trap - signal` without quotes – `trap - INT` resets, `trap - 'INT'` does nothing.",
              "❌ Forgetting that `EXIT` trap runs on any exit (even successful).",
              "❌ Overwriting previous traps instead of chaining.",
              "❌ Trying to trap `KILL` or `STOP` – cannot be caught.",
              "❌ Not resetting traps in subshells – traps are inherited but can be overridden.",
              "❌ Using `exit` inside an `EXIT` trap – creates infinite loop.",
              "❌ Assuming signal numbers are portable – always use signal names.",
              "❌ Not restoring ignored signals – script continues with signal ignored.",
            ].map((pitfall, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-4 rounded-lg border border-red-800 light:border-red-300",
                  "bg-red-900/10 light:bg-red-50",
                  "hover:bg-red-900/20 light:hover:bg-red-100 transition-colors"
                )}
              >
                <span className="text-red-400 light:text-red-700">{`{pitfall}`}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- BEST PRACTICES ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ Signal Handling Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "🔹 Always use signal names, not numbers (INT, TERM, EXIT).",
              "🔹 Keep cleanup functions simple and idempotent.",
              "🔹 Set `trap` early in the script, before creating temporary resources.",
              "🔹 Use `trap -p` to inspect current traps.",
              "🔹 For multiple cleanup actions, maintain a stack or call a master cleanup.",
              "🔹 Reset signals to default when done ignoring (`trap - INT`).",
              "🔹 Test your trap by sending signals manually: `kill -INT $$`.",
              "🔹 In libraries, avoid setting traps that affect the calling script.",
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
            🧠 Pro Tips – Advanced trap Usage
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Use `trap ... EXIT` for guaranteed cleanup.</strong> Even if the script succeeds,
              the EXIT trap runs. This is perfect for removing temporary files, releasing locks, etc.
            </p>
            <p>
              🔹 <strong>Chain traps by saving and restoring.</strong> If you need to add a handler without
              overwriting an existing one, save the old trap and call it from your new one.
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-2 rounded">
                old_trap=$(trap -p EXIT); trap 'my_cleanup; eval "$old_trap"' EXIT
              </code>
            </p>
            <p>
              🔹 <strong>Use `trap '...' RETURN` for function cleanup.</strong> Combined with `local` traps,
              you can ensure resources allocated in a function are freed when it returns.
            </p>
            <p>
              🔹 <strong>Signal masking in subshells.</strong> Each subshell resets ignored signals to default.
              To propagate ignored status, you must re‑ignore in the subshell.
            </p>
            <p>
              🔹 <strong>Debug with `trap DEBUG`.</strong> Run a command before every statement – extremely
              useful for logging or breakpoints (see Topic40).
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
              In <code>trap_demo.sh</code>, we call <code>cleanup</code> from both <code>INT</code> and <code>EXIT</code> traps.
              What happens if you press Ctrl+C twice? Why does the script still exit?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try modifying <code>trap_ignore.sh</code> to restore the original <code>INT</code> behaviour, not just resetting to default.
              How would you capture the previous trap and reinstall it?
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
                “I remember teaching <code>trap</code> to a batch in <span className="italic">Naihati</span> back in 2002.
                <span className="text-blue-400">Swadeep</span> asked, ‘Why bother? Ctrl+C kills it anyway.’
                Two weeks later, his database import script was interrupted and left a half‑written table.
                Now he's the biggest advocate for signal handling. Over <span className="font-semibold">{experience} years</span>,
                I've learned: <span className="text-amber-400">graceful exit is a sign of professionalism</span>.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #TrapEverything
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #CleanupOnExit
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #NoMoreCorruption
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Signal Handling Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-red-400">
            <li>Set `trap` before creating temporary resources.</li>
            <li>Use `EXIT` trap for unconditional cleanup.</li>
            <li>Use signal names, not numbers.</li>
            <li>Keep cleanup functions idempotent.</li>
            <li>Test traps by sending signals manually.</li>
            <li>Restore ignored signals after critical section.</li>
            <li>Chain traps if multiple handlers needed.</li>
            <li>Document signal behaviour in script comments.</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>🎉 Congratulations! You've completed all 42 topics of Shell Scripting.</p>
          <p className="mt-2">Now go forth and write robust, professional scripts.</p>
        </footer>
      </div>
    </>
  );
};

export default Topic41;