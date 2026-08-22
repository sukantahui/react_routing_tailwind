import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Studio 1: Risk Equation Parameters State
  const [threatScore, setThreatScore] = useState(4); // 1 to 5
  const [vulnerabilityScore, setVulnerabilityScore] = useState(4); // 1 to 5
  const [impactScore, setImpactScore] = useState(5); // 1 to 5
  const [controlEffectiveness, setControlEffectiveness] = useState(70); // 0% to 90%

  // Studio 2: ISO 27005 Lifecycle State
  const [selectedStageKey, setSelectedStageKey] = useState("stage3_analysis");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_iso27005_risk");

  // Studio 1 Calculation
  const inherentRiskScore = threatScore * vulnerabilityScore * impactScore; // Max = 125
  const residualRiskScore = (inherentRiskScore * (1 - controlEffectiveness / 100)).toFixed(1);
  const boardRiskAppetiteThreshold = 25.0;
  const isWithinAppetite = parseFloat(residualRiskScore) <= boardRiskAppetiteThreshold;

  // Studio 2: ISO 27005 Stages Data
  const iso27005Stages = {
    stage1_context: {
      key: "stage1_context",
      title: "1. Context Establishment & Scope",
      description: "Define ISMS boundaries, external legal baselines (DPDP Act, RBI Directions), internal risk criteria, and executive risk appetite thresholds.",
      deliverables: "Risk Management Scope Document & Standardized Likelihood/Impact Scale Matrix.",
      tools: "ISO 27005 Context Charter, Enterprise Risk Taxonomy, Legal Register.",
      auditorCheck: "Auditors verify executive board approval of risk evaluation criteria and scope.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    stage2_identification: {
      key: "stage2_identification",
      title: "2. Risk Identification (Assets, Threats & Flaws)",
      description: "Systematically catalog primary and supporting assets, identify threat sources (APTs, insiders), and discover unpatched vulnerabilities (CVEs).",
      deliverables: "Comprehensive Information Asset Inventory & Threat-Vulnerability Mapping Register.",
      tools: "Nessus Vulnerability Scanner, MITRE ATT&CK Matrix, CMDB Asset Discovery.",
      auditorCheck: "Auditors sample production databases to ensure all critical assets are inventoried.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    stage3_analysis: {
      key: "stage3_analysis",
      title: "3. Risk Analysis (Likelihood & Consequence)",
      description: "Determine the realistic likelihood of threat occurrence and calculate the financial and operational consequence of successful compromise.",
      deliverables: "Qualitative Risk Heatmap (5x5 Matrix) or Quantitative Loss Expectancy (SLE/ALE).",
      tools: "FAIR Risk Model, Monte Carlo Simulation, CVSS v3.1 Calculator.",
      auditorCheck: "Auditors review mathematical consistency and evidence supporting likelihood estimates.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    stage4_evaluation: {
      key: "stage4_evaluation",
      title: "4. Risk Evaluation (Appetite Comparison)",
      description: "Compare calculated risk levels against the Board of Directors' approved Risk Appetite to prioritize which risks require mandatory treatment.",
      deliverables: "Prioritized Risk Treatment List & Board Risk Threshold Escalation Log.",
      tools: "Enterprise Risk Dashboard, Risk Acceptance Criteria Matrix.",
      auditorCheck: "Auditors check that all risks exceeding appetite are flagged for formal treatment.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    stage5_treatment: {
      key: "stage5_treatment",
      title: "5. Risk Treatment & Control Selection",
      description: "Select and execute appropriate treatment strategies: Mitigate (Controls), Transfer (Insurance), Avoid (Terminate process), or Accept (Formal Sign-off).",
      deliverables: "Risk Treatment Plan (RTP) & Statement of Applicability (SoA) Control Mapping.",
      tools: "ISO 27001 Annex A Controls, NIST SP 800-53, Cyber Insurance Policies.",
      auditorCheck: "Auditors verify that control owners are assigned with realistic implementation SLAs.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    stage6_monitoring: {
      key: "stage6_monitoring",
      title: "6. Continuous Risk Monitoring & Review",
      description: "Continuously monitor threat landscape shifts, newly discovered zero-days, and organizational changes under ISO 27001 Clause 9.3.",
      deliverables: "Quarterly Risk Register Updates & Annual Management Review Minutes.",
      tools: "Threat Intelligence Feeds, Continuous Vulnerability Scanners, SIEM Dashboards.",
      auditorCheck: "Auditors verify that risk assessments are refreshed at least annually or after major incidents.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    }
  };

  const activeStage = iso27005Stages[selectedStageKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_iso27005_risk",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "ISO 27005 Risk Quantification Across 500 Nodes",
      budget: "₹18,50,000",
      challenge: "Fast-Scaling Payment Switch Faced Unquantified API Risks on ₹120 Cr/Day Flows",
      dilemma:
        "A fast-scaling UPI payment switch processing ₹120 Crores daily operated with unquantified cloud API risk, risking catastrophic financial loss and RBI audit non-compliance.",
      resolution:
        "Mamata implemented the ISO 27005 risk matrix, reducing inherent risk from 8.8 (Critical) to residual risk of 1.4 (Low) via WAF and FIDO2 MFA, securing RBI payment gateway regulatory certification.",
      metrics: {
        inherentRiskScore: "100 / 125 (Critical)",
        residualRiskScore: "14 / 125 (Safe)",
        controlEfficiency: "86% Risk Reduction",
        compliance: "ISO 27005:2022 & RBI Directions"
      }
    },
    {
      id: "ichapur_dpia_risk",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Data Protection Impact Assessment (DPIA)",
      budget: "₹8,20,000",
      challenge: "Hospital Deployed AI Diagnostic Engine for 80,000 Scans Without Risk Review",
      dilemma:
        "Hospital clinical care network deployed an AI diagnostic engine processing 80,000 oncology scans without evaluating privacy risks, violating Section 8 of the DPDP Act 2023.",
      resolution:
        "Mahima conducted a formal DPDP Act Section 8 DPIA, identifying PII leakage vectors and enforcing differential privacy and dynamic data masking (A.8.11), averting massive DPBI statutory penalties.",
      metrics: {
        privacyRisksIdentified: "14 Potential Vectors",
        mitigationControls: "100% Implemented",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_ot_scada_risk",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation OT Risk Quantification",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced Unquantified Physical and Cyber Risks on Legacy RTUs",
      dilemma:
        "18 high-voltage 220kV transmission substations faced unquantified physical and cyber risks on legacy RTU controllers, risking grid tripping and regional blackouts.",
      resolution:
        "Debangshu applied NIST SP 800-30 Rev 1 risk assessment, identifying air-gap vulnerabilities and deploying hardened unidirectional security gateways, satisfying NCIIPC Protected Systems rules under IT Act Sec 70.",
      metrics: {
        substationsAssessed: "18 High-Voltage Sites",
        otVulnerabilitiesClosed: "48 Critical Flaws",
        gridReliability: "100.000% Continuous Power",
        compliance: "IT Act Section 70 & CEA Cyber Rules"
      }
    },
    {
      id: "jadavpur_risk_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Risk Equation & Lifecycle Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Distinguish Inherent Risk, Residual Risk & Risk Appetite",
      dilemma:
        "Cybersecurity students struggled to distinguish between Inherent Risk, Residual Risk, and Risk Appetite, and how mathematical risk scoring guides corporate budget allocations.",
      resolution:
        "The team developed an interactive ISO 27005 Risk Management Lifecycle Simulator and Risk Equation Optimizer in React, training 215+ BCA cyber security students on professional risk assessment.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        riskModelsSimulated: "110+ Enterprise Cases",
        examMastery: "100% Risk Management Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 4 of 14
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Fundamentals of Information Security Risk Management
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the mathematics of cybersecurity exposure: master the fundamental risk relationship ($Risk = Threat \times Vulnerability \times Impact$), 
            navigate the 6-stage ISO/IEC 27005:2022 lifecycle, quantify Inherent vs Residual Risk, and align security controls with Board Risk Appetite under Indian regulations.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Risk Equation & Component Parameter Analyzer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📐</span> Studio 1: Interactive Risk Equation &amp; Parameter Optimizer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust Threat, Vulnerability, and Asset Impact parameters to observe real-time Inherent Risk, Control Mitigation Offsets, and Residual Risk alignment against Board Risk Appetite.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls: Sliders */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-5 shadow-2xl lg:col-span-2">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Risk Parameter Calibration Controls
              </h3>

              {/* Threat Likelihood Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">1. Threat Likelihood / Capability:</span>
                  <span className="text-cyan-400 font-bold">{threatScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={threatScore}
                  onChange={(e) => setThreatScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Vulnerability Severity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">2. Vulnerability Severity (CVSS Flaw):</span>
                  <span className="text-amber-400 font-bold">{vulnerabilityScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={vulnerabilityScore}
                  onChange={(e) => setVulnerabilityScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Asset Impact Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">3. Asset Business Impact (Financial / PII):</span>
                  <span className="text-rose-400 font-bold">{impactScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={impactScore}
                  onChange={(e) => setImpactScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Control Effectiveness Slider */}
              <div className="space-y-2 pt-2 border-t border-gray-800">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">4. Security Control Mitigation Effectiveness:</span>
                  <span className="text-emerald-300 font-bold">{controlEffectiveness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={controlEffectiveness}
                  onChange={(e) => setControlEffectiveness(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            {/* Right Output: Score Card */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Risk Output Dashboard
                </h3>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs font-mono">
                  <span className="text-gray-400 block text-[10px] uppercase">Raw Inherent Risk:</span>
                  <span className="text-xl font-extrabold text-rose-400 block">{inherentRiskScore} / 125</span>
                  <span className="text-[10px] text-gray-500 block font-sans">Formula: Threat({threatScore}) x Vuln({vulnerabilityScore}) x Impact({impactScore})</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs font-mono">
                  <span className="text-gray-400 block text-[10px] uppercase">Calculated Residual Risk:</span>
                  <span className={clsx("text-2xl font-extrabold block", isWithinAppetite ? "text-emerald-400" : "text-rose-400")}>
                    {residualRiskScore} / 125
                  </span>
                  <span className="text-[10px] text-gray-500 block font-sans">After {controlEffectiveness}% Control Offset</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={clsx("p-3.5 rounded-xl border text-xs font-mono font-bold text-center", isWithinAppetite ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700")}>
                {isWithinAppetite ? "✔ WITHIN BOARD RISK APPETITE (<= 25.0)" : "❌ EXCEEDS RISK APPETITE (ESCALATE TO CISO)"}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ISO 27005 / NIST SP 800-30 Risk Management Lifecycle Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 2: ISO 27005 Risk Management Lifecycle Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a stage in the ISO/IEC 27005:2022 risk lifecycle to inspect operational objectives, key deliverables, tools, and external audit expectations.
            </p>
          </div>

          {/* Stage Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.values(iso27005Stages).map((stg) => {
              const isSelected = selectedStageKey === stg.key;
              return (
                <button
                  key={stg.key}
                  onClick={() => setSelectedStageKey(stg.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{stg.title.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{stg.title.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeStage.badgeClass)}>
                  {activeStage.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  ISO/IEC 27005:2022 Lifecycle Workflow
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Primary Operational Tool</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeStage.tools.split(",")[0]}</span>
              </div>
            </div>

            {/* Description & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Operational Objective:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeStage.description}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Key Stage Deliverables:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeStage.deliverables}</p>
              </div>
            </div>

            {/* Auditor Verification Check */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-indigo-900/30 text-xs font-mono">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">External Auditor Verification Check:</span>
              <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed mt-0.5">{activeStage.auditorCheck}</p>
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
              Visualizing the Fundamental Risk Triangle and the ISO 27005 / NIST SP 800-30 Risk Management Lifecycle Flow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Risk Triangle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Fundamental Risk Triangle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: Threat */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="55" r="42" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                    <text x="250" y="52" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8.5">THREAT</text>
                    <text x="250" y="66" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Actor • Likelihood</text>
                  </g>

                  {/* Left: Vulnerability */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="100" cy="205" r="42" fill="#083344" stroke="#06b6d4" strokeWidth="2" />
                    <text x="100" y="202" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">VULNERABILITY</text>
                    <text x="100" y="216" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Flaw • Severity</text>
                  </g>

                  {/* Right: Asset Impact */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="400" cy="205" r="42" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="400" y="202" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">ASSET IMPACT</text>
                    <text x="400" y="216" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Value • Magnitude</text>
                  </g>

                  {/* Connecting Triangle Lines */}
                  <line x1="220" y1="85" x2="130" y2="175" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="280" y1="85" x2="370" y2="175" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="145" y1="205" x2="355" y2="205" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Center Intersection: CYBERSECURITY RISK */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="125" width="140" height="45" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="250" y="145" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      CYBER RISK
                    </text>
                    <text x="250" y="158" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">
                      Threat x Vuln x Impact
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Mitigating any of the three nodes substantially reduces overall business risk.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.1: The fundamental cybersecurity risk triangle (Threat x Vulnerability x Asset Impact).
              </p>
            </div>

            {/* Diagram 2: ISO 27005 Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: ISO 27005 Risk Management Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Context */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. CONTEXT</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Scope &amp; Appetite</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan65)" />

                  {/* Step 2: Identification */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">2. IDENTIFICATION</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">Assets &amp; Flaws</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo65)" />

                  {/* Step 3: Analysis & Evaluation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="412" y="45" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">3. ANALYSIS</text>
                    <text x="412" y="58" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Likelihood x Consequence</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Step 4: Treatment */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="372" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">4. RISK TREATMENT</text>
                    <text x="372" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Mitigate • Transfer • Avoid • Accept</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen65)" />

                  {/* Step 5: Monitoring */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="125" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">5. CONTINUOUS MONITORING</text>
                    <text x="125" y="138" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">Quarterly Review &amp; Clause 9.3</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      DYNAMIC RESIDUAL RISK OPTIMIZATION
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Maintains residual risk below board appetite, ensuring total statutory Safe Harbor.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Risk assessment is an ongoing cyclical discipline rather than a static checklist.
                  </text>

                  <defs>
                    <marker id="arrowCyan65" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo65" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGreen65" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.2: The cyclical ISO/IEC 27005:2022 risk management workflow.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Risk Management Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads quantify payment risks in Kolkata, conduct DPIAs in Ichapur, manage SCADA risks in Barrackpore, and simulate lifecycles in Jadavpur.
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
                  <span>⚡</span> Risk Management Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Risk Treatment Solution
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
              Guidelines for Enterprise Risk Officers and CISOs structuring ISO 27005 risk frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Risk Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Measure Inherent vs Residual:</strong> Document raw risk and control mitigation offsets explicitly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Align with Board Appetite:</strong> Never accept a risk without formal executive written sign-off.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Conduct Continuous Reviews:</strong> Refresh risk registers annually or after major IT changes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Perform DPIAs on PII:</strong> Conduct privacy assessments under DPDP Act Section 8.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Risk Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing Threat &amp; Flaw:</strong> Threat is the attacker; Vulnerability is the unpatched flaw.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The One-and-Done Audit:</strong> Treating risk assessments as a static one-time compliance checklist.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Verbal Risk Acceptance:</strong> Accepting high risks verbally without signed executive accountability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Asset Valuation:</strong> Treating test servers with the same priority as core banking databases.</span>
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
                  <span><strong>Automate Asset Discovery:</strong> Ingest real-time cloud CMDB telemetry into risk registers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Calculate Loss Expectancy:</strong> Quantify financial impacts using SLE and ALE metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Integrate Threat Intel:</strong> Update threat likelihood scores from CERT-In and ISAC feeds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Establish BRMC Committee:</strong> Convene quarterly board reviews under RBI Master Directions.</span>
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
              Synthesize risk equations, Inherent vs Residual Risk, and ISO 27005 lifecycles before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Risk Analysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why eliminating 100% of risk is economically impossible: Total security would require infinite budget and would paralyze business operations. The objective of risk management is not zero risk, but driving Residual Risk below the Board of Directors' approved Risk Appetite.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Data Protection Impact Assessments (DPIAs) establish Safe Harbor under Section 8 of the Indian DPDP Act 2023: Conducting a documented DPIA before launching high-risk data processing proves that the corporate entity evaluated privacy impacts and instituted reasonable safeguards, shielding the firm from ₹250 Crore statutory penalties under Section 33.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise risk registers, always track both Inherent Risk (unmitigated) and Residual Risk (after controls) to demonstrate the clear return on security investment (ROSI) to executive stakeholders.
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
                <span>Risk = Threat Likelihood x Vulnerability Severity x Asset Impact.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Inherent Risk is raw risk; Residual Risk = Inherent Risk - Control Effectiveness.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Risk Appetite is the board's strategic limit; Risk Tolerance is tactical margin.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ISO 27005 6 Steps: Context, Identification, Analysis, Evaluation, Treatment, Monitoring.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NIST SP 800-30 Rev 1 4 Steps: Prepare, Conduct, Communicate, Maintain.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8 mandates Data Protection Impact Assessments (DPIAs).</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Fundamentals of Information Security Risk Management FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Risk Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Fundamentals of Information Security Risk Management (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Information Security Risk Management is the intellectual heart of cybersecurity engineering. Always remember: risk is the product of Threat, Vulnerability, and Asset Impact. Your mission as a cybersecurity professional is not to build impossible walls, but to quantify Inherent Risk, select cost-effective ISO 27001 Annex A controls, and drive Residual Risk below the Board of Directors' approved Risk Appetite under ISO/IEC 27005:2022 and Indian DPDP Act regulations!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
