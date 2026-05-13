import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic9_files/topic9_questions";

// Shell script example: create practice file for search/replace drills
import searchPracticeScript from "./topic9_files/search_practice.sh?raw";

/**
 * Topic9 Component – "Search and replace: /pattern, n, N, :s/old/new/g"
 *
 * Purpose:
 *   Teach how to search for patterns using / and ?, navigate matches with n and N,
 *   and perform substitution on the current line with :s/old/new/g.
 *
 * When & Why Used:
 *   - Finding specific text in config files, logs, or code is essential.
 *   - Substitution on a line fixes typos or renames variables without global changes.
 *   - Search is the foundation for global substitution (next topic).
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic9 = () => {
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
          Search and Replace (Line)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">/pattern</code> ·
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">n</code> ·
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">N</code> ·
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">:s/old/new/g</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION + SVG ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">🔍 Find text, then change it</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              Vi provides powerful search and replace. You can search forward with <code>/pattern</code>
              or backward with <code>?pattern</code>. Then <kbd>n</kbd> repeats the search in the same direction,
              <kbd>N</kbd> reverses direction.
            </p>
            <p>
              To replace text on the current line, use the substitute command:
              <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
                :s/old/new/g
              </code>
              The <code>g</code> flag replaces all occurrences on the line; without it, only the first is replaced.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Search is your flashlight in the dark. Master <code>/</code> and <code>n</code> to navigate
                large files. Then learn <code>:s</code> to surgically fix mistakes on a line.”
              </p>
            </div>
          </div>

          {/* SVG – search and replace illustration */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 260 160" className="w-full" aria-label="Search and replace example">
                <rect width="260" height="160" fill="none" />
                
                {/* Original line */}
                <text x="20" y="30" fill="#cbd5e1" fontSize="12" fontFamily="monospace">The cat sat on the mat.</text>
                {/* Search highlight */}
                <rect x="28" y="18" width="30" height="14" fill="#facc15" fillOpacity="0.4" />
                <text x="20" y="50" fill="#fde047" fontSize="9">/cat → n finds 'cat'</text>

                {/* After replace */}
                <text x="20" y="80" fill="#4ade80" fontSize="12" fontFamily="monospace">The dog sat on the mat.</text>
                <text x="20" y="100" fill="#86efac" fontSize="9">:s/cat/dog/</text>

                {/* Command display */}
                <rect x="20" y="120" width="220" height="24" rx="4" fill="#1e293b" stroke="#60a5fa" strokeWidth="1" />
                <text x="30" y="136" fill="#facc15" fontSize="11" fontFamily="monospace">:s/old/new/g</text>
                <text x="130" y="136" fill="#94a3b8" fontSize="9">→ replace all on line</text>
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
        <h2 className="text-2xl font-semibold">📋 Search and replace commands</h2>
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
                <td className="px-4 py-2 font-mono">/pattern</td>
                <td className="px-4 py-2">Search forward for pattern</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Press Enter, then n/N to navigate</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">?pattern</td>
                <td className="px-4 py-2">Search backward for pattern</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Same as / but reverse direction</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">n</td>
                <td className="px-4 py-2">Repeat last search (same direction)</td>
                <td className="px-4 py-2">Yes (e.g., `3n`)</td>
                <td className="px-4 py-2">Very fast for repeated matches</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">N</td>
                <td className="px-4 py-2">Repeat last search (opposite direction)</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2">Shift+n</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:s/old/new/</td>
                <td className="px-4 py-2">Replace first 'old' on current line</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Without 'g' flag</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:s/old/new/g</td>
                <td className="px-4 py-2">Replace all 'old' on current line</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">'g' = global on the line</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:s/old/new/gc</td>
                <td className="px-4 py-2">Replace with confirmation</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Asks 'y/n' for each match</td>
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
          Student <strong>Tuhina (Ichapur)</strong> has a line:
          <code className="block text-xs mt-1 bg-gray-100 dark:bg-gray-900 p-2 rounded">foo foo bar foo</code>
          She wants to replace only the first 'foo' with 'baz'. What command?
          <br />
          Then she wants to replace all remaining 'foo' (the second and third) with 'baz' in one command.
          What command?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: First replace: <code>:s/foo/baz/</code> (no g). Result: <code>baz foo bar foo</code><br />
          Then replace all: <code>:s/foo/baz/g</code> (with g). Result: <code>baz baz bar baz</code>
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
              <li>Use <code>n</code> to jump to the next match without re‑typing the pattern.</li>
              <li>After <code>/pattern</code>, you can use <code>c</code> (change), <code>d</code> (delete), etc., on the match.</li>
              <li>Use <code>//</code> (empty pattern) to repeat the last search in a substitute: <code>:s//new/g</code>.</li>
              <li>Add <code>c</code> flag for confirmation: <code>:s/old/new/gc</code> – great for careful replacements.</li>
              <li>Use <code>\&lt;</code> and <code>\&gt;</code> to match whole words: <code>:s/&lt;foo&gt;/bar/</code>.</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Pressing <kbd>/</kbd> but forgetting to press Enter – you remain in search prompt.</li>
              <li>Using <code>:s/old/new</code> without <code>g</code> and wondering why only first match changed.</li>
              <li>Not escaping special characters (<code>.</code>, <code>*</code>, <code>[</code>, etc.) in search patterns.</li>
              <li>Thinking <code>n</code> works after <code>:s</code> – it doesn't; <code>n</code> only repeats last search, not substitute.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Search & Line Replace</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Use /pattern to search forward",
              "Use ?pattern to search backward",
              "Use n for next match, N for previous",
              "Use :s/old/new/ to replace first match on line",
              "Add g to replace all on line: :s/old/new/g",
              "Add c for confirmation: :s/old/new/gc",
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
          “You search for <code>/the</code> and press <code>n</code> a few times. You overshoot and want to go back one match.
          Which key do you press?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: <kbd>N</kbd> (Shift+n) repeats search in the opposite direction.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: search & line replace drills</h2>
        <ShellFileLoader
          fileModule={searchPracticeScript}
          title="Interactive search and replace practice"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a file with tasks to practice search, navigation, and substitution on a line.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Search and Replace (Line) – FAQs" questions={questions} />

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
              “<strong>Abhronila from Shyamnagar</strong> was once debugging a large configuration file.
              She needed to find all occurrences of 'AllowOverride' and then change the value on a specific line.
              I showed her <code>/AllowOverride</code>, then <code>n</code> to jump, then <code>:s/None/All/g</code>.
              She solved it in seconds. Search and line replace are surgical tools – learn them well.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: After a search, use <code>cgn</code> (change next match) in vim to replace and automatically go to the next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic9;

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
if (!document.head.querySelector("#topic9-animations")) {
  styleSheet.id = "topic9-animations";
  document.head.appendChild(styleSheet);
}