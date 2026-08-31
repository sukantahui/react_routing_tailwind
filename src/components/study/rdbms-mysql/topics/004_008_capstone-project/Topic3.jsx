import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Phase 2: Formal Normalization to 3NF / BCNF & Schema Architecture Mapping
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Phase 2: Formal Normalization to 3NF / BCNF & Schema Architecture Mapping.
 */
const Topic3 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Functional Dependencies",
      title: "1. Functional Dependencies & Candidate Key Discovery",
      badge: "Relational Theory",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔬 FUNCTIONAL DEPENDENCY ANALYSIS:
-- Relation: StudentCourse (student_id, course_id, student_name, instructor, room)
-- Dependencies:
-- FD1: student_id → student_name
-- FD2: course_id → instructor, room
-- FD3: {student_id, course_id} → Grade
-- Candidate Key: {student_id, course_id}
-- Violations: FD1 and FD2 are Partial Dependencies! (Violates 2NF)`,
      explanation: "Functional dependency analysis determines mathematical determinants and identifies partial or transitive anomalies.",
      keyTakeaways: ["Calculate attribute closures (X+) to prove that a candidate key uniquely determines all attributes.","Identify all non-trivial functional dependencies before initiating decomposition.","Ensure candidate keys are minimal superkeys with zero redundant attributes."]
    },
    concept2: {
      conceptName: "2. 1NF to 3NF",
      title: "2. Systematic 1NF, 2NF, and 3NF Normalization",
      badge: "Normalization",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔄 3NF DECOMPOSITION RESULT:
-- Table 1: Students (student_id PK, student_name) [Eliminated FD1 Partial Dependency]
-- Table 2: Courses (course_id PK, instructor, room) [Eliminated FD2 Partial Dependency]
-- Table 3: Enrollments (student_id, course_id PK, grade) [Full Functional Dependency]
-- Guaranteed: Lossless Join & Dependency Preserving!`,
      explanation: "Systematically decomposes relations to 1NF (atomic values), 2NF (no partial dependencies), and 3NF (no transitive dependencies).",
      keyTakeaways: ["1NF guarantees all column values are atomic scalar primitives.","2NF removes partial key dependencies in composite key tables.","3NF removes transitive dependencies (Non-Key → Non-Key)."]
    },
    concept3: {
      conceptName: "3. BCNF Rigor",
      title: "3. Boyce-Codd Normal Form (BCNF) Analysis",
      badge: "BCNF Strictness",
      badgeColor: "purple",
      sqlSnippet: `-- 🎯 BCNF RULE:
-- In every functional dependency X → Y, X MUST be a Superkey!
-- Example: Clinic (doctor_id, patient_id, appointment_slot)
-- FD1: {doctor_id, appointment_slot} → patient_id
-- FD2: patient_id → doctor_id (Patient can only see one assigned doctor)
-- In FD2, patient_id is NOT a superkey! Violates BCNF!
-- Decomposition: Assign (patient_id PK, doctor_id) and Slots (patient_id, appointment_slot PK)`,
      explanation: "BCNF eliminates anomalies when non-trivial determinants exist that are candidate keys or overlapping candidate keys.",
      keyTakeaways: ["BCNF is strictly stronger than 3NF when multiple overlapping candidate keys exist.","Every determinant in a BCNF table must be a full candidate key.","Decompose systematically while verifying lossless join properties."]
    },
    concept4: {
      conceptName: "4. Intentional Denormalization",
      title: "4. Intentional Controlled Denormalization for High Throughput",
      badge: "Performance Strategy",
      badgeColor: "rose",
      sqlSnippet: `-- ⚡ CONTROLLED DENORMALIZATION IN E-COMMERCE:
-- Storing snapshot unit_price and tax_amount directly in order_items table!
-- Why? Product master price changes over time; historical orders must reflect exact price paid!
CREATE TABLE order_items (
  order_item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  snapshot_price DECIMAL(10,2) NOT NULL, -- Intentional snapshot duplicate!
  quantity INT NOT NULL
);`,
      explanation: "Controlled denormalization preserves immutable historical transaction snapshots and avoids expensive 8-table joins on high-throughput read paths.",
      keyTakeaways: ["Historical price snapshots are mandatory for invoicing and financial audits.","Document every denormalized column and enforce consistency via triggers or backend code.","Benchmark query latency before and after denormalization."]
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
            Topic 3 of 11
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Phase 2: Formal Normalization to 3NF / BCNF & Schema Architecture Mapping
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Applying functional dependency analysis, attribute closures, Armstrong's axioms, and lossless join decomposition to eliminate data anomalies.
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
              <h3 className="font-bold text-white text-base">Closures</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Mathematical attribute closure algorithm proving candidate key uniqueness.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">3NF Standard</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Eliminating partial and transitive dependencies across all project tables.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">BCNF Rigor</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Strict superkey determinant verification for overlapping candidate keys.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Snapshots</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Intentional transaction price snapshots for immutable financial records.</p>
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
                  Case 1: Abhronila & Susmita – BCNF Deconstruction in Kolkata Clinic
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Healthcare 3NF
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Abhronila and Susmita discovered an anomaly where patient room assignments caused transitive dependencies on nurse ward shifts. By decomposing the relation into Patient_Admissions and Ward_Rosters, they reached 3NF, eliminating room change update anomalies.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Mamata & Debangshu – Snapshot Denormalization in Barrackpore Invoicing
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  E-Commerce Snapshot
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mamata and Debangshu initially pulled current product prices dynamically for invoice generation. When vendor catalog prices increased, older customer invoices retroactively displayed wrong totals. They denormalized invoice_items with immutable snapshot_unit_price, preserving audit accuracy.
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
                <span>⚠️</span> Pitfall 1: Premature Denormalization
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Denormalizing tables before reaching 3NF introduces data duplication and integrity bugs without clear performance justifications.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Normalize to 3NF first; denormalize only specific read-heavy attributes with documented justification.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Over-Splitting into 1-Column Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Excessive normalization beyond BCNF into trivial 1-column tables increases join overhead without adding relational value.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Maintain balance between 3NF integrity and query maintainability.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Document Functional Dependencies
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Include a formal table of all functional dependencies and candidate key derivations in your capstone technical report.
              </p>
              <div className="text-xs text-slate-400">
                Proves mathematical rigor during academic and viva evaluation.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Validate Lossless Join Property
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure R1 ∩ R2 forms a candidate key for at least one decomposed sub-relation.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees decomposed tables can be rejoined without phantom rows.
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
            title="Topic 3: Phase 2: Formal Normalization to 3NF / BCNF & Schema Architecture Mapping"
            content={noteText}
          />

          <Teacher
            note="Normalization is not just an academic exercise—it is the foundation of database integrity! In your capstone report, explicitly state the functional dependencies for each entity, show how you eliminated 2NF and 3NF violations, and explain where you intentionally retained snapshot columns like order item unit prices for financial correctness."
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
            title="Phase 2: Formal Normalization to 3NF / BCNF & Schema Architecture Mapping FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
