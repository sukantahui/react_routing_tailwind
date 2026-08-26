import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: Lifecycle Stage Selector State
  const [selectedStageKey, setSelectedStageKey] = useState("destruction_stage");

  // Studio 2: Sanitization Level State
  const [selectedSanitizationKey, setSelectedSanitizationKey] = useState("crypto_shredding");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_crypto_shredding");

  // Studio 1: 6 Lifecycle Stages Data
  const lifecycleStages = {
    creation_stage: {
      key: "creation_stage",
      name: "1. Creation / Collection Stage",
      primaryThreat: "Excessive data collection, lack of valid consent, unclassified ingestion.",
      cryptographicControl: "Input validation, SHA-256 schema hashing, and automated classification metadata tagging.",
      dpdpMandate: "DPDP Section 6 (Consent Governance) & Section 8 (Purpose Limitation & Data Minimization).",
      operationalRule: "Collect ONLY the minimum data fields strictly required for service execution.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    storage_stage: {
      key: "storage_stage",
      name: "2. Storage Stage (Data at Rest)",
      primaryThreat: "Unencrypted disk theft, unauthorized database dumps, cloud snapshot leaks.",
      cryptographicControl: "AES-256-GCM encryption at rest, FIPS 140-3 HSM master keys, and column-level masking.",
      dpdpMandate: "DPDP Section 8(5) (Reasonable Technical Safeguards) to prevent data breach penalties.",
      operationalRule: "Master encryption keys must be managed in dedicated HSMs and rotated annually.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    usage_stage: {
      key: "usage_stage",
      name: "3. Usage / Processing Stage (Data in Use)",
      primaryThreat: "Privilege creep, memory injection malware, unmonitored administrative viewing.",
      cryptographicControl: "Confidential Computing (Intel SGX / AMD SEV TEE enclaves) and dynamic memory encryption.",
      dpdpMandate: "Role-Based Access Control (RBAC) and strict need-to-know access governance.",
      operationalRule: "Execute sensitive computations inside hardware enclaves; enforce JML privilege reviews.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    sharing_stage: {
      key: "sharing_stage",
      name: "4. Sharing / Transfer Stage (Data in Motion)",
      primaryThreat: "Man-in-the-middle sniffing, unencrypted partner APIs, endpoint USB exfiltration.",
      cryptographicControl: "Mutual TLS (mTLS v1.3 with Certificate Pinning), payload tokenization, and Network DLP.",
      dpdpMandate: "DPDP Section 8(6) & Third-Party Risk Management (TPRM) contractual SLAs.",
      operationalRule: "Enforce end-to-end payload encryption; block unauthorized cloud transfers via CASB.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    archival_stage: {
      key: "archival_stage",
      name: "5. Archival / Retention Stage",
      primaryThreat: "Ransomware encryption of backups, accidental deletion, tampering with audit trails.",
      cryptographicControl: "Write-Once-Read-Many (WORM) storage (AWS S3 Object Lock in Compliance Mode) + AES-256.",
      dpdpMandate: "Statutory compliance with RBI (5-7 years) and CERT-In (180 days rolling log retention).",
      operationalRule: "Lock compliance logs in immutable WORM storage; generate SHA-256 Section 65B hashes.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    destruction_stage: {
      key: "destruction_stage",
      name: "6. Destruction / Sanitization Stage",
      primaryThreat: "Data remanence on discarded disks, forensic recovery of retired cloud storage.",
      cryptographicControl: "NIST SP 800-88 Crypto-Shredding (KMS key deletion) or physical shredding (< 2mm).",
      dpdpMandate: "DPDP Section 8(7) (Mandatory Storage Limitation & Erasure once purpose is served).",
      operationalRule: "Permanently destroy encryption keys or physically disintegrate media; issue 65B certificates.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activeStage = lifecycleStages[selectedStageKey];

  // Studio 2: Sanitization Levels Data
  const sanitizationMethods = {
    clear_level: {
      key: "clear_level",
      name: "1. NIST SP 800-88 Clear (Logical Overwrite)",
      command: "$ dd if=/dev/zero of=/dev/sdb bs=4M status=progress",
      recoveryRisk: "LOW RISK (Blocks simple software tools; vulnerable to laboratory forensic imaging)",
      mediaSuitability: "Internal reuse of hard drives and magnetic storage within the same organization",
      complianceCert: "Internal IT Asset Re-Deployment Certificate",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      details:
        "Overwrites all logical addressable storage sectors with standard read/write commands (e.g. single pass 0x00). Suitable when storage media remains within enterprise control."
    },
    purge_level: {
      key: "purge_level",
      name: "2. NIST SP 800-88 Purge (Firmware / Cryptographic Erase)",
      command: "$ blkdiscard --secure /dev/nvme0n1 OR nvme format -s 2 /dev/nvme0n1",
      recoveryRisk: "VERY LOW RISK (Blocks state-of-the-art laboratory magnetic/flash recovery)",
      mediaSuitability: "Releasing hardware to third-party recyclers, leasing vendors, or off-site storage",
      complianceCert: "Certified Cryptographic Sanitization Certificate (ISO 27001 Annex A.8.14)",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      details:
        "Executes low-level controller commands (ATA Secure Erase or NVMe Cryptographic Format) to alter internal flash voltage thresholds and sanitize hidden over-provisioned blocks."
    },
    crypto_shredding: {
      key: "crypto_shredding",
      name: "3. Cloud Crypto-Shredding & NIST Destroy",
      command: "$ aws kms schedule-key-deletion --key-id K --pending-window-in-days 7",
      recoveryRisk: "IMPOSSIBLE ($2^{256}$ Brute-Force Mathematical Barrier)",
      mediaSuitability: "Multi-tenant cloud storage (AWS S3, Azure Blob) & Physical drive decommissioning",
      complianceCert: "DPDP Section 8(7) Statutory Media Destruction Certificate (Section 65B Compliant)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      details:
        "Permanently deletes the Data Encryption Key (DEK) inside the hardware HSM. Ciphertext stored across distributed cloud servers instantly becomes useless mathematical noise."
    }
  };

  const activeSanitization = sanitizationMethods[selectedSanitizationKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_crypto_shredding",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Automated DPDP Storage Limitation & Crypto-Shredding",
      budget: "₹14,50,000",
      challenge: "Hoarding 8 Years of Expired Payment Records in Cloud Storage",
      dilemma:
        "A 500-node payment switch was hoarding 8 years of customer transaction records, violating DPDP Section 8(7) storage limitation rules and risking ₹250 Crore fines.",
      resolution:
        "Mamata built an automated S3 lifecycle engine and KMS crypto-shredding pipeline, automatically erasing encryption keys for expired records and eliminating regulatory penalty risks.",
      metrics: {
        expiredRecordsShredded: "12.4 Million Transactions",
        cryptoShreddingSla: "Instant Automated Erasure",
        dpdpLiabilityAverted: "₹250 Crores Protected",
        compliance: "DPDP Act Section 8(7) & RBI Guidelines"
      }
    },
    {
      id: "ichapur_worm_archival",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "10-Year Immutable WORM Healthcare Archival",
      budget: "₹8,20,000",
      challenge: "Oncology Patient Scans Vulnerable to Ransomware Tampering",
      dilemma:
        "Hospital oncology imaging scans risked ransomware tampering during mandatory 10-year clinical retention under National Medical Commission guidelines.",
      resolution:
        "Mahima deployed AWS S3 Object Lock in Compliance Mode with AES-256 encryption, creating an immutable WORM archive for 80,000 cancer patient records under NABH guidelines.",
      metrics: {
        recordsLocked: "80,000 Oncology Records",
        wormComplianceMode: "10-Year Immutability Enforced",
        ransomwareTampering: "0.00% Tamper Proof",
        compliance: "NABH Hospital Guidelines & DPDP Act"
      }
    },
    {
      id: "barrackpore_scada_disposal",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation Air-Gapped SCADA Lifecycle",
      budget: "₹12,80,000",
      challenge: "Retired Substation RTU Hard Drives Disposed of Without Sanitization",
      dilemma:
        "Retired substation RTU hard drives were being disposed of without certified sanitization, leaving 220kV power grid ladder logic recoverable by adversaries.",
      resolution:
        "Debangshu enforced a strict NIST SP 800-88 Destroy protocol, deploying an on-site industrial particulate shredder (< 2mm) and issuing signed Section 65B destruction certificates.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        physicalShredding: "< 2mm Particulate Disintegration",
        destructionCertificates: "100% Section 65B Compliant",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_lifecycle_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Data Lifecycle Simulator & Crypto-Shredding Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling with Cloud Media Sanitization Concepts",
      dilemma:
        "Students struggled to understand how cloud storage assets are sanitized without physical disk destruction and how WORM storage prevents ransomware tampering.",
      resolution:
        "The team developed an interactive Python/OpenSSL Crypto-Shredding simulator and WORM ledger engine, training 180+ BCA cyber security students on media sanitization standards.",
      metrics: {
        studentsTrained: "180+ Cyber BCA Students",
        cryptoShredSimulations: "50+ Multi-Cloud Scenarios",
        examMastery: "100% Lifecycle Standards Proficiency",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 8 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Data Lifecycle Security Management
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Protect data across all states and stages: master the 6 universal lifecycle phases (Create ➔ Store ➔ Use ➔ Share ➔ Archive ➔ Destroy), 
            deploy confidential computing enclaves for data in use, enforce WORM archival, and master NIST SP 800-88 Crypto-Shredding under DPDP Act Section 8(7).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 6-Stage Data Lifecycle Security Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 1: 6-Stage Data Lifecycle Security Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select any of the 6 data lifecycle stages to inspect primary threat vectors, mandatory cryptographic safeguards, statutory DPDP Act mandates, and operational rules.
            </p>
          </div>

          {/* Stage Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {Object.values(lifecycleStages).map((stage) => {
              const isSelected = selectedStageKey === stage.key;
              return (
                <button
                  key={stage.key}
                  onClick={() => setSelectedStageKey(stage.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{stage.name.split(". ")[1]?.split(" ")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{stage.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeStage.badgeClass)}>
                  Lifecycle Stage: {activeStage.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Operational Rule: {activeStage.operationalRule}
                </h3>
              </div>
            </div>

            {/* Threats vs Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Primary Threat Vectors:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeStage.primaryThreat}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Mandatory Cryptographic Safeguards:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeStage.cryptographicControl}</p>
              </div>
            </div>

            {/* DPDP Act Mandate */}
            <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1 text-xs font-mono">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Statutory Indian Compliance Mandate:</span>
              <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed">{activeStage.dpdpMandate}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Cloud Crypto-Shredding & Sanitization Simulator (NIST SP 800-88) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧹</span> Studio 2: Cloud Crypto-Shredding &amp; Sanitization Studio (NIST SP 800-88)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a media sanitization protocol to inspect execution shell commands, forensic recovery resistance, media suitability, and compliance certificates.
            </p>
          </div>

          {/* Sanitization Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(sanitizationMethods).map((san) => {
              const isSelected = selectedSanitizationKey === san.key;
              return (
                <button
                  key={san.key}
                  onClick={() => setSelectedSanitizationKey(san.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200">{san.name.split(" (")[0]}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{san.mediaSuitability.split(" ")[0]} {san.mediaSuitability.split(" ")[1]} Storage</div>
                </button>
              );
            })}
          </div>

          {/* Active Sanitization Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSanitization.badgeClass)}>
                  Protocol: {activeSanitization.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Recovery Risk: {activeSanitization.recoveryRisk}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Audit Certificate</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activeSanitization.complianceCert}</span>
              </div>
            </div>

            {/* Execution Command & Media Suitability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Execution Shell / API Command:</span>
                <code className="text-emerald-300 text-xs sm:text-sm font-bold block bg-gray-950 p-2.5 rounded-lg border border-gray-800">
                  {activeSanitization.command}
                </code>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Media Suitability &amp; Application:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-semibold">{activeSanitization.mediaSuitability}</p>
              </div>
            </div>

            {/* Method Details */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">
                Sanitization Technical Architecture:
              </span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeSanitization.details}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 6-Stage Universal Data Lifecycle Security Wheel and the Three States of Data (Rest, Motion, Use).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Lifecycle Security Wheel */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 6-Stage Universal Data Lifecycle Wheel
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Create */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="40" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. CREATE</text>
                    <text x="87" y="54" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Minimization + Tag</text>
                  </g>

                  <line x1="155" y1="42" x2="185" y2="42" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan41)" />

                  {/* Step 2: Store */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="40" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. STORE</text>
                    <text x="250" y="54" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">AES-256 at Rest</text>
                  </g>

                  <line x1="315" y1="42" x2="345" y2="42" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo41)" />

                  {/* Step 3: Use */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="20" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="412" y="40" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. USE</text>
                    <text x="412" y="54" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Confidential TEE</text>
                  </g>

                  <line x1="412" y1="65" x2="412" y2="105" stroke="#10b981" strokeWidth="1.5" />

                  {/* Step 4: Share */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="105" width="135" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="412" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. SHARE</text>
                    <text x="412" y="139" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">mTLS + DLP Filter</text>
                  </g>

                  <line x1="345" y1="127" x2="315" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold41)" />

                  {/* Step 5: Archive */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="105" width="130" height="45" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="250" y="125" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. ARCHIVE</text>
                    <text x="250" y="139" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">WORM Immutability</text>
                  </g>

                  <line x1="185" y1="127" x2="155" y2="127" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple41)" />

                  {/* Step 6: Destroy */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="135" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="87" y="125" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8.5">6. DESTROY</text>
                    <text x="87" y="139" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7">Crypto-Shredding</text>
                  </g>

                  {/* Bottom Summary Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#818cf8" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      DPDP ACT SECTION 8(7) STORAGE LIMITATION
                    </text>
                    <text x="250" y="224" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Mandatory cryptographic erasure of personal data once business purpose is fulfilled.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous lifecycle governance ensures zero unprotected windows from creation to destruction.
                  </text>

                  <defs>
                    <marker id="arrowCyan41" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo41" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGold41" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowPurple41" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.1: The 6-Stage Universal Data Lifecycle Security Wheel.
              </p>
            </div>

            {/* Diagram 2: The Three Data States */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The Three Data States (Rest, Motion, Use)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* State 1: Data at Rest */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="135" height="110" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="92" y="47" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9">DATA AT REST</text>
                    <text x="35" y="70" fill="#c7d2fe" font-family="monospace" fontSize="7.5">• Hard Drives &amp; S3</text>
                    <text x="35" y="88" fill="#c7d2fe" font-family="monospace" fontSize="7.5">• AES-256-GCM</text>
                    <text x="35" y="106" fill="#34d399" font-family="monospace" fontSize="7.5">• FIPS 140-3 HSM Keys</text>
                  </g>

                  {/* State 2: Data in Motion */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="25" width="140" height="110" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">DATA IN MOTION</text>
                    <text x="190" y="70" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Network &amp; APIs</text>
                    <text x="190" y="88" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Mutual TLS (mTLS 1.3)</text>
                    <text x="190" y="106" fill="#34d399" font-family="monospace" fontSize="7.5">• Payload Tokenization</text>
                  </g>

                  {/* State 3: Data in Use */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="25" width="135" height="110" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="407" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9">DATA IN USE</text>
                    <text x="350" y="70" fill="#d1fae5" font-family="monospace" fontSize="7.5">• CPU RAM &amp; Compute</text>
                    <text x="350" y="88" fill="#d1fae5" font-family="monospace" fontSize="7.5">• Confidential TEE</text>
                    <text x="350" y="106" fill="#34d399" font-family="monospace" fontSize="7.5">• Memory Enclaves</text>
                  </g>

                  {/* Bottom: Complete State Protection */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="165" width="450" height="75" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="187" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      TOTAL THREE-STATE DATA RESILIENCE
                    </text>
                    <text x="250" y="205" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8">
                      Encrypt on Disk ➔ Encrypt on Wire ➔ Encrypt in RAM Enclave!
                    </text>
                    <text x="250" y="222" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Guarantees zero plaintexts accessible to root attackers or untrusted hypervisors.
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Data protection across all three states eliminates memory dumps and wiretapping vectors.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.2: The Three States of Data (Rest, Motion, Use) and required cryptographic controls.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Data Lifecycle Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads automate storage limitation in Kolkata, deploy immutable healthcare WORM storage in Ichapur, shred substation RTU media in Barrackpore, and simulate crypto-shredding in Jadavpur.
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
                  <span>⚡</span> Lifecycle Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Lifecycle Solution
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
              Guidelines for Data Protection Officers and cloud storage architects managing lifecycle security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Lifecycle Governance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Cloud Crypto-Shredding:</strong> Delete KMS Data Encryption Keys (DEKs) to sanitize cloud storage instantly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce WORM Archival:</strong> Use AWS S3 Object Lock in compliance mode to block ransomware tampering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Practice Data Minimization:</strong> Collect only what is strictly necessary during the Creation stage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Generate SHA-256 Hashes at Ingestion:</strong> Preserve Section 65B court evidence admissibility.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Lifecycle Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on Simple File Deletion:</strong> Leaves raw bytes recoverable from underlying flash sectors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Hoarding Customer Records:</strong> Indefinite storage violates DPDP Section 8(7) Storage Limitation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unencrypted Memory in RAM:</strong> Leaves Data in Use vulnerable to root process memory dumps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Storing Keys with Encrypted Data:</strong> If the disk is stolen, the attacker gets both ciphertext and key.</span>
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
                  <span><strong>Adopt Confidential Computing:</strong> Execute sensitive computations inside Intel SGX / AMD SEV enclaves.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Mutual TLS (mTLS):</strong> Authenticate both client and server microservices with X.509 certs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate JML Identity Lifecycle:</strong> De-provision departing employee access in &lt; 15 mins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Physically Shred Discarded SSDs:</strong> Reduce decommissioned flash media to &lt; 2mm particulate.</span>
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
              Synthesize data lifecycle stages and sanitization standards before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Storage Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why data security is an unbroken chain across all 6 lifecycle stages: If an organization secures data during creation and storage, but transmits it over an unencrypted HTTP API or disposes of old hard drives without NIST SP 800-88 sanitization, the entire multi-crore investment is undermined and customer records will be stolen.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Crypto-Shredding sanitizes multi-tenant cloud storage: Because you cannot physically destroy shared hardware in AWS or Azure, deleting the Data Encryption Key (DEK) inside your Key Management Service (KMS) instantly renders the ciphertext mathematically undecryptable ($2^{256}$ barrier) in full compliance with DPDP Act Section 8(7).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud architectures, combine Write-Once-Read-Many (WORM) storage for immutable audit logs with automated Time-To-Live (TTL) retention partition dropping to enforce Storage Limitation under the Indian DPDP Act 2023.
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
                <span>6 Lifecycle Stages: Create ➔ Store ➔ Use ➔ Share ➔ Archive ➔ Destroy.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3 Data States: At Rest (AES-256), In Motion (mTLS), In Use (Confidential TEE).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NIST SP 800-88 Sanitization: Clear (Logical), Purge (Crypto), Destroy (Physical).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Crypto-Shredding destroys KMS encryption keys to sanitize cloud storage.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8(7) mandates Storage Limitation &amp; automated erasure.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>WORM storage prevents ransomware from encrypting or deleting audit logs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Data Lifecycle Security Management FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Data Lifecycle Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Data Lifecycle Security Management (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Managing security across the entire data lifecycle is the hallmark of an elite cybersecurity architect. Protect Data at Rest with AES-256-GCM, Data in Motion with Mutual TLS (mTLS), and Data in Use with hardware Confidential Computing enclaves. Lock your compliance archives in immutable WORM storage, enforce automated Storage Limitation under Section 8(7) of the Indian DPDP Act 2023, and deploy NIST SP 800-88 Crypto-Shredding to ensure zero residual data remanence!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
