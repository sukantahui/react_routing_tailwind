import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Studio 1: Active Audit Sample State
  const [selectedSampleKey, setSelectedSampleKey] = useState("unencrypted_s3");

  // Studio 2: Active Criteria Standard State
  const [selectedCriteriaKey, setSelectedCriteriaKey] = useState("iso27001");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_certin_audit");

  // Studio 1: Audit Samples Data
  const auditSamples = {
    unencrypted_s3: {
      key: "unencrypted_s3",
      title: "Sample 1: S3 Bucket Containing 800,000 PII Records Lacks Encryption",
      criteria: "ISO 27001 Control A.8.24 (Cryptography) & DPDP Act 2023 Section 8(5)",
      evidence: "AWS CLI query output shows `ServerSideEncryptionConfiguration: null` on bucket `payshield-core-trans`.",
      evaluation: "Total absence of mandatory cryptographic controls on sensitive customer financial data repository.",
      finding: "MAJOR NON-CONFORMITY",
      findingBadge: "bg-rose-950 text-rose-300 border-rose-800",
      impact: "Blocks ISO 27001 Certification; triggers immediate ₹250 Crore statutory fine exposure under DPDP Act Section 33."
    },
    missed_training: {
      key: "missed_training",
      title: "Sample 2: Single Employee Missed Annual Security Refresher Training",
      criteria: "ISO 27001 Control A.6.3 (Information Security Awareness & Training)",
      evidence: "HR LMS log shows Employee ID #4092 completed 2025 training but missed 2026 refresher due to medical leave.",
      evaluation: "Isolated administrative oversight; 499 of 500 employees (99.8%) completed training on schedule.",
      finding: "MINOR NON-CONFORMITY",
      findingBadge: "bg-amber-950 text-amber-300 border-amber-800",
      impact: "Conditional certification granted; 30-day Corrective Action Plan (CAPA) required to complete training."
    },
    fido2_rollout: {
      key: "fido2_rollout",
      title: "Sample 3: Production Access Enforces FIDO2 Hardware Tokens & WebAuthn",
      criteria: "ISO 27001 Control A.8.5 (Secure Authentication) & RBI Cyber Security Guidelines",
      evidence: "Okta identity logs confirm 100% of production admin logins require physical YubiKey hardware biometric auth.",
      evaluation: "Security control fully meets and exceeds standard baseline requirements with zero exceptions.",
      finding: "FULL CONFORMITY (BEST PRACTICE)",
      findingBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      impact: "Positive audit observation; satisfies RBI commercial banking multi-factor authentication mandates."
    },
    manual_slack_alert: {
      key: "manual_slack_alert",
      title: "Sample 4: Failed Admin Login Alerts Sent to Shared Channel Without PagerDuty",
      criteria: "ISO 27001 Control A.8.16 (Monitoring Activities) & ISO 19011 Best Practices",
      evidence: "CloudWatch logs successfully trigger alerts to `#sec-alerts` Slack channel, but lacks automated on-call escalation.",
      evaluation: "Control is functioning and compliant, but operational efficiency could be enhanced via automated paging.",
      finding: "OPPORTUNITY FOR IMPROVEMENT (OFI)",
      findingBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      impact: "No penalty; auditor suggests integrating automated on-call paging (PagerDuty/Opsgenie) in future sprint."
    }
  };

  const activeSample = auditSamples[selectedSampleKey];

  // Studio 2: Criteria Standards Data
  const criteriaStandards = {
    iso27001: {
      key: "iso27001",
      name: "ISO/IEC 27001:2022 (ISMS Standard)",
      focus: "Information Security Management System Governance (Clauses 4–10 & 93 Annex A Controls)",
      targetEvidence: "Policy documents, Risk Registers (6.1.2), Statement of Applicability (6.1.3), Incident Logs",
      mandate: "Global accredited certification issued by accredited Registrars (BSI, TÜV, DNV)",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    dpdp_act: {
      key: "dpdp_act",
      name: "Digital Personal Data Protection (DPDP) Act 2023",
      focus: "Citizen Privacy, Consent Management, and Reasonable Safeguards for Personal Data (Section 8 & 10)",
      targetEvidence: "Consent ledgers, DPIA assessments, Data Processing Agreements (DPAs), Crypto-shredding logs",
      mandate: "Mandatory Independent Data Audits for Significant Data Fiduciaries; ₹250 Cr Penalty Safe Harbor",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    rbi_framework: {
      key: "rbi_framework",
      name: "RBI Cyber Security Master Directions",
      focus: "Banking Technology Governance, UPI Switches, HSM Key Management, Indian Data Residency",
      targetEvidence: "SOC telemetry, WORM audit trails, CERT-In empaneled audit reports, DR switchover logs",
      mandate: "Mandatory annual audits by CERT-In Empaneled Auditors; direct presentation to Board BRMC",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    pci_dss: {
      key: "pci_dss",
      name: "PCI-DSS v4.0 (Payment Card Security)",
      focus: "Protection of Cardholder Data (PAN, CVV) across Payment Switches and E-Commerce Gateways",
      targetEvidence: "Network segmentation validation, tokenization vault configs, quarterly ASV scans, QSA audits",
      mandate: "Annual Report on Compliance (RoC) by Qualified Security Assessor (QSA) for Level 1 Merchants",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    }
  };

  const activeCriteria = criteriaStandards[selectedCriteriaKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_certin_audit",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Preparing 500 Microservices for CERT-In Audit",
      budget: "₹18,50,000",
      challenge: "UPI Payment Switch Faced Mandatory Annual RBI Audit by CERT-In Empaneled Auditors",
      dilemma:
        "A 500-node payment switch processing ₹120 Crores daily required comprehensive internal pre-audits under ISO 27001 Clause 9.2 to eliminate non-conformities before external regulators arrived.",
      resolution:
        "Mamata conducted a rigorous ISO 27001 Clause 9.2 internal pre-audit, extracting CloudTrail evidence across 500 microservices, closing 3 minor NCs, and achieving 100% clean certification with zero major findings.",
      metrics: {
        microservicesAudited: "500 Payment Pods",
        preAuditFindingsClosed: "3 Minor NCs Fixed",
        certInAuditResult: "100% Clean Pass",
        compliance: "ISO 27001 Clause 9.2 & RBI"
      }
    },
    {
      id: "ichapur_data_audit",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Independent Data Audit",
      budget: "₹8,20,000",
      challenge: "Hospital Required Independent Data Audit Under DPDP Act Section 10 for 80,000 Scans",
      dilemma:
        "Hospital clinical network stored 80,000 oncology patient biopsy scans and required formal third-party Data Audit dockets to demonstrate compliance with the Indian DPDP Act 2023.",
      resolution:
        "Mahima appointed an independent external Data Auditor to review S3 client-side encryption and access logs, verifying 100% conformity and establishing complete statutory Safe Harbor against ₹250 Cr DPDP penalties.",
      metrics: {
        recordsAudited: "80,000 Biopsy Records",
        independentAuditStatus: "100% Conformity Verified",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        compliance: "DPDP Act 2023 Sec 10 & NABH"
      }
    },
    {
      id: "barrackpore_nciipc_audit",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA OT NCIIPC Audit Inspection",
      budget: "₹14,80,000",
      challenge: "18 Transmission Substations Faced Critical Infrastructure Audit Under IT Act Sec 70",
      dilemma:
        "18 high-voltage 220kV transmission substations faced statutory national security audits by NCIIPC inspectors evaluating physical air-gaps and SCADA OT network isolation.",
      resolution:
        "Debangshu presented hardware data diode verification working papers to NCIIPC auditors, demonstrating zero inbound routable paths and securing unbroken Section 70 Protected System compliance certification.",
      metrics: {
        substationsInspected: "18 High-Voltage Sites",
        auditEvidenceVerified: "Data Diode Hardware Logs",
        majorFindings: "0 Non-Conformities",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_audit_simulation_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "IS Audit Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Confusing Vulnerability Scanning (Nessus) with IS Management Audits",
      dilemma:
        "Cybersecurity students struggled to understand the difference between technical vulnerability scanning and holistic ISO 19011 Information Security Management audits.",
      resolution:
        "The team developed an interactive Security Audit Framework & Evidence Verification Studio in React, training 215+ BCA cyber security students on ISO 19011 auditing principles and CAPA formulation.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        auditDocketsEvaluated: "85+ Case Studies",
        examMastery: "100% IS Audit Mastery",
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 0 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Introduction to Information Security Audits
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Transform security policies into verified factual assurance: master the principles of auditing under ISO 19011 and ISO/IEC 27001:2022 Clause 9.2, 
            evaluate Audit Criteria against verifiable Audit Evidence, classify Major/Minor Non-Conformities, and navigate statutory audits under the Indian DPDP Act 2023 and RBI guidelines.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Audit Evidence & Finding Evaluator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔍</span> Studio 1: Interactive Audit Evidence &amp; Finding Evaluator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select real-world audit inspection samples to compare Criteria vs Evidence, observe the auditor's objective evaluation, and inspect the resulting Finding Classification.
            </p>
          </div>

          {/* Sample Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {Object.values(auditSamples).map((samp) => {
              const isSelected = selectedSampleKey === samp.key;
              return (
                <button
                  key={samp.key}
                  onClick={() => setSelectedSampleKey(samp.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{samp.title.split(": ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{samp.finding.split(" (")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Sample Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSample.findingBadge)}>
                  {activeSample.finding}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeSample.title}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Audit Framework</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">ISO 19011 &amp; 27001</span>
              </div>
            </div>

            {/* Criteria vs Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">1. Audit Criteria (The Rule):</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeSample.criteria}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">2. Audit Evidence (Observed Fact):</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeSample.evidence}</p>
              </div>
            </div>

            {/* Evaluation & Statutory Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">3. Auditor Comparative Evaluation:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeSample.evaluation}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Statutory &amp; Certification Impact:</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed font-sans">{activeSample.impact}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Audit Triad & Criteria Mapping Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: Audit Criteria Frameworks Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a regulatory or industry audit criteria framework to examine its governance focus, required evidence types, and statutory accreditation rules.
            </p>
          </div>

          {/* Criteria Selection Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(criteriaStandards).map((crit) => {
              const isSelected = selectedCriteriaKey === crit.key;
              return (
                <button
                  key={crit.key}
                  onClick={() => setSelectedCriteriaKey(crit.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{crit.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{crit.name.split("(")[1]?.replace(")", "") || "Framework"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Criteria Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeCriteria.badgeClass)}>
                  {activeCriteria.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Criteria Scope &amp; Evidence Requirements
                </h3>
              </div>
            </div>

            {/* Focus & Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Core Audit Governance Focus:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeCriteria.focus}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Required Objective Evidence:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeCriteria.targetEvidence}</p>
              </div>
            </div>

            {/* Mandate */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-indigo-900/30 text-xs font-mono">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Statutory &amp; Industry Audit Mandate:</span>
              <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activeCriteria.mandate}</p>
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
              Visualizing the 3-Way Audit Evaluation Architecture and the Complete Audit Lifecycle under ISO 19011.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 3-Way Evaluation */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 3-Way Audit Evaluation Model
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Box: Audit Criteria */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="30" width="180" height="55" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="115" y="52" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">AUDIT CRITERIA</text>
                    <text x="115" y="66" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">ISO 27001 • DPDP Act</text>
                    <text x="115" y="77" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="6">(The Rule)</text>
                  </g>

                  {/* Right Box: Audit Evidence */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="295" y="30" width="180" height="55" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="385" y="52" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">AUDIT EVIDENCE</text>
                    <text x="385" y="66" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Syslogs • AWS Configs</text>
                    <text x="385" y="77" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="6">(The Fact)</text>
                  </g>

                  {/* Comparison Operator */}
                  <circle cx="250" cy="57" r="18" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="250" y="61" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="10">VS</text>

                  {/* Down Arrow */}
                  <line x1="250" y1="75" x2="250" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowGold74)" />

                  {/* Center Box: Audit Findings */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="100" y="125" width="300" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="250" y="147" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      AUDIT FINDING (THE RESULT)
                    </text>
                    <text x="250" y="162" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Conformity | Minor NC | Major NC | OFI
                    </text>
                  </g>

                  {/* Bottom Assurance Banner */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="215" width="450" height="50" rx="6" fill="#18181b" stroke="#cbd5e1" strokeWidth="1.5" />
                    <text x="250" y="237" fill="#f8fafc" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      OBJECTIVE INDEPENDENT ASSURANCE
                    </text>
                    <text x="250" y="252" fill="#94a3b8" font-family="monospace" textAnchor="middle" fontSize="7">
                      Eliminates subjective bias and guarantees defensibility under Indian cyber laws.
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowGold74" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.1: The 3-way Information Security Audit evaluation model (ISO 19011).
              </p>
            </div>

            {/* Diagram 2: Audit Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The 4-Phase IS Audit Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1: Planning */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="100" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="70" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">1. PLAN</text>
                    <text x="70" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">Scope &amp; Plan</text>
                  </g>

                  <line x1="120" y1="47" x2="135" y2="47" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Phase 2: Fieldwork */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="135" y="25" width="105" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="187" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="7.5">2. FIELDWORK</text>
                    <text x="187" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6">Evidence &amp; Tests</text>
                  </g>

                  <line x1="240" y1="47" x2="255" y2="47" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Phase 3: Reporting */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="255" y="25" width="105" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="307" y="45" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="7.5">3. REPORT</text>
                    <text x="307" y="58" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6">Exit Conference</text>
                  </g>

                  <line x1="360" y1="47" x2="375" y2="47" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Phase 4: Follow-up */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="375" y="25" width="105" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="427" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">4. FOLLOW-UP</text>
                    <text x="427" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">CAPA Closure</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="115" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="137" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      CONTINUOUS ISMS ASSURANCE (CLAUSE 9.2)
                    </text>
                    <text x="250" y="154" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Ensures all non-conformities have verified corrective action plans within 30 to 90 days.
                    </text>
                  </g>

                  <text x="250" y="215" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Planning ➔ Fieldwork Sampling ➔ Reporting Exit Meeting ➔ Follow-up CAPA Verification.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.2: The 4-phase Information Security Audit lifecycle (ISO 19011).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Security Audit Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads conduct CERT-In audits in Kolkata, independent data audits in Ichapur, NCIIPC inspections in Barrackpore, and simulate audits in Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Audit Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Audit Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Audit Solution
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
              Guidelines for Lead Auditors and Compliance Officers conducting Information Security Audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Auditing Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain Independence:</strong> Never audit your own code, configurations, or operations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Document Working Papers:</strong> Back every finding with screenshots, logs, and config snippets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Risk-Based Sampling:</strong> Audit 100% of Tier-1 switches; sample 5% of laptops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Structure Findings:</strong> Format non-conformities with Criteria, Evidence, and Cause.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Audit Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Opinion Trap:</strong> Writing findings based on personal preference rather than criteria.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing VA with Audits:</strong> Assuming a green Nessus scan means the ISMS is compliant.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Surprise Findings:</strong> Failing to disclose non-conformities during the Exit Meeting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Auditor Conflict of Interest:</strong> Allowing sysadmins to audit their own firewall rules.</span>
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
                  <span><strong>Empanel CERT-In Auditors:</strong> Hire certified auditors for banking regulatory compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy WORM Storage:</strong> Protect audit trails with AWS S3 Object Lock for Section 65B.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 30-Day CAPA:</strong> Remediate Major Non-Conformities within strict calendar SLAs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Schedule Clause 9.2 Reviews:</strong> Conduct internal audits prior to external certification.</span>
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
              Synthesize audit principles, criteria frameworks, and finding taxonomies before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Audit Practitioners
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why an Information Security Audit is NOT just a technical vulnerability scan: A technical vulnerability scan (like Nessus) only checks whether port 445 is open or an unpatched package exists. An Information Security Audit evaluates the total socio-technical governance system: checking whether access reviews are signed, employee background checks are verified, disaster recovery tests are documented, and policies are enforced.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the Indian DPDP Act 2023 mandates Independent Data Audits: Under Section 10, Significant Data Fiduciaries must hire independent external auditors to verify that personal data is protected with reasonable technical safeguards. An active, successful audit report provides statutory proof of due diligence under Section 8, protecting corporate directors from ₹250 Crore statutory fines under Section 33.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise audit log architectures, store electronic audit trails on Write-Once-Read-Many (WORM) storage (like AWS S3 Object Lock in Compliance Mode) to satisfy the strict electronic evidence admissibility standards of Section 65B of the Indian Evidence Act.
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
                <span>An IS Audit is a systematic, independent, evidence-based evaluation (ISO 19011).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3 Audit Pillars: Criteria (Rule), Evidence (Fact), Finding (Result).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Major NC blocks ISO 27001 certification; Minor NC requires verified CAPA.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Opportunity for Improvement (OFI) suggests best-practice optimization.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 10 mandates independent Data Audits for Significant Fiduciaries.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RBI Master Directions mandate annual audits by CERT-In empaneled auditors.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Introduction to Information Security Audits FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Security Auditing Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Information Security Audits (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Information Security Auditing is the scientific foundation of enterprise trust and regulatory assurance. Always remember: an audit is not an informal opinion—it is an evidence-based comparison of factual records against defined criteria under ISO 19011 and ISO/IEC 27001 Clause 9.2! Maintain strict auditor independence, document comprehensive working papers, classify findings into Major/Minor Non-Conformities, and ensure full statutory Safe Harbor under Indian DPDP Act Section 10 and RBI Master Directions!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
