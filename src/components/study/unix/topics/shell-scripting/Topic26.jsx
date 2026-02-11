import React from "react";
import clsx from "clsx";

// Raw imports of shell script and configuration examples
import simpleLoggerSh from "./topic26_files/simple_logger.sh?raw";
import loggerLevelsSh from "./topic26_files/logger_levels.sh?raw";
import loggerCommandSh from "./topic26_files/logger_command.sh?raw";
import logrotateConf from "./topic26_files/logrotate_example.conf?raw";
import manualRotationSh from "./topic26_files/manual_rotation.sh?raw";

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
// Main Component – Topic 26: Logging strategies and basic log rotation
// ----------------------------------------------------------------------
export default function Topic26() {
  // Calculate Sukanta Hui's experience dynamically from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Animation delays for staggered reveal (motion‑safe only)
  const fadeSlideClasses = "motion-safe:animate-[fadeIn_0.6s_ease-out,slideUp_0.6s_ease-out]";

  return (
    // Force dark mode as default by wrapping content in a `dark` class container
    // All subsequent `dark:` variants will activate automatically.
    <div className="dark">
      {/* Main container – soothing, classroom‑ready typography */}
      <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 leading-relaxed space-y-14">

        {/* ---------- HEADER SECTION ---------- */}
        <header className={clsx(fadeSlideClasses, "space-y-4")}>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-12 bg-gradient-to-b from-emerald-500 to-teal-400 rounded-full" />
            <h1 className="text-4xl font-light tracking-tight text-gray-800 dark:text-gray-100">
              Logging Strategies & Basic Log Rotation
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 ml-4 border-l-4 border-emerald-300 pl-5 italic">
            “Silent scripts are hard to debug – logs are your script's memory.”
          </p>
          {/* Teacher's Note – always present, hover emphasis */}
          <TeacherNote experience={experienceYears} />
        </header>

        {/* ---------- CONCEPT: WHY LOGGING? ---------- */}
        <ConceptSection
          title="📝 1. Why Log? – The Voice of Your Script"
          delay="100"
          className={fadeSlideClasses}
        >
          <p className="mb-3">
            When Abhronila from Shyamnagar runs a backup cron job at 2 AM, she can't watch the output.
            <strong> Logging</strong> records what happened, when, and whether it succeeded.
            Logs are used for:
          </p>
          <ul className="list-disc pl-8 space-y-1 text-gray-700 dark:text-gray-300">
            <li><span className="font-semibold">Auditing</span> – Who did what and when.</li>
            <li><span className="font-semibold">Debugging</span> – See variable values, error messages.</li>
            <li><span className="font-semibold">Monitoring</span> – Detect failures or anomalies.</li>
            <li><span className="font-semibold">Compliance</span> – Retain records for security.</li>
          </ul>
          <p className="mt-4">
            A log entry should contain: <strong>timestamp, script name, log level, message</strong>.
          </p>

          {/* SVG – log entry anatomy with native animation */}
          <div className="mt-8 p-6 bg-gray-50/80 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
              <span className="text-emerald-500">📋</span> Anatomy of a log line
            </h3>
            <LogEntryAnimationSVG />
          </div>
        </ConceptSection>

        {/* ---------- LOG LEVELS ---------- */}
        <ConceptSection title="🎚️ 2. Log Levels – Prioritize the Noise" delay="200" className={fadeSlideClasses}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="mb-2">Typical levels (from least to most severe):</p>
              <ul className="space-y-1 text-sm">
                <li><span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">DEBUG</span> – Detailed diagnostic info.</li>
                <li><span className="px-2 py-0.5 bg-green-200 dark:bg-green-900 rounded">INFO</span>  – Normal operation milestones.</li>
                <li><span className="px-2 py-0.5 bg-yellow-200 dark:bg-yellow-900 rounded">WARN</span>  – Unexpected but non‑critical.</li>
                <li><span className="px-2 py-0.5 bg-red-200 dark:bg-red-900 rounded">ERROR</span> – Failure that may affect function.</li>
                <li><span className="px-2 py-0.5 bg-red-400 dark:bg-red-700 text-white rounded">FATAL</span> – Script cannot continue.</li>
              </ul>
            </div>
            <div className="bg-emerald-50/30 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900 hover:scale-[1.01] transition-transform">
              <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">📌 Professional practice</h4>
              <p className="text-sm">
                Set a configurable <code className="text-xs">LOG_LEVEL</code> variable. 
                In production, show <code>INFO</code> and above; during development, show <code>DEBUG</code>.
              </p>
            </div>
          </div>
          <HintBox>
            <strong>Observe carefully…</strong> <code>DEBUG</code> logs can expose passwords if you aren't careful.
            Always sanitize secrets before writing to a log file.
          </HintBox>
        </ConceptSection>

        {/* ---------- EXAMPLE 1: SIMPLE LOGGER FUNCTION ---------- */}
        <ConceptSection title="🔨 3. Building a Reusable Logger" delay="300" className={fadeSlideClasses}>
          <p className="mb-2">
            Tuhina writes a logger function that adds timestamps and writes to a file.
          </p>
          <ShellFileLoader
            fileModule={simpleLoggerSh}
            title="simple_logger.sh – timestamp + file"
            highlightLines={[3, 6, 7, 12]}
          />
          <div className="mt-6 p-5 bg-amber-50/70 dark:bg-amber-950/40 rounded-lg border border-amber-300 dark:border-amber-800 flex items-start gap-3">
            <span className="text-amber-700 dark:text-amber-400 text-2xl">💡</span>
            <div>
              <strong>Industry tip:</strong> Use <code>readonly LOG_FILE</code> to prevent accidental overwriting.
              Also, consider rotating the log file within the script if it grows too large.
            </div>
          </div>
        </ConceptSection>

        {/* ---------- EXAMPLE 2: LOG LEVELS IMPLEMENTATION ---------- */}
        <ConceptSection title="⚖️ 4. Log Levels in Action" delay="400" className={fadeSlideClasses}>
          <ShellFileLoader
            fileModule={loggerLevelsSh}
            title="logger_levels.sh – dynamic level filtering"
            highlightLines={[1, 9, 12, 17, 21, 30]}
          />
          <HintBox>
            <strong>Try changing this…</strong> Set <code>LOG_LEVEL=DEBUG</code> and see how many messages appear.
            Debangshu uses this to troubleshoot his Naihati school attendance script.
          </HintBox>
        </ConceptSection>

        {/* ---------- EXAMPLE 3: USING LOGGER COMMAND ---------- */}
        <ConceptSection title="📡 5. Centralized Logging with logger" delay="500" className={fadeSlideClasses}>
          <p className="mb-3">
            The <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">logger</code> command sends messages to the system log (syslog).
            Ideal for scripts that run on servers with centralized log management.
          </p>
          <ShellFileLoader
            fileModule={loggerCommandSh}
            title="logger_command.sh – syslog integration"
            highlightLines={[4, 6, 8]}
          />
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            View with <code>journalctl</code> (systemd) or <code>/var/log/syslog</code>.
          </p>
        </ConceptSection>

        {/* ---------- LOG ROTATION BASICS ---------- */}
        <ConceptSection title="🔄 6. Log Rotation – Taming Growing Files" delay="600" className={fadeSlideClasses}>
          <p className="mb-4">
            Without rotation, logs consume all disk space. <strong>logrotate</strong> is the standard tool:
            it compresses, moves, and deletes old logs according to rules.
          </p>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* logrotate configuration example */}
            <div>
              <h4 className="font-medium text-emerald-700 dark:text-emerald-400 mb-2">📁 /etc/logrotate.d/myapp</h4>
              <ShellFileLoader
                fileModule={logrotateConf}
                title="logrotate_example.conf"
                highlightLines={[2, 4, 6, 8]}
              />
            </div>
            {/* manual rotation script (fallback) */}
            <div>
              <h4 className="font-medium text-emerald-700 dark:text-emerald-400 mb-2">⚙️ Manual rotation (cron fallback)</h4>
              <ShellFileLoader
                fileModule={manualRotationSh}
                title="manual_rotation.sh"
                highlightLines={[5, 8, 12]}
              />
            </div>
          </div>
          <p className="mt-5 text-sm bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded border border-blue-300 dark:border-blue-800">
            <strong>Real‑world:</strong> At Barrackpore’s IT office, every script writes to <code>/var/log/scripts/</code>
            and logrotate is configured per application. Swadeep adds a <code>postrotate</code> command to reload services.
          </p>
        </ConceptSection>

        {/* ---------- PITFALLS, BEST PRACTICES, CHECKLIST ---------- */}
        <div className={clsx(fadeSlideClasses, "grid md:grid-cols-2 gap-8", "[animation-delay:700ms]")}>
          {/* Common pitfalls */}
          <div className="bg-red-50/50 dark:bg-red-950/30 p-6 rounded-xl border border-red-200 dark:border-red-900 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
              ⚠️ Beginner logging traps
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <li>❌ Forgetting to redirect stderr – errors go to console, not log.</li>
              <li>❌ No timestamps – “Backup completed” is useless without context.</li>
              <li>❌ Writing logs inside the script's own directory (permission issues).</li>
              <li>❌ Overwriting log file with <code>&gt;</code> instead of appending <code>&gt;&gt;</code>.</li>
              <li>❌ Not handling log rotation – disk fills up silently.</li>
              <li>❌ Logging sensitive data (passwords, tokens) in plain text.</li>
            </ul>
          </div>
          {/* Best practices */}
          <div className="bg-green-50/50 dark:bg-green-950/30 p-6 rounded-xl border border-green-200 dark:border-green-900 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
              ✅ Professional logging habits
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <li>➕ Use a dedicated log directory (e.g., <code>/var/log/$(basename $0)/</code>).</li>
              <li>➕ Always include timestamp, script name, level, and PID.</li>
              <li>➕ Make log level configurable via environment variable.</li>
              <li>➕ For cron jobs, ensure output is redirected: <code>&gt;&gt; /var/log/script.log 2&gt;&amp;1</code>.</li>
              <li>➕ Implement log rotation – either via logrotate or internal size check.</li>
              <li>➕ Mask secrets: <code>{`echo "\${PASSWORD//?/*}"`}</code>.</li>
            </ul>
          </div>
        </div>

        {/* ---------- MINI CHECKLIST ---------- */}
        <div className={clsx(fadeSlideClasses, "bg-emerald-50/70 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800", "[animation-delay:800ms]")}>
          <h3 className="text-xl font-medium text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
            ✅ Mini checklist – before you ship your script…
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-gray-800 dark:text-gray-200">
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">▹</span> Log directory exists and is writable?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">▹</span> Timestamp format is consistent (ISO 8601)?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">▹</span> Log level can be changed without editing the script?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">▹</span> Is stderr also captured?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">▹</span> Does logrotate cover this file?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">▹</span> Are secrets filtered out?
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
            “In {experience}+ years, I've seen servers crash because no one thought logs would grow.
            Start every script with a logging function. Teach students to <code>grep</code> their own logs.
            At Naihati, we made it a rule: no script goes into production without a log rotation plan.”
          </p>
        </div>
      )}
    </div>
  );
  return detailed ? base : <div className="not-prose">{base}</div>;
}

