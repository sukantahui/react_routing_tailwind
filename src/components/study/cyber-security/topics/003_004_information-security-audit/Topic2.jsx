import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Studio 1: Active Audit Tier State
  const [selectedTierKey, setSelectedTierKey] = useState("tier_first_party");

  // Studio 2: Certification Lifecycle Step State (0 to 3)
  const [activeCycleYear, setActiveCycleYear] = useState(0); // 0: Year 0 (Initial), 1: Year 1 (Surveillance 1), 2: Year 2 (Surveillance 2), 3: Year 3 (Recert)

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_3tier_spectrum");

  // Studio 1: 3-Tier Audit Data
  const auditTiers = {
    tier_first_party: {
      key: "tier_first_party",
      name: "1. First-Party Audits (Internal Audits)",
      objective: "Evaluate internal ISMS baseline conformance, discover control defects early, and prepare for external audits.",
      auditor: "Internal trained security engineers or outsourced internal audit consultants (cross-departmental).",
      governance: "ISO/IEC 27001:2022 Clause 9.2 (Internal Audit) & Internal Management Charter",
      audience: "CISO, Executive Leadership, and Board Audit Committee",
      deliverable: "Internal Audit Report, Internal Non-Conformity Notices, 30/90-Day Corrective Action Plans (CAPA)",
      example: "Lead Architect Mamata and internal team audit 500 payment microservices prior to registrar review.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    tier_second_party: {
      key: "tier_second_party",
      name: "2. Second-Party Audits (Supplier / Vendor Audits)",
      objective: "Verify external vendor security controls, supply chain resilience, and contractual Data Processing Agreements.",
      auditor: "Host organization's Vendor Risk Management (TPRM) team or customer security assessors.",
      governance: "ISO 27001 Control A.5.19 (Supplier Relationships) & Contractual 'Right-to-Audit' Clauses",
      audience: "Host Enterprise Procurement Team, Vendor Management Office (VMO), and CISO",
      deliverable: "Vendor Risk Scorecard, Third-Party Security Attestation, Vendor Remediation Notice",
      example: "Kolkata FinTech sends an audit team to inspect the Mumbai data center of its third-party SMS OTP provider.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    tier_third_party: {
      key: "tier_third_party",
      name: "3. Third-Party Audits (Certification & Regulatory Audits)",
      objective: "Provide independent, globally accredited assurance of compliance to grant certificates or enforce statutory laws.",
      auditor: "Accredited Certification Bodies (BSI, TÜV, DNV) or Government Regulators (CERT-In, RBI, DPBI).",
      governance: "ISO/IEC 27001:2022 Certification Scheme, DPDP Act 2023 Sec 10, RBI Cyber Master Directions",
      audience: "Global Customers, Regulators, Stock Exchange Investors, and the Public",
      deliverable: "Official ISO 27001 Certificate (3-Year Validity), Regulatory Compliance Attestation, Formal Audit Report",
      example: "BSI Lead Auditor conducts Stage 2 on-site technical inspection; CERT-In conducts annual banking audit.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeTier = auditTiers[selectedTierKey];

  // Studio 2: 3-Year Certification Lifecycle Data
  const certificationCycleData = [
    {
      year: 0,
      phaseTitle: "Year 0: Initial Certification Audit (Stage 1 + Stage 2)",
      auditScope: "100% of ISMS Scope across all 93 Annex A Controls and Clauses 4–10",
      activities: "Stage 1: Documentation & SoA Review (2 Days) ➔ Stage 2: On-site Technical Evidence Sampling (5 Days).",
      samplingFocus: "Full census review of policies, risk registers, cryptographic keys, physical mantraps, and cloud VPCs.",
      outcome: "Official ISO/IEC 27001:2022 Certificate Granted (Valid for 3 Years)!",
      badge: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    {
      year: 1,
      phaseTitle: "Year 1: Surveillance Audit 1",
      auditScope: "Selective Partial Scope (~33% of Annex A Controls + Core Clauses)",
      activities: "Auditor checks core ISMS processes: Internal Audit results (9.2), Management Review (9.3), and previous CAPAs.",
      samplingFocus: "Incident management logs, new cloud feature deployments, and verification of closed minor NCs.",
      outcome: "ISO Certificate Maintained in Good Standing.",
      badge: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    {
      year: 2,
      phaseTitle: "Year 2: Surveillance Audit 2",
      auditScope: "Selective Partial Scope (~33% of remaining Annex A Controls)",
      activities: "Auditor inspects operational controls: Backup restoration tests, third-party vendor audits, and access reviews.",
      samplingFocus: "Change management tickets, employee onboarding/offboarding records, and business continuity drills.",
      outcome: "ISO Certificate Maintained for Final Year.",
      badge: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    {
      year: 3,
      phaseTitle: "Year 3: Recertification Audit",
      auditScope: "Comprehensive 100% Full-Scope Re-Evaluation of the entire ISMS",
      activities: "Full multi-day audit evaluating ISMS maturity, continuous improvement over 3 years, and complete control efficacy.",
      samplingFocus: "Full re-audit of all 93 controls, risk assessment methodology, and statutory regulatory compliance.",
      outcome: "New 3-Year ISO/IEC 27001 Certificate Issued!",
      badge: "bg-purple-950 text-purple-300 border-purple-800"
    }
  ];

  const currentCycle = certificationCycleData[activeCycleYear];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_3tier_spectrum",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Managing the 3-Tier Audit Spectrum",
      budget: "₹18,50,000",
      challenge: "UPI Switch Required Internal Pre-Audits, Vendor Audits, and External Certification",
      dilemma:
        "PayShield India required a seamless 3-tier audit strategy: conducting 1st-party internal audits on 500 microservices, auditing 12 external fintech SDK vendors (2nd-party), and passing 3rd-party BSI certification.",
      resolution:
        "Mamata executed 1st-party internal audit (Clause 9.2), conducted 2nd-party audit on cloud SMS gateway (A.5.19), and achieved 3rd-party BSI ISO 27001 Stage 2 certification with zero major findings.",
      metrics: {
        firstPartyAudits: "100% Microservices Covered",
        secondPartyAudits: "12 Fintech Vendors Audited",
        thirdPartyCertification: "ISO 27001:2022 Certified",
        compliance: "ISO 27001, DPDP Act & RBI"
      }
    },
    {
      id: "ichapur_vendor_dpa_audit",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Vendor DPA & Third-Party Data Audit",
      budget: "₹8,20,000",
      challenge: "Third-Party Cloud PACS Vendor Required Contractual Verification Under DPDP Rules",
      dilemma:
        "Hospital engaged an external cloud medical imaging vendor storing 80,000 biopsy records and required both 2nd-party vendor auditing and a 3rd-party statutory Data Audit under DPDP Act Section 10.",
      resolution:
        "Mahima conducted 2nd-party audit on PACS vendor, enforced client-side encryption, and successfully cleared an independent 3rd-party Data Audit under DPDP Section 10, shielding the hospital from ₹250 Cr fines.",
      metrics: {
        recordsGoverned: "80,000 Biopsy Records",
        secondPartyAuditResult: "100% DPA Compliance",
        thirdPartyDataAuditPass: "Statutory Safe Harbor Granted",
        compliance: "DPDP Act 2023 Sec 10 & NABH"
      }
    },
    {
      id: "barrackpore_nciipc_inspection",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA OT NCIIPC Third-Party Audit",
      budget: "₹14,80,000",
      challenge: "18 Transmission Substations Faced Statutory National Security Inspections Under Sec 70",
      dilemma:
        "18 high-voltage 220kV transmission substations faced statutory 3rd-party national security inspections by NCIIPC inspectors while requiring internal 1st-party audits of firmware update procedures.",
      resolution:
        "Debangshu coordinated 3rd-party NCIIPC regulatory inspection, validating unidirectional hardware data diodes, and conducted internal 1st-party RTU firmware audits, maintaining 100% Protected System certification.",
      metrics: {
        substationsAudited: "18 High-Voltage Sites",
        thirdPartyInspection: "NCIIPC Statutory Pass",
        firstPartyFirmwareAudit: "100% Verified Signatures",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_spectrum_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "3-Tier Audit Spectrum Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand the 3-Year Certification Lifecycle and Stage 1 vs 2",
      dilemma:
        "Cybersecurity students struggled to distinguish between internal 1st-party audits, vendor 2nd-party audits, and accredited 3rd-party surveillance audits across the 3-year ISO lifecycle.",
      resolution:
        "The team developed an interactive 3-Tier Audit Hierarchy & Certification Lifecycle Studio in React, training 215+ BCA cyber security students on ISO 19011 auditing principles and registrar interactions.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        auditCyclesSimulated: "75+ 3-Year Lifecycles",
        examMastery: "100% Audit Types Mastery",
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 2 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Types of Audits: First-Party, Second-Party, and Third-Party
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Navigate the complete spectrum of security assurance: master First-Party internal audits under ISO 27001 Clause 9.2, 
            execute Second-Party vendor security assessments under Control A.5.19, and navigate Third-Party certification and regulatory audits across the 3-year ISO lifecycle.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 3-Tier Audit Hierarchy & Comparison Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 1: 3-Tier Audit Hierarchy &amp; Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an audit tier to inspect its primary objective, auditor identity, legal governance driver, reporting audience, and real-world deliverable artifacts.
            </p>
          </div>

          {/* Tier Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(auditTiers).map((tr) => {
              const isSelected = selectedTierKey === tr.key;
              return (
                <button
                  key={tr.key}
                  onClick={() => setSelectedTierKey(tr.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{tr.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{tr.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Tier Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeTier.badgeClass)}>
                  {activeTier.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Governance Driver: {activeTier.governance.split(" & ")[0]}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Primary Audience</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeTier.audience.split(",")[0]}</span>
              </div>
            </div>

            {/* Objective & Auditor Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Primary Audit Objective:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeTier.objective}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Auditor Identity &amp; Independence:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeTier.auditor}</p>
              </div>
            </div>

            {/* Deliverables & Real-World Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Deliverable Artifacts:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeTier.deliverable}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Real-World Case Example:</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed font-sans">{activeTier.example}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ISO 27001 3-Year Certification Lifecycle Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📅</span> Studio 2: ISO 27001 3-Year Certification Lifecycle Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 3-year certification journey: Year 0 Initial Certification (Stage 1 &amp; Stage 2) ➔ Year 1 Surveillance ➔ Year 2 Surveillance ➔ Year 3 Recertification.
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {certificationCycleData.map((cyc) => {
              const isSelected = activeCycleYear === cyc.year;
              return (
                <button
                  key={cyc.year}
                  onClick={() => setActiveCycleYear(cyc.year)}
                  className={clsx(
                    "p-3 rounded-xl text-center border transition-all text-xs font-mono",
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-400 font-bold shadow-lg scale-105"
                      : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] uppercase opacity-80">YEAR 0{cyc.year}</div>
                  <div className="font-sans font-bold mt-0.5 truncate">{cyc.phaseTitle.split(": ")[1]?.split(" (")[0] || "Initial"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Lifecycle Details */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentCycle.badge)}>
                  {currentCycle.phaseTitle}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 font-sans">
                  Scope: {currentCycle.auditScope}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400">
                Outcome: <span className="text-emerald-400 font-bold">{currentCycle.outcome.split(" (")[0]}</span>
              </div>
            </div>

            {/* Activities & Sampling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Audit Activities &amp; Duration:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{currentCycle.activities}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Sampling &amp; Evidence Focus:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{currentCycle.samplingFocus}</p>
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
              Visualizing the 3-Tier Audit Relationship Architecture and the ISO 27001 3-Year Certification Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 3-Tier Audit Architecture */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 3-Tier Audit Taxonomy (ISO 19011)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1: First-Party */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="130" height="90" rx="6" fill="#083344" stroke="#06b6d4" />
                    <text x="90" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1ST-PARTY AUDIT</text>
                    <text x="90" y="60" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">(Internal Audit)</text>
                    <text x="90" y="75" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="6">Clause 9.2 ISMS</text>
                    <text x="90" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">Self-Evaluation</text>
                  </g>

                  {/* Tier 2: Second-Party */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="90" rx="6" fill="#78350f" stroke="#f59e0b" />
                    <text x="250" y="47" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">2ND-PARTY AUDIT</text>
                    <text x="250" y="60" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">(Supplier / Vendor)</text>
                    <text x="250" y="75" fill="#fef08a" font-family="monospace" textAnchor="middle" fontSize="6">Control A.5.19</text>
                    <text x="250" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">Contractual DPA</text>
                  </g>

                  {/* Tier 3: Third-Party */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="130" height="90" rx="6" fill="#064e3b" stroke="#10b981" />
                    <text x="410" y="47" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">3RD-PARTY AUDIT</text>
                    <text x="410" y="60" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">(Certification / Reg)</text>
                    <text x="410" y="75" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="6">BSI • CERT-In • RBI</text>
                    <text x="410" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">Official Cert</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="145" width="450" height="60" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="170" fill="#c7d2fe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      MULTI-TIER GOVERNANCE ASSURANCE
                    </text>
                    <text x="250" y="187" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      1st-Party prepares internal teams ➔ 2nd-Party protects supply chains ➔ 3rd-Party proves trust.
                    </text>
                  </g>

                  <text x="250" y="255" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Every audit tier enforces independence and accountability across different relationships.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.1: The 3-tier Information Security Audit taxonomy under ISO 19011.
              </p>
            </div>

            {/* Diagram 2: 3-Year Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: ISO 27001 3-Year Certification Cycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Year 0 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="95" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="67" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">YEAR 0</text>
                    <text x="67" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">Stage 1 + Stage 2</text>
                  </g>

                  <line x1="115" y1="47" x2="135" y2="47" stroke="#10b981" strokeWidth="1.5" />

                  {/* Year 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="135" y="25" width="100" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="185" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">YEAR 1</text>
                    <text x="185" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">Surveillance 1</text>
                  </g>

                  <line x1="235" y1="47" x2="255" y2="47" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Year 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="255" y="25" width="105" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="307" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="7.5">YEAR 2</text>
                    <text x="307" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6">Surveillance 2</text>
                  </g>

                  <line x1="360" y1="47" x2="380" y2="47" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Year 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="380" y="25" width="100" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="430" y="45" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="7.5">YEAR 3</text>
                    <text x="430" y="58" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6">Recertification</text>
                  </g>

                  {/* Connecting Loop Back */}
                  <path d="M 430 70 L 430 115 L 67 115 L 67 70" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4,4" />

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="145" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="167" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      CONTINUOUS 3-YEAR AUDIT VALIDITY
                    </text>
                    <text x="250" y="184" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Surveillance audits in Years 1 &amp; 2 maintain active certification before Year 3 full renewal.
                    </text>
                  </g>

                  <text x="250" y="245" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Year 0 Initial Cert ➔ Year 1 Surveillance ➔ Year 2 Surveillance ➔ Year 3 Recertification Loop.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.2: The 3-year ISO/IEC 27001 certification and surveillance cycle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Audit Tier Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads manage internal and external audits in Kolkata, govern vendors in Ichapur, inspect SCADA in Barrackpore, and simulate lifecycles in Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Audit Budget</span>
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
              Guidelines for Compliance Managers managing 1st, 2nd, and 3rd-party audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Audit Tier Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Complete 1st-Party First:</strong> External registrars halt Stage 2 if internal audits are missing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Contractual Right-to-Audit:</strong> Always include 2nd-party audit rights in vendor DPAs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain Surveillance Evidence:</strong> Keep CAPA logs updated for Year 1 &amp; 2 surveillance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Cross-Audit Departments:</strong> Assign cloud engineers to audit app teams to prevent bias.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Tiering Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Self-Auditing Trap:</strong> Allowing engineers to audit their own firewall configurations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The One-and-Done Myth:</strong> Assuming Year 0 certification excuses Year 1 &amp; 2 surveillance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unenforceable Vendor Audits:</strong> Attempting to audit a vendor without a contract clause.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Conflating 2nd &amp; 3rd Party:</strong> Treating a customer questionnaire as an ISO cert.</span>
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
                  <span><strong>Enforce DPDP Data Audits:</strong> Execute 3rd-party independent data audits under Sec 10.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain 3-Year Timeline:</strong> Schedule surveillance audits 11 months after Stage 2.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Audit Vendor DPAs:</strong> Inspect third-party sub-processor data flows annually.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Empanel CERT-In Auditors:</strong> Ensure 3rd-party auditors hold valid CERT-In credentials.</span>
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
              Synthesize 1st, 2nd, and 3rd-party audit dynamics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Audit Strategists
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why First-Party internal audits are a strict legal prerequisite for Third-Party ISO 27001 certification: External accredited certification bodies (like BSI or TÜV) will immediately reject your Stage 2 audit if you cannot produce written internal audit working papers (Clause 9.2) and a signed Management Review minute (Clause 9.3). An organization must prove that its internal governance engine is active before external certification can proceed.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The differing legal powers across audit tiers: In a 1st-party audit, management mandates the review; in a 2nd-party audit, a signed contract clause (Right-to-Audit) empowers the inspection; in a 3rd-party regulatory audit (CERT-In / RBI / DPBI), statutory law mandates the inspection with legal penalty powers up to ₹250 Crores under the DPDP Act 2023.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud vendor contracts, always ensure that a formal 'Right-to-Audit' clause is explicitly negotiated, allowing your team to perform 2nd-party technical assessments or mandate annual SOC 2 Type II audit report submissions.
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
                <span>1st-Party (Internal): Organization audits its own ISMS (Clause 9.2).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>2nd-Party (Supplier): Organization audits external vendors (Control A.5.19).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3rd-Party (External): Accredited Registrars (BSI) or Regulators (CERT-In, RBI).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stage 1 audits documentation; Stage 2 audits technical &amp; operational execution.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3-Year Cycle: Year 0 Initial Cert ➔ Year 1 Surveillance ➔ Year 2 Surveillance ➔ Year 3 Recert.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 10 mandates 3rd-party independent Data Audits for Significant Fiduciaries.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Types of Audits: 1st, 2nd, and 3rd-Party FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Audit Hierarchy Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Types of Audits: First-Party, Second-Party, and Third-Party (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Understanding the distinction between First-Party, Second-Party, and Third-Party Information Security Audits is foundational to enterprise risk management. Always remember: First-Party internal audits evaluate your own operations under ISO 27001 Clause 9.2, Second-Party audits protect your supply chain under Control A.5.19, and Third-Party audits provide independent, globally accredited assurance. Master the 3-Year ISO Certification Lifecycle (Stage 1, Stage 2, Surveillance 1, Surveillance 2, Recertification) to lead enterprise compliance programs with confidence!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
