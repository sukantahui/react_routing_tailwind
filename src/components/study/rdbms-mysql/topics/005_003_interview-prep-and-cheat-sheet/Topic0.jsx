import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Top 25 Core RDBMS & Theoretical Interview Questions (ACID, Codd's Rules, Normalization, Keys)
 * Module: 005_003_interview-prep-and-cheat-sheet
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Top 25 Core RDBMS & Theoretical Interview Questions (ACID, Codd's Rules, Normalization, Keys).
 */
const Topic0 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. ACID Properties",
      title: "1. The ACID Properties Deep Dive & Real-World Mechanics",
      badge: "ACID Rigor",
      badgeColor: "emerald",
      sqlSnippet: `-- 🧪 ACID GUARANTEES IN MYSQL INNODB:
-- Atomicity:   All-or-nothing execution guaranteed via Undo Logs & Rollback segments.
-- Consistency: Schema constraints (FK, CHECK, NOT NULL) preserved before and after commit.
-- Isolation:   Concurrent transactions cannot see intermediate uncommitted states (MVCC).
-- Durability:  Committed changes survive crashes via Write-Ahead Redo Logging (WAL) & fsync.`,
      explanation: "ACID guarantees form the bedrock of relational transactions, ensuring financial data accuracy across concurrent client operations.",
      keyTakeaways: ["Explain how Undo logs implement Atomicity and MVCC Isolation.","Explain how Redo logs implement Durability through Write-Ahead Logging (WAL).","Differentiate between physical consistency and business state consistency."]
    },
    concept2: {
      conceptName: "2. Codd's 12 Rules",
      title: "2. E. F. Codd's 12 Rules for True Relational Systems",
      badge: "Codd's Rules",
      badgeColor: "cyan",
      sqlSnippet: `-- 📜 KEY CODD'S RULES TESTED IN INTERVIEWS:
-- Rule 1: The Information Rule (All data is represented strictly in tables as row/column values).
-- Rule 2: Guaranteed Access Rule (Every value is reachable via TableName + PK + ColumnName).
-- Rule 3: Systematic Treatment of NULL (NULL represents missing/inapplicable data, not zero or space).
-- Rule 4: Dynamic Online Catalog (Database metadata stored in relational tables - information_schema).
-- Rule 9: Logical Data Independence (Changes to logical schema do not break client applications).`,
      explanation: "Dr. Edgar F. Codd established 12 foundational mathematical rules defining the standard for relational database management systems (RDBMS).",
      keyTakeaways: ["Rule 0 states the system must qualify purely as relational to manage data.","NULL is treated systematically and requires special operators (IS NULL / IS NOT NULL).","Understanding Codd's rules demonstrates deep relational theoretical mastery."]
    },
    concept3: {
      conceptName: "3. Relational Keys",
      title: "3. Relational Key Taxonomy: Super, Candidate, Primary, Alternate & Foreign",
      badge: "Key Taxonomy",
      badgeColor: "purple",
      sqlSnippet: `-- 🔑 TAXONOMY OF RELATIONAL KEYS:
-- Superkey:      Any set of attributes that uniquely identifies a row.
-- Candidate Key: A minimal superkey (no redundant attributes).
-- Primary Key:   The candidate key chosen by the architect as the primary row identifier.
-- Alternate Key: Candidate keys not chosen as the Primary Key (enforced with UNIQUE NOT NULL).
-- Composite Key: A Primary or Candidate Key composed of 2 or more columns.
-- Foreign Key:   An attribute in a child table matching a Candidate Key in a parent table.`,
      explanation: "Clear definitions and mathematical differentiation of keys is a staple interview question for senior software and database engineers.",
      keyTakeaways: ["Every Candidate Key is a Superkey, but not every Superkey is a Candidate Key.","Alternate keys must be enforced using UNIQUE NOT NULL constraints.","Foreign keys establish referential integrity between child and parent candidate keys."]
    },
    concept4: {
      conceptName: "4. Normalization Proofs",
      title: "4. Systematic Normalization: 1NF, 2NF, 3NF & BCNF Derivations",
      badge: "Normalization",
      badgeColor: "rose",
      sqlSnippet: `-- 🎯 NORMALIZATION STAGES SUMMARY:
-- 1NF: Atomic values only; no repeating arrays or comma-delimited CSV columns.
-- 2NF: In 1NF + No Partial Functional Dependencies (All non-key attributes fully depend on whole PK).
-- 3NF: In 2NF + No Transitive Dependencies (Non-Key attribute cannot determine another Non-Key attribute).
-- BCNF: In 3NF + In every non-trivial FD X → Y, X MUST be a Superkey!`,
      explanation: "Mastering step-by-step schema decomposition and attribute closure calculations guarantees high scores in technical interview rounds.",
      keyTakeaways: ["Memorize the definition of Partial, Transitive, and Multi-valued dependencies.","Show how 2NF applies only to composite primary keys.","Explain why BCNF is strictly stronger than 3NF when overlapping candidate keys exist."]
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
            Topic 0 of 10
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Top 25 Core RDBMS & Theoretical Interview Questions (ACID, Codd's Rules, Normalization, Keys)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Acing theoretical database interviews: mastering ACID transactions, Codd's 12 relational rules, functional dependency math, candidate key derivations, and 1NF-BCNF normalization.
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
              <h3 className="font-bold text-white text-base">ACID Internals</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Undo log atomicity, redo log durability, and MVCC transaction isolation.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Codd's Rules</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Relational completeness, guaranteed access, and information rule theory.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Key Hierarchy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Superkeys, minimal candidate keys, alternate keys, and composite keys.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">3NF & BCNF</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Mathematical decomposition proofs eliminating anomalies and redundancy.</p>
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
                  Case 1: Mamata & Susmita – Answering ACID & MVCC at Kolkata Tech Round
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Tech Interview
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During a senior backend interview in Kolkata, Mamata was asked how MySQL InnoDB achieves Durability and Atomicity simultaneously. She explained Write-Ahead Logging (WAL) via the Redo Log buffer and uncommitted rollback via the Undo Log tablespace, securing the lead architect position.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Abhronila – Deriving BCNF Closures at Barrackpore Viva
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Academic Defense
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, Debangshu derived the attribute closure of a complex clinic schema during an academic viva. By identifying an overlapping candidate key violation in 3NF, he decomposed the schema to BCNF, earning a perfect score from the evaluation panel.
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
                <span>⚠️</span> Pitfall 1: Confusing Superkey and Candidate Key
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Stating that a superkey is minimal is incorrect; a candidate key is a minimal superkey with no redundant columns.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Superkey = Any unique identifier; Candidate Key = Minimal unique identifier.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Saying 2NF Applies to All Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                A table with a single-column Primary Key is automatically in 2NF because partial dependencies are mathematically impossible.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: 2NF violations can only occur in tables with composite Primary Keys.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Structure Interview Answers Methodically
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Answer with: 1. Formal Definition → 2. Underlying Mechanism → 3. Real-World SQL Example → 4. Trade-offs.
              </p>
              <div className="text-xs text-slate-400">
                Demonstrates clear structured engineering communication.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Draw Schema Diagrams on Whiteboards
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Illustrate functional dependencies (X → Y) visually during technical interviews.
              </p>
              <div className="text-xs text-slate-400">
                Makes theoretical normalization proofs intuitive and convincing.
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
            title="Topic 0: Top 25 Core RDBMS & Theoretical Interview Questions (ACID, Codd's Rules, Normalization, Keys)"
            content={noteText}
          />

          <Teacher
            note="Theoretical interview questions separate true relational database architects from developers who just write basic queries! Practice explaining ACID in terms of Redo and Undo logs, know Codd's rules, and be ready to derive candidate keys using attribute closures on the whiteboard with complete confidence!"
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
            title="Top 25 Core RDBMS & Theoretical Interview Questions (ACID, Codd's Rules, Normalization, Keys) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
