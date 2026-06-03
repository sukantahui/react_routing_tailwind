import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic5_files/topic5_questions";

// Shell script example: interactive exit practice
import exitPracticeScript from "./topic5_files/exit_practice.sh?raw";

/**
 * Topic5 Component – "Exiting vi: :q, :q!, :wq, :x, ZZ"
 *
 * Purpose:
 *   Teach the multiple ways to quit vi/vim, with and without saving changes.
 *   Explain the differences between commands and when to use each.
 *
 * When & Why Used:
 *   - Every vi session must end with an exit command.
 *   - Knowing :q! (force quit) saves beginners from being stuck.
 *   - :wq and :x are efficient for saving and quitting.
 *   - ZZ is a fast Normal‑mode alternative to :wq.
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic5 = () => {
  // Dynamic teacher experience (since 1998)
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  return (
    <div
      className={clsx(
        "w-full max-w-5xl mx-auto px-4 py-10 space-y-10",
        "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200",
        "transition-colors duration-300"
      )}
    >
      {/* ======================== HEADER ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationFillMode: "both" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
          Exiting vi / vim
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">:q</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">:q!</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">:wq</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">:x</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">ZZ</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION + SVG ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">🚪 Getting out: don't get trapped</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              Beginners often open vi and cannot figure out how to exit. The terminal seems stuck.
              The solution is to enter Command mode with <kbd>:</kbd>, then type a quit command.
            </p>
            <p>
              <strong>The five exit commands:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code className="font-mono">:q</code> – quit (fails if changes unsaved)</li>
              <li><code className="font-mono">:q!</code> – force quit, discard changes</li>
              <li><code className="font-mono">:wq</code> – save and quit</li>
              <li><code className="font-mono">:x</code> – save and quit (only writes if changes exist)</li>
              <li><code className="font-mono">ZZ</code> – Normal mode shortcut for save and quit</li>
            </ul>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “The first thing a sysadmin learns is <code>:q!</code> – the emergency exit.
                Memorize it before anything else. You can always recover a file later.”
              </p>
            </div>
          </div>

          {/* SVG – exit flowchart with animations */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 260 200" className="w-full" aria-label="Exit command flowchart">
                <rect width="260" height="200" fill="none" />
                {/* Start box */}
                <rect x="80" y="10" width="100" height="30" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
                <text x="130" y="30" fill="#fde047" fontSize="10" textAnchor="middle">In vi, want to exit</text>

                {/* Decision diamond */}
                <polygon points="130,55 170,75 130,95 90,75" fill="#1e293b" stroke="#facc15" strokeWidth="1.5" />
                <text x="130" y="78" fill="#fde047" fontSize="8" textAnchor="middle">Unsaved</text>
                <text x="130" y="86" fill="#fde047" fontSize="8" textAnchor="middle">changes?</text>

                {/* Yes branch */}
                <line x1="90" y1="75" x2="40" y2="75" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrowRedT5)" />
                <text x="65" y="68" fill="#fca5a5" fontSize="8">Yes</text>
                <rect x="15" y="110" width="90" height="35" rx="6" fill="#991b1b" stroke="#f87171" strokeWidth="1" />
                <text x="60" y="125" fill="#fca5a5" fontSize="8" textAnchor="middle">Discard & quit</text>
                <text x="60" y="137" fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">:q!</text>

                {/* No branch */}
                <line x1="170" y1="75" x2="220" y2="75" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#arrowGreenT5)" />
                <text x="195" y="68" fill="#86efac" fontSize="8">No</text>
                <rect x="190" y="110" width="90" height="35" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                <text x="235" y="125" fill="#6ee7b7" fontSize="8" textAnchor="middle">Save & quit</text>
                <text x="235" y="137" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">:wq / :x / ZZ</text>

                {/* Just quit without saving (if no changes) */}
                <line x1="130" y1="95" x2="130" y2="110" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowBlueT5)" />
                <rect x="100" y="150" width="60" height="30" rx="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
                <text x="130" y="168" fill="#93c5fd" fontSize="10" textAnchor="middle">:q</text>

                {/* Markers */}
                <defs>
                  <marker id="arrowRedT5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#f87171" />
                  </marker>
                  <marker id="arrowGreenT5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#4ade80" />
                  </marker>
                  <marker id="arrowBlueT5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#60a5fa" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== COMMAND DETAILS TABLE ======================== */}
      <div
        className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">📋 Exit commands at a glance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Command</th>
                <th className="px-4 py-2 text-left">Effect</th>
                <th className="px-4 py-2 text-left">When to use</th>
                <th className="px-4 py-2 text-left">Fails if?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:q</td>
                <td className="px-4 py-2">Quit (no save)</td>
                <td className="px-4 py-2">No changes made</td>
                <td className="px-4 py-2">Changes detected → "No write since last change"</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:q!</td>
                <td className="px-4 py-2">Force quit, discard changes</td>
                <td className="px-4 py-2">You made mistakes and want to start over</td>
                <td className="px-4 py-2">Never fails (emergency exit)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:wq</td>
                <td className="px-4 py-2">Write (save) and quit</td>
                <td className="px-4 py-2">You want to save changes and exit</td>
                <td className="px-4 py-2">Read‑only file or permission denied</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:x</td>
                <td className="px-4 py-2">Save only if modified, then quit</td>
                <td className="px-4 py-2">Saves only when needed (more efficient)</td>
                <td className="px-4 py-2">Same as :wq, but does not rewrite unchanged files</td>
               </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">ZZ</td>
                <td className="px-4 py-2">Save (if modified) and quit (Normal mode)</td>
                <td className="px-4 py-2">Fastest way – no colon, no Enter</td>
                <td className="px-4 py-2">Read‑only file (cannot write)</td>
               </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================== PRACTICE SCENARIO ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.25s] bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl"
        style={{ animationFillMode: "both" }}
      >
        <h3 className="text-lg font-bold mb-2">🧪 Try this mental exercise</h3>
        <p className="text-sm">
          Student <strong>Abhronila (Shyamnagar)</strong> opened a system configuration file with <code>vi /etc/hosts</code>.
          She accidentally typed some random characters and now wants to exit <strong>without saving</strong>.
          What command does she type?
        </p>
        <p className="text-sm mt-2">
          Later, she edited her own script correctly and wants to save and quit with the fewest keystrokes.
          What are two possible commands, and which is shorter?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: For discarding changes: <kbd>ESC</kbd> then <kbd>:q!</kbd> (force quit).<br />
          For saving and quitting: <kbd>ZZ</kbd> (two keystrokes, no colon) or <kbd>:wq</kbd> (three keystrokes + Enter). <kbd>ZZ</kbd> is faster.
        </p>
      </div>

      {/* ======================== TIPS, PITFALLS, BEST PRACTICES ======================== */}
      <div
        className="space-y-5 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]"
        style={{ animationFillMode: "both" }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">💡 Pro Tips</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Use <code>:x</code> instead of <code>:wq</code> – it only writes if the file changed, preserving timestamps.</li>
              <li><code>ZZ</code> is the fastest: no colon, no Enter – just two uppercase Z's in Normal mode.</li>
              <li>If you accidentally opened vi without a file and don't want to save, type <code>:q!</code>.</li>
              <li>Use <code>:w</code> alone to save without quitting – good habit before risky operations.</li>
              <li><code>:w !sudo tee %</code> saves a read‑only file (advanced, but lifesaving).</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Typing <kbd>q</kbd> in Normal mode – writes the letter 'q' into the file.</li>
              <li>Forgetting the colon before <kbd>q</kbd> or <kbd>wq</kbd>.</li>
              <li>Pressing <kbd>ZZ</kbd> while in Insert mode – it literally types 'ZZ' into the file.</li>
              <li>Using <code>:q</code> when changes exist, then not knowing how to force quit.</li>
              <li>Closing the terminal instead of exiting vi (leaves swap files).</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Exiting vi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Always press ESC first to ensure Normal mode",
              "Use :q! if you want to discard changes and quit",
              "Use :wq or ZZ to save and quit",
              "Use :x to save only if modified (smarter than :wq)",
              "Remember: :q alone fails if there are unsaved changes",
              "If stuck, Ctrl+C also cancels commands in many vi versions",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================== HINT SECTION ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.35s] bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl"
        style={{ animationFillMode: "both" }}
      >
        <p className="font-semibold">🤔 Observe carefully…</p>
        <p className="text-sm mt-1">
          “You are editing a file and you type <kbd>ESC</kbd> then <kbd>:</kbd> then <kbd>wq</kbd> then <kbd>Enter</kbd>.
          The file is saved and vi closes. Now try <kbd>ESC</kbd> then <kbd>ZZ</kbd>. Which feels faster?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: <kbd>ZZ</kbd> doesn't require the colon or Enter – just two capital Z's.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: exit drills</h2>
        <ShellFileLoader
          fileModule={exitPracticeScript}
          title="Interactive exit practice (run to generate a practice file)"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a temporary file and guides you through each exit method. Follow the prompts and practice muscle memory.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Exiting vi – FAQs" questions={questions} />

      {/* ======================== TEACHER’S NOTE ======================== */}
      <div
        className={clsx(
          "rounded-2xl p-6 border bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-800",
          "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">🧑‍🏫</div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Teacher’s Note – Sukanta Hui</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> sukantahui@codernaccotax.co.in | <strong>Mobile:</strong> 7003756860
              <br />
              <strong>Skills:</strong> Programming Language, RDBMs, Operating System, Web Development
              <br />
              <strong>Experience:</strong> {teacherExperience} years (since 1998)
            </p>
            <p className="leading-relaxed">
              “When I first taught vi to students in <strong>Barrackpore</strong>, half of them would restart the terminal
              because they couldn't exit. I made them write <code>:q!</code> on a sticky note and put it on the monitor.
              Within a week, no one feared vi anymore.<br />
              The key is: <strong>ESC, then colon, then q, then bang, then Enter</strong> – the ultimate escape.
              Practice it ten times before you even learn to save.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: Open a file, type anything, then exit with <code>:q!</code> repeatedly. You'll never be trapped again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic5;

// Reuse keyframes (ensure global but scoped to component)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeSlideUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-\\[fadeSlideUp_0\\.6s_ease-out\\] {
      animation: none !important;
      opacity: 1;
      transform: none;
    }
  }
`;
if (!document.head.querySelector("#topic5-animations")) {
  styleSheet.id = "topic5-animations";
  document.head.appendChild(styleSheet);
}