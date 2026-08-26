import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic34_files/
import findDuplicatesSh from "./topic34_files/find_duplicates.sh?raw";
import diskUsageAlertSh from "./topic34_files/disk_usage_alert.sh?raw";
import csvParserSh from "./topic34_files/csv_parser.sh?raw";
import batchRenameSh from "./topic34_files/batch_rename.sh?raw";
import websiteCheckerSh from "./topic34_files/website_checker.sh?raw";

/**
 * Component: Topic34
 * Purpose: Provide a curated collection of practical, production‑ready shell script
 *          examples that serve as both learning aids and reusable reference tools.
 * Prototype: function Topic34(): JSX.Element
 * Return: Full educational section with script cards, explanations, and professional insights.
 *
 * Prerequisites: All topics 0–33
 */
const Topic34 = () => {
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
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardGlow {
          0% { box-shadow: 0 0 0px rgba(59,130,246,0.3); }
          50% { box-shadow: 0 0 15px rgba(59,130,246,0.6); }
          100% { box-shadow: 0 0 0px rgba(59,130,246,0.3); }
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
            📚 Practical Examples & Reference Scripts
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A living toolbox – patterns that solve real problems, from 
            <span className="text-blue-400"> Barrackpore</span> classrooms to 
            <span className="text-blue-400"> Naihati</span> server rooms. 
            Adapt, reuse, and master.
          </p>

          {/* SVG: Toolbox icon */}
          <div className="flex justify-center pt-6">
            <svg
              width="240"
              height="120"
              viewBox="0 0 240 120"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Toolbox with script icons"
            >
              {/* Toolbox base */}
              <rect x="40" y="40" width="160" height="60" rx="10" fill="#312e81" stroke="#a78bfa" strokeWidth="2" />
              <rect x="70" y="20" width="100" height="25" rx="8" fill="#1e293b" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="98" y="42" fontSize="14" fill="#e0e7ff">scripts</text>
              
              {/* Tools */}
              <g transform="translate(60, 70)">
                <rect x="0" y="0" width="25" height="8" rx="2" fill="#60a5fa" />
                <rect x="8" y="-12" width="10" height="12" rx="2" fill="#60a5fa" />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 12 0; 10 12 0; 0 12 0"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="mouseover"
                />
              </g>
              <g transform="translate(120, 70)">
                <circle cx="12" cy="12" r="8" fill="none" stroke="#34d399" strokeWidth="2" />
                <path d="M12 6 L12 12 L16 16" stroke="#34d399" strokeWidth="2" fill="none" />
              </g>
              <g transform="translate(170, 70)">
                <rect x="0" y="4" width="20" height="4" rx="2" fill="#f59e0b" />
                <rect x="6" y="0" width="8" height="8" rx="1" fill="#f59e0b" />
              </g>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: PATTERN LIBRARY ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            🧩 Patterns, Not Copy‑Paste
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                These scripts are <span className="text-amber-400">teaching tools</span>, not final products.
                Each demonstrates a common task and embodies the defensive, portable practices we’ve covered.
              </p>
              <p>
                <span className="text-blue-400">Swadeep</span> used the CSV parser to analyse exam scores.
                <span className="text-blue-400"> Abhronila</span> adapted the disk monitor for her Raspberry Pi
                in <span className="italic">Ichapur</span>. The patterns are yours to modify.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-blue-700",
                "hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🔑</span> What Makes a Good Reference Script?
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Clear, single responsibility</li>
                <li>Self‑documenting code</li>
                <li>Error handling & usage message</li>
                <li>Works on both Bash and POSIX sh (where possible)</li>
                <li>Easy to adapt</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT CARDS – each with ShellFileLoader ---------- */}
        <section className="space-y-16">
          {/* 1. Find Duplicates */}
          <article className="space-y-6">
            <h2 className="text-3xl font-semibold border-b border-purple-800 light:border-purple-300 pb-2 inline-block">
              🗂️ 1. Find Duplicate Files (by checksum)
            </h2>
            <ShellFileLoader
              fileModule={findDuplicatesSh}
              title="find_duplicates.sh – Recursively find duplicate files using MD5"
              highlightLines={[6, 15, 22]} // find, md5sum, awk
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <div><span className="font-bold">🔹 Use case:</span> Clean up duplicate photos, documents</div>
              <div><span className="font-bold">🔹 Key technique:</span> `md5sum`, associative array (bash)</div>
              <div><span className="font-bold">🔹 Pitfall:</span> Large files – checksum takes time. Add progress.</div>
            </div>
          </article>

          {/* 2. Disk Usage Alert */}
          <article className="space-y-6">
            <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-2 inline-block">
              💾 2. Disk Usage Alert (threshold + email)
            </h2>
            <ShellFileLoader
              fileModule={diskUsageAlertSh}
              title="disk_usage_alert.sh – Check mount points and send alert if usage > THRESHOLD"
              highlightLines={[8, 15, 24]} // df, awk, mail
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <div><span className="font-bold">🔹 Use case:</span> Cron job to monitor server disk space</div>
              <div><span className="font-bold">🔹 Key technique:</span> `df -P`, `awk`, `mail`</div>
              <div><span className="font-bold">🔹 Pitfall:</span> `df` output format varies; `-P` helps.</div>
            </div>
          </article>

          {/* 3. CSV Parser */}
          <article className="space-y-6">
            <h2 className="text-3xl font-semibold border-b border-yellow-800 light:border-yellow-300 pb-2 inline-block">
              📊 3. CSV Parser (Simple, POSIX‑friendly)
            </h2>
            <ShellFileLoader
              fileModule={csvParserSh}
              title="csv_parser.sh – Read CSV line by line, extract fields"
              highlightLines={[5, 12, 18]} // IFS, read -r, printf
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <div><span className="font-bold">🔹 Use case:</span> Process exported spreadsheets, logs</div>
              <div><span className="font-bold">🔹 Key technique:</span> `IFS=,`, `read -r`, quotes handling (basic)</div>
              <div><span className="font-bold">🔹 Pitfall:</span> Doesn’t handle quoted commas; for robust CSV use a real parser.</div>
            </div>
          </article>

          {/* 4. Batch Rename */}
          <article className="space-y-6">
            <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-2 inline-block">
              ✏️ 4. Batch Rename (pattern substitution)
            </h2>
            <ShellFileLoader
              fileModule={batchRenameSh}
              title="batch_rename.sh – Rename files using sed pattern"
              highlightLines={[6, 10, 15]} // for file in *, sed, mv
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <div><span className="font-bold">🔹 Use case:</span> Convert spaces to underscores, change extensions</div>
              <div><span className="font-bold">🔹 Key technique:</span> Parameter expansion, `sed`, dry‑run option</div>
              <div><span className="font-bold">🔹 Pitfall:</span> Overwriting existing files – use `-n` (no clobber).</div>
            </div>
          </article>

          {/* 5. Website Checker */}
          <article className="space-y-6">
            <h2 className="text-3xl font-semibold border-b border-indigo-800 light:border-indigo-300 pb-2 inline-block">
              🌐 5. Website Availability Checker
            </h2>
            <ShellFileLoader
              fileModule={websiteCheckerSh}
              title="website_checker.sh – Check HTTP status with curl"
              highlightLines={[7, 14, 20]} // curl -I, grep, exit code
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <div><span className="font-bold">🔹 Use case:</span> Monitor uptime, notify on failure</div>
              <div><span className="font-bold">🔹 Key technique:</span> `curl -I`, `grep -q`, `mail`</div>
              <div><span className="font-bold">🔹 Pitfall:</span> Redirects – follow with `-L`.</div>
            </div>
          </article>
        </section>

        {/* ---------- COMMON PITFALLS IN REFERENCE SCRIPTS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Pitfalls When Reusing Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Using the script verbatim without understanding the environment.",
              "❌ Forgetting to make scripts executable (`chmod +x`).",
              "❌ Hard‑coded paths that don't exist on your system.",
              "❌ Missing dependencies (md5sum, curl, mail).",
              "❌ Running untested scripts with `sudo` – always dry‑run first.",
              "❌ Not adjusting thresholds (disk usage, timeouts) to your needs.",
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

        {/* ---------- BEST PRACTICES FOR REFERENCE SCRIPTS ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ How to Maintain Your Own Script Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "📚 Organise by category: system, network, file, etc.",
              "📝 Include a header comment describing purpose, usage, dependencies.",
              "🔖 Version control your collection (Git).",
              "🧪 Write a small test harness for each script.",
              "🔗 Symlink scripts into ~/.local/bin for easy access.",
              "📦 Use configuration files, not hard‑coded values.",
              "🔄 Refactor common functions into a shared library.",
              "📆 Review and update scripts periodically.",
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
            🧠 Pro Tips – From Reference to Production
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Add a `--dry-run` flag to every destructive script.</strong> It prevents disasters and
              builds trust. All renaming/deleting scripts here include one.
            </p>
            <p>
              🔹 <strong>Use `mktemp` for temporary files.</strong> Even in small scripts, it’s a good habit.
              See the disk usage script for an example.
            </p>
            <p>
              🔹 <strong>Make scripts idempotent.</strong> Running them twice should be safe.
              The duplicate finder is read‑only; the batch renamer refuses to overwrite.
            </p>
            <p>
              🔹 <strong>Document exit codes.</strong> Users rely on them. A comment like
              <code className="bg-gray-800 light:bg-gray-200 px-2 py-1 rounded"># Exit: 0 if OK, 1 if no files, 2 on error</code> helps.
            </p>
            <p>
              🔹 <strong>Provide a `--version` flag.</strong> When you improve a script, bump the version.
              Your colleagues will know they have the latest.
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
              In <code>find_duplicates.sh</code>, we use <code>md5sum</code> and store the hash as the key.
              What happens if two different files have the same hash (collision)? For critical data,
              would you add a second hash (SHA256) as a safeguard?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try modifying <code>batch_rename.sh</code> to replace spaces with underscores. Add a
              `-r` flag to make it recursive.
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
                “I started collecting shell scripts on floppy disks in 1998. Today, <span className="text-blue-400">Debangshu</span>
                has a Git repository with over 100 utilities he and <span className="text-blue-400">Tuhina</span> share.
                That collection began with patterns like these. Don’t just copy them – understand why they work,
                break them, fix them, and make them your own. That’s how mastery begins.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #BuildYourToolbox
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #PatternsNotCopyPaste
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #ScriptRepository
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Reference Script Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-blue-400">
            <li>Header comment with purpose, usage, dependencies</li>
            <li>Set `-euo pipefail` (bash) or equivalent defensive mode</li>
            <li>Quote all variable expansions</li>
            <li>Check command existence (e.g., `command -v curl`)</li>
            <li>Provide `--help` and usage message</li>
            <li>Destructive operations have `--dry-run`</li>
            <li>Error messages go to stderr</li>
            <li>Exit with non‑zero on failure</li>
            <li>Tested with edge cases (empty input, spaces, globs)</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Example Script – User input validation (Topic35)</p>
        </footer>
      </div>
    </>
  );
};

export default Topic34;