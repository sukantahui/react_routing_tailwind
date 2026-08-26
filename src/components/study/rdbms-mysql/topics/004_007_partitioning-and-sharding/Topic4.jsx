import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – LIST Partitioning: Partitioning by Discrete Categories, Regions, and Status Codes
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive LIST partitioning workbench: comparing integer LIST vs string LIST COLUMNS, verifying disjoint set validation rules, testing multi-tenant physical data isolation, and executing dynamic category additions in MySQL 8.0.
 */
const Topic4 = () => {
  // Interactive List Configuration State
  const [selectedListKey, setSelectedListKey] = useState("list1_columns_vs_standard");

  const listConfigurations = {
    list1_columns_vs_standard: {
      configName: "1. LIST vs LIST COLUMNS",
      title: "1. Standard Integer LIST vs Modern String LIST COLUMNS",
      badge: "Syntax Comparison",
      badgeColor: "emerald",
      sqlSnippet: `-- 📜 1. LEGACY INTEGER LIST (Requires Integer Expression / ID Mapping):
CREATE TABLE legacy_branches (
  branch_id INT NOT NULL,
  region_code INT NOT NULL,
  PRIMARY KEY (branch_id, region_code)
) PARTITION BY LIST (region_code) (
  PARTITION p_bengal VALUES IN (10, 11, 12),
  PARTITION p_delhi  VALUES IN (20, 21, 22)
);

-- ⚡ 2. MODERN LIST COLUMNS (Direct String Categories):
CREATE TABLE modern_branches (
  branch_id INT NOT NULL,
  region_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (branch_id, region_name)
) PARTITION BY LIST COLUMNS (region_name) (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore', 'Howrah'),
  PARTITION p_delhi  VALUES IN ('New Delhi', 'Noida', 'Gurgaon'),
  PARTITION p_mumbai VALUES IN ('Mumbai', 'Pune', 'Thane')
);`,
      explanation:
        "LIST COLUMNS allows partitioning directly on VARCHAR strings, ENUMs, and dates without maintaining internal surrogate integer ID mapping tables, simplifying schema management and application queries.",
      keyTakeaways: [
        "LIST COLUMNS supports direct VARCHAR and ENUM categorical values.",
        "Eliminates foreign key integer lookup joins for partition routing.",
        "Makes partition definitions human-readable and self-documenting."
      ]
    },
    list2_disjoint_sets: {
      configName: "2. Disjoint Sets & Rules",
      title: "2. Disjoint Set Validation & Explicit NULL Handling",
      badge: "Validation Rules",
      badgeColor: "cyan",
      sqlSnippet: `-- 🧮 1. DISJOINT SET REQUIREMENT (No Duplicate Values Allowed):
-- Every value must appear in EXACTLY ONE partition definition!
-- Duplicating 'Kolkata' in two partitions causes Error 1495:
-- PARTITION p_east VALUES IN ('Kolkata') -- ❌ FAILS IF ALREADY IN p_bengal!

-- 📦 2. EXPLICIT NULL VALUE HANDLING:
-- Unlike RANGE, LIST rejects NULL values unless explicitly declared:
PARTITION BY LIST (status_code) (
  PARTITION p_active   VALUES IN (1, 2),
  PARTITION p_inactive VALUES IN (0),
  PARTITION p_unmapped VALUES IN (NULL) -- ✅ Accepts NULL records cleanly!
);`,
      explanation:
        "All values across all partition lists must be mutually exclusive. Unmapped values trigger Error 1526, and NULL values are rejected unless a partition explicitly defines VALUES IN (NULL).",
      keyTakeaways: [
        "Values must be strictly unique across all partition lists (disjoint).",
        "Unmapped incoming values fail with Error 1526.",
        "NULL values require an explicit PARTITION ... VALUES IN (NULL) definition."
      ]
    },
    list3_multitenant_isolation: {
      configName: "3. Multi-Tenant Tiering",
      title: "3. Multi-Tenant Physical Isolation & Regional Tiering",
      badge: "Multi-Tenant Architecture",
      badgeColor: "purple",
      sqlSnippet: `-- 🏢 DEDICATED PARTITIONS FOR ENTERPRISE TENANTS:
CREATE TABLE multitenant_ledger (
  tenant_code VARCHAR(30) NOT NULL,
  account_id BIGINT NOT NULL,
  balance DECIMAL(12,2),
  PRIMARY KEY (account_id, tenant_code)
) PARTITION BY LIST COLUMNS (tenant_code) (
  PARTITION p_enterprise_tata VALUES IN ('tata_motors', 'tcs'),
  PARTITION p_enterprise_jio  VALUES IN ('reliance_jio', 'reliance_retail'),
  PARTITION p_smb_pool        VALUES IN ('smb_store_1', 'smb_store_2', 'smb_store_3')
);

-- 🔍 100% PRUNED TENANT QUERY:
EXPLAIN SELECT * FROM multitenant_ledger WHERE tenant_code = 'tcs';
-- partitions = p_enterprise_tata (Zero disk I/O contention with other tenants!)`,
      explanation:
        "Multi-tenant SaaS architectures leverage LIST COLUMNS to isolate high-volume enterprise tenants into dedicated physical .ibd files, delivering dedicated IOPS and predictable query latencies.",
      keyTakeaways: [
        "Isolates VIP enterprise tenants into dedicated physical storage partitions.",
        "Pools smaller SMB tenants into shared partitions for storage efficiency.",
        "Guarantees tenant query pruning with zero cross-tenant lock contention."
      ]
    },
    list4_dynamic_additions: {
      configName: "4. Dynamic Expansion",
      title: "4. Adding New Categories Online via ADD / REORGANIZE",
      badge: "Dynamic Lifecycle",
      badgeColor: "rose",
      sqlSnippet: `-- 🚀 1. ADDING A NEW REGIONAL PARTITION ONLINE:
ALTER TABLE modern_branches ADD PARTITION (
  PARTITION p_south VALUES IN ('Bengaluru', 'Hyderabad', 'Chennai')
);

-- 🔄 2. EXPANDING AN EXISTING PARTITION TO INCLUDE NEW CITIES:
ALTER TABLE modern_branches REORGANIZE PARTITION p_bengal INTO (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore', 'Howrah', 'Durgapur', 'Siliguri')
);`,
      explanation:
        "New regional categories or tenant codes can be added online via ADD PARTITION, or existing partitions can be expanded to include new cities using REORGANIZE PARTITION without table locks.",
      keyTakeaways: [
        "ADD PARTITION appends new discrete categories online.",
        "REORGANIZE PARTITION expands existing categorical lists safely.",
        "Executes in milliseconds with zero disruption to active transactions."
      ]
    }
  };

  const currentList = listConfigurations[selectedListKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 4 of 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">LIST Partitioning</span>: Categories, <span className="text-cyan-400">Regions</span> &amp; Multi-Tenant Data
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering discrete categorical partitioning in MySQL 8.0: understanding <code>LIST COLUMNS</code> string routing, enforcing disjoint set validation rules, isolating multi-tenant enterprise data into dedicated tablespaces, and managing partition lifecycles.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: LIST Pillars ────────────────────────────────── */}
        <section id="list-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of LIST Partitioning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core mechanisms enabling categorical data division, multi-tenant isolation, and explicit set routing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">LIST COLUMNS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct partitioning on <code>VARCHAR</code> and <code>ENUM</code> strings without integer ID mapping tables.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Disjoint Sets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All values across all partition lists must be mutually exclusive with zero duplicate mappings.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Tenant Isolation</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Isolates enterprise SaaS tenants into dedicated physical <code>.ibd</code> files for guaranteed IOPS.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Explicit NULLs</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Requires an explicit <code>PARTITION ... VALUES IN (NULL)</code> to prevent insert crashes on null records.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive LIST Partitioning Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe integer LIST vs string LIST COLUMNS, disjoint set validation rules, multi-tenant isolation schemas, and dynamic additions.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(listConfigurations).map((listKey) => {
              const config = listConfigurations[listKey];
              const isSelected = selectedListKey === listKey;
              return (
                <button
                  key={listKey}
                  onClick={() => setSelectedListKey(listKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {config.configName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  LIST Partitioning Architecture
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentList.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentList.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentList.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentList.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentList.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentList.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentList.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Partitioning DDL &amp; Categorical Mapping:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentList.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentList.keyTakeaways.map((item, i) => (
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
              LIST partitioning case studies in Barrackpore and Kolkata demonstrating localized regional POS pruning and multi-tenant banking data isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Regional Branch Pruning in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  8x Faster Lookups
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS cashiers billed ₹1.2 Crores in sales across multiple retail store outlets. Susmita configured <code>PARTITION BY LIST COLUMNS (store_location)</code> with <code>PARTITION p_barrackpore VALUES IN (&apos;Barrackpore&apos;, &apos;N.C.Pukur&apos;)</code> and <code>PARTITION p_kolkata VALUES IN (&apos;Kolkata&apos;, &apos;Salt Lake&apos;)</code>. Local store queries pruned searches to the single Barrackpore file, speeding up cashier lookups by 8x.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Multi-Tenant Tiering in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Dedicated IOPS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in volume for multi-tenant corporate clients, Debangshu used <code>LIST (tenant_id)</code> to assign tier-1 enterprise clients their own dedicated physical partitions (e.g. <code>PARTITION p_corp_tata VALUES IN (1001)</code>). This guaranteed that high-volume enterprise transactions never suffered from disk I/O page eviction caused by other tenants.
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
              Avoid duplicate categorical definitions across partitions and unmapped NULL insertions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Duplicate Values Across Lists
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Listing the same value in more than one partition&apos;s <code>VALUES IN</code> list causes MySQL to reject table creation with Error 1495.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Ensure all partition value sets are strictly disjoint.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Unhandled NULL Insertions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Inserting a row with a NULL partition key on a LIST partitioned table crashes with Error 1526 unless explicitly mapped.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Explicitly declare a PARTITION ... VALUES IN (NULL) if column allows NULLs.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use LIST COLUMNS for Strings
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Standardize on <code>PARTITION BY LIST COLUMNS (varchar_col)</code> to eliminate integer surrogate ID translation tables.
              </p>
              <div className="text-xs text-slate-400">
                Improves query clarity and makes partition definitions self-documenting.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Leverage DATA DIRECTORY for Residency
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Assign <code>DATA DIRECTORY</code> to specific regional LIST partitions to satisfy legal data localization and GDPR residency mandates.
              </p>
              <div className="text-xs text-slate-400">
                Enforces physical storage boundaries within a single logical schema.
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
            title="Topic 4: LIST Partitioning: Partitioning by Discrete Categories, Regions, and Status Codes"
            content={noteText}
          />

          <Teacher
            note="LIST Partitioning is your secret weapon for multi-tenant SaaS and regional data tiering! Always standardize on LIST COLUMNS so you can map strings like 'Kolkata' and 'Barrackpore' directly. Remember that all partition value lists must be strictly disjoint with zero duplicate entries across lists, incoming rows must match a mapped category to avoid Error 1526, and you must explicitly define VALUES IN (NULL) if your column permits NULL records!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of LIST vs LIST COLUMNS, disjoint set validation, multi-tenant isolation, NULL routing, and dynamic category expansion.
            </p>
          </div>

          <FAQTemplate
            title="LIST Partitioning &amp; Categorical Routing FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
