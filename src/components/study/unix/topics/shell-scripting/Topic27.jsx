import React from "react";
import clsx from "clsx";

// Raw imports of shell scripts and crontab examples
import dailyBackupSh from "./topic27_files/daily_backup.sh?raw";
import cronWrapperSh from "./topic27_files/cron_wrapper.sh?raw";
import crontabExample from "./topic27_files/crontab_example.cron?raw";
import cronLoggingSh from "./topic27_files/cron_logging.sh?raw";

// Common component for displaying shell scripts / configs
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// ----------------------------------------------------------------------
// Inline keyframes – zero‑config, only for motion‑safe animations
// ----------------------------------------------------------------------
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

// ----------------------------------------------------------------------
// Main Component – Topic 27: Scheduling scripts with cron (overview)
// ----------------------------------------------------------------------
export default function Topic27() {
  // Calculate Sukanta Hui's experience dynamically from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Animation delays for staggered reveal (motion‑safe only)
  const fadeSlideClasses = "motion-safe:animate-[fadeIn_0.6s_ease-out,slideUp_0.6s_ease-out]";

  return (
    // Force dark mode as default by wrapping content in a `dark` class container
    <div className="dark">
      {/* Main container – soothing, classroom‑ready typography */}
      <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 leading-relaxed space-y-14">

        {/* ---------- HEADER SECTION ---------- */}
        <header className={clsx(fadeSlideClasses, "space-y-4")}>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-12 bg-gradient-to-b from-amber-500 to-orange-400 rounded-full" />
            <h1 className="text-4xl font-light tracking-tight text-gray-800 dark:text-gray-100">
              Scheduling Scripts with Cron
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 ml-4 border-l-4 border-amber-300 pl-5 italic">
            “Let the machine remember the routine – cron is your 24/7 assistant.”
          </p>
          {/* Teacher's Note – always present, hover emphasis */}
          <TeacherNote experience={experienceYears} />
        </header>

        {/* ---------- CONCEPT: WHAT IS CRON? ---------- */}
        <ConceptSection
          title="⏰ 1. Cron – The Time‑Based Job Scheduler"
          delay="100"
          className={fadeSlideClasses}
        >
          <p className="mb-3">
            Cron is a daemon (<code>crond</code>) that executes commands at specified times and dates.
            Every user can have their own <strong>crontab</strong> (cron table). The system also has a global
            <code>/etc/crontab</code> and directories like <code>/etc/cron.d/</code>.
          </p>
          <p className="mb-4">
            Debangshu from Ichapur uses cron to back up student projects every night. 
            Tuhina schedules a script that cleans temporary files every Monday.
          </p>

          {/* SVG – Cron timeline with animated job triggers */}
          <div className="mt-8 p-6 bg-gray-50/80 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
              <span className="text-amber-500">⏲️</span> Cron schedule visualization
            </h3>
            <CronTimelineSVG />
          </div>
        </ConceptSection>

        {/* ---------- CRONTAB SYNTAX ---------- */}
        <ConceptSection title="📋 2. Crontab Syntax – Five Stars of Time" delay="200" className={fadeSlideClasses}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-sm bg-gray-800 text-gray-100 p-3 rounded-md inline-block">
                ┌───────── minute (0‑59)<br/>
                │ ┌─────── hour (0‑23)<br/>
                │ │ ┌───── day of month (1‑31)<br/>
                │ │ │ ┌─── month (1‑12)<br/>
                │ │ │ │ ┌─ day of week (0‑6, 0=Sunday)<br/>
                │ │ │ │ │<br/>
                * * * * *  command to execute
              </p>
              <ul className="mt-4 space-y-1 text-gray-700 dark:text-gray-300">
                <li><span className="font-semibold">*</span> – any value</li>
                <li><span className="font-semibold">*/15</span> – every 15 units</li>
                <li><span className="font-semibold">1,15</span> – first and fifteenth</li>
                <li><span className="font-semibold">1-5</span> – range (Mon‑Fri)</li>
              </ul>
            </div>
            <div className="bg-amber-50/30 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-900 hover:scale-[1.01] transition-transform">
              <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-3">📘 Common shorthand</h4>
              <p className="text-sm">
                <code>@reboot</code> – once at startup<br/>
                <code>@daily</code>   – 0 0 * * *<br/>
                <code>@hourly</code>  – 0 * * * *<br/>
                <code>@weekly</code>  – 0 0 * * 0<br/>
                <code>@monthly</code> – 0 0 1 * *
              </p>
            </div>
          </div>
          <HintBox>
            <strong>Observe carefully…</strong> Days can be specified in two fields: both day-of-month and day-of-week.
            If both are used, the job runs when <em>either</em> condition is true.
          </HintBox>
        </ConceptSection>

        {/* ---------- CRONTAB COMMANDS ---------- */}
        <ConceptSection title="🛠️ 3. Managing Your Crontab" delay="300" className={fadeSlideClasses}>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
            <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">crontab -e</code> – edit your crontab (creates one if missing)</li>
            <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">crontab -l</code> – list current cron jobs</li>
            <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">crontab -r</code> – remove your crontab</li>
            <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">crontab -u user -l</code> – (as root) list another user's crontab</li>
          </ul>
          <p className="mt-4">
            The editor is determined by the <code>EDITOR</code> or <code>VISUAL</code> environment variable.
            At Naihati school lab, Swadeep sets <code>export EDITOR=nano</code> before editing.
          </p>
        </ConceptSection>

        {/* ---------- ENVIRONMENT & PATH – THE SILENT TRAP ---------- */}
        <ConceptSection title="🌍 4. Cron Environment – Not Your Interactive Shell" delay="400" className={fadeSlideClasses}>
          <p className="mb-3">
            Cron runs jobs with a minimal environment: <code>PATH=/usr/bin:/bin</code>, no terminal,
            and none of your <code>.bashrc</code> or <code>.profile</code> settings.
            <span className="block mt-2 text-amber-700 dark:text-amber-400 font-medium">
              This is the #1 reason cron jobs fail when they work manually.
            </span>
          </p>
          <div className="bg-red-50/50 dark:bg-red-950/30 p-5 rounded-xl border border-red-200 dark:border-red-800">
            <p className="text-sm">
              <strong>Solution:</strong> Always use <span className="font-mono">absolute paths</span> for commands and files,
              or source your profile inside the cron job.
            </p>
          </div>
          <ShellFileLoader
            fileModule={cronWrapperSh}
            title="cron_wrapper.sh – safe environment wrapper"
            highlightLines={[3, 4, 5, 8]}
          />
        </ConceptSection>

        {/* ---------- EXAMPLE 1: DAILY BACKUP ---------- */}
        <ConceptSection title="💾 5. Real Example: Automated Backup" delay="500" className={fadeSlideClasses}>
          <p className="mb-3">
            Abhronila's script backs up the student records directory. She installed it in cron to run every night at 2:30 AM.
          </p>
          <ShellFileLoader
            fileModule={dailyBackupSh}
            title="daily_backup.sh – production backup script"
            highlightLines={[6, 9, 13, 16]}
          />
          <p className="mt-4">
            The corresponding crontab entry (edited with <code>crontab -e</code>):
          </p>
          <ShellFileLoader
            fileModule={crontabExample}
            title="crontab entry – view with crontab -l"
            highlightLines={[1]}
            language="txt" // optional hint, but ShellFileLoader handles plain text
          />
        </ConceptSection>

        {/* ---------- OUTPUT REDIRECTION & LOGGING ---------- */}
        <ConceptSection title="📄 6. Don't Lose Output – Capture Everything" delay="600" className={fadeSlideClasses}>
          <p className="mb-3">
            Cron emails output to the user by default (if <code>MAILTO</code> is set). 
            In modern systems, output may go to <code>/var/log/syslog</code> or be discarded.
            <strong> Always redirect stdout and stderr to a log file.</strong>
          </p>
          <ShellFileLoader
            fileModule={cronLoggingSh}
            title="cron_logging.sh – proper redirection"
            highlightLines={[2, 5, 8]}
          />
          <p className="mt-3 text-sm bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded">
            <span className="font-semibold">Pro tip:</span> Set <code>MAILTO="your@email.com"</code> at the top of your crontab
            to receive output only when a job produces stderr. Avoid filling your inbox.
          </p>
        </ConceptSection>

        {/* ---------- PITFALLS & BEST PRACTICES ---------- */}
        <div className={clsx(fadeSlideClasses, "grid md:grid-cols-2 gap-8", "[animation-delay:700ms]")}>
          {/* Common pitfalls */}
          <div className="bg-red-50/50 dark:bg-red-950/30 p-6 rounded-xl border border-red-200 dark:border-red-900 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
              ⚠️ Beginner cron traps
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <li>❌ Using relative paths – command not found.</li>
              <li>❌ Assuming <code>~/</code> expands – it doesn't; use <code>$HOME</code> or full path.</li>
              <li>❌ Forgetting that <code>%</code> in command must be escaped (<code>\%</code>).</li>
              <li>❌ No log redirection – and then wondering why it failed.</li>
              <li>❌ Script runs but never completes – no output, stuck.</li>
              <li>❌ Editing the wrong crontab (<code>crontab -e</code> vs system crontab).</li>
            </ul>
          </div>
          {/* Best practices */}
          <div className="bg-green-50/50 dark:bg-green-950/30 p-6 rounded-xl border border-green-200 dark:border-green-900 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
              ✅ Professional cron habits
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <li>➕ Always use absolute paths for commands and files.</li>
              <li>➕ Redirect output: <code>&gt;&gt; /var/log/myscript.log 2&gt;&amp;1</code>.</li>
              <li>➕ Test the script manually with the same minimal environment (<code>env -i</code>).</li>
              <li>➕ Put a wrapper that sources <code>~/.profile</code> if needed.</li>
              <li>➕ Use <code>@reboot</code> for startup jobs, not <code>/etc/rc.local</code>.</li>
              <li>➕ Add a <code>MAILTO</code> variable to receive errors.</li>
            </ul>
          </div>
        </div>

        {/* ---------- MINI CHECKLIST ---------- */}
        <div className={clsx(fadeSlideClasses, "bg-amber-50/70 dark:bg-amber-950/40 p-6 rounded-2xl border border-amber-300 dark:border-amber-800", "[animation-delay:800ms]")}>
          <h3 className="text-xl font-medium text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
            ✅ Mini checklist – before you install a cron job…
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-gray-800 dark:text-gray-200">
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">▹</span> Full paths for every command?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">▹</span> Log file directory exists and writable?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">▹</span> Tested with <code>bash -c</code> in clean env?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">▹</span> Does script expect stdin? (cron gives none)
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">▹</span> Shebang line present and executable?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">▹</span> Escaped <code>%</code> if used in command?
            </div>
          </div>
        </div>

        {/* ---------- TEACHER'S NOTE (detailed) ---------- */}
        <div className={clsx(fadeSlideClasses, "mt-6", "[animation-delay:900ms]")}>
          <TeacherNote experience={experienceYears} detailed />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub‑components for reusability and clarity
// ----------------------------------------------------------------------

/** Section wrapper with fade+slide and arbitrary animation delay */
function ConceptSection({ title, delay, className, children }) {
  return (
    <section
      className={clsx(
        className,
        "space-y-4",
        delay && `motion-safe:[animation-delay:${delay}ms]`
      )}
    >
      <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Hint box – subtle, encouraging thinking */
function HintBox({ children }) {
  return (
    <div className="mt-3 p-4 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg border-l-4 border-blue-400 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100/70 dark:hover:bg-blue-900/60 transition-colors">
      💭 {children}
    </div>
  );
}

/** Teacher's Note – mandatory, with Sukanta Hui's details */
function TeacherNote({ experience, detailed = false }) {
  const base = (
    <div className="p-5 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 hover:shadow-lg transition-shadow group">
      <div className="flex flex-wrap gap-4 items-start">
        <div className="bg-amber-200 dark:bg-amber-800 p-3 rounded-full group-hover:scale-110 transition-transform">
          🧑‍🏫
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-lg">
            Teacher's Note – Sukanta Hui
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">
            {experience} years of experience (since 1998) • Programming Languages, RDBMS, OS, Web Dev
            <br />
            <span className="font-mono text-xs">📧 sukantahui@codernaccotax.co.in</span>
            <span className="mx-2">•</span>
            <span className="font-mono text-xs">📱 7003756860</span>
          </p>
        </div>
      </div>
      {detailed && (
        <div className="mt-4 text-sm text-gray-800 dark:text-gray-100 border-t border-amber-200 dark:border-amber-800 pt-4">
          <p className="italic">
            “I always tell my students: cron is unforgiving. It won't tell you ‘command not found’ – it just fails silently.
            In 27 years, the most frequent question in my Barrackpore classes is: ‘Why doesn't my cron job work?’
            The answer is almost always PATH. Start with <code>/usr/bin/env bash</code> and absolute paths, and you'll never cry again.”
          </p>
        </div>
      )}
    </div>
  );
  return detailed ? base : <div className="not-prose">{base}</div>;
}

/** SVG – Cron timeline with animated job triggers */
function CronTimelineSVG() {
  return (
    <svg width="100%" height="100" viewBox="0 0 700 100" className="overflow-visible">
      {/* Time line */}
      <line x1="50" y1="50" x2="650" y2="50" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 2" />
      
      {/* Hour markers */}
      {[0, 6, 12, 18, 24].map((h, i) => (
        <g key={i}>
          <rect x={50 + i * 150} y="40" width="2" height="20" className="fill-gray-500 dark:fill-gray-400" />
          <text x={50 + i * 150 - 10} y="80" className="fill-gray-600 dark:fill-gray-400 text-[10px]">{h}:00</text>
        </g>
      ))}

      {/* Job 1 – every day at 2:30 (animated) */}
      <circle cx="110" cy="50" r="10" className="fill-amber-500 dark:fill-amber-400 stroke-white stroke-2">
        <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="110" y="30" className="fill-amber-600 dark:fill-amber-300 text-[10px] font-medium" textAnchor="middle">
        backup
      </text>

      {/* Job 2 – every Monday at 9:00 (animated) */}
      <circle cx="260" cy="50" r="8" className="fill-emerald-500 dark:fill-emerald-400 stroke-white stroke-2">
        <animate attributeName="r" values="8;12;8" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x="260" y="20" className="fill-emerald-600 dark:fill-emerald-300 text-[10px] font-medium" textAnchor="middle">
        cleanup
      </text>

      {/* Job 3 – @reboot */}
      <circle cx="410" cy="50" r="8" className="fill-indigo-500 dark:fill-indigo-400 stroke-white stroke-2">
        <animate attributeName="r" values="8;12;8" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <text x="410" y="20" className="fill-indigo-600 dark:fill-indigo-300 text-[10px] font-medium" textAnchor="middle">
        @reboot
      </text>

      {/* Job 4 – every 15 minutes */}
      <circle cx="560" cy="50" r="8" className="fill-rose-500 dark:fill-rose-400 stroke-white stroke-2">
        <animate attributeName="r" values="8;12;8" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <text x="560" y="20" className="fill-rose-600 dark:fill-rose-300 text-[10px] font-medium" textAnchor="middle">
        */15
      </text>

      <text x="350" y="95" className="fill-gray-500 dark:fill-gray-400 text-[11px] italic" textAnchor="middle">
        ● Jobs pulse when they are scheduled to run
      </text>
    </svg>
  );
}