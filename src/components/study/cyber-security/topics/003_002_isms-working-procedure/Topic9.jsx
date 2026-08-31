import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: Framework Selector State
  const [selectedFrameworkKey, setSelectedFrameworkKey] = useState("nist_csf_2");

  // Studio 2: NIST CSF Function State
  const [selectedNistFunctionKey, setSelectedNistFunctionKey] = useState("protect_fn");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_multi_framework");

  // Studio 1: 4 Target Frameworks Data
  const targetFrameworks = {
    nist_csf_2: {
      key: "nist_csf_2",
      title: "1. NIST Cybersecurity Framework (NIST CSF 2.0)",
      focus: "Operational Risk Engineering & SOC Telemetry",
      structure: "6 Functions (Govern, Identify, Protect, Detect, Respond, Recover) divided into 22 Categories & 106 Subcategories.",
      mappedIso: "Clauses 4, 5, 6, 8, 9 & Annex A Controls (A.5.7, A.5.24, A.8.5, A.8.11, A.8.16, A.8.24).",
      statutoryValue: "Enforces RBI SOC threat hunting and CERT-In 6-hour incident containment workflows.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    cobit_2019: {
      key: "cobit_2019",
      title: "2. COBIT 2019 (ISACA)",
      focus: "Strategic IT Governance & Executive Business Alignment",
      structure: "5 Domains: 1 Governance Domain (EDM) + 4 Management Domains (APO, BAI, DSS, MEA) across 40 Governance Objectives.",
      mappedIso: "Clause 5 (Board Leadership ➔ EDM), Clause 6 (Planning ➔ APO), Clause 8 (DevSecOps ➔ BAI), Annex A.8 (SOC ➔ DSS), Clause 9 (Audits ➔ MEA).",
      statutoryValue: "Proves corporate Director due diligence under Section 85 of the Indian Information Technology Act 2000.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    pci_dss_4: {
      key: "pci_dss_4",
      title: "3. PCI-DSS v4.0 (Payment Card Industry)",
      focus: "Cardholder Data Environment (CDE) Technical Security",
      structure: "12 Prescriptive Technical Requirements covering firewalls, encryption, key management, access control, and testing.",
      mappedIso: "Annex A.8: A.8.5 (MFA - Req 8.3), A.8.11 (Masking - Req 3.4), A.8.15 (Logging - Req 10.2), A.8.24 (Crypto - Req 3.5), A.8.28 (Coding - Req 6.2).",
      statutoryValue: "Mandatory condition for all FinTech payment gateways operating under RBI Master Directions.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    iso_27701_pims: {
      key: "iso_27701_pims",
      title: "4. ISO/IEC 27701:2019 (PIMS)",
      focus: "Privacy Information Management & Data Protection Governance",
      structure: "Extends ISO 27001 with specific controls for Data Fiduciaries (Controllers) and Data Processors.",
      mappedIso: "Expands Clause 4-10 context to include PII; adds privacy-specific controls for consent, data subject rights, and DPO oversight.",
      statutoryValue: "Provides total statutory Safe Harbor against ₹250 Crore penalties under Section 8 of the Indian DPDP Act 2023!",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeFramework = targetFrameworks[selectedFrameworkKey];

  // Studio 2: NIST CSF 2.0 Six Functions Data
  const nistFunctions = {
    govern_fn: {
      key: "govern_fn",
      name: "1. GOVERN (GV)",
      objective: "Establish enterprise cybersecurity risk management strategy, policy expectations, and executive leadership oversight.",
      mappedIsoControls: "Clause 5 (Leadership), Clause 6 (Risk Planning), Control A.5.1 (Policies), Control A.5.2 (Roles & Responsibilities).",
      implementation: "Board-approved Information Security Policy, CISO appointment letter, and enterprise RACI governance matrix.",
      defenseValue: "Aligns cybersecurity investments with corporate strategic objectives.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    identify_fn: {
      key: "identify_fn",
      name: "2. IDENTIFY (ID)",
      objective: "Determine the cybersecurity risk to systems, people, assets, data, and capabilities to enable prioritization.",
      mappedIsoControls: "Clause 6.1.2 (Risk Assessment), Control A.5.7 (Threat Intelligence), Control A.5.9 (Asset Inventory), Control A.8.8 (Vulnerabilities).",
      implementation: "Continuous STIX/TAXII threat feed ingestion, automated asset inventory discovery, and weekly vulnerability scanning.",
      defenseValue: "Eliminates enterprise blind spots and prioritizes mission-critical assets.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    protect_fn: {
      key: "protect_fn",
      name: "3. PROTECT (PR)",
      objective: "Deploy technical and organizational safeguards to ensure delivery of critical services and mitigate cyber threats.",
      mappedIsoControls: "Control A.8.5 (MFA), Control A.8.11 (Data Masking), Control A.8.12 (DLP), Control A.8.24 (Crypto), Control A.6.3 (Training).",
      implementation: "PostgreSQL Dynamic Data Masking, FIDO2 Hardware MFA, AWS KMS AES-256-GCM encryption, and monthly phishing drills.",
      defenseValue: "Prevents data breaches and shields enterprise from ₹250 Cr DPDP Act penalties.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    detect_fn: {
      key: "detect_fn",
      name: "4. DETECT (DE)",
      objective: "Find and analyze possible cybersecurity attacks and compromises across the enterprise.",
      mappedIsoControls: "Control A.8.15 (Logging), Control A.8.16 (Monitoring Activities), Control A.7.4 (Physical Monitoring), Control A.8.17 (Clock Sync).",
      implementation: "24/7 SIEM/SOAR with UEBA anomaly detection and NPL IST NTP clock synchronization (+/- 1s).",
      defenseValue: "Reduces Mean Time to Detect (MTTD) from months to under 15 seconds.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    respond_fn: {
      key: "respond_fn",
      name: "5. RESPOND (RS)",
      objective: "Take coordinated action regarding a detected cybersecurity incident to contain impact.",
      mappedIsoControls: "Control A.5.24 (Incident Planning), Control A.5.26 (Incident Response), Control A.5.28 (Evidence Collection).",
      implementation: "Automated SOAR endpoint isolation, live RAM forensic capture, and 6-hour CERT-In escalation reporting.",
      defenseValue: "Fulfills statutory duty under Section 70B of the Indian IT Act.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    recover_fn: {
      key: "recover_fn",
      name: "6. RECOVER (RC)",
      objective: "Restore assets and operations that were impacted by a cybersecurity incident to normal operations.",
      mappedIsoControls: "Control A.5.30 (ICT Readiness for BCP), Control A.8.13 (Information Backup), Control A.8.14 (Redundancy).",
      implementation: "Automated Route 53 multi-region failover, immutable AWS S3 Object Lock backups, and quarterly DR testing.",
      defenseValue: "Guarantees RTO < 15s and RPO = 0 for core payment switches.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    }
  };

  const activeNistFn = nistFunctions[selectedNistFunctionKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_multi_framework",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Multi-Framework Harmonization for 500 Payment Nodes",
      budget: "₹18,50,000",
      challenge: "Payment Switch Faced Duplicate Audits from ISO 27001, PCI-DSS, and RBI",
      dilemma:
        "A 500-node payment switch handling ₹120 Crores daily faced separate duplicate audits from ISO 27001, PCI-DSS, and RBI inspectors, resulting in massive audit fatigue and engineer burnout.",
      resolution:
        "Mamata built a unified Cross-Framework Matrix mapping ISO 27001:2022, NIST CSF 2.0, and PCI-DSS v4.0, reducing audit overhead by 60% and passing all external audits with zero non-conformities.",
      metrics: {
        auditOverheadReduced: "60% Time Reduction",
        frameworksHarmonized: "ISO 27001 + NIST + PCI-DSS + RBI",
        testOnceComplyMany: "100% Shared Evidence Pass",
        compliance: "ISO 27001:2022 & PCI-DSS v4.0"
      }
    },
    {
      id: "ichapur_integrated_pims",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Integrated ISO 27001 + ISO 27701 Healthcare Privacy Suite",
      budget: "₹8,20,000",
      challenge: "Hospital Needed Simultaneous Security and Patient Privacy Certification",
      dilemma:
        "The hospital clinical network needed simultaneous certification for information security and patient privacy without creating duplicate management silos for 80,000 oncology records.",
      resolution:
        "Mahima leveraged the Harmonized Structure to build an integrated ISMS + PIMS architecture, mapping patient oncology scans to ISO 27001 Annex A and ISO 27701 privacy controls under NABH.",
      metrics: {
        standardsIntegrated: "ISO 27001 + ISO 27701 + NABH",
        recordsGoverned: "80,000 Oncology Records",
        auditEfficiency: "50% Audit Time Reduction",
        compliance: "ISO 27701:2019 & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_nciipc",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA NCIIPC & NIST SP 800-53 Harmonization",
      budget: "₹14,80,000",
      challenge: "18 Substations Requiring Alignment with NCIIPC Protected Systems Directives",
      dilemma:
        "18 high-voltage 220kV transmission substations required formal governance under NCIIPC guidelines, requiring cross-mapping between ISO 27001 and NIST SP 800-53 / SP 800-82 controls.",
      resolution:
        "Debangshu mapped ISO 27001 to NIST SP 800-82 / SP 800-53 industrial control families, enforcing strict air-gapped jump hosts and supply chain verification under IT Act Section 70.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        nistFamiliesMapped: "20 Control Families Integrated",
        ciiProtection: "10-Year Criminal Risk Immunized",
        compliance: "IT Act Section 70 & NCIIPC Charter"
      }
    },
    {
      id: "jadavpur_crosswalk_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Multi-Framework Harmonization & Crosswalk Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand How ISO 27001 Maps to NIST CSF 2.0",
      dilemma:
        "Cybersecurity students struggled to understand how ISO 27001 Annex A controls map to NIST CSF 2.0 six core functions and how COBIT 2019 aligns security with enterprise profitability.",
      resolution:
        "The team developed an interactive Multi-Framework Harmonization Engine and Control Crosswalk Matrix in React, training 215+ BCA cyber security students on cross-standard enterprise engineering.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        crosswalkMatricesBuilt: "45+ Framework Mappings",
        examMastery: "100% Multi-Framework Proficiency",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 9 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Integration with Other Frameworks (NIST CSF, COBIT)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Harmonize multi-standard enterprise cybersecurity: bridge ISO/IEC 27001:2022 with NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover), 
            COBIT 2019, PCI-DSS v4.0, and ISO/IEC 27701 (PIMS), construct a unified "Test Once, Comply with Many" crosswalk matrix, and satisfy RBI and DPDP statutory mandates.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Multi-Framework Crosswalk & Harmonization Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🌐</span> Studio 1: Multi-Framework Crosswalk &amp; Harmonization Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a target industry framework to inspect its primary focus, structural units, mapped ISO 27001 clauses/controls, and statutory Indian legal value.
            </p>
          </div>

          {/* Framework Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(targetFrameworks).map((fw) => {
              const isSelected = selectedFrameworkKey === fw.key;
              return (
                <button
                  key={fw.key}
                  onClick={() => setSelectedFrameworkKey(fw.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{fw.title.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{fw.focus.split(" & ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Framework Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeFramework.badgeClass)}>
                  {activeFramework.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Focus: {activeFramework.focus}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Statutory Value</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeFramework.statutoryValue.split(" ")[0]} {activeFramework.statutoryValue.split(" ")[1]}</span>
              </div>
            </div>

            {/* Structure & Mapped ISO Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Structural Architecture:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeFramework.structure}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Mapped ISO 27001 Clauses &amp; Controls:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeFramework.mappedIso}</p>
              </div>
            </div>

            {/* Statutory Alignment Description */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/30 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Indian Cyber Law &amp; Regulatory Safe Harbor:</span>
              <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activeFramework.statutoryValue}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: NIST CSF 2.0 Six-Function Dynamic Control Mapper */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Studio 2: NIST CSF 2.0 Six-Function Dynamic Control Mapper
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select any of the 6 NIST CSF 2.0 core functions (GOVERN to RECOVER) to explore mapped ISO 27001 Annex A controls, operational implementation details, and blue team defense value.
            </p>
          </div>

          {/* NIST Functions Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.values(nistFunctions).map((fn) => {
              const isSelected = selectedNistFunctionKey === fn.key;
              return (
                <button
                  key={fn.key}
                  onClick={() => setSelectedNistFunctionKey(fn.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{fn.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{fn.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active NIST Function Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeNistFn.badgeClass)}>
                  NIST CSF 2.0 Function: {activeNistFn.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Mapped ISO Controls: {activeNistFn.mappedIsoControls}
                </h3>
              </div>
            </div>

            {/* Objective & Implementation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">NIST Functional Objective:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeNistFn.objective}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Operational Implementation Architecture:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeNistFn.implementation}</p>
              </div>
            </div>

            {/* Blue Team Defense Value */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/30 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Blue Team Enterprise Defense Value:</span>
              <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activeNistFn.defenseValue}</p>
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
              Visualizing the Multi-Framework Harmonization Umbrella and the NIST CSF 2.0 to ISO 27001 Six-Function Mapping Flow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Multi-Framework Umbrella */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Multi-Framework Harmonization Umbrella
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Umbrella: ISO/IEC 27001 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="130" y="20" width="240" height="50" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="2" />
                    <text x="250" y="42" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      ISO/IEC 27001:2022 ISMS
                    </text>
                    <text x="250" y="58" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Core Management System &amp; Certification
                    </text>
                  </g>

                  {/* Supporting Spoke 1: NIST CSF */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="105" width="135" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="92" y="125" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">NIST CSF 2.0</text>
                    <text x="92" y="140" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">SOC &amp; Engineering</text>
                  </g>
                  <line x1="190" y1="70" x2="115" y2="105" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Supporting Spoke 2: COBIT 2019 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="105" width="140" height="50" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="125" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">COBIT 2019</text>
                    <text x="250" y="140" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Executive IT Gov</text>
                  </g>
                  <line x1="250" y1="70" x2="250" y2="105" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Supporting Spoke 3: ISO 27701 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="105" width="135" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="407" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">ISO 27701 PIMS</text>
                    <text x="407" y="140" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">DPDP Act Privacy</text>
                  </g>
                  <line x1="310" y1="70" x2="385" y2="105" stroke="#10b981" strokeWidth="1.5" />

                  {/* Bottom Box: Unified Crosswalk */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="190" width="450" height="55" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="212" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      UNIFIED CONTROL CROSSWALK MATRIX (TEST ONCE, COMPLY WITH MANY)
                    </text>
                    <text x="250" y="230" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Reduces corporate audit overhead by 60% while achieving 100% multi-regulatory safe harbor.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The Harmonized Structure unifies governance, engineering, and privacy into a single system.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: The multi-framework harmonization umbrella bridging ISO 27001 with NIST CSF, COBIT, and ISO 27701.
              </p>
            </div>

            {/* Diagram 2: NIST CSF 2.0 Six Functions */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: NIST CSF 2.0 Six-Function Mapping Flow
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Row 1: Govern, Identify, Protect */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="87" y="45" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">1. GOVERN (GV)</text>
                    <text x="87" y="58" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Clause 5 Policy</text>
                  </g>

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="247" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">2. IDENTIFY (ID)</text>
                    <text x="247" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">A.5.7 Threat Intel</text>
                  </g>

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="25" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="407" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">3. PROTECT (PR)</text>
                    <text x="407" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">A.8.11 Masking</text>
                  </g>

                  {/* Row 2: Detect, Respond, Recover */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="95" width="135" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="87" y="115" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">4. DETECT (DE)</text>
                    <text x="87" y="128" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">A.8.16 Monitoring</text>
                  </g>

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="95" width="135" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="247" y="115" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8">5. RESPOND (RS)</text>
                    <text x="247" y="128" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="6.5">A.5.24 CERT-In 6h</text>
                  </g>

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="95" width="135" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="407" y="115" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">6. RECOVER (RC)</text>
                    <text x="407" y="128" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">A.5.30 BCP / DR</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="170" width="455" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="247" y="192" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% OPERATIONAL ENGINEERING ALIGNMENT
                    </text>
                    <text x="247" y="210" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Translates ISO 27001 risk governance into NIST CSF operational SOC playbooks.
                    </text>
                  </g>

                  <text x="250" y="275" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    NIST CSF 2.0 provides the operational taxonomy executing ISO 27001 governance.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: The six core functions of NIST CSF 2.0 mapped to ISO 27001 Annex A controls.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Multi-Framework Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads harmonize payment standards in Kolkata, integrate healthcare privacy in Ichapur, map power grid frameworks in Barrackpore, and build crosswalk engines in Jadavpur.
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
                  <span>⚡</span> Multi-Framework Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Harmonization Solution
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
              Guidelines for Enterprise Security Architects harmonizing multi-standard compliance programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Harmonization Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Test Once, Comply with Many:</strong> Map single technical controls across ISO, NIST, and PCI-DSS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Integrate ISO 27001 with ISO 27701:</strong> Combine security with privacy for total DPDP Act compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Leverage Harmonized Structure:</strong> Maintain a single Board Policy (Clause 5) across all standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Adopt NIST CSF 2.0 Functions:</strong> Structure SOC playbooks using the 6 core operational functions.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Integration Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Compliance Siloing:</strong> Maintaining separate audit binders and teams for ISO, SOC 2, and PCI-DSS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing Governance with Baselines:</strong> Assuming ISO 27001 provides exact CLI hardening commands.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Assuming ISO Covers Privacy:</strong> ISO 27001 lacks consent and DPO workflows without ISO 27701.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Incompatible Naming Schemes:</strong> Inconsistent control IDs causing audit confusion.</span>
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
                  <span><strong>Automate CIS Benchmark Audits:</strong> Scan AWS workloads daily against CIS Controls v8 baselines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Dynamic Data Masking:</strong> Fulfill PCI-DSS Req 3.4 and ISO 27001 Control A.8.11 simultaneously.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Align COBIT 2019 with Board:</strong> Use EDM domains to present security ROI to executive directors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180-Day Indian Logs:</strong> Archive immutable SIEM telemetry under IT Act Section 70B.</span>
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
              Synthesize multi-framework crosswalks and Harmonized Structure mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Multi-Framework Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why modern enterprises cannot rely on a single cybersecurity standard: ISO/IEC 27001 provides the overarching risk management system and external certification, but technical engineers need NIST CSF 2.0's operational taxonomy (Govern, Identify, Protect, Detect, Respond, Recover), board members need COBIT 2019 for IT profitability alignment, and privacy officers need ISO 27701 for DPDP Act compliance.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How a unified Control Crosswalk Matrix eliminates audit fatigue: By testing a single technical implementation (such as AWS KMS AES-256-GCM encryption) once, you simultaneously satisfy ISO 27001 Control A.8.24, NIST CSF PR.DS-01, PCI-DSS Requirement 3.5, and CIS Safeguard 3.11, cutting auditor workload by over 60%.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise compliance designs, integrate ISO 27001 ISMS with ISO 27701 PIMS under the Harmonized Structure (Annex SL) to establish an unassailable legal Safe Harbor defense against ₹250 Crore statutory penalties under Section 8 of the Indian DPDP Act 2023.
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
                <span>ISO 27001 provides management governance; NIST CSF provides operational taxonomy.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NIST CSF 2.0 has 6 Functions: GOVERN, IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>COBIT 2019 has 5 Domains: 1 Governance (EDM) and 4 Management (APO, BAI, DSS, MEA).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO/IEC 27701 extends ISO 27001 into a Privacy Information Management System (PIMS).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Harmonized Structure (Annex SL) unifies Clauses 1-10 across all ISO standards.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>PCI-DSS v4.0 enforces 12 technical requirements for cardholder data environments.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Integration with Other Frameworks (NIST CSF, COBIT) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Multi-Framework Harmonization Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Integration with Other Frameworks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Modern enterprise security requires a multi-framework mindset. Remember: use ISO/IEC 27001:2022 as your overarching auditable management system, use NIST CSF 2.0's 6 functions (Govern to Recover) to structure your SOC engineering playbooks, use COBIT 2019 to align security with executive business goals, and integrate ISO/IEC 27701 (PIMS) under the Harmonized Structure to guarantee unbroken compliance and total Safe Harbor under the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
