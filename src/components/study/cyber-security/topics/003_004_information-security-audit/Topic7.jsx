import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: Active Maturity Level Key
  const [selectedMaturityKey, setSelectedMaturityKey] = useState("cmmi_level_3");

  // Studio 2: Active PLOR Finding Key
  const [selectedFindingKey, setSelectedFindingKey] = useState("finding_db_encryption");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_gap_analysis");

  // Studio 1: CMMI Security Process Maturity Data
  const maturityLevels = {
    cmmi_level_1: {
      key: "cmmi_level_1",
      name: "Level 1: Initial / Ad-Hoc",
      stage: "Unstructured & Reactive",
      characteristics: "Security practices are chaotic, undocumented, and depend entirely on individual heroics. No formalized ISMS policies exist.",
      auditReadiness: "0% Audit Ready. High likelihood of immediate certification denial due to multiple Major Non-Conformities.",
      gapSeverity: "CRITICAL GAPS across 90%+ of ISO 27001 clauses.",
      typicalFinding: "Major NC: Complete absence of documented information security policies, risk registers, and incident logs.",
      roadmap: "Establish basic governance, draft foundational security policies, and implement mandatory asset inventory.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    cmmi_level_2: {
      key: "cmmi_level_2",
      name: "Level 2: Managed",
      stage: "Project-Level Repeatable",
      characteristics: "Processes are planned and executed at the project level, but inconsistent across different enterprise business units.",
      auditReadiness: "35% Audit Ready. Capable of passing internal first-party audits, but vulnerable to Stage 1 external certification gaps.",
      gapSeverity: "MODERATE GAPS: Inconsistent control execution between DevOps and IT operations teams.",
      typicalFinding: "Minor NC: Risk assessments completed for payment gateway but omitted for internal HR payroll database.",
      roadmap: "Standardize policies enterprise-wide, harmonize toolsets, and appoint formal security custodians for all assets.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    cmmi_level_3: {
      key: "cmmi_level_3",
      name: "Level 3: Defined (ISO 27001 Baseline)",
      stage: "Standardized & Documented",
      characteristics: "Processes are well-defined, standardized across the entire organization, and documented in comprehensive ISMS procedures.",
      auditReadiness: "85% Audit Ready. Meets all mandatory requirements for ISO/IEC 27001:2022 Stage 1 and Stage 2 certification.",
      gapSeverity: "MINIMAL GAPS: Minor documentation drift or isolated operational lapses.",
      typicalFinding: "Opportunity for Improvement (OFI): Change approval workflows recorded via email rather than centralized Jira ticketing.",
      roadmap: "Implement automated SIEM metric monitoring and establish continuous internal audit review cycles.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    cmmi_level_4: {
      key: "cmmi_level_4",
      name: "Level 4: Quantitatively Managed",
      stage: "Metric-Driven & Telemetry-Backed",
      characteristics: "Processes are controlled using quantitative statistical metrics, automated SIEM telemetry, and continuous security dashboards.",
      auditReadiness: "98% Audit Ready. Exceeds standard ISO 27001 requirements; effortlessly passes SOC 2 Type 2 continuous evidence audits.",
      gapSeverity: "NEAR ZERO GAPS: Gaps limited to edge-case telemetry anomalies.",
      typicalFinding: "Minor NC: 1 out of 500 Kubernetes microservices experienced temporary 2-hour log forwarding latency.",
      roadmap: "Incorporate automated AI anomaly detection and autonomous self-healing configuration drift remediation.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    cmmi_level_5: {
      key: "cmmi_level_5",
      name: "Level 5: Optimizing",
      stage: "Continuous AI-Driven Innovation",
      characteristics: "Organization continuously innovates, using machine learning and autonomous pipelines to prevent vulnerabilities before they manifest.",
      auditReadiness: "100% Audit Ready. World-class benchmark for enterprise cybersecurity governance and automated compliance assurance.",
      gapSeverity: "ZERO COMPLIANCE GAPS. Focus is entirely on forward-looking threat resilience.",
      typicalFinding: "OFI: Explore post-quantum cryptographic algorithms (Kyber/Dilithium) for next-generation payment switches.",
      roadmap: "Lead industry standard working groups and publish open-source security hardening templates.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeMaturity = maturityLevels[selectedMaturityKey];

  // Studio 2: PLOR Non-Conformity Findings Data
  const plorFindings = {
    finding_db_encryption: {
      key: "finding_db_encryption",
      title: "Finding 1: Unencrypted Production Database Backups",
      classification: "MAJOR NON-CONFORMITY (Systemic Security Breakdown)",
      plor: {
        point: "ISO/IEC 27001:2022 Control A.8.24 (Use of Cryptography) & Control A.8.11 (Data Masking)",
        location: "AWS Production Cloud VPC (ap-south-1), RDS Aurora PostgreSQL Cluster (payshield-core-db)",
        evidence: "AWS CLI execution `aws rds describe-db-instances` verified `StorageEncrypted: false` and unencrypted automated snapshots on S3 bucket `payshield-daily-backup`.",
        risk: "Direct violation of DPDP Act 2023 Section 8(5), exposing 1,200,000 citizen banking records to plaintext exfiltration during S3 bucket misconfiguration, risking ₹250 CRORE fine."
      },
      capaAction: "Enable AWS KMS AES-256 automated encryption on RDS cluster and enforce bucket encryption policies via Terraform CI/CD linter within 14 days.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    finding_visitor_logs: {
      key: "finding_visitor_logs",
      title: "Finding 2: Missing Visitor Sign-In Signatures on 2 Shifts",
      classification: "MINOR NON-CONFORMITY (Isolated Operational Lapse)",
      plor: {
        point: "ISO/IEC 27001:2022 Control A.7.2 (Physical Entry Controls) & Section 9.1",
        location: "Kolkata Data Center Tier-3 Physical Server Room, Security Gate 2 Entry Logbook",
        evidence: "Physical audit inspection of Visitor Register for July 2026 revealed 2 air-conditioning maintenance technicians entered without recorded sign-out timestamps and escort signatures.",
        risk: "Isolated physical security documentation gap; CCTV footage confirmed technicians were accompanied, but operational logging discipline was compromised."
      },
      capaAction: "Retrain physical security guards on visitor register protocols and deploy digital biometric visitor badges with automated sign-out alerts within 30 days.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    finding_firewall_tracking: {
      key: "finding_firewall_tracking",
      title: "Finding 3: Manual Spreadsheet Tracking of Firewall Changes",
      classification: "OPPORTUNITY FOR IMPROVEMENT (OFI - Compliant with Optimization Potential)",
      plor: {
        point: "ISO/IEC 27001:2022 Control A.8.32 (Change Management) & Control A.8.20 (Network Security)",
        location: "Barrackpore Industrial Power Grid Network Operations Center (NOC)",
        evidence: "Network security team records perimeter firewall rule modifications in a shared Excel spreadsheet on SharePoint with manager email sign-offs.",
        risk: "While change approvals are fully compliant and documented, spreadsheet tracking lacks automated tamper-proofing and integration with SIEM audit trails."
      },
      capaAction: "Migrate firewall change requests to automated Jira Service Management workflow with GitOps integration to enhance auditability.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeFinding = plorFindings[selectedFindingKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_gap_analysis",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "ISO 27001 Stage 1 Gap Analysis & PLOR Reporting",
      budget: "₹18,50,000",
      challenge: "UPI Payment Switch Faced Stage 1 Readiness Check with 12 Unformalized Security Practices",
      dilemma:
        "Ahead of their formal ISO 27001:2022 certification, PayShield India conducted a comprehensive Gap Analysis, discovering 3 Major NCs in database encryption and 9 Minor NCs in access review logs.",
      resolution:
        "Mamata authored structured PLOR Gap Reports, mapped CMMI Level 2 practices to Level 4 metrics, and closed 3 Major NCs prior to external audit, achieving 100% first-attempt ISO 27001 certification.",
      metrics: {
        gapsIdentified: "12 Total Gaps",
        majorNCsClosed: "3 Major NCs (100%)",
        stage2Readiness: "100% Certification Pass",
        compliance: "ISO 27001:2022 & RBI"
      }
    },
    {
      id: "ichapur_dpdp_gap_analysis",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "DPDP Section 8 Gap Analysis on Oncology PACS",
      budget: "₹8,20,000",
      challenge: "80,000 Biopsy Scans Required DPDP Act Gap Assessment Before Telemedicine Launch",
      dilemma:
        "Hospital network needed to evaluate compliance against Indian DPDP Act Section 8 before connecting 80,000 patient biopsy scans to a multi-city telemedicine consultation platform.",
      resolution:
        "Mahima diagnosed 2 Minor NCs in intern access management, executed 5-Whys Root Cause Analysis, and deployed automated IAM offboarding webhooks, securing total statutory Safe Harbor.",
      metrics: {
        biopsyScansAssessed: "80,000 Scans",
        minorNCsRemediated: "2 Minor NCs Closed",
        statutorySafeHarbor: "100% Protected",
        compliance: "DPDP Act 2023 Section 8 & 33"
      }
    },
    {
      id: "barrackpore_scada_nciipc_gap",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA Substation NCIIPC Gap Closure",
      budget: "₹14,80,000",
      challenge: "18 Electrical Substations Exhibited Unencrypted RTU Modbus Telemetry Gaps",
      dilemma:
        "NCIIPC pre-audit inspection revealed 4 electrical substations transmitted unencrypted Modbus protocol telemetry over microwave links, representing a potential Major NC under IT Act Section 70.",
      resolution:
        "Debangshu classified RTU telemetry gaps, deployed hardware IPS filtering, and transitioned OT maturity from CMMI Level 1 to Level 3, earning 100% NCIIPC Critical Infrastructure compliance.",
      metrics: {
        substationsUpgraded: "18 High-Voltage Sites",
        telemetryEncrypted: "100% Modbus IPsec",
        cmmiMaturityUplift: "Level 1 ➔ Level 3",
        compliance: "IT Act Section 70 & NCIIPC"
      }
    },
    {
      id: "jadavpur_plor_report_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "PLOR Report Generator & Gap Analysis Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Draft Legally Defensible Audit Reports Without Subjective Bias",
      dilemma:
        "Cybersecurity students struggled to format audit non-conformities, writing ambiguous complaints rather than structured reports citing objective evidence and specific clauses.",
      resolution:
        "The team developed an interactive PLOR Non-Conformity Report Generator & Gap Analysis Studio in React, training 215+ BCA cyber security students on formal audit reporting and CMMI maturity assessments.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        plorReportsDrafted: "140+ Audit Reports",
        examMastery: "100% Audit Reporting Mastery",
        compliance: "ISO 19011 & NCIIPC Charter"
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 7 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Gap Analysis and Non-Conformity Reporting
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the diagnostic art of Gap Analysis and author legally defensible Audit Non-Conformity Reports using the 4-part PLOR formula 
            (Point of Standard, Location, Objective Evidence, Reason/Risk), evaluate CMMI process maturity, and remediate gaps to claim statutory safe harbor.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Gap Analysis & CMMI Maturity Evaluator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 1: CMMI Security Process Maturity Evaluator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a CMMI maturity level to inspect process characteristics, external audit readiness, gap severity, typical non-conformity findings, and recommended remediation roadmaps.
            </p>
          </div>

          {/* Maturity Level Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.values(maturityLevels).map((ml) => {
              const isSelected = selectedMaturityKey === ml.key;
              return (
                <button
                  key={ml.key}
                  onClick={() => setSelectedMaturityKey(ml.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs font-mono",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{ml.name.split(": ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{ml.name.split(": ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Maturity Details Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeMaturity.badgeClass)}>
                  {activeMaturity.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">
                  Stage: {activeMaturity.stage}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400 text-left sm:text-right">
                Readiness: <span className="text-emerald-400 font-bold">{activeMaturity.auditReadiness.split(". ")[0]}</span>
              </div>
            </div>

            {/* Characteristics & Gap Severity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Process Operational Characteristics:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeMaturity.characteristics}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Gap Severity &amp; Audit Risk:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeMaturity.gapSeverity}</p>
              </div>
            </div>

            {/* Typical Finding & Remediation Roadmap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Typical Audit Finding:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeMaturity.typicalFinding}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Recommended Remediation Roadmap:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeMaturity.roadmap}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The PLOR Non-Conformity Report Builder & Classifier */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Studio 2: PLOR Non-Conformity Report Builder
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise audit finding to inspect its 4-part PLOR breakdown (Point of Standard, Location, Objective Evidence, Reason/Risk) and corrective action plan.
            </p>
          </div>

          {/* Finding Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(plorFindings).map((pf) => {
              const isSelected = selectedFindingKey === pf.key;
              return (
                <button
                  key={pf.key}
                  onClick={() => setSelectedFindingKey(pf.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{pf.title.split(": ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{pf.title.split(": ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Finding Details */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeFinding.badgeClass)}>
                  {activeFinding.classification}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 font-sans">
                  {activeFinding.title}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400">
                Formula: <span className="text-emerald-400 font-bold">ISO 19011 PLOR Standard</span>
              </div>
            </div>

            {/* 4-Part PLOR Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Point of Standard */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">
                  [P] Point of Standard / Criteria:
                </span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeFinding.plor.point}</p>
              </div>

              {/* Location / Condition */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-cyan-900/40 space-y-1">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">
                  [L] Location / Observed Condition:
                </span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeFinding.plor.location}</p>
              </div>

              {/* Objective Evidence */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/40 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">
                  [O] Objective Evidence Collected:
                </span>
                <p className="text-emerald-300 text-xs sm:text-sm font-sans font-semibold">{activeFinding.plor.evidence}</p>
              </div>

              {/* Reason / Risk */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-rose-900/40 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">
                  [R] Reason / Impact / Risk:
                </span>
                <p className="text-rose-200 text-xs sm:text-sm font-sans">{activeFinding.plor.risk}</p>
              </div>
            </div>

            {/* CAPA Action Plan */}
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1.5 text-xs font-mono">
              <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">
                Corrective and Preventive Action (CAPA) Roadmap:
              </span>
              <p className="text-gray-300 text-xs sm:text-sm font-sans">{activeFinding.capaAction}</p>
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
              Visualizing the Gap Analysis "As-Is vs To-Be" Bridge and the 4-Part PLOR Non-Conformity Formulation Engine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: As-Is vs To-Be Bridge */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Gap Analysis "As-Is vs To-Be" Bridge
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: As-Is State */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="40" width="130" height="90" rx="6" fill="#450a0a" stroke="#ef4444" />
                    <text x="90" y="65" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8.5">"AS-IS" STATE</text>
                    <text x="90" y="80" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6.5">Current Security</text>
                    <text x="90" y="95" fill="#fecaca" font-family="monospace" textAnchor="middle" fontSize="6">CMMI Level 1 / 2</text>
                    <text x="90" y="110" fill="#fee2e2" font-family="monospace" textAnchor="middle" fontSize="6">Unencrypted DBs</text>
                  </g>

                  {/* Bridge Arrow */}
                  <line x1="160" y1="85" x2="330" y2="85" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4,4" />
                  <rect x="200" y="65" width="90" height="40" rx="4" fill="#18181b" stroke="#f59e0b" />
                  <text x="245" y="82" fill="#fef3c7" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7">GAP ANALYSIS</text>
                  <text x="245" y="95" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6">PLOR Roadmap</text>

                  {/* Right: To-Be State */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="40" width="130" height="90" rx="6" fill="#064e3b" stroke="#10b981" />
                    <text x="410" y="65" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">"TO-BE" TARGET</text>
                    <text x="410" y="80" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">ISO 27001:2022</text>
                    <text x="410" y="95" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="6">CMMI Level 3 / 4</text>
                    <text x="410" y="110" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">100% Certified</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="160" width="450" height="55" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="185" fill="#c7d2fe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      STRUCTURED REMEDIATION (CAPA)
                    </text>
                    <text x="250" y="200" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">
                      Converts operational vulnerabilities into certified conformities before the external audit.
                    </text>
                  </g>

                  <text x="250" y="255" fill="#94a3b8" textAnchor="middle" fontSize="7.5">
                    Gap Analysis bridges current vulnerabilities to target regulatory compliance.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.1: The Gap Analysis "As-Is vs To-Be" transition bridge.
              </p>
            </div>

            {/* Diagram 2: PLOR Formula Engine */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The 4-Part PLOR Non-Conformity Engine
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* P */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="95" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="67" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="7.5">[P] POINT</text>
                    <text x="67" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6">Clause / Rule</text>
                  </g>

                  <line x1="115" y1="47" x2="135" y2="47" stroke="#6366f1" strokeWidth="1.5" />

                  {/* L */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="135" y="25" width="100" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="185" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">[L] LOCATION</text>
                    <text x="185" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">Observed Asset</text>
                  </g>

                  <line x1="235" y1="47" x2="255" y2="47" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* O */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="255" y="25" width="105" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="307" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">[O] EVIDENCE</text>
                    <text x="307" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">Factual Proof</text>
                  </g>

                  <line x1="360" y1="47" x2="380" y2="47" stroke="#10b981" strokeWidth="1.5" />

                  {/* R */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="380" y="25" width="100" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="430" y="45" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="7.5">[R] REASON</text>
                    <text x="430" y="58" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6">Impact / Risk</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="460" height="60" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="150" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      DEFENSIBLE NON-CONFORMITY REPORT
                    </text>
                    <text x="250" y="167" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Eliminates subjectivity and provides clear, actionable Root Cause Analysis (RCA) inputs.
                    </text>
                  </g>

                  <text x="250" y="235" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Point + Location + Evidence + Reason = Legally Sound Audit Report.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.2: The 4-part PLOR Non-Conformity formulation engine under ISO 19011.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Gap Analysis &amp; PLOR Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads conduct Gap Analyses in Kolkata, govern clinical PACS in Ichapur, manage SCADA in Barrackpore, and generate PLOR reports in Jadavpur.
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
                  <span>⚡</span> Diagnostic Challenge ({currentLocalScenario.challenge})
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
              Guidelines for Lead Auditors and Security Consultants authoring Non-Conformity Reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Reporting Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Master PLOR:</strong> Always include Point of Standard, Location, Evidence, and Risk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain Neutrality:</strong> Never recommend specific commercial vendors in an NC report.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Apply 5-Whys RCA:</strong> Discover why the control failed rather than just fixing symptoms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Quantify Risk:</strong> Translate findings into monetary and regulatory impact for executives.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Reporting Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Subjective Complaints:</strong> Stating "Passwords feel weak" without citing policy standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing Objective Evidence:</strong> Writing an NC without CLI outputs, screenshots, or logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Misclassifying Major NCs:</strong> Downplaying systemic encryption failures as minor issues.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Vague Corrective Actions:</strong> Accepting CAPAs with no measurable completion milestones.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡</span> Enterprise Governance
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Claim DPDP Safe Harbor:</strong> Document gap remediations to protect against ₹250 Cr fines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 90-Day CAPA SLA:</strong> Close Major NCs within 90 days to retain ISO certification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Re-verify with Fieldwork:</strong> Never close an NC based solely on verbal auditee promises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Track CMMI Progression:</strong> Measure ISMS uplift from Level 1 to Level 4 annually.</span>
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
              Synthesize Gap Analysis methodologies, PLOR report drafting, and CMMI maturity ratings before reviewing the practice questions.
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
                  Why the PLOR formula is essential in formal auditing: If an auditor merely reports "Your cloud storage is insecure," the auditee will dispute the finding as subjective opinion. By proving the Point of Standard (ISO 27001 A.8.24), Location (AWS S3 daily backup), Objective Evidence (CLI JSON output showing StorageEncrypted=false), and Reason (plaintext citizen PII exposure), the finding becomes mathematically indisputable.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The difference between a Gap Analysis and a formal ISO 27001 Certification Audit: A Gap Analysis is a diagnostic, collaborative roadmap that identifies weaknesses without public pass/fail consequences. A Certification Audit is an official, independent third-party evaluation where Major Non-Conformities block certification.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your audit reports, replace vague remediation advice with concrete Root Cause Analysis (5-Whys) and time-bound Corrective Action Plans (CAPAs) targeting CMMI Level 4 quantitatively managed security maturity.
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
                <span>Gap Analysis is a diagnostic assessment comparing "As-Is" to "To-Be".</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>PLOR Formula: Point of Standard, Location, Objective Evidence, Reason.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Major NC: Total breakdown of a mandatory clause (Blocks ISO certificate).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Minor NC: Isolated lapse that does not compromise overall ISMS effectiveness.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CMMI Level 3 (Defined) represents the standard baseline for ISO 27001.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8 gap remediation shields enterprises from ₹250 Cr fines.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Gap Analysis &amp; Non-Conformity Reporting FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; PLOR Report Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Gap Analysis and Non-Conformity Reporting (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The ability to conduct a rigorous Gap Analysis and draft legally defensible Non-Conformity Reports is the hallmark of a world-class Information Security Auditor. Always remember: an audit report without objective evidence is just an opinion! Master the 4-part PLOR formula—Point of Standard, Location, Objective Evidence, and Reason/Risk. Classify findings accurately (Major NC vs Minor NC vs OFI), perform 5-Whys Root Cause Analysis, and leverage proactive gap closure to claim statutory Safe Harbor under Indian DPDP Act Section 8 and RBI directions!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
