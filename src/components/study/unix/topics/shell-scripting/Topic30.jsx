import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic30_files/
import gitStatusPromptSh from "./topic30_files/git_status_prompt.sh?raw";
import autoBackupToGitSh from "./topic30_files/auto_backup_to_git.sh?raw";
import preCommitHookSh from "./topic30_files/pre_commit_hook.sh?raw";
import cloneAndSetupSh from "./topic30_files/clone_and_setup.sh?raw";

/**
 * Component: Topic30
 * Purpose: Teach version control for shell scripts using Git.
 * Prototype: function Topic30(): JSX.Element
 * Return: Full educational section with examples, SVGs, and best practices.
 *
 * Concepts: Git basics, automation with shell, hooks, .gitignore, collaboration.
 * Prerequisites: Topics 0–29 (shebang, variables, conditionals, functions, etc.)
 */
const Topic30 = () => {
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <>
      {/* Custom keyframes – zero‑config Tailwind arbitrary animations */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes branchFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes nodePulse {
          0% { r: 3; opacity: 0.8; }
          50% { r: 5; opacity: 1; }
          100% { r: 3; opacity: 0.8; }
        }
      `}</style>

      {/* MAIN – dark mode default, light mode via 'light:' prefix */}
      <div
        className={clsx(
          "max-w-7xl mx-auto px-4 py-12 space-y-16",
          "bg-gray-900 text-gray-100",
          "light:bg-white light:text-gray-900"
        )}
      >
        {/* ---------- HERO SECTION ---------- */}
        <header
          className={clsx(
            "text-center space-y-4",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            📦 Version Controlling Shell Scripts with Git
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Stop naming scripts{" "}
            <span className="line-through text-red-400">backup_final_v2.sh</span>. 
            Use Git – the same tool that powers the code in{" "}
            <span className="text-green-400 light:text-green-600">Coder & AccoTax</span>{" "}
            and every open‑source project.
          </p>

          {/* SVG: Git commit graph + shell script integration */}
          <div className="flex justify-center pt-6">
            <svg
              width="360"
              height="140"
              viewBox="0 0 360 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Git commit history with shell script automation"
            >
              {/* Main branch commits */}
              <g id="commits">
                <circle cx="40" cy="70" r="4" fill="#34d399">
                  <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" begin="mouseover" />
                </circle>
                <circle cx="100" cy="70" r="4" fill="#34d399" />
                <circle cx="160" cy="70" r="4" fill="#34d399" />
                <circle cx="220" cy="70" r="4" fill="#34d399" />
                <circle cx="280" cy="70" r="4" fill="#fbbf24" /> {/* HEAD */}
              </g>

              {/* Connecting line */}
              <line x1="40" y1="70" x2="280" y2="70" stroke="#6b7280" strokeWidth="2" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;30;0" dur="4s" repeatCount="indefinite" />
              </line>

              {/* Branch example */}
              <path d="M160 70 Q180 40 200 40" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="6 3" />
              <circle cx="200" cy="40" r="4" fill="#f59e0b" />
              <text x="210" y="35" fontSize="10" fill="#f59e0b">feature</text>

              {/* Shell script icon */}
              <g transform="translate(300, 90)">
                <rect x="0" y="0" width="40" height="40" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="8" y="26" fontSize="18" fill="#3b82f6">$</text>
                <text x="22" y="28" fontSize="18" fill="#e2e8f0">.sh</text>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; -2 -2; 0 0"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="mouseover"
                />
              </g>

              {/* Git label */}
              <text x="20" y="30" fontSize="14" fill="#d1d5db">git log</text>
            </svg>
          </div>
        </header>

        {/* ---------- WHY VERSION CONTROL? ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            🧭 Why Git for Shell Scripts?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="font-bold text-green-400">Track every change</span> – see who changed what,
                when, and why. No more{" "}
                <code className="bg-gray-800 light:bg-gray-200 px-2 py-1 rounded">backup_2025-01-01.sh</code>{" "}
                and{" "}
                <code className="bg-gray-800 light:bg-gray-200 px-2 py-1 rounded">backup_new_fixed.sh</code>.
              </p>
              <p>
                <span className="font-bold text-green-400">Collaborate safely</span> –{" "}
                <span className="text-blue-400">Tuhina</span> and{" "}
                <span className="text-blue-400">Debangshu</span> can work on the same script without
                overwriting each other's work. Git merges intelligently.
              </p>
              <p>
                <span className="font-bold text-green-400">Experiment freely</span> – create branches,
                try risky changes, and discard them if they fail. Your main script stays pristine.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-green-700",
                "hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span> Real‑world Scenario
              </h3>
              <p className="text-lg">
                The school admin system in <span className="italic">Naihati</span> has 15+ cron scripts.
                Before Git, a mistaken change took down the attendance report. Now, every script is
                versioned, and rollback takes 10 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT EXAMPLES (ShellFileLoader) ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            🧪 Git + Shell Scripts in Action
          </h2>

          <ShellFileLoader
            fileModule={gitStatusPromptSh}
            title="📊 git_status_prompt.sh – Show Git branch in your shell prompt"
            highlightLines={[6, 11]} // git symbolic-ref, PS1
          />
          <ShellFileLoader
            fileModule={autoBackupToGitSh}
            title="⏱️ auto_backup_to_git.sh – Automated daily commit & push"
            highlightLines={[12, 18, 25]} // git add, commit, push
          />
          <ShellFileLoader
            fileModule={preCommitHookSh}
            title="🔍 pre_commit_hook.sh – Git hook that validates shell scripts"
            highlightLines={[7, 15]} // bash -n, exit codes
          />
          <ShellFileLoader
            fileModule={cloneAndSetupSh}
            title="⚙️ clone_and_setup.sh – One‑command environment setup"
            highlightLines={[8, 14, 20]} // clone, symlink, chmod
          />
        </section>

        {/* ---------- COMMON PITFALLS (grid, hover animation) ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Git Pitfalls for Scripters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Committing secrets (passwords, API keys) – they live in history forever.",
              "❌ Committing large binary files – bloats the repo; use Git LFS or ignore.",
              "❌ Not using `.gitignore` – editor swap files, compiled scripts, logs.",
              "❌ Huge, unstructured commits – `git add . && git commit -m 'updates'`",
              "❌ Pushing directly to `main` without testing in a branch.",
              "❌ Forgetting to make hooks executable (`chmod +x .git/hooks/pre-commit`).",
            ].map((pitfall, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-5 rounded-lg border border-red-800 light:border-red-300",
                  "bg-red-900/20 light:bg-red-50",
                  "hover:bg-red-900/30 light:hover:bg-red-100 transition-colors"
                )}
              >
                <span className="text-lg">{pitfall}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- BEST PRACTICES ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "📝 Write meaningful commit messages: `fix: handle empty filename` not `fix bug`.",
              "🔐 Never store credentials – use environment variables or secret managers.",
              "📄 Always include a `.gitignore` (example: *.log, *.tmp, .env, .DS_Store).",
              "🧪 Test hooks locally before pushing – a broken hook blocks everyone.",
              "🌿 Use feature branches: `git checkout -b add-validate-function`.",
              "📦 Tag releases: `git tag v1.0.0` – easy rollback.",
              "🔁 Commit often, push daily (or after logical chunks).",
              "👀 Review your own diff before committing: `git diff --cached`.",
            ].map((practice, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded hover:bg-gray-800 light:hover:bg-gray-100">
                <span className="text-green-400 light:text-green-600 text-xl">✓</span>
                <span>{practice}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PROFESSIONAL TIPS ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-yellow-800 light:border-yellow-300 pb-3 inline-block">
            🧠 Pro Tips
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Use `git bisect`</strong> – when a script suddenly breaks, bisect pinpoints
              the exact commit that introduced the bug. Automate it with a test script.
            </p>
            <p>
              🔹 <strong>Git hooks in the repository</strong> – store hooks in <code>.githooks/</code> and run{" "}
              <code className="bg-gray-800 light:bg-gray-200 px-2 py-1 rounded">
                git config core.hooksPath .githooks
              </code>. Now hooks are versioned.
            </p>
            <p>
              🔹 <strong>Alias common Git commands</strong> in your shell rc file:{" "}
              <code>alias gs='git status'</code>, <code>alias gc='git commit'</code>.
            </p>
            <p>
              🔹 <strong>Use `git grep`</strong> to search across versions:{" "}
              <code>git grep 'rm -rf' v1.0.0</code> – find dangerous commands.
            </p>
            <p>
              🔹 <strong>Commit often, but squash before merging</strong> – keep history clean with{" "}
              <code>git rebase -i</code>.
            </p>
          </div>
        </section>

        {/* ---------- HINT SECTION ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-indigo-900/20 light:bg-indigo-50 border border-indigo-700",
            "flex flex-col md:flex-row gap-6 items-start"
          )}
        >
          <span className="text-5xl">💡</span>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">Observe carefully…</h3>
            <p className="text-lg leading-relaxed">
              In <code>pre_commit_hook.sh</code>, why do we check <code>$? -ne 0</code> after{" "}
              <code>bash -n "$file"</code>? What happens if we omit the <code>chmod +x</code> on the hook itself?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try changing the hook to always exit with 1. What effect does that have on <code>git commit</code>?
            </p>
          </div>
        </section>

        {/* ---------- TEACHER'S NOTE ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-amber-900/20 light:bg-amber-50 border border-amber-700",
            "hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] transition-shadow"
          )}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <span className="text-6xl">🧑‍🏫</span>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Teacher's Note</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-lg">
                <p><span className="font-semibold">Sukanta Hui</span></p>
                <p>📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                <p>🧰 Programming, RDBMS, OS, Web</p>
                <p>⏳ {experience} years (since 1998)</p>
              </div>
              <p className="text-lg leading-relaxed mt-4">
                “In 1998, I taught version control with RCS – we locked files. Today, Git empowers every
                student in <span className="italic">Shyamnagar</span> to contribute fearlessly. I insist:
                commit early, commit often, and always write a message you'll understand six months later.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #CommitOften
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #MeaningfulMessages
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #HooksSaveTime
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Git for Shell Scripts – Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-green-400">
            <li><code>git init</code> in your script project.</li>
            <li>Create a <code>.gitignore</code> (logs, temp files, secrets).</li>
            <li>Commit with descriptive messages.</li>
            <li>Use branches for experiments.</li>
            <li>Add a pre-commit hook to check syntax.</li>
            <li>Tag releases (<code>v1.0</code>, <code>v2.0</code>).</li>
            <li>Push to a remote (GitHub, GitLab) for backup.</li>
            <li>Never commit credentials.</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Writing reusable utility scripts – Topic31</p>
        </footer>
      </div>
    </>
  );
};

export default Topic30;