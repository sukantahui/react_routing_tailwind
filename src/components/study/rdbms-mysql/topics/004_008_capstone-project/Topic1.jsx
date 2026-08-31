import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Domain Options: Multi-Vendor E-Commerce, Core Banking, Enterprise ERP & Hospital Management
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Domain Options: Multi-Vendor E-Commerce, Core Banking, Enterprise ERP & Hospital Management.
 */
const Topic1 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. E-Commerce",
      title: "1. Multi-Vendor E-Commerce Platform Architecture",
      badge: "E-Commerce",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛒 MULTI-VENDOR E-COMMERCE CORE ENTITIES:
-- users, vendors, products, categories, product_variants,
-- orders, order_items, payments, shipments, reviews, coupons.
CREATE TABLE order_items (
  order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  vendor_id INT NOT NULL,
  product_variant_id BIGINT NOT NULL,
  quantity INT NOT NULL CHECK (quantity &gt; 0),
  unit_price DECIMAL(10,2) NOT NULL,
  vendor_commission DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
);`,
      explanation: "Features vendor payouts, product variants, inventory locks, multi-item order fulfillment, and refund processing.",
      keyTakeaways: ["Supports multiple independent sellers with dedicated commissions.","Tracks inventory reservations with transactional rollbacks on timeout.","Calculates order totals, tax breakdowns, and coupon discounts."]
    },
    concept2: {
      conceptName: "2. Banking Ledger",
      title: "2. Double-Entry Core Banking & Ledger Architecture",
      badge: "Fintech Ledger",
      badgeColor: "cyan",
      sqlSnippet: `-- 🏦 DOUBLE-ENTRY BANKING LEDGER SCHEMA:
-- customers, accounts, branches, transactions, journal_entries,
-- cards, loans, repayments, audit_logs.
CREATE TABLE journal_entries (
  entry_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  transaction_id BIGINT NOT NULL,
  account_id BIGINT NOT NULL,
  entry_type ENUM('DEBIT', 'CREDIT') NOT NULL,
  amount DECIMAL(15,2) NOT NULL CHECK (amount &gt; 0),
  balance_after DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);`,
      explanation: "Enforces immutable double-entry bookkeeping where every debit has an equal credit, supporting high-concurrency transfers and audit compliance.",
      keyTakeaways: ["Every financial movement creates equal DEBIT and CREDIT journal records.","Uses SELECT ... FOR UPDATE to serialize account balance updates.","Maintains complete auditability with append-only transaction ledgers."]
    },
    concept3: {
      conceptName: "3. Enterprise ERP",
      title: "3. Enterprise ERP & Supply Chain Management",
      badge: "Supply Chain",
      badgeColor: "purple",
      sqlSnippet: `-- 🏭 ENTERPRISE ERP & WAREHOUSE INVENTORY:
-- suppliers, raw_materials, purchase_orders, bill_of_materials (BOM),
-- production_batches, finished_goods, warehouses, inventory_stock.
CREATE TABLE bill_of_materials (
  bom_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  raw_material_id INT NOT NULL,
  required_quantity DECIMAL(10,4) NOT NULL,
  unit_of_measure VARCHAR(20) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (raw_material_id) REFERENCES raw_materials(material_id)
);`,
      explanation: "Manages multi-warehouse inventory, hierarchical Bill of Materials (BOM), purchase order workflows, and manufacturing batch tracking.",
      keyTakeaways: ["Recursive Bill of Materials (BOM) hierarchy for sub-assemblies.","Tracks raw material purchase orders against vendor delivery lead times.","Monitors multi-warehouse reorder thresholds to prevent stockouts."]
    },
    concept4: {
      conceptName: "4. Hospital Systems",
      title: "4. Multi-Specialty Hospital & Pharmacy Management",
      badge: "Healthcare",
      badgeColor: "rose",
      sqlSnippet: `-- 🏥 HOSPITAL & CLINICAL RECORD MANAGEMENT:
