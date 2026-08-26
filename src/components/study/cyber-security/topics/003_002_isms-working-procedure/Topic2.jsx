import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Studio 1: PDCA Phase Selector State
  const [selectedPdcaPhase, setSelectedPdcaPhase] = useState("act_phase");

  // Studio 2: CAPA 5-Whys Scenario State
  const [selectedCapaScenarioKey, setSelectedCapaScenarioKey] = useState("unencrypted_s3_snapshot");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_pdca_cycle");

  // Studio 1: 4 PDCA Phases Data
  const pdcaPhases = {
    plan_phase: {
      key: "plan_phase",
      name: "1. PLAN Phase (Establish the ISMS)",
      clauses: "ISO/IEC 27001 Clauses 4, 5, 6, 7",
      theme: "Strategy, Scope & Risk Assessment",
      operationalTasks:
        "Define ISMS context and boundaries; secure top management leadership and policy signature; conduct formal information security risk assessments; author the Statement of Applicability (SoA) mapping all 93 controls.",
      deliverables: "ISMS Scope Statement, Signed Security Policy, Enterprise Risk Register, Statement of Applicability (SoA).",
      failureRisk: "Selecting controls without risk assessment; leaving critical cloud services outside the documented scope.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    do_phase: {
      key: "do_phase",
      name: "2. DO Phase (Implement and Operate)",
      clauses: "ISO/IEC 27001 Clause 8 & Annex A (93 Controls)",
      theme: "Control Execution & Security Operations",
      operationalTasks:
        "Deploy technical controls (AES-256 encryption, FIDO2 MFA, SIEM, DLP); conduct role-based training and unannounced phishing simulations; manage daily operational change control and vendor risk.",
      deliverables: "Configured Firewalls & HSMs, SETA Training Logs, 24/7 SOC Telemetry, Change Management Tickets.",
      failureRisk: "Deploying tools without monitoring them; failing to train staff, leading to 35%+ Phish-Prone failure rates.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    check_phase: {
      key: "check_phase",
      name: "3. CHECK Phase (Monitor and Review)",
      clauses: "ISO/IEC 27001 Clause 9",
      theme: "Performance Evaluation & Internal Audits",
      operationalTasks:
        "Monitor security KPIs (MTTR, MTTD, patch velocity); conduct scheduled first-party Internal Audits (Clause 9.2); convene the annual Executive Management Review (Clause 9.3) to present audit findings to the Board.",
      deliverables: "Internal Audit Reports, Security KPI Dashboards, Executive Management Review Meeting Minutes.",
      failureRisk: "Auditing your own work (lack of auditor independence); failing to present audit findings to top management.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    act_phase: {
      key: "act_phase",
      name: "4. ACT Phase (Maintain and Improve)",
      clauses: "ISO/IEC 27001 Clause 10",
      theme: "Continuous Improvement & CAPA",
      operationalTasks:
        "Triage internal/external audit non-conformities; conduct 5-Whys Root Cause Analysis (RCA); execute Corrective and Preventive Actions (CAPA); feed lessons learned back into the PLAN phase for the next cycle.",
      deliverables: "Nonconformity Reports, 5-Whys Root Cause Investigations, Closed CAPA Remediation Logs.",
      failureRisk: "Fixing only the superficial symptom without implementing systemic preventive controls; stale ISMS.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activePhase = pdcaPhases[selectedPdcaPhase];

  // Studio 2: CAPA 5-Whys Scenarios Data
  const capaScenarios = {
    unencrypted_s3_snapshot: {
      key: "unencrypted_s3_snapshot",
      title: "1. Unencrypted Customer DB Snapshot Leaked",
      finding: "Non-Conformity NC-04: Production PostgreSQL snapshot containing customer Aadhaar/PAN data was stored in an unencrypted, publicly readable AWS S3 bucket.",
      whySteps: [
        "Why 1: The S3 bucket permissions were explicitly set to 'public-read' during creation.",
        "Why 2: A junior DevOps engineer needed to share database snapshots with an external QA testing agency.",
        "Why 3: The organization lacked a secure B2B API portal and synthetic test data generation pipelines.",
        "Why 4: The development environment had no pre-commit automated Infrastructure as Code (IaC) linting.",
        "Why 5 (Root Cause): Third-Party Vendor Access Policy (A.5.19) was missing operational enforcement procedures in CI/CD pipelines!"
      ],
      correctiveAction: "Immediately changed S3 bucket permissions to private and enabled AWS KMS AES-256-GCM encryption across all backup snapshots.",
      preventiveAction: "Implemented an AWS Service Control Policy (SCP) permanently blocking public S3 buckets, and added automated Checkov/Terraform linters in CI/CD pipelines."
    },
    departing_employee_vpn: {
      key: "departing_employee_vpn",
      title: "2. Departing Employee Retained Active VPN Access",
      finding: "Non-Conformity NC-11: A Senior DevOps Engineer who resigned 3 weeks ago still possessed active OpenVPN credentials and database root access keys.",
      whySteps: [
        "Why 1: The user's active directory account and VPN certificate were not revoked on their last working day.",
        "Why 2: The IT Helpdesk received no formal offboarding ticket from the Human Resources department.",
        "Why 3: The HR offboarding process was conducted via manual paper forms rather than an automated ERP workflow.",
        "Why 4: The organization lacked an automated Joiner-Mover-Leaver (JML) identity synchronization bridge.",
        "Why 5 (Root Cause): ISO 27001 Control A.6.5 (Disciplinary / Termination Process) was not integrated with Identity and Access Management (IAM) software!"
      ],
      correctiveAction: "Immediately revoked VPN certificates, disabled Active Directory accounts, and rotated all production AWS IAM access keys.",
      preventiveAction: "Deployed an automated Okta / HRMS webhook that automatically suspends all corporate SSO, VPN, and database access within 15 minutes of HR termination entry."
    },
    missed_zero_day_patch: {
      key: "missed_zero_day_patch",
      title: "3. Critical Zero-Day Patch Missed on Payment Switch",
      finding: "Non-Conformity NC-18: Core payment processing nodes were running OpenSSL versions vulnerable to a known Remote Code Execution (RCE) flaw 45 days after CVE release.",
      whySteps: [
        "Why 1: The system administrator did not apply the security patch during the regular monthly maintenance window.",
        "Why 2: The vulnerability scanning tool was configured to run only once every 90 days on production clusters.",
        "Why 3: The vulnerability management SLA did not distinguish between low-severity bugs and Critical CVSS 9.8 zero-days.",
        "Why 4: There was no automated vulnerability feed integration with the CISO security operations dashboard.",
        "Why 5 (Root Cause): ISO 27001 Control A.8.8 (Management of Technical Vulnerabilities) lacked defined 48-hour emergency patch escalation SLAs!"
      ],
      correctiveAction: "Emergency patched all 500 payment switch nodes with the updated OpenSSL binary during a 15-minute zero-downtime rolling maintenance window.",
      preventiveAction: "Configured automated daily Qualys vulnerability scans and enacted an emergency 48-hour patch deployment SLA for any vulnerability with CVSS >= 9.0."
    }
  };

  const activeCapa = capaScenarios[selectedCapaScenarioKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_pdca_cycle",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Annual PDCA Iteration for 500 Payment Microservices",
      budget: "₹18,50,000",
      challenge: "High-Velocity FinTech Switch Experienced 28 Audit Non-Conformities",
      dilemma:
        "A high-velocity multi-cloud payment switch experienced 28 minor audit non-conformities during rapid business scaling, risking ISO recertification failure and ₹250 Cr DPDP penalties.",
      resolution:
        "Mamata drove an annual PDCA cycle: updated the Risk Register in Plan, automated Terraform linters in Do, conducted comprehensive internal audits in Check, and closed all 28 CAPAs in Act, achieving 0 NCs.",
      metrics: {
        ncCountReduced: "28 NCs ➔ 0 NCs (100% Closed)",
        recertificationStatus: "ISO/IEC 27001:2022 Certified",
        phishProneRate: "Dropped to 1.4%",
        compliance: "ISO 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_pacs_capa",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare PACS Privacy CAPA Remediation",
      budget: "₹8,20,000",
      challenge: "Internal Audit Discovered 12 Unconsented Oncology Scans in Check Phase",
      dilemma:
        "Internal audit discovered 12 unconsented oncology radiology scans during the Check phase, risking severe DPDP Act statutory fines and patient privacy violations.",
      resolution:
        "Mahima executed a 5-Whys RCA, discovering that registration staff skipped consent forms during emergency admissions; automated electronic consent popups in the hospital HIS (Act phase).",
      metrics: {
        recordsRemediated: "100% Consent Traced",
        capaClosureTime: "14 Days (SLA: 90 Days)",
        nabhReadiness: "100% Audit Approved",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_drill",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Incident Drill Loop",
      budget: "₹14,80,000",
      challenge: "Testing Incident Escalation Times Across 18 High-Voltage Substations",
      dilemma:
        "Ensuring 18 high-voltage 220kV transmission substations could detect and escalate simulated SCADA cyber attacks to CERT-In within the mandatory statutory 6-hour window.",
      resolution:
        "Debangshu ran unannounced Check phase simulated cyber attack drills, measuring incident response velocity, and updated SOAR automated playbooks in Act to guarantee sub-6-hour CERT-In reporting.",
      metrics: {
        substationsDrilled: "18 High-Voltage Sites",
        certInEscalation: "2h 15m (Well Under 6h SLA)",
        auditIntegrity: "100% Section 65B Certified",
        compliance: "IT Act Section 70B & CEA Regulations"
      }
    },
    {
      id: "jadavpur_pdca_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "PDCA Simulator & CAPA Root Cause Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand How 5-Whys Prevents Symptom Fixes",
      dilemma:
        "Cybersecurity students struggled to understand how the 5-Whys methodology prevents superficial symptom fixes and how the PDCA cycle connects internal audits to continuous improvement.",
      resolution:
        "The team developed an interactive 4-Phase PDCA Simulator and CAPA Root Cause Analysis Engine in React, training 210+ BCA cyber security students on conducting ISO 27001 internal audits.",
      metrics: {
        studentsTrained: "210+ Cyber BCA Students",
        capaCaseStudies: "50+ Enterprise Scenarios",
        examMastery: "100% Audit Methodology Proficiency",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 2 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            The Plan-Do-Check-Act (PDCA) Deming Cycle in ISMS
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Drive continuous cybersecurity improvement: master the 4 iterative phases of the Deming PDCA cycle (Plan ➔ Do ➔ Check ➔ Act), 
            map ISO/IEC 27001 clauses to operational tasks, execute 5-Whys Root Cause Analysis (RCA), and close audit non-conformities with structured CAPA plans.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 4-Phase PDCA Deming Cycle Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 1: 4-Phase PDCA Deming Cycle Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select any of the 4 continuous PDCA phases to inspect mapped ISO 27001 clauses, core operational tasks, mandatory audit deliverables, and primary failure risks.
            </p>
          </div>

          {/* Phase Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(pdcaPhases).map((phase) => {
              const isSelected = selectedPdcaPhase === phase.key;
              return (
                <button
                  key={phase.key}
                  onClick={() => setSelectedPdcaPhase(phase.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{phase.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{phase.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePhase.badgeClass)}>
                  Phase: {activePhase.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Mapped Clauses: {activePhase.clauses}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Core Theme</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activePhase.theme}</span>
              </div>
            </div>

            {/* Operational Tasks & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Core Operational Tasks:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activePhase.operationalTasks}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Mandatory Audit Deliverables:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activePhase.deliverables}</p>
              </div>
            </div>

            {/* Primary Failure Risk */}
            <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1 text-xs font-mono">
              <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Primary Phase Failure Risk:</span>
              <p className="text-rose-300 text-xs sm:text-sm leading-relaxed">{activePhase.failureRisk}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: CAPA Root Cause Analysis (5-Whys) & Remediation Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔍</span> Studio 2: CAPA Root Cause Analysis (5-Whys) Engine (ACT Phase)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an audit non-conformity scenario to trace the structured 5-Whys Root Cause Analysis (RCA), distinguish immediate corrective actions from systemic preventive actions, and close audit findings.
            </p>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(capaScenarios).map((sc) => {
              const isSelected = selectedCapaScenarioKey === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => setSelectedCapaScenarioKey(sc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{sc.title}</div>
                  <div className="text-[10px] text-gray-400 mt-1 truncate">{sc.finding.split(":")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active CAPA Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-rose-950 text-rose-300 border-rose-800">
                Audit Finding (Stage 2 Non-Conformity)
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-2 font-mono">
                {activeCapa.finding}
              </h3>
            </div>

            {/* 5-Whys Drill Down */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-sans">
                5-Whys Root Cause Investigation Trail:
              </span>
              <div className="space-y-2 text-xs font-mono">
                {activeCapa.whySteps.map((step, idx) => (
                  <div key={idx} className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold font-sans">➔</span>
                    <span className={clsx("leading-relaxed", idx === activeCapa.whySteps.length - 1 ? "text-emerald-300 font-bold font-sans" : "text-gray-300")}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corrective vs Preventive Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Immediate Corrective Action (Fix Symptom):</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeCapa.correctiveAction}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Systemic Preventive Action (Prevent Recurrence):</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-sans font-semibold leading-relaxed">{activeCapa.preventiveAction}</p>
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
              Visualizing the Continuous PDCA Deming Wheel and the Incident-to-CAPA Closed Feedback Loop.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Continuous PDCA Deming Wheel */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Continuous PDCA Deming Wheel in ISMS
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Wheel Circle */}
                  <circle cx="250" cy="160" r="130" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Quadrant 1: PLAN (Top Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="30" width="180" height="90" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">1. PLAN (ESTABLISH)</text>
                    <text x="65" y="75" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Context &amp; Scope (Cl 4)</text>
                    <text x="65" y="92" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Risk Assessment (Cl 6)</text>
                    <text x="65" y="109" fill="#34d399" font-family="monospace" fontSize="7.5">• Statement of App (SoA)</text>
                  </g>

                  {/* Quadrant 2: DO (Top Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="360" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9">2. DO (OPERATE)</text>
                    <text x="285" y="75" fill="#818cf8" font-family="monospace" fontSize="7.5">• 93 Annex A Controls</text>
                    <text x="285" y="92" fill="#818cf8" font-family="monospace" fontSize="7.5">• AES-256 + FIDO2 MFA</text>
                    <text x="285" y="109" fill="#34d399" font-family="monospace" fontSize="7.5">• 24/7 SOC Telemetry</text>
                  </g>

                  {/* Quadrant 3: CHECK (Bottom Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="150" width="180" height="90" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="360" y="175" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">3. CHECK (AUDIT)</text>
                    <text x="285" y="195" fill="#cbd5e1" font-family="monospace" fontSize="7.5">• Security KPIs (MTTR)</text>
                    <text x="285" y="212" fill="#cbd5e1" font-family="monospace" fontSize="7.5">• Internal Audits (Cl 9.2)</text>
                    <text x="285" y="229" fill="#34d399" font-family="monospace" fontSize="7.5">• Management Review (9.3)</text>
                  </g>

                  {/* Quadrant 4: ACT (Bottom Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="150" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="175" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">4. ACT (IMPROVE)</text>
                    <text x="65" y="195" fill="#34d399" font-family="monospace" fontSize="7.5">• 5-Whys Root Cause (RCA)</text>
                    <text x="65" y="212" fill="#34d399" font-family="monospace" fontSize="7.5">• Corrective Actions (CAPA)</text>
                    <text x="65" y="229" fill="#a7f3d0" font-family="monospace" fontSize="7.5">• Upgrade Defenses (Cl 10)</text>
                  </g>

                  {/* Central Core Text */}
                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous rotation through Plan ➔ Do ➔ Check ➔ Act eliminates architectural drift.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.1: The 4-phase continuous PDCA Deming cycle in ISO/IEC 27001.
              </p>
            </div>

            {/* Diagram 2: Closed-Loop CAPA Engine */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Incident-to-CAPA Closed Feedback Loop
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Audit Finding */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="87" y="45" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. AUDIT FINDING</text>
                    <text x="87" y="58" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7">Non-Conformity (NC)</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed44)" />

                  {/* Step 2: 5-Whys RCA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="250" y="45" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. 5-WHYS RCA</text>
                    <text x="250" y="58" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Find Root Cause</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold44)" />

                  {/* Step 3: CAPA Execution */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="412" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. EXECUTE CAPA</text>
                    <text x="412" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Fix Symptom &amp; Root</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#10b981" strokeWidth="1.5" />

                  {/* Step 4: Verification in Check */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="372" y="125" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. VERIFY EFFECTIVENESS</text>
                    <text x="372" y="138" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Re-Audit in Next Cycle</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo44)" />

                  {/* Step 5: Updated Policy in Plan */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="125" y="125" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. FEEDBACK TO PLAN</text>
                    <text x="125" y="138" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Update Risk Register</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% CLOSED-LOOP COMPLIANCE ARCHITECTURE
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Ensures every audit finding permanently hardens enterprise security baselines.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous feedback ensures non-conformities never recur in subsequent audit cycles.
                  </text>

                  <defs>
                    <marker id="arrowRed44" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowGold44" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowIndigo44" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.2: The closed-loop Incident-to-CAPA remediation workflow.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: PDCA Implementation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads close 28 non-conformities in Kolkata, remediate healthcare privacy in Ichapur, drill SCADA escalation in Barrackpore, and simulate PDCA cycles in Jadavpur.
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
                  <span>⚡</span> PDCA Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied PDCA Solution
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
              Guidelines for ISMS Lead Auditors and CISOs driving continuous PDCA cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> PDCA Execution Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Close the Entire Loop:</strong> Never stop after Plan and Do; Check and Act build real resilience.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Apply 5-Whys for Every NC:</strong> Fix the underlying systemic cause rather than blaming employees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain Auditor Independence:</strong> Never allow engineers to audit their own codebase (Cl 9.2).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Convene Annual Management Reviews:</strong> Present audit telemetry directly to the Board (Cl 9.3).</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common PDCA Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Plan-Do-Stop Syndrome:</strong> Planning and operating tools but never conducting internal audits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Treating Symptoms Only:</strong> Patching a single server without fixing the automated patch pipeline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Architectural Drift:</strong> Allowing cloud infrastructure to deviate from baseline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Skipping CAPA Verification:</strong> Assuming an action was effective without re-auditing it.</span>
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
                  <span><strong>Automate IaC Drift Detection:</strong> Deploy AWS Config to catch manual unencrypted resources.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 48h Emergency Patch SLA:</strong> Rapidly patch any vulnerability with CVSS &gt;= 9.0.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Generate Section 65B Certificates:</strong> Cryptographically hash audit logs for court readiness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate JML Identity Suspension:</strong> Revoke departing staff access in &lt; 15 mins.</span>
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
              Synthesize continuous PDCA mechanics and CAPA workflows before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Continuous Improvement Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why cybersecurity cannot be treated as a finished product: Even if an organization achieves 100% compliance on day one, software vulnerabilities emerge constantly, employees change roles, and cloud architectures drift. The PDCA cycle ensures that defenses continually self-correct and evolve.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the 5-Whys methodology transforms security management: When an audit non-conformity is found, asking "Why?" multiple times uncovers the fundamental governance or pipeline gap (e.g. missing pre-commit linters or unintegrated HR processes) rather than scapegoating individual engineers.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise audit playbooks, ensure that every closed CAPA is formally re-evaluated in the subsequent CHECK phase to guarantee that preventive controls remain effective over time.
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
                <span>PDCA Cycle: Plan (Establish) ➔ Do (Operate) ➔ Check (Audit) ➔ Act (Improve).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>PLAN maps to Clauses 4-7; DO maps to Clause 8 &amp; 93 Annex A controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CHECK maps to Clause 9 (Internal Audits &amp; Executive Management Reviews).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ACT maps to Clause 10 (Nonconformity, 5-Whys RCA, and CAPA remediation).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Major NC blocks ISO 27001 certification; Minor NC requires approved CAPA.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Continuous PDCA proves executive due diligence under IT Act Section 85.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="The Plan-Do-Check-Act (PDCA) Deming Cycle in ISMS FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; PDCA Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="The Plan-Do-Check-Act (PDCA) Deming Cycle in ISMS (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The Plan-Do-Check-Act (PDCA) Deming cycle is the beating heart of an Information Security Management System. Remember that security is never static: you must Plan with rigorous risk assessment under Clause 6, Do by deploying robust technical and human controls under Clause 8, Check through independent internal audits under Clause 9, and Act by closing root causes with structured CAPA plans under Clause 10. This continuous cycle guarantees unbroken resilience and total legal safe harbor under the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
