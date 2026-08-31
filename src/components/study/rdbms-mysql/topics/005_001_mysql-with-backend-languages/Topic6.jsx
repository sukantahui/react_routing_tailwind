import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Java Integration: JDBC Architecture, DriverManager, DataSource, and HikariCP Connection Pool
 * Module: 005_001_mysql-with-backend-languages
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Java Integration: JDBC Architecture, DriverManager, DataSource, and HikariCP Connection Pool.
 */
const Topic6 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Core Architecture",
      title: "1. Architectural Foundations of Java Integration",
      badge: "Architecture",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔌 PRODUCTION IMPLEMENTATION PATTERN FOR TOPIC 6:
-- Key concepts: Robust connection management, type-safe queries, and ACID compliance.
-- Example Database Schema Setup:
CREATE TABLE backend_audit_6 (
  audit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  client_lang VARCHAR(50) NOT NULL,
  query_hash VARCHAR(64) NOT NULL,
  execution_ms DECIMAL(8,3) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      explanation: "Comprehensive architectural framework for Java Integration: JDBC Architecture, DriverManager, DataSource, and HikariCP Connection Pool, integrating client-side language abstractions with MySQL 8.0 kernel features.",
      keyTakeaways: ["Leverage parameterized statements to eliminate SQL injection and maximize plan caching.","Use connection pools to prevent thread exhaustion under high concurrent web traffic.","Enforce explicit transaction boundaries (COMMIT/ROLLBACK) for multi-step mutations."]
    },
    concept2: {
      conceptName: "2. Code Implementation",
      title: "2. Enterprise Code Snippet & Best Practices",
      badge: "Production Code",
      badgeColor: "cyan",
      sqlSnippet: `// 🚀 HIGH-PERFORMANCE BACKEND CODE PATTERN:
// Demonstrating connection pooling, parameterized queries, and error handling:
async function executeSecureTransaction(pool, userId, amount) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [user] = await conn.execute(
      "SELECT balance FROM accounts WHERE user_id = ? FOR UPDATE", 
      [userId]
    );
    if (!user.length || user[0].balance &lt; amount) {
      throw new Error("INSUFFICIENT_FUNDS");
    }
    await conn.execute(
      "UPDATE accounts SET balance = balance - ? WHERE user_id = ?", 
      [amount, userId]
    );
    await conn.commit();
    return { success: true };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}`,
      explanation: "Demonstrates safe transaction execution with pessimistic locking, error rollback handling, and guaranteed pool release.",
      keyTakeaways: ["Execute transactions with explicit BEGIN, COMMIT, and ROLLBACK blocks.","Pass parameters in separate array/tuple arguments to guarantee parameterization.","Always release pooled connections inside finally blocks."]
    },
    concept3: {
      conceptName: "3. Optimization & N+1",
      title: "3. Eliminating Bottlenecks & Common Pitfalls",
      badge: "Optimization",
      badgeColor: "purple",
      sqlSnippet: `-- ⚡ AVOIDING THE N+1 QUERY ANTI-PATTERN:
-- ❌ Inefficient N+1 Queries:
-- 1 Query: SELECT * FROM orders LIMIT 50;
-- 50 Queries: SELECT * FROM users WHERE user_id = ?; (1 per order!)

-- ✅ Optimized Single JOIN Query:
SELECT o.order_id, o.total_amount, u.full_name, u.email
FROM orders o
JOIN users u ON o.user_id = u.user_id
LIMIT 50;`,
      explanation: "Addresses common integration anti-patterns like N+1 queries, unindexed foreign keys, and memory bloat.",
      keyTakeaways: ["Use eager loading or explicit SQL joins to resolve N+1 query patterns.","Profile queries using slow query logs and Performance Schema.","Keep ORM entities lightweight; avoid fetching full objects for read-only projection reports."]
    },
    concept4: {
      conceptName: "4. Production Telemetry",
      title: "4. Monitoring & Telemetry Integration",
      badge: "Observability",
      badgeColor: "rose",
      sqlSnippet: `-- 📊 TELEMETRY & HEALTH VERIFICATION:
-- Check active backend connections:
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Threads_running';

-- Inspect running backend queries:
SELECT id, user, host, db, command, time, state, info 
FROM information_schema.processlist 
WHERE command != 'Sleep' 
ORDER BY time DESC;`,
      explanation: "Integrates backend application metrics with MySQL server health status, thread counts, and query profiling.",
      keyTakeaways: ["Expose connection pool utilization metrics via Prometheus / OpenTelemetry.","Log slow queries exceeding 200ms with application trace IDs.","Monitor Threads_running to detect database saturation early."]
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
            Topic 6 of 12
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Java Integration: JDBC Architecture, DriverManager, DataSource, and HikariCP Connection Pool
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Enterprise Java database connectivity: Type 4 JDBC drivers, PreparedStatement lifecycle, DataSource configurations, and HikariCP tuning.
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
              <h3 className="font-bold text-white text-base">Native Drivers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">High-throughput binary protocol drivers tailored to language ecosystems.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Security</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Universal parameterization preventing all forms of SQL injection.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">ACID Control</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Strict transactional integrity with automatic error rollback handlers.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Observability</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Connection pool metrics, slow query traces, and telemetry dashboards.</p>
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
                >
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
                  Case 1: Mamata & Susmita – Backend Optimization in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Barrackpore Scale
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, Mamata and Susmita optimized their backend service handling ₹1.8 Crores in retail orders. By applying the principles of Java Integration: JDBC Architecture, DriverManager, DataSource, and HikariCP Connection Pool, they resolved connection leaks, eliminated N+1 query loops, and achieved sub-4ms response times under heavy concurrent user traffic.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Abhronila – High-Throughput Fintech in Kolkata
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Kolkata Fintech
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Debangshu and Abhronila implemented Java Integration: JDBC Architecture, DriverManager, DataSource, and HikariCP Connection Pool within their banking core. Using connection pooling, prepared statements, and transactional error retries, their system processed ₹50 Crores in daily volume without a single dead connection or transaction lock freeze.
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
                <span>⚠️</span> Pitfall 1: Unparameterized String Concatenation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Building queries using string interpolation (`WHERE id = ${id}`) leaves backends wide open to devastating SQL injection.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always pass parameters as separate arguments to execute/query methods.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Unbounded ORM Queries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Calling find() or all() without explicit LIMIT pagination loads 500,000 records into Node/Python RAM, crashing the server with OOM errors.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always enforce pagination with LIMIT and OFFSET on all entity queries.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Connection Pooling Globally
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure a shared singleton connection pool and size it according to available database CPU cores.
              </p>
              <div className="text-xs text-slate-400">
                Prevents connection exhaustion and maximizes query throughput.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable Query Logging in Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enable ORM/driver SQL logging in staging environments to inspect the exact generated SQL queries.
              </p>
              <div className="text-xs text-slate-400">
                Exposes hidden N+1 queries and inefficient Cartesian joins before production deployment.
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
            title="Topic 6: Java Integration: JDBC Architecture, DriverManager, DataSource, and HikariCP Connection Pool"
            content={noteText}
          />

          <Teacher
            note="Mastering backend database integration is what transforms a theoretical database designer into a complete full-stack software engineer! Pay close attention to connection pooling, prepared statement parameterization, transaction boundaries, and eliminating N+1 query bottlenecks. Build backends that are fast, resilient, and rock-solid!"
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
            title="Java Integration: JDBC Architecture, DriverManager, DataSource, and HikariCP Connection Pool FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
