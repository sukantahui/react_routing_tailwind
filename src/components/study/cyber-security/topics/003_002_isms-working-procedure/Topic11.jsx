import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Studio 1: 12-Month Implementation Timeline State
  const [selectedPhaseKey, setSelectedPhaseKey] = useState("phase1_initiation");

  // Studio 2: Case Study Selector State
  const [selectedCaseStudyKey, setSelectedCaseStudyKey] = useState("kolkata_fintech_case");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_scenario");

  // Studio 1: 6 Implementation Phases Data
  const implementationPhases = {
    phase1_initiation: {
      key: "phase1_initiation",
      title: "Phase 1: Project Initiation & Governance Charter",
      timeline: "Month 1 (Kickoff)",
      deliverables: "Board Resolution, CISO Project Charter, Steering Committee formation, ISMS Scope definition (Clause 4.3).",
      auditRiskGate: "Undefined scope boundaries or lack of executive leadership commitment (Clause 5.1).",
      budget: "₹2,50,000",
      successFactor: "Formal board approval and cross-functional leadership alignment (DevOps, Legal, HR, Finance).",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    phase2_risk_soa: {
      key: "phase2_risk_soa",
      title: "Phase 2: Risk Assessment & SoA Formulation",
      timeline: "Months 2 - 3 (Risk Engineering)",
      deliverables: "Asset Inventory (A.5.9), STRIDE Threat Model, ISO 27005 Risk Matrix, Statement of Applicability (Clause 6.1.3).",
      auditRiskGate: "Excluding Annex A controls without documented technical justification in the SoA.",
      budget: "₹3,80,000",
      successFactor: "Complete 93-control SoA evaluation with explicit inclusion/exclusion rationale.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    phase3_controls_docs: {
      key: "phase3_controls_docs",
      title: "Phase 3: 4-Tier Documentation & Control Deployment",
      timeline: "Months 4 - 7 (Technical Hardening)",
      deliverables: "42 Standardized Policies/Standards/SOPs, CI/CD security linters (A.8.28), Dynamic Data Masking (A.8.11), KMS Crypto (A.8.24).",
      auditRiskGate: "Deploying controls without documented operational SOPs ('Paper Tiger' syndrome).",
      budget: "₹8,20,000",
      successFactor: "Enforcing Infrastructure as Code (IaC) baselines and automated secret scanning.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    phase4_training_internal_audit: {
      key: "phase4_training_internal_audit",
      title: "Phase 4: SETA Training & Independent Internal Audit",
      timeline: "Months 8 - 9 (Auditing & Education)",
      deliverables: "Organization-wide SETA training (A.6.3), simulated phishing drills, independent Internal Audit report (Clause 9.2), 5-Whys CAPAs.",
      auditRiskGate: "Allowing engineers to audit their own codebase (violating auditor independence).",
      budget: "₹2,00,000",
      successFactor: "Closing 100% of internal audit non-conformities before external auditor engagement.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    phase5_management_review: {
      key: "phase5_management_review",
      title: "Phase 5: Executive Board Management Review",
      timeline: "Month 10 (Governance Sign-off)",
      deliverables: "Formal Board Management Review Minutes (Clause 9.3), KPI telemetry review, capital budget approvals.",
      auditRiskGate: "Lack of documented board decisions on resource allocation and continual improvement.",
      budget: "₹50,000",
      successFactor: "Executive board signature approving Stage 1 external audit readiness.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    phase6_external_certification: {
      key: "phase6_external_certification",
      title: "Phase 6: Stage 1 & Stage 2 External Certification Audit",
      timeline: "Months 11 - 12 (Accreditation)",
      deliverables: "Stage 1 Documentation Review, Stage 2 Operational Technical Audit by BSI / TÜV / DNV, ISO/IEC 27001:2022 Certificate.",
      auditRiskGate: "Major Non-Conformity (e.g. unencrypted backup storage) triggering a 90-day CAPA remediation delay.",
      budget: "₹1,50,000",
      successFactor: "Evidence Triangulation (Document + Staff Interview + Live System Log) across all 93 controls.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activePhase = implementationPhases[selectedPhaseKey];

  // Studio 2: Case Studies Data
  const caseStudies = {
    kolkata_fintech_case: {
      key: "kolkata_fintech_case",
      title: "1. Kolkata Cloud FinTech Payment Switch",
      sector: "Financial Technology / UPI Payment Gateway",
      lead: "Mamata (Lead Cryptographic Architect)",
      scope: "500 payment microservices processing ₹120 Crores daily across multi-cloud VPCs.",
      threatLandscape: "DDoS volumetric extortion, SQLi credential stuffing, API key leakage, ransomware.",
      appliedControls: "A.5.7 (Threat Intel), A.8.5 (FIDO2 MFA), A.8.11 (Masking), A.8.24 (AES-256 KMS), A.5.30 (ICT BCP).",
      budget: "₹18,50,000",
      outcome: "Passed Stage 1 and Stage 2 certification with 0 NCs; secured ₹45 Crore national banking contract.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    ichapur_healthcare_case: {
      key: "ichapur_healthcare_case",
      title: "2. Ichapur Clinical Oncology Hospital Network",
      sector: "Healthcare & Sensitive Personal Health Data",
      lead: "Mahima (Chief Healthcare Forensic Officer)",
      scope: "80,000 oncology patient diagnostic imaging scans, DICOM PACS servers, EHR systems.",
      threatLandscape: "Ransomware encryption of hospital databases, unauthorized doctor access, DPDP consent breaches.",
      appliedControls: "ISO 27701 (PIMS Consent), A.8.10 (Crypto-shredding), A.8.13 (Immutable S3 Vault), A.8.2 (Access Reviews).",
      budget: "₹8,20,000",
      outcome: "100% NABH compliance and complete statutory Safe Harbor against ₹250 Cr DPDP Act fines.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    barrackpore_scada_case: {
      key: "barrackpore_scada_case",
      title: "3. Barrackpore 220kV Transmission Power Grid",
      sector: "Critical Information Infrastructure (CII / Power Grid)",
      lead: "Debangshu (Principal OT Security Architect)",
      scope: "18 high-voltage 220kV transmission substations, 120 RTUs, industrial SCADA network.",
      threatLandscape: "State-sponsored cyber sabotage (Industroyer2), firmware backdoors, unauthorized switching.",
      appliedControls: "Hardware Data Diodes, Air-Gapped Jump Hosts, A.8.9 (CIS Hardening), 48s Live Failover Drills.",
      budget: "₹14,80,000",
      outcome: "Total NCIIPC compliance; 10-year criminal liability immunized under IT Act Section 70.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    jadavpur_lab_case: {
      key: "jadavpur_lab_case",
      title: "4. Jadavpur University ISMS Simulation Studio",
      sector: "Higher Education & Academic Research",
      lead: "Abhronila & Susmita (University Research Leads)",
      scope: "215+ BCA cyber security students simulating enterprise ISO 27001 implementation pipelines.",
      threatLandscape: "Student misconfiguration of cloud resources, lack of audit readiness, academic exam stress.",
      appliedControls: "12-Month Gantt Simulator, 4-Tier Document Builder, Statement of Applicability (SoA) Explorer.",
      budget: "₹4,50,000",
      outcome: "100% student mastery of ISMS working procedures and lead auditor certification skills.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeCaseStudy = caseStudies[selectedCaseStudyKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_fintech_scenario",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Multi-Region Active-Active Cloud FinTech Implementation",
      budget: "₹18,50,000",
      challenge: "Handling 500 Microservices & ₹120 Cr Daily UPI Under RBI & PCI-DSS",
      dilemma:
        "Processing high-volume UPI transactions required reconciling ISO 27001 with RBI Master Directions and PCI-DSS v4.0 across 500 payment microservices.",
      resolution:
        "Mamata deployed AWS Aurora multi-region replication, enforced TLS 1.3 with AES-256 KMS encryption, and automated CI/CD security linting, passing Stage 2 with zero non-conformities.",
      metrics: {
        dailyVolume: "₹120 Crores UPI Transactions",
        rtoRpoSla: "RTO = 12s | RPO = 0s",
        auditResult: "100% Zero Non-Conformities",
        compliance: "ISO 27001:2022 & RBI Directions"
      }
    },
    {
      id: "ichapur_healthcare_scenario",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Integrated ISO 27001 + ISO 27701 Healthcare Privacy Suite",
      budget: "₹8,20,000",
      challenge: "Protecting 80,000 Oncology Records from Ransomware & DPDP Fines",
      dilemma:
        "Hospital clinical network suffered from inconsistent doctor handling of diagnostic imaging files, violating DPDP Act storage limitation and consent documentation rules.",
      resolution:
        "Mahima deployed AWS S3 Object Lock for PACS diagnostic imaging backups, dynamic masking on patient data, and established an automated Data Subject Request (DSR) portal.",
      metrics: {
        recordsProtected: "80,000 Oncology Scans",
        dpdpSafeHarbor: "100% Statutory Immunity",
        immutableVault: "AWS S3 Object Lock Active",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_scenario",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Critical Infrastructure ISMS",
      budget: "₹14,80,000",
      challenge: "Protecting 18 High-Voltage Substations from State-Sponsored Attacks",
      dilemma:
        "18 high-voltage 220kV transmission substations required formal governance under NCIIPC guidelines, requiring air-gapped jump hosts and supply chain verification.",
      resolution:
        "Debangshu mapped ISO 27001 to NCIIPC guidelines: legacy Modbus/DNP3 RTU telemetry was isolated behind hardware data diodes with 24/7 SOC monitoring under IT Act Section 70.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        failoverLatency: "48 Seconds Live Switch",
        powerGridUptime: "100.000% Continuous Power",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_lab_scenario",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Full-Lifecycle ISMS Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Training 215+ BCA Students on 12-Month Implementation Lifecycles",
      dilemma:
        "Cybersecurity students struggled to understand the end-to-end operational sequence of an ISMS implementation and how Evidence Triangulation works during Stage 2 audits.",
      resolution:
        "The team developed an interactive 12-Month Implementation Gantt Simulator, 4-Tier Document Builder, and Case Study Studio in React, training 215+ BCA cyber security students.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        caseStudiesSimulated: "120+ Enterprise Drills",
        examMastery: "100% ISMS Working Procedures Mastery",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 11 of 12 (Module Capstone)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Real-World ISMS Implementation Case Study
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Execute the complete 12-month enterprise ISO/IEC 27001:2022 implementation roadmap: navigate Initiation, Risk Assessment, 4-Tier Documentation, SETA Training, Internal Audits, 
            and Stage 1 / Stage 2 External Certification through real-world West Bengal FinTech, Healthcare, SCADA Grid, and Academic case studies.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 12-Month ISMS Implementation Timeline & Milestone Tracker */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⏱️</span> Studio 1: 12-Month Enterprise ISMS Implementation Timeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an implementation phase to inspect timeline milestones, key governance deliverables, audit risk gates, budget allocations, and critical success factors.
            </p>
          </div>

          {/* Phase Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.values(implementationPhases).map((ph) => {
              const isSelected = selectedPhaseKey === ph.key;
              return (
                <button
                  key={ph.key}
                  onClick={() => setSelectedPhaseKey(ph.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{ph.title.split(": ")[1]?.split(" & ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{ph.timeline.split(" ")[0]} {ph.timeline.split(" ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePhase.badgeClass)}>
                  {activePhase.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Timeline Milestone: {activePhase.timeline}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Phase Budget Allocation</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activePhase.budget}</span>
              </div>
            </div>

            {/* Deliverables & Audit Risk Gate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Key Phase Deliverables:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activePhase.deliverables}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Audit Risk Gate / Failure Mode:</span>
                <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed">{activePhase.auditRiskGate}</p>
              </div>
            </div>

            {/* Critical Success Factor */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/30 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Critical Success Factor:</span>
              <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activePhase.successFactor}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Sector Enterprise Case Study Deep Dive */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Studio 2: Multi-Sector Real-World Case Study Deep Dive
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise case study to inspect sector threat models, scope boundaries, applied Annex A controls, budgets, and external certification outcomes.
            </p>
          </div>

          {/* Case Study Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(caseStudies).map((cs) => {
              const isSelected = selectedCaseStudyKey === cs.key;
              return (
                <button
                  key={cs.key}
                  onClick={() => setSelectedCaseStudyKey(cs.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{cs.title.split(". ")[1]?.split(" ")[0]} {cs.title.split(". ")[1]?.split(" ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{cs.sector.split(" / ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeCaseStudy.badgeClass)}>
                  {activeCaseStudy.sector}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeCaseStudy.title} (Led by {activeCaseStudy.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Implementation Budget</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeCaseStudy.budget}</span>
              </div>
            </div>

            {/* Scope & Threats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">ISMS Scope Boundaries:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeCaseStudy.scope}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Sector Threat Landscape:</span>
                <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed">{activeCaseStudy.threatLandscape}</p>
              </div>
            </div>

            {/* Applied Controls & Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Applied ISO 27001 Controls:</span>
                <p className="text-emerald-300 text-xs font-bold leading-relaxed font-sans">{activeCaseStudy.appliedControls}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">External Certification Outcome:</span>
                <p className="text-emerald-300 text-xs font-semibold leading-relaxed font-sans">{activeCaseStudy.outcome}</p>
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
              Visualizing the 12-Month ISMS Implementation Lifecycle Gantt and the Complete ISMS Governance &amp; Architecture Blueprint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 12-Month Lifecycle Gantt */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 12-Month Enterprise ISMS Lifecycle Flow
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="40" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="87" y="42" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">PHASE 1: INITIATION</text>
                    <text x="87" y="55" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Month 1 • Scope 4.3</text>
                  </g>

                  <line x1="155" y1="45" x2="180" y2="45" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple50)" />

                  {/* Phase 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="25" width="135" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="247" y="42" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">PHASE 2: RISK &amp; SoA</text>
                    <text x="247" y="55" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Months 2-3 • 93 Controls</text>
                  </g>

                  <line x1="315" y1="45" x2="340" y2="45" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan50)" />

                  {/* Phase 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="25" width="140" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="410" y="42" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">PHASE 3: BUILD &amp; DOCS</text>
                    <text x="410" y="55" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Months 4-7 • 42 SOPs</text>
                  </g>

                  <line x1="410" y1="65" x2="410" y2="95" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Phase 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="95" width="140" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="410" y="112" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">PHASE 4: AUDIT (9.2)</text>
                    <text x="410" y="125" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Months 8-9 • Internal Audit</text>
                  </g>

                  <line x1="340" y1="115" x2="315" y2="115" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen50)" />

                  {/* Phase 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="95" width="135" height="40" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="247" y="112" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">PHASE 5: BOARD (9.3)</text>
                    <text x="247" y="125" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">Month 10 • Mgt Review</text>
                  </g>

                  <line x1="180" y1="115" x2="155" y2="115" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold50)" />

                  {/* Phase 6 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="95" width="135" height="40" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="87" y="112" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">PHASE 6: CERTIFIED</text>
                    <text x="87" y="125" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6.5">Months 11-12 • Stage 1 &amp; 2</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="170" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="192" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% ACCREDITED ISO/IEC 27001:2022 CERTIFICATION
                    </text>
                    <text x="250" y="210" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Establishes global stakeholder trust and total judicial Safe Harbor under Indian Cyber Laws.
                    </text>
                  </g>

                  <text x="250" y="275" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Strict adherence to the 6 phases guarantees 100% first-pass certification success.
                  </text>

                  <defs>
                    <marker id="arrowPurple50" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                    <marker id="arrowCyan50" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGreen50" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                    <marker id="arrowGold50" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.1: The 12-month enterprise ISMS implementation lifecycle roadmap.
              </p>
            </div>

            {/* Diagram 2: Evidence Triangulation */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Evidence Triangulation in Stage 2 Audits
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Apex: Document */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="175" y="20" width="150" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="40" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. DOCUMENT (SOP)</text>
                    <text x="250" y="54" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Written Policy / Standard</text>
                  </g>

                  {/* Base Left: Interview */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="35" y="115" width="150" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="110" y="135" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. STAFF INTERVIEW</text>
                    <text x="110" y="149" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Verbal Explanation</text>
                  </g>

                  {/* Base Right: System Log */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="315" y="115" width="150" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="390" y="135" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. SYSTEM LOG / PROOF</text>
                    <text x="390" y="149" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Actual Telemetry / Config</text>
                  </g>

                  {/* Triangle Lines */}
                  <line x1="220" y1="65" x2="140" y2="115" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="280" y1="65" x2="360" y2="115" stroke="#10b981" strokeWidth="1.5" />
                  <line x1="185" y1="137" x2="315" y2="137" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% EVIDENCE TRIANGULATION VERIFICATION
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Control is certified ONLY when Document, Interview, and Technical Log align flawlessly.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Auditors never trust a written policy alone without inspecting live technical telemetry.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.2: The Evidence Triangulation audit methodology used in Stage 2 technical assessments.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Enterprise Case Study Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads implement ISMS architectures for FinTech in Kolkata, healthcare in Ichapur, SCADA in Barrackpore, and simulation studios in Jadavpur.
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
                  <span>⚡</span> Implementation Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for ISMS Lead Implementers and Lead Auditors executing certification programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Implementation Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Secure Board Mandate (5.1):</strong> Secure executive charter and budget in Month 1.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Complete 100% of the SoA:</strong> Document technical justification for every excluded control.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Run Full Internal Audit (9.2):</strong> Never face external auditors without a complete mock audit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Practice Evidence Triangulation:</strong> Ensure written SOPs match live cloud logs.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Implementation Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Scope Slicing:</strong> Attempting to exclude core production databases from ISMS scope.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unjustified Exclusions:</strong> Excluding controls without documented technical rationale.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Skipping Management Review:</strong> Facing Stage 1 audit without signed Board minutes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing 90-Day CAPA Window:</strong> Leaving Stage 2 Major NCs un-remediated.</span>
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
                  <span><strong>Integrate ISO 27701:</strong> Combine security with privacy for total DPDP Act compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Immutable Vaults:</strong> Use S3 Object Lock Compliance Mode for backup ransomware defense.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 48h Patch SLA:</strong> Rapidly patch any critical vulnerability with CVSS &gt;= 9.0.</span>
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
              Synthesize 12-month implementation lifecycles and Evidence Triangulation before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for ISMS Lead Implementers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Evidence Triangulation is the bedrock of Stage 2 audits: Auditors never accept a written SOP alone. They verify that the written SOP (Document) is understood and practiced by frontline engineers (Staff Interview), and that live production log files (System Telemetry) prove the control was executed consistently in reality.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How an accredited ISO 27001 certificate establishes complete Safe Harbor under Indian cyber law: Under Section 43A and Section 85 of the Information Technology Act 2000 and Section 8 of the Indian DPDP Act 2023, possessing an accredited ISO 27001 certificate proves that corporate Directors exercised reasonable due diligence, completely immunizing the enterprise in court and regulatory penalty proceedings.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise implementations, structure your 12-month timeline to complete the Internal Audit (Clause 9.2) and Executive Management Review (Clause 9.3) at least one month before your external Stage 1 audit date, guaranteeing a 100% first-pass certification rate.
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
                <span>6-Phase Lifecycle: Initiation ➔ Risk/SoA ➔ Build/Docs ➔ Training ➔ Mgt Review ➔ Cert.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stage 1 Audit reviews documentation; Stage 2 audits live technical operations.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Evidence Triangulation verifies: Document (SOP) + Interview + System Log.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Major Non-Conformities allow a mandatory 90-day CAPA remediation grace window.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO 27001 certification provides legal Safe Harbor under IT Act and DPDP Act 2023.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>100% Statement of Applicability completeness is mandatory for Stage 1 pass.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Real-World ISMS Implementation Case Study FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Certification Audit Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Real-World ISMS Implementation Case Study (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 003_002: ISMS Framework & Working Procedures! Real-world ISMS implementation is the synthesis of everything you have mastered: from Deming's PDCA cycle and Statement of Applicability risk engineering to 93 Annex A controls, 6-hour CERT-In incident escalation, multi-region disaster recovery, and multi-framework harmonization with NIST CSF and COBIT. As future CISOs, Lead Implementers, and Lead Auditors, lead with integrity, enforce Evidence Triangulation, and build cybersecurity systems that protect national critical infrastructure and guarantee total statutory Safe Harbor under global and Indian cyber laws!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
