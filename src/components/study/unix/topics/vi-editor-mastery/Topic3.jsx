import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic3_files/topic3_questions";

// Shell script example: generate a practice file with navigation exercises
import navPracticeScript from "./topic3_files/navigation_practice.sh?raw";

/**
 * Topic3 Component – "Normal mode navigation: h, j, k, l, w, b, 0, $, gg, G"
 *
 * Purpose:
 *   Teach fundamental cursor movement in Normal mode: character (h/j/k/l), word (w/b),
 *   line start/end (0/$), and file start/end (gg/G). These keys keep hands on the home row.
 *
 * When & Why Used:
 *   - Efficient navigation is the first step to editing speed.
 *   - Avoid arrow keys – they require moving hands from home row.
 *   - Essential for editing configuration files, code, or logs without a mouse.
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic3 = () => {
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
          Normal Mode Navigation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">h j k l</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">w b</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">0 $</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">gg G</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT + SVG KEYBOARD ILLUSTRATION ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">⌨️ Home row navigation – no arrow keys needed</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              In Normal mode, the keys <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">h</kbd>,{' '}
              <kbd className="px-1">j</kbd>, <kbd className="px-1">k</kbd>, <kbd className="px-1">l</kbd> move the cursor
              left, down, up, and right respectively. Your right hand stays on the home row – no reaching for arrows.
            </p>
            <p>
              <strong>Word navigation:</strong> <kbd>w</kbd> jumps to the start of the next word,{' '}
              <kbd>b</kbd> moves back to the previous word. <strong>Line navigation:</strong>{' '}
              <kbd>0</kbd> goes to the beginning of the line, <kbd>$</kbd> to the end.
              <strong> File navigation:</strong> <kbd>gg</kbd> goes to the first line,{' '}
              <kbd>G</kbd> jumps to the last line.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Never use arrow keys in vi. They force your hand off the home row, breaking momentum.
                Memorize <kbd>h j k l</kbd> – it feels unnatural for a day, then magical forever.”
              </p>
            </div>
          </div>

          {/* SVG – stylized keyboard with arrows and word navigation animation */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 280 200" className="w-full" aria-label="Keyboard navigation keys illustration">
                <rect width="280" height="200" fill="none" />
                {/* Home row keys */}
                <rect x="20" y="80" width="40" height="40" rx="4" fill="#1f2937" stroke="#4ade80" strokeWidth="1.5" />
                <text x="40" y="105" fill="#4ade80" fontSize="16" textAnchor="middle" fontWeight="bold">h</text>
                <rect x="65" y="80" width="40" height="40" rx="4" fill="#1f2937" stroke="#4ade80" strokeWidth="1.5" />
                <text x="85" y="105" fill="#4ade80" fontSize="16" textAnchor="middle" fontWeight="bold">j</text>
                <rect x="110" y="80" width="40" height="40" rx="4" fill="#1f2937" stroke="#4ade80" strokeWidth="1.5" />
                <text x="130" y="105" fill="#4ade80" fontSize="16" textAnchor="middle" fontWeight="bold">k</text>
                <rect x="155" y="80" width="40" height="40" rx="4" fill="#1f2937" stroke="#4ade80" strokeWidth="1.5" />
                <text x="175" y="105" fill="#4ade80" fontSize="16" textAnchor="middle" fontWeight="bold">l</text>

                {/* Word keys */}
                <rect x="30" y="140" width="40" height="35" rx="4" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                <text x="50" y="162" fill="#a5b4fc" fontSize="14" textAnchor="middle" fontWeight="bold">w</text>
                <rect x="80" y="140" width="40" height="35" rx="4" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                <text x="100" y="162" fill="#a5b4fc" fontSize="14" textAnchor="middle" fontWeight="bold">b</text>

                {/* Line keys */}
                <rect x="140" y="140" width="40" height="35" rx="4" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
                <text x="160" y="162" fill="#f9a8d4" fontSize="14" textAnchor="middle" fontWeight="bold">0</text>
                <rect x="190" y="140" width="40" height="35" rx="4" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
                <text x="210" y="162" fill="#f9a8d4" fontSize="14" textAnchor="middle" fontWeight="bold">$</text>

                {/* File keys */}
                <rect x="130" y="30" width="50" height="35" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                <text x="155" y="52" fill="#6ee7b7" fontSize="13" textAnchor="middle" fontWeight="bold">gg</text>
                <rect x="190" y="30" width="50" height="35" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                <text x="215" y="52" fill="#6ee7b7" fontSize="13" textAnchor="middle" fontWeight="bold">G</text>

                {/* Animated cursor */}
                <circle cx="40" cy="100" r="3" fill="#facc15">
                  <animate attributeName="cx" values="40;85;130;175;40" dur="8s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="100;100;100;100;100" dur="8s" repeatCount="indefinite" />
                </circle>
                <text x="10" y="30" fill="#9ca3af" fontSize="8">← h  j  k  l →</text>
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
        <h2 className="text-2xl font-semibold">📋 Navigation commands at a glance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Command</th>
                <th className="px-4 py-2 text-left">Effect</th>
                <th className="px-4 py-2 text-left">Example scenario</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">h</td><td>Move cursor left one character</td><td>Fix a typo one character back</td></tr>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">j</td><td>Move cursor down one line</td><td>Scroll down line by line</td></tr>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">k</td><td>Move cursor up one line</td><td>Go back up while reading</td></tr>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">l</td><td>Move cursor right one character</td><td>Step forward in a word</td></tr>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">w</td><td>Jump to start of next word</td><td>Hop between variable names</td></tr>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">b</td><td>Jump back to start of previous word</td><td>Correct an earlier word</td></tr>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">0</td><td>Move to beginning of the line</td><td>Go to start to insert at column 1</td></tr>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">$</td><td>Move to end of the line</td><td>Append text at line end</td></tr>
              <tr className="border-b border-gray-200 dark:border-gray-700"><td className="px-4 py-2 font-mono">gg</td><td>Go to first line of file</td><td>Jump to top of log file</td></tr>
              <tr><td className="px-4 py-2 font-mono">G</td><td>Go to last line of file</td><td>Jump to bottom of config</td></tr>
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
          Student <strong>Abhronila (Shyamnagar)</strong> has a file with 200 lines. The cursor is on line 50, column 10.
          She wants to:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Move to the very last line of the file</li>
            <li>Then jump to the beginning of that line</li>
            <li>Then move one word backward</li>
          </ul>
          What key sequence does she use in Normal mode?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: <kbd>G</kbd> (go to last line), then <kbd>0</kbd> (start of line), then <kbd>b</kbd> (back one word).
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
              <li>Use numbers to repeat: <kbd>5j</kbd> moves down 5 lines, <kbd>3w</kbd> moves 3 words forward.</li>
              <li><kbd>H</kbd>, <kbd>M</kbd>, <kbd>L</kbd> move to Top, Middle, Bottom of visible screen.</li>
              <li><kbd>Ctrl+u</kbd> and <kbd>Ctrl+d</kbd> scroll half pages up/down.</li>
              <li><kbd>gg=G</kbd> reindents the whole file (works in vim).</li>
              <li><kbd>%</kbd> jumps between matching parentheses/brackets.</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Using arrow keys instead of <kbd>hjkl</kbd> – slows you down.</li>
              <li>Forgetting that <kbd>w</kbd> and <kbd>b</kbd> stop at punctuation – use <kbd>W</kbd> and <kbd>B</kbd> for WORDs (spaces only).</li>
              <li>Pressing <kbd>g</kbd> alone (must be <kbd>gg</kbd>).</li>
              <li>Confusing <kbd>0</kbd> (zero) with <kbd>o</kbd> (letter o) – very different!</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Navigation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Use h j k l instead of arrow keys",
              "Practice counting: 4j, 3w, etc.",
              "Remember 0 (zero) for line start, $ for line end",
              "gg goes to top, G goes to bottom",
              "w moves forward a word, b moves backward",
              "Avoid reaching for mouse – keep fingers on home row",
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
          “When you press <kbd>w</kbd> in a line that says <code className="text-xs">foo_bar</code>, where does the cursor stop?
          What about <kbd>W</kbd>? Try to predict before testing.”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: <kbd>w</kbd> stops at underscores and punctuation; <kbd>W</kbd> stops only at spaces.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: navigation drills</h2>
        <ShellFileLoader
          fileModule={navPracticeScript}
          title="Interactive navigation practice (run to generate a practice file)"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a file with numbered lines and navigation exercises. Open it with vi and practice moving without arrow keys.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Vi Navigation – FAQs" questions={questions} />

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
              “When I taught <strong>Swadeep from Barrackpore</strong>, he kept using the arrow keys. I covered them with tape.
              A week later, he was the fastest editor in the class. The secret: <kbd>h j k l</kbd> become second nature.
              Start with <strong>no arrow keys rule</strong> for one hour – you’ll be amazed.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: Use <code>vimtutor</code> lesson 1 to practice these movements interactively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic3;

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
if (!document.head.querySelector("#topic3-animations")) {
  styleSheet.id = "topic3-animations";
  document.head.appendChild(styleSheet);
}