import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Studio 1: Identity & Access Model State
  const [selectedAccessModelKey, setSelectedAccessModelKey] = useState("fido2_passphrase");

  // Studio 2: Retention & Crypto-Shredding State
  const [selectedRetentionAssetKey, setSelectedRetentionAssetKey] = useState("oncology_pacs_retention");
  const [isShreddingSimulating, setIsShreddingSimulating] = useState(false);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fido2_jml");

  // Studio 1: Access Control Models Data
  const accessModels = {
    fido2_passphrase: {
      key: "fido2_passphrase",
      title: "1. Modern Passphrase & FIDO2 Hardware MFA Standard",
      mandate: "Passphrases must be >= 16 characters; mandatory FIDO2 hardware tokens (WebAuthn); ban arbitrary 90-day forced rotation.",
      baseline: "NIST SP 800-63B Authentication Assurance Level 3 (AAL3) with domain origin binding.",
      prohibited: "8-character passwords, SMS/Email OTPs, password sharing, storing credentials in plaintext.",
      auditMetric: "100% Phishing-Resistant MFA adoption across all cloud consoles and production VPCs.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    rbac_least_privilege: {
      key: "rbac_least_privilege",
      title: "2. Role-Based Access Control (RBAC) & Least Privilege",
      mandate: "Permissions granted strictly by business role; zero default administrative access; automatic role revocation upon internal transfer.",
      baseline: "ISO/IEC 27001 Control A.5.15 (Access Control) & Control A.8.2 (Privileged Access Rights).",
      prohibited: "Assigning `Administrator` or `root` permissions directly to user accounts; privilege creep.",
      auditMetric: "Zero unapproved privilege escalations; 100% quarterly access certification completed.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    abac_zero_trust: {
      key: "abac_zero_trust",
      title: "3. Attribute-Based Access Control (ABAC) Context Policy",
      mandate: "Dynamic evaluation of subject role, resource classification, device compliance posture, geolocation, and time of day.",
      baseline: "NIST SP 800-207 Zero Trust Architecture with Open Policy Agent (OPA) / XACML policy engines.",
      prohibited: "Static implicit trust based on internal corporate IP addresses or VPN connectivity alone.",
      auditMetric: "Conditional access blocking 100% of untrusted devices and non-compliant network locations.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    jml_pipeline: {
      key: "jml_pipeline",
      title: "4. Joiner-Mover-Leaver (JML) Automated Identity Lifecycle",
      mandate: "Day-1 least privilege onboarding; automated transfer updates; instantaneous (< 15 mins) offboarding de-provisioning.",
      baseline: "ISO/IEC 27001 Control A.5.18 (Access Rights) & SOC 2 CC6.3 User De-provisioning SLA.",
      prohibited: "Manual email-based de-provisioning; leaving orphaned accounts active after termination.",
      auditMetric: "100% of terminated employee accounts suspended within 300 seconds of HR trigger.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeAccessModel = accessModels[selectedAccessModelKey];

  // Studio 2: Retention Assets Data
  const retentionAssets = {
    kyc_banking_retention: {
      key: "kyc_banking_retention",
      title: "1. Customer Banking & KYC Ledgers",
      statutoryLaw: "Prevention of Money Laundering Act (PMLA) Section 12",
      retentionPeriod: "5 Years Post-Account Closure (Mandatory Tamper-Proof Storage)",
      disposalMethod: "NIST SP 800-88 Level 2 Purge (Crypto-Shredding of AES-256 KMS Keys)",
      consequence: "Loss of records triggers statutory banking sanctions and license cancellation.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    oncology_pacs_retention: {
      key: "oncology_pacs_retention",
      title: "2. Healthcare Oncology Scans & Diagnostic Imaging",
      statutoryLaw: "Digital Personal Data Protection (DPDP) Act 2023 Section 8(7)",
      retentionPeriod: "Erase Immediately upon Purpose Fulfillment or Consent Withdrawal",
      disposalMethod: "Automated AWS S3 Object Lock Lifecycle Expiry + Master Key Deletion",
      consequence: "Data hoarding triggers up to ₹250 Crore penalties under DPDP Section 33!",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    siem_logs_retention: {
      key: "siem_logs_retention",
      title: "3. SIEM & Firewall Network Telemetry Logs",
      statutoryLaw: "CERT-In Directions 2022 / IT Act Section 70B",
      retentionPeriod: "180 Days Rolling Window (NPL IST NTP Synchronized)",
      disposalMethod: "Automated rolling partition rotation in encrypted S3 Glacier archive",
      consequence: "Non-compliance punishable with 1 Year Imprisonment under Section 70B(7).",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    dev_test_retention: {
      key: "dev_test_retention",
      title: "4. Ephemeral Development & Test Database Snapshots",
      statutoryLaw: "Internal ISO 27001 Control A.8.10 Data Deletion Standard",
      retentionPeriod: "24 Hours (Immediate automated purge after CI/CD test run)",
      disposalMethod: "Instantaneous Lambda Crypto-Shredding & Storage Block Overwrite",
      consequence: "Orphaned dev snapshots create major cloud cost bloat and shadow data leak risks.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeRetentionAsset = retentionAssets[selectedRetentionAssetKey];

  const handleSimulateShredding = () => {
    setIsShreddingSimulating(true);
    setTimeout(() => {
      setIsShreddingSimulating(false);
    }, 1600);
  };

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_fido2_jml",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "FIDO2 Passwordless & Automated JML Pipeline",
      budget: "₹18,50,000",
      challenge: "Payment Switch Faced Phishing Attacks and 12 Orphaned Contractor Accounts",
      dilemma:
        "A 500-node payment switch handling ₹120 Crores daily suffered from credential stuffing attempts and 12 lingering contractor accounts with unrevoked AWS console access.",
      resolution:
        "Mamata enforced FIDO2 YubiKeys across 500 payment microservices and automated JML offboarding, achieving 100% de-provisioning in < 180 seconds and eliminating account takeover risks.",
      metrics: {
        deProvisioningSpeed: "142 Seconds (SLA: 15m)",
        fido2Adoption: "100% Hardware Keys",
        orphanedAccounts: "0 Active Accounts",
        compliance: "ISO 27001 Control A.8.5 & RBI Directions"
      }
    },
    {
      id: "ichapur_pacs_retention",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare PACS Retention & Crypto-Shredding",
      budget: "₹8,20,000",
      challenge: "Hospital Hoarded 80,000 Expired Scans, Risking ₹250 Cr DPDP Penalties",
      dilemma:
        "Hospital clinical care network hoarded 80,000 expired oncology scans beyond patient treatment timelines, creating severe data hoarding liabilities under Section 8(7) of the DPDP Act 2023.",
      resolution:
        "Mahima deployed automated 5-year retention lifecycle policies with AWS KMS crypto-shredding, erasing expired patient records instantly upon consent withdrawal under Section 8(7).",
      metrics: {
        recordsCryptoShredded: "12,400 Expired Scans",
        retentionCompliance: "100% DPDP Aligned",
        storageCostSaved: "₹3,40,000 / Year",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_abac",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA ABAC Access & CERT-In Logs",
      budget: "₹14,80,000",
      challenge: "18 Substations Requiring Context-Aware Access and 180-Day Log Archiving",
      dilemma:
        "18 high-voltage 220kV transmission substations required dynamic context-aware access and mandatory 180-day log compliance with exact Indian Standard Time synchronization.",
      resolution:
        "Debangshu enforced ABAC jump host authentication (geofenced to substation IP) and configured immutable 180-day NPL IST NTP log archiving, satisfying CEA rules and IT Act Section 70B.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        logRetentionWindow: "180 Days Rolling Archive",
        ntpClockAccuracy: "+/- 0.4s to NPL IST",
        compliance: "IT Act Section 70B & CEA Cyber Rules"
      }
    },
    {
      id: "jadavpur_iam_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "IAM & Data Retention Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Calculate Passphrase Entropy & Crypto-Shredding",
      dilemma:
        "Cybersecurity students struggled to calculate passphrase entropy, distinguish between RBAC and ABAC policies, and understand how crypto-shredding sanitizes cloud storage under NIST SP 800-88.",
      resolution:
        "The team developed an interactive Password Policy & Data Retention Policy Calculator in React, training 215+ BCA cyber security students on designing enterprise identity and retention systems.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        iamPoliciesSimulated: "85+ Enterprise Rules",
        examMastery: "100% Identity Governance Mastery",
        compliance: "NCIIPC Educational Security Charter"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Course Module 3: Information Security Management • Module 003_003 • Topic 2 of 14
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Password, Access Control, and Data Retention Policies
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the operational triad of identity and data governance: enforce NIST SP 800-63B passphrases and FIDO2 hardware MFA (ISO 27001 Control A.8.5), 
            deploy Role-Based and Attribute-Based Access Control (RBAC/ABAC), automate JML de-provisioning, and implement DPDP Storage Limitation via NIST SP 800-88 Crypto-Shredding.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Password & Access Control Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔑</span> Studio 1: Password &amp; Access Control (RBAC vs ABAC) Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an access governance model to inspect its core policy mandate, technical baseline, prohibited habits, and external audit metrics.
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(accessModels).map((m) => {
              const isSelected = selectedAccessModelKey === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setSelectedAccessModelKey(m.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{m.title.split(". ")[1]?.split(" & ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{m.title.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Model Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeAccessModel.badgeClass)}>
                  {activeAccessModel.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Mandate: {activeAccessModel.title.split(". ")[1]}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Audit Compliance SLA</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeAccessModel.auditMetric.split(" ")[0]} {activeAccessModel.auditMetric.split(" ")[1]}</span>
              </div>
            </div>

            {/* Policy Mandate & Technical Baseline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Core Policy Mandate:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeAccessModel.mandate}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Technical Security Baseline:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeAccessModel.baseline}</p>
              </div>
            </div>

            {/* Prohibited Habits & Audit Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Strictly Prohibited Operational Habits:</span>
                <p className="text-rose-300 text-xs font-sans leading-relaxed">{activeAccessModel.prohibited}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Audit Verification Target:</span>
                <p className="text-emerald-300 text-xs font-bold leading-relaxed font-sans">{activeAccessModel.auditMetric}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Data Retention Schedule & Crypto-Shredding Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🗑️</span> Studio 2: Data Retention Schedule &amp; Crypto-Shredding Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an asset category to inspect statutory retention requirements (DPDP, PMLA, CERT-In), and trigger NIST SP 800-88 Crypto-Shredding to sanitize data instantaneously.
            </p>
          </div>

          {/* Retention Asset Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(retentionAssets).map((ast) => {
              const isSelected = selectedRetentionAssetKey === ast.key;
              return (
                <button
                  key={ast.key}
                  onClick={() => setSelectedRetentionAssetKey(ast.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{ast.title.split(". ")[1]?.split(" & ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{ast.title.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Retention Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeRetentionAsset.badgeClass)}>
                  {activeRetentionAsset.statutoryLaw}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeRetentionAsset.title}
                </h3>
              </div>
              <div>
                <button
                  onClick={handleSimulateShredding}
                  disabled={isShreddingSimulating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-rose-950/50 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isShreddingSimulating ? "⚡" : "🔥"}</span>
                  <span>{isShreddingSimulating ? "Executing Crypto-Shredding..." : "Simulate Crypto-Shredding"}</span>
                </button>
              </div>
            </div>

            {/* Retention Period & Sanitization Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Statutory Retention Duration:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeRetentionAsset.retentionPeriod}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Secure Sanitization Method:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeRetentionAsset.disposalMethod}</p>
              </div>
            </div>

            {/* Statutory Legal Consequence */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-rose-900/30 text-xs font-mono">
              <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Non-Compliance Legal Liability:</span>
              <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed mt-0.5">{activeRetentionAsset.consequence}</p>
            </div>

            {/* Shredding Output Notification */}
            {isShreddingSimulating && (
              <div className="p-4 bg-emerald-950 border border-emerald-600 text-emerald-200 rounded-xl text-xs font-mono animate-pulse">
                ✔ Cryptographic Erasure Complete: KMS master decryption key permanently purged; all underlying cloud ciphertext rendered mathematically irrecoverable!
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the Access Control &amp; Authentication Triad and the Data Retention &amp; Crypto-Shredding Lifecycle under DPDP Act Section 8.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Access Control Triad */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Access Control &amp; Authentication Triad
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Authentication (FIDO2) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="30" width="135" height="50" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="92" y="50" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">1. AUTHENTICATION</text>
                    <text x="92" y="65" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">FIDO2 Hardware MFA</text>
                  </g>

                  <line x1="160" y1="55" x2="185" y2="55" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple62)" />

                  {/* Step 2: Authorization (RBAC/ABAC) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="30" width="130" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="50" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">2. AUTHORIZATION</text>
                    <text x="250" y="65" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Least Privilege RBAC</text>
                  </g>

                  <line x1="315" y1="55" x2="340" y2="55" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan62)" />

                  {/* Step 3: Accounting (Audit Logs) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="30" width="135" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="407" y="50" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">3. ACCOUNTING</text>
                    <text x="407" y="65" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">180-Day SIEM Logs</text>
                  </g>

                  {/* Bottom Box: Zero Trust Security */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="125" width="450" height="55" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="147" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      DYNAMIC ZERO TRUST IDENTITY GOVERNANCE
                    </text>
                    <text x="250" y="165" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Combines Passphrase + FIDO2 + RBAC/ABAC + JML Automated De-provisioning.
                    </text>
                  </g>

                  <text x="250" y="225" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous access evaluation ensures zero orphaned accounts across all cloud VPCs.
                  </text>

                  <defs>
                    <marker id="arrowPurple62" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                    <marker id="arrowCyan62" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.1: The Access Control &amp; Authentication Triad (Authentication ➔ Authorization ➔ Accounting).
              </p>
            </div>

            {/* Diagram 2: Data Retention Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Data Retention &amp; Crypto-Shredding Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Active Storage */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. ACTIVE USE</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">AES-256 KMS Encrypted</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan63)" />

                  {/* Step 2: Archival Retention */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">2. STATUTORY RETENTION</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">PMLA 5y / CERT-In 180d</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo63)" />

                  {/* Step 3: Purpose Expiry */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="412" y="45" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">3. PURPOSE EXPIRY</text>
                    <text x="412" y="58" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">DPDP Section 8(7)</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Step 4: Crypto-Shredding */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="372" y="125" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8">4. CRYPTO-SHREDDING (A.8.10)</text>
                    <text x="372" y="138" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="6.5">Delete Master KMS Key</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed63)" />

                  {/* Step 5: Sanitized */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="125" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">5. PERMANENTLY SANITIZED</text>
                    <text x="125" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">NIST SP 800-88 Purged</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      STORAGE LIMITATION STATUTORY COMPLIANCE
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Eliminates data hoarding liabilities, completely shielding the firm from ₹250 Cr DPDP fines.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Crypto-shredding guarantees instantaneous data destruction across distributed cloud storage.
                  </text>

                  <defs>
                    <marker id="arrowCyan63" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo63" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowRed63" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.2: The Data Retention and Crypto-Shredding lifecycle under DPDP Act Section 8(7).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Identity &amp; Data Governance Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads automate JML offboarding in Kolkata, execute crypto-shredding in Ichapur, enforce SCADA ABAC in Barrackpore, and simulate IAM pipelines in Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Governance Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Engineering Solution
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines for Identity Architects and Data Protection Officers managing access and retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Identity &amp; Data Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Mandate Long Passphrases:</strong> Require &gt;= 16 characters over complex 8-character strings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Phishing-Proof FIDO2:</strong> Replace SMS OTPs with domain-bound WebAuthn hardware tokens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate JML Offboarding:</strong> De-provision 100% of accounts within 15 minutes of resignation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Cloud Crypto-Shredding:</strong> Delete KMS master keys to sanitize cloud databases instantly.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Policy Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>90-Day Forced Rotation:</strong> Forces users to pick predictable weak variations (`Summer2026!`).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on SMS OTPs:</strong> Highly vulnerable to SIM-swapping and Evilginx phishing kits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Indefinite Data Hoarding:</strong> Keeping customer data forever, triggering massive DPDP Act fines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Orphaned Accounts:</strong> Failing to conduct mandatory quarterly access reviews.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce ABAC Zero Trust:</strong> Verify device compliance and IP context on every login attempt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Screen Breached Passwords:</strong> Block passwords found in known leak databases automatically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180-Day Indian Logs:</strong> Archive immutable SIEM telemetry under IT Act Section 70B.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate Lifecycle Expiry:</strong> Configure S3 Lifecycle rules to auto-delete expired records.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize password modernizations, access control models, and data retention schedules before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Identity &amp; Data Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why NIST SP 800-63B eliminated forced 90-day password rotation: Forcing users to change passwords every 90 days does not improve security; it induces cognitive fatigue, causing users to make trivial, predictable changes (e.g. changing `Kolkata#2025` to `Kolkata#2026`). Prioritizing 16+ character passphrases combined with FIDO2 hardware MFA provides vastly superior, un-phishable protection.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Storage Limitation and Crypto-Shredding satisfy the Indian DPDP Act 2023: Under Section 8(7), retaining personal data after the processing purpose has ended is a direct statutory violation subject to ₹250 Crore penalties. By implementing automated S3 lifecycle expiration and deleting the master KMS key (Crypto-Shredding), you achieve instant, mathematically certified data sanitization under NIST SP 800-88.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud architectures, combine automated Joiner-Mover-Leaver (JML) webhooks with quarterly access reviews under ISO 27001 Control A.8.2 to ensure orphaned credentials and privilege creep are permanently eliminated.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NIST SP 800-63B mandates long passphrases (&gt;= 16 chars) and bans arbitrary rotation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>FIDO2 / WebAuthn hardware tokens eliminate reverse-proxy phishing attacks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Least Privilege (Control A.5.15) restricts user access to minimum job requirements.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>JML (Control A.5.18) mandates automated offboarding in &lt; 15 minutes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8(7) mandates Storage Limitation (erasing expired personal data).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Crypto-shredding (NIST SP 800-88 Purge) deletes master KMS keys to sanitize data.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Password, Access Control, and Data Retention Policies FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Identity Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Password, Access Control, and Data Retention Policies (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Passwords, Access Control, and Data Retention represent the operational frontline of your information security governance. Always remember: enforce modern NIST SP 800-63B passphrases and phishing-resistant FIDO2 hardware MFA under Control A.8.5, structure Role-Based and Attribute-Based Access Control (RBAC/ABAC) to enforce the Principle of Least Privilege, automate JML offboarding within 15 minutes under Control A.5.18, and execute cryptographic erasure (Crypto-Shredding) under NIST SP 800-88 to guarantee unbroken compliance with Section 8(7) of the Indian DPDP Act 2023 and PMLA mandates!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
