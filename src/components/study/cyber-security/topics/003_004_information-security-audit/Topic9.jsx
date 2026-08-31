import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: Active 8D Discipline Key
  const [selectedDisciplineKey, setSelectedDisciplineKey] = useState("d4_root_cause");

  // Studio 2: Active 5-Whys Scenario Key
  const [selectedWhyScenarioKey, setSelectedWhyScenarioKey] = useState("scenario_unpatched_server");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_iam_capa");

  // Studio 1: 8D CAPA Disciplines Data
  const eightDDisciplines = {
    d1_team: {
      key: "d1_team",
      name: "D1: Establish the Cross-Functional Team",
      objective: "Assemble a dedicated incident response and remediation team with domain champions.",
      deliverable: "CIRT Team Roster with Named Custodians (Security, DevOps, QA, Legal).",
      action: "Assign Lead Security Architect (Mamata), DevOps Lead, and Legal Counsel with defined escalation authority.",
      metric: "Team assembled within < 2 hours of Major Non-Conformity issuance.",
      status: "COMPLETED",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    d2_problem: {
      key: "d2_problem",
      name: "D2: Describe the Problem (PLOR)",
      objective: "Formulate a precise Problem Statement following Problem, Location, Objective Evidence, and Requirement (PLOR).",
      deliverable: "Formal ISO 27001 Non-Conformity PLOR Statement.",
      action: "Document: '4 Production Web Servers missing CVE-2026-9812 patch in Kolkata VPC violating Clause 8.19.'",
      metric: "PLOR ambiguity score = 0; signed off by Lead Auditor.",
      status: "COMPLETED",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    d3_containment: {
      key: "d3_containment",
      name: "D3: Implement Containment Action (Correction)",
      objective: "Isolate affected assets immediately to prevent ongoing security harm or data loss.",
      deliverable: "Emergency Containment Confirmation & Firewall Isolation Log.",
      action: "Quarantined 4 vulnerable instances behind WAF virtual patch and revoked exposed API credentials.",
      metric: "Zero active exploit attempts during containment window.",
      status: "ACTIVE CONTAINMENT",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    d4_root_cause: {
      key: "d4_root_cause",
      name: "D4: Identify & Verify True Root Cause (RCA)",
      objective: "Execute 5-Whys and Fishbone root cause analysis to uncover underlying systemic and governance failures.",
      deliverable: "Documented 5-Whys RCA and Ishikawa Cause-and-Effect Matrix.",
      action: "Identified that manual server provisioning bypassed Infrastructure-as-Code (Terraform) CI/CD scanning pipeline.",
      metric: "Underlying governance gap isolated beyond superficial human error.",
      status: "CORE DISCIPLINE",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    d5_permanent_fix: {
      key: "d5_permanent_fix",
      name: "D5: Choose Permanent Corrective Action (PCA)",
      objective: "Architect a permanent engineering control that mathematically prevents recurrence.",
      deliverable: "Architectural Design Document & Terraform CI/CD Enforcement Guardrail.",
      action: "Mandate AWS Service Control Policy (SCP) blocking non-IaC instance launch + Automated Trivy CI vulnerability gate.",
      metric: "100% automated blocking of unpatched AMIs in staging.",
      status: "APPROVED FOR DEPLOY",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    d6_implement_pca: {
      key: "d6_implement_pca",
      name: "D6: Implement & Validate Permanent Corrective Action",
      objective: "Deploy the permanent corrective control into production and validate performance.",
      deliverable: "Production Deployment Verification Report & Telemetry Dashboard.",
      action: "Merged Terraform guardrails, enabled Trivy pre-commit hooks, and redeployed all production node groups.",
      metric: "500/500 microservices scanned; 0 unpatched dependencies.",
      status: "VALIDATED IN PROD",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    d7_prevent_recurrence: {
      key: "d7_prevent_recurrence",
      name: "D7: Prevent Recurrence (Institutionalize)",
      objective: "Update ISMS policies, standard operating procedures, and developer onboarding to cement the change.",
      deliverable: "Updated ISMS Policy POL-SEC-014 & Mandatory Engineering Training Docket.",
      action: "Updated Vulnerability Management SOP, integrated automated drift alerts into Slack, and conducted team briefing.",
      metric: "100% developer completion of Secure Deployment training.",
      status: "INSTITUTIONALIZED",
      badgeClass: "bg-teal-950 text-teal-300 border-teal-800"
    },
    d8_closure_voe: {
      key: "d8_closure_voe",
      name: "D8: Verification of Effectiveness (VoE) & Formal Close",
      objective: "Lead Auditor re-testing after 60-day operational window to verify 0% root cause recurrence.",
      deliverable: "Formal ISO 27001 Lead Auditor CAPA Closure Sign-Off Certificate.",
      action: "Lead Auditor sampled 50 subsequent deployments over 60 days. Zero unpatched AMI launches. NC officially closed.",
      metric: "Root Cause Recurrence Rate = 0.0% over 60 days.",
      status: "FORMALLY CLOSED",
      badgeClass: "bg-green-950 text-green-300 border-green-800"
    }
  };

  const activeDiscipline = eightDDisciplines[selectedDisciplineKey];

  // Studio 2: 5-Whys RCA Deep Dive Data
  const fiveWhysScenarios = {
    scenario_unpatched_server: {
      key: "scenario_unpatched_server",
      title: "Scenario 1: Unpatched Apache Web Server Exploit",
      asset: "Payment Switch Frontend (Kolkata DC)",
      symptom: "Production web server compromised via known Apache Struts CVE-2026-9812 vulnerability.",
      immediateCorrection: "Re-imaged web server, applied emergency hotfix patch, and blocked malicious IP via WAF.",
      whys: [
        { level: "Why #1 (Direct Action)", question: "Why was the production web server unpatched?", answer: "The server was not included in the automated weekly patch maintenance schedule." },
        { level: "Why #2 (Process Step)", question: "Why was it missing from the patch schedule?", answer: "The virtual machine was spun up manually during a midnight latency incident and not registered in CMDB." },
        { level: "Why #3 (Engineering Control)", question: "Why was manual VM creation permitted?", answer: "Engineers possessed direct AWS Management Console root credentials without Terraform IaC enforcement." },
        { level: "Why #4 (Governance Policy)", question: "Why were direct console permissions granted?", answer: "The Cloud Change Management Policy lacked automated Service Control Policies (SCPs) blocking ad-hoc resources." },
        { level: "Why #5 (SYSTEMIC ROOT CAUSE)", question: "Why did the policy lack automated guardrails?", answer: "Absence of automated CI/CD drift detection and cloud asset inventory synchronization in the ISMS governance framework!" }
      ],
      permanentCorrectiveAction: "Enforced AWS SCP disabling console creation, implemented Terraform-only IaC pipelines, and deployed automated daily AWS Config drift detection.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    scenario_orphaned_account: {
      key: "scenario_orphaned_account",
      title: "Scenario 2: Orphaned Admin Account Active for 90 Days",
      asset: "Core Database Cluster (Barrackpore Branch)",
      symptom: "Former Lead Database Administrator account accessed database 60 days after employee resignation.",
      immediateCorrection: "Immediately revoked DB admin account, terminated active session tokens, and rotated master encryption keys.",
      whys: [
        { level: "Why #1 (Direct Action)", question: "Why was the DB admin account active after departure?", answer: "The IT Helpdesk never received an offboarding ticket for the database tier." },
        { level: "Why #2 (Process Step)", question: "Why did Helpdesk not receive an offboarding ticket?", answer: "HR department processed resignation via email without triggering the automated ITSM offboarding workflow." },
        { level: "Why #3 (Engineering Control)", question: "Why was offboarding manual rather than automated?", answer: "Database credentials used local database users rather than centralized Single Sign-On (SSO / SCIM)." },
        { level: "Why #4 (Governance Policy)", question: "Why was centralized SSO not enforced for databases?", answer: "Legacy database version lacked LDAP/SAML integration and was excluded from identity consolidation." },
        { level: "Why #5 (SYSTEMIC ROOT CAUSE)", question: "Why were legacy systems exempt from access governance?", answer: "Lack of a unified Access Management Policy enforcing SCIM de-provisioning and quarterly automated access recertification!" }
      ],
      permanentCorrectiveAction: "Integrated HashiCorp Vault with Okta SCIM for automated temporary database credentials + Mandated quarterly automated user access recertification campaigns.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    scenario_unencrypted_backup: {
      key: "scenario_unencrypted_backup",
      title: "Scenario 3: Unencrypted S3 Database Backup Leak",
      asset: "PACS Oncology Biopsy Scans (Ichapur Clinic)",
      symptom: "Auditor discovered an unencrypted S3 bucket containing 80,000 patient biopsy scans with public read access.",
      immediateCorrection: "Applied AWS S3 'Block Public Access', enabled SSE-KMS encryption, and generated Section 63 BSA forensic audit log.",
      whys: [
        { level: "Why #1 (Direct Action)", question: "Why was the S3 backup bucket unencrypted and public?", answer: "A developer created the bucket via AWS CLI with default settings for a temporary data migration script." },
        { level: "Why #2 (Process Step)", question: "Why were default unencrypted settings allowed?", answer: "The S3 creation command did not specify KMS encryption flags or private ACLs." },
        { level: "Why #3 (Engineering Control)", question: "Why was there no automated block against public buckets?", answer: "AWS Account-Level 'Block Public Access' was not enforced on that sub-account." },
        { level: "Why #4 (Governance Policy)", question: "Why was account-level guardrail missing?", answer: "The sub-account was designated as a 'Developer Sandbox' without standard production security baselines." },
        { level: "Why #5 (SYSTEMIC ROOT CAUSE)", question: "Why was sensitive patient data copied to sandbox?", answer: "No automated Data Loss Prevention (DLP) guardrails preventing production PII copy to non-compliant sandbox environments!" }
      ],
      permanentCorrectiveAction: "Enforced AWS Organizations SCP enabling mandatory KMS encryption on all buckets + Deployed Macie DLP agent blocking PII transfers to sandbox accounts.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    }
  };

  const activeWhyScenario = fiveWhysScenarios[selectedWhyScenarioKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_iam_capa",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "8D CAPA Pipeline on IAM Privilege Drift",
      budget: "₹18,50,000",
      challenge: "UPI Payment Switch Experienced Unauthorized IAM Privilege Escalation During Emergency Deployment",
      dilemma:
        "An emergency hotfix deployment bypassed change control, granting wild-card admin permissions to a deployment bot across 500 payment microservices processing ₹120 Crores daily.",
      resolution:
        "Mamata executed full 8D CAPA pipeline, applied 5-Whys RCA, enforced AWS SCPs and Terraform CI/CD linters, achieving 0% recurrence across 500 payment pods and satisfying RBI Master Directions.",
      metrics: {
        podsProtected: "500 Microservices",
        recurrenceRate: "0.0% over 90 Days",
        ciCdGateTime: "< 12s per Build",
        compliance: "RBI Master Directions & ISO 27001 Cl 10.1"
      }
    },
    {
      id: "ichapur_orphaned_scim_capa",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "5-Whys RCA on Orphaned Account Access",
      budget: "₹8,20,000",
      challenge: "Intern Account Remained Active 45 Days After Residency Completion, Exposing 80,000 Biopsy Scans",
      dilemma:
        "Hospital internal audit identified an active radiology resident account 45 days post-resignation, risking non-compliance with the Digital Personal Data Protection (DPDP) Act 2023 Section 8.",
      resolution:
        "Mahima drilled down via 5-Whys, deployed automated HR-to-Okta SCIM de-provisioning webhooks, and closed Minor NC within 14 days, securing total DPDP Act Section 8 Safe Harbor.",
      metrics: {
        deProvisionTime: "< 3 Minutes",
        minorNcClosed: "14 Days (SLA: 90 Days)",
        scansProtected: "80,000 DICOM Scans",
        compliance: "DPDP Act 2023 Sec 8(5) & Sec 33"
      }
    },
    {
      id: "barrackpore_scada_fishbone_capa",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Fishbone RCA on 220kV SCADA Substation Firmware",
      budget: "₹14,80,000",
      challenge: "4 Electrical Substations Experienced Telemetry Dropouts Due to Outdated RTU Firmware Drift",
      dilemma:
        "Remote Terminal Units (RTUs) across 4 high-voltage substations failed telemetry sync during monsoon storms due to unpatched serial driver buffer overflows.",
      resolution:
        "Debangshu categorized causes across 4 Ps, deployed automated firmware integrity hashing, achieved 100% NCIIPC compliance, and reduced Substation MTTR from 4 hours to 8 minutes.",
      metrics: {
        substationsUpgraded: "18 High-Voltage Sites",
        mttrReduction: "4 Hours ➔ 8 Minutes",
        firmwareIntegrity: "100% Cryptographic Match",
        compliance: "NCIIPC & CEA Grid Standards"
      }
    },
    {
      id: "jadavpur_capa_governance_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "8D CAPA & 5-Whys Governance Simulator",
      budget: "₹4,50,000",
      challenge: "Students Struggled to Distinguish Between Superficial Containment and Permanent Corrective Actions",
      dilemma:
        "Cybersecurity students frequently proposed 're-patching the server' as a corrective action without addressing the lack of automated CI/CD guardrails and governance policies.",
      resolution:
        "The team developed an interactive 8D CAPA Pipeline & 5-Whys RCA Simulator in React, training 215+ BCA cyber security students on ISO 27001 Clause 10.1 compliance and Verification of Effectiveness metrics.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        rcaScenariosBuilt: "14 Interactive Labs",
        examMastery: "100% CAPA Precision",
        compliance: "ISO/IEC 27001 Clause 10.1"
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 9 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Corrective and Preventive Actions (CAPA)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the CAPA Triad (Correction vs Corrective Action vs Preventive Action), execute 5-Whys and Fishbone Root Cause Analysis (RCA), 
            and implement the 8D problem-solving framework compliant with ISO/IEC 27001:2022 Clause 10.1 and DPDP Act 2023 Section 8.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 8D CAPA Lifecycle & Workflow Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 1: Interactive 8D CAPA Lifecycle &amp; Workflow Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an 8D discipline to inspect its operational objective, Lead Auditor deliverable, engineering actions, verification metrics, and ISO 27001 Clause 10.1 status.
            </p>
          </div>

          {/* 8D Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(eightDDisciplines).map((disc) => {
              const isSelected = selectedDisciplineKey === disc.key;
              return (
                <button
                  key={disc.key}
                  onClick={() => setSelectedDisciplineKey(disc.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs font-mono",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{disc.name.split(":")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{disc.name.split(":")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active 8D Discipline Details Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDiscipline.badgeClass)}>
                  {activeDiscipline.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">
                  Objective: {activeDiscipline.objective}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400 text-left sm:text-right">
                Discipline Status: <span className="text-emerald-400 font-bold">{activeDiscipline.status}</span>
              </div>
            </div>

            {/* Deliverables & Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Lead Auditor Deliverable:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeDiscipline.deliverable}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/40 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Engineering Remediation Action:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeDiscipline.action}</p>
              </div>
            </div>

            {/* Verification Metric */}
            <div className="p-4 bg-gray-900 rounded-xl border border-emerald-900/30 space-y-1.5 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">
                Verification of Effectiveness (VoE) Metric:
              </span>
              <p className="text-gray-300 text-xs sm:text-sm font-sans">{activeDiscipline.metric}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: The 5-Whys Root Cause Analysis (RCA) Deep-Dive Studio */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔍</span> Studio 2: 5-Whys Root Cause Analysis (RCA) Deep-Dive Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise cybersecurity incident to walk through the 5 levels of 'Why'—from superficial symptom to fundamental systemic root cause.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(fiveWhysScenarios).map((sc) => {
              const isSelected = selectedWhyScenarioKey === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => setSelectedWhyScenarioKey(sc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{sc.title.split(": ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{sc.asset}</div>
                </button>
              );
            })}
          </div>

          {/* Active 5-Whys Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeWhyScenario.badgeClass)}>
                  {activeWhyScenario.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">
                  Target Asset: {activeWhyScenario.asset}
                </h3>
              </div>
            </div>

            {/* Symptom & Immediate Containment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/40 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Detected Incident Symptom:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeWhyScenario.symptom}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/40 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Immediate Containment (Correction):</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeWhyScenario.immediateCorrection}</p>
              </div>
            </div>

            {/* 5-Whys Step Ladder */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-sans">
                5-Whys Iterative Drilldown to Systemic Root Cause:
              </h4>
              <div className="space-y-2 font-mono text-xs">
                {activeWhyScenario.whys.map((w, idx) => (
                  <div
                    key={idx}
                    className={clsx(
                      "p-3.5 rounded-xl border transition-all duration-300",
                      idx === 4
                        ? "bg-rose-950/40 border-rose-600/80 shadow-lg shadow-rose-950/30"
                        : "bg-gray-900 border-gray-800"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={clsx("font-bold text-xs", idx === 4 ? "text-rose-400" : "text-indigo-400")}>
                        {w.level}
                      </span>
                    </div>
                    <p className="text-gray-300 font-sans text-xs mt-1">
                      <strong>Question:</strong> {w.question}
                    </p>
                    <p className={clsx("font-sans text-xs sm:text-sm mt-1 font-semibold", idx === 4 ? "text-emerald-300" : "text-gray-200")}>
                      <strong>Finding:</strong> ➔ {w.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Permanent Corrective Action */}
            <div className="p-4 bg-gray-900 rounded-xl border border-emerald-900/30 space-y-1.5 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">
                Permanent Corrective Action (PCA - D5/D6):
              </span>
              <p className="text-gray-200 text-xs sm:text-sm font-sans">{activeWhyScenario.permanentCorrectiveAction}</p>
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
              Visualizing the Correction vs Corrective Action vs Preventive Action Triad and the 5-Whys Root Cause Drilldown Funnel.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: The CAPA Triad */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>⚡</span> Diagram A: The Core CAPA Triad (ISO 27001 Clause 10.1)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Circle 1: Correction */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="100" cy="160" r="70" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="100" y="145" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="9">CORRECTION</text>
                    <text x="100" y="160" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="7.5">(Containment)</text>
                    <text x="100" y="175" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="6.5">Fix Symptom Now</text>
                    <text x="100" y="188" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6">Isolate / Patch</text>
                  </g>

                  {/* Arrow 1 to 2 */}
                  <line x1="170" y1="160" x2="195" y2="160" stroke="#ef4444" strokeWidth="2" />

                  {/* Circle 2: Corrective Action */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="255" cy="160" r="60" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="255" y="145" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">CORRECTIVE</text>
                    <text x="255" y="158" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">ACTION</text>
                    <text x="255" y="172" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Stop Recurrence</text>
                    <text x="255" y="185" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="6">5-Whys / 8D Fix</text>
                  </g>

                  {/* Arrow 2 to 3 */}
                  <line x1="315" y1="160" x2="340" y2="160" stroke="#10b981" strokeWidth="2" />

                  {/* Circle 3: Preventive Action */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="400" cy="160" r="55" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="400" y="145" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">PREVENTIVE</text>
                    <text x="400" y="158" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">ACTION</text>
                    <text x="400" y="172" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Stop 1st Occurrence</text>
                    <text x="400" y="185" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="6">Threat Modeling</text>
                  </g>

                  <text x="250" y="270" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous Progression: Contain (D3) ➔ Eliminate Root Cause (D4-D6) ➔ Institutionalize (D7).
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: The progression of Correction, Corrective Action, and Preventive Action.
              </p>
            </div>

            {/* Diagram 2: 5-Whys Funnel */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🔻</span> Diagram B: The 5-Whys Root Cause Analysis Funnel
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Layer 1: Symptom */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="40,30 460,30 420,70 80,70" fill="#450a0a" stroke="#ef4444" />
                    <text x="250" y="55" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">LEVEL 1: Visible Security Symptom (Server Exploit)</text>
                  </g>

                  {/* Layer 2: Direct Action */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="80,75 420,75 380,115 120,115" fill="#78350f" stroke="#f59e0b" />
                    <text x="250" y="100" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">LEVEL 2: Direct Engineering Action (Missing Patch)</text>
                  </g>

                  {/* Layer 3: Process Gap */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="120,120 380,120 340,160 160,160" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="145" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">LEVEL 3: Process Gap (Manual Server Creation)</text>
                  </g>

                  {/* Layer 4: Tooling Failure */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="160,165 340,165 300,205 200,205" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="190" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">LEVEL 4: Tooling Failure (No IaC Linter)</text>
                  </g>

                  {/* Layer 5: Governance Root Cause */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="200,210 300,210 270,255 230,255" fill="#064e3b" stroke="#10b981" />
                    <text x="250" y="238" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">LEVEL 5: ROOT CAUSE</text>
                  </g>

                  {/* Bottom Resolution Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="80" y="270" width="340" height="35" rx="5" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="292" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">
                      PERMANENT FIX: AWS SCP + Terraform CI Guardrails!
                    </text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: The 5-Whys funnel penetrating from surface symptom to root cause.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: CAPA Implementation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security architects execute 8D CAPA pipelines in Kolkata, resolve orphaned accounts in Ichapur, deploy Fishbone RCA in Barrackpore, and simulate VoE in Jadavpur.
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
              Guidelines for Information Security Officers and Lead Auditors managing CAPA registers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> CAPA Engineering Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Drill to Why #5:</strong> Never stop at the first why; penetrate to governance defects.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Separate D3 from D5:</strong> Isolate immediate bleeding first, then design the permanent fix.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Single Named Owner:</strong> Assign every CAPA task to an individual with a hard deadline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 60-Day VoE:</strong> Re-test after 60 days of operations before marking 'Closed'.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common CAPA Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Blaming Human Error:</strong> Concluding "engineer made mistake" without fixing tooling gaps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Instant Closure:</strong> Closing ticket immediately upon PR merge, omitting VoE testing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Vague Acceptance Criteria:</strong> Writing "improve security" instead of measurable tests.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Skipping Management Review:</strong> Omitting CAPA trends from annual C-Suite meetings.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡</span> Audit Excellence
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain 0% Recurrence:</strong> Track repeated root causes as an ISMS Continual Improvement KPI.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 90-Day Major NC SLA:</strong> Close all Major NCs within 90 days to preserve certification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Claim DPDP Safe Harbor:</strong> Present verified CAPA registers to DPBI to avert ₹250 Cr fines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate IaC Guardrails:</strong> Convert policy requirements into automated pre-commit linters.</span>
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
              Synthesize 8D disciplines, 5-Whys root cause analysis, and Verification of Effectiveness before reviewing the practice questions.
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
                  Why deploying a security patch is never a Corrective Action on its own: Patching an exploited server is merely a 'Correction' (containment). The true 'Corrective Action' requires identifying why that server was missing from automated patch scans and enforcing Infrastructure-as-Code guardrails to prevent future unpatched instances from ever launching.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The relationship between Verification of Effectiveness (VoE) and ISO 19011 Clause 6.7: A Lead Auditor cannot close a Non-Conformity ticket the day a fix is merged. An operational monitoring window (30 to 90 days) is mandatory to sample subsequent operations and mathematically verify that the root cause recurrence rate is exactly 0.0%.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise workflows, replace vague CAPA closure criteria with objective automated verification tests (e.g. '0 critical CVEs on SonarQube CI gate across 100 consecutive builds') to ensure seamless audit sign-off.
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
                <span>Correction: Fixes symptom; Corrective Action: Prevents recurrence; Preventive Action: Stops 1st occurrence.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO/IEC 27001:2022 Clause 10.1 governs Nonconformity and Corrective Action.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>5-Whys Root Cause Analysis must penetrate to systemic governance/tooling failures.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>8D Methodology: D1 Team, D2 Problem, D3 Contain, D4 RCA, D5 Fix, D6 Validate, D7 Prevent, D8 VoE.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Verification of Effectiveness (VoE) requires 30-90 days of re-testing before closure.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Documented CAPA registers under DPDP Act Section 8 claim Safe Harbor from ₹250 Cr fines.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Corrective and Preventive Actions (CAPA) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Problem-Solving Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Corrective and Preventive Actions (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Corrective and Preventive Actions (CAPA) are the heart and soul of ISMS Continual Improvement under ISO/IEC 27001 Clause 10.1 and 10.2. Always remember: treating symptoms gives a false sense of security; only eliminating true root causes through 5-Whys and 8D engineering prevents catastrophic breaches! Master the CAPA triad, enforce rigorous 60-day Verification of Effectiveness (VoE), and maintain a 0% Root Cause Recurrence Rate to build impregnable enterprise cybersecurity resilience!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
