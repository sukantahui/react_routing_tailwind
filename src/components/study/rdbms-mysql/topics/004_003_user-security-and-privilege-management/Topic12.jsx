import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Securing Data at Rest: InnoDB Tablespace Encryption (TDE - Transparent Data Encryption) and Keyrings
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive Data at Rest security workbench: exploring the two-tier encryption key architecture (MEK vs DEK), configuring Keyring components (local & Vault), enabling TDE across tablespaces/redo/undo logs, executing instant key rotations, and auditing encrypted storage in MySQL 8.0.
 */
const Topic12 = () => {
  // Interactive TDE State
  const [selectedTdePhase, setSelectedTdePhase] = useState("phase1_two_tier_keys");

  const tdePhases = {
    phase1_two_tier_keys: {
      phaseNumber: "Phase 1: Two-Tier Key Architecture",
      title: "1. Master Key (MEK) vs Tablespace Key (DEK) Hierarchy",
      badge: "Cryptographic Hierarchy",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔑 THE TWO-TIER CRYPTOGRAPHIC HIERARCHY:

-- Tier 1: Master Encryption Key (MEK) -> Stored in Keyring Component / Vault
-- Tier 2: Tablespace Encryption Key (DEK) -> Stored in .ibd Header, encrypted by MEK
-- Tier 3: 16KB InnoDB Data Pages -> Stored on physical disk, encrypted with AES-256

-- 1. Create encrypted table:
CREATE TABLE kolkata_finance.ledgers (
  ledger_id INT PRIMARY KEY AUTO_INCREMENT,
  account_num VARCHAR(30) NOT NULL,
  balance DECIMAL(15,2) NOT NULL
) ENCRYPTION = 'Y';

-- 2. Verify encryption status in data dictionary:
SELECT SPACE, NAME, SPACE_TYPE, ENCRYPTION 
FROM information_schema.INNODB_TABLESPACES 
WHERE NAME LIKE '%ledgers%';`,
      explanation:
        "TDE isolates physical page encryption from key management. The Tablespace Key (DEK) encrypts individual 16KB data pages on disk. The Master Encryption Key (MEK) resides in an external Keyring and encrypts only the DEK in the file header, making data theft from disk impossible.",
      keyTakeaways: [
        "Tablespace Key (DEK) encrypts physical data pages using AES-256.",
        "Master Key (MEK) encrypts the DEK and resides in an external Keyring.",
        "Zero code or query modifications required for applications or ORMs."
      ]
    },
    phase2_master_key_rotation: {
      phaseNumber: "Phase 2: Instant Master Key Rotation",
      title: "2. Zero-Downtime Instant Master Key Rotation",
      badge: "Millisecond Rotation",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ INSTANT MASTER KEY ROTATION (NO DATA RE-ENCRYPTION):

-- 1. Execute instant Master Key rotation:
ALTER INSTANCE ROTATE INNODB MASTER KEY;

-- 2. What happens under the hood:
-- * MySQL generates a new Master Key in Keyring / Vault
-- * Re-encrypts ONLY the small tablespace keys in .ibd file headers
-- * Zero 16KB data pages are rewritten or re-encrypted!
-- * Completes in < 20 milliseconds across multi-terabyte databases!

-- 3. Also rotate Binary Log Master Key:
ALTER INSTANCE ROTATE BINLOG MASTER KEY;`,
      explanation:
        "Because TDE uses a two-tier key architecture, rotating the Master Key does NOT require re-encrypting terabytes of table data. MySQL simply generates a new MEK in the keyring and re-encrypts the tiny tablespace key headers in each .ibd file in milliseconds.",
      keyTakeaways: [
        "ALTER INSTANCE ROTATE INNODB MASTER KEY completes in sub-second time.",
        "Re-encrypts file header keys without touching raw data pages.",
        "Crucial for automated quarterly compliance key rotation mandates."
      ]
    },
    phase3_comprehensive_encryption: {
      phaseNumber: "Phase 3: Tablespace & Log Hardening",
      title: "3. Encrypting Redo Logs, Undo Logs & Binlogs",
      badge: "Full Storage Coverage",
      badgeColor: "purple",
      sqlSnippet: `-- 🛡️ SYSTEM-WIDE STORAGE ENCRYPTION HARDENING:

-- 1. Encrypt InnoDB Redo and Undo Logs (Prevents journal leakage):
SET PERSIST innodb_redo_log_encrypt = ON;
SET PERSIST innodb_undo_log_encrypt = ON;

-- 2. Encrypt Replication Binary Logs and Relay Logs on disk:
SET PERSIST binlog_encryption = ON;

-- 3. Enforce default encryption for all newly created schemas/tables:
SET PERSIST default_table_encryption = ON;
SET PERSIST table_encryption_privilege_check = ON;

-- 4. Encrypt System Tablespace:
ALTER TABLESPACE mysql ENCRYPTION = 'Y';`,
      explanation:
        "Encrypting only table files leaves sensitive data vulnerable to extraction from redo logs, undo logs, or binary logs. Enabling comprehensive storage encryption guarantees that all transactional journals and system tablespaces are protected with AES-256.",
      keyTakeaways: [
        "innodb_redo_log_encrypt and undo_log_encrypt prevent journal leakage.",
        "binlog_encryption protects replication event logs on physical disk.",
        "default_table_encryption = ON mandates automatic encryption for all new tables."
      ]
    },
    phase4_keyring_components: {
      phaseNumber: "Phase 4: Keyring Component Management",
      title: "4. Managing Keyring Components & HashiCorp Vault",
      badge: "Enterprise Key Management",
      badgeColor: "rose",
      sqlSnippet: `-- 🗄️ INSTALLING & AUDITING KEYRING COMPONENTS:

-- 1. Install local component_keyring_file:
INSTALL COMPONENT 'file://component_keyring_file';

-- 2. Or connect to enterprise HashiCorp Vault / KMIP HSM:
-- INSTALL COMPONENT 'file://component_keyring_kmip';

-- 3. Verify active keyring component status:
SELECT * FROM performance_schema.keyring_component_status;

-- 4. Monitor encrypted page I/O telemetry:
SHOW STATUS LIKE 'Innodb_num_pages_encrypted';
SHOW STATUS LIKE 'Innodb_num_pages_decrypted';`,
      explanation:
        "MySQL 8.0 Component Architecture enables pluggable integration with local files, HashiCorp Vault, and KMIP hardware security modules. Telemetry counters in performance_schema verify that InnoDB buffer pool flushes are actively encrypting pages before disk I/O.",
      keyTakeaways: [
        "Keyring components decouple master key storage from database compute nodes.",
        "Supports KMIP Hardware Security Modules (HSMs) and cloud secret managers.",
        "Telemetry confirms real-time encrypted read/write page counts."
      ]
    }
  };

  const currentPhase = tdePhases[selectedTdePhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 12 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Securing Data at Rest: <span className="text-emerald-400">InnoDB TDE</span> &amp; Keyring Architecture
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering Transparent Data Encryption (TDE) in MySQL 8.0: understanding the two-tier key hierarchy (Master Key vs Tablespace Key), configuring Keyring components (Local, Vault, KMIP), enabling full-stack encryption across tablespaces, redo logs, undo logs, and binlogs, and executing instantaneous key rotations.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Two-Tier Key Architecture Matrix ────────────── */}
        <section id="key-architecture" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Two-Tier Cryptographic Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL separates key management from data page encryption for maximum performance and instant rotation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Tier 1: Master Key (MEK)</span>
              <h3 className="text-lg font-bold text-white">External Keyring Storage</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Stored in HashiCorp Vault, KMIP HSM, or local keyring file. Never touches disk tablespace files. Used solely to encrypt and decrypt Tablespace Keys.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400">
                Rotation: Instant (re-encrypts headers only).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Tier 2: Tablespace Key (DEK)</span>
              <h3 className="text-lg font-bold text-white">Encrypted File Header</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Stored inside the header of each individual <code>.ibd</code> file, encrypted by the MEK. Used to encrypt and decrypt physical 16KB data pages.
              </p>
              <div className="pt-2 text-xs font-mono text-cyan-400">
                Algorithm: AES-256 symmetric cipher.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-3 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Tier 3: In-Memory Pages</span>
              <h3 className="text-lg font-bold text-purple-300">InnoDB Buffer Pool</h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Pages reside unencrypted in RAM for maximum B-tree indexing and query speed. AES-NI hardware instructions encrypt pages during disk write flushes.
              </p>
              <div className="pt-2 text-xs font-mono text-purple-300">
                Performance: Line-rate disk throughput with AES-NI.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive TDE &amp; Keyring Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe two-tier key setup, instant rotation, full storage hardening, and keyring component telemetry.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(tdePhases).map((phaseKey) => {
              const phase = tdePhases[phaseKey];
              const isSelected = selectedTdePhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedTdePhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
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
                  currentPhase.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentPhase.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
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
                SQL DDL Implementation &amp; Status Telemetry:
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
              Security case studies in Barrackpore and Kolkata demonstrating physical drive theft protection and automated Vault master key rotation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Decommissioned Server Drive Stolen in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Data Unreadable
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an old server hard drive containing 3 years of retail customer orders was stolen during an office relocation. Because Mamata had provisioned all tables with <code>ENCRYPTION = 'Y'</code> and stored the Master Key on a separate secure key server, the thief opening the <code>.ibd</code> files found only scrambled AES-256 ciphertext. Zero customer names or card hashes were compromised.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Instant Rotation on ₹500 Crore Banking Ledgers in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  18ms Execution
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, an 8-terabyte banking database cluster handling ₹500 Crores in volume required mandatory quarterly key rotation for RBI compliance. Rather than hours of expensive page re-encryption, Debangshu executed <code>ALTER INSTANCE ROTATE INNODB MASTER KEY;</code>. The command rotated the HashiCorp Vault master key and re-encrypted the file headers in 18 milliseconds with 0 query latency impact.
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
              Avoid dangerous key management loopholes and unencrypted journal leakages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Storing Keyring on the Same Disk Partition
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Storing the keyring file in the default data directory means an attacker stealing the drive gets both the encrypted database files AND the master decryption key!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Store keyring data in HashiCorp Vault, KMIP HSM, or a separate key partition.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting to Encrypt Redo and Undo Logs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Encrypting tablespaces without setting <code>innodb_redo_log_encrypt = ON</code> allows attackers to extract sensitive data directly from unencrypted transaction log files on disk.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always enable innodb_redo_log_encrypt and innodb_undo_log_encrypt.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Pair TDE (At Rest) with TLS (In Transit)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Combine InnoDB TDE with TLS 1.3 to guarantee comprehensive end-to-end cryptographic defense across both physical storage and network layers.
              </p>
              <div className="text-xs text-slate-400">
                Satisfies PCI-DSS 4.0, HIPAA, and ISO 27001 compliance standards.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Automate Master Key Rotations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Schedule automated quarterly master key rotations using <code>ALTER INSTANCE ROTATE INNODB MASTER KEY</code> via cron or CI/CD pipelines.
              </p>
              <div className="text-xs text-slate-400">
                Limits cryptographic key exposure time with zero service downtime.
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
            title="Topic 12: Securing Data at Rest: InnoDB Tablespace Encryption (TDE) and Keyrings"
            content={noteText}
          />

          <Teacher
            note="Transparent Data Encryption (TDE) is essential for safeguarding physical data against disk theft and unencrypted backup leaks. Remember the two-tier key hierarchy: the Master Key in your Keyring encrypts only the Tablespace Keys in file headers. This is why ALTER INSTANCE ROTATE INNODB MASTER KEY executes in milliseconds without touching terabytes of data pages. Always encrypt your redo and undo logs as well!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of InnoDB TDE, Keyring components, and master key rotation.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB TDE &amp; Keyring Architecture FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
