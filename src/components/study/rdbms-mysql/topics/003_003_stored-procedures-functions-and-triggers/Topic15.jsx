import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15 – MySQL Event Scheduler: Creating Scheduled Database Jobs and Automated Maintenance
 * Module: 003_003_stored-procedures-functions-and-triggers
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on the MySQL Event Scheduler, one-time events (AT), recurring jobs (EVERY), lifecycle management (ENABLE, DISABLE, PRESERVE), and automated maintenance routines.
 */
const Topic15 = () => {
  // Interactive Simulator State
  const [selectedSchedulerScenario, setSelectedSchedulerScenario] = useState("nightly_token_purge_job");

  const schedulerScenarios = {
    nightly_token_purge_job: {
      title: "1. Nightly Maintenance: Purging Expired Session Tokens (EVERY 1 DAY)",
      badge: "Recurring Nightly",
      badgeColor: "emerald",
      sqlQuery: `-- Step 1: Ensure event scheduler daemon is active:
SET GLOBAL event_scheduler = ON;

-- Step 2: Create recurring nightly maintenance event:
DELIMITER //

CREATE EVENT evt_nightly_session_purge
ON SCHEDULE EVERY 1 DAY
STARTS '2026-09-01 03:00:00'
ON COMPLETION PRESERVE
ENABLE
COMMENT 'Purges expired login tokens every night at 3:00 AM IST'
DO
BEGIN
    -- Delete tokens expired more than 24 hours ago:
    DELETE FROM user_auth_tokens 
    WHERE expires_at < NOW() - INTERVAL 1 DAY;
    
    -- Record maintenance execution in system log:
    INSERT INTO maintenance_run_log (event_name, rows_affected, executed_at)
    VALUES ('evt_nightly_session_purge', ROW_COUNT(), NOW());
END //

DELIMITER ;`,
      resultRows: [
        { id: "evt_nightly_session_purge", cadence: "EVERY 1 DAY @ 03:00 IST", eventType: "RECURRING", preserve: "PRESERVE ✅", state: "ENABLED", actionTaken: "Purges expired auth tokens & logs execution", status: "Active Scheduled Job" },
      ],
      explanation:
        "Recurring events execute on a scheduled cadence (every night at 3:00 AM), purging temporary auth tokens and logging execution stats without requiring an external OS cron daemon.",
    },
    hourly_cart_expiry_cleaner: {
      title: "2. Hourly Cadence: Expiring Stale Registration Drafts (EVERY 1 HOUR)",
      badge: "Recurring Hourly",
      badgeColor: "cyan",
      sqlQuery: `-- Automatically releases reserved course seats if payment is abandoned:
DELIMITER //

CREATE EVENT evt_hourly_expire_abandoned_registrations
ON SCHEDULE EVERY 1 HOUR
STARTS CURRENT_TIMESTAMP
ON COMPLETION PRESERVE
ENABLE
COMMENT 'Releases seat holds for registrations pending > 2 hours'
DO
BEGIN
    -- Step 1: Update status to ABANDONED:
    UPDATE course_registration_drafts 
    SET status = 'ABANDONED'
    WHERE status = 'PENDING_PAYMENT' 
      AND created_at < NOW() - INTERVAL 2 HOUR;
      
    -- Step 2: Invoke procedure to restore available seat inventory:
    CALL sp_recalculate_course_capacities();
END //

DELIMITER ;`,
      resultRows: [
        { id: "evt_hourly_expire_drafts", cadence: "EVERY 1 HOUR", eventType: "RECURRING", preserve: "PRESERVE ✅", state: "ENABLED", actionTaken: "Releases abandoned seat reservations & updates capacity", status: "Active Scheduled Job" },
      ],
      explanation:
        "Running every hour, this event identifies abandoned payment drafts and triggers stored procedures to replenish course seat availability for incoming students.",
    },
    one_time_semester_graduation: {
      title: "3. One-Time Scheduled Job: Semester Rollover (AT timestamp)",
      badge: "One-Time Event",
      badgeColor: "indigo",
      sqlQuery: `-- One-time event scheduled to execute at exact semester rollover moment:
CREATE EVENT evt_semester_2026_rollover
ON SCHEDULE AT '2026-12-31 23:59:59'
ON COMPLETION PRESERVE
ENABLE
COMMENT 'One-time semester archive and grade promotion'
DO
    CALL sp_execute_semester_grade_rollover(2026, 'FALL');`,
      resultRows: [
        { id: "evt_semester_rollover", cadence: "AT '2026-12-31 23:59:59'", eventType: "ONE-TIME", preserve: "PRESERVE ✅", state: "ENABLED", actionTaken: "Executes semester graduation & grade rollover procedure", status: "Pending Future Execution" },
      ],
      explanation:
        "`AT timestamp` creates a one-time execution job. Using `ON COMPLETION PRESERVE` ensures the event definition remains in the database for auditing after it fires.",
    },
    lifecycle_management_disable_enable: {
      title: "4. Lifecycle Control: Pausing & Resuming Events (DISABLE / ENABLE)",
      badge: "Lifecycle Control",
      badgeColor: "amber",
      sqlQuery: `-- 1. Pause an event during scheduled system maintenance:
ALTER EVENT evt_nightly_session_purge DISABLE;

-- 2. Resume event when maintenance finishes:
ALTER EVENT evt_nightly_session_purge ENABLE;

-- 3. Rename event:
ALTER EVENT evt_nightly_session_purge RENAME TO evt_daily_token_purger;

-- 4. Safe Idempotent Drop:
DROP EVENT IF EXISTS evt_daily_token_purger;`,
      resultRows: [
        { id: "ALTER EVENT DISABLE", cadence: "Paused", eventType: "MANAGEMENT", preserve: "N/A", state: "DISABLED", actionTaken: "Temporarily halts scheduled executions", status: "Paused" },
        { id: "ALTER EVENT ENABLE", cadence: "Active", eventType: "MANAGEMENT", preserve: "N/A", state: "ENABLED", actionTaken: "Resumes normal scheduled cadence", status: "Resumed" },
      ],
      explanation:
        "The event scheduler provides full lifecycle commands (`ALTER EVENT DISABLE / ENABLE`), allowing administrators to pause background jobs during maintenance windows.",
    },
  };

  const navItems = [
    { id: "scheduler-concept", label: "1. Scheduler Daemon" },
    { id: "event-syntax", label: "2. One-Time vs Recurring" },
    { id: "svg-diagrams", label: "3. Engine & Cadence SVGs" },
    { id: "interactive-sandbox", label: "4. Live Scheduler Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_003</span>
            <span>•</span>
            <span>Topic 15 of 16</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Automated Maintenance
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            MySQL Event Scheduler: Database Jobs &amp; Maintenance
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Automate recurring database maintenance tasks and background jobs. Master the <code className="text-cyan-300 font-mono">event_scheduler</code> daemon, one-time events (<code className="text-cyan-300 font-mono">AT</code>), recurring schedules (<code className="text-cyan-300 font-mono">EVERY</code>), <code className="text-cyan-300 font-mono">ON COMPLETION PRESERVE</code>, and replication safety.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Scheduler Concept */}
        <section id="scheduler-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The MySQL Event Scheduler Daemon
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Built-in in-memory database task scheduler executing with zero network overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">1. Activating the Event Scheduler</h3>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`-- Dynamic Runtime Activation:
SET GLOBAL event_scheduler = ON;

-- Verify Scheduler Daemon Thread:
SHOW VARIABLES LIKE 'event_scheduler';`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-indigo-400">2. Persistent Server Configuration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To guarantee the event scheduler stays active after server reboots, add the following directive under <code className="text-cyan-300 font-mono">[mysqld]</code> in <code className="text-cyan-300 font-mono">my.cnf</code>:
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800">
{`[mysqld]
event_scheduler=ON`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 2: Event Syntax */}
        <section id="event-syntax" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. One-Time vs Recurring Scheduled Events
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing one-time triggers with recurring intervals and preservation flags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 font-mono">One-Time Event (AT)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes exactly once at a specified timestamp in the future.
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE EVENT evt_one_time
ON SCHEDULE AT NOW() + INTERVAL 2 HOUR
ON COMPLETION PRESERVE
DO CALL sp_cleanup();`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 font-mono">Recurring Event (EVERY)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes repeatedly at recurring intervals (e.g. <code className="text-emerald-300 font-mono">EVERY 1 DAY</code>, <code className="text-emerald-300 font-mono">EVERY 15 MINUTE</code>).
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE EVENT evt_recurring
ON SCHEDULE EVERY 1 DAY STARTS '2026-09-01 02:00:00'
ON COMPLETION PRESERVE
DO CALL sp_nightly_job();`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Engine Pipeline &amp; Scheduling Cadences
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing internal daemon execution with recurring time intervals.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Engine Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> MySQL Event Scheduler Engine Pipeline
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Daemon Thread */}
                  <g>
                    <rect x="20" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">1. Scheduler Daemon</text>
                    <rect x="30" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="110" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">event_scheduler thread</text>
                    <text x="110" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">In-memory time monitor</text>
                  </g>

                  {/* Schedule Check */}
                  <g>
                    <rect x="230" y="30" width="180" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">2. Interval Cadence</text>
                    <rect x="240" y="70" width="160" height="40" rx="4" fill="#022c22" />
                    <text x="320" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">EVERY 1 DAY / 1 HOUR</text>
                    <text x="320" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Evaluates execution time</text>
                  </g>

                  {/* Execution Target */}
                  <g>
                    <rect x="440" y="30" width="190" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="535" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">3. Job Execution</text>
                    <rect x="450" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="535" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">CALL sp_nightly_job()</text>
                    <text x="535" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Runs maintenance procedure</text>
                  </g>

                  {/* Log & Purge */}
                  <g>
                    <rect x="650" y="30" width="180" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="740" y="55" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">4. Table Purge &amp; Log</text>
                    <rect x="660" y="70" width="160" height="40" rx="4" fill="#0f172a" />
                    <text x="740" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Audit Run Log Updated</text>
                    <text x="740" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Zero external cron dependency</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 200 80 L 230 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 80 L 440 80" stroke="#10b981" strokeWidth="2" />
                  <path d="M 630 80 L 650 80" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Schedule Cadences */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400 font-mono">Diagram B:</span> Event Cadences (AT vs EVERY) with ON COMPLETION PRESERVE
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* One-Time */}
                  <g>
                    <rect x="30" y="30" width="370" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="215" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">ONE-TIME EVENT (ON SCHEDULE AT ...)</text>
                    <rect x="45" y="70" width="340" height="40" rx="4" fill="#0f172a" />
                    <text x="215" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Executes once at timestamp → PRESERVED in data dictionary</text>
                    <text x="215" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Ideal for semester rollover &amp; fiscal year closings</text>
                  </g>

                  {/* Recurring */}
                  <g>
                    <rect x="440" y="30" width="380" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">RECURRING EVENT (ON SCHEDULE EVERY ...)</text>
                    <rect x="455" y="70" width="350" height="40" rx="4" fill="#022c22" />
                    <text x="630" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Fires repeatedly (EVERY 1 DAY / 1 HOUR)</text>
                    <text x="630" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Automated token purges &amp; ledger reconciliations</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Event Scheduler Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test nightly token purges, hourly cart expiry cleaners, one-time semester graduation jobs, and event lifecycle controls live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(schedulerScenarios).map(([key, item]) => {
              const isActive = selectedSchedulerScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSchedulerScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Event" : "○ Run Scheduler Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{schedulerScenarios[selectedSchedulerScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{schedulerScenarios[selectedSchedulerScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Event Scheduler Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Scheduled Event Script</span>
                <span className="text-emerald-400">Database Cron Definition</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {schedulerScenarios[selectedSchedulerScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Event ID / Action</th>
                    <th className="py-3 px-4 text-white">Schedule Cadence</th>
                    <th className="py-3 px-4 text-emerald-400">Event Type</th>
                    <th className="py-3 px-4 text-cyan-400">Preserve Flag</th>
                    <th className="py-3 px-4 text-indigo-400">Operational Action</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {schedulerScenarios[selectedSchedulerScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.cadence}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.eventType}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{row.preserve}</td>
                      <td className="py-3 px-4 text-indigo-300 font-sans">{row.actionTaken}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world ledger reconciliation and replica node safety in Barrackpore.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Nightly Student Ledger Reconciliation Job at Barrackpore Academy
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy Cloud Cluster</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated financial reconciliation: A recurring MySQL event runs every night at 2:00 AM (<code className="text-emerald-300 font-mono">EVERY 1 DAY</code>), executing <code className="text-cyan-300 font-mono">CALL sp_reconcile_student_ledgers()</code>. It recalculates total fee payments against student invoice balances, automatically detecting accounting anomalies without requiring any external cron scripts!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Automated Nightly Financial Reconciliation Event:
CREATE EVENT evt_nightly_ledger_reconciliation
ON SCHEDULE EVERY 1 DAY STARTS '2026-09-01 02:00:00'
ON COMPLETION PRESERVE
ENABLE
DO
    CALL sp_reconcile_student_ledgers();`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid server reboot deactivation and omitted preservation clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Forgetting `event_scheduler=ON` in my.cnf
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting `SET GLOBAL event_scheduler = ON;` only activates the scheduler for the current session; if omitted from `my.cnf`, scheduled jobs stop after server reboot!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Add <code className="text-emerald-400 font-mono">event_scheduler=ON</code> under <code className="text-emerald-400 font-mono">[mysqld]</code> in `my.cnf`!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Specify `ON COMPLETION PRESERVE`
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using <code className="text-emerald-400 font-mono">ON COMPLETION PRESERVE</code> prevents MySQL from automatically deleting your event definition when one-time or bounded schedules finish.
              </p>
              <div className="text-xs text-slate-400">
                Maintains complete audit history in data dictionary.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for the MySQL Event Scheduler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Event Scheduler Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Enable <code className="text-cyan-300 font-mono">event_scheduler = ON</code> in server configuration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Use <code className="text-cyan-300 font-mono">EVERY interval</code> for recurring maintenance tasks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Always specify <code className="text-cyan-300 font-mono">ON COMPLETION PRESERVE</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Wrap complex job logic inside Stored Procedures (<code className="text-cyan-300 font-mono">DO CALL sp_job()</code>).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe replication safety...”</span>
                  MySQL automatically sets replicated events to `DISABLE ON SLAVE` on replica nodes to prevent duplicate cron executions across the database cluster!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about procedure encapsulation...”</span>
                  Never write raw, complex multi-line SQL queries directly in `CREATE EVENT`. Wrap the logic in a Stored Procedure and call it from the event for clean version control!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering the MySQL Event Scheduler, one-time events (AT), recurring schedules (EVERY), lifecycle management (ENABLE, DISABLE, PRESERVE), and automated maintenance routines.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Event Scheduler FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="MySQL Event Scheduler: Creating Scheduled Database Jobs and Automated Maintenance"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic15_note.txt"
          />

          <Teacher
            note="The MySQL Event Scheduler gives you an internal, high-speed database cron engine without the network latency or authentication headaches of external crontabs. Always enable event_scheduler in my.cnf, wrap your job logic in Stored Procedures (DO CALL sp_job()), include ON COMPLETION PRESERVE, and schedule heavy maintenance tasks during off-peak night hours to avoid table lock contention!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic15;
