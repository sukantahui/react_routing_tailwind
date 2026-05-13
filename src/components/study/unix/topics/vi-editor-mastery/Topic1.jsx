import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic
import questions from "./topic1_files/topic1_questions";

// Shell script example: creating and opening a new file with vi
import startViScript from "./topic1_files/start_vi.sh?raw";

/**
 * Topic1 Component – "Starting vi: `vi filename`, `vim filename`"
 *
 * Purpose:
 *   Teach how to launch vi/vim from the command line, including creating new files,
 *   opening existing ones, and understanding the basic differences between vi and vim.
 *
 * When & Why Used:
 *   - Every Unix/Linux session begins with invoking the editor.
 *   - Understanding the command arguments allows efficient workflow.
 *   - Knowing `vi` vs `vim` helps portability across systems.
 *
 * Return:
 *   A full‑width React component with dark mode, animations, and interactive examples.
 */
const Topic1 = () => {
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
          Starting vi / vim
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          The very first command: <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">vi filename</code>
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* ======================== CONCEPT EXPLANATION ======================== */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">📂 Opening files with vi/vim</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3 leading-relaxed">
            <p>
              To start vi, type <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">vi</code> followed by a filename.
              If the file exists, vi opens it; if it doesn't, vi creates a new buffer that will be saved to that name.
            </p>
            <p>
              The command <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">vim filename</code> does the same but
              uses the enhanced Vim editor (with syntax highlighting, undo history, etc.) if installed. On many systems, <code>vi</code> is
              actually an alias for <code>vim</code> in minimal mode.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Always use <code>vi</code> in scripts for compatibility. Use <code>vim</code> interactively when you need advanced features.”
              </p>
            </div>
          </div>

          {/* SVG – terminal animation showing vi command */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 240 140" className="w-full" aria-label="Terminal showing vi command">
                <rect width="240" height="140" rx="8" fill="#1e1e2e" stroke="#4ade80" strokeWidth="1.5" />
                <text x="15" y="30" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
                  <tspan fill="#fde047">$</tspan> <tspan fill="#60a5fa">vi</tspan> <tspan fill="#a5f3fc">config.txt</tspan>
                </text>
                <text x="15" y="55" fill="#94a3b8" fontSize="10">
                  "config.txt" [New File]
                </text>
                <text x="15" y="80" fill="#4ade80" fontSize="10">
                  ~
                </text>
                <text x="15" y="100" fill="#4ade80" fontSize="10">
                  ~
                </text>
                <rect x="15" y="115" width="6" height="14" fill="#4ade80">
                  <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                </rect>
                <text x="170" y="130" fill="#6b7280" fontSize="8">-- INSERT --</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== COMMAND VARIANTS (CARDS) ======================== */}
      <div
        className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">⚡ Different ways to start vi/vim</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "vi filename",
              desc: "Open existing file or create new one. Uses system's default vi (may be vim, nvi, or busybox vi).",
              example: "$ vi /etc/hosts",
            },
            {
              title: "vim filename",
              desc: "Explicitly use Vim (if installed). Features syntax highlighting, visual mode, and more.",
              example: "$ vim myscript.py",
            },
            {
              title: "vi -R filename",
              desc: "Open file read‑only. Prevents accidental modifications (same as `view`).",
              example: "$ vi -R /etc/passwd",
            },
            {
              title: "view filename",
              desc: "Read‑only mode, equivalent to `vi -R`. Ideal for browsing configs.",
              example: "$ view /var/log/syslog",
            },
            {
              title: "vi +n filename",
              desc: "Open file and jump directly to line number n.",
              example: "$ vi +42 script.sh",
            },
            {
              title: "vi +/pattern file",
              desc: "Open file and search forward for pattern, placing cursor on first match.",
              example: "$ vi +/error log.txt",
            },
          ].map((cmd, idx) => (
            <div
              key={idx}
              className={clsx(
                "rounded-2xl p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                "shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
                "hover:border-teal-300 dark:hover:border-teal-600"
              )}
            >
              <h3 className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-400">{cmd.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{cmd.desc}</p>
              <code className="block text-xs bg-gray-100 dark:bg-gray-900 p-1 rounded mt-2">{cmd.example}</code>
            </div>
          ))}
        </div>
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
              <li>Use <code className="font-mono">vi -</code> to read from stdin: <code>cat file | vi -</code></li>
              <li><code className="font-mono">vi -c "command" file</code> runs an ex command immediately after opening.</li>
              <li><code className="font-mono">vim -g</code> starts GVim if you have a GUI (rare on servers).</li>
              <li>Add <code className="font-mono">set -o vi</code> to your <code>.bashrc</code> to use vi keybindings in the shell itself.</li>
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Typing <code>vi filename</code> but forgetting the filename – starts vi with no file (you can still save later with <code>:w name</code>).</li>
              <li>Assuming <code>vi</code> equals <code>vim</code> and relying on unsupported features (e.g., multiple undo levels).</li>
              <li>Opening system files without <code>sudo</code>, then stuck because they cannot write.</li>
              <li>Not knowing how to quit: <code>:q!</code> is the emergency exit.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – Starting vi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "Use `vi filename` to create a new file",
              "Use `vi -R` or `view` for read‑only browsing",
              "Remember `:q!` to force quit without saving",
              "Use `vi +n` to jump to a line",
              "Distinguish between `vi` (portable) and `vim` (enhanced)",
              "Always check file permissions before editing",
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
          “You want to open a large log file to search for errors, but you must not accidentally change anything.
          Which command do you use?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Hint: There are two equivalent ways – one with <code>vi</code> flag, another with a dedicated command.
          </span>
        </p>
      </div>

      {/* ======================== SHELL SCRIPT EXAMPLE ======================== */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Practical example: create a new script with vi</h2>
        <ShellFileLoader
          fileModule={startViScript}
          title="Create and open a new shell script"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script demonstrates how to create a new file, write a shebang, and then open it with vi.
          It’s a common pattern for fast prototyping.
        </p>
      </div>

      {/* ======================== FAQ ======================== */}
      <FAQTemplate title="Starting vi – FAQs" questions={questions} />

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
              “I’ve seen many students type <code>vi</code> and then freeze because they don’t know how to start editing.
              The first step is the simplest: <strong>just give the filename</strong>. Then you are in <em>Normal mode</em>.
              To begin typing, you need to press <code>i</code> – but that’s Topic 4. For now, practice opening files and
              quitting with <code>:q!</code> until it becomes muscle memory.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Try this: open a terminal, type <code>vi practice.txt</code>, then immediately type <code>:q!</code>.
              Do it 10 times. You’ve now mastered opening and emergency‑quitting vi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic1;

// Add global keyframes if not already present (same as Topic0)
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
if (!document.head.querySelector("#topic1-animations")) {
  styleSheet.id = "topic1-animations";
  document.head.appendChild(styleSheet);
}