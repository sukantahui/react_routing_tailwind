import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic6_files/topic6_questions";

// Shell script example: create practice file for editing drills
import editPracticeScript from "./topic6_files/edit_practice.sh?raw";

/**
 * Topic6 Component – "Basic editing: x (delete char), dd (delete line), yy (yank line), p (paste)"
 *
 * Purpose:
 *   Teach the fundamental edit commands: delete character (x), delete line (dd),
 *   yank (copy) line (yy), and paste (p) after the cursor or on new line.
 *
 * When & Why Used:
 *   - These are the building blocks of efficient text manipulation.
 *   - Deleting, copying, and pasting without a mouse is a core vi skill.
 *   - Understanding yank/paste registers (even basic unnamed register) is essential.
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic6 = () => {
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
          Basic Editing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">x</code> ·
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">dd</code> ·
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">yy</code> ·
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">p</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION + SVG ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">✂️ Delete, Yank, Paste – the vi way</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              In Normal mode, you can delete and copy text without ever touching the mouse.
              The deleted or yanked (copied) text is stored in a register (like a clipboard).
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">x</kbd> – delete the character under the cursor.</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">dd</kbd> – delete the entire current line.</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">yy</kbd> – yank (copy) the current line into the register.</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">p</kbd> – paste the register content after the cursor (or on next line for lines).</li>
            </ul>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Editing speed comes from combining delete, yank, paste with movements.
                For example, <code>dw</code> deletes a word, <code>y$</code> yanks to line end.
                But <code>x</code> and <code>dd</code> are your daily bread.”
              </p>
            </div>
          </div>

          {/* SVG – animated editing illustration */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 260 180" className="w-full" aria-label="Editing operations visual">
                <rect width="260" height="180" fill="none" />
                
                {/* Original line */}
                <text x="20" y="30" fill="#cbd5e1" fontSize="12" fontFamily="monospace">Hello world!</text>
                {/* Cursor before x */}
                <circle cx="70" cy="25" r="3" fill="#4ade80" />
                <text x="15" y="18" fill="#4ade80" fontSize="8">x → delete 'w'</text>
                <text x="20" y="50" fill="#94a3b8" fontSize="12" fontFamily="monospace">Hello orld!</text>

                {/* dd example */}
                <text x="20" y="80" fill="#facc15" fontSize="8">dd → delete whole line</text>
                <rect x="20" y="88" width="150" height="18" rx="2" fill="#1e293b" stroke="#f87171" strokeWidth="1" />
                <text x="25" y="101" fill="#fca5a5" fontSize="10">This line disappears</text>
                <line x1="170" y1="97" x2="190" y2="97" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrowDel)" />

                {/* yy and p */}
                <text x="20" y="130" fill="#60a5fa" fontSize="8">yy → yank line → p paste below</text>
                <rect x="20" y="138" width="120" height="18" rx="2" fill="#1e293b" stroke="#4ade80" strokeWidth="1" />
                <text x="25" y="151" fill="#86efac" fontSize="10">Copied line</text>
                <rect x="20" y="160" width="120" height="18" rx="2" fill="#1e293b" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4,2" />
                <text x="25" y="173" fill="#c4b5fd" fontSize="10">Pasted line</text>

                <defs>
                  <marker id="arrowDel" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#f87171" />
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
        <h2 className="text-2xl font-semibold">📋 Basic editing commands</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Command</th>
                <th className="px-4 py-2 text-left">Effect</th>
                <th className="px-4 py-2 text-left">Count support</th>
                <th className="px-4 py-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">x</td>
                <td className="px-4 py-2">Delete character under cursor</td>
                <td className="px-4 py-2">Yes: <code>3x</code> deletes 3 chars</td>
                <td className="px-4 py-2 font-mono text-xs">"Hllo" cursor on 'l' → x → "Hlo"</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">dd</td>
                <td className="px-4 py-2">Delete current line</td>
                <td className="px-4 py-2">Yes: <code>3dd</code> deletes 3 lines</td>
                <td className="px-4 py-2 font-mono text-xs">Delete a line, lines below move up</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">yy</td>
                <td className="px-4 py-2">Yank (copy) current line</td>
                <td className="px-4 py-2">Yes: <code>3yy</code> yanks 3 lines</td>
                <td className="px-4 py-2 font-mono text-xs">Yank line to register (unnamed)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 font-mono">p</td>
                <td className="px-4 py-2">Paste after cursor (or below line)</td>
                <td className="px-4 py-2">Yes: <code>3p</code> pastes 3 times</td>
                <td className="px-4 py-2 font-mono text-xs">After dd/yy, p restores content</td>
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
          Student <strong>Swadeep (Barrackpore)</strong> has these lines:
          <pre className="text-xs mt-2 bg-gray-100 dark:bg-gray-900 p-2 rounded">Line one
