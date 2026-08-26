import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Studio 1: Paradigm Selector State
  const [selectedParadigmKey, setSelectedParadigmKey] = useState("formal_isms");

  // Studio 2: ISMS Pillar State
  const [selectedPillarKey, setSelectedPillarKey] = useState("risk_treatment");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_isms_transition");

  // Studio 1: Paradigm Comparison Data
  const paradigms = {
    adhoc_security: {
      key: "adhoc_security",
      name: "1. Traditional Ad-Hoc IT Security",
      governance: "Uncoordinated IT silo without board awareness or strategic budget",
      riskStrategy: "Arbitrary guesswork & reactive fire-fighting after breaches occur",
      scope: "Limited to servers, firewalls, and local office computers",
      incidentSla: "Days or weeks to detect; no formal CERT-In escalation path",
      auditReadiness: "Panic preparation 2 days before annual external customer questionnaires",
      legalLiability: "CRITICAL VULNERABILITY: Deemed legally negligent under IT Act Section 43A & DPDP Act (₹250 Cr Fine Risk)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      traits: [
        "Buying expensive security appliances without configuring or monitoring them.",
        "Zero employee awareness; Phish-Prone Percentage exceeding 35%.",
        "No documented risk register or asset ownership accountability.",
        "High executive turnover and personal Director criminal liability under IT Act Section 85."
      ]
    },
    formal_isms: {
      key: "formal_isms",
      name: "2. Formalized ISO/IEC 27001:2022 ISMS",
      governance: "Board-approved Information Security Policy + Dedicated Independent CISO",
      riskStrategy: "Systematic quantitative & qualitative risk assessments mapped to Risk Appetite",
      scope: "Holistic enterprise (People, Cloud, Supply Chain, Data Lifecycle, OT Systems)",
      incidentSla: "Sub-60s detection via 24/7 SOC; automated CERT-In 6-hour escalation",
      auditReadiness: "Continuous internal audits, Statement of Applicability (SoA), and CAPA tracking",
      legalLiability: "100% STATUTORY SAFE HARBOR: Conclusive proof of due diligence under IT Act Section 43A & DPDP Act",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      traits: [
        "Risk-driven control selection across all 93 ISO 27001 Annex A controls.",
        "Continuous Human Firewall training dropping Phish-Prone rate below 1.5%.",
        "Executive Management Reviews (Clause 9.3) evaluating security KPIs annually.",
        "Unlocks multi-million dollar global B2B contracts and banking partnerships."
      ]
    }
  };

  const activeParadigm = paradigms[selectedParadigmKey];

  // Studio 2: ISMS Architectural Pillars Data
  const ismsPillars = {
    governance_leadership: {
      key: "governance_leadership",
      name: "1. Leadership & Governance (Clauses 4 & 5)",
      clause: "ISO/IEC 27001 Clauses 4 & 5",
      deliverables: "Information Security Policy, CISO Terms of Reference, Context Analysis, Stakeholder Matrix.",
      businessValue: "Aligns security strategy with revenue objectives and secures board budget.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      details:
        "Establishes organizational context, regulatory boundaries, and top management commitment. The Board formally approves security policies and appoints an independent CISO."
    },
    risk_treatment: {
      key: "risk_treatment",
      name: "2. Risk Assessment & Treatment (Clause 6)",
      clause: "ISO/IEC 27001 Clause 6",
      deliverables: "Information Asset Register (IAR), Risk Register (SLE/ALE), Statement of Applicability (SoA).",
      businessValue: "Optimizes capital allocation by funding controls strictly proportional to risk impact.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      details:
        "Systematically identifies threats and vulnerabilities for all information assets. Formulates the Statement of Applicability (SoA) justifying inclusion/exclusion of all 93 Annex A controls."
    },
    operational_controls: {
      key: "operational_controls",
      name: "3. Operational Controls (Clause 8 & Annex A)",
      clause: "ISO/IEC 27001 Clause 8 & Annex A",
      deliverables: "93 Controls across Organizational (37), People (8), Physical (14), and Technological (34).",
      businessValue: "Hardens the operational attack surface and enforces defense-in-depth.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800",
      details:
        "Executes risk treatment plans: deploys AES-256 encryption, MFA, 24/7 SOC telemetry, network segmentation, secure SDLC pipelines, and third-party vendor risk controls."
    },
    performance_audit: {
      key: "performance_audit",
      name: "4. Performance Evaluation & Audit (Clause 9)",
      clause: "ISO/IEC 27001 Clause 9",
      deliverables: "Internal Audit Reports, Incident Metrics (MTTR/MTTD), Executive Management Review Minutes.",
      businessValue: "Provides objective visibility to the Board and validates control effectiveness.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      details:
        "Conducts scheduled first-party internal audits, measures security KPIs (Phish-Prone rate, MTTR), and convenes executive Management Reviews to evaluate overall ISMS health."
    },
    continuous_improvement: {
      key: "continuous_improvement",
      name: "5. Improvement & CAPA (Clause 10)",
      clause: "ISO/IEC 27001 Clause 10",
      deliverables: "Non-Conformity Reports, Root Cause Analysis (5-Whys), CAPA Remediation Logs.",
      businessValue: "Prevents recurrence of security incidents and adapts to emerging cyber threats.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      details:
        "Drives the Deming Plan-Do-Check-Act (PDCA) engine: resolves audit non-conformities, updates policies after real incidents, and ensures the ISMS evolves with the threat landscape."
    }
  };

  const activePillar = ismsPillars[selectedPillarKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_isms_transition",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Transitioning Ad-Hoc FinTech Defenses to ISO 27001 ISMS",
      budget: "₹22,50,000",
      challenge: "500-Node Payment Switch Operating on Ad-Hoc Scripts Failing B2B Audits",
      dilemma:
        "A 500-node high-velocity payment switch was operating on ad-hoc shell scripts and unmonitored firewall rules, failing global banking security audits and facing ₹250 Cr DPDP breach risks.",
      resolution:
        "Mamata designed and deployed an enterprise ISO/IEC 27001:2022 ISMS, establishing a formal Risk Register, Statement of Applicability (SoA), and 24/7 SOC, securing ₹45 Crore banking partnerships.",
      metrics: {
        certificationAchieved: "ISO/IEC 27001:2022 Certified",
        controlsMapped: "100% (93 Annex A Controls)",
        b2bDealsUnlocked: "₹45 Crores Banking Contracts",
        compliance: "ISO 27001, RBI Master Direction & DPDP"
      }
    },
    {
      id: "ichapur_healthcare_isms",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Clinical Healthcare ISMS Implementation",
      budget: "₹8,20,000",
      challenge: "Hospital Network Lacked Unified Governance Across 80,000 Patient Records",
      dilemma:
        "Hospital clinical care network lacked unified security governance across 80,000 oncology patient records, exposing diagnostic scans to ransomware and regulatory penalties.",
      resolution:
        "Mahima built a healthcare ISMS integrating ISO 27001 Annex A controls with NABH guidelines and DPDP Act Section 8 consent governance, achieving 100% audit certification.",
      metrics: {
        recordsSecured: "80,000 Oncology Records",
        auditReadiness: "100% Certified Compliance",
        ransomwareResilience: "Zero Clinical Breaches",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_ot_isms",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation Industrial OT ISMS",
      budget: "₹14,80,000",
      challenge: "SCADA Industrial Networks Uncoordinated Resisting Blackout Attacks",
      dilemma:
        "SCADA industrial control networks were uncoordinated, risking regional power blackout attacks across 18 high-voltage 220kV transmission substations.",
      resolution:
        "Debangshu formulated an OT-specific ISMS aligning ISO 27001 with Central Electricity Authority (CEA) regulations, enforcing air-gapped jump hosts and 180-day audit log retention under NCIIPC guidelines.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        gridUptime: "99.999% Industrial Resilience",
        nciipcAlignment: "100% Mandated OT Controls",
        compliance: "CEA Cyber Regulations & IT Act Sec 70"
      }
    },
    {
      id: "jadavpur_isms_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "ISMS Architecture Simulator & Benchmark Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling with Management Clauses vs Technical Controls",
      dilemma:
        "Cybersecurity students struggled to understand how ISO 27001 management clauses interface with technical Annex A controls and how PDCA drives continuous compliance.",
      resolution:
        "The team developed an interactive ISMS Architecture Simulator and Audit Gap Analyzer, training 210+ BCA cyber security students on conducting ISO 27001 Stage 1 and Stage 2 certification audits.",
      metrics: {
        studentsTrained: "210+ Cyber BCA Students",
        auditSimulations: "45+ Complete ISMS Cycles",
        examMastery: "100% ISO 27001 Proficiency",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 0 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            What is an Information Security Management System (ISMS)?
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Discover the strategic foundation of enterprise cybersecurity: master the ISO/IEC 27001:2022 management system framework, 
            transition from ad-hoc IT fire-fighting to board-governed resilience, explore Clauses 4-10 and 93 Annex A controls, and establish statutory legal safe harbor.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Ad-hoc IT Security vs Holistic ISMS Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 1: Ad-Hoc IT Security vs Formalized ISO 27001 ISMS
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle between traditional ad-hoc IT security and a formalized ISO 27001 ISMS to compare governance models, risk strategies, incident SLAs, and legal safe harbor standing.
            </p>
          </div>

          {/* Paradigm Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(paradigms).map((p) => {
              const isSelected = selectedParadigmKey === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => setSelectedParadigmKey(p.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs sm:text-sm",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.01]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200">{p.name}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{p.governance.split(" ")[0]} {p.governance.split(" ")[1]} Approach</div>
                </button>
              );
            })}
          </div>

          {/* Active Paradigm Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeParadigm.badgeClass)}>
                  Paradigm: {activeParadigm.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Governance Model: {activeParadigm.governance}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Incident Detection SLA</span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-400">{activeParadigm.incidentSla}</span>
              </div>
            </div>

            {/* Risk Strategy & Scope */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Risk Treatment Methodology:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeParadigm.riskStrategy}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Enterprise Scope &amp; Coverage:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeParadigm.scope}</p>
              </div>
            </div>

            {/* Characteristics Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block font-sans">
                Operational Characteristics:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {activeParadigm.traits.map((trait, idx) => (
                  <div key={idx} className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span className="text-gray-300 leading-relaxed">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Liability & Audit Standing */}
            <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1 text-xs font-mono">
              <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Corporate Legal &amp; Statutory Standing:</span>
              <p className="text-rose-300 text-xs sm:text-sm font-extrabold leading-relaxed">{activeParadigm.legalLiability}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: ISMS Core Architecture Component Explorer (Clauses 4-10) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 2: ISMS Core Architecture Component Explorer (ISO 27001)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an architectural pillar of ISO/IEC 27001 to inspect mandatory management clauses, operational deliverables, and strategic business value.
            </p>
          </div>

          {/* Pillar Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.values(ismsPillars).map((pillar) => {
              const isSelected = selectedPillarKey === pillar.key;
              return (
                <button
                  key={pillar.key}
                  onClick={() => setSelectedPillarKey(pillar.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{pillar.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{pillar.clause.split(" ")[2]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePillar.badgeClass)}>
                  Standard Clause: {activePillar.clause}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activePillar.name}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Strategic Value</span>
                <span className="text-xs font-bold text-emerald-400">{activePillar.businessValue}</span>
              </div>
            </div>

            {/* Deliverables & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Mandatory ISMS Deliverables:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed">{activePillar.deliverables}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Operational Implementation:</span>
                <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">{activePillar.details}</p>
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
              Visualizing the Holistic ISMS Architecture Umbrella and Ad-hoc Security Chaos versus Structured ISMS Harmony.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: ISMS Architecture Umbrella */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Holistic ISMS Architecture Umbrella
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Umbrella Arc: ISO 27001 Clauses 4-10 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <path d="M 50 110 Q 250 10 450 110 L 410 130 Q 250 50 90 130 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="65" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      ISO/IEC 27001:2022 MANAGEMENT SYSTEM (CLAUSES 4-10)
                    </text>
                    <text x="250" y="82" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Leadership • Risk Planning • Internal Audit • CAPA
                    </text>
                  </g>

                  {/* 4 Pillars Under Umbrella */}
                  {/* Pillar 1: Organizational */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="145" width="90" height="90" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="95" y="168" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">ORGANIZATIONAL</text>
                    <text x="95" y="185" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7.5">37 Controls</text>
                    <text x="95" y="200" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Policies • TPRM</text>
                    <text x="95" y="215" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Incident Mgmt</text>
                  </g>

                  {/* Pillar 2: People */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="145" width="90" height="90" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="195" y="168" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">PEOPLE</text>
                    <text x="195" y="185" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7.5">8 Controls</text>
                    <text x="195" y="200" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Screening</text>
                    <text x="195" y="215" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">JML &amp; Awareness</text>
                  </g>

                  {/* Pillar 3: Physical */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="250" y="145" width="90" height="90" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="295" y="168" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">PHYSICAL</text>
                    <text x="295" y="185" fill="#fcd34d" font-family="monospace" textAnchor="middle" fontSize="7.5">14 Controls</text>
                    <text x="295" y="200" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Perimeters</text>
                    <text x="295" y="215" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Clean Desk</text>
                  </g>

                  {/* Pillar 4: Technological */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="145" width="100" height="90" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="400" y="168" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">TECHNOLOGICAL</text>
                    <text x="400" y="185" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7.5">34 Controls</text>
                    <text x="400" y="200" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">AES-256 • IAM</text>
                    <text x="400" y="215" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">24/7 SOC • DLP</text>
                  </g>

                  {/* Bottom Foundation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="248" width="400" height="42" rx="4" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="267" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% STATUTORY SAFE HARBOR &amp; BUSINESS RESILIENCE
                    </text>
                    <text x="250" y="280" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">
                      Protects enterprise against ₹250 Cr DPDP fines and immunizes Directors under IT Act Sec 85.
                    </text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.1: The Holistic ISMS Architecture Umbrella (Clauses 4-10 covering 93 Annex A controls).
              </p>
            </div>

            {/* Diagram 2: Ad-Hoc Chaos vs ISMS Harmony */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Ad-Hoc IT Security vs Structured ISMS
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Ad-Hoc Chaos */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="210" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="130" y="50" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="9">AD-HOC IT SECURITY CHAOS</text>
                    <text x="40" y="80" fill="#f87171" font-family="monospace" fontSize="7.5">❌ Reactive Panic Firefighting</text>
                    <text x="40" y="105" fill="#f87171" font-family="monospace" fontSize="7.5">❌ IT Silo without Board Access</text>
                    <text x="40" y="130" fill="#f87171" font-family="monospace" fontSize="7.5">❌ No Documented Risk Register</text>
                    <text x="40" y="155" fill="#f87171" font-family="monospace" fontSize="7.5">❌ 35%+ Phish-Prone Failure Rate</text>
                    <text x="40" y="180" fill="#fca5a5" font-family="monospace" fontWeight="bold" fontSize="7.5">⚡ ₹250 Cr DPDP Fine Exposure!</text>
                    <text x="40" y="205" fill="#fca5a5" font-family="monospace" fontSize="7">Personal Director Criminal Liability</text>
                  </g>

                  {/* Right: Structured ISMS */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="210" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="50" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">STRUCTURED ISO 27001 ISMS</text>
                    <text x="280" y="80" fill="#34d399" font-family="monospace" fontSize="7.5">✔ Proactive PDCA Risk Lifecycle</text>
                    <text x="280" y="105" fill="#34d399" font-family="monospace" fontSize="7.5">✔ Independent CISO + Board Policy</text>
                    <text x="280" y="130" fill="#34d399" font-family="monospace" fontSize="7.5">✔ Formal Statement of Applicability</text>
                    <text x="280" y="155" fill="#34d399" font-family="monospace" fontSize="7.5">✔ Sub-1.5% Phish-Prone Rate</text>
                    <text x="280" y="180" fill="#d1fae5" font-family="monospace" fontWeight="bold" fontSize="7.5">🛡 100% Statutory Safe Harbor</text>
                    <text x="280" y="205" fill="#d1fae5" font-family="monospace" fontSize="7">Unlocks Global B2B Revenue!</text>
                  </g>

                  {/* Bottom Text */}
                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    An ISMS transforms cybersecurity from an uncoordinated cost center into a strategic business enabler.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.2: Ad-Hoc Security Chaos versus Structured ISO 27001 ISMS Harmony.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: ISMS Implementation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads transition FinTech switches in Kolkata, build healthcare ISMS in Ichapur, govern power substations in Barrackpore, and simulate ISMS audits in Jadavpur.
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
                  <span>⚡</span> Ad-Hoc Security Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied ISMS Solution
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
              Guidelines for Lead Auditors and CISOs establishing certified Information Security Management Systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> ISMS Governance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Secure Executive Commitment (Clause 5):</strong> Board sponsorship is mandatory for ISO 27001 certification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain a Dynamic SoA:</strong> Document justifications for all 93 controls in the Statement of Applicability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Drive the PDCA Cycle:</strong> Close internal audit non-conformities with structured CAPA remediation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate CERT-In 6-Hour SLA:</strong> Integrate SIEM playbooks to escalate incidents to incident@cert-in.org.in.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common ISMS Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Shelfware Policies:</strong> Creating thick policy binders that nobody reads or enforces in daily code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>IT-Only Silo:</strong> Failing to integrate HR screening, legal contracts, and physical facilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Faking Audit Evidence:</strong> Manipulating logs right before the certification auditor arrives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Guessing Control Selection:</strong> Deploying tools without performing formal risk assessment.</span>
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
                  <span><strong>Convene Annual Management Reviews:</strong> Review audit non-conformities with top leadership (Cl 9.3).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Embed Security Champions:</strong> Place champions across all development squads (1 per 20 devs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 180-Day Indian Log Retention:</strong> Archive immutable SIEM telemetry under IT Act Section 70B.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Test BCP/DR Failover Semi-Annually:</strong> Validate RTO/RPO targets through live traffic switchovers.</span>
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
              Synthesize core ISMS concepts and ISO 27001 structures before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for ISMS Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why buying technical security tools is never enough: An organization can invest crores in the latest firewalls and EDR agents, but if it lacks an ISMS (no board governance, no employee screening, no change management, no incident escalation playbook), a simple social engineering attack or unpatched developer script will completely compromise the enterprise.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How ISO 27001 is structured: Clauses 4 through 10 define the mandatory management system requirements that every organization must satisfy, while Annex A provides the catalog of 93 security controls that are selectively applied based on your formal Risk Assessment and documented in your Statement of Applicability (SoA).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cybersecurity designs, treat ISO/IEC 27001 not as a burdensome compliance checklist, but as a strategic business enabler that establishes statutory Safe Harbor under Section 43A of the Indian IT Act 2000 and unlocks lucrative enterprise contracts.
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
                <span>ISMS is a risk-driven management framework formalized under ISO/IEC 27001.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO 27001 is divided into Clauses 4-10 (Requirements) and Annex A (93 Controls).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Annex A controls span 4 themes: Organizational, People, Physical, Technological.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO 27001 establishes statutory Safe Harbor under IT Act Section 43A.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Statement of Applicability (SoA) documents inclusion of all 93 controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISMS integrates CERT-In 6-hour reporting and 180-day log storage under Sec 70B.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="What is an Information Security Management System (ISMS)? FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; ISO 27001 ISMS Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="What is an Information Security Management System (ISMS)? (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 003_002 on ISMS Framework & Working Procedures! An ISMS is the master blueprint of enterprise cybersecurity. Remember that technology alone cannot save an organization: you must establish top management leadership under Clause 5, conduct rigorous risk assessments under Clause 6, deploy controls across all 93 Annex A domains under Clause 8, and drive continuous improvement through the Plan-Do-Check-Act (PDCA) Deming cycle under Clause 10!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