/** SVG – Log entry breakdown with animated timestamp */
function LogEntryAnimationSVG() {
  return (
    <svg width="100%" height="90" viewBox="0 0 700 90" className="overflow-visible">
      {/* Background line representing a log entry */}
      <rect x="10" y="30" width="660" height="30" rx="4"
            className="fill-gray-100 dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600 stroke-1" />
      {/* Timestamp segment */}
      <rect x="15" y="30" width="160" height="30" rx="4"
            className="fill-indigo-200 dark:fill-indigo-900/70 stroke-indigo-500 stroke-1 group-hover:fill-indigo-300 dark:group-hover:fill-indigo-800 transition-colors" />
      <text x="30" y="50" className="fill-gray-800 dark:fill-gray-200 text-[10px] font-mono">
        2025-04-12T14:23:01
      </text>
      {/* Script name segment */}
      <rect x="180" y="30" width="120" height="30" rx="4"
            className="fill-emerald-200 dark:fill-emerald-900/70 stroke-emerald-500 stroke-1 group-hover:fill-emerald-300 dark:group-hover:fill-emerald-800 transition-colors" />
      <text x="195" y="50" className="fill-gray-800 dark:fill-gray-200 text-[10px] font-mono">
        backup.sh[1234]
      </text>
      {/* Level segment */}
      <rect x="305" y="30" width="70" height="30" rx="4"
            className="fill-amber-200 dark:fill-amber-900/70 stroke-amber-500 stroke-1 group-hover:fill-amber-300 dark:group-hover:fill-amber-800 transition-colors" />
      <text x="320" y="50" className="fill-gray-800 dark:fill-gray-200 text-[10px] font-mono font-semibold">
        INFO
      </text>
      {/* Message segment */}
      <rect x="380" y="30" width="285" height="30" rx="4"
            className="fill-gray-200 dark:fill-gray-700 stroke-gray-400 stroke-1 group-hover:fill-gray-300 dark:group-hover:fill-gray-600 transition-colors" />
      <text x="395" y="50" className="fill-gray-800 dark:fill-gray-200 text-[10px] font-mono">
        Backup of /home completed (2.3 GB)
      </text>
      {/* Animated "writing" indicator */}
      <circle cx="650" cy="45" r="5" className="fill-emerald-500">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="660" y="50" className="fill-gray-500 dark:fill-gray-400 text-[9px]">log stream</text>
    </svg>
  );
}