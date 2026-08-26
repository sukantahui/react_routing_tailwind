import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Understanding Connection Pooling: Why Creating New Connections per Request is an Anti-Pattern
 * Module: 005_001_mysql-with-backend-languages
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Understanding Connection Pooling: Why Creating New Connections per Request is an Anti-Pattern.
 */
const Topic1 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Pooling Mechanics",
      title: "1. How Connection Pools Work Internally",
      badge: "Pool Architecture",
      badgeColor: "emerald",
      sqlSnippet: `-- 🏊 CONNECTION POOL ARCHITECTURAL FLOW:
-- 1. App Startup: Pool creates min_idle connections (e.g. 10 warm sockets).
-- 2. Request Arrives: Worker thread borrows an idle connection in 0.05ms!
-- 3. Query Executes: SQL runs across the borrowed socket.
-- 4. Connection Release: Socket is returned to pool (NOT closed).
-- 5. Pool Saturation: If all sockets busy, incoming requests queue up until connectionTimeout.`,
      explanation: "A connection pool maintains a cache of active, authenticated database connections ready for instantaneous reuse by concurrent web requests.",
      keyTakeaways: ["Borrowing a pooled connection takes 0.05ms compared to 30ms+ for a new connection.","Limits maximum concurrent connections, protecting MySQL from crash overload.","Automatically tests and heals broken socket connections in the background."]
    },
    concept2: {
      conceptName: "2. Pool Sizing Formula",
      title: "2. Optimal Pool Sizing (HikariCP Empirical Formula)",
      badge: "Pool Sizing",
      badgeColor: "cyan",
      sqlSnippet: `-- 📐 OPTIMAL CONNECTION POOL SIZING FORMULA:
-- pool_size = (cpu_core_count * 2) + effective_spindle_count
--
-- Example 1: 4-Core CPU Server with NVMe SSD:
-- pool_size = (4 * 2) + 1 = 9 to 10 connections!
--
-- 💥 MISTAKE: Setting pool_size = 500 on an 8-Core server causes
-- massive CPU context-switching thrashing and DECREASES overall throughput!`,
      explanation: "Counter-intuitively, smaller connection pools aligned with CPU core counts deliver higher throughput by eliminating thread context-switching contention.",
      keyTakeaways: ["More connections does NOT equal faster performance.","Keep pool size compact: (CPU cores * 2) + 1.","Tune max_connections on MySQL server to support all backend replica pools."]
    },
    concept3: {
      conceptName: "3. Preventing Leaks",
      title: "3. Connection Leaks & Try-Finally / AutoCloseable Patterns",
      badge: "Leak Prevention",
      badgeColor: "purple",
      sqlSnippet: `// ⚠️ JAVASCRIPT CONNECTION LEAK EXAMPLE:
// const conn = await pool.getConnection();
// const [rows] = await conn.query("SELECT * FROM orders");
// throw new Error("Boom"); // 💥 conn.release() NEVER CALLED! Pool drains to 0!

// ✅ SAFE PATTERN WITH TRY-FINALLY:
const conn = await pool.getConnection();
try {
  const [rows] = await conn.query("SELECT * FROM orders");
  return rows;
} finally {
  conn.release(); // 🛡️ Guaranteed return to pool even on exception!
}`,
      explanation: "Failing to release borrowed connections inside finally blocks causes connection pool exhaustion, bringing the entire web application to a halt.",
      keyTakeaways: ["Always release connections in try...finally blocks or use pool.query() shortcuts.","In Java, use try-with-resources (AutoCloseable).","Configure leakDetectionThreshold in HikariCP to log unreturned connections."]
    },
    concept4: {
      conceptName: "4. Cloud Health Checks",
      title: "4. Keep-Alive, Max Lifetime & Health Verification",
      badge: "Health Validation",
      badgeColor: "rose",
      sqlSnippet: `-- ⚙️ PRODUCTION POOL HEALTH PARAMETERS:
-- maxLifetime: 1800000 ms (30 mins - less than cloud firewall timeout)
-- idleTimeout: 600000 ms (10 mins)
-- connectionTimeout: 3000 ms (Fail fast if pool exhausted)
-- testOnBorrow: false (Prefer background keepalive to avoid extra SELECT 1 ping)`,
      explanation: "Proactively retiring connections before cloud firewalls terminate idle sockets prevents 'Connection reset by peer' errors.",
      keyTakeaways: ["Set connection maxLifetime lower than MySQL wait_timeout and cloud NAT timeouts.","Use fail-fast connection timeouts (e.g. 3s) so web users get immediate error responses.","Monitor pool metrics (active, idle, waiting threads) via Prometheus/Grafana."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 005.1: Backend Integration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 1 of 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Understanding Connection Pooling: Why Creating New Connections per Request is an Anti-Pattern
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering connection pool lifecycles, sizing algorithms, thread exhaustion prevention, idle connection reclamation, and HikariCP/mysql2 pooling internals.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Architectural Pillars ───────────────────────── */}
        <section id="pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Four Architectural Pillars
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core foundations of application-to-database communication, performance, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Warm Reuse</h3>
              <p className="text-xs text-slate-300 leading-relaxed">0.05ms socket checkout eliminating per-request TCP/TLS handshake latency.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Core Sizing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Empirical sizing formula (Cores * 2 + 1) preventing CPU context thrashing.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Leak Safety</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Guaranteed socket release via try-finally and try-with-resources blocks.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Cloud Keep-Alive</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Automated maxLifetime recycling avoiding silent NAT firewall disconnects.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Concept Workbench ───────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Engineering Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore production code snippets, connection pool parameters, and optimization patterns.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(conceptsData).map((key) => {
              const concept = conceptsData[key];
              const isSelected = selectedConceptKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedConceptKey(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {concept.conceptName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Backend Pattern
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentConcept.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentConcept.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentConcept.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentConcept.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentConcept.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentConcept.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentConcept.explanation}
            </p>

            {/* Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Production Code / SQL Snippet:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentConcept.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Key Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentConcept.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Practical backend integration case studies in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata & Susmita – Resolving Pool Exhaustion in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Node.js Pool
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During a flash sale in Barrackpore, Mamata's Express app crashed with 'Too many connections'. An unhandled exception in the checkout route leaked connections. Susmita wrapped queries in try-finally and set pool.query() helpers, stabilizing the system at 1,200 requests/second with only 15 pool connections.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Abhronila & Debangshu – HikariCP Tuning in Kolkata Banking Core
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Fintech HikariCP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Debangshu tuned a Spring Boot banking microservice. Initially configured with 100 connections per instance, the database CPU was pinned at 98%. Reducing HikariCP pool size to 10 connections per node eliminated CPU context switching, cutting p99 latency from 450ms to 8ms.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Essential backend guardrails, anti-patterns to avoid, and enterprise coding standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Creating Pools Inside Request Functions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Instantiating mysql.createPool() inside an HTTP route creates a new pool on every request, multiplying memory leaks.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Create a single singleton pool instance and export it across the application.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Setting Pool Size to 1000
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting overly large connection pools overwhelms MySQL's thread scheduler and exhausts server memory.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep connection pools lean and scale backend compute instead.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Promise Pools in Node.js
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use mysql2/promise to leverage async/await cleanly with pooled connections.
              </p>
              <div className="text-xs text-slate-400">
                Ensures modern non-blocking asynchronous programming without callback hell.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable Leak Detection in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure pool leak detection thresholds (e.g. 5,000ms) to alert on long-held unreleased connections.
              </p>
              <div className="text-xs text-slate-400">
                Pinpoints exact code line leaking connections before outages occur.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 1: Understanding Connection Pooling: Why Creating New Connections per Request is an Anti-Pattern"
            content={noteText}
          />

          <Teacher
            note="Connection pooling is the single most critical performance component between your application and MySQL! Creating a new connection for each request is an absolute amateur anti-pattern. Follow the HikariCP rule: keep your pools lean ((Cores * 2) + 1), always release connections in finally blocks, and never leak a socket!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances, driver parameters, and interview questions for this topic.
            </p>
          </div>

          <FAQTemplate
            title="Understanding Connection Pooling: Why Creating New Connections per Request is an Anti-Pattern FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