-- patients, doctors, departments, appointments, admissions,
-- medical_records, prescriptions, prescription_items, pharmacy_medicines, bills.
CREATE TABLE prescriptions (
  prescription_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT NOT NULL,
  doctor_id INT NOT NULL,
  patient_id BIGINT NOT NULL,
  diagnosis TEXT NOT NULL,
  prescribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
);`,
      explanation: "Integrates doctor scheduling, inpatient ward admissions, electronic health records (EHR), pharmacy batch dispensing, and multi-tier medical billing.",
      keyTakeaways: ["Prevents double-booking doctor slots via unique constraints on schedules.","Tracks inpatient bed allocations and daily ward charges.","Maintains pharmacy medicine batch expiry dates and FIFO dispensing."]
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
            Topic 1 of 11
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Domain Options: Multi-Vendor E-Commerce, Core Banking, Enterprise ERP & Hospital Management
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          In-depth breakdown of four enterprise domain architectures, functional requirements, entity boundaries, and transaction workflows.
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
              <h3 className="font-bold text-white text-base">E-Commerce</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Cart reservation, vendor commissions, multi-tier orders, and payment tracking.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Banking Ledger</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Immutable double-entry debits/credits, strict ACID isolation, and audit trails.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Supply Chain</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Multi-level BOM, supplier purchase orders, and warehouse inventory control.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Healthcare</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Patient medical history, bed occupancy, doctor rosters, and pharmacy dispensing.</p>
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
                  Case 1: Mahima & Susmita – Multi-Specialty Hospital in Jadavpur
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Hospital Schema
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mahima and Susmita designed a 22-table hospital schema for a facility in Jadavpur managing 800 beds and ₹3 Crores in monthly patient care. They modeled patient admissions, doctor appointment rosters, pharmacy batch expiry tracking, and consolidated discharge billing.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Mamata – ERP Supply Chain in Ichapur Foundry
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  ERP Capstone
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Ichapur, Debangshu and Mamata built an industrial supply chain database tracking 4,500 steel components. Using recursive CTEs across Bill of Materials (BOM) tables and automated purchase order triggers, their system reduced raw material reorder delays by 60%.
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
                <span>⚠️</span> Pitfall 1: Over-Simplifying Domain Realities
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Treating an e-commerce order as a single flat row without separate order_items or payment attempts fails basic normalization.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Model real-world 1:N and M:N relationships using dedicated child and junction tables.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Neglecting Financial Rounding
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Calculating vendor commissions or GST taxes using floating-point types leads to balance mismatches in audit reports.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use DECIMAL with explicit scale (e.g. DECIMAL(12,2)) for all financial calculations.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Select a Domain Matching Career Goals
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Pick banking for fintech aspirations, e-commerce for consumer tech, ERP for enterprise software, or healthcare for data systems.
              </p>
              <div className="text-xs text-slate-400">
                Aligns your capstone project directly with target job interview scenarios.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Define Explicit Business Rules
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Document all business constraints (e.g. maximum appointments per doctor slot, minimum account balance) before writing DDL.
              </p>
              <div className="text-xs text-slate-400">
                Ensures business rules are enforced via CHECK constraints and triggers.
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
            title="Topic 1: Domain Options: Multi-Vendor E-Commerce, Core Banking, Enterprise ERP & Hospital Management"
            content={noteText}
          />

          <Teacher
            note="Choose your capstone domain carefully! E-Commerce gives you rich opportunities for inventory locks and vendor analytics; Banking tests your transaction isolation and double-entry rigor; ERP showcases complex recursive BOM hierarchies; and Hospital management exercises multi-module entity relationships. Pick one domain and commit to modeling it with enterprise-level depth!"
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
            title="Domain Options: Multi-Vendor E-Commerce, Core Banking, Enterprise ERP & Hospital Management FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