Line two
Line three</pre>
          He wants to:
          <ul className="list-decimal list-inside ml-4 mt-2">
            <li>Delete the word "one" (cursor on 'o' of "one")</li>
            <li>Yank the entire second line ("Line two")</li>
            <li>Paste it below the third line</li>
          </ul>
          What key sequence (in Normal mode) does he use?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: <kbd>x</kbd> three times (or <kbd>3x</kbd>) to delete "one". Then move to line two (<kbd>j</kbd> or <kbd>2j</kbd> from original position), <kbd>yy</kbd> to yank. Move to line three (<kbd>j</kbd>), then <kbd>p</kbd> pastes below.
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
              <li><code>dd</code> and <code>yy</code> are line‑oriented; for characters, use <code>x</code> or combine with movement: <code>dw</code> (delete word), <code>d$</code> (delete to line end).</li>
              <li>The paste command <code>p</code> puts text after cursor; <code>P</code> puts before cursor (uppercase).</li>
              <li>Deleted text is also yanked (stored in register), so you can <code>dd</code> then <code>p</code> to move a line.</li>
              <li>Use numbered registers: <code>"2p</code> pastes the second previously yanked/deleted text.</li>
              <li>Undo (<code>u</code>) restores deleted or pasted content – don't panic!</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Pressing <code>x</code> in Insert mode – it types 'x' into the file, does not delete.</li>
              <li>Forgetting that <code>dd</code> deletes the entire line, not just from cursor.</li>
              <li>Pasting with <code>p</code> after deleting a line – it will now paste the deleted line (since it's in register).</li>
              <li>Confusing <code>yy</code> (yank) with <code>Y</code> (yank from cursor to end of line).</li>
              <li>Not knowing that after <code>dd</code>, the line is gone but you can <code>p</code> to get it back (unless you deleted again).</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Basic Editing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Use x to delete single characters",
              "Use dd to delete entire lines",
              "Use yy to yank (copy) lines",
              "Use p to paste after cursor (or below line)",
              "Learn P to paste above/ before",
              "Remember: deleted text goes to register, can be pasted",
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
          “You have a line you want to duplicate. You can <code>yy</code> then <code>p</code>.
          What if you want to duplicate the line <strong>above</strong> the current line? Which key instead of <code>p</code>?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: Capital <code>P</code> (Shift+p) pastes before the cursor (or above the current line for line‑wise content).
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: editing drills</h2>
        <ShellFileLoader
          fileModule={editPracticeScript}
          title="Interactive editing practice"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a file with specific tasks to practice x, dd, yy, and p. Follow the instructions inside vi.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Basic Editing – FAQs" questions={questions} />

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
              “When I taught <strong>Debangshu from Naihati</strong>, he kept reaching for the mouse to copy-paste.
              I told him: ‘In vi, you never need a mouse.’ We practiced <code>yy</code> and <code>p</code> for an hour.
              Now he’s a believer. These four commands—<code>x, dd, yy, p</code>—are the foundation of editing speed.
              Master them, and you’ll never go back to right‑click menus.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: Practice moving a line from the bottom to the top: <code>G</code> (go to last line), <code>dd</code>, then <code>gg</code>, then <code>P</code> (uppercase) to paste above first line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic6;

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
if (!document.head.querySelector("#topic6-animations")) {
  styleSheet.id = "topic6-animations";
  document.head.appendChild(styleSheet);
}