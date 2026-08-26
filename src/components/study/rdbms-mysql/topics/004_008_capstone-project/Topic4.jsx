import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Phase 3: Production DDL Implementation with Constraints, Foreign Keys, and Cascading Actions
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Phase 3: Production DDL Implementation with Constraints, Foreign Keys, and Cascading Actions.
 */
const Topic4 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Production DDL",
      title: "1. Production DDL Schema Architecture",
      badge: "DDL Scripts",
      badgeColor: "emerald",
      sqlSnippet: `-- 🏗️ PRODUCTION DDL TEMPLATE IN MYSQL 8.0:
CREATE TABLE customers (
  customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  uuid CHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  credit_limit DECIMAL(12,2) NOT NULL DEFAULT 50000.00 CHECK (credit_limit &gt;= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
      explanation: "Production DDL includes explicit storage engines, default collations, UUIDs, CHECK constraints, and automatic timestamp updates.",
      keyTakeaways: ["Always specify ENGINE=InnoDB and utf8mb4_0900_ai_ci explicitly.","Use BIGINT AUTO_INCREMENT for high-volume primary keys to prevent sequence exhaustion.","Incorporate updated_at ON UPDATE CURRENT_TIMESTAMP for automated record tracking."]
    },
    concept2: {
      conceptName: "2. Constraints & Integrity",
      title: "2. CHECK, UNIQUE & Domain Integrity Constraints",
      badge: "Constraint Rules",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛡️ DOMAIN VALIDATION CONSTRAINTS:
CREATE TABLE transactions (
  transaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  from_account_id BIGINT NOT NULL,
  to_account_id BIGINT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REVERSED') NOT NULL DEFAULT 'PENDING',
  CONSTRAINT chk_positive_amt CHECK (amount &gt; 0),
  CONSTRAINT chk_diff_acc CHECK (from_account_id != to_account_id)
);`,
      explanation: "MySQL 8.0 enforces CHECK constraints to prevent invalid business values like negative balances or self-transfers at the database kernel level.",
      keyTakeaways: ["Name constraints explicitly (e.g. chk_positive_amt) for clear error debugging.","Enforce multi-column business rules directly inside table definitions.","Use ENUM for discrete low-cardinality state machines."]
    },
    concept3: {
      conceptName: "3. Referential Actions",
      title: "3. Foreign Key Cascading Actions (CASCADE vs RESTRICT)",
      badge: "Referential Rules",
      badgeColor: "purple",
      sqlSnippet: `-- 🔗 CONFIGURING REFERENTIAL ACTIONS:
CREATE TABLE order_items (
  order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL CHECK (quantity &gt; 0),
  unit_price DECIMAL(10,2) NOT NULL,
  -- When order is deleted, delete its items automatically:
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  -- Prevent deleting a product if active order items exist:
  CONSTRAINT fk_prod FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);`,
      explanation: "Choosing between CASCADE, RESTRICT, and SET NULL ensures parent deletions do not corrupt dependent business records.",
      keyTakeaways: ["Use ON DELETE CASCADE for tightly-bound child records (e.g., Order &rarr; Order_Items).","Use ON DELETE RESTRICT for master data (e.g., Products, Users, Doctors).","Use ON DELETE SET NULL for optional associations (e.g., assigned coupon code)."]
    },
    concept4: {
      conceptName: "4. Migration Sequencing",
      title: "4. Modular DDL Script Sequencing & Versioning",
      badge: "Migration Order",
      badgeColor: "rose",
      sqlSnippet: `-- 📂 SCRIPT SEQUENCING (FLYWAY / LIQUIBASE PATTERN):
-- 01_cleanup.sql         &rarr; DROP TABLE IF EXISTS in reverse dependency order
-- 02_schema_master.sql   &rarr; Parent tables (users, roles, categories, branches)
-- 03_schema_child.sql    &rarr; Child tables (orders, accounts, appointments)
-- 04_schema_junction.sql &rarr; M:N junction tables (user_roles, doctor_specialties)
-- 05_indexes.sql         &rarr; Secondary & composite indexes
-- 06_views.sql           &rarr; Security & reporting views`,
      explanation: "Sequencing DDL scripts prevents foreign key dependency errors during automated deployments and CI/CD pipelines.",
      keyTakeaways: ["Create independent master tables first before referencing child tables.","Drop tables in reverse dependency order during schema resets.","Separate DDL structure, index creation, and view definitions into distinct files."]
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
            Topic 4 of 11
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Phase 3: Production DDL Implementation with Constraints, Foreign Keys, and Cascading Actions
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Writing industrial SQL DDL scripts with strict data types, CHECK constraints, auto-increment primary keys, foreign keys, and cascading rules.
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
              <h3 className="font-bold text-white text-base">Data Types</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Precise type allocation (DECIMAL, BIGINT, CHAR(36), TIMESTAMP) preventing bloat.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">CHECK Rules</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Native MySQL 8.0 CHECK constraints enforcing domain business rules.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Cascade Rules</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Balanced ON DELETE CASCADE and RESTRICT rules preserving data history.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Sequencing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Numbered versioned SQL migration scripts for reproducible builds.</p>
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
                  Case 1: Mahima & Susmita – Preventing Orphan Prescriptions in Jadavpur
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Healthcare DDL
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Jadavpur, Mahima configured ON DELETE RESTRICT on Doctor records and ON DELETE CASCADE on Prescription_Items. When a doctor retired, the database blocked accidental deletion of historical medical logs, ensuring patient prescription compliance.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Mamata – Negative Balance Prevention in Barrackpore Bank
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Banking CHECK
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Debangshu implemented a named constraint CONSTRAINT chk_min_bal CHECK (current_balance >= minimum_balance) on savings accounts in Barrackpore. When concurrent ATM withdrawal requests occurred, the database kernel blocked overdrafts before funds were dispensed.
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
                <span>⚠️</span> Pitfall 1: Missing Foreign Key Indexes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                MySQL creates indexes on foreign keys automatically, but composite foreign keys require verification to prevent join lock contention.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Verify index creation on all foreign key reference columns with SHOW INDEX.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Blindly Using CASCADE on Master Data
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting ON DELETE CASCADE on a customer table accidentally deletes all their historical financial ledgers upon account closure.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use soft deletes (is_deleted = TRUE) or RESTRICT for auditing-critical tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Execute in Strict SQL Mode
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enable STRICT_TRANS_TABLES and ERROR_FOR_DIVISION_BY_ZERO to reject invalid data insertions.
              </p>
              <div className="text-xs text-slate-400">
                Prevents silent data truncation on string and numeric overflows.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Include Comments on Complex Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Add COMMENT 'Formula: (base + tax) - discount' directly in DDL for developer clarity.
              </p>
              <div className="text-xs text-slate-400">
                Documents business logic directly in the information_schema.
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
            title="Topic 4: Phase 3: Production DDL Implementation with Constraints, Foreign Keys, and Cascading Actions"
            content={noteText}
          />

          <Teacher
            note="Your DDL scripts are the concrete foundation of your application. Avoid shortcut types like VARCHAR(255) for small codes or FLOAT for currency. Write clean, formatted DDL with explicit CHECK constraints, thoughtful cascading actions, and modular script sequencing!"
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
            title="Phase 3: Production DDL Implementation with Constraints, Foreign Keys, and Cascading Actions FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
