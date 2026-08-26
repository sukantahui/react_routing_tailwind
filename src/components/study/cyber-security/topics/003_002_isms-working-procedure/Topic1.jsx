import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Studio 1: 11 New Controls Selector State
  const [selectedNewControlKey, setSelectedNewControlKey] = useState("a812_dlp");

  // Studio 2: Clauses 4-10 Selector State
  const [selectedClauseNumber, setSelectedClauseNumber] = useState(6);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_iso_transition");

  // Studio 1: The 11 New 2022 Controls Data
  const new2022Controls = {
    a57_threat_intel: {
      key: "a57_threat_intel",
      number: "A.5.7",
      name: "Threat Intelligence",
      theme: "Organizational Controls (A.5)",
      purpose: "Provide awareness of the external threat environment so the organization can take proactive mitigating action.",
      implementation: "Ingest automated STIX/TAXII threat feeds into SIEM/SOAR; track APT adversary TTPs mapped to MITRE ATT&CK.",
      attributes: ["#Preventive", "#Detective", "#Identify", "#Protection", "#Threat_management"],
      statutoryAlignment: "CERT-In Threat Advisory Compliance & RBI Threat Hunting Mandate",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    a523_cloud_security: {
      key: "a523_cloud_security",
      number: "A.5.23",
      name: "Information Security for Use of Cloud Services",
      theme: "Organizational Controls (A.5)",
      purpose: "Specify and manage information security requirements for cloud acquisition, use, management, and exit.",
      implementation: "Deploy Cloud Security Posture Management (CSPM), enforce IAM least privilege, and mandate Cloud HSM encryption.",
      attributes: ["#Preventive", "#Confidentiality", "#Protect", "#Supplier_relationships", "#Governance"],
      statutoryAlignment: "RBI Master Direction Cloud Annexure & DPDP Cross-Border Rules",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    a530_ict_readiness: {
      key: "a530_ict_readiness",
      number: "A.5.30",
      name: "ICT Readiness for Business Continuity",
      theme: "Organizational Controls (A.5)",
      purpose: "Ensure information and communication technology availability during disruptive incidents based on BCP objectives.",
      implementation: "Architect multi-AZ active-active database clusters, automate RTO/RPO failovers, and test semi-annual DR switchovers.",
      attributes: ["#Corrective", "#Availability", "#Respond", "#Recover", "#Resilience"],
      statutoryAlignment: "ISO 22301 BCMS Alignment & CEA Power Grid Reliability Regulations",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    a74_physical_monitoring: {
      key: "a74_physical_monitoring",
      number: "A.7.4",
      name: "Physical Security Monitoring",
      theme: "Physical Controls (A.7)",
      purpose: "Continually monitor physical premises to detect and deter unauthorized physical access.",
      implementation: "Deploy AI-powered CCTV motion analytics, biometric turnstiles, and automated intrusion detection sensors.",
      attributes: ["#Detective", "#Integrity", "#Detect", "#Physical_security", "#Defense"],
      statutoryAlignment: "NCIIPC Protected Systems Physical Charter (IT Act Section 70)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    a89_config_management: {
      key: "a89_config_management",
      number: "A.8.9",
      name: "Configuration Management",
      theme: "Technological Controls (A.8)",
      purpose: "Establish, document, implement, monitor, and review configurations of hardware, software, services, and networks.",
      implementation: "Enforce CIS Benchmarks via Infrastructure as Code (Terraform), with automated drift detection alerts.",
      attributes: ["#Preventive", "#Integrity", "#Protect", "#System_security", "#Protection"],
      statutoryAlignment: "CERT-In Hardening Directives & PCI-DSS v4.0 Requirement 2",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    a810_info_deletion: {
      key: "a810_info_deletion",
      number: "A.8.10",
      name: "Information Deletion",
      theme: "Technological Controls (A.8)",
      purpose: "Ensure data stored in information systems, devices, or storage media is deleted when no longer required.",
      implementation: "Deploy automated TTL partition drops and cloud KMS Crypto-Shredding to eliminate data remanence.",
      attributes: ["#Preventive", "#Confidentiality", "#Protect", "#Information_protection", "#Protection"],
      statutoryAlignment: "DPDP Act 2023 Section 8(7) Mandatory Storage Limitation (₹250 Cr Fine Shield)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    a811_data_masking: {
      key: "a811_data_masking",
      number: "A.8.11",
      name: "Data Masking",
      theme: "Technological Controls (A.8)",
      purpose: "Use data masking, pseudonymization, and anonymization to limit exposure of sensitive personal data.",
      implementation: "Configure PostgreSQL Dynamic Data Masking (DDM) to obscure Aadhaar/PAN fields for non-privileged staff.",
      attributes: ["#Preventive", "#Confidentiality", "#Protect", "#Information_protection", "#Protection"],
      statutoryAlignment: "DPDP Act 2023 Section 8(5) Technical Safeguards & RBI SPDI Rules",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    a812_dlp: {
      key: "a812_dlp",
      number: "A.8.12",
      name: "Data Leakage Prevention (DLP)",
      theme: "Technological Controls (A.8)",
      purpose: "Apply data leakage prevention measures to systems, networks, and devices processing sensitive information.",
      implementation: "Deploy endpoint agents to block USB copying, inspect outbound HTTPS traffic, and block unauthorized cloud uploads.",
      attributes: ["#Preventive", "#Detective", "#Confidentiality", "#Protect", "#Information_protection"],
      statutoryAlignment: "DPDP Act 2023 Section 8 Data Protection & IT Act Section 43A Safe Harbor",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    a816_monitoring: {
      key: "a816_monitoring",
      number: "A.8.16",
      name: "Monitoring Activities",
      theme: "Technological Controls (A.8)",
      purpose: "Monitor networks, systems, and applications for anomalous behavior and potential information security incidents.",
      implementation: "Deploy User and Entity Behavior Analytics (UEBA) integrated with 24/7 SIEM centralized log correlation.",
      attributes: ["#Detective", "#Integrity", "#Detect", "#Threat_management", "#Defense"],
      statutoryAlignment: "CERT-In 180-Day Indian Log Retention Mandate & NTP Synchronization",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    a823_web_filtering: {
      key: "a823_web_filtering",
      number: "A.8.23",
      name: "Web Filtering",
      theme: "Technological Controls (A.8)",
      purpose: "Manage access to external websites to reduce exposure to malicious and unauthorized content.",
      implementation: "Deploy Secure Web Gateways (SWG) and DNS filtering (e.g. Quad9/Cloudflare Zero Trust) to block phishing domains.",
      attributes: ["#Preventive", "#Integrity", "#Protect", "#Network_security", "#Protection"],
      statutoryAlignment: "Anti-Phishing & Anti-Malware Defense under CERT-In Guidelines",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    a828_secure_coding: {
      key: "a828_secure_coding",
      number: "A.8.28",
      name: "Secure Coding",
      theme: "Technological Controls (A.8)",
      purpose: "Ensure software is developed securely to prevent vulnerabilities throughout the entire development lifecycle.",
      implementation: "Embed automated SAST/DAST scanning into CI/CD pipelines, enforce OWASP Top 10 rules, and require peer code reviews.",
      attributes: ["#Preventive", "#Integrity", "#Protect", "#Application_security", "#Protection"],
      statutoryAlignment: "RBI FinTech Application Security Directives & OWASP Standards",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeNewControl = new2022Controls[selectedNewControlKey];

  // Studio 2: Clauses 4-10 Deep-Dive Data
  const clausesData = {
    4: {
      clauseNum: "Clause 4",
      title: "Context of the Organization",
      requirement: "Determine internal and external issues, identify interested parties, and explicitly define the scope of the ISMS.",
      artifacts: "Context Analysis Matrix, Stakeholder Expectation Register, Documented ISMS Scope Statement.",
      traps: "Excluding core cloud workloads or third-party FinTech APIs from the scope without formal auditor justification.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    5: {
      clauseNum: "Clause 5",
      title: "Leadership & Commitment",
      requirement: "Top management must demonstrate active leadership, approve the security policy, and assign roles & authorities.",
      artifacts: "Board-Approved Information Security Policy, CISO Appointment Letter, RACI Governance Matrix.",
      traps: "Treating security as a purely technical IT issue without board-level sign-off or executive budget approval.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    6: {
      clauseNum: "Clause 6",
      title: "Planning & Risk Assessment",
      requirement: "Establish a formal risk assessment methodology, evaluate risks against criteria, and produce the Statement of Applicability.",
      artifacts: "Risk Assessment Methodology, Enterprise Risk Register (SLE/ALE), Statement of Applicability (SoA).",
      traps: "Selecting controls arbitrarily from Annex A without linking them back to identified risks in the Risk Register.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    7: {
      clauseNum: "Clause 7",
      title: "Support & Resources",
      requirement: "Provide resources, ensure employee competence, conduct security awareness, and maintain controlled documentation.",
      artifacts: "Training Completion Records, Phish-Prone Percentage Metrics, Document Control Procedure (Version History).",
      traps: "Failing to train new employees during onboarding or maintaining untracked, unversioned policy documents.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    8: {
      clauseNum: "Clause 8",
      title: "Operation & Execution",
      requirement: "Plan, implement, and control operational processes to meet security requirements and execute the risk treatment plan.",
      artifacts: "Operational Change Management Logs, Vendor Risk Assessments (TPRM), Daily SOC Alert Triage Logs.",
      traps: "Failing to retain documented evidence that Annex A technical controls are actively operating in production.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    9: {
      clauseNum: "Clause 9",
      title: "Performance Evaluation",
      requirement: "Monitor security KPIs, conduct scheduled objective internal audits, and convene executive Management Reviews.",
      artifacts: "Internal Audit Schedule & Reports, Incident Metrics (MTTR/MTTD), Management Review Meeting Minutes.",
      traps: "Auditing your own work (lack of auditor independence) or skipping the annual board Management Review.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    10: {
      clauseNum: "Clause 10",
      title: "Improvement & CAPA",
      requirement: "React to nonconformities, evaluate root causes using structured techniques (5-Whys), and continually improve the ISMS.",
      artifacts: "Nonconformity Reports, 5-Whys Root Cause Analysis (RCA) Documents, Closed CAPA Remediation Logs.",
      traps: "Closing audit findings by fixing only the immediate symptom without addressing the systemic root cause.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activeClause = clausesData[selectedClauseNumber];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_iso_transition",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "ISO 27001:2013 to 2022 Transition & 11 New Controls",
      budget: "₹16,50,000",
      challenge: "Recertifying 500 Payment Nodes to the New 2022 Control Baseline",
      dilemma:
        "The payment switch needed recertification from the 2013 standard to ISO 27001:2022, requiring the rapid deployment of all 11 new controls across 500 production nodes.",
      resolution:
        "Mamata mapped all 11 new controls, deploying automated DLP (A.8.12), Data Masking (A.8.11), and Threat Intel (A.5.7), securing 100% ISO 27001:2022 recertification without non-conformities.",
      metrics: {
        newControlsActive: "11/11 New Controls Deployed",
        recertificationStatus: "ISO/IEC 27001:2022 Certified",
        majorNonConformities: "0 Major NCs Recorded",
        compliance: "ISO 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_integrated_suite",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Integrated ISO 27001 + ISO 27701 Healthcare Suite",
      budget: "₹8,20,000",
      challenge: "Simultaneous Certification for Security (ISMS) and Patient Privacy (PIMS)",
      dilemma:
        "The hospital needed simultaneous certification for information security and patient privacy without creating duplicate management silos for 80,000 oncology records.",
      resolution:
        "Mahima leveraged the Harmonized Structure to build an integrated ISMS + PIMS architecture, mapping patient oncology scans to ISO 27001 Annex A and ISO 27701 privacy controls.",
      metrics: {
        standardsIntegrated: "ISO 27001 + ISO 27701 + NABH",
        recordsGoverned: "80,000 Oncology Records",
        auditEfficiency: "50% Audit Time Reduction",
        compliance: "ISO 27001:2022 & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_governance",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA ISO 27001 Governance",
      budget: "₹12,80,000",
      challenge: "18 Substations Requiring Formal Management Governance under CEA Rules",
      dilemma:
        "18 high-voltage transmission substations required formal governance under Central Electricity Authority (CEA) regulations to prevent state-wide power grid blackout attacks.",
      resolution:
        "Debangshu structured an ISO 27001 ISMS for SCADA networks, enforcing configuration management (A.8.9) and physical monitoring (A.7.4) across all high-voltage sites under IT Act Section 70.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        scadaHardening: "100% CIS Benchmark Applied",
        ciiProtection: "10-Year Prison Risk Immunized",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_iso_clauses_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "ISO 27001 Clauses & Annex A Navigator Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Confused by Clauses 4-10 vs Annex A Control Relationships",
      dilemma:
        "Cybersecurity students struggled to understand how management clauses govern Annex A technical controls and how control attributes enable multi-standard mapping.",
      resolution:
        "The team developed an interactive ISO 27001 Clauses 4-10 and 93 Annex A Control Navigator in React, training 215+ BCA cyber security students on preparing Statements of Applicability (SoA).",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        soaMatricesCreated: "60+ Industry Case Studies",
        examMastery: "100% ISO Standard Proficiency",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 1 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            ISO/IEC 27001 Standard Overview and Structure
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the global gold standard of cybersecurity: explore the evolution from BS 7799 to ISO/IEC 27001:2022, 
            dissect mandatory management Clauses 4-10, explore all 11 brand-new 2022 security controls, and utilize the 5-attribute taxonomy for DPDP Act alignment.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive ISO 27001:2013 vs 2022 Delta & 11 New Controls Studio */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🆕</span> Studio 1: ISO 27001:2022 Delta &amp; The 11 New Controls Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select any of the 11 brand-new security controls introduced in ISO/IEC 27001:2022 to inspect its theme, purpose, technical implementation architecture, control attributes, and statutory alignment.
            </p>
          </div>

          {/* Control Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {Object.values(new2022Controls).map((ctrl) => {
              const isSelected = selectedNewControlKey === ctrl.key;
              return (
                <button
                  key={ctrl.key}
                  onClick={() => setSelectedNewControlKey(ctrl.key)}
                  className={clsx(
                    "p-2.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-mono font-bold text-indigo-400">{ctrl.number}</div>
                  <div className="font-bold text-gray-200 truncate mt-0.5">{ctrl.name}</div>
                </button>
              );
            })}
          </div>

          {/* Active New Control Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeNewControl.badgeClass)}>
                  Control {activeNewControl.number}: {activeNewControl.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Theme: {activeNewControl.theme}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Statutory Alignment</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activeNewControl.statutoryAlignment}</span>
              </div>
            </div>

            {/* Purpose & Implementation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Control Purpose (ISO Text):</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeNewControl.purpose}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Technical Implementation Architecture:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed">{activeNewControl.implementation}</p>
              </div>
            </div>

            {/* 5 Control Attributes Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-sans">
                ISO/IEC 27002:2022 Control Attributes Taxonomy:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeNewControl.attributes.map((attr, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-gray-900 text-indigo-300 border border-indigo-800/60 font-mono text-[11px] font-bold">
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Mandatory Clauses 4-10 Deep-Dive Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 2: Mandatory Management Clauses 4-10 Deep-Dive
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select any of the 7 mandatory management clauses to inspect requirement details, mandatory audit deliverables, and common auditor traps.
            </p>
          </div>

          {/* Clause Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
            {Object.values(clausesData).map((cls) => {
              const isSelected = selectedClauseNumber === parseInt(cls.clauseNum.split(" ")[1]);
              return (
                <button
                  key={cls.clauseNum}
                  onClick={() => setSelectedClauseNumber(parseInt(cls.clauseNum.split(" ")[1]))}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{cls.clauseNum}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{cls.title.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Clause Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeClause.badgeClass)}>
                  Mandatory Clause: {activeClause.clauseNum}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeClause.title}
                </h3>
              </div>
            </div>

            {/* Requirement Text */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5 text-xs font-mono">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Core ISO Standard Requirement:</span>
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeClause.requirement}</p>
            </div>

            {/* Artifacts vs Traps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Mandatory Audit Artifacts:</span>
                <p className="text-gray-300 text-xs leading-relaxed">{activeClause.artifacts}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Common Auditor Pitfalls &amp; Traps:</span>
                <p className="text-rose-300 text-xs leading-relaxed">{activeClause.traps}</p>
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
              Visualizing the Harmonized Structure (Clauses 4-10) and the Evolution of ISO 27001 (BS 7799 to 2022).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Harmonized Structure */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Harmonized Structure (Clauses 4-10)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Ring: Clauses 4-10 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="160" r="130" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
                  </g>

                  {/* Clause 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="20" width="140" height="35" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="42" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">CL 4: CONTEXT &amp; SCOPE</text>
                  </g>

                  {/* Clause 5 & 6 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="330" y="70" width="145" height="35" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="402" y="92" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">CL 5 &amp; 6: LEADERSHIP / RISK</text>
                  </g>

                  {/* Clause 7 & 8 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="330" y="195" width="145" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="402" y="217" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">CL 7 &amp; 8: SUPPORT / OPS</text>
                  </g>

                  {/* Clause 9 & 10 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="195" width="145" height="35" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="97" y="217" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">CL 9 &amp; 10: AUDIT &amp; CAPA</text>
                  </g>

                  {/* Central Core: Annex A (93 Controls) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="160" r="55" fill="#18181b" stroke="#10b981" strokeWidth="2" />
                    <text x="250" y="152" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9">ANNEX A</text>
                    <text x="250" y="167" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">93 Controls</text>
                    <text x="250" y="180" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7">4 Themes</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Harmonized Structure provides a unified governance wrapper around Annex A technical controls.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.1: The ISO/IEC 27001 Harmonized Structure (Clauses 4-10) governing Annex A controls.
              </p>
            </div>

            {/* Diagram 2: Evolution of ISO 27001 */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The Evolution of ISO 27001 (1995 to 2022)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Timeline 1: BS 7799 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="210" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="125" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">BS 7799 (1995)</text>
                    <text x="125" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">British Standard Origin</text>
                  </g>

                  <line x1="230" y1="47" x2="265" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan43)" />

                  {/* Timeline 2: ISO 27001:2005 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="215" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="372" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">ISO 27001:2005</text>
                    <text x="372" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">133 Controls • 11 Domains</text>
                  </g>

                  <line x1="372" y1="70" x2="372" y2="105" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Timeline 3: ISO 27001:2013 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="372" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">ISO 27001:2013</text>
                    <text x="372" y="138" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">114 Controls • 14 Domains</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold43)" />

                  {/* Timeline 4: ISO 27001:2022 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="125" y="125" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">ISO/IEC 27001:2022 (CURRENT)</text>
                    <text x="125" y="138" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">93 Controls • 4 Themes + 11 NEW</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      MODERNIZED FOR CLOUD, THREAT INTEL &amp; PRIVACY
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Streamlined 4 themes + 11 new controls directly satisfy DPDP Act Section 8 and RBI directions.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous evolution ensures ISO 27001 remains the global benchmark for information security.
                  </text>

                  <defs>
                    <marker id="arrowCyan43" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGold43" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.2: The chronological evolution of ISO/IEC 27001 from BS 7799 to 2022.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: ISO 27001 Implementation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads upgrade payment switches in Kolkata, integrate healthcare privacy in Ichapur, govern power grids in Barrackpore, and build SoA matrices in Jadavpur.
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
                  <span>⚡</span> ISO Standard Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied ISO 27001 Solution
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
              Guidelines for Lead Auditors and CISOs managing ISO/IEC 27001:2022 surveillance audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> ISO 27001 Audit Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use 5-Attribute Taxonomy:</strong> Query controls by NIST concepts (#Protect, #Detect) for fast mapping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy All 11 New Controls:</strong> Prioritize Cloud Security (A.5.23) and Data Masking (A.8.11).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Document SoA Exclusions:</strong> Provide clear risk/architectural justification for any excluded controls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Leverage Harmonized Structure:</strong> Integrate ISO 27001 with ISO 22301 and ISO 27701 seamlessly.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Standard Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring 2022 Revisions:</strong> Failing to adopt the 11 new controls leads to major recertification NCs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing Clauses with Annex A:</strong> Clauses 4-10 are mandatory; Annex A is selective based on risk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Internal Auditor Non-Independence:</strong> Allowing developers to audit their own codebase.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Treating SoA as Static:</strong> Failing to update the Statement of Applicability when architecture changes.</span>
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
                  <span><strong>Automate A.8.10 Info Deletion:</strong> Deploy TTL partition drops and cloud KMS Crypto-Shredding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce A.8.28 Secure Coding:</strong> Embed automated SAST/DAST scans into all CI/CD pipelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy A.8.12 DLP Filtering:</strong> Inspect outbound webmail and block unencrypted PAN/Aadhaar exports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180-Day Indian Logs:</strong> Archive tamper-proof SIEM telemetry under IT Act Section 70B.</span>
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
              Synthesize ISO 27001 standard architecture and Annex A themes before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for ISO 27001 Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why ISO/IEC 27001:2022 restructured controls into 4 simple themes: The previous 2013 standard's 14 domains were overly fragmented and failed to represent modern cloud, DevSecOps, and privacy requirements. The 4 themes (Organizational, People, Physical, Technological) provide clear, operational ownership.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the 11 new controls directly satisfy statutory Indian cyber laws: A.8.10 (Information Deletion) satisfies DPDP Section 8(7) Storage Limitation, A.8.11 (Data Masking) and A.8.12 (DLP) satisfy DPDP Section 8(5) technical safeguards, and A.8.16 satisfies CERT-In 180-day log retention rules.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise compliance designs, use the 5-attribute taxonomy (#Control_Type, #InfoSec_Properties, #Cybersecurity_Concepts) to dynamically query controls and build cross-standard compliance matrices for ISO 27001, DPDP Act 2023, and RBI Master Directions.
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
                <span>ISO 27001:2022 has 7 Mandatory Clauses (4-10) and 93 Controls in 4 Themes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>4 Themes: Organizational (37), People (8), Physical (14), Technological (34).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>11 New Controls: Threat Intel, Cloud, DLP, Masking, Secure Coding, etc.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Harmonized Structure enables unified ISO 27001, 22301 &amp; 27701 systems.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Statement of Applicability (SoA) documents inclusion of all 93 controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO 27001 provides statutory Safe Harbor under IT Act Section 43A.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="ISO/IEC 27001 Standard Overview and Structure FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; ISO 27001 Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="ISO/IEC 27001 Standard Overview and Structure (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: ISO/IEC 27001:2022 is the definitive international blueprint for Information Security Management. Remember the core division: Clauses 4-10 are mandatory management requirements that every organization must satisfy, while Annex A provides the catalog of 93 controls organized into 4 themes. Master the 11 new controls (especially Threat Intel A.5.7, Cloud Security A.5.23, Data Masking A.8.11, and DLP A.8.12) to ensure both global audit success and statutory compliance under Section 8 of the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
