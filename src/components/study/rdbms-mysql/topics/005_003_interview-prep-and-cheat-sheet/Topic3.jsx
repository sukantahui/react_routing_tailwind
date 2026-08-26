import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Top 15 Indexing & Performance Tuning Interview Questions (B-Tree, Leftmost Prefix, EXPLAIN Analysis, Covering Index)
 * Module: 005_003_interview-prep-and-cheat-sheet
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Top 15 Indexing & Performance Tuning Interview Questions (B-Tree, Leftmost Prefix, EXPLAIN Analysis, Covering Index).
 */
const Topic3 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Core Framework",
      title: "1. Core Concepts & Problem Patterns in Top 15 Indexing & Performance Tuning Interview Questions (B-Tree, Leftmost Prefix, EXPLAIN Analysis, Covering Index)",
      badge: "Interview Framework",
      badgeColor: "emerald",
      sqlSnippet: `-- 🎯 ESSENTIAL INTERVIEW PATTERN FOR TOPIC 3:
-- High-frequency problem patterns, mathematical proofs, and query templates:
-- Example: Nth Highest Salary via DENSE_RANK()
WITH RankedSalaries AS (
  SELECT employee_id, full_name, salary,
         DENSE_RANK() OVER (ORDER BY salary DESC) AS rank_pos
  FROM employees
)
SELECT salary FROM RankedSalaries WHERE rank_pos = 3 LIMIT 1;`,
      explanation: "Comprehensive breakdown of the theoretical frameworks, query templates, and architectural patterns tested in Top 15 Indexing & Performance Tuning Interview Questions (B-Tree, Leftmost Prefix, EXPLAIN Analysis, Covering Index).",
      keyTakeaways: ["Understand the core algorithmic pattern before writing SQL code.","Account for edge cases like NULL values, duplicates, and empty datasets.","State the time complexity (O(N) vs O(log N)) and index utilization of your solution."]
    },
    concept2: {
      conceptName: "2. Live SQL Solution",
      title: "2. Production Solution & Step-by-Step Code Walkthrough",
      badge: "Live SQL",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ ADVANCED INTERVIEW QUERY PATTERN:
-- Finding Top 2 Highest Paid Employees Per Department:
WITH DeptSalaries AS (
  SELECT department_id, full_name, salary,
         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rnk
  FROM employees
)
SELECT department_id, full_name, salary 
FROM DeptSalaries 
WHERE rnk <= 2;`,
      explanation: "Provides optimal, industry-standard SQL query solutions utilizing modern MySQL 8.0 Window Functions and Common Table Expressions.",
      keyTakeaways: ["Use DENSE_RANK over RANK to prevent skipped ranking numbers on ties.","Isolate partitioned window calculations inside Common Table Expressions.","Explain the EXPLAIN plan to the interviewer to prove query efficiency."]
    },
    concept3: {
      conceptName: "3. Edge Cases & Gotchas",
      title: "3. Tricky Edge Cases & Interview Traps",
      badge: "Edge Cases",
      badgeColor: "purple",
      sqlSnippet: `-- ⚠️ THE 'NOT IN (NULL)' INTERVIEW TRAP:
-- Query:
SELECT * FROM customers WHERE customer_id NOT IN (1, 2, NULL);
-- 💥 RESULT: Empty Set (0 rows)!
-- Why? In SQL three-valued logic, (val != NULL) evaluates to UNKNOWN!
-- ANDing with UNKNOWN yields UNKNOWN, so WHERE clause fails for ALL rows!
-- ✅ FIX: Use NOT EXISTS or filter out NULLs:
SELECT * FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);`,
      explanation: "Exposes subtle SQL three-valued logic traps (TRUE, FALSE, UNKNOWN), NULL comparison pitfalls, and implicit type conversion bugs.",
      keyTakeaways: ["Never use NOT IN with subqueries that might return NULL values.","Use NOT EXISTS or LEFT JOIN ... WHERE col IS NULL instead.","Explain SQL three-valued logic to impress senior interviewers."]
    },
    concept4: {
      conceptName: "4. System Architecture",
      title: "4. Architectural Defense & Whiteboard Strategy",
      badge: "Whiteboard Defense",
      badgeColor: "rose",
      sqlSnippet: `-- 🏗️ SYSTEM DESIGN & INTERVIEW WHITEBOARD MATRIX:
