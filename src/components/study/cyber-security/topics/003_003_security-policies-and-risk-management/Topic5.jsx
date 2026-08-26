import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio 1: Preset Asset Selection State
  const [selectedAssetPresetKey, setSelectedAssetPresetKey] = useState("fintech_payment_db");

  // Custom valuation parameters (in Lakhs of Rupees)
  const [hardwareCostLakhs, setHardwareCostLakhs] = useState(15); // ₹15 Lakhs
  const [dailyRevenueLakhs, setDailyRevenueLakhs] = useState(350); // ₹3.5 Crores
  const [statutoryLiabilityCrores, setStatutoryLiabilityCrores] = useState(25); // ₹25 Crores

  // Studio 2: IAR Inspection State
  const [selectedIarAssetKey, setSelectedIarAssetKey] = useState("ast_db_001");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_500_microservices");

  // Presets Data
  const assetPresets = {
    fintech_payment_db: {
      key: "fintech_payment_db",
      name: "1. Core UPI Payment Switch Database (FinTech)",
      hwLakhs: 25,
      revLakhs: 450,
      statCrores: 50,
      description: "Primary database processing 1,200,000 daily UPI transactions across 500 payment microservices."
    },
    healthcare_pacs_server: {
      key: "healthcare_pacs_server",
      name: "2. Healthcare Oncology PACS Image Server",
      hwLakhs: 18,
      revLakhs: 85,
      statCrores: 25,
      description: "Diagnostic imaging repository storing 80,000 confidential cancer patient biopsy scans."
    },
    scada_rtu_controller: {
      key: "scada_rtu_controller",
      name: "3. 220kV SCADA RTU Substation Controller (Energy)",
      hwLakhs: 45,
      revLakhs: 850,
      statCrores: 100,
      description: "High-voltage transmission switching controller declared as Protected System under IT Act Section 70."
    },
    web_frontend_cache: {
      key: "web_frontend_cache",
      name: "4. Ephemeral Web Frontend Static Cache (Cloud)",
      hwLakhs: 2,
      revLakhs: 5,
      statCrores: 0,
      description: "Public edge CDN cache storing marketing banners and public REST documentation."
    }
  };

  const handleSelectPreset = (key) => {
    setSelectedAssetPresetKey(key);
    const p = assetPresets[key];
    if (p) {
      setHardwareCostLakhs(p.hwLakhs);
      setDailyRevenueLakhs(p.revLakhs);
      setStatutoryLiabilityCrores(p.statCrores);
    }
  };

  // Studio 1 Calculations
  const totalValuationCrores = useMemo(() => {
    const hwCrores = hardwareCostLakhs / 100;
    const revCrores = dailyRevenueLakhs / 100;
    return (hwCrores + revCrores + statutoryLiabilityCrores).toFixed(2);
  }, [hardwareCostLakhs, dailyRevenueLakhs, statutoryLiabilityCrores]);

  const classificationTier = useMemo(() => {
    const val = parseFloat(totalValuationCrores);
    if (val >= 25.0) return { name: "TIER 1: RESTRICTED / HIGHLY CONFIDENTIAL", badgeClass: "bg-purple-950 text-purple-300 border-purple-800", ciaScore: "15 / 15 (Critical)" };
    if (val >= 5.0) return { name: "TIER 2: CONFIDENTIAL", badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800", ciaScore: "12 / 15 (High)" };
    if (val >= 0.5) return { name: "TIER 3: INTERNAL USE ONLY", badgeClass: "bg-blue-950 text-blue-300 border-blue-800", ciaScore: "8 / 15 (Medium)" };
    return { name: "TIER 4: PUBLIC", badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800", ciaScore: "3 / 15 (Low)" };
  }, [totalValuationCrores]);

  // Studio 2: Information Asset Register (IAR) Data
  const iarAssets = {
    ast_db_001: {
      key: "ast_db_001",
      id: "AST-DB-001",
      name: "Core UPI Payment Customer Transaction Ledger",
      type: "Primary Information Asset (Financial / PII)",
      owner: "Chief Financial Officer (CFO - Business Lead)",
      custodian: "Lead Database Administrator Mamata (Technical)",
      location: "AWS ap-south-1 (Mumbai Private VPC) Multi-AZ",
      classification: "RESTRICTED / HIGHLY CONFIDENTIAL",
      reviewCycle: "Quarterly Mandatory Re-certification",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    ast_pacs_002: {
      key: "ast_pacs_002",
      id: "AST-PACS-002",
      name: "Oncology Diagnostic Biopsy & DICOM Imaging Vault",
      type: "Primary Information Asset (Sensitive Health PII)",
      owner: "Chief Medical Officer (CMO - Clinical Lead)",
      custodian: "Chief Forensic Officer Mahima (Healthcare IT)",
      location: "On-Premises Hybrid Cloud SAN (Ichapur Network)",
      classification: "RESTRICTED / HIGHLY CONFIDENTIAL",
      reviewCycle: "Semi-Annual Clinical Data Review",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    ast_scada_003: {
      key: "ast_scada_003",
      id: "AST-SCADA-003",
      name: "220kV Substation High-Voltage Switching RTU Unit",
      type: "Supporting Hardware / Operational Technology (OT)",
      owner: "State Load Despatch Center (SLDC Executive Lead)",
      custodian: "Principal OT Architect Debangshu (Engineering)",
      location: "Barrackpore Transmission Substation #4 Control Room",
      classification: "RESTRICTED (IT Act Section 70 Protected System)",
      reviewCycle: "Annual NCIIPC Physical & Cyber Audit",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    ast_doc_004: {
      key: "ast_doc_004",
      id: "AST-DOC-004",
      name: "Enterprise Information Security Policy (POL-SEC-01)",
      type: "Primary Governance Artifact (Clause 5.2)",
      owner: "Chief Information Security Officer (CISO Sukanta Hui)",
      custodian: "Compliance Manager Susmita (Governance Team)",
      location: "Central Confluence Intranet Portal (Read-Only)",
      classification: "INTERNAL ENTERPRISE USE ONLY",
      reviewCycle: "Annual Mandatory Clause 7.5 Review",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    }
  };

  const activeIarAsset = iarAssets[selectedIarAssetKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_500_microservices",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Quantifying 500 Payment Microservices",
      budget: "₹18,50,000",
      challenge: "Fast-Scaling Payment Switch Lacked an Inventory of 500 Microservices",
      dilemma:
        "A fast-scaling UPI payment switch processing ₹120 Crores daily lacked a centralized asset inventory across 500 microservices, creating severe uninventoried cloud shadow assets.",
      resolution:
        "Mamata automated AWS Config CMDB asset discovery, cataloging 500 nodes and valuing the payment ledger at ₹180 Crores (incorporating DPDP liabilities), securing Tier 1 FIPS 140-3 HSM protection.",
      metrics: {
        microservicesCataloged: "500 Payment Nodes",
        assetValuationTotal: "₹180 Crores",
        orphanAssetsPurged: "34 Unused EC2 Instances",
        compliance: "ISO 27001 Control A.5.9 & RBI"
      }
    },
    {
      id: "ichapur_iar_scans",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Information Asset Register for 80,000 Scans",
      budget: "₹8,20,000",
      challenge: "Hospital Lacked Formal Asset Ownership for 80,000 Oncology Patient Scans",
      dilemma:
        "Hospital clinical network suffered from unassigned asset custodianship for 80,000 oncology patient diagnostic scans, creating statutory ambiguity under DPDP Act Section 8.",
      resolution:
        "Mahima created a formal IAR assigning the Chief Medical Officer as Asset Owner and Lead DBA as Custodian, applying Restricted classification tags and automated S3 Object Lock encryption under DPDP Act Sec 8.",
      metrics: {
        recordsGoverned: "80,000 Oncology Scans",
        classificationAssigned: "100% Restricted Tags",
        custodianshipAssigned: "100% Accountable Leads",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_protected",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA Substation Protected Systems",
      budget: "₹14,80,000",
      challenge: "18 Substations Requiring Valuation and Protected System Declaration",
      dilemma:
        "18 high-voltage transmission substations required official valuation and declaration as Protected Systems to prevent unauthorized physical and remote access.",
      resolution:
        "Debangshu valued SCADA RTUs at ₹450 Crores based on regional power outage economic impact, obtaining formal NCIIPC Protected System certification under Section 70 of the Indian Information Technology Act.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        ciiValuationScore: "₹450 Crores Economic Impact",
        nciipcCertification: "100% Protected System Certified",
        compliance: "IT Act Section 70 & CEA Cyber Rules"
      }
    },
    {
      id: "jadavpur_asset_val_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Multi-Dimensional Asset Valuation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Calculate Total Valuation Including DPDP Liabilities",
      dilemma:
        "Cybersecurity students struggled to calculate total asset valuation incorporating statutory DPDP liabilities and distinguish between Asset Owners and Asset Custodians under ISO 27001.",
      resolution:
        "The team developed an interactive Multi-Dimensional Asset Valuation Calculator and Information Asset Register in React, training 215+ BCA cyber security students on enterprise asset governance.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        assetRegistersBuilt: "65+ Corporate Registers",
        examMastery: "100% Asset Valuation Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 5 of 14
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Asset Identification and Asset Valuation
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Establish complete visibility and quantifiable criticality: master Information Asset Identification (ISO/IEC 27001 Control A.5.9), 
            enforce 4-tier classification (Control A.5.12), calculate multi-dimensional financial valuations incorporating statutory DPDP liabilities, and assign strict Owner/Custodian accountability.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Multi-Dimensional Asset Valuation Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💎</span> Studio 1: Multi-Dimensional Asset Valuation Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an asset preset or adjust hardware replacement, daily revenue dependency, and statutory regulatory liability sliders to calculate total quantified asset value and automated 4-tier classification.
            </p>
          </div>

          {/* Asset Presets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(assetPresets).map((p) => {
              const isSelected = selectedAssetPresetKey === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => handleSelectPreset(p.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{p.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{p.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls: Sliders */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-5 shadow-2xl lg:col-span-2">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Asset Valuation Parameters (in Indian Rupees)
              </h3>

              {/* Hardware / Rebuild Cost Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">1. Hardware &amp; Development Rebuilding Cost:</span>
                  <span className="text-cyan-400 font-bold">₹{hardwareCostLakhs} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={hardwareCostLakhs}
                  onChange={(e) => setHardwareCostLakhs(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Daily Revenue Dependency Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">2. Daily Revenue Dependency / Interruption:</span>
                  <span className="text-amber-400 font-bold">₹{dailyRevenueLakhs} Lakhs / Day</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={dailyRevenueLakhs}
                  onChange={(e) => setDailyRevenueLakhs(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Statutory Regulatory Liability Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-rose-400 font-bold">3. Statutory Legal Liabilities (DPDP / IT Act Fines):</span>
                  <span className="text-rose-300 font-bold">₹{statutoryLiabilityCrores} Crores</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="250"
                  step="5"
                  value={statutoryLiabilityCrores}
                  onChange={(e) => setStatutoryLiabilityCrores(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>

            {/* Right Output: Score Card */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Valuation Output Summary
                </h3>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs font-mono">
                  <span className="text-gray-400 block text-[10px] uppercase">Total Quantified Valuation:</span>
                  <span className="text-2xl font-extrabold text-emerald-400 block">₹{totalValuationCrores} Crores</span>
                  <span className="text-[10px] text-gray-500 block font-sans">Hardware + Revenue Loss + Statutory Liabilities</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs font-mono">
                  <span className="text-gray-400 block text-[10px] uppercase">CIA Criticality Rating:</span>
                  <span className="text-base font-bold text-cyan-300 block">{classificationTier.ciaScore}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={clsx("p-3.5 rounded-xl border text-xs font-mono font-bold text-center", classificationTier.badgeClass)}>
                {classificationTier.name}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Information Asset Register (IAR) Builder & Metadata Inspector */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Studio 2: Information Asset Register (IAR - Control A.5.9)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise asset from the register to inspect its unique Asset ID, Business Owner, Technical Custodian, Cloud Location, and Audit Certification Cycle.
            </p>
          </div>

          {/* IAR Asset Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(iarAssets).map((ast) => {
              const isSelected = selectedIarAssetKey === ast.key;
              return (
                <button
                  key={ast.key}
                  onClick={() => setSelectedIarAssetKey(ast.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{ast.name.split(" ")[0]} {ast.name.split(" ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{ast.id}</div>
                </button>
              );
            })}
          </div>

          {/* Active IAR Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeIarAsset.badgeClass)}>
                  {activeIarAsset.classification}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeIarAsset.name} ({activeIarAsset.id})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Asset Category</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeIarAsset.type.split(" (")[0]}</span>
              </div>
            </div>

            {/* Owner vs Custodian */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/30 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Accountable Asset Owner (Business Lead):</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeIarAsset.owner}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/30 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Designated Technical Custodian:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeIarAsset.custodian}</p>
              </div>
            </div>

            {/* Location & Review Cycle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 font-bold uppercase tracking-wider block font-sans">Physical / Cloud Location:</span>
                <p className="text-gray-200 text-xs font-bold leading-relaxed">{activeIarAsset.location}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Mandatory Re-Certification Schedule:</span>
                <p className="text-emerald-300 text-xs font-bold leading-relaxed font-sans">{activeIarAsset.reviewCycle}</p>
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
              Visualizing the 4-Tier Information Asset Classification Pyramid and the Asset Valuation &amp; Classification Lifecycle Workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Classification Pyramid */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: 4-Tier Information Classification Pyramid
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1: Restricted */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="250,20 180,75 320,75" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="250" y="55" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8.5">RESTRICTED</text>
                    <text x="250" y="67" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Root KMS Keys • KYC DBs</text>
                  </g>

                  {/* Tier 2: Confidential */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="180,75 130,135 370,135 320,75" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="105" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">CONFIDENTIAL</text>
                    <text x="250" y="120" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Source Code • Salaries • Audits</text>
                  </g>

                  {/* Tier 3: Internal Use Only */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="130,135 80,205 420,205 370,135" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="165" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">INTERNAL USE ONLY</text>
                    <text x="250" y="180" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Intranet SOPs • Jira Backlogs</text>
                  </g>

                  {/* Tier 4: Public */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="80,205 30,270 470,270 420,205" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="235" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">PUBLIC</text>
                    <text x="250" y="250" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Marketing Releases • Public API Docs</text>
                  </g>

                  <text x="250" y="300" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Higher tiers mandate stricter cryptographic controls and Zero Trust access policies.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.1: The 4-tier enterprise information asset classification pyramid (ISO/IEC 27001 Control A.5.12).
              </p>
            </div>

            {/* Diagram 2: Valuation Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Asset Valuation &amp; IAR Governance Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Auto Discovery */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. AUTO DISCOVERY</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Cloud CMDB Telemetry</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan66)" />

                  {/* Step 2: Valuation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">2. VALUATION</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Revenue + DPDP Fines</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo66)" />

                  {/* Step 3: Classification */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="412" y="45" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">3. CLASSIFICATION</text>
                    <text x="412" y="58" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Restricted / Confidential</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Step 4: IAR Registration */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="372" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">4. IAR REGISTRATION (A.5.9)</text>
                    <text x="372" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Assign Owner &amp; Custodian</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen66)" />

                  {/* Step 5: Annual Audit */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="125" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">5. ANNUAL RE-CERTIFICATION</text>
                    <text x="125" y="138" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">Purge Orphaned Resources</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% ASSET VISIBILITY &amp; GOVERNANCE INTEGRITY
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Eliminates shadow IT blind spots and guarantees proportionate security investments.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous asset discovery ensures zero orphan assets across all hybrid cloud VPCs.
                  </text>

                  <defs>
                    <marker id="arrowCyan66" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo66" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGreen66" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.2: The Information Asset Valuation and IAR governance lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Asset Governance Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads catalog microservices in Kolkata, structure medical IARs in Ichapur, value SCADA systems in Barrackpore, and simulate valuation models in Jadavpur.
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
                  <span>⚡</span> Asset Governance Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for Enterprise Asset Officers and CISOs managing asset registers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Asset Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate Cloud Discovery:</strong> Ingest real-time AWS/Azure telemetry into central CMDBs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Factor in DPDP Liabilities:</strong> Include ₹250 Cr penalty exposure in asset valuations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Classification Banners:</strong> Label all documents and S3 buckets under Control A.5.13.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Separate Owner from Custodian:</strong> Business owners decide access; technical DBAs manage locks.</span>
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
                  <span><strong>Orphan Assets:</strong> Leaving unmonitored test servers running without an assigned owner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Hardware-Only Valuation:</strong> Valuing servers by purchase price rather than data value.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Static Excel Spreadsheets:</strong> Using manual sheets that become obsolete in cloud environments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Over-Classification:</strong> Tagging 100% of files 'Restricted', creating unnecessary operational friction.</span>
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
                  <span><strong>Tag All Cloud Resources:</strong> Block deployment of untagged S3 buckets via AWS SCPs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Re-certify IAR Quarterly:</strong> Review Tier 1 Restricted assets every 90 days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Declare Protected Systems:</strong> Register CII assets under IT Act Section 70.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce DLP Labeling:</strong> Intercept unauthorized email transfers of Restricted data.</span>
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
              Synthesize asset classification tiers and valuation calculations before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Asset Security Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why hardware replacement cost is only a tiny fraction of an information asset's true value: If a database server costing ₹5 Lakhs is stolen, the true damage includes developer recovery time, lost daily transaction revenues, and statutory penalties up to ₹250 Crores under the Indian DPDP Act 2023. Always value the information asset, not just the metal box hosting it.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Section 70 of the Indian IT Act 2000 protects Critical Information Infrastructure: Declaring high-voltage power grid SCADA systems or core banking switches as Protected Systems establishes 10-year prison sentences for unauthorized access, elevating the asset's national security criticality.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud infrastructures, use automated policy guardrails (e.g. AWS Service Control Policies) to reject the creation of any cloud resource lacking mandatory metadata tags (AssetOwner, Classification, CostCenter), completely preventing orphan assets.
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
                <span>ISO 27001 Control A.5.9 governs Inventory of Information Assets (IAR).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Control A.5.12 governs Classification; Control A.5.13 governs Asset Labeling.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Primary Assets are data/processes; Supporting Assets are hardware/servers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>4 Tiers: Restricted (Tier 1), Confidential (2), Internal Use (3), Public (4).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Asset Owner decides access rules; Asset Custodian manages technical controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 70 penalizes unauthorized CII access with 10 Years Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Asset Identification and Asset Valuation FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Asset Valuation Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Asset Identification and Asset Valuation (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Asset Identification and Valuation are the indispensable compass of your cybersecurity strategy. Always remember: you cannot protect what you do not know you own! Maintain an active, automated Information Asset Register under ISO 27001 Control A.5.9, enforce clear 4-tier classification under Control A.5.12, factor in statutory DPDP liabilities up to ₹250 Crores when calculating asset value, and strictly separate the business authority of the Asset Owner from the operational duties of the Asset Custodian!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
