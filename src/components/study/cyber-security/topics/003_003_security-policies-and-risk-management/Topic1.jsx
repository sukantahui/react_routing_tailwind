import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Studio 1: AUP Clause Selector State
  const [selectedClauseKey, setSelectedClauseKey] = useState("gen_ai_clause");

  // Studio 2: Violation Simulator State
  const [selectedViolationKey, setSelectedViolationKey] = useState("ai_leakage_violation");
  const [isDrillSimulating, setIsDrillSimulating] = useState(false);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_ai_leakage");

  // Studio 1: AUP Clauses Data
  const aupClauses = {
    workstation_clause: {
      key: "workstation_clause",
      title: "1. Workstation, Physical Security & Removable Media",
      rule: "Mandatory screen locking (`Win + L`) within 3 minutes of inactivity; zero unauthorized USB flash drive connections; clean desk policy (A.7.7).",
      prohibited: "Leaving workstation unlocked, connecting personal external hard drives, leaving passwords on sticky notes.",
      rationale: "Prevents physical snooping, opportunistic malware ingress via infected USBs (Stuxnet vector), and physical data theft.",
      legalAnchor: "ISO 27001 Controls A.5.10, A.7.7, A.8.10 & IT Act Section 43",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    gen_ai_clause: {
      key: "gen_ai_clause",
      title: "2. Cloud Shadow IT & Public Generative AI Restrictions",
      rule: "Mandatory use of approved enterprise LLMs with zero-data-retention agreements; strict prohibition on public ChatGPT / Claude data pasting.",
      prohibited: "Pasting proprietary software code, customer personal data (PII), or system architecture diagrams into public AI prompts.",
      rationale: "Prevents intellectual property theft, zero-day code exposure, and statutory data breach penalties under the Indian DPDP Act 2023.",
      legalAnchor: "ISO 27001 Control A.8.12 (DLP), DPDP Act 2023 Section 8 & Section 33",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    network_clause: {
      key: "network_clause",
      title: "3. Network, Internet & Incidental Usage Boundaries",
      rule: "Incidental personal use permitted during non-working breaks, provided it does not consume excessive bandwidth or violate legal standards.",
      prohibited: "Torrenting, cryptocurrency mining, online gambling, running unapproved commercial activities, accessing pirated content.",
      rationale: "Protects enterprise network bandwidth, prevents botnet staging, and shields corporate IP addresses from global ISP blacklisting.",
      legalAnchor: "ISO 27001 Control A.8.20 (Network Security) & IT Act Section 66",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    privacy_clause: {
      key: "privacy_clause",
      title: "4. Monitoring, Privacy Disclaimer & Disciplinary Enforcement",
      rule: "Zero expectation of personal privacy on corporate hardware or networks; all emails, web traffic, and files are subject to continuous SOC monitoring.",
      prohibited: "Attempting to disable EDR agents, bypassing proxy filters, concealing security incidents or lost laptops from the SOC.",
      rationale: "Provides legal authority for full-packet inspection, SSL decryption, and forensic evidence admissibility under Section 65B.",
      legalAnchor: "ISO 27001 Controls A.5.10, A.6.4 & Indian Evidence Act Section 65B",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeAupClause = aupClauses[selectedClauseKey];

  // Studio 2: Violation Simulator Data
  const violationScenarios = {
    ai_leakage_violation: {
      key: "ai_leakage_violation",
      title: "Scenario 1: Developer Pastes Core Crypto Keys into Public ChatGPT",
      severity: "CRITICAL SEVERITY (Direct Exfiltration Risk)",
      socAction: "Endpoint DLP triggers automated clipboard block within 1.2s; SIEM generates High-Priority Alert to CISO.",
      hrAction: "Immediate suspension of cloud IAM credentials; formal HR disciplinary inquiry under Control A.6.4.",
      legalRisk: "Zero-day API key leakage + ₹250 Crore penalty exposure under DPDP Section 33 without automated DLP.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    usb_violation: {
      key: "usb_violation",
      title: "Scenario 2: Visiting Doctor Connects Personal USB to Hospital Workstation",
      severity: "HIGH SEVERITY (Malware & Data Theft Risk)",
      socAction: "GPO USB-blocking policy denies mass storage access; EDR logs hardware ID and notifies SOC analyst.",
      hrAction: "Mandatory clinical AUP re-education session; formal warning placed in physician credential file.",
      legalRisk: "Potential exfiltration of 80,000 oncology patient records violating Section 8 of DPDP Act 2023.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    unlocked_laptop_violation: {
      key: "unlocked_laptop_violation",
      title: "Scenario 3: Employee Leaves Unlocked Workstation in Public Cafe",
      severity: "MEDIUM SEVERITY (Visual Eavesdropping Risk)",
      socAction: "Automated screen lock activates at 3 minutes; SOC geofencing flags unusual coffee shop Wi-Fi telemetry.",
      hrAction: "First written warning; mandatory clean screen policy retraining (Control A.7.7).",
      legalRisk: "Opportunistic physical theft and visual snooping of confidential customer transactions.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    shared_credentials_violation: {
      key: "shared_credentials_violation",
      title: "Scenario 4: Contractor Shares Administrative Root Password via Slack",
      severity: "HIGH SEVERITY (Accountability Breakdown)",
      socAction: "Automated secret scanner detects raw password in chat; triggers instantaneous credential invalidation.",
      hrAction: "Immediate revocation of contractor VPN access; contract termination initiated under master SLA.",
      legalRisk: "Loss of forensic attribution and non-repudiation during audit under IT Act Section 85.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeViolation = violationScenarios[selectedViolationKey];

  const handleSimulateViolation = () => {
    setIsDrillSimulating(true);
    setTimeout(() => {
      setIsDrillSimulating(false);
    }, 1600);
  };

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_ai_leakage",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Generative AI Source Code Leakage Prevention",
      budget: "₹18,50,000",
      challenge: "Junior Developer Attempted to Paste Payment Ciphers into Public ChatGPT",
      dilemma:
        "A junior software engineer attempted to paste core UPI payment cryptographic routines into public ChatGPT for debugging, risking massive zero-day API leakage.",
      resolution:
        "Automated endpoint DLP blocked the clipboard transfer; Mamata enforced strict AUP generative AI clauses and deployed an internal enterprise AWS Bedrock endpoint with zero data retention.",
      metrics: {
        dlpInterceptionSpeed: "1.2 Seconds",
        zeroDataRetention: "100% Private Cloud AI",
        codebaseProtected: "500 Payment Microservices",
        compliance: "ISO 27001 Control A.8.12 & DPDP Act"
      }
    },
    {
      id: "ichapur_usb_blocking",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "USB Port Blocking & Clinical Data Integrity",
      budget: "₹8,20,000",
      challenge: "Visiting Doctor Attempted to Copy 80,000 Scans onto Personal USB",
      dilemma:
        "A visiting surgeon attempted to copy 80,000 oncology patient diagnostic scans onto an unencrypted personal USB thumb drive to review at home, violating DPDP Act storage limitations.",
      resolution:
        "Automated GPO blocked USB mass storage execution; doctor completed mandatory AUP clinical privacy retraining, preventing personal data exfiltration under Section 8 of the DPDP Act 2023.",
      metrics: {
        usbBlockedCount: "100% Hardware Blocked",
        patientScansSafeguarded: "80,000 Oncology Records",
        statutoryShield: "₹250 Cr Fine Immunized",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_aup",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA Operational Runbooks & Privileged AUP",
      budget: "₹14,80,000",
      challenge: "18 Substations Requiring Strict OT AUP Forbidding Personal Devices",
      dilemma:
        "18 high-voltage 220kV transmission substations required strict OT AUP rules strictly prohibiting personal mobile phones, USB drives, and unauthorized Wi-Fi tethering.",
      resolution:
        "Debangshu enforced zero personal device connectivity to SCADA consoles, deployed physical Faraday pouches, and conducted monthly unannounced inspections under NCIIPC Protected Systems guidelines (IT Act Sec 70).",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        otAupCompliance: "100% Zero Violations",
        powerGridUptime: "100.000% Continuous Power",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_aup_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "AUP Clause Analyzer & Compliance Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand Why Privacy Disclaimers are Legally Mandatory",
      dilemma:
        "Cybersecurity students struggled to understand why 'No Expectation of Privacy' clauses are legally mandatory and how progressive discipline is structured under ISO 27001 Control A.6.4.",
      resolution:
        "The team developed an interactive AUP Clause Analyzer and Policy Violation Enforcement Simulator in React, training 215+ BCA cyber security students on drafting and enforcing enterprise AUP frameworks.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        aupCasesSimulated: "75+ Enforcement Scenarios",
        examMastery: "100% Policy Architecture Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 1 of 14
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Core Security Policies: Acceptable Use Policy (AUP)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Construct the behavioral foundation of enterprise cybersecurity: master the Acceptable Use Policy (ISO/IEC 27001 Control A.5.10), 
            enforce strict Generative AI and USB boundaries, establish progressive disciplinary escalation (Control A.6.4), and ensure statutory compliance under Section 43/66 of the Indian IT Act and the DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Acceptable Use Policy (AUP) Clause Builder */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📜</span> Studio 1: Acceptable Use Policy (AUP) Clause Builder
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an AUP domain to inspect mandatory employee rules, prohibited activities, technical security rationales, and legal statutory anchors.
            </p>
          </div>

          {/* Clause Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(aupClauses).map((cl) => {
              const isSelected = selectedClauseKey === cl.key;
              return (
                <button
                  key={cl.key}
                  onClick={() => setSelectedClauseKey(cl.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{cl.title.split(". ")[1]?.split(" & ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{cl.title.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Clause Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeAupClause.badgeClass)}>
                  {activeAupClause.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Mandate: {activeAupClause.title.split(". ")[1]}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Statutory Legal Anchor</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeAupClause.legalAnchor.split(" & ")[0]}</span>
              </div>
            </div>

            {/* Mandatory Rule & Prohibited Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Mandatory Employee Behavioral Rule:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeAupClause.rule}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Strictly Prohibited Activities:</span>
                <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed">{activeAupClause.prohibited}</p>
              </div>
            </div>

            {/* Rationale & Legal Anchor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Security Rationale &amp; Threat Defense:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeAupClause.rationale}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Statutory Indian Cyber Law Reference:</span>
                <p className="text-emerald-300 text-xs font-bold leading-relaxed font-sans">{activeAupClause.legalAnchor}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: AUP Violation & Disciplinary Escalation Simulator (Control A.6.4) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🚨</span> Studio 2: AUP Violation &amp; Disciplinary Escalation Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a real-world violation scenario to observe automated SOC DLP detection, HR disciplinary actions (Control A.6.4), and legal exposure under Indian law.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(violationScenarios).map((v) => {
              const isSelected = selectedViolationKey === v.key;
              return (
                <button
                  key={v.key}
                  onClick={() => setSelectedViolationKey(v.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{v.title.split(": ")[1]?.split(" ")[0]} {v.title.split(": ")[1]?.split(" ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{v.severity.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Violation Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeViolation.badgeClass)}>
                  {activeViolation.severity}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeViolation.title}
                </h3>
              </div>
              <div>
                <button
                  onClick={handleSimulateViolation}
                  disabled={isDrillSimulating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-rose-950/50 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isDrillSimulating ? "⚡" : "🚨"}</span>
                  <span>{isDrillSimulating ? "Executing SOC Enforcement..." : "Simulate AUP Enforcement"}</span>
                </button>
              </div>
            </div>

            {/* SOC Action & HR Escalation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/30 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Automated SOC Response:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeViolation.socAction}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">HR Progressive Disciplinary Action:</span>
                <p className="text-amber-300 text-xs sm:text-sm font-sans leading-relaxed">{activeViolation.hrAction}</p>
              </div>
            </div>

            {/* Legal Exposure Risk */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-rose-900/30 text-xs font-mono">
              <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Statutory Legal Risk if Unaddressed:</span>
              <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed mt-0.5">{activeViolation.legalRisk}</p>
            </div>

            {/* Drill Output Notification */}
            {isDrillSimulating && (
              <div className="p-4 bg-emerald-950 border border-emerald-600 text-emerald-200 rounded-xl text-xs font-mono animate-pulse">
                ✔ Automated Enforcement Executed: Rogue transfer blocked via DLP, user credentials suspended in Okta, and forensic ticket dispatched to HR &amp; CISO!
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the Acceptable Use Policy Multi-Layered Protection Framework and the Disciplinary Escalation Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: AUP Protection Framework */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Acceptable Use Policy (AUP) Framework
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Node: AUP Core */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="20" width="200" height="45" rx="6" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                    <text x="250" y="42" fill="#f3e8ff" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      ACCEPTABLE USE POLICY (AUP)
                    </text>
                    <text x="250" y="55" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7">
                      ISO 27001 Control A.5.10 Mandate
                    </text>
                  </g>

                  {/* Pillar 1: Workstation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="105" width="135" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="92" y="125" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">WORKSTATION SEC</text>
                    <text x="92" y="140" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Lock &lt; 3m • No USBs</text>
                  </g>
                  <line x1="200" y1="65" x2="115" y2="105" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Pillar 2: Generative AI */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="105" width="140" height="50" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="125" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">AI &amp; CLOUD SHADOW</text>
                    <text x="250" y="140" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Zero PII in Public LLMs</text>
                  </g>
                  <line x1="250" y1="65" x2="250" y2="105" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Pillar 3: Monitoring & Privacy */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="105" width="135" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="407" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">SOC MONITORING</text>
                    <text x="407" y="140" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Zero Personal Privacy</text>
                  </g>
                  <line x1="300" y1="65" x2="385" y2="105" stroke="#10b981" strokeWidth="1.5" />

                  {/* Bottom Box: Human Firewall */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="190" width="450" height="55" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="212" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% EMPLOYEE ACCOUNTABILITY &amp; SAFE HARBOR
                    </text>
                    <text x="250" y="230" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Transforms workforce into an active Human Firewall, immunizing firm under IT Act Section 43/66.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The AUP establishes explicit behavioral boundaries across all enterprise assets.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.1: The multi-layered Acceptable Use Policy (AUP) protection framework.
              </p>
            </div>

            {/* Diagram 2: Disciplinary Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: AUP Violation &amp; Disciplinary Lifecycle (A.6.4)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Violation Detected */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. DLP DETECT</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">SOC Alert Triggered</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan61)" />

                  {/* Step 2: Investigation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">2. FORENSIC AUDIT</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Logs &amp; 65B Telemetry</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo61)" />

                  {/* Step 3: Disciplinary Action */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="412" y="45" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8">3. HR ESCALATION</text>
                    <text x="412" y="58" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="6.5">Warning / Termination</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Step 4: Legal Filing */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="372" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">4. IT ACT SEC 43/66 FILING</text>
                    <text x="372" y="138" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">Civil &amp; Criminal Prosecution</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold61)" />

                  {/* Step 5: Lessons Learned */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="125" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">5. POLICY HARDENING</text>
                    <text x="125" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Update AUP &amp; Training</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      PROGRESSIVE DISCIPLINARY DUE PROCESS (CONTROL A.6.4)
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Ensures fair, documented enforcement while shielding enterprise from labor litigation.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous feedback loops update AUP controls after every investigated incident.
                  </text>

                  <defs>
                    <marker id="arrowCyan61" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo61" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGold61" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.2: The AUP violation investigation and progressive disciplinary lifecycle under Control A.6.4.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: AUP Implementation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads enforce AI boundaries in Kolkata, block USB ports in Ichapur, manage SCADA consoles in Barrackpore, and simulate policy compliance in Jadavpur.
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
                  <span>⚡</span> Behavioral Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied AUP Enforcement Solution
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
              Guidelines for Enterprise Policy Architects and CISOs enforcing Acceptable Use Policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> AUP Governance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Day-1 Signature:</strong> Require signed AUP before provisioning laptop credentials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate USB Port Blocking:</strong> Enforce GPO removable media restrictions on all endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Include Generative AI Rules:</strong> Define strict boundaries for public vs private LLM usage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Practice Just Culture:</strong> Encourage rapid 60-minute incident reporting without unjust penalties.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common AUP Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Un-Enforceable AUP:</strong> Writing policy rules that IT never technically monitors or blocks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Omitting Privacy Disclaimer:</strong> Failing to state that corporate systems are monitored by the SOC.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Banning All Personal Use:</strong> Driving staff to seek dangerous shadow IT bypasses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Forgetting Annual Re-Sign:</strong> Failing to refresh employee signatures every 12 months.</span>
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
                  <span><strong>Deploy Endpoint DLP:</strong> Intercept unauthorized credit card or Aadhaar clipboard pastes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Lock Screens at 3 Minutes:</strong> Enforce automated screensaver lock via Microsoft Intune.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180-Day SIEM Logs:</strong> Preserve forensic evidence under IT Act Section 70B.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Monthly Phishing Drills:</strong> Train employees to recognize targeted spear-phishing attacks.</span>
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
              Synthesize AUP behavioral boundaries and progressive disciplinary workflows before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Policy Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why an explicit 'No Expectation of Privacy' clause is legally mandatory: If your SOC monitors employee web traffic or decrypts SSL packets without a signed written disclaimer in the AUP, the employee can legally sue the company for unlawful electronic wiretapping and privacy infringement. The disclaimer gives the company clear legal authority to conduct full security telemetry.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How a signed AUP provides statutory Safe Harbor under Indian cyber law: Under Section 43 and Section 66 of the Information Technology Act 2000, and Section 8 of the DPDP Act 2023, an employee's signed AUP proves that the corporate entity instituted reasonable security practices, establishing that any rogue employee data theft was an unauthorized criminal act by an individual, not corporate negligence.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise policies, always combine written behavioral rules with automated technical guardrails (e.g. GPO USB blocks, automated 3-minute screen locks, and endpoint DLP) to ensure policy compliance is technically enforced rather than merely requested.
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
                <span>ISO 27001 Control A.5.10 mandates documented Acceptable Use Policies.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AUP requires Day-1 employee signature as a binding condition of employment.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>'No Expectation of Privacy' clause legally authorizes continuous SOC logging.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Generative AI clause prohibits pasting proprietary code or PII into public LLMs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Control A.7.7 mandates Clean Desk and Clean Screen (lock timeout &lt; 3 minutes).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 43 (Civil damages) and Section 66 (3y prison) penalize violations.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Core Security Policies: Acceptable Use Policy (AUP) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; AUP Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Core Security Policies: Acceptable Use Policy (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The Acceptable Use Policy (AUP) under ISO/IEC 27001 Control A.5.10 is the single most critical document connecting cybersecurity technology with human behavior. Always remember: an AUP must be signed on Day 1, must explicitly disclose continuous SOC monitoring with 'No Expectation of Privacy', must ban unauthorized USB mass storage and public generative AI code pasting, and must be backed by progressive discipline under Control A.6.4 and Sections 43/66 of the Indian Information Technology Act 2000 to transform your employees into an unbreakable Human Firewall!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
