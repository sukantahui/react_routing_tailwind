import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Securing Data in Transit: Enabling and Enforcing SSL/TLS Encrypted Connections
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive data-in-transit security workbench: configuring server TLS parameters (TLSv1.2/TLSv1.3), enforcing per-account REQUIRE SSL / REQUIRE X509 rules, executing zero-downtime certificate rotations with ALTER INSTANCE RELOAD TLS, and configuring client trust verification in MySQL 8.0.
 */
const Topic11 = () => {
  // Interactive TLS State
  const [selectedTlsPhase, setSelectedTlsPhase] = useState("phase1_server_tls");

  const tlsPhases = {
    phase1_server_tls: {
      phaseNumber: "Phase 1: Server TLS Configuration",
      title: "1. Server-Wide TLS Configuration & Protocol Hardening",
      badge: "Server-Wide Enforcement",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔒 SERVER-WIDE TLS CONFIGURATION (my.cnf / my.ini):

[mysqld]
ssl_ca = /etc/mysql/certs/ca.pem
ssl_cert = /etc/mysql/certs/server-cert.pem
ssl_key = /etc/mysql/certs/server-key.pem

-- Enforce modern TLS protocols only (Disable TLS 1.0 & 1.1):
tls_version = TLSv1.2,TLSv1.3
tls_ciphersuites = TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256

-- Unconditionally reject any unencrypted TCP connections server-wide:
require_secure_transport = ON;

-- Verify active TLS status:
SHOW STATUS LIKE 'Ssl_cipher';
SHOW STATUS LIKE 'Ssl_version';`,
      explanation:
        "Configuring server-wide TLS ensures that all network traffic traversing port 3306 is encrypted with modern AES-GCM or ChaCha20 ciphers. Setting require_secure_transport = ON unconditionally rejects all unencrypted plaintext connections at the network layer.",
      keyTakeaways: [
        "ssl_ca, ssl_cert, and ssl_key configure the server's cryptographic keys.",
        "tls_version restricts protocol negotiation to TLS 1.2 and 1.3.",
        "require_secure_transport = ON blocks all plaintext TCP connections."
      ]
    },
    phase2_account_require: {
      phaseNumber: "Phase 2: Per-Account REQUIRE Rules",
      title: "2. Granular REQUIRE SSL & Mutual TLS (X.509)",
      badge: "Account Enforcement",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛡️ GRANULAR PER-ACCOUNT TLS ENFORCEMENT:

-- 1. Standard TLS encryption requirement:
ALTER USER 'susmita_ops'@'192.168.1.%' REQUIRE SSL;

-- 2. Mutual TLS (mTLS) - Client MUST present a valid CA-signed certificate:
ALTER USER 'kolkata_payment_svc'@'10.10.%.%' REQUIRE X509;

-- 3. Strict Subject & Issuer DN verification for banking microservices:
ALTER USER 'core_banking_app'@'10.10.%.%'
  REQUIRE ISSUER '/C=IN/ST=West Bengal/L=Kolkata/O=FintechCorp/CN=FintechRootCA'
  AND SUBJECT '/C=IN/ST=West Bengal/L=Kolkata/O=FintechCorp/CN=payment-pod-01';`,
      explanation:
        "MySQL provides granular per-user TLS enforcement clauses. REQUIRE SSL mandates encrypted channels, while REQUIRE X509 and REQUIRE ISSUER/SUBJECT enforce Mutual TLS (mTLS), requiring client applications to authenticate using cryptographic X.509 certificates.",
      keyTakeaways: [
        "REQUIRE SSL rejects unencrypted connection attempts for specific users.",
        "REQUIRE X509 enables Mutual TLS (mTLS) client certificate verification.",
        "REQUIRE ISSUER and SUBJECT prevent rogue certificate impersonation."
      ]
    },
    phase3_dynamic_reload: {
      phaseNumber: "Phase 3: Zero-Downtime TLS Reload",
      title: "3. Dynamic Certificate Rotation (ALTER INSTANCE RELOAD TLS)",
      badge: "Zero Downtime",
      badgeColor: "purple",
      sqlSnippet: `-- 🚀 ZERO-DOWNTIME TLS CERTIFICATE RENEWAL IN MYSQL 8.0:

-- 1. Replace certificate files on disk:
-- cp /new_certs/server-cert.pem /etc/mysql/certs/server-cert.pem
-- cp /new_certs/server-key.pem /etc/mysql/certs/server-key.pem

-- 2. Reload TLS context into MySQL memory dynamically (NO RESTART NEEDED!):
ALTER INSTANCE RELOAD TLS;

-- 3. Verify updated certificate validity and expiration timestamp:
SHOW STATUS LIKE 'Ssl_server_not_after';
-- Returns: Ssl_server_not_after = 'Nov 10 12:00:00 2027 GMT'`,
      explanation:
        "In MySQL 8.0, expired or renewed TLS certificates can be reloaded in real time using ALTER INSTANCE RELOAD TLS. The server swaps the active in-memory SSL context instantly with zero connection interruption across running microservices.",
      keyTakeaways: [
        "ALTER INSTANCE RELOAD TLS updates certificate contexts without restarting mysqld.",
        "Active client sessions remain connected without dropping queries.",
        "Ssl_server_not_after status variable confirms renewed expiration timestamps."
      ]
    },
    phase4_client_verification: {
      phaseNumber: "Phase 4: Client Trust & Verification",
      title: "4. Client-Side CA Verification & MITM Prevention",
      badge: "Client Security",
      badgeColor: "rose",
      sqlSnippet: `// 🌐 1. Node.js (mysql2 with CA verification & rejectUnauthorized):
const pool = mysql.createPool({
  host: 'db.kolkata.internal',
  user: 'payment_svc',
  password: 'VaultSecretPass#2026',
  ssl: {
    ca: fs.readFileSync('./ca.pem'),
    rejectUnauthorized: true // Mandates strict CA verification!
  }
});

// ☕ 2. Java (JDBC Connector/J with VERIFY_IDENTITY):
// String url = "jdbc:mysql://db.kolkata.internal:3306/bank_db" +
//              "?sslMode=VERIFY_IDENTITY" +
//              "&trustCertificateKeyStoreUrl=file:/certs/truststore.jks";`,
      explanation:
        "Application clients must configure strict CA certificate verification (rejectUnauthorized: true in Node.js, sslMode=VERIFY_IDENTITY in JDBC) to prevent active Man-in-the-Middle (MITM) proxies from presenting fake self-signed certificates.",
      keyTakeaways: [
        "sslMode=VERIFY_IDENTITY verifies both CA signature and hostname matching.",
        "rejectUnauthorized: true in Node.js eliminates MITM certificate spoofing.",
        "Mutual TLS transmits client-cert.pem and client-key.pem buffers."
      ]
    }
  };

  const currentPhase = tlsPhases[selectedTlsPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 11 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Securing Data in Transit: <span className="text-emerald-400">SSL/TLS</span> Encrypted Connections
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Comprehensive guide to transport-layer encryption in MySQL 8.0: configuring modern TLS 1.2/1.3 parameters, enforcing per-account <code>REQUIRE SSL</code> and Mutual TLS (<code>REQUIRE X509</code>) rules, executing zero-downtime certificate rotations with <code>ALTER INSTANCE RELOAD TLS</code>, and preventing MITM proxy attacks.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: TLS Defense Pillars ─────────────────────────── */}
        <section id="tls-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Pillars of Transport Security
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How TLS provides cryptographic protection for database packets moving across the wire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="text-lg font-bold text-white">Confidentiality</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Encrypts all SQL queries, result rows, passwords, and PII using AES-256-GCM or ChaCha20, preventing packet sniffing across internal switches.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400">
                Defense: Wire packets appear as random ciphertext.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="text-lg font-bold text-white">Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Uses cryptographic Message Authentication Codes (MAC / Poly1305) to ensure network packets cannot be modified, injected, or replayed in transit.
              </p>
              <div className="pt-2 text-xs font-mono text-cyan-400">
                Defense: Any packet tampering triggers instant TCP drop.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-3 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="text-lg font-bold text-purple-300">Mutual Authentication</h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Verifies server identity via CA certificates and verifies client identity via Mutual TLS (<code>REQUIRE X509</code>), stopping rogue clients and MITM proxies.
              </p>
              <div className="pt-2 text-xs font-mono text-purple-300">
                Defense: Bidirectional X.509 certificate validation.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Transport Security Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe server TLS parameters, account REQUIRE rules, dynamic certificate renewal, and client trust configs.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(tlsPhases).map((phaseKey) => {
              const phase = tlsPhases[phaseKey];
              const isSelected = selectedTlsPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedTlsPhase(phaseKey)}
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
                Configuration &amp; SQL Execution Telemetry:
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
              Security case studies in Barrackpore and Kolkata demonstrating Wi-Fi packet sniffing defense and zero-downtime certificate renewal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Defeating Wi-Fi Sniffers in Barrackpore Retail Store
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Ciphertext Protected
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS terminals communicated with the central database over internal Wi-Fi. An attacker running Wireshark attempted to capture unencrypted customer credit card queries. Because Mamata had enforced <code>REQUIRE SSL</code> and <code>require_secure_transport = ON</code>, all captured packets contained high-entropy AES-256-GCM ciphertext bytes, neutralizing the network eavesdropping attack completely.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Zero-Downtime TLS Renewal in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  0 Dropped Connections
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a banking cluster handling ₹200 Crores in volume approached its annual TLS certificate expiration date. Rather than scheduling an expensive maintenance reboot, Debangshu placed renewed certificate files on disk and executed <code>ALTER INSTANCE RELOAD TLS;</code>. The active TLS context was updated in RAM in 12 milliseconds, allowing 80 connected microservices to continue processing transactions without a single dropped packet.
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
              Avoid dangerous TLS configuration loopholes and unverified connection strings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using sslMode=REQUIRED without CA Verification
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting <code>sslMode=REQUIRED</code> encrypts traffic but ignores server certificate validity, leaving clients vulnerable to Man-in-the-Middle (MITM) certificate spoofing.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use sslMode=VERIFY_IDENTITY or rejectUnauthorized: true in production.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Permitting Legacy TLS 1.0 / 1.1
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving default protocol negotiation open allows attackers to execute cipher downgrade attacks (POODLE/BEAST) and violates PCI-DSS 4.0 compliance.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce tls_version='TLSv1.2,TLSv1.3' in my.cnf.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Monitor Ssl_server_not_after Expiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Integrate <code>Ssl_server_not_after</code> into Prometheus alerts to notify security teams 30 days prior to certificate expiration.
              </p>
              <div className="text-xs text-slate-400">
                Prevents sudden microservice outages caused by expired certificates.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable require_secure_transport = ON
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enforce server-wide transport security in <code>my.cnf</code> to guarantee that newly created accounts or unconfigured connections cannot connect over plaintext TCP.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees 100% encrypted in-transit data security across the database cluster.
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
            title="Topic 11: Securing Data in Transit: Enabling and Enforcing SSL/TLS Encrypted Connections"
            content={noteText}
          />

          <Teacher
            note="Never allow unencrypted database traffic on your networks—even inside private cloud VPCs! Set require_secure_transport = ON globally, enforce REQUIRE SSL on all application service accounts, restrict protocols strictly to TLS 1.2 and TLS 1.3, and master ALTER INSTANCE RELOAD TLS to perform zero-downtime certificate renewals without ever rebooting your production database!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of SSL/TLS in MySQL 8.0, Mutual TLS (mTLS), and dynamic certificate management.
            </p>
          </div>

          <FAQTemplate
            title="Data in Transit &amp; SSL/TLS Encryption FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
