import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Phase 4: Synthetic Seed Data Generation (100,000+ Realistic Records)
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Phase 4: Synthetic Seed Data Generation (100,000+ Realistic Records).
 */
const Topic5 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Seed Generation",
      title: "1. High-Speed Synthetic Seed Generation Techniques",
      badge: "100k+ Seeding",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ GENERATING 100,000 SEED RECORDS VIA STORED PROCEDURE:
DELIMITER $$
CREATE PROCEDURE seed_customers(IN num_rows INT)
BEGIN
  DECLARE i INT DEFAULT 1;
  START TRANSACTION;
  WHILE i &lt;= num_rows DO
    INSERT INTO customers (full_name, email, phone, credit_limit)
    VALUES (
      CONCAT('Customer_', i),
      CONCAT('user_', i, '@example.in'),
      CONCAT('+91', LPAD(FLOOR(RAND() * 9000000000) + 1000000000, 10, '0')),
      ROUND(RAND() * 100000 + 10000, 2)
    );
    IF i % 5000 = 0 THEN
      COMMIT;
      START TRANSACTION;
    END IF;
    SET i = i + 1;
  END WHILE;
  COMMIT;
END $$
DELIMITER ;
CALL seed_customers(100000);`,
      explanation: "Batching inserts inside transactions (5,000 rows per batch) reduces redo log flushes and generates 100,000 records in seconds.",
      keyTakeaways: ["Avoid auto-committing individual inserts (100x speedup with batch transactions).","Use mathematical functions (RAND, FLOOR, LPAD) to generate realistic phone numbers and amounts.","Disable secondary indexes temporarily during multi-million row bulk loading if needed."]
    },
    concept2: {
      conceptName: "2. Relational Consistency",
      title: "2. Preserving Relational Consistency & Foreign Key Integrity",
      badge: "FK Integrity",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔄 RELATIONALLY CONSISTENT SEEDING SEQUENCE:
-- 1. Seed 1,000 Users and 200 Vendors.
-- 2. Seed 5,000 Products referencing valid vendor_ids.
-- 3. Seed 50,000 Orders referencing valid customer_ids within order date ranges.
-- 4. Seed 150,000 Order_Items selecting random valid order_id and product_id pairs!
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT 
  FLOOR(RAND() * 50000) + 1,
  FLOOR(RAND() * 5000) + 1,
  FLOOR(RAND() * 4) + 1,
  ROUND(RAND() * 2000 + 100, 2);`,
      explanation: "Seed generators must sample valid foreign key ranges to prevent foreign key constraint violation errors during population.",
      keyTakeaways: ["Generate parents before children in strict top-down dependency order.","Ensure status dates adhere to real-world timelines (e.g. delivery_date &gt;= order_date).","Distribute orders realistically across temporal date ranges (last 24 months)."]
    },
    concept3: {
      conceptName: "3. Bulk LOAD DATA",
      title: "3. High-Throughput Bulk Import via LOAD DATA INFILE",
      badge: "LOAD DATA",
      badgeColor: "purple",
      sqlSnippet: `-- 🚀 IMPORTING 1,000,000 ROWS IN 3 SECONDS:
LOAD DATA INFILE '/var/lib/mysql-files/seed_orders.csv'
INTO TABLE orders
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '
'
IGNORE 1 ROWS
(order_id, customer_id, total_amount, order_status, created_at);`,
      explanation: "LOAD DATA INFILE bypasses SQL query parser overhead, streaming CSV files directly into the InnoDB storage engine at maximum disk speed.",
      keyTakeaways: ["LOAD DATA INFILE is 20x faster than batch multi-row INSERT statements.","Configure secure_file_priv to specify permitted CSV file directories.","Use IGNORE 1 ROWS to skip header lines in generated CSV files."]
    },
    concept4: {
      conceptName: "4. Realistic Indian Data",
      title: "4. Realistic Persona & Geographic Distribution",
      badge: "Realistic Mock",
      badgeColor: "rose",
      sqlSnippet: `-- 🏙️ REALISTIC DATA MAPPING:
-- Names: Mamata Banerjee, Mahima Roy, Susmita Paul, Debangshu Das, Abhronila Hui
-- Cities: Kolkata, Barrackpore, Ichapur, Jadavpur, Salt Lake, Howrah
-- PIN Codes: 700120, 700032, 743144, 700091
-- Currencies: INR (₹) with realistic retail order totals (₹250 to ₹45,000)`,
      explanation: "Using realistic Indian names, local PIN codes, and authentic currency distributions makes capstone reporting queries meaningful and engaging.",
      keyTakeaways: ["Incorporate authentic names, cities, and address formats.","Model realistic skew (e.g. 20% of products generate 80% of sales).","Ensure data distributions test edge cases like NULL middle names or peak holiday orders."]
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
            Topic 5 of 11
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Phase 4: Synthetic Seed Data Generation (100,000+ Realistic Records)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Generating high-volume, relationally consistent mock datasets using stored procedures, Python scripts, and LOAD DATA INFILE.
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
              <h3 className="font-bold text-white text-base">Batch Inserts</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Transactional chunking generating 100k+ rows in sub-minute execution.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">FK Consistency</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Strict referential mapping ensuring zero broken child foreign key links.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">LOAD DATA</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Ultra-fast CSV streaming bypassing query parsing for massive volumes.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Realistic Skew</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Realistic 80/20 product popularity and Bengal geographical distribution.</p>
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
                  Case 1: Mamata & Susmita – 200,000 Retail Orders in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Retail Seeding
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mamata and Susmita used a Python script with Faker and LOAD DATA INFILE to populate 200,000 order records for their Barrackpore retail store. By modeling realistic weekend sales spikes and regional PIN code distributions, their analytical reports exposed genuine inventory bottlenecks.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Abhronila & Debangshu – 500,000 Ledger Entries in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Fintech Seeding
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Abhronila generated 500,000 double-entry ledger entries using a transactional MySQL stored procedure. By ensuring debit totals exactly matched credit totals for ₹120 Crores in volume, their financial audit reports validated zero balance leakage.
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
                <span>⚠️</span> Pitfall 1: Committing Per Row
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing COMMIT after each individual INSERT statement causes massive disk I/O write head stalls, taking hours to insert 50,000 rows.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Wrap bulk inserts in 5,000 to 10,000 row transaction blocks.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Pure Uniform Distribution
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Generating purely uniform random numbers fails to test index clustering on popular products or active customers.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Model Pareto (80/20) skew to simulate realistic real-world traffic patterns.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Automate Seeding with Seed Scripts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Store seed scripts in db/seeds/seed_data.sql or a Python generator with a single command runbook.
              </p>
              <div className="text-xs text-slate-400">
                Allows anyone evaluating the capstone to regenerate the entire database instantly.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Verify Record Counts Post-Seed
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Run SELECT COUNT(*) across all tables to confirm expected row volumes before testing queries.
              </p>
              <div className="text-xs text-slate-400">
                Ensures no silent foreign key check failure truncated data loads.
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
            title="Topic 5: Phase 4: Synthetic Seed Data Generation (100,000+ Realistic Records)"
            content={noteText}
          />

          <Teacher
            note="A database with only 10 rows cannot demonstrate real-world performance! Your B-Tree indexes only prove their worth when scanning through 100,000+ realistic records. Take time to write a fast seed procedure or Python generator, batch your transactions, and create realistic data you can query!"
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
            title="Phase 4: Synthetic Seed Data Generation (100,000+ Realistic Records) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
