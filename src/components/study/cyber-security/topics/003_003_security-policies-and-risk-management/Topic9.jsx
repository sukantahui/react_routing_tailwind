import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: 4 Treatment Strategies State
  const [selectedStrategyKey, setSelectedStrategyKey] = useState("strategy_mitigate");

  // Studio 2: RTP Threat Simulator State
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("scen_ransomware");
  const [activeTreatmentChoice, setActiveTreatmentChoice] = useState("mitigate");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_waf_insurance");

  // Studio 1: Treatment Strategies Data
  const treatmentStrategies = {
    strategy_mitigate: {
      key: "strategy_mitigate",
      name: "1. Risk Mitigation (Risk Reduction)",
      definition: "Deploying technical, administrative, and physical countermeasures to lower threat likelihood or impact.",
      mechanisms: "Technical: AES-256 encryption, WAF, EDR, ZTNA; Administrative: AUP, training; Physical: Mantraps, biometric locks.",
      financials: "Capital & Operational Expenditure (CapEx/OpEx); justified by positive Return on Security Investment (ROSI > 0%).",
      auditorCheck: "Auditors verify control effectiveness via penetration tests, configuration reviews, and SOC log sampling.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    strategy_transfer: {
      key: "strategy_transfer",
      name: "2. Risk Transfer (Risk Sharing)",
      definition: "Shifting financial loss to a third party through cyber insurance or contractual vendor indemnification clauses.",
      mechanisms: "Comprehensive Cyber Insurance Policies (First-party downtime + Third-party liability) & Vendor SLAs with penalty clauses.",
      financials: "Annual insurance premium payments; covers extreme financial tail risks (e.g. ₹50 Crore policy limits).",
      auditorCheck: "Auditors check insurance policy terms, exclusions, coverage limits, and vendor third-party contracts.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    strategy_avoid: {
      key: "strategy_avoid",
      name: "3. Risk Avoidance (Risk Termination)",
      definition: "Completely eliminating risk by discontinuing or refusing to launch the high-risk business activity or technology.",
      mechanisms: "Credit Card Tokenization (delegating raw PAN storage to Razorpay/Stripe), decommissioning legacy Telnet/FTP services.",
      financials: "Zero ongoing control maintenance cost; possible minor business opportunity trade-offs.",
      auditorCheck: "Auditors verify that the high-risk asset or data flow has been completely decommissioned and purged.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    strategy_accept: {
      key: "strategy_accept",
      name: "4. Risk Acceptance (Risk Retention)",
      definition: "Formally deciding to live with a residual risk when mitigation cost exceeds asset value or falls within risk appetite.",
      mechanisms: "Formal signed Risk Acceptance Memo (CISO/Board approval) + Compensatory network VLAN isolation + 12-month review timer.",
      financials: "Zero upfront tooling cost; organization absorbs any potential breach losses up to acceptable appetite threshold.",
      auditorCheck: "Auditors verify signed executive approval, valid business justification, and scheduled annual re-evaluation.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    }
  };

  const activeStrategy = treatmentStrategies[selectedStrategyKey];

  // Studio 2: RTP Scenarios Data
  const rtpScenarios = {
    scen_ransomware: {
      key: "scen_ransomware",
      title: "Threat 1: Ransomware Infection on Production Database",
      rawRisk: "9.2 (Critical)",
      options: {
        mitigate: {
          strategy: "MITIGATE",
          action: "Deploy AWS S3 Object Lock Immutable Backups + CrowdStrike EDR agents across all nodes.",
          residual: "1.4 (Low)",
          rtpDoc: "RTP-01: Control A.8.10 (Deletion) & A.8.8 (Vulnerabilities) deployed by Lead DBA Mamata.",
          status: "RECOMMENDED & OPTIMAL"
        },
        transfer: {
          strategy: "TRANSFER",
          action: "Purchase ₹25 Crore Cyber Insurance Policy covering ransomware extortion and forensic restoration.",
          residual: "4.8 (Medium - Financial Covered, Operational Downtime Remains)",
          rtpDoc: "RTP-01: Policy underwritten by HDFC ERGO (₹8.5L/yr premium).",
          status: "COMPLEMENTARY STRATEGY"
        },
        avoid: {
          strategy: "AVOID",
          action: "Decommission the entire database and stop processing customer transactions.",
          residual: "0.0 (Zero Risk)",
          rtpDoc: "RTP-01: Severe business disruption (Unviable for core banking switch).",
          status: "BUSINESS DISRUPTIVE"
        },
        accept: {
          strategy: "ACCEPT",
          action: "Sign risk acceptance memo without deploying backups or EDR.",
          residual: "9.2 (Critical - High Breach Exposure)",
          rtpDoc: "RTP-01: Violates Board Risk Appetite (<= 2.5); Rejected by CISO Sukanta Hui.",
          status: "REJECTED BY CISO"
        }
      }
    },
    scen_legacy_telnet: {
      key: "scen_legacy_telnet",
      title: "Threat 2: Unencrypted Cleartext Telnet on Legacy Switch",
      rawRisk: "7.8 (High)",
      options: {
        avoid: {
          strategy: "AVOID",
          action: "Disable Telnet daemon permanently; replace with SSHv2 (Ed25519) on all management ports.",
          residual: "0.5 (Minimal)",
          rtpDoc: "RTP-02: Control A.8.20 (Network Security) implemented by Principal Architect Debangshu.",
          status: "RECOMMENDED & BEST PRACTICE"
        },
        mitigate: {
          strategy: "MITIGATE",
          action: "Place Telnet behind an encrypted IPsec VPN tunnel with jump host bastion.",
          residual: "2.2 (Low)",
          rtpDoc: "RTP-02: Compensatory IPsec hardware gateway provisioned.",
          status: "VIABLE COMPENSATORY"
        },
        transfer: {
          strategy: "TRANSFER",
          action: "Attempt to insure unencrypted cleartext passwords on the network.",
          residual: "7.8 (High)",
          rtpDoc: "RTP-02: Insurers refuse coverage for known cleartext protocols.",
          status: "UNINSURABLE"
        },
        accept: {
          strategy: "ACCEPT",
          action: "Leave Telnet exposed and accept risk verbally.",
          residual: "7.8 (High)",
          rtpDoc: "RTP-02: Gross negligence; triggers audit non-conformity.",
          status: "AUDIT FAILURE"
        }
      }
    }
  };

  const activeRtpScenario = rtpScenarios[selectedScenarioKey] || rtpScenarios.scen_ransomware;
  const currentTreatment = activeRtpScenario.options[activeTreatmentChoice] || activeRtpScenario.options.mitigate;

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_waf_insurance",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Balancing WAF Mitigation with ₹50 Cr Insurance Transfer",
      budget: "₹18,50,000",
      challenge: "500 Payment Microservices Processing ₹120 Cr/Day Requiring Multi-Tier Treatment",
      dilemma:
        "A 500-node UPI payment switch required both proactive technical defenses against zero-day API attacks and financial risk transfer against catastrophic systemic banking outages.",
      resolution:
        "Mamata deployed AWS WAF and EDR (Mitigation - ₹18.5L/yr) while securing a ₹50 Crore cyber insurance policy (Transfer - ₹12L/yr), reducing residual risk to Low and satisfying RBI payment switch regulations.",
      metrics: {
        mitigationControls: "AWS WAF + EDR + FIDO2",
        insurancePolicyLimit: "₹50 Crores Coverage",
        residualRiskScore: "1.4 / 10 (Safe)",
        compliance: "ISO 27001 Clause 6.1.3 & RBI"
      }
    },
    {
      id: "ichapur_tokenization_avoid",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Risk Avoidance via Patient ID Tokenization",
      budget: "₹8,20,000",
      challenge: "Storing Unencrypted Aadhaar and Biopsy Scans Created Massive DPDP Exposure",
      dilemma:
        "Hospital clinical network stored raw Aadhaar numbers and patient diagnostic scans locally, exposing the institution to catastrophic ₹250 Crore statutory fines under DPDP Act Section 33.",
      resolution:
        "Mahima executed Risk Avoidance by tokenizing patient IDs and routing biopsy scans to encrypted AWS S3 with automated Object Lock crypto-shredding, completely eliminating local PII theft risks.",
      metrics: {
        piiStoredLocally: "0 Raw Aadhaar Records",
        avoidanceStrategy: "100% Tokenized IDs",
        dpdpFineImmunization: "₹250 Cr Shielded",
        compliance: "DPDP Act 2023 & NABH Charter"
      }
    },
    {
      id: "barrackpore_scada_data_diode",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Data Diode Mitigation",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced Nation-State OT Attacks on Legacy RTU Controllers",
      dilemma:
        "18 high-voltage transmission substations faced targeted nation-state OT cyber attacks on legacy RTU controllers that could not support modern cryptographic firmware patches.",
      resolution:
        "Debangshu treated risk via physical Mitigation (unidirectional data diodes) and strict Avoidance (banning all remote SSH/RDP connectivity), achieving 100% compliance with NCIIPC Protected System mandates.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        physicalMitigation: "Hardware Data Diodes",
        remoteAccessAvoided: "100% Air-Gapped",
        compliance: "IT Act Section 70 & CEA Cyber Rules"
      }
    },
    {
      id: "jadavpur_treatment_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Risk Treatment Optimizer & Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand Non-Transferable Legal Accountability",
      dilemma:
        "Cybersecurity students struggled to understand why legal accountability cannot be transferred via insurance and how to map RTP remediation actions into the ISO 27001 Statement of Applicability.",
      resolution:
        "The team developed an interactive Risk Treatment Strategy Optimizer and Decision Tree Simulator in React, training 215+ BCA cyber security students on authoring ISO 27001 Risk Treatment Plans.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        rtpPlansFormulated: "75+ Enterprise Cases",
        examMastery: "100% Risk Treatment Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 9 of 14
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Risk Treatment Strategies: Mitigate, Transfer, Accept, Avoid
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Translate risk evaluations into concrete operational security: master the 4 treatment options (Mitigate, Transfer, Avoid, Accept) under ISO/IEC 27005:2022, 
            author auditable Risk Treatment Plans (RTPs under Clause 6.1.3), structure cyber insurance portfolios, and enforce DPDP Act compliance.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 4-Pillar Risk Treatment Strategy Optimizer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Studio 1: 4-Pillar Risk Treatment Strategy Optimizer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a treatment strategy to inspect its core operational definition, engineering mechanisms, financial implications, and auditor verification criteria.
            </p>
          </div>

          {/* Strategy Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(treatmentStrategies).map((stg) => {
              const isSelected = selectedStrategyKey === stg.key;
              return (
                <button
                  key={stg.key}
                  onClick={() => setSelectedStrategyKey(stg.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{stg.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{stg.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Strategy Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeStrategy.badgeClass)}>
                  {activeStrategy.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Operational Focus: {activeStrategy.name.split(". ")[1]}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Primary Governance Standard</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">ISO 27005 Clause 9</span>
              </div>
            </div>

            {/* Definition & Mechanisms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Core Strategy Definition:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeStrategy.definition}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Engineering Deployment Mechanisms:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeStrategy.mechanisms}</p>
              </div>
            </div>

            {/* Financials & Auditor Checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Financial &amp; Budget Implications:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeStrategy.financials}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">External Auditor Verification Test:</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed font-sans">{activeStrategy.auditorCheck}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Risk Treatment Plan (RTP) Decision Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Studio 2: Risk Treatment Plan (RTP) Decision Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a threat scenario and test different treatment strategies to observe residual risk score drops and generated RTP compliance documentation.
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(rtpScenarios).map((sc) => {
              const isSelected = selectedScenarioKey === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => setSelectedScenarioKey(sc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200">{sc.title}</div>
                  <div className="text-[11px] text-rose-400 font-mono mt-0.5">Raw Inherent Risk: {sc.rawRisk}</div>
                </button>
              );
            })}
          </div>

          {/* Treatment Options Buttons */}
          <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                  Select Treatment Strategy for {activeRtpScenario.title.split(": ")[1]}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Active Strategy: {currentTreatment.strategy}
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                {Object.keys(activeRtpScenario.options).map((optKey) => (
                  <button
                    key={optKey}
                    onClick={() => setActiveTreatmentChoice(optKey)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg border font-bold uppercase transition-all",
                      activeTreatmentChoice === optKey
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                        : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                    )}
                  >
                    {optKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Action & Residual Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/30 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Applied Treatment Action:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{currentTreatment.action}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Resulting Residual Risk Score:</span>
                <p className="text-emerald-300 text-sm sm:text-base font-extrabold font-mono">{currentTreatment.residual}</p>
                <p className="text-[10px] text-gray-400 font-sans">{currentTreatment.status}</p>
              </div>
            </div>

            {/* RTP Output Block */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-gray-800 font-mono text-xs text-gray-300">
              <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans mb-1">
                Generated Risk Treatment Plan (RTP) Record:
              </span>
              <div>{currentTreatment.rtpDoc}</div>
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
              Visualizing the 4-Pillar Risk Treatment Strategy Matrix and the Risk Treatment Plan (RTP) Formulation Workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 4 Treatment Pillars */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 4-Pillar Risk Treatment Matrix
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Center Node */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="150" r="45" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="250" y="147" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">RISK</text>
                    <text x="250" y="160" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">TREATMENT</text>
                  </g>

                  {/* Top-Left: Mitigate */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="160" height="50" rx="6" fill="#064e3b" stroke="#10b981" />
                    <text x="105" y="47" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. MITIGATE (REDUCE)</text>
                    <text x="105" y="60" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">WAF • EDR • FIDO2 MFA</text>
                  </g>
                  <line x1="185" y1="75" x2="215" y2="120" stroke="#10b981" strokeWidth="1.5" />

                  {/* Top-Right: Transfer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="315" y="25" width="160" height="50" rx="6" fill="#581c87" stroke="#a855f7" />
                    <text x="395" y="47" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. TRANSFER (SHARE)</text>
                    <text x="395" y="60" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Cyber Insurance • SLAs</text>
                  </g>
                  <line x1="315" y1="75" x2="285" y2="120" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Bottom-Left: Avoid */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="225" width="160" height="50" rx="6" fill="#083344" stroke="#06b6d4" />
                    <text x="105" y="247" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. AVOID (TERMINATE)</text>
                    <text x="105" y="260" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Tokenize PAN • Drop Telnet</text>
                  </g>
                  <line x1="185" y1="225" x2="215" y2="180" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Bottom-Right: Accept */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="315" y="225" width="160" height="50" rx="6" fill="#78350f" stroke="#f59e0b" />
                    <text x="395" y="247" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. ACCEPT (RETAIN)</text>
                    <text x="395" y="260" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">Signed CISO Memo (12m)</text>
                  </g>
                  <line x1="315" y1="225" x2="285" y2="180" stroke="#f59e0b" strokeWidth="1.5" />

                  <text x="250" y="305" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Every identified risk must be systematically routed through one of the 4 treatment options.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: The 4-pillar risk treatment strategy matrix (ISO/IEC 27005:2022).
              </p>
            </div>

            {/* Diagram 2: RTP Formulation Flow */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Risk Treatment Plan (RTP) Formulation
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Evaluated Risks */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. EVALUATION</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Risks &gt; Appetite</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan69)" />

                  {/* Step 2: Strategy & Controls */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">2. CONTROL MAP</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Annex A Selection</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo69)" />

                  {/* Step 3: Author RTP */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="412" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">3. RTP ROADMAP</text>
                    <text x="412" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Owners &amp; SLAs (6.1.3)</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#10b981" strokeWidth="1.5" />

                  {/* Step 4: SoA Justification */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="372" y="125" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">4. STATEMENT OF APPLICABILITY</text>
                    <text x="372" y="138" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">93 Annex A Control Inclusions</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple69)" />

                  {/* Step 5: Residual Verification */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="125" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">5. RESIDUAL RISK AUDIT</text>
                    <text x="125" y="138" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">Verify Risk &lt;= Appetite</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% OPERATIONAL RISK DEFECT TREATMENT
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Ensures every identified gap has an assigned owner, budget, and verifiable remediation SLA.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    RTP formulation links risk assessment directly to the ISO 27001 Statement of Applicability.
                  </text>

                  <defs>
                    <marker id="arrowCyan69" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo69" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowPurple69" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: The Risk Treatment Plan (RTP) and Statement of Applicability (SoA) workflow.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Risk Treatment Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads combine WAF and insurance in Kolkata, avoid PII storage in Ichapur, deploy data diodes in Barrackpore, and simulate RTPs in Jadavpur.
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
                  <span>⚡</span> Treatment Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for Risk Officers and CISOs formulating Risk Treatment Plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Treatment Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Link RTP to SoA:</strong> Ensure every control in the SoA cites a specific RTP risk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Remember Accountability:</strong> Insurance pays financial claims, not regulatory blame.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 12-Month Expiry:</strong> Re-evaluate accepted risks annually during Management Review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Compensatory Controls:</strong> Isolate legacy systems with network VLANs when accepting risk.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Treatment Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Risk Ignoring:</strong> Confusing doing nothing with formal, documented Risk Acceptance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Insurance Silver Bullet:</strong> Believing insurance excuses a firm from patching CVEs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Verbal Risk Acceptance:</strong> Accepting risks without signed executive justification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Infinite Mitigation:</strong> Spending ₹50 Lakhs to protect a ₹10,000 annual loss.</span>
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
                  <span><strong>Enforce Payment Tokenization:</strong> Avoid raw credit card storage completely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate S3 Object Lock:</strong> Prevent ransomware deletion of clinical backups.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Review Insurance Exclusions:</strong> Ensure nation-state war exclusions are understood.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Re-certify RTP Quarterly:</strong> Track control implementation deadlines under Clause 6.1.3.</span>
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
              Synthesize the 4 treatment options and Risk Treatment Plan architecture before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Treatment Strategists
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why you can transfer financial risk, but NEVER legal accountability: Purchasing a ₹50 Crore cyber insurance policy ensures that the insurer pays forensic bills and customer settlement funds. However, under Section 85 of the Indian IT Act and Section 8 of the DPDP Act 2023, the corporate entity and its directors remain strictly accountable to the judicial court and the Data Protection Board of India.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Risk Avoidance through Payment Tokenization completely eliminates liability: By delegating cardholder data entry directly to PCI-DSS Level 1 payment gateways (Razorpay / Stripe), your application servers never touch, process, or store raw 16-digit credit card numbers or CVVs, avoiding 100% of cardholder data theft risks.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise Risk Treatment Plans (RTPs), always establish explicit 12-month expiration timers on any accepted residual risks, requiring mandatory re-evaluation during the annual ISO/IEC 27001 Clause 9.3 Management Review.
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
                <span>4 Treatment Options: Mitigate (Reduce), Transfer (Share), Avoid (Stop), Accept (Retain).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Mitigation deploys Technical, Administrative, and Physical Annex A controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Risk Transfer shifts financial loss, but legal accountability is NEVER transferred.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Risk Avoidance terminates the risky activity (e.g. payment tokenization).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Risk Acceptance requires written justification, CISO sign-off, and 12-month timer.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Risk Treatment Plan (RTP - Clause 6.1.3) defines owners, controls, and SLAs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Risk Treatment Strategies FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Risk Treatment Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Risk Treatment Strategies: Mitigate, Transfer, Accept, Avoid (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Risk Treatment is where cybersecurity analysis transforms into tangible defensive action. Always remember: you have four strategic levers—Mitigate (deploy technical and operational controls), Transfer (shift financial loss via cyber insurance), Avoid (eliminate risky practices through tokenization), and Accept (formally retain residual risk with signed CISO accountability and compensatory controls). Structure your Risk Treatment Plan (RTP) under ISO/IEC 27001 Clause 6.1.3 to guarantee 100% audit defensibility and total statutory Safe Harbor under Indian cyber law!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
