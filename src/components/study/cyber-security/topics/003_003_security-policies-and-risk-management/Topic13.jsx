import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic13_files/topic13_note.txt?raw";

const Topic13 = () => {
  // Studio 1: 6-Stage ERM Workflow State
  const [activeWorkflowStage, setActiveWorkflowStage] = useState(1);

  // Studio 2: Multi-Sector Case Study State
  const [selectedSectorKey, setSelectedSectorKey] = useState("fintech_kolkata");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_payshield_capstone");

  // Studio 1: 6 Stages Data
  const ermWorkflowStages = [
    {
      stageNumber: 1,
      title: "Stage 1: Scope & Asset Valuation",
      subtitle: "Cataloging Critical Information Assets & Business Revenue Streams",
      details: "PayShield India operates 500 payment microservices processing ₹120 Crores daily in UPI transactions and stores 800,000 citizen financial profiles.",
      metrics: { "Total Asset Value (AV)": "₹15,00,00,000", "Data Sensitivity": "Tier 1 Critical (PII & Banking)", "Asset Owner": "VP of Digital Banking" },
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    {
      stageNumber: 2,
      title: "Stage 2: Threat & Vulnerability Scanning",
      subtitle: "Ingesting CVEs, SAST/DAST Scans & MITRE ATT&CK Adversary Vectors",
      details: "Snyk SCA and automated DAST scans detect CVE-2026-8812 (Pre-Auth RCE) and un-audited SQL query access. Raw Inherent Risk is evaluated at 20 / 25 (Critical).",
      metrics: { "Inherent Risk Score": "20 / 25 (Critical Gross Risk)", "Identified Threat": "LockBit Ransomware + API Tampering", "Vulnerability": "CVE-2026-8812 & Insecure Deserialization" },
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    {
      stageNumber: 3,
      title: "Stage 3: Quantitative Loss Forecasting",
      subtitle: "Calculating Single & Annual Loss Expectancy (SLE / ALE / ROSI)",
      details: "Single Loss Expectancy (SLE = ₹15 Cr x 40%) is ₹6.00 Crores. With an ARO of 0.5 (once every 2 yrs), unmitigated ALE is ₹3.00 Crores/year. Proposed tooling costs ₹18.5 Lakhs/year.",
      metrics: { "Single Loss (SLE)": "₹6,00,00,000", "Unmitigated ALE": "₹3,00,00,000 / year", "Annual Control Cost": "₹18,50,000 / year" },
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    {
      stageNumber: 4,
      title: "Stage 4: Risk Treatment Plan (RTP)",
      subtitle: "Deploying 4-Pillar Controls & Mapping ISO 27001 Annex A",
      details: "Lead Architect Mamata deploys AWS WAF, CrowdStrike EDR, and FIDO2 MFA (Mitigation), purchases ₹50 Cr Cyber Insurance (Transfer), and tokenizes PANs (Avoidance).",
      metrics: { "Treatment Pillars": "Mitigate + Transfer + Avoid", "Annex A Controls": "A.8.20, A.8.24, A.8.5", "Implementation SLA": "< 30 Calendar Days" },
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      stageNumber: 5,
      title: "Stage 5: GRC Register & Residual Verification",
      subtitle: "Benchmarking Mitigated Residual Risk Against Board Appetite",
      details: "Post-control ALE drops to ₹15 Lakhs/year (95% risk reduction). Residual Risk Score is verified at 1.4 / 25, strictly within the Board Risk Appetite threshold (<= 3.0).",
      metrics: { "Mitigated ALE": "₹15,00,000 / year", "Residual Risk Score": "1.4 / 25 (Safe Low)", "Board Appetite Status": "100% COMPLIANT (<= 3.0)" },
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    {
      stageNumber: 6,
      title: "Stage 6: Board BRMC & Regulatory Sign-Off",
      subtitle: "Unanimous CFO Approval & DPDP Act 2023 Statutory Safe Harbor",
      details: "CFO approves the ₹18.5 Lakh budget based on a 1,440% ROSI (₹2.66 Cr net annual savings). The ISMS achieves full statutory Safe Harbor under DPDP Act Section 8 and RBI rules.",
      metrics: { "Calculated ROSI": "1,440% Net Return", "Statutory Fine Shield": "₹250 Crores Immunized", "Governance Approval": "Unanimous Board BRMC Sign-off" },
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    }
  ];

  const currentStage = ermWorkflowStages[activeWorkflowStage - 1];

  // Studio 2: Multi-Sector Case Studies Data
  const multiSectorCaseStudies = {
    fintech_kolkata: {
      key: "fintech_kolkata",
      sector: "FinTech & UPI Switch (PayShield India)",
      location: "Kolkata Operations Center",
      lead: "Mamata",
      assetValuation: "₹15.00 Crores (500 Microservices / ₹120 Cr/day UPI)",
      threats: "LockBit Ransomware, Transitive Log4j Flaws, API Tampering",
      treatments: "AWS WAF + CrowdStrike EDR + ₹50 Cr Cyber Insurance + Tokenization",
      rosi: "1,440% ROSI (₹2.66 Cr Net Savings)",
      residualScore: "1.4 / 25 (Within 3.0 Board Appetite)",
      statutorySafeHarbor: "100% Compliance with RBI Master Directions & DPDP Act 2023",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    healthcare_ichapur: {
      key: "healthcare_ichapur",
      sector: "Clinical Healthcare & PACS Network",
      location: "Ichapur Oncology Care",
      lead: "Mahima",
      assetValuation: "₹25.00 Crores (80,000 Cancer Biopsy Scans + DPDP Cap)",
      threats: "Unencrypted Biopsy Leakage, Legacy DICOM RCE, Ransomware Wipes",
      treatments: "Patient ID Tokenization + S3 Object Lock Crypto-Shredding + DPA",
      rosi: "1,360% ROSI (₹1.20 Cr Net Savings)",
      residualScore: "1.5 / 25 (Within 3.0 Hospital Appetite)",
      statutorySafeHarbor: "₹250 Crore DPDP Act Section 33 Statutory Fine Immunization",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    scada_barrackpore: {
      key: "scada_barrackpore",
      sector: "Critical National Infrastructure (Power Grid)",
      location: "Barrackpore Industrial Grid",
      lead: "Debangshu",
      assetValuation: "₹45.00 Crores (18 High-Voltage 220kV Substations)",
      threats: "Nation-State OT Protocol Command Injection (Modbus/DNP3 Tripping)",
      treatments: "Hardware Unidirectional Data Diodes + Banning All Remote Ingress",
      rosi: "2,860% ROSI (₹4.35 Cr Net Savings)",
      residualScore: "1.2 / 25 (Within 2.0 CNI Appetite)",
      statutorySafeHarbor: "100% NCIIPC & IT Act Section 70 Protected System Compliance",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    ai_jadavpur: {
      key: "ai_jadavpur",
      sector: "Higher Education & AI Research Cloud",
      location: "Jadavpur University AI Labs",
      lead: "Abhronila & Susmita",
      assetValuation: "₹4.50 Crores (215+ GPU Research Compute Nodes)",
      threats: "Unauthorized Model Extraction, Model Poisoning, Unsalted Password Leaks",
      treatments: "Argon2id Password Hashing + Zero Trust Micro-segmentation + GRC Lab",
      rosi: "420% ROSI (Academic Research Integrity)",
      residualScore: "1.8 / 25 (Within University Appetite)",
      statutorySafeHarbor: "NCIIPC Educational Security Charter & UGC Cyber Security Rules",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    }
  };

  const activeSector = multiSectorCaseStudies[selectedSectorKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_payshield_capstone",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "PayShield India End-to-End ERM Governance",
      budget: "₹18,50,000",
      challenge: "500 Payment Microservices Processing ₹120 Cr/Day Required Complete ISMS Architecture",
      dilemma:
        "The board required an integrated, end-to-end risk management framework that justified an ₹18.5 Lakh budget, protected 800,000 citizen records, and satisfied RBI and DPDP regulations.",
      resolution:
        "Mamata synthesized quantitative loss forecasting (1,440% ROSI), STRIDE threat modeling, CycloneDX SBOM ingestion, and ServiceNow GRC automation, achieving 100% regulatory safe harbor.",
      metrics: {
        dailyUpiProtected: "₹120 Crores / Day",
        calculatedRosi: "1,440% Net Return",
        residualScore: "1.4 / 25 (Safe Low)",
        compliance: "ISO 27001, DPDP Act 2023 & RBI"
      }
    },
    {
      id: "ichapur_hospital_capstone",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Ichapur Healthcare Clinical ERM Blueprint",
      budget: "₹8,20,000",
      challenge: "80,000 Oncology Patient Biopsy Records Faced Disproportionate Data Leak Risks",
      dilemma:
        "Hospital clinical network stored 80,000 cancer patient records on legacy PACS servers without formal threat models or quantitative exposure calculations under the DPDP Act 2023.",
      resolution:
        "Mahima executed Risk Avoidance via patient tokenization, deployed S3 Object Lock crypto-shredding, and logged controls in the GRC Risk Register, shielding the hospital from ₹250 Cr fines.",
      metrics: {
        patientScansShielded: "80,000 Biopsy Records",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        residualScore: "1.5 / 25 (Safe Low)",
        compliance: "DPDP Act 2023 & NABH Charter"
      }
    },
    {
      id: "barrackpore_scada_capstone",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Barrackpore 220kV SCADA OT Grid ERM",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced Nation-State OT Command Injection Under IT Act Section 70",
      dilemma:
        "18 high-voltage 220kV transmission substations faced targeted nation-state OT threat vectors requiring formal NCIIPC risk registers and physical air-gap defense architectures.",
      resolution:
        "Debangshu mapped SCADA Modbus threats against MITRE ATT&CK for ICS, deployed unidirectional hardware data diodes, and achieved 100% compliance with Section 70 Protected System rules.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        physicalMitigation: "Hardware Data Diodes",
        residualScore: "1.2 / 25 (Safe Low)",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_erm_capstone_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "ERM Capstone Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Synthesize All 14 Topics into an End-to-End ISMS Framework",
      dilemma:
        "Cybersecurity students struggled to connect asset valuation, threat modeling, SLE/ALE calculations, and risk registers into an integrated, auditable enterprise framework.",
      resolution:
        "The team developed an interactive Enterprise Risk Management Capstone Studio in React, training 215+ BCA cyber security students across all 14 topics of Information Security Governance.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        capstonesCompleted: "60+ Full ISMS Portfolios",
        examMastery: "100% ERM Capstone Mastery",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Course Module 3: Information Security Management • Module 003_003 • Topic 13 of 14 (CAPSTONE)
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Enterprise Risk Management Case Study (Capstone)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Synthesize the complete Information Security Management lifecycle: walk through the 6-stage operational ERM workflow for PayShield India (Kolkata Operations), 
            combine Quantitative Loss Forecasting with STRIDE Threat Modeling, verify Board Risk Appetite compliance, and establish statutory Safe Harbor under the Indian DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive End-to-End ERM Workflow Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🚀</span> Studio 1: 6-Stage Enterprise Risk Management Workflow Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Navigate sequentially through all 6 operational stages of the PayShield India ERM lifecycle to inspect asset valuations, threat scans, quantitative loss models, RTP controls, and board approval dockets.
            </p>
          </div>

          {/* Workflow Stage Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {ermWorkflowStages.map((stg) => {
              const isSelected = activeWorkflowStage === stg.stageNumber;
              return (
                <button
                  key={stg.stageNumber}
                  onClick={() => setActiveWorkflowStage(stg.stageNumber)}
                  className={clsx(
                    "p-3 rounded-xl text-center transition-all duration-300 border text-xs font-mono",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-105"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-bold uppercase">STAGE 0{stg.stageNumber}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate font-sans">{stg.title.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Workflow Stage Details */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentStage.badgeClass)}>
                  {currentStage.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentStage.subtitle}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400">
                Progress: <span className="text-emerald-400 font-bold">{activeWorkflowStage} of 6 Completed</span>
              </div>
            </div>

            {/* Narrative Explanation */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              {currentStage.details}
            </div>

            {/* Metrics Dashboard */}
            <div className="space-y-2">
              <span className="text-indigo-400 font-bold text-xs uppercase tracking-wider block font-sans">
                Stage Deliverables &amp; Calculated Risk Artifacts:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                {Object.entries(currentStage.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                    <span className="text-gray-400 block text-[10px] uppercase font-sans">{key}:</span>
                    <span className="font-bold text-emerald-300 text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next / Previous Controls */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-800 text-xs font-mono">
              <button
                disabled={activeWorkflowStage === 1}
                onClick={() => setActiveWorkflowStage((prev) => Math.max(1, prev - 1))}
                className={clsx(
                  "px-4 py-2 rounded-xl border transition-all",
                  activeWorkflowStage === 1
                    ? "opacity-40 cursor-not-allowed bg-gray-900 border-gray-800 text-gray-500"
                    : "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                ◀ Previous Stage
              </button>

              <button
                disabled={activeWorkflowStage === 6}
                onClick={() => setActiveWorkflowStage((prev) => Math.min(6, prev + 1))}
                className={clsx(
                  "px-4 py-2 rounded-xl border font-bold transition-all",
                  activeWorkflowStage === 6
                    ? "opacity-40 cursor-not-allowed bg-gray-900 border-gray-800 text-gray-500"
                    : "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-md"
                )}
              >
                Next Stage ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Sector Enterprise Risk Comparison Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Studio 2: Multi-Sector Enterprise Risk Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare end-to-end risk management architectures across FinTech, Healthcare, Critical Energy Infrastructure, and Higher Education.
            </p>
          </div>

          {/* Sector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(multiSectorCaseStudies).map((cs) => {
              const isSelected = selectedSectorKey === cs.key;
              return (
                <button
                  key={cs.key}
                  onClick={() => setSelectedSectorKey(cs.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{cs.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{cs.sector.split(" (")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Sector Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSector.badgeClass)}>
                  {activeSector.sector}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Location: {activeSector.location} (Architect: {activeSector.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Quantified ROSI Return</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeSector.rosi.split(" (")[0]}</span>
              </div>
            </div>

            {/* Asset Valuation & Threats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Asset Valuation ($AV$):</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeSector.assetValuation}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Inherent Threat Vectors:</span>
                <p className="text-rose-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeSector.threats}</p>
              </div>
            </div>

            {/* Controls & Residual Governance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Deployed RTP Safeguards:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeSector.treatments}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/30 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Residual Risk Governance:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">
                  <strong>Score:</strong> {activeSector.residualScore}<br />
                  <strong>Status:</strong> {activeSector.statutorySafeHarbor}
                </p>
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
              Visualizing the End-to-End Enterprise Risk Management Lifecycle and the PayShield India Multi-Layer Defense Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: ERM Lifecycle Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: End-to-End ERM Governance Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Assets */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. ASSETS</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">₹15 Cr Valuation</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan73)" />

                  {/* Step 2: Threats */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="250" y="45" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">2. THREATS</text>
                    <text x="250" y="58" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6.5">CVSS &amp; STRIDE</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed73)" />

                  {/* Step 3: Quantitative Loss */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="412" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">3. QUANT LOSS</text>
                    <text x="412" y="58" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">ALE: ₹3 Cr / yr</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Step 4: RTP Controls */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="372" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">4. RISK TREATMENT PLAN</text>
                    <text x="372" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">WAF • EDR • ₹50 Cr Insurance</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen73)" />

                  {/* Step 5: GRC Register */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="125" y="125" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">5. GRC RISK REGISTER</text>
                    <text x="125" y="138" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Residual 1.4 &le; Appetite 3.0</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      BOARD BRMC &amp; REGULATORY SAFE HARBOR
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      1,440% ROSI + Total Immunity from ₹250 Crore DPDP Act Penalties.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The complete governance lifecycle links code-level CVEs directly to board balance sheets.
                  </text>

                  <defs>
                    <marker id="arrowCyan73" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowRed73" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowGreen73" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 13.1: The end-to-end Enterprise Risk Management (ERM) governance lifecycle pipeline.
              </p>
            </div>

            {/* Diagram 2: PayShield Architecture */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: PayShield India Defense-in-Depth Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Layer 1: Ingress */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">
                      LAYER 1: PERIMETER INGRESS &amp; ANTI-DDOS (AWS WAF + Cloudflare)
                    </text>
                    <text x="250" y="56" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">
                      Blocks Spoofing &amp; Volumetric DoS
                    </text>
                  </g>

                  {/* Layer 2: Service Mesh */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="75" width="460" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="95" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">
                      LAYER 2: SERVICE MESH ZERO TRUST (Mutual TLS + FIDO2 Authentication)
                    </text>
                    <text x="250" y="106" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">
                      Guarantees Authenticity &amp; Microservice Identity
                    </text>
                  </g>

                  {/* Layer 3: Application Security */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="460" height="40" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="250" y="145" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">
                      LAYER 3: APPLICATION &amp; SUPPLY CHAIN (Snyk SCA + CycloneDX SBOM)
                    </text>
                    <text x="250" y="156" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">
                      Blocks Transitive Log4j Vulnerabilities in CI/CD
                    </text>
                  </g>

                  {/* Layer 4: Storage */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="175" width="460" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="250" y="195" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">
                      LAYER 4: DATA STORAGE &amp; WORM LEDGER (AES-256-GCM + S3 Object Lock)
                    </text>
                    <text x="250" y="206" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">
                      Guarantees Confidentiality &amp; Non-Repudiation
                    </text>
                  </g>

                  {/* Layer 5: Transfer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="225" width="460" height="45" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="245" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      LAYER 5: FINANCIAL RISK TRANSFER (₹50 Crore Cyber Insurance Policy)
                    </text>
                    <text x="250" y="258" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">
                      Transfers Catastrophic Systemic Outage Tail Risk
                    </text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 13.2: PayShield India 5-layer Defense-in-Depth and Risk Transfer architecture.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: ERM Capstone Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads govern PayShield India in Kolkata, protect oncology data in Ichapur, shield SCADA power grids in Barrackpore, and simulate ERM in Jadavpur.
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
                  <span>⚡</span> Governance Challenge ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied ERM Solution
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
              Master guidelines for Chief Information Security Officers (CISOs) directing Enterprise Risk Management programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> ERM Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Speak Finance:</strong> Always present Rupee ALE and ROSI percentages to the CFO.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Continuous GRC Sync:</strong> Connect vulnerability scanners directly to the risk register.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 100% SBOMs:</strong> Eliminate unmonitored transitive open-source libraries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Benchmark Appetite:</strong> Never deploy software if residual risk exceeds appetite.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common ERM Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Paper Compliance:</strong> Assuming having a PDF policy equals real-world defense.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Spreadsheet Trap:</strong> Tracking enterprise risks in static Excel files without history.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Legal Fines:</strong> Omitting ₹250 Cr DPDP statutory penalties from SLE models.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Orphan Risk Entries:</strong> Logging risks without an assigned engineer and calendar SLA.</span>
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
                  <span><strong>Convene BRMC Quarterly:</strong> Report quantified risk ledgers to the Board.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce DPDP Privacy-by-Design:</strong> Threat model all citizen personal data flows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Immutable S3:</strong> Immunize backup snapshots from ransomware deletion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain Escrow Reserves:</strong> Hold capital buffers matching banking ALE under RBI rules.</span>
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
              Synthesize all 14 topics of Information Security Governance and Risk Analysis before reviewing the final comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Enterprise Risk Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  How cybersecurity governance transforms from a technical cost center into a strategic business enabler: When security architects quantify risk in Indian Rupees (₹), calculate Return on Security Investment (ROSI), and prove that spending ₹18.5 Lakhs saves ₹2.66 Crores annually in avoided losses, the Chief Financial Officer and Board of Directors become active champions of cybersecurity defense.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Indian cyber regulations (DPDP Act 2023, RBI Cyber Master Directions, and CERT-In Directions 2022) interconnect with ISO/IEC 27001: Maintaining documented Risk Registers, Privacy-by-Design threat models, and rapid 48-hour patch SLAs provides undisputed statutory Safe Harbor, protecting corporate directors from catastrophic ₹250 Crore fines and criminal liabilities.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future professional career, always combine technical Defense-in-Depth (WAF, EDR, mTLS, Immutable Backups) with strategic Financial Risk Transfer (Cyber Insurance) to ensure that your enterprise survives both everyday threat attacks and worst-case catastrophic disaster tail risks.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Master Module 003_003 Summary)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Governance Hierarchy: Policies ➔ Standards ➔ Guidelines ➔ Procedures.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Asset Valuation calculates total cost: Hardware + Revenue + DPDP Fine Caps.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CVSS v3.1: Critical (9.0-10.0), High (7.0-8.9), Medium (4.0-6.9), Low (0.1-3.9).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Single Loss (SLE) = AV x EF  |  Annual Loss (ALE) = SLE x ARO.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>4 Treatments: Mitigate (Reduce), Transfer (Share), Avoid (Stop), Accept (Retain).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Residual Risk must remain strictly below Board Risk Appetite ({`<`}= 3.0).</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Enterprise Risk Management Capstone FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Full-Scale ERM Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Enterprise Risk Management Case Study (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic14_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 003_003: Security Policies, Risk Assessment & Mitigation! You have mastered the complete science of Enterprise Information Security Governance—from establishing organizational policy hierarchies and calculating quantitative loss expectancies (SLE, ALE, ROSI in Rupees) to authoring ISO/IEC 27001 Risk Treatment Plans, threat modeling architectures with STRIDE/DREAD, and managing software supply chains with machine-readable SBOMs. Always govern with precision, speak the language of business finance, and uphold unbreakable statutory compliance under Indian DPDP Act and RBI regulations!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic13;
