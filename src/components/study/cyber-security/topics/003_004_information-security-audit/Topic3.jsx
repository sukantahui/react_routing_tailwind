import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio 1: Active Audit Phase State (1 to 4)
  const [activePhaseNumber, setActivePhaseNumber] = useState(1);

  // Studio 2: Active CAPA Case State
  const [selectedCapaKey, setSelectedCapaKey] = useState("major_s3_encryption");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_4phase_audit");

  // Studio 1: 4-Phase Audit Lifecycle Data
  const auditPhases = [
    {
      phaseNumber: 1,
      title: "Phase 1: Planning & Preparation",
      subtitle: "Defining Scope, Audit Team, Checklists & Convening Opening Meeting",
      objective: "Establish formal audit alignment, verify auditor independence, and draft rigorous testing checklists.",
      activities: [
        "Formulate Audit Charter & ISMS Scope Boundary (ISO 27001 Clause 4.3)",
        "Select independent lead auditor and technical subject-matter experts",
        "Prepare ISO 19011 Testing Checklists and Working Paper templates",
        "Convene formal Opening Meeting (Entry Conference) with executive auditees"
      ],
      artifacts: {
        inputs: "Statement of Applicability (SoA), Policy Documents, Risk Register",
        outputs: "Signed Audit Plan, Audit Testing Checklists, Opening Meeting Minutes"
      },
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    {
      phaseNumber: 2,
      title: "Phase 2: Fieldwork & Evidence Gathering",
      subtitle: "Inquiry, Observation, Inspection, Re-performance & Triangulation",
      objective: "Collect verifiable, objective factual evidence to test control implementation against criteria.",
      activities: [
        "Inquiry: Structured interviews with DevOps engineers, DBAs, and CISOs",
        "Observation: Inspecting physical server room mantraps and CCTV coverage",
        "Inspection: Querying CloudTrail JSON logs, IAM policies, and KMS configs",
        "Re-performance: Testing 5-attempt account lockouts and firewall rules",
        "Triangulation: Corroborating facts across 3 independent evidence sources"
      ],
      artifacts: {
        inputs: "Live Production Systems, CloudWatch/SIEM Telemetry, Physical Sites",
        outputs: "Auditor Working Papers (WP-01 to WP-50), Screenshot Hashes, Log Extracts"
      },
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    {
      phaseNumber: 3,
      title: "Phase 3: Reporting & Exit Conference",
      subtitle: "Formulating 5-Part Non-Conformity Notices & Closing Meeting",
      objective: "Evaluate factual evidence against criteria, draft findings, and agree on remediation deadlines.",
      activities: [
        "Classify findings: Conformity, Minor NC, Major NC, or OFI",
        "Draft 5-Part Non-Conformity Notices (Criteria, Condition, Cause, Effect, Recommendation)",
        "Convene formal Closing Meeting (Exit Conference) with executive leadership",
        "Publish finalized, signed Information Security Audit Report"
      ],
      artifacts: {
        inputs: "Compiled Working Papers, Triangulated Evidence, Criteria Standards",
        outputs: "Formal Audit Report, Non-Conformity Notices (NCNs), Exit Conference Sign-off"
      },
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      phaseNumber: 4,
      title: "Phase 4: Follow-up & CAPA Closure",
      subtitle: "Root Cause Analysis (5 Whys), 30/90-Day CAPA & Re-verification",
      objective: "Ensure the auditee eliminates root causes and verify permanent corrective action closure.",
      activities: [
        "Auditee executes 5-Whys Root Cause Analysis (RCA) on all non-conformities",
        "Submit Corrective and Preventive Action (CAPA) plan (30-day Major / 90-day Minor SLA)",
        "Engineering deployment of permanent fixes (Terraform linters, KMS encryption)",
        "Auditor re-inspection of technical evidence and formal issuance of CAPA Closure Certificate"
      ],
      artifacts: {
        inputs: "Non-Conformity Notices (NCNs), Engineering Fix Evidence, Git Commits",
        outputs: "Approved CAPA Plan, Verified Test Proof, Final Audit Closure Certificate"
      },
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  ];

  const currentPhase = auditPhases[activePhaseNumber - 1];

  // Studio 2: CAPA Cases Data
  const capaCases = {
    major_s3_encryption: {
      key: "major_s3_encryption",
      severity: "MAJOR NON-CONFORMITY",
      sla: "30 Calendar Days (Emergency)",
      title: "AWS S3 Bucket Containing 800k PII Records Lacks Server-Side Encryption",
      criteria: "ISO 27001 Control A.8.24 (Cryptography) & DPDP Act 2023 Section 8(5)",
      condition: "S3 bucket `payshield-core-trans` stores raw credit card PANs and bank details with default encryption disabled.",
      fiveWhysRca: [
        "Why 1: S3 bucket was created without `aws_kms_key` parameter.",
        "Why 2: Terraform infrastructure script was manually written without security review.",
        "Why 3: CI/CD pull request merged without running automated static security linters.",
        "Why 4: DevOps branch protection rules did not mandate Checkov/tfsec scanning.",
        "ROOT CAUSE: Lack of mandatory centralized DevSecOps Infrastructure-as-Code (IaC) security gates in GitHub Actions."
      ],
      correctiveAction: "1. Enabled default AWS KMS AES-256 encryption on bucket. 2. Added mandatory Checkov/tfsec linter to CI/CD pipeline blocking unencrypted S3 commits.",
      reverification: "Auditor inspected AWS CLI output (KMS active) and tested failing pull request in GitHub Actions. Finding formally CLOSED.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    minor_patch_lag: {
      key: "minor_patch_lag",
      severity: "MINOR NON-CONFORMITY",
      sla: "90 Calendar Days (Standard)",
      title: "5 Staging Servers Overdue for Monthly Security Kernel Patches",
      criteria: "ISO 27001 Control A.8.8 (Management of Technical Vulnerabilities)",
      condition: "5 staging EC2 instances ran Linux kernel 5.15 with 3 moderate CVEs unpatched for 45 days (SLA: 30 days).",
      fiveWhysRca: [
        "Why 1: Staging servers missed the automated maintenance reboot window.",
        "Why 2: Staging tag `env:staging-qa` was mislabeled as `env:sandbox-temp`.",
        "Why 3: AWS Systems Manager Patch Baseline was configured only for `env:staging`.",
        "ROOT CAUSE: Inconsistent cloud asset tagging taxonomy across development teams."
      ],
      correctiveAction: "1. Applied kernel updates to all 5 instances. 2. Enforced AWS Tag Policy rejecting any resource created without standardized tags.",
      reverification: "Auditor reviewed AWS Systems Manager Compliance Dashboard showing 100% compliance across all 500 instances. Finding formally CLOSED.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    ofi_slack_pager: {
      key: "ofi_slack_pager",
      severity: "OPPORTUNITY FOR IMPROVEMENT (OFI)",
      sla: "Discretionary (Next Sprint)",
      title: "Failed Admin Login Alerts Sent to Slack Without Automated On-Call Escalation",
      criteria: "ISO 27001 Control A.8.16 (Monitoring Activities)",
      condition: "CloudWatch triggers Slack alerts to `#sec-alerts`, but lacks automated off-hours phone paging.",
      fiveWhysRca: [
        "Control is fully compliant with baseline logging, but could be enhanced for off-hours critical incident response."
      ],
      correctiveAction: "Integrated AWS CloudWatch Alarm with PagerDuty webhook to trigger automated on-call engineer phone escalations for SEV-1 root login attempts.",
      reverification: "Auditor noted proactive adoption of best-practice alerting. Recorded as positive improvement observation.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    }
  };

  const activeCapa = capaCases[selectedCapaKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_4phase_audit",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Executing 4-Phase Audit on 500 Microservices",
      budget: "₹18,50,000",
      challenge: "UPI Switch Faced Annual RBI IS Audit Requiring Flawless Fieldwork and 30-Day CAPA",
      dilemma:
        "PayShield India required a complete, auditable 4-phase audit cycle across 500 payment microservices processing ₹120 Crores daily to satisfy RBI Cyber Security Master Directions.",
      resolution:
        "Mamata chaired Opening Meeting, triangulated CloudTrail logs across 500 microservices during fieldwork, closed 3 minor NCs in Phase 4 within 21 days, and achieved 100% clean certification for PayShield India.",
      metrics: {
        phasesExecuted: "100% 4-Phase Lifecycle",
        fieldworkWorkingPapers: "50 Documented WPs",
        capaClosureTime: "21 Days (Well under 30d SLA)",
        compliance: "ISO 27001 Clause 9.2 & RBI"
      }
    },
    {
      id: "ichapur_hospital_4phase",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Clinical Oncology 4-Phase Audit",
      budget: "₹8,20,000",
      challenge: "80,000 Biopsy Records Required Phase 2 Evidence Extraction and Phase 4 DPDP CAPA",
      dilemma:
        "Hospital required an independent Data Audit under DPDP Act Section 10 for 80,000 cancer patient records, requiring rigorous fieldwork evidence triangulation and statutory CAPA verification.",
      resolution:
        "Mahima guided the clinical team through the 4 phases, extracted S3 Object Lock crypto-shredding logs, resolved 1 Minor NC regarding consent logging, and secured total statutory Safe Harbor against ₹250 Cr fines.",
      metrics: {
        patientRecordsGoverned: "80,000 Biopsy Records",
        triangulatedSources: "Logs + Interviews + DPA",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        compliance: "DPDP Act 2023 Sec 10 & NABH"
      }
    },
    {
      id: "barrackpore_scada_4phase",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA OT NCIIPC Fieldwork & Follow-up",
      budget: "₹14,80,000",
      challenge: "18 Transmission Substations Faced Statutory Phase 2 Physical Fieldwork Inspections",
      dilemma:
        "18 high-voltage 220kV transmission substations faced statutory Phase 2 physical on-site inspections by NCIIPC auditors evaluating hardware data diodes under IT Act Section 70.",
      resolution:
        "Debangshu facilitated Opening Meeting, demonstrated hardware data diode isolation during Phase 2 fieldwork, and achieved zero non-conformities during the Phase 3 Closing Meeting under IT Act Section 70 rules.",
      metrics: {
        substationsAudited: "18 High-Voltage Sites",
        phase2FieldworkTests: "Data Diode Telemetry Tests",
        majorFindings: "0 Non-Conformities",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_lifecycle_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Audit Lifecycle & CAPA Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Structure 5-Part NCNs and Perform 5-Whys Root Cause Analysis",
      dilemma:
        "Cybersecurity students struggled to formulate structured 5-part Non-Conformity Notices (Criteria, Condition, Cause, Effect, Recommendation) and execute 5-Whys Root Cause Analysis.",
      resolution:
        "The team developed an interactive 4-Phase Audit Lifecycle & CAPA Resolution Studio in React, training 215+ BCA cyber security students on ISO 19011 audit execution and registrar exit conferences.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        ncnDocketsDrafted: "90+ Finding Reports",
        examMastery: "100% Audit Lifecycle Mastery",
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 3 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            The Security Audit Lifecycle: Planning, Fieldwork, Reporting, Follow-up
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Execute the complete ISO 19011 operational audit cycle: master Phase 1 Planning &amp; Opening Meetings, 
            Phase 2 Fieldwork Evidence Triangulation, Phase 3 Non-Conformity Reporting &amp; Exit Conferences, and Phase 4 Corrective Action Plan (CAPA) resolution with 5-Whys Root Cause Analysis.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 4-Phase Audit Lifecycle Stepper */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 1: 4-Phase Operational Audit Lifecycle Stepper
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step sequentially through the 4 operational phases of an Information Security Audit under ISO 19011 to inspect core objectives, fieldwork activities, input/output artifacts, and auditor checkpoints.
            </p>
          </div>

          {/* Phase Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {auditPhases.map((ph) => {
              const isSelected = activePhaseNumber === ph.phaseNumber;
              return (
                <button
                  key={ph.phaseNumber}
                  onClick={() => setActivePhaseNumber(ph.phaseNumber)}
                  className={clsx(
                    "p-3 rounded-xl text-center border transition-all text-xs font-mono",
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-400 font-bold shadow-lg scale-105"
                      : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] uppercase opacity-80">PHASE 0{ph.phaseNumber}</div>
                  <div className="font-sans font-bold mt-0.5 truncate">{ph.title.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentPhase.badgeClass)}>
                  {currentPhase.title}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 font-sans">
                  {currentPhase.subtitle}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400">
                Phase: <span className="text-emerald-400 font-bold">{activePhaseNumber} of 4 Completed</span>
              </div>
            </div>

            {/* Objective & Core Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Primary Phase Objective:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{currentPhase.objective}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Key Operational Activities:</span>
                <ul className="space-y-1 text-gray-300 font-sans">
                  {currentPhase.activities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✔</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Input vs Output Artifacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Required Input Artifacts:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{currentPhase.artifacts.inputs}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Published Output Deliverables:</span>
                <p className="text-emerald-300 text-xs font-semibold leading-relaxed font-sans">{currentPhase.artifacts.outputs}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Corrective and Preventive Action (CAPA) Workflow Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛠️</span> Studio 2: Corrective Action Plan (CAPA) &amp; 5-Whys RCA Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an identified audit non-conformity to inspect its 5-part notice schema, step through the 5-Whys Root Cause Analysis, and verify the auditor's re-inspection closure.
            </p>
          </div>

          {/* CAPA Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(capaCases).map((cc) => {
              const isSelected = selectedCapaKey === cc.key;
              return (
                <button
                  key={cc.key}
                  onClick={() => setSelectedCapaKey(cc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{cc.title.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{cc.severity}</div>
                </button>
              );
            })}
          </div>

          {/* Active CAPA Details */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeCapa.badgeClass)}>
                  {activeCapa.severity} • SLA: {activeCapa.sla}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 font-sans">
                  {activeCapa.title}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400">
                Criteria: <span className="text-white font-bold">{activeCapa.criteria.split(" & ")[0]}</span>
              </div>
            </div>

            {/* Condition & 5-Whys RCA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Observed Condition (Finding Evidence):</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeCapa.condition}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">5-Whys Root Cause Analysis (RCA):</span>
                <div className="space-y-1 text-gray-300 font-sans text-xs">
                  {activeCapa.fiveWhysRca.map((why, idx) => (
                    <div key={idx} className={clsx(why.startsWith("ROOT CAUSE") ? "text-amber-300 font-bold mt-1" : "")}>
                      {why}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Corrective Action & Re-Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Deployed Corrective Action Plan (CAPA):</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeCapa.correctiveAction}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Auditor Re-Verification &amp; Closure Proof:</span>
                <p className="text-emerald-300 text-xs font-semibold leading-relaxed font-sans">{activeCapa.reverification}</p>
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
              Visualizing the 4-Phase ISO 19011 Audit Lifecycle and the Root Cause Analysis (RCA) to CAPA Closure Flow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 4-Phase Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 4-Phase Audit Lifecycle Flowchart
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="100" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="75" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. PLANNING</text>
                    <text x="75" y="60" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Opening Meeting</text>
                  </g>

                  <line x1="125" y1="50" x2="145" y2="50" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan75)" />

                  {/* Phase 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="145" y="25" width="100" height="50" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="195" y="47" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">2. FIELDWORK</text>
                    <text x="195" y="60" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Triangulate Logs</text>
                  </g>

                  <line x1="245" y1="50" x2="265" y2="50" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowPurple75)" />

                  {/* Phase 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="100" height="50" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="315" y="47" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">3. REPORTING</text>
                    <text x="315" y="60" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Exit Conference</text>
                  </g>

                  <line x1="365" y1="50" x2="385" y2="50" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPink75)" />

                  {/* Phase 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="385" y="25" width="95" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="432" y="47" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">4. FOLLOW-UP</text>
                    <text x="432" y="60" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">CAPA Closure</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="125" width="455" height="60" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="150" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      RIGOROUS EVIDENCE-BASED GOVERNANCE
                    </text>
                    <text x="250" y="167" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Guarantees unshakeable audit defensibility under ISO 19011 and DPDP Act Section 10.
                    </text>
                  </g>

                  <text x="250" y="235" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Opening Meeting ➔ Triangulated Fieldwork ➔ Exit Meeting ➔ Verified CAPA Closure.
                  </text>

                  <defs>
                    <marker id="arrowCyan75" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowPurple75" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowPink75" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.1: The 4-phase Information Security Audit lifecycle flowchart (ISO 19011).
              </p>
            </div>

            {/* Diagram 2: RCA to CAPA Flow */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: RCA to CAPA Verification Flow
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Finding Issued */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="130" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="90" y="47" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">1. NCN ISSUED</text>
                    <text x="90" y="60" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6.5">Major / Minor NC</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Step 2: RCA 5 Whys */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="250" y="47" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">2. 5-WHYS RCA</text>
                    <text x="250" y="60" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">Find Root Cause</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Step 3: CAPA Deploy */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="410" y="47" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">3. CAPA DEPLOY</text>
                    <text x="410" y="60" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Fix &amp; Prevent Gaps</text>
                  </g>

                  {/* Step 4: Auditor Re-verification */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="125" width="200" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="147" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      4. AUDITOR RE-VERIFICATION
                    </text>
                    <text x="250" y="162" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">
                      Re-samples Evidence ➔ Finding CLOSED!
                    </text>
                  </g>

                  <line x1="410" y1="70" x2="410" y2="100" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="410" y1="100" x2="250" y2="100" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="250" y1="100" x2="250" y2="125" stroke="#10b981" strokeWidth="1.5" />

                  <text x="250" y="225" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Auditors only close findings after independently re-testing permanent technical proof.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.2: The Root Cause Analysis (RCA) to CAPA verification and closure workflow.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Audit Lifecycle Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads execute audits in Kolkata, govern healthcare data in Ichapur, manage SCADA in Barrackpore, and simulate CAPA in Jadavpur.
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
              Guidelines for Lead Auditors and Compliance Engineers executing audit lifecycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Lifecycle Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Triangulate Evidence:</strong> Back every finding with interviews, configs, and logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Structure 5-Part NCNs:</strong> Include Criteria, Condition, Cause, Effect, Recommendation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Strict SLAs:</strong> Resolve Major NCs in &lt; 30 days and Minor in &lt; 90 days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use 5-Whys RCA:</strong> Eliminate underlying systemic flaws, not just surface symptoms.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Lifecycle Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Surprise Finding Trap:</strong> Failing to disclose findings during the Exit Meeting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Superficial Patching:</strong> Fixing a single server without fixing patch policy linters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Single-Source Reliance:</strong> Issuing findings based purely on verbal statements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing Working Papers:</strong> Failing to securely archive working papers for 3+ years.</span>
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
                  <span><strong>Report CAPA to BRMC:</strong> Track audit remediation to Board Committees quarterly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce DPDP Audits:</strong> Execute 4-phase data audits for Section 10 compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Re-test Technical Proof:</strong> Demand verified CLI/API outputs before CAPA sign-off.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate IaC Linters:</strong> Embed Checkov/tfsec in CI/CD to prevent S3 config drift.</span>
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
              Synthesize the 4-phase audit lifecycle and CAPA resolution workflows before reviewing the comprehensive practice questions.
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
                  Why you must always perform Root Cause Analysis (RCA) rather than superficial symptom patching: When an auditor discovers an unencrypted S3 bucket, simply clicking 'Enable Encryption' in the AWS Console is a superficial fix. An effective engineer uses the 5-Whys to find out why the DevOps Terraform pipeline allowed an unencrypted bucket to be deployed in the first place, adding an automated Checkov/tfsec CI/CD linter to prevent the flaw permanently.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The importance of the Exit Conference (Closing Meeting): An audit report must never contain surprise findings that were not discussed during the Closing Meeting. The exit meeting allows auditees to verify factual evidence, clarify misunderstandings, and agree on binding calendar SLAs (30 days for Major NCs, 90 days for Minor NCs).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your audit working papers, always structure your findings using the standardized 5-part schema: Criteria (The Standard), Condition (The Fact), Cause (The Reason), Effect (The Risk), and Recommendation (The Fix).
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
                <span>4 Phases: 1. Planning ➔ 2. Fieldwork ➔ 3. Reporting ➔ 4. Follow-up CAPA.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Opening Meeting confirms scope, schedule, logistics, and confidentiality.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>4 Fieldwork Modalities: Inquiry, Observation, Inspection, Re-performance.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>5-Part NCN: Criteria, Condition, Cause, Effect, Recommendation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Major NC CAPA SLA is 30 Days; Minor NC CAPA SLA is 90 Days.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 10 follows the 4-phase audit lifecycle to ensure safe harbor.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="The Security Audit Lifecycle FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Audit Execution Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="The Security Audit Lifecycle: Planning, Fieldwork, Reporting, Follow-up (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The 4-Phase Information Security Audit Lifecycle (Planning, Fieldwork, Reporting, Follow-up) is the operational engine of ISO 19011 and ISO/IEC 27001 Clause 9.2. Always remember: an audit is only as strong as its evidence triangulation and its CAPA resolution velocity! Master the 5-Part Non-Conformity Notice formula (Criteria, Condition, Cause, Effect, Recommendation), enforce 5-Whys Root Cause Analysis, close Major NCs within 30 days, and maintain unshakeable compliance under Indian DPDP Act Section 10 and RBI Master Directions!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
