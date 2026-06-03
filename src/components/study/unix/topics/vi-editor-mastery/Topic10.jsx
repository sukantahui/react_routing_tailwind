import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic10_files/topic10_questions";

// Shell script example: create practice file for global substitution drills
import globalSubPracticeScript from "./topic10_files/global_sub_practice.sh?raw";

/**
 * Topic10 Component – "Global substitution with range: :%s/old/new/g"
 *
 * Purpose:
 *   Teach how to perform substitutions over a range of lines: the entire file (%),
 *   specific line numbers (1,5), or the last visual selection ('<,'>).
 *
 * When & Why Used:
 *   - Refactoring variable names across entire codebase.
 *   - Fixing typos in configuration files.
 *   - Batch changes in logs or CSV data.
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic10 = () => {
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
          Global Substitution
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">:%s/old/new/g</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">:1,5s/old/new/g</code> ·{' '}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{`:'<,'>s/old/new/g`}</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION + SVG ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">🌎 Replace across many lines</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              The substitute command can take a range of lines. Instead of just the current line,
              you can replace on line 1 to 5, the entire file, or any selected range.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code className="font-mono">:%s/old/new/g</code> – replace in the whole file (<code>%</code> means 1 to $).</li>
              <li><code className="font-mono">:1,5s/old/new/g</code> – replace on lines 1 through 5.</li>
              <li><code className="font-mono">:.,+3s/old/new/g</code> – from current line to 3 lines below.</li>
              <li><code className="font-mono">{`:'<,'>s/old/new/g`}</code> – replace in last visual selection.</li>
            </ul>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Never manually change a variable name line by line. Learn <code>:%s</code> and you can
                refactor an entire project in seconds. Always preview with <code>gc</code> (confirm) first.”
              </p>
            </div>
          </div>

          {/* SVG – global replace illustration */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 260 160" className="w-full" aria-label="Global substitution example">
                <rect width="260" height="160" fill="none" />
                
                {/* File lines */}
                <rect x="20" y="10" width="180" height="120" rx="4" fill="#1e293b" stroke="#4ade80" strokeWidth="1" />
                <text x="30" y="30" fill="#cbd5e1" fontSize="10">Line 1: foo bar</text>
                <text x="30" y="45" fill="#cbd5e1" fontSize="10">Line 2: foo baz</text>
                <text x="30" y="60" fill="#cbd5e1" fontSize="10">Line 3: foo qux</text>
                <text x="30" y="75" fill="#cbd5e1" fontSize="10">Line 4: bar foo</text>
                <text x="30" y="90" fill="#cbd5e1" fontSize="10">Line 5: baz foo</text>
                
                {/* Replace marker */}
                <path d="M210 40 L230 40 L230 80 L210 80" fill="none" stroke="#facc15" strokeWidth="1.5" />
                <text x="180" y="55" fill="#fde047" fontSize="8" textAnchor="end">:%s/foo/bar/g</text>
                
                {/* Result lines */}
                <text x="30" y="120" fill="#a78bfa" fontSize="10">→ all 'foo' → 'bar'</text>
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
        <h2 className="text-2xl font-semibold">📋 Range substitution commands</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Command</th>
                <th className="px-4 py-2 text-left">Range</th>
                <th className="px-4 py-2 text-left">Effect</th>
                <th className="px-4 py-2 text-left">Example use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:%s/old/new/g</td>
                <td className="px-4 py-2">Entire file (1 to $)</td>
                <td className="px-4 py-2">Replace all occurrences everywhere</td>
                <td className="px-4 py-2">Rename variable across script</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:1,5s/old/new/g</td>
                <td className="px-4 py-2">Lines 1 to 5 inclusive</td>
                <td className="px-4 py-2">Replace only within those lines</td>
                <td className="px-4 py-2">Fix header in first 5 lines of CSV</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:.,+3s/old/new/g</td>
                <td className="px-4 py-2">Current line (.) to +3 lines</td>
                <td className="px-4 py-2">Relative range, easy to adjust</td>
                <td className="px-4 py-2">Working on a block of code</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">{`:'<,'>s/old/new/g`}</td>
                <td className="px-4 py-2">Last visual selection</td>
                <td className="px-4 py-2">Replace only in highlighted area</td>
                <td className="px-4 py-2">Select function body visually, then substitute</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">:1,$s/old/new/g</td>
                <td className="px-4 py-2">Same as %</td>
                <td className="px-4 py-2">From first line to last</td>
                <td className="px-4 py-2">Alternative to % for clarity</td>
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
          Student <strong>Abhronila (Shyamnagar)</strong> has a file with 100 lines.
          She needs to change the word "temp" to "final" only in lines 20 to 30.
          What command does she use?
          <br />
          Later, she wants to change the same word in the entire file but only where the line also contains "debug".
          How can she combine search and substitution?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: <code>:20,30s/temp/final/g</code><br />
          For conditional substitution: <code>:g/debug/s/temp/final/g</code> (global command, which we'll cover later) or use <code>:grep</code> then substitute.
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
              <li>Always use <code>:%s/old/new/gc</code> first to preview changes – 'c' for confirm.</li>
              <li>After a visual selection, <code>{`:'<,'>s/old/new/g`}</code> appears automatically when you press <code>:</code>.</li>
              <li>Use <code>:g/pattern/s/old/new/g</code> to replace only on lines matching another pattern.</li>
              <li>To replace on lines NOT matching a pattern: <code>:v/pattern/s/old/new/g</code> (v for inverse).</li>
              <li>Use <code>\&lt;\&gt;</code> for whole word matching: <code>:%s/\&lt;foo\&gt;/bar/g</code>.</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Forgetting the <code>g</code> flag – only first occurrence per line changes.</li>
              <li>Using <code>:%s</code> without checking – accidentally replacing too many things.</li>
              <li>Not escaping slashes when the pattern contains '/' (use different delimiter).</li>
              <li>Assuming <code>%</code> works in all vi variants – it's safe (POSIX).</li>
              <li>Not knowing that <code>:%s</code> changes the file buffer – you can still undo with <code>u</code> if you act quickly.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Global Substitution</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Use % for entire file: :%s/old/new/g",
              "Use line numbers: :20,30s/old/new/g",
              "Use visual selection: 'v' then ':' then s/old/new/g",
              "Add 'c' for confirmation: :%s/old/new/gc",
              "Escape special characters in patterns",
              "Use g flag to replace all on each line",
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
          “You want to replace 'color' with 'colour' but only in lines that contain 'color' (to avoid unnecessary changes).
          How can you combine the global command <code>:g</code> with substitute?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: <code>:g/color/s/color/colour/g</code> will find lines with 'color' and substitute within them.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: global substitution drills</h2>
        <ShellFileLoader
          fileModule={globalSubPracticeScript}
          title="Interactive global substitution practice"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a file with tasks for <code>:%s</code>, ranges, and visual selection substitutes.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Global Substitution – FAQs" questions={questions} />

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
              “<strong>Swadeep from Barrackpore</strong> once had to change a function name in 50 files.
              He was going to edit each file manually. I taught him <code>:%s/old/new/g</code> combined with <code>:wnext</code>.
              He finished in 2 minutes. Global substitution is how professionals edit at scale.
              Always use <code>gc</code> the first time to avoid disasters.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: In vim, after a successful <code>:%s</code>, you can press <code>&amp;</code> (ampersand) to repeat the last substitute with the same range.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic10;

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
if (!document.head.querySelector("#topic10-animations")) {
  styleSheet.id = "topic10-animations";
  document.head.appendChild(styleSheet);
}