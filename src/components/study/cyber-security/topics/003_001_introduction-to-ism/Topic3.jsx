import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio 1: IAR Asset Selector State
  const [selectedAssetKey, setSelectedAssetKey] = useState("banking_postgres");

  // Studio 2: Asset Valuation Sliders State
  const [replacementCostLakhs, setReplacementCostLakhs] = useState(25); // ₹25 Lakhs
  const [downtimeLossLakhs, setDowntimeLossLakhs] = useState(60); // ₹60 Lakhs
  const [dpdpLiabilityCrores, setDpdpLiabilityCrores] = useState(15); // ₹15 Crores
  const [ipLossLakhs, setIpLossLakhs] = useState(40); // ₹40 Lakhs

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_iar_automation");

  // Studio 1: IAR Assets Data
  const iarAssets = {
    banking_postgres: {
      key: "banking_postgres",
      assetId: "AST-FIN-042",
      name: "1. Core Banking PostgreSQL Cluster",
      category: "Customer Financial & Transaction Data",
      owner: "Chief Financial Officer (CFO)",
      custodian: "Lead Database Administrator (DBA)",
      classification: "RESTRICTED / HIGHLY CONFIDENTIAL",
      storageLocation: "AWS ap-south-1 (Mumbai) Multi-AZ Encrypted EBS",
      retentionSla: "Statutory 7-Year WORM Storage",
      compliance: "DPDP Act 2023 Section 8, RBI Master Direction, PCI-DSS v4.0",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      details:
        "Stores primary customer savings accounts, UPI transaction ledgers, and KYC records. Compromise results in direct financial fraud and maximum ₹250 Crore DPDP statutory penalties."
    },
    ai_fraud_model: {
      key: "ai_fraud_model",
      name: "2. AI Fraud Detection Model Weights",
      assetId: "AST-AIP-018",
      category: "Intellectual Property & Proprietary Algorithms",
      owner: "Head of AI & Data Science",
      custodian: "Lead MLOps Security Engineer",
      classification: "CONFIDENTIAL / TRADE SECRET",
      storageLocation: "Private Kubernetes ML Model Registry (Encrypted NVMe)",
      retentionSla: "Continuous Versioned Lifecycle (10 Years)",
      compliance: "Copyright Act 1957, Patents Act, ISO/IEC 27001 Clause 5.9",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      details:
        "Trained on 40 million financial transactions to block zero-day UPI account takeovers in real time. Theft or tampering allows attackers to bypass fraud scoring filters."
    },
    oncology_pacs: {
      key: "oncology_pacs",
      name: "3. Oncology DICOM Imaging Archive",
      assetId: "AST-HLT-089",
      category: "Sensitive Healthcare Data (SPDI)",
      owner: "Chief Medical Officer (CMO)",
      custodian: "Hospital PACS Storage Administrator",
      classification: "RESTRICTED / SENSITIVE PERSONAL DATA",
      storageLocation: "On-Premises Hybrid Cloud PACS Storage Area Network (SAN)",
      retentionSla: "Medical Council Mandatory 10-Year Retention",
      compliance: "NABH Hospital Guidelines, DPDP Act 2023, Section 43A IT Act",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      details:
        "Houses high-resolution MRI, CT, and PET radiology scans for 80,000 cancer patients. Data corruption or unencrypted exposure endangers clinical surgeries and incurs legal liability."
    },
    substation_rtu_keys: {
      key: "substation_rtu_keys",
      name: "4. 220kV Substation RTU Firmware & Keys",
      assetId: "AST-CII-004",
      category: "Critical Information Infrastructure (CII)",
      owner: "Executive Director of Grid Transmission",
      custodian: "Principal OT Security Architect",
      classification: "RESTRICTED / PROTECTED SYSTEM ASSET",
      storageLocation: "Air-gapped FIPS 140-3 Hardware Security Module (HSM)",
      retentionSla: "Permanent Operational Lifecycle",
      compliance: "IT Act 2000 Section 70 (NCIIPC), CEA Cyber Security Regulations",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      details:
        "Master cryptographic signing keys and PLC ladder logic configurations for 18 high-voltage 220kV transmission substations. Designated as Protected Systems under Indian law."
    }
  };

  const activeAsset = iarAssets[selectedAssetKey];

  // Studio 2: Valuation Calculation
  const totalValuationFormatted = useMemo(() => {
    const totalRupees =
      replacementCostLakhs * 100000 +
      downtimeLossLakhs * 100000 +
      dpdpLiabilityCrores * 10000000 +
      ipLossLakhs * 100000;

    const crores = (totalRupees / 10000000).toFixed(2);
    return "₹" + crores + " Crores (₹" + Math.round(totalRupees).toLocaleString("en-IN") + ")";
  }, [replacementCostLakhs, downtimeLossLakhs, dpdpLiabilityCrores, ipLossLakhs]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_iar_automation",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "1,500-Table ISO 27001 Asset Register Automation",
      budget: "₹14,50,000",
      challenge: "1,500+ Uncatalogued Microservice Database Tables & API Tokens",
      dilemma:
        "Cloud microservice sprawl resulted in 1,500+ uncatalogued database tables, orphan S3 snapshots, and unmonitored API keys across 500 payment nodes.",
      resolution:
        "Mamata automated the discovery and classification of all cloud assets into an ISO 27001 IAR, eliminating 100% of unmanaged orphan databases and meeting RBI compliance.",
      metrics: {
        tablesCatalogued: "1,500+ Database Tables",
        orphanAssetsPurged: "100% Sprawl Eliminated",
        assetOwnersAssigned: "100% Accountable Owners",
        compliance: "ISO/IEC 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_pacs_valuation",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "80,000-Record Oncology PACS Asset Valuation",
      budget: "₹8,20,000",
      challenge: "Quantifying Asset Value of 80,000 Cancer Scans for Insurance",
      dilemma:
        "Hospital executives struggled to quantify the asset value of 80,000 patient imaging records to negotiate appropriate cyber insurance coverage under DPDP Act rules.",
      resolution:
        "Mahima conducted quantitative valuation (₹18.5 Crores total criticality value) and deployed immutable WORM archival, reducing insurance premiums by 22% under DPDP Section 8 guidelines.",
      metrics: {
        recordsValued: "80,000 Oncology Records",
        assetValueCalculated: "₹18.5 Crores Asset Valuation",
        insuranceDiscount: "22% Premium Reduction",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_cii_iar",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA CII Asset Register",
      budget: "₹12,80,000",
      challenge: "PLC Ladder Logic and Crypto Signing Keys Lacking Ownership",
      dilemma:
        "Substation PLC ladder logic and cryptographic signing keys lacked formal asset ownership and classification, exposing 220kV transmission grids to unmonitored changes.",
      resolution:
        "Debangshu designated all substation SCADA configurations as Protected System Assets under IT Act Section 70, enforcing dual-custody hardware key management and NCIIPC security compliance.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        ciiProtection: "100% NCIIPC Guidelines Implemented",
        unauthorizedChanges: "0.00% Zero Disruption",
        compliance: "IT Act Section 70 & CEA Regulations"
      }
    },
    {
      id: "jadavpur_crypto_shredding_lab",
      lead: "Abhronila & Susmita",
      role: "University Security Research Leads",
      location: "Jadavpur University AI Labs",
      title: "NIST SP 800-88 Crypto-Shredding Laboratory",
      budget: "₹4,50,000",
      challenge: "Teaching Students Cloud Data Sanitization without Physical Shredding",
      dilemma:
        "Students struggled to understand how cloud storage assets are sanitized without physical disk destruction and how Section 65B electronic evidence certificates are generated.",
      resolution:
        "The team authored an interactive Python/OpenSSL crypto-shredding simulator demonstrating KMS key deletion and Section 65B electronic certificate generation, training 170+ students.",
      metrics: {
        studentsTrained: "170+ Cyber BCA Students",
        sanitizationProtocols: "NIST SP 800-88 Clear, Purge, Destroy",
        evidenceCertificates: "100% Section 65B Admissibility",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 3 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Information as an Organizational Asset
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the primary capital of the modern digital enterprise: establish an ISO/IEC 27001 Information Asset Register (IAR), 
            distinguish Asset Owners from Technical Custodians, master NIST SP 800-88 sanitization &amp; crypto-shredding, and preserve Section 65B court evidence admissibility.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Information Asset Register (IAR) Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🗄️</span> Studio 1: ISO 27001 Information Asset Register (IAR) Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise asset archetype to inspect its Asset Owner, Technical Custodian, security classification, storage location, and statutory legal dependencies.
            </p>
          </div>

          {/* Asset Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(iarAssets).map((asset) => {
              const isSelected = selectedAssetKey === asset.key;
              return (
                <button
                  key={asset.key}
                  onClick={() => setSelectedAssetKey(asset.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{asset.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{asset.assetId}</div>
                </button>
              );
            })}
          </div>

          {/* Active Asset Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeAsset.badgeClass)}>
                  Asset ID: {activeAsset.assetId} • {activeAsset.classification}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeAsset.name}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Asset Category</span>
                <span className="text-xs sm:text-sm font-extrabold text-indigo-300">{activeAsset.category}</span>
              </div>
            </div>

            {/* Owner vs Custodian Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Asset Owner (Accountable Executive):</span>
                <span className="text-emerald-400 text-xs sm:text-sm font-bold">{activeAsset.owner}</span>
                <p className="text-[10px] text-gray-400 font-sans">Approves access authorizations and sets data classification level.</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Asset Custodian (Technical Specialist):</span>
                <span className="text-purple-300 text-xs sm:text-sm font-bold">{activeAsset.custodian}</span>
                <p className="text-[10px] text-gray-400 font-sans">Implements technical encryption, daily backups, and access control lists.</p>
              </div>
            </div>

            {/* Storage & Legal Mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Storage Venue &amp; Retention SLA:</span>
                <p className="text-gray-300 font-semibold">{activeAsset.storageLocation} • {activeAsset.retentionSla}</p>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block">Statutory Compliance Mandates:</span>
                <p className="text-gray-300 font-semibold">{activeAsset.compliance}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Quantitative Asset Criticality Valuation Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💰</span> Studio 2: Quantitative Asset Criticality Valuation Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust economic risk dimensions to compute the total comprehensive asset criticality value (Asset Replacement Cost + Business Downtime + DPDP Liability + Competitive Loss).
            </p>
          </div>

          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-950 text-emerald-300 border-emerald-800">
                  Total Asset Criticality Valuation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {totalValuationFormatted}
                </h3>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Formula: Replacement + Downtime + DPDP + IP Loss
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-cyan-400">1. Asset Replacement / Recreation Cost:</span>
                  <span className="text-white font-mono">₹{replacementCostLakhs} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={replacementCostLakhs}
                  onChange={(e) => setReplacementCostLakhs(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                /&gt;
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-amber-400">2. Business Downtime &amp; SLA Penalties:</span>
                  <span className="text-white font-mono">₹{downtimeLossLakhs} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={downtimeLossLakhs}
                  onChange={(e) => setDowntimeLossLakhs(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                /&gt;
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-rose-400">3. DPDP Section 33 Regulatory Fine Exposure:</span>
                  <span className="text-white font-mono">₹{dpdpLiabilityCrores} Crores</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={dpdpLiabilityCrores}
                  onChange={(e) => setDpdpLiabilityCrores(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                /&gt;
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-purple-400">4. Competitive Advantage &amp; IP Loss:</span>
                  <span className="text-white font-mono">₹{ipLossLakhs} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={ipLossLakhs}
                  onChange={(e) => setIpLossLakhs(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                /&gt;
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
              Visualizing the 6-Stage Information Asset Security Lifecycle and the Asset Owner vs Custodian Governance Relational Model.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 6-Stage Asset Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 6-Stage Information Asset Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Create */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="40" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. CREATE</text>
                    <text x="87" y="54" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Classification Tag</text>
                  </g>

                  {/* Arrow 1 */}
                  <line x1="155" y1="42" x2="185" y2="42" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan38)" />

                  {/* Step 2: Store */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="40" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. STORE</text>
                    <text x="250" y="54" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">AES-256 at Rest</text>
                  </g>

                  {/* Arrow 2 */}
                  <line x1="315" y1="42" x2="345" y2="42" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo38)" />

                  {/* Step 3: Use */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="20" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="412" y="40" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. USE</text>
                    <text x="412" y="54" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">RBAC + Audit Logs</text>
                  </g>

                  {/* Arrow Down to Row 2 */}
                  <line x1="412" y1="65" x2="412" y2="105" stroke="#10b981" strokeWidth="1.5" />

                  {/* Step 4: Share */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="105" width="135" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="412" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. SHARE</text>
                    <text x="412" y="139" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">mTLS + DLP Filter</text>
                  </g>

                  {/* Arrow Left */}
                  <line x1="345" y1="127" x2="315" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold38)" />

                  {/* Step 5: Archive */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="105" width="130" height="45" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="250" y="125" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. ARCHIVE</text>
                    <text x="250" y="139" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">WORM Storage</text>
                  </g>

                  {/* Arrow Left */}
                  <line x1="185" y1="127" x2="155" y2="127" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple38)" />

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
                      NIST SP 800-88 SANITIZATION STANDARDS
                    </text>
                    <text x="250" y="224" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Clear (Logical) ➔ Purge (Crypto/Degauss) ➔ Destroy (Physical &lt; 2mm Shred)
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Every stage in the information asset lifecycle requires distinct cryptographic and policy controls.
                  </text>

                  <defs>
                    <marker id="arrowCyan38" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo38" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGold38" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowPurple38" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.1: The 6-Stage Information Asset Security Lifecycle from creation to NIST SP 800-88 sanitization.
              </p>
            </div>

            {/* Diagram 2: Asset Owner vs Custodian Governance Model */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Asset Owner vs. Asset Custodian Governance
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Asset Owner */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="110" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="130" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9.5">ASSET OWNER (Business)</text>
                    <text x="40" y="70" fill="#67e8f9" font-family="monospace" fontSize="8">• Approves User Access Roles</text>
                    <text x="40" y="90" fill="#67e8f9" font-family="monospace" fontSize="8">• Sets Classification Level</text>
                    <text x="40" y="110" fill="#a5f3fc" font-family="monospace" fontSize="8">• Fiduciary &amp; Legal Accountability</text>
                  </g>

                  {/* Right: Asset Custodian */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="110" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="370" y="47" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">ASSET CUSTODIAN (Technical)</text>
                    <text x="280" y="70" fill="#c7d2fe" font-family="monospace" fontSize="8">• Implements AES-256 Encryption</text>
                    <text x="280" y="90" fill="#c7d2fe" font-family="monospace" fontSize="8">• Configures Immutable Backups</text>
                    <text x="280" y="110" fill="#e0e7ff" font-family="monospace" fontSize="8">• Enforces Access Control Lists</text>
                  </g>

                  {/* Bottom: The Information Asset */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="165" width="450" height="75" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="187" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      THE INFORMATION ASSET (Database / Model / Key)
                    </text>
                    <text x="250" y="205" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8">
                      Owner specifies policy ➔ Custodian executes technical controls ➔ Asset Protected!
                    </text>
                    <text x="250" y="222" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Accompanied by Section 65B Certificate for Legal Evidence Admissibility in Indian Courts.
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Separation of duties between Asset Owners and Custodians ensures uncompromised governance.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.2: Governance relational model separating business ownership from technical custodianship.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Information Asset Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads automate asset registers in Kolkata, conduct healthcare data valuations in Ichapur, map SCADA assets in Barrackpore, and simulate crypto-shredding in Jadavpur.
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
                &gt;
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
                  <span>⚡</span> Asset Sprawl Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Asset Governance Solution
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
              Guidelines for Information Asset Custodians and enterprise risk managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Asset Governance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain Automated IAR:</strong> Deploy cloud agents to discover orphan databases and S3 buckets continuously.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Owner vs Custodian Separation:</strong> Never let technical staff set their own access rights.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Cloud Crypto-Shredding:</strong> Delete KMS Data Encryption Keys (DEKs) to sanitize cloud storage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Generate Section 65B Certificates:</strong> Archive tamper-proof SHA-256 hashes for court evidence.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Asset Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting Asset Sprawl:</strong> Forgotten test databases and snapshots leak live customer records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Deleting Files Without Key Destruction:</strong> Data remains recoverable from physical flash blocks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Treating Hardware as the Primary Asset:</strong> Physical servers are cheap; proprietary data is priceless.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring DPDP Fiduciary Mandates:</strong> Failure to safeguard customer assets risks ₹250 Cr penalties.</span>
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
                  <span><strong>Follow NIST SP 800-88 Standards:</strong> Mandate Clear, Purge, or Destroy for all retired storage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Protect Cryptographic Keys in HSMs:</strong> Master private keys must reside in FIPS 140-3 silicon.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Quarterly Asset Reconciliation:</strong> Compare IAR entries against cloud billing line items.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Mandatory RBAC:</strong> Grant asset access strictly on a least-privilege, need-to-know basis.</span>
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
              Synthesize information asset valuation and lifecycle mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Asset Custodians
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why you cannot protect what you do not know you own: If a company has 50 unmonitored test databases running in AWS, no amount of firewall rules will protect them if they are exposed to the public internet with default credentials. Maintaining an exhaustive Information Asset Register (IAR) is the foundational first step of cybersecurity.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Crypto-Shredding sanitizes cloud storage: Because cloud servers are shared, you cannot physically shred hard drives in AWS or Azure. Instead, destroying the Data Encryption Key (DEK) inside your Key Management Service instantly renders terabytes of ciphertext mathematically undecryptable ($2^{256}$ barrier).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise IT processes, enforce a strict governance separation between the Asset Owner (business manager who decides access policy) and the Asset Custodian (technical administrator who executes technical controls).
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
                <span>Information is primary capital; physical hardware is a commodity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO 27001 Control 5.9 mandates maintaining an Information Asset Register (IAR).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Asset Owner approves access; Asset Custodian executes technical controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The 6 Lifecycle Stages: Create ➔ Store ➔ Use ➔ Share ➔ Archive ➔ Destroy.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NIST SP 800-88 Sanitization: Clear (Logical), Purge (Crypto), Destroy (Physical).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 65B certificate is legally mandatory for court evidence.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Information as an Organizational Asset FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Asset Governance Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Information as an Organizational Asset (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Every robust security program starts with asset visibility. You cannot protect what you do not know you own! Establish an exhaustive Information Asset Register (IAR), strictly enforce the separation of duties between Asset Owners and Technical Custodians, follow the 6-stage lifecycle, deploy crypto-shredding in cloud environments under NIST SP 800-88, and preserve electronic evidence admissibility under Section 65B of the Indian Evidence Act!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
