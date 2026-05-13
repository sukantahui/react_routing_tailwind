import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic2_files/topic2_questions";

// Shell script example: demonstrate mode switching with a practice file
import modePracticeScript from "./topic2_files/mode_practice.sh?raw";

/**
 * Topic2 Component – "Understanding vi modes: Normal, Insert, Command (Last-line)"
 *
 * Purpose:
 *   Explain the modal nature of vi: Normal mode (navigation/commands), Insert mode (text entry),
 *   and Command/Last-line mode (ex commands like :w, :q). Teach how to switch between them.
 *
 * When & Why Used:
 *   - Modal editing is the most confusing concept for beginners but the most powerful.
 *   - Understanding modes unlocks efficient editing without removing hands from keyboard.
 *   - Every vi action depends on being in the correct mode.
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic2 = () => {
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
          Understanding vi Modes
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Normal · Insert · Command (Last‑line)
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION WITH SVG ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">🎭 Why modes? The superpower of vi</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 leading-relaxed">
            <p>
              Unlike modeless editors (Notepad, nano), vi separates <strong>navigation/commands</strong> from
              <strong>text insertion</strong>. This allows you to move and edit without reaching for the mouse or
              arrow keys – your hands stay on the home row.
            </p>
            <p>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Normal mode</span> (default):
              Press keys to move, delete, copy, paste. No text is added.
              <br />
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Insert mode</span>:
              Type text normally. Everything you type appears in the file.
              <br />
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Command (Last‑line) mode</span>:
              Entered by pressing <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">:</code> from Normal mode.
              Used for saving, quitting, search/replace, settings.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Most of your time should be in Normal mode. Only enter Insert mode to add/change text, then
                <kbd className="px-1">ESC</kbd> back to Normal. This keeps your editing fluent.”
              </p>
            </div>
          </div>

          {/* SVG – mode transition diagram with animation */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 260 200" className="w-full" aria-label="Vi modes and transitions">
                <rect width="260" height="200" fill="none" />
                {/* Normal Mode Box */}
                <rect x="10" y="20" width="100" height="50" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                <text x="60" y="50" fill="#fde047" fontSize="12" textAnchor="middle" fontWeight="bold">NORMAL</text>
                {/* Insert Mode Box */}
                <rect x="150" y="20" width="100" height="50" rx="8" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                <text x="200" y="50" fill="#fde047" fontSize="12" textAnchor="middle" fontWeight="bold">INSERT</text>
                {/* Command Mode Box */}
                <rect x="80" y="130" width="100" height="50" rx="8" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
                <text x="130" y="160" fill="#fde047" fontSize="12" textAnchor="middle" fontWeight="bold">COMMAND</text>

                {/* Arrows with animations */}
                {/* Normal -> Insert (i, a, o, etc) */}
                <line x1="110" y1="45" x2="148" y2="45" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGreen)" />
                <text x="130" y="35" fill="#86efac" fontSize="9" textAnchor="middle">i, a, o, O</text>
                {/* Insert -> Normal (ESC) */}
                <line x1="150" y1="60" x2="112" y2="60" stroke="#facc15" strokeWidth="2" markerEnd="url(#arrowYellow)" />
                <text x="130" y="75" fill="#fde047" fontSize="9" textAnchor="middle">ESC</text>

                {/* Normal -> Command (:) */}
                <line x1="80" y1="70" x2="100" y2="128" stroke="#f87171" strokeWidth="2" markerEnd="url(#arrowRed)" />
                <text x="70" y="100" fill="#fca5a5" fontSize="9">:</text>
                {/* Command -> Normal (Enter or ESC) */}
                <line x1="160" y1="128" x2="140" y2="70" stroke="#facc15" strokeWidth="2" markerEnd="url(#arrowYellow)" />
                <text x="165" y="100" fill="#fde047" fontSize="8">Enter/ESC</text>

                {/* Markers */}
                <defs>
                  <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#4ade80" />
                  </marker>
                  <marker id="arrowYellow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#facc15" />
                  </marker>
                  <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#f87171" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== MODE CARDS ======================== */}
      <div
        className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">📌 The Three Modes in Detail</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Normal Mode",
              color: "blue",
              desc: "The default state after opening vi. Every key is a command (not text).",
              keys: "h j k l (move), x (delete), dd (delete line), yy (copy), p (paste)",
              tip: "Press ESC to return here from any other mode.",
            },
            {
              title: "Insert Mode",
              color: "green",
              desc: "Type text just like a normal editor. All keys produce characters.",
              keys: "i (insert before cursor), a (append after), o (new line below), O (above), I (start of line), A (end of line)",
              tip: "The bottom left shows '-- INSERT --' when you are here.",
            },
            {
              title: "Command (Last-line) Mode",
              color: "red",
              desc: "Entered by typing `:` in Normal mode. Execute multi-character commands.",
              keys: ":w (save), :q (quit), :wq (save & quit), :q! (force quit), :set number (show line numbers)",
              tip: "Press ESC to cancel a partial command and return to Normal.",
            },
          ].map((mode, idx) => (
            <div
              key={idx}
              className={clsx(
                "rounded-2xl p-5 bg-white dark:bg-gray-800 border",
                mode.color === "blue" && "border-blue-200 dark:border-blue-800 hover:border-blue-400",
                mode.color === "green" && "border-green-200 dark:border-green-800 hover:border-green-400",
                mode.color === "red" && "border-red-200 dark:border-red-800 hover:border-red-400",
                "shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              )}
            >
              <h3 className="text-xl font-bold mb-2">
                {mode.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{mode.desc}</p>
              <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs font-mono">
                {mode.keys}
              </div>
              <p className="text-xs mt-2 italic">💡 {mode.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ======================== PRACTICE SCENARIO ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl"
        style={{ animationFillMode: "both" }}
      >
        <h3 className="text-lg font-bold mb-2">🧪 Try this mental exercise</h3>
        <p className="text-sm">
          Student <strong>Debangshu (Naihati)</strong> opens vi and sees a file. He wants to add a line at the bottom.
          He presses <kbd>A</kbd> (capital A) – what happens? He types his text, then presses <kbd>ESC</kbd>.
          Now he wants to save and quit. What does he type?
        </p>
        <p className="text-sm mt-2 text-emerald-600 dark:text-emerald-400">
          Answer: <kbd>A</kbd> moves to end of line and enters Insert mode. After typing, <kbd>ESC</kbd> returns to Normal.
          Then <kbd>:</kbd> then <kbd>wq</kbd> then <kbd>Enter</kbd> saves and quits.
        </p>
      </div>

      {/* ======================== TIPS, PITFALLS, BEST PRACTICES ======================== */}
      <div
        className="space-y-5 animate-[fadeSlideUp_0.6s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.35s]"
        style={{ animationFillMode: "both" }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">💡 Pro Tips</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Always know which mode you're in – look at the bottom left indicator.</li>
              <li>Press <kbd>ESC</kbd> multiple times – it's safe and ensures you are in Normal mode.</li>
              <li>Use <kbd>i</kbd> to insert, <kbd>a</kbd> to append after cursor, <kbd>A</kbd> to append at end of line.</li>
              <li>Use <kbd>o</kbd> to open a new line below and enter Insert mode – very efficient.</li>
              <li>From Normal, <kbd>:</kbd> gives you command mode; after typing command, press <kbd>Enter</kbd>.</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Typing text while in Normal mode – results in mysterious jumps/deletions.</li>
              <li>Not knowing how to exit Insert mode – keep pressing <kbd>ESC</kbd>.</li>
              <li>Forgetting the colon before commands: typing <kbd>w</kbd> in Normal mode writes the file? No, that's wrong.</li>
              <li>Staying in Insert mode all the time – defeats the power of vi.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Modes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Start in Normal mode (always after opening)",
              "Press `i` to enter Insert mode",
              "Press `ESC` to return to Normal",
              "Press `:` to enter Command mode from Normal",
              "Type `wq` + Enter to save and quit",
              "Look for '-- INSERT --' or ':' prompt to know your mode",
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
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl"
        style={{ animationFillMode: "both" }}
      >
        <p className="font-semibold">🤔 Think about…</p>
        <p className="text-sm mt-1">
          “You are in Insert mode and you want to save the file. Can you type `:w` directly?
          Try it – what happens? What must you do first?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: `:` is just a colon character in Insert mode. You need to exit Insert mode first.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practice script: mode switching</h2>
        <ShellFileLoader
          fileModule={modePracticeScript}
          title="Interactive mode practice guide"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script creates a practice file and walks you through mode transitions. Run it and follow along.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Vi Modes – FAQs" questions={questions} />

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
              “The modal concept is the single biggest hurdle for new vi users. I have taught students like{' '}
              <strong>Swadeep (Barrackpore)</strong> and <strong>Tuhina (Ichapur)</strong> who would panic and
              restart the terminal. The key is repetition: <br />
              <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">ESC</kbd> → Normal mode (home base).
              <kbd className="px-1">i</kbd> → Insert. <kbd className="px-1">:</kbd> → Command. <br />
              Practice this five times: open vi, press <kbd>i</kbd>, type a word, press <kbd>ESC</kbd>,
              press <kbd>:</kbd> <kbd>q</kbd> <kbd>!</kbd> <kbd>Enter</kbd>. You’ve mastered the modes.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip: Write a reminder on a sticky note: “In Normal mode: `i` to insert, `:` for commands, `ESC` to escape.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic2;

// Reuse same keyframes (ensure global but scoped to component)
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
if (!document.head.querySelector("#topic2-animations")) {
  styleSheet.id = "topic2-animations";
  document.head.appendChild(styleSheet);
}