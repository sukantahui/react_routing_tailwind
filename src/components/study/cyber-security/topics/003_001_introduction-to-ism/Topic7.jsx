import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: Tier Selector State
  const [selectedTierKey, setSelectedTierKey] = useState("restricted");

  // Studio 2: DLP Asset Evaluator State
  const [selectedAssetKey, setSelectedAssetKey] = useState("aadhaar_kyc_db");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_column_classification");

  // Studio 1: 4-Tier Classification Data
  const classificationTiers = {
    public_tier: {
      key: "public_tier",
      name: "1. Public Data Tier",
      sensitivity: "UNRESTRICTED (Zero Impact if Disclosed)",
      encryptionStandard: "Standard HTTPS (TLS) in transit | No encryption required at rest",
      accessLevel: "Open to general public and external stakeholders",
      disposalSla: "Standard logical file deletion (No forensic sanitization required)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      typicalAssets: [
        "Marketing brochures, published price catalogs, press releases.",
        "Official company annual financial reports filed with SEBI.",
        "Public API documentation and open-source SDK repositories."
      ],
      details:
        "Information explicitly authorized for unrestricted public release. Dissemination causes zero harm to organizational operations, competitive standing, or customer privacy."
    },
    internal_tier: {
      key: "internal_tier",
      name: "2. Internal Use Only Tier",
      sensitivity: "LOW OPERATIONAL (Minor Internal Friction if Leaked)",
      encryptionStandard: "TLS 1.2+ in transit | Standard OS filesystem permissions at rest",
      accessLevel: "All authenticated enterprise employees and contractors",
      disposalSla: "NIST SP 800-88 Clear (Single-pass logical overwrite)",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      typicalAssets: [
        "Internal employee phone directories and Slack channels.",
        "Standard operating procedure (SOP) manuals and internal wikis.",
        "Departmental meeting agendas and corporate holiday calendars."
      ],
      details:
        "Information intended exclusively for internal personnel. While not highly sensitive, unauthorized public disclosure causes operational embarrassment or minor competitive friction."
    },
    confidential_tier: {
      key: "confidential_tier",
      name: "3. Confidential Data Tier",
      sensitivity: "HIGH BUSINESS IMPACT (Severe Financial & Competitive Damage)",
      encryptionStandard: "Mandatory AES-256-GCM at rest | TLS 1.3 in transit | Strict RBAC",
      accessLevel: "Role-based need-to-know access (Departmental authorizations)",
      disposalSla: "NIST SP 800-88 Purge (ATA Secure Erase or Crypto-Erase)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      typicalAssets: [
        "Proprietary software source code and AI model weights.",
        "Q4 financial forecasts, M&A due diligence files, and vendor contracts.",
        "Executive board meeting minutes and strategic business roadmaps."
      ],
      details:
        "Critical commercial and intellectual capital. Unauthorized disclosure causes severe revenue loss, competitive disruption, or breach of non-disclosure agreements (NDAs)."
    },
    restricted_tier: {
      key: "restricted_tier",
      name: "4. Restricted / Highly Confidential Tier",
      sensitivity: "CATASTROPHIC & REGULATED (₹250 Cr DPDP Fine & Fiduciary Breach)",
      encryptionStandard: "FIPS 140-3 HSM Master Keys | AES-256-GCM | mTLS | Hardware FIDO2 MFA",
      accessLevel: "Strict executive / individual authorization with continuous audit logging",
      disposalSla: "NIST SP 800-88 Destroy (Physical shredding < 2mm or Crypto-Shredding)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      typicalAssets: [
        "Customer Aadhaar numbers, PAN cards, banking PINs, and biometric vectors.",
        "Hospital patient oncology radiology DICOM scans and medical histories.",
        "Root payment switch RSA-4096 private keys and SCADA RTU signing keys."
      ],
      details:
        "Highest sensitivity tier. Unauthorized disclosure results in immediate regulatory penalties up to ₹250 Crores under DPDP Act Section 33, legal prosecution, and permanent brand destruction."
    }
  };

  const activeTier = classificationTiers[selectedTierKey];

  // Studio 2: DLP Policy Engine Data
  const sampleDlpAssets = {
    aadhaar_kyc_db: {
      key: "aadhaar_kyc_db",
      name: "Customer Aadhaar & PAN KYC Database",
      contentSnippet: "Aadhaar: 7482 9102 3847 | PAN: ABCDE1234F | Bank: 4092-8172-9102",
      detectedPattern: "Indian Aadhaar UIDAI Regex + PAN Format Match",
      assignedClassification: "RESTRICTED / HIGHLY CONFIDENTIAL",
      enforcedEncryption: "AES-256-GCM (KMS Master Key) + Mutual TLS (mTLS)",
      dlpAction: "BLOCK_AND_ALERT: Block USB Export, Webmail Upload & Local Print",
      dpdpStatus: "100% Compliant with DPDP Act Section 8(5) & Section 33",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    financial_mna_deck: {
      key: "financial_mna_deck",
      name: "Q4 Financial Forecast & M&A Pitch Deck",
      contentSnippet: "Projected Q4 Net Revenue: ₹42.5 Crores | Target Acquisition: FinTech ABC",
      detectedPattern: "Confidential Financial Modeling & Valuation Keywords",
      assignedClassification: "CONFIDENTIAL",
      enforcedEncryption: "AES-256-GCM at Rest | TLS 1.3 in Transit",
      dlpAction: "MONITOR_AND_ENFORCE: Allow internal sharing; block external cloud sync",
      dpdpStatus: "Protected under SEBI Insider Trading Regulations & NDAs",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    employee_directory: {
      key: "employee_directory",
      name: "Internal Employee Phone & Slack Directory",
      contentSnippet: "Mamata (Lead Architect) - Ext: 4021 | Debangshu (OT Lead) - Ext: 4022",
      detectedPattern: "Internal Departmental Contact List",
      assignedClassification: "INTERNAL USE ONLY",
      enforcedEncryption: "Standard TLS in Transit | Domain Authentication",
      dlpAction: "ALLOW_INTERNAL: Permitted for all authenticated staff on intranet",
      dpdpStatus: "Standard enterprise internal operational asset",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    public_brochure: {
      key: "public_brochure",
      name: "Kolkata FinTech Product Services Brochure",
      contentSnippet: "Discover our high-velocity UPI payment switches with 99.999% uptime!",
      detectedPattern: "Public Marketing & Sales Collateral",
      assignedClassification: "PUBLIC",
      enforcedEncryption: "Standard HTTPS Web Delivery (No encryption at rest required)",
      dlpAction: "ALLOW_ALL: Unrestricted global distribution permitted",
      dpdpStatus: "Zero regulatory restrictions; published publicly",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeDlpAsset = sampleDlpAssets[selectedAssetKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_column_classification",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "500-Node Payment DB Column-Level Classification",
      budget: "₹14,50,000",
      challenge: "Support Staff Viewing Plaintext PAN & Aadhaar Numbers",
      dilemma:
        "Customer support staff were viewing plaintext customer PAN and Aadhaar numbers during routine billing triage, creating catastrophic ₹250 Crore DPDP breach liabilities.",
      resolution:
        "Mamata implemented PostgreSQL Column-Level Dynamic Data Masking and automated DLP tagging, ensuring only compliance officers can view Restricted customer PII under DPDP Section 8.",
      metrics: {
        columnsMasked: "100% PAN & Aadhaar Fields",
        supportStaffRestricted: "Dynamic Masking (XXXX-XXXX-1234)",
        dpdpLiabilityAverted: "₹250 Crores Protected",
        compliance: "DPDP Act 2023 & PCI-DSS v4.0"
      }
    },
    {
      id: "ichapur_healthcare_classification",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "4-Tier Healthcare Data Classification Policy",
      budget: "₹8,20,000",
      challenge: "Hospital Staff Treating Cancer Scans with Same Lax Controls as Rosters",
      dilemma:
        "Hospital staff were treating patient oncology DICOM scans with the same lax controls as public rosters, exposing 80,000 patients to unencrypted data leaks.",
      resolution:
        "Mahima authored a 4-tier healthcare data classification standard, enforcing AES-256 encryption and FIDO2 MFA for all Restricted oncology records under NABH and DPDP guidelines.",
      metrics: {
        recordsClassified: "80,000 Oncology Records",
        classificationTier: "RESTRICTED / SENSITIVE HEALTH DATA",
        accessGovernance: "FIDO2 Hardware MFA Enforced",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_secret",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Secret Classification",
      budget: "₹12,80,000",
      challenge: "Single-Line Diagrams and Crypto Keys Stored on Unencrypted Laptops",
      dilemma:
        "Substation single-line diagrams (SLDs) and RTU cryptographic keys were stored on unencrypted laptops, risking state-wide 220kV power grid sabotage.",
      resolution:
        "Debangshu classified all substation SCADA telemetry and cryptographic keys as SECRET / PROTECTED SYSTEM under IT Act Section 70, mandating air-gapped jump hosts and dual-custody hardware key storage.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        scadaClassification: "SECRET / PROTECTED SYSTEM",
        airGapEnforcement: "100% Hardware Key Storage",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_dlp_blp_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Enterprise DLP & Bell-LaPadula Simulator Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling with 'No Write Down' Mathematical Security Rules",
      dilemma:
        "Cybersecurity students struggled to understand how modern DLP software enforces the Bell-LaPadula 'No Write Down' rule to prevent data leaks.",
      resolution:
        "The team built an interactive Bell-LaPadula DLP policy engine in React/Python, training 185+ BCA cyber security students on configuring automated endpoint and cloud DLP rules.",
      metrics: {
        studentsTrained: "185+ Cyber BCA Students",
        dlpRulesEngineered: "40+ Regex Patterns",
        blpMastery: "100% Lab & Exam Proficiency",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 7 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Information Classification Schemes (Public, Confidential, Secret)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Architect granular data protection: master the 4 commercial classification tiers (Public, Internal, Confidential, Restricted), 
            enforce Bell-LaPadula multi-level security properties, deploy automated Data Loss Prevention (DLP) tagging, and prevent catastrophic ₹250 Crore DPDP penalties.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 4-Tier Enterprise Data Classification Studio */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏷️</span> Studio 1: 4-Tier Enterprise Data Classification Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise classification tier to inspect its sensitivity rating, typical assets, encryption baseline, access authorization level, and NIST SP 800-88 disposal SLA.
            </p>
          </div>

          {/* Tier Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(classificationTiers).map((tier) => {
              const isSelected = selectedTierKey === tier.key;
              return (
                <button
                  key={tier.key}
                  onClick={() => setSelectedTierKey(tier.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{tier.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{tier.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Tier Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeTier.badgeClass)}>
                  Tier: {activeTier.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Sensitivity Rating: {activeTier.sensitivity}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Disposal &amp; Sanitization SLA</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activeTier.disposalSla}</span>
              </div>
            </div>

            {/* Typical Assets Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block font-sans">
                Typical Enterprise Information Assets:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {activeTier.typicalAssets.map((asset, idx) => (
                  <div key={idx} className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span className="text-gray-300 leading-relaxed">{asset}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Encryption Baseline & Access Authorization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Mandatory Encryption Baseline:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeTier.encryptionStandard}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Access Authorization &amp; Clearance:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeTier.accessLevel}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Automated Data Classification & DLP Policy Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Studio 2: Automated Data Classification &amp; DLP Policy Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise data asset to test the automated DLP classifier, inspect detected regex patterns, evaluate enforced encryption, and verify DPDP Act compliance.
            </p>
          </div>

          {/* Sample Asset Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(sampleDlpAssets).map((asset) => {
              const isSelected = selectedAssetKey === asset.key;
              return (
                <button
                  key={asset.key}
                  onClick={() => setSelectedAssetKey(asset.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{asset.name.split(" ")[0]} {asset.name.split(" ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{asset.assignedClassification.split(" / ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active DLP Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDlpAsset.badgeClass)}>
                  Classifier Result: {activeDlpAsset.assignedClassification}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeDlpAsset.name}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Pattern Detection</span>
                <span className="text-xs font-bold text-emerald-400">{activeDlpAsset.detectedPattern}</span>
              </div>
            </div>

            {/* Content Snippet & Enforced Encryption */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Sample Content Payload:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-semibold">{activeDlpAsset.contentSnippet}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Automated Cryptographic Enforcement:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold">{activeDlpAsset.enforcedEncryption}</p>
              </div>
            </div>

            {/* DLP Action & DPDP Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">DLP Boundary Enforcement Action:</span>
                <p className="text-rose-300 text-xs sm:text-sm font-bold">{activeDlpAsset.dlpAction}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Statutory Compliance Status:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold">{activeDlpAsset.dpdpStatus}</p>
              </div>
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
              Visualizing the 4-Tier Enterprise Classification Hierarchy Pyramid and the Automated DLP Enforcement Pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Classification Pyramid */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 4-Tier Classification Hierarchy Pyramid
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 4: Restricted (Apex) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="250,20 160,85 340,85" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="55" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="9">4. RESTRICTED</text>
                    <text x="250" y="70" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7.5">Aadhaar • PII • HSM Keys</text>
                  </g>

                  {/* Tier 3: Confidential */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="160,85 110,150 390,150 340,85" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="115" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">3. CONFIDENTIAL</text>
                    <text x="250" y="130" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">Source Code • Financials • M&amp;A</text>
                  </g>

                  {/* Tier 2: Internal */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="110,150 60,215 440,215 390,150" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="180" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">2. INTERNAL USE ONLY</text>
                    <text x="250" y="195" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7.5">Employee Directory • SOPs • Intranet</text>
                  </g>

                  {/* Tier 1: Public (Base) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="60,215 10,270 490,270 440,215" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="240" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9">1. PUBLIC DATA</text>
                    <text x="250" y="255" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">Press Releases • Product Brochures • Marketing</text>
                  </g>

                  <text x="250" y="300" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Security rigor and encryption requirements increase upwards towards the pyramid apex.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.1: The 4-tier enterprise information classification hierarchy pyramid.
              </p>
            </div>

            {/* Diagram 2: DLP Tagging Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Automated DLP Metadata &amp; Enforcement Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Ingestion */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="40" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. DATA INGESTION</text>
                    <text x="87" y="54" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">File / DB Query</text>
                  </g>

                  <line x1="155" y1="42" x2="185" y2="42" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan40)" />

                  {/* Step 2: Classifier */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="40" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. DLP CLASSIFIER</text>
                    <text x="250" y="54" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Regex &amp; AI Pattern</text>
                  </g>

                  <line x1="315" y1="42" x2="345" y2="42" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo40)" />

                  {/* Step 3: Tag Applied */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="20" width="135" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="412" y="40" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. TAG APPLIED</text>
                    <text x="412" y="54" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7">"RESTRICTED"</text>
                  </g>

                  <line x1="412" y1="65" x2="412" y2="105" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Step 4: Boundary Enforcement */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="372" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. BOUNDARY INSPECTION</text>
                    <text x="372" y="139" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Endpoint USB / Network Webmail</text>
                  </g>

                  <line x1="265" y1="127" x2="235" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold40)" />

                  {/* Step 5: Automated Block */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="215" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="127" y="125" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. ACTION TRIGGERED</text>
                    <text x="127" y="139" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">BLOCK Transfer + Alert SOC</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#818cf8" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      BELL-LAPADULA MULTI-LEVEL SECURITY ENFORCEMENT
                    </text>
                    <text x="250" y="224" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      "No Read Up" (Simple Security) + "No Write Down" (* Property) mathematically blocks data leaks.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Automated DLP tagging ensures policies travel with the data across endpoints and networks.
                  </text>

                  <defs>
                    <marker id="arrowCyan40" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo40" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGold40" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.2: The automated DLP metadata classification tagging and boundary blocking pipeline.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Data Classification Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads mask database columns in Kolkata, classify healthcare scans in Ichapur, enforce Secret SCADA telemetry in Barrackpore, and simulate Bell-LaPadula rules in Jadavpur.
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
                  <span>⚡</span> Classification Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Classification Solution
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
              Guidelines for Data Protection Officers and Information Asset Owners establishing classification baselines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Classification Governance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate DLP Metadata Tagging:</strong> Deploy endpoint and cloud DLP agents to discover sensitive PII automatically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Implement Dynamic Data Masking:</strong> Mask customer PAN/Aadhaar fields in queries for support staff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Bell-LaPadula * Property:</strong> Block copying Restricted data into Public/Internal documents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Schedule Re-Classification:</strong> De-classify embargoed financial reports post-SEBI disclosure.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Classification Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Over-Classification:</strong> Marking public marketing flyers as Restricted wastes encryption budgets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Under-Classification:</strong> Leaving customer PII as Internal risks ₹250 Cr DPDP Act Section 33 fines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on Manual Tagging:</strong> Humans forget to tag files; automated DLP regex matching is required.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Deleting Without Key Destruction:</strong> Data remains recoverable from raw flash storage blocks.</span>
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
                  <span><strong>Protect Master Keys in HSMs:</strong> Master private keys for Restricted data must reside in FIPS 140-3 HSMs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Crypto-Shredding in Cloud:</strong> Delete KMS Data Encryption Keys (DEKs) to sanitize cloud storage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Mandatory Hardware MFA:</strong> Require FIDO2 tokens for all access to Restricted databases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain Immutable WORM Logs:</strong> Archive tamper-proof access logs with Section 65B hash certificates.</span>
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
              Synthesize enterprise data classification and DLP enforcement mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Security Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why treating all data equally causes security failure: An organization that attempts to encrypt every single public document with military-grade HSM keys will bankrupt its IT budget and cripple employee productivity, while an organization with lax controls will leave customer Aadhaar and PAN databases exposed, incurring ₹250 Crore statutory fines under the Indian DPDP Act 2023.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the Bell-LaPadula model prevents data leaks: Simple Security ensures a user cannot read data above their clearance level ("No Read Up"), while the * (Star) Property ensures a user with high clearance cannot accidentally or maliciously write high-level confidential data into an unclassified document ("No Write Down").
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud architectures, combine automated metadata tagging with Data Loss Prevention (DLP) engines and Column-Level Data Masking so that classification rules travel dynamically with the data wherever it moves.
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
                <span>4 Commercial Tiers: Public, Internal Use, Confidential, Restricted.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Government Tiers (Official Secrets Act): Top Secret, Secret, Confidential, Unclassified.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Bell-LaPadula: Simple Security (No Read Up) &amp; * Property (No Write Down).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DLP inspects Data in Use (Endpoints), Motion (Network), and Rest (Storage).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 33 penalizes Restricted personal data breaches up to ₹250 Cr.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Restricted data requires AES-256-GCM, FIPS 140-3 HSMs, and mTLS.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Information Classification Schemes (Public, Confidential, Secret) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Data Classification Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Information Classification Schemes (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Information Classification is the compass of enterprise cybersecurity. You must calibrate your defense: classify routine marketing data as Public, operational wikis as Internal, proprietary algorithms as Confidential, and customer PII/SPDI as Restricted. Enforce the Bell-LaPadula multi-level security properties ('No Read Up, No Write Down'), deploy automated Data Loss Prevention (DLP) tagging, and ensure all Restricted personal data is safeguarded to prevent devastating ₹250 Crore penalties under the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
