import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Capstone Project Guidelines, Scope, and Industry-Standard Requirements
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Capstone Project Guidelines, Scope, and Industry-Standard Requirements.
 */
const Topic0 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Engineering Standards",
      title: "1. Enterprise Production Engineering Standards",
      badge: "Production Rigor",
      badgeColor: "emerald",
      sqlSnippet: `-- 🏢 ENTERPRISE DATABASE STANDARDS IN MYSQL 8.0:
-- 1. Explicit strict schema definitions (NO generic VARCHAR(255) for all fields).
-- 2. UTF8MB4 charset with utf8mb4_0900_ai_ci collation across all tables.
-- 3. Explicit Foreign Key constraints with well-planned referential actions (CASCADE/RESTRICT).
-- 4. Mandatory audit timestamps (created_at, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP).
-- 5. Strict index strategy (every FK indexed, composite indexes aligned with leftmost prefix).`,
      explanation: "Production capstone databases must follow industry-grade conventions including strict data types, UTF8MB4 charset, audit triggers, and explicit naming conventions.",
      keyTakeaways: ["Follow consistent snake_case naming for all tables, columns, indexes, and constraints.","Every table must have an explicit Primary Key with indexed foreign dependencies.","All monetary and ledger values must use DECIMAL(15,2) or DECIMAL(18,4), never FLOAT."]
    },
    concept2: {
      conceptName: "2. Eight Milestones",
      title: "2. Eight-Phase Structured Project Milestones",
      badge: "Milestone Roadmap",
      badgeColor: "cyan",
      sqlSnippet: `-- 📋 8-PHASE CAPSTONE LIFECYCLE:
-- Phase 1: Requirements Gathering & Crow's Foot EER Diagram (15+ Entities)
-- Phase 2: Formal Normalization to 3NF/BCNF & Relational Schema Mapping
-- Phase 3: Production DDL Scripts with Constraints & Foreign Keys
-- Phase 4: Mock Data Generation (100,000+ Realistic Seed Records)
-- Phase 5: 15 Analytical Queries (Window Functions, CTEs, ROLLUP)
-- Phase 6: Procedural Automation (3 Stored Procedures, 3 Triggers, 1 Event)
-- Phase 7: EXPLAIN Profiling, Covering Indexes & Query Optimization
-- Phase 8: RBAC Security Matrix, mysqldump & Point-in-Time Recovery Runbook`,
      explanation: "The capstone project progresses systematically through eight structured phases mirroring enterprise software development lifecycles.",
      keyTakeaways: ["Progress from conceptual modeling to physical DDL and data generation.","Implement analytical reports and automated server-side procedures.","Benchmark query latency and enforce database security."]
    },
    concept3: {
      conceptName: "3. Evaluation Rubric",
      title: "3. Evaluation Rubric & Schema Defense Criteria",
      badge: "Grading Rubric",
      badgeColor: "purple",
      sqlSnippet: `-- 📊 CAPSTONE EVALUATION WEIGHTAGE:
-- Schema Architecture & Normalization (3NF/BCNF):  25%
-- Complex Analytical SQL & Query Optimization:     20%
-- Stored Procedures, Triggers & Automation:        20%
-- Security, Roles, Backup & Disaster Recovery:     15%
-- Documentation, ER Diagrams & Viva Defense:       20%
-- Total Score:                                     100%`,
      explanation: "Projects are graded on relational architectural rigor, SQL query efficiency, server-side procedural logic, and viva defense.",
      keyTakeaways: ["Demonstrate 3NF normalization proofs with attribute closures.","Provide before-and-after EXPLAIN cost improvements for optimized queries.","Defend relational constraints and security policies during viva voce."]
    },
    concept4: {
      conceptName: "4. Disqualifying Flaws",
      title: "4. Disqualifying Flaws & Production Anti-Patterns",
      badge: "Strict Warning",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ DISQUALIFYING ANTI-PATTERNS:
-- 1. Unnormalized repeating groups or multi-valued CSV columns (1NF violation).
-- 2. Storing plain-text passwords without SHA-256/bcrypt hashing.
-- 3. Storing currency as FLOAT or DOUBLE causing floating-point rounding errors.
-- 4. Missing foreign key indexes causing full table lock scans during joins.
-- 5. Using SELECT * in production reporting procedures without explicit columns.`,
      explanation: "Common pitfalls such as CSV columns, lack of indexes, and unconstrained nullability disqualify enterprise database submissions.",
      keyTakeaways: ["Never store multiple values in a single delimited string column.","Always define explicit precision on currency and percentage columns.","Ensure every foreign key column is supported by an index."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.8: Capstone
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 0 of 11
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Capstone Project Guidelines, Scope, and Industry-Standard Requirements
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Understanding production database engineering standards, milestone deliverables, schema integrity requirements, and performance expectations for the enterprise capstone.
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
              Core design foundations and production engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Rigor & Integrity</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Strict domain, entity, and referential integrity constraints enforced at database layer.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">100k+ Volume</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Realistic seed data testing index performance under high query load.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Automation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Server-side stored procedures, audit triggers, and scheduled recurring events.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Production Security</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Granular RBAC roles, SSL/TLS, and automated disaster recovery runbooks.</p>
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
              Explore live SQL implementation scripts, schema patterns, and architectural takeaways.
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
                  Phase Implementation
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
                SQL Runbook &amp; Production Snippet:
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
              Practical production database case studies in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata & Susmita – Multi-Vendor Retail Portal in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Retail Capstone
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mamata and Susmita built a multi-vendor retail database handling ₹1.5 Crores in monthly transactions across Barrackpore and Ichapur. By enforcing 3NF normalization, foreign key cascade actions, and indexing composite order dates, their schema achieved sub-3ms checkout latencies under 150,000 order records.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Abhronila & Debangshu – Core Banking & Ledger in Kolkata
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Fintech Capstone
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Abhronila and Debangshu architected a double-entry banking ledger tracking ₹50 Crores in deposits across 12 bank branches. They implemented pessimistic row locking (SELECT ... FOR UPDATE), automated audit logging triggers, and point-in-time recovery runbooks preventing financial discrepancies.
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
              Essential guardrails, common anti-patterns, and enterprise coding standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Insufficient Seed Data
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Testing queries against 20 rows hides query execution bottlenecks. Always seed 100,000+ realistic records to validate B-Tree indexes and EXPLAIN plans.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Generate realistic multi-thousand row datasets for accurate performance benchmarking.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing Unhashed Credentials
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Saving application user passwords in plain text violates data security standards and results in project failure.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Store only cryptographically salted and hashed passwords (e.g., CHAR(60)).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Comprehensive Documentation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Maintain a complete repository containing EER diagrams, DDL scripts, seed scripts, query runbooks, and disaster recovery guides.
              </p>
              <div className="text-xs text-slate-400">
                Ensures seamless auditability, team handover, and viva defense.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Version-Controlled Migrations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Number and sequence all DDL schema scripts (e.g. V1__init_schema.sql, V2__indexes.sql) for reproducible database deployments.
              </p>
              <div className="text-xs text-slate-400">
                Prevents environment drift between development and production.
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
            title="Topic 0: Capstone Project Guidelines, Scope, and Industry-Standard Requirements"
            content={noteText}
          />

          <Teacher
            note="Welcome to the Capstone Project! This is where all your hard work across relational theory, SQL querying, procedural routines, and performance tuning comes together. Approach your capstone like an enterprise Principal Database Architect. Choose a domain that excites you, normalize your schema to 3NF, write clean DDL with robust foreign keys, seed 100,000+ records, and optimize your queries with EXPLAIN. Make your project something you will proudly showcase in technical interviews!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances and viva voce examination questions for this milestone.
            </p>
          </div>

          <FAQTemplate
            title="Capstone Project Guidelines, Scope, and Industry-Standard Requirements FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
