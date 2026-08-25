import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – KEY Partitioning & LINEAR KEY: Hash Partitioning based on MySQL Internal Hash Functions
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive KEY and LINEAR KEY partitioning workbench: evaluating native string and UUID hashing, exploring default Primary Key auto-hashing, comparing ALGORITHM=1 vs ALGORITHM=2 MD5 hash engines, and executing dynamic LINEAR KEY scaling in MySQL 8.0.
 */
const Topic6 = () => {
  // Interactive Key Configuration State
  const [selectedKeyConfig, setSelectedKeyConfig] = useState("key1_string_uuid_hashing");

  const keyConfigurations = {
    key1_string_uuid_hashing: {
      configName: "1. String & UUID Hashing",
      title: "1. Native String & UUID Hashing (No Conversion Functions)",
      badge: "String Support",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ NATIVE UUID & STRING HASHING WITHOUT HELPER FUNCTIONS:
CREATE TABLE customer_tokens (
  token_uuid VARCHAR(36) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (token_uuid)
) ENGINE = InnoDB
PARTITION BY KEY (token_uuid)
PARTITIONS 8;

-- 🔍 100% PRUNED POINT LOOKUP:
EXPLAIN SELECT * FROM customer_tokens WHERE token_uuid = '3e11fa47-0b1a-4f5e-8b9a-123456789abc';
-- Result: partitions = p3 (MySQL hashes string internally and reads ONLY 1 partition!)`,
      explanation:
        "KEY partitioning uses MySQL's internal hashing function (MD5 based) to support VARCHAR strings, UUIDs, and binary columns natively without requiring CRC32() or ASCII() helper wrappers.",
      keyTakeaways: [
        "Natively hashes VARCHAR, CHAR, VARBINARY, and UUID columns.",
        "Eliminates user SQL helper function overhead during execution.",
        "Delivers 100% single-partition pruning on point string lookups."
      ]
    },
    key2_default_primary_key: {
      configName: "2. Default Primary Key",
      title: "2. Zero-Config Default Primary Key Partitioning: PARTITION BY KEY()",
      badge: "Auto-Routing",
      badgeColor: "cyan",
      sqlSnippet: `-- 🚀 ZERO-CONFIG PARTITIONING ON PRIMARY KEY:
-- If columns are omitted, MySQL automatically hashes the table's Primary Key:
CREATE TABLE api_keys (
  api_key VARCHAR(64) NOT NULL,
  client_name VARCHAR(100),
  PRIMARY KEY (api_key)
) ENGINE = InnoDB
PARTITION BY KEY()
PARTITIONS 16;

-- 💡 How it works:
-- MySQL inspects the Primary Key (api_key) and hashes it across 16 .ibd files automatically!`,
      explanation:
        "Omitting column names in PARTITION BY KEY() instructs MySQL to automatically use the table's Primary Key (or first non-null Unique Key) as the partitioning expression.",
      keyTakeaways: [
        "PARTITION BY KEY() automatically uses the table's Primary Key.",
        "Provides zero-configuration write distribution across disk files.",
        "Prevents page-level lock bottlenecks on high-concurrency inserts."
      ]
    },
    key3_algorithm_flags: {
      configName: "3. ALGORITHM 1 vs 2",
      title: "3. Hash Engine Flags: ALGORITHM = 1 vs ALGORITHM = 2",
      badge: "Engine Versioning",
      badgeColor: "purple",
      sqlSnippet: `-- 📜 1. ALGORITHM = 1 (Legacy MySQL 5.1 Password Hash):
-- Maintained strictly for backwards compatibility during legacy database migrations:
PARTITION BY KEY ALGORITHM = 1 (user_uuid) PARTITIONS 8;

-- ⚡ 2. ALGORITHM = 2 (Modern MySQL 8.0 MD5 Hash - DEFAULT):
-- Features superior bit dispersion, endianness safety, and uniform balance:
PARTITION BY KEY ALGORITHM = 2 (user_uuid) PARTITIONS 8;`,
      explanation:
        "ALGORITHM = 1 is the legacy password hashing algorithm from MySQL 5.1. ALGORITHM = 2 is the modern default in MySQL 8.0, featuring superior bit entropy, CPU endianness neutrality, and uniform bucket distribution.",
      keyTakeaways: [
        "ALGORITHM = 2 is the modern default MD5 hash engine in MySQL 8.0.",
        "Provides superior bit dispersion and balanced partition file sizes.",
        "ALGORITHM = 1 is reserved strictly for legacy backward compatibility."
      ]
    },
    key4_linear_key_resizing: {
      configName: "4. LINEAR KEY Resizing",
      title: "4. LINEAR KEY Scaling & Low-Overhead Dynamic Resizing",
      badge: "Dynamic Scaling",
      badgeColor: "rose",
      sqlSnippet: `-- ⚡ 1. PROVISIONING LINEAR KEY FOR DYNAMIC SCALING:
CREATE TABLE payment_tokens (
  token_id VARCHAR(64) NOT NULL,
  amount DECIMAL(12,2),
  PRIMARY KEY (token_id)
) ENGINE = InnoDB
PARTITION BY LINEAR KEY (token_id)
PARTITIONS 8;

-- 🚀 2. ADDING 8 NEW PARTITIONS ONLINE (Increases from 8 to 16):
-- Uses bitwise powers-of-two algorithm: only splits affected partitions (1/N data movement)!
ALTER TABLE payment_tokens ADD PARTITION PARTITIONS 8;`,
      explanation:
        "LINEAR KEY combines internal MD5 hashing with powers-of-two bitwise algorithms, allowing dynamic partition expansion online while moving only a small fraction of rows rather than reorganizing the entire table.",
      keyTakeaways: [
        "LINEAR KEY moves only 1/N rows during partition expansion.",
        "Enables dynamic online table resizing without long-running locks.",
        "Power-of-two partition counts (8, 16, 32) guarantee balanced storage distribution."
      ]
    }
  };

  const currentKey = keyConfigurations[selectedKeyConfig];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 6 of 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">KEY Partitioning</span> &amp; <span className="text-cyan-400">LINEAR KEY</span>: Internal Hash Functions
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering string and UUID hash partitioning in MySQL 8.0: understanding native non-integer hashing, default Primary Key auto-routing, <code>ALGORITHM = 2</code> MD5 hash engines, and low-overhead online <code>LINEAR KEY</code> resizing.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: KEY Pillars ─────────────────────────────────── */}
        <section id="key-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of KEY Partitioning
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core internal engine mechanisms enabling native string hashing, zero-config PK routing, and bitwise scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Native String Hashing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Natively hashes <code>VARCHAR</code>, <code>UUID</code>, and <code>VARBINARY</code> columns without helper function wrapping.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Auto-PK Routing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>PARTITION BY KEY()</code> automatically inspects and hashes the table&apos;s Primary Key column(s).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">ALGORITHM = 2</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Modern MySQL 8.0 MD5 hashing algorithm ensuring high bit dispersion and CPU endianness safety.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">LINEAR KEY Scaling</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Bitwise powers-of-two scaling moves only 1/N data during online partition expansions.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive KEY &amp; LINEAR KEY Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe native UUID hashing, zero-config default Primary Key routing, ALGORITHM=1 vs 2 flags, and dynamic LINEAR KEY expansions.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(keyConfigurations).map((keyKey) => {
              const config = keyConfigurations[keyKey];
              const isSelected = selectedKeyConfig === keyKey;
              return (
                <button
                  key={keyKey}
                  onClick={() => setSelectedKeyConfig(keyKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
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
                  KEY Partitioning Architecture
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentKey.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentKey.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentKey.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentKey.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentKey.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentKey.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentKey.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL DDL &amp; Partitioning Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentKey.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentKey.keyTakeaways.map((item, i) => (
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
              KEY partitioning case studies in Barrackpore and Kolkata demonstrating UUID loyalty card write spreading and high-speed SHA-256 token scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – UUID Write Spreading in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  PARTITION BY KEY()
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS cashier loyalty cards tracked ₹1.2 Crores in sales transactions. Random UUID customer IDs previously caused page-split lock contention on a single monolithic index. Susmita deployed <code>PARTITION BY KEY() PARTITIONS 8</code>; incoming UUID writes were evenly distributed across 8 physical <code>.ibd</code> files, eliminating disk queue saturation and speeding up cashier checkout times by 4x.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – SHA-256 Payment Tokens in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  LINEAR KEY (32 Buckets)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing digital payment tokens across ₹500 Crores in volume, Debangshu configured <code>PARTITION BY LINEAR KEY (token_hash) PARTITIONS 32</code>. Sizing partition counts to an exact power of 2 ($2^5 = 32$) ensured that SHA-256 tokens were distributed with less than 1% variance across all physical tablespaces, allowing the bank to scale from 16 to 32 partitions online with only 1/16th data movement overhead.
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
              Avoid wildcard prefix scans on KEY tables and using legacy ALGORITHM=1 on new deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Expecting Pruning on LIKE Queries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Queries using <code>WHERE email LIKE &apos;abc%&apos;</code> cannot prune KEY partitions because internal MD5 hashing scatters prefixes across all buckets.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use exact equality (=) or IN lists for point string lookups.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Neglecting LINEAR KEY for Scaling
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using standard KEY on a high-growth table causes near-100% data reorganization during future <code>ADD PARTITION</code> expansions.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use LINEAR KEY for tables requiring online partition resizing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use PARTITION BY KEY() on PKs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omit column names to automatically partition on the Primary Key, distributing concurrent inserts across multiple physical disk files.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates page-level insert lock bottlenecks on NVMe storage.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Standardize on ALGORITHM = 2
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use the default modern <code>ALGORITHM = 2</code> MD5 hash engine for optimal bit dispersion and CPU endianness neutrality.
              </p>
              <div className="text-xs text-slate-400">
                Ensures even storage distribution across all partition buckets.
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
            title="Topic 6: KEY Partitioning & LINEAR KEY: Hash Partitioning based on MySQL Internal Hash Functions"
            content={noteText}
          />

          <Teacher
            note="KEY Partitioning is your ultimate solution for non-integer columns, UUID primary keys, and SHA token tables! Unlike HASH which requires user integer expressions, KEY uses MySQL's internal MD5 hashing engine to handle strings and binary data natively. Simply writing PARTITION BY KEY() automatically distributes writes across your primary key. Standardize on ALGORITHM = 2 for modern bit dispersion, use LINEAR KEY with power-of-two partition counts (8, 16, 32) for fast online scaling, and enjoy line-rate point equality lookups!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of native string hashing, default Primary Key routing, ALGORITHM=1 vs 2 engines, and LINEAR KEY dynamic scaling.
            </p>
          </div>

          <FAQTemplate
            title="KEY &amp; LINEAR KEY Partitioning FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