-- 1. Requirements Clarification: Read/Write ratio, TPS, Latency SLA.
-- 2. Entity-Relationship Schema: Core entities, Primary Keys, Foreign Keys.
-- 3. Indexing Strategy: B-Tree covering indexes for 95% read paths.
-- 4. Scaling & Partitioning: Read Replicas, Redis Caching, Horizontal Sharding.`,
      explanation: "Equips candidates to lead senior database system design discussions on scalability, caching, sharding, and high availability.",
      keyTakeaways: ["Start system design interviews with requirements gathering and scale estimation.","Proactively discuss caching (Redis) and read/write splitting.","Defend data consistency trade-offs (ACID vs Eventual Consistency)."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 005.3: Interview Mastery
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 3 of 10
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Top 15 Indexing & Performance Tuning Interview Questions (B-Tree, Leftmost Prefix, EXPLAIN Analysis, Covering Index)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Acing database performance interviews: B+ Tree physical fan-out, clustered vs secondary lookups, index merge optimization, and EXPLAIN cost interpretation.
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
              Core foundations of technical interview mastery, query patterns, and system design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Problem Patterns</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Mastering universal SQL algorithmic templates (Rank, Lag, CTE, Rollup).</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Edge Case Safety</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Mastering NULL three-valued logic, empty resultsets, and duplicate ties.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Internal Mechanics</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Explaining B+ Tree fan-out, Undo/Redo logs, and MVCC locks.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">System Design</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Designing multi-terabyte scalable schemas with sharding and caching.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Concept Workbench ───────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Interview Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore live SQL challenge templates, edge case explanations, and architectural takeaways.
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
                  Interview Topic Pattern
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

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Solution &amp; Live Pattern Snippet:
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
              3. Real-World Interview Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Practical interview success case studies in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata & Susmita – Live SQL Coding Success in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Live Coding
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, Mamata was presented with a tricky 'consecutive active days' streak challenge during a technical screen. Applying LAG() window functions and date arithmetic, she solved the problem in 8 minutes with an optimal O(N) single-pass query, earning immediate advancement to the final round.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Abhronila – Whiteboard System Design in Kolkata
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  System Design
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Debangshu designed the relational database schema for an enterprise ride-sharing platform. By introducing geospatial B-Tree/R-Tree indexes for vehicle coordinates and partitioning trip histories by month, his architecture satisfied a 50,000 TPS workload during the interview defense.
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
              Essential interview guardrails, common traps to avoid, and communication standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Jumping Straight to Code Without Clarifying
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing SQL queries before clarifying duplicate rules, NULL handling, and tie-breaking requirements results in flawed logic.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always ask clarifying questions before writing a single line of SQL.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using Correlated Subqueries When Window Functions Exist
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing slow O(N^2) correlated subqueries for ranking problems signals outdated SQL knowledge to the interviewer.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use modern MySQL 8.0 Window Functions (DENSE_RANK, ROW_NUMBER) for optimal O(N) performance.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: State Time & Space Complexity
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Conclude your query solution by explaining its computational complexity and index usage.
              </p>
              <div className="text-xs text-slate-400">
                Demonstrates holistic computer science and database performance thinking.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Keep Cheat Sheets Handy for Revision
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Review the quick-reference syntax cheat sheet before entering live coding interviews.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates syntax hesitation during timed live coding assessments.
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
            title="Topic 3: Top 15 Indexing & Performance Tuning Interview Questions (B-Tree, Leftmost Prefix, EXPLAIN Analysis, Covering Index)"
            content={noteText}
          />

          <Teacher
            note="Interview mastery is about precision, confidence, and structured problem solving! In SQL interviews, always clarify requirements, explain your thought process out loud, leverage modern Window Functions and CTEs, and highlight edge cases like NULL handling and duplicate ties. You have mastered the entire RDBMS and MySQL stack—walk into every interview knowing you are among the top 1% of database engineers!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical interview questions, gotchas, and live coding challenges for this topic.
            </p>
          </div>

          <FAQTemplate
            title="Top 15 Indexing & Performance Tuning Interview Questions (B-Tree, Leftmost Prefix, EXPLAIN Analysis, Covering Index) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
