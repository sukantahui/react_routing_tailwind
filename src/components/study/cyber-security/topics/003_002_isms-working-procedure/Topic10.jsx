import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Studio 1: 4-Tier Document Pyramid State
  const [selectedTierKey, setSelectedTierKey] = useState("tier1_policies");

  // Studio 2: Document Control Lifecycle State
  const [selectedLifecycleStage, setSelectedLifecycleStage] = useState("stage3_approval");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_4tier_suite");

  // Studio 1: 4-Tier Documentation Pyramid Data
  const docTiers = {
    tier1_policies: {
      key: "tier1_policies",
      name: "Tier 1: Policies (Executive Strategy)",
      authority: "Mandatory for All Employees (Board of Directors & CEO Signed)",
      questionAnswered: "Answers 'WHY' security is required and 'WHAT' executive intent dictates.",
      reviewCycle: "Annual Mandatory Board Review or upon Major Business / Legal Changes",
      sampleArtifacts: "Enterprise Information Security Policy (Clause 5.2), Acceptable Use Policy (AUP - A.5.10), Access Control Policy.",
      auditorExpectation: "Auditors verify board approval signatures, communication to all staff, and direct alignment with business objectives.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    tier2_standards: {
      key: "tier2_standards",
      name: "Tier 2: Standards (Technical Baselines)",
      authority: "Mandatory for Technical, DevOps & IT Staff (CISO Office Approved)",
      questionAnswered: "Answers 'WHAT SPECIFIC CRITERIA' and quantifiable technical parameters must be met.",
      reviewCycle: "Semi-Annual Review or upon Technology / Cloud Platform Upgrades",
      sampleArtifacts: "Cryptographic Key Length Standard (STD-CRYPTO-01: AES-256-GCM, RSA-4096), Password Standard, CIS Server Hardening Standard (A.8.9).",
      auditorExpectation: "Auditors sample production servers and databases to verify that technical configurations strictly match documented standards.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    tier3_procedures: {
      key: "tier3_procedures",
      name: "Tier 3: Procedures & SOPs (Operational Runbooks)",
      authority: "Mandatory for System Operators & SOC Analysts (Department Head Approved)",
      questionAnswered: "Answers 'HOW', 'WHEN', and 'WHO' executes exact operational tasks chronologically.",
      reviewCycle: "Continuous Maintenance or upon Workflow / Pipeline Modifications",
      sampleArtifacts: "Joiner-Mover-Leaver (JML) Offboarding SOP (< 15 mins), Emergency Patch Deployment SOP, CERT-In 6-Hour Escalation SOP (A.5.24).",
      auditorExpectation: "Auditors interview frontline staff and perform walkthrough tests to ensure operations match written SOP steps.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    tier4_guidelines: {
      key: "tier4_guidelines",
      name: "Tier 4: Guidelines (Advisory Best Practices)",
      authority: "Discretionary / Advisory (Information Security Steering Committee)",
      questionAnswered: "Answers 'HOW TO OPTIMIZE' or provides recommended methods and tips.",
      reviewCycle: "Ad-hoc Review as Industry Best Practices Evolve",
      sampleArtifacts: "Secure Remote Work Coffee Shop Wi-Fi Tips, Clean Desk Optimization Guide (A.7.7), Python Secure Coding Best Practices.",
      auditorExpectation: "Auditors review guidelines to evaluate security awareness maturity; non-adherence does not trigger a non-conformity.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeDocTier = docTiers[selectedTierKey];

  // Studio 2: Document Control Lifecycle Stages Data
  const lifecycleStages = {
    stage1_drafting: {
      key: "stage1_drafting",
      name: "Stage 1: Drafting & Metadata Assignment",
      description: "Author drafts document using standardized template, assigning unique Document ID (e.g. POL-SEC-08), title, semantic version (v1.0), and classification banner.",
      auditDeliverable: "Standardized Document Header with Unique Identifier & Author Timestamp.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    stage2_review: {
      key: "stage2_review",
      name: "Stage 2: Peer Review & Legal Verification",
      description: "Cross-functional technical leads, CISO Office, and Legal Counsel review draft to ensure alignment with ISO 27001 Annex A controls and Indian DPDP Act rules.",
      auditDeliverable: "Documented Peer Review Comments & Legal Safe Harbor Sign-Off Log.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    stage3_approval: {
      key: "stage3_approval",
      name: "Stage 3: Board Approval & Controlled Publication",
      description: "Designated executive authority (CEO/CISO) signs approval; document is converted to read-only PDF and published on the central Intranet ISMS portal.",
      auditDeliverable: "Signed Management Approval Signature Block & Controlled Intranet Publication Log.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    stage4_retirement: {
      key: "stage4_retirement",
      name: "Stage 4: Annual Review, Archive & Secure Deletion",
      description: "Mandatory annual review verifies currency; superseded versions are watermarked 'SUPERSEDED' and archived in encrypted legal vault for 5 years.",
      auditDeliverable: "Archived Version History Manifest with 'SUPERSEDED' Watermark & Retention Schedule.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    }
  };

  const activeLifecycleStage = lifecycleStages[selectedLifecycleStage];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_4tier_suite",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Authoring Complete 4-Tier Suite for 500 Payment Nodes",
      budget: "₹18,50,000",
      challenge: "Fast-Scaling Payment Switch Lacked Formalized SOPs Across 500 Nodes",
      dilemma:
        "A fast-scaling UPI payment switch processing ₹120 Crores daily operated on verbal instructions, failing preliminary ISO 27001 Stage 1 documentation readiness audits.",
      resolution:
        "Mamata authored the complete 4-tier documentation suite (POL-01, STD-08 Crypto, SOP-04 JML), achieving 100% ISO 27001 Stage 1 audit approval and securing ₹45 Crore banking contracts.",
      metrics: {
        documentsAuthored: "42 Standardized Documents",
        stage1AuditScore: "100% Zero Documentation Gaps",
        b2bDealSecured: "₹45 Crores Banking Partner",
        compliance: "ISO 27001:2022 & PCI-DSS v4.0"
      }
    },
    {
      id: "ichapur_healthcare_sops",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Clinical SOP & Data Masking Suite",
      budget: "₹8,20,000",
      challenge: "Clinical Staff Lacked Written Procedures for Handling 80,000 Oncology Scans",
      dilemma:
        "Hospital clinical care network suffered from inconsistent doctor handling of diagnostic imaging files, violating DPDP Act storage limitation and consent documentation rules.",
      resolution:
        "Mahima structured HIPAA/NABH clinical SOPs and PostgreSQL dynamic data masking standards (STD-08), ensuring 100% compliance with Section 8 of the Indian DPDP Act 2023.",
      metrics: {
        clinicalSopsActive: "18 Operational SOPs",
        patientRecordsGoverned: "80,000 Oncology Scans",
        dpdpAuditReadiness: "100% Consent Traced",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_runbooks",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Operational Runbooks",
      budget: "₹14,80,000",
      challenge: "18 Substations Operated on Un-Versioned Physical Binder Procedures",
      dilemma:
        "18 high-voltage 220kV transmission substations operated on un-versioned physical binder procedures, creating severe operational risks during grid emergency switching.",
      resolution:
        "Debangshu drafted formal SCADA switching procedures (SOP-OT-01) and physical access standards under ISO 27001 Clause 7.5, satisfying NCIIPC Protected Systems requirements under IT Act Section 70.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        versionControlledSops: "100% Digital Document Control",
        switchingErrorRate: "0 Incidents Recorded",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_doc_control_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Document Control & Lifecycle Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Distinguish Mandatory Standards vs Advisory Guidelines",
      dilemma:
        "Cybersecurity students struggled to distinguish between mandatory Standards (Tier 2) and advisory Guidelines (Tier 4), and how document control protects digital evidence under Section 65B.",
      resolution:
        "The team developed an interactive 4-Tier ISMS Document Hierarchy Builder and Document Control Lifecycle Simulator in React, training 215+ BCA cyber security students on authoring ISO 27001 artifacts.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        documentSuitesBuilt: "60+ Enterprise Case Studies",
        examMastery: "100% Documentation Governance Mastery",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 10 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            ISMS Documentation: Policies, Standards, Guidelines, and Procedures
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Construct an auditable documentation architecture: master the 4-tier governance pyramid (Policies, Standards, Procedures, Guidelines), 
            enforce rigorous document control under ISO/IEC 27001 Clause 7.5, and establish conclusive statutory Safe Harbor under Section 43A of the Indian IT Act and the DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 4-Tier ISMS Documentation Hierarchy Pyramid */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📐</span> Studio 1: 4-Tier ISMS Documentation Hierarchy Pyramid
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a documentation tier to inspect its operational authority, core questions answered (Why vs What vs How), sample artifacts, and external auditor expectations.
            </p>
          </div>

          {/* Tier Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(docTiers).map((tier) => {
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
                &gt;
                  <div className="font-bold text-gray-200 truncate">{tier.name.split(": ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{tier.name.split(": ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Tier Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDocTier.badgeClass)}>
                  {activeDocTier.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Authority: {activeDocTier.authority.split(" (")[0]}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Mandatory Approval Authority</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeDocTier.authority.split(" (")[1]?.replace(")", "") || "Executive Board"}</span>
              </div>
            </div>

            {/* Questions Answered & Review Cycle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Core Governance Function:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeDocTier.questionAnswered}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Mandatory Review Cycle:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeDocTier.reviewCycle}</p>
              </div>
            </div>

            {/* Real-World Artifacts & Auditor Expectation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Sample Real-World ISMS Artifacts:</span>
                <p className="text-gray-200 text-xs font-bold leading-relaxed">{activeDocTier.sampleArtifacts}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">External Auditor Verification Test:</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed font-sans">{activeDocTier.auditorExpectation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Document Control & Version Lifecycle Simulator (Clause 7.5) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📑</span> Studio 2: Document Control &amp; Version Lifecycle Simulator (Clause 7.5)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a stage in the ISO 27001 Document Control Lifecycle to inspect metadata requirements, peer reviews, board approval signatures, and retirement protocols.
            </p>
          </div>

          {/* Lifecycle Stages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(lifecycleStages).map((stg) => {
              const isSelected = selectedLifecycleStage === stg.key;
              return (
                <button
                  key={stg.key}
                  onClick={() => setSelectedLifecycleStage(stg.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{stg.name.split(": ")[1]?.split(" & ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{stg.name.split(": ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeLifecycleStage.badgeClass)}>
                  {activeLifecycleStage.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  ISO 27001 Clause 7.5 Governance Workflow
                </h3>
              </div>
            </div>

            {/* Description & Deliverable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Operational Workflow Description:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeLifecycleStage.description}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Mandatory Stage Audit Deliverable:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeLifecycleStage.auditDeliverable}</p>
              </div>
            </div>

            {/* Document Header Preview Block */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-2 font-mono text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">
                Compliant ISO 27001 Document Control Block Preview:
              </span>
              <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-gray-300 space-y-1">
                <div><span className="text-indigo-400 font-bold">Document ID:</span> POL-SEC-08 (Cryptographic &amp; Data Masking Standard)</div>
                <div><span className="text-indigo-400 font-bold">Version:</span> v2.4 (Approved by CISO Sukanta Hui on 2026-08-23)</div>
                <div><span className="text-indigo-400 font-bold">Classification:</span> RESTRICTED - INTERNAL ENTERPRISE USE ONLY</div>
                <div><span className="text-indigo-400 font-bold">Next Review Date:</span> 2027-08-23 (Annual Mandatory Maintenance Cycle)</div>
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
              Visualizing the 4-Tier ISMS Documentation Pyramid and the Clause 7.5 Document Control Lifecycle Flow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 4-Tier Pyramid */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 4-Tier ISMS Documentation Pyramid
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1: Policies (Top) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="250,20 180,75 320,75" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="250" y="55" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8.5">TIER 1: POLICIES</text>
                    <text x="250" y="67" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Board Signed • Strategy</text>
                  </g>

                  {/* Tier 2: Standards */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="180,75 130,135 370,135 320,75" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="105" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">TIER 2: STANDARDS</text>
                    <text x="250" y="120" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Technical Baselines • AES-256 • CIS</text>
                  </g>

                  {/* Tier 3: Procedures */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="130,135 80,205 420,205 370,135" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="165" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">TIER 3: PROCEDURES / SOPs</text>
                    <text x="250" y="180" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Step-by-Step Runbooks • JML • Escalation</text>
                  </g>

                  {/* Tier 4: Guidelines (Base) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="80,205 30,270 470,270 420,205" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="235" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">TIER 4: GUIDELINES</text>
                    <text x="250" y="250" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Advisory Guidance • Tips • Best Practices</text>
                  </g>

                  <text x="250" y="300" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Higher tiers establish mandatory strategic intent; lower tiers provide operational execution.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.1: The 4-tier ISMS documentation hierarchy pyramid (ISO/IEC 27001).
              </p>
            </div>

            {/* Diagram 2: Document Control Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Document Control Lifecycle (Clause 7.5)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Draft */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. DRAFT &amp; ID</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Unique Document ID</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan49)" />

                  {/* Step 2: Review */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. PEER REVIEW</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Legal &amp; CISO Office</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo49)" />

                  {/* Step 3: Approval */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="412" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. BOARD APPROVAL</text>
                    <text x="412" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Signed &amp; Published</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#10b981" strokeWidth="1.5" />

                  {/* Step 4: Maintenance */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="372" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. ANNUAL REVIEW (7.5.3)</text>
                    <text x="372" y="138" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Verify Currency &amp; Update</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold49)" />

                  {/* Step 5: Archive */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="125" y="125" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. ARCHIVE SUPERSEDED</text>
                    <text x="125" y="138" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7">Encrypted Legal Vault (5y)</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% CONTROLLED DOCUMENTED INFORMATION
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Guarantees complete traceability, eliminating obsolete procedures across all business units.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Rigorous document control is a mandatory prerequisite for passing Stage 1 ISO 27001 audits.
                  </text>

                  <defs>
                    <marker id="arrowCyan49" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo49" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGold49" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.2: The Document Control Lifecycle workflow under ISO/IEC 27001 Clause 7.5.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: ISMS Documentation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads author 4-tier suites in Kolkata, structure clinical SOPs in Ichapur, manage SCADA runbooks in Barrackpore, and simulate document lifecycles in Jadavpur.
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
                  <span>⚡</span> Documentation Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Documentation Solution
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
              Guidelines for Lead Implementers and CISOs managing 4-tier ISMS documentation suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Documentation Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Keep Policies Strategic:</strong> Avoid hardcoding software version numbers in Tier 1 board policies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Put Ciphers in Standards:</strong> Define exact technical algorithms (AES-256-GCM) in Tier 2 Standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Write Step-by-Step SOPs:</strong> Ensure Tier 3 runbooks are numbered and repeatable during crises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Watermark Superseded Docs:</strong> Mark obsolete policies 'SUPERSEDED' under Clause 7.5.3.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Document Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Paper Tiger Syndrome:</strong> Writing elaborate policies that staff never execute in practice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Mixing Tiers:</strong> Placing technical CLI commands inside board-level executive policies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Un-approved Drafts:</strong> Distributing draft Word documents lacking CISO/Board approval logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing Annual Reviews:</strong> Failing to conduct mandatory annual reviews of security policies.</span>
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
                  <span><strong>Enforce AUP on Day 1:</strong> Require every new hire to sign the Acceptable Use Policy (A.5.10).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain Central Intranet:</strong> Publish read-only PDFs with controlled distribution tags.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain Consent Registers:</strong> Archive DPDP Section 8 citizen consent logs.</span>
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
              Synthesize 4-tier documentation hierarchies and Clause 7.5 document control workflows before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Documentation Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why mixing tiers in a single document causes audit failure: If you write specific CLI commands or cipher version numbers inside a Board-Approved Information Security Policy (Tier 1), the policy becomes obsolete the moment software updates, requiring expensive board re-approval meetings. Keep Policies strategic (Why/What), Standards technical (Criteria), and SOPs operational (Step-by-step).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How documented information establishes legal Safe Harbor under Indian cyber law: Under Section 43A of the Information Technology Act 2000, presenting an audited 4-tier documentation suite proves that the corporate entity instituted reasonable security practices, completely immunizing the firm in data breach civil liability lawsuits.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise documentation portals, enforce standardized document headers with unique IDs, semantic versioning (v1.0, v2.0), formal approval signature logs, and automatic 'SUPERSEDED' watermarking for retired files under ISO/IEC 27001 Clause 7.5.
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
                <span>4-Tier Pyramid: Policies (Tier 1), Standards (2), Procedures (3), Guidelines (4).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Policies (Why/What) are board-approved; Standards define exact technical criteria.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Procedures/SOPs (How/When/Who) are mandatory step-by-step operational runbooks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Guidelines (Recommendations) are advisory and discretionary best practices.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Clause 7.5 governs Control of Documented Info (ID, format, approval, versioning).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Documented ISMS suite proves Reasonable Security Practices under IT Act Sec 43A.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="ISMS Documentation: Policies, Standards, Guidelines, and Procedures FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Document Control Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="ISMS Documentation: Policies, Standards, Guidelines, and Procedures (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Documentation is the foundation upon which your entire Information Security Management System is audited and legally defended. Master the 4-tier hierarchy: author strategic Policies (Tier 1) signed by the Board of Directors under Clause 5.2, define measurable Technical Standards (Tier 2) with exact ciphers and parameters, write numbered chronological SOPs (Tier 3) for crisis execution, and publish helpful Guidelines (Tier 4). Enforce rigorous document control under Clause 7.5 with unique IDs, semantic versions, and retention schedules to guarantee 100% Stage 1 audit success and total statutory Safe Harbor under Section 43A of the Indian IT Act 2000 and Section 8 of the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
