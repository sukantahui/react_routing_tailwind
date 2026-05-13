import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic8_files/topic8_questions";

// Shell script example: create practice file for visual mode drills
import visualPracticeScript from "./topic8_files/visual_practice.sh?raw";

/**
 * Topic8 Component – "Visual mode: v, V, Ctrl+v for block selection"
 *
 * Purpose:
 *   Teach the three types of visual selection in vi/vim: character (v), line (V), and block (Ctrl+v).
 *   Explain how to select text, perform operations (delete, yank, change) on selections.
 *
 * When & Why Used:
 *   - Visual mode makes text manipulation intuitive by highlighting the selection.
 *   - Useful for deleting/yanking multiple lines or columns (rectangular blocks).
 *   - Essential for editing columnar data (CSV, tables, code alignment).
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic8 = () => {
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
          Visual Mode
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">v</code> ·
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">V</code> ·
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">Ctrl+v</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION + SVG ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">🖱️ Select then act – the visual way</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              Visual mode highlights text so you can see what you are about to delete, yank, or change.
              It bridges the gap between Normal mode commands and a mouse‑like selection.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">v</kbd> – character‑wise visual (select letters).</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">V</kbd> – line‑wise visual (select whole lines).</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">Ctrl+v</kbd> – block‑wise visual (rectangular columns).</li>
            </ul>
            <p className="text-sm">
              After selecting, press <kbd>d</kbd> (delete), <kbd>y</kbd> (yank), <kbd>c</kbd> (change),
              or <kbd>p</kbd> (paste over selection). Press <kbd>ESC</kbd> to exit Visual mode.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Visual mode gives you the best of both worlds: the speed of keyboard commands and the
                reassurance of seeing exactly what you’re editing. Use <code>V</code> for whole lines,
                <code>Ctrl+v</code> for column editing.”
              </p>
            </div>
          </div>

          {/* SVG – visual mode illustrations */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 260 180" className="w-full" aria-label="Visual mode types">
                <rect width="260" height="180" fill="none" />
                
                {/* Character mode */}
                <text x="10" y="20" fill="#60a5fa" fontSize="10">v: character</text>
                <rect x="10" y="28" width="150" height="18" rx="2" fill="#1e293b" stroke="#60a5fa" strokeWidth="1" />
                <rect x="10" y="28" width="60" height="18" rx="2" fill="#3b82f6" fillOpacity="0.3" stroke="#60a5fa" strokeWidth="1" />
                <text x="15" y="41" fill="#cbd5e1" fontSize="10">Hello world</text>

                {/* Line mode */}
                <text x="10" y="65" fill="#4ade80" fontSize="10">V: line</text>
                <rect x="10" y="72" width="150" height="18" rx="2" fill="#1e293b" stroke="#4ade80" strokeWidth="1" />
                <rect x="10" y="72" width="150" height="18" rx="2" fill="#22c55e" fillOpacity="0.3" />
                <text x="15" y="85" fill="#cbd5e1" fontSize="10">This whole line</text>

                {/* Block mode */}
                <text x="10" y="110" fill="#f472b6" fontSize="10">Ctrl+v: block</text>
                <rect x="10" y="118" width="200" height="50" rx="2" fill="#1e293b" stroke="#f472b6" strokeWidth="1" />
                <text x="20" y="133" fill="#cbd5e1" fontSize="10">col 0: value1</text>
                <text x="20" y="148" fill="#cbd5e1" fontSize="10">col 1: value2</text>
                <text x="20" y="163" fill="#cbd5e1" fontSize="10">col 2: value3</text>
                <rect x="20" y="125" width="50" height="45" fill="#ec4899" fillOpacity="0.3" stroke="#f472b6" strokeWidth="1" />
                <text x="25" y="140" fill="#fce7f3" fontSize="8">block</text>
                
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
        <h2 className="text-2xl font-semibold">📋 Visual mode commands</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Command</th>
                <th className="px-4 py-2 text-left">Mode</th>
                <th className="px-4 py-2 text-left">Selection</th>
                <th className="px-4 py-2 text-left">Common operations</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">v</td>
                <td className="px-4 py-2">Character‑wise</td>
                <td className="px-4 py-2">From cursor to movement</td>
                <td className="px-4 py-2">`d`, `y`, `c`, `~`, `u` (lowercase), `U`</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">V</td>
                <td className="px-4 py-2">Line‑wise</td>
                <td className="px-4 py-2">Whole lines</td>
                <td className="px-4 py-2">{`d, y, c, >, <, = (indent)`}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">Ctrl+v</td>
                <td className="px-4 py-2">Block‑wise (visual block)</td>
                <td className="px-4 py-2">Rectangular column</td>
                <td className="px-4 py-2">{`d, y, c, I (insert), A (append)`}</td>
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
          Student <strong>Debangshu (Naihati)</strong> has a CSV file with:
          <pre className="text-xs mt-2 bg-gray-100 dark:bg-gray-900 p-2 rounded">
