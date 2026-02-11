import React from "react";
import clsx from "clsx";

// Shell script examples (raw imports via Vite's ?raw suffix)
import trapCleanupScript from "./topic25_files/trap_cleanup.sh?raw";
import trapExitScript from "./topic25_files/trap_exit.sh?raw";
import trapMultiSignalScript from "./topic25_files/trap_multi_signal.sh?raw";
import trapPingScript from "./topic25_files/trap_ping.sh?raw"; // real‑world use

// Common component for displaying shell scripts with syntax highlighting simulation
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// ----------------------------------------------------------------------
// Inline keyframes – zero‑config, only used for motion‑safe animations
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
// Main Component – Topic 25: Traps and signals (INT, TERM, EXIT)
// ----------------------------------------------------------------------
export default function Topic25() {
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
            <div className="w-1.5 h-12 bg-gradient-to-b from-indigo-500 to-cyan-400 rounded-full" />
            <h1 className="text-4xl font-light tracking-tight text-gray-800 dark:text-gray-100">
              Traps & Signals
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 ml-4 border-l-4 border-indigo-300 pl-5 italic">
            “Make your scripts resilient – catch signals, clean up, and exit gracefully.”
          </p>
          {/* Teacher's Note – always present, hover emphasis */}
          <TeacherNote experience={experienceYears} />
        </header>

        {/* ---------- CONCEPT: WHAT ARE SIGNALS? ---------- */}
        <ConceptSection
          title="🧠 1. Signals – The Kernel's Way to Talk"
          delay="100"
          className={fadeSlideClasses}
        >
          <p className="mb-3">
            In Linux, a <span className="font-mono text-indigo-600 dark:text-indigo-400">signal</span> is a software interrupt delivered to a process.
            It notifies the process that an event has occurred. Common signals:
          </p>
          <ul className="list-disc pl-8 space-y-1 text-gray-700 dark:text-gray-300">
            <li><span className="font-mono font-semibold">SIGINT</span> (2) – Interactive attention (Ctrl+C).</li>
            <li><span className="font-mono font-semibold">SIGTERM</span> (15) – Termination request (default <code>kill</code>).</li>
            <li><span className="font-mono font-semibold">SIGEXIT</span> (0) – <span className="italic">Pseudo‑signal</span>, runs when the shell exits.</li>
            <li><span className="font-mono font-semibold">SIGHUP</span> (1), <span className="font-mono font-semibold">SIGKILL</span> (9), …</li>
          </ul>
          <p className="mt-4">
            Without a <strong>trap</strong>, the default action (often termination) is taken. 
            The <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">trap</code> built‑in lets you intercept signals and execute custom commands.
          </p>

          {/* SVG – signal delivery with native <animate> */}
          <div className="mt-8 p-6 bg-gray-50/80 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
              <span className="text-indigo-500">⚡</span> Signal propagation (INT → trap → handler)
            </h3>
            <SignalAnimationSVG />
          </div>
        </ConceptSection>

        {/* ---------- TRAP SYNTAX & PROTOTYPE ---------- */}
        <ConceptSection
          title="⚙️ 2. trap – Signature & Semantics"
          delay="200"
          className={fadeSlideClasses}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-sm bg-gray-800 text-gray-100 p-3 rounded-md inline-block">
                trap ['command'] signal [signal ...]
              </p>
              <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Purpose:</strong> Set a handler that runs when the shell receives one or more signals.</li>
                <li><strong>Return:</strong> Always 0 (unless invalid syntax).</li>
                <li><strong>Special uses:</strong>
                  <ul className="pl-6 list-disc mt-1">
                    <li><code>trap - signal</code> → reset to default.</li>
                    <li><code>trap '' signal</code> → ignore signal.</li>
                    <li><code>trap -p</code> → list current traps.</li>
                    <li><code>trap 'cmd' EXIT</code> → run on any script exit.</li>
                  </ul>
                </li>
              </ul>
              <HintBox>
                <strong>Think about…</strong> The command string is evaluated when the signal arrives, 
                not when <code>trap</code> is declared. Use single quotes or escape variables if you need 
                their value at trap time.
              </HintBox>
            </div>
            <div className="bg-indigo-50/30 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-900 hover:scale-[1.01] transition-transform">
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">📘 When & why</h4>
              <p className="text-sm">
                Use traps to:<br />
                ✅ Remove temporary files (always).<br />
                ✅ Flush buffers / save state.<br />
                ✅ Kill child processes before exiting.<br />
                ✅ Print a friendly message instead of a hard crash.<br />
                ✅ Prevent Ctrl+C from aborting critical sections.
              </p>
            </div>
          </div>
        </ConceptSection>

        {/* ---------- EXAMPLE 1: CLEANUP WITH EXIT & INT ---------- */}
        <ConceptSection title="🧹 3. Real‑world: Cleaning up temporary files" delay="300" className={fadeSlideClasses}>
          <p className="mb-4">
            <span className="bg-yellow-100 dark:bg-yellow-900/40 px-2 py-0.5 rounded">Scenario</span> – 
            Swadeep from Barrackpore writes a script that creates scratch files. 
            He uses <code>trap</code> to delete them even if the script is interrupted.
          </p>
          <ShellFileLoader
            fileModule={trapCleanupScript}
            title="cleanup_temp.sh – Trap INT + EXIT"
            highlightLines={[4, 5, 9, 13]}
          />
          <div className="mt-6 p-5 bg-amber-50/70 dark:bg-amber-950/40 rounded-lg border border-amber-300 dark:border-amber-800 flex items-start gap-3">
            <span className="text-amber-700 dark:text-amber-400 text-2xl">💡</span>
            <div>
              <strong>Professional tip:</strong> Always trap <code>EXIT</code> – it fires even on normal exit, 
              and you avoid repeating cleanup code. Tuhina uses this pattern in all her data‑processing pipelines.
            </div>
          </div>
        </ConceptSection>

        {/* ---------- EXAMPLE 2: IGNORING / RESETTING SIGNALS ---------- */}
        <ConceptSection title="🛡️ 4. Ignoring signals & resetting traps" delay="400" className={fadeSlideClasses}>
          <p className="mb-2">
            To temporarily disable Ctrl+C during a critical operation, set <code>trap '' INT</code>.
            Later, restore it with <code>trap - INT</code>.
          </p>
          <ShellFileLoader
            fileModule={trapMultiSignalScript}
            title="critical_section.sh – ignore & restore"
            highlightLines={[6, 12, 16]}
          />
          <HintBox>
            <strong>Try changing this…</strong> Remove the second <code>trap</code> – what happens when you press 
            Ctrl+C after the critical section? Debangshu discovered that ignoring signals persists; always restore!
          </HintBox>
        </ConceptSection>

        {/* ---------- EXAMPLE 3: MULTIPLE SIGNALS, ONE HANDLER ---------- */}
        <ConceptSection title="🎛️ 5. Handling several signals with one function" delay="500" className={fadeSlideClasses}>
          <p className="mb-3">
            Group cleanup or logging for <code>INT</code>, <code>TERM</code>, <code>HUP</code>. 
            Abhronila uses this in her server monitoring scripts.
          </p>
          <ShellFileLoader
            fileModule={trapExitScript}
            title="graceful_shutdown.sh – common handler"
            highlightLines={[3, 6, 7]}
          />
        </ConceptSection>

        {/* ---------- EXAMPLE 4: REAL‑WORLD – PING MONITOR WITH TRAP ---------- */}
        <ConceptSection title="🌐 6. Production scenario – scheduled ping & log rotation" delay="600" className={fadeSlideClasses}>
          <p className="mb-3">
            At Ichapur school lab, a cron job pings servers. The script must not leave stale lock files.
            <span className="block mt-1 text-gray-600 dark:text-gray-400 text-sm">
              → Trap <code>INT</code> and <code>EXIT</code> to remove lock, even if killed.
            </span>
          </p>
          <ShellFileLoader
            fileModule={trapPingScript}
            title="ping_with_lock.sh – production ready"
            highlightLines={[7, 8, 21, 26]}
          />
        </ConceptSection>

        {/* ---------- PITFALLS, BEST PRACTICES, CHECKLIST ---------- */}
        <div className={clsx(fadeSlideClasses, "grid md:grid-cols-2 gap-8", "[animation-delay:700ms]")}>
          {/* Common pitfalls */}
          <div className="bg-red-50/50 dark:bg-red-950/30 p-6 rounded-xl border border-red-200 dark:border-red-900 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
              ⚠️ Beginner traps (pun intended)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <li>❌ Using double quotes with variables that should be evaluated at signal time.</li>
              <li>❌ Forgetting that subshells do not inherit traps from parent.</li>
              <li>❌ Trying to trap <code>SIGKILL</code> (cannot be caught).</li>
              <li>❌ Not resetting traps in scripts that are sourced.</li>
              <li>❌ Misunderstanding <code>EXIT</code> – it runs even on syntax errors.</li>
            </ul>
          </div>
          {/* Best practices */}
          <div className="bg-green-50/50 dark:bg-green-950/30 p-6 rounded-xl border border-green-200 dark:border-green-900 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
              ✅ Professional habits
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <li>➕ Always trap <code>EXIT</code> for cleanup – it’s idempotent and covers all exits.</li>
              <li>➕ Define handler functions for readability.</li>
              <li>➕ Use <code>trap -p</code> inside scripts to debug active traps.</li>
              <li>➕ Put traps at the very top of the script.</li>
              <li>➕ In libraries, avoid overriding user traps without saving/restoring.</li>
            </ul>
          </div>
        </div>

        {/* ---------- MINI CHECKLIST ---------- */}
        <div className={clsx(fadeSlideClasses, "bg-indigo-50/70 dark:bg-indigo-950/40 p-6 rounded-2xl border border-indigo-300 dark:border-indigo-800", "[animation-delay:800ms]")}>
          <h3 className="text-xl font-medium text-indigo-800 dark:text-indigo-300 mb-3 flex items-center gap-2">
            ✅ Mini checklist – every script should…
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-gray-800 dark:text-gray-200">
            <div className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">▹</span> Clean up temporary files?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">▹</span> Handle Ctrl+C gracefully?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">▹</span> Kill background children on exit?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">▹</span> Restore terminal settings?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">▹</span> Log interruptions?
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">▹</span> Reset ignored signals afterwards?
            </div>
          </div>
        </div>

        {/* ---------- TEACHER'S NOTE (duplicate but explicit) ---------- */}
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
            “Traps are one of the first things I teach after basic commands. 
            In 27+ years, I've seen countless scripts fail because they didn't clean up. 
            Start with <code>trap cleanup EXIT</code> – it’s a game changer for Swadeep, Tuhina, 
            and every student in Naihati batch.”
          </p>
        </div>
      )}
    </div>
  );
  return detailed ? base : <div className="not-prose">{base}</div>;
}

