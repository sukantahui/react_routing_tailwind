import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic39_files/
import cronManagerSh from "./topic39_files/cron_manager.sh?raw";
import exampleCronJobSh from "./topic39_files/example_cron_job.sh?raw";

/**
 * Component: Topic39
 * Purpose: Example Script – Cron Scheduling.
 *          Demonstrates how to interact with crontab from shell scripts,
 *          add/remove/list cron jobs, and follow best practices for scheduled tasks.
 * Prototype: function Topic39(): JSX.Element
 * Return: Full educational section with script walkthrough and professional insights.
 *
 * Prerequisites: All topics 0–38
 */
const Topic39 = () => {
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
        @keyframes clockTick {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0% { r: 3; opacity: 0.8; }
          50% { r: 6; opacity: 1; }
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
            ⏰ Example Script: <span className="text-purple-400">Cron Scheduling</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Automate your backups, reports, and reminders. 
            <span className="text-blue-400"> Swadeep</span> in <span className="italic">Barrackpore</span> schedules his 
            daily system health checks; <span className="text-blue-400">Abhronila</span> in <span className="italic">Shyamnagar</span> 
            never misses a deadline thanks to cron.
          </p>

          {/* SVG: Clock + cron syntax */}
          <div className="flex justify-center pt-6">
            <svg
              width="340"
              height="140"
              viewBox="0 0 340 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Clock with cron schedule syntax"
            >
              {/* Clock face */}
              <g transform="translate(30, 40)">
                <circle cx="30" cy="30" r="24" fill="none" stroke="#a78bfa" strokeWidth="2" />
                {/* Hour markers */}
                <line x1="30" y1="10" x2="30" y2="14" stroke="#a78bfa" strokeWidth="2" />
                <line x1="30" y1="50" x2="30" y2="46" stroke="#a78bfa" strokeWidth="2" />
                <line x1="10" y1="30" x2="14" y2="30" stroke="#a78bfa" strokeWidth="2" />
                <line x1="50" y1="30" x2="46" y2="30" stroke="#a78bfa" strokeWidth="2" />
                {/* Hour hand */}
                <line x1="30" y1="30" x2="30" y2="18" stroke="#e0e7ff" strokeWidth="2">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 30 30"
                    to="360 30 30"
                    dur="60s"
                    repeatCount="indefinite"
                  />
                </line>
                {/* Minute hand */}
                <line x1="30" y1="30" x2="30" y2="12" stroke="#c4b5fd" strokeWidth="1.5">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 30 30"
                    to="360 30 30"
                    dur="360s"
                    repeatCount="indefinite"
                  />
                </line>
              </g>

              {/* Arrow to cron table */}
              <line x1="70" y1="60" x2="110" y2="60" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Cron syntax box */}
              <g transform="translate(120, 40)">
                <rect x="0" y="0" width="120" height="50" rx="6" fill="#312e81" stroke="#a78bfa" />
                <text x="10" y="20" fontSize="12" fill="#e0e7ff">30 2 * * *</text>
                <text x="10" y="38" fontSize="12" fill="#e0e7ff">/backup.sh</text>
              </g>

              {/* Pulsing dot for cron job execution */}
              <circle cx="260" cy="65" r="3" fill="#4ade80">
                <animate
                  attributeName="r"
                  values="3;6;3"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <text x="280" y="70" fontSize="12" fill="#d1d5db">runs daily</text>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: CRON BASICS ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-purple-800 light:border-purple-300 pb-3 inline-block">
            🕰️ Cron: The Unix Scheduler
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="text-amber-400">Cron</span> is the time‑based job scheduler in Unix‑like systems.
                Users maintain their own crontab files – lists of commands and when to run them.
              </p>
              <p>
                Format: <code className="bg-gray-800 light:bg-gray-200 px-2 py-0.5 rounded">minute hour day month day_of_week command</code>.
              </p>
              <p>
                <span className="text-blue-400">Debangshu</span> uses <code>crontab -e</code> to edit, but for automation,
                we need to manipulate crontabs from scripts. That's where <code>cron_manager.sh</code> comes in.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-purple-700",
                "hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span> Common Fields
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li><code>0 2 * * *</code> – daily 2am</li>
                <li><code>*/15 * * * *</code> – every 15 minutes</li>
                <li><code>0 9 * * 1-5</code> – weekdays 9am</li>
                <li><code>@daily</code> – shorthand (also @hourly, @reboot)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT: CRON MANAGER ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-purple-800 light:border-purple-300 pb-3 inline-block">
            📜 cron_manager.sh – Programmatic Crontab Control
          </h2>
          <ShellFileLoader
            fileModule={cronManagerSh}
            title="🛠️ cron_manager.sh – Add, list, remove cron jobs"
            highlightLines={[7, 15, 23, 31, 40]} // die, list, add, remove, main case
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
            <div><span className="font-bold">🔹 List</span> – display current user's crontab</div>
            <div><span className="font-bold">🔹 Add</span> – append a new job if not already present</div>
            <div><span className="font-bold">🔹 Remove</span> – delete all jobs matching a pattern</div>
            <div><span className="font-bold">🔹 Safety</span> – backup old crontab before modification</div>
            <div><span className="font-bold">🔹 Dry‑run</span> – preview changes</div>
            <div><span className="font-bold">🔹 Logging</span> – records all changes</div>
          </div>
        </section>

        {/* ---------- SCRIPT: EXAMPLE CRON JOB ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-purple-800 light:border-purple-300 pb-3 inline-block">
            📝 example_cron_job.sh – A Task to Schedule
          </h2>
          <ShellFileLoader
            fileModule={exampleCronJobSh}
            title="🔔 example_cron_job.sh – Logs timestamp and system info"
            highlightLines={[4, 8]} // logging, disk usage
          />
          <p className="text-lg leading-relaxed">
            A minimal, well‑behaved cron job: logs its output, uses absolute paths, and exits cleanly.
            Always redirect output in cron entries; otherwise, cron emails the output.
          </p>
        </section>

        {/* ---------- COMMON PITFALLS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Cron Pitfalls – Avoid These
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Assuming cron runs with your full shell environment (no .bashrc!).",
              "❌ Not using absolute paths for commands and files.",
              "❌ Forgetting to redirect output – cron emails you every time.",
              "❌ Overwriting crontab instead of editing (`crontab newfile` erases old jobs).",
              "❌ No logging – you don't know if the job ran or failed.",
              "❌ Using `%` in crontab without escaping (percent signs are newlines in cron).",
              "❌ Scheduling too frequently (e.g., * * * * * for heavy tasks).",
              "❌ Not testing the command manually before putting it in cron.",
            ].map((pitfall, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-4 rounded-lg border border-red-800 light:border-red-300",
                  "bg-red-900/10 light:bg-red-50",
                  "hover:bg-red-900/20 light:hover:bg-red-100 transition-colors"
                )}
              >
                <span className="text-red-400 light:text-red-700">{pitfall}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- BEST PRACTICES ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ Cron Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "🔹 Always use full paths: /usr/bin/command, not just 'command'.",
              "🔹 Redirect stdout and stderr to a log file: >> /var/log/myjob.log 2>&1",
              "🔹 Use absolute paths for all file references.",
              "🔹 Set a proper `SHELL` and `PATH` at the top of your crontab.",
              "🔹 Test your script manually with the same environment: env -i bash -c '...'",
              "🔹 Keep cron jobs short and focused; chain tasks with scripts.",
              "🔹 Lock critical jobs to prevent overlapping runs (flock).",
              "🔹 Monitor cron logs (/var/log/syslog) for failures.",
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
            🧠 Pro Tips – Beyond the Basics
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Use `@reboot` sparingly.</strong> It runs at system startup, but not after a restart of cron.
              For services, use systemd timers instead.
            </p>
            <p>
              🔹 <strong>Randomise job start times.</strong> If many machines run the same cron job at midnight,
              your servers get thundering herds. Use <code>sleep $((RANDOM % 3600))</code> at the beginning.
            </p>
            <p>
              🔹 <strong>Keep a backup of your crontab.</strong> The script does this automatically, but you can also
              version control your cron jobs: <code>crontab -l > my_crontab.bak</code>.
            </p>
            <p>
              🔹 <strong>Use `flock` to prevent overlapping.</strong> Example:
              <code className="block mt-2 bg-gray-800 light:bg-gray-200 p-2 rounded">
                */5 * * * * /usr/bin/flock -n /tmp/myjob.lock /path/to/script.sh
              </code>
            </p>
            <p>
              🔹 <strong>Consider systemd timers.</strong> Modern alternative to cron with better logging,
              dependency management, and integration. But cron is still everywhere.
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
              In <code>cron_manager.sh</code>, we use <code>crontab -l 2&gt;/dev/null || true</code>.
              Why is the <code>|| true</code> necessary? What happens if the user has no crontab?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try modifying the script to accept a <code>--user</code> flag to edit another user's crontab (as root).
              What security implications does this have?
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
                “In <span className="font-semibold">{experience} years</span>, I've seen cron jobs that ran for years
                without anyone noticing they were broken – because output was mailed to an unread address.
                <span className="text-blue-400">Tuhina</span> in <span className="italic">Ichapur</span> learned this the hard way.
                Now she always adds logging and a monitoring check. The best cron job is one that tells you when it fails.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #LogYourCron
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #AbsolutePaths
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #TestFirst
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Cron Scripting Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-purple-400">
            <li>Use absolute paths for commands and files.</li>
            <li>Redirect output to a log file (or to syslog).</li>
            <li>Test the command manually in a clean environment.</li>
            <li>Set PATH and SHELL in crontab if needed.</li>
            <li>Avoid assumptions about environment variables.</li>
            <li>Make scripts idempotent – safe to run multiple times.</li>
            <li>Include error handling and logging inside the script.</li>
            <li>Monitor that cron is actually running.</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Example Script – Debugging with set -x (Topic40)</p>
        </footer>
      </div>
    </>
  );
};

export default Topic39;