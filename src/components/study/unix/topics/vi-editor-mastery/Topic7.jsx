import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic7_files/topic7_questions";

// Shell script example: create practice file for undo/redo drills
import undoPracticeScript from "./topic7_files/undo_practice.sh?raw";

/**
 * Topic7 Component – "Undo and redo: u, Ctrl+R"
 *
 * Purpose:
 *   Teach how to undo changes (u) and redo changes (Ctrl+R) in vi/vim.
 *   Explain the undo tree (in vim), the difference between u and U.
 *
 * When & Why Used:
 *   - Everyone makes mistakes – undo is your safety net.
 *   - Multiple levels of undo are supported (unlike many basic editors).
 *   - Ctrl+R restores accidentally undone changes.
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic7 = () => {
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
          Undo and Redo
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">u</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">Ctrl+R</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION + SVG ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">⏪ Undo / ⏩ Redo – your safety net</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              Vi/vim remembers your changes. You can undo them step by step, and if you undo too much,
              you can redo. This is far more powerful than single‑level undo in many other editors.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">u</kbd> – undo the last change.</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">U</kbd> – undo all changes on the current line (restores original line).</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">Ctrl+R</kbd> – redo (undo the undo).</li>
            </ul>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Don’t be afraid to experiment. Make changes freely, because <code>u</code> is always there.
                And if you undo one too many, <code>Ctrl+R</code> brings it back.”
              </p>
            </div>
          </div>

          {/* SVG – Undo/Redo timeline animation */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 260 160" className="w-full" aria-label="Undo redo timeline animation">
                <rect width="260" height="160" fill="none" />
                
                {/* Timeline */}
                <line x1="30" y1="80" x2="230" y2="80" stroke="#4ade80" strokeWidth="2" strokeDasharray="4,4" />
                
                {/* Change nodes */}
                <circle cx="50" cy="80" r="6" fill="#60a5fa" />
                <text x="50" y="68" fill="#93c5fd" fontSize="8" textAnchor="middle">Start</text>
                
                <circle cx="90" cy="80" r="6" fill="#facc15" />
                <text x="90" y="68" fill="#fde047" fontSize="8" textAnchor="middle">Edit 1</text>
                
                <circle cx="130" cy="80" r="6" fill="#f87171" />
                <text x="130" y="68" fill="#fca5a5" fontSize="8" textAnchor="middle">Edit 2</text>
                
                <circle cx="170" cy="80" r="6" fill="#a78bfa" />
                <text x="170" y="68" fill="#c4b5fd" fontSize="8" textAnchor="middle">Edit 3</text>

                {/* Undo arrow */}
                <path d="M170 70 Q210 40 130 40" stroke="#f87171" strokeWidth="1.5" fill="none" markerEnd="url(#arrowUndo)" />
                <text x="155" y="35" fill="#fca5a5" fontSize="8">u</text>

                {/* Redo arrow */}
                <path d="M90 90 Q50 120 130 120" stroke="#4ade80" strokeWidth="1.5" fill="none" markerEnd="url(#arrowRedo)" />
                <text x="105" y="135" fill="#86efac" fontSize="8">Ctrl+R</text>

                <defs>
                  <marker id="arrowUndo" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#f87171" />
                  </marker>
                  <marker id="arrowRedo" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#4ade80" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== DETAILED COMMAND TABLE ======================== */}
      <div
        className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">📋 Undo/Redo commands</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Command</th>
                <th className="px-4 py-2 text-left">Effect</th>
                <th className="px-4 py-2 text-left">Count support</th>
                <th className="px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">u</td>
                <td className="px-4 py-2">Undo last change</td>
                <td className="px-4 py-2">Yes: <code>3u</code> undoes last 3 changes</td>
                <td className="px-4 py-2">Works across all modes (Normal/Insert)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">U</td>
                <td className="px-4 py-2">Undo all changes on current line</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Restores line to its original state</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">Ctrl+R</td>
                <td className="px-4 py-2">Redo (undo an undo)</td>
                <td className="px-4 py-2">Yes: <code>3Ctrl+R</code> redoes 3 undos</td>
                <td className="px-4 py-2">Works in vim; plain vi may not support</td>
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
          Student <strong>Abhronila (Shyamnagar)</strong> types the following in vi:
          <ol className="list-decimal list-inside ml-4 mt-2">
            <li>Inserts "Hello"</li>
            <li>Deletes "Hello" (<code>dd</code>)</li>
            <li>Inserts "World"</li>
          </ol>
          She then presses <kbd>u</kbd>. What does she see? She presses <kbd>u</kbd> again. Now what? She presses <kbd>Ctrl+R</kbd>. What is the result?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: First <kbd>u</kbd> undoes the last change → "World" disappears (back to empty after delete). Second <kbd>u</kbd> undoes the deletion → "Hello" reappears. <kbd>Ctrl+R</kbd> redoes one step → "World" returns.
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
              <li><code>u</code> undoes multiple steps; don't be afraid to go back far.</li>
              <li><code>U</code> is dangerous if you have made many changes to a line – use with caution.</li>
              <li>In vim, <code>Ctrl+R</code> can also redo after manual edits; the undo tree is powerful.</li>
              <li>Use <code>:undolist</code> (vim) to see all undo branches.</li>
              <li><code>:earlier 10m</code> and <code>:later 5s</code> undo/redo by time (vim).</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Pressing <kbd>u</kbd> in Insert mode – it types 'u' into the text, does not undo.</li>
              <li>Thinking <code>U</code> is the same as <code>u</code> – they are very different.</li>
              <li>Not knowing that <code>Ctrl+R</code> exists – ending up re‑typing everything after an over‑undo.</li>
              <li>Assuming undo works across sessions – it doesn't. Once you close vi, undo history is lost.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Undo/Redo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Use u to undo the last change",
              "Use u multiple times to undo further back",
              "Use Ctrl+R to redo (vim only)",
              "Use U to restore an entire line to its original state",
              "Always be in Normal mode before pressing u or Ctrl+R",
              "Experiment fearlessly – undo is your friend",
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
        <p className="font-semibold">🤔 Think about…</p>
        <p className="text-sm mt-1">
          “You made a change, then another, then another. You press <code>u</code> three times.
          Now you want to go back to the state after the second change. What do you press?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: <code>Ctrl+R</code> redoes one undo. You need two <code>Ctrl+R</code> presses.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: undo/redo drills</h2>
        <ShellFileLoader
          fileModule={undoPracticeScript}
          title="Interactive undo/redo practice"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a file with step‑by‑step tasks to practice <code>u</code>, <code>U</code>, and <code>Ctrl+R</code>.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Undo and Redo – FAQs" questions={questions} />

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
              “<strong>Tuhina from Ichapur</strong> once deleted an entire paragraph by accident. She panicked.
              I told her: just press <code>u</code>. The paragraph came back. She never feared vi again.
              Undo is your safety net – use it often. And remember, <code>Ctrl+R</code> can bring back
              what you undid. That’s the power of vi’s multi‑level undo.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: Practice a sequence: make 5 changes, press <code>u</code> three times, then <code>Ctrl+R</code> twice.
              Watch how the state changes. This will build muscle memory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic7;

// Reuse keyframes
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
if (!document.head.querySelector("#topic7-animations")) {
  styleSheet.id = "topic7-animations";
  document.head.appendChild(styleSheet);
}