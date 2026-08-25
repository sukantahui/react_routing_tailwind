import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Phase 1: Business Requirements Gathering & Entity-Relationship Modeling (Crow's Foot EER)
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Phase 1: Business Requirements Gathering & Entity-Relationship Modeling (Crow's Foot EER).
 */
const Topic2 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. EER Modeling",
      title: "1. Crow's Foot EER Architecture & Notation",
      badge: "EER Design",
      badgeColor: "emerald",
      sqlSnippet: `-- 📐 FORMULATING EER RELATIONSHIP CARDINALITIES:
-- Customers (1) ----&lt; Places &gt;---- (0..N) Orders
-- Orders (1) -------< Contains >--- (1..N) Order_Items
-- Products (1) -----< Defines >---- (1..N) Product_Variants
-- Variants (1) -----< Referenced >- (0..N) Order_Items
-- Orders (1) -------< Has >-------- (1..1) Shipments`,
      explanation: "Crow's Foot notation clearly specifies minimum and maximum cardinality (0..1, 1..1, 0..N, 1..N) for all entity associations.",
      keyTakeaways: ["Mandatory one (||) vs Optional one (|o) specifies nullability of foreign keys.","Mandatory many (|{) vs Optional many (o{) defines business dependency rules.","Identifies identifying relationships for weak entities and multi-valued attributes."]
    },
    concept2: {
      conceptName: "2. Identifying Entities",
      title: "2. Identifying Core Entities, Weak Entities & Subtypes",
      badge: "Entity Hierarchy",
      badgeColor: "cyan",
      sqlSnippet: `-- 🧩 SPECIALIZATION / GENERALIZATION HIERARCHY:
-- Supertype: Users (user_id, email, password_hash, user_type)
-- Subtype 1: Customers (user_id, loyalty_points, default_address)
-- Subtype 2: Vendors (user_id, gst_number, commission_rate, bank_account)
-- Subtype 3: Admins (user_id, role_level, department)`,
      explanation: "Specialization hierarchies allow shared attributes in superclasses while maintaining dedicated relational tables for distinct business roles.",
      keyTakeaways: ["Use disjoint ('d') specialization when a user can only belong to one role.","Use overlapping ('o') specialization when an entity can span multiple roles simultaneously.","Map weak entities with composite primary keys composed of parent PK and partial discriminator."]
    },
    concept3: {
      conceptName: "3. Eliminating Traps",
      title: "3. Detecting and Eliminating Fan Traps & Chasm Traps",
      badge: "Trap Elimination",
      badgeColor: "purple",
      sqlSnippet: `-- ⚠️ FAN TRAP SCENARIO:
-- Division (1) ----&lt; Employee (N)
-- Division (1) ----< Project (N)
-- Ambiguity: Which employee works on which project?
-- ✅ FIX: Link Employee (M) ----< Employee_Project (Junction) &gt;---- (N) Project`,
      explanation: "Fan traps and chasm traps cause pathway ambiguities in ER diagrams that lead to Cartesian products and faulty query joins.",
      keyTakeaways: ["Fan traps occur when two 1:N relationships fan out from a single entity.","Chasm traps occur when optional pathways lose pathways between related entities.","Resolve traps by restructuring entity associations through explicit junction tables."]
    },
    concept4: {
      conceptName: "4. Workbench EER",
      title: "4. Building & Exporting EER Models in MySQL Workbench",
      badge: "Workbench Tooling",
      badgeColor: "rose",
      sqlSnippet: `-- 🛠️ MYSQL WORKBENCH MODEL EXPORT CHECKLIST:
-- 1. Create EER Model &rarr; Add Diagram.
-- 2. Place 15-25 tables with explicit data types and foreign key relationships.
-- 3. Run Forward Engineer Database Wizard &rarr; Generate production SQL script.
-- 4. Export high-resolution PNG/SVG diagram for capstone documentation report.`,
      explanation: "MySQL Workbench EER Modeler automates visual schema design and generates production-ready SQL DDL with relational integrity.",
      keyTakeaways: ["Maintain visual clarity with color-coded subject areas (e.g. Sales, Inventory, Billing).","Synchronize physical MySQL databases with visual models bi-directionally.","Export clean vector diagrams for project submission."]
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
            Topic 2 of 11
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Phase 1: Business Requirements Gathering & Entity-Relationship Modeling (Crow's Foot EER)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Transforming ambiguous stakeholder business rules into rigorous Crow's Foot Enhanced Entity-Relationship (EER) diagrams with cardinality and participation constraints.
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
              <h3 className="font-bold text-white text-base">Cardinality</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Accurate modeling of 1:1, 1:N, and M:N relationships using Crow's foot notation.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Hierarchy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Specialization supertypes/subtypes with disjoint and completeness constraints.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Trap Prevention</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Detecting and eliminating structural fan traps and chasm traps in pathways.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Visual Artifacts</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Production Workbench diagrams exported to vector format for technical defense.</p>
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
                  Case 1: Susmita & Mamata – Eliminating Fan Traps in Retail Suppliers
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Retail EER
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, Susmita initially connected Vendors directly to Products and Orders independently. This created a fan trap where orders could not verify if products came from the correct vendor. Mamata resolved this by connecting Orders to Order_Items, which mapped each item directly to the vendor variant.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Abhronila – Hospital Specialization Subtypes in Kolkata
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Hospital EER
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Debangshu modeled medical personnel in a Kolkata hospital using an EER specialization hierarchy. Superclass Staff branched into Doctor (specialization, license_no) and Nurse (ward_assignment, shift). This eliminated null attributes and preserved distinct foreign key linkages.
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
                <span>⚠️</span> Pitfall 1: Confusing Attributes with Entities
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Storing an address or phone number list inside a single column string breaks atomicity. If an entity has multiple values or internal structure, promote it to a table.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Model multi-valued and structured attributes as dedicated child tables.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Neglecting Identifying Relationships
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Declaring child tables without foreign key primary key inheritance on weak entities leads to orphan records.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use identifying relationships when a child entity cannot exist independently of its parent.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Review EER with Domain Experts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Walk through business workflows (e.g. order cancellation, refund, returns) against the diagram before writing DDL.
              </p>
              <div className="text-xs text-slate-400">
                Validates that every real-world scenario has a well-defined relational path.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Color-Code Functional Clusters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Group related tables (e.g. Auth, Catalog, Checkout, Analytics) into distinct visual layers.
              </p>
              <div className="text-xs text-slate-400">
                Improves readability for team members and project evaluators.
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
            title="Topic 2: Phase 1: Business Requirements Gathering & Entity-Relationship Modeling (Crow's Foot EER)"
            content={noteText}
          />

          <Teacher
            note="EER modeling is the architectural blueprint of your entire capstone. A flaw in your ER diagram will ripple into buggy SQL queries, difficult joins, and normalization headaches. Spend dedicated time validating your cardinality notations and verifying that every business rule is accurately represented!"
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
            title="Phase 1: Business Requirements Gathering & Entity-Relationship Modeling (Crow's Foot EER) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
