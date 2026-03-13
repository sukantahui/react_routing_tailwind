import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic38_files/
import backupUtilitySh from "./topic38_files/backup_utility.sh?raw";
import backupUtilityConf from "./topic38_files/backup_utility.conf?raw";

/**
 * Component: Topic38
 * Purpose: Example Script – Automated Backup Utility.
 *          A production‑ready, configurable backup script using tar,
 *          with rotation, logging, and dry‑run support.
 * Prototype: function Topic38(): JSX.Element
 * Return: Full educational section with script walkthrough and professional insights.
 *
 * Prerequisites: All topics 0–37
 */
const Topic38 = () => {
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
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes archiveGlow {
          0% { filter: drop-shadow(0 0 2px rgba(52,211,153,0.4)); }
          50% { filter: drop-shadow(0 0 12px rgba(52,211,153,0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(52,211,153,0.4)); }
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
            💾 Example Script: <span className="text-emerald-400">Automated Backup Utility</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A battle‑tested backup script that <span className="text-blue-400">Debangshu</span> uses for the
            school servers in <span className="italic">Barrackpore</span> and <span className="text-blue-400">Tuhina</span> 
            adapted for her Raspberry Pi in <span className="italic">Ichapur</span>.
          </p>

          {/* SVG: Backup pipeline – folders → tar → archives → rotation */}
          <div className="flex justify-center pt-6">
            <svg
              width="400"
              height="140"
              viewBox="0 0 400 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Backup pipeline: source folders, tar compression, archive files, trash can for old backups"
            >
              {/* Source folders */}
              <g transform="translate(20, 40)">
                <rect x="0" y="0" width="30" height="30" rx="4" fill="#60a5fa" />
                <rect x="5" y="5" width="30" height="30" rx="4" fill="#3b82f6" />
                <rect x="10" y="10" width="30" height="30" rx="4" fill="#2563eb" />
                <text x="45" y="30" fontSize="12" fill="#d1d5db">/home</text>
              </g>

              {/* Arrow 1 */}
              <line x1="80" y1="55" x2="120" y2="55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Tar compression */}
              <g transform="translate(130, 30)">
                <rect x="0" y="0" width="60" height="50" rx="8" fill="#312e81" stroke="#a78bfa" strokeWidth="2" />
                <text x="15" y="32" fontSize="14" fill="#e0e7ff">tar</text>
                <circle cx="45" cy="15" r="8" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" values="0;20;0" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Arrow 2 */}
              <line x1="200" y1="55" x2="240" y2="55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Archive files */}
              <g transform="translate(250, 40)">
                <rect x="0" y="0" width="25" height="30" rx="4" fill="#4ade80" />
                <rect x="30" y="5" width="25" height="30" rx="4" fill="#34d399" />
                <rect x="60" y="-2" width="25" height="30" rx="4" fill="#10b981" />
                <text x="90" y="20" fontSize="12" fill="#d1d5db">.tar.gz</text>
              </g>

              {/* Arrow 3 (rotation) */}
              <line x1="320" y1="55" x2="350" y2="55" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow_red)" />
              
              {/* Trash can / rotation */}
              <g transform="translate(360, 40)">
                <rect x="0" y="10" width="20" height="20" rx="2" fill="#6b7280" />
                <rect x="4" y="0" width="12" height="12" rx="1" fill="#9ca3af" />
              </g>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
                <marker id="arrow_red" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: WHY ANOTHER BACKUP SCRIPT? ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-emerald-800 light:border-emerald-300 pb-3 inline-block">
            🎯 Tar‑Based Backup: Simple, Universal, Reliable
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                While <code>rsync</code> is great for mirroring, <span className="text-amber-400">tar</span> archives
                are the classic backup format – self‑contained, compressible, and readable everywhere.
              </p>
              <p>
                This script demonstrates a <strong>complete backup solution</strong> in under 100 lines:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Configurable sources, destination, compression</li>
                <li>Timestamped archive names</li>
                <li>Dry‑run mode – preview without writing</li>
                <li>Automatic rotation (keep last N backups)</li>
                <li>Logging to file + console</li>
                <li>Error handling with <code>die()</code></li>
              </ul>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-emerald-700",
                "hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span> Real‑world Scenario
              </h3>
              <p className="text-lg">
                <span className="text-blue-400">Abhronila</span> in <span className="italic">Shyamnagar</span> 
                uses this script to back up her thesis work every hour. The rotation keeps the last 24 archives – 
                she can go back to any version from the past day without filling her disk.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT: BACKUP UTILITY ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-emerald-800 light:border-emerald-300 pb-3 inline-block">
            📜 backup_utility.sh – Full Script
          </h2>
          <ShellFileLoader
            fileModule={backupUtilitySh}
            title="🗜️ backup_utility.sh – Tar‑based backup with rotation"
            highlightLines={[2, 9, 18, 27, 41, 59, 72]} // shebang, strict mode, usage, die, config load, backup function, rotation
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
            <div><span className="font-bold">🔹 Strict mode</span> – `set -euo pipefail`</div>
            <div><span className="font-bold">🔹 Config</span> – sourced, with defaults</div>
            <div><span className="font-bold">🔹 Compression</span> – gz, bz2, xz</div>
            <div><span className="font-bold">🔹 Dry‑run</span> – `-d` preview</div>
            <div><span className="font-bold">🔹 Rotation</span> – keep last N backups</div>
            <div><span className="font-bold">🔹 Logging</span> – tee to file</div>
            <div><span className="font-bold">🔹 Timestamp</span> – YYYY-MM-DD_HHMMSS</div>
            <div><span className="font-bold">🔹 Error</span> – `die()` + trap</div>
          </div>
        </section>

        {/* ---------- CONFIGURATION EXAMPLE ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-emerald-800 light:border-emerald-300 pb-3 inline-block">
            ⚙️ backup_utility.conf – Example Configuration
          </h2>
          <ShellFileLoader
            fileModule={backupUtilityConf}
            title="📁 backup_utility.conf"
            highlightLines={[2, 3, 4, 5]} // sources, destination, compression, retention
          />
          <p className="text-lg leading-relaxed">
            Configuration is just shell syntax – easy to read and write. Place it in <code>/etc/backup_utility.conf</code> 
            or alongside the script. All variables are validated before use.
          </p>
        </section>

        {/* ---------- COMMON PITFALLS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Backup Pitfalls – Avoid These
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Storing backups on the same disk – a disk failure kills both data and backup.",
              "❌ No retention policy – disk fills up and backups stop.",
              "❌ Never testing restore – a backup is worthless if you can't restore it.",
              "❌ Hard‑coding passwords in the script (use environment variables or config files with restricted permissions).",
              "❌ Ignoring exit codes – a failed `tar` may produce an incomplete archive.",
              "❌ Not locking – two simultaneous runs can corrupt archives.",
              "❌ Using absolute paths inside the archive – restoring to a different location becomes messy.",
              "❌ Forgetting `--dry-run` for destructive rotation.",
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
            ✅ Backup Script Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "🔹 Store configuration separately from code.",
              "🔹 Use timestamped filenames – never overwrite.",
              "🔹 Implement rotation – keep N latest, delete oldest.",
              "🔹 Log every run (start, end, size, errors).",
              "🔹 Provide a dry‑run mode for testing.",
              "🔹 Test the restore procedure regularly (automate it!).",
              "🔹 Set restrictive permissions on config files that contain secrets.",
              "🔹 Use `tar` with `-C` to make archives relocatable.",
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
              🔹 <strong>Add a checksum file.</strong> After creating the archive, generate a <code>.sha256</code> file.
              This lets you verify integrity later: <code>sha256sum -c backup-2025-03-15_143022.tar.gz.sha256</code>.
            </p>
            <p>
              🔹 <strong>Use `nice` and `ionice`.</strong> Backups can consume I/O. Prefix the tar command with 
              <code>nice -n 19 ionice -c 3</code> to minimise impact on other processes.
            </p>
            <p>
              🔹 <strong>Encrypt sensitive backups.</strong> Pipe tar to <code>gpg --symmetric</code> and store the key
              separately. Example: <code>tar cz folder | gpg --symmetric --output backup.tar.gz.gpg</code>.
            </p>
            <p>
              🔹 <strong>Monitor backup freshness.</strong> A cron job can alert if the latest backup is older than, say, 48 hours.
            </p>
            <p>
              🔹 <strong>Parallel backups.</strong> If you have multiple independent datasets, run them concurrently
              with <code>&amp;</code> and <code>wait</code> to reduce total time.
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
              In the rotation function, we use <code>ls -1tr | head -n -$RETENTION_COUNT</code>.
              Why is this potentially unsafe? What filenames could break this approach?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try modifying the script to use <code>find ... -printf</code> or an array for safer deletion.
              How would you handle filenames with newlines?
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
                “In <span className="font-semibold">{experience} years</span>, I've seen more data lost to 
                <span className="text-red-400">failed backups</span> than to disk crashes. 
                <span className="text-blue-400">Swadeep</span> once had a perfect backup script – except he never tested 
                the restore. When his laptop died, he discovered the archives were corrupted. 
                <span className="text-blue-400">Abhronila</span> now schedules a weekly restore test to a temporary 
                directory. That’s the mark of a professional.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #TestRestores
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #3-2-1Rule
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #DryRunIsFree
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Backup Script Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-emerald-400">
            <li>Configurable sources and destination</li>
            <li>Timestamped, unique archive names</li>
            <li>Compression (user‑choosable)</li>
            <li>Rotation with retention count</li>
            <li>Dry‑run mode for safety</li>
            <li>Logging with timestamps</li>
            <li>Error handling (`set -e`, `die()`, trap)</li>
            <li>Idempotent – safe to run repeatedly</li>
            <li>Documented restore procedure</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Example Script – Cron scheduling (Topic39)</p>
        </footer>
      </div>
    </>
  );
};

export default Topic38;