/** SVG illustration of signal interception using native <animate> */
function SignalAnimationSVG() {
  return (
    <svg width="100%" height="120" viewBox="0 0 600 120" className="overflow-visible">
      {/* Process box */}
      <rect x="40" y="30" width="100" height="60" rx="8"
            className="fill-white dark:fill-gray-800 stroke-indigo-600 dark:stroke-indigo-400 stroke-2 transition-all duration-300 group-hover:stroke-3" />
      <text x="90" y="65" textAnchor="middle" className="fill-gray-800 dark:fill-gray-100 text-xs font-mono">Script</text>

      {/* Signal sender (keyboard/Ctrl+C) */}
      <rect x="400" y="40" width="120" height="40" rx="6"
            className="fill-gray-200 dark:fill-gray-700 stroke-gray-500 stroke-1" />
      <text x="460" y="65" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">Ctrl+C (SIGINT)</text>

      {/* Animated signal path */}
      <path id="signalPath" d="M400,60 L160,60" stroke="#818cf8" strokeWidth="2" strokeDasharray="6 6" fill="none" />
      <circle r="8" className="fill-red-500">
        <animateMotion dur="1.2s" repeatCount="indefinite" path="M400,60 L160,60" />
      </circle>

      {/* Trap handler inside process */}
      <rect x="70" y="70" width="40" height="20" rx="4"
            className="fill-amber-300 dark:fill-amber-600 stroke-amber-700 stroke-1" />
      <text x="90" y="85" textAnchor="middle" className="fill-gray-900 text-[9px] font-bold">trap</text>

      {/* Handler response */}
      <path d="M110,70 L220,20" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="220" y="10" width="80" height="30" rx="4"
            className="fill-emerald-200 dark:fill-emerald-800 stroke-emerald-600 stroke-1" />
      <text x="260" y="30" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 text-[10px]">cleanup()</text>

      <text x="520" y="100" className="fill-gray-500 dark:fill-gray-400 text-[10px]">▲ signal caught</text>
    </svg>
  );
}