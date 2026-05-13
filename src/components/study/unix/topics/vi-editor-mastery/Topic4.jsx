import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic4_files/topic4_questions";

// Shell script example: create a practice file for insert mode drills
import insertPracticeScript from "./topic4_files/insert_practice.sh?raw";

/**
 * Topic4 Component – "Insert mode: entering with i, a, o, O, I, A"
 *
 * Purpose:
 *   Teach the six different ways to enter Insert mode from Normal mode,
 *   each positioning the cursor in a unique place to start typing.
 *
 * When & Why Used:
 *   - Insert mode is where you write text. Knowing the right entry method saves keystrokes.
 *   - "i" inserts before cursor, "a" appends after, "I" at line start, "A" at line end.
 *   - "o" opens new line below, "O" opens above.
 *   - Efficient editing requires choosing the correct insertion point.
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic4 = () => {
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
          Entering Insert Mode
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">i a o O I A</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION + SVG ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">✍️ Six ways to start typing</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              From Normal mode, you need to switch to Insert mode to add or modify text.
              Vi provides <strong>six different keys</strong> to enter Insert mode, each placing the cursor
              at a specific location relative to the current line or character.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">i</kbd> – Insert before the character under the cursor.</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">a</kbd> – Append after the character under the cursor.</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">I</kbd> – Insert at the beginning of the line (first non‑blank).</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">A</kbd> – Append at the end of the line.</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">o</kbd> – Open a new line below the current line.</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">O</kbd> – Open a new line above the current line.</li>
            </ul>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Never just press <kbd>i</kbd> reflexively. Think: do I want to insert at the beginning of the line? At the end?
                Below? Choosing the right command reduces keystrokes and keeps your flow.”
              </p>
            </div>
          </div>

          {/* SVG – Cursor positioning illustration */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 260 200" className="w-full" aria-label="Insert mode cursor placements">
                <rect width="260" height="200" fill="none" />
                {/* Example line of text */}
                <text x="30" y="40" fill="#cbd5e1" fontSize="12" fontFamily="monospace">Hello world from vi!</text>
                {/* Cursor positions */}
                {/* i – before 'w' */}
                <circle cx="75" cy="35" r="3" fill="#4ade80" />
                <text x="60" y="20" fill="#4ade80" fontSize="9">i</text>
                <line x1="75" y1="38" x2="75" y2="48" stroke="#4ade80" strokeWidth="1" />

                {/* a – after 'w' */}
                <circle cx="85" cy="35" r="3" fill="#facc15" />
                <text x="70" y="55" fill="#facc15" fontSize="9">a</text>
                <line x1="85" y1="38" x2="85" y2="52" stroke="#facc15" strokeWidth="1" />

                {/* I – line start */}
                <circle cx="32" cy="35" r="3" fill="#60a5fa" />
                <text x="15" y="60" fill="#60a5fa" fontSize="9">I</text>
                <line x1="32" y1="38" x2="32" y2="57" stroke="#60a5fa" strokeWidth="1" />

                {/* A – line end */}
                <circle cx="155" cy="35" r="3" fill="#f472b6" />
                <text x="165" y="20" fill="#f472b6" fontSize="9">A</text>
                <line x1="155" y1="38" x2="155" y2="48" stroke="#f472b6" strokeWidth="1" />

                {/* o – new line below */}
                <rect x="30" y="70" width="200" height="25" rx="3" fill="#1e293b" stroke="#34d399" strokeWidth="1" />
                <text x="40" y="86" fill="#6ee7b7" fontSize="10" fontFamily="monospace">o → new line below</text>
                <text x="12" y="86" fill="#34d399" fontSize="12">o</text>

                {/* O – new line above */}
                <rect x="30" y="110" width="200" height="25" rx="3" fill="#1e293b" stroke="#f87171" strokeWidth="1" />
                <text x="40" y="126" fill="#fca5a5" fontSize="10" fontFamily="monospace">O → new line above</text>
                <text x="12" y="126" fill="#f87171" fontSize="12">O</text>
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
        <h2 className="text-2xl font-semibold">📊 Insert entry commands in detail</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Command</th>
                <th className="px-4 py-2 text-left">Cursor position</th>
                <th className="px-4 py-2 text-left">Best used for</th>
                <th className="px-4 py-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">i</td>
                <td className="px-4 py-2">Before current character</td>
                <td className="px-4 py-2">Insert missing letters at cursor</td>
                <td className="px-4 py-2 font-mono text-xs">"Hllo" → i e → "Hello"</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">a</td>
                <td className="px-4 py-2">After current character</td>
                <td className="px-4 py-2">Append to a word</td>
                <td className="px-4 py-2 font-mono text-xs">"Hel" → a l o → "Hello"</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">I</td>
                <td className="px-4 py-2">First non‑blank of line</td>
                <td className="px-4 py-2">Add indentation or prefix</td>
                <td className="px-4 py-2 font-mono text-xs">`# comment` → I → `TODO: `</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">A</td>
                <td className="px-4 py-2">End of line</td>
                <td className="px-4 py-2">Append text, add semicolon</td>
                <td className="px-4 py-2 font-mono text-xs">`print(x)` → A → `;`</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">o</td>
                <td className="px-4 py-2">New line below, insert at start</td>
                <td className="px-4 py-2">Add a new line after current</td>
                <td className="px-4 py-2 font-mono text-xs">In code → o → add next statement</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">O</td>
                <td className="px-4 py-2">New line above, insert at start</td>
                <td className="px-4 py-2">Add a new line before current</td>
                <td className="px-4 py-2 font-mono text-xs">Add import above function</td>
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
          Student <strong>Tuhina (Ichapur)</strong> has the current line: <code className="text-xs">def hello():</code>.
          The cursor is on the letter <kbd>h</kbd>. She wants to:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Add a docstring on the line immediately <strong>below</strong> the function definition.</li>
            <li>Then add a <kbd>pass</kbd> statement on the same line, after the colon? No – Python expects indented block.</li>
            <li>Actually, she wants to insert an indented <kbd>pass</kbd> on the new line.</li>
          </ul>
          Which key sequence (starting from Normal mode) accomplishes this?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: <kbd>o</kbd> (opens a new line below and enters Insert mode). Then type spaces or tab, then <kbd>pass</kbd>.
          To insert above instead, she would use <kbd>O</kbd>.
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
              <li><kbd>A</kbd> is faster than <kbd>$</kbd> followed by <kbd>a</kbd> – one key instead of two.</li>
              <li><kbd>I</kbd> is the opposite: goes to first non‑blank, not column 0 (use <kbd>0i</kbd> for column 0).</li>
              <li><kbd>o</kbd> and <kbd>O</kbd> automatically indent to match the surrounding line (if `autoindent` is set).</li>
              <li>Combine with counts: <kbd>5o</kbd> opens 5 blank lines below.</li>
              <li>After <kbd>o</kbd> or <kbd>O</kbd>, you are in Insert mode – press <kbd>ESC</kbd> to return to Normal.</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Using <kbd>i</kbd> when <kbd>a</kbd> would be more logical (ends up typing before the character).</li>
              <li>Thinking <kbd>I</kbd> goes to absolute column 0 – it skips leading whitespace.</li>
              <li>Forgetting that <kbd>o</kbd> and <kbd>O</kbd> enter Insert mode automatically (no need to press <kbd>i</kbd> after).</li>
              <li>Pressing <kbd>Esc</kbd> too early after <kbd>o</kbd> – if you press it immediately, you'll have a blank line and be back in Normal mode.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Insert Mode Entry</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Memorize all six: i a I A o O",
              "Use A to append at end of line",
              "Use I to insert at line start (after indent)",
              "Use o to add a line below",
              "Use O to add a line above",
              "After typing, always ESC back to Normal",
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
          “You are in the middle of a word and realize you need to add a space after the word, then continue typing.
          Which key is most efficient? Compare <kbd>i</kbd> + space vs <kbd>a</kbd> + space.”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: <kbd>a</kbd> appends after the cursor – perfect for adding characters to the end of a word.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: insert mode drills</h2>
        <ShellFileLoader
          fileModule={insertPracticeScript}
          title="Interactive insert mode practice (run to generate a practice file)"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a file with instructions. Practice each of the six insert methods until they become automatic.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Insert Mode – FAQs" questions={questions} />

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
              “I remember teaching <strong>Debangshu from Naihati</strong> – he only used <kbd>i</kbd> and would
              spend extra keystrokes moving to line ends. Once I showed him <kbd>A</kbd> and <kbd>o</kbd>, his speed doubled.
              These six keys are your toolkit. Practice each one until you no longer have to think about it.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: Print a small reference card with i, a, I, A, o, O and stick it near your screen for the first week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic4;

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
if (!document.head.querySelector("#topic4-animations")) {
  styleSheet.id = "topic4-animations";
  document.head.appendChild(styleSheet);
}