Name,Age,City
Alice,25,Barrackpore
Bob,30,Shyamnagar
          </pre>
          He wants to delete the entire "Age" column (the second column). Which visual mode and commands should he use?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: Move cursor to the first 'A' in "Age" (on header line). Press <kbd>Ctrl+v</kbd> (block visual). Move down with <kbd>j</kbd> to select the column across rows. Then press <kbd>d</kbd> to delete the block.
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
              <li>In block visual mode, use <kbd>I</kbd> to insert text before the block on all selected lines.</li>
              <li>Use <kbd>A</kbd> in block visual mode to append after the block on all lines.</li>
              <li>Toggle Visual mode quickly with <kbd>gv</kbd> to re‑select the last visual selection.</li>
              <li>Combine Visual mode with <kbd>o</kbd> to jump to the other end of the selection.</li>
              <li>Use <kbd>y</kbd> to yank selected text, then <kbd>p</kbd> to paste elsewhere.</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Forgetting to exit Visual mode with <kbd>ESC</kbd> – then typed keys become commands on the selection.</li>
              <li>Using <kbd>v</kbd> instead of <kbd>V</kbd> for whole lines – only part of the line gets selected.</li>
              <li>Expecting <kbd>Ctrl+v</kbd> to work in plain vi (block mode may not be available).</li>
              <li>Pressing <kbd>p</kbd> in Visual mode replaces the selection – not pasting after it.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Visual Mode</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Use v for character selections",
              "Use V for entire lines",
              "Use Ctrl+v for rectangular blocks (vim)",
              "Exit with ESC when done",
              "Use d, y, c, p on selections",
              "Use gv to reselect last selection",
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
          “You have a paragraph and you want to delete the first 10 characters of each line.
          Which visual mode is best? How do you delete those columns?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: Use <kbd>Ctrl+v</kbd> to select a vertical block across the 10 columns, then <kbd>d</kbd>.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: visual mode drills</h2>
        <ShellFileLoader
          fileModule={visualPracticeScript}
          title="Interactive visual mode practice"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a file with tasks for character, line, and block visual selections.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Visual Mode – FAQs" questions={questions} />

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
              “<strong>Swadeep from Barrackpore</strong> told me he missed the mouse for selecting text.
              I showed him Visual mode. Now he says it's even faster because his hands never leave the keyboard.
              The real game changer is block visual (<kbd>Ctrl+v</kbd>) – it lets you edit columns in CSV or code
              tables. Spend 10 minutes practicing <kbd>v</kbd>, <kbd>V</kbd>, and <kbd>Ctrl+v</kbd>.
              You’ll wonder how you ever edited without them.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: In block visual mode, try <kbd>I</kbd> (capital I) to insert the same text on multiple lines.
              Type your text, then press <kbd>ESC</kbd> – it appears on every selected line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic8;

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
if (!document.head.querySelector("#topic8-animations")) {
  styleSheet.id = "topic8-animations";
  document.head.appendChild(styleSheet);
}