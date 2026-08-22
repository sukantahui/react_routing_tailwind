import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Studio 1: Role Selector State
  const [selectedRoleKey, setSelectedRoleKey] = useState("ciso");

  // Studio 2: RACI Workflow Selector State
  const [selectedWorkflowKey, setSelectedWorkflowKey] = useState("incident_containment");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_ciso_restructuring");

  // Studio 1: Roles Data
  const governanceRoles = {
    board_risk_com: {
      key: "board_risk_com",
      name: "1. Board of Directors & Risk Committee",
      reportingLine: "Reports to: Shareholders & Statutory Regulators",
      primaryFocus: "Apex Fiduciary Oversight & Risk Appetite Approval",
      legalLiability: "DPDP Section 33 (₹250 Cr) & IT Act Section 85 Corporate Liability",
      regulatoryMandate: "Companies Act 2013, RBI Governance Guidelines, SEBI LODR",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      duties: [
        "Formally approves the Enterprise Risk Appetite Statement and Cyber Security Policy.",
        "Allocates strategic cybersecurity budget and reviews CISO reports quarterly.",
        "Ensures executive due diligence to protect against corporate criminal liability.",
        "Authorizes major digital transformation and risk treatment investments."
      ]
    },
    ciso: {
      key: "ciso",
      name: "2. Chief Information Security Officer (CISO)",
      reportingLine: "Reports to: CEO / Board Risk Committee (Independent of CIO)",
      primaryFocus: "Enterprise Cybersecurity Strategy, ISMS & Risk Management",
      legalLiability: "Direct Statutory Compliance Officer under IT Act & RBI Framework",
      regulatoryMandate: "ISO/IEC 27001:2022, RBI Master Direction, CERT-In Section 70B",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      duties: [
        "Establishes and maintains the ISO/IEC 27001 ISMS and Statement of Applicability.",
        "Maintains the enterprise Risk Register and quantifies financial risk (ALE/ROSI).",
        "Directs the 24/7 Security Operations Center (SOC) and acts as Incident Commander.",
        "Serves as the authorized Chief Information Security Officer for CERT-In escalations."
      ]
    },
    dpo: {
      key: "dpo",
      name: "3. Data Protection Officer (DPO)",
      reportingLine: "Reports to: Board of Directors (Statutory Office under DPDP Act)",
      primaryFocus: "Citizen Privacy, Consent Governance & Regulatory Liaison",
      legalLiability: "Direct Liaison for Data Protection Board of India under DPDP Section 10",
      regulatoryMandate: "Digital Personal Data Protection (DPDP) Act 2023 Section 10",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      duties: [
        "Ensures processing aligns with Purpose Limitation and Data Minimization (Section 8).",
        "Acts as the official point of contact for the Data Protection Board of India.",
        "Oversees citizen grievance redressal, consent tracking, and data erasure requests.",
        "Conducts mandatory Data Protection Impact Assessments (DPIAs) on new products."
      ]
    },
    soc_incident_lead: {
      key: "soc_incident_lead",
      name: "4. SOC Tier 2/3 Incident Response Lead",
      reportingLine: "Reports to: CISO / Head of Security Operations",
      primaryFocus: "24/7 Threat Hunting, Telemetry & Sub-15 Min Containment",
      legalLiability: "Operational SLA Delivery under CERT-In 6-Hour Reporting Mandate",
      regulatoryMandate: "CERT-In Cyber Security Directions (IT Act Section 70B)",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      duties: [
        "Monitors SIEM telemetry, analyzes EDR behavioural alerts, and isolates infected hosts.",
        "Executes memory dumps, packet captures, and reverse-engineers suspicious malware.",
        "Executes automated SOAR incident response playbooks for rapid threat neutralization.",
        "Packages forensic evidence and SHA-256 hashes for Section 65B court admissibility."
      ]
    },
    asset_owner_custodian: {
      key: "asset_owner_custodian",
      name: "5. Asset Owner vs. Asset Custodian",
      reportingLine: "Owner: Business Unit VP | Custodian: Technical Lead / DBA",
      primaryFocus: "Business Access Authorization vs Technical Control Execution",
      legalLiability: "Fiduciary Custody of Sensitive Personal Data under DPDP Section 8",
      regulatoryMandate: "ISO/IEC 27001 Clause 5.9 (Inventory of Information Assets)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      duties: [
        "Asset Owner: Classifies data (Confidential/Restricted) and approves access roles.",
        "Asset Custodian: Implements AES-256 encryption, daily backups, and access control lists.",
        "Asset Owner: Accountable for business risk and compliance with DPDP data rules.",
        "Asset Custodian: Executes technical NIST SP 800-88 cryptographic sanitization."
      ]
    }
  };

  const activeRole = governanceRoles[selectedRoleKey];

  // Studio 2: RACI Workflows Data
  const raciWorkflows = {
    incident_containment: {
      key: "incident_containment",
      title: "1. Ransomware Containment & CERT-In Escalation",
      description: "Triggering network isolation and filing mandatory CERT-In report within 6 hours.",
      raci: {
        board: "Informed (I) - Receives executive status briefing every 2 hours",
        ciso: "Accountable (A) - Authorizes network disconnect & signs CERT-In report",
        dpo: "Consulted (C) - Evaluates citizen privacy impact under DPDP Section 8(6)",
        devops: "Responsible (R) - Executes switchport shutdown & isolates servers",
        endusers: "Informed (I) - Instructed to halt work and avoid reconnecting laptops"
      }
    },
    policy_formulation: {
      key: "policy_formulation",
      title: "2. ISO 27001 ISMS Policy Authoring & Approval",
      description: "Formulating enterprise security policies, standards, and Statement of Applicability.",
      raci: {
        board: "Accountable (A) - Formally votes and approves enterprise policy baseline",
        ciso: "Responsible (R) - Drafts ISO 27001 policies and Statement of Applicability",
        dpo: "Consulted (C) - Verifies privacy clauses align with DPDP Act Section 8",
        devops: "Consulted (C) - Reviews technical feasibility of password/MFA rules",
        endusers: "Informed (I) - Signs mandatory annual Acceptable Use Policy (AUP)"
      }
    },
    phishing_simulation: {
      key: "phishing_simulation",
      title: "3. Unannounced Phishing Simulation Drill",
      description: "Executing simulated spear-phishing attack to measure human firewall resilience.",
      raci: {
        board: "Informed (I) - Receives quarterly human resilience scorecard",
        ciso: "Accountable (A) - Sets simulation frequency, targets, and consequences",
        dpo: "Consulted (C) - Ensures employee privacy during training tracking",
        devops: "Consulted (C) - Whitelists simulation mail server IP in spam filters",
        endusers: "Responsible (R) - Must identify phishing and click 'Report Phishing' button"
      }
    },
    dpdp_breach_notice: {
      key: "dpdp_breach_notice",
      title: "4. DPDP Personal Data Breach Notification",
      description: "Notifying the Data Protection Board of India and affected citizens after a data leak.",
      raci: {
        board: "Informed (I) - Briefed on legal liability and crisis communications",
        ciso: "Consulted (C) - Provides technical root-cause and forensic timeline",
        dpo: "Accountable (A) - Drafts and transmits notice to Data Protection Board",
        devops: "Responsible (R) - Gathers database transaction logs and access hashes",
        endusers: "Informed (I) - Notified with instructions on resetting credentials"
      }
    },
    crypto_shredding: {
      key: "crypto_shredding",
      title: "5. Cloud Storage NIST SP 800-88 Crypto-Shredding",
      description: "Permanently destroying KMS encryption keys to sanitize retired cloud database storage.",
      raci: {
        board: "Informed (I) - Notified of major IT decommissioning milestones",
        ciso: "Consulted (C) - Verifies cryptographic destruction compliance",
        dpo: "Consulted (C) - Validates storage limitation under DPDP Section 8(7)",
        devops: "Responsible (R) - Deletes AWS KMS key and generates Section 65B log",
        endusers: "Informed (I) - N/A (Internal technical workflow)"
      }
    }
  };

  const activeWorkflow = raciWorkflows[selectedWorkflowKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_ciso_restructuring",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "CISO & DPO Independent Governance Restructuring",
      budget: "₹16,50,000",
      challenge: "CISO Reporting to CIO Caused Security Gatekeeping Conflicts",
      dilemma:
        "The CISO reported directly to the CIO, who repeatedly overruled security objections to meet tight payment microservice product release deadlines.",
      resolution:
        "Mamata restructured the organizational chart so the CISO and newly appointed DPO report directly to the Board Risk Committee under DPDP Section 10, eliminating 100% of governance conflicts.",
      metrics: {
        reportingElevated: "Direct to Board Risk Committee",
        conflictsEliminated: "100% Structural Independence",
        dpoAppointed: "DPDP Section 10 Compliant",
        compliance: "ISO/IEC 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_healthcare_raci",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "14-Department Healthcare RACI Matrix Formulation",
      budget: "₹7,80,000",
      challenge: "Ambiguity in Patient Record Breach Escalation Duties",
      dilemma:
        "Hospital nurses, clinical doctors, and IT database admins blamed each other during a simulated patient health record breach, with zero clear accountability.",
      resolution:
        "Mahima authored a hospital-wide RACI matrix mapping 14 clinical departments, establishing clear accountability for patient consent tracking and sub-6-hour incident escalation.",
      metrics: {
        departmentsMapped: "14 Clinical Units",
        raciClarity: "Exactly 1 Accountable Owner / Task",
        escalationSla: "Sub-6-Hour CERT-In Escalation",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_ot_officer",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation OT Security Officer Governance",
      budget: "₹12,80,000",
      challenge: "IT Security Engineers Lacking SCADA Domain Expertise",
      dilemma:
        "Corporate IT security teams lacked understanding of industrial substation SCADA protocols, leaving 220kV RTUs unmonitored for OT-specific malware.",
      resolution:
        "Debangshu established a dedicated OT Security Officer role compliant with Central Electricity Authority (CEA) regulations, enforcing air-gapped jump hosts and dual-custody hardware cryptographic access.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        otOfficerMandate: "100% CEA Regulations Compliant",
        unauthorizedChanges: "0.00% Zero Disruption",
        compliance: "CEA & NCIIPC Protected Systems"
      }
    },
    {
      id: "jadavpur_ciso_board_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "CISO Board Presentation & RACI Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling with Executive Communication & RACI Design",
      dilemma:
        "Cybersecurity students could write technical exploit scripts but struggled to design RACI governance matrices or present financial risk metrics to executive boards.",
      resolution:
        "The team built an interactive RACI matrix builder and mock CISO board simulator, training 175+ BCA students on calculating ALE/ROSI and presenting to mock executive committees.",
      metrics: {
        studentsTrained: "175+ Cyber BCA Students",
        raciSimulations: "50+ Enterprise Case Studies",
        boardReadiness: "100% Executive Pitch Proficiency",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 4 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Roles and Responsibilities: CISO, Security Officers, and Custodians
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the organizational architecture of cybersecurity: enforce CISO structural independence, 
            appoint a Data Protection Officer (DPO) under DPDP Act Section 10, eliminate accountability gaps with RACI matrices, and maintain the Three Lines of Defense.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Enterprise Security Org Chart & Role Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>👥</span> Studio 1: Enterprise Security Org Chart &amp; Role Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise governance role to explore its reporting lines, core responsibilities, legal liability, and statutory regulatory mandates.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.values(governanceRoles).map((role) => {
              const isSelected = selectedRoleKey === role.key;
              return (
                <button
                  key={role.key}
                  onClick={() => setSelectedRoleKey(role.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{role.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{role.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Role Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeRole.badgeClass)}>
                  Governance Tier: {activeRole.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeRole.primaryFocus}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Reporting Line</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activeRole.reportingLine}</span>
              </div>
            </div>

            {/* Core Responsibilities Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Key Strategic &amp; Operational Responsibilities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {activeRole.duties.map((duty, idx) => (
                  <div key={idx} className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span className="text-gray-300 leading-relaxed">{duty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Liability & Regulatory Mandate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Legal &amp; Personal Liability:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeRole.legalLiability}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Statutory Regulatory Mandates:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeRole.regulatoryMandate}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Enterprise Security RACI Matrix Studio */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Studio 2: Enterprise Security RACI Matrix Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a critical enterprise security workflow to inspect its Responsible (R), Accountable (A), Consulted (C), and Informed (I) distribution across stakeholders.
            </p>
          </div>

          {/* RACI Workflow Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.values(raciWorkflows).map((wf) => {
              const isSelected = selectedWorkflowKey === wf.key;
              return (
                <button
                  key={wf.key}
                  onClick={() => setSelectedWorkflowKey(wf.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{wf.title.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{wf.title.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active RACI Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                  RACI Workflow: {activeWorkflow.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeWorkflow.description}
                </h3>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Golden Rule: Exactly ONE 'Accountable (A)' per workflow!
              </div>
            </div>

            {/* RACI Stakeholder Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">1. Board / Risk Com</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed">{activeWorkflow.raci.board}</p>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-emerald-900/40 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">2. CISO</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed">{activeWorkflow.raci.ciso}</p>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-purple-900/40 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">3. DPO</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed">{activeWorkflow.raci.dpo}</p>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-blue-900/40 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">4. DevOps / DBAs</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed">{activeWorkflow.raci.devops}</p>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-amber-900/40 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">5. End Users</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed">{activeWorkflow.raci.endusers}</p>
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
              Visualizing the Modern Enterprise Security Reporting Hierarchy and the RACI Governance Interlocking Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Reporting Lines */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Modern Enterprise Security Reporting Lines
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Board */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="20" width="400" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">BOARD OF DIRECTORS &amp; RISK COMMITTEE</text>
                    <text x="250" y="56" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">Fiduciary Oversight • Risk Appetite • DPDP Section 10</text>
                  </g>

                  {/* Line Down */}
                  <line x1="250" y1="65" x2="250" y2="95" stroke="#6366f1" strokeWidth="1.5" />

                  {/* CEO */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="95" width="200" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="116" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">CHIEF EXECUTIVE OFFICER (CEO)</text>
                    <text x="250" y="128" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Executive Management</text>
                  </g>

                  {/* 3 Branches */}
                  <line x1="250" y1="135" x2="90" y2="175" stroke="#06b6d4" strokeWidth="1.5" />
                  <line x1="250" y1="135" x2="250" y2="175" stroke="#06b6d4" strokeWidth="1.5" />
                  <line x1="250" y1="135" x2="410" y2="175" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Left: CIO */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="15" y="175" width="150" height="55" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="90" y="195" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">CIO / CTO</text>
                    <text x="90" y="210" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">IT Speed &amp; Infrastructure</text>
                    <text x="90" y="222" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Uptime &amp; Features</text>
                  </g>

                  {/* Center: CISO */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="175" y="175" width="150" height="55" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="250" y="195" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">CISO (Independent)</text>
                    <text x="250" y="210" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">Cyber Risk &amp; ISMS</text>
                    <text x="250" y="222" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">24/7 SOC &amp; Incidents</text>
                  </g>

                  {/* Right: DPO */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="335" y="175" width="150" height="55" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="410" y="195" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8.5">DPO (DPDP Sec 10)</text>
                    <text x="410" y="210" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">Citizen Privacy &amp; Consent</text>
                    <text x="410" y="222" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">DPB India Liaison</text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    CISO and DPO operate independently of CIO to eliminate conflicts of interest.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.1: Modern corporate security reporting hierarchy separating CIO, CISO, and DPO.
              </p>
            </div>

            {/* Diagram 2: RACI Interlock */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The RACI Governance Interlock
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* R Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="100" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="130" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9.5">R - RESPONSIBLE</text>
                    <text x="130" y="65" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="8">The "Doer" of the Task</text>
                    <text x="40" y="85" fill="#a5f3fc" font-family="monospace" fontSize="7.5">• SOC Analyst isolations</text>
                    <text x="40" y="105" fill="#a5f3fc" font-family="monospace" fontSize="7.5">• DevOps patch deployment</text>
                  </g>

                  {/* A Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="100" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">A - ACCOUNTABLE (Singular!)</text>
                    <text x="370" y="65" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8">The "Owner" &amp; Veto Authority</text>
                    <text x="280" y="85" fill="#a7f3d0" font-family="monospace" fontSize="7.5">• ONLY 1 Accountable per task</text>
                    <text x="280" y="105" fill="#a7f3d0" font-family="monospace" fontSize="7.5">• CISO or Board level</text>
                  </g>

                  {/* C Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="145" width="210" height="100" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="130" y="167" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9.5">C - CONSULTED</text>
                    <text x="130" y="185" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8">Two-Way Expert Feedback</text>
                    <text x="40" y="205" fill="#cbd5e1" font-family="monospace" fontSize="7.5">• Legal Counsel on DPDP</text>
                    <text x="40" y="225" fill="#cbd5e1" font-family="monospace" fontSize="7.5">• DPO on privacy consent</text>
                  </g>

                  {/* I Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="145" width="210" height="100" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="370" y="167" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="9.5">I - INFORMED</text>
                    <text x="370" y="185" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="8">One-Way Status Briefing</text>
                    <text x="280" y="205" fill="#e0e7ff" font-family="monospace" fontSize="7.5">• Executive Board briefings</text>
                    <text x="280" y="225" fill="#e0e7ff" font-family="monospace" fontSize="7.5">• End user security updates</text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    RACI eliminates role confusion and ensures seamless incident command execution.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.2: The RACI matrix framework ensuring clear ownership and execution.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Security Leadership Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads restructure CISO independence in Kolkata, formulate hospital RACI matrices in Ichapur, establish SCADA OT officers in Barrackpore, and simulate board pitches in Jadavpur.
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
                  <span>⚡</span> Governance Conflict ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Governance Restructuring
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
              Guidelines for Chief Information Security Officers and enterprise risk governance leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Strategic Governance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 1 'A' in RACI:</strong> Never assign multiple Accountable owners to a single security workflow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain CISO Independence:</strong> Have the CISO report directly to the CEO or Board Risk Committee.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Appoint DPO under DPDP Sec 10:</strong> Ensure the Data Protection Officer is physically resident in India.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Empower Incident Commander:</strong> Grant singular authority to sever network switches during ransomware breaches.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Governance Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>CISO Reporting to CIO:</strong> Causes severe conflict between deployment speed and security rigor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Diffusion of Accountability:</strong> Having 3 departments "co-own" a server leads to zero patching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting Director Liability:</strong> IT Act Section 85 holds directors personally liable for cyber negligence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Excluding Legal from Triage:</strong> Causes critical missteps during CERT-In and DPDP breach reporting.</span>
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
                  <span><strong>Enforce Three Lines of Defense:</strong> Maintain strict segregation between operations, CISO, and internal audit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Run Executive Crisis Drills:</strong> Practice board crisis communications and CERT-In 6-hour reporting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate SOAR Playbooks:</strong> Ensure Tier 1 SOC analysts escalate confirmed anomalies in &lt; 15 mins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Train Human First Line:</strong> Conduct monthly unannounced phishing drills for 100% of staff.</span>
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
              Synthesize organizational governance roles and RACI accountability mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Governance Leaders
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why CISO independence is non-negotiable: If the CISO reports to the CIO, and a severe zero-day is found right before a major product launch, the CIO is strongly incentivized to bury or delay the security patch to meet their uptime and revenue goals. Reporting directly to the CEO or Board Risk Committee eliminates this conflict of interest.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The Golden Rule of RACI matrices: For every single task or workflow, there must be EXACTLY ONE person who is Accountable ('A'). If two or three people are Accountable, no one is accountable, and fingers will be pointed when a breach occurs.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise security designs, ensure you differentiate between the CISO (responsible for overall security strategy and risk) and the DPO (responsible for citizen privacy and compliance under Section 10 of the Indian DPDP Act 2023).
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
                <span>CISO leads security strategy &amp; risk; must NOT report to the CIO.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 10 mandates appointing a Data Protection Officer in India.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RACI: Responsible, Accountable (Only 1!), Consulted, Informed.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3LoD: 1st Line (DevOps/Ops), 2nd Line (CISO/Risk), 3rd Line (Internal Audit).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>24/7 SOC Tiers: Tier 1 (Triage), Tier 2 (Responder), Tier 3 (Hunter).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 85 holds Directors personally liable for cyber negligence.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Roles and Responsibilities: CISO, Security Officers, and Custodians FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Organizational Governance Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Roles and Responsibilities: CISO, Security Officers, and Custodians (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Organizational structure is the bedrock of Information Security Management. Remember that the CISO must remain structurally independent of the CIO to eliminate operational conflicts of interest. Ensure your enterprise appoints a resident Data Protection Officer (DPO) under Section 10 of the DPDP Act 2023, strictly enforce the 'Only One Accountable' rule in your RACI matrices, maintain the Three Lines of Defense (3LoD), and train your employees as the indispensable first line of human cyber defense!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
