import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic32_files/
import backupProjectSh from "./topic32_files/backup_project.sh?raw";
import backupConfigConf from "./topic32_files/backup_config.conf?raw";
import installBackupSh from "./topic32_files/install_backup.sh?raw";

/**
 * Component: Topic32
 * Purpose: Mini Project – Automated Backup Script.
 *          Applies previously learned concepts into a real‑world tool.
 * Prototype: function Topic32(): JSX.Element
 * Return: Full educational section with project walkthrough, script examples,
 *         and professional insights.
 *
 * Prerequisites: Topics 0–31 (all core concepts)
 */
const Topic32 = () => {
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
        @keyframes pulseGlow {
          0% { filter: drop-shadow(0 0 2px rgba(59,130,246,0.5)); }
          50% { filter: drop-shadow(0 0 12px rgba(59,130,246,0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(59,130,246,0.5)); }
        }
        @keyframes progressFill {
          0% { width: 0%; opacity: 0.5; }
          100% { width: 100%; opacity: 1; }
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
            🗄️ Mini Project: <span className="text-blue-400">Automated Backup Script</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From classroom exercises to production: a complete, robust backup utility
            that protects student projects in <span className="text-blue-400">Barrackpore</span> and
            teacher records in <span className="text-blue-400">Naihati</span>.
          </p>

          {/* SVG: Backup pipeline with hard drive, arrow, calendar */}
          <div className="flex justify-center pt-6">
            <svg
              width="400"
              height="160"
              viewBox="0 0 400 160"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Backup automation: sources → backup script → archive + log"
            >
              {/* Source folder icon */}
              <g transform="translate(20, 50)">
                <rect x="0" y="0" width="50" height="40" rx="6" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
                <text x="10" y="26" fontSize="12" fill="#bfdbfe">/home</text>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; -2 -2; 0 0"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="mouseover"
                />
              </g>

              {/* Arrow */}
              <g transform="translate(75, 70)">
                <line x1="0" y1="0" x2="40" y2="0" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </g>

              {/* Script block */}
              <g transform="translate(120, 40)">
                <rect x="0" y="0" width="90" height="60" rx="8" fill="#312e81" stroke="#a78bfa" strokeWidth="2" />
                <text x="12" y="25" fontSize="14" fill="#e0e7ff">backup.sh</text>
                <text x="12" y="45" fontSize="10" fill="#c4b5fd">config + rotation</text>
              </g>

              {/* Arrow to destination */}
              <line x1="210" y1="70" x2="260" y2="70" stroke="#f59e0b" strokeWidth="2" />

              {/* Destination archive */}
              <g transform="translate(270, 50)">
                <rect x="0" y="0" width="50" height="40" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="10" y="26" fontSize="12" fill="#a7f3d0">/backup</text>
                {/* Spinning hard disk platter */}
                <circle cx="25" cy="20" r="12" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" values="0;20;0" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Log file */}
              <g transform="translate(270, 110)">
                <rect x="0" y="0" width="40" height="30" rx="4" fill="#374151" stroke="#9ca3af" />
                <text x="8" y="20" fontSize="10" fill="#d1d5db">backup.log</text>
              </g>
              <line x1="210" y1="90" x2="270" y2="120" stroke="#9ca3af" strokeDasharray="4 3" />

              {/* Arrow marker definition */}
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
        </header>

        {/* ---------- PROJECT OVERVIEW ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            🎯 Project Goals
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="font-bold text-blue-400">What it does:</span> A scheduled script that
                copies important directories to a backup location, maintains versioned snapshots, and
                automatically deletes backups older than a configured retention period.
              </p>
              <p>
                <span className="font-bold text-blue-400">Features:</span>
              </p>
              <ul className="list-disc list-inside space-y-1 marker:text-blue-400">
                <li>Configuration file (sources, destination, retention days)</li>
                <li>Command‑line options: <code>-c config</code>, <code>-v</code>, <code>-d</code> (dry‑run)</li>
                <li>Logging with timestamps (console + log file)</li>
                <li>Uses <code>rsync</code> (or fallback to <code>cp -al</code>) for efficient incremental backups</li>
                <li>Automatic rotation – deletes backups older than $RETENTION_DAYS</li>
                <li>Error handling with <code>set -euo pipefail</code> and <code>trap</code></li>
                <li>Idempotent – safe to run multiple times</li>
              </ul>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-blue-700",
                "hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🎓</span> Student Success
              </h3>
              <p className="text-lg">
                <span className="text-blue-400">Tuhina</span> accidentally deleted her thesis work.
                Because <span className="text-blue-400">Debangshu</span> had set up this backup script
                on the department server in <span className="italic">Ichapur</span>, she restored her
                files instantly. The retention policy saved daily snapshots for two weeks.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT BREAKDOWN (Main Script) ---------- */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            📜 1. Main Backup Script – backup_project.sh
          </h2>
          <ShellFileLoader
            fileModule={backupProjectSh}
            title="🚀 backup_project.sh – Full implementation"
            highlightLines={[1, 9, 18, 27, 45, 62, 80]} // shebang, strict, config, functions, rsync, rotation, trap
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mt-4">
            <div className="bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <span className="font-bold text-blue-400">1️⃣ Shebang & Strict Mode</span>
              <p className="mt-2">#!/bin/bash, set -euo pipefail – fail fast, safe.</p>
            </div>
            <div className="bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <span className="font-bold text-blue-400">2️⃣ Configuration Loader</span>
              <p className="mt-2">Sources .conf file, validates required variables.</p>
            </div>
            <div className="bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <span className="font-bold text-blue-400">3️⃣ Logging Functions</span>
              <p className="mt-2">log_info, log_error, die – consistent output.</p>
            </div>
            <div className="bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <span className="font-bold text-blue-400">4️⃣ Argument Parsing</span>
              <p className="mt-2">getopts for -c, -v, -d, --help.</p>
            </div>
            <div className="bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <span className="font-bold text-blue-400">5️⃣ Backup Engine</span>
              <p className="mt-2">rsync --link-dest for hardlink snapshots; fallback to cp -al.</p>
            </div>
            <div className="bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <span className="font-bold text-blue-400">6️⃣ Rotation</span>
              <p className="mt-2">find + mtime + rm, protected by dry‑run.</p>
            </div>
            <div className="bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <span className="font-bold text-blue-400">7️⃣ Trap Cleanup</span>
              <p className="mt-2">Removes partial backup on interrupt.</p>
            </div>
            <div className="bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
              <span className="font-bold text-blue-400">8️⃣ Idempotent Design</span>
              <p className="mt-2">mkdir -p, rsync --ignore-existing.</p>
            </div>
          </div>
        </section>

        {/* ---------- CONFIGURATION FILE ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            ⚙️ 2. Configuration – backup_config.conf
          </h2>
          <ShellFileLoader
            fileModule={backupConfigConf}
            title="📁 backup_config.conf – Example settings"
            highlightLines={[3, 4, 6]} // SOURCE_DIRS, BACKUP_DEST, RETENTION_DAYS
          />
          <p className="text-lg leading-relaxed">
            Configuration is plain shell syntax, sourced directly. This keeps secrets and
            site‑specific settings out of the main script – a key maintainability practice.
          </p>
        </section>

        {/* ---------- INSTALLATION & SCHEDULING ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            📦 3. Installation & Cron Automation
          </h2>
          <ShellFileLoader
            fileModule={installBackupSh}
            title="🛠️ install_backup.sh – One‑command setup"
            highlightLines={[10, 18, 25]} // directory creation, crontab addition
          />
          <div className="bg-gray-800 light:bg-gray-100 p-6 rounded-xl mt-4">
            <h3 className="text-xl font-semibold mb-3">🕒 Cron Entry Example</h3>
            <pre className="bg-gray-900 light:bg-gray-200 p-4 rounded text-sm overflow-x-auto">
              {`# Run backup every day at 2:30 AM
30 2 * * * /usr/local/bin/backup_project.sh -c /etc/backup_config.conf -v >> /var/log/backup_cron.log 2>&1`}
            </pre>
            <p className="mt-4 text-gray-300 light:text-gray-700">
              The installer script adds this line automatically using <code>crontab</code> commands.
            </p>
          </div>
        </section>

        {/* ---------- COMMON PITFALLS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Pitfalls Specific to Backup Scripts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Never tested restore – a backup is only as good as its last recovery.",
              "❌ Hard‑coded paths – script breaks when moved to another machine.",
              "❌ No logging – you don't know if it ran or failed.",
              "❌ Ignoring `rsync` exit codes – partial transfers can look successful.",
              "❌ Retention without sanity check – accidentally deleting whole backup tree.",
              "❌ Running as root unnecessarily – use least privilege.",
              "❌ No locking – concurrent runs corrupt backups.",
              "❌ Backing up open files inconsistently – consider filesystem snapshots or notify applications.",
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
            ✅ Backup Script Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "📦 Use timestamped backup folders (YYYY-MM-DD_HHMMSS).",
              "🔗 Use `rsync --link-dest` for space‑efficient snapshots.",
              "📜 Log everything: start, end, bytes transferred, errors.",
              "🧪 Provide a `--dry-run` option to preview changes.",
              "🔐 Secure the config file – readable only by the backup user.",
              "🔄 Test rotation with `--dry-run` before enabling.",
              "📉 Monitor backup age – alert if last backup > 48h old.",
              "💾 Store backups on a separate device or network location.",
              "📋 Document restore procedure – step by step.",
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
            🧠 Pro Tips from the Field
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>3‑2‑1 Rule:</strong> At least <strong>3</strong> copies, on <strong>2</strong> different media,
              with <strong>1</strong> off‑site. Your script is one piece; ensure off‑site replication (e.g., rsync to a remote server).
            </p>
            <p>
              🔹 <strong>Backup metadata:</strong> Save permissions, ownership, extended attributes.
              <code className="bg-gray-800 light:bg-gray-200 px-2 py-1 rounded">rsync -aAX</code> does this.
            </p>
            <p>
              🔹 <strong>Verify backups automatically:</strong> After backup, run a quick check – e.g., count files,
              or restore a small test file and compare checksum.
            </p>
            <p>
              🔹 <strong>Monitor with Nagios/Icinga:</strong> Expose backup age via a text file or script exit code.
            </p>
            <p>
              🔹 <strong>Atomic rotation:</strong> Use `mv` to replace the “latest” symlink after successful backup,
              then delete old snapshots. Prevents window where no backup exists.
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
          <span className="text-5xl">💭</span>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">Observe carefully…</h3>
            <p className="text-lg leading-relaxed">
              In <code>backup_project.sh</code>, the <code>rotate_backups</code> function uses
              <code>find "$BACKUP_DEST" -maxdepth 1 -type d -name "????-??-??_*"</code>. Why is this pattern
              safer than <code>-name "*"</code>? What happens if someone manually creates a folder that
              doesn't match the timestamp pattern?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try changing the retention policy from 7 days to 0 and run with <code>--dry-run</code>.
              Would you be comfortable enabling it? This is why we always test rotation first.
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
                “I still remember 1998 – we backed up floppy disks manually. Now <span className="text-blue-400">Abhronila</span> in
                <span className="italic"> Shyamnagar</span> writes a script that protects terabytes of research data.
                This project isn't about backup; it's about engineering discipline. Test every failure mode.
                Simulate disk full. Simulate interrupted network. Then you’ll sleep peacefully.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #3-2-1
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #TestRestore
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #Idempotent
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Project Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-blue-400">
            <li>Configurable source directories and destination.</li>
            <li>Retention policy with safe deletion logic.</li>
            <li>Verbose/logging options.</li>
            <li>Dry‑run mode to preview changes.</li>
            <li>Error handling and trap for cleanup.</li>
            <li>Idempotent – safe to run multiple times.</li>
            <li>Installation script that sets up directories and cron.</li>
            <li>Documentation (in‑code comments and usage).</li>
            <li>Tested restore procedure exists.</li>
          </ul>
        </section>

        {/* ---------- NEXT STEPS ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Common shell scripting mistakes and best practices – Topic33</p>
        </footer>
      </div>
    </>
  );
};

export default Topic32;