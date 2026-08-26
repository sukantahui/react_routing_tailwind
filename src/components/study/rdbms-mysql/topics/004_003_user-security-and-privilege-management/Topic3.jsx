import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Authentication Plugins: caching_sha2_password vs mysql_native_password
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive authentication plugin workbench: comparing SHA-256 caching authentication vs legacy double SHA-1 hashing, understanding fast-path RAM handshakes, resolving driver compatibility errors (2054 & 1251), and configuring production migrations.
 */
const Topic3 = () => {
  // Interactive Auth Plugin State
  const [selectedAuthPhase, setSelectedAuthPhase] = useState("phase1_fastpath_cache");

  const authPhases = {
    phase1_fastpath_cache: {
      phaseNumber: "Phase 1: Fast-Path Re-Authentication",
      title: "1. The In-Memory Fast-Path Handshake (Sub-0.5ms)",
      badge: "In-Memory Cache Hit",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ FAST-PATH CACHING HANDSHAKE (caching_sha2_password):

-- 1. Client connects with username + scramble token
-- 2. Server checks in-memory RAM cache:
--    Digest for 'mamata_app'@'10.0.%.%' &rarr; FOUND IN MEMORY!
-- 3. Server computes SHA-256 token validation directly in RAM
-- 4. Connection accepted in < 0.3 milliseconds without RSA/TLS overhead!

SELECT user, host, plugin 
FROM mysql.user 
WHERE user = 'mamata_app';`,
      explanation:
        "When an application connection pool frequently establishes connections, MySQL Server retains the user's SHA-256 digest in its server-side memory cache. During subsequent handshakes, the server skips heavy RSA key decryption math and disk lookups, approving connections in sub-millisecond time directly from RAM.",
      keyTakeaways: [
        "Eliminates cryptographic latency for microservice connection pools.",
        "Delivers over 15,000 handshakes per second per CPU core.",
        "Zero plaintext or unencrypted password transmission over the wire."
      ]
    },
    phase2_full_handshake_tls: {
      phaseNumber: "Phase 2: Full Handshake (TLS/SSL)",
      title: "2. Full Handshake over Encrypted TLS Tunnel",
      badge: "Encrypted Cache Miss",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔒 FULL HANDSHAKE OVER SECURE TLS/SSL:

-- 1. Client establishes TLS 1.3 encrypted tunnel
-- 2. Cache Miss on Server (first connection or post FLUSH PRIVILEGES)
-- 3. Server requests full authentication
-- 4. Client transmits password protected inside TLS tunnel
-- 5. Server verifies 5,000 rounds SHA-256 digest & populates RAM cache!

ALTER USER 'susmita_billing'@'192.168.1.%'
  IDENTIFIED WITH caching_sha2_password BY 'Kolkata#Secure2026!'
  REQUIRE SSL;`,
      explanation:
        "When a client connects for the first time or after a server restart, the cache is empty. Over an encrypted TLS connection, the client securely sends the password inside the TLS envelope. MySQL computes the 5,000-round SHA-256 digest, validates access, and stores the digest in RAM for future fast-path logins.",
      keyTakeaways: [
        "Standard production deployment practice for all cloud services.",
        "Requires REQUIRE SSL or useSSL=true in connection strings.",
        "Protected against both passive packet sniffing and active MITM attacks."
      ]
    },
    phase3_legacy_migration: {
      phaseNumber: "Phase 3: Legacy Compatibility & Migration",
      title: "3. Migrating Legacy Users from mysql_native_password",
      badge: "Deprecation & Migration",
      badgeColor: "amber",
      sqlSnippet: `-- ⚠️ GRANULAR PER-USER LEGACY FALLBACK (Do NOT change global default):

-- 1. Identify legacy accounts:
SELECT user, host, plugin FROM mysql.user WHERE plugin = 'mysql_native_password';

-- 2. Migrate legacy user to caching_sha2_password:
ALTER USER 'debangshu_dev'@'localhost'
  IDENTIFIED WITH caching_sha2_password BY 'NewUpdatedPass#2026';

-- 3. Refresh in-memory security structures:
FLUSH PRIVILEGES;`,
      explanation:
        "mysql_native_password relies on double SHA-1 hashing, which is cryptographically obsolete and disabled by default in MySQL 8.4 LTS. Organizations should never downgrade global server settings to mysql_native_password, but rather isolate legacy accounts on a granular basis while upgrading client driver libraries to mysql2 / Connector/J 8.0.",
      keyTakeaways: [
        "mysql_native_password is completely removed in modern MySQL LTS releases.",
        "Upgrade client libraries (e.g. npm install mysql2) to support caching_sha2_password natively.",
        "Enforce TLS across all application tiers to eliminate RSA key retrieval vulnerabilities."
      ]
    }
  };

  const currentPhase = authPhases[selectedAuthPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 3 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Authentication Plugins: <span className="text-emerald-400">caching_sha2_password</span> vs <span className="text-amber-400">mysql_native_password</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Deep architectural comparison of MySQL authentication plugins: dissecting NIST-grade SHA-256 hashing, in-memory Fast-Path RAM authentication, RSA public key handshakes, driver compatibility matrix, and preparing for the total removal of <code>mysql_native_password</code> in MySQL 8.4 LTS.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Architectural Overview & Evolution ───────────── */}
        <section id="evolution-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Cryptographic Evolution of MySQL Authentication
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              From vulnerable double SHA-1 hashing to military-grade SHA-256 with in-memory caching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Legacy (MySQL 4.1 – 5.7)</span>
              <h3 className="text-lg font-bold text-white">mysql_native_password</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Relies on double SHA-1 hashing: <code>SHA1(pw ^ SHA1(SHA1(pw) + nonce))</code>. Deprecated in MySQL 8.0 and disabled by default in MySQL 8.4 LTS due to SHA-1 collision vulnerabilities and vulnerability to high-speed GPU hash cracking.
              </p>
              <div className="pt-2 text-xs font-mono text-rose-300">
                Weakness: Zero salt stretching, fast offline brute-forcing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Transitional (MySQL 5.6 – 5.7)</span>
              <h3 className="text-lg font-bold text-white">sha256_password</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Introduced strong 256-bit SHA-2 salted hashing. However, every single connection required full RSA asymmetric encryption or TLS, creating heavy CPU bottlenecks during high-frequency connection pooling.
              </p>
              <div className="pt-2 text-xs font-mono text-amber-300">
                Limitation: Heavy RSA handshake latency (no caching).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-700/60 bg-emerald-950/20 space-y-3 shadow-lg shadow-emerald-950/50">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Modern Default (MySQL 8.0+)</span>
              <h3 className="text-lg font-bold text-emerald-300">caching_sha2_password</h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Combines salted 256-bit SHA-2 hashing (5,000 digest rounds) with an ultra-fast in-memory server cache. Delivers sub-millisecond connection handshakes without compromising NIST-grade security.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-300 font-semibold">
                Advantage: Sub-0.5ms fast-path &amp; zero plaintext leakage.
              </div>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-200 uppercase font-mono text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Feature / Metric</th>
                  <th className="py-3.5 px-4 text-emerald-400">caching_sha2_password</th>
                  <th className="py-3.5 px-4 text-amber-400">mysql_native_password</th>
                  <th className="py-3.5 px-4 text-slate-400">sha256_password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-white">Default Version</td>
                  <td className="py-3 px-4 text-emerald-300">MySQL 8.0.4+ Default</td>
                  <td className="py-3 px-4 text-amber-300">MySQL 4.1 – 8.0.3 (Deprecated)</td>
                  <td className="py-3 px-4 text-slate-400">MySQL 5.6+ Optional</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-white">Cryptographic Hash</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">SHA-256 (Salted + 5000 rounds)</td>
                  <td className="py-3 px-4 font-mono text-amber-300">Double SHA-1 (No salt stretching)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">SHA-256 (5000 rounds)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-white">In-Memory Hash Cache</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Yes (Sub-0.5ms Fast-Path)</td>
                  <td className="py-3 px-4 text-slate-400">No (Computes SHA-1 challenge)</td>
                  <td className="py-3 px-4 text-rose-400">No (Mandatory RSA/TLS math)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-white">Non-TLS Handshake Math</td>
                  <td className="py-3 px-4">RSA 2048-bit Public Key</td>
                  <td className="py-3 px-4">20-Byte Scramble Nonce</td>
                  <td className="py-3 px-4">RSA 2048-bit Public Key</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-white">GPU Brute-Force Resistance</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Extremely High</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">Very Low (Billions/sec)</td>
                  <td className="py-3 px-4 text-emerald-400">Extremely High</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-white">MySQL 8.4 LTS Status</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Active Default</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">Disabled by Default</td>
                  <td className="py-3 px-4 text-slate-500">Deprecated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Authentication Workbench ─────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Authentication Handshake Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and compare Fast-Path RAM authentication, TLS Full Handshakes, and Legacy migration patterns.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(authPhases).map((phaseKey) => {
              const phase = authPhases[phaseKey];
              const isSelected = selectedAuthPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedAuthPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {phase.phaseNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {currentPhase.phaseNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentPhase.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentPhase.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentPhase.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentPhase.badgeColor === "amber" && "bg-amber-950/80 text-amber-300 border-amber-700"
                )}
              >
                {currentPhase.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentPhase.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Implementation &amp; Handshake Telemetry:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentPhase.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentPhase.keyTakeaways.map((item, i) => (
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
              Production case studies demonstrating zero-downtime plugin migration and CPU load optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Resolving Legacy PHP Crashes in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Downtime
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an inventory microservice running legacy PHP 7.1 threw Error 2054 after the core database was upgraded to MySQL 8.0. Instead of degrading the entire database server by resetting global defaults, Mamata configured only the specific legacy account: <code>ALTER USER 'barrackpore_php_app'@'192.168.1.15' IDENTIFIED WITH mysql_native_password BY '...';</code>. All modern microservices continued using <code>caching_sha2_password</code>, ensuring top-tier security for customer accounts.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Eliminating RSA Handshake Spikes in Kolkata Fintech
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  92% CPU Reduction
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a high-volume payment gateway processing ₹50 Lakhs in transactions per hour experienced 100% CPU utilization spikes during bursts of 20,000 connection handshakes under <code>sha256_password</code> due to intensive RSA private key decryption math. Migrating to <code>caching_sha2_password</code> allowed 99.8% of requests to authenticate via the in-memory fast-path cache in RAM, reducing authentication CPU usage by 92%.
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
              Avoid critical security vulnerabilities and connection bottlenecks in production deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving allowPublicKeyRetrieval=true in Public Networks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enabling public key retrieval without TLS allows a Man-in-the-Middle attacker on the network to intercept the key request and substitute their own public key, decrypting the transmitted password.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce TLS (useSSL=true / REQUIRE SSL) in production.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Reverting Globally to mysql_native_password
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Changing <code>default_authentication_plugin=mysql_native_password</code> in <code>my.cnf</code> degrades the security of every newly created account across the entire organization.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Apply mysql_native_password strictly per-account on legacy users only.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Audit Users Prior to MySQL 8.4 Upgrade
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Run an audit query on <code>mysql.user</code> to detect any remaining accounts using <code>mysql_native_password</code> before upgrading to MySQL 8.4 LTS, which disables it by default.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees zero authentication surprises during major engine upgrades.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Pair Caching SHA2 with Connection Pools
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use connection pools (HikariCP, mysql2 pool) to maintain active connections and maximize fast-path in-memory authentication hits.
              </p>
              <div className="text-xs text-slate-400">
                Delivers maximum throughput and lowest connection establishment latency.
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
            title="Topic 3: Authentication Plugins – caching_sha2_password vs mysql_native_password"
            content={noteText}
          />

          <Teacher
            note="When architecting modern database applications for MySQL 8.0 and beyond, caching_sha2_password represents the gold standard of database security. It pairs 256-bit salted hashing with sub-millisecond in-memory cache hits. Never globally downgrade your database to mysql_native_password—always isolate legacy connectors on specific accounts while upgrading your microservices to modern drivers like mysql2 or JDBC 8.0!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of MySQL authentication plugins and cryptographic handshakes.
            </p>
          </div>

          <FAQTemplate
            title="Authentication Plugins (caching_sha2_password &amp; mysql_native_password) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
